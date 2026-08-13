'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPANY, EMAIL, I18nProvider, LangToggle, NAV, UI, useLang } from './i18n';

function Header() {
  const { lang } = useLang();
  const nav = NAV[lang];
  const t = UI[lang];
  const path = usePathname();
  const on = (href: string) => (path === href ? 'on' : '');

  return (
    <header className="wf-site-head">
      <div className="wf-wrap-wide wf-hd">
        <Link href="/wordforge" className="wf-brand">
          <div className="wf-logo">W</div>
          <div>
            <div className="wf-bname">WORDFORGE</div>
            <div className="wf-btag">{t.tagline}</div>
          </div>
        </Link>

        <nav className="wf-nav">
          <Link href="/wordforge" className={on('/wordforge')}>
            {nav.home}
          </Link>
          <Link href="/wordforge/privacy" className={on('/wordforge/privacy')}>
            {nav.privacy}
          </Link>
          <Link href="/wordforge/terms" className={on('/wordforge/terms')}>
            {nav.terms}
          </Link>
          <Link href="/wordforge/support" className={on('/wordforge/support')}>
            {nav.support}
          </Link>
          <LangToggle />
        </nav>
      </div>
    </header>
  );
}

function Footer({ year }: { year: number }) {
  const { lang } = useLang();
  const t = UI[lang];
  const nav = NAV[lang];
  const ko = lang === 'ko';

  return (
    <footer className="wf-site-foot">
      <div className="wf-wrap-wide">
        <div className="wf-fl">
          <span>
            © {year} {COMPANY.short} · Wordforge
          </span>
          <span className="wf-foot-links">
            <Link href="/wordforge/privacy">{nav.privacy}</Link>
            <Link href="/wordforge/terms">{nav.terms}</Link>
            <Link href="/wordforge/support">{nav.support}</Link>
            <Link href="/">{t.yeahplus}</Link>
          </span>
        </div>
        <div className="wf-company">
          {ko ? COMPANY.name : COMPANY.nameEn} · {ko ? '대표' : 'CEO'} {ko ? COMPANY.ceo : COMPANY.ceoEn}
          <br />
          {ko ? '사업자등록번호' : 'Business Reg. No.'} {COMPANY.biz} ·{' '}
          {ko ? '통신판매업신고' : 'Mail-order Reg.'} {ko ? COMPANY.mailorder : COMPANY.mailorderEn}
          <br />
          {ko ? COMPANY.addr : COMPANY.addrEn}
          <br />
          {t.contact} <a href={`mailto:${EMAIL}`}>{EMAIL}</a> — {t.footer}
        </div>
      </div>
    </footer>
  );
}

export default function SiteShell({ year, children }: { year: number; children: React.ReactNode }) {
  return (
    <I18nProvider>
      <div className="wf-app">
        <Header />
        {children}
        <Footer year={year} />
      </div>
    </I18nProvider>
  );
}
