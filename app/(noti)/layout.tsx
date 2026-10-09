import type { Metadata, Viewport } from 'next';
import { Noto_Serif_KR } from 'next/font/google';
import './noti/globals.css';
import SiteShell from './noti/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/* 노티: 새벽 3시의 인턴 — 원본은 GAME/APLUS/noti/site-react (정적 호스팅용 Vite 빌드)였고,
   여기서는 다른 제품과 같이 라우트 그룹이 자기 <html> 을 그린다.
   명조는 next/font 로 이 도메인에서 내려 준다 (방문자의 브라우저가 Google 에 글꼴을 요청하지 않는다 — 개인정보 처리방침 5조와 맞춘다). */

const serif = Noto_Serif_KR({ weight: ['400', '600', '900'], subsets: ['latin'], display: 'swap', preload: false, variable: '--nt-serif-font' });

const TITLE = '노티: 새벽 3시의 인턴 — 당신이 주인공인 메디컬 드라마';
const DESCRIPTION =
  '3월 2일, 대학병원 응급실 첫 당직. 새벽 3시, 사흘 만에 잠든 윗연차를 깨울 것인가. 그날의 결정이 1년을 따라다닙니다. 여덟 화의 이야기 게임 · 한국어 · English';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/noti' },
  openGraph: {
    siteName: '노티: 새벽 3시의 인턴',
    locale: 'ko_KR',
    url: '/noti',
    title: TITLE,
    description: '여덟 화 · 되돌릴 수 없는 선택 · 1~2화 무료 · 광고 없음',
    type: 'website',
    images: [{ url: '/noti/og.jpg', width: 1200, height: 675 }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/noti/icon-512.png', apple: '/noti/icon-512.png' },
};

export const viewport: Viewport = { themeColor: '#0D1016' };

const YEAR = new Date().getFullYear();

export default function NotiLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning — LangProvider 가 마운트 후 <html lang> 을 바꾼다.
    <html lang="ko" className={serif.variable} suppressHydrationWarning>
      <body>
        <SiteShell year={YEAR}>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
