import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 · Support — 뚝딱 실험실',
  description:
    '뚝딱 실험실 지원 페이지. 문의 창구, 동작 환경, 조작과 별 조건, 레벨 에디터·공유 코드·데이터 저장에 관한 자주 묻는 질문.',
  alternates: { canonical: '/contraptionlab/support' },
  robots: { index: true, follow: true },
};

export default function ContraptionlabSupportPage() {
  return <SupportContent />;
}
