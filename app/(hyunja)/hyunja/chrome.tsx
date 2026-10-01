'use client';

/* 현자의 서재 — 상단 바와 꼬리말.
   문안은 site/hyunja 의 것을 따르고, 문의 주소만 사이트 기준인 contact@ 로 통일했다. */

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  APP_EN,
  APP_KO,
  BIZ,
  COMPANY_EN,
  COMPANY_KO,
  LangProvider,
  MAIL,
  appStoreUrl,
  useLang,
} from './i18n';

const BASE = '/hyunja';

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const path = usePathname();
  return (
    <Link href={href} className={path === href ? 'hj-on' : undefined}>
      {children}
    </Link>
  );
}

function Header() {
  const { lang, setLang, L } = useLang();
  return (
    <header className="hj-hdr">
      <div className="hj-wrap hj-hdr-in">
        <Link className="hj-brand" href={BASE}>
          <Image src="/hyunja/icon-120.webp" alt="" width={30} height={30} />
          {L(APP_KO, APP_EN)}
        </Link>
        <nav>
          <NavItem href={`${BASE}/support`}>{L('도움말', 'Help')}</NavItem>
          <NavItem href={`${BASE}/privacy`}>{L('개인정보', 'Privacy')}</NavItem>
          <button
            className="hj-langbtn"
            type="button"
            onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
            aria-label={L('Switch to English', '한국어로 보기')}
          >
            {L('EN', '한국어')}
          </button>
        </nav>
      </div>
    </header>
  );
}

function Footer({ year }: { year: number }) {
  const { L } = useLang();
  const company = L(COMPANY_KO, COMPANY_EN);
  return (
    <footer>
      <div className="hj-wrap">
        <div className="hj-links">
          <Link href={BASE}>{L('소개', 'Overview')}</Link>
          <Link href={`${BASE}/support`}>{L('도움말 · Support', 'Support')}</Link>
          <Link href={`${BASE}/privacy`}>{L('개인정보 처리방침', 'Privacy Policy')}</Link>
          <Link href={`${BASE}/terms`}>{L('이용 약관', 'Terms of Use')}</Link>
          <a href={`mailto:${MAIL}`}>{MAIL}</a>
          <Link href="/">{L('yeahplus 홈', 'yeahplus home')}</Link>
        </div>
        <div>
          ⓒ {year} {company} · {L(APP_KO, APP_EN)}
        </div>
        <address className="hj-biz">
          <b>{L('상호', 'Company')}</b> {company} · <b>{L('대표', 'CEO')}</b> {BIZ.ceo} ·{' '}
          <b>{L('사업자등록번호', 'Business reg. no.')}</b> {BIZ.regNo}
          <br />
          <b>{L('통신판매업신고', 'Mail-order reg. no.')}</b> {BIZ.mailOrder} ·{' '}
          <b>{L('주소', 'Address')}</b> {BIZ.address}
        </address>
      </div>
    </footer>
  );
}

export default function SiteShell({ year, children }: { year: number; children: React.ReactNode }) {
  return (
    <LangProvider>
      <div className="hj-page">
        <Header />
        <main>{children}</main>
        <Footer year={year} />
      </div>
    </LangProvider>
  );
}

/** App Store 버튼 — APP_ID(i18n.tsx) 가 비어 있으면 안내 문구로 바뀐다. */
export function StoreButton({ primary = false }: { primary?: boolean }) {
  const { lang, L } = useLang();
  const href = appStoreUrl(lang);
  if (!href) {
    return (
      <span className="hj-btn-note">{L('App Store 출시 준비 중', 'Coming soon to the App Store')}</span>
    );
  }
  return (
    <a
      className={`hj-btn ${primary ? 'hj-pri' : ''}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {L('App Store에서 받기', 'Download on the App Store')}
    </a>
  );
}
