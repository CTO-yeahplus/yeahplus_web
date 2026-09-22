import type { Metadata, Viewport } from 'next';
import './cinelook/globals.css';
import './cinelook/landing.css';
import SiteShell from './cinelook/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/* 문안은 원본 NEXTGEN_CINEMATIC/site/src/seo.js · index.html 의 것을 그대로 옮겼다.
   원본은 도메인이 cinelook.app 으로 잡혀 있었지만 여기서는 yeahplus.co.kr/cinelook 이다. */

export const metadata: Metadata = {
  title: 'CineLook — 주머니 속 네컷 사진관',
  description:
    '셔터 한 번에 4컷, 프레임 20종, 영화 필터 35종, 필름카메라 8종. 앱 전체가 바뀌는 테마와 테마별 공유 카드까지. 구독 없이 한 번 사면 평생, 사진은 기기를 떠나지 않습니다.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/cinelook' },
  openGraph: {
    siteName: 'CineLook',
    locale: 'ko_KR',
    url: '/cinelook',
    title: 'CineLook — 주머니 속 네컷 사진관',
    description: '4컷 부스 · 프레임 20종 · 영화 필터 35종 · 테마 공유 카드. 구독 없음 · 광고 없음 · 수집 없음.',
    type: 'website',
    images: [{ url: '/cinelook/og.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/cinelook/icon-512.png', apple: '/cinelook/icon-512.png' },
};

export const viewport: Viewport = { themeColor: '#0b0b0e', colorScheme: 'dark' };

const YEAR = new Date().getFullYear();

/* 원본 main.jsx 의 document.documentElement.classList.add('js') 를 옮긴 것.
   스크롤 등장 효과(.js .rv)는 JS 가 있을 때만 숨겼다가 보여 준다 — 없으면 전부 보이는 상태.
   하이드레이션 전에 붙여야 첫 화면이 깜빡이지 않으므로 head 에 인라인으로 둔다. */
const JS_FLAG = "document.documentElement.classList.add('js')";

export default function CinelookLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning — LangProvider 가 마운트 후 <html lang> 을 바꾼다.
    // 이 한 요소의 속성 차이만 무시하게 한다(자식 트리에는 영향이 없다).
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body>
        <SiteShell year={YEAR}>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
