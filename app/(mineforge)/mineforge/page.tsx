import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Mineforge — A Minesweeper Roguelike · 마인포지',
  description: 'Minesweeper × roguelike deckbuilding. Chain your digs into seams, salt the board with treasure. No ads, no IAP — pay once. 지뢰찾기 로그라이크, 광고·인앱결제 없음.',
  alternates: { canonical: '/mineforge' },
};

export default function MineforgeHomePage() {
  return <HomeContent />;
}
