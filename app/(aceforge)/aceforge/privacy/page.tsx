import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보 처리방침 — Aceforge 에이스포지',
  description: '에이스포지는 어떠한 개인정보도 수집하지 않습니다. 계정도 로그인도 없이 완전히 오프라인으로 동작합니다.',
  alternates: { canonical: '/aceforge/privacy' },
  robots: { index: true, follow: true },
};

export default function AceforgePrivacyPage() {
  return <PrivacyContent />;
}
