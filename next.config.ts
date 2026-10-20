import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 카드 비주얼은 최대 ~560px, 로고는 36px 로 그려진다. 그 구간만 생성한다.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    // 24STILLS 는 app/(stills) 의 Next 라우트다(예전엔 public/24stills 의 정적 HTML 묶음).
    // 예전 주소(.html)가 App Store Connect 와 앱 안에 박혀 있어 그대로 열려야 한다.
    return [
      { source: "/24stills/index.html", destination: "/24stills" },
      { source: "/24stills/:page(privacy|terms|support).html", destination: "/24stills/:page" },
      // 선물·그룹 초대 안내는 아직 정적 HTML — 확장자 없는 주소도 받는다.
      { source: "/24stills/:page(gift|group)", destination: "/24stills/:page.html" },
      // 노티 웹 체험판(1화)은 정적 HTML 한 장이다 (public/noti/demo/index.html) — 확장자 없는 주소도 받는다.
      { source: "/noti/demo", destination: "/noti/demo/index.html" },
      // 수상한 명언 Fishy Quotes 감정 대결 웹 체험판 (public/fishyquotes/c/, 앱 저장소 APLUS/fishyquotes 의 build.py 가 만든 web/challenge 를 통째로 복사).
      // 앱 빌드 안에 https://yeahplus.co.kr/fishyquotes/c#DL1.… 로 고정돼 있다.
      { source: "/fishyquotes/c", destination: "/fishyquotes/c/index.html" },
    ];
  },
  async redirects() {
    return [
      // 2026-10-20 앱 이름 변경(디오게네스의 등불 → 수상한 명언 Fishy Quotes)으로 주소를 옮겼다.
      // 옛 주소는 TestFlight 빌드 4 의 대결 링크(/diogeneslamp/c#DL1.…)·App Store Connect 에 남아 있다 → 영구 리다이렉트, 지우지 말 것.
      // 브라우저는 리다이렉트할 때 # 뒤(의뢰서 내용)를 그대로 넘긴다.
      { source: "/diogeneslamp", destination: "/fishyquotes", permanent: true },
      { source: "/diogeneslamp/:path*", destination: "/fishyquotes/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
