'use client';

/**
 * 원본 NEXTGEN_CINEMATIC/site/src/motion.js 를 옮긴 것 — 동작은 그대로, 타입만 붙였다.
 * 전부 useEffect 안에서만 window 를 만진다 (서버 렌더 안전).
 * 연속 값은 React state 가 아니라 CSS 변수(--p)로 흘려 보내 재렌더 없이 60fps 를 유지한다.
 */
import { useEffect, useRef, useState } from 'react';

export const reduceMotion = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 화면에 들어오면 true (한 번만) */
export function useInView<T extends Element = HTMLElement>(
  opts: { margin?: string; threshold?: number } = {}
) {
  const ref = useRef<T | null>(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      setIn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIn(true);
          io.disconnect();
        }
      },
      { rootMargin: opts.margin || '0px 0px -15% 0px', threshold: opts.threshold || 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView] as const;
}

/**
 * 스크롤 진행도 0..1 — 섹션 위쪽이 화면 위에 닿을 때 0, 섹션 끝이 화면 아래에 닿을 때 1.
 * el.style 에 --p 를 쓰고, 이산 단계가 필요하면 onStep(p) 로 받는다.
 */
export function useScrollProgress<T extends HTMLElement = HTMLElement>(onStep?: (p: number) => void) {
  const ref = useRef<T | null>(null);
  const cb = useRef(onStep);
  useEffect(() => {
    cb.current = onStep;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p =
        span > 0
          ? Math.min(1, Math.max(0, -r.top / span))
          : r.top < window.innerHeight * 0.5
            ? 1
            : 0;
      el.style.setProperty('--p', p.toFixed(4));
      if (cb.current) cb.current(p);
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
  }, []);
  return ref;
}

/** 일정 간격으로 index 를 돌린다. paused 면 멈춤. */
export function useCycle(n: number, ms: number, paused: boolean) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (paused || reduceMotion()) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(t);
  }, [n, ms, paused]);
  return [i, setI] as const;
}
