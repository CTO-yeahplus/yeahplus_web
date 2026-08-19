import type { Metadata, Viewport } from 'next';
import './mineforge/globals.css';
import SiteShell from './mineforge/chrome';

export const metadata: Metadata = {
  title: 'Mineforge — A Minesweeper Roguelike · 마인포지',
  description: 'Minesweeper × roguelike deckbuilding. Chain your digs into seams, salt the board with treasure. No ads, no IAP — pay once. 지뢰찾기 로그라이크, 광고·인앱결제 없음.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  openGraph: {
    title: 'Mineforge — A Minesweeper Roguelike',
    description: 'Dig. Chain. Detonate. Minesweeper crossed with a roguelike builder.',
    type: 'website',
    url: 'https://yeahplus.co.kr/mineforge',
  },
};

export const viewport: Viewport = { themeColor: '#131926' };

const YEAR = new Date().getFullYear();

export default function MineforgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <SiteShell year={YEAR}>{children}</SiteShell>
      </body>
    </html>
  );
}
