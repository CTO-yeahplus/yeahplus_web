'use client';

/* 7. 하루의 빈칸 — 이 앱이 사용자의 하루에 남기는 것(2026-11-05 유진 '출퇴근 · 점심 · 휴식, 감성 섹션').
   기능 설명이 아니라 '언제 · 어디서 · 무엇을 가져가나'. 휠 = 하루, 네 순간(첫차 · 점심 끝 · 회의 사이 · 막차).
   순간마다: 시각 → 그 장소 사진 위로 같은 기체가 내려와 선다 → 빈 시간이 줄어든다 → 한 문장 + 가져가는 것 한 줄.
   기체는 하루 내내 같은 한 대 — 내려앉을 때마다 그을음이 조금씩 는다. 사진은 소개 히어로와 같은 장소 판. */
import { useEffect, useRef } from 'react';
import { drawFrame, View, type Pose } from './render';
import { PLATES, preload } from './plates';
import { ease, fit, progressOf, reduced, seg } from './stage';

type L = { ko: string; en: string };
type Moment = {
  at: string; // 시각
  pocket: number; // 빈 시간(초)
  spec: (typeof PLATES)['bench']['A'];
  place: 'bench' | 'desk' | 'station';
  where: L;
  line: L;
  take: L;
  soot: number;
};

const M: Moment[] = [
  {
    at: '06:58', pocket: 240, spec: PLATES.bench.A, place: 'bench', soot: 0,
    where: { ko: '첫차 기다리는 정류장', en: 'Bus stop, waiting for the first bus' },
    line: { ko: '첫차까지 4분. 오늘 첫 착륙은 여기서.', en: 'Four minutes to the first bus. Today’s first landing is right here.' },
    take: { ko: '견디던 4분이, 기다려지는 4분이 된다.', en: 'The four minutes you used to sit through become four you look forward to.' },
  },
  {
    at: '12:52', pocket: 480, spec: PLATES.desk.A, place: 'desk', soot: 0.14,
    where: { ko: '점심 먹고 돌아온 책상', en: 'Back at the desk after lunch' },
    line: { ko: '점심시간 8분 남음. 식은 커피 옆에 내려앉았다.', en: 'Eight minutes of lunch left. It touched down next to a cold coffee.' },
    take: { ko: '오후가 시작되기 전에, 작은 성공 하나.', en: 'One small win before the afternoon starts.' },
  },
  {
    at: '16:10', pocket: 120, spec: PLATES.desk.B, place: 'desk', soot: 0.28,
    where: { ko: '회의와 회의 사이', en: 'Between two meetings' },
    line: { ko: '쉬는 시간 2분. 점화 말고는 아무 생각도 안 했다.', en: 'A two-minute break. Nothing on my mind but the ignition.' },
    take: { ko: '숨을 참았다가 내쉬면, 머리가 비어 있다.', en: 'Hold your breath, let it out, and your head is clear.' },
  },
  {
    at: '23:04', pocket: 360, spec: PLATES.station.A, place: 'station', soot: 0.42,
    where: { ko: '막차 기다리는 대합실', en: 'Station concourse, waiting for the last train' },
    line: { ko: '막차까지 6분. 오늘의 마지막 착륙.', en: 'Six minutes to the last train. Last landing of the day.' },
    take: { ko: '하루를 무사히 내려놓는 법.', en: 'A way to set the day down, gently.' },
  },
];

