'use client';

/* 위 줄(상표 · 메뉴 · 언어)과 아래 줄(링크 · 사업자 정보). 랜딩에서는 위 줄이 그림 위에 투명하게 뜬다.
   원본: GAME/APLUS/crimescene/site-react/src/components/Layout.jsx — 링크를 next/link + /crimescene 경로로, 사업자 정보 추가, 문의 주소를 contact@ 로. */

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BASE, BIZ, COMPANY_EN, COMPANY_KO, L, LangProvider, MAIL, useLang } from './i18n';
import { c } from './cx';

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const path = usePathname();
  return (
    <Link href={href} aria-current={path === href ? 'page' : undefined}>
      {children}
    </Link>
  );
}

function Header() {
  const { lang, setLang } = useLang();
  return (
    <nav className={c('nav')}>
      <Link className={c('brand')} href={BASE}>
        <Image src="/crimescene/icon-180.png" alt="" width={30} height={30} />
        <b><L ko="전설의 조선 사건부" en="Legendary Joseon Casebook" /></b>
      </Link>
      <div className={c('links')}>
        <NavItem href={`${BASE}/support`}><L ko="지원" en="Support" /></NavItem>
        <NavItem href={`${BASE}/privacy`}><L ko="개인정보" en="Privacy" /></NavItem>
        <NavItem href={`${BASE}/terms`}><L ko="약관" en="Terms" /></NavItem>
        <button className={c('lang')} type="button" onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')} aria-label={lang === 'ko' ? 'Switch to English' : '한국어로 보기'}>
          {lang === 'ko' ? 'EN' : '한국어'}
        </button>
      </div>
    </nav>
  );
}

function Footer({ year }: { year: number }) {
  return (
    <footer className={c('foot')}>
      <p>
        <b><L ko="전설의 조선 사건부" en="Legendary Joseon Casebook" /></b>
      </p>
      <p>
        <Link href={BASE}><L ko="홈" en="Home" /></Link>
        <Link href={`${BASE}/support`}><L ko="고객 지원" en="Support" /></Link>
        <Link href={`${BASE}/privacy`}><L ko="개인정보 처리방침" en="Privacy Policy" /></Link>
        <Link href={`${BASE}/terms`}><L ko="이용약관" en="Terms of Use" /></Link>
        <a href={`mailto:${MAIL}`}>{MAIL}</a>
        <Link href="/"><L ko="yeahplus 홈" en="yeahplus home" /></Link>
      </p>
      <span className={c('fine')}>
        ⓒ {year} <L ko={COMPANY_KO} en={COMPANY_EN} /> · <L ko="이야기 속 인물과 사건은 모두 지어낸 것입니다." en="All people and events in the story are fictional." />
      </span>
      <address className={c('fine')} style={{ fontStyle: 'normal', lineHeight: 1.8 }}>
        <L ko="상호" en="Company" /> <L ko={COMPANY_KO} en={COMPANY_EN} /> · <L ko="대표" en="CEO" /> {BIZ.ceo} · <L ko="사업자등록번호" en="Business reg. no." /> {BIZ.regNo}
        <br />
        <L ko="통신판매업신고" en="Mail-order reg. no." /> {BIZ.mailOrder} · <L ko="주소" en="Address" /> <L ko={BIZ.address} en={BIZ.addressEn} />
      </address>
    </footer>
  );
}

function Shell({ year, children }: { year: number; children: React.ReactNode }) {
  const home = usePathname() === BASE;
  return (
    <div className={c(home ? 'page page-home' : 'page page-doc')}>
      <Header />
      <main>{children}</main>
      <Footer year={year} />
    </div>
  );
}

export default function SiteShell({ year, children }: { year: number; children: React.ReactNode }) {
  return (
    <LangProvider>
      <Shell year={year}>{children}</Shell>
    </LangProvider>
  );
}
