import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '원 테이크 · ONE TAKE — 차 한 대. 테이크 한 번. 컷 없이.',
  description:
    '샷 아홉 개를 멈추지 않고 몰아 찍으면, 멈추는 순간 감독판 편집본이 나오는 드리프트 스턴트 게임. 장소 7곳 · 모범 테이크 7편. 광고 없음, 데이터 수집 없음.',
  alternates: { canonical: '/onetake' },
  robots: { index: true, follow: true },
};

export default function OneTakeHomePage() {
  return <HomeContent />;
}
