-- 원 테이크 ONE TAKE — 도전장 짧은 주소 (Supabase SQL Editor 에서 한 번 실행, 다시 실행해도 된다)
-- 앱이 [도전장]을 누르면 사이트 서버(app/(onetake)/onetake/api/dare/route.ts)가 그 판 기록(코드)을 여기에 맡기고
-- 7자 짧은 이름을 돌려준다 → 링크 https://www.yeahplus.co.kr/onetake/c/Ab3x9Kq (예전 # 뒤 5~7천 자 대신).
-- 보관: **7일**(2026-10-27 유진 결정). 저장·조회 때마다 지우고, pg_cron 이 있으면 매시 17분에도 지운다 → 길어야 7일 + 1시간.
-- 저장하는 것: 기록 코드(조작 · 차 위치 · 점수 · 등급 · 장소 · 감독 이름(설정에 적었을 때만)) · 만든 시각 · 접속 주소 해시(하루 뒤 지움, 시간당 횟수 제한용).
-- 계정 · 기기 식별자 · 위치 · 연락처는 없다. 처리방침: 회사 사이트 /onetake/privacy 6절.
-- ⚠️ 프로젝트 = 묘해(회사 공용, Southeast Asia 싱가포르) — 처리방침에 국외 이전으로 적었다. 프로젝트를 옮기면 처리방침을 고칠 것.
--   이 파일은 ot_ 로 시작하는 것만 만들고 다른 표는 건드리지 않는다. 표는 RLS 를 켜고 정책을 두지 않는다 → anon 키로는 못 읽고 못 쓴다.
--   묘해 앱 안에 anon 키가 들어 있어 사실상 공개 값이다 → 함수는 사이트 서버만 아는 비밀값(p_secret)이 맞을 때만 일한다.
--
-- ▶ 실행 순서
--   1) 이 파일 전체를 실행
--   2) 비밀값 넣기 — '<비밀값>' 을 Vercel 환경 변수 OT_SUBMIT_SECRET 과 같은 값으로(맥 터미널: openssl rand -hex 24)
--        insert into public.ot_config (key, value) values ('submit_secret', '<비밀값>')
--        on conflict (key) do update set value = excluded.value;
--   3) 확인 — 아래 두 줄이 차례로 짧은 이름 7자 · 같은 코드를 돌려주면 된다(시험 행은 7일 뒤 저절로 지워진다)
--        select public.ot_save_dare('<비밀값>', 'v1.' || repeat('A', 60), null);
--        select public.ot_get_dare('<비밀값>', '<위에서 나온 7자>');

create table if not exists public.ot_dares (
  id          text primary key check (id ~ '^[A-Za-z0-9]{7}$'),
  created_at  timestamptz not null default now(),
  code        text not null check (char_length(code) between 40 and 20000 and code ~ '^v1\.[A-Za-z0-9_-]+$'),
  ip_hash     text
);
create index if not exists ot_dares_created_at on public.ot_dares (created_at);
create index if not exists ot_dares_ip_hash on public.ot_dares (ip_hash) where ip_hash is not null;

alter table public.ot_dares enable row level security;
revoke all on public.ot_dares from anon, authenticated;

-- 사이트 서버와 함께 아는 비밀값 (RLS 켬 · 정책 없음 = anon 은 못 읽는다)
create table if not exists public.ot_config (key text primary key, value text not null);
alter table public.ot_config enable row level security;
revoke all on public.ot_config from anon, authenticated;

-- 비밀값 확인 (없거나 짧으면 not_configured → 사이트는 503, 앱은 예전 긴 링크로 보낸다)
create or replace function public.ot_check_secret(p_secret text) returns void
language plpgsql security definer set search_path = public as $$
declare v_secret text;
begin
  select value into v_secret from ot_config where key = 'submit_secret';
  if v_secret is null or length(v_secret) < 16 then raise exception 'not_configured'; end if;
  if p_secret is null or p_secret <> v_secret then raise exception 'forbidden'; end if;
end;
$$;
revoke all on function public.ot_check_secret(text) from public, anon, authenticated;

-- 7일 지난 도전장 · 하루 지난 접속 주소 해시 지우기
create or replace function public.ot_purge() returns void
language sql security definer set search_path = public as $$
  delete from ot_dares where created_at < now() - interval '7 days';
  update ot_dares set ip_hash = null where ip_hash is not null and created_at < now() - interval '1 day';
$$;
revoke all on function public.ot_purge() from public, anon, authenticated;

-- 맡기기 → 짧은 이름 7자
create or replace function public.ot_save_dare(p_secret text, p_code text, p_ip_hash text) returns text
language plpgsql security definer set search_path = public as $$
declare
  v_id text;
  v_abc constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';   -- 헷갈리는 글자(0 O 1 l I) 뺌
  i int;
begin
  perform ot_check_secret(p_secret);
  if p_code is null or char_length(p_code) not between 40 and 20000 or p_code !~ '^v1\.[A-Za-z0-9_-]+$' then raise exception 'bad_code'; end if;
  perform ot_purge();
  -- 남용: 같은 주소 시간당 30건, 전체 시간당 3,000건
  if p_ip_hash is not null and (select count(*) from ot_dares where ip_hash = p_ip_hash and created_at > now() - interval '1 hour') >= 30 then
    raise exception 'rate_limited';
  end if;
  if (select count(*) from ot_dares where created_at > now() - interval '1 hour') >= 3000 then raise exception 'rate_limited'; end if;
  -- 같은 판을 두 번 보내면 같은 이름 (7일 안)
  select id into v_id from ot_dares where code = p_code limit 1;
  if v_id is not null then return v_id; end if;
  for attempt in 1..8 loop
    v_id := '';
    for i in 1..7 loop v_id := v_id || substr(v_abc, 1 + floor(random() * length(v_abc))::int, 1); end loop;
    begin
      insert into ot_dares (id, code, ip_hash) values (v_id, p_code, p_ip_hash);
      return v_id;
    exception when unique_violation then null;   -- 겹치면 다시 뽑는다
    end;
  end loop;
  raise exception 'id_exhausted';
end;
$$;

-- 짧은 이름 → 코드 (7일 지났으면 null = 만료)
create or replace function public.ot_get_dare(p_secret text, p_id text) returns text
language plpgsql security definer set search_path = public as $$
declare v_code text;
begin
  perform ot_check_secret(p_secret);
  if p_id is null or p_id !~ '^[A-Za-z0-9]{7}$' then return null; end if;
  select code into v_code from ot_dares where id = p_id and created_at > now() - interval '7 days';
  return v_code;
end;
$$;

revoke all on function public.ot_save_dare(text, text, text) from public;
revoke all on function public.ot_get_dare(text, text) from public;
grant execute on function public.ot_save_dare(text, text, text) to anon;
grant execute on function public.ot_get_dare(text, text) to anon;

-- 매시 17분 정리 (pg_cron 이 켜진 프로젝트면 — 묘해 프로젝트는 페이스루틴 자동 게시 때문에 켜져 있다). 없으면 건너뛴다.
do $$
begin
  if exists (select 1 from pg_extension where extname = 'pg_cron') then
    perform cron.unschedule(jobid) from cron.job where jobname = 'ot_dares_purge';
    perform cron.schedule('ot_dares_purge', '17 * * * *', 'select public.ot_purge()');
  end if;
end;
$$;
