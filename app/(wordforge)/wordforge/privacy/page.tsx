import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보 처리방침 — Wordforge',
  description:
    '워드포지는 어떠한 개인정보도 수집하지 않습니다. 계정도, 로그인도, 네트워크 통신도 없이 완전히 오프라인으로 동작합니다.',
  alternates: { canonical: '/wordforge/privacy' },
  robots: { index: true, follow: true },
};

export default function WordforgePrivacyPage() {
  return <PrivacyContent />;
}
