import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 — 노티: 새벽 3시의 인턴',
  description: '노티: 새벽 3시의 인턴 이용약관 — 구매와 사용권, 지어낸 이야기이며 의학적 조언이 아니라는 점.',
  alternates: { canonical: '/noti/terms' },
  robots: { index: true, follow: true },
};

export default function NotiTermsPage() {
  return <TermsContent />;
}
