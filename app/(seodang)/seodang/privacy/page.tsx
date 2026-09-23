import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보 처리방침 — 성어서당',
  description:
    '성어서당은 개인정보를 일절 수집하지 않습니다. 계정이 없고, 읽은 기록과 설정값은 기기 안에만 저장됩니다.',
  alternates: { canonical: '/seodang/privacy' },
  robots: { index: true, follow: true },
};

export default function SeodangPrivacyPage() {
  return <PrivacyContent />;
}
