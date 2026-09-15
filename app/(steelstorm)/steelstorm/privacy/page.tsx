import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보처리방침 · Privacy Policy — 스틸스톰 아레나',
  description:
    '스틸스톰 아레나 개인정보처리방침. 이 앱은 어떠한 데이터도 수집하지 않습니다. 계정·서버·광고·분석 도구가 없고 모든 기록은 기기 안에만 저장됩니다.',
  alternates: { canonical: '/steelstorm/privacy' },
  robots: { index: true, follow: true },
};

export default function SteelstormPrivacyPage() {
  return <PrivacyContent />;
}
