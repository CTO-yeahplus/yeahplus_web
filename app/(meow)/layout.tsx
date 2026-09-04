import type { Metadata } from 'next';
import './meow/globals.css';
import SiteShell from './meow/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'MYOHAE (묘해) — 우리 냥이가 주인공',
  description:
    '집에서 찍은 우리 고양이 사진을 꾸미고 AI 아트로 변신시켜 전 세계 집사들과 나누는 모바일 앱, 묘해(MYOHAE).',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/meow' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/meow',
    title: 'MYOHAE (묘해)',
    description: '우리 냥이 사진을 꾸미고 AI로 변신시키세요.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

const YEAR = new Date().getFullYear();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <SiteShell year={YEAR}>{children}</SiteShell>
              <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
