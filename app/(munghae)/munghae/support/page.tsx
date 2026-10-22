import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 · Support — 간직 Keepsake',
  description:
    '간직 지원 · 자주 묻는 질문. 기록은 어디에 저장되나요, 휴대폰을 바꿀 때(백업 파일), 구매 복원, 프로에 들어 있는 것, 살아있는 액자, 문의처.',
  alternates: { canonical: '/munghae/support' },
};

export default function KeepsakeSupportPage() {
  return <SupportContent />;
}
