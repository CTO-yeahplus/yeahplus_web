'use client';

/* 2. 후루룩 줄 — 수첩 아래 100칸 눈금. 칸 높이 = 실제 산 높이(앱과 같다, 한라산 1,947m 가 가장 높다).
   훑으면(끌기 · 마우스 올리기 · 방향키) 그 산 쪽으로 수첩이 넘어간다. 화면에 들어오면 한 번 저절로 훑는다(줄인 동작이면 안 함).
   견본 수첩: 23곳에 도장(철 색) — 실제 기록이 아니다. */
import { useEffect, useMemo, useRef, useState } from 'react';
import { BOOK_ORDER, REGION_EN, REGIONS } from './summits';
import { makeStamp, no3, rng, SEASONS, tilt } from './engine';
import { reduced, useNear } from './stage';

const LO = Math.min(...BOOK_ORDER.map((s) => s.height));
const HI = Math.max(...BOOK_ORDER.map((s) => s.height));
// 견본 도장 23곳(씨앗 고정 — 그릴 때마다 같다)
const DONE: Map<number, number> = (() => {
  const R = rng('riffle-sample'), m = new Map<number, number>();
  while (m.size < 23) m.set(BOOK_ORDER[Math.floor(R() * 100)].id, Math.floor(R() * 4));
  return m;
})();
const START = BOOK_ORDER.findIndex((s) => s.name === '북한산');
// 눈금 아래 지역 이름(좁은 칸이라 짧게)
const SHORT_EN: Record<string, string> = { 수도권: 'Seoul', 강원: 'Gangwon', 충청: 'Chung.', 전라: 'Jeolla', 경상: 'Gyeongsang', 제주: 'Jeju' };

