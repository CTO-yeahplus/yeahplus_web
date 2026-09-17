import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'CineLook — 필름카메라 감성과 영화 필터',
  description:
    '필름카메라 8종, 프레임 20종, 4컷 부스, 영화 필터 30종. 구독 없이 한 번 사면 평생. 사진은 기기를 떠나지 않습니다.',
  alternates: { canonical: '/cinelook' },
};

export default function CinelookPage() {
  return <HomeContent />;
}
