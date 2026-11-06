import type { Metadata } from 'next';
import HomeContent from './HomeContent';
import { APP } from './names';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `${APP.ko} · ${APP.en} — 다섯 시간 걸어 십 분 머문 자리, 한 쪽`,
  description:
    '전날 밤 리본을 끼우고, 새벽 들머리에서 첫걸음, 정상에서 꾹 — 100대 명산 정상 150m 안에서만 찍히는 도장 수첩. 돌아선 날은 연필로, 내려와서는 사진 속 내가 산 이름 앞에. 계정 · 서버 · 광고 · 수집 없음.',
  alternates: { canonical: '/summitbook' },
  robots: { index: true, follow: true },
};

export default function SummitBookHomePage() {
  return <HomeContent />;
}
