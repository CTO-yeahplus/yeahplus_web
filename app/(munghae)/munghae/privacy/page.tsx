import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보처리방침 · Privacy Policy — 간직 Keepsake',
  description:
    '간직 개인정보처리방침. 이 앱은 사용자 데이터를 수집하거나 전송하지 않습니다. 사진·편지·기록은 기기 안에만 저장되고, 백업 파일은 이용자가 직접 보관합니다.',
  alternates: { canonical: '/munghae/privacy' },
  robots: { index: true, follow: true },
};

export default function KeepsakePrivacyPage() {
  return <PrivacyContent />;
}
