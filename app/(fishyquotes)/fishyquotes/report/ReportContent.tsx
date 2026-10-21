'use client';

/* 수상한 명언 수사본부 — 제보 양식.
 * 사건 번호(id)가 오면 /fishyquotes/case-index.json(앱 저장소 build.py 가 만든다 — 판정은 들어 있지 않다)에서 명언·인물을 찾아 보여 준다.
 * 보내기 → /fishyquotes/api/report. 서버가 아직 준비되지 않았으면(fallback) 같은 내용을 메일로 보내는 버튼으로 바뀐다.
 * 제보 원문·이메일은 게시판에 나오지 않는다. 명세: 앱 저장소 APLUS/fishyquotes/docs/CASE_BOARD.md */

import Link from 'next/link';
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react';
import { MAIL, useDocTitle, useLang } from '../i18n';

type Item = { id: string; type: 'case' | 'card'; who: { ko: string; en: string }; ko: string; en: string };
type Phase = 'edit' | 'sending' | 'done' | 'fallback' | 'limited' | 'error';

const MAX_BODY = 1000;

/* 페이지는 빌드 때 주소 파라미터 없이 미리 그려진다 → 파라미터는 화면이 붙은 뒤(하이드레이션 뒤)에 읽는다.
   서버 스냅샷은 null 이라 첫 렌더는 빈 자리, 그다음 실제 주소로 양식을 그린다(하이드레이션 불일치 #418 방지). */
const noop = () => () => {};
export default function ReportContent() {
  useDocTitle('제보 접수 — 수상한 명언 수사본부', 'File a report — Fishy Quotes Case HQ');
  const search = useSyncExternalStore(noop, () => window.location.search, () => null);
  if (search === null) return <div className="dl-wrap dl-narrow dl-doc" />;
  return <ReportForm key={search} sp={new URLSearchParams(search)} />;
}

