'use client';

import Link from 'next/link';
import { LanguageProvider, LanguageToggle, useLang } from './i18n';

function Header() {
  const { t } = useLang();
  return (
    <header className="site-header">
      <div className="container nav">
        <Link href="/meow" className="brand">
          {/* public/ 자산은 루트에서 서빙됨. (basePath 미사용) */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/meow/myohae_1024.png" alt="MYOHAE" width={32} height={32} className="logo-img" />
          <span>MYOHAE</span>
        </Link>
        <nav className="nav-links">
          <Link href="/meow/feed">{t.nav.feed}</Link>
          <Link href="/meow/faq">{t.nav.faq}</Link>
          <Link href="/meow/terms">{t.nav.terms}</Link>
          <Link href="/meow/privacy">{t.nav.privacy}</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer({ year }: { year: number }) {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-links">
          <Link href="/meow">{t.nav.home}</Link>
          <Link href="/meow/feed">{t.nav.feed}</Link>
          <Link href="/meow/faq">{t.nav.faq}</Link>
          <Link href="/meow/terms">{t.nav.terms}</Link>
          <Link href="/meow/privacy">{t.nav.privacy}</Link>
          <a href="mailto:contact@yeahplus.co.kr">{t.nav.contact}</a>
        </div>

        {/* 법인 등록 정보는 법적 표기이므로 한국어 원문 유지 */}
        <div className="footer-company">
          주식회사 예아플러스 · 대표자 고재혁 · 사업자등록번호 283-88-02519
          <br />
          통신판매업신고번호 2022-경기파주-2995
          <br />
          경기도 파주시 교하로159번길 33, 3층 304호 에이318(목동동, 목동프라자)
          <br />
          문의: <a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a>
        </div>

        <div className="footer-copy">{t.footer.copy(year)}</div>
      </div>
    </footer>
  );
}

// 서버 레이아웃에서 year 를 넘겨받아 클라이언트 하이드레이션 불일치를 방지.
export default function SiteShell({ year, children }: { year: number; children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Header />
      <main className="container">{children}</main>
      <Footer year={year} />
      <LanguageToggle />
    </LanguageProvider>
  );
}
