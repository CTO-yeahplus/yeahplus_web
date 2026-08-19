'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gem } from 'lucide-react';
import { COMPANY, EMAIL, LangProvider, NAV, useLang } from './i18n';

function Nav() {
  const { lang, setLang } = useLang();
  const n = NAV[lang];
  const path = usePathname();
  const on = (href: string) => (path === href ? 'on' : '');

  return (
    <div className="mf-wrap">
      <nav className="mf-nav">
        <Link href="/mineforge" className="mf-brand">
          <Gem size={18} strokeWidth={2} aria-hidden /> MINEFORGE
        </Link>
        <span className="mf-links">
          <Link href="/mineforge#features">{n.features}</Link>
          <Link href="/mineforge/support" className={on('/mineforge/support')}>
            {n.support}
          </Link>
          <Link href="/mineforge/privacy" className={on('/mineforge/privacy')}>
            {n.privacy}
          </Link>
          <Link href="/mineforge/terms" className={on('/mineforge/terms')}>
            {n.terms}
          </Link>
          <button type="button" className="mf-lang-btn" onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}>
            한 / EN
          </button>
        </span>
      </nav>
    </div>
  );
}

function Footer({ year }: { year: number }) {
  const { lang } = useLang();
  const n = NAV[lang];
  const ko = lang === 'ko';

  return (
    <footer className="mf-footer">
      <div className="mf-wrap">
        <div className="mf-footer-links">
          <Link href="/mineforge/privacy">{ko ? '개인정보 처리방침' : 'Privacy Policy'}</Link>
          <Link href="/mineforge/support">{ko ? '지원 / FAQ' : 'Support / FAQ'}</Link>
          <Link href="/mineforge/terms">{n.terms}</Link>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <Link href="/">{ko ? 'yeahplus 홈' : 'yeahplus home'}</Link>
        </div>
        <div className="mf-series">
          {ko
            ? 'Forge 시리즈: Wordforge(워드포지) · Pipforge(핍포지) · Aceforge(에이스포지) · Jadeforge(제이드포지) · Mineforge(마인포지)'
            : 'The Forge series: Wordforge · Pipforge · Aceforge · Jadeforge · Mineforge'}
        </div>
        <div>© {year} {COMPANY.nameEn}</div>
        <div className="mf-company">
          {ko ? COMPANY.name : COMPANY.nameEn} · {ko ? '대표' : 'CEO'} {ko ? COMPANY.ceo : COMPANY.ceoEn} ·{' '}
          {ko ? '사업자등록번호' : 'Business Reg. No.'} {COMPANY.biz}
          <br />
          {ko ? '통신판매업신고' : 'Mail-order Reg.'} {ko ? COMPANY.mailorder : COMPANY.mailorderEn} ·{' '}
          {ko ? COMPANY.addr : COMPANY.addrEn}
        </div>
      </div>
    </footer>
  );
}

export default function SiteShell({ year, children }: { year: number; children: React.ReactNode }) {
  return (
    <LangProvider>
      <div className="mf-app">
        <Nav />
        <div className="mf-main">{children}</div>
        <Footer year={year} />
      </div>
    </LangProvider>
  );
}
