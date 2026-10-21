#!/usr/bin/env python3
"""올릴 글의 목록을 기계가 읽는 꼴로 — 자동 게시(publish.py)의 입력. 노티의 build_manifest.py 를 예아플러스에 맞게 고쳤다.

원고의 원본은 이 저장소 밖에 있다 — YEAHPLUS_WEB/marketing/ (뉴로보카처럼 원고 · 그림은 밖에, 게시용 사본만 저장소 안에).
다른 곳에 두었으면 환경변수 YEAHPLUS_MARKETING 으로 알려 준다.

읽는 것   <원고>/CAPTIONS.md
            ### 11/4 화 12:30 · 예아플러스의 앱 02 — `carousel/W2/app-myohae-{1~6}.png` · 링크 `/meow` · 공동 @계정
            제목 줄에서 날짜 · 시각 · 시리즈 · 회차 · 그림 · 링크를 읽는다. 덧붙일 수 있는 것: `· 주제 #공부법` (Threads 주제 태그),
            `· 공동 @계정` (인스타그램 공동 게시자, 최대 3), `· 보류 까닭` (overrides.json 에서 풀어야 올라간다).
            그 아래 첫 코드 블록 = 인스타그램 캡션, 둘째 코드 블록 = Threads 글,
            (선택) `Threads 답글:` 다음 코드 블록 = Threads 첫 답글(판정 공개 · 링크). 없으면 제품 링크(utm_source=threads) 한 줄을 단다.
            릴스는 그림 자리에 `reels/x.mp4`, 커버는 덧붙여 · 커버 `reels/x.png`.
만드는 것 marketing/publish/schedule.json   (저장소에 올린다. GitHub Actions 가 읽는다)
          marketing/publish/media/<날짜>/…   올릴 파일 사본 (git 에는 올리지 않는다)
                                            인스타그램 API 는 JPEG 만 받아서 PNG 는 JPEG 로 바꾼다 (sips — 맥에서 돌린다).

채널마다 글
  인스타그램  첫 코드 블록 그대로.
  페이스북    같은 글에서 해시태그 줄을 빼고, 끝에 눌리는 링크(utm_source=facebook)와 #예아플러스 하나.
  Threads     둘째 코드 블록 + 주제 태그 하나. 그림은 표지(첫 장) 한 장. 500자 안. 본문에는 링크를 넣지 않고,
              올린 직후 첫 답글(reply_th)로 판정 · 링크를 단다(TOWER 68 의 방식).

사용:  python3 marketing/social/build_manifest.py      (저장소 뿌리 — frontend 폴더에서. 표준 라이브러리 + sips)
CAPTIONS.md 나 그림을 고쳤으면 다시 실행하고 schedule.json 을 커밋한다. 그림을 고쳤으면 upload_media.py 도 다시.
"""
import json
import os
import re
import shutil
import subprocess
import sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))      # 저장소 뿌리 (frontend/)
SRC = os.path.abspath(os.environ.get('YEAHPLUS_MARKETING') or os.path.join(ROOT, '..', 'marketing'))
OUT_DIR = os.path.join(ROOT, 'marketing', 'publish')
MEDIA = os.path.join(OUT_DIR, 'media')
YEAR, TZ = 2026, '+09:00'
SITE = 'https://yeahplus.co.kr'
FB_TAG = '#예아플러스'
# 시리즈 → (형식, utm_campaign, 기본 Threads 주제 태그)
SERIES = {
    '예아플러스의 앱': ('carousel', 'app-spotlight', '#예아플러스'),    # 화요일 — 앱 하나, 전용 계정이 있으면 `· 공동 @계정`
    '실록의 선택': ('carousel', 'sillok-choice', '#한국사'),          # 2026-10-21 회사 계정에서 내렸다(@sillok.king 과 겹친다)
    '그 말, 진짜일까?': ('carousel', 'is-it-true', '#명언'),
    '만든 이유': ('carousel', 'why-we-made', '#앱디자인'),
    '한 장면': ('reel', 'one-scene', '#예아플러스'),
}
# AI 표시(인스타그램의 "AI 정보" 라벨)를 붙일 글의 id. 지금 그림은 직접 만든 슬라이드 · 앱 화면이라 없다.
AI = set()
HEAD = re.compile(r'^(\d{1,2})/(\d{1,2}) \S (\d{1,2}):(\d{2}) · (' + '|'.join(re.escape(k) for k in SERIES) + r') (\d+)\s*—\s*(.*)$')


