/* 로켓주차 물리 · 판정 — 앱 RocketCore(Sim.swift · Judge.swift · Bot.swift · Parking.swift)의 웹 사본.
   숫자를 앱과 같게 둔다: 웹에서 세운 감각이 앱에서도 그대로 통해야 한다.
   앱은 3D(x·z)지만 웹은 화면 한 면만 쓰므로 옆은 x 하나, 기울기도 x 하나. 축척 1:250(250m = 실제 1m). */

export const G = 9.81;
export const SCALE = 1 / 250;

export const V = {
  dryMass: 25_000,
  fuelMass: 10_000,
  fullBurn: 12,
  maxTWR: 3.2,
  minThrottle: 0.4,
  gimbalMaxDeg: 8,
  angularGain: 0.25,
  angularDamping: 0.6,
  length: 40,
  legDeployAltitude: 30,
  legDeployTime: 1.2,
  terminalSpeed: 180,
  padRadius: 20,
};
let maxThrust = V.maxTWR * (V.dryMass + V.fuelMass) * G;
let fuelRate = V.fuelMass / V.fullBurn;

/* 기체 종류 — 앱 RocketCore VehicleClass.vehicle 과 같은 값. 그림만이 아니라 물리도 다르다 */
export type VClass = 'standard' | 'heavy' | 'sprint' | 'twin';
const BASE = { ...V };
const CLASS: Record<VClass, Partial<typeof V>> = {
  standard: {},
  heavy: { dryMass: 32_000, fuelMass: 13_000, maxTWR: 2.7, angularGain: 0.21 }, // 무겁다 — 일찍 켜야 한다
  sprint: { dryMass: 20_000, fuelMass: 7_000, fullBurn: 10, maxTWR: 3.8, angularGain: 0.32 }, // 가볍고 세다 — 늦게 켜도 선다
  twin: { dryMass: 26_000, gimbalMaxDeg: 11, angularGain: 0.36, minThrottle: 0.5 }, // 옆으로 민첩 — 출력을 낮게 못 줄인다
};
/** 그 기체로 fn 을 돌리고 표준으로 되돌린다(기록을 미리 만들 때 — 한 스레드라 다른 판과 섞이지 않는다) */
export function withClass<T>(c: VClass, fn: () => T): T {
  Object.assign(V, BASE, CLASS[c]);
  maxThrust = V.maxTWR * (V.dryMass + V.fuelMass) * G;
  fuelRate = V.fuelMass / V.fullBurn;
  try {
    return fn();
  } finally {
    Object.assign(V, BASE);
    maxThrust = V.maxTWR * (V.dryMass + V.fuelMass) * G;
    fuelRate = V.fuelMass / V.fullBurn;
  }
}

export type Input = { throttle: number; gimbal: number };

export type Touchdown = { vs: number; hs: number; tilt: number; dist: number; fuel: number; legs: boolean; t: number };

export type State = {
  t: number;
  y: number;
  x: number;
  vy: number;
  vx: number;
  lean: number;
  angVel: number;
  fuel: number;
  legs: number;
  ignited: boolean;
  engineOn: boolean;
  throttle: number;
  shutdown: boolean;
  flewAway: boolean;
  ignitedAt: number | null;
  td: Touchdown | null;
  done: boolean;
};

export type Start = { y: number; vy: number; x: number; vx: number; leanDeg: number; fuel?: number; wind?: number };

export function makeState(s: Start): State {
  return {
    t: 0,
    y: s.y,
    x: s.x,
    vy: s.vy,
    vx: s.vx,
    lean: (s.leanDeg * Math.PI) / 180,
    angVel: 0,
    fuel: V.fuelMass * (s.fuel ?? 1),
    legs: 0,
    ignited: false,
    engineOn: false,
    throttle: 0,
    shutdown: false,
    flewAway: false,
    ignitedAt: null,
    td: null,
    done: false,
  };
}

