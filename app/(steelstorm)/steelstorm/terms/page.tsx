import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 · Terms of Use — 스틸스톰 아레나',
  description:
    '스틸스톰 아레나 이용약관. 유료 앱 구매와 이용에 관한 조건, 환불 안내, Game Center 이용, 책임 범위를 정합니다.',
  alternates: { canonical: '/steelstorm/terms' },
  robots: { index: true, follow: true },
};

export default function SteelstormTermsPage() {
  return <TermsContent />;
}
