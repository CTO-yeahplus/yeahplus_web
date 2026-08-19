import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 / FAQ — Mineforge 마인포지',
  description: 'Mineforge 자주 묻는 질문과 문의 창구. App Store 지원 URL로 사용하는 페이지입니다.',
  alternates: { canonical: '/mineforge/support' },
  robots: { index: true, follow: true },
};

export default function MineforgeSupportPage() {
  return <SupportContent />;
}
