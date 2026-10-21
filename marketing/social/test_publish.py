#!/usr/bin/env python3
"""publish.py 를 가짜 Meta Graph API(로컬 HTTP 서버)에 돌려 본다 — 실제 계정에는 아무것도 올리지 않는다.

확인하는 것
  · 켜지 않으면(SOCIAL_PUBLISH_ENABLED) 서버를 한 번도 부르지 않는다
  · 인스타그램 릴스: 컨테이너 → 상태 확인 → 게시. 커버 · AI 표시가 들어간다
  · 인스타그램 캐러셀: 장마다 컨테이너 → 묶음 컨테이너 → 게시. AI 표시는 묶음에만
  · 페이스북: 시각 전이면 예약(릴스 SCHEDULED · 여러 장 글은 temporary 사진 + unpublished_content_type), 시각이 됐으면 바로 게시
  · SOCIAL_CHANNELS 로 채널을 고른다
  · 같은 글을 두 번 올리지 않는다(상태 파일, 인스타그램 최근 글의 캡션 첫 줄)
  · 출시가 필요한 글 · 보류한 글 · 스토리는 올리지 않는다. overrides.json 으로 보류를 푼다
  · 게시 시각에서 3시간이 지난 글은 올리지 않고 실패로 끝난다. 꺼져 있는 동안의 글, 처음 켜기 전에 지나간 글은 조용히 넘긴다

  · (예아플러스) Threads 에는 표지 한 장(IMAGE 하나)과 따로 쓴 글, 인스타그램 공동 게시자(collaborators)
  · (예아플러스) 실제 일정 파일(marketing/publish/schedule.json)로 1주차 첫 글이 세 채널에 맞는 꼴로 올라간다

사용:  python3 marketing/social/test_publish.py      (저장소 뿌리 — frontend 폴더에서. 노티의 시험을 옮겨 와 예아플러스 시험을 붙였다)
"""
import json, os, shutil, subprocess, sys, tempfile, threading
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))      # 저장소 뿌리 (frontend/)
CALLS, IG_MEDIA, TH_POSTS = [], [], []
SEQ = [0]


def nid(prefix):
    SEQ[0] += 1
    return f'{prefix}{SEQ[0]}'


