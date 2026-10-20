import type { Metadata } from 'next';
import ReportContent from './ReportContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '제보 접수 — 수상한 명언 수사본부',
  description: '수상한 명언을 봤거나 판정이 틀렸다고 생각되면 제보하세요. 편집부가 원문과 대조해 판결하고 사건 게시판에 공개합니다.',
  alternates: { canonical: '/fishyquotes/report' },
  robots: { index: true, follow: true },
};

/* ⚠️ 앱이 이 주소를 연다: ?k=err|new &l=ko|en &id=<사건 번호> &q=<명언 글자> — 형식을 바꾸지 말 것(앱 template.html 의 reportURL) */
export default function FishyQuotesReportPage() {
  return <ReportContent />;
}
