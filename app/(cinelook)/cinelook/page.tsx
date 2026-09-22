import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'CineLook — 주머니 속 네컷 사진관',
  description:
    '셔터 한 번에 4컷, 프레임 20종, 영화 필터 35종, 필름카메라 8종. 앱 전체가 바뀌는 테마와 테마별 공유 카드까지. 구독 없이 한 번 사면 평생, 사진은 기기를 떠나지 않습니다.',
  alternates: { canonical: '/cinelook' },
};

export default function CinelookPage() {
  return <HomeContent />;
}
