import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '간직 · Keepsake — 반려동물 추모 스노우볼',
  description:
    '무지개다리를 건넌 반려견·반려묘를 유리 스노우볼 안에 간직하세요. 하루 한 번 촛불, 49일의 배웅, 하늘로 보내는 편지, 수채 아트웍. iPhone, 계정·광고·서버 없음.',
  alternates: { canonical: '/munghae' },
};

export default function KeepsakePage() {
  return <HomeContent />;
}
