import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 — Pipforge 핍포지',
  description: 'Pipforge 자주 묻는 질문과 문의 창구. App Store 지원 URL로 사용하는 페이지입니다.',
  alternates: { canonical: '/pipforge/support' },
  robots: { index: true, follow: true },
};

export default function PipforgeSupportPage() {
  return <SupportContent />;
}
