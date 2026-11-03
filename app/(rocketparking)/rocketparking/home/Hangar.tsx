'use client';

/* 5. 격납고 — 쇼룸. 책상 사진 위 무대에 지금 고른 한 벌(기체 · 도색 · 패드 · 모양 · 발사대)이 서 있다.
   마우스를 카드에 올리면 입혀지고(앱의 '사기 전에 입혀 보기'), 무대 위 좌우 = 턴테이블처럼 돌려 보기,
   클릭 = 시험 착륙(발사대가 물러나고 → 떠올랐다가 → 그 기체의 물리로 내려앉는다 · 내릴 때마다 그을음).
   휴대폰: 탭 = 고르기, 무대 끌기 = 돌리기, 무대 탭 = 시험 착륙. 두 줄 트랙은 휠로 흐르고, 잡아 끌어도 된다.
   무엇으로 열리는지 · 색 · 치수는 앱 Collection.swift · RocketVisual.swift 와 같다(콜라보는 계약한 것만 — 여기엔 없다). */
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { burst, clamp, drawFrame, emit, HOUSE_SKIN, LOOK, setFxDensity, View, type Livery, type Look, type Mount, type PadShape, type PadSkin, type Puff, type VCls } from './render';
import { frameAt, record, withClass, type Frame, type VClass } from './sim';
import { PLATES, preload } from './plates';
import { fit, progressOf, reduced } from './stage';

type U = 'free' | 'life' | 'livery' | 'ground' | 'flights' | 'faults' | 'dailies';
const UNLOCK: Record<U, { ko: string; en: string }> = {
  free: { ko: '무료', en: 'Free' },
  life: { ko: '평생 주차권', en: 'Lifetime Parking Pass' },
  livery: { ko: '도색 컬렉션 1', en: 'Livery Collection 1' },
  ground: { ko: '주차장 컬렉션 1', en: 'Parking Lot Collection 1' },
  flights: { ko: '한 기체로 20비행', en: '20 flights on one booster' },
  faults: { ko: '비상 10번 살아 돌아오기', en: 'Survive 10 emergencies' },
  dailies: { ko: '오늘의 주차 7일', en: '7 daily parkings' },
};
const EARNED: U[] = ['flights', 'faults', 'dailies'];

type Kind = 'cls' | 'paint' | 'skin' | 'shape' | 'mount';
type Item = { id: string; ko: string; en: string; u: U; note?: [string, string]; kind: Kind };

const BOOSTERS: Item[] = [
  { id: 'standard', ko: '표준', en: 'Standard', u: 'free', kind: 'cls' },
  { id: 'heavy', ko: '헤비', en: 'Heavy', u: 'life', note: ['일찍 켜야 한다', 'Ignite early'], kind: 'cls' },
  { id: 'short', ko: '쇼트', en: 'Short', u: 'life', note: ['늦게 켜도 된다', 'Ignite late'], kind: 'cls' },
  { id: 'twin', ko: '쌍발', en: 'Twin', u: 'life', note: ['옆으로 민첩하다', 'Nimble sideways'], kind: 'cls' },
  { id: 'taxi', ko: '택시', en: 'Taxi', u: 'livery', kind: 'paint' },
  { id: 'tow', ko: '견인차', en: 'Tow Truck', u: 'livery', kind: 'paint' },
  { id: 'nightbus', ko: '심야버스', en: 'Night Bus', u: 'livery', kind: 'paint' },
  { id: 'valet', ko: '주차 요원', en: 'Parking Attendant', u: 'livery', kind: 'paint' },
  { id: 'crosswalk', ko: '횡단보도', en: 'Crosswalk', u: 'livery', kind: 'paint' },
  { id: 'sakura', ko: '벚꽃길', en: 'Cherry Blossom Road', u: 'livery', kind: 'paint' },
  { id: 'veteran', ko: '베테랑', en: 'Veteran', u: 'flights', kind: 'paint' },
  { id: 'rescue', ko: '구조대', en: 'Rescue', u: 'faults', kind: 'paint' },
  { id: 'regular', ko: '개근', en: 'Regular', u: 'dailies', kind: 'paint' },
];
const GROUND: Item[] = [
  { id: 'base', ko: '기본 패드', en: 'Standard Pad', u: 'free', kind: 'skin' },
  { id: 'asphalt', ko: '아스팔트', en: 'Asphalt', u: 'ground', kind: 'skin' },
  { id: 'grass', ko: '공원 잔디', en: 'Park Lawn', u: 'ground', kind: 'skin' },
  { id: 'neon', ko: '네온 밤', en: 'Neon Night', u: 'ground', kind: 'skin' },
  { id: 'checker', ko: '결승선', en: 'Finish Line', u: 'ground', kind: 'skin' },
  { id: 'harbor', ko: '항구 강판', en: 'Harbor Steel', u: 'ground', kind: 'skin' },
  { id: 'lot', ko: '주차 칸', en: 'Parking Bay', u: 'ground', kind: 'shape' },
  { id: 'barge', ko: '바지선', en: 'Barge', u: 'ground', kind: 'shape' },
  { id: 'roof', ko: '옥상 패드', en: 'Rooftop Pad', u: 'ground', kind: 'shape' },
  { id: 'tower', ko: '철탑', en: 'Steel Tower', u: 'ground', kind: 'mount' },
  { id: 'towerorange', ko: '주황 철탑', en: 'Orange Tower', u: 'ground', kind: 'mount' },
  { id: 'gantry', ko: '문형 크레인', en: 'Gantry Crane', u: 'ground', kind: 'mount' },
];

