import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보처리방침 · Privacy Policy — 조선왕조실록: 왕의 선택',
  description:
    '조선왕조실록 — 왕의 선택 개인정보처리방침. 이 앱은 어떤 개인정보도 수집하지 않습니다. 계정 없음, 광고 없음, 서버 통신 없음.',
  alternates: { canonical: '/sillok/privacy' },
  robots: { index: true, follow: true },
};

export default function SillokPrivacyPage() {
  return <PrivacyContent />;
}
