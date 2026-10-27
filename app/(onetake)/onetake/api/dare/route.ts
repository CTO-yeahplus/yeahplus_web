/* 원 테이크 도전장 짧은 주소 (sql/onetake_dares.sql — 보관 7일).
 *   POST /onetake/api/dare  본문 = 기록 코드 'v1.…' (text/plain — 앱 WKWebView 에서 사전 요청 없이 보내려고)  → { id }  (링크 = /onetake/c/<id>)
 *   GET  /onetake/api/dare?id=Ab3x9Kq  → { code } · 7일 지났거나 없으면 404 { error: 'expired' }
 * Supabase 함수 ot_save_dare · ot_get_dare 만 부른다(표는 RLS 로 잠겨 있다). 묘해 프로젝트(회사 공용)라 주소·anon 키는 수상한 명언과 같은 환경 변수를 쓴다.
 * 설정: SQL 실행 + Vercel 환경 변수 OT_SUBMIT_SECRET(SQL 의 ot_config.submit_secret 과 같은 값). 없으면 503 → 앱은 예전처럼 긴 링크(# 뒤에 기록)로 보낸다.
 * 접속 주소는 소금 친 해시로만 넘긴다(시간당 30건 제한, DB 가 하루 뒤 지운다). */

import { createHash } from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const URL_ = process.env.OT_SUPABASE_URL || process.env.FQ_SUPABASE_URL;
const KEY = process.env.OT_SUPABASE_ANON_KEY || process.env.FQ_SUPABASE_ANON_KEY;
const SECRET = process.env.OT_SUBMIT_SECRET;
const SALT = process.env.OT_IP_SALT || 'onetake-dare';

/* 앱(Capacitor WKWebView)의 출처 — 사이트 자신은 같은 출처라 필요 없다 */
const ORIGINS = ['capacitor://localhost', 'https://localhost', 'http://localhost'];
const cors = (req: Request): Record<string, string> => {
  const o = req.headers.get('origin') || '';
  return ORIGINS.includes(o) || /^http:\/\/localhost:\d+$/.test(o)
    ? { 'access-control-allow-origin': o, 'access-control-allow-methods': 'GET, POST, OPTIONS', 'access-control-allow-headers': 'content-type', 'access-control-max-age': '86400', vary: 'origin' }
    : {};
};
const json = (req: Request, status: number, body: Record<string, unknown>) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store', ...cors(req) } });

async function rpc(fn: string, args: Record<string, unknown>) {
  return fetch(`${URL_!.replace(/\/$/, '')}/rest/v1/rpc/${fn}`, {
    method: 'POST',
    headers: { apikey: KEY!, authorization: `Bearer ${KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({ p_secret: SECRET, ...args }),
    cache: 'no-store',
  });
}

export function OPTIONS(req: Request) {
  return new Response(null, { status: 204, headers: cors(req) });
}

export async function POST(req: Request) {
  const raw = (await req.text().catch(() => '')).trim();
  let code = raw;
  if (raw.startsWith('{')) { try { code = String(JSON.parse(raw).code || ''); } catch { code = ''; } }
  if (code.length < 40 || code.length > 20000 || !/^v1\.[A-Za-z0-9_-]+$/.test(code)) return json(req, 400, { error: 'bad_code' });
  if (!URL_ || !KEY || !SECRET) return json(req, 503, { error: 'not_configured' });
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || '';
  const ipHash = ip ? createHash('sha256').update(SALT + ip).digest('hex').slice(0, 32) : null;
  try {
    const r = await rpc('ot_save_dare', { p_code: code, p_ip_hash: ipHash });
    if (r.ok) {
      const id = await r.json();
      return typeof id === 'string' ? json(req, 200, { id }) : json(req, 502, { error: 'bad_reply' });
    }
    const t = await r.text();
    if (t.includes('rate_limited')) return json(req, 429, { error: 'rate_limited' });
    return json(req, 502, { error: 'upstream' });
  } catch {
    return json(req, 502, { error: 'upstream' });
  }
}

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get('id') || '';
  if (!/^[A-Za-z0-9]{7}$/.test(id)) return json(req, 400, { error: 'bad_id' });
  if (!URL_ || !KEY || !SECRET) return json(req, 503, { error: 'not_configured' });
  try {
    const r = await rpc('ot_get_dare', { p_id: id });
    if (!r.ok) return json(req, 502, { error: 'upstream' });
    const code = await r.json();
    return typeof code === 'string' && code ? json(req, 200, { code }) : json(req, 404, { error: 'expired' });
  } catch {
    return json(req, 502, { error: 'upstream' });
  }
}
