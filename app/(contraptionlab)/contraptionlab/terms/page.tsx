import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 · Terms of Use — 뚝딱 실험실',
  description:
    '뚝딱 실험실 이용약관. 유료 앱 구매와 이용에 관한 조건, 환불 안내, 만든 판의 공유, 책임 범위를 정합니다.',
  alternates: { canonical: '/contraptionlab/terms' },
  robots: { index: true, follow: true },
};

export default function ContraptionlabTermsPage() {
  return <TermsContent />;
}
