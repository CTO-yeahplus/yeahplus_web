'use client';

/* 하루 시계 — 화면 가운데를 지나는 장(data-scene)의 장면 머리를 왼쪽 아래 작은 띠에. 동그라미 = 그 시각의 하늘.
   표지 · 약속 · 표 같은 장면 밖에서는 숨는다. 스크롤 · 크기 바뀜에 다시 잰다(IntersectionObserver 는 창 크기만 바뀌면 늦었다). */
import { useEffect, useState } from 'react';
import { SCENES, skyOf, type SceneId } from './Scene';

export default function DayClock() {
  const [cur, setCur] = useState<SceneId | null>(null);
  useEffect(() => {
    // 화면 가운데 줄을 지나는 장 — 스크롤 · 크기 바뀜마다 한 번(장은 열 개뿐이라 직접 잰다)
    let raf = 0;
    const pick = () => {
      raf = 0;
      const m = window.innerHeight / 2;
      const el = Array.from(document.querySelectorAll<HTMLElement>('[data-scene]')).find((e) => {
        const r = e.getBoundingClientRect();
        return r.top <= m && r.bottom > m;
      });
      setCur(el ? (el.dataset.scene as SceneId) : null);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(pick);
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
  const s = cur ? SCENES[cur] : null;
  const c = s ? skyOf(s.h) : null;
  return (
    <div className="sb-clock" data-on={s ? '1' : '0'} aria-hidden="true">
      <i style={c ? { background: `linear-gradient(${c[0]}, ${c[1]} 60%, ${c[2]})` } : undefined} />
      {s && (
        <>
          <b>{s.n}</b>
          {s.time && <span className="sb-clock-t">{s.time}</span>}
          <span className="sb-clock-p">
            <span data-l="ko">{s.ko}</span>
            <span data-l="en">{s.en}</span>
          </span>
        </>
      )}
    </div>
  );
}
