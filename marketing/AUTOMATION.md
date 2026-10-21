# 예아플러스 — 인스타그램 · 페이스북 · Threads 자동 게시

원고(`YEAHPLUS_WEB/marketing/CAPTIONS.md`, 이 저장소 밖)를 이 저장소의 GitHub Actions 가 Meta Graph API · Threads API 로 올린다.
노티(GAMEAPP 저장소 `noti/marketing/AUTOMATION.md` — 원본은 묘해)의 도구를 옮겨 왔다. 같은 Meta 앱 · 같은 Supabase 프로젝트를 쓰고, 토큰 · 폴더 · 작업 이름만 따로 둔다.
계획: `YEAHPLUS_WEB/marketing/PLAN_8W.md`

> **2026-10-21 만들었다.** 도구 · 일정(1주차) · 워크플로 · 가짜 서버 시험까지 끝났다. **아직 켜지 않았다** — 2장(토큰 · 업로드 · Supabase · main)이 남았다.
> 첫 글은 10/28(화) 12:30 「예아플러스의 앱」 01 TOWER 68 (공동 게시 @tower68.kr — 그 계정에서 초대를 수락해야 한다).
> 「실록의 선택」은 2026-10-21 회사 계정에서 내렸다 — 같은 소재를 전용 계정 @sillok.king 이 올린다.

## 0. 어디에 무엇이 있나

| 무엇 | 어디 |
|---|---|
| 원고 · 슬라이드 원본 | `YEAHPLUS_WEB/marketing/CAPTIONS.md` · `carousel/W1/` (저장소 밖) |
| 도구 | `marketing/social/` — publish.py · build_manifest.py · upload_media.py · test_publish.py · supabase_trigger.sql |
| 게시용 일정 | `marketing/publish/schedule.json` · `overrides.json` (커밋한다) |
| 올릴 파일 사본 | `marketing/publish/media/` (git 에 올리지 않는다 → Supabase 공개 버킷 `assets/social-yeahplus/`) |
| 워크플로 | `.github/workflows/yeahplus-social.yml` (게시) · `yeahplus-threads-token.yml` (Threads 토큰 갱신) |
| 게시 상태 | `refs/yeahplus-social/state` — 브랜치가 아니라서 Vercel 배포가 생기지 않는다 |

`marketing/` 은 `.vercelignore` 에 있어 웹 배포에는 들어가지 않는다. 다만 main 에 push 하면 Vercel 이 한 번 다시 배포한다(내용은 같다).

## 1. 무엇이 어떻게 올라가나

| | 인스타그램 | 페이스북 페이지 | Threads |
|---|---|---|---|
| 방식 | 게시 시각에 바로 게시 | 7일 앞까지 예약 (시각이 지났으면 바로) | 게시 시각에 바로 게시 |
| 캐러셀 | 6장 | 사진 6장 글 | **표지 한 장 + 따로 쓴 글** |
| 글 | CAPTIONS.md 첫 코드 블록 | 같은 글에서 해시태그를 빼고, 제품 링크(utm_source=facebook) + `#예아플러스` | 둘째 코드 블록 + 주제 태그 하나 |

- 스토리(실록 A/B 투표)는 손으로 올린다 — 투표 스티커를 API 로 붙일 수 없다.
- 인스타그램 공동 게시자: 제목 줄에 `· 공동 @계정` 을 적으면 묶음에 들어간다(최대 3). 화요일 「예아플러스의 앱」은 그 앱의 전용 계정을 넣는다. 상대 계정이 초대를 수락해야 그쪽에도 보인다(앱 계정 담당이 수락). 가짜 서버로만 시험했다.
- 게시 시각에서 3시간이 지나도록 못 올린 글은 올리지 않고 실행이 실패로 끝난다(GitHub 알림 메일) → 손으로 올린다.

## 2. 켜기 전에 할 일 (유진)

토큰 · 키는 채팅 · 파일 · 커밋에 적지 않는다. 터미널에 넣는 값은 화면에 보이지 않는다.

### 2-1. 페이지 토큰 (인스타그램 · 페이스북)

