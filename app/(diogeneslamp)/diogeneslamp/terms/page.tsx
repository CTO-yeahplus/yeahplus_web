import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용 약관 — 디오게네스의 등불',
  description:
    '디오게네스의 등불 이용 약관 · 한 번 구입하는 유료 앱, Apple 표준 EULA, 원문과 번역, 판정의 정확성과 오류 제보.',
  alternates: { canonical: '/diogeneslamp/terms' },
  robots: { index: true, follow: true },
};

export default function DiogenesLampTermsPage() {
  return <TermsContent />;
}
