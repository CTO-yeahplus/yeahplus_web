'use client';

/* 3. 아침에 쏘고, 퇴근길에 받는다 — 휠 = 하루.
   07:42 정류장에서 발사 → 궤도(앱을 닫아도 돈다) → 18:54 사무실 책상에서 귀환 → 슬레이트.
   하늘색은 시각으로 정한다. 24시간 안에 받지 않으면 궤도 이탈(기체를 잃는다). */
import { useEffect, useRef } from 'react';
import { ease, fit, lerp, progressOf, reduced, seg } from './stage';

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
      // 발사 · 귀환 — 아래에서 솟는 기둥과 불꽃
      const rk = p < 0.2 ? launch : p >= 0.82 ? 1 - ret : -1;
      if (rk >= 0 && rk <= 1) {
        const up = p < 0.2;
        const k = up ? ease(rk) : ease(rk);
        const x = W * (up ? 0.5 : 0.5), y = lerp(H * 0.86, -H * 0.1, k);
        const s = H / 900;
        // 연기 기둥(발사만)
        if (up) {
          for (let i = 0; i < 26; i++) {
            const yy = lerp(H * 0.9, y, i / 26);
            const rr = (18 + i * 1.6) * s * (1 + (1 - i / 26) * 1.6);
            const gg = ctx.createRadialGradient(x, yy, 0, x, yy, rr);
            gg.addColorStop(0, `rgba(230,225,220,${0.18 * (1 - space)})`);
            gg.addColorStop(1, 'rgba(230,225,220,0)');
            ctx.fillStyle = gg;
            ctx.beginPath();
            ctx.arc(x + Math.sin(i + now) * 4, yy, rr, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        // 불꽃
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        const fl = (up ? 70 : 40) * s * (0.85 + 0.15 * Math.sin(now * 50));
        const fg = ctx.createLinearGradient(0, y + 30 * s, 0, y + 30 * s + fl);
        fg.addColorStop(0, 'rgba(255,240,200,.95)');
        fg.addColorStop(0.4, 'rgba(255,150,50,.7)');
        fg.addColorStop(1, 'rgba(255,80,20,0)');
        ctx.fillStyle = fg;
        ctx.beginPath();
        ctx.moveTo(x - 6 * s, y + 30 * s);
        ctx.quadraticCurveTo(x, y + 30 * s + fl * 1.4, x + 6 * s, y + 30 * s);
        ctx.fill();
        ctx.restore();
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
