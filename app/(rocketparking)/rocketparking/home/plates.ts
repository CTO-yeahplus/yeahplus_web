'use client';

/* 사진 판 — '폰 카메라가 비추는 실제 장소'. 위에 그리는 패드 · 기체는 렌더러(render.ts)의 원근 투영 그대로.
   사진은 생성 이미지(2026-11-03, public/rocketparking/plates). 유진이 아이폰으로 찍은 실제 사진으로 바꾸려면
   같은 이름으로 넣고 아래 맞춤 값(px · py · el · dist)만 다시 잡으면 된다 — 패드가 그 면 위에 놓여 보이도록.
   A = 서서(또는 앉아서) 내려다본 판, B = 폰을 낮춘 판(다시 착륙). fovY 는 아이폰 기본 카메라 16:9 세로 화각 근처. */
import type { Plate, Place } from './render';

type Spec = Omit<Plate, 'img'> & { src: string };

const FOV = 0.74;
export const PLATES: Record<Place, { A: Spec; B: Spec }> = {
  bench: {
    A: { src: 'benchA', iw: 16, ih: 9, px: 0.5, py: 0.8, el: 0.3, dist: 0.68, fovY: FOV, tint: [18, 28, 64, 0.42], dust: [140, 128, 120], smoke: [120, 126, 140], glow: [255, 170, 90] },
    B: { src: 'benchB', iw: 16, ih: 9, px: 0.5, py: 0.7, el: 0.12, dist: 0.8, fovY: FOV, tint: [24, 34, 70, 0.34], dust: [140, 128, 120], smoke: [120, 126, 140], glow: [255, 170, 90] },
  },
  desk: {
    A: { src: 'deskA', iw: 16, ih: 9, px: 0.5, py: 0.68, el: 0.48, dist: 0.7, fovY: FOV, tint: [255, 170, 90, 0.12], dust: [150, 120, 92], smoke: [225, 212, 196], glow: [255, 180, 100], bloom: 0.5 },
    B: { src: 'deskB', iw: 16, ih: 9, px: 0.5, py: 0.64, el: 0.1, dist: 0.8, fovY: FOV, tint: [255, 170, 90, 0.14], dust: [150, 120, 92], smoke: [225, 212, 196], glow: [255, 180, 100], bloom: 0.5 },
  },
  station: {
    A: { src: 'stationA', iw: 16, ih: 9, px: 0.5, py: 0.76, el: 0.46, dist: 1.55, fovY: FOV, tint: [200, 220, 255, 0.1], dust: [175, 178, 182], smoke: [215, 220, 228], glow: [255, 190, 120], bloom: 0.75 },
    B: { src: 'stationB', iw: 16, ih: 9, px: 0.5, py: 0.64, el: 0.12, dist: 0.85, fovY: FOV, tint: [200, 220, 255, 0.1], dust: [175, 178, 182], smoke: [215, 220, 228], glow: [255, 190, 120], bloom: 0.75 },
  },
};

/** 몸짓 섹션 — 같은 책상을 폰을 왼쪽으로 옮겨 본 판(같은 방, 생성 이미지) */
export const DESK_SIDE: Spec = { src: 'deskSide', iw: 16, ih: 9, px: 0.54, py: 0.63, el: 0.5, dist: 0.8, fovY: FOV, yaw: -0.6, tint: [255, 170, 90, 0.12], dust: [150, 120, 92], smoke: [225, 212, 196], glow: [255, 180, 100], bloom: 0.5 };

const cache = new Map<string, HTMLImageElement>();
function load(name: string, onload: () => void) {
  const big = typeof window !== 'undefined' && window.innerWidth * Math.min(2, window.devicePixelRatio || 1) > 1400;
  const url = `/rocketparking/plates/${name}-${big ? 2560 : 1280}.webp`;
  let im = cache.get(url);
  if (!im) {
    im = new Image();
    im.decoding = 'async';
    im.src = url;
    cache.set(url, im);
  }
  if (im.complete && im.naturalWidth) onload();
  else im.addEventListener('load', onload, { once: true });
  return im;
}

/** 여러 판을 미리 받아 두고, 렌더 루프에서 그때그때 Plate 로 꺼낸다(아직 못 받았으면 img = null → 그림 배경) */
export function preload(specs: Spec[], cb: () => void) {
  let n = 0;
  const out = new Map<string, HTMLImageElement>();
  for (const s of specs) {
    const im = load(s.src, () => {
      n++;
      if (n === specs.length) cb();
    });
    out.set(s.src, im);
  }
  return (s: Spec): Plate => {
    const im = out.get(s.src);
    const ok = !!im && im.complete && im.naturalWidth > 0;
    return { ...s, img: ok ? im! : null, iw: ok ? im!.naturalWidth : s.iw, ih: ok ? im!.naturalHeight : s.ih };
  };
}
