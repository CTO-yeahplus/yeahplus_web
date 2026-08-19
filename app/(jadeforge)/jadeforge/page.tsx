import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Jadeforge — A Mahjong Roguelike · 제이드포지',
  description: 'Mahjong solitaire × roguelike deckbuilding. Carve your own tile set — every deal guaranteed solvable. No ads, no IAP — pay once. 마작 로그라이크, 광고·인앱결제 없음.',
  alternates: { canonical: '/jadeforge' },
};

export default function JadeforgeHomePage() {
  return <HomeContent />;
}
