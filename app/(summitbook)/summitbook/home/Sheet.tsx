'use client';

/* 5. 도장 면 — 「100대 명산 도장」 한 장(앱 도장 면 · render.js sheet 와 같은 칸: No. 순서 10×10).
   내리는 만큼 칸에 도장이 쾅 · 칸을 누르면 그 산 · 지역을 누르면 그 지역 칸만 밝게 · [사계] = 칸마다 네 철 테(평생권).
   같은 백 곳을 뒤 면지 「백 개의 봉우리」는 능선으로, 도장 면은 칸으로 본다(견본 — 실제 사람 기록이 아니다). */
import { useEffect, useMemo, useRef, useState } from 'react';
import { BOOK_ORDER, byName, REGIONS, SUMMITS, type Summit } from './summits';
import { dotDate, makeStamp, no3, recap, rng, seasonOf, SEASONS, tilt, type RecapClimb } from './engine';
import { Nb, sceneAttrs, Slug } from './Scene';
import { ease, reduced, seg, useNear } from './stage';

const CELLS: Summit[] = SUMMITS.slice().sort((a, b) => a.id - b.id);
const EN_REGION: Record<string, string> = { 수도권: 'Capital', 강원: 'Gangwon', 충청: 'Chungcheong', 전라: 'Jeolla', 경상: 'Gyeongsang', 제주: 'Jeju' };

// 견본 수첩: 도장 찍는 차례 · 철 · 날짜 · 사계(칸마다 정해 둔 값)
const SAMPLE = (() => {
  const R = rng('sheet-sample');
  const order = CELLS.map((_, i) => i);
  for (let i = order.length - 1; i > 0; i--) {
    const j = Math.floor(R() * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  const cell = CELLS.map(() => {
    const m = 1 + Math.floor(R() * 12), d = 1 + Math.floor(R() * 27);
    const at = new Date(m <= 10 ? 2026 : 2025, m - 1, d, 11, 40);
    const main = SEASONS[Math.floor(((m + 9) % 12) / 3)];
    const four = new Set<string>([main.id]);
    SEASONS.forEach((s) => R() < 0.32 && four.add(s.id));
    return { at, main, four };
  });
  return { order, cell };
})();

function useViewProgress<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = el.getBoundingClientRect(), vh = window.innerHeight;
        setP(Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))));
      });
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, p] as const;
}