class H(BaseHTTPRequestHandler):
    def log_message(self, *a): pass

    def send(self, obj, code=200):
        body = json.dumps(obj).encode()
        self.send_response(code); self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body))); self.end_headers(); self.wfile.write(body)

    def do_GET(self):
        u = urlparse(self.path); q = {k: v[0] for k, v in parse_qs(u.query).items()}
        CALLS.append(('GET', u.path, q))
        if u.path == '/me':
            if q.get('access_token') == 'page-token':
                return self.send({'id': 'PAGE', 'name': 'NOTI', 'instagram_business_account': {'id': 'IG', 'username': 'noti.3am'}})
            return self.send({'error': {'message': 'nonexisting field (instagram_business_account)', 'code': 100}}, 400)
        if u.path == '/oauth/access_token':
            ok = q.get('fb_exchange_token') == 'short-user' and q.get('client_secret') == 'app-secret'
            return self.send({'access_token': 'long-user'} if ok else {'error': {'message': 'bad token', 'code': 190}}, 200 if ok else 400)
        if u.path == '/debug_token':
            return self.send({'data': {'expires_at': 0, 'scopes': ['pages_show_list', 'pages_read_engagement', 'pages_manage_posts',
                                                                  'instagram_basic', 'instagram_content_publish']}})
        if u.path == '/me/accounts':
            return self.send({'data': [{'id': 'PAGE', 'name': 'NOTI', 'access_token': 'page-token',
                                        'instagram_business_account': {'id': 'IG', 'username': 'noti.3am'}}]})
        if u.path == '/IG/media':
            return self.send({'data': IG_MEDIA})
        # ── Threads (THREADS_GRAPH_URL = …/th)
        if u.path == '/th/me':
            ok = q.get('access_token') in ('th-token', 'th-token-2')
            return self.send({'id': 'TH', 'username': 'noti.3am'} if ok else {'error': {'message': 'bad token', 'code': 190}}, 200 if ok else 400)
        if u.path == '/th/refresh_access_token':
            ok = q.get('access_token') == 'th-token' and q.get('grant_type') == 'th_refresh_token'
            return self.send({'access_token': 'th-token-2', 'expires_in': 5184000} if ok else {'error': {'message': 'bad token', 'code': 190}}, 200 if ok else 400)
        if u.path == '/th/me/threads':
            return self.send({'data': TH_POSTS})
        if u.path.startswith('/th/t'):
            return self.send({'status': 'FINISHED'})
        if u.path == '/th/TH/threads_publishing_limit':
            return self.send({'data': [{'quota_usage': 0, 'config': {'quota_total': 250}}]})
        if u.path.startswith('/c'):
            return self.send({'status_code': 'FINISHED'})
        self.send({'error': {'message': 'unknown', 'code': 100}}, 400)

    def do_POST(self):
        u = urlparse(self.path)
        raw = self.rfile.read(int(self.headers.get('Content-Length') or 0)).decode()
        q = {k: v[0] for k, v in parse_qs(raw).items()}
        CALLS.append(('POST', u.path, q, {'file_url': self.headers.get('file_url'), 'auth': self.headers.get('Authorization')}))
        if u.path == '/IG/media':
            return self.send({'id': nid('c')})
        if u.path == '/IG/media_publish':
            IG_MEDIA.insert(0, {'id': nid('m'), 'caption': LAST_CAPTION[0]})
            return self.send({'id': IG_MEDIA[0]['id']})
        if u.path == '/PAGE/video_reels':
            return self.send({'video_id': nid('v')} if q.get('upload_phase') == 'start' else {'success': True})
        if u.path.startswith('/video-upload/'):
            return self.send({'success': True})
        if u.path == '/PAGE/photos':
            return self.send({'id': nid('p')})
        if u.path == '/PAGE/feed':
            return self.send({'id': nid('PAGE_')})
        if u.path == '/th/TH/threads':
            return self.send({'id': nid('t')})
        if u.path == '/th/TH/threads_publish':
            TH_POSTS.insert(0, {'id': nid('thp'), 'text': LAST_TH[0]})
            return self.send({'id': TH_POSTS[0]['id']})
        self.send({'error': {'message': 'unknown', 'code': 100}}, 400)


LAST_CAPTION = ['']
LAST_TH = ['']


def posts(path):
    return [c for c in CALLS if c[0] == 'POST' and c[1] == path]


