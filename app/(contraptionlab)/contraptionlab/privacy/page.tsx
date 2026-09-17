import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보처리방침 · Privacy Policy — 뚝딱 실험실',
  description:
    '뚝딱 실험실 개인정보처리방침. 이 앱은 개인정보를 수집하지 않습니다. 인터넷에 연결하지 않으며 진행 상황은 기기 안에만 저장됩니다.',
  alternates: { canonical: '/contraptionlab/privacy' },
  robots: { index: true, follow: true },
};

export default function ContraptionlabPrivacyPage() {
  return <PrivacyContent />;
}
