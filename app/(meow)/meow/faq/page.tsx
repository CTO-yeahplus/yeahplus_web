import type { Metadata } from 'next';
import FaqContent from './FaqContent';

export const metadata: Metadata = {
  title: 'FAQ — MYOHAE (묘해)',
  description: '묘해(MYOHAE) 자주 묻는 질문',
};

export default function FaqPage() {
  return <FaqContent />;
}