def main():
    srv = HTTPServer(('127.0.0.1', 0), H)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{srv.server_port}'

    def item(id_, at, kind, **kw):
        base = {'id': id_, 'at': at, 'kind': kind, 'title': id_, 'auto': kind != 'story', 'ai': False, 'requires': None, 'hold': None,
                'caption_ig': f'{id_} 첫 줄\n\n본문\n\n#노티', 'caption_fb': f'{id_} 첫 줄\n\nApp Store'}
        if kind == 'reel':
            base |= {'video': f'{id_}/video.mp4', 'cover': f'{id_}/cover.jpg'}
        elif kind == 'carousel':
            base |= {'images': [f'{id_}/1.jpg', f'{id_}/2.jpg', f'{id_}/3.jpg']}
        return base | kw

    items = [item('reel-ai', '2026-10-12T19:30:00+09:00', 'reel', ai=True, video_fb='reel-ai/video_en.mp4'),
             item('carousel', '2026-10-13T12:00:00+09:00', 'carousel', ai=True),
             item('story', '2026-10-18T20:00:00+09:00', 'story'),
             item('needs-launch', '2026-10-19T19:30:00+09:00', 'reel', requires='출시'),
             item('held', '2026-10-31T10:00:00+09:00', 'carousel', hold='확인 필요')]

    with tempfile.TemporaryDirectory() as d:
        # 스크립트는 <저장소>/marketing/publish 를 읽는다 → 사본을 만들어 그 안에서 돌린다
        work = os.path.join(d, 'repo')
        os.makedirs(os.path.join(work, 'marketing', 'social')); os.makedirs(os.path.join(work, 'marketing', 'publish'))
        shutil.copy(os.path.join(ROOT, 'marketing', 'social', 'publish.py'), os.path.join(work, 'marketing', 'social'))
        pub = os.path.join(work, 'marketing', 'publish')
        json.dump({'tz': '+09:00', 'items': items}, open(os.path.join(pub, 'schedule.json'), 'w'), ensure_ascii=False)
        state = os.path.join(d, 'state.json')
        env0 = {**os.environ, 'META_GRAPH_URL': url, 'META_RUPLOAD_URL': url, 'META_ACCESS_TOKEN': 'user-token',
                'SOCIAL_MEDIA_BASE': 'https://cdn.example/social', 'META_POLL_SEC': '0', 'META_PAGE_ID': ''}
        env0.pop('SOCIAL_PUBLISH_ENABLED', None); env0.pop('APP_RELEASED', None)

        def run(now, extra=None, args=()):
            return subprocess.run([sys.executable, os.path.join(work, 'marketing', 'social', 'publish.py'), 'run',
                                   '--state', state, '--now', now, *args], env={**env0, **(extra or {})}, capture_output=True, text=True)
        ON = {'SOCIAL_PUBLISH_ENABLED': 'true'}

        # 1) 꺼져 있으면 아무것도 부르지 않는다
        r = run('2026-10-12T19:31:00+09:00')
        assert r.returncode == 0 and '미리보기' in r.stdout and not CALLS, r.stdout + r.stderr

        # 2) 10/12 09:00 — 릴스는 그날 저녁이라 페이스북에만 예약이 들어간다. 캐러셀(내일)도 예약
        r = run('2026-10-12T09:00:00+09:00', ON)
        assert r.returncode == 0, r.stdout + r.stderr
        assert not posts('/IG/media') and not posts('/IG/media_publish'), '시각 전에 인스타그램에 올렸다'
        fin = [c for c in posts('/PAGE/video_reels') if c[2].get('upload_phase') == 'finish']
        assert len(fin) == 1 and fin[0][2]['video_state'] == 'SCHEDULED' and fin[0][2]['scheduled_publish_time'] == '1791801000', fin
        assert fin[0][2]['description'].startswith('reel-ai 첫 줄') and fin[0][2]['access_token'] == 'page-token'
        up = [c for c in CALLS if c[0] == 'POST' and c[1].startswith('/video-upload/')]
        # 페이스북에는 영어판 영상(video_fb)이 올라간다. 인스타그램은 한국어판(video) 그대로 — 아래 3)에서 확인
        assert up[0][3]['file_url'] == 'https://cdn.example/social/reel-ai/video_en.mp4' and up[0][3]['auth'] == 'OAuth page-token', up
        ph = posts('/PAGE/photos'); feed = posts('/PAGE/feed')
        assert len(ph) == 3 and all(c[2]['published'] == 'false' and c[2]['temporary'] == 'true' for c in ph), ph
        assert len(feed) == 1 and feed[0][2]['unpublished_content_type'] == 'SCHEDULED' and feed[0][2]['published'] == 'false'
        fbids = [json.loads(feed[0][2][f'attached_media[{i}]'])['media_fbid'] for i in range(3)]
        assert len(set(fbids)) == 3 and all(x.startswith('p') for x in fbids), fbids
        assert 'needs-launch' not in r.stdout and 'held' not in r.stdout, r.stdout

        # 3) 19:31 — 인스타그램 릴스가 올라간다. 페이스북은 이미 예약돼 있어 다시 부르지 않는다
        CALLS.clear(); LAST_CAPTION[0] = items[0]['caption_ig']
        r = run('2026-10-12T19:31:00+09:00', ON)
        assert r.returncode == 0, r.stdout + r.stderr
        c = posts('/IG/media')
        assert len(c) == 1 and c[0][2]['media_type'] == 'REELS' and c[0][2]['is_ai_generated'] == 'true', c
        assert c[0][2]['cover_url'].endswith('/reel-ai/cover.jpg') and c[0][2]['video_url'].endswith('/reel-ai/video.mp4')
        assert len(posts('/IG/media_publish')) == 1 and not posts('/PAGE/video_reels'), '페이스북을 다시 불렀다'

        # 4) 20분 뒤 다시 돌아도 아무것도 올리지 않는다
        CALLS.clear()
        r = run('2026-10-12T19:51:00+09:00', ON)
        assert r.returncode == 0 and not [c for c in CALLS if c[0] == 'POST'], CALLS

        # 5) 상태 파일을 잃어도 인스타그램은 최근 글의 캡션 첫 줄로 알아본다
        saved = open(state).read(); st = json.loads(saved); st['reel-ai'].pop('ig'); json.dump(st, open(state, 'w'))
        CALLS.clear()
        r = run('2026-10-12T19:55:00+09:00', ON)
        assert r.returncode == 0 and not posts('/IG/media'), '같은 릴스를 또 올렸다'

        # 6) 10/13 12:05 — 캐러셀: 장마다 컨테이너, 묶음에만 AI 표시
        CALLS.clear(); LAST_CAPTION[0] = items[1]['caption_ig']
        r = run('2026-10-13T12:05:00+09:00', ON)
        assert r.returncode == 0, r.stdout + r.stderr
        c = posts('/IG/media')
        kids, parent = c[:3], c[3]
        assert all(k[2]['is_carousel_item'] == 'true' and 'is_ai_generated' not in k[2] for k in kids), kids
        assert parent[2]['media_type'] == 'CAROUSEL' and len(parent[2]['children'].split(',')) == 3 and parent[2]['is_ai_generated'] == 'true'

        # 7) 출시가 필요한 글: 확인 전에는 시각이 돼도 올리지 않는다. 확인하면 올린다(페이스북은 바로 게시)
        CALLS.clear(); LAST_CAPTION[0] = items[3]['caption_ig']
        r = run('2026-10-19T19:31:00+09:00', ON)
        assert r.returncode == 0 and '출시 확인 전' in r.stdout and not [c for c in CALLS if c[0] == 'POST'], r.stdout
        r = run('2026-10-19T19:35:00+09:00', {**ON, 'APP_RELEASED': 'true'})
        assert r.returncode == 0, r.stdout + r.stderr
        fin = [c for c in posts('/PAGE/video_reels') if c[2].get('upload_phase') == 'finish']
        assert fin[0][2]['video_state'] == 'PUBLISHED' and 'scheduled_publish_time' not in fin[0][2], fin
        assert len(posts('/IG/media_publish')) == 1

        # 8) 보류한 글은 overrides.json 에서 풀어야 올라간다. 스토리는 끝까지 올리지 않는다
        CALLS.clear(); LAST_CAPTION[0] = items[4]['caption_ig']
        r = run('2026-10-31T10:01:00+09:00', {**ON, 'APP_RELEASED': 'true'})
        assert r.returncode == 0 and '보류' in r.stdout and not [c for c in CALLS if c[0] == 'POST'], r.stdout
        json.dump({'held': {'hold': None}}, open(os.path.join(pub, 'overrides.json'), 'w'))
        r = run('2026-10-31T10:02:00+09:00', {**ON, 'APP_RELEASED': 'true'})
        assert r.returncode == 0 and len(posts('/IG/media_publish')) == 1, r.stdout + r.stderr
        feed = posts('/PAGE/feed')
        assert len(feed) == 1 and 'scheduled_publish_time' not in feed[0][2] and 'published' not in feed[0][2], feed
        assert 'story' not in json.load(open(state)), '스토리를 올렸다'

        # 9) 3시간이 지난 글은 올리지 않고 실패로 끝난다 (한 번만 알린다)
        os.remove(os.path.join(pub, 'overrides.json')); CALLS.clear(); IG_MEDIA.clear()
        json.dump({'_enabled_at': '2026-10-12T09:00:00+09:00'}, open(state, 'w'))     # 그날 아침부터 켜져 있었다
        r = run('2026-10-12T23:00:00+09:00', ON)
        assert r.returncode == 1 and '3시간이 지나' in r.stdout and not posts('/IG/media_publish'), r.stdout
        r = run('2026-10-12T23:20:00+09:00', ON)
        assert '3시간이 지나' not in r.stdout, r.stdout

        # 9-1) 꺼져 있으면 지나간 글을 실패로 치지도, 상태에 적지도 않는다
        os.remove(state); CALLS.clear()
        r = run('2026-10-12T23:00:00+09:00')
        assert r.returncode == 0 and '3시간이 지나' not in r.stdout and not CALLS, r.stdout
        assert not os.path.exists(state) or 'missed' not in open(state).read(), '꺼져 있는데 놓침을 적었다'

        # 9-1b) 처음 켠 시각보다 먼저 지나간 글은(몇 시간 전이든 며칠 전이든) 조용히 넘긴다
        for first in ('2026-10-12T23:00:00+09:00', '2026-10-16T09:00:00+09:00'):
            if os.path.exists(state):
                os.remove(state)
            CALLS.clear()
            r = run(first, ON)
            assert r.returncode == 0 and '넘겼습니다' in r.stdout and '3시간이 지나' not in r.stdout, r.stdout
            assert not posts('/IG/media_publish'), '지난 글을 올렸다'

        # 9-2) SOCIAL_CHANNELS=fb 면 인스타그램은 건드리지 않는다 (Business Suite 에서 직접 예약하는 경우)
        os.remove(state); CALLS.clear()
        r = run('2026-10-13T12:05:00+09:00', {**ON, 'SOCIAL_CHANNELS': 'fb'})
        assert not posts('/IG/media') and len(posts('/PAGE/feed')) == 1, r.stdout + r.stderr
        assert 'ig' not in json.load(open(state)).get('carousel', {}), '인스타그램 상태를 적었다'

        # 9-3) Threads: SOCIAL_CHANNELS 에 th 가 있고 토큰이 있으면 그 시각에 올린다. 영상은 VIDEO, 여러 장은 IMAGE 조각 → CAROUSEL.
        #      캡션은 caption_th(없으면 인스타그램 캡션에서 만든다 — 링크는 눌리는 주소, 해시태그는 주제 하나). 같은 첫 줄이면 다시 올리지 않는다.
        os.remove(state); CALLS.clear(); TH_POSTS.clear()
        TH = {**ON, 'SOCIAL_CHANNELS': 'th', 'THREADS_GRAPH_URL': url + '/th', 'THREADS_ACCESS_TOKEN': 'th-token'}
        LAST_TH[0] = 'reel-ai 첫 줄'
        r = run('2026-10-12T19:31:00+09:00', TH)
        assert r.returncode == 0, r.stdout + r.stderr
        c = posts('/th/TH/threads')
        assert len(c) == 1 and c[0][2]['media_type'] == 'VIDEO' and c[0][2]['video_url'].endswith('/reel-ai/video.mp4'), c
        assert c[0][2]['access_token'] == 'th-token' and '#노티' not in c[0][2]['text'] and c[0][2]['text'].endswith('#예아플러스'), c[0][2]['text']
        assert len(posts('/th/TH/threads_publish')) == 1 and not posts('/IG/media') and not posts('/PAGE/feed'), '다른 채널을 건드렸다'
        CALLS.clear()
        r = run('2026-10-12T19:51:00+09:00', TH)
        assert not posts('/th/TH/threads'), '같은 글을 Threads 에 또 올렸다'
        CALLS.clear(); LAST_TH[0] = 'carousel 첫 줄'
        r = run('2026-10-13T12:05:00+09:00', TH)
        c = posts('/th/TH/threads')
        assert [x[2]['media_type'] for x in c] == ['IMAGE', 'IMAGE', 'IMAGE', 'CAROUSEL'] and all(x[2]['is_carousel_item'] == 'true' for x in c[:3]), c
        assert len(c[3][2]['children'].split(',')) == 3, c[3]
        # Threads 를 나중에 켰을 때: 인스타그램은 그날 아침부터 켜져 있었고 릴스(19:30)가 5시간 전에 지나갔다 → Threads 는 놓침이 아니라 조용히 넘긴다
        json.dump({'_enabled_at': '2026-10-12T09:00:00+09:00', 'reel-ai': {'ig': {'id': 'm1'}, 'fb': {'id': 'v1'}}}, open(state, 'w')); CALLS.clear()
        r = run('2026-10-13T00:30:00+09:00', TH)
        assert r.returncode == 0 and '3시간이 지나' not in r.stdout and not posts('/th/TH/threads'), r.stdout
        st = json.load(open(state))
        assert st['reel-ai']['th'] == {'skipped': 'old'} and '_th_enabled_at' in st, st
        # 토큰이 없으면 Threads 는 건너뛰고(경고 한 줄), 실패로 치지 않는다
        os.remove(state); CALLS.clear()
        r = run('2026-10-12T19:31:00+09:00', {**TH, 'THREADS_ACCESS_TOKEN': ''})
        assert r.returncode == 0 and 'THREADS_ACCESS_TOKEN' in r.stdout and not posts('/th/TH/threads'), r.stdout

        # 10) 토큰 만들기: 짧은 사용자 토큰 → 긴 사용자 토큰 → 만료 없는 페이지 토큰. 페이지 토큰으로도 계정을 찾는다
        py = os.path.join(work, 'marketing', 'social', 'publish.py')
        r = subprocess.run([sys.executable, py, 'token', '--print'], capture_output=True, text=True,
                           env={**env0, 'META_APP_ID': 'app', 'META_APP_SECRET': 'app-secret', 'META_USER_TOKEN': 'short-user'})
        assert r.returncode == 0 and r.stdout.strip().endswith('page-token') and '만료: 없음' in r.stdout, r.stdout + r.stderr
        assert 'app-secret' not in r.stdout and 'long-user' not in r.stdout, '비밀 값을 화면에 찍었다'
        r = subprocess.run([sys.executable, py, 'whoami'], capture_output=True, text=True, env={**env0, 'META_ACCESS_TOKEN': 'page-token'})
        assert '페이지 토큰' in r.stdout and '@noti.3am' in r.stdout, r.stdout + r.stderr

        # 11) Threads 토큰 늘리기(자동 갱신용 --out): 새 토큰은 파일에만, 화면에는 찍지 않는다. 실패하면 파일을 만들지 않는다
        out = os.path.join(work, 'th.txt')
        r = subprocess.run([sys.executable, py, 'th-refresh', '--out', out], capture_output=True, text=True,
                           env={**env0, 'THREADS_GRAPH_URL': url + '/th', 'THREADS_ACCESS_TOKEN': 'th-token'})
        assert r.returncode == 0 and open(out).read() == 'th-token-2' and 'th-token-2' not in r.stdout + r.stderr, r.stdout + r.stderr
        assert '@noti.3am' in r.stdout and oct(os.stat(out).st_mode & 0o777) == '0o600', r.stdout
        os.remove(out)
        r = subprocess.run([sys.executable, py, 'th-refresh', '--out', out], capture_output=True, text=True,
                           env={**env0, 'THREADS_GRAPH_URL': url + '/th', 'THREADS_ACCESS_TOKEN': 'expired'})
        assert r.returncode != 0 and not os.path.exists(out), r.stdout

        # 12) 예아플러스: Threads 는 표지 한 장(IMAGE 하나, 조각 없음) + 따로 쓴 글. 인스타그램 묶음에 공동 게시자
        yp = item('yp', '2026-10-28T12:30:00+09:00', 'carousel', collaborators=['neurovoca'],
                  images_th=['yp/1.jpg'], caption_th='yp Threads 첫 줄\n\n본문\n\n#한국사')
        json.dump({'tz': '+09:00', 'items': [yp]}, open(os.path.join(pub, 'schedule.json'), 'w'), ensure_ascii=False)
        if os.path.exists(state):
            os.remove(state)
        CALLS.clear(); IG_MEDIA.clear(); TH_POSTS.clear(); LAST_CAPTION[0] = yp['caption_ig']; LAST_TH[0] = 'yp Threads 첫 줄'
        r = run('2026-10-28T12:32:00+09:00', {**TH, 'SOCIAL_CHANNELS': 'ig,fb,th'})
        assert r.returncode == 0, r.stdout + r.stderr
        c = posts('/th/TH/threads')
        assert len(c) == 1 and c[0][2]['media_type'] == 'IMAGE' and 'is_carousel_item' not in c[0][2], c
        assert c[0][2]['image_url'] == 'https://cdn.example/social/yp/1.jpg' and c[0][2]['text'].startswith('yp Threads 첫 줄'), c
        parent = [x for x in posts('/IG/media') if x[2].get('media_type') == 'CAROUSEL']
        assert len(parent) == 1 and json.loads(parent[0][2]['collaborators']) == ['neurovoca'], parent
        assert len(posts('/PAGE/feed')) == 1 and len(posts('/th/TH/threads_publish')) == 1, r.stdout

        # 13) 실제 일정 파일: 1주차 첫 글(10/28 12:30)이 세 채널에 맞는 꼴로 올라간다. 다른 글은 시각 전이라 건드리지 않는다
        real = json.load(open(os.path.join(ROOT, 'marketing', 'publish', 'schedule.json'), encoding='utf-8'))
        first = min(real['items'], key=lambda x: x['at'])
        shutil.copy(os.path.join(ROOT, 'marketing', 'publish', 'schedule.json'), os.path.join(pub, 'schedule.json'))
        os.remove(state); CALLS.clear(); IG_MEDIA.clear(); TH_POSTS.clear()
        LAST_CAPTION[0] = first['caption_ig']; LAST_TH[0] = first['caption_th']
        r = run('2026-10-21T15:00:00+09:00')      # 꺼져 있으면 아무것도 부르지 않는다
        assert r.returncode == 0 and not CALLS, r.stdout
        r = run(first['at'].replace(':30:00', ':32:00'), {**TH, 'SOCIAL_CHANNELS': 'ig,fb,th'})
        assert r.returncode == 0, r.stdout + r.stderr
        kids = [x for x in posts('/IG/media') if x[2].get('is_carousel_item') == 'true']
        assert len(kids) == len(first['images']) == 6 and kids[0][2]['image_url'].endswith(first['images'][0]), kids
        th = posts('/th/TH/threads')
        assert len(th) == 1 and th[0][2]['media_type'] == 'IMAGE' and th[0][2]['text'] == first['caption_th'], th
        # 페이스북: 첫 글은 바로 게시, 7일 안의 나머지 글은 예약 (해시태그는 본문에서 빠지고 끝에 #예아플러스 하나, 링크에 utm)
        fb = posts('/PAGE/feed')
        now_ = [x for x in fb if 'scheduled_publish_time' not in x[2]]
        assert len(now_) == 1 and now_[0][2]['message'].startswith(first['caption_ig'].split('\n')[0]), fb
        assert all('utm_source=facebook' in x[2]['message'] and x[2]['message'].count('#') == 1 for x in fb), fb
        assert len(fb) - 1 == sum(1 for x in fb if x[2].get('unpublished_content_type') == 'SCHEDULED'), fb
        done = json.load(open(state))
        assert set(done[first['id']]) == {'ig', 'fb', 'th'}, done
        # 같은 날 페이스북 예약: 다음 글(10/30)은 7일 안이라 예약으로 들어가 있다
        nxt = sorted(real['items'], key=lambda x: x['at'])[1]
        assert done.get(nxt['id'], {}).get('fb', {}).get('how') == 'schedule', done
        print(r.stdout.strip())

    srv.shutdown()
    print('통과: 토큰 만들기 · 미리보기 · 인스타그램 릴스/캐러셀 · 페이스북 예약/바로 게시 · Threads 영상/여러 장 · Threads 토큰 늘리기 · 중복 방지 · 출시 확인 · 보류 · 놓침 · (예아플러스) Threads 표지 한 장 · 공동 게시자 · 실제 일정 1주차')


if __name__ == '__main__':
    main()
