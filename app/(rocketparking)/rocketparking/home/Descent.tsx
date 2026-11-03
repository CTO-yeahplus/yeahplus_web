'use client';

/* 0. 히어로 — 휠 = 시간. 굴리는 만큼 부스터가 떨어지고, 멈추면 공중에 멈추고, 올리면 되감긴다.
   한 판은 앱과 같은 물리(호버 슬램 봇)로 미리 돌려 두고 프레임을 감는다.
   구간: 착륙장 놓기 → 낙하 → 점화 창 → 점화 → 접지 → 정적 · 도장 → 다시 착륙(0.25×, 카메라가 돈다). */
import { useEffect, useRef, useState } from 'react';
import { frameAt, needAt, record, SCALE, type Frame } from './sim';
import { burst, clamp, drawFrame, emit, RING_R, setFxDensity, View, type Place, type PlateCam, type Puff } from './render';
import { PLATES, preload } from './plates';
import { ease, fit, lerp, progressOf, reduced, seg } from './stage';

const START = { y: 250, vy: -45, x: 6, vx: -0.6, leanDeg: 2 };
const REC = record(START);
const FR = REC.frames;
const T_TD = REC.td?.t ?? FR[FR.length - 1].t;
const T_IGN = REC.ign;
const T_OPEN = (() => {
  for (const f of FR) if (f.y <= needAt(f.vy, f.fuel) * 1.35) return f.t;
  return T_IGN;
})();
const T_LEGS = FR.find((f) => f.legs > 0)?.t ?? T_TD;
/** 접지 뒤 화염이 사그라드는 시간(초) — 끈 순간의 출력에서 0 으로 */
const TAIL = 0.45;
const TH_LAST = [...FR].reverse().find((f) => f.on)?.th ?? 0.4;
const PUFFS: Puff[] = (() => {
  const out: Puff[] = [];
  FR.forEach((f, i) => i % 2 === 0 && emit(out, f.t, f, Math.round(f.th * 2), i));
  burst(out, T_TD, FR[FR.length - 1].x, 46, 999);
  return out;
})();

/* 진행도 → 장면. 점화 앞뒤에 휠을 더 많이 쓴다(그 1초가 전부라서). */
const K = { place: 0.1, a: 0.3, b: 0.47, td: 0.62, settle: 0.76 };
function simTime(p: number): number {
  if (p < K.place) return 0;
  if (p < K.a) return lerp(0, T_OPEN - 0.6, seg(p, K.place, K.a));
  if (p < K.b) return lerp(T_OPEN - 0.6, T_IGN + 0.5, seg(p, K.a, K.b));
  if (p < K.td) return lerp(T_IGN + 0.5, T_TD, seg(p, K.b, K.td));
  if (p < K.settle) return T_TD + seg(p, K.td, K.settle) * 3.2;
  // 다시 착륙: 접지 3.4초 전부터 0.25 배속으로
  return T_TD - 3.4 + seg(p, K.settle, 0.985) * 4.2;
}

/** 사진 판 카메라 — 폰은 제자리. 높이 떠 있을 땐 올려다보고, 접지 뒤 패드로 다가가고, 다시 착륙은 낮춘 판(B)으로 컷 */
function plateFor(p: number, f: Frame): { which: 'A' | 'B'; pc: PlateCam } {
  const by = f.y * SCALE;
  if (p < K.place) return { which: 'A', pc: { zoom: lerp(1.3, 1.16, ease(seg(p, 0, K.place))), look: 0 } };
  if (p < K.td) return { which: 'A', pc: { zoom: 1.16, look: clamp((by - 0.06) / 0.45) } };
  if (p < K.settle) {
    const k = ease(seg(p, K.td, K.settle));
    return { which: 'A', pc: { zoom: lerp(1.16, 1.42, k), look: 0, anchorY: lerp(0.66, 0.76, k) } };
  }
  return { which: 'B', pc: { zoom: lerp(1.0, 1.14, seg(p, K.settle, 1)), look: 0, anchorY: 0.7 } };
}

