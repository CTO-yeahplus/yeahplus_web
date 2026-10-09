import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '고객 지원 — 전설의 조선 사건부',
  description:
    '자주 묻는 질문과 문의',
  alternates: { canonical: '/crimescene/support' },
  robots: { index: true, follow: true },
};

export default function CrimesceneSupportPage() {
  return <SupportContent />;
}
