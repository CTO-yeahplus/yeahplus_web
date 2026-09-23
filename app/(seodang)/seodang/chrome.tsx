'use client';

/* 원본 seodang/web/src/components/Nav.jsx · EndCta.jsx 의 상단 바와 꼬리말.
   바뀐 것: 링크를 next/link + /seodang 경로로, 언어 버튼과 사업자 정보 추가,
   문의 주소를 contact@ 로. */

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BIZ, COMPANY_EN, COMPANY_KO, LangProvider, MAIL, appStoreUrl, useLang } from './i18n';
import { useHideOnScroll } from './hooks';

const BASE = '/seodang';

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const path = usePathname();
  return (
    <Link href={href} className={path === href ? 'sd-on' : undefined}>
      {children}
    </Link>
  );
}

function Header() {
  const hidden = useHideOnScroll();
  const { lang, setLang, L } = useLang();
  return (
    <nav className={hidden ? 'sd-hide' : ''}>
      <div className="sd-wrap">
        <Link className="sd-brand" href={BASE}>
          <Image src="/seodang/icon-120.webp" alt="" width={30} height={30} />
          {L('성어서당', 'Seodang')}
        </Link>
        <span className="sd-sp">
          <Link href={`${BASE}#try`}>{L('체험', 'Try it')}</Link>
          <Link href={`${BASE}#why`}>{L('특징', 'Why')}</Link>
          <NavItem href={`${BASE}/support`}>{L('지원', 'Support')}</NavItem>
          <NavItem href={`${BASE}/privacy`}>{L('개인정보', 'Privacy')}</NavItem>
          <button
            className="sd-langbtn"
            type="button"
            onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
            aria-label={L('Switch to English', '한국어로 보기')}
          >
            {L('EN', '한국어')}
          </button>
        </span>
      </div>
    </nav>
  );
}

function Footer({ year }: { year: number }) {
  const { L } = useLang();
  return (
    <footer>
      <div className="sd-wrap">
        <div className="sd-links">
          <Link href={BASE}>{L('홈', 'Home')}</Link>
          <Link href={`${BASE}/support`}>{L('지원 · Support', 'Support')}</Link>
          <Link href={`${BASE}/privacy`}>{L('개인정보 처리방침', 'Privacy Policy')}</Link>
          <Link href={`${BASE}/terms`}>{L('이용 약관', 'Terms of Use')}</Link>
          <a href={`mailto:${MAIL}`}>{MAIL}</a>
          <Link href="/">{L('yeahplus 홈', 'yeahplus home')}</Link>
        </div>
        <div>
          ⓒ {year} {L(COMPANY_KO, COMPANY_EN)} · {L('성어서당', 'Seodang')}
        </div>
        <address className="sd-meta" style={{ fontStyle: 'normal', lineHeight: 1.8 }}>
          <b>{L('상호', 'Company')}</b> {L(COMPANY_KO, COMPANY_EN)} · <b>{L('대표', 'CEO')}</b>{' '}
          {BIZ.ceo} · <b>{L('사업자등록번호', 'Business reg. no.')}</b> {BIZ.regNo}
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
      <div className="sd-page">
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
      <span className="sd-btn-note">{L('App Store 출시 준비 중', 'Coming soon to the App Store')}</span>
    );
  }
  return (
    <a className={`sd-btn ${primary ? 'sd-pri' : ''}`} href={href} target="_blank" rel="noreferrer">
      {L('App Store에서 받기', 'Download on the App Store')}
    </a>
  );
}