export const mass = (s: State) => V.dryMass + s.fuel;

/** 스로틀 th 로 지금 속도에서 멈추는 데 필요한 고도. 못 멈추면 null */
export function stopDistance(s: State, th = 1): number | null {
  if (s.vy >= 0) return 0;
  const a = (th * maxThrust) / mass(s) - G;
  if (a <= 0) return null;
  return (s.vy * s.vy) / (2 * a);
}

/** 기록된 프레임(속도 · 연료 비율)에서 풀 스로틀로 멈추는 데 필요한 고도 */
export function needAt(vy: number, fuelFrac: number): number {
  if (vy >= 0) return 0;
  const a = maxThrust / (V.dryMass + V.fuelMass * fuelFrac) - G;
  return (vy * vy) / (2 * a);
}

/** 점화 창 — 풀 스로틀 필요 고도 × 1.0~1.35 가 '지금' (앱 HUD 와 같은 기준) */
export function windowStatus(s: State): { need: number; status: 'early' | 'now' | 'late' } {
  const need = stopDistance(s, 1) ?? 0;
  if (s.y < need) return { need, status: 'late' };
  if (s.y <= need * 1.35) return { need, status: 'now' };
  return { need, status: 'early' };
}

export function step(s: State, inp: Input, dt: number, wind = 0, startY = 250) {
  const sub = 1 / 240;
  let rem = dt;
  while (rem > 1e-9 && !s.done) {
    const h = Math.min(sub, rem);
    integrate(s, inp, h, wind, startY);
    rem -= h;
  }
}

function integrate(s: State, inp: Input, dt: number, wind: number, startY: number) {
  const m = mass(s);
  if (!s.ignited && inp.throttle >= V.minThrottle) {
    s.ignited = true;
    s.engineOn = true;
    s.ignitedAt = s.t;
  }
  if (s.engineOn) {
    if (inp.throttle < V.minThrottle) {
      s.engineOn = false;
      s.shutdown = true;
      s.throttle = 0;
    } else s.throttle = Math.min(1, inp.throttle);
    if (s.fuel <= 0) {
      s.engineOn = false;
      s.throttle = 0;
      s.fuel = 0;
    }
  } else s.throttle = 0;
  const thrust = s.engineOn ? s.throttle * maxThrust : 0;

  const gMax = (V.gimbalMaxDeg * Math.PI) / 180;
  const gim = Math.max(-1, Math.min(1, inp.gimbal)) * gMax;
  const angAcc = -(thrust / m) * V.angularGain * Math.sin(gim) - V.angularDamping * s.angVel;
  s.angVel += angAcc * dt;
  s.lean += s.angVel * dt;

  let ax = Math.sin(s.lean) * (thrust / m) + wind;
  let ay = Math.cos(s.lean) * (thrust / m) - G;
  const k = G / (V.terminalSpeed * V.terminalSpeed);
  const sp = Math.hypot(s.vx, s.vy);
  if (sp > 0) {
    ax -= s.vx * k * sp;
    ay -= s.vy * k * sp;
  }
  s.vx += ax * dt;
  s.vy += ay * dt;
  s.x += s.vx * dt;
  s.y += s.vy * dt;
  s.fuel = Math.max(0, s.fuel - (s.engineOn ? fuelRate * s.throttle * dt : 0));
  s.t += dt;

  if (s.ignited && s.vy > 2 && s.y > startY + 5) {
    s.flewAway = true;
    s.engineOn = false;
    s.throttle = 0;
    s.done = true;
    return;
  }
  if (s.y <= V.legDeployAltitude && s.legs < 1) s.legs = Math.min(1, s.legs + dt / V.legDeployTime);
  if (s.y <= 0) {
    s.y = 0;
    s.td = {
      vs: Math.max(0, -s.vy),
      hs: Math.abs(s.vx),
      tilt: (Math.abs(s.lean) * 180) / Math.PI,
      dist: Math.abs(s.x),
      fuel: s.fuel / V.fuelMass,
      legs: s.legs >= 1,
      t: s.t,
    };
    s.engineOn = false;
    s.throttle = 0;
    s.vx = 0;
    s.vy = 0;
    s.angVel = 0;
    s.done = true;
  }
}

