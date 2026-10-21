-- 수상한 명언 수사본부 — 제보 저장 (Supabase SQL Editor 에서 한 번 실행, 다시 실행해도 된다)
-- 사이트 서버(app/(fishyquotes)/fishyquotes/api/report/route.ts)가 anon 키로 fq_submit_report 함수만 부른다.
-- 표 fq_reports 는 RLS 를 켜고 정책을 두지 않는다 → anon·authenticated 는 읽지도 쓰지도 못한다(함수가 security definer 로 넣는다).
-- 제보 확인·상태 변경은 Supabase 대시보드(Table Editor)에서. 게시판 공개는 사이트의 cases/board.ts 에 우리가 정리해 적는다.
-- 개인정보(처리방침 7절과 같게): 이메일은 판결·기각(closed_at) 30일 뒤, 접속 주소 해시는 하루 뒤, 제보 전체는 판결 3년 뒤 지운다(새 제보가 들어올 때마다 정리).
-- ⚠️ 프로젝트 지역은 서울(ap-northeast-2) — 개인정보 처리방침 7절에 그렇게 적었다. 다른 지역이면 처리방침을 고칠 것.
-- 2026-10-21: 묘해 프로젝트(회사 공용 — 페이스루틴·노티 자동 게시 저장소도 여기)에 얹는다. 이 파일은 fq_ 로 시작하는 것만 만들고 다른 표는 건드리지 않는다.
--   묘해 앱 안에 anon 키가 들어 있어 사실상 공개 값이다 → 제출 함수는 사이트 서버만 아는 비밀값(p_secret)이 맞을 때만 받는다.
--
-- ▶ 실행 순서
--   1) 이 파일 전체를 실행
--   2) 비밀값 넣기 — 아래 '<비밀값>' 을 Vercel 환경 변수 FQ_SUBMIT_SECRET 과 같은 값으로(맥 터미널: openssl rand -hex 24)
--        insert into public.fq_config (key, value) values ('submit_secret', '<비밀값>')
--        on conflict (key) do update set value = excluded.value;

create sequence if not exists fq_report_no_seq;

create table if not exists public.fq_reports (
  id          bigserial primary key,
  no          text not null unique default lpad(nextval('fq_report_no_seq')::text, 4, '0'),
  created_at  timestamptz not null default now(),
  lang        text not null check (lang in ('ko', 'en')),
  kind        text not null check (kind in ('err', 'new')),
  case_id     text check (case_id ~ '^[a-z0-9-]{1,24}$'),
  quote       text check (char_length(quote) <= 300),
  body        text not null check (char_length(body) between 1 and 1000),
  evidence    text[] not null default '{}' check (cardinality(evidence) <= 3),
  nickname    text check (char_length(nickname) <= 20),
  email       text check (char_length(email) <= 120),
  consent     boolean not null default false,
  ip_hash     text,
  status      text not null default 'received' check (status in ('received', 'investigating', 'verdict', 'dismissed')),
  closed_at   timestamptz,          -- 판결·기각한 날 (대시보드에서 status 와 함께 적는다) → 30일 뒤 이메일 삭제
  award_no    text,                 -- 공로장 코드를 보냈으면 접수번호 그대로(기록용)
  memo        text                  -- 내부 메모
);

alter table public.fq_reports enable row level security;
revoke all on public.fq_reports from anon, authenticated;
revoke all on sequence fq_report_no_seq from anon, authenticated;

-- 사이트 서버와 함께 아는 비밀값 (RLS 켬·정책 없음 = anon 은 못 읽는다)
create table if not exists public.fq_config (key text primary key, value text not null);
alter table public.fq_config enable row level security;
revoke all on public.fq_config from anon, authenticated;

-- 예전(비밀값 없는) 함수가 남아 있으면 지운다 — 인자가 달라 따로 남는다
drop function if exists public.fq_submit_report(text, text, text, text, text, text[], text, text, boolean, text);

create or replace function public.fq_submit_report(
  p_secret text,
  p_lang text, p_kind text, p_case_id text, p_quote text, p_body text, p_evidence text[],
  p_nickname text, p_email text, p_consent boolean, p_ip_hash text
) returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_no text;
  v_secret text;
begin
  -- 사이트 서버에서 온 것만 (비밀값이 아직 없으면 받지 않는다 → 사이트는 메일 보내기로 바뀐다)
  select value into v_secret from fq_config where key = 'submit_secret';
  if v_secret is null or length(v_secret) < 16 then raise exception 'not_configured'; end if;
  if p_secret is null or p_secret <> v_secret then raise exception 'forbidden'; end if;

  -- 형식 검사 (사이트 서버도 하지만 한 번 더)
  if p_lang not in ('ko', 'en') or p_kind not in ('err', 'new') then raise exception 'bad_request'; end if;
  if p_kind = 'new' and nullif(btrim(coalesce(p_quote, '')), '') is null then raise exception 'quote_required'; end if;
  if nullif(btrim(coalesce(p_body, '')), '') is null then raise exception 'body_required'; end if;
  if exists (select 1 from unnest(coalesce(p_evidence, '{}')) u where u !~* '^https?://[^[:space:]]+$' or char_length(u) > 500) then
    raise exception 'bad_evidence';
  end if;
  if nullif(p_email, '') is not null and p_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$' then raise exception 'bad_email'; end if;

  -- 정리: 하루 지난 접속 주소 해시 · 판결 30일 지난 이메일
  update fq_reports set ip_hash = null where ip_hash is not null and created_at < now() - interval '1 day';
  update fq_reports set email = null where email is not null and closed_at is not null and closed_at < now() - interval '30 days';
  delete from fq_reports where closed_at is not null and closed_at < now() - interval '3 years';   -- 처리방침 7절: 판결 뒤 3년

  -- 스팸: 같은 주소 시간당 5건, 전체 시간당 300건
  if p_ip_hash is not null and (select count(*) from fq_reports where ip_hash = p_ip_hash and created_at > now() - interval '1 hour') >= 5 then
    raise exception 'rate_limited';
  end if;
  if (select count(*) from fq_reports where created_at > now() - interval '1 hour') >= 300 then
    raise exception 'rate_limited';
  end if;

  if (nullif(p_nickname, '') is not null or nullif(p_email, '') is not null) and not coalesce(p_consent, false) then
    raise exception 'consent_required';
  end if;

  insert into fq_reports (lang, kind, case_id, quote, body, evidence, nickname, email, consent, ip_hash)
  values (p_lang, p_kind, nullif(p_case_id, ''), nullif(p_quote, ''), p_body, coalesce(p_evidence, '{}'),
          nullif(p_nickname, ''), nullif(p_email, ''), coalesce(p_consent, false), p_ip_hash)
  returning no into v_no;
  return v_no;
end;
$$;

revoke all on function public.fq_submit_report(text, text, text, text, text, text, text[], text, text, boolean, text) from public;
grant execute on function public.fq_submit_report(text, text, text, text, text, text, text[], text, text, boolean, text) to anon;
