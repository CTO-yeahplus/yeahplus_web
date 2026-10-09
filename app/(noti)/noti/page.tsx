import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '노티: 새벽 3시의 인턴 — 당신이 주인공인 메디컬 드라마',
  description:
    '3월 2일, 대학병원 응급실 첫 당직. 새벽 3시, 사흘 만에 잠든 윗연차를 깨울 것인가. 그날의 결정이 1년을 따라다닙니다. 여덟 화의 이야기 게임 · 한국어 · English',
  alternates: { canonical: '/noti' },
};

export default function NotiPage() {
  return <HomeContent />;
}
