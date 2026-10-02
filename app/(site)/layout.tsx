import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const TITLE = "YeahPlus — 매일 손에 쥐는 앱을 처음부터 끝까지";
const DESCRIPTION =
  "예아플러스는 사진과 배움, 놀이에 기술을 더하는 작은 스튜디오입니다. CineLook, 성어서당, 현자의 서재, 조선왕조실록, 꼬롱을 찾아라를 비롯한 스물한 개의 제품을 기획부터 출시까지 직접 만듭니다.";

/** JS 가 있을 때만 등장 연출을 켠다 — 없으면 처음부터 모두 보인다. */
const JS_FLAG = "document.documentElement.classList.add('js')";

export const metadata: Metadata = {
  metadataBase: new URL("https://yeahplus.co.kr"),
  title: {
    default: TITLE,
    template: "%s | YeahPlus",
  },
  description: DESCRIPTION,
  applicationName: "YeahPlus",
  keywords: ["YeahPlus", "예아플러스", "앱 스튜디오", "CineLook", "성어서당", "현자의 서재", "조선왕조실록", "뚝딱 실험실", "MINEFORGE", "꼬롱을 찾아라", "묘해", "24STILLS"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://yeahplus.co.kr",
    siteName: "YeahPlus",
    locale: "ko_KR",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 기본 언어는 한국어. 언어 단추를 누르면 components/site/lang.tsx 가 이 값을 갱신한다.
    <html lang="ko">
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
        {/* 본문 서체 Pretendard(한·영), 숫자와 꼬리표는 JetBrains Mono */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600&display=swap"
        />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
