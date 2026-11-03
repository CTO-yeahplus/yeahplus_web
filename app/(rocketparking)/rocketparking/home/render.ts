/* 로켓주차 웹 렌더러 — 캔버스 2D 위에 손으로 만든 원근 투영.
   외부 라이브러리 · CDN 없이(사이트 규칙). 세계 단위는 '실제 미터'(축척 1:250 을 이미 적용한 값):
   패드 앞마당 지름 21cm · 판정 고리 16cm · 기체 24cm(앱 RocketVisual 과 같은 1.5배 그림).
   기체 · 다리 · 패드는 진짜 3D 점을 투영하므로 카메라를 돌리면 실제로 돌아 보인다. */

import { SCALE, type Frame } from './sim';

export type Vec3 = [number, number, number];
export type Place = 'desk' | 'bench' | 'station';
export type Cam = { yaw: number; el: number; dist: number; ty: number; fov: number; shake?: number };
type P2 = { x: number; y: number; z: number; s: number };

export const LOOK = {
  lime: '#C7ED40',
  amber: '#FFB31F',
  red: '#FF4D40',
  ink: '#F4F6F8',
  black: '#0B0F14',
};

/* ─── 기체 치수(실제 m) ─── */
const BR = 0.0112; // 동체 반지름
const LIFT = 0.012; // 서 있을 때 노즐이 바닥에서 뜬 높이
const HINGE = 0.045; // 다리 경첩
export const PAD_R = 0.105; // 앞마당 반지름
export const RING_R = 0.08; // 판정 고리(패드 반지름 20m × 1/250)

/** 도색 — 앱 Collection.swift Paint 와 같은 값. pattern 은 동체를 감싸는 무늬(앱 BrandArt.drawPattern 과 같은 배치) */
export type HullPattern = 'plain' | 'checker' | 'hazard' | 'crosswalk' | 'petals' | 'pinstripe' | 'stencil';
export type Livery = { hull: string; accent: string; ink?: string; pattern?: HullPattern; bands?: [number, number, string][] };
export const STD: Livery = { hull: '#F1F2F0', accent: LOOK.lime };
/** 기체 종류 — 앱 RocketVisual.proportions 와 같은 비율(r 굵기 · h 몸통 길이 · nose 머리) */
export type VCls = 'standard' | 'heavy' | 'sprint' | 'twin';
export const CLASS_SHAPE: Record<VCls, { r: number; h: number; nose: number }> = {
  standard: { r: 1, h: 1, nose: 1 },
  heavy: { r: 1.34, h: 0.94, nose: 0.9 },
  sprint: { r: 0.92, h: 0.68, nose: 0.72 },
  twin: { r: 1.16, h: 0.96, nose: 0.8 },
};

export class View {
  w = 1;
  h = 1;
  F = 1;
  cx = 0;
  cy = 0;
  E: Vec3 = [0, 0, 1];
  r: Vec3 = [1, 0, 0];
  u: Vec3 = [0, 1, 0];
  f: Vec3 = [0, 0, -1];
  cam: Cam = { yaw: 0, el: 0.3, dist: 0.9, ty: 0.25, fov: 0.9 };

  set(w: number, h: number, cam: Cam) {
    this.w = w;
    this.h = h;
    this.cam = cam;
    this.cx = w / 2;
    this.cy = h / 2;
    this.F = h / 2 / Math.tan(cam.fov / 2);
    const ce = Math.cos(cam.el);
    let E: Vec3 = [Math.sin(cam.yaw) * cam.dist * ce, cam.ty + Math.sin(cam.el) * cam.dist, Math.cos(cam.yaw) * cam.dist * ce];
    if (cam.shake) E = [E[0] + cam.shake * (Math.random() - 0.5), E[1] + cam.shake * (Math.random() - 0.5), E[2]];
    const T: Vec3 = [0, cam.ty, 0];
    const f = norm(sub(T, E));
    const r = norm(cross(f, [0, 1, 0]));
    this.E = E;
    this.f = f;
    this.r = r;
    this.u = cross(r, f);
  }

  /** 사진 판 위 — 카메라는 패드(원점)를 바라보고, 원점은 사진 속 (cx, cy) 에 맺힌다(렌즈 시프트).
      F 는 사진의 세로 화각에서 나온 초점 거리(화면 픽셀). 폰을 들어 올려다보는 것은 사진과 함께 옮기는 것으로 흉내 낸다 */
  setPlate(w: number, h: number, el: number, dist: number, F: number, cx: number, cy: number, yaw = 0) {
    this.w = w;
    this.h = h;
    this.cam = { yaw, el, dist, ty: 0, fov: 2 * Math.atan(h / 2 / F) };
    this.F = F;
    this.cx = cx;
    this.cy = cy;
    const ce = Math.cos(el);
    const E: Vec3 = [Math.sin(yaw) * dist * ce, Math.sin(el) * dist, Math.cos(yaw) * dist * ce];
    const f = norm(sub([0, 0, 0], E));
    const r = norm(cross(f, [0, 1, 0]));
    this.E = E;
    this.f = f;
    this.r = r;
    this.u = cross(r, f);
  }

  p(P: Vec3): P2 {
    const d = sub(P, this.E);
    const z = Math.max(0.02, dot(d, this.f));
    return { x: this.cx + (dot(d, this.r) / z) * this.F, y: this.cy - (dot(d, this.u) / z) * this.F, z, s: this.F / z };
  }
}

/* ─── 작은 벡터 도구 ─── */
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a: Vec3, k: number): Vec3 => [a[0] * k, a[1] * k, a[2] * k];
const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = (a: Vec3): Vec3 => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function shade(hex: string, k: number) {
  const n = parseInt(hex.slice(1), 16);
  const f = (c: number) => Math.round(clamp(k >= 0 ? c + (255 - c) * k : c * (1 + k), 0, 255));
  return `rgb(${f((n >> 16) & 255)},${f((n >> 8) & 255)},${f(n & 255)})`;
}

/* ─── 배경 · 바닥 ─── */
function poly(ctx: CanvasRenderingContext2D, v: View, pts: Vec3[]) {
  ctx.beginPath();
  pts.forEach((P, i) => {
    const q = v.p(P);
    if (i) ctx.lineTo(q.x, q.y);
    else ctx.moveTo(q.x, q.y);
  });
  ctx.closePath();
}

