'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPANY, EMAIL, LangProvider, NAV, useLang } from './i18n';

function Nav() {
  const { lang, setLang } = useLang();
  const n = NAV[lang];
  const path = usePathname();
  const on = (href: string) => (path === href ? 'on' : '');

  return (
    <nav className="pf-nav">
      <Link href="/pipforge" className="pf-nav-logo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/pipforge/pipforge_icon.png" alt="" width={26} height={26} />
        PIP<b>FORGE</b>
      </Link>
      <div className="pf-nav-links">
        <Link href="/pipforge" className={on('/pipforge')}>
          {n.home}
        </Link>
        <Link href="/pipforge/privacy" className={on('/pipforge/privacy')}>
          {n.privacy}
        </Link>
        <Link href="/pipforge/support" className={on('/pipforge/support')}>
          {n.support}
        </Link>
        <Link href="/pipforge/terms" className={on('/pipforge/terms')}>
          {n.terms}
        </Link>
        <button type="button" className="pf-lang-btn" onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>
          {lang === 'ko' ? 'EN' : '한국어'}
        </button>
      </div>
    </nav>
  );
}

function Footer({ year }: { year: number }) {
  const { lang } = useLang();
  const n = NAV[lang];
  const ko = lang === 'ko';

  return (
    <footer className="pf-footer">
      <div>
        Pipforge · 핍포지 &nbsp;|&nbsp; © {year} {COMPANY.nameEn}
      </div>
      <div className="pf-footer-links">
        <Link href="/pipforge/privacy">{n.privacy}</Link> · <Link href="/pipforge/support">{n.support}</Link> ·{' '}
        <Link href="/pipforge/terms">{n.terms}</Link> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a> ·{' '}
        <Link href="/">{ko ? 'yeahplus 홈' : 'yeahplus home'}</Link>
      </div>
      <div className="pf-footer-company">
        {ko ? COMPANY.name : COMPANY.nameEn} · {ko ? '대표' : 'CEO'} {ko ? COMPANY.ceo : COMPANY.ceoEn} ·{' '}
        {ko ? '사업자등록번호' : 'Business Reg. No.'} {COMPANY.biz}
        <br />
        {ko ? '통신판매업신고' : 'Mail-order Reg.'} {ko ? COMPANY.mailorder : COMPANY.mailorderEn} ·{' '}
        {ko ? COMPANY.addr : COMPANY.addrEn}
      </div>
    </footer>
  );
}

export default function SiteShell({ year, children }: { year: number; children: React.ReactNode }) {
  return (
    <LangProvider>
      <div className="pf-app">
        <Nav />
        {children}
        <Footer year={year} />
      </div>
    </LangProvider>
  );
}
