'use client';

/* S#8 그날 밤 — 종아리가 뻐근한 밤, 쪽에 세 줄(앱 '쪽에 쓰기' 코스 · 함께 · 메모). 다 쓰면 수첩이 닫히고 표지에 오늘 도장이 쾅.
   견본 글은 지어낸 것이다(실제 사람 기록이 아니다). 산 · 길 이름은 실제 탐방로 이름만. */
import { useEffect, useRef, useState } from 'react';
import { APP } from '../names';
import { byName } from './summits';
import { makeStamp, SEASONS, tilt } from './engine';
import { reduced, useNear } from './stage';
import { Nb, sceneAttrs, Slug } from './Scene';

const ROWS = [
  { k: ['코스', 'Route'], ko: '성판악 → 진달래밭 → 백록담', en: 'Seongpanak → Jindallaebat → Baengnokdam' },
  { k: ['함께', 'With'], ko: '엄마', en: 'Mom' },
  { k: ['메모', 'Note'], ko: '진달래밭에서 귤을 나눠 먹었다. ‘거의 다 왔어’를 세 번 들었다.', en: 'Shared a tangerine at Jindallaebat. Heard “almost there” three times.' },
];

const LENS = ROWS.map((r) => Math.max(r.ko.length, r.en.length));
const STARTS = LENS.map((_, i) => LENS.slice(0, i).reduce((a, b) => a + b, 0));

export default function Night() {
  const [ref, near] = useNear<HTMLDivElement>('-20% 0px');
  const [n, setN] = useState(0);
  const deb = useRef<HTMLDivElement | null>(null);
  const total = LENS.reduce((a, b) => a + b, 0);
  const done = n >= total;

  const started = useRef(false);
  useEffect(() => {
    if (!near || started.current) return;
    started.current = true;
    if (reduced()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setN(total);
      return;
    }
    let k = 0;
    const id = window.setInterval(() => {
      k += 1;
      setN(k);
      if (k >= total) window.clearInterval(id);
    }, 38);
    return () => {
      window.clearInterval(id);
      if (k < total) started.current = false;
    };
  }, [near, total]);

  // 표지의 최근 도장 셋 — 다 쓰면 오늘 것(한라산 · 가을)이 쾅
  useEffect(() => {
    const el = deb.current;
    if (!el) return;
    const picks: [string, number, string, number, number, boolean][] = [
      ['한라산', 2, '56%', 56, 14, true],
      ['설악산', 2, '10%', 74, -10, false],
      ['지리산', 3, '58%', 80, 6, false],
    ];
    el.replaceChildren(
      ...picks
        .filter((x) => !x[5] || done)
        .map(([nm, si, left, top, rot, fresh]) => {
          const c = makeStamp(60, { summit: byName(nm), ink: SEASONS[si].ink, date: fresh ? '2026.10.03' : '2026.09.2' + si });
          c.style.left = left;
          c.style.top = `${top}%`;
          c.style.setProperty('--rot', `${rot + (tilt(byName(nm).id) * 180) / Math.PI}deg`);
          c.style.transform = 'rotate(var(--rot))';
          if (fresh && !reduced()) c.className = 'sb-night-thunk';
          return c;
        }),
    );
  }, [done]);

  // 글자 수만큼 앞에서부터(한 · 영 따로 세지만 같은 속도로)
  const typed = ROWS.map((r, i) => {
    const L = LENS[i], k = Math.max(0, Math.min(L, n - STARTS[i]));
    return { ko: r.ko.slice(0, Math.ceil((k / L) * r.ko.length)), en: r.en.slice(0, Math.ceil((k / L) * r.en.length)), on: k > 0 && k < L };
  });

  return (
    <section className="sb-sec sb-dark sb-night" {...sceneAttrs('night')}>
      <div className="sb-wrap sb-night-grid">
        <div>
          <Slug id="night" />
          <h2 className="sb-h2">
            <span data-l="ko">
              종아리가 뻐근한 밤,
              <br />
              쪽에 세 줄.
            </span>
            <span data-l="en">Sore calves, three lines on the page.</span>
          </h2>
          <p className="sb-lead">
            <span data-l="ko">
              몸은 녹초인데 머리는 아직 산에 있다. 눈을 감으면 능선이 보인다. 기억이 흐려지기 전에 — 어느 길로 올랐는지, 누구와 갔는지, 그 고개에서 무슨 말을
              했는지.
            </span>
            <span data-l="en">
              Your body is done, your head is still up there. Close your eyes and you see the ridge. Before it fades — which way you went up, who you
              went with, what was said on that last steep bit.
            </span>
          </p>
          <Nb
            ko="쪽에 쓰기 — 코스 · 함께 · 메모 세 칸. 수첩을 닫으면 표지에 오늘의 도장이 찍혀 있다. 몇 년 뒤 그 쪽을 펴면, 종아리의 뻐근함까지 돌아온다."
            en="Notes on the page — route, with, memo. Close the notebook and today's stamp is on the cover. Open that page years later and even the sore calves come back."
          />
        </div>

        <div className="sb-night-play" ref={ref}>
          <div className="sb-writer" aria-label="쪽에 쓰기 — 견본">
            {ROWS.map((r, i) => (
              <div className="sb-writer-row" key={r.en}>
                <small>
                  <span data-l="ko">{r.k[0]}</span>
                  <span data-l="en">{r.k[1]}</span>
                </small>
                <p className={typed[i].on ? 'sb-writer-on' : undefined}>
                  <span data-l="ko">{typed[i].ko}</span>
                  <span data-l="en">{typed[i].en}</span>
                </p>
              </div>
            ))}
          </div>
          <div className={`sb-mini${done ? ' sb-mini-shut' : ''}`} aria-hidden="true">
            <div className="sb-cover-front">
              <i className="sb-stitch" />
              <i className="sb-ring" />
              <div className="sb-label">
                <p className="sb-label-t">{APP.ko}</p>
                <p className="sb-label-o">나 · 2026 ~</p>
              </div>
              <p className="sb-cover-n">
                <b>{done ? 24 : 23}</b>
                <small> / 100</small>
              </p>
              <div className="sb-deb" ref={deb} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
