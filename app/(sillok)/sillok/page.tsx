import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '조선왕조실록 — 왕의 선택 · Joseon Annals: King’s Choice',
  description:
    '아이가 조선 27명의 왕이 되어 실록에 기록된 사건을 하나씩 결정하는 통치 시뮬레이션. 초등 3~6학년 대상. 광고 없음, 인앱결제 없음, 계정 없음, 데이터 수집 없음.',
  alternates: { canonical: '/sillok' },
  robots: { index: true, follow: true },
};

export default function SillokHomePage() {
  return <HomeContent />;
}
