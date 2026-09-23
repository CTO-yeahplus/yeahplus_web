import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용 약관 — 성어서당',
  description:
    '성어서당 이용 약관 · 한 번 구매하면 계속, 앞으로 더해지는 오리지널 콘텐츠 포함, 제휴 콘텐츠는 별도.',
  alternates: { canonical: '/seodang/terms' },
  robots: { index: true, follow: true },
};

export default function SeodangTermsPage() {
  return <TermsContent />;
}
