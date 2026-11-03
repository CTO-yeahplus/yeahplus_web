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
const BL = 0.24; // 길이
const LIFT = 0.012; // 서 있을 때 노즐이 바닥에서 뜬 높이
const HINGE = 0.045; // 다리 경첩
export const PAD_R = 0.105; // 앞마당 반지름
export const RING_R = 0.08; // 판정 고리(패드 반지름 20m × 1/250)

export type Livery = { hull: string; accent: string; bands?: [number, number, string][]; stripes?: string };
export const STD: Livery = { hull: '#F1F2F0', accent: LOOK.lime };

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
      const z0 = -0.27 + i * 0.105, z1 = z0 + 0.09;
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

/* ─── 패드 ─── */
export function drawPad(ctx: CanvasRenderingContext2D, v: View, glow = 0, ringHint: number | null = null, hintNow = false, ringR = RING_R) {
  const N = 64;
  const circ = (r: number, y = 0.0005): Vec3[] => Array.from({ length: N }, (_, i) => [Math.cos((i / N) * Math.PI * 2) * r, y, Math.sin((i / N) * Math.PI * 2) * r]);
  // 두께
  poly(ctx, v, circ(PAD_R, -0.003));
  ctx.fillStyle = '#121316';
  ctx.fill();
  poly(ctx, v, circ(PAD_R, 0.001));
  ctx.fillStyle = '#26282d';
  ctx.fill();
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
  // 가운데 셰브런(예아플러스 방패 줄 셋)
  ctx.fillStyle = 'rgba(244,246,248,.92)';
  for (let i = 0; i < 3; i++) {
    const z0 = -0.024 + i * 0.017;
    poly(ctx, v, [[-0.03, 0.0018, z0 + 0.012], [0.0, 0.0018, z0 - 0.004], [0.034, 0.0018, z0 + 0.008], [0.034, 0.0018, z0 + 0.016], [0.0, 0.0018, z0 + 0.004], [-0.03, 0.0018, z0 + 0.02]]);
    ctx.fill();
  }
  // 가장자리 글자
  const txt = 'ROCKET PARKING · YEAHPLUS · ';
  ctx.fillStyle = 'rgba(244,246,248,.75)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < txt.length; i++) {
    const a = -(i / txt.length) * Math.PI * 2 + 2.2;
    const q = v.p([Math.cos(a) * 0.093, 0.002, Math.sin(a) * 0.093]);
    ctx.font = `800 ${Math.max(5, q.s * 0.0085)}px ui-monospace,Menlo,monospace`;
    ctx.fillText(txt[i], q.x, q.y);
  }
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
export type Pose = { x: number; y: number; lean: number; legs: number; th: number; on: boolean; soot?: number; z?: number };

export function boosterBase(f: Frame | Pose): Vec3 {
  return [f.x * SCALE, f.y * SCALE + LIFT, (f as Pose).z ?? 0];
}

