'use client';

/* 스크롤(휠) 진행도 — 장면마다 화면을 붙잡아 두고(sticky) 지나가는 동안 0..1 을 준다. 올리면 그대로 되감긴다.
   묘해(app/(meow)/meow/home/motion.ts)의 것을 옮겼다. 실록 머리글은 고정이 아니라서 HEADER 는 0.
   모션 줄이기를 켠 기기에서는 rest 값으로 멈춰 서 있고, still 이 true 가 된다(장면을 펼쳐 놓은 꼴로 그린다). */
import { useEffect, useRef, useState } from 'react';

const HEADER = 0;

export const reduced = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
/** p 가 a→b 를 지나는 동안 0→1 */
export const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function usePin<T extends HTMLElement>(rest = 1) {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  const [still, setStill] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) {
      // 모션 줄이기: 처음 한 번만 정해지는 값이라 effect 안에서 맞춘다
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setStill(true);
      setP(rest);
      return;
    }
    let raf = 0;
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

/** 화면에 들어온 적이 있는지 — 한 번 true 가 되면 그대로 */
export function useSeen<T extends HTMLElement>() {
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
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen] as const;
}

/** 0 → to 로 세는 숫자 (seen 이 true 가 되면 시작) */
export function useCount(to: number, on: boolean, ms = 1100) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    if (reduced()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setV(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = clamp((t - t0) / ms);
      setV(Math.round(to * ease(k)));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [to, on, ms]);
  return v;
}
