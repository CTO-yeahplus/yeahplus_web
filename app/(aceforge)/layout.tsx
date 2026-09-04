import type { Metadata, Viewport } from 'next';
import './aceforge/globals.css';
import SiteShell from './aceforge/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Aceforge — A Solitaire Roguelike · 에이스포지',
  description: 'TriPeaks solitaire × roguelike deckbuilding. Forge all 52 cards of your deck. No ads, no IAP — pay once. 솔리테어 로그라이크, 광고·인앱결제 없음.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/aceforge' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/aceforge',
    title: 'Aceforge — A Solitaire Roguelike',
    description: 'Chain. Forge. Detonate. TriPeaks solitaire crossed with a roguelike builder.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#16130f' };

const YEAR = new Date().getFullYear();

export default function AceforgeLayout({ children }: { children: React.ReactNode }) {
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
