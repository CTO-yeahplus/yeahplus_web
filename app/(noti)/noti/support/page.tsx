import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 — 노티: 새벽 3시의 인턴',
  description: '자주 묻는 질문과 문의 — 선택 되돌리기, 저장, 시즌권 구매 복원, 언어.',
  alternates: { canonical: '/noti/support' },
  robots: { index: true, follow: true },
};

export default function NotiSupportPage() {
  return <SupportContent />;
}
