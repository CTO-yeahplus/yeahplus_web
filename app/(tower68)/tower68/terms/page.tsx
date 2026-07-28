import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: '이용약관 — TOWER 68',
  description: 'TOWER 68 이용약관. 서비스 이용과 관련한 회사와 이용자 간의 권리·의무를 규정합니다.',
};

export default function TermsPage() {
  return <TermsContent />;
}
