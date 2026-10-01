import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용 약관 — 현자의 서재',
  description:
    '현자의 서재 이용 약관 · 한 번 구매로 모든 내용, 기록의 권리, 원전과 번역, 책임 제한.',
  alternates: { canonical: '/hyunja/terms' },
  robots: { index: true, follow: true },
};

export default function HyunjaTermsPage() {
  return <TermsContent />;
}
