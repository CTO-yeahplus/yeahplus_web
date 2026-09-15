import type { Metadata, Viewport } from 'next';
import './steelstorm/globals.css';
import SiteShell from './steelstorm/chrome';
import { STORAGE_KEY } from './steelstorm/i18n';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: '스틸스톰 아레나 · SteelStorm Arena',
  description:
    '자동 조준 아레나 슈터. 이동·대시·코어 컬러·3단 오버드라이브 변신 타이밍만으로 드론 폭풍을 버팁니다. 완전 오프라인 싱글플레이, 광고 없음, 인앱결제 없음, 데이터 수집 없음.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/steelstorm' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/steelstorm',
    title: '스틸스톰 아레나 — 변신 메카 아레나 슈터',
    description: '기체는 알아서 쏩니다. 당신이 고르는 것은 판단 — 포위, 대시, 코어 컬러, 그리고 변신의 순간.',
    type: 'website',
    images: ['/steelstorm/og.jpg'],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/steelstorm/icon-512.png', apple: '/steelstorm/icon-512.png' },
};

export const viewport: Viewport = { themeColor: '#070b14' };

/**
 * 첫 페인트 전에 data-lang 을 세운다.
 *
 * 본문은 두 언어를 모두 담고 CSS 로 한쪽만 보여주는 구조라, 이 값이 늦게
 * 붙으면 한국어가 잠깐 보였다가 영어로 바뀌는 깜빡임이 난다.
 */
const LANG_BOOTSTRAP = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
if(s!=='ko'&&s!=='en'){s=(navigator.language||'ko').toLowerCase().indexOf('ko')===0?'ko':'en';}
document.documentElement.setAttribute('data-lang',s);
document.documentElement.setAttribute('lang',s);
}catch(e){}})();`;

const YEAR = new Date().getFullYear();

export default function SteelstormLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning — 위 부트스트랩 스크립트가 하이드레이션 전에
    // lang/data-lang 을 바꾸므로 React 가 본 서버 HTML 과 달라진다.
    // 이 한 요소의 속성 차이만 무시하게 한다(자식 트리에는 영향이 없다).
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
