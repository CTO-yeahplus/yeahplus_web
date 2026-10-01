import type { Metadata, Viewport } from 'next';
import './hyunja/globals.css';
import SiteShell from './hyunja/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/* 문안은 docs/METADATA_KO.md · site/hyunja 의 것을 따랐다.
   ⚠️ 이 라우트의 /hyunja/privacy · /hyunja/support 주소가 App Store Connect 에 들어간다. */

const TITLE = '현자의 서재 — 공자·맹자·순자·노자에게 묻다';
const DESCRIPTION =
  '삶의 고민 하나를 고르면 공자·맹자·순자·노자가 서로 다르게 답합니다. 마음이 가는 말을 골라 따라 쓰고, 오늘의 한 줄을 남기면 내 이름의 어록 한 권이 됩니다.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/hyunja' },
  openGraph: {
    siteName: '현자의 서재',
    locale: 'ko_KR',
    url: '/hyunja',
    title: TITLE,
    description: '고민 하나에 네 현자의 답 · 필사 · 나의 어록. 한 번 구매 · 광고 없음 · 회원 가입 없음.',
    type: 'website',
    images: [{ url: '/hyunja/og.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/hyunja/icon-512.png', apple: '/hyunja/icon-512.png' },
};

export const viewport: Viewport = { themeColor: '#F4EFE4' };

const YEAR = new Date().getFullYear();

/* 스크롤 등장 효과(.js .hj-rv)는 JS 가 있을 때만 숨긴다 — 없으면 전부 보이는 상태 */
const JS_FLAG = "document.documentElement.classList.add('js')";

export default function HyunjaLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning — LangProvider 가 마운트 후 <html lang> 을 바꾼다.
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
      </head>
      <body>
        <SiteShell year={YEAR}>{children}</SiteShell>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