/* ─── 판정 (Judge.swift) ─── */
const L = { gv: 3, hv: 6, gt: 5, ht: 10, gl: 2, hl: 4, gd: 5 };
export type Reason = 'tooFast' | 'legs' | 'tipped' | 'slid' | 'offPad' | 'flewAway' | 'parked';
export type Verdict = { stands: boolean; reason: Reason | null; score: number; pts: [number, number, number, number]; grade: 'S' | 'A' | 'B' | 'C' | 'NG' };

const lin = (v: number, good: number, hold: number, max: number) =>
  v <= good ? max : v >= hold ? 0 : Math.round((max * (hold - v)) / (hold - good));

export function verdict(td: Touchdown | null, padRadius = V.padRadius): Verdict {
  const ng = (reason: Reason): Verdict => ({ stands: false, reason, score: 0, pts: [0, 0, 0, 0], grade: 'NG' });
  if (!td) return ng('flewAway');
  if (td.vs > L.hv) return ng('tooFast');
  if (!td.legs) return ng('legs');
  if (td.tilt > L.ht) return ng('tipped');
  if (td.hs > L.hl) return ng('slid');
  const holds = +(td.vs > L.gv) + +(td.tilt > L.gt) + +(td.hs > L.gl);
  if (holds >= 3) return ng('tipped');
  if (td.dist > padRadius) return { ...ng('offPad'), stands: true };
  const pts: [number, number, number, number] = [
    lin(td.vs, L.gv, L.hv, 40),
    lin(td.tilt, L.gt, L.ht, 20),
    lin(td.dist, Math.min(L.gd, padRadius * 0.4), padRadius, 25),
    Math.round(15 * Math.max(0, Math.min(1, td.fuel))),
  ];
  const score = pts[0] + pts[1] + pts[2] + pts[3];
  const grade = score >= 90 ? 'S' : score >= 75 ? 'A' : score >= 55 ? 'B' : 'C';
  return { stands: true, reason: null, score, pts, grade };
}

/* ─── 호버 슬램 봇 (Bot.swift) — 모범 착륙과 '쉬움'의 자동 감속 · 자세 ─── */
export function bot(s: State, margin = 1.12, target = 0, wind = 0): Input {
  const inp: Input = { throttle: 0, gimbal: 0 };
  const h = Math.max(0, s.y);
  if (!s.ignited) {
    const need = stopDistance(s, 1);
    inp.throttle = need != null && h <= need * margin ? 1 : 0;
  } else {
    const vy = -s.vy;
    const aReq = vy > 0 && h > 0.05 ? (vy * vy - 1) / (2 * h) + G : G * 0.9;
    inp.throttle = Math.max(V.minThrottle, Math.min(1, (aReq * mass(s)) / maxThrust));
    if (h < 0.3 && vy < 1.5) inp.throttle = V.minThrottle;
  }
  const maxLean = (11 * Math.PI) / 180;
  const thrustAcc = (Math.max(inp.throttle, V.minThrottle) * maxThrust) / mass(s);
  let tgt = -((s.x - target) * 0.03 + s.vx * 0.14 + wind / thrustAcc);
  tgt = Math.max(-maxLean, Math.min(maxLean, tgt));
  if (h < 7) tgt = 0;
  const err = tgt - s.lean;
  const g = Math.max(-1, Math.min(1, -(err * 6 - s.angVel * 2.5)));
  inp.gimbal = s.engineOn || inp.throttle >= V.minThrottle ? g : 0;
  return inp;
}