const A = 0.1, B = 0.92; // 네 순간이 차지하는 휠 구간
const SLICE = (B - A) / M.length;
const FADE = 0.035; // 순간 사이 겹쳐 바뀌는 폭
const H0 = 170; // 내려오기 시작하는 높이(실제 m, 렌더러 축척) — 화면 위 밖에서 들어온다(시각 글자 뒤에 걸려 있지 않게)

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, Math.floor(s % 60))).padStart(2, '0')}`;

/** 한 순간 안의 진행도 k(0…1) → 기체 자세 */
function poseAt(k: number, soot: number, now: number, still: boolean): Pose {
  const d = ease(seg(k, 0.06, 0.4)); // 내려오기
  const y = H0 * (1 - d) * (1 - d * 0.25);
  const landed = d >= 1;
  const burn = !landed && y < 30; // 마지막 30m 에서 점화
  return {
    x: 0,
    y: landed ? 0 : y + (still ? 0 : Math.sin(now * 2.1) * 0.15 * (1 - d)),
    lean: landed ? 0 : 0.02 * (1 - d),
    legs: ease(seg(k, 0.3, 0.4)),
    th: burn ? 0.55 + 0.4 * (1 - y / 30) : 0,
    on: burn,
    soot,
  };
}

export default function Gaps() {
  const sec = useRef<HTMLElement | null>(null);
  const cv = useRef<HTMLCanvasElement | null>(null);
  const ui = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sec.current, c = cv.current, U = ui.current;
    if (!el || !c || !U) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const off = document.createElement('canvas');
    const octx = off.getContext('2d');
    if (!octx) return;
    const vA = new View(), vB = new View();
    const getPlate = preload(M.map((m) => m.spec), () => {});
    const cards = Array.from(U.querySelectorAll<HTMLElement>('[data-m]'));
    const timers = Array.from(U.querySelectorAll<HTMLElement>('[data-k=left]'));
    const dot = U.querySelector<HTMLElement>('[data-k=dot]');
    const intro = U.querySelector<HTMLElement>('[data-k=intro]');
    const outro = U.querySelector<HTMLElement>('[data-k=outro]');
    let raf = 0, alive = true, pS = progressOf(el);
    const still = reduced();

    // 글자 뒤 옅은 어둠(왼쪽 위) — 밝은 대합실 · 창가에서도 읽히게
    const shade = (g: CanvasRenderingContext2D) => {
      const W = g.canvas.width, Hh = g.canvas.height;
      const gr = g.createLinearGradient(0, 0, W * 0.7, Hh * 0.55);
      gr.addColorStop(0, 'rgba(5,7,10,.5)');
      gr.addColorStop(1, 'rgba(5,7,10,0)');
      g.fillStyle = gr;
      g.fillRect(0, 0, W, Hh);
    };

    const draw = (g: CanvasRenderingContext2D, v: View, i: number, k: number, now: number) => {
      const m = M[i];
      drawFrame(g, v, {
        plate: getPlate(m.spec),
        // 한 순간 동안 아주 천천히 다가간다(손에 든 폰)
        plateCam: { zoom: 1.02 + (still ? 0 : 0.05 * k), look: 0, anchorY: 0.72 },
        place: m.place,
        pose: poseAt(k, m.soot, now, still),
        t: now,
        clock: now,
        puffs: [],
      });
      shade(g);
    };

    const loop = () => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      fit(c);
      if (off.width !== c.width || off.height !== c.height) {
        off.width = c.width;
        off.height = c.height;
      }
      const pT = progressOf(el);
      pS = still ? pT : pS + (pT - pS) * 0.14;
      const p = pS;
      const now = performance.now() / 1000;
      const q = Math.min(M.length - 1e-6, Math.max(0, (p - A) / SLICE));
      const i = Math.floor(q), k = q - i;
      draw(ctx, vA, i, k, now);
      // 다음 순간으로 겹쳐 바뀐다(마지막 FADE 구간)
      const x = i < M.length - 1 ? seg(k, 1 - FADE / SLICE, 1) : 0;
      if (x > 0) {
        draw(octx, vB, i + 1, 0, now);
        ctx.save();
        ctx.globalAlpha = ease(x);
        ctx.drawImage(off, 0, 0);
        ctx.restore();
      }
      // 처음 · 끝 — 사진을 눌러 어둡게(제목이 읽히게)
      const dim = Math.max(1 - seg(p, 0.03, A), seg(p, B, 0.97));
      if (dim > 0) {
        ctx.fillStyle = `rgba(5,7,10,${0.78 * dim})`;
        ctx.fillRect(0, 0, c.width, c.height);
      }
      const cur = x > 0.5 ? i + 1 : i;
      const show = p > A - 0.02 && p < B + 0.01;
      cards.forEach((n, j) => (n.dataset.on = show && j === cur ? '1' : '0'));
      timers.forEach((n, j) => {
        const kk = j === i ? k : j < i ? 1 : 0;
        n.textContent = mmss(M[j].pocket * (1 - seg(kk, 0.06, 0.92)));
      });
      if (intro) intro.dataset.on = p < A - 0.01 ? '1' : '0';
      if (outro) outro.dataset.on = p > B + 0.005 ? '1' : '0';
      if (dot) dot.style.left = `${(Math.min(M.length, Math.max(0, q)) / M.length) * 100}%`;
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="rp-gaps" ref={sec}>
      <div className="rp-stick">
        <canvas className="rp-cv" ref={cv} aria-hidden="true" />
        <div className="rp-gaps-ui" ref={ui}>
          <div className="rp-gaps-intro" data-k="intro" data-on="1">
            <div className="rp-eyebrow">YOUR DAY</div>
            <h2 className="rp-h2">
              <span data-l="ko">하루의 빈칸에, 로켓 한 대</span>
              <span data-l="en">A rocket for the gaps in your day</span>
            </h2>
            <p className="rp-gaps-sub">
              <span data-l="ko">한 판은 2분이면 끝난다. 하루에는 2분짜리 빈칸이 생각보다 많다.</span>
              <span data-l="en">A landing takes about two minutes. A day has more two-minute gaps than you think.</span>
            </p>
          </div>

          {M.map((m, j) => (
            <article className="rp-gaps-card" data-m={j} data-on={j === 0 ? '1' : '0'} key={m.at}>
              <div className="rp-gaps-time rp-mono">{m.at}</div>
              <div className="rp-gaps-where rp-mono">
                <span data-l="ko">{m.where.ko}</span>
                <span data-l="en">{m.where.en}</span>
                <span className="rp-gaps-left">
                  <span data-l="ko">빈 시간</span>
                  <span data-l="en">Free</span> <b data-k="left">{mmss(m.pocket)}</b>
                </span>
              </div>
              <p className="rp-gaps-line">
                <span data-l="ko">{m.line.ko}</span>
                <span data-l="en">{m.line.en}</span>
              </p>
              <p className="rp-gaps-take">
                <span data-l="ko">{m.take.ko}</span>
                <span data-l="en">{m.take.en}</span>
              </p>
            </article>
          ))}

          <div className="rp-gaps-outro" data-k="outro" data-on="0">
            <h2 className="rp-h2">
              <span data-l="ko">네 번 세웠다. 오늘도 무사히.</span>
              <span data-l="en">Four landings. Another day, safely down.</span>
            </h2>
            <p className="rp-gaps-sub">
              <span data-l="ko">같은 한 대가 하루를 따라다닌다. 내려앉을 때마다 그을음이 조금씩 는다.</span>
              <span data-l="en">The same booster follows you all day, a little more scorched with every landing.</span>
            </p>
          </div>

          <div className="rp-gaps-day rp-mono" aria-hidden="true">
            <i className="rp-gaps-dot" data-k="dot" />
            {M.map((m, j) => (
              <span key={m.at} style={{ left: `${((j + 0.5) / M.length) * 100}%` }}>
                {m.at}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
