'use client';

/* 스크롤 진행도 · 화면 근처 · 줄인 동작 — 완등 수첩 소개 페이지의 작은 공용 도구(다른 제품 페이지의 stage.ts 와 같은 틀) */
import { useEffect, useRef, useState } from 'react';

export const reduced = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** 키 큰 섹션 안에서 0…1 — 섹션 위가 화면 위에 닿을 때 0, 섹션 끝이 화면 끝에 닿을 때 1 */
export function progressOf(el: HTMLElement): number {
  const r = el.getBoundingClientRect();
  const span = r.height - window.innerHeight;
  if (span <= 0) return 0;
  return Math.min(1, Math.max(0, -r.top / span));
}

/** 화면 근처에 있는지(그리기 · 자동 재생을 멈추려고) */
export function useNear<T extends HTMLElement>(margin = '120px', threshold = 0) {
  const ref = useRef<T | null>(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNear(true);
      return;
    }
    const io = new IntersectionObserver((es) => setNear(es.some((e) => e.isIntersecting)), { rootMargin: margin, threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [margin, threshold]);
  return [ref, near] as const;
}

/** 스크롤에 따라 0…1 을 돌려준다(rAF 로 한 번에 한 번만). 화면 밖이면 듣지 않는다 */
export function useScrollProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setP(progressOf(el));
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, p] as const;
}

export const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
export const ease = (k: number) => (k <= 0 ? 0 : k >= 1 ? 1 : k * k * (3 - 2 * k));
/** p 가 [a, b] 안에서 0…1 */
export const seg = (p: number, a: number, b: number) => Math.min(1, Math.max(0, (p - a) / (b - a)));

/** 진동(되는 기기만) — 안드로이드 크롬 등. iOS 사파리는 조용히 넘어간다 */
export const buzz = (ms: number | number[]) => {
  try {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) navigator.vibrate(ms);
  } catch {}
};
