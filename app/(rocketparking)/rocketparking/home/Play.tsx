'use client';

/* 1. 직접 세우기 — 브라우저에서 한 판. 물리 · 판정은 앱과 같다(sim.ts).
   쉬움: 한 번 누르면 점화, 감속 · 자세는 자동(앱 '쉬움'과 같은 보조).
   보통: 앱 엄지 출력 띠처럼 — 누른 채 위아래로 끌면 출력(화면 아래 = 0 · 위 = 100%), 휠로도 올리고 내린다.
   40% 선을 넘는 순간 점화, 점화 뒤 40% 아래로 내리면 엔진 끔(다시 못 켠다). 손을 떼도 출력은 그대로. 마우스 좌우 = 폰을 옆으로 옮기는 몸짓(카메라가 돈다). 오늘의 주차는 앱과 같은 날 같은 조건. */
import { useEffect, useRef, useState } from 'react';
import { bot, daily, dayIndex, makeState, needAt, SCALE, step, V, verdict, windowStatus, type Daily, type State, type Verdict } from './sim';
import { burst, drawFrame, emit, View, type Puff } from './render';
import { fit, lerp } from './stage';

type Mode = 'easy' | 'normal';
type Result = { v: Verdict; s: State; open: number | null; close: number | null; daily: boolean; capped: boolean };

const KIND = [
  { ko: '좁은 칸', en: 'Tight spot' },
  { ko: '옆바람', en: 'Crosswind' },
  { ko: '평행주차', en: 'Parallel parking' },
  { ko: '연료 부족', en: 'Low fuel' },
];
function dailyDetail(d: Daily) {
  if (d.kind === 0) return { ko: `칸 지름 ${Math.round(d.padRadius * 0.8)}cm`, en: `Spot ${Math.round(d.padRadius * 0.8)} cm wide` };
  if (d.kind === 1) return { ko: `바람 세기 ${d.level}/3`, en: `Wind ${d.level}/3` };
  if (d.kind === 2) return { ko: '서 있는 기체 옆 칸에', en: 'Beside the parked booster' };
  return { ko: `연료 ${Math.round(d.fuel * 100)}% · 늦게 켜야 남는다`, en: `${Math.round(d.fuel * 100)}% fuel · ignite late` };
}
const REASON: Record<string, { ko: string; en: string }> = {
  tooFast: { ko: '너무 빨리 닿았다', en: 'Hit too fast' },
  legs: { ko: '다리가 덜 펴졌다', en: 'Legs not locked' },
  tipped: { ko: '넘어졌다', en: 'Tipped over' },
  slid: { ko: '미끄러졌다', en: 'Slid off' },
  offPad: { ko: '패드 밖에 섰다', en: 'Stood off the pad' },
  flewAway: { ko: '다시 올라갔다 — 일찍 켰다', en: 'Climbed away — ignited early' },
  parked: { ko: '서 있던 기체에 너무 붙었다', en: 'Too close to the parked booster' },
};

