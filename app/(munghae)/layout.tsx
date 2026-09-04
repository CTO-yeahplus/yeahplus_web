import type { Metadata } from 'next';
import Link from 'next/link';
import './munghae/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: '멍해 (MUNGHAE) — 별이 된 아이들을 기억하는 공간',
  description:
    '떠난 반려동물을 위한 디지털 추모공원, 멍해(MUNGHAE). 추모공간을 만들고 추억을 담고 촛불을 밝히며, 기일에는 잊지 않도록 함께 기억합니다.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/munghae' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/munghae',
    title: '멍해 (MUNGHAE)',
    description: '별이 된 아이들을 기억하는 공간. 반려동물을 위한 디지털 추모공원.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

const YEAR = new Date().getFullYear();

export default function MunghaeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="mh-header">
          <div className="container mh-nav">
            <Link href="/munghae" className="mh-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/munghae/munghae_logo.png" alt="멍해" width={32} height={32} className="mh-logo-img" />
              <span>멍해</span>
            </Link>
            <nav className="mh-links">
              <Link href="/munghae#features">소개</Link>
              <Link href="/munghae/support">고객지원</Link>
              <Link href="/munghae/terms">이용약관</Link>
              <Link href="/munghae/privacy">개인정보처리방침</Link>
              <a href="mailto:contact@yeahplus.co.kr">문의</a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mh-footer">
          <div className="mh-footer-inner">
            <div className="mh-footer-top">
              <div className="fbrand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/munghae/munghae_logo.png" alt="멍해" width={28} height={28} className="mh-logo-img" />
                멍해 · MUNGHAE
              </div>
              <nav className="mh-footer-links">
                <Link href="/munghae">홈</Link>
                <Link href="/munghae/support">고객지원</Link>
                <Link href="/munghae/terms">이용약관</Link>
                <Link href="/munghae/privacy">개인정보처리방침</Link>
                <a href="mailto:contact@yeahplus.co.kr">문의</a>
              </nav>
            </div>
            <div className="mh-footer-co">
              주식회사 예아플러스 · 대표자 고재혁 · 사업자등록번호 283-88-02519
              <br />
              통신판매업신고번호 2022-경기파주-2995 · 경기도 파주시 교하로159번길 33, 3층 304호 에이318
              <br />
              문의: <a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a>
              <br />
              © 2022–{YEAR} 주식회사 예아플러스 (yeahplus Co., Ltd.) All rights reserved.
            </div>
          </div>
        </footer>
              <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
