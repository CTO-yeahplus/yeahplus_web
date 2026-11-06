'use client';

/* 4. 철 — 같은 산도 철이 바뀌면 도장 색이 바뀐다(봄 연두 · 여름 초록 · 가을 주홍 · 겨울 남색). 네 철을 다 채우면 가장자리 네 칸이 다 찬 사계 도장.
   옆: 뒤 면지 '백 개의 봉우리' — 내리는 만큼 오른 봉우리가 철 색 깃발로 채워진다(견본, 앱과 같은 조판). */
import { useEffect, useRef, useState } from 'react';
import { BOOK_ORDER, byName } from './summits';
import { makeStamp, ridgeSheet, rng, SEASONS, tilt } from './engine';
import { ease, reduced, seg, useNear } from './stage';
import { Nb, sceneAttrs, Slug } from './Scene';

const MT = byName('덕유산');
const PEAK_SEASON = (() => {
  const R = rng('ridge-sample');
  return BOOK_ORDER.map(() => Math.floor(R() * 4));
})();
const ORDER = (() => {
  const R = rng('ridge-order'), a = BOOK_ORDER.map((_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(R() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
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
    return () => {
      window.removeEventListener('scroll', on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return [ref, p] as const;
}

export default function Seasons() {
  const [have, setHave] = useState<Set<string>>(new Set());
  const [last, setLast] = useState<string | null>(null);
  const [nearRef, near] = useNear<HTMLDivElement>('-25% 0px');
  const [secRef, p] = useViewProgress<HTMLElement>();
  const boxes = useRef<(HTMLDivElement | null)[]>([]);
  const big = useRef<HTMLDivElement | null>(null);
  const ridge = useRef<HTMLCanvasElement | null>(null);
  const played = useRef(false);
  const done = Math.round(100 * ease(seg(p, 0.18, 0.78)));

  // 처음 보일 때 봄 → 겨울 차례로 쾅
  useEffect(() => {
    if (!near || played.current) return;
    played.current = true;
    if (reduced()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHave(new Set(SEASONS.map((s) => s.id)));
      return;
    }
    const ts = SEASONS.map((s, k) =>
      window.setTimeout(() => {
        setHave((h) => new Set([...h, s.id]));
        setLast(s.id);
      }, 400 + k * 650),
    );
    return () => ts.forEach((t) => window.clearTimeout(t));
  }, [near]);

  // 철마다 한 자국 + 가운데 사계 도장
  useEffect(() => {
    SEASONS.forEach((s, k) => {
      const box = boxes.current[k];
      if (!box) return;
      box.innerHTML = '';
      const on = have.has(s.id);
      const c = on ? makeStamp(70, { summit: MT, ink: s.ink, seasons: new Set([s.id]), date: `2026.${['04.19', '07.26', '10.18', '01.24'][k]}` }) : makeStamp(70, { summit: MT, empty: true });
      if (on) c.style.transform = `rotate(${((tilt(MT.id, s.id) * 180) / Math.PI).toFixed(1)}deg)`;
      if (on && last === s.id) c.className = 'sb-thunk';
      box.appendChild(c);
    });
    const b = big.current;
    if (b) {
      b.innerHTML = '';
      const ink = last ? SEASONS.find((s) => s.id === last)!.ink : SEASONS[3].ink;
      const c = have.size ? makeStamp(130, { summit: MT, ink, seasons: have, date: '사계' }) : makeStamp(130, { summit: MT, empty: true });
      b.appendChild(c);
    }
  }, [have, last]);

  // 백 개의 봉우리 — 스크롤만큼 채운다
  useEffect(() => {
    if (!ridge.current) return;
    const on = new Set(ORDER.slice(0, done));
    ridgeSheet(
      {
        owner: '',
        done,
        four: false,
        peaks: BOOK_ORDER.map((s, i) => ({ summit: s, ink: on.has(i) ? SEASONS[PEAK_SEASON[i]].ink : null, seasons: new Set<string>() })),
      },
      ridge.current,
    );
  }, [done]);

  const toggle = (id: string) => {
    setHave((h) => {
      const n = new Set(h);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
    setLast(id);
  };

  return (
    <section className="sb-sec sb-seasons" ref={secRef} {...sceneAttrs('year')}>
      <div className="sb-wrap">
        <Slug id="year" />
        <h2 className="sb-h2">
          <span data-l="ko">같은 산을 네 철 오르면, 네 개의 산을 오른 것이다.</span>
          <span data-l="en">Climb one mountain in four seasons, and you&rsquo;ve climbed four mountains.</span>
        </h2>
        <p className="sb-lead">
          <span data-l="ko">가을에 올랐던 산을 겨울에 다시 오른다. 같은 길인데, 다른 산이다. 단풍이 있던 자리에 상고대가 피고, 귤 대신 보온병을 꺼낸다.</span>
          <span data-l="en">You climb last autumn&rsquo;s mountain again in winter. Same trail, different mountain. Frost where the leaves were; a thermos instead of tangerines.</span>
        </p>
        <Nb
          ko="도장 잉크는 그 철의 색, 아래 호엔 그날 날짜 — 오를 때마다 자국이 다르다. 네 철을 다 채우면 가장자리 네 칸이 다 찬다. 뒤 면지 「백 개의 봉우리」에는 오른 봉우리마다 철 색 깃발."
          en="The ink is the season's colour and the lower arc carries the date, so every climb leaves a different mark. Fill all four and the rim closes. On the back endpaper, every peak you've stood on gets a flag in season ink."
        />

        <div className="sb-seasons-grid">
          <div className="sb-four" ref={nearRef}>
            <div className="sb-four-row">
              {SEASONS.map((s, k) => (
                <button key={s.id} type="button" className="sb-four-cell" aria-pressed={have.has(s.id)} onClick={() => toggle(s.id)}>
                  <div className="sb-four-stamp" ref={(el) => void (boxes.current[k] = el)} />
                  <span style={{ color: s.ink }}>
                    <span data-l="ko">{s.name}</span>
                    <span data-l="en">{s.en}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="sb-four-big">
              <div ref={big} className={have.size === 4 ? 'sb-four-done' : ''} />
              <p>
                <b>
                  <span data-l="ko">덕유산 · {have.size} / 4 철</span>
                  <span data-l="en">Deogyusan · {have.size} / 4 seasons</span>
                </b>
                <small>
                  <span data-l="ko">{have.size === 4 ? '사계 도장 — 네 칸이 다 찼다' : '철을 눌러 찍어 보기'}</span>
                  <span data-l="en">{have.size === 4 ? 'Four-season stamp — all four segments filled' : 'Tap a season to stamp it'}</span>
                </small>
              </p>
            </div>
          </div>

          <figure className="sb-ridge-fig">
            <canvas ref={ridge} width={1080} height={1350} role="img" aria-label="백 개의 봉우리 — 견본" />
            <figcaption>
              <span data-l="ko">뒤 면지 「백 개의 봉우리」 — 오른 봉우리마다 철 색 깃발. 내리는 만큼 채워진다(견본).</span>
              <span data-l="en">The back endpaper, &ldquo;A Hundred Peaks&rdquo; — a season-coloured flag on every summit reached. It fills as you scroll (sample).</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
