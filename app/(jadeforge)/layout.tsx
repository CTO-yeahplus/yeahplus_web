import type { Metadata, Viewport } from 'next';
import './jadeforge/globals.css';
import SiteShell from './jadeforge/chrome';

export const metadata: Metadata = {
  title: 'Jadeforge — A Mahjong Roguelike · 제이드포지',
  description: 'Mahjong solitaire × roguelike deckbuilding. Carve your own tile set — every deal guaranteed solvable. No ads, no IAP — pay once. 마작 로그라이크, 광고·인앱결제 없음.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  openGraph: {
    title: 'Jadeforge — A Mahjong Roguelike',
    description: 'Match. Vein. Detonate. Mahjong solitaire crossed with a roguelike builder.',
    type: 'website',
    url: 'https://yeahplus.co.kr/jadeforge',
  },
};

export const viewport: Viewport = { themeColor: '#0e1a13' };

const YEAR = new Date().getFullYear();

export default function JadeforgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <SiteShell year={YEAR}>{children}</SiteShell>
      </body>
    </html>
  );
}
