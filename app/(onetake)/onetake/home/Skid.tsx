'use client';

/* 타이어 자국 — 마우스(손가락)를 빠르게 움직이면 아스팔트 바닥에 검은 고무 자국 두 줄이 남고 6초에 걸쳐 옅어진다.
   자국은 페이지 좌표에 남는다(스크롤하면 바닥과 함께 올라간다). 굵기 = 움직인 속도. 본문 뒤 층(z-index 0)이라 글을 가리지 않는다.
   원 테이크 화면(.ot-take-stage) 위에서는 그리지 않는다 — 그 위는 카메라 화면이다. 모션 줄이기면 아무것도 하지 않는다. */
import { useEffect, useRef } from 'react';

type P = { x: number; y: number; t: number; w: number; nx: number; ny: number; s: number };
const LIFE = 6000;

export default function Skid() {
  const cv = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = cv.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0, H = 0, raf = 0, stroke = 0;
    const pts: P[] = [];
    let last: { x: number; y: number; t: number } | null = null;
    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      kick();
    };
    const onMove = (e: PointerEvent) => {
      const tgt = e.target as Element | null;
      if (tgt && tgt.closest && tgt.closest('.ot-take-stage')) {
        last = null;
        stroke++;
        return;
      }
      const now = performance.now(), x = e.clientX, y = e.clientY + window.scrollY;
      if (last) {
        const dx = x - last.x, dy = y - last.y, d = Math.hypot(dx, dy), dt = Math.max(1, now - last.t);
        const v = d / dt; // px/ms
        if (d > 3 && v > 0.35) {
          const w = Math.min(7, 1.4 + (v - 0.35) * 2.6);
          pts.push({ x, y, t: now, w, nx: -dy / d, ny: dx / d, s: stroke });
          if (pts.length > 1600) pts.splice(0, pts.length - 1600);
          kick();
        } else if (v <= 0.35) stroke++;
      }
      last = { x, y, t: now };
    };
    const draw = () => {
      raf = 0;
      const now = performance.now();
      while (pts.length && now - pts[0].t > LIFE) pts.shift();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const sy = window.scrollY;
      ctx.lineCap = 'round';
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i];
        if (a.s !== b.s) continue;
        const ya = a.y - sy, yb = b.y - sy;
        if ((ya < -20 && yb < -20) || (ya > H + 20 && yb > H + 20)) continue;
        const al = 0.62 * (1 - (now - b.t) / LIFE);
        ctx.strokeStyle = `rgba(3,3,4,${al.toFixed(3)})`;
        ctx.lineWidth = b.w;
        const g = 7 + b.w; // 두 바퀴 사이
        for (const k of [-1, 1]) {
          ctx.beginPath();
          ctx.moveTo(a.x + a.nx * g * k, ya + a.ny * g * k);
          ctx.lineTo(b.x + b.nx * g * k, yb + b.ny * g * k);
          ctx.stroke();
        }
      }
      if (pts.length) kick();
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const onScroll = () => {
      if (pts.length) kick();
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return <canvas className="ot-skid" ref={cv} aria-hidden="true" />;
}
