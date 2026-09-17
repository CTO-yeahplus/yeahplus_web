import type { Metadata, Viewport } from 'next';
import './contraptionlab/globals.css';
import SiteShell from './contraptionlab/chrome';
import { STORAGE_KEY } from './contraptionlab/i18n';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: '뚝딱 실험실 · Contraption Lab',
  description:
    '부품을 놓고 돌려 구슬을 바구니까지. 정답은 하나가 아닙니다. 진짜 물리로 판정하는 초등 1~6학년 물리 퍼즐 48개와 레벨 에디터. 광고 없음, 인앱결제 없음, 완전 오프라인.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/contraptionlab' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/contraptionlab',
    title: '뚝딱 실험실 — 굴리고 튕기는 물리 퍼즐',
    description:
      '나무 비탈은 붙잡고 얼음 비탈은 놓아줍니다. 연출이 아니라 계산입니다. 48개 실험실과 내가 만드는 판.',
    type: 'website',
    images: ['/contraptionlab/og.jpg'],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/contraptionlab/icon-512.png', apple: '/contraptionlab/icon-512.png' },
};

export const viewport: Viewport = { themeColor: '#f7eedd' };

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

export default function ContraptionlabLayout({ children }: { children: React.ReactNode }) {
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
