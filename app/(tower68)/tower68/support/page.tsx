import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const metadata: Metadata = {
  title: '지원 · FAQ — TOWER 68',
  description: 'TOWER 68 고객지원 — 자주 묻는 질문, 문의 채널, 응답 시간 안내.',
};

export default function SupportPage() {
  return <SupportContent />;
}
