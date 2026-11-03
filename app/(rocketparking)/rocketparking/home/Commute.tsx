'use client';

/* 3. 아침에 쏘고, 퇴근길에 받는다 — 휠 = 하루.
   07:42 정류장에서 발사 → 궤도(앱을 닫아도 돈다) → 18:54 사무실 책상에서 귀환 → 슬레이트.
   하늘색은 시각으로 정한다. 24시간 안에 받지 않으면 궤도 이탈(기체를 잃는다). */
import { useEffect, useRef } from 'react';
import { ease, fit, lerp, progressOf, reduced, seg } from './stage';
import { cloudSprite } from './render';

const hashN = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const T0 = 7 * 60 + 42, T1 = 18 * 60 + 54; // 분
const SKY: [number, string, string][] = [
  // [시각(분), 위, 아래]
  [6 * 60, '#1b2340', '#e98f5e'],
  [8 * 60, '#5d8ccc', '#f4c79a'],
  [12 * 60, '#2f6fbf', '#9cc7ef'],
  [16 * 60, '#3c66a8', '#e9c08a'],
  [18 * 60, '#2a2b58', '#f0875a'],
  [19 * 60 + 30, '#0d1230', '#3b2d52'],
];
function skyAt(min: number): [string, string] {
  for (let i = 0; i < SKY.length - 1; i++) {
    const [a, at, ab] = SKY[i], [b, bt, bb] = SKY[i + 1];
    if (min <= b) {
      const k = Math.max(0, (min - a) / (b - a));
      return [mixHex(at, bt, k), mixHex(ab, bb, k)];
    }
  }
  return [SKY[SKY.length - 1][1], SKY[SKY.length - 1][2]];
}
function mixHex(a: string, b: string, k: number) {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16);
  const m = (s: number) => Math.round(((A >> s) & 255) * (1 - k) + ((B >> s) & 255) * k);
  return `rgb(${m(16)},${m(8)},${m(0)})`;
}
const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(Math.floor(m % 60)).padStart(2, '0')}`;

export default function Commute() {
  const sec = useRef<HTMLElement | null>(null);
  const cv = useRef<HTMLCanvasElement | null>(null);
  const ui = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sec.current, c = cv.current, U = ui.current;
    if (!el || !c || !U) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const clock = U.querySelector<HTMLElement>('[data-k=clock]');
    const since = Array.from(U.querySelectorAll<HTMLElement>('[data-k=since]'));
    let raf = 0, alive = true, pS = progressOf(el);
    const still = reduced();
    const stars = Array.from({ length: 140 }, (_, i) => [Math.sin(i * 91.7) * 0.5 + 0.5, Math.sin(i * 37.3) * 0.5 + 0.5, (Math.sin(i * 13.1) * 0.5 + 0.5) * 1.6 + 0.4]);
    const loop = () => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      fit(c);
      const pT = progressOf(el);
      pS = still ? pT : pS + (pT - pS) * 0.14;
      const p = pS;
      const W = c.width, H = c.height;
      const now = performance.now() / 1000;
      const launch = seg(p, 0.04, 0.2), orbitK = seg(p, 0.2, 0.82), ret = seg(p, 0.82, 0.95);
      const min = p < 0.2 ? T0 : p < 0.82 ? lerp(T0, T1, orbitK) : T1;
      const [top, bot] = skyAt(min);
      // 하늘 — 고도가 오르면 검어진다
      const space = p < 0.2 ? ease(seg(launch, 0.4, 1)) : p < 0.82 ? 1 : 1 - ease(ret);
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, mixHex(top.startsWith('#') ? top : rgbToHex(top), '#04060c', space));
      g.addColorStop(1, mixHex(bot.startsWith('#') ? bot : rgbToHex(bot), '#0b1224', space * 0.85));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);
      // 별
      ctx.fillStyle = '#fff';
      for (const [x, y, s] of stars) {
        ctx.globalAlpha = space * (0.4 + 0.6 * Math.abs(Math.sin(now * 0.7 + x * 40)));
        ctx.fillRect(x * W, y * H * 0.7, s, s);
      }
      ctx.globalAlpha = 1;
      // 지구 가장자리 — 궤도에서만 보인다
      if (space > 0.02) {
        const R = H * 2.4, cy = H * 0.82 + R;
        ctx.save();
        ctx.globalAlpha = space;
        const eg = ctx.createRadialGradient(W / 2, cy, R * 0.98, W / 2, cy, R * 1.04);
        eg.addColorStop(0, '#1d4f8f');
        eg.addColorStop(0.5, 'rgba(120,190,255,.9)');
        eg.addColorStop(1, 'rgba(120,190,255,0)');
        ctx.fillStyle = eg;
        ctx.beginPath();
        ctx.arc(W / 2, cy, R * 1.04, 0, Math.PI * 2);
        ctx.fill();
        const lg = ctx.createLinearGradient(0, cy - R, 0, H);
        lg.addColorStop(0, '#2b6bb0');
        lg.addColorStop(1, '#0a1c38');
        ctx.fillStyle = lg;
        ctx.beginPath();
        ctx.arc(W / 2, cy, R, 0, Math.PI * 2);
        ctx.fill();
        // 낮 · 밤 경계
        const term = ((min - T0) / (T1 - T0)) * W * 1.4 - W * 0.2;
        const tg = ctx.createLinearGradient(term - W * 0.2, 0, term + W * 0.2, 0);
        tg.addColorStop(0, 'rgba(0,0,10,0)');
        tg.addColorStop(1, 'rgba(0,0,10,.55)');
        ctx.fillStyle = tg;
        ctx.beginPath();
        ctx.arc(W / 2, cy, R, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        // 궤도와 부스터
        const ox = W / 2, oy = H * 0.5, rx = W * 0.38, ry = H * 0.16, tilt = -0.12;
        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(tilt);
        ctx.globalAlpha = space * 0.5;
        ctx.strokeStyle = 'rgba(244,246,248,.5)';
        ctx.setLineDash([3, 8]);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = space;
        const laps = 7.3; // 11시간 남짓 — 화면 속 바퀴 수는 연출
        const a0 = orbitK * laps * Math.PI * 2 + Math.PI * 0.85;
        for (let i = 30; i >= 0; i--) {
          const a = a0 - i * 0.03;
          ctx.fillStyle = `rgba(199,237,64,${(1 - i / 30) * 0.6})`;
          ctx.beginPath();
          ctx.arc(Math.cos(a) * rx, Math.sin(a) * ry, 1.5 + (1 - i / 30) * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
        const bx = Math.cos(a0) * rx, by = Math.sin(a0) * ry;
        ctx.fillStyle = '#F4F6F8';
        ctx.shadowColor = '#C7ED40';
        ctx.shadowBlur = 18;
        ctx.beginPath();
        ctx.arc(bx, by, 5 * (H / 900) + 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      // 발사 · 귀환 — 발사대를 덮는 구름 둑 · 로켓을 따라 솟는 연기 기둥 · 층진 화염 · 불티(진행도의 함수라 되감아도 같다)
      const rk = p < 0.2 ? launch : p >= 0.82 ? 1 - ret : -1;
      if (rk >= 0 && rk <= 1) {
        const up = p < 0.2;
        const k = ease(rk);
        const s = H / 900;
        const gy = H * 0.9; // 발사대 높이
        const x = W * 0.5, y = lerp(H * 0.86, -H * 0.12, k);
        const T = up ? rk * 3.2 : (1 - rk) * 3.2; // 연출 시각(초)
        const sm = up ? [236, 232, 226] : [214, 208, 200];
        const air = 1 - space * 0.85;
        // 연기 기둥 — 아래(먼저 나온 것)일수록 크고 옅고, 바람에 조금 밀린다
        if (up) {
          const NC = 70;
          for (let i = 0; i < NC; i++) {
            const f = i / NC;
            const yy = lerp(gy, y + 70 * s, f);
            if (yy < y + 40 * s) continue;
            const age = (1 - f) * T;
            const r = (16 + 120 * Math.min(1, age / 2.5) + hashN(i) * 30) * s;
            const dx = (hashN(i + 7) - 0.5) * r * 0.5 + age * 18 * s;
            const spr = cloudSprite(i, sm);
            if (spr) {
              ctx.save();
              ctx.translate(x + dx, yy);
              ctx.rotate(i * 1.3 + age * 0.2);
              ctx.globalAlpha = (0.32 + 0.3 * (1 - f)) * air;
              ctx.drawImage(spr, -r, -r, r * 2, r * 2);
              ctx.restore();
            }
          }
        }
        // 구름 둑 — 발사대에서 양옆으로 굴러 나간다(귀환은 착륙 직전에 일어나는 먼지)
        const bankT = up ? Math.min(T, 3) : Math.max(0, 1.2 - (1 - rk) * 4);
        if (bankT > 0) {
          const NB = 46;
          for (let i = 0; i < NB; i++) {
            const side = i % 2 ? 1 : -1;
            const rr = hashN(i + 3);
            const d = (20 + 520 * rr) * s * (1 - Math.exp(-bankT * (0.9 + rr)));
            const r = (40 + 90 * rr + bankT * 40) * s;
            const spr = cloudSprite(i + 2, sm);
            if (spr) {
              ctx.save();
              ctx.translate(x + side * d, gy - r * 0.35 - hashN(i + 9) * 40 * s);
              ctx.rotate(i);
              ctx.globalAlpha = 0.55 * air * Math.min(1, bankT * 1.5);
              ctx.drawImage(spr, -r, -r * 0.8, r * 2, r * 1.6);
              ctx.restore();
            }
          }
        }
        // 화염 — 흰 심에서 붉은 꼬리까지 겹친 빛, 바닥 가까우면 구름 아래를 비춘다
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const fl = (up ? 120 : 70) * s * (0.88 + 0.12 * Math.sin(now * 53) * Math.sin(now * 29));
        const fy = y + 30 * s;
        for (let i = 15; i >= 0; i--) {
          const f = i / 15;
          const r = (5 + 26 * f) * s * (0.9 + 0.2 * Math.sin(now * 40 + i));
          const c = f < 0.15 ? [255, 250, 235] : f < 0.4 ? [255, 210, 120] : f < 0.7 ? [255, 140, 50] : [210, 70, 30];
          const g = ctx.createRadialGradient(x, fy + fl * f, 0, x, fy + fl * f, r);
          g.addColorStop(0, `rgba(${c[0]},${c[1]},${c[2]},${0.7 - 0.45 * f})`);
          g.addColorStop(1, `rgba(${c[0]},${c[1]},${c[2]},0)`);
          ctx.fillStyle = g;
          ctx.fillRect(x - r, fy + fl * f - r, r * 2, r * 2);
        }
        const near = Math.max(0, 1 - Math.abs(gy - fy) / (H * 0.35));
        if (near > 0) {
          const g = ctx.createRadialGradient(x, gy, 0, x, gy, 360 * s);
          g.addColorStop(0, `rgba(255,170,90,${0.55 * near})`);
          g.addColorStop(1, 'rgba(255,120,40,0)');
          ctx.fillStyle = g;
          ctx.fillRect(x - 360 * s, gy - 360 * s, 720 * s, 720 * s);
        }
        // 불티
        ctx.strokeStyle = 'rgba(255,220,150,.85)';
        for (let i = 0; i < 40; i++) {
          const a = (hashN(i) - 0.5) * 1.6, sp = (80 + 260 * hashN(i + 1)) * s;
          const ph = (now * (1.4 + hashN(i + 2)) + hashN(i + 3)) % 1;
          const px = x + Math.sin(a) * sp * ph, py = fy + fl * 0.3 + Math.cos(a) * sp * ph + 120 * s * ph * ph;
          ctx.globalAlpha = 1 - ph;
          ctx.lineWidth = 1.5 * s;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px - Math.sin(a) * 10 * s, py - Math.cos(a) * 10 * s);
          ctx.stroke();
        }
        ctx.restore();
        // 기체
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#F1F2F0';
        ctx.fillRect(x - 5 * s, y - 34 * s, 10 * s, 64 * s);
        ctx.fillStyle = '#C7ED40';
        ctx.fillRect(x - 5 * s, y - 14 * s, 10 * s, 4 * s);
        ctx.fillStyle = '#3b3d42';
        ctx.fillRect(x - 5 * s, y + 20 * s, 10 * s, 10 * s);
        ctx.fillStyle = '#F1F2F0';
        ctx.beginPath();
        ctx.moveTo(x - 5 * s, y - 34 * s);
        ctx.lineTo(x, y - 50 * s);
        ctx.lineTo(x + 5 * s, y - 34 * s);
        ctx.fill();
      }
      // 지면(발사 · 귀환 때)
      const ground = 1 - space;
      if (ground > 0.02) {
        ctx.fillStyle = `rgba(20,18,24,${ground})`;
        ctx.fillRect(0, H * 0.9, W, H * 0.1);
      }

      if (clock) clock.textContent = hhmm(min);
      const m = Math.max(0, min - T0);
      since.forEach((n) => (n.textContent = `${Math.floor(m / 60)}h ${String(Math.floor(m % 60)).padStart(2, '0')}m`));
      U.dataset.stage = p < 0.2 ? 'launch' : p < 0.82 ? 'orbit' : p < 0.95 ? 'return' : 'slate';
      const cd = U.querySelector<HTMLElement>('[data-k=cd]');
      if (cd) cd.textContent = p < 0.04 ? 'T−3' : launch < 0.08 ? 'T−0' : '';
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="rp-commute" ref={sec}>
      <div className="rp-stick">
        <canvas className="rp-cv" ref={cv} aria-hidden="true" />
        <div className="rp-commute-ui" ref={ui} data-stage="launch">
          <div className="rp-eyebrow">LAUNCH → ORBIT → RETURN</div>
          <h2 className="rp-h2">
            <span data-l="ko">아침에 쏘고, 퇴근길에 받는다</span>
            <span data-l="en">Launch it in the morning. Land it on the way home.</span>
          </h2>
          <div className="rp-commute-clock rp-mono">
            <b data-k="clock">07:42</b>
            <span className="rp-commute-cd" data-k="cd">
              T−3
            </span>
          </div>
          <div className="rp-commute-line rp-c-launch">
            <span data-l="ko">07:42 · 정류장 벤치에서 발사. 버스가 오기 전에.</span>
            <span data-l="en">07:42 · Launched from the bus-stop bench, before the bus came.</span>
          </div>
          <div className="rp-commute-line rp-c-orbit">
            <span data-l="ko">
              궤도에 · <b className="rp-mono" data-k="since">0h 00m</b>째. 앱을 닫아도 돈다.
            </span>
            <span data-l="en">
              In orbit for <b className="rp-mono" data-k="since">0h 00m</b>. It keeps going with the app closed.
            </span>
          </div>
          <div className="rp-commute-line rp-c-return">
            <span data-l="ko">18:54 · 사무실 책상에 패드를 놓고 귀환.</span>
            <span data-l="en">18:54 · Pad down on the office desk. Bringing it home.</span>
          </div>
          <div className="rp-commute-slate rp-console rp-mono">
            <span data-l="ko">출근길 발사 → 퇴근길 착륙 · 11h 12m</span>
            <span data-l="en">Morning launch → evening landing · 11h 12m</span>
            <small>
              <span data-l="ko">24시간 안에 받지 않으면 궤도를 벗어난다. 기체를 잃는다.</span>
              <span data-l="en">Leave it past 24 hours and it falls out of orbit. The booster is lost.</span>
            </small>
          </div>
        </div>
      </div>
    </section>
  );
}

function rgbToHex(rgb: string) {
  const m = rgb.match(/\d+/g) || ['0', '0', '0'];
  return '#' + m.slice(0, 3).map((x) => (+x).toString(16).padStart(2, '0')).join('');
}