/* 앱 Collection.swift 의 값 그대로 */
const PAINTS: Record<string, Livery> = {
  house: { hull: '#F1F2F0', accent: LOOK.lime },
  taxi: { hull: '#f7c92a', accent: '#141414', pattern: 'checker' },
  tow: { hull: '#2c2e34', accent: '#fabe1e', ink: '#f2f2f2', pattern: 'hazard' },
  nightbus: { hull: '#18285c', accent: '#ff9628', ink: '#f2f2f2', pattern: 'pinstripe' },
  valet: { hull: '#ff6e1e', accent: '#e1e6eb', pattern: 'stencil' },
  crosswalk: { hull: '#f2f2f2', accent: '#141414', pattern: 'crosswalk' },
  sakura: { hull: '#fad6e0', accent: '#e25880', pattern: 'petals' },
  veteran: { hull: '#767064', accent: '#d6aa5c', ink: '#f2f2f2', pattern: 'pinstripe' },
  rescue: { hull: '#f2f2f2', accent: '#d62828', pattern: 'hazard' },
  regular: { hull: '#5cb2dc', accent: '#f2f2f2' },
};
const SKINS: Record<string, PadSkin> = {
  base: HOUSE_SKIN,
  asphalt: { id: 'asphalt', base: '#34363a', ink: '#f0c83c', pattern: 'asphalt' },
  grass: { id: 'grass', base: '#3c683a', ink: '#f2f2f2', pattern: 'grass' },
  neon: { id: 'neon', base: '#100e22', ink: '#ff50be', pattern: 'neon' },
  checker: { id: 'finish', base: '#ececec', ink: '#141414', pattern: 'finish', logo: '#1a1a1a' },
  harbor: { id: 'harbor', base: '#5c483a', ink: '#f0e1c8', pattern: 'harbor' },
};
const MOUNTS: Record<string, Mount> = {
  tower: { kind: 'tower', color: '#969ca4' },
  towerorange: { kind: 'tower', color: '#e86e28' },
  gantry: { kind: 'gantry', color: '#f0be28' },
};
const CLS: Record<string, VCls> = { standard: 'standard', heavy: 'heavy', short: 'sprint', twin: 'twin' };

type Sel = { cls: string; paint: string; skin: string; shape: PadShape; mount: string | null };
const START: Sel = { cls: 'standard', paint: 'house', skin: 'base', shape: 'round', mount: null };
const apply = (s: Sel, it: Item): Sel => {
  if (it.kind === 'cls') return { ...s, cls: it.id };
  if (it.kind === 'paint') return { ...s, paint: s.paint === it.id ? 'house' : it.id };
  if (it.kind === 'skin') return { ...s, skin: it.id };
  if (it.kind === 'shape') return { ...s, shape: s.shape === it.id ? 'round' : (it.id as PadShape) };
  return { ...s, mount: s.mount === it.id ? null : it.id };
};
const isOn = (s: Sel, it: Item) =>
  it.kind === 'cls' ? s.cls === it.id : it.kind === 'paint' ? s.paint === it.id : it.kind === 'skin' ? s.skin === it.id : it.kind === 'shape' ? s.shape === it.id : s.mount === it.id;