export function drawPlace(ctx: CanvasRenderingContext2D, v: View, place: Place, t: number, mood = 0) {
  const { w, h } = v;
  const hz = v.p([0, 0, -4]).y; // 지평선 근처
  const par = -v.cam.yaw * w * 0.35;
  if (place === 'desk') {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#15120f');
    g.addColorStop(0.55, '#2c241d');
    g.addColorStop(1, '#3a2e24');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // 창문 빛 — 흐린 사각형 두 개 + 보케
    for (let i = 0; i < 2; i++) {
      const x = w * (0.18 + i * 0.5) + par * (0.6 + i * 0.2);
      const rg = ctx.createRadialGradient(x, hz - h * 0.18, 0, x, hz - h * 0.18, w * 0.32);
      rg.addColorStop(0, `rgba(255,214,160,${0.2 + mood * 0.05})`);
      rg.addColorStop(1, 'rgba(255,214,160,0)');
      ctx.fillStyle = rg;
      ctx.fillRect(0, 0, w, h);
    }
    bokeh(ctx, w, hz, par, ['rgba(255,200,140,', 'rgba(255,240,210,'], 14, 1);
    // 책상 상판
    poly(ctx, v, [[-2.4, 0, -0.62], [2.4, 0, -0.62], [2.4, 0, 2.5], [-2.4, 0, 2.5]]);
    const wg = ctx.createLinearGradient(0, v.p([0, 0, -0.62]).y, 0, h);
    wg.addColorStop(0, '#5b3f2a');
    wg.addColorStop(1, '#8a6040');
    ctx.fillStyle = wg;
    ctx.fill();
    // 나뭇결
    ctx.save();
    poly(ctx, v, [[-2.4, 0, -0.62], [2.4, 0, -0.62], [2.4, 0, 2.5], [-2.4, 0, 2.5]]);
    ctx.clip();
    for (let i = 0; i < 46; i++) {
      const z = -0.6 + i * 0.065 + hash(i) * 0.03;
      ctx.strokeStyle = `rgba(40,22,10,${0.1 + hash(i + 9) * 0.14})`;
      ctx.lineWidth = Math.max(0.5, v.p([0, 0, z]).s * 0.002);
      ctx.beginPath();
      for (let k = 0; k <= 16; k++) {
        const x = -2.4 + k * 0.3;
        const q = v.p([x, 0, z + Math.sin(x * 3 + i) * 0.006]);
        if (k) ctx.lineTo(q.x, q.y);
        else ctx.moveTo(q.x, q.y);
      }
      ctx.stroke();
    }
    ctx.restore();
    // 소품: 머그 · 공책
    box(ctx, v, [-0.52, 0, -0.02], [0.3, 0.012, 0.21], '#e9e4d8', -0.12);
    box(ctx, v, [-0.5, 0.012, -0.0], [0.26, 0.002, 0.17], '#2f5a8a', -0.12);
    mug(ctx, v, [0.36, 0, -0.26], t);
  } else if (place === 'bench') {
    const g = ctx.createLinearGradient(0, 0, 0, hz + h * 0.1);
    g.addColorStop(0, '#141a33');
    g.addColorStop(0.55, '#3b3456');
    g.addColorStop(0.85, '#c8735a');
    g.addColorStop(1, '#f0a868');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // 도시 실루엣
    ctx.fillStyle = '#1b1a2a';
    ctx.beginPath();
    ctx.moveTo(0, hz + 4);
    for (let i = 0; i <= 40; i++) {
      const x = (i / 40) * w;
      const hh = (0.04 + hash(i + 3) * 0.12) * h;
      ctx.lineTo(x + ((par * 0.3) % (w / 40)), hz - hh);
      ctx.lineTo(x + w / 40 + ((par * 0.3) % (w / 40)), hz - hh);
    }
    ctx.lineTo(w, hz + 4);
    ctx.fill();
    bokeh(ctx, w, hz, par, ['rgba(255,190,110,', 'rgba(255,90,70,', 'rgba(140,200,255,'], 22, 0.9);
    // 정류장 유리판 기둥
    const pole = v.p([-0.95, 0, -0.75]);
    ctx.fillStyle = 'rgba(200,210,230,.08)';
    ctx.fillRect(pole.x - pole.s * 0.6, 0, pole.s * 1.1, pole.y);
    ctx.fillStyle = '#2a2b33';
    ctx.fillRect(pole.x - pole.s * 0.02, 0, pole.s * 0.04, pole.y);
    // 보도 — 벤치 아래 45cm
    poly(ctx, v, [[-6, -0.45, -4], [6, -0.45, -4], [6, -0.45, 4], [-6, -0.45, 4]]);
    const pg = ctx.createLinearGradient(0, hz, 0, h);
    pg.addColorStop(0, '#3a3540');
    pg.addColorStop(1, '#55505a');
    ctx.fillStyle = pg;
    ctx.fill();
    ctx.strokeStyle = 'rgba(0,0,0,.25)';
    ctx.lineWidth = 1;
    for (let i = -10; i <= 10; i++) {
      const a = v.p([i * 0.6, -0.45, -4]), b = v.p([i * 0.6, -0.45, 4]);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    // 가로등 빛 웅덩이
    const lp = v.p([0.4, -0.45, -0.2]);
    const lg0 = ctx.createRadialGradient(lp.x, lp.y, 0, lp.x, lp.y, lp.s * 1.2);
    lg0.addColorStop(0, 'rgba(255,200,130,.22)');
    lg0.addColorStop(1, 'rgba(255,200,130,0)');
    ctx.fillStyle = lg0;
    ctx.fillRect(0, 0, w, h);
    // 벤치 다리
    for (const x of [-1.2, 1.2]) {
      poly(ctx, v, [[x - 0.03, -0.45, 0.12], [x + 0.03, -0.45, 0.12], [x + 0.03, 0, 0.12], [x - 0.03, 0, 0.12]]);
      ctx.fillStyle = '#1e1c22';
      ctx.fill();
    }
    // 벤치 널빤지
    for (let i = -3; i <= 4; i++) {
      const z0 = -0.255 + (i + 2) * 0.105, z1 = z0 + 0.09; // 다섯 장이 패드 중심(z 0)을 가운데에 두게 — 전엔 앞으로 7.5cm 걸쳤다
      if (i < -2 || i > 2) continue;
      poly(ctx, v, [[-1.45, 0, z0], [1.45, 0, z0], [1.45, 0, z1], [-1.45, 0, z1]]);
      const q = v.p([0, 0, z0]);
      const lg = ctx.createLinearGradient(0, q.y, 0, v.p([0, 0, z1]).y);
      lg.addColorStop(0, '#7b5638');
      lg.addColorStop(1, '#5d3f29');
      ctx.fillStyle = lg;
      ctx.fill();
      // 널빤지 앞 모서리
      poly(ctx, v, [[-1.45, 0, z1], [1.45, 0, z1], [1.45, -0.025, z1], [-1.45, -0.025, z1]]);
      ctx.fillStyle = '#2c1d13';
      ctx.fill();
    }
  } else {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#0d1013');
    g.addColorStop(0.5, '#1d2328');
    g.addColorStop(1, '#2b3237');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // 형광등 줄
    for (let i = 0; i < 6; i++) {
      const a = v.p([-3 + i * 1.2, 1.4, -2.5]), b = v.p([-2.4 + i * 1.2, 1.4, -2.5]);
      ctx.strokeStyle = 'rgba(220,240,255,.75)';
      ctx.lineWidth = Math.max(1.5, a.s * 0.02);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
    // 기둥
    for (const x of [-1.6, 1.4]) {
      const a = v.p([x, 0, -2]), b = v.p([x, 1.6, -2]);
      ctx.fillStyle = '#3a4248';
      ctx.fillRect(a.x - a.s * 0.18, b.y, a.s * 0.36, a.y - b.y);
    }
    // 타일 바닥
    poly(ctx, v, [[-4, 0, -3], [4, 0, -3], [4, 0, 3], [-4, 0, 3]]);
    ctx.fillStyle = '#8e9398';
    ctx.fill();
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = 'rgba(40,46,52,.35)';
    for (let i = -20; i <= 20; i++) {
      ctx.lineWidth = 1;
      const a = v.p([i * 0.3, 0, -3]), b = v.p([i * 0.3, 0, 3]);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      const c = v.p([-4, 0, i * 0.3]), d = v.p([4, 0, i * 0.3]);
      ctx.beginPath();
      ctx.moveTo(c.x, c.y);
      ctx.lineTo(d.x, d.y);
      ctx.stroke();
    }
    // 점자 블록 띠
    poly(ctx, v, [[-4, 0, -0.62], [4, 0, -0.62], [4, 0, -0.45], [-4, 0, -0.45]]);
    ctx.fillStyle = '#d9b62c';
    ctx.fill();
    // 바닥 반사
    const rg = ctx.createLinearGradient(0, hz, 0, h);
    rg.addColorStop(0, 'rgba(220,240,255,.18)');
    rg.addColorStop(0.4, 'rgba(220,240,255,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }
}

function bokeh(ctx: CanvasRenderingContext2D, w: number, hz: number, par: number, cols: string[], n: number, k: number) {
  for (let i = 0; i < n; i++) {
    const x = (((hash(i) * w * 1.6 + par * (0.4 + hash(i + 5))) % (w * 1.4)) + w * 1.4) % (w * 1.4) - w * 0.2;
    const y = hz - (hash(i + 2) * 0.35 + 0.02) * w * 0.5;
    const r = (6 + hash(i + 7) * 26) * k * (w / 1200 + 0.4);
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    const c = cols[i % cols.length];
    g.addColorStop(0, c + '0.32)');
    g.addColorStop(0.7, c + '0.16)');
    g.addColorStop(1, c + '0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
}

function box(ctx: CanvasRenderingContext2D, v: View, o: Vec3, s: Vec3, col: string, rot = 0) {
  const c = Math.cos(rot), sn = Math.sin(rot);
  const R = (x: number, z: number): [number, number] => [o[0] + x * c - z * sn, o[2] + x * sn + z * c];
  const hx = s[0] / 2, hz = s[2] / 2;
  const top = [R(-hx, -hz), R(hx, -hz), R(hx, hz), R(-hx, hz)];
  // 앞 옆면
  poly(ctx, v, [[top[3][0], o[1], top[3][1]], [top[2][0], o[1], top[2][1]], [top[2][0], o[1] + s[1], top[2][1]], [top[3][0], o[1] + s[1], top[3][1]]]);
  ctx.fillStyle = shade(col, -0.35);
  ctx.fill();
  poly(ctx, v, top.map(([x, z]) => [x, o[1] + s[1], z] as Vec3));
  ctx.fillStyle = col;
  ctx.fill();
}

function mug(ctx: CanvasRenderingContext2D, v: View, o: Vec3, t: number) {
  const r = 0.045, hgt = 0.1;
  const b = v.p(o), tp = v.p([o[0], o[1] + hgt, o[2]]);
  const w = r * b.s;
  const k = clamp(Math.sin(v.cam.el) + 0.05, 0.08, 1);
  ctx.fillStyle = '#d24b35';
  ctx.beginPath();
  ctx.ellipse(b.x, b.y, w, w * k, 0, 0, Math.PI);
  ctx.lineTo(tp.x - w, tp.y);
  ctx.ellipse(tp.x, tp.y, w, w * k, 0, Math.PI, 0, true);
  ctx.closePath();
  const g = ctx.createLinearGradient(b.x - w, 0, b.x + w, 0);
  g.addColorStop(0, '#7c2416');
  g.addColorStop(0.35, '#e35c44');
  g.addColorStop(1, '#5a170c');
  ctx.fillStyle = g;
  ctx.fill();
  ctx.fillStyle = '#2a120c';
  ctx.beginPath();
  ctx.ellipse(tp.x, tp.y, w * 0.9, w * k * 0.9, 0, 0, Math.PI * 2);
  ctx.fill();
  // 김
  ctx.strokeStyle = 'rgba(255,255,255,.08)';
  ctx.lineWidth = w * 0.18;
  for (let i = 0; i < 2; i++) {
    ctx.beginPath();
    for (let k2 = 0; k2 < 12; k2++) {
      const yy = tp.y - k2 * w * 0.22;
      const xx = tp.x + (i - 0.5) * w * 0.6 + Math.sin(t * 1.6 + k2 * 0.6 + i * 2) * w * 0.15;
      if (k2) ctx.lineTo(xx, yy);
      else ctx.moveTo(xx, yy);
    }
    ctx.stroke();
  }
}

/* ─── 소장품 — 패드 스킨 · 모양 · 발사대(앱 Collection.swift 와 같은 값) ─── */
export type PadPattern = 'plain' | 'asphalt' | 'grass' | 'neon' | 'finish' | 'harbor';
export type PadSkin = { id: string; base: string; ink: string; pattern: PadPattern; logo?: string };
export type PadShape = 'round' | 'lot' | 'barge' | 'roof';
export type Mount = { kind: 'tower' | 'gantry'; color: string };
export const HOUSE_SKIN: PadSkin = { id: 'house', base: '#292929', ink: '#d1d1d1', pattern: 'plain' };

type Box = { c: Vec3; s: Vec3; col: string; lit?: boolean; yaw?: number; pivot?: Vec3 };
const LIGHT = norm([-0.45, 1, 0.55]);
function boxDepth(v: View, b: Box) {
  return dot(sub(boxCenter(b), v.E), v.f);
}
function boxCenter(b: Box): Vec3 {
  if (!b.yaw || !b.pivot) return b.c;
  const c = Math.cos(b.yaw), sn = Math.sin(b.yaw);
  const dx = b.c[0] - b.pivot[0], dz = b.c[2] - b.pivot[2];
  return [b.pivot[0] + dx * c - dz * sn, b.c[1], b.pivot[2] + dx * sn + dz * c];
}
/** 상자 여럿 — 먼 것부터, 카메라 쪽 면만, 빛 방향에 따라 밝기 */
function drawBoxes(ctx: CanvasRenderingContext2D, v: View, list: Box[]) {
  const faces: { d: number; pts: Vec3[]; col: string }[] = [];
  for (const b of list) {
    const [hx, hy, hz] = [b.s[0] / 2, b.s[1] / 2, b.s[2] / 2];
    const cy = Math.cos(b.yaw ?? 0), sy = Math.sin(b.yaw ?? 0);
    const P = (x: number, y: number, z: number): Vec3 => {
      let px = b.c[0] + x, pz = b.c[2] + z;
      if (b.yaw && b.pivot) {
        const dx = px - b.pivot[0], dz = pz - b.pivot[2];
        px = b.pivot[0] + dx * cy - dz * sy;
        pz = b.pivot[2] + dx * sy + dz * cy;
      }
      return [px, b.c[1] + y, pz];
    };
    const R = (n: Vec3): Vec3 => (b.yaw ? [n[0] * cy - n[2] * sy, n[1], n[0] * sy + n[2] * cy] : n);
    const F: [Vec3, Vec3[]][] = [
      [[0, 1, 0], [P(-hx, hy, -hz), P(hx, hy, -hz), P(hx, hy, hz), P(-hx, hy, hz)]],
      [[1, 0, 0], [P(hx, -hy, -hz), P(hx, -hy, hz), P(hx, hy, hz), P(hx, hy, -hz)]],
      [[-1, 0, 0], [P(-hx, -hy, -hz), P(-hx, hy, -hz), P(-hx, hy, hz), P(-hx, -hy, hz)]],
      [[0, 0, 1], [P(-hx, -hy, hz), P(-hx, hy, hz), P(hx, hy, hz), P(hx, -hy, hz)]],
      [[0, 0, -1], [P(-hx, -hy, -hz), P(hx, -hy, -hz), P(hx, hy, -hz), P(-hx, hy, -hz)]],
    ];
    for (const [n0, pts] of F) {
      const n = R(n0);
      const c: Vec3 = mul(pts.reduce((acc, p) => add(acc, p), [0, 0, 0] as Vec3), 0.25);
      if (dot(n, sub(v.E, c)) <= 0) continue;
      const lit = b.lit ? 1 : 0.42 + 0.58 * Math.max(0, dot(n, LIGHT));
      faces.push({ d: dot(sub(c, v.E), v.f), pts, col: b.lit ? b.col : shade(b.col, lit - 1) });
    }
  }
  faces.sort((a, b) => b.d - a.d);
  for (const f of faces) {
    poly(ctx, v, f.pts);
    ctx.fillStyle = f.col;
    ctx.fill();
  }
}

/** 패드 윗면 그림 — 앱 BrandArt.drawPad 와 같은 무늬(512px, 스킨마다 한 번만 만든다) */
const padTex = new Map<string, HTMLCanvasElement>();
function padTexture(skin: PadSkin): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;
  const hit = padTex.get(skin.id);
  if (hit) return hit;
  const S = 512, k = S / 1024;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const g = c.getContext('2d')!;
  g.fillStyle = skin.base;
  g.fillRect(0, 0, S, S);
  let seed = 23;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  if (skin.pattern === 'asphalt') {
    for (let i = 0; i < 2600; i++) {
      g.fillStyle = rnd() > 0.5 ? 'rgba(107,107,107,.35)' : 'rgba(26,26,26,.35)';
      g.fillRect(rnd() * S, rnd() * S, 2, 2);
    }
    g.fillStyle = skin.ink;
    g.globalAlpha = 0.8;
    for (const x of [S * 0.14, S * 0.86]) g.fillRect(x - 7 * k, S * 0.2, 14 * k, S * 0.6);
    g.globalAlpha = 1;
  } else if (skin.pattern === 'grass') {
    for (let i = 0; i < 2200; i++) {
      g.fillStyle = `rgba(${(51 + rnd() * 51) | 0},${(107 + rnd() * 77) | 0},46,.5)`;
      g.fillRect(rnd() * S, rnd() * S, 3 * k, 9 * k);
    }
  } else if (skin.pattern === 'neon') {
    g.lineWidth = 5 * k;
    [S * 0.47, S * 0.34].forEach((r, i) => {
      g.strokeStyle = i === 0 ? skin.ink : '#33e6ff';
      g.shadowColor = g.strokeStyle;
      g.shadowBlur = 14 * k;
      g.beginPath();
      g.arc(S / 2, S / 2, r, 0, Math.PI * 2);
      g.stroke();
    });
    g.shadowBlur = 0;
  } else if (skin.pattern === 'finish') {
    const a = S / 14;
    g.fillStyle = '#1a1a1a';
    for (let y = 0; y < 14; y++) for (let x = 0; x < 14; x++) if ((x + y) % 2 === 0 && (x < 2 || x > 11)) g.fillRect(x * a, y * a, a, a);
  } else if (skin.pattern === 'harbor') {
    g.strokeStyle = 'rgba(0,0,0,.28)';
    g.lineWidth = 5 * k;
    for (let p = S / 6; p < S; p += S / 6) {
      g.beginPath();
      g.moveTo(p, 0);
      g.lineTo(p, S);
      g.moveTo(0, p);
      g.lineTo(S, p);
      g.stroke();
    }
    g.fillStyle = 'rgba(128,71,31,.2)';
    for (let i = 0; i < 120; i++) {
      const r = (6 + rnd() * 30) * k;
      g.beginPath();
      g.ellipse(rnd() * S, rnd() * S, r / 2, r * 0.35, 0, 0, Math.PI * 2);
      g.fill();
    }
  }
  padTex.set(skin.id, c);
  return c;
}

/** 발사대 상자 — 앱 MountRig 와 같은 치수. clear = 그려진 기체의 가장 바깥(헤비는 옆 탱크까지), k 0 = 감싼 자리 … 1 = 물러난 자리 */
const MOUNT_CLEAR: Record<VCls, number> = { standard: 3.2, heavy: 7.4, sprint: 3.0, twin: 3.8 };
export function mountBoxes(m: Mount, cls: VCls, k: number): Box[] {
  const S = 0.004, H = 62, e = clamp(k) * clamp(k) * (3 - 2 * clamp(k));
  const clear = MOUNT_CLEAR[cls];
  const out: Box[] = [];
  const B = (w: number, h: number, d: number, x: number, y: number, z: number, extra: Partial<Box> = {}) =>
    out.push({ c: [x * S, y * S, z * S], s: [w * S, h * S, d * S], col: m.color, ...extra });
  if (m.kind === 'tower') {
    const x0 = clear + 8;
    for (const [x, z] of [[x0, -3], [x0 + 6, -3], [x0, 3], [x0 + 6, 3]]) B(0.8, H, 0.8, x, H / 2, z);
    for (let y = 6; y < H; y += 9) {
      B(7, 0.6, 0.6, x0 + 3, y, -3);
      B(7, 0.6, 0.6, x0 + 3, y, 3);
      B(0.6, 0.6, 7, x0, y, 0);
      B(0.6, 0.6, 7, x0 + 6, y, 0);
    }
    const len = x0 - clear - 0.3;
    for (const h of [H * 0.45, H * 0.8]) B(len, 0.9, 0.9, x0 - len / 2, h, 0, { yaw: -e * Math.PI * 0.45, pivot: [x0 * S, h * S, 0] });
  } else {
    // 웹 무대에서는 카메라 반대쪽(−z)으로 물러난다 — 앞으로 굴러오면 기체를 가린다
    const half = clear + 12, zb = -40 * e;
    for (const x of [-half, half]) {
      for (const z of [-3, 3]) B(1.4, H + 6, 1.4, x, (H + 6) / 2, z + zb);
      B(1.6, 1.2, 8, x, 0.8, zb);
      out.push({ c: [x * S, 0.25 * S, -22 * S], s: [1.2 * S, 0.5 * S, 52 * S], col: '#4d4d4d' }); // 레일 — 뒤로 굴러갈 길
    }
    B(half * 2 + 2, 2.2, 8, 0, H + 6, zb);
  }
  return out;
}
/** 발사대를 기체 앞뒤로 나눠 그린다 */
export function drawMount(ctx: CanvasRenderingContext2D, v: View, boxes: Box[], splitDepth: number, side: 'back' | 'front') {
  drawBoxes(ctx, v, boxes.filter((b) => (side === 'back' ? boxDepth(v, b) > splitDepth : boxDepth(v, b) <= splitDepth)));
}

/* ─── 패드 ─── */
/** 주식회사 예아플러스 로고 — 1080 격자 좌표(앱 Theme.swift logoBars 와 같다) */
const LOGO_BARS: [number, number][][] = [
  [[310, 293], [411, 293], [411, 600], [310, 499]],
  [[430, 293], [530, 293], [530, 819], [430, 719]],
  [[550, 293], [650, 293], [650, 719], [550, 819]],
  [[669, 293], [770, 293], [770, 499], [669, 600]],
];

export function drawPad(ctx: CanvasRenderingContext2D, v: View, glow = 0, ringHint: number | null = null, hintNow = false, ringR = RING_R) {
  drawPadStyled(ctx, v, HOUSE_SKIN, 'round', glow, ringHint, hintNow, ringR);
}

/** 패드 — 스킨(윗면 무늬 · 글자 색) × 모양(원형 · 주차 칸 · 바지선 · 옥상). 앱 makePad · BrandArt.pad 와 같은 치수(앱 단위 × 0.004 = m).
    솟은 구조물(차막이 · 뱃전 · 귀퉁이 등) 가운데 기체보다 카메라 쪽 것은 돌려준다 — 기체를 그린 뒤 그려야 가린다 */
export function drawPadStyled(
  ctx: CanvasRenderingContext2D,
  v: View,
  skin: PadSkin,
  shape: PadShape,
  glow = 0,
  ringHint: number | null = null,
  hintNow = false,
  ringR = RING_R,
  splitDepth = Infinity,
): (() => void)[] {
  const S = 0.004;
  const dark = '#1f2023';
  const front: (() => void)[] = [];
  const raised: Box[] = [];
  const N = 64;
  const circ = (r: number, y = 0.0005): Vec3[] => Array.from({ length: N }, (_, i) => [Math.cos((i / N) * Math.PI * 2) * r, y, Math.sin((i / N) * Math.PI * 2) * r]);
  // 받침 — 모양마다
  if (shape === 'round') {
    poly(ctx, v, circ(PAD_R, -0.003));
    ctx.fillStyle = '#121316';
    ctx.fill();
    poly(ctx, v, circ(PAD_R, 0.001));
    ctx.fillStyle = skin.base;
    ctx.fill();
  } else {
    const flat: Box[] = [];
    if (shape === 'lot') {
      flat.push({ c: [0, 0.25 * S, 0], s: [56 * S, 0.5 * S, 56 * S], col: skin.base });
      for (const x of [-27, 27]) flat.push({ c: [x * S, 0.58 * S, 0], s: [1.6 * S, 0.1 * S, 56 * S], col: '#ebebeb' });
      raised.push({ c: [0, 1.1 * S, 25 * S], s: [26 * S, 1.8 * S, 2.4 * S], col: '#f2bf29' });
    } else if (shape === 'barge') {
      flat.push({ c: [0, -0.7 * S, 0], s: [76 * S, 1.6 * S, 54 * S], col: dark });
      flat.push({ c: [0, 0.25 * S, 0], s: [72 * S, 0.5 * S, 52 * S], col: skin.base });
      for (const z of [-26.5, 26.5]) raised.push({ c: [0, 1 * S, z * S], s: [74 * S, 1.6 * S, 1.2 * S], col: dark });
      for (const x of [-33, 33]) raised.push({ c: [x * S, 2.8 * S, 0], s: [6 * S, 5 * S, 14 * S], col: dark });
    } else if (shape === 'roof') {
      flat.push({ c: [0, -0.2 * S, 0], s: [62 * S, 1 * S, 62 * S], col: dark });
      flat.push({ c: [0, 0.25 * S, 0], s: [58 * S, 0.5 * S, 58 * S], col: skin.base });
      for (const x of [-29, 29]) for (const z of [-29, 29]) raised.push({ c: [x * S, 1.8 * S, z * S], s: [1.8 * S, 3.2 * S, 1.8 * S], col: '#ff4733', lit: true });
    }
    drawBoxes(ctx, v, flat);
    // 카메라에서 먼 구조물은 지금, 가까운 것은 기체 뒤에
    const back = raised.filter((r) => boxDepth(v, r) > splitDepth);
    drawBoxes(ctx, v, back);
    const near = raised.filter((r) => boxDepth(v, r) <= splitDepth);
    if (near.length) front.push(() => drawBoxes(ctx, v, near));
  }
  // 윗면 — 스킨 무늬(앱 패드 그림과 같은 배치)를 원판에 붙인다
  const tex = padTexture(skin);
  if (tex) {
    const FR = 25.8 * S, y = 0.0022;
    const q0 = v.p([0, y, 0]), qx = v.p([FR, y, 0]), qz = v.p([0, y, FR]);
    const ax = qx.x - q0.x, ay = qx.y - q0.y, bx = qz.x - q0.x, by = qz.y - q0.y, T = tex.width;
    ctx.save();
    poly(ctx, v, circ(FR, y));
    ctx.clip();
    ctx.transform((2 * ax) / T, (2 * ay) / T, (2 * bx) / T, (2 * by) / T, q0.x - ax - bx, q0.y - ay - by);
    ctx.drawImage(tex, 0, 0);
    ctx.restore();
  }
  // 판정 고리
  ctx.save();
  poly(ctx, v, circ(ringR + 0.003, 0.0015));
  const inner = circ(ringR - 0.003, 0.0015).reverse();
  inner.forEach((P, i) => {
    const q = v.p(P);
    if (i) ctx.lineTo(q.x, q.y);
    else ctx.moveTo(q.x, q.y);
  });
  ctx.closePath();
  ctx.fillStyle = LOOK.lime;
  ctx.fill('evenodd');
  ctx.restore();
  // 가운데 주식회사 예아플러스 로고 — 막대 4개 방패(앱 Theme.swift drawLogo · drift/docs/brand/yeahplus_mark.svg 격자 그대로).
  // 앱과 같은 크기: 패드 면 1024px 중 400px = 8.2cm. 로고 위쪽이 카메라 반대편이라 정면에서 바로 읽힌다
  const LK = (PAD_R * 2 * (400 / 1024)) / 526;
  ctx.fillStyle = skin.logo ?? 'rgba(237,237,237,.95)';
  for (const bar of LOGO_BARS) {
    poly(ctx, v, bar.map(([x, y]) => [(x - 540) * LK, 0.0018, (y - 556) * LK] as Vec3));
    ctx.fill();
  }
  // 가장자리 글자
  const txt = 'ROCKET PARKING · YEAHPLUS · ';
  ctx.fillStyle = skin.ink;
  ctx.globalAlpha *= 0.8;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  // 글자도 바닥에 눕힌다 — 원의 접선 방향으로 돌리고, 내려다보는 각만큼 납작하게
  const flat = clamp(Math.abs(Math.sin(v.cam.el)), 0.12, 1);
  for (let i = 0; i < txt.length; i++) {
    const a = -(i / txt.length) * Math.PI * 2 + 2.2;
    const q = v.p([Math.cos(a) * 0.093, 0.002, Math.sin(a) * 0.093]);
    const q2 = v.p([Math.cos(a - 0.05) * 0.093, 0.002, Math.sin(a - 0.05) * 0.093]);
    const fs = Math.max(4, q.s * 0.0085);
    if (fs < 5 && flat < 0.3) continue;
    ctx.save();
    ctx.translate(q.x, q.y);
    ctx.rotate(Math.atan2(q2.y - q.y, q2.x - q.x));
    ctx.scale(1, flat);
    ctx.font = `800 ${fs}px ui-monospace,Menlo,monospace`;
    ctx.fillText(txt[i], 0, 0);
    ctx.restore();
  }
  ctx.globalAlpha /= 0.8;
  // 엔진 빛이 패드를 비춘다
  if (glow > 0.01) {
    const c = v.p([0, 0, 0]);
    const rr = PAD_R * 2.2 * c.s;
    const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, rr);
    g.addColorStop(0, `rgba(255,190,90,${0.55 * glow})`);
    g.addColorStop(0.4, `rgba(255,140,50,${0.22 * glow})`);
    g.addColorStop(1, 'rgba(255,120,40,0)');
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.scale(1, 1);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, rr, rr * clamp(Math.sin(v.cam.el), 0.15, 1), 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  // 예고 고리 — 줄어들어 판정 고리에 닿는 순간이 점화
  if (ringHint != null && ringHint > 0) {
    ctx.save();
    poly(ctx, v, circ(ringHint, 0.002));
    ctx.strokeStyle = hintNow ? LOOK.lime : 'rgba(244,246,248,.7)';
    ctx.lineWidth = hintNow ? 3 : 1.5;
    ctx.setLineDash(hintNow ? [] : [6, 6]);
    ctx.stroke();
    ctx.restore();
  }
  return front;
}

/* ─── 그림자 ─── */
export function drawShadow(ctx: CanvasRenderingContext2D, v: View, x: number, hgt: number, z = 0) {
  const c = v.p([x, 0.002, z]);
  const spread = 1 + hgt * 3;
  const rr = 0.03 * spread * c.s;
  const a = clamp(0.55 / (spread * spread), 0, 0.55);
  const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, rr);
  g.addColorStop(0, `rgba(0,0,0,${a})`);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.ellipse(c.x, c.y, rr, rr * clamp(Math.sin(v.cam.el), 0.2, 1), 0, 0, Math.PI * 2);
  ctx.fill();
}

/* ─── 기체 ─── */
/** fade: 엔진을 끈 뒤 화염이 사그라드는 정도(1 = 그대로, 0 = 꺼짐) — 접지 순간 화염이 뚝 끊기지 않게 */
export type Pose = { x: number; y: number; lean: number; legs: number; th: number; on: boolean; soot?: number; z?: number; fade?: number };

export function boosterBase(f: Frame | Pose): Vec3 {
  return [f.x * SCALE, f.y * SCALE + LIFT, (f as Pose).z ?? 0];
}

export function drawBooster(ctx: CanvasRenderingContext2D, v: View, pose: Pose, t: number, liv: Livery = STD, scale = 1, flame = true, cls: VCls = 'standard') {
  const shp = CLASS_SHAPE[cls];
  const R = BR * shp.r; // 동체 반지름
  const hEnd = 0.062 + 0.143 * shp.h; // 몸통 끝(머리 시작)
  const top = hEnd + 0.035 * shp.nose; // 머리 끝
  const U = (u: number) => 0.062 + (u - 0.062) * shp.h; // 표준 기체의 몸통 자리 → 이 기체 자리
  const O = boosterBase(pose);
  const ax: Vec3 = [Math.sin(pose.lean), Math.cos(pose.lean), 0];
  const side: Vec3 = [Math.cos(pose.lean), -Math.sin(pose.lean), 0];
  const zed: Vec3 = [0, 0, 1];
  const at = (u: number, off: Vec3 = [0, 0, 0]): Vec3 => add(add(O, off), mul(ax, u * scale));
  const P0 = v.p(at(0)), P1 = v.p(at(top));
  let dx = P1.x - P0.x, dy = P1.y - P0.y;
  const dl = Math.hypot(dx, dy) || 1;
  dx /= dl;
  dy /= dl; // 화면 축(아래 → 위)
  const nx = -dy, ny = dx; // 옆
  const k = clamp(Math.abs(dot(ax, v.f)), 0.04, 1);
  const rot = Math.atan2(ny, nx);
  const mx = -ny, my = nx;
  const frontPos = mx * dx + my * dy < 0;
  const toCam = norm(sub(v.E, O));
  const depthOf = (p: Vec3) => dot(sub(p, v.E), v.f);
  const dO = depthOf(O);

  const legsBehind: (() => void)[] = [], legsFront: (() => void)[] = [];
  const legCol = '#1d1f23';
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2;
    const dir: Vec3 = add(mul(side, Math.cos(a)), mul(zed, Math.sin(a)));
    const hinge = add(at(HINGE), mul(dir, R * scale));
    const dep = clamp(pose.legs);
    const ang = dep * ((125 * Math.PI) / 180); // 접힘: 동체를 따라 위로 / 펼침: 바깥 · 아래로 125°
    const len = 0.072 * scale;
    const foot = add(hinge, add(mul(ax, Math.cos(ang) * len), mul(dir, Math.sin(ang) * len)));
    const draw = () => {
      const a2 = v.p(hinge), b2 = v.p(foot);
      ctx.strokeStyle = legCol;
      ctx.lineCap = 'round';
      ctx.lineWidth = Math.max(1.2, 0.0042 * scale * a2.s);
      ctx.beginPath();
      ctx.moveTo(a2.x, a2.y);
      ctx.lineTo(b2.x, b2.y);
      ctx.stroke();
      const mid = add(hinge, mul(sub(foot, hinge), 0.55));
      const strut = add(at(HINGE + 0.03), mul(dir, R * scale));
      const m2 = v.p(mid), s2 = v.p(strut);
      ctx.lineWidth = Math.max(0.8, 0.0022 * scale * a2.s);
      ctx.beginPath();
      ctx.moveTo(s2.x, s2.y);
      ctx.lineTo(m2.x, m2.y);
      ctx.stroke();
      if (dep > 0.95) {
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.ellipse(b2.x, b2.y, 0.006 * scale * b2.s, 0.006 * scale * b2.s * k, 0, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    (depthOf(hinge) > dO ? legsBehind : legsFront).push(draw);
  }

  /** 원통 한 토막 — off 만큼 비켜 선 축(헤비의 옆 탱크 · 쌍발 노즐)도 같은 방법으로 */
  const sec = (u0: number, u1: number, r0: number, r1: number, col: string, hi = 0.35, off: Vec3 = [0, 0, 0]) => {
    const a = v.p(at(u0, off)), b = v.p(at(u1, off));
    const w0 = r0 * scale * a.s, w1 = r1 * scale * b.s;
    ctx.beginPath();
    ctx.moveTo(a.x + nx * w0, a.y + ny * w0);
    ctx.ellipse(a.x, a.y, Math.max(w0, 0.01), Math.max(w0 * k, 0.01), rot, 0, Math.PI, !frontPos);
    ctx.lineTo(b.x - nx * w1, b.y - ny * w1);
    if (w1 > 0.05) ctx.ellipse(b.x, b.y, w1, w1 * k, rot, Math.PI, 0, frontPos);
    else ctx.lineTo(b.x, b.y);
    ctx.closePath();
    const mxp = (a.x + b.x) / 2, myp = (a.y + b.y) / 2, wm = Math.max(w0, w1, 0.5);
    const g = ctx.createLinearGradient(mxp - nx * wm, myp - ny * wm, mxp + nx * wm, myp + ny * wm);
    g.addColorStop(0, shade(col, -0.55));
    g.addColorStop(0.28, shade(col, hi));
    g.addColorStop(0.55, col);
    g.addColorStop(1, shade(col, -0.62));
    ctx.fillStyle = g;
    ctx.fill();
  };
  const soot = clamp(pose.soot ?? 0);
  const hullCol = soot > 0 ? mix(liv.hull, '#4a4038', soot * 0.6) : liv.hull;

  // 헤비의 옆 탱크 둘 — 동체 옆 1.3R, 몸통 길이의 62%. 동체보다 먼 쪽은 먼저, 가까운 쪽은 나중에
  const tanks: { off: Vec3; d: number }[] = [];
  if (cls === 'heavy')
    for (const sgn of [-1, 1]) {
      const off = mul(side, sgn * R * 1.3 * scale);
      tanks.push({ off, d: depthOf(add(O, off)) });
    }
  const tank = (off: Vec3) => {
    const r = R * 0.42;
    sec(0.03, 0.03 + 0.143 * shp.h * 0.62, r, r, hullCol, 0.35, off);
    sec(0.03 + 0.143 * shp.h * 0.62, 0.03 + 0.143 * shp.h * 0.72, r, r * 0.3, liv.accent, 0.35, off);
  };
  for (const tk of tanks) if (tk.d > dO) tank(tk.off);
  legsBehind.forEach((d) => d());

  // 노즐 — 쌍발은 둘
  const bells: Vec3[] = cls === 'twin' ? [mul(side, -R * 0.46 * scale), mul(side, R * 0.46 * scale)] : [[0, 0, 0]];
  const bellK = cls === 'twin' ? 0.62 : 1;
  for (const b of [...bells].sort((p, q) => depthOf(add(O, q)) - depthOf(add(O, p)))) sec(0, 0.018, 0.0095 * shp.r * bellK, 0.0068 * shp.r * bellK, '#2c2e33', 0.2, b);
  sec(0.018, 0.04, R, R, '#3b3d42', 0.2);
  sec(0.04, 0.062, R, R, '#5a5048', 0.2);
  sec(0.062, hEnd, R, R, hullCol);
  // 감싼 무늬 — 동체 둘레(θ)와 높이(u) 칸으로 그리고, 카메라 쪽 반만 보인다
  if (liv.pattern && liv.pattern !== 'plain') wrapPattern(ctx, v, liv, (uu, th) => add(at(uu), mul(add(mul(side, Math.cos(th)), mul(zed, Math.sin(th))), R * 1.004 * scale)), (th) => dot(add(mul(side, Math.cos(th)), mul(zed, Math.sin(th))), toCam), U(0.068), U(0.158), R * scale, soot);
  for (const [u0, u1, c] of liv.bands ?? [
    [0.168, 0.176, liv.accent],
    [0.188, 0.192, liv.accent],
  ])
    sec(U(u0), U(u1), R * 1.003, R * 1.003, c);
  sec(hEnd, top, R, 0.0005, liv.hull, 0.45);
  // 격자 날개
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2;
    const dir: Vec3 = add(mul(side, Math.cos(a)), mul(zed, Math.sin(a)));
    const p1 = v.p(add(at(hEnd - 0.009), mul(dir, R * scale))), p2 = v.p(add(at(hEnd - 0.009), mul(dir, R * 1.7 * scale)));
    ctx.strokeStyle = '#4a4d53';
    ctx.lineWidth = Math.max(1, 0.0028 * scale * p1.s);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
  // 세로 글자 — 무늬 띠 가운데
  const mid = v.p(at(U(0.113)));
  const fs = Math.min(BR * scale * mid.s * 0.75, (0.143 * shp.h * 0.6 * scale * mid.s) / 8 / 0.62);
  if (fs > 4.5) {
    ctx.save();
    ctx.translate(mid.x, mid.y);
    ctx.rotate(Math.atan2(dy, dx));
    ctx.fillStyle = liv.ink ? liv.ink : 'rgba(20,22,26,.8)';
    ctx.globalAlpha = 0.85;
    ctx.font = `800 ${fs}px ui-monospace,Menlo,monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('YEAHPLUS', 0, 0);
    ctx.restore();
  }
  legsFront.forEach((d) => d());
  for (const tk of tanks) if (tk.d <= dO) tank(tk.off);

  if (flame && pose.on && pose.th > 0) {
    if (bells.length > 1) for (const b of bells) drawFlame(ctx, v, (u) => at(u, b), ax, pose, t, scale * 0.7);
    else drawFlame(ctx, v, at, ax, pose, t, scale);
  }
}

/* 동체를 감싼 무늬 — 앱 BrandArt.drawPattern 의 배치를 둘레 θ(0…1) × 높이 h(0…1, 아래 → 위) 칸으로 옮긴 것.
   칸 하나 = 원통 위 네 점. 카메라를 등진 칸은 그리지 않고, 비스듬할수록 어둡게 */
function wrapPattern(
  ctx: CanvasRenderingContext2D,
  v: View,
  liv: Livery,
  surf: (u: number, th: number) => Vec3,
  facing: (th: number) => number,
  u0: number,
  u1: number,
  Rw: number,
  soot: number,
) {
  const H = u1 - u0;
  const circ = 2 * Math.PI * Rw; // 둘레(m)
  const col = soot > 0 ? mix(liv.accent, '#2a241f', soot * 0.5) : liv.accent;
  const quad = (t0: number, t1: number, h0: number, h1: number) => {
    const th0 = t0 * Math.PI * 2, th1 = t1 * Math.PI * 2;
    const f = facing((th0 + th1) / 2);
    if (f <= 0.02) return;
    const pts = [surf(u0 + h0 * H, th0), surf(u0 + h0 * H, th1), surf(u0 + h1 * H, th1), surf(u0 + h1 * H, th0)].map((p) => v.p(p));
    ctx.beginPath();
    pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
    ctx.closePath();
    ctx.fillStyle = shade(col, -0.55 * (1 - f));
    ctx.fill();
  };
  // 칸을 잘게 — 둘레 64칸이면 곡면이 매끄럽다
  const strip = (h0: number, h1: number, on: (t: number) => boolean, n = 64) => {
    for (let i = 0; i < n; i++) if (on((i + 0.5) / n)) quad(i / n, (i + 1) / n, h0, h1);
  };
  const p = liv.pattern;
  if (p === 'checker') {
    // 둘레 16칸 정사각, 위아래 두 줄씩
    const a = circ / 16 / H; // 칸 높이(h 비율)
    for (let row = 0; row < 2; row++) {
      for (const base of [row * a, 1 - (row + 1) * a]) strip(base, base + a, (t) => (Math.floor(t * 16) + row) % 2 === 0, 64);
    }
  } else if (p === 'hazard') {
    // 위아래 20% 띠에 사선 줄무늬
    const band = 0.2, n = 18;
    for (const y0 of [0, 1 - band])
      for (let j = 0; j < 4; j++) {
        const h0 = y0 + (j / 4) * band, h1 = y0 + ((j + 1) / 4) * band;
        strip(h0, h1, (t) => ((t * n + (j / 4) * 0.5) % 1) < 0.5, 72);
      }
  } else if (p === 'crosswalk') {
    for (const [h0, h1] of [[0, 0.26], [0.74, 1]]) strip(h0, h1, (t) => Math.floor(t * 12) % 2 === 0, 48);
  } else if (p === 'pinstripe') {
    for (const y of [0.06, 0.28, 0.72, 0.94]) strip(y, y + 0.025, () => true, 48);
  } else if (p === 'stencil') {
    for (const [h0, h1] of [[0.1, 0.19], [0.81, 0.9]]) strip(h0, h1, () => true, 48);
  } else if (p === 'petals') {
    // 꽃잎 70장 — 가운데 글자 자리는 비운다
    for (let i = 0; i < 70; i++) {
      const t = hash(i * 3.1 + 11), h = hash(i * 7.7 + 5);
      if (Math.abs(h - 0.5) < 0.16) continue;
      const th = t * Math.PI * 2;
      const f = facing(th);
      if (f <= 0.05) continue;
      const c = v.p(surf(u0 + h * H, th));
      const r = (0.0022 + 0.0024 * hash(i + 2)) * c.s;
      ctx.save();
      ctx.translate(c.x, c.y);
      ctx.rotate(hash(i + 9) * Math.PI);
      ctx.scale(Math.max(0.15, f), 1);
      ctx.beginPath();
      ctx.ellipse(0, 0, r, r * 0.55, 0, 0, Math.PI * 2);
      ctx.fillStyle = shade(col, -0.45 * (1 - f));
      ctx.fill();
      ctx.restore();
    }
  }
}

function mix(a: string, b: string, k: number) {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16);
  const m = (s: number) => Math.round(((A >> s) & 255) * (1 - k) + ((B >> s) & 255) * k);
  return '#' + ((m(16) << 16) | (m(8) << 8) | m(0)).toString(16).padStart(6, '0');
}

/** 불꽃만 — 사진 판 위에서는 기체를 색 보정한 뒤 불꽃을 따로 얹는다(불꽃까지 어두워지지 않게) */
export function drawFlameOnly(ctx: CanvasRenderingContext2D, v: View, pose: Pose, t: number, scale = 1, bloom = 1, cls: VCls = 'standard') {
  if (!pose.on || pose.th <= 0) return;
  const O = boosterBase(pose);
  const ax: Vec3 = [Math.sin(pose.lean), Math.cos(pose.lean), 0];
  if (cls === 'twin') {
    // 쌍발 — 노즐 둘, 화염도 둘(조금 가늘게)
    const side: Vec3 = [Math.cos(pose.lean), -Math.sin(pose.lean), 0];
    const R = BR * CLASS_SHAPE.twin.r * 0.46 * scale;
    for (const sg of [-1, 1]) drawFlame(ctx, v, (u) => add(add(O, mul(side, sg * R)), mul(ax, u * scale)), ax, pose, t, scale * 0.7, bloom);
    return;
  }
  drawFlame(ctx, v, (u) => add(O, mul(ax, u * scale)), ax, pose, t, scale * (cls === 'heavy' ? 1.25 : 1), bloom);
}

/* ─── 화염 — 노즐에서 꼬리까지 겹친 빛 덩어리(흰 심 → 노랑 → 주황 → 붉은 꼬리) · 깜빡임 · 충격파 무늬 ·
   바닥에 닿으면 사방으로 번지는 불 · 가로로 긴 렌즈 빛 ─── */
const FLAME_STOPS: [number, number, number, number][] = [
  // [위치, r, g, b]
  [0, 255, 252, 240],
  [0.12, 255, 236, 180],
  [0.35, 255, 190, 90],
  [0.6, 255, 128, 44],
  [1, 200, 60, 26],
];
function flameColor(k: number): [number, number, number] {
  for (let i = 0; i < FLAME_STOPS.length - 1; i++) {
    const [a, r0, g0, b0] = FLAME_STOPS[i], [b, r1, g1, b1] = FLAME_STOPS[i + 1];
    if (k <= b) {
      const m = (k - a) / (b - a);
      return [r0 + (r1 - r0) * m, g0 + (g1 - g0) * m, b0 + (b1 - b0) * m];
    }
  }
  return [200, 60, 26];
}
const nz = (x: number) => Math.sin(x) * 0.5 + Math.sin(x * 2.3 + 1.7) * 0.3 + Math.sin(x * 5.1 + 0.4) * 0.2;

function blob(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, c: [number, number, number], a: number) {
  if (r < 0.5 || a <= 0.003) return;
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a})`);
  g.addColorStop(0.45, `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${a * 0.45})`);
  g.addColorStop(1, `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},0)`);
  ctx.fillStyle = g;
  ctx.fillRect(x - r, y - r, r * 2, r * 2);
}

function drawFlame(ctx: CanvasRenderingContext2D, v: View, at: (u: number) => Vec3, ax: Vec3, pose: Pose, t: number, scale: number, bloom = 1) {
  // 착륙 화염 — 굵은 기둥(예전의 세 배). 덩어리를 촘촘히 겹쳐 끊김 없이, 겹마다 색이 다르다.
  // 빛은 노즐 아래쪽에만 — 위로 번지면 화염이 로켓 쪽으로 거꾸로 올라가는 것처럼 보인다.
  const th = pose.th;
  const fade = clamp(pose.fade ?? 1);
  const fl = (0.88 + 0.12 * nz(t * 31)) * (0.35 + 0.65 * fade); // 사그라들수록 짧게
  const hAbove = pose.y * SCALE + LIFT;
  const full = (0.06 + 0.17 * th) * fl * scale;
  const len = Math.min(full, Math.max(0.008, hAbove + 0.004));
  const n0 = v.p(at(0));
  const tip = v.p(add(at(0), mul(ax, -len)));
  const W = 0.0078 * 3 * scale * n0.s; // 노즐 출구 반폭 × 3
  const dx = tip.x - n0.x, dy = tip.y - n0.y, Lp = Math.hypot(dx, dy) || 1;
  const nx = -dy / Lp, ny = dx / Lp;
  ctx.save();
  ctx.globalAlpha = fade * fade;
  ctx.globalCompositeOperation = 'lighter';
  // 바깥 빛무리 — 기둥 아래쪽 가운데에, 기둥 방향으로 길쭉하게
  ctx.save();
  ctx.translate(n0.x + dx * 0.62, n0.y + dy * 0.62);
  ctx.rotate(Math.atan2(dy, dx));
  ctx.scale(1, 0.62);
  blob(ctx, 0, 0, Math.min(v.h * 0.35, Math.max(Lp * 0.75, W * 3)), [255, 140, 60], 0.24 * th * bloom);
  ctx.restore();
  // 기둥 — 세 겹(바깥 주황 · 가운데 노랑 · 흰 심), 촘촘히
  const layers: [number, number, number, number][] = [
    // [굵기 배수, 길이 비율, 시작 색 위치, 세기]
    [1.0, 1.0, 0.35, 0.22],
    [0.62, 0.86, 0.12, 0.3],
    [0.3, 0.5, 0, 0.55],
  ];
  for (const [wk, lk, c0, a0] of layers) {
    const N = 34;
    for (let i = N - 1; i >= 0; i--) {
      const k = (i / (N - 1)) * lk;
      const wob = nz(t * 19 + i * 0.9 + wk * 7) * W * 0.18 * k;
      const x = n0.x + dx * k + nx * wob, y = n0.y + dy * k + ny * wob;
      const r = W * wk * (0.75 + 1.1 * k) * (0.92 + 0.12 * nz(t * 37 + i * 1.3));
      blob(ctx, x, y, r, flameColor(Math.min(1, c0 + k * (1 - c0))), a0 * (1 - 0.7 * (k / lk)) * (0.65 + 0.35 * th));
    }
  }
  // 충격파 무늬
  for (let i = 1; i <= 4; i++) {
    const k = i * 0.11;
    ctx.fillStyle = `rgba(255,240,215,${(0.36 - i * 0.07) * th})`;
    ctx.beginPath();
    ctx.ellipse(n0.x + dx * k, n0.y + dy * k, W * 0.3, W * 0.14, Math.atan2(ny, nx), 0, Math.PI * 2);
    ctx.fill();
  }
  // 렌즈 빛 — 노즐을 지나는 가로 줄
  const fw = W * (10 + 8 * th);
  const lg = ctx.createLinearGradient(n0.x - fw, 0, n0.x + fw, 0);
  lg.addColorStop(0, 'rgba(255,170,90,0)');
  lg.addColorStop(0.5, `rgba(255,214,170,${0.3 * th})`);
  lg.addColorStop(1, 'rgba(255,170,90,0)');
  ctx.fillStyle = lg;
  ctx.fillRect(n0.x - fw, n0.y + dy * 0.2 - W * 0.06, fw * 2, W * 0.12 * bloom);
  // 바닥에 닿은 불 — 납작한 빛 판 + 사방으로 기어 나가는 불 혀(기둥이 굵어진 만큼 넓게)
  if (full > hAbove) {
    const over = full - hAbove;
    const gx = pose.x * SCALE, gz = pose.z ?? 0;
    const c = v.p([gx, 0.001, gz]);
    const flat = clamp(Math.sin(v.cam.el), 0.12, 1);
    const R = (0.05 + over * 3.4) * c.s;
    ctx.save();
    ctx.translate(c.x, c.y);
    ctx.scale(1, flat);
    blob(ctx, 0, 0, R, [255, 228, 175], 0.6 * bloom);
    blob(ctx, 0, 0, R * 1.9, [255, 130, 50], 0.25 * bloom);
    ctx.restore();
    const J = 16;
    for (let j = 0; j < J; j++) {
      const a = (j / J) * Math.PI * 2 + nz(t * 3 + j) * 0.25;
      const reach = 0.06 + over * (3 + 2 * (0.5 + 0.5 * nz(t * 17 + j * 2.7)));
      for (let m = 1; m <= 6; m++) {
        const k = m / 6;
        const p = v.p([gx + Math.cos(a) * reach * k, 0.004 + k * 0.008, gz + Math.sin(a) * reach * k]);
        blob(ctx, p.x, p.y, (0.02 + 0.03 * k) * p.s, flameColor(0.25 + k * 0.6), 0.28 * (1 - k * 0.6) * (0.5 + 0.5 * bloom));
      }
    }
  }
  ctx.restore();
}

/* ─── 입자 — 태어난 시각 · 자리만 기억하고, 그리는 순간 위치를 계산한다(휠로 되감아도 같은 그림)
   kind 0 바닥 먼지(분사가 바닥을 때려 번지는 것) · 1 공중 연기(지나온 자리에 남는 줄기) · 2 접지 먼지 폭발
   3 불티(가산 · 짧은 줄) · 4 파편(어두운 알갱이 · 포물선 · 떨어져 미끄러짐) · 5 접지 충격 고리 ─── */
export type Puff = { ts: number; x: number; y: number; kind: 0 | 1 | 2 | 3 | 4 | 5; seed: number; pow: number };

/** 화면이 작거나 픽셀이 많으면 입자를 덜 그린다(1 = 전부) */
let density = 1;
export function setFxDensity(d: number) {
  density = clamp(d, 0.25, 1);
}

export function emit(list: Puff[], t: number, f: { x: number; y: number; th: number; on: boolean }, n: number, seed: number) {
  if (!f.on || f.th <= 0 || n <= 0) return;
  const hy = f.y * SCALE + LIFT;
  const x = f.x * SCALE;
  const push = (kind: Puff['kind'], k: number, y = hy) => {
    for (let i = 0; i < k; i++) list.push({ ts: t, x, y, kind, seed: seed * 131 + kind * 10007 + i, pow: f.th });
  };
  // 작은 입자를 많이 — 연기는 노즐 아래로 뿜어져 내려가고(로켓보다 빨리), 바닥에 닿으면 퍼진다
  push(1, 8 * n);
  push(3, 8 * n); // 불티
  const near = clamp(1 - hy / 0.38);
  if (near > 0) {
    push(0, Math.round(44 * n * f.th * near + 4), 0);
    push(4, Math.round(28 * n * f.th * near), 0);
  }
}
export function burst(list: Puff[], t: number, x: number, n: number, seed: number) {
  const X = x * SCALE;
  for (let i = 0; i < n * 24; i++) list.push({ ts: t, x: X, y: 0.004, kind: 2, seed: seed * 13 + i, pow: 1 });
  for (let i = 0; i < n * 16; i++) list.push({ ts: t, x: X, y: 0, kind: 4, seed: seed * 17 + 50000 + i, pow: 1.3 });
  list.push({ ts: t, x: X, y: 0, kind: 5, seed, pow: 1 });
}

/* 구름 스프라이트 — 값 노이즈 fBm × 둥근 감쇠. 네 가지 모양을 한 번 만들고 색마다 칠한 사본을 둔다 */
const sprites: HTMLCanvasElement[] = [];
const tinted = new Map<string, HTMLCanvasElement>();
function makeSprites() {
  if (sprites.length || typeof document === 'undefined') return;
  const S = 96;
  for (let vtx = 0; vtx < 4; vtx++) {
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const g = c.getContext('2d')!;
    const d = g.createImageData(S, S);
    const rnd = (ix: number, iy: number, o: number) => hash(ix * 57.1 + iy * 131.7 + o * 17.3 + vtx * 977);
    const vn = (x: number, y: number, o: number) => {
      const ix = Math.floor(x), iy = Math.floor(y), fx = x - ix, fy = y - iy;
      const sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
      const a = rnd(ix, iy, o), b = rnd(ix + 1, iy, o), c2 = rnd(ix, iy + 1, o), e = rnd(ix + 1, iy + 1, o);
      return a + (b - a) * sx + (c2 - a) * sy + (a - b - c2 + e) * sx * sy;
    };
    for (let y = 0; y < S; y++)
      for (let x = 0; x < S; x++) {
        const u = x / S - 0.5, w = y / S - 0.5;
        const r = Math.hypot(u, w) * 2;
        let n = 0, amp = 0.5, fr = 3;
        for (let o = 0; o < 4; o++) {
          n += vn(x / S * fr + 10, y / S * fr + 10, o) * amp;
          amp *= 0.5;
          fr *= 2;
        }
        const edge = clamp(1 - r * (0.75 + 0.5 * n));
        const a = Math.pow(edge, 1.25) * (0.35 + 0.95 * n * n * 1.6);
        const i = (y * S + x) * 4;
        const shade = 200 + 55 * (1 - w * 1.2) * n; // 위가 밝고 아래가 어둡다
        d.data[i] = d.data[i + 1] = d.data[i + 2] = Math.min(255, shade);
        d.data[i + 3] = Math.round(clamp(a) * 255);
      }
    g.putImageData(d, 0, 0);
    sprites.push(c);
  }
}
/** 색을 입힌 구름 한 장 — 하루 섹션(발사 연기 기둥)도 쓴다 */
export function cloudSprite(variant: number, rgb: number[]): HTMLCanvasElement | null {
  makeSprites();
  if (!sprites.length) return null;
  const vi = ((variant % 4) + 4) % 4;
  const key = `${vi}:${rgb[0] | 0},${rgb[1] | 0},${rgb[2] | 0}`;
  let c = tinted.get(key);
  if (!c) {
    c = document.createElement('canvas');
    c.width = c.height = 96;
    const g = c.getContext('2d')!;
    g.drawImage(sprites[vi], 0, 0);
    g.globalCompositeOperation = 'multiply';
    g.fillStyle = `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
    g.fillRect(0, 0, 96, 96);
    g.globalCompositeOperation = 'destination-in';
    g.drawImage(sprites[vi], 0, 0);
    tinted.set(key, c);
  }
  return c;
}

/* 그리기 — 입자는 작게(예전의 30%) · 많이(네 배) · 진하게. 수천 개라 회전 없이 drawImage 한 번씩, 숫자 기록만 모아 정렬한다 */
type Rec = { z: number; x: number; y: number; r: number; a: number; sq: number; spr: HTMLCanvasElement | null; lit: number };
const SZ = 0.3; // 크기 배율

export function drawPuffs(
  ctx: CanvasRenderingContext2D,
  v: View,
  list: Puff[],
  t: number,
  place: Place,
  dustRGB?: number[],
  smokeRGB?: number[],
  light?: { x: number; y: number; z: number; power: number } | null,
  pass: { split: number; side: 'back' | 'front' } | null = null,
) {
  const keep = (z: number) => !pass || (pass.side === 'back' ? z > pass.split : z <= pass.split);
  const capR = ctx.canvas.height * 0.08;
  const dust = dustRGB ?? (place === 'desk' ? [120, 100, 84] : place === 'bench' ? [150, 130, 120] : [175, 180, 186]);
  const smoke = smokeRGB ?? [205, 200, 196];
  const grit = [Math.max(0, dust[0] - 70), Math.max(0, dust[1] - 70), Math.max(0, dust[2] - 70)];
  const flat = clamp(Math.sin(v.cam.el), 0.15, 1);
  const dustSpr = [0, 1, 2, 3].map((i) => cloudSprite(i, dust));
  const smokeSpr = [0, 1, 2, 3].map((i) => cloudSprite(i, smoke));
  const recs: Rec[] = [];
  const sparks: number[] = []; // x1, y1, x2, y2, k, w
  const grits: number[] = []; // x, y, s, a, shade
  const rings: { x: number; y: number; r: number; k: number; z: number }[] = [];
  const litOf = (x: number, y: number, z: number, fall: number) =>
    light && y < light.y ? light.power * Math.exp(-Math.hypot(x - light.x, y - light.y, z - light.z) / fall) : 0;
  for (const p of list) {
    const age = t - p.ts;
    if (age < 0) continue;
    if (p.kind !== 5 && hash(p.seed + 0.37) > density) continue;
    const a1 = hash(p.seed) * Math.PI * 2;
    const r1 = hash(p.seed + 1), r2 = hash(p.seed + 2), r3 = hash(p.seed + 3);
    if (p.kind === 0 || p.kind === 2) {
      const big = p.kind === 2;
      const life = big ? 3.2 + r3 * 2 : 2.4 + r3 * 1.6;
      if (age > life) continue;
      const v0 = (big ? 0.25 + 0.95 * r1 * r1 : 0.18 + 0.6 * r1 * r1) * (0.6 + 0.5 * p.pow);
      const kk = 1.5 + r2 * 1.3;
      const d = 0.03 + (v0 / kk) * (1 - Math.exp(-kk * age));
      const x = p.x + Math.cos(a1) * d, z = Math.sin(a1) * d;
      const y = 0.003 + age * (0.005 + 0.024 * r2 * r2) + (big ? 0.003 : 0);
      const size = SZ * ((big ? 0.02 : 0.012) + age * (big ? 0.034 + 0.05 * r3 : 0.018 + 0.03 * r3));
      const k = age / life;
      const a = Math.min(0.95, (k < 0.05 ? k / 0.05 : 1) * Math.pow(1 - k, 1.3) * (big ? 0.95 : 0.6));
      const q = v.p([x, y, z]);
      if (!keep(q.z)) continue;
      recs.push({ z: q.z, x: q.x, y: q.y, r: Math.min(capR, size * q.s), a, sq: 0.6 + 0.3 * flat, spr: dustSpr[p.seed & 3], lit: litOf(x, y, z, 0.07) });
    } else if (p.kind === 1) {
      // 노즐 아래로 뿜어져 로켓보다 빨리 내려가고, 바닥에 닿으면 옆으로 퍼진다
      const life = 1.8 + r3 * 1.6;
      if (age > life) continue;
      const vy = 0.32 + 0.34 * r1;
      const y0 = Math.max(0.004, p.y - 0.015);
      const tg = y0 / vy;
      let x = p.x + Math.cos(a1) * 0.006, z = Math.sin(a1) * 0.006, y: number;
      if (age < tg) {
        y = y0 - vy * age;
        x += Math.cos(a1) * age * 0.03;
        z += Math.sin(a1) * age * 0.03;
      } else {
        const ta = age - tg;
        const dd = (0.12 + 0.22 * r2) * (1 - Math.exp(-2.4 * ta));
        x += Math.cos(a1) * dd;
        z += Math.sin(a1) * dd;
        y = 0.004 + ta * 0.012 * r2;
      }
      const size = SZ * (0.012 + age * (0.02 + 0.022 * r1));
      const k = age / life;
      const a = Math.min(0.9, (k < 0.08 ? k / 0.08 : 1) * Math.pow(1 - k, 1.2) * 0.5);
      const q = v.p([x, y, z]);
      if (!keep(q.z)) continue;
      recs.push({ z: q.z, x: q.x, y: q.y, r: Math.min(capR, size * q.s), a, sq: 1, spr: smokeSpr[(p.seed >> 2) & 3], lit: litOf(x, y, z, 0.06) });
    } else if (p.kind === 3) {
      const life = 0.25 + r3 * 0.4;
      if (age > life) continue;
      const sp = 0.35 + 0.6 * r1;
      const vx = Math.cos(a1) * (0.06 + 0.26 * r2), vz = Math.sin(a1) * (0.06 + 0.26 * r2);
      let y = p.y - 0.02 - sp * age - 0.6 * age * age;
      let x = p.x + vx * age, z = vz * age;
      if (y < 0.002) {
        const tg = Math.max(0, age - p.y / sp);
        x += vx * tg * 2;
        z += vz * tg * 2;
        y = 0.002 + Math.abs(Math.sin(tg * 22)) * 0.006 * (1 - age / life);
      }
      const q = v.p([x, y, z]);
      if (!keep(q.z)) continue;
      const q2 = v.p([x - vx * 0.012, y + sp * 0.006, z - vz * 0.012]);
      sparks.push(q2.x, q2.y, q.x, q.y, age / life, Math.max(0.5, Math.min(1, 0.00035 * q.s)));
    } else if (p.kind === 4) {
      const life = 1.4 + r3 * 1.2;
      if (age > life) continue;
      const hv = (0.15 + 0.6 * r1) * p.pow, vy0 = (0.25 + 0.75 * r2) * p.pow;
      const tLand = (2 * vy0) / 9.8;
      let x: number, z: number, y: number;
      if (age < tLand) {
        x = p.x + Math.cos(a1) * (0.03 + hv * age);
        z = Math.sin(a1) * (0.03 + hv * age);
        y = vy0 * age - 4.9 * age * age;
      } else {
        const ta = age - tLand;
        const dd = 0.03 + hv * tLand + (hv * 0.35 / 4) * (1 - Math.exp(-4 * ta));
        x = p.x + Math.cos(a1) * dd;
        z = Math.sin(a1) * dd;
        y = 0;
      }
      const q = v.p([x, Math.max(0.001, y), z]);
      if (!keep(q.z)) continue;
      const k = age / life;
      grits.push(q.x, q.y, Math.max(0.5, Math.min(1.6, SZ * (0.0008 + 0.0026 * r3 * r3) * q.s)), k > 0.75 ? (1 - k) / 0.25 : 1, r1 > 0.85 ? 50 : -20 * r2);
    } else if (p.kind === 5) {
      const life = 0.9;
      if (age > life) continue;
      const k = age / life;
      const c = v.p([p.x, 0.002, 0]);
      if (!keep(c.z)) continue;
      rings.push({ x: c.x, y: c.y, r: (0.05 + 0.32 * (1 - Math.pow(1 - k, 2.2))) * c.s, k, z: c.z });
    }
  }
  // 파편 — 아주 작은 점
  for (let i = 0; i < grits.length; i += 5) {
    const sh = grits[i + 4];
    ctx.globalAlpha = grits[i + 3];
    ctx.fillStyle = `rgb(${Math.max(0, Math.round(grit[0] + sh))},${Math.max(0, Math.round(grit[1] + sh))},${Math.max(0, Math.round(grit[2] + sh))})`;
    const sz = grits[i + 2];
    ctx.fillRect(grits[i] - sz, grits[i + 1] - sz * 0.7, sz * 2, sz * 1.4);
  }
  ctx.globalAlpha = 1;
  for (const g of rings) {
    ctx.save();
    ctx.translate(g.x, g.y);
    ctx.scale(1, flat);
    const gr = ctx.createRadialGradient(0, 0, g.r * 0.7, 0, 0, g.r);
    gr.addColorStop(0, `rgba(${dust[0]},${dust[1]},${dust[2]},0)`);
    gr.addColorStop(0.8, `rgba(${dust[0]},${dust[1]},${dust[2]},${0.55 * (1 - g.k)})`);
    gr.addColorStop(1, `rgba(${dust[0]},${dust[1]},${dust[2]},0)`);
    ctx.fillStyle = gr;
    ctx.beginPath();
    ctx.arc(0, 0, g.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  // 구름 — 먼 것부터
  recs.sort((a, b) => b.z - a.z);
  for (const r of recs) {
    if (!r.spr || r.r < 0.4 || r.a < 0.004) continue;
    ctx.globalAlpha = r.a;
    ctx.drawImage(r.spr, r.x - r.r, r.y - r.r * r.sq, r.r * 2, r.r * 2 * r.sq);
  }
  // 엔진 빛을 받은 쪽 — 주황을 더한다(노즐 아래 입자만)
  const warm = cloudSprite(3, [255, 150, 70]);
  if (warm) {
    ctx.globalCompositeOperation = 'lighter';
    for (const r of recs) {
      if (r.lit < 0.03 || r.r < 0.4) continue;
      ctx.globalAlpha = Math.min(0.5, r.lit * r.a * 1.1);
      ctx.drawImage(warm, r.x - r.r, r.y - r.r * r.sq, r.r * 2, r.r * 2 * r.sq);
    }
  }
  // 불티
  ctx.globalCompositeOperation = 'lighter';
  for (let i = 0; i < sparks.length; i += 6) {
    const k = sparks[i + 4];
    ctx.globalAlpha = 1;
    ctx.strokeStyle = `rgba(255,${(200 + 55 * (1 - k)) | 0},${(110 + 90 * (1 - k)) | 0},${(1 - k) * 0.85})`;
    ctx.lineWidth = sparks[i + 5];
    ctx.beginPath();
    ctx.moveTo(sparks[i], sparks[i + 1]);
    ctx.lineTo(sparks[i + 2], sparks[i + 3]);
    ctx.stroke();
  }
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
}


/** 엔진이 켜져 있으면 노즐 아래 빛 — 연기 · 먼지의 그쪽 면을 주황으로 */
function engineLight(p: Pose) {
  if (!p.on || p.th <= 0) return null;
  return { x: p.x * SCALE, y: Math.max(0.01, p.y * SCALE), z: p.z ?? 0, power: p.th * clamp(p.fade ?? 1) };
}

/* ─── 사진 판 — 폰 카메라가 보는 실제 장소 ─── */
export type Plate = {
  img: HTMLImageElement | null; // 아직 안 받았으면 null → 그림 배경으로
  iw: number;
  ih: number;
  px: number; // 패드 중심이 맺히는 자리(사진 비율 0…1)
  py: number;
  el: number; // 카메라 → 패드 내려다보는 각(rad)
  dist: number; // 카메라 → 패드 거리(m)
  fovY: number; // 사진 세로 화각(rad)
  yaw?: number;
  tint: [number, number, number, number]; // 합성한 물건에 덮는 장소 빛(r, g, b, 세기)
  dust: number[];
  smoke: number[];
  glow: [number, number, number]; // 엔진 빛이 바닥을 비추는 색
  bloom?: number; // 밝은 장소일수록 낮춘다(빛 번짐이 사진을 하얗게 덮지 않게)
};

/** 격납고 무대의 한 벌 — 기체 종류 · 도색 · 패드 스킨 · 모양 · 발사대(k = 물러난 정도) */
export type Look = { cls: VCls; liv: Livery; skin: PadSkin; shape: PadShape; mount: Mount | null; mountK: number };

export type PlateCam = { zoom: number; look: number; anchorY?: number }; // look 0…1 = 위로 올려다보는 정도

/** 사진을 화면에 덮어 그릴 자리와 그에 맞는 카메라 */
export function placePlate(v: View, cw: number, ch: number, pl: Plate, pc: PlateCam) {
  const s0 = Math.max(cw / pl.iw, ch / pl.ih) * pc.zoom;
  const W = pl.iw * s0, H = pl.ih * s0;
  const ax = cw / 2, ay = ch * (pc.anchorY ?? 0.66);
  let ox = ax - pl.px * W, oy = ay - pl.py * H;
  ox = Math.min(0, Math.max(cw - W, ox));
  oy = Math.min(0, Math.max(ch - H, oy));
  // 올려다보기: 사진 위쪽 남는 만큼 아래로 민다(폰을 드는 것)
  oy = oy + (0 - oy) * Math.min(1, Math.max(0, pc.look));
  const F = H / 2 / Math.tan(pl.fovY / 2);
  v.setPlate(cw, ch, pl.el, pl.dist, F, ox + pl.px * W, oy + pl.py * H, pl.yaw ?? 0);
  return { ox, oy, W, H };
}

let layer: HTMLCanvasElement | null = null;
let grain: HTMLCanvasElement | null = null;
function getLayer(w: number, h: number) {
  if (!layer) layer = document.createElement('canvas');
  if (layer.width !== w || layer.height !== h) {
    layer.width = w;
    layer.height = h;
  }
  return layer;
}
function getGrain() {
  if (grain) return grain;
  grain = document.createElement('canvas');
  grain.width = grain.height = 256;
  const g = grain.getContext('2d')!;
  const d = g.createImageData(256, 256);
  for (let i = 0; i < d.data.length; i += 4) {
    const n = 128 + (Math.random() - 0.5) * 90;
    d.data[i] = d.data[i + 1] = d.data[i + 2] = n;
    d.data[i + 3] = 255;
  }
  g.putImageData(d, 0, 0);
  return grain;
}

/** 사진 위에 AR 로 합성 — 사진 · 바닥 빛 · (패드 · 그림자 · 기체 → 장소 빛으로 색 보정) · 불꽃 · 연기 · 그레인 · 비네트 */
function drawOnPlate(
  ctx: CanvasRenderingContext2D,
  v: View,
  pl: Plate,
  rect: { ox: number; oy: number; W: number; H: number },
  o: { pose: Pose; t: number; clock: number; puffs: Puff[]; hint?: number | null; hintNow?: boolean; liv?: Livery; ringR?: number; parked?: number | null; padAlpha?: number; look?: Look },
) {
  const { width: cw, height: ch } = ctx.canvas;
  ctx.drawImage(pl.img!, rect.ox, rect.oy, rect.W, rect.H);
  const hAbove = o.pose.y * SCALE;
  const bloom = pl.bloom ?? 1;
  const glow = (o.pose.on ? o.pose.th * clamp(1 - hAbove / 0.5) * clamp(o.pose.fade ?? 1) : 0) * bloom;
  // 엔진 빛이 실제 바닥을 비춘다(사진 위에 더하기)
  if (glow > 0.01) {
    const c = v.p([o.pose.x * SCALE, 0, o.pose.z ?? 0]);
    const rr = 0.26 * c.s;
    const g = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, rr);
    const [r, gg, b] = pl.glow;
    g.addColorStop(0, `rgba(${r},${gg},${b},${0.42 * glow})`);
    g.addColorStop(0.35, `rgba(${r},${gg},${b},${0.16 * glow})`);
    g.addColorStop(1, `rgba(${r},${gg},${b},0)`);
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    // 바닥에 누운 빛 — 원 그라디언트를 납작하게 눌러 가장자리 선이 생기지 않게
    ctx.translate(c.x, c.y);
    ctx.scale(1, clamp(Math.sin(v.cam.el) + 0.1, 0.2, 1));
    ctx.translate(-c.x, -c.y);
    ctx.fillStyle = g;
    ctx.fillRect(c.x - rr, c.y - rr, rr * 2, rr * 2);
    ctx.restore();
  }
  // 합성할 물건은 따로 그려 장소 빛을 입힌다
  const L = getLayer(cw, ch);
  const lc = L.getContext('2d')!;
  lc.clearRect(0, 0, cw, ch);
  // 패드가 바닥에 닿는 접지 그림자
  const c0 = v.p([0, 0, 0]);
  const pr = PAD_R * 1.18 * c0.s, k = clamp(Math.sin(v.cam.el), 0.12, 1);
  const sg = lc.createRadialGradient(c0.x, c0.y + pr * k * 0.12, pr * 0.6, c0.x, c0.y + pr * k * 0.12, pr * 1.15);
  sg.addColorStop(0, 'rgba(0,0,0,.55)');
  sg.addColorStop(1, 'rgba(0,0,0,0)');
  lc.save();
  lc.translate(c0.x, c0.y);
  lc.scale(1, k);
  lc.translate(-c0.x, -c0.y);
  lc.fillStyle = sg;
  lc.beginPath();
  lc.arc(c0.x, c0.y + pr * 0.12, pr * 1.15, 0, Math.PI * 2);
  lc.fill();
  lc.restore();
  const lk = o.look;
  const cls = lk?.cls ?? 'standard';
  const split = dot(sub(boosterBase(o.pose), v.E), v.f);
  lc.globalAlpha = o.padAlpha ?? 1;
  const padFront = drawPadStyled(lc, v, lk?.skin ?? HOUSE_SKIN, lk?.shape ?? 'round', glow * 0.6, o.hint ?? null, !!o.hintNow, o.ringR, split);
  lc.globalAlpha = 1;
  drawShadow(lc, v, o.pose.x * SCALE, hAbove, o.pose.z ?? 0);
  const mb = lk?.mount ? mountBoxes(lk.mount, cls, lk.mountK) : null;
  if (mb) drawMount(lc, v, mb, split, 'back');
  if (o.parked != null) drawBooster(lc, v, { x: o.parked, y: 0, lean: 0, legs: 1, th: 0, on: false, soot: 0.4 }, o.clock, { hull: '#d8d4cc', accent: '#9aa0a6' });
  drawBooster(lc, v, o.pose, o.clock, lk?.liv ?? o.liv, 1, false, cls);
  padFront.forEach((f) => f());
  if (mb) drawMount(lc, v, mb, split, 'front');
  // 장소 빛 — 물건만(source-atop)
  const [tr, tg, tb, ta] = pl.tint;
  lc.globalCompositeOperation = 'source-atop';
  lc.fillStyle = `rgba(${tr},${tg},${tb},${ta})`;
  lc.fillRect(0, 0, cw, ch);
  // 엔진 빛이 동체 아래를 비춘다
  if (glow > 0.01) {
    const n = v.p([o.pose.x * SCALE, hAbove + 0.02, o.pose.z ?? 0]);
    const gg = lc.createRadialGradient(n.x, n.y, 0, n.x, n.y, 0.06 * n.s);
    gg.addColorStop(0, `rgba(255,170,80,${0.5 * glow})`);
    gg.addColorStop(1, 'rgba(255,170,80,0)');
    lc.globalCompositeOperation = 'source-atop';
    lc.fillStyle = gg;
    lc.fillRect(0, 0, cw, ch);
  }
  lc.globalCompositeOperation = 'source-over';
  // 기체보다 먼 입자는 기체 뒤에, 가까운 입자는 앞에
  const pz = v.p(boosterBase(o.pose)).z;
  drawPuffs(ctx, v, o.puffs, o.t, 'desk', pl.dust, pl.smoke, engineLight(o.pose), { split: pz, side: 'back' });
  ctx.drawImage(L, 0, 0);
  drawFlameOnly(ctx, v, o.pose, o.clock, 1, bloom, cls);
  drawPuffs(ctx, v, o.puffs, o.t, 'desk', pl.dust, pl.smoke, engineLight(o.pose), { split: pz, side: 'front' });
  // 폰 카메라 느낌 — 그레인 · 비네트
  ctx.save();
  ctx.globalAlpha = 0.045;
  ctx.globalCompositeOperation = 'overlay';
  const pat = ctx.createPattern(getGrain(), 'repeat');
  if (pat) {
    const gx = Math.floor(Math.random() * 256), gy = Math.floor(Math.random() * 256);
    ctx.translate(-gx, -gy);
    ctx.fillStyle = pat;
    ctx.fillRect(gx, gy, cw, ch);
  }
  ctx.restore();
  const vg = ctx.createRadialGradient(cw / 2, ch / 2, Math.min(cw, ch) * 0.35, cw / 2, ch / 2, Math.hypot(cw, ch) * 0.62);
  vg.addColorStop(0, 'rgba(0,0,0,0)');
  vg.addColorStop(1, 'rgba(0,0,0,.42)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, cw, ch);
}

export function drawFrame(
  ctx: CanvasRenderingContext2D,
  v: View,
  o: {
    place: Place;
    pose: Pose;
    t: number;
    clock?: number;
    puffs: Puff[];
    hint?: number | null;
    hintNow?: boolean;
    liv?: Livery;
    ringR?: number;
    parked?: number | null;
    plate?: Plate | null;
    plateCam?: PlateCam;
    padAlpha?: number;
    look?: Look;
  },
) {
  const clock = o.clock ?? o.t;
  if (o.plate?.img) {
    const rect = placePlate(v, ctx.canvas.width, ctx.canvas.height, o.plate, o.plateCam ?? { zoom: 1, look: 0 });
    drawOnPlate(ctx, v, o.plate, rect, { ...o, clock });
    return;
  }
  drawPlace(ctx, v, o.place, clock);
  const hAbove = o.pose.y * SCALE;
  const glow = o.pose.on ? o.pose.th * clamp(1 - hAbove / 0.45) * clamp(o.pose.fade ?? 1) : 0;
  drawPad(ctx, v, glow, o.hint ?? null, !!o.hintNow, o.ringR);
  drawShadow(ctx, v, o.pose.x * SCALE, hAbove, o.pose.z ?? 0);
  if (o.parked != null) drawBooster(ctx, v, { x: o.parked, y: 0, lean: 0, legs: 1, th: 0, on: false, soot: 0.4 }, clock, { hull: '#d8d4cc', accent: '#9aa0a6' });
  // 입자는 기체 뒤 · 앞을 섞어야 하지만, 대부분 바닥이라 기체 앞에 한 번에 그려도 자연스럽다
  drawBooster(ctx, v, o.pose, clock, o.liv);
  drawPuffs(ctx, v, o.puffs, o.t, o.place, undefined, undefined, engineLight(o.pose));
}
