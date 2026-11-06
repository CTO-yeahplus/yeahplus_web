'use client';

/* 2. 후루룩 줄 — 수첩 아래 100칸 눈금. 칸 높이 = 실제 산 높이(앱과 같다, 한라산 1,947m 가 가장 높다).
   훑으면(끌기 · 마우스 올리기 · 방향키) 그 산 쪽으로 수첩이 넘어간다. 화면에 들어오면 한 번 저절로 훑는다(줄인 동작이면 안 함).
   견본 수첩: 23곳에 도장(철 색) — 실제 기록이 아니다. */
import { useEffect, useMemo, useRef, useState } from 'react';
import { BOOK_ORDER, REGION_EN, REGIONS } from './summits';
import { makeStamp, no3, rng, seasonOf, SEASONS, tilt, type Season } from './engine';
import { reduced, useNear } from './stage';
import { Nb, sceneAttrs, Slug } from './Scene';

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
  // 리본 — 내일 갈 산 하나(앱 닫힌 수첩의 리본 줄과 같은 말)
  const [rib, setRib] = useState<number | null>(null);
  const [nowS, setNowS] = useState<Season>(SEASONS[2]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNowS(seasonOf(new Date()));
  }, []);
  const ribS = rib == null ? null : BOOK_ORDER.find((x) => x.id === rib) || null;
  const ribSi = ribS ? DONE.get(ribS.id) : undefined;
  const tail =
    ribSi == null
      ? ['아직 오르지 않았다', 'not climbed yet']
      : SEASONS[ribSi].id === nowS.id
        ? [`${nowS.name} 도장은 찍었다 · 3철 남음`, `${nowS.en} stamp done · three seasons to go`]
        : [`${nowS.name} 칸이 비었다`, `the ${nowS.en.toLowerCase()} box is empty`];

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
    <section className="sb-sec sb-riffle" ref={wrapRef} {...sceneAttrs('eve')}>
      <div className="sb-wrap">
        <Slug id="eve" />
        <h2 className="sb-h2">
          <span data-l="ko">리본을 끼우는 건, 내일 일찍 일어나겠다는 약속이다.</span>
          <span data-l="en">Slipping in the ribbon is a promise to get up early tomorrow.</span>
        </h2>
        <p className="sb-lead">
          <span data-l="ko">
            물병을 채우고, 귤 두 개, 핫팩, 장갑 한 켤레 더. 날씨를 몇 번이고 새로 고치고, 알람은 세 개. 그 산을 고른 이유가 있다 — 오래전에
            &lsquo;언젠가&rsquo;라고 접어 둔 산이거나, 작년 가을에 갔던 산의 겨울이 궁금해서.
          </span>
          <span data-l="en">
            Fill the water bottle; two tangerines, hand warmers, a spare pair of gloves. Refresh the weather again and again, set three alarms. You
            picked this mountain for a reason — one you folded down as &ldquo;someday&rdquo; long ago, or last autumn&rsquo;s mountain whose winter
            you want to see.
          </span>
        </p>
        <Nb
          ko="아래 줄 100칸은 산 100곳의 실제 높이. 훑어서 내일 산을 고르고 리본을 끼우면, 닫힌 수첩 위에 그 산이 남는다. 언젠가의 산엔 귀퉁이를 접는다."
          en="The 100 ticks below are the real heights of the 100 mountains. Riffle to tomorrow's mountain and slip in the ribbon — it stays on the closed notebook. Someday-mountains get a dog-ear."
        />

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
              <button
                type="button"
                className={`sb-rib${rib === s.id ? ' sb-rib-on' : ''}`}
                aria-pressed={rib === s.id}
                aria-label="리본"
                onClick={() => setRib((r) => (r === s.id ? null : s.id))}
              >
                <i />
              </button>
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
          <p className="sb-ribline" aria-live="polite">
            {ribS ? (
              <>
                <span data-l="ko">
                  리본이 끼워진 쪽 — <b>{ribS.name}</b> · {tail[0]}
                </span>
                <span data-l="en">
                  Ribbon in — <b>{ribS.name}</b> · {tail[1]}
                </span>
              </>
            ) : (
              <>
                <span data-l="ko">쪽 오른쪽 위 리본을 눌러, 내일 갈 산에 끼워 보기</span>
                <span data-l="en">Tap the ribbon at the top right of the page to mark tomorrow&rsquo;s mountain</span>
              </>
            )}
          </p>
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
