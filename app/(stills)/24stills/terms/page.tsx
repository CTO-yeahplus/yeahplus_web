import type { Metadata } from 'next';
import LegalPage from '../LegalPage';
import { LEGAL } from '../legalData';

// 고정 콘텐츠 — 빌드 시 프리렌더.
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '24STILLS — 이용약관 / Terms of Service',
  description: '24STILLS 서비스 이용 조건, 구독, 주간 챌린지 규칙.',
  alternates: { canonical: '/24stills/terms' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage doc={LEGAL.terms} />;
}
