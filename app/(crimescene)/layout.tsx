import type { Metadata, Viewport } from 'next';
import { Gowun_Batang, Nanum_Brush_Script } from 'next/font/google';
import './crimescene/globals.css';
import SiteShell from './crimescene/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/* 전설의 조선 사건부 — 원본은 GAME/APLUS/crimescene/site-react (정적 호스팅용 Vite 빌드)이고,
   여기서는 다른 제품과 같이 라우트 그룹이 자기 <html> 을 그린다.
   글꼴(고운바탕 · 나눔손글씨 붓 — 게임과 같은 둘)은 next/font 로 이 도메인에서 내려 준다
   (방문자의 브라우저가 Google 에 글꼴을 요청하지 않는다 — 개인정보 처리방침 4번과 맞춘다). */

const body = Gowun_Batang({ weight: ['400', '700'], subsets: ['latin'], display: 'swap', preload: false, variable: '--cs-body-font' });
const brush = Nanum_Brush_Script({ weight: '400', subsets: ['latin'], display: 'swap', preload: false, variable: '--cs-brush-font' });

const TITLE = '전설의 조선 사건부 — 증거로 푸는 조선 수사 이야기';
const DESCRIPTION =
  '아버지가 남긴 사건부. 풀지 못한 사건은 이제 내가 푼다. 수묵 담채 3D 현장에서 증거를 찾고, 곁의 사람들과 의논해 범인을 가리는 여덟 화의 이야기 게임.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/crimescene' },
  openGraph: {
    siteName: '전설의 조선 사건부',
    locale: 'ko_KR',
    url: '/crimescene',
    title: TITLE,
    description: '여덟 화 · 세 가지 결말 · 1~2화 무료 · 광고 없음',
    type: 'website',
    images: [{ url: '/crimescene/og.jpg', width: 1200, height: 675 }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/crimescene/icon-512.png', apple: '/crimescene/icon-180.png' },
};

export const viewport: Viewport = { themeColor: '#e6dbc2' };

const YEAR = new Date().getFullYear();

/* 그리기 전에 언어를 정한다: 저장된 값 → 브라우저 언어. 두 언어를 함께 렌더하고 <html data-lang> 으로 한쪽만 보이므로 깜빡임이 없다 (i18n.tsx) */
const LANG_SCRIPT =
  "(function(){var l;try{l=localStorage.getItem('cs_lang')}catch(e){}if(l!=='ko'&&l!=='en')l=(navigator.language||'').toLowerCase().indexOf('ko')===0?'ko':'en';var h=document.documentElement;h.dataset.lang=l;h.lang=l})()";

export default function CrimesceneLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning — 머리 스크립트가 하이드레이션 전에 <html lang · data-lang> 을 바꾼다.
    <html lang="ko" data-lang="ko" className={`${body.variable} ${brush.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_SCRIPT }} />
      </head>
      <body>
        <SiteShell year={YEAR}>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
