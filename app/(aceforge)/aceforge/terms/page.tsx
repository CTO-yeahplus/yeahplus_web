import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 — Aceforge 에이스포지',
  description: 'Aceforge 이용약관 — Apple 표준 EULA, 1회 구매, 광고·인앱결제 없음.',
  alternates: { canonical: '/aceforge/terms' },
  robots: { index: true, follow: true },
};

export default function AceforgeTermsPage() {
  return <TermsContent />;
}