export function drawBooster(ctx: CanvasRenderingContext2D, v: View, pose: Pose, t: number, liv: Livery = STD, scale = 1) {
  const O = boosterBase(pose);
  const ax: Vec3 = [Math.sin(pose.lean), Math.cos(pose.lean), 0];
  const side: Vec3 = [Math.cos(pose.lean), -Math.sin(pose.lean), 0];
  const at = (u: number): Vec3 => add(O, mul(ax, u * scale));
  const P0 = v.p(at(0)), P1 = v.p(at(BL));
  let dx = P1.x - P0.x, dy = P1.y - P0.y;
  const dl = Math.hypot(dx, dy) || 1;
  dx /= dl;
  dy /= dl; // 화면 축(아래 → 위)
  const nx = -dy, ny = dx; // 옆
  const k = clamp(Math.abs(dot(ax, v.f)), 0.04, 1);
  const rot = Math.atan2(ny, nx);
  // 원통 앞면이 보이는 쪽: 축 반대(화면 아래)
  const mx = -ny, my = nx; // n 을 +90° 돌린 것
  const frontPos = mx * dx + my * dy < 0;

  const legsBehind: (() => void)[] = [], legsFront: (() => void)[] = [];
  const legCol = '#1d1f23';
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2;
    const dir: Vec3 = add(mul(side, Math.cos(a)), [0, 0, Math.sin(a)]);
    const hinge = add(at(HINGE), mul(dir, BR * scale));
    const dep = clamp(pose.legs);
    // 접힘: 동체를 따라 위로 / 펼침: 바깥 · 아래로 125°
    const ang = (1 - dep) * 0 + dep * ((125 * Math.PI) / 180);
    const len = 0.072 * scale;
    const foot = add(hinge, add(mul(ax, Math.cos(ang) * len), mul(dir, Math.sin(ang) * len)));
    const depth = dot(sub(hinge, v.E), v.f) - dot(sub(O, v.E), v.f);
    const draw = () => {
      const a2 = v.p(hinge), b2 = v.p(foot);
      ctx.strokeStyle = legCol;
      ctx.lineCap = 'round';
      ctx.lineWidth = Math.max(1.2, 0.0042 * scale * a2.s);
      ctx.beginPath();
      ctx.moveTo(a2.x, a2.y);
      ctx.lineTo(b2.x, b2.y);
      ctx.stroke();
      // 버팀대
      const mid = add(hinge, mul(sub(foot, hinge), 0.55));
      const strut = add(at(HINGE + 0.03), mul(dir, BR * scale));
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
    (depth > 0 ? legsBehind : legsFront).push(draw);
  }
  legsBehind.forEach((d) => d());

  const sec = (u0: number, u1: number, r0: number, r1: number, col: string, hi = 0.35) => {
    const a = v.p(at(u0)), b = v.p(at(u1));
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
  sec(0, 0.018, 0.0095, 0.0068, '#2c2e33', 0.2);
  sec(0.018, 0.04, BR, BR, '#3b3d42', 0.2);
  sec(0.04, 0.062, BR, BR, '#5a5048', 0.2);
  sec(0.062, 0.205, BR, BR, soot > 0 ? mix(liv.hull, '#4a4038', soot * 0.6) : liv.hull);
  for (const [u0, u1, c] of liv.bands ?? [
    [0.142, 0.15, liv.accent],
    [0.185, 0.19, liv.accent],
  ])
    sec(u0, u1, BR * 1.003, BR * 1.003, c);
  sec(0.205, BL, BR, 0.0005, liv.hull, 0.45);
  // 격자 날개
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2;
    const dir: Vec3 = add(mul(side, Math.cos(a)), [0, 0, Math.sin(a)]);
    const p1 = v.p(add(at(0.196), mul(dir, BR * scale))), p2 = v.p(add(at(0.196), mul(dir, BR * 1.7 * scale)));
    ctx.strokeStyle = '#4a4d53';
    ctx.lineWidth = Math.max(1, 0.0028 * scale * p1.s);
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
  // 세로 글자
  const mid = v.p(at(0.11));
  const fs = BR * scale * mid.s * 0.55;
  if (fs > 4.5) {
    ctx.save();
    ctx.translate(mid.x, mid.y);
    ctx.rotate(Math.atan2(dy, dx));
    ctx.fillStyle = 'rgba(20,22,26,.8)';
    ctx.font = `800 ${fs}px ui-monospace,Menlo,monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ROCKET PARKING', 0, 0);
    ctx.restore();
  }
  legsFront.forEach((d) => d());

  // 불꽃
  if (pose.on && pose.th > 0) drawFlame(ctx, v, at, ax, pose, t, scale);
}

function mix(a: string, b: string, k: number) {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16);
  const m = (s: number) => Math.round(((A >> s) & 255) * (1 - k) + ((B >> s) & 255) * k);
  return '#' + ((m(16) << 16) | (m(8) << 8) | m(0)).toString(16).padStart(6, '0');
}

function drawFlame(ctx: CanvasRenderingContext2D, v: View, at: (u: number) => Vec3, ax: Vec3, pose: Pose, t: number, scale: number) {
  const fl = 0.85 + 0.15 * Math.sin(t * 61) * Math.sin(t * 37 + 1);
  const hAbove = pose.y * SCALE + LIFT;
  const full = (0.05 + 0.14 * pose.th) * fl * scale;
  const len = Math.min(full, Math.max(0.006, hAbove + 0.004));
  const n0 = v.p(at(0));
  const tip = v.p(add(at(0), mul(ax, -len)));
  const wN = 0.0078 * scale * n0.s;
  ctx.save();
  ctx.globalCompositeOperation = 'lighter';
  const dx = tip.x - n0.x, dy = tip.y - n0.y, L = Math.hypot(dx, dy) || 1;
  const nx = -dy / L, ny = dx / L;
  const lobe = (wk: number, lk: number, c0: string, c1: string) => {
    const tx = n0.x + dx * lk, ty = n0.y + dy * lk;
    const g = ctx.createLinearGradient(n0.x, n0.y, tx, ty);
    g.addColorStop(0, c0);
    g.addColorStop(1, c1);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(n0.x + nx * wN * wk, n0.y + ny * wN * wk);
    ctx.quadraticCurveTo(n0.x + dx * lk * 0.45 + nx * wN * wk * 1.6, n0.y + dy * lk * 0.45 + ny * wN * wk * 1.6, tx, ty);
    ctx.quadraticCurveTo(n0.x + dx * lk * 0.45 - nx * wN * wk * 1.6, n0.y + dy * lk * 0.45 - ny * wN * wk * 1.6, n0.x - nx * wN * wk, n0.y - ny * wN * wk);
    ctx.closePath();
    ctx.fill();
  };
  lobe(1.9, 1.15, 'rgba(255,140,40,.55)', 'rgba(255,60,20,0)');
  lobe(1.25, 0.95, 'rgba(255,200,110,.85)', 'rgba(255,120,40,0)');
  lobe(0.7, 0.6, 'rgba(255,255,240,.95)', 'rgba(170,200,255,0)');
  // 충격파 다이아몬드
  for (let i = 1; i <= 3; i++) {
    const k = i * 0.16;
    if (k > 0.8) break;
    ctx.fillStyle = `rgba(255,240,220,${0.5 - i * 0.12})`;
    ctx.beginPath();
    ctx.ellipse(n0.x + dx * k, n0.y + dy * k, wN * 0.45, wN * 0.25, Math.atan2(ny, nx), 0, Math.PI * 2);
    ctx.fill();
  }
  // 노즐 빛
  const g = ctx.createRadialGradient(n0.x, n0.y, 0, n0.x, n0.y, wN * 9);
  g.addColorStop(0, `rgba(255,190,110,${0.35 * pose.th})`);
  g.addColorStop(1, 'rgba(255,120,40,0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(n0.x, n0.y, wN * 9, 0, Math.PI * 2);
  ctx.fill();
  // 바닥에 닿은 불꽃이 퍼진다
  if (full > hAbove) {
    const c = v.p([pose.x * SCALE, 0.001, pose.z ?? 0]);
    const spread = (full - hAbove) * 1.8 * c.s;
    const sg = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, spread);
    sg.addColorStop(0, 'rgba(255,230,180,.7)');
    sg.addColorStop(0.5, 'rgba(255,140,50,.35)');
    sg.addColorStop(1, 'rgba(255,100,30,0)');
    ctx.fillStyle = sg;
    ctx.beginPath();
    ctx.ellipse(c.x, c.y, spread, spread * clamp(Math.sin(v.cam.el), 0.15, 1), 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/* ─── 입자 — 태어난 시각 · 자리만 기억하고, 그리는 순간 위치를 계산한다(휠로 되감아도 같은 그림) ─── */
export type Puff = { ts: number; x: number; y: number; kind: 0 | 1 | 2; seed: number; pow: number };

export function emit(list: Puff[], t: number, f: { x: number; y: number; th: number; on: boolean }, n: number, seed: number) {
  if (!f.on || f.th <= 0) return;
  const hy = f.y * SCALE + LIFT;
  for (let i = 0; i < n; i++) list.push({ ts: t, x: f.x * SCALE, y: hy, kind: hy < 0.2 ? 0 : 1, seed: seed * 7 + i, pow: f.th });
}
export function burst(list: Puff[], t: number, x: number, n: number, seed: number) {
  for (let i = 0; i < n; i++) list.push({ ts: t, x: x * SCALE, y: 0.005, kind: 2, seed: seed * 13 + i, pow: 1 });
}

export function drawPuffs(ctx: CanvasRenderingContext2D, v: View, list: Puff[], t: number, place: Place) {
  const dust = place === 'desk' ? [120, 100, 84] : place === 'bench' ? [150, 130, 120] : [175, 180, 186];
  const items: { z: number; fn: () => void }[] = [];
  for (const p of list) {
    const age = t - p.ts;
    const life = p.kind === 2 ? 2.8 : 1.9;
    if (age < 0 || age > life) continue;
    const a1 = hash(p.seed) * Math.PI * 2;
    const r1 = hash(p.seed + 1);
    // 아래로 뿜어져 → 바닥에 닿으면 옆으로 퍼진다
    let x = p.x, y = p.y, z = 0;
    let size: number;
    if (p.kind === 2) {
      const d = (0.06 + 0.22 * r1) * (1 - Math.exp(-age * 1.6));
      x += Math.cos(a1) * d;
      z += Math.sin(a1) * d;
      y = 0.004 + age * 0.012 * (0.5 + r1);
      size = 0.012 + age * 0.03;
    } else {
      const vy = 0.9 * (0.6 + p.pow);
      const tg = p.y / vy;
      if (age < tg) {
        y = p.y - vy * age;
        x += Math.cos(a1) * 0.01 * age;
        z += Math.sin(a1) * 0.01 * age;
        size = 0.006 + age * 0.02;
      } else {
        const a = age - tg;
        const d = (0.08 + 0.16 * r1) * (1 - Math.exp(-a * 2.2));
        x += Math.cos(a1) * d;
        z += Math.sin(a1) * d;
        y = 0.004 + a * 0.02 * r1;
        size = 0.012 + a * 0.035;
      }
    }
    const fade = Math.sin(Math.PI * Math.min(1, age / life)) * (p.kind === 2 ? 0.26 : 0.15);
    const q = v.p([x, y, z]);
    const rr = size * q.s;
    const col = p.kind === 1 ? [210, 205, 200] : dust;
    items.push({
      z: q.z,
      fn: () => {
        const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, rr);
        g.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${fade})`);
        g.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(q.x, q.y, rr, 0, Math.PI * 2);
        ctx.fill();
      },
    });
  }
  items.sort((a, b) => b.z - a.z).forEach((i) => i.fn());
}

