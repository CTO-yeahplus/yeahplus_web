import type { Metadata, Viewport } from 'next';
import './24stills/stills.css';
import { LangProvider, StillsNav, StillsFooter } from './24stills/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

/* 24STILLS — 랜딩 + 개인정보처리방침·이용약관·지원.
   이전에는 public/24stills/*.html 정적 묶음이었다. 주소는 그대로 유지한다
   (/24stills/privacy.html 같은 예전 주소는 next.config.ts 의 rewrite 가 받는다 —
   App Store Connect 와 앱 안에 그 주소가 박혀 있다). */

export const metadata: Metadata = {
  title: '24STILLS — 한 달 24장, 3일의 기다림',
  description:
    '한 달에 딱 24장, 찍고 3일을 기다려야 현상되는 필름 카메라. 낯선 누군가와 한 롤을 채우고, 필름의 색으로 남기세요. 덜 찍고, 더 기억한다.',
  metadataBase: new URL('https://www.yeahplus.co.kr'),
  alternates: { canonical: '/24stills' },
  openGraph: {
    siteName: '24STILLS',
    locale: 'ko_KR',
    url: '/24stills',
    title: '24STILLS — 덜 찍고, 더 기억한다',
    description: '한 달 24장 · 3일 현상 · 함께 채우는 롤. A film camera: 24 shots a month.',
    type: 'website',
    images: [{ url: '/24stills/landing/og.jpg', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image' },
  icons: { icon: '/24stills/24_logo.png', apple: '/24stills/24_logo.png' },
};

export const viewport: Viewport = { themeColor: '#111111', colorScheme: 'dark' };

const YEAR = new Date().getFullYear();

export default function StillsLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning — LangProvider 가 마운트 후 <html lang> 을 바꾼다.
    <html lang="ko" suppressHydrationWarning>
      <body className="st-body">
        <LangProvider>
          <StillsNav />
          {children}
          <StillsFooter year={YEAR} />
        </LangProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
