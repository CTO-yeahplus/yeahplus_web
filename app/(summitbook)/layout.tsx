import type { Metadata, Viewport } from 'next';
import './summitbook/globals.css';
import SiteShell from './summitbook/chrome';
import { STORAGE_KEY } from './summitbook/langkey';
import { APP } from './summitbook/names';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: `${APP.ko} · ${APP.en}`,
  description:
    '100대 명산 정상에서 돌탑 도장을 꾹 누르면, 기기 위치로 정상 150m 안인지 기기 안에서 확인하고 도장을 찍는 수첩. 계정 · 서버 · 수집 없음.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/summitbook' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/summitbook',
    title: `${APP.ko} — 정상에 설 때마다 한 쪽`,
    description: '정상 150m 안에서만 찍히는 도장. 100대 명산 수첩.',
    type: 'website',
    images: [{ url: '/summitbook/og_ko.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/summitbook/og_ko.jpg'] },
  icons: { icon: '/summitbook/icon-512.png', apple: '/summitbook/icon-512.png' },
};

export const viewport: Viewport = { themeColor: '#2c3a2f' };

/** 첫 페인트 전에 data-lang 을 세운다 — 늦게 붙으면 언어가 깜빡인다 */
const LANG_BOOTSTRAP = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
if(s!=='ko'&&s!=='en'){s=(navigator.language||'ko').toLowerCase().indexOf('ko')===0?'ko':'en';}
document.documentElement.setAttribute('data-lang',s);
document.documentElement.setAttribute('lang',s);
}catch(e){}})();`;

const YEAR = new Date().getFullYear();

export default function SummitBookLayout({ children }: { children: React.ReactNode }) {
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
