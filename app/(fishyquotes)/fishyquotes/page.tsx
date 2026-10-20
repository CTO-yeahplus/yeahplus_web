import type { Metadata } from 'next';
import HomeContent from './HomeContent';
import './home/home.css';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '수상한 명언 — 그 말, 진짜일까?',
  description:
    '인터넷에 떠도는 철학자 명언이 진짜인지, 가짜인지, 비틀린 것인지 카드를 밀어 판정하는 퀴즈 게임. 판정마다 증거와 원문이 따라옵니다.',
  alternates: { canonical: '/fishyquotes' },
};

export default function FishyQuotesPage() {
  return <HomeContent />;
}
