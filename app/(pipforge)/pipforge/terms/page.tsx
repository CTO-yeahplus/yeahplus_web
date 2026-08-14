import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 (EULA) — Pipforge 핍포지',
  description: 'Pipforge 앱의 라이선스, 구매·환불, 게임 콘텐츠의 성격, 책임 제한에 관한 약관입니다.',
  alternates: { canonical: '/pipforge/terms' },
  robots: { index: true, follow: true },
};

export default function PipforgeTermsPage() {
  return <TermsContent />;
}
