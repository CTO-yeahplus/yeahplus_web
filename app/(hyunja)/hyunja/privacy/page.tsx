import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보 처리방침 — 현자의 서재',
  description:
    '현자의 서재는 개인정보를 수집하지 않습니다. 기록은 사용자의 기기와 사용자의 iCloud에만 저장되며 개발자는 볼 수 없습니다.',
  alternates: { canonical: '/hyunja/privacy' },
  robots: { index: true, follow: true },
};

export default function HyunjaPrivacyPage() {
  return <PrivacyContent />;
}