1. 인스타그램이 프로페셔널 계정이고 예아플러스 페이스북 페이지와 연결돼 있는지 본다(했다).
2. [그래프 API 탐색기](https://developers.facebook.com/tools/explorer/)에서 **노티 · 묘해에 쓰는 Meta 앱**을 고르고 "사용자 토큰 받기".
   권한 여섯 개: `pages_show_list` `pages_read_engagement` `pages_manage_posts` `instagram_basic` `instagram_content_publish` `business_management`.
   **로그인 창에서 예아플러스 페이지 · 인스타그램을 "추가로" 고른다 — 노티 · 묘해 것을 빼지 않는다.**
3. 앱 대시보드 ▸ 앱 설정 ▸ 기본 설정에서 앱 ID · 앱 시크릿 코드를 확인한다.
4. 터미널 (페이지가 여럿이라 `META_PAGE_ID` 가 필요하다. 모르면 비워 두고 한 번 실행하면 이름과 번호를 알려 준다):

```bash
cd ~/Documents/EKO_DEV/YEAHPLUS_WEB/frontend
```

```bash
read "META_APP_ID?앱 ID: " && read -s "META_APP_SECRET?앱 시크릿: " && echo && read -s "META_USER_TOKEN?탐색기의 사용자 토큰: " && echo && read "META_PAGE_ID?예아플러스 페이지 번호: " && export META_APP_ID META_APP_SECRET META_USER_TOKEN META_PAGE_ID
```

```bash
python3 marketing/social/publish.py token
```

   페이지가 예아플러스, 인스타그램이 회사 계정, "만료: 없음", 권한 다섯 줄 ✅ 면 된다. 토큰은 **클립보드**에 들어간다.
5. GitHub ▸ `CTO-yeahplus/yeahplus_web` ▸ Settings ▸ Secrets and variables ▸ Actions ▸ **Secrets** ▸ `YEAHPLUS_META_ACCESS_TOKEN` 에 붙여넣기.

### 2-2. Threads 토큰

1. 휴대폰 Threads 앱에서 예아플러스 인스타그램 계정으로 **Threads 프로필을 만든다 — 공개 계정**.
2. 같은 Meta 앱 ▸ 쓰임새 ▸ Access the Threads API ▸ 설정 ▸ **Threads 테스터**에 예아플러스 계정을 추가한다.
3. Threads 앱(예아플러스 로그인) ▸ 설정 ▸ 계정 ▸ 웹사이트 권한 ▸ **초대**에서 수락한다.
4. 같은 설정 화면의 **User Token Generator** 에서 예아플러스의 토큰을 만든다(장기 토큰, 60일).
5. GitHub Secrets ▸ `YEAHPLUS_THREADS_ACCESS_TOKEN` 에 붙여넣기.
6. 자동 갱신용: GitHub ▸ 프로필 ▸ Settings ▸ Developer settings ▸ Fine-grained tokens ▸ 새 토큰 — 저장소 `yeahplus_web` 하나, 권한 **Secrets: Read and write** 만 → Secrets ▸ `YEAHPLUS_SECRETS_PAT`.
   토큰 발급 24시간 뒤에 Actions ▸ 예아플러스 Threads 토큰 갱신 ▸ Run workflow 를 한 번 돌려 초록이면 된다.

### 2-3. 슬라이드를 공개 주소에 올리기

묘해 Supabase 프로젝트(노티와 같은 곳)의 service_role 키가 필요하다.

```bash
cd ~/Documents/EKO_DEV/YEAHPLUS_WEB/frontend && python3 marketing/social/build_manifest.py
```

```bash
read -s "SUPABASE_SERVICE_ROLE?service_role 키: " && export SUPABASE_SERVICE_ROLE && export SUPABASE_URL="https://tpuotnrgvfsraotgzjjs.supabase.co"
```

```bash
python3 marketing/social/upload_media.py
```

끝에 나오는 주소를 GitHub ▸ **Variables** ▸ `YEAHPLUS_SOCIAL_MEDIA_BASE` 에 넣는다.
올려 둔 파일은 주소를 아는 사람이면 누구나 볼 수 있다(게시 전 슬라이드 포함).

### 2-4. 정시 깨우기 (Supabase)

1. GitHub Fine-grained token 하나 더 — 저장소 `yeahplus_web` 하나, 권한 **Actions: Read and write** 만. 만료일이 지나면 자동 게시가 조용히 멈춘다.
2. 묘해 Supabase ▸ Vault ▸ Add new secret — 이름 `github_actions_pat_yeahplus_web`, 값에 토큰.
3. SQL Editor 에서 `marketing/social/supabase_trigger.sql` 을 통째로 실행한다.
4. 확인: `SELECT internal.trigger_yeahplus_social_publish();` → GitHub ▸ Actions ▸ 예아플러스 소셜 게시에 새 실행이 생기는지. (워크플로가 main 에 올라간 뒤에)

### 2-5. GitHub 변수

| 이름 | 값 | 뜻 |
|---|---|---|
| `YEAHPLUS_SOCIAL_MEDIA_BASE` | 2-3 에서 나온 주소 | 올려 둔 파일의 주소 앞부분 |
| `YEAHPLUS_SOCIAL_PUBLISH_ENABLED` | 처음엔 비워 둔다. 켤 때 `true` | 이게 `true` 가 아니면 아무것도 올리지 않는다 |
| `YEAHPLUS_META_PAGE_ID` | (선택) | 페이지 토큰을 넣었으면 필요 없다 |
| `YEAHPLUS_SOCIAL_CHANNELS` | (선택) 기본 `ig,fb,th` | 인스타그램을 Business Suite 에서 직접 예약하면 `fb,th` |
| `YEAHPLUS_FB_SCHEDULE_DAYS` | (선택) 기본 7 | 페이스북에 며칠 앞까지 예약을 넣을지 |

## 3. 켜는 순서

1. 워크플로 · 도구 · 일정이 main 에 있어야 한다(예약 실행은 main 의 파일로만 돈다).
2. Actions ▸ 예아플러스 소셜 게시 ▸ Run workflow ▸ `whoami` — 페이지 · 인스타그램 · Threads 가 예아플러스로 나오는지.
3. `plan` — 1주차 글이 "대기"로 나오는지.
4. 변수 `YEAHPLUS_SOCIAL_PUBLISH_ENABLED` = `true`. 그다음 매일 09:07 실행이 페이스북에 7일 안의 글을 예약하고, 게시 시각에 인스타그램 · Threads 에 올라간다.
5. 첫 글의 게시 시각 10분 뒤쯤 세 채널에서 글을 확인한다. 페이스북은 **로그아웃한 브라우저에서도 보이는지** 본다(Meta 앱이 "라이브" 모드여야 한다).

시험으로 한 건을 먼저 올려 보고 싶으면 `run` + only `2026-10-28-carousel` + channel `ig` — 시각을 따지지 않고 **지금 바로** 올린다. 그 글은 일정에서 올라간 것으로 쳐서 그날 다시 올라가지 않는다.

## 4. 운영

| 하고 싶은 것 | 방법 |
|---|---|
| 새 주 글 추가 | 슬라이드를 `YEAHPLUS_WEB/marketing/carousel/W2/` 에 두고 CAPTIONS.md 에 같은 꼴로 적는다 → `build_manifest.py` → `upload_media.py` → schedule.json 커밋 · push |
| 시험 | `python3 marketing/social/test_publish.py` (가짜 서버 — 실제 계정에는 아무것도 올리지 않는다) |
| 전부 멈추기 | 변수 `YEAHPLUS_SOCIAL_PUBLISH_ENABLED` 를 지운다. **이미 페이스북에 예약된 글은 Business Suite 플래너에서 직접 지운다** |
| 한 건 건너뛰기 | `marketing/publish/overrides.json` 에 `"2026-10-30-carousel": {"skip": true}` |
| 시각 옮기기 | 같은 파일에 `"…": {"at": "2026-10-30T13:00:00+09:00"}` |
| 손으로 먼저 올렸다 | 인스타그램 · Threads 는 첫 줄이 같으면 알아서 건너뛴다. 페이스북은 `skip` 을 넣는다 |

overrides.json · schedule.json 을 고치면 main 에 올라가야 반영된다.

## 5. 한계

- GitHub 예약 실행이 늦어도 Supabase 가 정시에 깨운다. 둘 다 3시간 넘게 못 돌면 그 글은 "놓침".
- 인스타그램 API 로 올린 릴스에는 인스타그램 음원을 붙일 수 없다(한 장면 릴스는 영상에 소리를 넣는다).
- 공동 게시자 · Threads 표지 한 장은 예아플러스에서 새로 붙인 기능이라 실제 API 로는 아직 돌려 보지 않았다(가짜 서버 시험만).
