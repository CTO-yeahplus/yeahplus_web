import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보처리방침 · Privacy Policy — 원 테이크',
  description:
    '원 테이크 개인정보처리방침. 이 앱은 어떠한 개인정보도 수집하지 않습니다. 기록과 설정은 기기 안에만 저장되고, 결제는 Apple 이 처리합니다.',
  alternates: { canonical: '/onetake/privacy' },
  robots: { index: true, follow: true },
};

export default function OneTakePrivacyPage() {
  return <PrivacyContent />;
}
