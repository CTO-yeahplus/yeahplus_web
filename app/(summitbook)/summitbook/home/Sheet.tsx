'use client';

/* 5. 도장 면 — 「100대 명산 도장」 한 장(앱 도장 면 · render.js sheet 와 같은 칸: No. 순서 10×10).
   내리는 만큼 칸에 도장이 쾅 · 칸을 누르면 그 산 · 지역을 누르면 그 지역 칸만 밝게 · [사계] = 칸마다 네 철 테(평생권).
   같은 백 곳을 뒤 면지 「백 개의 봉우리」는 능선으로, 도장 면은 칸으로 본다(견본 — 실제 사람 기록이 아니다). */
import { useEffect, useMemo, useRef, useState } from 'react';
import { REGIONS, SUMMITS, type Summit } from './summits';
import { dotDate, makeStamp, no3, rng, SEASONS, tilt } from './engine';
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
    <section className="sb-sec sb-sheet" ref={secRef}>
      <div className="sb-wrap">
        <div className="sb-eyebrow">
          <span data-l="ko">05 · 도장 면</span>
          <span data-l="en">05 · THE STAMP SHEET</span>
        </div>
        <h2 className="sb-h2">
          <span data-l="ko">백 칸, 한 장에.</span>
          <span data-l="en">A hundred squares, one sheet.</span>
        </h2>
        <p className="sb-lead">
          <span data-l="ko">
            「100대 명산 도장」은 백 곳을 번호 순서대로 열 줄 열 칸에 모은 한 장이다. 비어 있는 칸은 점선 동그라미에 산 이름, 정상에 서면 그 칸에 마지막 철 색 도장.
            뒤 면지 「백 개의 봉우리」가 같은 백 곳을 능선으로 그린다면, 도장 면은 칸으로 센다.
          </span>
          <span data-l="en">
            The &ldquo;100 Mountains&rdquo; sheet lines up all hundred in ten rows of ten, by number. An empty square is a dotted circle with the
            mountain&rsquo;s name; stand on the summit and it takes a stamp in the latest season&rsquo;s ink. The back endpaper draws the same hundred as
            ridgelines; the sheet counts them in squares.
          </span>
        </p>

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
