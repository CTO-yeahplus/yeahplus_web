'use client';

/* 긴 글 페이지(개인정보 · 약관 · 지원)의 틀: 제목, 시행일, 읽은 만큼 차는 위쪽 막대. */

import { useEffect, useRef } from 'react';
import { useDocTitle, useLang } from './i18n';

type Pair = { ko: string; en: string };

export default function LegalLayout({ title, sub, children }: { title: Pair; sub: Pair; children: React.ReactNode }) {
  const { L } = useLang();
  useDocTitle(`${title.ko} — 노티: 새벽 3시의 인턴`, `${title.en} — NOTI: The 3 A.M. Intern`);
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
      <div className="nt-readbar" ref={bar} />
      <article className="nt-legal">
        <header>
          <h1>{L(title.ko, title.en)}</h1>
          <p className="nt-sub">{L(sub.ko, sub.en)}</p>
        </header>
        {children}
      </article>
    </>
  );
}

/** 한 조항: 두 언어의 제목과 본문 */
export function Sec({ ko, en, children }: { ko: string; en: string; children: React.ReactNode }) {
  const { L } = useLang();
  return (
    <section>
      <h2>{L(ko, en)}</h2>
      {children}
    </section>
  );
}
