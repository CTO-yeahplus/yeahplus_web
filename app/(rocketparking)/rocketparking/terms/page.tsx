import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 · Terms of Use — 로켓주차',
  description: '로켓주차 이용약관 — 평생 주차권 · 소장품 묶음 · 안전 · 기록.',
  alternates: { canonical: '/rocketparking/terms' },
  robots: { index: true, follow: true },
};

export default function RocketParkingTermsPage() {
  return <TermsContent />;
}
