import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 · Terms of Use — 원 테이크',
  description: '원 테이크 이용약관. Apple 표준 사용권 계약, 장소 평생권, 기록, 안전 안내, 문의.',
  alternates: { canonical: '/onetake/terms' },
  robots: { index: true, follow: true },
};

export default function OneTakeTermsPage() {
  return <TermsContent />;
}
