import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 / FAQ — Aceforge 에이스포지',
  description: 'Aceforge 자주 묻는 질문과 문의 창구. App Store 지원 URL로 사용하는 페이지입니다.',
  alternates: { canonical: '/aceforge/support' },
  robots: { index: true, follow: true },
};

export default function AceforgeSupportPage() {
  return <SupportContent />;
}
