import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Aceforge — A Solitaire Roguelike · 에이스포지',
  description: 'TriPeaks solitaire × roguelike deckbuilding. Forge all 52 cards of your deck. No ads, no IAP — pay once. 솔리테어 로그라이크, 광고·인앱결제 없음.',
  alternates: { canonical: '/aceforge' },
};

export default function AceforgeHomePage() {
  return <HomeContent />;
}
