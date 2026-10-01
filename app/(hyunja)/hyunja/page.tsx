import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '현자의 서재 — 공자·맹자·순자·노자에게 묻다',
  description:
    '삶의 고민 하나를 고르면 공자·맹자·순자·노자가 서로 다르게 답합니다. 마음이 가는 말을 골라 따라 쓰고, 오늘의 한 줄을 남기면 내 이름의 어록 한 권이 됩니다.',
  alternates: { canonical: '/hyunja' },
};

export default function HyunjaPage() {
  return <HomeContent />;
}
