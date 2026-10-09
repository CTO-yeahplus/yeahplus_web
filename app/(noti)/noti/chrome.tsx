'use client';

/* 위 줄(상표 · 메뉴 · 언어)과 아래 줄(링크 · 사업자 정보). 랜딩에서는 위 줄이 그림 위에 투명하게 뜬다.
   원본: GAME/APLUS/noti/site-react/src/components/Layout.jsx — 링크를 next/link + /noti 경로로, 사업자 정보 추가, 문의 주소를 contact@ 로. */

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BASE, BIZ, COMPANY_EN, COMPANY_KO, DEMO_URL, LangProvider, MAIL, PLAY_URL, appStoreUrl, useLang } from './i18n';

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const path = usePathname();
  return (
    <Link href={href} aria-current={path === href ? 'page' : undefined}>
      {children}
    </Link>
  );
}

function Header() {
  const { lang, setLang, L } = useLang();
  return (
    <nav className="nt-nav">
      <Link className="nt-brand" href={BASE}>
        <Image src="/noti/icon-120.webp" alt="" width={28} height={28} />
        <b>{L('노티', 'NOTI')}</b>
        <span>{L('새벽 3시의 인턴', 'The 3 A.M. Intern')}</span>
      </Link>
      <div className="nt-links">
        <NavItem href={`${BASE}/support`}>{L('지원', 'Support')}</NavItem>
        <NavItem href={`${BASE}/privacy`}>{L('개인정보', 'Privacy')}</NavItem>
        <NavItem href={`${BASE}/terms`}>{L('약관', 'Terms')}</NavItem>
        <button className="nt-lang" type="button" onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')} aria-label={L('Switch to English', '한국어로 보기')}>
          {L('EN', '한국어')}
        </button>
      </div>
    </nav>
  );
}

function Footer({ year }: { year: number }) {
  const { L } = useLang();
  return (
    <footer className="nt-foot">
      <p>
        <b>{L('노티: 새벽 3시의 인턴', 'NOTI: The 3 A.M. Intern')}</b>
      </p>
      <p>
        <Link href={BASE}>{L('홈', 'Home')}</Link>
        <a href={DEMO_URL}>{L('1화 체험판', 'Play episode 1')}</a>
        <Link href={`${BASE}/support`}>{L('지원', 'Support')}</Link>
        <Link href={`${BASE}/privacy`}>{L('개인정보 처리방침', 'Privacy Policy')}</Link>
        <Link href={`${BASE}/terms`}>{L('이용약관', 'Terms of Use')}</Link>
        <a href={`mailto:${MAIL}`}>{MAIL}</a>
        <Link href="/">{L('yeahplus 홈', 'yeahplus home')}</Link>
      </p>
      <p className="nt-fine">
        ⓒ {year} {L(COMPANY_KO, COMPANY_EN)} · {L('가상의 병원과 인물을 다루는 이야기이며 의학적 조언이 아닙니다.', 'A work of fiction. Not medical advice.')}
      </p>
      <address className="nt-fine" style={{ fontStyle: 'normal', lineHeight: 1.8 }}>
        {L('상호', 'Company')} {L(COMPANY_KO, COMPANY_EN)} · {L('대표', 'CEO')} {BIZ.ceo} · {L('사업자등록번호', 'Business reg. no.')} {BIZ.regNo}
        <br />
        {L('통신판매업신고', 'Mail-order reg. no.')} {BIZ.mailOrder} · {L('주소', 'Address')} {BIZ.address}
      </address>
    </footer>
  );
}

export default function SiteShell({ year, children }: { year: number; children: React.ReactNode }) {
  return (
    <LangProvider>
      <div className="nt-page">
        <Header />
        <main>{children}</main>
        <Footer year={year} />
      </div>
    </LangProvider>
  );
}

/** 스토어 버튼 둘 — 주소(i18n.tsx 의 APP_ID · PLAY_URL)가 비어 있으면 '출시 준비 중'으로 바뀐다. */
export function StoreButtons() {
  const { lang, L } = useLang();
  const ios = appStoreUrl(lang);
  return (
    <>
      {ios ? (
        <a className="nt-btn" href={ios} target="_blank" rel="noreferrer">App Store</a>
      ) : (
        <span className="nt-btn nt-off">{L('App Store · 출시 준비 중', 'App Store · coming soon')}</span>
      )}
      {PLAY_URL ? (
        <a className="nt-btn" href={PLAY_URL} target="_blank" rel="noreferrer">Google Play</a>
      ) : (
        <span className="nt-btn nt-off">{L('Google Play · 출시 준비 중', 'Google Play · coming soon')}</span>
      )}
    </>
  );
}
