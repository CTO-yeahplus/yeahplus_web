import type { Metadata } from 'next';
import Landing from './Landing';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '24STILLS — 한 달 24장, 3일의 기다림',
  alternates: { canonical: '/24stills' },
};

export default function StillsPage() {
  return <Landing />;
}
