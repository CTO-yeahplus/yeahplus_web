import type { Metadata } from 'next';
import Link from 'next/link';
import './arke/globals.css';
import { COMPANY, CONTACT_EMAIL } from './arke/legal';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'ARKE — 고2 수능 코치 · 수학 + 영어',
  description:
    '수학은 오답 진단 → 개념맵 → 오늘의 처방, 영어는 유형별 훈련 → AI 3단 해설 → 오답노트. 고2 수능 대비를 하나의 앱에서.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/arke' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/arke',
    title: 'ARKE — 고2 수능 코치',
    description: '오늘 뭘 풀지, ARKE가 정합니다. 수학·영어 통합 수능 훈련 앱.',
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
          <Link href="/arke#features" className="ark-nav-hide">
            기능
          </Link>
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
