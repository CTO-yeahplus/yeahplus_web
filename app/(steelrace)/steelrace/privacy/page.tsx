import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보처리방침 · Privacy Policy — 스틸레이스',
  description:
    '스틸레이스 개인정보처리방침. 이 앱은 사용자 데이터를 수집하거나 전송하지 않습니다. 기록과 설정은 기기 안에만 저장되고, Game Center 순위·도전과제는 Apple 이 처리합니다.',
  alternates: { canonical: '/steelrace/privacy' },
  robots: { index: true, follow: true },
};

export default function SteelracePrivacyPage() {
  return <PrivacyContent />;
}
