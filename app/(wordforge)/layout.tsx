import type { Metadata, Viewport } from 'next';
import './wordforge/globals.css';
import SiteShell from './wordforge/chrome';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: 'Wordforge · 워드포지 — 워드 로그라이크',
  description:
    '낱말을 만들어 점수를 터뜨리는 워드 로그라이크. 자모를 조합해 음절을 만들고, 참과 두루마리로 판을 키우세요. 광고·인앱결제 없는 1회 구매 오프라인 게임.',
  metadataBase: new URL('https://yeahplus.co.kr'),
  alternates: { canonical: '/wordforge' },
  openGraph: {
    siteName: 'YeahPlus',
    locale: 'ko_KR',
    url: '/wordforge',
    title: 'Wordforge · 워드포지',
    description: '낱말을 만들어 점수를 터뜨리는 워드 로그라이크.',
    type: 'website',
    images: ['/wordforge/wordforge_logo.png'],
  },
  icons: { icon: '/wordforge/wordforge_logo.png' },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#16130f' };

const YEAR = new Date().getFullYear();

export default function WordforgeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <SiteShell year={YEAR}>{children}</SiteShell>
              <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
