'use client';

/* 긴 글 페이지(개인정보 · 약관 · 지원)의 틀: 제목, 시행일, 읽은 만큼 그어지는 위쪽 먹 줄. */

import { useEffect, useRef } from 'react';
import { BIZ, COMPANY_EN, COMPANY_KO, L, LB, MAIL, NAME, type Pair, useDocTitle } from './i18n';
import { c } from './cx';

export default function LegalLayout({ title, sub, children }: { title: Pair; sub: Pair; children: React.ReactNode }) {
  useDocTitle(`${title.ko} — ${NAME.ko}`, `${title.en} — ${NAME.en}`);
  const bar = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      if (bar.current) bar.current.style.transform = `scaleX(${Math.min(1, h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight))})`;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <>
      <div className={c('readbar')} ref={bar} />
      <article className={c('legal')}>
        <header>
          <h1><L ko={title.ko} en={title.en} /></h1>
          <p className={c('sub')}><L ko={sub.ko} en={sub.en} /></p>
        </header>
        {children}
      </article>
    </>
  );
}

/** 한 조항: 두 언어의 제목과 본문 */
export function Sec({ ko, en, children }: { ko: string; en: string; children: React.ReactNode }) {
  return (
    <section>
      <h2><L ko={ko} en={en} /></h2>
      {children}
    </section>
  );
}
/** 본문 한 토막: 두 언어 */
export const P = ({ ko, en, className }: { ko: React.ReactNode; en: React.ReactNode; className?: string }) => (
  <LB as="p" className={className ? c(className) : undefined} ko={ko} en={en} />
);
/** 목록: [[ko, en], …] */
export const List = ({ items }: { items: [string, string][] }) => (
  <ul>
    {items.map(([ko, en], i) => (
      <li key={i}><L ko={ko} en={en} /></li>
    ))}
  </ul>
);
/** 연락처 표 */
export function Who({ officer }: { officer?: boolean }) {
  const mail = <a href={`mailto:${MAIL}`}>{MAIL}</a>;
  return (
    <>
      <dl className={c('who')} data-l="ko">
        <dt>회사</dt><dd>{COMPANY_KO}{officer ? '' : ` (대표 ${BIZ.ceo})`}</dd>
        {officer && (<><dt>개인정보 보호책임자</dt><dd>{BIZ.ceo} (대표)</dd></>)}
        <dt>이메일</dt><dd>{mail}</dd>
        <dt>주소</dt><dd>{BIZ.address}</dd>
      </dl>
      <dl className={c('who')} data-l="en">
        <dt>Company</dt><dd>{COMPANY_EN}</dd>
        {officer && (<><dt>Privacy officer</dt><dd>{BIZ.ceo} (CEO)</dd></>)}
        <dt>Email</dt><dd>{mail}</dd>
        <dt>Address</dt><dd>{BIZ.addressEn}</dd>
      </dl>
    </>
  );
}
