import type { MetadataRoute } from "next";

const SITE = "https://yeahplus.co.kr";

/** 제품 페이지 — 각 route group 의 랜딩과 하위 문서. */
const PRODUCTS: { base: string; sub: string[] }[] = [
  { base: "meow", sub: ["faq", "feed", "privacy", "support", "terms"] },
  { base: "munghae", sub: ["privacy", "support", "terms"] },
  { base: "tower68", sub: ["contact", "privacy", "support", "terms"] },
  { base: "arke", sub: ["privacy", "support", "terms"] },
  { base: "wordforge", sub: ["privacy", "support", "terms"] },
  { base: "pipforge", sub: ["privacy", "support", "terms"] },
  { base: "aceforge", sub: ["privacy", "support", "terms"] },
  { base: "mineforge", sub: ["privacy", "support", "terms"] },
  { base: "jadeforge", sub: ["privacy", "support", "terms"] },
];

/** public/ 아래 정적 HTML 로 서비스되는 24STILLS. */
const STATIC_PAGES = ["24stills", "24stills/privacy", "24stills/terms", "24stills/support"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const home = {
    url: `${SITE}/`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  const products = PRODUCTS.flatMap(({ base, sub }) => [
    {
      url: `${SITE}/${base}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...sub.map((s) => ({
      url: `${SITE}/${base}/${s}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ]);

  const statics = STATIC_PAGES.map((p) => ({
    url: `${SITE}/${p}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.includes("/") ? 0.3 : 0.8,
  }));

  return [home, ...products, ...statics];
}
