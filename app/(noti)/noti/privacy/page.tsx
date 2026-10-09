import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보 처리방침 — 노티: 새벽 3시의 인턴',
  description: '노티 앱은 개인정보를 수집하지 않습니다. 계정이 없고, 진행 기록과 설정은 기기 안에만 저장됩니다.',
  alternates: { canonical: '/noti/privacy' },
  robots: { index: true, follow: true },
};

export default function NotiPrivacyPage() {
  return <PrivacyContent />;
}
