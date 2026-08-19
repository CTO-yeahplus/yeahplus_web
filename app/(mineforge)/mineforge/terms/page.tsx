import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 — Mineforge 마인포지',
  description: 'Mineforge 이용약관 — Apple 표준 EULA, 1회 구매, 광고·인앱결제 없음.',
  alternates: { canonical: '/mineforge/terms' },
  robots: { index: true, follow: true },
};

export default function MineforgeTermsPage() {
  return <TermsContent />;
}
