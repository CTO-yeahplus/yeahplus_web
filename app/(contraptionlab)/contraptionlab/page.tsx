import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '뚝딱 실험실 · Contraption Lab — 굴리고 튕기는 물리 퍼즐',
  description:
    '부품을 놓고 돌려 구슬을 바구니까지. 나무 비탈은 붙잡고 얼음 비탈은 놓아주는 진짜 물리로 판정합니다. 초등 1~6학년 · 8개 챕터 48개 실험실 · 레벨 에디터. 광고 없음, 인앱결제 없음, 완전 오프라인.',
  alternates: { canonical: '/contraptionlab' },
};

export default function ContraptionlabPage() {
  return <HomeContent />;
}