export default function Sheet() {
  const [secRef, p] = useViewProgress<HTMLElement>();
  const [nearRef, near] = useNear<HTMLDivElement>('200px');
  const [four, setFour] = useState(false);
  const [region, setRegion] = useState<string | null>(null);
  const [pick, setPick] = useState<number | null>(null);
  const boxes = useRef<(HTMLButtonElement | null)[]>([]);
  const drawn = useRef<string[]>([]);
  const target = reduced() ? 62 : Math.round(62 * ease(seg(p, 0.06, 0.5)));
  const stamped = useMemo(() => new Set(SAMPLE.order.slice(0, target)), [target]);

  // 바뀐 칸만 다시 그린다(100칸 캔버스)
  useEffect(() => {
    if (!near) return;
    CELLS.forEach((s, i) => {
      const box = boxes.current[i];
      if (!box) return;
      const on = stamped.has(i), c = SAMPLE.cell[i];
      const key = `${on ? 1 : 0}${four ? 4 : 1}`;
      if (drawn.current[i] === key) return;
      const fresh = on && drawn.current[i] !== undefined && drawn.current[i][0] === '0';
      drawn.current[i] = key;
      const cv = on ? makeStamp(44, { summit: s, ink: c.main.ink, sheet: true, seasons: four ? c.four : null, inkSeed: 'sh' + i }) : makeStamp(44, { summit: s, empty: true, sheet: true });
      if (on) cv.style.transform = `rotate(${((tilt(s.id, 'sh' + i) * 180) / Math.PI).toFixed(1)}deg)`;
      if (fresh && !reduced()) cv.className = 'sb-thunk';
      box.replaceChildren(cv);
    });
  }, [near, stamped, four]);

  const regionCount = (r: string) => {
    const idx = CELLS.map((s, i) => [s, i] as const).filter(([s]) => s.region === r);
    return [idx.filter(([, i]) => stamped.has(i)).length, idx.length];
  };
  const fourDone = CELLS.filter((_, i) => stamped.has(i) && SAMPLE.cell[i].four.size === 4).length;
  const sel = pick != null ? CELLS[pick] : null, selC = pick != null ? SAMPLE.cell[pick] : null, selOn = pick != null && stamped.has(pick);

  return (
    <section className="sb-sec sb-sheet" ref={secRef} {...sceneAttrs('yearend')}>
      <div className="sb-wrap">
        <Slug id="yearend" />
        <h2 className="sb-h2">
          <span data-l="ko">올해를 날짜 말고, 산으로 기억한다.</span>
          <span data-l="en">You remember the year by mountains, not dates.</span>
        </h2>
        <p className="sb-lead">
          <span data-l="ko">
            연말이면 한 해를 돌아본다. 몇 번 갔는지보다, 어느 산이었는지로. 오래 다닌 사람들의 집엔 손때 묻은 산행 수첩이 있고, 언젠가 아이가 그걸 넘겨 본다.
          </span>
          <span data-l="en">
            At the end of the year you look back — not at how many times, but at which mountains. People who&rsquo;ve hiked for years keep a worn
            notebook at home, and someday their kids leaf through it.
          </span>
        </p>
        <Nb
          ko="「100대 명산 도장」 한 장 — 백 곳을 열 줄 열 칸에, 빈 칸은 점선 동그라미. 12월이면 한 해의 정상 · 철 · 달을 담은 결산 카드 한 장. 수첩 전체는 한 권 PDF로(인쇄용은 평생권)."
          en="The “100 Mountains” sheet — ten rows of ten, empty squares as dotted circles. In December, a year-end card with the year's summits, seasons and months. The whole notebook as one PDF (print-ready with the Lifetime pass)."
        />

        <div className="sb-sheet-grid" ref={nearRef}>
          <div className="sb-sheet-paper">
            <div className="sb-sheet-head">
              <b>
                <span data-l="ko">100대 명산 도장</span>
                <span data-l="en">100 Mountains</span>
              </b>
              <span className="sb-sheet-n">
                <em>{target}</em> / 100
              </span>
            </div>
            {four && (
              <div className="sb-sheet-legend">
                {SEASONS.map((s) => (
                  <span key={s.id}>
                    <i style={{ background: s.ink }} />
                    <span data-l="ko">{s.name}</span>
                    <span data-l="en">{s.en}</span>
                  </span>
                ))}
                <span className="sb-sheet-four">
                  <span data-l="ko">사계 {fourDone}곳</span>
                  <span data-l="en">All four · {fourDone}</span>
                </span>
              </div>
            )}
            <div className="sb-cells" data-region={region || ''}>
              {CELLS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  ref={(el) => void (boxes.current[i] = el)}
                  className={`sb-cell${region && s.region !== region ? ' dim' : ''}${pick === i ? ' on' : ''}`}
                  aria-label={`${no3(s.id)} ${s.name}`}
                  onClick={() => setPick(pick === i ? null : i)}
                />
              ))}
            </div>
            <div className="sb-sheet-pick" aria-live="polite">
              {sel && selC ? (
                <>
                  <b>
                    {no3(sel.id)} · {sel.name}
                    {sel.peak && sel.peak !== sel.name ? ` ${sel.peak}` : ''}
                  </b>
                  <span>
                    {sel.height.toLocaleString('ko-KR')}m · {sel.sido}
                  </span>
                  {selOn ? (
                    <span style={{ color: selC.main.ink }}>
                      <span data-l="ko">
                        {selC.main.name} 도장 · {dotDate(selC.at)}
                        {four ? ` · 사계 ${selC.four.size} / 4` : ''}
                      </span>
                      <span data-l="en">
                        {selC.main.en} stamp · {dotDate(selC.at)}
                        {four ? ` · ${selC.four.size} / 4 seasons` : ''}
                      </span>
                    </span>
                  ) : (
                    <span className="sb-muted">
                      <span data-l="ko">아직 빈 칸 — 정상에서 꾹 눌러야 찍힌다</span>
                      <span data-l="en">Still empty — it fills only at the summit</span>
                    </span>
                  )}
                </>
              ) : (
                <span className="sb-muted">
                  <span data-l="ko">칸을 눌러 그 산을 보기 · 지역을 눌러 그 지역만 밝게</span>
                  <span data-l="en">Tap a square for the mountain · tap a region to light it up</span>
                </span>
              )}
            </div>
          </div>

          <div className="sb-sheet-side">
            <div className="sb-seg sb-seg-dark sb-sheet-mode" role="group" aria-label="mode">
              <button type="button" aria-pressed={!four} onClick={() => setFour(false)}>
                <span data-l="ko">한 철</span>
                <span data-l="en">One season</span>
              </button>
              <button type="button" aria-pressed={four} onClick={() => setFour(true)}>
                <span data-l="ko">사계</span>
                <span data-l="en">Four seasons</span>
                <em className="sb-tag sb-tag-life">
                  <span data-l="ko">평생권</span>
                  <span data-l="en">Lifetime</span>
                </em>
              </button>
            </div>

            <div className="sb-regions">
              {REGIONS.map((r) => {
                const [d, n] = regionCount(r);
                return (
                  <button key={r} type="button" aria-pressed={region === r} onClick={() => setRegion(region === r ? null : r)}>
                    <span data-l="ko">{r}</span>
                    <span data-l="en">{EN_REGION[r]}</span>
                    <small>
                      {d} / {n}
                    </small>
                    <i style={{ width: `${(d / n) * 100}%` }} />
                  </button>
                );
              })}
            </div>

            <RecapFig />

            <p className="sb-sheet-note">
              <span data-l="ko">이 장은 그대로 이미지로 공유된다. 견본 수첩이다.</span>
              <span data-l="en">The sheet shares as an image, just like this. Sample notebook.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 연말 결산 카드 견본 — 한 해 11번(지어낸 견본, 실제 사람 기록이 아니다). 화면 근처에서 한 번 그린다 */
