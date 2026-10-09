import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 — 전설의 조선 사건부',
  description:
    '전설의 조선 사건부 이용약관. 무료로 받고, 3~8화(시즌 1)는 한 번 구매로 열립니다.',
  alternates: { canonical: '/crimescene/terms' },
  robots: { index: true, follow: true },
};

export default function CrimesceneTermsPage() {
  return <TermsContent />;
}
