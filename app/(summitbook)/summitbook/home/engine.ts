'use client';

/* 완등 수첩 — 앱의 그림 엔진을 브라우저 페이지로 옮긴 것(Canvas 2D · SVG 문자열, 외부 라이브러리 없음).
   원본: APLUS/summitbook/src/{util,geo,stamp,cairn,sky,brand,render,sim}.js — 앱과 같은 그림이 나오게 숫자 · 순서를 그대로 둔다.
   앱이 바뀌면 이 파일도 같이 맞춘다(특히 stamp · render 의 좌표). 위치를 읽는 코드는 옮기지 않았다 — 이 페이지는 위치를 쓰지 않는다. */

import { APP } from '../names';
import type { Summit } from './summits';

type Ctx = CanvasRenderingContext2D;
export const FONT = '"Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif';
const mk = (w: number, h: number) => {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return c;
};

/* ───────── util ───────── */
function hash(str: string) {
  let h = 2166136261;
  for (const ch of String(str)) {
    h ^= ch.codePointAt(0) as number;
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
export function rng(seed: string) {
  let s = hash(seed) || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 1e6) / 1e6;
  };
}
export const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const pad = (n: number) => String(n).padStart(2, '0');
export const dotDate = (d: Date) => `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
export const no3 = (n: number) => 'No.' + String(n).padStart(3, '0');
const ORD = ['첫', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열'];
export const ordinal = (n: number) => (ORD[n - 1] ? `${ORD[n - 1]} 번째` : `${n}번째`);

/* ───────── 철 · 해 지는 시각 (geo.js) ───────── */
export type Season = { id: 'spring' | 'summer' | 'autumn' | 'winter'; name: string; en: string; ink: string; soft: string };
export const SEASONS: Season[] = [
  { id: 'spring', name: '봄', en: 'Spring', ink: '#5E8F2A', soft: '#E4EED2' },
  { id: 'summer', name: '여름', en: 'Summer', ink: '#1F6B46', soft: '#D3E6DA' },
  { id: 'autumn', name: '가을', en: 'Autumn', ink: '#C24A22', soft: '#F4DDD1' },
  { id: 'winter', name: '겨울', en: 'Winter', ink: '#26366A', soft: '#D7DCEA' },
];
export const seasonOfMonth = (m: number) => SEASONS[Math.floor(((m + 9) % 12) / 3)];
export const seasonOf = (d: Date) => seasonOfMonth(d.getMonth() + 1);
const rad = (d: number) => (d * Math.PI) / 180;
export function sunset(lat: number, lon: number, date: Date): Date | null {
  const y = date.getFullYear(), m = date.getMonth(), dd = date.getDate();
  const doy = Math.floor((Date.UTC(y, m, dd) - Date.UTC(y, 0, 1)) / 864e5) + 1;
  const g = ((2 * Math.PI) / 365) * (doy - 1 + 0.5);
  const eq = 229.18 * (0.000075 + 0.001868 * Math.cos(g) - 0.032077 * Math.sin(g) - 0.014615 * Math.cos(2 * g) - 0.040849 * Math.sin(2 * g));
  const decl = 0.006918 - 0.399912 * Math.cos(g) + 0.070257 * Math.sin(g) - 0.006758 * Math.cos(2 * g) + 0.000907 * Math.sin(2 * g) - 0.002697 * Math.cos(3 * g) + 0.00148 * Math.sin(3 * g);
  const cosH = (Math.cos(rad(90.833)) - Math.sin(rad(lat)) * Math.sin(decl)) / (Math.cos(rad(lat)) * Math.cos(decl));
  if (cosH < -1 || cosH > 1) return null;
  const ha = (Math.acos(cosH) * 180) / Math.PI;
  return new Date(Date.UTC(y, m, dd) + (720 - 4 * (lon - ha) - eq) * 60000);
}

/* ───────── 지금의 하늘 (sky.js) ───────── */
const hex = (s: string) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
export function skyAt(h: number, sh: number): [string, string, string] {
  const sr = 25 - sh;
  const K: [number, string, string, string][] = [
    [0, '#0B1426', '#1B2742', '#2A3550'], [sr - 0.6, '#1C2846', '#4B4E6E', '#8C6E73'], [sr + 0.4, '#6E86B3', '#E3B08A', '#F0CDA0'],
    [sr + 2.5, '#5F8FC8', '#A8C4E0', '#DCE6EE'], [sh - 1.6, '#6B8FC0', '#E2C49C', '#F2D7A8'], [sh - 0.2, '#3E4E80', '#D7865A', '#F2A65E'],
    [sh + 0.6, '#232C52', '#6A4D6E', '#B26A5A'], [sh + 1.6, '#0F1830', '#1F2A48', '#33405E'], [24, '#0B1426', '#1B2742', '#2A3550'],
  ];
  let a = K[0], b = K[K.length - 1];
  for (let i = 0; i < K.length - 1; i++) if (h >= K[i][0] && h < K[i + 1][0]) { a = K[i]; b = K[i + 1]; break; }
  const t = (h - a[0]) / Math.max(0.01, b[0] - a[0]);
  return [1, 2, 3].map((k) => {
    const A = hex(a[k] as string), B = hex(b[k] as string);
    return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(',')})`;
  }) as [string, string, string];
}
export function sunsetHour(date = new Date()) {
  const s = sunset(37.57, 126.98, date);
  return s ? s.getHours() + s.getMinutes() / 60 : 17.6;
}
export const isNight = (h: number, sh: number) => h < 25 - sh - 0.5 || h > sh + 0.9;
/** 능선 세 겹(앱 홈과 같은 모양) — viewBox 0 0 400 300 */
export function ridgePaths(night: boolean) {
  return ([[0.62, night ? '#1A2233' : '#56637A', 1.3], [0.72, night ? '#121926' : '#3C4659', 1.9], [0.84, night ? '#0B111B' : '#262E3B', 2.6]] as [number, string, number][]).map(
    ([y, c, f], k) => {
      let d = 'M0 300 ';
      for (let i = 0; i <= 40; i++) {
        const yy = 300 * y - 60 * Math.max(0, Math.sin(i / f + k * 1.7)) - 18 * Math.sin(i * 1.3 + k);
        d += `L${i * 10} ${yy.toFixed(1)} `;
      }
      return { d: d + 'L400 300Z', fill: c };
    },
  );
}