def stage(src_rel: str, rel: str) -> str:
    """올릴 파일을 media/ 아래에 둔다. PNG 는 JPEG 로 바꾼다. 돌려주는 값은 media/ 기준 경로."""
    src = os.path.join(SRC, src_rel)
    if not os.path.exists(src):
        sys.exit(f'❌ 파일이 없습니다: {src}')
    dst = os.path.join(MEDIA, rel)
    os.makedirs(os.path.dirname(dst), exist_ok=True)
    if src.lower().endswith('.png'):
        subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '92', src, '--out', dst], check=True, capture_output=True)
    else:
        shutil.copyfile(src, dst)
    return rel


def with_utm(link: str, source: str, campaign: str) -> str:
    url = link if link.startswith('http') else SITE + link
    return f"{url}{'&' if '?' in url else '?'}utm_source={source}&utm_medium=social&utm_campaign={campaign}"


def facebook(cap: str, link: str, campaign: str) -> str:
    lines = [l for l in cap.split('\n') if not l.strip().startswith('#')]
    body = '\n'.join(lines).rstrip()
    return f'{body}\n\n→ {with_utm(link, "facebook", campaign)}\n\n{FB_TAG}'


def main() -> int:
    path = os.path.join(SRC, 'CAPTIONS.md')
    if not os.path.exists(path):
        sys.exit(f'❌ 원고가 없습니다: {path} (다른 곳이면 YEAHPLUS_MARKETING=폴더)')
    text = open(path, encoding='utf-8').read()
    shutil.rmtree(MEDIA, ignore_errors=True)
    items = []
    for sec in re.split(r'^### ', text, flags=re.M)[1:]:
        head = sec.split('\n', 1)[0].strip()
        m = HEAD.match(head)
        if not m:
            sys.exit(f'❌ 제목 줄을 읽지 못했습니다: {head}')
        mo, d, hh, mm, series, no, rest = m.groups()
        kind, campaign, topic = SERIES[series]
        year = YEAR + 1 if int(mo) <= 6 else YEAR      # 10월에 시작한 일정이 해를 넘긴다
        date = f'{year}-{int(mo):02d}-{int(d):02d}'
        iid = f'{date}-{kind}'
        ticks = re.findall(r'`([^`]+)`', rest)
        link = re.search(r'링크 `([^`]+)`', rest)
        if not link:
            sys.exit(f'❌ {iid}: 제목 줄에 링크 `/제품` 이 없습니다')
        topic = (re.search(r'주제 (#\S+)', rest) or [None, topic])[1]
        collab = re.findall(r'@([\w.]+)', (re.search(r'공동 ([@\w., ]+)', rest) or [None, ''])[1])
        hold = (re.search(r'보류 ([^·]+)', rest) or [None, None])[1]
        item = {'id': iid, 'kind': kind, 'title': f'{series} {int(no):02d}', 'auto': True, 'ai': iid in AI,
                'requires': None, 'hold': hold.strip() if hold else None, 'at': f'{date}T{int(hh):02d}:{mm}:00{TZ}'}
        if collab:
            assert len(collab) <= 3, f'{iid}: 공동 게시자는 3명까지다'
            item['collaborators'] = collab
        if kind == 'reel':
            item['video'] = stage(ticks[0], f'{date}/video.mp4')
            cover = re.search(r'커버 `([^`]+)`', rest)
            if cover:
                item['cover'] = stage(cover.group(1), f'{date}/cover.jpg')
            else:
                item['thumb_offset_ms'] = 0
        else:
            mm_ = re.match(r'(.*)\{1~(\d+)\}(\.\w+)$', ticks[0])
            if not mm_:
                sys.exit(f'❌ {iid}: 그림은 `폴더/이름-{{1~6}}.png` 꼴로 적는다')
            pre, n, ext = mm_.group(1), int(mm_.group(2)), mm_.group(3)
            assert 2 <= n <= 10, f'{iid}: 인스타그램 API 의 캐러셀은 2~10장이다'
            item['images'] = [stage(f'{pre}{i}{ext}', f'{date}/{i}.jpg') for i in range(1, n + 1)]
            item['images_th'] = item['images'][:1]      # Threads 는 표지 한 장
        blocks = re.findall(r'```\n(.*?)\n```', sec, flags=re.S)
        if len(blocks) < 2:
            sys.exit(f'❌ {head}: 코드 블록이 둘(인스타그램 캡션 · Threads 글) 있어야 한다')
        cap, th = blocks[0].strip(), blocks[1].strip()
        reply = re.search(r'^Threads 답글:\s*\n+```\n(.*?)\n```', sec, flags=re.S | re.M)
        item['reply_th'] = reply.group(1).strip() if reply else f'→ {with_utm(link.group(1), "threads", campaign)}'
        assert len(item['reply_th']) <= 500, f"{iid}: Threads 답글이 500자를 넘는다 ({len(item['reply_th'])}자)"
        assert 'http' not in th, f'{iid}: Threads 본문에는 링크를 넣지 않는다 — 링크는 답글로'
        assert len(cap) <= 2200 and cap.count('#') <= 30, f'{iid}: 캡션이 인스타그램 한도를 넘는다'
        item['caption_ig'] = cap
        item['caption_fb'] = facebook(cap, link.group(1), campaign)
        item['caption_th'] = f'{th}\n\n{topic}'
        assert len(item['caption_th']) <= 500, f"{iid}: Threads 글이 500자를 넘는다 ({len(item['caption_th'])}자)"
        items.append(item)

    if not items:
        sys.exit('❌ 원고에 글이 없습니다')
    items.sort(key=lambda x: x['at'])
    ids = [i['id'] for i in items]
    assert len(ids) == len(set(ids)), f'같은 날 같은 형식이 두 번 있다: {sorted(x for x in ids if ids.count(x) > 1)}'
    # 인스타그램 · Threads 는 이미 올린 글인지를 첫 줄로 알아본다 → 첫 줄이 같은 글이 있으면 뒤의 글이 올라가지 않는다
    for key in ('caption_ig', 'caption_th'):
        heads = [i[key].split('\n')[0].strip() for i in items]
        dup = sorted({h for h in heads if heads.count(h) > 1})
        if dup:
            sys.exit(f'❌ {key} 첫 줄이 같은 글이 있습니다 — 하나를 고쳐 주세요: {dup}')
    os.makedirs(OUT_DIR, exist_ok=True)
    with open(os.path.join(OUT_DIR, 'schedule.json'), 'w', encoding='utf-8') as fp:
        json.dump({'tz': TZ, 'items': items}, fp, ensure_ascii=False, indent=1)
        fp.write('\n')
    over = os.path.join(OUT_DIR, 'overrides.json')
    if not os.path.exists(over):
        with open(over, 'w', encoding='utf-8') as fp:
            json.dump({'_help': '글 id 별로 schedule.json 의 값을 덮어쓴다. 예) "2026-10-28-carousel": {"skip": true} 는 건너뛰고(손으로 이미 올렸거나 Business Suite 에 예약해 둔 글), '
                                '{"hold": null} 은 보류를 풀고, {"at": "2026-10-28T13:00:00+09:00"} 은 시각을 옮긴다. build_manifest.py 를 다시 돌려도 이 파일은 남는다.'},
                      fp, ensure_ascii=False, indent=1)
            fp.write('\n')

    size = sum(os.path.getsize(os.path.join(d, f)) for d, _, fs in os.walk(MEDIA) for f in fs)
    by = {}
    for i in items:
        k = i['title'].rsplit(' ', 1)[0]
        by[k] = by.get(k, 0) + 1
    print(f"{len(items)}건 ({', '.join(f'{k} {v}' for k, v in by.items())}) · 보류 {sum(1 for i in items if i['hold'])}건")
    print(f'{items[0]["at"][:10]} ~ {items[-1]["at"][:10]} · 올릴 파일 {size / 1e6:.1f}MB → {os.path.relpath(MEDIA, ROOT)}/')
    return 0


if __name__ == '__main__':
    sys.exit(main())