/** 장면 하나를 그린다 — 배경 · 패드 · 그림자 · 입자 · 기체 */
export function drawFrame(
  ctx: CanvasRenderingContext2D,
  v: View,
  o: { place: Place; pose: Pose; t: number; clock?: number; puffs: Puff[]; hint?: number | null; hintNow?: boolean; liv?: Livery; ringR?: number; parked?: number | null },
) {
  const clock = o.clock ?? o.t;
  drawPlace(ctx, v, o.place, clock);
  const hAbove = o.pose.y * SCALE;
  const glow = o.pose.on ? o.pose.th * clamp(1 - hAbove / 0.45) : 0;
  drawPad(ctx, v, glow, o.hint ?? null, !!o.hintNow, o.ringR);
  drawShadow(ctx, v, o.pose.x * SCALE, hAbove, o.pose.z ?? 0);
  if (o.parked != null) drawBooster(ctx, v, { x: o.parked, y: 0, lean: 0, legs: 1, th: 0, on: false, soot: 0.4 }, clock, { hull: '#d8d4cc', accent: '#9aa0a6' });
  // 입자는 기체 뒤 · 앞을 섞어야 하지만, 대부분 바닥이라 기체 앞에 한 번에 그려도 자연스럽다
  drawBooster(ctx, v, o.pose, clock, o.liv);
  drawPuffs(ctx, v, o.puffs, o.t, o.place);
}
