import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 카드 비주얼은 최대 ~560px, 로고는 36px 로 그려진다. 그 구간만 생성한다.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    // public/24stills 는 Next 라우트가 아니라 정적 HTML 묶음이라
    // 확장자 없는 주소(/24stills, /24stills/privacy)가 그대로는 404 가 난다.
    return [
      { source: "/24stills", destination: "/24stills/index.html" },
      { source: "/24stills/:page([a-z0-9_-]+)", destination: "/24stills/:page.html" },
    ];
  },
};

export default nextConfig;
