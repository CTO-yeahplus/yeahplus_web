'use client';

/**
 * 회사 홈의 스크롤 연출 — 값은 CSS 변수로만 흘려 보내 다시 렌더하지 않는다.
 * 전부 useEffect 안에서만 window 를 만진다(서버 렌더 안전).
 */
import { useEffect, useRef, useState } from 'react';

export const reduceMotion = () =>
  typeof window !== 'undefined' &&
  !!window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 요소가 화면을 가로지르는 동안 0..1 을 --p 로 쓴다.
 * start: 요소 위쪽이 화면 아래에서 이만큼(화면 높이 비율) 올라왔을 때 0,
 * end: 요소 위쪽이 화면 위에서 이만큼 남았을 때 1. 올리면 되감긴다.
 */
export function useProgressVar<T extends HTMLElement = HTMLElement>(start = 0.9, end = 0.25) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduceMotion()) {
      el.style.setProperty('--p', '1');
      return;
    }
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const h = window.innerHeight;
      const from = h * start;
      const to = h * end;
      const p = Math.min(1, Math.max(0, (from - r.top) / Math.max(1, from - to)));
      el.style.setProperty('--p', p.toFixed(4));
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
  }, [start, end]);
  return ref;
}

/** 페이지 맨 위에서 range px 만큼 내려가는 동안 0..1 을 --h 로 쓴다(히어로용). */
export function useTopProgress<T extends HTMLElement = HTMLElement>(range = 520) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion()) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      el.style.setProperty('--h', Math.min(1, Math.max(0, window.scrollY / range)).toFixed(4));
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.removeEventListener('scroll', on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [range]);
  return ref;
}

/** 화면에 들어온 .yp-rv 요소에 .yp-in 을 붙인다. JS 가 없으면 처음부터 보인다(.js 클래스가 없으므로). */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.yp-rv'));
    if (!('IntersectionObserver' in window) || reduceMotion()) {
      els.forEach((e) => e.classList.add('yp-in'));
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('yp-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.01 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

/** 여러 구역 가운데 지금 화면 가운데 걸친 것의 번호. */
export function useActiveIndex(ids: string[]) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!els.length || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            const k = els.indexOf(e.target as HTMLElement);
            if (k >= 0) setI(k);
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ids.join('|')]);
  return i;
}

/**
 * 키가 큰 구역(안에 position:sticky 무대)을 지나가는 동안 0..1 을 --b 로 쓴다 — 히어로의 「네 기둥」 연출.
 * 끝 무렵(0.9 넘음)에는 data-done 을 붙여 마지막 장면의 버튼을 누를 수 있게 한다.
 * 모션 줄이기에서는 아무것도 쓰지 않는다 — CSS 가 완성된 장면(--b: 1)을 그린다.
 * onTick 은 매 프레임 진행도와 요소를 받는다(글자 · data 속성처럼 CSS 로 못 하는 것만).
 */
export function usePinVar<T extends HTMLElement = HTMLElement>(onTick?: (p: number, el: T) => void) {
  const ref = useRef<T | null>(null);
  const cb = useRef(onTick);
  useEffect(() => {
    cb.current = onTick;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el || reduceMotion()) return;
    let raf = 0;
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 1;
      el.style.setProperty('--b', p.toFixed(4));
      el.toggleAttribute('data-done', p > 0.9);
      cb.current?.(p, el);
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