function camFor(p: number, f: Frame) {
  const by = f.y * SCALE;
  if (p < K.place) {
    const k = ease(seg(p, 0, K.place));
    return { yaw: lerp(0.5, 0.22, k), el: lerp(0.62, 0.36, k), dist: lerp(1.25, 0.95, k), ty: lerp(0.05, 0.3, k), fov: 0.9 };
  }
  if (p < K.td) {
    const k = ease(seg(p, K.td - 0.06, K.td));
    return { yaw: 0.22, el: lerp(0.36, 0.3, k), dist: lerp(0.62 + by * 0.62, 0.5, k), ty: lerp(by * 0.5 + 0.05, 0.08, k), fov: 0.9 };
  }
  if (p < K.settle) {
    const k = ease(seg(p, K.td, K.settle));
    return { yaw: lerp(0.22, 0.05, k), el: lerp(0.3, 0.2, k), dist: lerp(0.5, 0.42, k), ty: 0.085, fov: 0.9 };
  }
  // 다시 착륙 — 폰을 들고 돌며 본다
  const k = seg(p, K.settle, 1);
  return { yaw: lerp(0.05, -1.55, ease(k)), el: lerp(0.12, 0.28, k), dist: lerp(0.32 + by * 0.5, 0.36, k), ty: 0.07 + by * 0.45, fov: 0.95 };
}

const BEATS: { a: number; b: number; ko: [string, string?]; en: [string, string?]; big?: boolean }[] = [
  { a: 0, b: 0.085, ko: ['카메라가 비추는 자리가 착륙장이 된다.', '책상, 정류장 벤치, 대합실 바닥.'], en: ['Wherever your camera looks becomes a landing pad.', 'A desk. A bus-stop bench. A station floor.'], big: true },
  { a: 0.11, b: 0.2, ko: ['머리 위 1미터. 축척으로는 250미터.'], en: ['One metre overhead. Two hundred and fifty, to scale.'] },
  { a: 0.2, b: 0.29, ko: ['점화는 한 번뿐이다.'], en: ['You get one ignition.'], big: true },
  { a: 0.31, b: 0.4, ko: ['줄어드는 고리가 닿는 순간 — 지금.'], en: ['When the shrinking ring touches — now.'] },
  { a: 0.43, b: 0.52, ko: ['최소 출력에서도 엔진이 무게보다 세다.', '떠 있을 수 없다. 내려앉거나, 다시 올라가거나.'], en: ['Even at minimum, the engine out-pushes its weight.', "It can't hover. It lands, or it climbs."] },
  { a: 0.52, b: 0.6, ko: ['늦으면 부딪히고, 이르면 다시 올라간다.'], en: ['Too late and it hits. Too early and it climbs away.'] },
  { a: 0.79, b: 0.97, ko: ['세우면, 그 자리에서 다시 착륙한다.', '0.25배속. 폰을 낮추고 가까이. 돌면서 봐도 된다.'], en: ['Land it, and it lands again right there.', 'Quarter speed. Get the phone down low, or walk around it.'] },
];

const PLACES: { id: Place; ko: string; en: string }[] = [
  { id: 'bench', ko: '정류장 벤치', en: 'Bus-stop bench' },
  { id: 'desk', ko: '내 책상', en: 'My desk' },
  { id: 'station', ko: '대합실 바닥', en: 'Station floor' },
];

const LOG = [
  { t: 0, ko: '낙하 시작 · 고도 250m', en: 'DROP · ALT 250 m' },
  { t: T_OPEN, ko: '점화 창 진입', en: 'IGNITION WINDOW' },
  { t: T_IGN, ko: '점화 · 출력 100%', en: 'IGNITION · THR 100%' },
  { t: T_LEGS, ko: '착륙 다리 전개', en: 'LEGS DEPLOYING' },
  { t: T_TD, ko: `접지 확인 · ${REC.td?.vs.toFixed(1)}m/s`, en: `TOUCHDOWN · ${REC.td?.vs.toFixed(1)} m/s` },
];

