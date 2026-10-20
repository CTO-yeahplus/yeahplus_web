'use client';

/* 수상한 명언 수사본부 — 사건 게시판. 데이터는 ./board.ts (우리가 정리해 적고 push). */

import Link from 'next/link';
import { useState } from 'react';
import { useDocTitle, useLang } from '../i18n';
import { BOARD, type BoardCase, type Status, type Verdict } from './board';

const STATUS: Record<Status, { ko: string; en: string }> = {
  received: { ko: '접수', en: 'Received' },
  investigating: { ko: '수사 중', en: 'Investigating' },
  verdict: { ko: '판결', en: 'Verdict' },
  dismissed: { ko: '기각', en: 'Dismissed' },
};
const VERDICT: Record<Verdict, { ko: string; en: string }> = {
  real: { ko: '진짜', en: 'Real' },
  fake: { ko: '가짜', en: 'Fake' },
  twisted: { ko: '변조', en: 'Twisted' },
  unchanged: { ko: '원판정 유지', en: 'Verdict stands' },
};
const host = (u: string) => {
  try { return new URL(u).hostname.replace(/^www\./, ''); } catch { return u; }
};

function Card({ c, pinned }: { c: BoardCase; pinned?: boolean }) {
  const { L } = useLang();
  const stamp = c.status === 'verdict' && c.verdict ? L(VERDICT[c.verdict].ko, VERDICT[c.verdict].en) : L(STATUS[c.status].ko, STATUS[c.status].en);
  return (
    <article className={`fq-card fq-s-${c.status}${c.verdict ? ' fq-v-' + c.verdict : ''}${pinned ? ' fq-pinned' : ''}`}>
      {pinned && <p className="fq-pin">{L('이번 주 수배 명언', 'This week’s wanted quote')}</p>}
      <div className="fq-card-top">
        <span className="fq-no">{L('접수', 'No.')} {c.no} · {c.date}{c.kind === 'err' && c.caseId ? ` · ${L('사건', 'Case')} ${c.caseId}` : ''}</span>
        <span className="fq-stamp">{stamp}</span>
      </div>
      <p className="fq-quote dl-serif">“{L(c.quote.ko, c.quote.en)}”</p>
      <p className="fq-who">— {L(c.who.ko, c.who.en)} {c.kind === 'err' ? L('(앱 판정에 대한 이의)', '(objection to a verdict)') : L('(새 수상한 명언)', '(new fishy quote)')}</p>
      {c.summary && <p className="fq-summary">{L(c.summary.ko, c.summary.en)}</p>}
      {c.sources && c.sources.length > 0 && (
        <ul className="fq-src">
          {c.sources.map((u) => (
            <li key={u}><a href={u} target="_blank" rel="noreferrer">{host(u)}</a></li>
          ))}
        </ul>
      )}
      {(c.fixedIn || c.nickname) && (
        <p className="fq-foot">
          {c.fixedIn && L(`앱 ${c.fixedIn} 에 반영`, `Fixed in app ${c.fixedIn}`)}
          {c.fixedIn && c.nickname && ' · '}
          {c.nickname && `${L('제보', 'Reported by')}: ${c.nickname}`}
        </p>
      )}
    </article>
  );
}

export default function CasesContent() {
  const { L } = useLang();
  useDocTitle('사건 게시판 — 수상한 명언 수사본부', 'Case board — Fishy Quotes Case HQ');
  const [f, setF] = useState<Status | 'all'>('all');
  const pinned = BOARD.find((c) => c.pinned);
  const list = BOARD.filter((c) => c !== pinned && (f === 'all' || c.status === f)).sort((a, b) => b.date.localeCompare(a.date) || b.no.localeCompare(a.no));
  const count = (s: Status) => BOARD.filter((c) => c.status === s).length;

  return (
    <div className="dl-wrap dl-narrow dl-doc">
      <p className="dl-kicker fq-kicker">{L('수사본부', 'Case HQ')}</p>
      <h1>{L('사건 게시판', 'Case board')}</h1>
      <p className="dl-meta">
        {L(
          '수사본부에 들어온 제보를 편집부가 원문과 첫 출처로 대조해 판결합니다. 판정은 다수결이 아니라 증거로 정합니다. 제보 원문과 이메일은 공개하지 않습니다.',
          'Our editors check every report against the original and the earliest source. Verdicts are decided by evidence, not by vote. What reporters write and their emails are never published.'
        )}
      </p>

      <ol className="fq-steps">
        <li><b>{L('접수', 'Received')}</b>{L('제보가 들어오면 명언과 인물을 올립니다', 'We post the quote and who it is credited to')}</li>
        <li><b>{L('수사 중', 'Investigating')}</b>{L('원문·첫 출처·시대를 대조합니다', 'We trace the original, the earliest source and the dates')}</li>
        <li><b>{L('판결', 'Verdict')}</b>{L('진짜 · 가짜 · 변조 · 원판정 유지, 앱 다음 업데이트에 반영', 'Real · Fake · Twisted · Verdict stands — fixed in the next app update')}</li>
      </ol>

      <div className="fq-actions">
        <Link className="dl-btn" href="/fishyquotes/report">{L('수상한 명언 제보하기', 'Report a fishy quote')}</Link>
      </div>

      {pinned && <Card c={pinned} pinned />}

      {BOARD.length === 0 ? (
        <div className="fq-empty">
          <p className="dl-serif">{L('아직 공개된 사건이 없습니다.', 'No cases on the board yet.')}</p>
          <p>{L('첫 제보를 기다립니다. 요즘 본 명언 중에 수상한 것이 있었나요?', 'We are waiting for the first report. Seen a quote lately that looked fishy?')}</p>
        </div>
      ) : (
        <>
          <div className="fq-filter" role="group" aria-label={L('상태로 거르기', 'Filter by status')}>
            <button type="button" aria-pressed={f === 'all'} onClick={() => setF('all')}>{L('전체', 'All')} {BOARD.length}</button>
            {(Object.keys(STATUS) as Status[]).map((s) => (
              <button key={s} type="button" aria-pressed={f === s} onClick={() => setF(s)}>
                {L(STATUS[s].ko, STATUS[s].en)} {count(s)}
              </button>
            ))}
          </div>
          {list.length === 0 ? (
            <p className="fq-none">{L('이 상태의 사건이 없습니다.', 'No cases with this status.')}</p>
          ) : (
            list.map((c) => <Card key={c.no} c={c} />)
          )}
        </>
      )}

      <p className="dl-meta" style={{ marginTop: 30 }}>
        <Link href="/fishyquotes">{L('수상한 명언 홈', 'Fishy Quotes home')}</Link>
        {' · '}
        <Link href="/fishyquotes/support">{L('지원', 'Support')}</Link>
        {' · '}
        <Link href="/fishyquotes/privacy">{L('개인정보 처리방침', 'Privacy Policy')}</Link>
      </p>
    </div>
  );
}
