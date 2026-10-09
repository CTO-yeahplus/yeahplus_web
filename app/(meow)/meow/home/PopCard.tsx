'use client';
/* eslint-disable @next/next/no-img-element -- public/meow/v2 의 그림은 미리 줄여 둔 webp 라 그대로 쓴다 */

/**
 * 튀어나오기 합성기 — 앱의 레이어를 그대로 쌓는다(MYOHAE/docs/deco_template_design.md 9장).
 *   배경 → 창 안의 사진(창 밖은 잘림) → 액자 PNG → 같은 사진의 누끼(창 아래쪽만 잘림)
 * pop(0..1) 이 0 이면 사진이 창에 꼭 맞게 끼워져 있고, 1 이면 popFill 규칙대로
 * 고양이 머리가 창 높이의 22% 만큼 창 위로 나가고 발은 창 92% 지점에 남는다.
 * explode(0..1) 는 네 층을 3D 로 띄워 속을 보여 준다.
 * 액자 배치는 applyTemplate.ts(placeFrame)와 같다 — 보이는 테두리(bbox)의 긴 변이 캔버스의 size 배.
 */
import type { CSSProperties } from 'react';
import { FRAMES } from './assets';

const PHOTO_ASPECT = 2 / 3; // cat_photo.webp 900×1350
/** 누끼가 사진 안에서 차지하는 영역 — cat_cut.webp 의 불투명 범위에서 잰 값 */
const SUBJECT = { x: 0.3677, y: 0.217, w: 0.3641, h: 0.6281 };

// popFill 상수 — 앱(applyTemplate.ts)과 썸네일 스크립트가 같은 값을 쓴다
const POP_TOP = 0.22;
const POP_REACH = 0.92;
const POP_MAX_WIDTH = 1.3;
const POP_MAX_ZOOM = 3;

const V = (f: string) => `/meow/v2/${f}.webp`;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const pct = (v: number) => `${v * 100}%`;

/** 창 안 사진 상자 — 창 폭·높이에 대한 % */
function photoBox(slotAspect: number, t: number) {
  const sw = 1;
  const sh = 1 / slotAspect;
  const r = SUBJECT;
  const a = PHOTO_ASPECT;
  const h0 = a > sw / sh ? sh : sw / a;
  const w0 = h0 * a;
  const top0 = clamp(sh / 2 - (r.y + r.h / 2) * h0, sh - h0, 0);
  const left0 = clamp(sw / 2 - (r.x + r.w / 2) * w0, sw - w0, 0);
  const zs = (sh * (POP_REACH + POP_TOP)) / (r.h * h0);
  const zc = (sh * (1 + POP_TOP)) / ((1 - r.y) * h0);
  const zw = (sw * POP_MAX_WIDTH) / (r.w * h0 * a);
  const z = Math.max(1, Math.min(Math.max(zs, zc), zw, POP_MAX_ZOOM));
  const h1 = h0 * z;
  const w1 = h1 * a;
  const top1 = Math.min(0, Math.max(sh - h1, -(POP_TOP * sh) - r.y * h1));
  const left1 = Math.min(0, Math.max(sw - w1, sw / 2 - (r.x + r.w / 2) * w1));
  const h = lerp(h0, h1, t);
  return {
    left: pct(lerp(left0, left1, t) / sw),
    top: pct(lerp(top0, top1, t) / sh),
    width: pct((h * a) / sw),
    height: pct(h / sh),
  } as CSSProperties;
}

export default function PopCard({
  pop,
  explode = 0,
  frame = 'polaroid_cream_s4',
  wall = 'spotty-petal_dusk_s5',
  tilt = -4,
  size = 0.8,
  cy = 0.54,
  stickers = false,
  smooth = false,
  label,
}: {
  pop: number;
  explode?: number;
  /** assets.ts FRAMES 의 key */
  frame?: string;
  /** assets.ts WALLS 의 key */
  wall?: string;
  tilt?: number;
  size?: number;
  cy?: number;
  stickers?: boolean;
  /** 섞기처럼 값이 한 번에 바뀌는 곳에서는 CSS 로 부드럽게 옮긴다 */
  smooth?: boolean;
  label?: string;
}) {
  const g = FRAMES[frame] ?? FRAMES.polaroid_cream_s4;
  const bb = g.bbox;
  const s = g.slot;
  // placeFrame: 보이는 테두리의 긴 변 = 캔버스 × size, 테두리 가운데를 (0.5, cy) 에
  const k = size / Math.max(bb.w * g.w, bb.h * g.h);
  const bw = g.w * k;
  const bh = g.h * k;
  const cx = 0.5 - (bb.x + bb.w / 2 - 0.5) * bw;
  const ccy = cy - (bb.y + bb.h / 2 - 0.5) * bh;
  const box = photoBox((s.w * g.w) / (s.h * g.h), pop);
  const e = explode;
  const slot: CSSProperties = { left: pct(s.x), top: pct(s.y), width: pct(s.w), height: pct(s.h) };
  const z = (n: number) => ({ transform: `translateZ(${n * e}px)` });

  return (
    <div className={`pc ${smooth ? 'pc-smooth' : ''}`} role="img" aria-label={label}>
      <div
        className="pc-stage"
        style={{ transform: `rotateX(${52 * e}deg) rotateZ(${-24 * e}deg) scale(${1 - 0.18 * e})` }}
      >
        <img className="pc-wall" src={V(`bw_${wall}`)} alt="" draggable={false} />
        <div
          className="pc-frame"
          style={{ left: pct(cx), top: pct(ccy), width: pct(bw), height: pct(bh), transform: `translate(-50%, -50%) rotate(${tilt}deg)` }}
        >
          <div className="pc-slot" style={{ ...slot, ...z(70) }}>
            <img className="pc-photo" src={V('cat_photo')} alt="" style={box} draggable={false} />
          </div>
          <img className="pc-frameimg" src={V(`fr_${frame}`)} alt="" style={z(150)} draggable={false} />
          <div className="pc-cutwrap" style={{ ...slot, ...z(240) }}>
            <img className="pc-cut" src={V('cat_cut')} alt="" style={{ ...box, opacity: pop > 0.02 || e > 0 ? 1 : 0 }} draggable={false} />
          </div>
        </div>
        {stickers && (
          <>
            <img className="pc-sticker pc-st-a" src={V('st_macaron')} alt="" draggable={false} />
            <img className="pc-sticker pc-st-b" src={V('st_donut')} alt="" draggable={false} />
          </>
        )}
      </div>
    </div>
  );
}
