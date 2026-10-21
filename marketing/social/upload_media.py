#!/usr/bin/env python3
"""자동 게시에 쓸 영상 · 이미지를 Supabase Storage 의 공개 주소에 올린다 (그리고 다 쓴 것을 지운다).

인스타그램 API 는 파일을 직접 받지 않고 공개 주소에서 가져간다. build_manifest.py 가 만들어 둔
marketing/publish/media/<날짜>/… 를 `assets` 버킷의 social-yeahplus/<날짜>/… 로 올린다.
노티(원본은 묘해)의 것을 옮겨 왔다 — 묘해 · 노티와 같은 Supabase 프로젝트의 같은 버킷을 쓰되 폴더만 다르다.

서비스 롤 키가 필요하다 — 채팅이나 파일에 적지 말고 터미널에서만 입력한다.

사용:
  export SUPABASE_URL="https://xxxx.supabase.co"
  read -s "SUPABASE_SERVICE_ROLE?service_role 키: " && export SUPABASE_SERVICE_ROLE
  python3 marketing/social/upload_media.py --dry-run                 무엇을 올릴지만 본다
  python3 marketing/social/upload_media.py --to 2026-11-08           이 날짜까지만 올린다 (생략하면 전부)
  python3 marketing/social/upload_media.py --match video               이름에 이 글자가 들어간 파일만 (영상만 새로 올릴 때)
  python3 marketing/social/upload_media.py --delete-before 2026-11-09   이 날짜 전 폴더를 지운다 (되돌릴 수 없다)
표준 라이브러리만 쓴다.
"""
import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.request
from urllib.parse import quote

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))      # 저장소 뿌리 (frontend/)
MEDIA = os.path.join(ROOT, 'marketing', 'publish', 'media')
URL = os.environ.get('SUPABASE_URL', '').strip().rstrip('/')
KEY = os.environ.get('SUPABASE_SERVICE_ROLE', '').strip()
BUCKET = os.environ.get('SOCIAL_BUCKET', 'assets')
PREFIX = os.environ.get('SOCIAL_PREFIX', 'social-yeahplus')      # 묘해의 social/ · 노티의 social-noti/ 와 섞이지 않게
TYPES = {'.mp4': 'video/mp4', '.jpg': 'image/jpeg'}


def req(method, path, data=None, ctype=None, extra=None):
    h = {'Authorization': f'Bearer {KEY}', 'apikey': KEY, **(extra or {})}
    if ctype:
        h['Content-Type'] = ctype
    r = urllib.request.Request(URL + path, data=data, method=method, headers=h)
    try:
        with urllib.request.urlopen(r, timeout=300) as resp:
            return resp.status, resp.read()
    except urllib.error.HTTPError as e:
        return e.code, e.read()


def local_files(start, end):
    out = []
    for day in sorted(os.listdir(MEDIA)) if os.path.isdir(MEDIA) else []:
        if not re.fullmatch(r'\d{4}-\d{2}-\d{2}', day) or (start and day < start) or (end and day > end):
            continue
        for name in sorted(os.listdir(os.path.join(MEDIA, day))):
            if os.path.splitext(name)[1] in TYPES:
                out.append((f'{day}/{name}', os.path.join(MEDIA, day, name)))
    return out


def listing(prefix):
    st, body = req('POST', f'/storage/v1/object/list/{BUCKET}', json.dumps({'prefix': prefix, 'limit': 1000}).encode(), 'application/json')
    if st != 200:
        sys.exit(f'❌ 목록 조회 실패 http {st}: {body[:200]!r}')
    return json.loads(body)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('--from', dest='start', help='이 날짜부터 (YYYY-MM-DD)')
    ap.add_argument('--to', dest='end', help='이 날짜까지')
    ap.add_argument('--match', help='파일 이름에 이 글자가 들어간 것만 (예: video)')
    ap.add_argument('--delete-before', help='이 날짜 전의 폴더를 저장소에서 지운다')
    ap.add_argument('--dry-run', action='store_true')
    args = ap.parse_args()
    if not URL or not KEY:
        sys.exit('❌ SUPABASE_URL / SUPABASE_SERVICE_ROLE 환경변수를 설정하세요.')
    base = f'{URL}/storage/v1/object/public/{BUCKET}/{PREFIX}'

    if args.delete_before:
        days = [d['name'] for d in listing(PREFIX + '/') if re.fullmatch(r'\d{4}-\d{2}-\d{2}', d.get('name') or '') and d['name'] < args.delete_before]
        keys = [f'{PREFIX}/{day}/{f["name"]}' for day in days for f in listing(f'{PREFIX}/{day}/')]
        print(f"{'(dry-run) 지울 것' if args.dry_run else '지웁니다'}: {len(days)}일치 {len(keys)}개 ({', '.join(days[:3])}{' …' if len(days) > 3 else ''})")
        if keys and not args.dry_run:
            st, body = req('DELETE', f'/storage/v1/object/{BUCKET}', json.dumps({'prefixes': keys}).encode(), 'application/json')
            if st != 200:
                sys.exit(f'❌ 삭제 실패 http {st}: {body[:200]!r}')
            print(f'지웠습니다: {len(json.loads(body))}개')
        return 0

    files = [f for f in local_files(args.start, args.end) if not args.match or args.match in f[0]]
    if not files:
        sys.exit('❌ 올릴 파일이 없습니다 — python3 marketing/social/build_manifest.py 를 먼저 실행하세요.')
    total = sum(os.path.getsize(p) for _, p in files)
    print(f"{'(dry-run) 올릴 것' if args.dry_run else '올립니다'}: {len(files)}개 {total / 1e6:.0f}MB ({files[0][0][:10]} ~ {files[-1][0][:10]}) → {BUCKET}/{PREFIX}/")
    if args.dry_run:
        return 0
    fail = 0
    for i, (rel, path) in enumerate(files, 1):
        with open(path, 'rb') as fp:
            st, body = req('POST', f'/storage/v1/object/{BUCKET}/{quote(PREFIX + "/" + rel, safe="/")}', fp.read(),
                           TYPES[os.path.splitext(rel)[1]], {'x-upsert': 'true', 'cache-control': 'max-age=3600'})
        if st not in (200, 201):
            fail += 1
            print(f'  ❌ {rel}: http {st} {body[:160]!r}')
        if i % 40 == 0:
            print(f'  …{i}/{len(files)}')
    # 밖에서 정말 열리는지 한 개만 확인한다 (인스타그램도 이 주소로 가져간다)
    probe = f'{base}/{files[0][0]}'
    try:
        with urllib.request.urlopen(urllib.request.Request(probe, method='HEAD'), timeout=30) as r:
            ok = r.status == 200
    except Exception:
        ok = False
    print(f"공개 주소 확인: {'열립니다' if ok else '❌ 열리지 않습니다'} — {probe}")
    print(f'완료: {len(files) - fail}개 올림, 실패 {fail}개')
    print(f'GitHub 변수 YEAHPLUS_SOCIAL_MEDIA_BASE 에 넣을 값:\n{base}')
    return 1 if fail or not ok else 0


if __name__ == '__main__':
    sys.exit(main())
