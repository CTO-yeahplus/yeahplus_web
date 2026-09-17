import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '고객 지원 — CineLook',
  description: 'CineLook 고객 지원과 자주 묻는 질문. 문의: contact@yeahplus.co.kr',
  alternates: { canonical: '/cinelook/support' },
  robots: { index: true, follow: true },
};

export default function CinelookSupportPage() {
  return <SupportContent />;
}