const NAME = (id: string) => [...BOOSTERS, ...GROUND].find((x) => x.id === id);

function Card({ dir, it, on, onTry, onPick }: { dir: string; it: Item; on: boolean; onTry: (it: Item | null) => void; onPick: (it: Item, mouse: boolean) => void }) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const earned = EARNED.includes(it.u);
  return (
    <button
      ref={ref}
      type="button"
      className="rp-hcard"
      data-u={it.u}
      data-on={on ? '1' : '0'}
      aria-pressed={on}
      onPointerEnter={(e) => e.pointerType === 'mouse' && onTry(it)}
      onPointerLeave={(e) => {
        if (e.pointerType === 'mouse') onTry(null);
        ref.current?.style.removeProperty('--rx');
        ref.current?.style.removeProperty('--ry');
      }}
      onPointerMove={(e) => {
        // 카드가 마우스 쪽으로 기울고 빛 반사가 따라온다
        if (e.pointerType !== 'mouse' || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        ref.current.style.setProperty('--ry', `${((x - 0.5) * 14).toFixed(1)}deg`);
        ref.current.style.setProperty('--rx', `${((0.5 - y) * 12).toFixed(1)}deg`);
        ref.current.style.setProperty('--gx', `${(x * 100).toFixed(0)}%`);
        ref.current.style.setProperty('--gy', `${(y * 100).toFixed(0)}%`);
      }}
      onClick={(e) => onPick(it, (e.nativeEvent as PointerEvent).pointerType === 'mouse')}
    >
      <Image src={`/rocketparking/${dir}/${it.id}.webp`} alt="" width={292} height={392} sizes="160px" draggable={false} />
      <span className="rp-hcard-glare" aria-hidden="true" />
      {earned && (
        <span className="rp-hcard-stamp rp-mono" aria-hidden="true">
          <span data-l="ko">돈으로 못 삼</span>
          <span data-l="en">NOT FOR SALE</span>
        </span>
      )}
      <span className="rp-hcard-cap">
        <b>
          <span data-l="ko">{it.ko}</span>
          <span data-l="en">{it.en}</span>
        </b>
        {it.note && (
          <small>
            <span data-l="ko">{it.note[0]}</span>
            <span data-l="en">{it.note[1]}</span>
          </small>
        )}
        <em className="rp-mono">
          {it.u !== 'free' && '🔒 '}
          <span data-l="ko">{UNLOCK[it.u].ko}</span>
          <span data-l="en">{UNLOCK[it.u].en}</span>
        </em>
      </span>
    </button>
  );
}

/** 한 줄 트랙 — 휠(세로 스크롤)로 흐르고, 잡아 끌면 그만큼 더 움직이며 놓으면 관성으로 미끄러진다 */
function useTrack(sec: React.RefObject<HTMLElement | null>, dirSign: 1 | -1) {
  const ref = useRef<HTMLDivElement | null>(null);
  const st = useRef({ drag: 0, vel: 0, down: false, x0: 0, d0: 0, moved: false, lastX: 0, lastT: 0 });
  useEffect(() => {
    const el = ref.current, S = sec.current;
    if (!el || !S) return;
    const T = st.current;
    const down = (e: PointerEvent) => {
      T.down = true;
      T.moved = false;
      T.x0 = T.lastX = e.clientX;
      T.d0 = T.drag;
      T.lastT = performance.now();
      T.vel = 0;
    };
    const move = (e: PointerEvent) => {
      if (!T.down) return;
      const dx = e.clientX - T.x0;
      if (!T.moved && Math.abs(dx) > 6) {
        T.moved = true;
        el.setPointerCapture(e.pointerId);
      }
      if (!T.moved) return;
      const now = performance.now();
      T.vel = (e.clientX - T.lastX) / Math.max(1, now - T.lastT);
      T.lastX = e.clientX;
      T.lastT = now;
      T.drag = T.d0 + dx;
    };
    const up = () => {
      T.down = false;
    };
    // 끌었으면 클릭은 고르기가 아니다
    const click = (e: MouseEvent) => {
      if (T.moved) {
        e.stopPropagation();
        e.preventDefault();
        T.moved = false;
      }
    };
    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('click', click, true);
    let raf = 0, pS = 0;
    const still = reduced();
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const r = S.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const pT = progressOf(S);
      pS = still ? pT : pS + (pT - pS) * 0.12;
      if (!T.down && Math.abs(T.vel) > 0.01) {
        T.drag += T.vel * 16;
        T.vel *= 0.93;
      }
      const span = Math.max(0, el.scrollWidth - window.innerWidth + 40);
      const base = dirSign === 1 ? -pS * span : -(1 - pS) * span;
      // 끌어 놓은 만큼은 남지만 줄 끝을 넘지는 않는다
      const x = Math.min(0, Math.max(-span, base + T.drag));
      T.drag = x - base;
      el.style.transform = `translate3d(${x}px,0,0)`;
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('click', click, true);
    };
  }, [sec, dirSign]);
  return ref;
}

