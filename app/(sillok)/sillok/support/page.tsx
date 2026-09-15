import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 / FAQ · Support — 조선왕조실록: 왕의 선택',
  description:
    '조선왕조실록 — 왕의 선택 자주 묻는 질문과 문의 창구. App Store 지원 URL 로 쓰는 페이지입니다.',
  alternates: { canonical: '/sillok/support' },
  robots: { index: true, follow: true },
};

export default function SillokSupportPage() {
  return <SupportContent />;
}
