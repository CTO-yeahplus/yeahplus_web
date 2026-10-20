import type { Metadata, Viewport } from 'next';
import './fishyquotes/globals.css';
import SiteShell from './fishyquotes/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/* 수상한 명언 — hyunja·seodang 과 같이 라우트 그룹이 자기 <html> 을 그린다.
   글꼴은 기기 글꼴만 쓴다(외부 글꼴·CDN 없음).
   ⚠️ 이 라우트의 /fishyquotes/privacy · /fishyquotes/support 주소가 App Store Connect 에 들어간다. */

const TITLE = '수상한 명언 — 그 말, 진짜일까?';
const DESCRIPTION =
  '인터넷에 떠도는 철학자 명언이 진짜인지, 가짜인지, 비틀린 것인지 카드를 밀어 판정하는 퀴즈 게임. 판정마다 증거와 원문이 따라옵니다.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/fishyquotes' },
  openGraph: {
    siteName: '수상한 명언',
    locale: 'ko_KR',
    url: '/fishyquotes',
    title: TITLE,
    description: '전시실 12곳 · 사건 136건 · 오늘의 사건 · 원문 서고. 한 번 구입 · 계정 없음 · 데이터 수집 없음.',
    type: 'website',
    images: [{ url: '/fishyquotes/og.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/fishyquotes/icon-512.png', apple: '/fishyquotes/icon-180.png' },
};

export const viewport: Viewport = { themeColor: '#2B0F3A' };

const YEAR = new Date().getFullYear();

export default function FishyQuotesLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning — LangProvider 가 마운트 후 <html lang> 을 바꾼다.
    <html lang="ko" suppressHydrationWarning>
      <body>
        <SiteShell year={YEAR}>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
