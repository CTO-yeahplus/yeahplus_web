'use client';

/* 4. 비상 상황 + 기체 일지 — 기체 한 대를 이어 쓴다. 돌아올수록 그을리고, 오래 쓴 기체일수록 낙하 중 고장이 잦다.
   숫자는 앱 RocketCore Emergency 그대로: 처음 다섯 판 조용 · 새 기체 15% → 20비행 45% · 추력 ×0.78 · 다리 한계 2m/s.
   휠을 내리면 비행 수가 늘고 동체가 그을린다. */
import { useEffect, useRef } from 'react';
import { drawBooster, drawPad, View } from './render';
import { fit, progressOf, reduced } from './stage';

const chance = (f: number) => Math.min(0.45, 0.15 + 0.015 * Math.max(0, f));

const CARDS = [
  {
    id: 'thrust',
    ko: ['추력 저하', '엔진 하나가 말을 안 듣는다. 최대 출력 ×0.78 — 평소보다 일찍 켜야 산다.'],
    en: ['Thrust loss', 'One engine won’t listen. Max thrust ×0.78 — ignite earlier than usual or you hit.'],
  },
  {
    id: 'alt',
    ko: ['고도계 끊김', '고리도, 딱딱 소리도, 고도 숫자도 꺼진다. 남는 건 네 눈이다.'],
    en: ['Altimeter dropout', 'No ring, no ticks, no altitude. Just your eyes.'],
  },
  {
    id: 'legs',
    ko: ['다리 잠금 불량', '다리가 덜 잠겼다. 2m/s 보다 세게 닿으면 꺾인다.'],
    en: ['Leg lock failure', 'A leg didn’t lock. Touch down harder than 2 m/s and it folds.'],
  },
] as const;

export default function Faults() {
  const sec = useRef<HTMLElement | null>(null);
  const cv = useRef<HTMLCanvasElement | null>(null);
  const meta = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sec.current, c = cv.current, M = meta.current;
    if (!el || !c || !M) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const v = new View();
    let raf = 0, alive = true, pS = 0;
    const still = reduced();
    const flightsN = M.querySelector<HTMLElement>('[data-k=flights]');
    const chanceN = M.querySelector<HTMLElement>('[data-k=chance]');
    const bar = M.querySelector<HTMLElement>('[data-k=bar]');
    const loop = () => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      const r = c.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      fit(c);
      const pT = Math.min(1, progressOf(el) * 1.15);
      pS = still ? pT : pS + (pT - pS) * 0.12;
      const flights = Math.round(pS * 40);
      const now = performance.now() / 1000;
      ctx.clearRect(0, 0, c.width, c.height);
      v.set(c.width, c.height, { yaw: 0.3 + Math.sin(now * 0.25) * 0.15, el: 0.18, dist: 0.48, ty: 0.12, fov: 0.8 });
      drawPad(ctx, v);
      drawBooster(ctx, v, { x: 0, y: 0, lean: 0, legs: 1, th: 0, on: false, soot: Math.min(1, flights / 40) }, now);
      // 그을음 — 아래쪽부터 검게
      if (flightsN) flightsN.textContent = String(flights).padStart(2, '0');
      const ch = flights < 5 ? 0 : flights === 5 ? 1 : chance(flights);
      if (chanceN) chanceN.textContent = flights < 5 ? '0%' : flights === 5 ? '100%' : `${Math.round(ch * 100)}%`;
      if (bar) bar.style.width = `${Math.round(ch * 100)}%`;
      M.dataset.stage = flights < 5 ? 'quiet' : flights === 5 ? 'first' : 'old';
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="rp-faults" ref={sec}>
      <div className="rp-stick rp-faults-stick">
        <div className="rp-wrap rp-faults-grid">
          <div>
            <div className="rp-eyebrow">EMERGENCIES · HULL LOG</div>
            <h2 className="rp-h2">
              <span data-l="ko">오래 쓴 기체는 말을 안 듣는다</span>
              <span data-l="en">Old boosters talk back</span>
            </h2>
            <p className="rp-lead">
              <span data-l="ko">기체는 한 대를 이어 쓴다. 살아 돌아오면 비행이 하나 늘고, 쓰러지면 그 기체의 기록은 거기서 끝난다.</span>
              <span data-l="en">You fly one booster for as long as it lasts. Bring it back and it logs a flight. Lose it and its log ends there.</span>
            </p>
            <div className="rp-cards">
              {CARDS.map((k) => (
                <article key={k.id} className={`rp-card rp-card-${k.id} rp-console`}>
                  <div className="rp-card-fx" aria-hidden="true">
                    {k.id === 'thrust' && (
                      <span className="rp-fx-thrust">
                        <i />
                        <b className="rp-mono">×0.78</b>
                      </span>
                    )}
                    {k.id === 'alt' && <span className="rp-fx-alt rp-mono">ALT ---</span>}
                    {k.id === 'legs' && <span className="rp-fx-legs rp-mono">≤ 2.0 m/s</span>}
                  </div>
                  <h3>
                    <span data-l="ko">{k.ko[0]}</span>
                    <span data-l="en">{k.en[0]}</span>
                  </h3>
                  <p>
                    <span data-l="ko">{k.ko[1]}</span>
                    <span data-l="en">{k.en[1]}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className="rp-hull">
            <canvas className="rp-hull-cv" ref={cv} aria-hidden="true" />
            <div className="rp-hull-meta rp-console rp-mono" ref={meta} data-stage="quiet">
              <div className="rp-hull-row">
                <span>B-001</span>
                <span>
                  <span data-l="ko">비행</span>
                  <span data-l="en">FLIGHTS</span> <b data-k="flights">00</b>
                </span>
              </div>
              <div className="rp-hull-row">
                <span>
                  <span data-l="ko">이번 판 고장 확률</span>
                  <span data-l="en">FAULT CHANCE THIS RUN</span>
                </span>
                <b data-k="chance">0%</b>
              </div>
              <div className="rp-hull-bar">
                <i data-k="bar" />
              </div>
              <small className="rp-hull-note rp-hull-quiet">
                <span data-l="ko">처음 다섯 판은 조용하다.</span>
                <span data-l="en">The first five runs are quiet.</span>
              </small>
              <small className="rp-hull-note rp-hull-first">
                <span data-l="ko">여섯 번째 판에는 반드시 온다.</span>
                <span data-l="en">The sixth run always brings one.</span>
              </small>
              <small className="rp-hull-note rp-hull-old">
                <span data-l="ko">그을린 만큼 잦다. 새 기체로 바꾸면 15%부터.</span>
                <span data-l="en">More soot, more faults. A fresh booster starts at 15%.</span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
