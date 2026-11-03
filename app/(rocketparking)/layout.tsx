import type { Metadata, Viewport } from 'next';
import './rocketparking/globals.css';
import SiteShell from './rocketparking/chrome';
import { STORAGE_KEY } from './rocketparking/langkey';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: '로켓주차 · ROCKET PARKING',
  description:
    '카메라가 비추는 자리가 착륙장. 머리 위에서 떨어지는 부스터를 한 번뿐인 점화로 내 책상 · 정류장 벤치에 세우는 AR 착륙 게임. 광고 없음, 데이터 수집 없음.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/rocketparking' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/rocketparking',
    title: '로켓주차 — 내 자리에 로켓 세우기',
    description: '점화는 한 번뿐. 정류장 벤치에 부스터를 세운다.',
    type: 'website',
    images: [{ url: '/rocketparking/og_ko.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/rocketparking/og_ko.jpg'] },
  icons: { icon: '/rocketparking/icon-512.png', apple: '/rocketparking/icon-512.png' },
};

export const viewport: Viewport = { themeColor: '#0b0f14' };

/** 첫 페인트 전에 data-lang 을 세운다 — 늦게 붙으면 언어가 깜빡인다 */
const LANG_BOOTSTRAP = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
if(s!=='ko'&&s!=='en'){s=(navigator.language||'ko').toLowerCase().indexOf('ko')===0?'ko':'en';}
document.documentElement.setAttribute('data-lang',s);
document.documentElement.setAttribute('lang',s);
}catch(e){}})();`;

const YEAR = new Date().getFullYear();

export default function RocketParkingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_BOOTSTRAP }} />
      </head>
      <body>
        <SiteShell year={YEAR}>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
