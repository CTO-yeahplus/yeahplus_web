'use client';

/* 0. 히어로 — 닫힌 크라프트 수첩(앱 홈 표지 B). 지금 이 브라우저 시각의 하늘 아래에 놓여 있다(앱 sky.js 와 같은 색).
   내리면 표지가 넘어가며 펼쳐지고, 끈을 오른쪽으로 밀어도 펼쳐진다(앱과 같은 몸짓 — 놓으면 그 자리까지 스크롤).
   펼친 쪽 = 실제 앱 조판 엔진으로 그린 정상석 쪽(그린 사람 — 실제 사진이 아니다). 더 내리면 도장이 쾅. */
import { useEffect, useRef, useState } from 'react';
import { APP } from '../names';
import { byName, SUMMITS } from './summits';
import { facts, isNight, makeStamp, PW, PH, ridgePaths, samplePhoto, SEASONS, skyAt, stoneLayers, sunsetHour, tilt } from './engine';
import { ease, reduced, seg, useScrollProgress } from './stage';

const DAY: [string, string, string] = ['#5F8FC8', '#A8C4E0', '#DCE6EE'];

export default function Cover() {
  const [ref, p] = useScrollProgress<HTMLElement>();
  const [sky, setSky] = useState<{ c: [string, string, string]; night: boolean }>({ c: DAY, night: false });
  const [drag, setDrag] = useState(0);
  const base = useRef<HTMLCanvasElement | null>(null);
  const fg = useRef<HTMLCanvasElement | null>(null);
  const deb = useRef<HTMLDivElement | null>(null);
  const dragFrom = useRef<number | null>(null);

  // 하늘: 방문자 기기 시각 + 서울 근처 해 지는 시각(앱과 같은 식). 서버 그림은 낮 하늘, 붙은 뒤 지금 하늘로
  useEffect(() => {
    const d = new Date(), h = d.getHours() + d.getMinutes() / 60, sh = sunsetHour(d);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSky({ c: skyAt(h, sh), night: isNight(h, sh) });
  }, []);

  // 펼친 쪽(정상석 판형) — 바탕 · 새긴 이름 · 사람은 한 장, 글 · 도장은 따로(도장이 나중에 쾅)
  useEffect(() => {
    if (!base.current || !fg.current) return;
    const s = byName('북한산'), at = new Date(2026, 9, 18, 11, 42);
    const a = { facts: facts(s, at, true, 1), climb: { id: 'hero', layout: 'stone' as const, course: '', with: '', note: '' }, photo: samplePhoto(3), seasons: new Set(['autumn']) };
    const scratch = { bg: base.current, name: document.createElement('canvas'), cut: document.createElement('canvas'), fg: fg.current };
    stoneLayers(a, scratch);
    const x = base.current.getContext('2d') as CanvasRenderingContext2D;
    x.drawImage(scratch.name, 0, 0);
    x.drawImage(scratch.cut, 0, 0);
  }, []);

  // 표지에 넘쳐 찍힌 최근 도장 셋(오를수록 표지가 찍힌다)
  useEffect(() => {
    const el = deb.current;
    if (!el) return;
    el.innerHTML = '';
    const picks: [string, number, string, number, number][] = [
      ['설악산', 2, '62%', 58, 24],
      ['지리산', 1, '8%', 76, -10],
      ['한라산', 3, '58%', 82, 8],
    ];
    picks.forEach(([n, si, left, top, rot]) => {
      const c = makeStamp(60, { summit: byName(n), ink: SEASONS[si].ink, date: '2026.10.' + (10 + si) });
      c.style.left = left;
      c.style.top = `${top}%`;
      c.style.transform = `rotate(${rot + (tilt(byName(n).id) * 180) / Math.PI}deg)`;
      el.appendChild(c);
    });
  }, []);

  const toOpen = () => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY, span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + span * 0.5, behavior: reduced() ? 'auto' : 'smooth' });
  };
  // 끈: 오른쪽(또는 왼쪽 — 고무끈이니 당겨도)으로 밀면 탄성 있게 따라오고, 34px 넘게 밀고 놓으면 펼친다
  const down = (e: React.PointerEvent) => {
    dragFrom.current = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    if (dragFrom.current == null) return;
    const dx = e.clientX - dragFrom.current;
    setDrag(Math.sign(dx) * Math.min(64, Math.abs(dx) * 0.7));
  };
  const up = () => {
    if (dragFrom.current == null) return;
    dragFrom.current = null;
    if (Math.abs(drag) > 34) toOpen();
    setDrag(0);
  };

  const open = ease(seg(p, 0.05, 0.42));
  // 도장 쾅은 시간으로(스크롤 도중에 멈춰도 글자가 어긋나 보이지 않게) — 펼침이 끝나면 한 번
  const thunk = p > 0.48;
  const beat1 = seg(p, 0.44, 0.5) * (1 - seg(p, 0.66, 0.72));
  const beat2 = seg(p, 0.72, 0.78) * (1 - seg(p, 0.95, 1.0));
  const intro = 1 - seg(p, 0.02, 0.12);

  return (
    <section ref={ref} className="sb-hero" aria-label={APP.ko}>
      <div className="sb-hero-stick">
        <div className="sb-sky" style={{ background: `linear-gradient(${sky.c[0]}, ${sky.c[1]} 58%, ${sky.c[2]})` }} />
        <svg className="sb-ridges" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">
          {ridgePaths(sky.night).map((r, i) => (
            <path key={i} d={r.d} fill={r.fill} style={{ transform: `translateY(${(p * (3 - i) * 14).toFixed(1)}px)` }} />
          ))}
        </svg>

        <div className="sb-hero-intro" style={{ opacity: intro, transform: `translateY(${-p * 60}px)` }}>
          <div className="sb-eyebrow sb-on-sky">
            <span data-l="ko">100대 명산 · 정상 도장 수첩</span>
            <span data-l="en">Korea&rsquo;s 100 famous mountains · a summit stamp notebook</span>
          </div>
          <h1 className="sb-hero-h1">
            <span data-l="ko">
              다섯 시간 걸어,
              <br />
              십 분 머문 자리.
            </span>
            <span data-l="en">
              Five hours up.
              <br />
              Ten minutes at the top.
            </span>
          </h1>
        </div>

        <div className="sb-book-stage">
          <div className="sb-book" style={{ ['--open' as string]: open.toFixed(4) }}>
            <div className="sb-leaf">
              <div className="sb-leaf-page">
                <div className="sb-leaf-pic">
                  <canvas ref={base} width={PW} height={PH} className="sb-leaf-cv" role="img" aria-label="북한산 정상석 쪽 — 그린 견본" />
                  <canvas
                    ref={fg}
                    width={PW}
                    height={PH}
                    className={thunk ? 'sb-leaf-cv sb-leaf-hit' : 'sb-leaf-cv sb-leaf-wait'}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
            <div
              className="sb-cover"
              role="button"
              tabIndex={0}
              aria-label="수첩 펼치기"
              onClick={toOpen}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toOpen())}
              style={{ transform: `rotateY(${(-172 * open).toFixed(2)}deg)` }}
            >
              <div className="sb-cover-front">
                <i className="sb-stitch" />
                <i className="sb-ring" />
                <div className="sb-label">
                  <p className="sb-label-t">{APP.ko}</p>
                  <p className="sb-label-o">나 · 2026 ~</p>
                </div>
                <p className="sb-cover-n">
                  <b>23</b>
                  <small> / 100</small>
                </p>
                <div className="sb-deb" ref={deb} aria-hidden="true" />
              </div>
              <div className="sb-cover-back" aria-hidden="true">
                <p>백 개의 봉우리</p>
                <small>
                  {SUMMITS.length}곳 · 산림청 「100대 명산」
                  <br />
                  도장은 정상 150m 안에서만
                </small>
              </div>
            </div>
            <div
              className="sb-strap"
              style={{ transform: `translateX(${drag}px)`, opacity: Math.max(0, 1 - open * 3) }}
              onPointerDown={down}
              onPointerMove={move}
              onPointerUp={up}
              onPointerCancel={up}
              aria-hidden="true"
            />
            <div className="sb-strap-hint" style={{ opacity: p < 0.02 && !drag ? 1 : 0 }} aria-hidden="true">
              <i className="sb-tip" />
              <b />
              <b />
              <b />
            </div>
          </div>
        </div>

        <div className="sb-hero-beat" style={{ opacity: beat1 }}>
          <p>
            <span data-l="ko">그 십 분이 날아가지 않게, 수첩에 한 쪽.</span>
            <span data-l="en">So those ten minutes don&rsquo;t blow away — one page in the notebook.</span>
          </p>
        </div>
        <div className="sb-hero-beat" style={{ opacity: beat2 }}>
          <p>
            <span data-l="ko">도장은 정상 150m 안에서만 찍힌다.</span>
            <span data-l="en">The stamp lands only within 150 m of the summit.</span>
          </p>
          <small>
            <span data-l="ko">산행은 전날 밤에 시작된다 — 내리면 하루가 흐른다.</span>
            <span data-l="en">A hike starts the night before — scroll, and the day goes by.</span>
          </small>
        </div>

        <div className="sb-scrollcue" style={{ opacity: intro }} aria-hidden="true">
          <span data-l="ko">끈을 밀거나, 내려서 펼치기</span>
          <span data-l="en">Slide the strap, or scroll to open</span>
          <i />
        </div>
      </div>
    </section>
  );
}
