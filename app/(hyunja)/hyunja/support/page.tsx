import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '도움말 — 현자의 서재',
  description: '현자의 서재 도움말과 자주 묻는 질문. 문의: contact@yeahplus.co.kr',
  alternates: { canonical: '/hyunja/support' },
  robots: { index: true, follow: true },
};

export default function HyunjaSupportPage() {
  return <SupportContent />;
}
