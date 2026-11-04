import type { Metadata } from 'next';
import SupportContent from './SupportContent';
import { APP } from '../names';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `지원 · Support — ${APP.ko}`,
  description: `${APP.ko} 자주 묻는 질문과 문의. 정상인데 연필로 적혔을 때, 기기 바꿀 때 백업, 평생권 복원, 내 산.`,
  alternates: { canonical: '/summitbook/support' },
  robots: { index: true, follow: true },
};

export default function SummitBookSupportPage() {
  return <SupportContent />;
}
