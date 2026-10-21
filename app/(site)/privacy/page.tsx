import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: '예아플러스 회사 웹사이트와 공식 SNS(인스타그램 · 페이스북 · Threads) 자동 게시 앱의 개인정보처리방침과 데이터 삭제 안내.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