/* ───────── 도장 (stamp.js) — 로고와 같은 자국: 두 겹 테 · 사계 칸 · 능선 + 깃발 · 위 호 산 이름 · 아래 호 날짜 ───────── */
export type StampOpts = { summit: Summit; ink?: string; seasons?: Set<string> | null; empty?: boolean; sheet?: boolean; date?: string; inkSeed?: string; rot?: number };
const SEASON_ORDER = ['spring', 'summer', 'autumn', 'winter'];
function arcText(x: Ctx, text: string, r: number, size: number, top: boolean, spread: number) {
  x.save();
  x.font = `800 ${size}px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const chars = [...text], widths = chars.map((ch) => x.measureText(ch).width + size * spread);
  const total = widths.reduce((a, b) => a + b, 0), ang = total / r;
  let a = (top ? -Math.PI / 2 : Math.PI / 2) + (top ? -ang / 2 : ang / 2);
  chars.forEach((ch, i) => {
    const step = widths[i] / r, mid = a + (top ? step / 2 : -step / 2);
    x.save();
    x.rotate(mid);
    x.translate(r, 0);
    x.rotate(top ? Math.PI / 2 : -Math.PI / 2);
    x.fillText(ch, 0, 0);
    x.restore();
    a += top ? step : -step;
  });
  x.restore();
}
function stampRidge(x: Ctx, w: number, h: number, seed: number) {
  const R = rng('ridge' + seed), n = 3 + Math.floor(R() * 3), pts: [number, number][] = [];
  const peakAt = 0.35 + R() * 0.3;
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    let y = 0;
    for (let k = 0; k < n; k++) {
      const c = (k + 0.5) / n + (R() - 0.5) * 0.08, hh = 0.35 + R() * 0.4;
      y = Math.max(y, hh * Math.max(0, 1 - Math.abs(t - c) * (2.4 + R())));
    }
    y = Math.max(y, Math.max(0, 1 - Math.abs(t - peakAt) * 2.1));
    pts.push([t * w - w / 2, h / 2 - y * h]);
  }
  x.beginPath();
  x.moveTo(-w / 2, h / 2);
  pts.forEach((p) => x.lineTo(p[0], p[1]));
  x.lineTo(w / 2, h / 2);
  x.closePath();
  x.fill();
  return pts.reduce((a, p) => (p[1] < a[1] ? p : a), pts[0]);
}
export function makeStamp(r: number, o: StampOpts) {
  const padding = Math.ceil(r * 0.12), S = 2 * (r + padding), c = mk(S, S), x = c.getContext('2d') as Ctx;
  x.translate(S / 2, S / 2);
  const s = o.summit, ink = o.empty ? '#B4AA98' : o.ink || '#26366A';
  x.fillStyle = ink;
  x.strokeStyle = ink;
  if (o.empty) {
    x.setLineDash([r * 0.09, r * 0.07]);
    x.lineWidth = Math.max(1, r * 0.035);
    x.beginPath();
    x.arc(0, 0, r * 0.92, 0, Math.PI * 2);
    x.stroke();
    x.setLineDash([]);
    x.font = `700 ${Math.round(r * (s.name.length > 3 ? 0.3 : 0.36))}px ${FONT}`;
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.fillText(s.name, 0, -r * 0.06);
    x.font = `500 ${Math.round(r * 0.2)}px ${FONT}`;
    x.fillText(`${s.height}m`, 0, r * 0.3);
    return c;
  }
  x.lineWidth = r * 0.065;
  x.beginPath();
  x.arc(0, 0, r * 0.955, 0, Math.PI * 2);
  x.stroke();
  x.lineWidth = r * 0.025;
  x.beginPath();
  x.arc(0, 0, r * 0.6, 0, Math.PI * 2);
  x.stroke();
  if (o.seasons) {
    SEASON_ORDER.forEach((id, i) => {
      const a0 = -Math.PI * 0.75 + (i * Math.PI) / 2 + 0.12, a1 = a0 + Math.PI / 2 - 0.24;
      x.beginPath();
      x.arc(0, 0, r * 0.86, a0, a1);
      x.lineWidth = o.seasons!.has(id) ? r * 0.07 : r * 0.014;
      x.stroke();
    });
  }
  const band = o.seasons ? 0.7 : 0.77;
  const nl = [...s.name].length;
  arcText(x, s.name, r * band, Math.round(r * (nl <= 3 ? 0.21 : nl <= 4 ? 0.17 : Math.max(0.1, 0.17 - (nl - 4) * 0.012))), true, nl <= 4 ? 0.5 : nl <= 6 ? 0.25 : 0.08);
  if (!o.sheet) arcText(x, o.date || `${no3(s.id)} · ${s.sido.split('·')[0]}`, r * (band + 0.02), Math.round(r * (o.date ? 0.115 : 0.105)), false, o.date ? 0.12 : 0.18);
  x.save();
  x.beginPath();
  x.arc(0, 0, r * 0.57, 0, Math.PI * 2);
  x.clip();
  x.translate(0, -r * 0.1);
  const pk = stampRidge(x, r * 1.1, r * 0.5, s.id);
  x.restore();
  const fx = pk[0], fy = pk[1] - r * 0.1;
  x.lineWidth = Math.max(1, r * 0.028);
  x.beginPath();
  x.moveTo(fx, fy + r * 0.02);
  x.lineTo(fx, fy - r * 0.17);
  x.stroke();
  x.beginPath();
  x.moveTo(fx, fy - r * 0.17);
  x.lineTo(fx + r * 0.12, fy - r * 0.135);
  x.lineTo(fx, fy - r * 0.1);
  x.closePath();
  x.fill();
  x.font = `800 ${Math.round(r * 0.2)}px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText(`${s.height}m`, 0, r * 0.33);
  const R = rng('ink' + s.id + (o.inkSeed || ''));
  x.globalCompositeOperation = 'destination-out';
  for (let i = 0; i < 60; i++) {
    const a = R() * Math.PI * 2, d = Math.sqrt(R()) * r * 1.02, rr = r * (0.005 + R() * 0.02);
    x.globalAlpha = 0.25 + R() * 0.6;
    x.beginPath();
    x.arc(Math.cos(a) * d, Math.sin(a) * d, rr, 0, Math.PI * 2);
    x.fill();
  }
  x.globalAlpha = 1;
  x.globalCompositeOperation = 'source-over';
  return c;
}
export const tilt = (sid: number, salt?: string) => {
  const R = rng('tilt' + sid + (salt || ''));
  return ((R() < 0.5 ? -1 : 1) * (1 + R() * 3) * Math.PI) / 180;
};
export function stampOn(ctx: Ctx, cx: number, cy: number, r: number, o: StampOpts) {
  const k = Math.max(1, Math.abs(ctx.getTransform().a));
  const c = makeStamp(r * k, o);
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(o.rot != null ? o.rot : tilt(o.summit.id, o.inkSeed));
  ctx.globalAlpha = o.empty ? 1 : 0.9;
  ctx.drawImage(c, -c.width / (2 * k), -c.height / (2 * k), c.width / k, c.height / k);
  ctx.restore();
}

/* ───────── 돌탑 손잡이 (cairn.js, SVG 문자열) ───────── */
const STONES: [number, number, number, number, number][] = [[75, 112, 32, 10, 0], [72, 96, 25, 9, -4], [78, 81, 19, 8, 5], [74, 68, 13, 6.5, -6], [76, 58, 8, 4.5, 3]];
type Mat = { stones: string[]; cyl: string[]; top: string; base: string; light: number; dark: number };
const GRANITE: Mat = { stones: ['#9f998f', '#7f7a72', '#b4aea4', '#8b867d', '#a59f95'], cyl: ['#5f5b55', '#b9b5ad', '#cfcac1', '#7d7972', '#4f4c47'], top: '#a9a59d', base: '#6e6a63', light: 0.7, dark: 3.2 };
function cairnDefs(k: string, m: Mat) {
  return `<defs>
      <filter id="sbgd${k}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="11"/><feColorMatrix values="0 0 0 0 .12  0 0 0 0 .12  0 0 0 0 .13  0 0 0 -9 ${m.dark}"/><feComposite in2="SourceGraphic" operator="in"/></filter>
      <filter id="sbgl${k}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="5"/><feColorMatrix values="0 0 0 0 .95  0 0 0 0 .94  0 0 0 0 .9  0 0 0 -9 2.6"/><feComposite in2="SourceGraphic" operator="in"/></filter>
      <linearGradient id="sbcy${k}" x1="0" x2="1">${m.cyl.map((c, i) => `<stop offset="${[0, 0.3, 0.45, 0.75, 1][i]}" stop-color="${c}"/>`).join('')}</linearGradient>
    </defs>`;
}
const grain = (shape: string, k: string, m: Mat) =>
  shape.replace(/fill="[^"]+"/, `fill="#000" filter="url(#sbgd${k})"`) + shape.replace(/fill="[^"]+"/, `fill="#000" filter="url(#sbgl${k})" opacity="${m.light}"`);
function cairnStone([cx, cy, rx, ry, rot]: [number, number, number, number, number], col: string, k: string, m: Mat, cls?: string) {
  const T = `transform="rotate(${rot} ${cx} ${cy})"`, e = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${col}" ${T}/>`;
  return `<g class="${cls || ''}"><ellipse cx="${cx}" cy="${cy + ry * 0.55}" rx="${rx * 0.9}" ry="${ry * 0.45}" fill="#000" opacity=".2"/>${e}${grain(e, k, m)}<ellipse cx="${cx - rx * 0.25}" cy="${cy - ry * 0.35}" rx="${rx * 0.55}" ry="${ry * 0.35}" fill="#fff" opacity=".2" ${T}/></g>`;
}
/** 옆에서 본 돌탑 도장(viewBox 0 10 150 200). n = 쌓인 돌, fresh = 새 돌을 위에 띄워 둔다(class sb-cairn-new).
    필터 id 는 그리는 값에서 정한다(서버 · 브라우저 그림이 같아야 hydration 이 맞는다 — 순번을 쓰면 어긋난다) */
