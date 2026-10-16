import type { Metadata } from 'next';
import Link from 'next/link';
import './arke/globals.css';
import { COMPANY, CONTACT_EMAIL } from './arke/legal';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'ARKE — 틀린 문제가 그냥 지나가지 않게 · 고2 수능 수학·영어',
  description:
    '같은 문제에 두 번 지지 않는 고3. 첫 진단 10문항으로 약점에 이름을 붙이고, 학평 틀린 번호는 다음 날 처방으로. 고2 수능 수학·영어 코치.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/arke' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/arke',
    title: 'ARKE — 틀린 문제가 그냥 지나가지 않게',
    description: '같은 문제에 두 번 지지 않는 고3. 첫 진단 10문항은 무료.',
    type: 'website',
    images: ['/arke/arke_logo.png'],
  },
  icons: { icon: '/arke/arke_logo.png' },
  twitter: { card: 'summary_large_image' },
};

const YEAR = new Date().getFullYear();

function Header() {
  return (
    <header className="ark-nav">
      <div className="ark-nav-inner">
        <Link href="/arke" className="ark-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/arke/arke_logo.png" alt="" width={32} height={32} className="ark-brand-logo" />
          <span className="ark-brand-name">ARKE</span>
        </Link>
        <nav className="ark-nav-links">
          <Link href="/arke#promise" className="ark-nav-hide">
            소개
          </Link>
          <Link href="/arke#parents">학부모</Link>
          <Link href="/arke#pricing" className="ark-nav-hide">
            요금제
          </Link>
          <Link href="/arke#faq" className="ark-nav-hide">
            FAQ
          </Link>
          <Link href="/arke/support">지원</Link>
          <a className="ark-nav-cta" href={`mailto:${CONTACT_EMAIL}`}>
            문의
          </a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="ark-footer">
      <div className="ark-footer-links">
        <Link href="/arke">홈</Link>
        <Link href="/arke/support">지원 · FAQ</Link>
        <Link href="/arke/privacy">개인정보처리방침</Link>
        <Link href="/arke/terms">이용약관</Link>
        <a href={`mailto:${CONTACT_EMAIL}`}>문의</a>
        <Link href="/">yeahplus 홈</Link>
      </div>
      <div className="ark-footer-company">
        {COMPANY.name} · 대표 {COMPANY.ceo}
        <br />
        사업자등록번호 {COMPANY.bizNumber} · 통신판매업신고 {COMPANY.mailorder}
        <br />
        {COMPANY.address}
        <br />
        문의 <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </div>
      <p className="ark-footer-copy">
        © {YEAR} {COMPANY.name}. All rights reserved.
      </p>
    </footer>
  );
}

export default function ArkeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="ark-app">
          <Header />
          <main className="ark-main">{children}</main>
          <Footer />
        </div>
              <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