/* 시험 착륙 — 발사대가 물러나고(1초) → 떠올라 화면 위로(1.3초) → 그 기체의 물리로 내려앉는다 → 발사대가 돌아온다 */
type Test = { t0: number; recs: Frame[]; td: number; lastTh: number; hasMount: boolean; seed: number; landed: boolean };
const T_RETRACT = 1, T_UP = 1.3, TAIL = 0.45;

export default function Hangar() {
  const sec = useRef<HTMLElement | null>(null);
  const cv = useRef<HTMLCanvasElement | null>(null);
  const a = useTrack(sec, 1);
  const b = useTrack(sec, -1);
  const [sel, setSel] = useState<Sel>(START);
  const [tryIt, setTry] = useState<Item | null>(null);
  const [flights, setFlights] = useState(0);
  const [busy, setBusy] = useState(false);
  const live = useRef({ sel: START, tryIt: null as Item | null, flights: 0, test: null as Test | null, puffs: [] as Puff[], yaw: 0.35, yawT: 0.35, mouseAt: 0, dragging: false, dx0: 0, y0: 0, tapMoved: false, fxT: 0 });
  const recs = useRef<Record<string, { frames: Frame[]; td: number }> | null>(null);

  useEffect(() => {
    live.current.sel = sel;
  }, [sel]);
  useEffect(() => {
    live.current.tryIt = tryIt;
  }, [tryIt]);
  useEffect(() => {
    live.current.flights = flights;
  }, [flights]);

  const startTest = () => {
    const L = live.current;
    if (L.test) return;
    if (!recs.current) {
      // 기체 종류마다 한 판씩 미리 — 앱과 같은 물리(헤비는 일찍 켜고, 쇼트는 늦게 켠다)
      const out: Record<string, { frames: Frame[]; td: number }> = {};
      for (const c of ['standard', 'heavy', 'sprint', 'twin'] as VClass[]) {
        const r = withClass(c, () => record({ y: 250, vy: -45, x: 0, vx: 0, leanDeg: 0 }));
        out[c] = { frames: r.frames, td: r.td?.t ?? r.frames[r.frames.length - 1].t };
      }
      recs.current = out;
    }
    const cls = CLS[L.sel.cls];
    const r = recs.current[cls];
    const last = [...r.frames].reverse().find((f) => f.on);
    L.puffs = [];
    L.test = { t0: performance.now() / 1000, recs: r.frames, td: r.td, lastTh: last?.th ?? 0.4, hasMount: !!L.sel.mount, seed: Math.floor(Math.random() * 1e6), landed: false };
    setBusy(true);
  };

  useEffect(() => {
    const el = sec.current, c = cv.current;
    if (!el || !c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const v = new View();
    const L = live.current;
    const getPlate = preload([PLATES.desk.A], () => {});
    let raf = 0, alive = true, last = performance.now();
    const still = reduced();

    // 무대 위 마우스 = 턴테이블. 손가락이면 끌어서 돌린다
    const pm = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      if (e.pointerType === 'mouse') {
        L.yawT = ((e.clientX - r.left) / r.width - 0.5) * Math.PI * 2.2;
        L.mouseAt = performance.now();
      } else if (L.dragging) {
        const dx = e.clientX - L.dx0;
        if (Math.abs(dx) > 6) L.tapMoved = true;
        L.yawT = L.y0 + (dx / r.width) * Math.PI * 2;
        L.mouseAt = performance.now();
      }
    };
    const pd = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      L.dragging = true;
      L.tapMoved = false;
      L.dx0 = e.clientX;
      L.y0 = L.yawT;
    };
    const pu = () => {
      L.dragging = false;
    };
    const click = () => {
      if (L.tapMoved) return;
      startTest();
    };
    c.addEventListener('pointermove', pm);
    c.addEventListener('pointerdown', pd);
    window.addEventListener('pointerup', pu);
    c.addEventListener('click', click);

    const loop = () => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      const r = c.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      fit(c);
      setFxDensity(c.width < 900 ? 0.6 : 0.85);
      const now = performance.now() / 1000;
      const dt = Math.min(1 / 20, (performance.now() - last) / 1000);
      last = performance.now();
      // 손을 떼고 3초 지나면 천천히 저절로 돈다
      if (!still && performance.now() - L.mouseAt > 3000 && !L.test) L.yawT += dt * 0.25;
      L.yaw += (L.yawT - L.yaw) * (still ? 1 : 0.1);

      // 지금 보이는 한 벌 = 고른 것 + 마우스를 올린 것
      const eff: Sel = L.tryIt && !isOn(L.sel, L.tryIt) ? apply(L.sel, L.tryIt) : L.sel;
      const cls = CLS[eff.cls];
      let mountK = 0;
      let pose = { x: 0, y: 0, lean: 0, legs: 1, th: 0, on: false, soot: Math.min(1, L.flights / 8), fade: 1 };
      let look = 0;
      const T = L.test;
      // 입자 시계 — 시험 착륙 중에는 그 판의 시각, 끝난 뒤에는 이어서 흘러 연기가 사그라든다
      if (T) L.fxT = now - T.t0;
      else L.fxT += dt;
      if (T) {
        const e = now - T.t0;
        const r0 = T.hasMount ? T_RETRACT : 0;
        mountK = T.hasMount ? clamp(e / T_RETRACT) : 0;
        if (e >= r0 && e < r0 + T_UP) {
          // 떠오른다 — 화면 위로 빠져나갈 때까지
          const k = (e - r0) / T_UP;
          pose = { ...pose, y: 600 * k * k, th: 1, on: true, legs: clamp(1 - (e - r0) / 0.5) };
          emit(L.puffs, e, { x: 0, y: pose.y, th: 1, on: true }, 1, T.seed + Math.floor(e * 120));
        } else if (e >= r0 + T_UP) {
          const d = e - r0 - T_UP;
          const f = frameAt(T.recs, d);
          if (d < T.td) {
            pose = { ...pose, x: f.x, y: f.y, lean: f.lean, legs: f.legs, th: f.th, on: f.on };
            if (f.on && Math.floor(d * 60) % 2 === 0) emit(L.puffs, e, { x: f.x, y: f.y, th: f.th, on: true }, 1, T.seed + Math.floor(d * 240));
          } else {
            pose = { ...pose, x: f.x, y: 0, legs: 1 };
            if (d < T.td + TAIL) pose = { ...pose, th: T.lastTh, on: true, fade: 1 - (d - T.td) / TAIL };
            if (!T.landed) {
              T.landed = true;
              burst(L.puffs, e, f.x, 46, T.seed);
              setFlights((n) => n + 1);
            }
            // 발사대가 돌아온다
            const back = d - T.td - 0.8;
            mountK = T.hasMount ? clamp(1 - back / 1) : 0;
            if (back > (T.hasMount ? 1 : 0.4)) {
              L.test = null;
              setBusy(false);
              L.puffs = L.puffs.filter((p) => e - p.ts < 4);
            }
          }
        }
        look = clamp((pose.y * 0.004 - 0.06) / 0.45) * 0.3;
      }
      const lk: Look = {
        cls,
        liv: PAINTS[eff.paint] ?? PAINTS.house,
        skin: SKINS[eff.skin] ?? HOUSE_SKIN,
        shape: eff.shape,
        mount: eff.mount ? MOUNTS[eff.mount] : null,
        mountK,
      };
      const pl = getPlate(PLATES.desk.A);
      // 무대는 가로로 긴 띠라 사진 카메라를 물린다 — 기체 꼭대기까지 한 화면에(띠가 납작할수록 더)
      // 세로 무대(휴대폰)는 기체가 화면 높이를 넘으니 그만큼 물린다
      const asp = c.width / c.height;
      const pull = asp < 1.1 ? 1.5 : clamp((asp - 1.2) / 1.8) * 0.5 + 1;
      drawFrame(ctx, v, {
        plate: pl ? { ...pl, yaw: L.yaw, dist: pl.dist * pull } : null,
        plateCam: { zoom: 1.04, look, anchorY: asp < 1.1 ? 0.86 : 0.84 },
        place: 'desk',
        pose,
        t: L.fxT,
        clock: now,
        puffs: L.puffs,
        look: lk,
      });
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      c.removeEventListener('pointermove', pm);
      c.removeEventListener('pointerdown', pd);
      window.removeEventListener('pointerup', pu);
      c.removeEventListener('click', click);
    };
    // startTest 는 ref 만 쓴다
  }, []);

  const pick = (it: Item, mouse: boolean) => {
    setSel((s) => apply(s, it));
    setTry(null);
    if (mouse) setTimeout(startTest, 0);
  };
  const nm = (id: string | null) => (id ? NAME(id) : null);
  const parts = [nm(sel.cls), sel.paint !== 'house' ? nm(sel.paint) : null, sel.skin !== 'base' ? nm(sel.skin) : null, sel.shape !== 'round' ? nm(sel.shape) : null, nm(sel.mount)].filter(Boolean) as Item[];

  return (
    <section className="rp-hangar" id="hangar" ref={sec}>
      <div className="rp-stick rp-hangar-stick">
        <div className="rp-wrap rp-hangar-head">
          <div>
            <div className="rp-eyebrow">
              HANGAR · <span data-l="ko">입혀 보기</span>
              <span data-l="en">TRY-ON</span>
            </div>
            <h2 className="rp-h2">
              <span data-l="ko">기체를 고르고, 입히고, 세운다</span>
              <span data-l="en">Pick it. Paint it. Park it.</span>
            </h2>
          </div>
          <p className="rp-hangar-hint rp-mono">
            <span data-l="ko" className="rp-hint-mouse">카드에 올리면 입혀진다 · 무대 위 좌우 = 돌려 보기 · 클릭 = 시험 착륙</span>
            <span data-l="en" className="rp-hint-mouse">Hover a card to try it on · move across the stage to turn it · click to test-land</span>
            <span data-l="ko" className="rp-hint-touch">탭 = 고르기 · 무대 끌기 = 돌리기 · 무대 탭 = 시험 착륙</span>
            <span data-l="en" className="rp-hint-touch">Tap to pick · drag the stage to turn · tap the stage to test-land</span>
          </p>
        </div>
        <div className="rp-stage">
          <canvas className="rp-stage-cv" ref={cv} aria-label="격납고 무대 — 지금 고른 기체와 패드" />
          <div className="rp-stage-ui rp-console rp-mono">
            <div className="rp-stage-row">
              <span>B-001</span>
              <span>
                <span data-l="ko">비행</span>
                <span data-l="en">FLIGHTS</span> <b>{String(flights).padStart(2, '0')}</b>
              </span>
            </div>
            <div className="rp-stage-set">
              {parts.map((p) => (
                <span key={p.id}>
                  <span data-l="ko">{p.ko}</span>
                  <span data-l="en">{p.en}</span>
                </span>
              ))}
            </div>
            <div className="rp-stage-btns">
              <button type="button" className="rp-btn rp-btn-go" onClick={startTest} disabled={busy}>
                ▼ <span data-l="ko">시험 착륙</span>
                <span data-l="en">Test landing</span>
              </button>
              <button
                type="button"
                className="rp-btn"
                onClick={() => {
                  setSel(START);
                  setFlights(0);
                }}
              >
                <span data-l="ko">새 기체</span>
                <span data-l="en">Fresh booster</span>
              </button>
            </div>
          </div>
          {tryIt && !isOn(sel, tryIt) && (
            <div className="rp-stage-try rp-mono">
              <span data-l="ko">입혀 보는 중 · {tryIt.ko}</span>
              <span data-l="en">Trying on · {tryIt.en}</span>
            </div>
          )}
        </div>
        <div className="rp-track" ref={a}>
          {BOOSTERS.map((it) => (
            <Card key={it.id} dir="boosters" it={it} on={isOn(sel, it)} onTry={setTry} onPick={pick} />
          ))}
        </div>
        <div className="rp-track rp-track-b" ref={b}>
          {GROUND.map((it) => (
            <Card key={it.id} dir="ground" it={it} on={isOn(sel, it)} onTry={setTry} onPick={pick} />
          ))}
        </div>
      </div>
    </section>
  );
}
