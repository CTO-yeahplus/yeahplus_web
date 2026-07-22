import type { Metadata } from 'next';
import SupportContent from './SupportContent';

export const metadata: Metadata = {
  title: '고객지원 — MYOHAE (묘해)',
  description: '묘해(MYOHAE) 고객지원 — 문의 채널, 운영 시간, 응답 시간 안내.',
};

export default function SupportPage() {
  return <SupportContent />;
}