/* 합성 소리 — 외부 파일 없이 Web Audio 로 */
class Snd {
  ac: AudioContext;
  g: GainNode;
  lp: BiquadFilterNode;
  sub: OscillatorNode;
  sg: GainNode;
  constructor() {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ac = new AC();
    const len = this.ac.sampleRate * 2;
    const buf = this.ac.createBuffer(1, len, this.ac.sampleRate);
    const d = buf.getChannelData(0);
    let b = 0;
    for (let i = 0; i < len; i++) {
      b = (b + 0.02 * (Math.random() * 2 - 1)) / 1.02;
      d[i] = b * 3.5;
    }
    const src = this.ac.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    this.lp = this.ac.createBiquadFilter();
    this.lp.type = 'lowpass';
    this.g = this.ac.createGain();
    this.g.gain.value = 0;
    src.connect(this.lp).connect(this.g).connect(this.ac.destination);
    src.start();
    this.sub = this.ac.createOscillator();
    this.sub.frequency.value = 48;
    this.sg = this.ac.createGain();
    this.sg.gain.value = 0;
    this.sub.connect(this.sg).connect(this.ac.destination);
    this.sub.start();
  }
  engine(th: number, on: boolean) {
    const t = this.ac.currentTime;
    this.g.gain.setTargetAtTime(on ? 0.25 + th * 0.55 : 0, t, 0.05);
    this.lp.frequency.setTargetAtTime(on ? 260 + th * 1100 : 200, t, 0.05);
    this.sg.gain.setTargetAtTime(on ? th * 0.22 : 0, t, 0.08);
  }
  blip(f: number, dur = 0.08, vol = 0.18, type: OscillatorType = 'square') {
    const o = this.ac.createOscillator(), g = this.ac.createGain(), t = this.ac.currentTime;
    o.type = type;
    o.frequency.value = f;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.ac.destination);
    o.start(t);
    o.stop(t + dur + 0.02);
  }
  thump(hard: number) {
    const o = this.ac.createOscillator(), g = this.ac.createGain(), t = this.ac.currentTime;
    o.frequency.setValueAtTime(110, t);
    o.frequency.exponentialRampToValueAtTime(36, t + 0.35);
    g.gain.setValueAtTime(0.5 + hard * 0.3, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    o.connect(g).connect(this.ac.destination);
    o.start(t);
    o.stop(t + 0.55);
  }
  close() {
    this.ac.close().catch(() => {});
  }
}

