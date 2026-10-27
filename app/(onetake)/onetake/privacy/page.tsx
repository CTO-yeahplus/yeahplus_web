import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보처리방침 · Privacy Policy — 원 테이크',
  description:
    '원 테이크 개인정보처리방침. 계정·연락처·위치를 수집하지 않습니다. 기록과 설정은 기기 안에 저장되고, 이용자가 보낸 도전장 기록만 7일 동안 맡아 두며, 결제는 Apple 이 처리합니다.',
  alternates: { canonical: '/onetake/privacy' },
  robots: { index: true, follow: true },
};

export default function OneTakePrivacyPage() {
  return <PrivacyContent />;
}
