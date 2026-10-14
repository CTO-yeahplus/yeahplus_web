import type { Metadata, Viewport } from 'next';
import './diogeneslamp/globals.css';
import SiteShell from './diogeneslamp/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/* 디오게네스의 등불 — hyunja·seodang 과 같이 라우트 그룹이 자기 <html> 을 그린다.
   글꼴은 기기 글꼴만 쓴다(외부 글꼴·CDN 없음).
   ⚠️ 이 라우트의 /diogeneslamp/privacy · /diogeneslamp/support 주소가 App Store Connect 에 들어간다. */

const TITLE = '디오게네스의 등불 — 그 명언, 진짜일까?';
const DESCRIPTION =
  '인터넷에 떠도는 철학자 명언이 진짜인지, 가짜인지, 비틀린 것인지 카드를 밀어 판정하는 퀴즈 게임. 판정마다 증거와 원문이 따라옵니다.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/diogeneslamp' },
  openGraph: {
    siteName: '디오게네스의 등불',
    locale: 'ko_KR',
    url: '/diogeneslamp',
    title: TITLE,
    description: '전시실 12곳 · 사건 136건 · 오늘의 사건 · 원문 서고. 한 번 구입 · 광고 없음 · 계정 없음.',
    type: 'website',
    images: [{ url: '/diogeneslamp/og.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/diogeneslamp/icon-512.png', apple: '/diogeneslamp/icon-180.png' },
};

export const viewport: Viewport = { themeColor: '#2B0F3A' };

const YEAR = new Date().getFullYear();

export default function DiogenesLampLayout({ children }: { children: React.ReactNode }) {
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