/* ─── 한 판을 미리 돌려 둔 기록 — 휠로 앞뒤로 감기 위해 ─── */
export type Frame = { t: number; y: number; x: number; vy: number; lean: number; th: number; fuel: number; legs: number; on: boolean };
export function record(start: Start, margin = 1.12): { frames: Frame[]; ign: number; td: Touchdown | null; v: Verdict } {
  const s = makeState(start);
  const frames: Frame[] = [];
  const dt = 1 / 60;
  const push = () => frames.push({ t: s.t, y: s.y, x: s.x, vy: s.vy, lean: s.lean, th: s.throttle, fuel: s.fuel / V.fuelMass, legs: s.legs, on: s.engineOn });
  push();
  while (!s.done && s.t < 30) {
    step(s, bot(s, margin), dt, 0, start.y);
    push();
  }
  return { frames, ign: s.ignitedAt ?? 0, td: s.td, v: verdict(s.td) };
}

/** 시각 t 의 프레임(사이 보간) */
export function frameAt(fr: Frame[], t: number): Frame {
  if (t <= fr[0].t) return fr[0];
  const last = fr[fr.length - 1];
  if (t >= last.t) return last;
  const i = Math.min(fr.length - 2, Math.floor(t * 60));
  const a = fr[i], b = fr[i + 1];
  const k = Math.max(0, Math.min(1, (t - a.t) / (b.t - a.t || 1)));
  const m = (p: number, q: number) => p + (q - p) * k;
  return { t, y: m(a.y, b.y), x: m(a.x, b.x), vy: m(a.vy, b.vy), lean: m(a.lean, b.lean), th: m(a.th, b.th), fuel: m(a.fuel, b.fuel), legs: m(a.legs, b.legs), on: b.on };
}

/* ─── 오늘의 주차 (Parking.swift) — 서버 없이 날짜로. 앱과 같은 날 같은 조건 ─── */
/* BigInt 리터럴(123n)은 tsconfig 대상(ES2017)에서 안 되므로 BigInt('…') 로 쓴다 */
const M64 = (BigInt('1') << BigInt('64')) - BigInt('1');
class SplitMix64 {
  s: bigint;
  constructor(seed: bigint) {
    this.s = seed & M64;
  }
  next() {
    this.s = (this.s + BigInt('0x9e3779b97f4a7c15')) & M64;
    let z = this.s;
    z = ((z ^ (z >> BigInt('30'))) * BigInt('0xbf58476d1ce4e5b9')) & M64;
    z = ((z ^ (z >> BigInt('27'))) * BigInt('0x94d049bb133111eb')) & M64;
    return z ^ (z >> BigInt('31'));
  }
  unit() {
    return (Number(this.next() >> BigInt('11')) / 2 ** 53) * 2 - 1;
  }
}

/** 기기 날짜 기준 2026-01-01 부터 며칠째 (앱 GameModel.dayIndex 와 같다) */
export function dayIndex(d = new Date()) {
  const a = Date.UTC(2026, 0, 1);
  const b = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((b - a) / 86_400_000);
}

export type Daily = { kind: 0 | 1 | 2 | 3; level: number; padRadius: number; wind: number; fuel: number; parked: boolean };
export function daily(day: number): Daily {
  const seed = (BigInt.asUintN(64, BigInt(day)) * BigInt('0x9e3779b9') + BigInt('0x51')) & M64;
  const g = new SplitMix64(seed);
  const kind = (((day % 4) + 4) % 4) as 0 | 1 | 2 | 3;
  const level = Number(g.next() % BigInt('3')) + 1;
  const d: Daily = { kind, level, padRadius: 20, wind: 0, fuel: 1, parked: false };
  if (kind === 0) d.padRadius = [13, 10, 8][level - 1];
  if (kind === 1) d.wind = [0.5, 0.75, 1.0][level - 1];
  if (kind === 2) {
    d.parked = true;
    d.padRadius = [11, 10, 9][level - 1];
  }
  if (kind === 3) d.fuel = [0.3, 0.26, 0.23][level - 1];
  return d;
}
