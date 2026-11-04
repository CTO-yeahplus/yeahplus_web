import type { Metadata } from 'next';
import DataContent from './DataContent';
import { APP } from '../names';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `산 데이터 · Summit data (ODbL) — ${APP.ko}`,
  description: `${APP.ko} 앱이 정상 판정에 쓰는 100대 명산 정상 좌표 데이터(summits.json). Open Database License(ODbL) 1.0 · © OpenStreetMap contributors · 산림청.`,
  alternates: { canonical: '/summitbook/data' },
  robots: { index: true, follow: true },
};

export default function SummitBookDataPage() {
  return <DataContent />;
}
