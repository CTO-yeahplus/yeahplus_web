import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원 / FAQ — Jadeforge 제이드포지',
  description: 'Jadeforge 자주 묻는 질문과 문의 창구. App Store 지원 URL로 사용하는 페이지입니다.',
  alternates: { canonical: '/jadeforge/support' },
  robots: { index: true, follow: true },
};

export default function JadeforgeSupportPage() {
  return <SupportContent />;
}
