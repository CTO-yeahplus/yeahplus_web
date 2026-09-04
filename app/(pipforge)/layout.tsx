import type { Metadata, Viewport } from 'next';
import './pipforge/globals.css';
import SiteShell from './pipforge/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Pipforge — A Dice Roguelike · 핍포지',
  description:
    'Roll. Forge. Detonate. A pay-once dice roguelike for iPhone. 주사위를 벼려라 — 광고 없는 유료 주사위 로그라이크.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/pipforge' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/pipforge',
    title: 'Pipforge — A Dice Roguelike',
    description: 'Roll. Forge. Detonate. Chisel your own dice, stack absurd multipliers, beat the quota.',
    type: 'website',
    images: ['/pipforge/pipforge_icon.png'],
  },
  icons: { icon: '/pipforge/pipforge_icon.png' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#16130f' };

const YEAR = new Date().getFullYear();

export default function PipforgeLayout({ children }: { children: React.ReactNode }) {
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
