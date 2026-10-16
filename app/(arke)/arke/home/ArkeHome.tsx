'use client';
/* eslint-disable @next/next/no-img-element -- public/arke/shots 는 미리 줄여 둔 webp 라 그대로 쓴다 */

/**
 * ARKE 소개 — 휠을 굴리면 "틀린 문제 하나"의 이야기가 흐른다.
 *  0. 첫 화면: 약속 한 줄 + D-day + 학생 / 학부모 버튼(프로필 링크로 온 사람이 바로 누르게). 오답 칩이 마우스를 따라 떠다닌다
 *  1. 다시 온다: 13번에 빨간 X → 3일 뒤 → 숫자만 바뀐 같은 문제 → "이번엔?" → 금색 동그라미, 칩이 빨강 → 금색
 *  2. 이름 붙은 약점: 진단 1/10 → 10/10, 15:00 → 00:00 → 개념 막대가 자라고 약점 셋에 이름이 붙는다
 *  3. 성적표가 지도로: 학평 1~30번에서 틀린 번호가 하나씩 빨개지고 → 개념 이름 → 내일의 처방
 *  4. 돌려받는 시간: 22:10 → 22:40 "30분 날렸다" → 처방 4문제 체크
 *  5. 역전의 3월: 365 → 오늘의 D-day, 8주 칸이 금색으로 찬다
 *  6. 화면: 세로 휠이 가로로 흐른다(실제 앱 1.1.0 스크린샷)
 * 숫자는 앱의 실제 값만 쓴다(10문항 · 약 15분 · 4문제 · 약 20분 · 3일 · 7일 · 8주). 점수 · 번호는 예시.
 * 문제는 ARKE 자체 문항(사인법칙). 모든 장면은 올리면 되감기고, 모션 줄이기를 켠 기기에서는 완성된 모습으로 둔다.
 */

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import type { CSSProperties, PointerEvent as RPointerEvent } from 'react';
import StoreButton, { Dday } from '../StoreButton';
import { PHOTO_LIVE } from '../config';
import { clamp, ease, lerp, seg, slam, usePin } from './motion';

const css = (o: Record<string, string | number>) => o as CSSProperties;

/** 3월 2일(KST)까지 남은 날 — 서버에선 null */
const noop = () => () => {};
function useDays(): number | null {
  return useSyncExternalStore(
    noop,
    () => {
      const d = Math.ceil((Date.UTC(2027, 2, 1, 15) - Date.now()) / 86_400_000);
      return d > 0 ? d : null;
    },
    () => null,
  );
}

/** 바뀌는 문구 — key 가 바뀌면 CSS 애니메이션으로 다시 떠오른다 */
function Swap({ k, children, className }: { k: string | number; children: React.ReactNode; className?: string }) {
  return (
    <div key={k} className={`akx-swap ${className ?? ''}`}>
      {children}
    </div>
  );
}

/* ───────────── 0. 첫 화면 ───────────── */
const FLOAT = [
  { n: '13', x: 8, y: 22, d: 1.2, r: -8 },
  { n: '21', x: 86, y: 18, d: 0.8, r: 6 },
  { n: '29', x: 90, y: 70, d: 1.5, r: -4 },
  { n: '15', x: 6, y: 74, d: 1.0, r: 10 },
  { n: '28', x: 76, y: 88, d: 0.6, r: -12 },
];

function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const move = (e: RPointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const b = el.getBoundingClientRect();
    el.style.setProperty('--px', `${(e.clientX - b.left) / b.width - 0.5}`);
    el.style.setProperty('--py', `${(e.clientY - b.top) / b.height - 0.5}`);
  };
  return (
    <section className="akx-hero" ref={ref} onPointerMove={move}>
      {FLOAT.map((f) => (
        <span
          key={f.n}
          className="akx-float"
          aria-hidden="true"
          style={css({ left: `${f.x}%`, top: `${f.y}%`, '--d': f.d, '--r': `${f.r}deg` })}
        >
          {f.n}
        </span>
      ))}
      <div className="akx-hero-in">
        <span className="ark-badge">고2 · 예비 고3 수학 · 영어 코치</span>
        <h1 className="akx-h1">
          틀린 문제가
          <br />
          <em>그냥 지나가지</em> 않게.
        </h1>
        <p className="akx-lead">같은 문제에 두 번 지지 않는 고3. 그 1년을 ARKE가 같이 만듭니다.</p>
        <Dday />
        <div className="ark-cta-row ark-cta-two">
          <StoreButton role="student" className="ark-btn ark-btn-primary ark-btn-lg">
            학생 · 첫 진단 10문항 무료로 시작
          </StoreButton>
          <a className="ark-btn ark-btn-ghost ark-btn-lg" href="#parents">
            학부모님이신가요? →
          </a>
        </div>
        <p className="akx-hint">
          휠을 굴려 보세요 <i aria-hidden="true">↓</i>
        </p>
      </div>
    </section>
  );
}

