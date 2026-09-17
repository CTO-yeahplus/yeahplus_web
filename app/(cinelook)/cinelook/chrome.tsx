'use client';

/* 원본 NEXTGEN_CINEMATIC/site/src/components/Layout.jsx.
   react-router 의 Link/NavLink → next/link + usePathname 으로만 바꿨다. */

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BIZ, COMPANY, LangProvider, MAIL, appStoreUrl, useLang } from './i18n';

const BASE = '/cinelook';

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const path = usePathname();
  return (
    <Link href={href} className={path === href ? 'cl-on' : undefined}>
      {children}
    </Link>
  );
}

function Header() {
  const { lang, setLang, L } = useLang();

  return (
    <header className="cl-hdr">
      <div className="cl-wrap cl-hdr-in">
        <Link className="cl-brand" href={BASE}>
          <Image src="/cinelook/icon-120.webp" alt="" width={30} height={30} />
          <span>CineLook</span>
        </Link>
        <nav>
          <NavItem href={`${BASE}/support`}>{L('고객 지원', 'Support')}</NavItem>
          <NavItem href={`${BASE}/privacy`}>{L('개인정보', 'Privacy')}</NavItem>
          <button
            className="cl-langbtn"
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

  return (
    <footer>
      <div className="cl-wrap">
        <div className="cl-foot-in">
          <nav>
            <Link href={BASE}>{L('홈', 'Home')}</Link>
            <Link href={`${BASE}/support`}>{L('고객 지원', 'Support')}</Link>
            <Link href={`${BASE}/privacy`}>{L('개인정보 처리방침', 'Privacy Policy')}</Link>
            <Link href={`${BASE}/terms`}>{L('이용 약관', 'Terms of Use')}</Link>
            <a href={`mailto:${MAIL}`}>{MAIL}</a>
            <Link href="/">{L('yeahplus 홈', 'yeahplus home')}</Link>
          </nav>
          <div className="cl-copy">
            © {year} {COMPANY}
          </div>
        </div>
        <address className="cl-biz">
          <div className="cl-row">
            <span>
              <b>{L('상호', 'Company')}</b> {COMPANY}
            </span>
            <span>
              <b>{L('대표', 'CEO')}</b> {BIZ.ceo}
            </span>
            <span>
              <b>{L('사업자등록번호', 'Business reg. no.')}</b> {BIZ.regNo}
            </span>
          </div>
          <div className="cl-row">
            <span>
              <b>{L('통신판매업신고', 'Mail-order reg. no.')}</b> {BIZ.mailOrder}
            </span>
          </div>
          <div className="cl-row">
            <span>
              <b>{L('주소', 'Address')}</b> {BIZ.address}
            </span>
          </div>
        </address>
      </div>
    </footer>
  );
}

export default function SiteShell({ year, children }: { year: number; children: React.ReactNode }) {
  return (
    <LangProvider>
      <div className="cl-page">
        <Header />
        <main>{children}</main>
        <Footer year={year} />
      </div>
    </LangProvider>
  );
}

/** App Store 버튼 — APP_ID(i18n.tsx) 가 비어 있으면 안내 문구로 바뀐다. */
export function StoreButton() {
  const { lang, L } = useLang();
  const href = appStoreUrl(lang);
  if (!href) {
    return (
      <span className="cl-btn-note">
        {L('App Store 출시 준비 중', 'Coming soon to the App Store')}
      </span>
    );
  }
  return (
    <a className="cl-btn" href={href} target="_blank" rel="noreferrer">
      {L('App Store에서 받기', 'Download on the App Store')}
    </a>
  );
}
