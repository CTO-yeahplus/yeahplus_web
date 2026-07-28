'use client';

import Link from 'next/link';
import { COMPANY, I18nProvider, LangToggle, useI18n } from './i18n';

function Header() {
  const { t } = useI18n();
  return (
    <header className="t68-nav">
      <div className="t68-nav-inner">
        <Link href="/tower68" className="t68-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/tower68/tower68_logo.png" alt="TOWER 68" width={34} height={34} className="t68-brand-logo" />
          <span>TOWER 68</span>
        </Link>
        <nav className="t68-nav-links">
          <Link href="/tower68/support">{t.nav.support}</Link>
          <Link href="/tower68/privacy">{t.nav.privacy}</Link>
          <Link href="/tower68/terms">{t.nav.terms}</Link>
          <Link href="/tower68/contact" className="t68-nav-cta">
            {t.nav.contact}
          </Link>
          <LangToggle />
        </nav>
      </div>
    </header>
  );
}

function Footer({ year }: { year: number }) {
  const { t, lang } = useI18n();
  const ko = lang === 'ko';
  return (
    <footer className="t68-footer">
      <div className="t68-footer-links">
        <Link href="/tower68">{t.footer.home}</Link>
        <Link href="/tower68/support">{t.footer.support}</Link>
        <Link href="/tower68/privacy">{t.footer.privacy}</Link>
        <Link href="/tower68/terms">{t.footer.terms}</Link>
        <Link href="/tower68/contact">{t.footer.contact}</Link>
        <Link href="/">{t.footer.backToYeahplus}</Link>
      </div>

      {/* 법인 등록 정보 — 한국어 선택 시 한글, 그 외 언어는 영어 표기 */}
      <div className="t68-footer-company">
        <div>
          {ko ? COMPANY.name : COMPANY.nameEn} · {t.footer.ceo} {ko ? COMPANY.ceo : COMPANY.ceoEn}
        </div>
        <div>
          {t.footer.biz} {COMPANY.biz} · {t.footer.mailorder} {ko ? COMPANY.mailorder : COMPANY.mailorderEn}
        </div>
        <div>{ko ? COMPANY.addr : COMPANY.addrEn}</div>
        <div>
          {t.footer.inquiry} <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </div>
      </div>

      <div className="t68-footer-copy">
        © {year} {ko ? COMPANY.name : COMPANY.nameEn}. {t.footer.rights}
      </div>
    </footer>
  );
}

// 서버 레이아웃에서 year 를 넘겨받아 클라이언트 하이드레이션 불일치를 방지.
export default function SiteShell({ year, children }: { year: number; children: React.ReactNode }) {
  return (
    <I18nProvider>
      <div className="t68-app">
        <Header />
        <main className="t68-main">{children}</main>
        <Footer year={year} />
      </div>
    </I18nProvider>
  );
}
