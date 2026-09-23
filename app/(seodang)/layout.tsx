import type { Metadata, Viewport } from 'next';
import './seodang/globals.css';
import SiteShell from './seodang/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/* 문안은 원본 seodang/web/index.html 의 것을 그대로 옮겼다.
   원본은 정적 호스팅(/seodang/)용 Vite SPA 였고, 여기서는 라우트 그룹이 자기 <html> 을 그린다. */

const TITLE = '성어서당 — 이야기로 익히는 사자성어';
const DESCRIPTION =
  '초등 3~6학년을 위한 사자성어 학습 앱. 고사 속에서 직접 고르고, 옛 책으로 확인하고, 한자 네 글자를 붓으로 따라 씁니다. 광고·추가 결제·인터넷 연결이 없습니다.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/seodang' },
  openGraph: {
    siteName: '성어서당',
    locale: 'ko_KR',
    url: '/seodang',
    title: TITLE,
    description: '초등 3~6학년 · 이야기 60편 · 삽화 242장 · 광고 없음',
    type: 'website',
    images: [{ url: '/seodang/og.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/seodang/icon-256.png', apple: '/seodang/icon-256.png' },
};

export const viewport: Viewport = { themeColor: '#F7EFDF' };

const YEAR = new Date().getFullYear();

export default function SeodangLayout({ children }: { children: React.ReactNode }) {
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
