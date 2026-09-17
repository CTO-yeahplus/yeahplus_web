import type { Metadata, Viewport } from 'next';
import './cinelook/globals.css';
import SiteShell from './cinelook/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/* 문안은 원본 NEXTGEN_CINEMATIC/site/src/seo.js · index.html 의 것을 그대로 옮겼다.
   원본은 도메인이 cinelook.app 으로 잡혀 있었지만 여기서는 yeahplus.co.kr/cinelook 이다. */

export const metadata: Metadata = {
  title: 'CineLook — 필름카메라 감성과 영화 필터',
  description:
    '필름카메라 8종, 프레임 20종, 4컷 부스, 영화 필터 30종. 구독 없이 한 번 사면 평생. 사진은 기기를 떠나지 않습니다.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/cinelook' },
  openGraph: {
    siteName: 'CineLook',
    locale: 'ko_KR',
    url: '/cinelook',
    title: 'CineLook — 필름카메라 감성과 영화 필터',
    description: '디카 감성 · 4컷 부스 · 영화 필터 30종. 구독 없음 · 광고 없음 · 수집 없음.',
    type: 'website',
    images: ['/cinelook/og.jpg'],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/cinelook/icon-512.png', apple: '/cinelook/icon-512.png' },
};

export const viewport: Viewport = { themeColor: '#0b0b0e', colorScheme: 'dark' };

const YEAR = new Date().getFullYear();

export default function CinelookLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning — LangProvider 가 마운트 후 <html lang> 을 바꾼다.
    // 이 한 요소의 속성 차이만 무시하게 한다(자식 트리에는 영향이 없다).
    <html lang="ko" suppressHydrationWarning>
      <body>
        <SiteShell year={YEAR}>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
