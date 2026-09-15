import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '스틸스톰 아레나 · SteelStorm Arena — 변신 메카 아레나 슈터',
  description:
    '자동 조준 아레나 슈터. 이동·대시·코어 컬러·3단 오버드라이브 변신 타이밍만으로 드론 폭풍을 버팁니다. iPhone·iPad, 완전 오프라인, 광고 없음, 인앱결제 없음, 데이터 수집 없음.',
  alternates: { canonical: '/steelstorm' },
};

export default function SteelstormPage() {
  return <HomeContent />;
}
