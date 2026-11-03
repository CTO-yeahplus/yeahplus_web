import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 · Support — 로켓주차',
  description: '로켓주차 자주 묻는 질문과 문의. 패드 놓기, 조작, 발열, 궤도 알림, 구입 복원, 기록.',
  alternates: { canonical: '/rocketparking/support' },
  robots: { index: true, follow: true },
};

export default function RocketParkingSupportPage() {
  return <SupportContent />;
}
