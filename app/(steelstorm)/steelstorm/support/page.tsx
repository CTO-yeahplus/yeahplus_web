import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 · Support — 스틸스톰 아레나',
  description:
    '스틸스톰 아레나 지원 페이지. 문의 창구, 동작 환경, 조작과 게임 규칙, Game Center·데일리 런·데이터 저장에 관한 자주 묻는 질문.',
  alternates: { canonical: '/steelstorm/support' },
  robots: { index: true, follow: true },
};

export default function SteelstormSupportPage() {
  return <SupportContent />;
}
