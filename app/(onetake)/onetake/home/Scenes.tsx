'use client';

/* 2. 장소 7곳 — 화면을 붙잡아 두고(sticky), 세로 휠만큼 카드 줄이 가로로 지나간다.
   카드마다 그림이 반대 방향으로 조금 밀리는 시차(--par) + 마우스 기울기(useTilt).
   섹션 높이 = 가로로 갈 거리 + 화면 높이(재서 넣는다). 모션 줄이기면 세로로 펼친다(CSS). */
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { SCENES } from './data';
import { clamp, reduced, useTilt } from './motion';

function Card({ s }: { s: (typeof SCENES)[number] }) {
  const ref = useTilt<HTMLElement>(5);
  return (
    <article className="ot-card" ref={ref}>
      <div className="ot-shot">
        <Image src={`/onetake/scenes/${s.id}.webp`} alt="" width={1600} height={900} sizes="(max-width:720px) 90vw, 820px" />
        <div className="ot-glare" />
        <span className={s.free ? 'ot-tag-pill free' : 'ot-tag-pill'}>
          <span data-l="ko">{s.free ? '그냥 열림' : '장소 평생권'}</span>
          <span data-l="en">{s.free ? 'Free' : 'All Locations pass'}</span>
        </span>
        <div className="ot-cap">
          <div className="ot-no">SCENE {String(s.no).padStart(2, '0')}</div>
          <h3>
            <span data-l="ko">{s.ko}</span>
            <span data-l="en">{s.en}</span>
          </h3>
          <div className="ot-sub">
            <span data-l="ko">{s.subKo}</span>
            <span data-l="en">{s.subEn}</span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Scenes() {
  const sec = useRef<HTMLElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const bar = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sec.current, tr = track.current;
    if (!el || !tr || reduced()) return;
    let dist = 0, raf = 0;
    const measure = () => {
      dist = Math.max(0, tr.scrollWidth - window.innerWidth);
      el.style.height = `${dist + window.innerHeight}px`;
      on();
    };
    const tick = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      const p = span > 0 ? clamp(-r.top / span) : 0;
      tr.style.transform = `translate3d(${(-p * dist).toFixed(1)}px,0,0)`;
      bar.current?.style.setProperty('--w', `${(p * 100).toFixed(2)}%`);
      const mid = window.innerWidth / 2;
      tr.querySelectorAll<HTMLElement>('.ot-card').forEach((c) => {
        const b = c.getBoundingClientRect();
        c.style.setProperty('--par', `${(((b.left + b.width / 2 - mid) / window.innerWidth) * -42).toFixed(1)}px`);
      });
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    measure();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="ot-scenes" id="scenes" ref={sec}>
      <div className="ot-scenes-pin">
        <div className="ot-wrap ot-scenes-head">
          <div className="ot-eyebrow">LOCATIONS · 7</div>
          <h2 className="ot-h2">
            <span data-l="ko">장소마다 샷 리스트가 다르다</span>
            <span data-l="en">Every location has its own shot list</span>
          </h2>
        </div>
        <div className="ot-track" ref={track}>
          {SCENES.map((s) => (
            <Card key={s.id} s={s} />
          ))}
        </div>
        <div className="ot-wrap">
          <div className="ot-scenes-bar" ref={bar}>
            <b />
          </div>
        </div>
      </div>
    </section>
  );
}
