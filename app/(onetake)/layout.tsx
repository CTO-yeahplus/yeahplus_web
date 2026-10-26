import type { Metadata, Viewport } from 'next';
import './onetake/globals.css';
import SiteShell from './onetake/chrome';
import { STORAGE_KEY } from './onetake/langkey';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: '원 테이크 · ONE TAKE',
  description:
    '차 한 대. 테이크 한 번. 컷 없이. 샷 아홉 개를 멈추지 않고 몰아 찍으면, 멈추는 순간 감독판 편집본이 나오는 드리프트 스턴트 게임. 장소 7곳. 광고 없음, 데이터 수집 없음.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/onetake' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/onetake',
    title: '원 테이크 — 차 한 대. 테이크 한 번. 컷 없이.',
    description: '멈추는 순간, 편집은 이미 끝나 있다. 한 번에 찍는 드리프트 스턴트.',
    type: 'website',
    images: [{ url: '/onetake/og_ko.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', images: ['/onetake/og_ko.jpg'] },
  icons: { icon: '/onetake/icon-512.png', apple: '/onetake/icon-512.png' },
};

export const viewport: Viewport = { themeColor: '#0b0b0c' };

/**
 * 첫 페인트 전에 data-lang 을 세운다 (steelrace · sillok 과 같은 방식).
 * 본문은 두 언어를 모두 담고 CSS 로 한쪽만 보여주므로, 늦게 붙으면 언어가 깜빡인다.
 */
const LANG_BOOTSTRAP = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
if(s!=='ko'&&s!=='en'){s=(navigator.language||'ko').toLowerCase().indexOf('ko')===0?'ko':'en';}
document.documentElement.setAttribute('data-lang',s);
document.documentElement.setAttribute('lang',s);
}catch(e){}})();`;

const YEAR = new Date().getFullYear();

export default function OneTakeLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning — 부트스트랩 스크립트가 하이드레이션 전에 lang/data-lang 을 바꾼다.
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
