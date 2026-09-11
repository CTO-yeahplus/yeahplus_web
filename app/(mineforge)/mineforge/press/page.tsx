import type { Metadata } from 'next';
import PressContent from './PressContent';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '프레스킷 — Mineforge 마인포지',
  description:
    'Mineforge: Sweeper Roguelike 프레스킷. 팩트시트, 스크린샷 원본, 아이콘, 인용 가능한 개발 노트를 한 곳에서 내려받을 수 있습니다.',
  alternates: { canonical: '/mineforge/press' },
  openGraph: {
    title: 'Mineforge — Press kit',
    description:
      'Fact sheet, full-size screenshots, icon and quotable development notes. All assets free to use in coverage.',
    url: '/mineforge/press',
    images: ['/mineforge/press/icon-1024.png'],
  },
  robots: { index: true, follow: true },
};

export default function MineforgePressPage() {
  return <PressContent />;
}
