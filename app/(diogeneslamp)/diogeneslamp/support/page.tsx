import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 — 디오게네스의 등불',
  description: '디오게네스의 등불 자주 묻는 질문과 문의. 문의: contact@yeahplus.co.kr',
  alternates: { canonical: '/diogeneslamp/support' },
  robots: { index: true, follow: true },
};

export default function DiogenesLampSupportPage() {
  return <SupportContent />;
}
