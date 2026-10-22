import type { Metadata, Viewport } from 'next';
import './steelrace/globals.css';
import SiteShell from './steelrace/chrome';
import { STORAGE_KEY } from './steelrace/i18n';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: '스틸레이스 · STEELRACE',
  description:
    '밤의 경기장을 가르는 FPV 드론 레이스. 관중석 다이브·갠트리·램프 나선·터널 헤어핀을 한 바퀴에. 리그 나이트, 매일 바뀌는 오늘의 코스, Game Center 순위. 사용자 데이터를 수집하지 않습니다.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/steelrace' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/steelrace',
    title: '스틸레이스 — 야간 드론 레이싱',
    description: '관중석을 내리꽂고, 갠트리 밑을 스치고, 터널을 꺾어 나온다. 두 엄지로 나는 FPV 드론 레이스.',
    type: 'website',
    images: ['/steelrace/icon-512.png'],
  },
  twitter: { card: 'summary' },
  icons: { icon: '/steelrace/icon-512.png', apple: '/steelrace/icon-512.png' },
};

export const viewport: Viewport = { themeColor: '#06050c' };

/**
 * 첫 페인트 전에 data-lang 을 세운다 (steelstorm · sillok 과 같은 방식).
 * 본문은 두 언어를 모두 담고 CSS 로 한쪽만 보여주므로, 늦게 붙으면 언어가 깜빡인다.
 */
const LANG_BOOTSTRAP = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
if(s!=='ko'&&s!=='en'){s=(navigator.language||'ko').toLowerCase().indexOf('ko')===0?'ko':'en';}
document.documentElement.setAttribute('data-lang',s);
document.documentElement.setAttribute('lang',s);
}catch(e){}})();`;

const YEAR = new Date().getFullYear();

export default function SteelraceLayout({ children }: { children: React.ReactNode }) {
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
