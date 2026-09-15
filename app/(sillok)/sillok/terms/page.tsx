import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 · Terms of Use — 조선왕조실록: 왕의 선택',
  description:
    '조선왕조실록 — 왕의 선택 이용약관. 유료 앱 구매와 이용에 관한 조건, 환불 안내, 책임 범위를 정합니다.',
  alternates: { canonical: '/sillok/terms' },
  robots: { index: true, follow: true },
};

export default function SillokTermsPage() {
  return <TermsContent />;
}
