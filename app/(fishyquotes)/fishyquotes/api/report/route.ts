/* 수상한 명언 수사본부 — 제보 접수 (POST /fishyquotes/api/report).
 * Supabase 의 fq_submit_report 함수 하나만 부른다(표는 RLS 로 잠겨 있어 anon 키로는 읽지도 쓰지도 못한다).
 * 설정: sql/fishyquotes_case_hq.sql 을 Supabase(묘해 프로젝트, 회사 공용)에서 실행하고, Vercel 환경 변수 FQ_SUPABASE_URL · FQ_SUPABASE_ANON_KEY
 *   · FQ_SUBMIT_SECRET(SQL 의 fq_config.submit_secret 과 같은 값) · FQ_IP_SALT 를 넣는다. anon 키는 묘해 앱에 들어 있는 공개 값이라 비밀값으로 서버만 통과시킨다.
 * 설정 전이면 503 { fallback: true } → 양식이 메일 보내기로 바뀐다(심사 때 고장 난 페이지가 되지 않게).
 * 접속 주소는 소금을 친 해시로만 넘긴다(시간당 5건 제한용, DB 가 하루 뒤 지운다). */

import { createHash } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const URL_ = process.env.FQ_SUPABASE_URL;
const KEY = process.env.FQ_SUPABASE_ANON_KEY;
const SECRET = process.env.FQ_SUBMIT_SECRET;
const SALT = process.env.FQ_IP_SALT || 'fishyquotes-case-hq';

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const isUrl = (s: string) => /^https?:\/\/[^\s]+$/i.test(s) && s.length <= 500;
const isMail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) && s.length <= 120;

const json = (status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = await req.json();
  } catch {
    return json(400, { error: 'bad_request' });
  }

  // 숨김 칸(honeypot)이 채워졌으면 받은 척만 한다
  if (str(b.website, 200)) return json(200, { no: '0000' });

  const lang = b.lang === 'en' ? 'en' : 'ko';
  const kind = b.kind === 'err' ? 'err' : 'new';
  const caseId = str(b.caseId, 24);
  const quote = str(b.quote, 300);
  const body = str(b.body, 1000);
  const evidence = (Array.isArray(b.evidence) ? b.evidence : []).map((x) => str(x, 500)).filter(Boolean);
  const nickname = str(b.nickname, 20);
  const email = str(b.email, 120);
  const consent = b.consent === true;

  if (caseId && !/^[a-z0-9-]{1,24}$/.test(caseId)) return json(400, { error: 'bad_case' });
  if (kind === 'new' && !quote) return json(400, { error: 'quote_required' });
  if (!body) return json(400, { error: 'body_required' });
  if (evidence.length > 3 || !evidence.every(isUrl)) return json(400, { error: 'bad_evidence' });
  if (email && !isMail(email)) return json(400, { error: 'bad_email' });
  if ((nickname || email) && !consent) return json(400, { error: 'consent_required' });

  if (!URL_ || !KEY || !SECRET) return json(503, { fallback: true });

  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || '';
  const ipHash = ip ? createHash('sha256').update(SALT + ip).digest('hex').slice(0, 32) : null;

  try {
    const r = await fetch(`${URL_.replace(/\/$/, '')}/rest/v1/rpc/fq_submit_report`, {
      method: 'POST',
      headers: { apikey: KEY, authorization: `Bearer ${KEY}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        p_secret: SECRET,
        p_lang: lang,
        p_kind: kind,
        p_case_id: caseId || null,
        p_quote: quote || null,
        p_body: body,
        p_evidence: evidence,
        p_nickname: nickname || null,
        p_email: email || null,
        p_consent: consent,
        p_ip_hash: ipHash,
      }),
      cache: 'no-store',
    });
    if (r.ok) {
      const no = await r.json();
      return typeof no === 'string' ? json(200, { no }) : json(502, { fallback: true });
    }
    const t = await r.text();
    if (t.includes('rate_limited')) return json(429, { error: 'rate_limited' });
    return json(502, { fallback: true });
  } catch {
    return json(502, { fallback: true });
  }
}
