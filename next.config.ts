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
    ];
  },
};

export default nextConfig;
