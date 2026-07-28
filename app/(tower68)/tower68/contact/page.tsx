import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: '문의하기 — TOWER 68',
  description: 'TOWER 68 문의 — contact@yeahplus.co.kr 로 언제든 연락 주세요.',
};

export default function ContactPage() {
  return <ContactContent />;
}
