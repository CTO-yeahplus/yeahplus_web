'use client';

/* 원본 seodang/web/src/hooks.js 를 옮긴 것 — 동작은 그대로, 타입을 붙이고
   서버 렌더에서 window 를 만지지 않도록 초기값만 안전하게 바꿨다. */

import { useEffect, useRef, useState } from 'react';

/** 동작 줄이기 설정을 따른다 */
export function useReducedMotion() {
  // 서버 렌더에는 matchMedia 가 없다 — 마운트 후 실제 값을 반영한다.
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduce(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduce;
}

/** 화면에 들어오면 한 번만 true — 나타나기 효과에 쓴다 */
export function useInView<T extends Element = HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.18 }
) {
  const ref = useRef<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    if (!('IntersectionObserver' in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.unobserve(e.target);
        }
      });
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen]);
  return [ref, seen] as const;
}

/** 요소가 화면을 지나가는 동안의 진행도 0~1 (스크롤 연동 연출) */
export function useScrollProgress(ref: React.RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const calc = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - innerHeight;
      setP(total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(calc);
    };
    calc();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ref]);
  return p;
}

/** 스크롤 방향에 따라 상단 바를 숨긴다 */
export function useHideOnScroll(offset = 240) {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    let last = scrollY;
    const on = () => {
      const y = scrollY;
      setHidden(y > last && y > offset);
      last = y;
    };
    addEventListener('scroll', on, { passive: true });
    return () => removeEventListener('scroll', on);
  }, [offset]);
  return hidden;
}

/** 0 → n 까지 세어 올린다 */
export function useCountUp(n: number, start: boolean, ms = 1100) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (ms === 0) {
      setV(n);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(n * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [n, start, ms]);
  return v;
}
