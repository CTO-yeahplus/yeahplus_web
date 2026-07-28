import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const metadata: Metadata = {
  title: '개인정보 처리방침 — TOWER 68',
  description: 'TOWER 68 개인정보 처리방침. 회원가입 없이 이용되며 기록은 기기 내부에만 저장됩니다.',
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
