'use client';

/* 디오게네스의 등불 — 상단 바와 꼬리말. hyunja/chrome.tsx 와 같은 뼈대.
   다른 점: 꼬리말 사업자 정보의 라벨을 굵게 하지 않는다(crimescene 과 같이 본문 굵기). */

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

const BASE = '/diogeneslamp';

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const path = usePathname();
  return (
    <Link href={href} className={path === href ? 'dl-on' : undefined}>
      {children}
    </Link>
  );
}

function Header() {
  const { lang, setLang, L } = useLang();
  return (
    <header className="dl-hdr">
      <div className="dl-wrap dl-hdr-in">
        <Link className="dl-brand" href={BASE}>
          <Image src="/diogeneslamp/icon-120.webp" alt="" width={30} height={30} />
          {L(APP_KO, APP_EN)}
        </Link>
        <nav>
          <NavItem href={`${BASE}/support`}>{L('지원', 'Support')}</NavItem>
          <NavItem href={`${BASE}/privacy`}>{L('개인정보', 'Privacy')}</NavItem>
          <button
            className="dl-langbtn"
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
    <footer className="dl-foot">
      <div className="dl-wrap">
        <div className="dl-links">
          <Link href={BASE}>{L('소개', 'Overview')}</Link>
          <Link href={`${BASE}/support`}>{L('지원 · Support', 'Support')}</Link>
          <Link href={`${BASE}/privacy`}>{L('개인정보 처리방침', 'Privacy Policy')}</Link>
          <Link href={`${BASE}/terms`}>{L('이용 약관', 'Terms of Use')}</Link>
          <a href={`mailto:${MAIL}`}>{MAIL}</a>
          <Link href="/">{L('yeahplus 홈', 'yeahplus home')}</Link>
        </div>
        <div>
          ⓒ {year} {company} · {L(APP_KO, APP_EN)}
        </div>
        <address className="dl-biz">
          {L('상호', 'Company')} {company} · {L('대표', 'CEO')} {BIZ.ceo} ·{' '}
          {L('사업자등록번호', 'Business reg. no.')} {BIZ.regNo}
          <br />
          {L('통신판매업신고', 'Mail-order reg. no.')} {BIZ.mailOrder} · {L('주소', 'Address')}{' '}
          {BIZ.address}
        </address>
      </div>
    </footer>
  );
}

export default function SiteShell({ year, children }: { year: number; children: React.ReactNode }) {
  return (
    <LangProvider>
      <div className="dl-page">
        <Header />
        <main>{children}</main>
        <Footer year={year} />
      </div>
    </LangProvider>
  );
}

/** App Store 버튼 — APP_ID(i18n.tsx) 가 비어 있으면 링크 없는 '곧 출시' 안내로 바뀐다. */
export function StoreButton({ primary = false }: { primary?: boolean }) {
  const { lang, L } = useLang();
  const href = appStoreUrl(lang);
  if (!href) {
    return <span className="dl-btn-note">{L('App Store 곧 출시', 'Coming soon to the App Store')}</span>;
  }
  return (
    <a className={`dl-btn ${primary ? 'dl-pri' : ''}`} href={href} target="_blank" rel="noreferrer">
      {L('App Store에서 받기', 'Download on the App Store')}
    </a>
  );
}
