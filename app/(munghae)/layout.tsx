import type { Metadata, Viewport } from 'next';
import './munghae/globals.css';
import SiteShell from './munghae/chrome';
import { STORAGE_KEY } from './munghae/site';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/* 2026-10-22: 멍해 본편(Expo·Supabase)을 접고 간직 Keepsake 가 같은 App Store 앱 레코드를 이어 쓴다.
   App Store Connect 에 이미 들어간 주소(/munghae, /munghae/support, /munghae/privacy)를 그대로 쓰려고
   라우트는 munghae 로 둔다. 앱 원본: GAMEAPP 저장소 MUNGHAE-Mem/. */

export const metadata: Metadata = {
  title: '간직 · Keepsake — 반려동물 추모 스노우볼',
  description:
    '무지개다리를 건넌 반려견·반려묘를 작은 유리 스노우볼 안에 간직하는 개인 추모 공간. 하루 한 번 촛불, 49일의 배웅, 하늘로 보내는 편지. 계정·광고·서버 없음 — 모든 기록은 기기 안에만.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/munghae' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/munghae',
    title: '간직 — 반려동물 추모 스노우볼',
    description: '그 애를 유리 스노우볼 안에 간직하세요. 흔들면 눈이 내리고, 하루 한 번 촛불로 49일의 배웅을 합니다.',
    type: 'website',
    images: ['/munghae/icon-512.png'],
  },
  twitter: { card: 'summary' },
  icons: { icon: '/munghae/icon-512.png', apple: '/munghae/icon-512.png' },
};

export const viewport: Viewport = { themeColor: '#151a2e' };

/** 첫 페인트 전에 data-lang 을 세운다 (steelrace 와 같은 방식 — 늦게 붙으면 언어가 깜빡인다). */
const LANG_BOOTSTRAP = `(function(){try{
var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});
if(s!=='ko'&&s!=='en'){s=(navigator.language||'ko').toLowerCase().indexOf('ko')===0?'ko':'en';}
document.documentElement.setAttribute('data-lang',s);
document.documentElement.setAttribute('lang',s);
}catch(e){}})();`;

const YEAR = new Date().getFullYear();

export default function KeepsakeLayout({ children }: { children: React.ReactNode }) {
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
