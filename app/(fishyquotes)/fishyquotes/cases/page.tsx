import type { Metadata } from 'next';
import CasesContent from './CasesContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '사건 게시판 — 수상한 명언 수사본부',
  description: '수상한 명언 수사본부에 들어온 제보와 판결을 공개합니다. 접수 · 수사 중 · 판결 · 기각.',
  alternates: { canonical: '/fishyquotes/cases' },
  robots: { index: true, follow: true },
};

/* ⚠️ 앱이 이 주소를 연다: /fishyquotes/cases?l=ko|en */
export default function FishyQuotesCasesPage() {
  return <CasesContent />;
}
