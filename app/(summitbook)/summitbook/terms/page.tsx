import type { Metadata } from 'next';
import TermsContent from './TermsContent';
import { APP } from '../names';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `이용약관 · Terms of Use — ${APP.ko}`,
  description: `${APP.ko} 이용약관 — Apple 표준 사용권 계약, 평생권, 안전, 이용자의 기록.`,
  alternates: { canonical: '/summitbook/terms' },
  robots: { index: true, follow: true },
};

export default function SummitBookTermsPage() {
  return <TermsContent />;
}
