import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '로켓주차 · ROCKET PARKING — 내 자리에 로켓 세우기',
  description:
    '머리 위 1미터에서 떨어지는 부스터를 한 번뿐인 점화로 내 책상 · 정류장 벤치에 세운다. 아침에 쏘고, 퇴근길에 받는다. 광고 없음, 계정 없음, 데이터 수집 없음.',
  alternates: { canonical: '/rocketparking' },
  robots: { index: true, follow: true },
};

export default function RocketParkingHomePage() {
  return <HomeContent />;
}
