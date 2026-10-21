import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '지원',
  description: '예아플러스 앱 사용 문의 · 오류 제보 · 제휴 문의와 제품별 지원 페이지.',
  alternates: { canonical: '/support' },
};

export default function SupportPage() {
  return <SupportContent />;
}
