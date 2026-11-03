'use client';

/* 캔버스 크기 맞춤 · 스크롤 진행도 · 줄인 동작 — 로켓주차 랜딩의 작은 공용 도구 */
import { useEffect, useRef, useState } from 'react';

export const reduced = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** CSS 크기에 맞춰 캔버스 픽셀을 다시 잡는다(DPR 최대 2). 바뀌었으면 true */
export function fit(c: HTMLCanvasElement, maxDpr = 2): boolean {
  const dpr = Math.min(maxDpr, window.devicePixelRatio || 1);
  const w = Math.round(c.clientWidth * dpr), h = Math.round(c.clientHeight * dpr);
  if (c.width !== w || c.height !== h) {
    c.width = w;
    c.height = h;
    return true;
  }
  return false;
}

/** 키 큰 섹션 안에서 0…1 — 섹션 위가 화면 위에 닿을 때 0, 섹션 끝이 화면 끝에 닿을 때 1 */
export function progressOf(el: HTMLElement): number {
  const r = el.getBoundingClientRect();
  const span = r.height - window.innerHeight;
  if (span <= 0) return 0;
  return Math.min(1, Math.max(0, -r.top / span));
}

/** 화면 근처에 있는지(그리기를 멈추려고) */
export function useNear<T extends HTMLElement>(margin = '200px') {
  const ref = useRef<T | null>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNear(true);
      return;
    }
    const io = new IntersectionObserver((es) => setNear(es.some((e) => e.isIntersecting)), { rootMargin: margin });
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return [ref, near] as const;
}

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const ease = (k: number) => (k <= 0 ? 0 : k >= 1 ? 1 : k * k * (3 - 2 * k));
/** p 가 [a, b] 안에서 0…1 */
export const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));