function ReportForm({ sp }: { sp: URLSearchParams }) {
  const { L, lang } = useLang();
  const id = (sp.get('id') || '').toLowerCase();
  const q0 = (sp.get('q') || '').slice(0, 300);

  const [items, setItems] = useState<Item[] | null>(null);
  const [kind, setKind] = useState<'err' | 'new'>(sp.get('k') === 'err' && id ? 'err' : 'new');
  const [quote, setQuote] = useState(q0);
  const [body, setBody] = useState('');
  const [links, setLinks] = useState(['', '', '']);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(''); // 숨김 칸(honeypot)
  const [phase, setPhase] = useState<Phase>('edit');
  const [no, setNo] = useState('');
  const [problem, setProblem] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch('/fishyquotes/case-index.json')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setItems(d && Array.isArray(d.items) ? d.items : []))
      .catch(() => setItems([]));
  }, [id]);

  const item = useMemo(() => (items && id ? items.find((x) => x.id === id) || null : null), [items, id]);
  // 목록에 없는 사건 번호는 오류 대신 '새 명언' 양식으로
  const errMode = kind === 'err' && !!id && (items === null || !!item);
  const needConsent = !!(nickname.trim() || email.trim());
  const evidence = links.map((s) => s.trim()).filter(Boolean);

  const check = () => {
    if (!errMode && !quote.trim()) return L('명언 문장을 적어 주세요.', 'Please write the quote.');
    if (!body.trim()) return L('무엇이 수상한지 적어 주세요.', 'Please tell us what looks fishy.');
    if (!evidence.every((s) => /^https?:\/\/\S+$/i.test(s))) return L('근거 링크는 http:// 또는 https:// 로 시작해야 합니다.', 'Links must start with http:// or https://.');
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return L('이메일 주소를 확인해 주세요.', 'Please check the email address.');
    if (needConsent && !consent) return L('닉네임이나 이메일을 남기시려면 아래 동의에 체크해 주세요.', 'To leave a nickname or email, please tick the consent box.');
    return '';
  };

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const p = check();
    setProblem(p);
    if (p) return;
    setPhase('sending');
    try {
      const r = await fetch('/fishyquotes/api/report', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          lang, kind: errMode ? 'err' : 'new', caseId: errMode ? id : '', quote: errMode ? '' : quote,
          body, evidence, nickname, email, consent: needConsent ? consent : false, website,
        }),
      });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.no) { setNo(d.no); setPhase('done'); window.scrollTo(0, 0); return; }
      if (r.status === 429) { setPhase('limited'); return; }
      if (d.fallback) { setPhase('fallback'); return; }
      setPhase('error');
    } catch {
      setPhase('fallback');
    }
  };

  const mailHref = () => {
    const subj = `[${L('수상한 명언', 'Fishy Quotes')}] ${L('수사본부 제보', 'Case HQ report')}${errMode ? ' · ' + id : ''}`;
    const lines = [
      errMode ? `${L('사건', 'Case')}: ${id}${item ? ` “${L(item.ko, item.en)}” — ${L(item.who.ko, item.who.en)}` : ''}` : `${L('명언', 'Quote')}: ${quote}`,
      '',
      `${L('수상한 점', 'What looks fishy')}:`,
      body,
      '',
      evidence.length ? `${L('근거', 'Sources')}:\n${evidence.join('\n')}` : '',
      nickname ? `${L('닉네임', 'Nickname')}: ${nickname}` : '',
    ].filter((x, i, a) => x || (i > 0 && a[i - 1]));
    return `mailto:${MAIL}?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  if (phase === 'done') {
    return (
      <div className="dl-wrap dl-narrow dl-doc">
        <p className="dl-kicker fq-kicker">{L('수사본부', 'Case HQ')}</p>
        <h1>{L('제보가 접수되었습니다', 'Your report is in')}</h1>
        <div className="fq-receipt">
          <span>{L('접수번호', 'Report no.')}</span>
          <b>{no}</b>
        </div>
        <p>
          {L(
            '편집부가 원문과 첫 출처를 대조해 판결합니다. 진행 상황은 사건 게시판에 접수번호로 올라갑니다. 제보 원문과 이메일은 공개되지 않습니다.',
            'Our editors will check it against the original and the earliest source. Progress is posted on the case board under your report number. What you wrote and your email are never published.'
          )}
        </p>
        {email.trim() && (
          <p>
            {L(
              '채택되면 남겨 주신 이메일로 공로장 코드를 보내 드립니다. 앱의 비망록 → 수사본부 → 코드 입력에 붙여 넣으세요.',
              'If your report is accepted, we will email you a commendation code. Paste it under My Book → Case HQ → Enter code in the app.'
            )}
          </p>
        )}
        <div className="fq-actions">
          <Link className="dl-btn" href="/fishyquotes/cases">{L('사건 게시판 보기', 'See the case board')}</Link>
          <Link className="dl-btn fq-ghost" href="/fishyquotes/report">{L('하나 더 제보하기', 'Report another')}</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="dl-wrap dl-narrow dl-doc">
      <p className="dl-kicker fq-kicker">{L('수사본부', 'Case HQ')}</p>
      <h1>{L('수상한 명언 제보', 'Report a fishy quote')}</h1>
      <p className="dl-meta">
        {L(
          '단톡방에서 본 수상한 명언, 틀렸다고 생각되는 판정을 알려 주세요. 판정은 다수결이 아니라 원문 대조로 정합니다. 채택된 제보에는 공로장을 드립니다.',
          'Seen a fishy quote in a group chat, or think one of our verdicts is wrong? Tell us. Verdicts are decided by checking the original, not by vote. Accepted reports earn a commendation.'
        )}{' '}
        <Link href="/fishyquotes/cases">{L('사건 게시판 →', 'Case board →')}</Link>
      </p>

      <form className="fq-form" onSubmit={send} noValidate>
        {id && (
          <fieldset className="fq-kind">
            <legend>{L('무엇을 제보하나요?', 'What are you reporting?')}</legend>
            <label>
              <input type="radio" name="kind" checked={kind === 'err'} onChange={() => setKind('err')} />
              {L('이 사건의 판정이 틀렸어요', 'This verdict is wrong')}
            </label>
            <label>
              <input type="radio" name="kind" checked={kind === 'new'} onChange={() => setKind('new')} />
              {L('다른 수상한 명언이 있어요', 'A different fishy quote')}
            </label>
          </fieldset>
        )}

        {errMode ? (
          <div className="fq-case">
            <span className="fq-case-no">{L('사건', 'Case')} {id}</span>
            {item ? (
              <>
                <p className="dl-serif">“{L(item.ko, item.en)}”</p>
                <span className="fq-who">— {L(item.who.ko, item.who.en)}</span>
              </>
            ) : (
              <p className="fq-who">{L('사건을 불러오는 중…', 'Loading the case…')}</p>
            )}
          </div>
        ) : (
          <label className="fq-field">
            <span>{L('명언', 'The quote')} <em>*</em></span>
            <textarea rows={3} maxLength={300} value={quote} onChange={(e) => setQuote(e.target.value)}
              placeholder={L('예: 내일 지구가 멸망하더라도 나는 오늘 한 그루의 사과나무를 심겠다 — 스피노자', 'e.g. “Be kind, for everyone you meet is fighting a hard battle.” — Plato')} />
          </label>
        )}

        <label className="fq-field">
          <span>{L('무엇이 수상한가요?', 'What looks fishy?')} <em>*</em></span>
          <textarea rows={6} maxLength={MAX_BODY} value={body} onChange={(e) => setBody(e.target.value)}
            placeholder={L('어디서 봤는지, 왜 의심스러운지, 아는 출처가 있다면 적어 주세요.', 'Where you saw it, why it seems off, and any source you know of.')} />
          <small>{body.length} / {MAX_BODY}</small>
        </label>

        <div className="fq-field">
          <span>{L('근거 링크 (선택, 3개까지)', 'Source links (optional, up to 3)')}</span>
          {links.map((v, i) => (
            <input key={i} type="url" inputMode="url" value={v} placeholder="https://"
              onChange={(e) => setLinks(links.map((x, j) => (j === i ? e.target.value : x)))} />
          ))}
        </div>

        <div className="fq-row">
          <label className="fq-field">
            <span>{L('닉네임 (선택)', 'Nickname (optional)')}</span>
            <input type="text" maxLength={20} value={nickname} onChange={(e) => setNickname(e.target.value)} placeholder={L('판결문에 실릴 이름 · 실명은 권하지 않아요', 'Shown with the verdict · not your real name')} />
          </label>
          <label className="fq-field">
            <span>{L('이메일 (선택)', 'Email (optional)')}</span>
            <input type="email" inputMode="email" maxLength={120} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={L('결과·공로장 코드를 받을 곳', 'For the result and a commendation code')} />
          </label>
        </div>

        {needConsent && (
          <label className="fq-consent">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
            <span>
              {L(
                '[필수] 개인정보 수집·이용에 동의합니다. 수집 항목: 이메일, 닉네임 · 목적: 제보 결과와 공로장 코드 안내, 판결문·사건 게시판에 제보자 표시(닉네임) · 보유 기간: 판결 후 30일 안에 이메일 삭제, 닉네임은 게시물과 앱 판결문이 있는 동안 · 국외 이전: Supabase Inc.의 싱가포르 서버에 보낼 때 저장. 동의하지 않아도 제보할 수 있습니다(닉네임·이메일 칸을 비워 두세요 — 결과 안내와 공로장은 받을 수 없습니다).',
                '[Required] I agree to the collection and use of my email and nickname — only to send me the result and a commendation code, and to credit me by nickname on the case board and in the app. Emails are deleted within 30 days of the verdict. Reports are stored on Supabase Inc.’s servers in Singapore. You can report without them (leave both fields empty — you just won’t get the result or a commendation).'
              )}{' '}
              <Link href="/fishyquotes/privacy">{L('개인정보 처리방침', 'Privacy Policy')}</Link>
            </span>
          </label>
        )}

        {/* 숨김 칸 — 사람은 보지 못한다 */}
        <label className="fq-hp" aria-hidden="true">
          website
          <input type="text" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </label>

        {problem && <p className="fq-problem" role="alert">{problem}</p>}
        {phase === 'limited' && (
          <p className="fq-problem" role="alert">{L('잠시 뒤에 다시 보내 주세요. 짧은 시간에 제보가 많이 들어왔습니다.', 'Please try again a little later — too many reports in a short time.')}</p>
        )}
        {phase === 'error' && (
          <p className="fq-problem" role="alert">{L('보내지 못했습니다. 입력한 내용을 확인해 주세요.', 'We could not send it. Please check what you entered.')}</p>
        )}

        {phase === 'fallback' ? (
          <div className="fq-fallback">
            <p>
              {L(
                '지금은 접수 창구가 준비 중입니다. 같은 내용을 메일로 보내 주시면 똑같이 접수합니다.',
                'Our report desk is not open yet. Send the same report by email and we will file it just the same.'
              )}
            </p>
            <a className="dl-btn" href={mailHref()}>{L('메일로 보내기', 'Send by email')}</a>
          </div>
        ) : (
          <div className="fq-actions">
            <button className="dl-btn" type="submit" disabled={phase === 'sending'}>
              {phase === 'sending' ? L('보내는 중…', 'Sending…') : L('제보 보내기', 'Send report')}
            </button>
          </div>
        )}
        <p className="dl-meta">
          {L('제보 원문과 이메일은 공개되지 않습니다. 게시판에는 편집부가 정리한 사건 기록만 올라갑니다. 제보는 Supabase 의 싱가포르 서버에 저장됩니다.', 'What you write and your email are never published. The board shows only the case records our editors write up. Reports are stored on Supabase servers in Singapore.')}{' '}
          <Link href="/fishyquotes/privacy">{L('개인정보 처리방침 7절', 'Privacy Policy §7')}</Link>
        </p>
      </form>
    </div>
  );
}
