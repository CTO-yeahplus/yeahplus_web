import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용 약관 — CineLook',
  description: 'CineLook 이용 약관 · 앱 내 구매(평생 소장), 사진 콘텐츠, 책임 제한.',
  alternates: { canonical: '/cinelook/terms' },
  robots: { index: true, follow: true },
};

export default function CinelookTermsPage() {
  return <TermsContent />;
}