function RecapFig() {
  const [ref, near] = useNear<HTMLElement>('200px');
  const cv = useRef<HTMLCanvasElement | null>(null);
  const drawn = useRef(false);
  useEffect(() => {
    if (!near || drawn.current || !cv.current) return;
    drawn.current = true;
    const plan: [string, number, number][] = [['관악산', 1, 18], ['도봉산', 3, 9], ['북한산', 4, 13], ['소백산', 5, 24], ['한라산', 5, 31], ['설악산', 6, 21], ['지리산', 7, 12], ['오대산', 8, 30], ['덕유산', 9, 27], ['한라산', 9, 3], ['내장산', 10, 25]];
    const list: RecapClimb[] = plan.map(([n, m, d], i) => {
      const at = new Date(2026, m, d, 11, 30);
      return { summit: byName(n), ink: seasonOf(at).ink, season: seasonOf(at), at, id: 'rc' + i };
    });
    const now = new Map(list.map((c) => [c.summit.id, c.ink]));
    const R2 = rng('recap-strip');
    const strip = BOOK_ORDER.map((m) => ({ h: m.height, now: now.has(m.id), ink: now.get(m.id) || (R2() < 0.12 ? '#5c4630' : null) }));
    recap({ year: 2026, owner: '', list, strip, done: strip.filter((x) => x.ink).length }, cv.current);
  }, [near]);
  return (
    <figure className="sb-more-card sb-recap-fig" ref={ref}>
      <canvas ref={cv} width={1080} height={1350} role="img" aria-label="연말 결산 카드 — 견본" />
      <figcaption>
        <b>
          <span data-l="ko">연말 결산 카드</span>
          <span data-l="en">Year-end card</span>
        </b>
        <span data-l="ko">12~1월, 닫힌 수첩 아래에 나타난다. 견본이다.</span>
        <span data-l="en">Appears under the closed notebook in December and January. A sample.</span>
      </figcaption>
    </figure>
  );
}
