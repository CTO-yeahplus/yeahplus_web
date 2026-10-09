import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '전설의 조선 사건부 — 증거로 푸는 조선 수사 이야기',
  description:
    '아버지가 남긴 사건부. 풀지 못한 사건은 이제 내가 푼다. 수묵 담채 3D 현장에서 증거를 찾고, 곁의 사람들과 의논해 범인을 가리는 여덟 화의 이야기 게임.',
  alternates: { canonical: '/crimescene' },
  robots: { index: true, follow: true },
};

export default function CrimescenePage() {
  return <HomeContent />;
}
