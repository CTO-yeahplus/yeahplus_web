import type { Metadata } from 'next';
import HomeContent from './HomeContent';
import { APP } from './names';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `${APP.ko} · ${APP.en} — 정상에 설 때마다 한 쪽`,
  description:
    '100대 명산 정상에서 돌탑 도장을 꾹 누르면 정상 150m 안인지 기기 안에서 확인하고 도장을 찍는다. 사진 속 나를 오려 산 이름 뒤에 세운 정상 쪽, 철마다 다른 도장. 계정 · 서버 · 광고 · 수집 없음.',
  alternates: { canonical: '/summitbook' },
  robots: { index: true, follow: true },
};

export default function SummitBookHomePage() {
  return <HomeContent />;
}
