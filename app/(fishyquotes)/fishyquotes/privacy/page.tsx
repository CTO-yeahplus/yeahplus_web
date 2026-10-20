import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보 처리방침 — 수상한 명언',
  description:
    '수상한 명언은 개인정보를 수집하지 않습니다. 진행 기록은 사용자의 기기 안에만 저장되며 회사는 볼 수 없습니다.',
  alternates: { canonical: '/fishyquotes/privacy' },
  robots: { index: true, follow: true },
};

export default function FishyQuotesPrivacyPage() {
  return <PrivacyContent />;
}
