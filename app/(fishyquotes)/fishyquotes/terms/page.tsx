import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용 약관 — 수상한 명언',
  description:
    '수상한 명언 이용 약관 · 한 번 구입하는 유료 앱, Apple 표준 EULA, 원문과 번역, 판정의 정확성과 오류 제보.',
  alternates: { canonical: '/fishyquotes/terms' },
  robots: { index: true, follow: true },
};

export default function FishyQuotesTermsPage() {
  return <TermsContent />;
}
