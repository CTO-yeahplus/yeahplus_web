import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Wordforge · 워드포지 — 낱말을 만들어 점수를 터뜨린다',
  description:
    '자모를 조합해 음절을 만들고, 참과 두루마리로 판을 키우는 워드 로그라이크. 광고도 인앱결제도 없는 1회 구매 오프라인 게임.',
  alternates: { canonical: '/wordforge' },
};

export default function WordforgeHomePage() {
  return <HomeContent />;
}
