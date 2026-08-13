import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 — Wordforge',
  description: '워드포지 게임의 이용 조건, 구매·환불, 게임 데이터, 지식재산권에 관한 약관입니다.',
  alternates: { canonical: '/wordforge/terms' },
  robots: { index: true, follow: true },
};

export default function WordforgeTermsPage() {
  return <TermsContent />;
}