export default function Riffle() {
  const [i, setI] = useState(START);
  const [flip, setFlip] = useState(0);
  const [wrapRef, near] = useNear<HTMLElement>('-15% 0px');
  const strip = useRef<HTMLDivElement | null>(null);
  const stampBox = useRef<HTMLDivElement | null>(null);
  const played = useRef(false);
  const dragging = useRef(false);
  const s = BOOK_ORDER[i];
  const si = DONE.get(s.id);

  const go = (k: number) => {
    const n = Math.max(0, Math.min(99, k));
    setI((cur) => {
      if (cur !== n) setFlip((f) => f + 1);
      return n;
    });
  };
  const at = (clientX: number) => {
    const el = strip.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    go(Math.floor(((clientX - r.left) / r.width) * 100));
  };

  // 처음 화면에 들어오면 한 번 후루룩(앞에서 북한산까지가 아니라 끝까지 갔다가 북한산으로)
  useEffect(() => {
    if (!near || played.current || reduced()) return;
    played.current = true;
    let k = 0, raf = 0, last = 0;
    const step = (t: number) => {
      if (t - last > 22) {
        last = t;
        k += 1;
        if (k <= 99) go(k);
        else if (k <= 99 + 20) go(Math.round(99 - ((99 - START) * (k - 99)) / 20));
        else return;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [near]);

  useEffect(() => {
    const box = stampBox.current;
    if (!box) return;
    box.innerHTML = '';
    const c = si == null ? makeStamp(84, { summit: s, empty: true }) : makeStamp(84, { summit: s, ink: SEASONS[si].ink, seasons: new Set([SEASONS[si].id]), date: `2026.${String(3 + si * 3).padStart(2, '0')}.14` });
    if (si != null) c.style.transform = `rotate(${((tilt(s.id) * 180) / Math.PI).toFixed(1)}deg)`;
    box.appendChild(c);
  }, [s, si]);

  const groups = useMemo(() => REGIONS.map((r) => ({ r, n: BOOK_ORDER.filter((x) => x.region === r).length })), []);

  return (
    <section className="sb-sec sb-riffle" ref={wrapRef}>
      <div className="sb-wrap">
        <div className="sb-eyebrow">
          <span data-l="ko">02 · 백 칸</span>
          <span data-l="en">02 · ONE HUNDRED PAGES</span>
        </div>
        <h2 className="sb-h2">
          <span data-l="ko">훑으면 능선이 된다.</span>
          <span data-l="en">Riffle the pages, and they form a ridge.</span>
        </h2>
        <p className="sb-lead">
          <span data-l="ko">수첩 아래 눈금 100칸은 산 100곳의 실제 높이다. 지역마다 한 줄기 능선. 손가락으로 훑으면 그 산 쪽이 펼쳐진다.</span>
          <span data-l="en">The 100 ticks under the notebook are the real heights of the 100 mountains, region by region. Run a finger along them to flip to that page.</span>
        </p>

        <div className="sb-riffle-stage">
          <div className="sb-rpage-stack" aria-live="polite">
            <div className="sb-rpage-under" />
            <div className="sb-rpage" key={flip}>
              <div className="sb-rpage-top">
                <small className="sb-mono">
                  {no3(s.id)} · <span data-l="ko">{s.region}</span>
                  <span data-l="en">{REGION_EN[s.region]}</span>
                </small>
                <small className="sb-mono">{i + 1} / 100</small>
              </div>
              <h3>{s.name}</h3>
              <p>
                <span data-l="ko">
                  {s.peak} · 해발 {s.height.toLocaleString('ko-KR')}m
                </span>
                <span data-l="en">{s.height.toLocaleString('en-US')} m above sea level</span>
                <br />
                <span>{s.sido}</span>
              </p>
              <svg className="sb-rpage-ridge" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
                <path d={pencilRidge(s.id, s.height)} />
              </svg>
              <div className="sb-rpage-stamp" ref={stampBox} />
              <div className="sb-rpage-seasons" aria-hidden="true">
                {SEASONS.map((x, k) => (
                  <i key={x.id} style={{ background: k === si ? x.ink : 'transparent', borderColor: k === si ? x.ink : undefined }} />
                ))}
              </div>
            </div>
          </div>

          <div
            className="sb-strip"
            ref={strip}
            role="slider"
            tabIndex={0}
            aria-label="산 100곳 훑기"
            aria-valuemin={1}
            aria-valuemax={100}
            aria-valuenow={i + 1}
            aria-valuetext={`${s.name} ${s.height}m`}
            onPointerDown={(e) => {
              dragging.current = true;
              (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
              at(e.clientX);
            }}
            onPointerMove={(e) => {
              if (dragging.current || e.pointerType === 'mouse') at(e.clientX);
            }}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
                e.preventDefault();
                go(i + 1);
              }
              if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
                e.preventDefault();
                go(i - 1);
              }
              if (e.key === 'Home') go(0);
              if (e.key === 'End') go(99);
            }}
          >
            {BOOK_ORDER.map((m, k) => {
              const d = DONE.get(m.id);
              return (
                <i
                  key={m.id}
                  className={k === i ? 'sb-tick sb-tick-on' : 'sb-tick'}
                  style={{ height: `${14 + ((m.height - LO) / (HI - LO)) * 86}%`, background: k === i ? undefined : d != null ? SEASONS[d].ink : undefined }}
                />
              );
            })}
          </div>
          <div className="sb-strip-regions" aria-hidden="true">
            {groups.map((g) => (
              <span key={g.r} style={{ flex: g.n }}>
                <span data-l="ko">{g.r}</span>
                <span data-l="en">{SHORT_EN[g.r]}</span>
              </span>
            ))}
          </div>
          <p className="sb-note">
            <span data-l="ko">색칸 = 견본 수첩에서 도장 받은 산(철 색). 실제 기록이 아니다.</span>
            <span data-l="en">Coloured ticks = stamped mountains in a sample notebook (in season ink). Not real records.</span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* 쪽 위 연필 능선 — 산 번호 씨앗, 높을수록 솟는다 */
function pencilRidge(id: number, h: number) {
  const R = rng('pr' + id), peak = 0.3 + R() * 0.4, top = 58 - (12 + ((h - LO) / (HI - LO)) * 40);
  let d = 'M0 58 ';
  for (let k = 0; k <= 20; k++) {
    const t = k / 20, y = 58 - (58 - top) * Math.max(0.12, 1 - Math.abs(t - peak) * (1.6 + R() * 0.6)) + (R() - 0.5) * 4;
    d += `L${(t * 200).toFixed(1)} ${y.toFixed(1)} `;
  }
  return d;
}
