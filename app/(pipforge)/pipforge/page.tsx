import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Pipforge — A Dice Roguelike · 핍포지',
  description:
    '주사위 눈을 직접 세공해 칩 × 배율을 쌓아 올리는 유료 주사위 로그라이크. 광고 없음, 인앱결제 없음, 완전 오프라인.',
  alternates: { canonical: '/pipforge' },
};

export default function PipforgeHomePage() {
  return <HomeContent />;
}
