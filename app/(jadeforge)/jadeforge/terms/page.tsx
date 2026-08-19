import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 — Jadeforge 제이드포지',
  description: 'Jadeforge 이용약관 — Apple 표준 EULA, 1회 구매, 광고·인앱결제 없음.',
  alternates: { canonical: '/jadeforge/terms' },
  robots: { index: true, follow: true },
};

export default function JadeforgeTermsPage() {
  return <TermsContent />;
}
