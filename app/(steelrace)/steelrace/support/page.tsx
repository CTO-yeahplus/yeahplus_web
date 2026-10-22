import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 · Support — 스틸레이스',
  description:
    '스틸레이스 지원 · 자주 묻는 질문. 조작(기울기 · 터치 스틱 · 스로틀 · 브레이크), 모드(리그 나이트 · 구간 연습 · 1랩 · 히트), 오늘의 코스, 진동 · 연출 설정, 문의처.',
  alternates: { canonical: '/steelrace/support' },
};

export default function SteelraceSupportPage() {
  return <SupportContent />;
}
