'use client';

/* 카드 기울기 · 화면에 들어왔는지 — 원 테이크 랜딩 전용 작은 도구 */
import { useEffect, useRef, useState } from 'react';

export const reduced = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** 마우스 쪽으로 카드가 기운다(최대 deg) + 빛 반사 위치(--gx/--gy) + 그림 시차(--px/--py). 마우스가 있는 기기만 */
export function useTilt<T extends HTMLElement>(deg = 7) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced() || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = clamp((e.clientX - r.left) / r.width), y = clamp((e.clientY - r.top) / r.height);
      el.style.setProperty('--ry', `${((x - 0.5) * 2 * deg).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${((0.5 - y) * 2 * deg * 0.8).toFixed(2)}deg`);
      el.style.setProperty('--gx', `${(x * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${(y * 100).toFixed(1)}%`);
      el.style.setProperty('--px', ((x - 0.5) * 2).toFixed(3));
      el.style.setProperty('--py', ((y - 0.5) * 2).toFixed(3));
    };
    const leave = () => {
      for (const k of ['--rx', '--ry', '--px', '--py']) el.style.removeProperty(k);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    };
  }, [deg]);
  return ref;
}

/** 화면에 들어온 적이 있는지 — 한 번 true 가 되면 그대로 */
export function useSeen<T extends HTMLElement>(threshold = 0.3) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced() || typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}
