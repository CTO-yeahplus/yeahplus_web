'use client';

/**
 * 회사 홈의 긴 글 페이지(개인정보처리방침 · 이용약관 · 지원) 틀.
 * 회사 홈과 같은 머리(로고 · 언어 단추)와 꼬리(사업자 정보)를 쓰고, 본문은 가운데 한 단으로 읽게 둔다.
 */
import Link from 'next/link';
import type { ReactNode } from 'react';
import { LangProvider, useLang } from './lang';
import { Logo } from './Logo';
import { Footer } from './Home';

export const EFFECTIVE = '2026-10-21';
export const MAIL = 'contact@yeahplus.co.kr';

type Pair = { ko: string; en: string };

function Head() {
  const { L, lang, toggle } = useLang();
  return (
    <header className="yp-header">
      <div className="yp-wrap yp-header-in">
        <Link href="/" className="yp-brand" aria-label={L('YeahPlus 회사 홈', 'YeahPlus home')}>
          <Logo size={20} />
          <span>YeahPlus</span>
        </Link>
        <nav className="yp-nav" aria-label={L('문서', 'Documents')}>
          <Link href="/privacy">{L('개인정보처리방침', 'Privacy')}</Link>
          <Link href="/terms">{L('이용약관', 'Terms')}</Link>
          <Link href="/support">{L('지원', 'Support')}</Link>
        </nav>
        <div className="yp-header-end">
          <button type="button" className="yp-lang" onClick={toggle} aria-label={L('Switch to English', '한국어로 보기')}>
            {lang === 'ko' ? 'EN' : '한국어'}
          </button>
        </div>
      </div>
    </header>
  );
}

function Body({ title, sub, children }: { title: Pair; sub: Pair; children: ReactNode }) {
  const { L } = useLang();
  return (
    <div className="yp">
      <Head />
      <main className="yp-legal">
        <article className="yp-wrap yp-legal-in">
          <header className="yp-legal-head">
            <p className="yp-eyebrow">YeahPlus Inc.</p>
            <h1>{L(title.ko, title.en)}</h1>
            <p className="yp-legal-sub">{L(sub.ko, sub.en)}</p>
          </header>
          {children}
        </article>
      </main>
      <Footer />
    </div>
  );
}

export default function LegalPage(props: { title: Pair; sub: Pair; children: ReactNode }) {
  return (
    <LangProvider>
      <Body {...props} />
    </LangProvider>
  );
}

/** 한 조항: 두 언어의 제목과 본문 */
export function Sec({ ko, en, id, children }: { ko: string; en: string; id?: string; children: ReactNode }) {
  const { L } = useLang();
  return (
    <section id={id}>
      <h2>{L(ko, en)}</h2>
      {children}
    </section>
  );
}

/** 두 언어 중 지금 언어의 내용 */
export function T({ ko, en }: { ko: ReactNode; en: ReactNode }) {
  const { L } = useLang();
  return <>{L(ko, en)}</>;
}

export function Mail() {
  return <a href={`mailto:${MAIL}`}>{MAIL}</a>;
}
