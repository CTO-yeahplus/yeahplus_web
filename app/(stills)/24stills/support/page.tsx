import type { Metadata } from 'next';
import LegalPage from '../LegalPage';
import { LEGAL } from '../legalData';

// 고정 콘텐츠 — 빌드 시 프리렌더.
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '24STILLS — 고객지원 / Support',
  description: '24STILLS 문의와 자주 묻는 질문.',
  alternates: { canonical: '/24stills/support' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage doc={LEGAL.support} />;
}
