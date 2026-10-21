import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관',
  description: '예아플러스 회사 웹사이트와 공식 SNS 계정의 이용약관.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return <TermsContent />;
}
