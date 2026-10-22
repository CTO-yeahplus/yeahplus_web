import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '스틸레이스 · STEELRACE — 야간 드론 레이싱',
  description:
    '밤의 경기장을 가르는 FPV 드론 레이스. 리그 나이트 3라운드, 한국 자정마다 바뀌는 오늘의 코스, Game Center 순위·도전과제. iPhone, 가로 화면, 사용자 데이터 수집 없음.',
  alternates: { canonical: '/steelrace' },
};

export default function SteelracePage() {
  return <HomeContent />;
}
