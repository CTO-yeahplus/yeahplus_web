import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 · Support — 원 테이크',
  description: '원 테이크 자주 묻는 질문과 문의. 조작, 기울이기 조향, 발열·절전, 구입 복원, 기록, 소리.',
  alternates: { canonical: '/onetake/support' },
  robots: { index: true, follow: true },
};

export default function OneTakeSupportPage() {
  return <SupportContent />;
}
