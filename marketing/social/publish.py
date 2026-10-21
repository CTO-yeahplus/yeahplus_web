#!/usr/bin/env python3
"""예아플러스 — 인스타그램 · 페이스북 · Threads 자동 게시. 일정 목록(marketing/publish/schedule.json)대로 Meta Graph API 를 부른다.
노티(GAMEAPP 저장소 noti/tools/social/publish.py — 원본은 묘해, Threads 는 페이스루틴)의 것을 옮겨 왔다(2026-10-21).
노티와 다른 점: Threads 에는 따로 쓴 글(caption_th)과 표지 한 장(images_th)이 올라가고, 바로 이어서 내 글에 첫 답글(reply_th —
판정 공개 · 링크)을 단다(TOWER 68 의 방식, 2026-10-21). 인스타그램 공동 게시자(collaborators)를 넣을 수 있다.

    인스타그램  Business Suite 화면에서는 예약이 되지만 API 에는 예약이 없다(POST /{ig-user}/media 의 매개변수에 없다).
                게시 시각이 되면(이 스크립트가 그때 실행되면) 바로 게시한다.
    페이스북    며칠 앞까지 미리 "예약"으로 넣는다 → Business Suite 플래너에 보인다. 시각이 이미 됐으면 바로 게시한다.
                caption_fb(링크가 들어간 판)가 올라간다. video_fb 가 있으면 그 영상을, 없으면 인스타그램과 같은 영상을 쓴다.
    Threads     인스타그램처럼 API 에 예약이 없어 게시 시각에 바로 올린다(Threads API — graph.threads.net).
                caption_th(Threads 에 맞춰 따로 쓴 글, 주제 태그 하나)와 images_th(보통 표지 한 장)가 올라간다.
                본문을 올린 뒤 첫 답글(reply_th)을 단다. 답글만 실패하면 본문은 그대로 두고 실패로 알린다(답글만 손으로).
                THREADS_ACCESS_TOKEN 이 있을 때만(없으면 조용히 건너뛴다).
    스토리      스티커를 붙일 수 없어 올리지 않는다(손으로).

안전장치
    SOCIAL_PUBLISH_ENABLED=true 가 아니면 아무것도 올리지 않고 무엇을 할지만 적는다(미리보기).
    requires 가 붙은 글(출시 뒤에 올릴 글)은 APP_RELEASED=true 일 때만, hold 가 붙은 글은 overrides.json 에서 풀어야 올린다.
    한 번 올린 글은 상태 파일에 적어 다시 올리지 않는다. 인스타그램은 최근 글의 캡션 첫 줄로 한 번 더 확인한다.
    게시 시각에서 3시간이 지나도록 못 올린 글은 올리지 않고 "놓침"으로 보고한다(실행은 실패로 끝난다 → GitHub 가 메일을 보낸다).
    자동 게시를 처음 켜기 전에 시각이 지난 글, 꺼져 있는 동안의 글은 실패로 치지 않는다.

환경변수
    META_ACCESS_TOKEN       만료 없는 페이지 토큰(권장 — `token` 명령으로 만든다). 사용자 · 시스템 사용자 토큰도 된다.
    META_PAGE_ID            페이지가 여러 개일 때만
    SOCIAL_MEDIA_BASE       올려 둔 파일의 공개 주소 앞부분 (…/storage/v1/object/public/assets/social-yeahplus)
    SOCIAL_PUBLISH_ENABLED  true 일 때만 실제로 올린다
    APP_RELEASED            true 면 출시가 필요한 글도 올린다
    FB_SCHEDULE_DAYS        페이스북에 며칠 앞까지 예약을 넣을지 (기본 7, 최대 25)
    SOCIAL_CHANNELS         스크립트가 맡을 채널 (기본 ig,fb,th — th 는 토큰이 있을 때만). 하나를 빼려면 예: ig,fb
    THREADS_ACCESS_TOKEN    Threads 장기 토큰(60일 — 만료 전에 `th-refresh` 로 늘린다). Meta 앱 ▸ Threads 쓰임새 ▸ 설정 ▸ User Token Generator

사용
    python3 marketing/social/publish.py token               짧은 사용자 토큰 → 만료 없는 페이지 토큰 (클립보드로)
    python3 marketing/social/publish.py whoami              토큰 · 페이지 · 인스타그램 계정 확인 (읽기만)
    python3 marketing/social/publish.py plan                앞으로 2주 일정과 지금 상태
    python3 marketing/social/publish.py run --state state.json
    python3 marketing/social/publish.py run --only 2026-10-28-carousel --channel ig   한 건만, 지금 바로 (시험용)
    python3 marketing/social/publish.py th-refresh          Threads 토큰을 60일 더 늘린다 (새 토큰은 클립보드로)
    python3 marketing/social/publish.py th-refresh --out F  같은 일을 하고 새 토큰을 파일 F 에만 쓴다 (GitHub Actions 의 자동 갱신용)
(저장소 뿌리 — frontend 폴더에서 실행한다. GitHub Actions 에서는 .github/workflows/yeahplus-social.yml 이 부른다.)
표준 라이브러리만 쓴다.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))      # 저장소 뿌리 (frontend/)
PUB = os.path.join(ROOT, 'marketing', 'publish')
GRAPH = os.environ.get('META_GRAPH_URL', 'https://graph.facebook.com').rstrip('/')
RUPLOAD = os.environ.get('META_RUPLOAD_URL', 'https://rupload.facebook.com').rstrip('/')
TOKEN = os.environ.get('META_ACCESS_TOKEN', '').strip()
THREADS = os.environ.get('THREADS_GRAPH_URL', 'https://graph.threads.net/v1.0').rstrip('/')
TH_TOKEN = os.environ.get('THREADS_ACCESS_TOKEN', '').strip()
TH_TAG = '#예아플러스'      # caption_th 가 없을 때만 쓴다. Threads 는 글마다 주제 태그 하나
# 첫 답글을 달려면 Meta 앱의 Threads 권한에 threads_manage_replies 가 있어야 한다 — 없으면 403 (code 10) (TOWER 68, 2026-10-20 실측)
# 본문을 게시한 직후에는 답글이 거절될 수 있다(본문이 아직 준비 중) → 기다렸다가 몇 번 더 시도한다
TH_REPLY_WAIT = float(os.environ.get('THREADS_REPLY_WAIT', '20'))
TH_REPLY_TRIES = 4
# 컨테이너를 만들고 곧바로 게시하면 "The requested resource does not exist (code 24, subcode 4279009)" 이 날 수 있다
# (TOWER 68, 2026-10-21 실측 — 상태가 FINISHED 여도). Meta 는 만들고 나서 평균 30초 기다리라고 한다 → 기다렸다가 몇 번 더
TH_PUBLISH_WAIT = float(os.environ.get('THREADS_PUBLISH_WAIT', '10'))
TH_PUBLISH_TRIES = 6
MEDIA_BASE = os.environ.get('SOCIAL_MEDIA_BASE', '').strip().rstrip('/')
ENABLED = os.environ.get('SOCIAL_PUBLISH_ENABLED', '').strip().lower() == 'true'
RELEASED = os.environ.get('APP_RELEASED', '').strip().lower() == 'true'
FB_DAYS = min(25, max(0, int(os.environ.get('FB_SCHEDULE_DAYS', '7') or 7)))
# 스크립트가 맡을 채널. 인스타그램을 Business Suite 에서 직접 예약한다면 fb 만 남긴다.
CHANNELS_SET = bool(os.environ.get('SOCIAL_CHANNELS', '').strip())   # 변수로 일부러 고른 것인지(경고를 낼지)
CHANNELS = {c.strip() for c in (os.environ.get('SOCIAL_CHANNELS', '') or 'ig,fb,th').split(',') if c.strip()}
NAMES = {'ig': '인스타그램', 'fb': '페이스북', 'th': 'Threads'}
GRACE = dt.timedelta(hours=3)            # 게시 시각에서 이만큼 지나면 올리지 않는다
STALE = dt.timedelta(days=1)             # 이보다 오래 지난 글은 실패로 치지 않고 조용히 넘긴다
FB_MIN_AHEAD = dt.timedelta(minutes=20)  # 페이스북 예약은 10분 뒤부터 된다. 여유를 둔다
POLL_SEC = float(os.environ.get('META_POLL_SEC', '15'))


NEED = ['pages_show_list', 'pages_read_engagement', 'pages_manage_posts', 'instagram_basic', 'instagram_content_publish']


class ApiError(Exception):
    pass


def api(method: str, path: str, params: dict | None = None, token: str | None = None,
        base: str = GRAPH, headers: dict | None = None) -> dict:
    p = {k: (json.dumps(v, ensure_ascii=False) if isinstance(v, (dict, list)) else
             ('true' if v is True else 'false' if v is False else str(v)))
         for k, v in (params or {}).items() if v is not None}
    if token and not headers:
        p['access_token'] = token
    url = f'{base}/{path.lstrip("/")}'
    data = None
    if method == 'GET':
        url += ('?' + urllib.parse.urlencode(p)) if p else ''
    else:
        data = urllib.parse.urlencode(p).encode()
    req = urllib.request.Request(url, data=data, method=method, headers=headers or {})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.loads(r.read() or b'{}')
    except urllib.error.HTTPError as e:
        body = e.read().decode('utf-8', 'ignore')
        try:
            err = json.loads(body).get('error', {})
            msg = f"{err.get('message', body[:200])} (code {err.get('code')}, subcode {err.get('error_subcode')})"
        except Exception:
            msg = body[:300]
        raise ApiError(f'{method} {path}: http {e.code} — {msg}') from None
    except urllib.error.URLError as e:
        raise ApiError(f'{method} {path}: {e.reason}') from None


def account() -> dict:
    """토큰으로 페이지와 인스타그램 계정을 찾는다 → {page_id, page_name, page_token, ig_id, ig_username}"""
    if not TOKEN:
        raise ApiError('META_ACCESS_TOKEN 이 없습니다.')
    want = os.environ.get('META_PAGE_ID', '').strip()
    fields = 'name,access_token,instagram_business_account{id,username}'
    # 페이지 토큰이면 /me 가 곧 그 페이지다 (사용자 토큰이면 이 필드가 없어 오류가 난다 → 아래로)
    try:
        me = api('GET', 'me', {'fields': 'id,name,instagram_business_account{id,username}'}, TOKEN)
        ig = me.get('instagram_business_account') or {}
        return {'page_id': me['id'], 'page_name': me.get('name'), 'page_token': TOKEN,
                'ig_id': ig.get('id'), 'ig_username': ig.get('username'), 'token_kind': 'page'}
    except ApiError:
        pass
    if want:
        pages = [api('GET', want, {'fields': fields}, TOKEN) | {'id': want}]
    else:
        pages = api('GET', 'me/accounts', {'fields': fields, 'limit': 50}, TOKEN).get('data', [])
    if len(pages) != 1:
        raise ApiError(f'페이지가 {len(pages)}개입니다 — META_PAGE_ID 로 하나를 정하세요: '
                       + ', '.join(f"{p.get('name')}({p.get('id')})" for p in pages))
    p = pages[0]
    ig = p.get('instagram_business_account') or {}
    if not p.get('access_token'):
        raise ApiError('페이지 토큰을 받지 못했습니다 — 토큰에 pages_manage_posts · pages_read_engagement 권한이 있는지 확인하세요.')
    return {'page_id': p['id'], 'page_name': p.get('name'), 'page_token': p['access_token'],
            'ig_id': ig.get('id'), 'ig_username': ig.get('username'), 'token_kind': 'user'}


def url_of(rel: str) -> str:
    if not MEDIA_BASE:
        raise ApiError('SOCIAL_MEDIA_BASE 가 없습니다.')
    return f'{MEDIA_BASE}/{rel}'


def first_line(caption: str) -> str:
    return caption.strip().split('\n', 1)[0].strip()


# ── 인스타그램 ────────────────────────────────────────────────────────────────

def ig_wait(container: str, token: str, tries: int = 24) -> None:
    """컨테이너가 준비될 때까지 기다린다(영상은 처리 시간이 걸린다)."""
    for _ in range(tries):
        st = api('GET', container, {'fields': 'status_code,status'}, token)
        code = st.get('status_code')
        if code in ('FINISHED', 'PUBLISHED'):
            return
        if code in ('ERROR', 'EXPIRED'):
            raise ApiError(f"컨테이너 {container} 처리 실패: {st.get('status') or code}")
        time.sleep(POLL_SEC)
    raise ApiError(f'컨테이너 {container} 가 시간 안에 준비되지 않았습니다.')


def ig_already_posted(acc: dict, caption: str) -> str | None:
    recent = api('GET', f"{acc['ig_id']}/media", {'fields': 'caption,timestamp', 'limit': 20}, acc['page_token']).get('data', [])
    head = first_line(caption)
    return next((m['id'] for m in recent if first_line(m.get('caption') or '') == head), None)


def ig_publish(item: dict, acc: dict) -> str:
    ig, tok = acc['ig_id'], acc['page_token']
    if not ig:
        raise ApiError('페이지에 연결된 인스타그램 비즈니스 계정이 없습니다.')
    dup = ig_already_posted(acc, item['caption_ig'])
    if dup:
        return dup
    ai = True if item.get('ai') else None
    if item['kind'] == 'reel':
        params = {'media_type': 'REELS', 'video_url': url_of(item['video']), 'caption': item['caption_ig'],
                  'share_to_feed': True, 'is_ai_generated': ai}
        if item.get('cover'):
            params['cover_url'] = url_of(item['cover'])
        elif item.get('thumb_offset_ms'):
            params['thumb_offset'] = item['thumb_offset_ms']
        container = api('POST', f'{ig}/media', params, tok)['id']
    else:
        children = [api('POST', f'{ig}/media', {'image_url': url_of(rel), 'is_carousel_item': True}, tok)['id']
                    for rel in item['images']]
        container = api('POST', f'{ig}/media', {'media_type': 'CAROUSEL', 'children': ','.join(children),
                                               'caption': item['caption_ig'], 'is_ai_generated': ai,
                                               'collaborators': item.get('collaborators') or None}, tok)['id']
    ig_wait(container, tok)
    return api('POST', f'{ig}/media_publish', {'creation_id': container}, tok)['id']


# ── 페이스북 ──────────────────────────────────────────────────────────────────

def fb_publish(item: dict, acc: dict, when: dt.datetime | None) -> str:
    """when 이 있으면 그 시각으로 예약, 없으면 바로 게시."""
    page, tok = acc['page_id'], acc['page_token']
    ts = int(when.timestamp()) if when else None
    if item['kind'] == 'reel':
        vid = api('POST', f'{page}/video_reels', {'upload_phase': 'start'}, tok)['video_id']
        api('POST', f'video-upload/{vid}', base=RUPLOAD,
            headers={'Authorization': f'OAuth {tok}', 'file_url': url_of(item.get('video_fb') or item['video'])})
        api('POST', f'{page}/video_reels', {'upload_phase': 'finish', 'video_id': vid, 'description': item['caption_fb'],
                                            'video_state': 'SCHEDULED' if ts else 'PUBLISHED',
                                            'scheduled_publish_time': ts}, tok)
        return vid
    photos = [api('POST', f'{page}/photos', {'url': url_of(rel), 'published': False, 'temporary': True if ts else None}, tok)['id']
              for rel in item['images']]
    params = {'message': item['caption_fb']}
    for i, pid in enumerate(photos):
        params[f'attached_media[{i}]'] = {'media_fbid': pid}
    if ts:
        params |= {'published': False, 'scheduled_publish_time': ts, 'unpublished_content_type': 'SCHEDULED'}
    return api('POST', f'{page}/feed', params, tok)['id']


# ── Threads ───────────────────────────────────────────────────────────────────

def th_caption(item: dict) -> str:
    """schedule.json 에 caption_th 가 없을 때(예전 일정) 인스타그램 캡션으로 만든다 — build_manifest.py 와 같은 규칙."""
    if item.get('caption_th'):
        return item['caption_th']
    lines = [l for l in item['caption_ig'].split('\n') if not l.strip().startswith('#')]
    return f"{chr(10).join(lines).rstrip()}\n\n{TH_TAG}"[:500]


def th_me() -> dict:
    if not TH_TOKEN:
        raise ApiError('THREADS_ACCESS_TOKEN 이 없습니다.')
    return api('GET', 'me', {'fields': 'id,username'}, TH_TOKEN, base=THREADS)


def th_wait(container: str, tries: int = 24) -> None:
    for _ in range(tries):
        st = api('GET', container, {'fields': 'status,error_message'}, TH_TOKEN, base=THREADS)
        code = st.get('status')
        if code in ('FINISHED', 'PUBLISHED'):
            return
        if code in ('ERROR', 'EXPIRED'):
            raise ApiError(f"Threads 컨테이너 {container} 처리 실패: {st.get('error_message') or code}")
        time.sleep(POLL_SEC)
    raise ApiError(f'Threads 컨테이너 {container} 가 시간 안에 준비되지 않았습니다.')


def th_post(uid: str, params: dict) -> str:
    """컨테이너를 만들고(또는 이미 만든 묶음 컨테이너를 받아) 준비되면 게시한다 → 게시물 id."""
    container = params.pop('_container', None) or api('POST', f'{uid}/threads', params, TH_TOKEN, base=THREADS)['id']
    th_wait(container)
    for n in range(TH_PUBLISH_TRIES):
        time.sleep(TH_PUBLISH_WAIT)
        try:
            return api('POST', f'{uid}/threads_publish', {'creation_id': container}, TH_TOKEN, base=THREADS)['id']
        except ApiError as e:
            if '4279009' not in str(e) or n == TH_PUBLISH_TRIES - 1:
                raise
    raise ApiError('Threads 게시 재시도가 끝났습니다.')


def th_publish(item: dict, me: dict) -> tuple:
    """본문을 올리고 첫 답글(reply_th)을 단다 → (본문 id, 답글 id · 'unchecked' · None, 답글 오류 또는 None).
    이미 올라가 있으면(최근 글의 첫 줄이 같으면) 그 id 와 'unchecked' 를 돌려주고 답글은 달지 않는다."""
    uid, text = me['id'], th_caption(item)
    recent = api('GET', 'me/threads', {'fields': 'id,text', 'limit': 20}, TH_TOKEN, base=THREADS).get('data', [])
    dup = next((m['id'] for m in recent if first_line(m.get('text') or '') == first_line(text)), None)
    if dup:
        return dup, ('unchecked' if item.get('reply_th') else None), None
    if item['kind'] == 'reel':
        pid = th_post(uid, {'media_type': 'VIDEO', 'video_url': url_of(item['video']), 'text': text})
    elif len(item.get('images_th') or []) == 1:
        # 예아플러스: Threads 에는 표지 한 장과 따로 쓴 글. 슬라이드를 그대로 옮기면 광고처럼 읽힌다
        pid = th_post(uid, {'media_type': 'IMAGE', 'image_url': url_of(item['images_th'][0]), 'text': text})
    else:
        kids = [api('POST', f'{uid}/threads', {'media_type': 'IMAGE', 'image_url': url_of(rel), 'is_carousel_item': True},
                    TH_TOKEN, base=THREADS)['id'] for rel in (item.get('images_th') or item['images'])]
        for k in kids:
            th_wait(k)
        parent = api('POST', f'{uid}/threads', {'media_type': 'CAROUSEL', 'children': ','.join(kids), 'text': text},
                     TH_TOKEN, base=THREADS)['id']
        pid = th_post(uid, {'_container': parent})
    if not item.get('reply_th'):
        return pid, None, None
    errors = []
    for _ in range(TH_REPLY_TRIES):
        time.sleep(TH_REPLY_WAIT)
        try:
            return pid, th_post(uid, {'media_type': 'TEXT', 'text': item['reply_th'], 'reply_to_id': pid}), None
        except ApiError as e:
            errors.append(str(e))
            if 'code 10,' in str(e) or 'http 403' in str(e):
                break                      # 권한 문제는 기다려도 풀리지 않는다
    return pid, None, f'{len(errors)}번 시도 — ' + ' / '.join(dict.fromkeys(errors))


# ── 일정 ──────────────────────────────────────────────────────────────────────

def load_items() -> list:
    data = json.load(open(os.path.join(PUB, 'schedule.json'), encoding='utf-8'))
    over_path = os.path.join(PUB, 'overrides.json')
    over = json.load(open(over_path, encoding='utf-8')) if os.path.exists(over_path) else {}
    items = []
    for it in data['items']:
        it = {**it, **{k: v for k, v in over.get(it['id'], {}).items() if not k.startswith('_')}}
        it['when'] = dt.datetime.fromisoformat(it['at'])
        items.append(it)
    return sorted(items, key=lambda x: x['when'])


def blocked(it: dict) -> str | None:
    if not it.get('auto'):
        return '손으로 올린다'
    if it.get('skip'):
        return '건너뜀 (overrides)'
    if it.get('hold'):
        return f"보류: {it['hold']}"
    if it.get('requires') and not RELEASED:
        return f"{it['requires']} 출시 확인 전 (APP_RELEASED)"
    return None


def status_line(items: list) -> str:
    """머리말. 출시 확인은 그 조건이 붙은 글이 있을 때만 적는다."""
    s = f"자동 게시 {'켜짐' if ENABLED else '꺼짐(미리보기)'}"
    if any(i.get('requires') for i in items):
        s += f" · 출시 확인 {'됨' if RELEASED else '안 됨'}"
    return s


def decide(it: dict, st: dict, now: dt.datetime, force: bool) -> tuple:
    """(인스타그램, 페이스북, Threads 에 할 일) — None · 'publish' · 'schedule' · 'missed'"""
    late = now - it['when']
    ig = fb = th = None
    at_time = 'publish' if force or dt.timedelta(0) <= late <= GRACE else ('missed' if late > GRACE else None)
    if 'ig' not in st:
        ig = at_time
    if 'th' not in st:
        th = at_time       # Threads 도 예약이 없어 그 시각에 올린다
    if 'fb' not in st:
        ahead = it['when'] - now
        if force or dt.timedelta(0) <= late <= GRACE:
            fb = 'publish'
        elif late > GRACE:
            fb = 'missed'
        elif FB_MIN_AHEAD <= ahead <= dt.timedelta(days=FB_DAYS):
            fb = 'schedule'
    return ig, fb, th


def run(state_path: str | None, only: str | None, now: dt.datetime, channel: str | None = None) -> int:
    state = json.load(open(state_path, encoding='utf-8')) if state_path and os.path.exists(state_path) else {}
    items = load_items()
    if only:
        items = [i for i in items if i['id'] == only]
        if not items:
            print(f'❌ 그런 id 가 없습니다: {only}')
            return 1
    lines, failed, acc, old = [], False, None, set()
    th_me_ = None
    if CHANNELS_SET and 'th' in CHANNELS and not TH_TOKEN and ENABLED:
        lines.append('⚠️  SOCIAL_CHANNELS 에 th 가 있지만 THREADS_ACCESS_TOKEN 이 없어 Threads 는 건너뜁니다')
    # 자동 게시를 처음 켠 시각. 그 전에 게시 시각이 지난 글은 이 스크립트의 일이 아니다(손으로 올렸을 것이다).
    if ENABLED and not only and '_enabled_at' not in state:
        state['_enabled_at'] = now.isoformat(timespec='seconds')
    enabled_at = dt.datetime.fromisoformat(state['_enabled_at']) if '_enabled_at' in state else now
    # Threads 는 나중에 붙인 채널이다 — 처음 켠 시각을 따로 적어, 그 전에 지나간 글은 Threads 에서 "놓침"으로 치지 않는다
    if ENABLED and not only and 'th' in CHANNELS and TH_TOKEN and '_th_enabled_at' not in state:
        state['_th_enabled_at'] = now.isoformat(timespec='seconds')
    th_since = dt.datetime.fromisoformat(state['_th_enabled_at']) if '_th_enabled_at' in state else now

    def save():
        if state_path:
            with open(state_path, 'w', encoding='utf-8') as fp:
                json.dump(state, fp, ensure_ascii=False, indent=1)

    for it in items:
        st = state.setdefault(it['id'], {})
        why = blocked(it)
        ig, fb, th = decide(it, st, now, force=bool(only))
        if 'th' not in CHANNELS or not TH_TOKEN:
            th = None
        if not (ig or fb or th):
            if not st:
                state.pop(it['id'])
            continue
        label = f"{it['at'][5:16].replace('T', ' ')} {it['title']}"
        if why:
            # 게시 시각이 된 글만, 이틀 동안만 알린다 (보류가 풀리지 않은 채 지나간 글을 계속 적지 않는다)
            if ('missed' in (ig, fb, th) or 'publish' in (ig, fb, th)) and now - it['when'] <= dt.timedelta(days=2):
                lines.append(f'⏸  {label} — {why}')
            if not st:
                state.pop(it['id'])
            continue
        for ch, todo in (('ig', ig), ('fb', fb), ('th', th)):
            if not todo or ch not in CHANNELS or (channel and ch != channel):
                continue
            name = NAMES[ch]
            if todo == 'missed' and not ENABLED:
                continue          # 꺼져 있을 때는 지나간 글을 적지도, 실패로 치지도 않는다
            since = max(enabled_at, th_since) if ch == 'th' else enabled_at
            if todo == 'missed' and (it['when'] < since or now - it['when'] > STALE):
                st[ch] = {'skipped': 'old'}
                old.add(it['id'])
                continue
            if todo == 'missed':
                st[ch] = {'missed': now.isoformat(timespec='seconds')}
                lines.append(f'❌ {label} — {name}: 게시 시각에서 3시간이 지나 올리지 않았습니다 (손으로 올려 주세요)')
                failed = True
                continue
            verb = '예약' if todo == 'schedule' else '게시'
            if not ENABLED:
                lines.append(f'·  {label} — {name} {verb} (미리보기: 올리지 않음)')
                continue
            try:
                if ch == 'th':
                    th_me_ = th_me_ or th_me()
                    rid, reply, err = th_publish(it, th_me_)
                    st[ch] = {'id': rid, 'done': now.isoformat(timespec='seconds'), 'how': todo, 'reply': reply}
                    lines.append(f'✅ {label} — {name} {verb} ({rid})')
                    if reply == 'unchecked':
                        lines.append('   이미 올라가 있던 글입니다 — 첫 답글이 달려 있는지 Threads 에서 확인해 주세요')
                    elif reply:
                        lines.append(f'   첫 답글: {reply}')
                    elif err:
                        lines.append(f'   ❌ 첫 답글을 달지 못했습니다 — 본문은 올라갔습니다. 답글만 손으로 달아 주세요: {err}')
                        failed = True
                    save()
                    continue
                else:
                    acc = acc or account()
                    rid = ig_publish(it, acc) if ch == 'ig' else fb_publish(it, acc, it['when'] if todo == 'schedule' else None)
                st[ch] = {'id': rid, 'done': now.isoformat(timespec='seconds'), 'how': todo}
                lines.append(f'✅ {label} — {name} {verb} ({rid})')
            except ApiError as e:
                lines.append(f'❌ {label} — {name} {verb} 실패: {e}')
                failed = True
            save()
        if not st:
            state.pop(it['id'])
    save()
    if old:
        lines.append(f'·  지나간 글 {len(old)}건은 넘겼습니다 (자동 게시를 켜기 전이거나 하루 넘게 지난 글)')
    head = f"{status_line(items)} · {now.strftime('%m/%d %H:%M %Z')}"
    out = '\n'.join([head] + (lines or ['할 일이 없습니다.']))
    print(out)
    summary = os.environ.get('GITHUB_STEP_SUMMARY')
    if summary:
        with open(summary, 'a', encoding='utf-8') as fp:
            fp.write('### 예아플러스 소셜 게시\n\n```\n' + out + '\n```\n')
    return 1 if failed else 0


def plan(state_path: str | None, now: dt.datetime, days: int) -> int:
    state = json.load(open(state_path, encoding='utf-8')) if state_path and os.path.exists(state_path) else {}
    items = load_items()
    print(status_line(items))
    for it in items:
        if not (now - dt.timedelta(days=2) <= it['when'] <= now + dt.timedelta(days=days)):
            continue
        st = state.get(it['id'], {})
        done = ' '.join(f"{k}:{'놓침' if 'missed' in v else '넘김' if 'skipped' in v else v.get('how')}" for k, v in st.items())
        print(f"{it['at'][5:16].replace('T', ' ')}  {it['kind']:8} {it['title'][:34]:34}  {blocked(it) or done or '대기'}")
    return 0


def whoami() -> int:
    try:
        acc = account()
        print(f"페이지: {acc['page_name']} ({acc['page_id']})")
        print(f"인스타그램: @{acc['ig_username']} ({acc['ig_id']})" if acc['ig_id'] else '인스타그램: 연결된 비즈니스 계정이 없습니다')
        print(f"토큰 종류: {'페이지 토큰' if acc['token_kind'] == 'page' else '사용자 · 시스템 사용자 토큰'}")
        ok = bool(acc['ig_id'])
        if acc['token_kind'] == 'user':
            perms = api('GET', 'me/permissions', token=TOKEN).get('data', [])
            have = {p['permission'] for p in perms if p.get('status') == 'granted'}
            for n in NEED:
                print(f"  {'✅' if n in have else '❌'} {n}")
            ok = ok and all(n in have for n in NEED)
        if acc['ig_id']:
            # 인스타그램에 쓸 수 있는 토큰이면 이 조회가 된다(게시 권한이 없으면 여기서 오류가 난다)
            lim = api('GET', f"{acc['ig_id']}/content_publishing_limit", {'fields': 'quota_usage,config'}, acc['page_token']).get('data', [{}])[0]
            print(f"인스타그램 24시간 게시 수: {lim.get('quota_usage')} / {(lim.get('config') or {}).get('quota_total')}")
        if TH_TOKEN:
            me = th_me()
            q = api('GET', f"{me['id']}/threads_publishing_limit", {'fields': 'quota_usage,config'}, TH_TOKEN, base=THREADS).get('data', [{}])[0]
            print(f"Threads: @{me.get('username')} ({me['id']}) · 24시간 게시 수 {q.get('quota_usage')} / {(q.get('config') or {}).get('quota_total')}")
        else:
            print('Threads: 토큰 없음 (THREADS_ACCESS_TOKEN)')
        return 0 if ok else 1
    except ApiError as e:
        print(f'❌ {e}')
        return 1


def make_token(show: bool) -> int:
    """짧은 사용자 토큰 → 만료 없는 페이지 토큰. 결과는 화면에 찍지 않고 클립보드에 넣는다(맥).

    환경변수: META_APP_ID, META_APP_SECRET, META_USER_TOKEN (그래프 API 탐색기에서 받은 사용자 토큰)
    """
    app_id, secret, user = (os.environ.get(k, '').strip() for k in ('META_APP_ID', 'META_APP_SECRET', 'META_USER_TOKEN'))
    if not (app_id and secret and user):
        print('❌ META_APP_ID · META_APP_SECRET · META_USER_TOKEN 을 환경변수로 넣어 주세요.')
        return 1
    try:
        long_user = api('GET', 'oauth/access_token', {'grant_type': 'fb_exchange_token', 'client_id': app_id,
                                                      'client_secret': secret, 'fb_exchange_token': user})['access_token']
        want = os.environ.get('META_PAGE_ID', '').strip()
        pages = api('GET', 'me/accounts', {'fields': 'name,access_token,instagram_business_account{id,username}', 'limit': 50}, long_user).get('data', [])
        pages = [p for p in pages if not want or p['id'] == want]
        if len(pages) != 1:
            print(f'❌ 페이지가 {len(pages)}개입니다 — META_PAGE_ID 로 하나를 정하세요: ' + ', '.join(f"{p.get('name')}({p.get('id')})" for p in pages))
            return 1
        page = pages[0]
        info = api('GET', 'debug_token', {'input_token': page['access_token']}, f'{app_id}|{secret}').get('data', {})
    except ApiError as e:
        print(f'❌ {e}')
        return 1
    ig = page.get('instagram_business_account') or {}
    exp = info.get('expires_at')
    print(f"페이지: {page.get('name')} ({page['id']})")
    print(f"인스타그램: @{ig.get('username')} ({ig.get('id')})" if ig else '인스타그램: 연결된 비즈니스 계정이 없습니다')
    print('만료: ' + ('없음' if not exp else dt.datetime.fromtimestamp(exp).strftime('%Y-%m-%d')))
    scopes = set(info.get('scopes') or [])
    for n in NEED:
        print(f"  {'✅' if n in scopes else '❌'} {n}")
    if show:
        print(page['access_token'])
    else:
        try:
            import subprocess
            subprocess.run(['pbcopy'], input=page['access_token'].encode(), check=True)
            print('페이지 토큰을 클립보드에 넣었습니다 → GitHub 의 YEAHPLUS_META_ACCESS_TOKEN 칸에 붙여넣으세요. (화면에는 찍지 않았습니다)')
        except Exception:
            print('❌ 클립보드에 넣지 못했습니다 — 맥이 아니면 --print 로 다시 실행하세요.')
            return 1
    return 0 if ig and all(n in scopes for n in NEED) else 1


def th_refresh(show: bool, out: str | None = None) -> int:
    """Threads 장기 토큰을 60일 더 늘린다(발급 24시간 뒤부터, 만료 전까지). 새 토큰은 클립보드로(out 이 있으면 그 파일에만)."""
    if not TH_TOKEN:
        print('❌ THREADS_ACCESS_TOKEN 을 환경변수로 넣어 주세요.')
        return 1
    try:
        r = api('GET', 'refresh_access_token', {'grant_type': 'th_refresh_token'}, TH_TOKEN, base=THREADS.rsplit('/v', 1)[0])
    except ApiError as e:
        print(f'❌ {e}')
        return 1
    new = r.get('access_token', '')
    days = int(r.get('expires_in', 0)) // 86400
    # 새 토큰으로 계정이 읽히는지 먼저 본다 — 엉뚱한 값을 비밀 값에 넣으면 다음 게시부터 Threads 가 멈춘다
    try:
        me = api('GET', 'me', {'fields': 'id,username'}, new, base=THREADS)
    except ApiError as e:
        print(f'❌ 새 토큰으로 계정을 읽지 못했습니다: {e}')
        return 1
    print(f'새 토큰: @{me.get("username")} · 만료 {days}일 뒤 ({(dt.date.today() + dt.timedelta(days=days)).isoformat()})')
    if days < 30:
        print('❌ 새 토큰의 남은 기간이 30일이 안 됩니다 — 늘어나지 않았습니다.')
        return 1
    if out:
        fd = os.open(out, os.O_WRONLY | os.O_CREAT | os.O_TRUNC, 0o600)
        with os.fdopen(fd, 'w') as f:
            f.write(new)
        print(f'새 토큰을 {out} 에 썼습니다 (화면에는 찍지 않았습니다)')
        return 0
    if show:
        print(r['access_token'])
        return 0
    try:
        import subprocess
        subprocess.run(['pbcopy'], input=r['access_token'].encode(), check=True)
        print('새 토큰을 클립보드에 넣었습니다 → GitHub 의 YEAHPLUS_THREADS_ACCESS_TOKEN 을 이 값으로 바꾸세요. (화면에는 찍지 않았습니다)')
        return 0
    except Exception:
        print('❌ 클립보드에 넣지 못했습니다 — --print 로 다시 실행하세요.')
        return 1


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument('cmd', choices=('whoami', 'plan', 'run', 'token', 'th-refresh'))
    ap.add_argument('--print', dest='show', action='store_true', help='token: 클립보드 대신 화면에 찍는다')
    ap.add_argument('--state')
    ap.add_argument('--only', help='이 id 한 건만, 시각을 따지지 않고 올린다')
    ap.add_argument('--channel', choices=('ig', 'fb', 'th'), help='한 채널만')
    ap.add_argument('--now', help='시험용: 지금 시각을 이 값으로 본다 (ISO 8601)')
    ap.add_argument('--days', type=int, default=14)
    ap.add_argument('--out', help='th-refresh: 새 토큰을 이 파일에만 쓴다')
    args = ap.parse_args()
    now = dt.datetime.fromisoformat(args.now) if args.now else dt.datetime.now(dt.timezone(dt.timedelta(hours=9), 'KST'))
    if args.cmd == 'whoami':
        return whoami()
    if args.cmd == 'token':
        return make_token(args.show)
    if args.cmd == 'th-refresh':
        return th_refresh(args.show, args.out)
    if args.cmd == 'plan':
        return plan(args.state, now, args.days)
    return run(args.state, args.only, now, args.channel)


if __name__ == '__main__':
    sys.exit(main())
