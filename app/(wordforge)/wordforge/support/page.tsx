import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 · FAQ — Wordforge',
  description:
    '워드포지 게임 방법과 자주 묻는 질문, 버그 제보 방법을 안내합니다. App Store 지원 URL로 사용하는 페이지입니다.',
  alternates: { canonical: '/wordforge/support' },
  robots: { index: true, follow: true },
};

export default function WordforgeSupportPage() {
  return <SupportContent />;
}
