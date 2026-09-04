import type { Metadata } from 'next';
import './tower68/globals.css';
import SiteShell from './tower68/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'TOWER 68 — 손끝으로 하늘의 질서를',
  description:
    'JFK 관제탑 31년, 1시간 68대. 실화에서 영감을 받은 라인 드로잉 관제 아케이드 TOWER 68. 비행기를 같은 색 활주로로 유도해 완벽한 버터 랜딩에 도전하세요.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/tower68' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/tower68',
    title: 'TOWER 68',
    description: 'JFK 관제탑 31년, 1시간 68대. 손끝으로 하늘의 질서를.',
    type: 'website',
    images: ['/tower68/tower68_logo.png'],
  },
  icons: { icon: '/tower68/tower68_logo.png' },
  twitter: { card: 'summary_large_image' },
};

const YEAR = new Date().getFullYear();

export default function Tower68Layout({ children }: { children: React.ReactNode }) {
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
