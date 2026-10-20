import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 — 수상한 명언',
  description: '수상한 명언 자주 묻는 질문과 문의. 문의: contact@yeahplus.co.kr',
  alternates: { canonical: '/fishyquotes/support' },
  robots: { index: true, follow: true },
};

export default function FishyQuotesSupportPage() {
  return <SupportContent />;
}
