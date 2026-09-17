import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보 처리방침 — CineLook',
  description:
    'CineLook 은 개인정보를 일절 수집하지 않습니다. 사진과 카메라 영상은 기기 안에서만 처리됩니다.',
  alternates: { canonical: '/cinelook/privacy' },
  robots: { index: true, follow: true },
};

export default function CinelookPrivacyPage() {
  return <PrivacyContent />;
}
