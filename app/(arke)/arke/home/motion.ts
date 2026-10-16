'use client';

/* 스크롤(휠) 진행도 — 장면마다 화면을 붙잡아 두고(sticky) 지나가는 동안 0..1 을 준다.
   올리면 그대로 되감긴다. 모션 줄이기를 켠 기기에서는 rest 값으로 멈춰 서 있다. */
import { useEffect, useRef, useState } from 'react';

export const HEADER = 57; // layout.tsx 의 .ark-nav 높이(12+32+12 + 테두리 1)

export const reduced = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** p 가 a→b 를 지나는 동안 0→1 */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
/** 도장이 '쾅' — 크게 떠 있다가 살짝 지나쳐 내려앉는다 */
export const slam = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2));

export function usePin<T extends HTMLElement>(rest = 1) {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  const [still, setStill] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    if (reduced()) {
      // 모션 줄이기: 붙잡지 않고 완성된 모습(rest)으로 — 다음 프레임에 한 번만 정한다
      raf = requestAnimationFrame(() => {
        setStill(true);
        setP(rest);
      });
      return () => cancelAnimationFrame(raf);
    }
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - (window.innerHeight - HEADER);
      const v = span > 0 ? clamp((HEADER - r.top) / span) : r.top < window.innerHeight / 2 ? 1 : 0;
      setP((o) => (Math.abs(o - v) < 0.0015 ? o : v));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [rest]);
  return [ref, p, still] as const;
}
