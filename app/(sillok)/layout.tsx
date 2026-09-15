import type { Metadata, Viewport } from 'next';
import './sillok/globals.css';
import SiteShell from './sillok/chrome';
import { STORAGE_KEY } from './sillok/i18n';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: '조선왕조실록 — 왕의 선택 · Joseon Annals: King’s Choice',
  description:
    '아이가 조선 27명의 왕이 되어 실록에 기록된 사건을 하나씩 결정하는 통치 시뮬레이션. 초등 3~6학년 대상. 광고 없음, 인앱결제 없음, 계정 없음, 데이터 수집 없음.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/sillok' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/sillok',
    title: '조선왕조실록 — 왕의 선택',
    description: '정답을 묻지 않고 권한을 줍니다. 아이가 고른 다음에 사관이 실제 역사를 보여줍니다.',
    type: 'website',
    images: ['/sillok/icon-1024.png'],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/sillok/icon-1024.png', apple: '/sillok/icon-1024.png' },
};

export const viewport: Viewport = { themeColor: '#f2e8d2' };

/**
 * 첫 페인트 전에 data-lang 을 세운다.
 *
 * 본문은 두 언어를 모두 담고 CSS 로 한쪽만 보여주는 구조라, 이 값이 늦게
 * 붙으면 한국어가 잠깐 보였다가 영어로 바뀌는 깜빡임이 난다. 원본 사이트도
 * 같은 이유로 head 에 인라인 스크립트를 두었다.
 */
const LANG_BOOTSTRAP = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
if(s!=='ko'&&s!=='en'){s=(navigator.language||'ko').toLowerCase().indexOf('ko')===0?'ko':'en';}
document.documentElement.setAttribute('data-lang',s);
document.documentElement.setAttribute('lang',s);
}catch(e){}})();`;

const YEAR = new Date().getFullYear();

export default function SillokLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning — 아래 부트스트랩 스크립트가 하이드레이션 전에
    // lang/data-lang 을 바꾸므로 React 가 본 서버 HTML 과 달라진다. 이 한 요소의
    // 속성 차이만 무시하게 한다(자식 트리에는 영향이 없다).
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
