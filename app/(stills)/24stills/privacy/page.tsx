import type { Metadata } from 'next';
import LegalPage from '../LegalPage';
import { LEGAL } from '../legalData';

// 고정 콘텐츠 — 빌드 시 프리렌더.
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '24STILLS — 개인정보처리방침 / Privacy Policy',
  description: '24STILLS가 개인정보를 어떻게 수집·이용·보관·파기하는지 안내합니다.',
  alternates: { canonical: '/24stills/privacy' },
  robots: { index: true, follow: true },
};

export default function Page() {
  return <LegalPage doc={LEGAL.privacy} />;
}