/* ───────────── 1. 다시 온다 ───────────── */
const Q = {
  a: { no: '13', q: <>삼각형 ABC에서 ∠A = 60°, BC = 6√3 일 때,<br />외접원의 반지름의 길이는?</>, o: '① 3  ② 3√3  ③ 6  ④ 6√3  ⑤ 12' },
  b: { no: '7', q: <>삼각형 ABC에서 ∠A = 30°, BC = 8 일 때,<br />외접원의 반지름의 길이는?</>, o: '① 4  ② 4√3  ③ 8  ④ 8√3  ⑤ 16' },
};
const AGAIN_LINES: [string, React.ReactNode][] = [
  ['틀린 문제는', <>반드시 <span className="akx-red">다시</span> 온다.</>],
  ['3일 뒤,', '숫자만 바뀌어서.'],
  ['펜이 멈춘다.', <span className="akx-red" key="q">이번엔?</span>],
  ['같은 문제에', <><span className="akx-gold">두 번 지지 않는다.</span></>],
];

function Again() {
  const [ref, p] = usePin<HTMLElement>(1);
  const x = ease(seg(p, 0.06, 0.2));
  const flip = seg(p, 0.27, 0.45);
  const swapped = p >= 0.48;
  const circle = ease(seg(p, 0.66, 0.8));
  const gold = seg(p, 0.8, 0.86);
  const step = p < 0.25 ? 0 : p < 0.47 ? 1 : p < 0.64 ? 2 : 3;
  const day = Math.min(3, Math.floor(flip * 4));
  const q = swapped ? Q.b : Q.a;
  return (
    <section className="akx-scene akx-dark akx-again" ref={ref}>
      <div className="akx-pin">
        <div className="akx-wrap akx-grid">
          <div className="akx-copy">
            <p className="akx-kicker">다시 지지 않는 문제</p>
            <Swap k={step} className="akx-h2">
              <span className="akx-h2-a">{AGAIN_LINES[step][0]}</span>
              <span className="akx-h2-b">{AGAIN_LINES[step][1]}</span>
            </Swap>
            <p className="akx-note">틀린 문제는 3일 뒤, 7일 뒤 다시 나옵니다. 두 번 맞히면 졸업.</p>
          </div>
          <div className="akx-stage">
            <div className="akx-paper" style={{ transform: `rotate(${lerp(-2, 1, p)}deg)` }}>
              <div className="akx-paper-top">
                <span
                  className="akx-chip"
                  style={{
                    background: gold > 0.5 ? '#a06f24' : '#e5383b',
                    transform: `rotateY(${gold * 360}deg) scale(${1 + 0.25 * Math.sin(gold * Math.PI)})`,
                  }}
                >
                  13
                </span>
                <span className="akx-cal">
                  <b>{['11월 2일', '11월 3일', '11월 4일', '11월 5일'][day]}</b>
                  <i>{day === 0 ? '틀린 날' : `D+${day}`}</i>
                </span>
              </div>
              <Swap k={swapped ? 'b' : 'a'}>
                <p className="akx-qno">{q.no}.</p>
                <p className="akx-q">{q.q}</p>
                {!swapped && <p className="akx-opts">{q.o}</p>}
                {swapped && (
                  <div className="akx-ans">
                    {circle > 0.05 ? <b>8</b> : <i className="akx-caret" />}
                    <svg viewBox="0 0 400 300" className="akx-o" aria-hidden="true">
                      <ellipse cx="200" cy="150" rx="170" ry="115" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - circle} transform="rotate(-8 200 150)" />
                    </svg>
                  </div>
                )}
              </Swap>
              {!swapped && (
                <svg viewBox="0 0 300 300" className="akx-x" aria-hidden="true">
                  <path d="M50 50L250 250M250 50L50 250" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - x} />
                </svg>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 2. 이름 붙은 약점 ───────────── */
const UNITS = [
  { n: '거듭제곱근과 지수의 확장', v: 0.67 },
  { n: '로그의 정의', v: 0.67 },
  { n: '등비수열', v: 0.33, weak: true },
  { n: '삼각함수의 정의', v: 0.33, weak: true },
  { n: '등차수열', v: 0.8 },
  { n: '수열의 극한', v: 0.33, weak: true },
  { n: '함수의 극한', v: 0.6 },
];

function Name() {
  const [ref, p] = usePin<HTMLElement>(1);
  const q = seg(p, 0.04, 0.42);
  const n = Math.max(1, Math.min(10, Math.ceil(q * 10)));
  const left = Math.round(15 * 60 * (1 - q));
  const bars = ease(seg(p, 0.46, 0.7));
  const named = seg(p, 0.74, 0.86);
  const done = q >= 1;
  return (
    <section className="akx-scene akx-name" ref={ref}>
      <div className="akx-pin">
        <div className="akx-wrap akx-grid">
          <div className="akx-copy">
            <p className="akx-kicker">이름 붙은 약점</p>
            <Swap k={named > 0.5 ? 2 : done ? 1 : 0} className="akx-h2">
              {named > 0.5 ? (
                <>
                  <span className="akx-h2-a">15분 뒤,</span>
                  <span className="akx-h2-b">
                    불안이 <span className="akx-gold">이름을 갖는다.</span>
                  </span>
                </>
              ) : done ? (
                <>
                  <span className="akx-h2-a">어디가</span>
                  <span className="akx-h2-b">비었는지.</span>
                </>
              ) : (
                <>
                  <span className="akx-h2-a">수학이 무서운 게 아니다.</span>
                  <span className="akx-h2-b">
                    <span className="akx-red">모르는 게</span> 무섭다.
                  </span>
                </>
              )}
            </Swap>
            <p className="akx-note">첫 진단 10문항(약 15분) · 취약 개념 맵 — 무료</p>
          </div>
          <div className="akx-stage">
            <div className="akx-card akx-diag">
              <div className="akx-diag-top">
                <b>
                  {n}
                  <span>/10</span>
                </b>
                <span className={`akx-timer ${done ? 'on' : ''}`}>
                  {String(Math.floor(left / 60)).padStart(2, '0')}:{String(left % 60).padStart(2, '0')}
                </span>
              </div>
              <div className="akx-dots" aria-hidden="true">
                {Array.from({ length: 10 }, (_, i) => (
                  <i key={i} className={i < n ? 'on' : ''} />
                ))}
              </div>
              <ul className="akx-units">
                {UNITS.map((u) => (
                  <li key={u.n} className={u.weak && named > 0.5 ? 'weak' : named > 0.5 ? 'dim' : ''}>
                    <span className="akx-unit-n">
                      {u.n}
                      {u.weak && <em style={{ opacity: named, transform: `scale(${lerp(1.6, 1, slam(named))})` }}>약점</em>}
                    </span>
                    <span className="akx-bar">
                      <i style={{ width: `${u.v * bars * 100}%`, background: u.weak ? '#e5383b' : '#a06f24' }} />
                    </span>
                  </li>
                ))}
              </ul>
              <p className="akx-sample">예시 화면</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 3. 성적표가 지도로 ───────────── */
const WRONG = [13, 15, 21, 28, 29, 30];
const MAP = [
  { no: 13, c: '사인법칙' },
  { no: 21, c: '등비수열의 합' },
  { no: 29, c: '수열의 극한' },
];

function ExamMap() {
  const [ref, p] = usePin<HTMLElement>(1);
  const mark = seg(p, 0.04, 0.4);
  const lit = Math.floor(mark * WRONG.length + 0.001);
  const map = seg(p, 0.46, 0.7);
  const rx = seg(p, 0.74, 0.88);
  return (
    <section className="akx-scene akx-map" ref={ref}>
      <div className="akx-pin">
        <div className="akx-wrap akx-grid">
          <div className="akx-copy">
            <p className="akx-kicker">학평이 끝난 날</p>
            <Swap k={rx > 0.5 ? 2 : map > 0.3 ? 1 : 0} className="akx-h2">
              {rx > 0.5 ? (
                <>
                  <span className="akx-h2-a">다음 날,</span>
                  <span className="akx-h2-b">
                    <span className="akx-gold">그 개념부터.</span>
                  </span>
                </>
              ) : map > 0.3 ? (
                <>
                  <span className="akx-h2-a">번호가</span>
                  <span className="akx-h2-b">개념이 된다.</span>
                </>
              ) : (
                <>
                  <span className="akx-h2-a">76점.</span>
                  <span className="akx-h2-b">
                    틀린 <span className="akx-red">{Math.max(lit, 1)}개</span>가 말해준다.
                  </span>
                </>
              )}
            </Swap>
            <p className="akx-note">학평 기록 — 틀린 번호만 누르면 끝 · 무료 (점수 · 번호는 예시)</p>
          </div>
          <div className="akx-stage akx-map-stage">
            <div className="akx-card akx-grid30" style={{ opacity: lerp(1, 0.07, map), transform: `scale(${lerp(1, 0.9, map)})`, filter: `blur(${map * 3}px)` }}>
              {Array.from({ length: 30 }, (_, i) => {
                const no = i + 1;
                const k = WRONG.indexOf(no);
                const on = k >= 0 && k < lit;
                return (
                  <span key={no} className={on ? 'on' : ''}>
                    {no}
                  </span>
                );
              })}
            </div>
            <ul className="akx-mapped">
              {MAP.map((m, i) => {
                const t = seg(map, i / 3, (i + 1) / 3);
                return (
                  <li key={m.no} style={{ opacity: t, transform: `translateX(${(1 - t) * 40}px)` }}>
                    <span className="akx-chip sm">{m.no}</span>
                    <b>{m.c}</b>
                  </li>
                );
              })}
            </ul>
            <div className="akx-card akx-rx" style={{ opacity: rx, transform: `translateY(${(1 - rx) * 30}px)` }}>
              <p className="akx-rx-h">내일의 처방</p>
              {MAP.map((m, i) => (
                <p key={m.no} className="akx-rx-i">
                  <i>{i + 1}</i>
                  {m.c}
                  <span>오답 재출제</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 4. 돌려받는 시간 ───────────── */
const TODAY = ['지수함수의 활용', '등비수열', '수열의 극한', '미분계수와 도함수'];

function Time() {
  const [ref, p] = usePin<HTMLElement>(1);
  const burn = seg(p, 0.04, 0.4);
  const min = Math.round(lerp(10, 40, burn));
  const check = seg(p, 0.5, 0.9);
  const done = Math.floor(check * 4 + 0.001);
  const after = p >= 0.46;
  return (
    <section className="akx-scene akx-dark akx-time" ref={ref}>
      <div className="akx-pin">
        <div className="akx-wrap akx-grid">
          <div className="akx-copy">
            <p className="akx-kicker">돌려받는 시간</p>
            <Swap k={after ? 1 : 0} className="akx-h2">
              {after ? (
                <>
                  <span className="akx-h2-a">뭘 할지 아는 사람이</span>
                  <span className="akx-h2-b">
                    <span className="akx-gold">먼저 시작한다.</span>
                  </span>
                </>
              ) : (
                <>
                  <span className="akx-h2-a">오늘 뭐 하지?</span>
                  <span className="akx-h2-b">
                    고르다가 <span className="akx-red">30분.</span>
                  </span>
                </>
              )}
            </Swap>
            <p className="akx-note">오늘의 처방 — 매일 4문제(약 20분), 문항마다 고른 이유와 함께</p>
          </div>
          <div className="akx-stage">
            {!after ? (
              <div className={`akx-clock ${burn >= 1 ? 'red' : ''}`}>
                22<span className="akx-colon">:</span>
                {String(min).padStart(2, '0')}
              </div>
            ) : (
              <ul className="akx-today">
                {TODAY.map((t, i) => (
                  <li key={t} className={i < done ? 'on' : ''}>
                    <i>{i < done ? '✓' : i + 1}</i>
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 5. 역전의 3월 ───────────── */
function Winter() {
  const [ref, p] = usePin<HTMLElement>(1);
  const days = useDays();
  const c = ease(seg(p, 0.04, 0.4));
  const shown = Math.round(lerp(365, days ?? 120, c));
  const weeks = seg(p, 0.48, 0.9) * 8;
  const LABEL = (w: number) => (w < 6 ? '약점 3개' : w === 6 ? '종합 복습' : '실전 점검');
  return (
    <section className="akx-scene akx-dark akx-winter" ref={ref}>
      <div className="akx-pin">
        <div className="akx-wrap akx-col">
          <p className="akx-kicker">역전의 3월</p>
          <div className="akx-count">
            <small>고3 개학까지</small>
            <b>
              {shown}
              <span>일</span>
            </b>
          </div>
          <Swap k={weeks > 0.3 ? 1 : 0} className="akx-h2 akx-center">
            {weeks > 0.3 ? (
              <span className="akx-h2-b">
                이 겨울이, <span className="akx-gold">고3 1년을 정한다.</span>
              </span>
            ) : (
              <span className="akx-h2-b">1년인 줄 알았지?</span>
            )}
          </Swap>
          <div className="akx-weeks" aria-label="겨울방학 8주 플랜">
            {Array.from({ length: 8 }, (_, w) => {
              const f = clamp(weeks - w);
              return (
                <div key={w} className={f >= 1 ? 'on' : ''} style={{ opacity: lerp(0.35, 1, f) }}>
                  <b>{w + 1}주</b>
                  <span>{LABEL(w)}</span>
                </div>
              );
            })}
          </div>
          <p className="akx-note akx-center">겨울방학 8주 플랜 — 내 약점 순서로 한 주 3개념, 7주 종합 복습, 8주 실전 점검</p>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 6. 화면 — 세로 휠이 가로로 ───────────── */
const SCREENS = [
  { src: '/arke/shots/diagnostic.webp', t: '첫 진단', c: '배운 단원에서 고르게 10문항' },
  { src: '/arke/shots/exams.webp', t: '학평 기록', c: '틀린 번호만 누르면 끝' },
  { src: '/arke/shots/prescription-v2.webp', t: '오늘의 처방', c: '왜 이 문항인지 이유와 함께' },
  { src: '/arke/shots/conceptmap-v2.webp', t: '취약 개념 맵', c: '어디서 무너지는지, 기록으로' },
  ...(PHOTO_LIVE ? [{ src: '/arke/shots/photo.webp', t: '틀린 문제 찍기', c: '풀이 대신, 어디서 틀렸는지' }] : []),
];

function Gallery() {
  const [ref, p] = usePin<HTMLElement>(1);
  const track = useRef<HTMLDivElement | null>(null);
  const [span, setSpan] = useState(0);
  useEffect(() => {
    const m = () => {
      const t = track.current;
      if (t) setSpan(Math.max(0, t.scrollWidth - t.parentElement!.clientWidth));
    };
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);
  return (
    <section className="akx-scene akx-gallery" ref={ref} id="screens">
      <div className="akx-pin akx-pin-col">
        <div className="akx-wrap">
          <p className="akx-kicker">앱을 열면</p>
          <h2 className="akx-h2 akx-h2-one">이렇게 보입니다.</h2>
        </div>
        <div className="akx-rail">
          <div className="akx-track" ref={track} style={{ transform: `translateX(${-span * ease(seg(p, 0.05, 0.95))}px)` }}>
            {SCREENS.map((s) => (
              <figure key={s.src} className="akx-phone">
                <img src={s.src} alt={`ARKE ${s.t} 화면`} width={760} height={1491} loading="lazy" />
                <figcaption>
                  <b>{s.t}</b>
                  {s.c}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 떠 있는 버튼(첫 화면을 지나면) ───────────── */
function FloatCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => {
      const y = window.scrollY, h = window.innerHeight, H = document.documentElement.scrollHeight;
      setShow(y > h * 0.8 && y + h < H - 260);
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div className={`akx-float-cta ${show ? 'on' : ''}`} aria-hidden={!show}>
      <StoreButton role="student" className="ark-btn ark-btn-primary">
        첫 진단 10문항 무료
      </StoreButton>
      <a className="ark-btn ark-btn-ghost akx-float-parent" href="#parents">
        학부모
      </a>
    </div>
  );
}

export default function ArkeHome() {
  return (
    <>
      <Hero />
      <Again />
      <Name />
      <ExamMap />
      <Time />
      <Winter />
      <Gallery />
      <FloatCta />
    </>
  );
}
