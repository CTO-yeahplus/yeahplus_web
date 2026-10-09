import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보 처리방침 — 전설의 조선 사건부',
  description:
    '전설의 조선 사건부는 개인정보를 수집하지 않습니다. 계정이 없고, 진행 기록은 기기 안에만 저장됩니다.',
  alternates: { canonical: '/crimescene/privacy' },
  robots: { index: true, follow: true },
};

export default function CrimescenePrivacyPage() {
  return <PrivacyContent />;
}
