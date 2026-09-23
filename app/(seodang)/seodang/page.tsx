import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '성어서당 — 이야기로 익히는 사자성어',
  description:
    '초등 3~6학년을 위한 사자성어 학습 앱. 고사 속에서 직접 고르고, 옛 책으로 확인하고, 한자 네 글자를 붓으로 따라 씁니다. 광고·추가 결제·인터넷 연결이 없습니다.',
  alternates: { canonical: '/seodang' },
};

export default function SeodangPage() {
  return <HomeContent />;
}