export default function Descent() {
  const sec = useRef<HTMLElement | null>(null);
  const cv = useRef<HTMLCanvasElement | null>(null);
  const hud = useRef<HTMLDivElement | null>(null);
  const [place, setPlace] = useState<Place>('bench');
  const placeRef = useRef<Place>('bench');
  useEffect(() => {
    placeRef.current = place;
  }, [place]);

  useEffect(() => {
    const el = sec.current, c = cv.current, H = hud.current;
    if (!el || !c || !H) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const v = new View();
    const q = (s: string) => H.querySelector<HTMLElement>(s);
    const n = {
      alt: q('[data-k=alt]'),
      real: q('[data-k=real]'),
      vs: q('[data-k=vs]'),
      thr: q('[data-k=thr]'),
      fuel: q('[data-k=fuel]'),
      clock: q('[data-k=clock]'),
      mark: q('[data-k=mark]'),
      band: q('[data-k=band]'),
      stamp: q('[data-k=stamp]'),
      box: q('[data-k=box]'),
      hint: q('[data-k=hint]'),
      now: q('[data-k=now]'),
    };
    const logs = Array.from(H.querySelectorAll<HTMLElement>('[data-log]'));
    const beats = Array.from(H.querySelectorAll<HTMLElement>('[data-beat]'));
    let pS = progressOf(el), raf = 0, alive = true;
    const getPlate = preload(Object.values(PLATES).flatMap((x) => [x.A, x.B]), () => {});
    // 맞춤 확인용: ?rpcal=bench-A 면 그 판에 선 기체를 고정해서 보여 준다(사진 바꿀 때 px · py · el · dist 잡는 데)
    const cal = typeof location !== 'undefined' ? new URLSearchParams(location.search).get('rpcal') : null;
    const still = reduced();
    const t0 = performance.now();

    const frame = () => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      const r = el.getBoundingClientRect();
      if (r.bottom < -50 || r.top > window.innerHeight + 50) return;
      const pT = progressOf(el);
      pS = still ? pT : pS + (pT - pS) * 0.16;
      const p = pS;
      fit(c);
      // 입자 수 — 큰 화면(픽셀 많음)과 휴대폰에서는 덜 그린다
      setFxDensity(c.width * c.height > 4.5e6 ? 0.7 : c.width < 900 ? 0.6 : 1);
      const ts = simTime(p);
      const f = frameAt(FR, ts);
      const now = (performance.now() - t0) / 1000;
      v.set(c.width, c.height, camFor(p, f));
      const placeK = ease(seg(p, 0.02, K.place));
      // 예고 고리: 창이 열리는 순간 판정 고리에 닿는다
      let hint: number | null = null, hintNow = false;
      if (p >= K.place && p < K.td && ts < T_IGN) {
        if (ts < T_OPEN) hint = RING_R + Math.min(0.5, (T_OPEN - ts) * 0.11);
        else {
          hint = RING_R;
          hintNow = true;
        }
      }
      const visible = p >= K.place * 0.8;
      const pf = plateFor(p, f);
      const calP = cal ? (cal.split('-') as [Place, 'A' | 'B']) : null;
      const spec = calP ? PLATES[calP[0]][calP[1]] : PLATES[placeRef.current][pf.which];
      drawFrame(ctx, v, {
        plate: getPlate(spec),
        plateCam: calP ? { zoom: 1, look: 0 } : pf.pc,
        place: placeRef.current,
        pose: calP
          ? { x: 0, y: 0, lean: 0, legs: 1, th: 0, on: false }
          : visible
            ? ts >= T_TD && ts < T_TD + TAIL
              ? { x: f.x, y: f.y, lean: f.lean, legs: f.legs, th: TH_LAST, on: true, fade: 1 - (ts - T_TD) / TAIL }
              : { x: f.x, y: f.y, lean: f.lean, legs: f.legs, th: f.th, on: f.on }
            : { x: 0, y: 900, lean: 0, legs: 0, th: 0, on: false },
        t: ts,
        clock: now,
        puffs: PUFFS,
        hint,
        hintNow,
      });
      // 화면 밖 — 앱처럼 위쪽 화살표 + 고도(사진 판은 폰이 제자리라 높을 땐 안 보인다)
      if (visible && p < K.td && !calP) {
        const nose = v.p([f.x * SCALE, f.y * SCALE + 0.24, 0]);
        const tail = v.p([f.x * SCALE, f.y * SCALE, 0]);
        if (tail.y < c.height * 0.02) {
          const x = Math.min(c.width - 40, Math.max(40, nose.x));
          const s = c.height / 900;
          const blink = 0.6 + 0.4 * Math.sin(now * 8);
          ctx.save();
          ctx.fillStyle = `rgba(255,179,31,${blink})`;
          ctx.beginPath();
          ctx.moveTo(x, c.height * 0.12);
          ctx.lineTo(x - 16 * s, c.height * 0.12 + 22 * s);
          ctx.lineTo(x + 16 * s, c.height * 0.12 + 22 * s);
          ctx.closePath();
          ctx.fill();
          ctx.font = `700 ${Math.round(15 * s)}px ui-monospace,Menlo,monospace`;
          ctx.textAlign = 'center';
          ctx.fillStyle = '#FFB31F';
          ctx.fillText(`${Math.max(0, f.y).toFixed(0)} m`, x, c.height * 0.12 + 46 * s);
          ctx.restore();
        }
      }
      // 착륙장 놓기 — 스캔 점과 퍼지는 고리
      if (p < K.place + 0.02) {
        const c0 = v.p([0, 0, 0]);
        ctx.save();
        ctx.globalAlpha = 1 - placeK;
        ctx.fillStyle = 'rgba(199,237,64,.9)';
        for (let i = 0; i < 90; i++) {
          const a = (i * 2.399) % (Math.PI * 2), d = Math.sqrt(i / 90) * 0.5;
          const pt = v.p([Math.cos(a) * d, 0, Math.sin(a) * d]);
          const tw = 0.5 + 0.5 * Math.sin(now * 3 + i);
          ctx.fillRect(pt.x - 1.5, pt.y - 1.5, 3 * tw + 1, 3 * tw + 1);
        }
        ctx.strokeStyle = 'rgba(199,237,64,.8)';
        ctx.lineWidth = 2;
        const rr = (0.12 + ((now * 0.25) % 1) * 0.35) * c0.s;
        ctx.beginPath();
        ctx.ellipse(c0.x, c0.y, rr, rr * Math.sin(v.cam.el), 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      // 화면 가장자리 — 중계 프레임
      if (p >= K.settle) {
        const lb = Math.round(c.height * 0.085 * ease(seg(p, K.settle, K.settle + 0.03)));
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, c.width, lb);
        ctx.fillRect(0, c.height - lb, c.width, lb);
      }

      // HUD
      const alt = Math.max(0, f.y);
      if (n.alt) n.alt.textContent = alt.toFixed(0).padStart(3, '0');
      if (n.real) n.real.textContent = (alt * SCALE * 100).toFixed(0);
      if (n.vs) n.vs.textContent = (-f.vy).toFixed(1);
      if (n.thr) n.thr.textContent = (f.th * 100).toFixed(0);
      if (n.fuel) n.fuel.textContent = (f.fuel * 100).toFixed(0);
      if (n.clock) n.clock.textContent = 'T+' + Math.max(0, ts).toFixed(2).padStart(5, '0');
      if (n.mark) n.mark.style.bottom = `${clamp(alt / 250) * 100}%`;
      const need = needAt(f.vy, f.fuel);
      if (n.band) {
        n.band.style.bottom = `${clamp(need / 250) * 100}%`;
        n.band.style.height = `${clamp((need * 0.35) / 250) * 100}%`;
        n.band.dataset.on = ts >= T_OPEN && ts < T_IGN + 0.15 ? '1' : '0';
      }
      if (n.now) n.now.dataset.on = hintNow ? '1' : '0';
      H.dataset.phase = p < K.place ? 'place' : p < K.td ? 'fall' : p < K.settle ? 'land' : 'replay';
      logs.forEach((l) => (l.dataset.on = ts >= +(l.dataset.log || 0) && p >= K.place ? '1' : '0'));
      beats.forEach((b) => {
        const a = +(b.dataset.a || 0), z = +(b.dataset.b || 0);
        const k = Math.min(seg(p, a, a + 0.015), 1 - seg(p, z - 0.015, z));
        b.style.opacity = String(k);
        b.style.transform = `translateY(${(1 - k) * 14}px)`;
      });
      if (n.stamp) n.stamp.dataset.on = p > K.td + 0.045 && p < K.settle ? '1' : '0';
      if (n.box) n.box.dataset.on = p > K.td + 0.02 && p < K.settle ? '1' : '0';
      if (n.hint) n.hint.style.opacity = String(1 - seg(p, 0.0, 0.03));
    };
    raf = requestAnimationFrame(frame);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  const v = REC.v;
  return (
    <section className="rp-descent" ref={sec} aria-label="로켓주차 — 착륙 한 판">
      <div className="rp-stick">
        <canvas className="rp-cv" ref={cv} aria-hidden="true" />
        <div className="rp-hud" ref={hud} data-phase="place">
          <div className="rp-hud-top">
            <span className="rp-live">
              <i /> LIVE
            </span>
            <span className="rp-mono">MISSION 001</span>
            <span className="rp-mono" data-k="clock">
              T+00.00
            </span>
          </div>

          <div className="rp-tele rp-console">
            <div>
              <small>ALT</small>
              <b data-k="alt">250</b>
              <em>m</em>
            </div>
            <div className="rp-tele-real">
              <small>
                <span data-l="ko">실제</span>
                <span data-l="en">REAL</span>
              </small>
              <b data-k="real">100</b>
              <em>cm</em>
            </div>
            <div>
              <small>V/S</small>
              <b data-k="vs">45.0</b>
              <em>m/s</em>
            </div>
            <div>
              <small>THR</small>
              <b data-k="thr">0</b>
              <em>%</em>
            </div>
            <div>
              <small>FUEL</small>
              <b data-k="fuel">100</b>
              <em>%</em>
            </div>
          </div>

          <div className="rp-rail" aria-hidden="true">
            <span className="rp-rail-band" data-k="band" />
            <span className="rp-rail-mark" data-k="mark" />
            <small className="rp-rail-top">250</small>
            <small className="rp-rail-bot">0</small>
          </div>

          <div className="rp-now" data-k="now">
            <span data-l="ko">지금</span>
            <span data-l="en">NOW</span>
          </div>

          <ol className="rp-log rp-console">
            {LOG.map((l) => (
              <li key={l.en} data-log={l.t}>
                <span className="rp-mono">T+{l.t.toFixed(1)}</span> <span data-l="ko">{l.ko}</span>
                <span data-l="en">{l.en}</span>
              </li>
            ))}
          </ol>

          {BEATS.map((b) => (
            <div key={b.en[0]} className={b.big ? 'rp-beat rp-beat-big' : 'rp-beat'} data-beat data-a={b.a} data-b={b.b}>
              <p data-l="ko">
                {b.ko[0]}
                {b.ko[1] && <small>{b.ko[1]}</small>}
              </p>
              <p data-l="en">
                {b.en[0]}
                {b.en[1] && <small>{b.en[1]}</small>}
              </p>
            </div>
          ))}

          <div className="rp-landed" data-k="box">
            <div className="rp-stamp" data-k="stamp">
              LANDED
            </div>
            <div className="rp-landed-score">
              <b>{v.grade}</b>
              <span>{v.score}</span>
            </div>
            <div className="rp-mono rp-landed-line">
              <span data-l="ko">
                접지 {REC.td?.vs.toFixed(1)}m/s · 기울기 {REC.td?.tilt.toFixed(0)}° · 중심에서 {REC.td?.dist.toFixed(1)}m
              </span>
              <span data-l="en">
                Touchdown {REC.td?.vs.toFixed(1)} m/s · tilt {REC.td?.tilt.toFixed(0)}° · {REC.td?.dist.toFixed(1)} m off centre
              </span>
            </div>
          </div>

          <div className="rp-replay-tag rp-mono">
            <span data-l="ko">다시 착륙 · 0.25×</span>
            <span data-l="en">RE-LAND · 0.25×</span>
          </div>

          <div className="rp-places" role="group" aria-label="장소">
            {PLACES.map((pl) => (
              <button key={pl.id} type="button" aria-pressed={place === pl.id} onClick={() => setPlace(pl.id)}>
                <span data-l="ko">{pl.ko}</span>
                <span data-l="en">{pl.en}</span>
              </button>
            ))}
          </div>

          <div className="rp-wheel" data-k="hint">
            <span className="rp-wheel-icon" aria-hidden="true">
              <i />
            </span>
            <span data-l="ko">휠을 굴리면 떨어진다 · 멈추면 멈춘다</span>
            <span data-l="en">Scroll to drop it · stop and it stops</span>
          </div>
        </div>
      </div>
    </section>
  );
}