export default function Play() {
  const cv = useRef<HTMLCanvasElement | null>(null);
  const box = useRef<HTMLDivElement | null>(null);
  const [mode, setMode] = useState<Mode>('easy');
  const [phase, setPhase] = useState<'idle' | 'fall' | 'done'>('idle');
  const [res, setRes] = useState<Result | null>(null);
  const [sound, setSound] = useState(true);
  const [best, setBest] = useState<number | null>(null);
  const [today, setToday] = useState<Daily | null>(null);
  const live = useRef({
    s: null as State | null,
    puffs: [] as Puff[],
    grip: 0,
    press: false,
    mode: 'easy' as Mode,
    yaw: 0.2,
    yawT: 0.2,
    open: null as number | null,
    close: null as number | null,
    dly: null as Daily | null,
    phase: 'idle' as 'idle' | 'fall' | 'done',
    snd: null as Snd | null,
    sound: true,
    ticks: 0,
    endAt: 0,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(daily(dayIndex()));
    try {
      const b = localStorage.getItem('rocketparking.site.best');
      if (b) setBest(+b);
    } catch {}
  }, []);
  useEffect(() => {
    live.current.mode = mode;
  }, [mode]);
  useEffect(() => {
    live.current.sound = sound;
    if (!sound) live.current.snd?.engine(0, false);
  }, [sound]);

  const gripFromY = (y: number) => {
    const c = cv.current;
    if (!c) return 0;
    const r = c.getBoundingClientRect();
    return Math.min(1, Math.max(0, (r.bottom - y - r.height * 0.1) / (r.height * 0.8)));
  };

  const start = (useDaily: boolean) => {
    const L = live.current;
    const d = useDaily ? daily(dayIndex()) : null;
    const r = () => Math.random() * 2 - 1;
    const st = { y: 250, vy: -45 + r() * 5, x: r() * 6, vx: r() * 1.2, leanDeg: r() * 2, fuel: d?.fuel ?? 1 };
    L.s = makeState(st);
    // 점화 창은 '켜지 않고 떨어지면' 기준으로 미리 잰다(앱 winOpenT · winCloseT 와 같다) — 일찍 켜도 창이 따라 움직이지 않게
    const ref = makeState(st);
    L.open = null;
    L.close = null;
    while (!ref.done && ref.t < 20) {
      const w = windowStatus(ref).status;
      if (w === 'now' && L.open == null) L.open = ref.t;
      if (w === 'late' && L.close == null) {
        L.close = ref.t;
        break;
      }
      step(ref, { throttle: 0, gimbal: 0 }, 1 / 120, d?.wind ?? 0, 250);
    }
    L.puffs = [];
    L.grip = 0;
    L.press = false;
    L.dly = d;
    L.ticks = 0;
    L.phase = 'fall';
    if (L.sound && !L.snd) {
      try {
        L.snd = new Snd();
      } catch {}
    }
    L.snd?.ac.resume();
    setRes(null);
    setPhase('fall');
    box.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  useEffect(() => {
    const c = cv.current, B = box.current;
    if (!c || !B) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const v = new View();
    const L = live.current;
    let raf = 0, last = performance.now(), alive = true;
    const gauge = B.querySelector<HTMLElement>('[data-k=grip]');
    const gfill = B.querySelector<HTMLElement>('[data-k=gfill]');
    const alt = B.querySelector<HTMLElement>('[data-k=alt]');
    const vs = B.querySelector<HTMLElement>('[data-k=vs]');
    const now = B.querySelector<HTMLElement>('[data-k=now]');

    const press = (on: boolean, y?: number) => {
      const s = L.s;
      if (L.phase !== 'fall' || !s) return;
      L.press = on;
      if (on && L.mode === 'easy' && !s.ignited) L.grip = 1;
      if (on && L.mode === 'normal') L.grip = y != null ? gripFromY(y) : 1;
    };
    const wheel = (e: WheelEvent) => {
      if (L.phase !== 'fall') return;
      e.preventDefault();
      const s = L.s;
      if (!s) return;
      const up = e.deltaY < 0; // 휠을 밀어 올리면 출력 ↑
      const k = Math.min(0.2, Math.abs(e.deltaY) / 400 + 0.03);
      if (L.mode === 'easy') {
        if (!s.ignited) L.grip = 1;
        else if (!up) L.grip = Math.max(0, L.grip - k); // 쉬움에서도 내리면 꺼진다(앱과 같다)
      } else L.grip = Math.min(1, Math.max(0, L.grip + (up ? k : -k)));
    };
    const key = (e: KeyboardEvent, on: boolean) => {
      if (L.phase !== 'fall') return;
      if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
        e.preventDefault();
        press(on);
      }
      if (on && (e.code === 'ArrowDown' || e.code === 'KeyS')) {
        e.preventDefault();
        L.grip = Math.max(0, L.grip - 0.15);
        L.press = false;
      }
    };
    const kd = (e: KeyboardEvent) => key(e, true), ku = (e: KeyboardEvent) => key(e, false);
    const pd = (e: PointerEvent) => {
      if (L.phase === 'fall') {
        e.preventDefault();
        press(true, e.clientY);
      }
    };
    const pu = () => press(false);
    const pm = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      L.yawT = lerp(-0.75, 0.75, Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
      if (L.press && L.mode === 'normal' && L.phase === 'fall') L.grip = gripFromY(e.clientY);
    };
    window.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    c.addEventListener('pointerdown', pd);
    window.addEventListener('pointerup', pu);
    c.addEventListener('pointermove', pm);

    const finish = (s: State) => {
      const d = L.dly;
      let v = s.flewAway ? verdict(null) : verdict(s.td, d ? d.padRadius : V.padRadius);
      // 평행주차 — 서 있던 기체(x = −33m)와 9m 안이면 부딪힌 것(앱 ParkingRule.parkedClearance)
      if (d?.parked && s.td && s.x < -33 + 9) v = { stands: false, reason: 'parked', grade: 'NG', score: 0, pts: [0, 0, 0, 0] };
      // 쉬움은 일찍 눌러도 관제가 감속해 서 버린다 → S 는 창 안에서 켰을 때만(앱과 같다)
      const off = s.ignitedAt != null && L.open != null ? s.ignitedAt - L.open : null;
      const capped = L.mode === 'easy' && v.grade === 'S' && off != null && L.close != null && (off < -0.05 || off > L.close - L.open! + 0.05);
      if (capped) v = { ...v, grade: 'A' };
      L.phase = 'done';
      L.endAt = s.t;
      if (s.td) {
        burst(L.puffs, s.t, s.x, 46, Math.floor(s.t * 100));
        L.snd?.thump(Math.min(1, s.td.vs / 6));
      }
      L.snd?.engine(0, false);
      if (v.grade !== 'NG') setTimeout(() => L.snd?.blip(880, 0.12, 0.12, 'triangle'), 350);
      const r: Result = { v, s: { ...s }, open: L.open, close: L.close, daily: !!d, capped };
      setRes(r);
      setPhase('done');
      if (v.score > 0) {
        setBest((b) => {
          const nb = Math.max(b ?? 0, v.score);
          try {
            localStorage.setItem('rocketparking.site.best', String(nb));
          } catch {}
          return nb;
        });
      }
    };

    const loop = () => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      const t = performance.now();
      const dt = Math.min(1 / 30, (t - last) / 1000);
      last = t;
      const r = c.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      fit(c);
      L.yaw += (L.yawT - L.yaw) * 0.08;
      const s = L.s;
      const d = L.dly;
      const ringR = (d ? d.padRadius : V.padRadius) * SCALE;
      if (s && L.phase === 'fall') {
        // 입력
        // 쉬움: 첫 누름이 grip=1(점화) · 보통: 누르면 100%, 떼면 grip(점화 때 40% 로 맞춰 둔다 — 휠로 내리면 꺼진다)
        const th = L.grip;
        const assist = bot(s, 1.12, 0, d?.wind ?? 0);
        let inp = { throttle: th, gimbal: assist.gimbal };
        if (L.mode === 'easy' && s.ignited && th >= V.minThrottle) inp = { throttle: Math.max(V.minThrottle, assist.throttle), gimbal: assist.gimbal };
        const was = s.ignited;
        // 딱 · 딱 · 지금 — 창이 열리기 1초 · 0.5초 전, 그리고 열리는 순간
        if (!s.ignited && L.open != null) {
          const tt = L.open - s.t;
          const beat = tt <= 0 ? 3 : tt < 0.5 ? 2 : tt < 1 ? 1 : 0;
          if (beat > L.ticks) {
            L.ticks = beat;
            if (L.sound) L.snd?.blip(beat === 3 ? 1320 : 660, beat === 3 ? 0.14 : 0.05, beat === 3 ? 0.16 : 0.12);
          }
        }
        step(s, inp, dt, d?.wind ?? 0, 250);
        if (!was && s.ignited && L.sound) L.snd?.blip(180, 0.18, 0.25, 'sawtooth');
        emit(L.puffs, s.t, { x: s.x, y: s.y, th: s.throttle, on: s.engineOn }, s.engineOn ? 1 : 0, Math.floor(s.t * 240));
        if (L.sound) L.snd?.engine(s.throttle, s.engineOn);
        if (s.done) finish(s);
      }
      const S0 = s ?? makeState({ y: 900, vy: 0, x: 0, vx: 0, leanDeg: 0 });
      const by = Math.min(1.05, S0.y * SCALE);
      const idle = L.phase === 'idle';
      v.set(c.width, c.height, {
        yaw: L.yaw,
        el: idle ? 0.42 : 0.3,
        dist: idle ? 0.75 : 0.55 + by * 0.6,
        ty: idle ? 0.12 : by * 0.5 + 0.05,
        fov: 0.9,
      });
      let hint: number | null = null, hintNow = false;
      if (s && L.phase === 'fall' && !s.ignited) {
        const need = needAt(s.vy, s.fuel / V.fuelMass) * 1.35;
        const tt = (s.y - need) / Math.max(1, -s.vy);
        if (tt > 0) hint = ringR + Math.min(0.5, tt * 0.11);
        else {
          hint = ringR;
          hintNow = windowStatus(s).status === 'now';
        }
      }
      drawFrame(ctx, v, {
        place: d?.kind === 1 ? 'bench' : d ? 'station' : 'desk',
        pose: s ? { x: s.x, y: s.y, lean: s.lean, legs: s.legs, th: s.throttle, on: s.engineOn } : { x: 0, y: 900, lean: 0, legs: 0, th: 0, on: false },
        t: L.phase === 'done' ? (L.endAt += dt * 0.5) : (s?.t ?? 0),
        clock: t / 1000,
        puffs: L.puffs,
        hint,
        hintNow,
        ringR,
        parked: d?.parked ? -33 : null,
      });
      // 계기
      if (s && gfill && gauge) {
        const g = L.phase === 'fall' ? (L.mode === 'easy' ? s.throttle : s.ignited && !s.engineOn ? 0 : L.grip) : 0;
        gfill.style.height = `${Math.round(g * 100)}%`;
        gauge.dataset.cut = s.shutdown ? '1' : '0';
      }
      if (alt && s) alt.textContent = Math.max(0, s.y).toFixed(0);
      if (vs && s) vs.textContent = (-s.vy).toFixed(1);
      if (now) now.dataset.on = hintNow ? '1' : '0';
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('wheel', wheel);
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      c.removeEventListener('pointerdown', pd);
      window.removeEventListener('pointerup', pu);
      c.removeEventListener('pointermove', pm);
      L.snd?.close();
      L.snd = null;
    };
  }, []);

  useEffect(() => {
    live.current.phase = phase;
  }, [phase]);

  const td = res?.s.td;
  const ignOff = res && res.s.ignitedAt != null && res.open != null ? res.s.ignitedAt - res.open : null;
  const win = res && res.open != null && res.close != null ? res.close - res.open : null;
  const rs = res?.v.reason ? REASON[res.v.reason] : null;
  // 너무 빨리 닿은 까닭 — 측정한 것만 말한다
  const cause =
    res?.v.reason !== 'tooFast' || res.s.ignitedAt == null
      ? null
      : res.s.shutdown
        ? { ko: '점화 뒤 출력을 40% 아래로 내려 엔진이 꺼졌다', en: 'Throttle dropped below 40% after ignition — engine out' }
        : ignOff != null && win != null && ignOff > win
          ? { ko: '늦게 켰다', en: 'Ignited late' }
          : { ko: '감속이 모자랐다 — 출력을 더 오래', en: 'Not enough braking — more thrust, longer' };
  const dd = today ? dailyDetail(today) : null;

  return (
    <section className="rp-sec rp-play" id="play">
      <div className="rp-wrap">
        <div className="rp-eyebrow">
          TRY IT · <span data-l="ko">브라우저에서 한 판</span>
          <span data-l="en">ONE RUN IN YOUR BROWSER</span>
        </div>
        <h2 className="rp-h2">
          <span data-l="ko">직접 세워 보기</span>
          <span data-l="en">Land one yourself</span>
        </h2>
        <p className="rp-lead">
          <span data-l="ko">앱과 같은 물리, 같은 점수. 고리가 판정 고리에 닿는 순간 누른다. 마우스를 좌우로 움직이면 폰을 옆으로 옮긴 것처럼 깊이가 보인다.</span>
          <span data-l="en">Same physics and scoring as the app. Press the moment the ring meets the pad ring. Move the mouse sideways to see depth, like shifting your phone.</span>
        </p>
      </div>

      <div className="rp-play-box" ref={box} data-phase={phase}>
        <canvas className="rp-play-cv" ref={cv} aria-label="착륙 화면" />

        <div className="rp-play-gauge" data-k="grip" aria-hidden="true">
          <span className="rp-play-gfill" data-k="gfill" />
          <span className="rp-play-gmin" />
          <small>THR</small>
        </div>
        <div className="rp-play-tele rp-console rp-mono">
          ALT <b data-k="alt">250</b>m · V/S <b data-k="vs">45.0</b>
        </div>
        <div className="rp-now rp-play-now" data-k="now">
          <span data-l="ko">지금</span>
          <span data-l="en">NOW</span>
        </div>

        {phase === 'idle' && (
          <div className="rp-play-panel rp-console">
            <div className="rp-play-modes" role="group" aria-label="보조">
              <button type="button" aria-pressed={mode === 'easy'} onClick={() => setMode('easy')}>
                <span data-l="ko">쉬움</span>
                <span data-l="en">Easy</span>
              </button>
              <button type="button" aria-pressed={mode === 'normal'} onClick={() => setMode('normal')}>
                <span data-l="ko">보통</span>
                <span data-l="en">Normal</span>
              </button>
            </div>
            <p className="rp-play-how">
              {mode === 'easy' ? (
                <>
                  <span data-l="ko">한 번 누른다(클릭 · 스페이스 · 휠 · 탭). 감속과 자세는 관제가 맡는다. 타이밍만 네 몫.</span>
                  <span data-l="en">Press once (click, space, wheel or tap). Control handles the slowdown. Timing is yours.</span>
                </>
              ) : (
                <>
                  <span data-l="ko">앱의 엄지 출력 띠처럼: 누른 채 위아래로 끌거나 휠을 굴린다. 40% 선을 넘으면 점화, 점화 뒤 40% 아래로 내리면 엔진이 꺼지고 다시 못 켠다. 감속은 네 몫.</span>
                  <span data-l="en">Like the app’s thumb strip: drag up and down, or roll the wheel. Cross 40% to ignite; drop below 40% after that and the engine is out for good. Slowing down is on you.</span>
                </>
              )}
            </p>
            <div className="rp-play-btns">
              <button type="button" className="rp-btn rp-btn-go" onClick={() => start(false)}>
                ▼ <span data-l="ko">착륙 시작</span>
                <span data-l="en">Start landing</span>
              </button>
              {today && dd && (
                <button type="button" className="rp-btn rp-btn-daily" onClick={() => start(true)}>
                  <small>
                    <span data-l="ko">오늘의 주차 · 앱과 같은 조건</span>
                    <span data-l="en">Today&rsquo;s parking · same as the app</span>
                  </small>
                  <span data-l="ko">
                    {KIND[today.kind].ko} — {dd.ko}
                  </span>
                  <span data-l="en">
                    {KIND[today.kind].en} — {dd.en}
                  </span>
                </button>
              )}
            </div>
            <label className="rp-play-sound">
              <input type="checkbox" checked={sound} onChange={(e) => setSound(e.target.checked)} />{' '}
              <span data-l="ko">소리 (합성)</span>
              <span data-l="en">Sound (synthesised)</span>
            </label>
          </div>
        )}

        {phase === 'fall' && (
          <div className="rp-play-cue rp-mono">
            {mode === 'easy' ? (
              <>
                <span data-l="ko">고리가 닿으면 누른다</span>
                <span data-l="en">Press when the ring meets</span>
              </>
            ) : (
              <>
                <span data-l="ko">끌어 올리면 출력 ↑ · 40% 아래 = 끔</span>
                <span data-l="en">Drag up for thrust · below 40% = cut</span>
              </>
            )}
          </div>
        )}

        {phase === 'done' && res && (
          <div className="rp-play-result rp-console">
            <div className="rp-play-grade" data-ng={res.v.grade === 'NG' ? '1' : '0'}>
              <b>{res.v.grade}</b>
              <span>{res.v.score}</span>
              {res.daily && (
                <em>
                  <span data-l="ko">오늘의 주차</span>
                  <span data-l="en">Today&rsquo;s parking</span>
                </em>
              )}
            </div>
            {res.capped && (
              <p className="rp-play-why">
                <span data-l="ko">섰다. S 는 고리가 닿은 동안 켰을 때만.</span>
                <span data-l="en">It stands. S is only for igniting while the ring is on.</span>
              </p>
            )}
            {rs && (
              <p className="rp-play-why">
                <span data-l="ko">
                  {rs.ko}
                  {cause && ` — ${cause.ko}`}
                </span>
                <span data-l="en">
                  {rs.en}
                  {cause && ` — ${cause.en}`}
                </span>
              </p>
            )}
            {td && (
              <p className="rp-mono rp-play-line">
                <span data-l="ko">
                  접지 {td.vs.toFixed(1)}m/s · 기울기 {td.tilt.toFixed(0)}° · 중심에서 {td.dist.toFixed(1)}m
                </span>
                <span data-l="en">
                  Touchdown {td.vs.toFixed(1)} m/s · tilt {td.tilt.toFixed(0)}° · {td.dist.toFixed(1)} m off centre
                </span>
              </p>
            )}
            {res.v.score > 0 && (
              <div className="rp-play-pts">
                {[
                  ['접지', 'TOUCHDOWN', 40],
                  ['기울기', 'TILT', 20],
                  ['중심', 'CENTRE', 25],
                  ['연료', 'FUEL', 15],
                ].map(([ko, en, max], i) => (
                  <div key={en as string}>
                    <small>
                      <span data-l="ko">{ko}</span>
                      <span data-l="en">{en}</span>
                    </small>
                    <i style={{ width: `${(res.v.pts[i] / (max as number)) * 100}%` }} />
                    <b className="rp-mono">
                      {res.v.pts[i]}/{max}
                    </b>
                  </div>
                ))}
              </div>
            )}
            {ignOff != null && (
              <p className="rp-mono rp-play-ign">
                {ignOff < -0.02 ? (
                  <>
                    <span data-l="ko">점화: 창보다 {(-ignOff).toFixed(2)}초 일찍</span>
                    <span data-l="en">Ignition: {(-ignOff).toFixed(2)} s early</span>
                  </>
                ) : win != null && ignOff > win ? (
                  <>
                    <span data-l="ko">점화: 창이 닫히고 {(ignOff - win).toFixed(2)}초 뒤</span>
                    <span data-l="en">Ignition: {(ignOff - win).toFixed(2)} s after the window closed</span>
                  </>
                ) : (
                  <>
                    <span data-l="ko">점화: 창 안 · 열리고 {Math.max(0, ignOff).toFixed(2)}초</span>
                    <span data-l="en">Ignition: in the window, {Math.max(0, ignOff).toFixed(2)} s after it opened</span>
                  </>
                )}
                {win != null && (
                  <>
                    {' '}
                    <span data-l="ko">(창 {win.toFixed(2)}초)</span>
                    <span data-l="en">(window {win.toFixed(2)} s)</span>
                  </>
                )}
              </p>
            )}
            {res.s.ignitedAt == null && (
              <p className="rp-mono rp-play-ign">
                <span data-l="ko">점화하지 않았다</span>
                <span data-l="en">No ignition</span>
              </p>
            )}
            <div className="rp-play-btns">
              <button type="button" className="rp-btn rp-btn-go" onClick={() => start(res.daily)}>
                ↻ <span data-l="ko">한 번 더</span>
                <span data-l="en">Again</span>
              </button>
              <button type="button" className="rp-btn" onClick={() => setPhase('idle')}>
                <span data-l="ko">보조 바꾸기</span>
                <span data-l="en">Change assist</span>
              </button>
            </div>
            {best != null && (
              <p className="rp-play-best rp-mono">
                <span data-l="ko">이 브라우저 최고 {best}</span>
                <span data-l="en">Best in this browser: {best}</span>
              </p>
            )}
            <p className="rp-play-note">
              <span data-l="ko">앱에서는 네 책상 위에 진짜 크기로 떨어진다. 노즐도 네 엄지가 꺾는다.</span>
              <span data-l="en">In the app it drops onto your real desk, full size, and your thumb steers the nozzle.</span>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