export function cairnSide(n: number, ink: string, fresh: boolean) {
  const k = `s${n}${fresh ? 'f' : ''}${ink.replace('#', '')}`, have = Math.max(0, Math.min(5, n)), m = GRANITE;
  const body = '<path d="M30 124 Q75 114 120 124 L120 190 Q75 200 30 190 Z" fill="FILL"/>';
  let s = `<svg viewBox="0 10 150 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${cairnDefs(k, m)}${body.replace('FILL', `url(#sbcy${k})`)}${grain(body, k, m)}<ellipse cx="75" cy="124" rx="45" ry="8" fill="${m.top}"/>`;
  s += `<path d="M30 188 Q75 198 120 188 L120 196 Q75 206 30 196 Z" fill="${ink}"/>`;
  for (let i = 0; i < have; i++) s += cairnStone(STONES[i], m.stones[i], k, m);
  if (fresh && have < 5) s += cairnStone(STONES[have], m.stones[have], k, m, 'sb-cairn-new');
  return s + '</svg>';
}
/** 위에서 본 돌탑(홈 손잡이) */
export function cairnTop() {
  const k = 'top', m = GRANITE;
  const rings = ([[0, 0, 40], [-3, 2, 30], [3, -2, 22], [-1, 1, 14], [1, 0, 7]] as number[][])
    .map(([dx, dy, r], i) => {
      const c = m.stones[i];
      const e = `<ellipse cx="${50 + dx}" cy="${50 + dy}" rx="${r}" ry="${r * 0.92}" fill="${c}"/>`;
      return `<ellipse cx="${50 + dx + 1.5}" cy="${50 + dy + 2.5}" rx="${r}" ry="${r * 0.92}" fill="#000" opacity=".22"/>${e}${grain(e, k, m)}<ellipse cx="${50 + dx}" cy="${50 + dy}" rx="${r}" ry="${r * 0.92}" fill="none" stroke="rgba(255,255,255,.18)"/>`;
    })
    .join('');
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${cairnDefs(k, m)}<circle cx="50" cy="50" r="47" fill="${m.base}"/>${rings}<circle cx="50" cy="50" r="46.5" fill="none" stroke="rgba(255,240,215,.45)" stroke-width="1.5"/></svg>`;
}

/* ───────── 회사 방패 (brand.js) — 막대 4개. 노란 십자는 쓰지 않는다 ───────── */
const BARS = [[[310, 293], [411, 293], [411, 600], [310, 499]], [[430, 293], [530, 293], [530, 819], [430, 719]], [[550, 293], [650, 293], [650, 719], [550, 819]], [[669, 293], [770, 293], [770, 499], [669, 600]]];
function mark(x: Ctx, cx: number, cy: number, h: number, color: string) {
  const k = h / 526;
  x.save();
  x.fillStyle = color;
  BARS.forEach((b) => {
    x.beginPath();
    b.forEach(([px, py], i) => {
      const X = cx + (px - 310) * k, Y = cy + (py - 293) * k;
      if (i) x.lineTo(X, Y);
      else x.moveTo(X, Y);
    });
    x.closePath();
    x.fill();
  });
  x.restore();
  return 460 * k;
}
export const MARK_PATHS = BARS.map((b) => `M${b.map((p) => p.join(' ')).join('L')}Z`);
type BrandOpt = { color?: string; size?: number; align?: 'left' | 'center' | 'right'; shadow?: boolean };
function brandLine(x: Ctx, px: number, py: number, opt: BrandOpt = {}) {
  const color = opt.color || '#fff', size = opt.size || 22, a = opt.align || 'center';
  x.save();
  x.fillStyle = color;
  x.textBaseline = 'alphabetic';
  if (opt.shadow) {
    x.shadowColor = 'rgba(0,0,0,.45)';
    x.shadowBlur = 6;
  }
  const t1 = APP.ko, t2 = 'YEAHPLUS', gap = size * 0.55, mh = size * 0.82;
  x.font = `900 ${size}px ${FONT}`;
  const w1 = x.measureText(t1).width;
  x.font = `800 ${size * 0.72}px ${FONT}`;
  const w2 = x.measureText(t2).width, mw = (mh * 460) / 526;
  const w = w1 + gap * 2 + 1 + mw + size * 0.3 + w2;
  let sx = a === 'left' ? px : a === 'right' ? px - w : px - w / 2;
  x.textAlign = 'left';
  x.font = `900 ${size}px ${FONT}`;
  x.fillText(t1, sx, py);
  sx += w1 + gap;
  x.globalAlpha = 0.55;
  x.fillRect(sx, py - size * 0.75, 1.5, size * 0.8);
  x.globalAlpha = 1;
  sx += gap;
  mark(x, sx, py - mh * 0.92, mh, color);
  sx += mw + size * 0.3;
  x.font = `800 ${size * 0.72}px ${FONT}`;
  x.fillText(t2, sx, py - size * 0.08);
  x.restore();
}

/* ───────── 샘플 사진 (sim.js) — 그린 정상 · 두 팔 든 사람(실제 사람 사진이 아니다) + 오려 낸 사람 ───────── */
export type Photo = { img: HTMLCanvasElement; cut: HTMLCanvasElement; w: number; h: number; box: { x: number; y: number; w: number; h: number } };
function person(x: Ctx, cx: number, base: number, h: number, fill: string) {
  x.fillStyle = fill;
  const u = h / 10;
  x.beginPath();
  x.arc(cx, base - h + u * 0.9, u * 0.85, 0, 7);
  x.fill();
  x.beginPath();
  x.moveTo(cx - u * 1.3, base - h + u * 2);
  x.lineTo(cx + u * 1.3, base - h + u * 2);
  x.lineTo(cx + u * 1.1, base - u * 4.6);
  x.lineTo(cx - u * 1.1, base - u * 4.6);
  x.closePath();
  x.fill();
  x.lineCap = 'round';
  x.strokeStyle = fill;
  x.lineWidth = u * 0.8;
  [-1, 1].forEach((sx) => {
    x.beginPath();
    x.moveTo(cx + sx * u * 1.1, base - h + u * 2.4);
    x.lineTo(cx + sx * u * 2.6, base - h + u * 0.6);
    x.lineTo(cx + sx * u * 3, base - h - u * 0.8);
    x.stroke();
  });
  x.lineWidth = u * 1.0;
  [-1, 1].forEach((sx) => {
    x.beginPath();
    x.moveTo(cx + sx * u * 0.6, base - u * 4.8);
    x.lineTo(cx + sx * u * 0.9, base);
    x.stroke();
  });
}
export function samplePhoto(seed: number, coat = '#C0452B'): Photo {
  const W = 1200, H = 1600, R = rng('sample' + seed);
  const c = mk(W, H), x = c.getContext('2d') as Ctx;
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#6E8DB8');
  g.addColorStop(0.5, '#D9C9B0');
  g.addColorStop(1, '#8B8371');
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);
  ([['#7D879A', 0.55], ['#5E6878', 0.62], ['#46505B', 0.7]] as [string, number][]).forEach(([col, y0], k) => {
    x.fillStyle = col;
    x.beginPath();
    x.moveTo(0, H);
    for (let i = 0; i <= 20; i++) x.lineTo((i * W) / 20, H * y0 + Math.sin(i * (1.1 + k * 0.4) + seed) * 60 + (R() - 0.5) * 50);
    x.lineTo(W, H);
    x.closePath();
    x.fill();
  });
  x.fillStyle = '#5A544B';
  x.beginPath();
  x.moveTo(0, H);
  x.lineTo(0, H * 0.86);
  x.quadraticCurveTo(W * 0.5, H * 0.8, W, H * 0.87);
  x.lineTo(W, H);
  x.fill();
  x.fillStyle = '#B7B0A3';
  x.fillRect(W * 0.62, H * 0.66, 190, 300);
  const cx = W * (0.38 + R() * 0.12), base = H * 0.88, ph = H * 0.5, u = ph / 10;
  const body = (ctx: Ctx, fill: string, belt: string) => {
    person(ctx, cx, base, ph, fill);
    ctx.fillStyle = belt;
    ctx.fillRect(cx - u * 1.1, base - u * 4.6 - 4, u * 2.2, 40);
  };
  body(x, coat, '#2D3A4F');
  // 오려 낸 사람: 사진을 사람 모양으로만 남긴다(앱은 Vision 전경 마스크가 하는 일)
  const cut = mk(W, H), cx2 = cut.getContext('2d') as Ctx;
  body(cx2, '#000', '#000');
  cx2.globalCompositeOperation = 'source-in';
  cx2.drawImage(c, 0, 0);
  const box = { x: (cx - u * 3.4) / W, y: (base - ph - u * 1.2) / H, w: (u * 6.8) / W, h: (ph + u * 1.2) / H };
  return { img: c, cut, w: W, h: H, box };
}

/* ───────── 정상 쪽 조판 (render.js) ───────── */
export const PW = 1080, PH = 1350;
const PAPER = '#F2ECDF', INK = '#23211D', MUTED = '#7C7364';
export type Facts = { summit: Summit; season: Season; no: string; height: string; date: string; time: string; nth: string; ok: boolean };
export type Climb = { id: string; layout: Layout; course: string; with: string; note: string };
export type Layout = 'stone' | 'contour' | 'film' | 'postcard';
type St = { overflow: boolean };

export function facts(summit: Summit, at: Date, ok: boolean, n = 1): Facts {
  return {
    summit,
    season: seasonOf(at),
    no: no3(summit.id),
    height: `해발 ${summit.height.toLocaleString('ko-KR')}m`,
    date: dotDate(at),
    time: `${pad(at.getHours())}:${pad(at.getMinutes())}`,
    nth: ok ? `${ordinal(n)} 오름` : '기록',
    ok,
  };
}

function coverRect(ph: Photo, rx: number, ry: number, rw: number, rh: number) {
  const k = Math.max(rw / ph.w, rh / ph.h), dw = ph.w * k, dh = ph.h * k;
  const fx = ph.box.x + ph.box.w / 2, fy = ph.box.y + ph.box.h * 0.4;
  const dx = clamp(rx + rw / 2 - fx * dw, rx + rw - dw, rx), dy = clamp(ry + rh / 2 - fy * dh, ry + rh - dh, ry);
  return { dx, dy, dw, dh };
}
function drawPhoto(x: Ctx, ph: Photo, rx: number, ry: number, rw: number, rh: number, layer?: 'cut') {
  const r = coverRect(ph, rx, ry, rw, rh);
  x.save();
  x.beginPath();
  x.rect(rx, ry, rw, rh);
  x.clip();
  x.drawImage(layer === 'cut' ? ph.cut : ph.img, r.dx, r.dy, r.dw, r.dh);
  x.restore();
}
function fit(x: Ctx, text: string, maxW: number, size: number, minSize: number, weight: number, state: St) {
  let s = size;
  x.font = `${weight || 600} ${s}px ${FONT}`;
  while (x.measureText(text).width > maxW && s > minSize) {
    s -= 2;
    x.font = `${weight || 600} ${s}px ${FONT}`;
  }
  if (x.measureText(text).width <= maxW) return text;
  state.overflow = true;
  let t = text;
  while (t.length > 1 && x.measureText(t + '…').width > maxW) t = t.slice(0, -1);
  return t + '…';
}
function wrap(x: Ctx, text: string, maxW: number, lines: number, state: St) {
  const out: string[] = [];
  let cur = '';
  for (const ch of [...String(text || '')]) {
    if (x.measureText(cur + ch).width > maxW && cur) {
      out.push(cur);
      cur = ch.trimStart();
    } else cur += ch;
  }
  if (cur) out.push(cur);
  if (out.length > lines) {
    state.overflow = true;
    return out.slice(0, lines);
  }
  return out;
}
export function contours(x: Ctx, cx: number, cy: number, rings: number, step: number, seed: number | string, color: string, lw: number) {
  const R = rng('contour' + seed), harm = [1, 2, 3, 5].map((k) => ({ k, a: ((R() - 0.5) * 0.35) / k, p: R() * 6.28 }));
  x.save();
  x.strokeStyle = color;
  x.lineWidth = lw;
  for (let i = 1; i <= rings; i++) {
    const base = i * step;
    x.beginPath();
    for (let j = 0; j <= 96; j++) {
      const t = (j / 96) * Math.PI * 2;
      let m = 1;
      harm.forEach((h) => {
        m += h.a * Math.sin(h.k * t + h.p + i * 0.13);
      });
      const r = base * m, px = cx + Math.cos(t) * r * 1.25, py = cy + Math.sin(t) * r;
      if (j) x.lineTo(px, py);
      else x.moveTo(px, py);
    }
    x.closePath();
    x.globalAlpha = i % 5 === 0 ? 1 : 0.55;
    x.lineWidth = i % 5 === 0 ? lw * 1.8 : lw;
    x.stroke();
  }
  x.restore();
}
function sky(x: Ctx, f: Facts, rx: number, ry: number, rw: number, rh: number) {
  const g = x.createLinearGradient(0, ry, 0, ry + rh);
  g.addColorStop(0, '#2E3B55');
  g.addColorStop(0.55, f.season.soft);
  g.addColorStop(1, '#8C8577');
  x.fillStyle = g;
  x.fillRect(rx, ry, rw, rh);
  contours(x, rx + rw * 0.5, ry + rh * 0.78, 22, rw * 0.035, f.summit.id, 'rgba(255,255,255,.18)', 2);
}
const stampOpts = (f: Facts, seasons: Set<string>, c: Climb): StampOpts => ({ summit: f.summit, ink: f.season.ink, seasons, inkSeed: c.id, date: f.date });
function seal(x: Ctx, cx: number, cy: number, r: number, color: string) {
  x.save();
  x.strokeStyle = color;
  x.fillStyle = color;
  x.globalAlpha = 0.75;
  x.setLineDash([12, 10]);
  x.lineWidth = 4;
  x.beginPath();
  x.arc(cx, cy, r, 0, Math.PI * 2);
  x.stroke();
  x.setLineDash([]);
  x.font = `800 40px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  x.fillText('기록', cx, cy - 14);
  x.font = `500 24px ${FONT}`;
  x.fillText('정상 반경 밖', cx, cy + 30);
  x.restore();
}

export type Layers = { bg: Ctx; name: Ctx; cut: Ctx; fg: Ctx };
function stone(L: Layers, f: Facts, c: Climb, ph: Photo | null, seasons: Set<string>, st: St) {
  const W = PW, H = PH;
  let x = L.bg;
  if (ph) drawPhoto(x, ph, 0, 0, W, H);
  else sky(x, f, 0, 0, W, H);
  const g = x.createLinearGradient(0, H * 0.62, 0, H);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, 'rgba(0,0,0,.72)');
  x.fillStyle = g;
  x.fillRect(0, H * 0.55, W, H * 0.45);
  const tg = x.createLinearGradient(0, 0, 0, 220);
  tg.addColorStop(0, 'rgba(0,0,0,.45)');
  tg.addColorStop(1, 'rgba(0,0,0,0)');
  x.fillStyle = tg;
  x.fillRect(0, 0, W, 220);
  const chars = [...f.summit.name], lift = !!ph;
  const size = Math.min(270, Math.floor((H * 0.6) / chars.length)), top = 150;
  let colX = W * 0.2;
  if (ph) {
    const r = coverRect(ph, 0, 0, W, H), l = r.dx + ph.box.x * r.dw, rr = r.dx + (ph.box.x + ph.box.w) * r.dw;
    colX = W - rr >= l ? rr + size * 0.12 : l - size * 0.12;
    colX = clamp(colX, size * 0.6, W - size * 0.6);
  }
  x = L.name;
  x.save();
  x.font = `900 ${size}px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'top';
  chars.forEach((ch, i) => {
    const y = top + i * size * 1.02;
    x.fillStyle = 'rgba(0,0,0,.35)';
    x.fillText(ch, colX + 6, y + 8);
    x.fillStyle = '#F4F1EA';
    x.fillText(ch, colX, y);
  });
  x.restore();
  if (lift && ph) drawPhoto(L.cut, ph, 0, 0, W, H, 'cut');
  x = L.fg;
  x.fillStyle = '#fff';
  x.textBaseline = 'alphabetic';
  x.textAlign = 'left';
  x.font = `800 44px ${FONT}`;
  x.fillText(f.no, 60, 92);
  x.textAlign = 'right';
  x.fillText(fit(x, f.summit.peak || '정상', 520, 40, 26, 700, st), W - 60, 92);
  x.textAlign = 'left';
  x.fillStyle = '#fff';
  x.fillText(fit(x, `${f.height} · ${f.summit.sido}`, 700, 46, 30, 800, st), 60, H - 210);
  x.fillStyle = 'rgba(255,255,255,.82)';
  x.fillText(fit(x, `${f.date} ${f.time} · ${f.season.name} · ${f.nth}`, 700, 34, 24, 600, st), 60, H - 156);
  const line = [c.course, c.with && `함께 ${c.with}`].filter(Boolean).join(' · ');
  if (line) x.fillText(fit(x, line, 700, 30, 22, 500, st), 60, H - 108);
  if (c.note) {
    x.font = `500 30px ${FONT}`;
    x.fillText(fit(x, `“${c.note}”`, 700, 30, 22, 500, st), 60, H - 64);
  }
  if (f.ok) stampOn(x, W - 175, H - 190, 125, stampOpts(f, seasons, c));
  else seal(x, W - 175, H - 190, 115, '#fff');
  brandLine(x, W / 2, H - 22, { size: 22, color: '#fff', shadow: true });
}
function contour(x: Ctx, f: Facts, c: Climb, ph: Photo | null, seasons: Set<string>, st: St) {
  const W = PW, H = PH;
  x.fillStyle = PAPER;
  x.fillRect(0, 0, W, H);
  contours(x, W * 0.62, H * 0.3, 30, 34, f.summit.id, '#CBBFA5', 1.6);
  x.textBaseline = 'alphabetic';
  x.textAlign = 'left';
  x.font = `800 30px ${FONT}`;
  x.fillStyle = MUTED;
  x.fillText(`${f.no} · 100대 명산`, 70, 100);
  x.fillStyle = INK;
  x.fillText(fit(x, f.summit.name, W - 140, 132, 80, 900, st), 70, 228);
  x.fillStyle = MUTED;
  x.fillText(fit(x, `${f.summit.peak || '정상'} · ${f.height} · ${f.summit.sido}`, W - 140, 36, 26, 600, st), 70, 284);
  const px = 70, py = 330, pw = W - 140, ph_ = 620;
  x.fillStyle = '#fff';
  x.shadowColor = 'rgba(0,0,0,.18)';
  x.shadowBlur = 24;
  x.shadowOffsetY = 8;
  x.fillRect(px - 14, py - 14, pw + 28, ph_ + 28);
  x.shadowColor = 'transparent';
  if (ph) drawPhoto(x, ph, px, py, pw, ph_);
  else {
    x.fillStyle = f.season.soft;
    x.fillRect(px, py, pw, ph_);
    contours(x, px + pw / 2, py + ph_ * 0.62, 14, 26, f.summit.id + 7, 'rgba(35,33,29,.25)', 2);
  }
  const rows: [string, string][] = [['날짜', `${f.date} ${f.time}`], ['철', `${f.season.name} · ${f.nth}`], ['코스', c.course], ['함께', c.with]];
  let y = 1040;
  rows.forEach(([k, v]) => {
    x.fillStyle = MUTED;
    x.font = `700 26px ${FONT}`;
    x.fillText(k, 70, y);
    x.fillStyle = INK;
    x.fillText(fit(x, v || '', 560, 32, 24, 600, st), 170, y);
    x.strokeStyle = '#CFC4AE';
    x.lineWidth = 2;
    x.beginPath();
    x.moveTo(170, y + 14);
    x.lineTo(760, y + 14);
    x.stroke();
    y += 62;
  });
  if (c.note) {
    x.font = `500 32px ${FONT}`;
    x.fillStyle = INK;
    wrap(x, c.note, W - 140, 1, st).forEach((l) => x.fillText(l, 70, y + 18));
  }
  if (f.ok) stampOn(x, W - 190, 1085, 130, stampOpts(f, seasons, c));
  else seal(x, W - 190, 1085, 110, MUTED);
  brandLine(x, W - 70, 100, { size: 24, color: MUTED, align: 'right' });
}
function film(x: Ctx, f: Facts, c: Climb, ph: Photo | null, seasons: Set<string>, st: St) {
  const W = PW, H = PH;
  x.fillStyle = '#121110';
  x.fillRect(0, 0, W, H);
  x.fillStyle = '#2B2925';
  for (let i = 0; i < 12; i++) {
    const hx = 30 + i * 90;
    x.fillRect(hx, 40, 46, 64);
    x.fillRect(hx, H - 104, 46, 64);
  }
  const px = 60, py = 160, pw = W - 120, ph_ = 860;
  if (ph) drawPhoto(x, ph, px, py, pw, ph_);
  else sky(x, f, px, py, pw, ph_);
  x.fillStyle = '#E2A33B';
  x.font = `700 26px ${FONT}`;
  x.textAlign = 'left';
  x.textBaseline = 'middle';
  x.fillText(fit(x, `SUMMIT BOOK  ${f.no}  ${f.summit.name}  ${f.summit.height}M  ${f.date}`, W - 120, 26, 20, 700, st), 60, 135);
  x.textBaseline = 'alphabetic';
  x.fillStyle = '#F2ECDF';
  x.font = `900 92px ${FONT}`;
  x.fillText(fit(x, f.summit.name, 600, 92, 60, 900, st), 60, 1130);
  x.fillStyle = '#A9A190';
  x.fillText(fit(x, `${f.height} · ${f.season.name} · ${f.nth}`, 600, 32, 24, 600, st), 60, 1180);
  const line = c.note || [c.course, c.with && `함께 ${c.with}`].filter(Boolean).join(' · ');
  if (line) x.fillText(fit(x, line, 600, 28, 22, 500, st), 60, 1222);
  if (f.ok) stampOn(x, W - 200, 1150, 115, stampOpts(f, seasons, c));
  else seal(x, W - 200, 1150, 100, '#A9A190');
  brandLine(x, W / 2, H - 12, { size: 20, color: '#A9A190' });
}
function postcard(x: Ctx, f: Facts, c: Climb, ph: Photo | null, seasons: Set<string>, st: St) {
  const W = PW, H = PH;
  x.fillStyle = '#EFE7D6';
  x.fillRect(0, 0, W, H);
  const px = 60, py = 60, pw = W - 120, ph_ = 700;
  if (ph) drawPhoto(x, ph, px, py, pw, ph_);
  else sky(x, f, px, py, pw, ph_);
  x.strokeStyle = '#fff';
  x.lineWidth = 10;
  x.strokeRect(px, py, pw, ph_);
  x.fillStyle = INK;
  x.textAlign = 'left';
  x.textBaseline = 'alphabetic';
  x.font = `900 64px ${FONT}`;
  x.fillText(fit(x, `${f.summit.name}에서`, 560, 64, 40, 900, st), 70, 870);
  x.font = `500 34px ${FONT}`;
  const body = wrap(x, c.note || `${f.date}, ${f.summit.peak || '정상'}에 섰다.`, 560, 4, st);
  body.forEach((l, i) => x.fillText(l, 70, 950 + i * 56));
  for (let i = 0; i < 5; i++) {
    x.strokeStyle = '#CDBFA4';
    x.lineWidth = 2;
    x.beginPath();
    x.moveTo(70, 966 + i * 56);
    x.lineTo(640, 966 + i * 56);
    x.stroke();
  }
  x.strokeStyle = '#B9AB90';
  x.beginPath();
  x.moveTo(680, 820);
  x.lineTo(680, 1270);
  x.stroke();
  x.save();
  x.fillStyle = '#fff';
  x.fillRect(800, 820, 220, 260);
  x.fillStyle = '#EFE7D6';
  for (let i = 0; i <= 11; i++) {
    x.beginPath();
    x.arc(800 + i * 20, 820, 7, 0, 7);
    x.fill();
    x.beginPath();
    x.arc(800 + i * 20, 1080, 7, 0, 7);
    x.fill();
  }
  for (let i = 0; i <= 13; i++) {
    x.beginPath();
    x.arc(800, 820 + i * 20, 7, 0, 7);
    x.fill();
    x.beginPath();
    x.arc(1020, 820 + i * 20, 7, 0, 7);
    x.fill();
  }
  x.restore();
  if (f.ok) stampOn(x, 910, 950, 92, stampOpts(f, seasons, c));
  else seal(x, 910, 950, 80, MUTED);
  x.fillStyle = MUTED;
  x.font = `600 28px ${FONT}`;
  [`${f.no} · ${f.height}`, `${f.date} · ${f.season.name}`, c.with ? fit(x, `함께 ${c.with}`, 320, 28, 20, 600, st) : ''].forEach((l, i) => l && x.fillText(l, 710, 1160 + i * 44));
  brandLine(x, W - 60, H - 26, { size: 22, color: MUTED, align: 'right' });
}

export type PageArgs = { facts: Facts; climb: Climb; photo: Photo | null; seasons: Set<string> };
function sized(canvas: HTMLCanvasElement | null, w: number, h: number) {
  const cv = canvas || mk(w, h);
  cv.width = w;
  cv.height = h;
  return [cv, cv.getContext('2d') as Ctx] as const;
}
/** 쪽 한 장(1080×1350) */
export function page(a: PageArgs, canvas: HTMLCanvasElement | null = null) {
  const [cv, x] = sized(canvas, PW, PH), st = { overflow: false }, lay = a.climb.layout;
  if (lay === 'contour') contour(x, a.facts, a.climb, a.photo, a.seasons, st);
  else if (lay === 'film') film(x, a.facts, a.climb, a.photo, a.seasons, st);
  else if (lay === 'postcard') postcard(x, a.facts, a.climb, a.photo, a.seasons, st);
  else stone({ bg: x, name: x, cut: x, fg: x }, a.facts, a.climb, a.photo, a.seasons, st);
  return cv;
}
/** 정상석 판형을 네 겹(사진 · 새긴 이름 · 오려 낸 사람 · 글과 도장)으로 — 사진 놓기 연출 */
export function stoneLayers(a: PageArgs, cvs: { bg: HTMLCanvasElement; name: HTMLCanvasElement; cut: HTMLCanvasElement; fg: HTMLCanvasElement }) {
  const L = {} as Layers;
  (['bg', 'name', 'cut', 'fg'] as const).forEach((k) => {
    cvs[k].width = PW;
    cvs[k].height = PH;
    L[k] = cvs[k].getContext('2d') as Ctx;
    L[k].clearRect(0, 0, PW, PH);
  });
  stone(L, a.facts, a.climb, a.photo, a.seasons, { overflow: false });
}

/** 뒤 면지 — 백 개의 봉우리. peaks 는 수첩 순서, ink 가 있으면 오른 봉우리 */
export function ridgeSheet(a: { owner: string; done: number; peaks: { summit: Summit; ink: string | null; seasons: Set<string> }[]; four: boolean }, canvas: HTMLCanvasElement) {
  const [cv, x] = sized(canvas, PW, PH), W = PW, H = PH;
  x.fillStyle = PAPER;
  x.fillRect(0, 0, W, H);
  x.fillStyle = INK;
  x.textAlign = 'left';
  x.textBaseline = 'alphabetic';
  x.font = `900 56px ${FONT}`;
  x.fillText('백 개의 봉우리', 60, 104);
  x.font = `700 30px ${FONT}`;
  x.fillStyle = MUTED;
  x.fillText(a.owner ? `${a.owner}의 수첩` : APP.ko, 60, 150);
  x.textAlign = 'right';
  x.fillStyle = INK;
  x.font = `900 72px ${FONT}`;
  x.fillText(`${a.done}`, W - 140, 112);
  x.font = `700 34px ${FONT}`;
  x.fillStyle = MUTED;
  x.fillText('/ 100', W - 60, 112);
  const rows = 4, per = Math.ceil(a.peaks.length / rows), top = 210, rowH = (H - top - 40) / rows, hs = a.peaks.map((p) => p.summit.height);
  const lo = Math.min(...hs), hi = Math.max(...hs);
  for (let r = 0; r < rows; r++) {
    const list = a.peaks.slice(r * per, (r + 1) * per), base = top + rowH * (r + 1) - 46, step = (W - 80) / list.length;
    const pts = list.map((p, i) => ({ p, x: 40 + (i + 0.5) * step, y: base - 40 - ((p.summit.height - lo) / (hi - lo)) * (rowH - 120) }));
    const path = () => {
      x.beginPath();
      x.moveTo(40, base);
      pts.forEach((q, i) => {
        const vx = q.x - step / 2, prev = pts[i - 1];
        x.lineTo(vx, Math.max(q.y, prev ? prev.y : q.y) + step * 0.55);
        x.lineTo(q.x, q.y);
      });
      x.lineTo(W - 40, base - 10);
      x.lineTo(W - 40, base);
      x.closePath();
    };
    path();
    x.fillStyle = 'rgba(203,191,165,.25)';
    x.fill();
    x.strokeStyle = '#A99D86';
    x.lineWidth = 2;
    path();
    x.stroke();
    pts.forEach((q, i) => {
      const done = !!q.p.ink, hw = step * 0.55;
      if (done) {
        x.beginPath();
        x.moveTo(q.x - hw, q.y + hw * 1.05);
        x.lineTo(q.x, q.y);
        x.lineTo(q.x + hw, q.y + hw * 1.05);
        x.lineTo(q.x + hw, base);
        x.lineTo(q.x - hw, base);
        x.closePath();
        x.fillStyle = q.p.ink as string;
        x.globalAlpha = 0.88;
        x.fill();
        x.globalAlpha = 1;
        x.strokeStyle = INK;
        x.lineWidth = 2.5;
        x.beginPath();
        x.moveTo(q.x, q.y);
        x.lineTo(q.x, q.y - 34);
        x.stroke();
        x.fillStyle = q.p.ink as string;
        x.beginPath();
        x.moveTo(q.x, q.y - 34);
        x.lineTo(q.x + 20, q.y - 27);
        x.lineTo(q.x, q.y - 20);
        x.fill();
        if (a.four)
          SEASONS.forEach((s, k) => {
            x.fillStyle = q.p.seasons.has(s.id) ? s.ink : 'rgba(0,0,0,.12)';
            x.beginPath();
            x.arc(q.x - 12 + k * 8, q.y - 44, 3.2, 0, 7);
            x.fill();
          });
      }
      x.fillStyle = done ? INK : MUTED;
      x.font = `${done ? 800 : 500} 15px ${FONT}`;
      x.textAlign = 'center';
      const name = q.p.summit.name.replace(/\(.+\)/, '');
      x.fillText(name.length > 3 ? name.slice(0, 3) : name, q.x, base + 22 + (i % 2) * 16);
    });
  }
  brandLine(x, W / 2, H - 12, { size: 20, color: MUTED });
  return cv;
}

/** 스토리 9:16(1080×1920) — 가운데 쪽 0.9배 · 흐린 배경 · 아래 100칸 줄 */
export function story(a: PageArgs & { strip: { h: number; ink: string | null; me: boolean }[]; done: number; label: string }, canvas: HTMLCanvasElement) {
  const W = PW, H = PH, SH = 1920;
  const [cv, x] = sized(canvas, W, SH);
  const f = a.facts;
  if (a.photo) {
    const s1 = mk(27, 48), s2 = mk(108, 192), k = Math.max(27 / a.photo.w, 48 / a.photo.h);
    (s1.getContext('2d') as Ctx).drawImage(a.photo.img, (27 - a.photo.w * k) / 2, (48 - a.photo.h * k) / 2, a.photo.w * k, a.photo.h * k);
    const x2 = s2.getContext('2d') as Ctx;
    x2.imageSmoothingQuality = 'high';
    x2.drawImage(s1, 0, 0, 108, 192);
    x.imageSmoothingQuality = 'high';
    x.drawImage(s2, 0, 0, W, SH);
    x.fillStyle = 'rgba(14,16,15,.42)';
    x.fillRect(0, 0, W, SH);
  }
  const vg = x.createLinearGradient(0, H * 0.9 + 300, 0, SH);
  vg.addColorStop(0, 'rgba(10,11,10,0)');
  vg.addColorStop(0.25, 'rgba(10,11,10,.62)');
  vg.addColorStop(1, 'rgba(10,11,10,.8)');
  x.fillStyle = vg;
  x.fillRect(0, H * 0.9 + 300, W, SH);
  const pw = W * 0.9, ph = H * 0.9, px = (W - pw) / 2, py = 300;
  const pc = page(a);
  x.save();
  x.shadowColor = 'rgba(0,0,0,.45)';
  x.shadowBlur = 40;
  x.shadowOffsetY = 14;
  x.fillStyle = '#000';
  x.fillRect(px, py, pw, ph);
  x.restore();
  x.drawImage(pc, px, py, pw, ph);
  x.fillStyle = 'rgba(255,255,255,.78)';
  x.font = `800 30px ${FONT}`;
  x.textAlign = 'center';
  x.textBaseline = 'alphabetic';
  x.fillText(`${f.date} · ${f.summit.name} 정상`, W / 2, py - 34);
  const sy = py + ph + 128, n = a.strip.length, sw = (W - 120) / n, hs = a.strip.map((s) => s.h), lo = Math.min(...hs), hi = Math.max(...hs);
  a.strip.forEach((s, i) => {
    const bh = 14 + ((s.h - lo) / (hi - lo || 1)) * 70, bx = 60 + i * sw;
    x.fillStyle = s.me ? '#fff' : s.ink || 'rgba(255,255,255,.22)';
    x.fillRect(bx + sw * 0.15, sy - bh, sw * 0.7, bh);
    if (s.me) {
      x.fillStyle = '#fff';
      x.fillRect(bx + sw * 0.4, sy - bh - 34, 2.5, 34);
      x.beginPath();
      x.moveTo(bx + sw * 0.4 + 2.5, sy - bh - 34);
      x.lineTo(bx + sw * 0.4 + 22, sy - bh - 27);
      x.lineTo(bx + sw * 0.4 + 2.5, sy - bh - 20);
      x.fill();
    }
  });
  x.fillStyle = '#fff';
  x.font = `900 40px ${FONT}`;
  x.textAlign = 'left';
  x.fillText(a.label, 60, sy + 62);
  x.textAlign = 'right';
  x.fillText(`${a.done}`, W - 140, sy + 62);
  x.font = `700 28px ${FONT}`;
  x.fillStyle = 'rgba(255,255,255,.7)';
  x.fillText('/ 100', W - 60, sy + 62);
  return cv;
}

/** 올해의 산행 표지(한 권 PDF 첫 쪽 — 연말 카드의 바탕) */
export function yearCover(a: { year: number; owner: string; climbs: number; summits: number; done: number }, canvas: HTMLCanvasElement) {
  const [cv, x] = sized(canvas, PW, PH), W = PW, H = PH;
  x.fillStyle = '#2C3A2F';
  x.fillRect(0, 0, W, H);
  contours(x, W * 0.5, H * 0.62, 34, 30, a.year, 'rgba(242,236,223,.16)', 2);
  x.fillStyle = '#F2ECDF';
  x.textAlign = 'left';
  x.textBaseline = 'alphabetic';
  x.font = `700 36px ${FONT}`;
  x.fillText(a.owner ? `${a.owner}의 산행` : APP.ko, 80, 140);
  x.font = `900 180px ${FONT}`;
  x.fillText(String(a.year), 70, 360);
  x.font = `800 64px ${FONT}`;
  x.fillText('올해의 산행', 80, 450);
  x.font = `600 34px ${FONT}`;
  x.fillStyle = 'rgba(242,236,223,.75)';
  x.fillText(`정상 ${a.climbs}번 · 산 ${a.summits}곳 · 수첩 ${a.done} / 100`, 80, H - 120);
  brandLine(x, 80, H - 56, { size: 26, color: 'rgba(242,236,223,.6)', align: 'left' });
  return cv;
}

/* ───────── 연말 결산 카드 · 함께 오른 사람에게 (앱 render.js recap · companion, GDD §19) ───────── */
function kraft(x: Ctx, w: number, h: number, seed: string | number) {
  const g = x.createRadialGradient(w * 0.7, h * 0.1, 40, w * 0.6, h * 0.4, h * 1.1);
  g.addColorStop(0, '#D6B78B'); g.addColorStop(0.6, '#C29E6C'); g.addColorStop(1, '#AE8757');
  x.fillStyle = g; x.fillRect(0, 0, w, h);
  const R0 = rng('kraft' + seed);
  x.save(); x.globalAlpha = 0.07; x.strokeStyle = '#fff'; x.lineWidth = 1.2;
  for (let i = 0; i < 260; i++) { const px = R0() * w, py = R0() * h, l = 6 + R0() * 18, an = 2 + R0() * 0.5; x.beginPath(); x.moveTo(px, py); x.lineTo(px + Math.cos(an) * l, py + Math.sin(an) * l); x.stroke(); }
  x.restore();
  x.save(); x.strokeStyle = 'rgba(92,70,48,.55)'; x.lineWidth = 3; x.setLineDash([16, 14]); x.beginPath(); x.moveTo(26, 10); x.lineTo(26, h - 10); x.stroke(); x.restore();
}
function paperLabel(x: Ctx, rx: number, ry: number, rw: number, rh: number, rot: number) {
  x.save(); x.translate(rx + rw / 2, ry + rh / 2); x.rotate(rot);
  x.shadowColor = 'rgba(60,40,15,.25)'; x.shadowBlur = 18; x.shadowOffsetY = 6;
  x.fillStyle = '#F4EEDF'; x.fillRect(-rw / 2, -rh / 2, rw, rh); x.shadowColor = 'transparent';
  x.strokeStyle = '#b9a98a'; x.lineWidth = 2; x.strokeRect(-rw / 2, -rh / 2, rw, rh); x.restore();
}
export type RecapClimb = { summit: Summit; ink: string; season: Season; at: Date; id: string };
export type RecapArgs = { year: number; owner: string; list: RecapClimb[]; strip: { h: number; ink: string | null; now: boolean }[]; done: number };
/** 연말 결산 카드 1080×1350 */
export function recap(a: RecapArgs, canvas: HTMLCanvasElement) {
  const [cv, x] = sized(canvas, PW, PH), W = PW, H = PH, st: St = { overflow: false };
  kraft(x, W, H, a.year);
  paperLabel(x, 70, 64, 800, 200, -0.02);
  x.save(); x.translate(470, 164); x.rotate(-0.02); x.fillStyle = '#23211D'; x.textAlign = 'left'; x.textBaseline = 'alphabetic';
  x.font = `900 84px ${FONT}`; x.fillText(`${a.year} 산행 결산`, -370, 0);
  x.font = `italic 700 34px ${FONT}`; x.fillStyle = '#5b544a'; x.fillText(a.owner ? `${a.owner}의 한 해` : '올해의 수첩', -370, 62); x.restore();
  const L = a.list, summits = new Set(L.map((c) => c.summit.id)).size, sum = L.reduce((s, c) => s + (c.summit.height || 0), 0);
  const stats: [string, string, string][] = [[`${L.length}`, '번', '정상에 섰다'], [`${summits}`, '곳', '서로 다른 산'], [sum.toLocaleString('ko-KR'), 'm', '정상 높이를 더하면']];
  stats.forEach(([n, u, cap], i) => {
    const bx = 70 + i * 320; x.textAlign = 'left'; x.fillStyle = '#2a2016';
    let s = 96; x.font = `900 ${s}px ${FONT}`; while (x.measureText(n).width > 250 && s > 50) { s -= 4; x.font = `900 ${s}px ${FONT}`; }
    x.fillText(n, bx, 400); const w = x.measureText(n).width;
    x.font = `800 38px ${FONT}`; x.fillText(u, bx + w + 6, 400);
    x.font = `700 28px ${FONT}`; x.fillStyle = 'rgba(42,32,22,.7)'; x.fillText(cap, bx, 446);
  });
  const hi = L.slice().sort((p, q) => q.summit.height - p.summit.height)[0];
  if (hi) { x.font = `700 32px ${FONT}`; x.fillStyle = '#2a2016'; x.textAlign = 'left'; x.fillText(fit(x, `가장 높았던 곳 · ${hi.summit.name} ${hi.summit.height.toLocaleString('ko-KR')}m · ${dotDate(hi.at)}`, 940, 32, 24, 700, st), 70, 512); }
  const many = L.length > 18, show = many ? L.slice(-17) : L, n0 = show.length + (many ? 1 : 0);
  const cols = n0 <= 3 ? Math.max(1, n0) : n0 <= 8 ? Math.ceil(n0 / 2) : 6, rows = Math.ceil(n0 / cols), cw = 940 / cols, ch = 420 / rows, top = 556;
  const rr = Math.min(n0 <= 3 ? 130 : 96, cw * 0.4, ch * 0.42);
  show.forEach((c, i) => {
    const inRow = Math.min(cols, n0 - Math.floor(i / cols) * cols), cx = 70 + (940 - inRow * cw) / 2 + ((i % cols) + 0.5) * cw, cy = top + (Math.floor(i / cols) + 0.5) * ch;
    stampOn(x, cx, cy, rr, { summit: c.summit, ink: c.ink, sheet: n0 > 3, inkSeed: c.id, date: n0 <= 3 ? dotDate(c.at) : undefined });
  });
  if (many) { const cx = 70 + (17 % cols + 0.5) * cw, cy = top + (Math.floor(17 / cols) + 0.5) * ch; x.fillStyle = '#2a2016'; x.font = `900 44px ${FONT}`; x.textAlign = 'center'; x.fillText(`+${L.length - 17}`, cx, cy + 14); }
  const months: string[][] = Array.from({ length: 12 }, () => []); L.forEach((c) => months[c.at.getMonth()].push(c.ink));
  const mw = 940 / 12, mb = 1060;
  months.forEach((inks, m) => {
    const mx = 70 + (m + 0.5) * mw;
    inks.slice(0, 5).forEach((ink, k) => { x.fillStyle = ink; x.beginPath(); x.arc(mx, mb - 14 - k * 22, 9, 0, 7); x.fill(); });
    if (inks.length > 5) { x.fillStyle = '#2a2016'; x.font = `800 20px ${FONT}`; x.textAlign = 'center'; x.fillText(`+${inks.length - 5}`, mx, mb - 14 - 5 * 22 + 6); }
    x.fillStyle = inks.length ? '#2a2016' : 'rgba(42,32,22,.4)'; x.font = `800 22px ${FONT}`; x.textAlign = 'center'; x.fillText(`${m + 1}월`, mx, mb + 26);
  });
  let sx = 70; x.textAlign = 'left';
  SEASONS.forEach((s) => { const n = L.filter((c) => c.season.id === s.id).length; x.fillStyle = s.ink; x.beginPath(); x.arc(sx + 12, 1130, 12, 0, 7); x.fill(); x.fillStyle = '#2a2016'; x.font = `800 28px ${FONT}`; const tt = `${s.name} ${n}`; x.fillText(tt, sx + 32, 1140); sx += 32 + x.measureText(tt).width + 40; });
  const n = a.strip.length, sw = 940 / n, hs = a.strip.map((s) => s.h), lo = Math.min(...hs), hh = Math.max(...hs);
  a.strip.forEach((s, i) => { const bh = 8 + ((s.h - lo) / (hh - lo || 1)) * 52; x.fillStyle = s.now && s.ink ? s.ink : s.ink ? '#5c4630' : 'rgba(60,40,18,.18)'; x.fillRect(70 + i * sw + sw * 0.15, 1250 - bh, sw * 0.7, bh); });
  x.fillStyle = '#2a2016'; x.font = `800 28px ${FONT}`; x.textAlign = 'left'; x.fillText('100대 명산', 70, 1292);
  x.textAlign = 'right'; x.font = `900 30px ${FONT}`; x.fillText(`수첩 ${a.done} / 100`, W - 70, 1292);
  brandLine(x, W / 2, H - 18, { size: 22, color: 'rgba(42,32,22,.6)' });
  return cv;
}
/** 함께 오른 사람에게 — 그날 쪽을 사진처럼 붙이고 아래 손편지 1080×1350 */
export function companion(a: PageArgs & { to: string; from: string }, canvas: HTMLCanvasElement) {
  const [cv, x] = sized(canvas, PW, PH), W = PW, H = PH, f = a.facts, st: St = { overflow: false };
  x.fillStyle = '#F2ECDF'; x.fillRect(0, 0, W, H);
  contours(x, W * 0.78, H * 0.86, 14, 26, f.summit.id + 3, '#DCD2BC', 1.4);
  const pc = page(a, null), pw = 660, ph = (pw * H) / W;
  x.save(); x.translate(W / 2, 70 + ph / 2 + 16); x.rotate(-0.035);
  x.shadowColor = 'rgba(0,0,0,.22)'; x.shadowBlur = 28; x.shadowOffsetY = 10; x.fillStyle = '#fff'; x.fillRect(-pw / 2 - 16, -ph / 2 - 16, pw + 32, ph + 32); x.shadowColor = 'transparent';
  x.drawImage(pc, -pw / 2, -ph / 2, pw, ph);
  x.fillStyle = 'rgba(232,220,190,.82)';
  x.save(); x.translate(-pw / 2 + 30, -ph / 2 - 10); x.rotate(-0.5); x.fillRect(-60, -18, 120, 36); x.restore();
  x.save(); x.translate(pw / 2 - 30, -ph / 2 - 10); x.rotate(0.5); x.fillRect(-60, -18, 120, 36); x.restore();
  x.restore();
  const ty = 70 + ph + 112; x.fillStyle = '#23211D'; x.textAlign = 'left'; x.textBaseline = 'alphabetic';
  x.fillText(fit(x, `${a.to}에게`, 640, 64, 40, 900, st), 90, ty);
  x.fillStyle = '#4a4339'; x.font = `600 36px ${FONT}`;
  x.fillText(fit(x, `${f.date}, ${f.summit.name}${f.summit.peak ? ' ' + f.summit.peak : ''} ${f.height}.`, 640, 36, 26, 600, st), 90, ty + 66);
  x.fillText('함께 정상에 섰던 날.', 90, ty + 118);
  if (a.from) { x.textAlign = 'right'; x.fillText(fit(x, `— ${a.from}`, 400, 36, 26, 600, st), 700, ty + 182); }
  if (f.ok) stampOn(x, W - 180, ty + 70, 110, stampOpts(f, a.seasons, a.climb)); else seal(x, W - 180, ty + 70, 96, '#7C7364');
  brandLine(x, W / 2, H - 22, { size: 22, color: '#7C7364' });
  return cv;
}

/* ───────── 소리(합성, 기본 끔) — 도장 쾅 · 돌 톡 · 연필 ───────── */
let AC: AudioContext | null = null;
export function ac() {
  if (!AC) {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!C) return null;
    AC = new C();
  }
  if (AC.state === 'suspended') AC.resume();
  return AC;
}
export function sound(kind: 'thunk' | 'tick' | 'pencil') {
  const a = ac();
  if (!a) return;
  const t = a.currentTime, out = a.createGain();
  out.connect(a.destination);
  if (kind === 'thunk') {
    const o = a.createOscillator();
    o.type = 'sine';
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(48, t + 0.18);
    out.gain.setValueAtTime(0.0001, t);
    out.gain.exponentialRampToValueAtTime(0.6, t + 0.005);
    out.gain.exponentialRampToValueAtTime(0.0001, t + 0.28);
    o.connect(out);
    o.start(t);
    o.stop(t + 0.3);
  }
  const len = kind === 'pencil' ? 0.5 : kind === 'tick' ? 0.04 : 0.09;
  const buf = a.createBuffer(1, Math.ceil(a.sampleRate * len), a.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length) ** (kind === 'pencil' ? 0.6 : 3);
  const n = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
  n.buffer = buf;
  f.type = kind === 'pencil' ? 'highpass' : 'bandpass';
  f.frequency.value = kind === 'pencil' ? 3200 : kind === 'tick' ? 2400 : 900;
  g.gain.value = kind === 'pencil' ? 0.08 : kind === 'tick' ? 0.25 : 0.35;
  n.connect(f).connect(g).connect(a.destination);
  n.start(t);
}
