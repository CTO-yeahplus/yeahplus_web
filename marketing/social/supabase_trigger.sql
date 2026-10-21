-- ============================================================================
-- 예아플러스의 "예아플러스 소셜 게시" 워크플로를 정해진 시각에 깨운다 (marketing/AUTOMATION.md)
-- 노티의 noti/tools/social/supabase_trigger.sql(원본은 묘해)을 옮겨 온 것이다.
--
-- GitHub 의 예약 실행은 크게 늦는다(노티 2026-10-12: 21:02 실행이 다음 날 06:05 에 돌았다).
-- 인스타그램 · Threads 는 "그 시각에 게시"하는 방식이라 3시간 넘게 늦으면 글을 놓친다.
-- 그래서 Postgres 의 pg_cron 이 정해진 시각에 GitHub API 로 워크플로를 실행시킨다(workflow_dispatch).
--
-- 어디서 돌리나: 묘해의 Supabase 프로젝트(노티 · TOWER 68 의 깨우기와 올릴 파일이 이미 거기 있다).
--   SQL Editor 에서 이 파일을 통째로 실행한다. 작업 이름은 yeahplus-social-% — 묘해 · 노티의 작업과 겹치지 않는다.
--
-- 준비 (이 파일을 실행하기 전에)
--   1) pg_cron, pg_net 은 묘해 때 이미 켰다.
--   2) GitHub 에서 yeahplus_web 저장소에만 쓰는 토큰을 만든다 (Fine-grained token · Actions: Read and write).
--   3) Supabase 의 Vault 에 그 토큰을 이름 `github_actions_pat_yeahplus_web` 로 넣는다. 토큰은 이 파일 · 채팅 · 커밋에 적지 않는다.
--
-- 이 파일에는 비밀 값이 없다. 토큰은 실행할 때 Vault 에서 읽는다.
-- 끄려면:  SELECT cron.unschedule(jobid) FROM cron.job WHERE jobname LIKE 'yeahplus-social-%';
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- API(PostgREST)에 드러나지 않는 스키마 — 앱 사용자가 이 함수를 부를 수 없어야 한다. (묘해가 이미 만들어 둔 스키마다)
CREATE SCHEMA IF NOT EXISTS internal;
REVOKE ALL ON SCHEMA internal FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION internal.trigger_yeahplus_social_publish()
RETURNS bigint
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_token text;
  v_request bigint;
BEGIN
  SELECT decrypted_secret INTO v_token FROM vault.decrypted_secrets WHERE name = 'github_actions_pat_yeahplus_web';
  IF v_token IS NULL OR v_token = '' THEN
    RAISE EXCEPTION 'Vault 에 github_actions_pat_yeahplus_web 이 없습니다';
  END IF;
  -- 응답은 기다리지 않는다(비동기). 결과는 net._http_response 에 남는다 — 성공이면 204.
  SELECT net.http_post(
    url := 'https://api.github.com/repos/CTO-yeahplus/yeahplus_web/actions/workflows/yeahplus-social.yml/dispatches',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || v_token,
      'Accept', 'application/vnd.github+json',
      'X-GitHub-Api-Version', '2022-11-28',
      'User-Agent', 'yeahplus-social-publish',
      'Content-Type', 'application/json'),
    body := jsonb_build_object('ref', 'main', 'inputs', jsonb_build_object('command', 'run')),
    timeout_milliseconds := 10000
  ) INTO v_request;
  RETURN v_request;
END;
$$;

REVOKE ALL ON FUNCTION internal.trigger_yeahplus_social_publish() FROM PUBLIC, anon, authenticated;

-- 같은 이름의 작업이 있으면 지우고 다시 건다(이 파일을 다시 실행해도 겹치지 않게).
DO $$
BEGIN
  PERFORM cron.unschedule(jobid) FROM cron.job WHERE jobname LIKE 'yeahplus-social-%';
END $$;

-- 시각은 UTC 다 — 한국 시간에서 9시간을 뺀다. 게시 시각 2분 뒤와 22분 뒤에 한 번씩(이미 올린 글은 다시 올리지 않는다).
SELECT cron.schedule('yeahplus-social-daily', '7 0 * * *',       'SELECT internal.trigger_yeahplus_social_publish()');  -- 매일 09:07 — 페이스북 예약 채우기
SELECT cron.schedule('yeahplus-social-tuthu', '32,52 3 * * 2,4', 'SELECT internal.trigger_yeahplus_social_publish()');  -- 화 · 목 12:32 · 12:52 — 실록의 선택 · 그 말, 진짜일까?
SELECT cron.schedule('yeahplus-social-sat',   '2,22 1 * * 6',    'SELECT internal.trigger_yeahplus_social_publish()');  -- 토 10:02 · 10:22 — 만든 이유
SELECT cron.schedule('yeahplus-social-sun',   '2,22 11 * * 0',   'SELECT internal.trigger_yeahplus_social_publish()');  -- 일 20:02 · 20:22 — 한 장면(격주 릴스)

-- 확인
--   SELECT jobname, schedule, active FROM cron.job WHERE jobname LIKE 'yeahplus-social-%';    -- 네 줄이 나와야 한다
--   SELECT internal.trigger_yeahplus_social_publish();                                      -- 지금 한 번 실행시켜 본다
--   SELECT status_code, left(content, 200), created FROM net._http_response ORDER BY created DESC LIMIT 3;   -- 204 면 성공
