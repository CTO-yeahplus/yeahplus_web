import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "YeahPlus — AI × Content";
const DESCRIPTION =
  "일상을 바꾸는 앱을 만듭니다. 사진·필름·패션·학습·운세·게임에 AI를 더해, 매일 쓰는 앱을 직접 만드는 스튜디오 예아플러스입니다.";

export const metadata: Metadata = {
  metadataBase: new URL("https://yeahplus.co.kr"),
  title: {
    default: TITLE,
    template: "%s | YeahPlus",
  },
  description: DESCRIPTION,
  applicationName: "YeahPlus",
  keywords: ["YeahPlus", "예아플러스", "AI 앱", "묘해", "24STILLS", "AURA", "뇌새김", "월덕", "Forge 시리즈"],
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

export const viewport: Viewport = { themeColor: "#000000" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 기본 언어는 한국어. 언어 토글이 바뀌면 LanguageProvider 가 이 값을 갱신한다.
    <html lang="ko">
      <head>
        {/* 한글 본문 서체 — Geist 에는 한글 글리프가 없어 이 폰트가 받는다. */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
