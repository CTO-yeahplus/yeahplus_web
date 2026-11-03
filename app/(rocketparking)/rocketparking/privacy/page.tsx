import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보처리방침 · Privacy Policy — 로켓주차',
  description: '로켓주차는 사용자 데이터를 수집하거나 전송하지 않습니다. 카메라 영상은 화면에만 쓰고 저장하지 않습니다.',
  alternates: { canonical: '/rocketparking/privacy' },
  robots: { index: true, follow: true },
};

export default function RocketParkingPrivacyPage() {
  return <PrivacyContent />;
}
