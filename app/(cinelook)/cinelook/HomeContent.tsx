'use client';
/* eslint-disable @next/next/no-img-element */

/**
 * CineLook 랜딩 — 스크롤 인터랙티브 (Apple 제품 페이지 문법)
 * 원본 NEXTGEN_CINEMATIC/site/src/pages/Home.jsx — 문안과 동작은 한 글자도 고치지 않았다.
 * 바뀐 것: react-router Link → next/link(경로에 /cinelook 접두), 이미지 경로 /media → /cinelook/media,
 *          styles.css 쪽 공용 클래스(wrap·btn·pills·plan…)에 cl- 접두.
 * <img> 를 그대로 쓰는 이유: 겹쳐 놓고 opacity/clip-path 로 바꾸는 연출이 많아
 * next/image 의 래핑·지연 로딩 규칙과 맞지 않는다. 에셋은 이미 WebP/JPEG 로 줄여져 있다.
 *
 *  · 히어로: 룩이 바뀌는 폰 + 양옆으로 펼쳐지는 4컷 스트립·공유 카드
 *  · 4컷 부스: 스크롤하면 한 칸씩 찰칵 → 레이아웃 4종으로 펼쳐짐 (sticky)
 *  · 프레임: 양방향 마키 · 필터: 드래그 비교 슬라이더 · 테마: 페이지 색까지 바뀌는 스위처
 *  · 공유 카드: 부채꼴 카드 + 레시피 코드 타이핑
 * 서버 렌더는 '완성된 상태'를 그리고, 클라이언트가 스크롤에 맞춰 되감는다.
 * prefers-reduced-motion 이면 애니메이션 없이 완성 상태를 보여 준다.
 */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ElementType, KeyboardEvent, PointerEvent, ReactNode } from 'react';
import { useDocTitle, useLang } from './i18n';
import { StoreButton } from './chrome';
import { reduceMotion, useCycle, useInView, useScrollProgress } from './motion';

const M = (f: string) => `/cinelook/media/${f}`;
const css = (o: Record<string, string | number>) => o as CSSProperties;

const LOOKS = [
  { id: 'warmgold', name: 'Warm Gold', mood: ['필름', 'Film'] },
  { id: 'neonrain', name: 'Neon Rain', mood: ['네온 밤', 'Neon Night'] },
  { id: 'tealorange', name: 'Teal & Orange', mood: ['시네마', 'Cinema'] },
  { id: 'pastelsym', name: 'Pastel Symmetry', mood: ['파스텔', 'Pastel'] },
  { id: 'goldenhour', name: 'Golden Hour', mood: ['무드', 'Mood'] },
  { id: 'noir', name: 'Noir Classic', mood: ['모노', 'Mono'] },
  { id: 'homemovie', name: 'Home Movie', mood: ['올드필름', 'Vintage'] },
  { id: 'nitrate', name: 'Nitrate Glow', mood: ['올드필름', 'Vintage'] },
  { id: 'cyberteal', name: 'Cyber Teal', mood: ['네온 밤', 'Neon Night'] },
];

/* 스크롤에 따라 나타나는 블록 */
function Reveal({
  as: Tag = 'div',
  className = '',
  delay = 0,
  children,
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  children?: ReactNode;
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={`rv ${inView ? 'in' : ''} ${className}`} style={css({ '--d': `${delay}ms` })}>
      {children}
    </Tag>
  );
}

/* ============================== 히어로 ============================== */
function Hero() {
  const { lang, L } = useLang();
  const ref = useScrollProgress<HTMLElement>();
  const [i] = useCycle(LOOKS.length, 1800, false);
  const sfx = lang === 'en' ? '-en' : '';
  return (
    <section className="lx-hero" ref={ref}>
      <div className="cl-wrap lx-hero-copy">
        <Reveal as="p" className="cl-eyebrow">
          {L('4컷 부스 · 필름카메라 · 영화 필터', 'Photo booth · Film cameras · Movie looks')}
        </Reveal>
        <Reveal as="h1" className="lx-h1" delay={80}>
          {L(
            <>
              주머니 속<br />
              <em>네컷 사진관.</em>
            </>,
            <>
              A photo booth<br />
              <em>in your pocket.</em>
            </>
          )}
        </Reveal>
        <Reveal as="p" className="lx-lead" delay={160}>
          {L(
            <>
              셔터 한 번에 네 컷, 프레임 20종, 영화 필터 35종.
              <br />앱 전체가 바뀌는 테마와 자랑하고 싶은 공유 카드까지.
            </>,
            <>
              Four shots from one tap, twenty frames, thirty-five movie looks —
              <br />
              plus themes that restyle the whole app and share cards worth posting.
            </>
          )}
        </Reveal>
        <Reveal className="cl-cta-row center" delay={240}>
          <StoreButton />
          <a className="cl-btn cl-ghost" href="#booth">
            {L('둘러보기 ↓', 'Take a look ↓')}
          </a>
        </Reveal>
        <Reveal as="ul" className="cl-pills center" delay={300}>
          <li>{L('구독 없음 · 평생 소장', 'No subscription')}</li>
          <li>{L('계정 없음', 'No account')}</li>
          <li>{L('광고 없음', 'No ads')}</li>
          <li>{L('사진은 기기 밖으로 안 나가요', 'Photos stay on device')}</li>
        </Reveal>
      </div>

      <div className="lx-hero-stage" aria-hidden="true">
        <img className="lx-float lx-float-l" src={M('booth-strip.webp')} width="484" height="1500" alt="" />
        <div className="lx-phone lx-phone-hero">
          <div className="lx-screen">
            {LOOKS.map((lk, k) => (
              <img
                key={lk.id}
                src={M(`look-${lk.id}.webp`)}
                width="720"
                height="900"
                alt=""
                className={k === i ? 'on' : ''}
                loading={k < 2 ? 'eager' : 'lazy'}
              />
            ))}
            <span className="lx-chip">{LOOKS[i].name}</span>
          </div>
        </div>
        <img
          className="lx-float lx-float-r"
          src={M(`card-doodle${sfx}.webp`)}
          width="608"
          height="1080"
          alt=""
        />
      </div>
    </section>
  );
}

/* ============================== 4컷 부스 (sticky) ============================== */
const STRIP_SLOTS = [0, 1, 2, 3].map((k) => ({
  top: ((0.08 + k * 0.68) / 3.1) * 100,
  h: (0.63 / 3.1) * 100,
}));

function Booth() {
  const { L } = useLang();
  const [st, setSt] = useState({ shots: 4, all: true }); // 서버 렌더·모션 줄이기 = 완성 상태
  const ref = useScrollProgress<HTMLElement>((p) => {
    if (reduceMotion()) return;
    const shots = p < 0.1 ? 0 : Math.min(4, Math.floor((p - 0.1) / 0.13) + 1);
    const all = p > 0.72;
    setSt((o) => (o.shots === shots && o.all === all ? o : { shots, all }));
  });
  const step = st.all ? 3 : st.shots === 0 ? 0 : st.shots < 4 ? 1 : 2;
  const steps = [
    [L('셔터 한 번이면.', 'One tap.'), L('4컷 부스 모드에서 셔터를 누르세요.', 'Press the shutter in Photo Booth mode.')],
    [
      L('3 · 2 · 1, 네 번 찰칵.', 'Three, two, one — four times.'),
      L(
        '컷마다 카운트다운이 있어 포즈를 바꿀 틈이 있어요.',
        'A countdown before every shot gives you time to change your pose.'
      ),
    ],
    [
      L('사진관 스트립으로 인화.', 'Developed into a booth strip.'),
      L('날짜와 로고까지 찍힌 스트립이 바로 나옵니다.', 'Out comes a strip, date and logo printed in.'),
    ],
    [
      L('레이아웃 4종 · 프레임 20종.', 'Four layouts. Twenty frames.'),
      L(
        '스트립 · 블랙 스트립 · 2×2 그리드 · 듀오. 앨범에서 여러 장을 골라 만들 수도 있어요.',
        'Strip, black strip, 2×2 grid and duo. You can also build one from photos in your library.'
      ),
    ],
  ];
  return (
    <section id="booth" className="lx-booth" ref={ref}>
      <div className="lx-sticky">
        <div className={`cl-wrap lx-booth-grid ${st.all ? 'all' : ''}`}>
          <div className="lx-booth-copy">
            <p className="lx-kicker">{L('4컷 부스', 'Photo Booth')}</p>
            <div className="lx-steps">
              {steps.map(([h, p], k) => (
                <div key={k} className={`lx-step ${k === step ? 'on' : ''}`} aria-hidden={k !== step}>
                  <h2>{h}</h2>
                  <p>{p}</p>
                </div>
              ))}
            </div>
            <div className="lx-count" aria-hidden="true">
              {[0, 1, 2, 3].map((k) => (
                <i key={k} className={k < st.shots ? 'on' : ''} />
              ))}
            </div>
          </div>
          <div className={`lx-booth-row ${st.all ? 'all' : ''}`}>
            <div className="lx-strip">
              <img
                src={M('booth-strip.webp')}
                width="484"
                height="1500"
                alt={L('4컷 부스 스트립 — 서로 다른 네 컷과 날짜', 'Booth strip with four different shots and a date')}
              />
              {STRIP_SLOTS.map((s, k) => (
                <span
                  key={k}
                  className={`lx-slot ${k < st.shots ? 'shot' : ''}`}
                  style={{ top: `${s.top}%`, height: `${s.h}%` }}
                  aria-hidden="true"
                >
                  {k + 1}
                </span>
              ))}
              <span key={st.shots} className={`lx-flash ${st.shots > 0 && !st.all ? 'go' : ''}`} aria-hidden="true" />
            </div>
            <img
              className="lx-lay"
              src={M('booth-stripnoir.webp')}
              width="484"
              height="1500"
              alt={L('블랙 스트립 레이아웃', 'Black strip layout')}
              loading="lazy"
            />
            <img
              className="lx-lay"
              src={M('booth-grid4.webp')}
              width="1200"
              height="1500"
              alt={L('2×2 그리드 레이아웃', '2×2 grid layout')}
              loading="lazy"
            />
            <img
              className="lx-lay duo"
              src={M('booth-duo.webp')}
              width="1500"
              height="1125"
              alt={L('듀오 레이아웃', 'Duo layout')}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== 프레임 마키 ============================== */
type Frame = [string, number, number];
const FRAMES_A: Frame[] = [
  ['frame-instant.webp', 740, 900],
  ['frame-ticket.webp', 900, 474],
  ['frame-cover.webp', 720, 900],
  ['frame-film35.webp', 900, 555],
];
const FRAMES_B: Frame[] = [
  ['frame-lcd.webp', 900, 762],
  ['frame-postcard.webp', 900, 600],
  ['frame-washi.webp', 900, 720],
  ['frame-slide.webp', 900, 900],
];

function Frames() {
  const { L } = useLang();
  const row = (list: Frame[], cls: string) => (
    <div className={`lx-marquee ${cls}`}>
      <div className="lx-track">
        {[...list, ...list].map(([f, w, h], k) => (
          <img key={k} src={M(f)} width={w} height={h} alt="" loading="lazy" />
        ))}
      </div>
    </div>
  );
  return (
    <section id="frames" className="lx-frames">
      <div className="cl-wrap">
        <Reveal className="lx-head center">
          <p className="lx-kicker">{L('프레임 20종', 'Twenty frames')}</p>
          <h2>
            {L(
              <>
                사진 한 장이
                <br />
                오브제가 됩니다.
              </>,
              <>
                One photo becomes
                <br />
                an object.
              </>
            )}
          </h2>
          <p>
            {L(
              '인스턴트 사진, 35mm 필름, 디카 화면, 티켓, 엽서, 매거진 커버, 마스킹 테이프, 슬라이드까지.',
              'Instant prints, 35mm film, a digicam screen, tickets, postcards, a magazine cover, washi tape and slides.'
            )}
          </p>
        </Reveal>
      </div>
      <div aria-label={L('프레임 예시', 'Frame examples')} role="img">
        {row(FRAMES_A, 'fwd')}
        {row(FRAMES_B, 'rev')}
      </div>
    </section>
  );
}

/* ============================== 필터 비교 슬라이더 ============================== */
function Looks() {
  const { L } = useLang();
  const [look, setLook] = useState(1);
  const [x, setX] = useState(50);
  const [touched, setTouched] = useState(false);
  const box = useRef<HTMLDivElement | null>(null);
  const [vref, inView] = useInView<HTMLElement>();

  // 처음 보일 때 한 번 스윕해서 '끌 수 있다'를 보여 준다
  useEffect(() => {
    if (!inView || touched || reduceMotion()) return;
    let raf = 0;
    let t0 = 0;
    const run = (t: number) => {
      if (!t0) t0 = t;
      const k = Math.min(1, (t - t0) / 2200);
      setX(50 + Math.sin(k * Math.PI * 2) * 32 * (1 - k * 0.3));
      if (k < 1) raf = requestAnimationFrame(run);
      else setX(50);
    };
    raf = requestAnimationFrame(run);
    return () => cancelAnimationFrame(raf);
  }, [inView, touched]);

  const move = (e: PointerEvent<HTMLDivElement>) => {
    if (!box.current) return;
    const r = box.current.getBoundingClientRect();
    setX(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };
  const down = (e: PointerEvent<HTMLDivElement>) => {
    setTouched(true);
    box.current?.setPointerCapture(e.pointerId);
    move(e);
  };
  const key = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setTouched(true);
      setX((v) => Math.max(0, v - 5));
    }
    if (e.key === 'ArrowRight') {
      setTouched(true);
      setX((v) => Math.min(100, v + 5));
    }
  };
  const lk = LOOKS[look];

  return (
    <section id="looks" className="lx-looks" ref={vref}>
      <div className="cl-wrap lx-split">
        <Reveal className="lx-head">
          <p className="lx-kicker">{L('영화 필터 35종 · 7가지 무드', '35 movie looks · 7 moods')}</p>
          <h2>
            {L(
              <>
                원본과는
                <br />
                완전히 다른 색.
              </>,
              <>
                Colour that looks
                <br />
                nothing like the original.
              </>
            )}
          </h2>
          <p>
            {L(
              '필름 · 네온 밤 · 시네마 · 파스텔 · 무드 · 모노 · 올드필름. 거친 입자와 먼지, 기스까지 들어간 오래된 필름 룩도 있어요. 가운데 선을 끌어 비교해 보세요.',
              'Film, Neon Night, Cinema, Pastel, Mood, Mono and Vintage — including old-film looks with coarse grain, dust and scratches. Drag the line to compare.'
            )}
          </p>
          <div className="lx-chips" role="tablist" aria-label={L('필터 고르기', 'Choose a look')}>
            {LOOKS.map((l, k) => (
              <button
                key={l.id}
                type="button"
                role="tab"
                aria-selected={k === look}
                className={k === look ? 'on' : ''}
                onClick={() => {
                  setLook(k);
                  setTouched(true);
                }}
              >
                {l.name}
              </button>
            ))}
          </div>
        </Reveal>
        <Reveal className="lx-compare-wrap" delay={100}>
          <div
            className="lx-compare"
            ref={box}
            onPointerDown={down}
            onPointerMove={(e) => {
              if (e.buttons) move(e);
            }}
            role="slider"
            tabIndex={0}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(x)}
            aria-label={L('원본과 필터 비교', 'Compare original and filtered')}
            onKeyDown={key}
            style={css({ '--x': `${x}%` })}
          >
            <img
              src={M('look-original.webp')}
              width="720"
              height="900"
              alt={L('원본 사진', 'Original photo')}
              draggable={false}
            />
            {LOOKS.map((l, k) => (
              <img
                key={l.id}
                className={`lx-after ${k === look ? 'on' : ''}`}
                src={M(`look-${l.id}.webp`)}
                width="720"
                height="900"
                alt={k === look ? `${l.name} ${L('필터 적용', 'applied')}` : ''}
                loading="lazy"
                draggable={false}
              />
            ))}
            <span className="lx-handle" aria-hidden="true">
              <b>‹ ›</b>
            </span>
            <span className="lx-tag l">{L('원본', 'Original')}</span>
            <span className="lx-tag r">
              {lk.name} · {L(lk.mood[0], lk.mood[1])}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== 필름카메라 ============================== */
function Cameras() {
  const { L } = useLang();
  const bodies = [
    ['pocketccd', 'Pocket CCD', L('차가운 CCD 톤 · 렌즈 색 번짐', 'Cool CCD tones, lens fringing')],
    ['disposable', 'Disposable 27', L('강한 플래시 · 굵은 입자', 'Hard flash, heavy grain')],
    ['nightflash', 'Night Flash', L('정면 플래시 · 어두운 배경', 'Direct flash, dark backdrop')],
    ['instantpack', 'Instant Pack', L('빛바랜 크림 톤 · 부드러운 초점', 'Faded cream tones, soft focus')],
  ];
  return (
    <section id="cameras" className="lx-cams">
      <div className="cl-wrap">
        <Reveal className="lx-head center">
          <p className="lx-kicker">{L('필름카메라 8종', 'Eight film cameras')}</p>
          <h2>
            {L(
              <>
                찍는 순간,
                <br />그 시절 디카.
              </>,
              <>
                Old digicam vibes,
                <br />
                the moment you shoot.
              </>
            )}
          </h2>
          <p>
            {L(
              '플래시 번짐, 붉은 할레이션, 싼 렌즈의 색 번짐, 주황빛 날짜 스탬프까지 촬영과 동시에 입혀집니다.',
              'Flash bloom, red halation, cheap-lens fringing and an orange date stamp — applied as you shoot.'
            )}
          </p>
        </Reveal>
        <div className="lx-cam-grid">
          {bodies.map(([id, name, d], k) => (
            <Reveal as="figure" key={id} className="lx-cam" delay={k * 90}>
              <img src={M(`body-${id}.webp`)} width="1000" height="750" alt={`${name} — ${d}`} loading="lazy" />
              <figcaption>
                <b>{name}</b>
                <span>{d}</span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== 테마 ============================== */
const THEMES = [
  { id: 'standard', ko: '스탠다드', en: 'Standard', free: true, bg: '#0b0b0e', ac: '#d8b36a', sw: ['#0b0b0e', '#1b1b22', '#d8b36a'] },
  { id: 'doodle', ko: '두들', en: 'Doodle', bg: '#eef1fa', ac: '#2d4bd1', sw: ['#fdfdfb', '#2d4bd1', '#ffe44d'], light: true },
  { id: 'cartoon', ko: '카툰', en: 'Cartoonic', bg: '#fff1b8', ac: '#ff4f9a', sw: ['#fff4c7', '#ff4f9a', '#3db7ff'], light: true },
  { id: 'graffiti', ko: '그래피티', en: 'Graffiti', bg: '#121214', ac: '#c6ff3d', sw: ['#121214', '#c6ff3d', '#ff2e93'] },
] as { id: string; ko: string; en: string; free?: boolean; bg: string; ac: string; sw: string[]; light?: boolean }[];

function Themes() {
  const { lang, L } = useLang();
  const [paused, setPaused] = useState(false);
  const [vref, inView] = useInView<HTMLElement>({ margin: '0px 0px -30% 0px' });
  const [i, setI] = useCycle(THEMES.length, 2600, paused || !inView);
  const t = THEMES[i];
  const sfx = lang === 'en' ? '-en' : '';
  return (
    <section
      id="themes"
      ref={vref}
      className={`lx-themes ${t.light ? 'light' : ''}`}
      style={css({ '--tbg': t.bg, '--tac': t.ac })}
    >
      <div className="cl-wrap lx-split rev">
        <div className="lx-head">
          <p className="lx-kicker">{L('UI 테마 4종', 'Four UI themes')}</p>
          <h2>
            {L(
              <>
                앱 전체가
                <br />
                바뀝니다.
              </>,
              <>
                The whole app
                <br />
                changes.
              </>
            )}
          </h2>
          <p>
            {L(
              '버튼, 글꼴, 배경, 공유 카드까지 한 번에. 오늘 기분에 맞춰 앱을 갈아입히세요. Pro 테마도 시트 안에서 입어볼 수 있어요.',
              'Buttons, type, backgrounds and share cards, all at once. Dress the app to match your mood — and try on Pro themes before you buy.'
            )}
          </p>
          <div className="lx-themebtns" role="tablist" aria-label={L('테마 고르기', 'Choose a theme')}>
            {THEMES.map((x, k) => (
              <button
                key={x.id}
                type="button"
                role="tab"
                aria-selected={k === i}
                className={k === i ? 'on' : ''}
                onClick={() => {
                  setI(k);
                  setPaused(true);
                }}
              >
                <span className="sw">
                  {x.sw.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                </span>
                {lang === 'ko' ? x.ko : x.en}
                {!x.free && <small>Pro</small>}
              </button>
            ))}
          </div>
        </div>
        <div className="lx-theme-stage">
          <div className="lx-phone">
            <div className="lx-screen tall">
              {THEMES.map((x, k) => (
                <img
                  key={x.id}
                  src={M(`home-${x.id}${sfx}.jpg`)}
                  width="780"
                  height="1688"
                  alt={k === i ? L(`${x.ko} 테마의 홈 화면`, `Home screen in the ${x.en} theme`) : ''}
                  className={k === i ? 'on' : ''}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
          <div className="lx-mini-card">
            {THEMES.map((x, k) => (
              <img
                key={x.id}
                src={M(`card-${x.id}${sfx}.webp`)}
                width="608"
                height="1080"
                alt=""
                className={k === i ? 'on' : ''}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== 공유 카드 + 레시피 코드 ============================== */
const CODE = 'CL-7K2PQ';
function Share() {
  const { lang, L } = useLang();
  const sfx = lang === 'en' ? '-en' : '';
  const [ref, inView] = useInView<HTMLElement>({ margin: '0px 0px -25% 0px' });
  const [typed, setTyped] = useState(CODE.length);
  useEffect(() => {
    if (!inView || reduceMotion()) return;
    let k = 0;
    setTyped(0);
    const t = setInterval(() => {
      k++;
      setTyped(k);
      if (k >= CODE.length) clearInterval(t);
    }, 150);
    return () => clearInterval(t);
  }, [inView]);
  const done = typed >= CODE.length;
  return (
    <section id="share" className="lx-share" ref={ref}>
      <div className="cl-wrap">
        <div className="lx-head center">
          <p className="lx-kicker">{L('공유 카드 · 레시피 코드', 'Share cards · Recipe codes')}</p>
          <h2>
            {L(
              <>
                자랑은 카드 한 장으로.
                <br />
                <em>친구는 같은 룩으로.</em>
              </>,
              <>
                Show off with one card.
                <br />
                <em>Friends get the same look.</em>
              </>
            )}
          </h2>
          <p>
            {L(
              '스토리 9:16 · 피드 4:5 카드가 테마마다 다르게 만들어져요. 카드에 적힌 코드를 친구가 입력하면 카메라·필터·프레임이 그대로 적용됩니다.',
              'Story (9:16) and feed (4:5) cards, styled by your theme. When a friend types the code printed on the card, they get the same camera, look and frame.'
            )}
          </p>
        </div>
        <div className={`lx-fan ${inView ? 'in' : ''}`}>
          {['standard', 'cartoon', 'doodle', 'graffiti'].map((id, k) => (
            <img
              key={id}
              className={`c${k}`}
              src={M(`card-${id}${sfx}.webp`)}
              width="608"
              height="1080"
              alt={L(`${id} 스타일 공유 카드`, `Share card in the ${id} style`)}
              loading="lazy"
            />
          ))}
        </div>
        <div className="lx-recipe">
          <div className="lx-code" aria-label={CODE}>
            <span className="lbl">{L('레시피 코드', 'Recipe code')}</span>
            <span className="val">
              {CODE.slice(0, typed)}
              <i className={done ? 'blink' : ''} />
            </span>
          </div>
          <span className={`lx-arrow ${done ? 'on' : ''}`} aria-hidden="true">
            →
          </span>
          <div className={`lx-result ${done ? 'on' : ''}`}>
            <img src={M('look-pastelsym.webp')} width="720" height="900" alt="" loading="lazy" />
            <span>{L('같은 룩, 친구 사진에', 'Same look, on their photo')}</span>
          </div>
        </div>
        <p className="lx-note">
          {L(
            '코드에는 사진도 개인정보도 들어 있지 않아요 — 다섯 글자가 전부입니다. 무료 카드에는 작은 "Made with CineLook" 배지가 붙고, Pro는 끌 수 있어요.',
            'The code carries no photo and no personal data — just five characters. Free cards carry a small "Made with CineLook" badge; Pro can turn it off.'
          )}
        </p>
      </div>
    </section>
  );
}

/* ============================== 프라이버시 ============================== */
function Privacy() {
  const { L } = useLang();
  const zeros = [L('계정', 'accounts'), L('광고', 'ads'), L('업로드', 'uploads'), L('구독', 'subscriptions')];
  return (
    <section className="lx-privacy">
      <div className="cl-wrap">
        <Reveal className="lx-head center">
          <p className="lx-kicker">{L('온디바이스', 'On device')}</p>
          <h2>{L('사진은 기기를 떠나지 않습니다.', 'Your photos never leave your device.')}</h2>
        </Reveal>
        <div className="lx-zeros">
          {zeros.map((w, k) => (
            <Reveal key={k} className="lx-zero" delay={k * 110}>
              <b>0</b>
              <span>{w}</span>
            </Reveal>
          ))}
        </div>
        <Reveal as="ul" className="lx-plist">
          <li>
            {L(
              '필터 · 조명 · 프레임 처리는 전부 아이폰 안에서 이루어집니다.',
              'Filters, lighting and frames are all processed on your iPhone.'
            )}
          </li>
          <li>
            {L(
              '앱에는 네트워크 기능이 없습니다 — 업로드할 방법 자체가 없어요.',
              'The app has no networking — there is simply no way to upload.'
            )}
          </li>
          <li>
            {L(
              '사진 권한은 "추가 전용"입니다. 저장할 때만 쓰고, 앨범을 읽지 않습니다.',
              'Photo access is add-only: used to save, never to read your library.'
            )}
          </li>
          <li>
            {L(
              '원본은 그대로 두고 새 사진으로 저장합니다.',
              'Saving never touches the original — it adds a new photo.'
            )}
          </li>
        </Reveal>
        <p className="center">
          <Link href="/cinelook/privacy">
            <b>{L('개인정보 처리방침 전문 보기 →', 'Read the full privacy policy →')}</b>
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ============================== 요금 ============================== */
function Pricing() {
  const { L } = useLang();
  return (
    <section id="pro" className="lx-pricing">
      <div className="cl-wrap">
        <Reveal className="lx-head center">
          <p className="lx-kicker">{L('구독 없음', 'No subscription')}</p>
          <h2>{L('무료로 시작. 한 번 사면 평생.', 'Start free. Buy once, keep forever.')}</h2>
          <p>
            {L(
              '잠긴 템플릿도 미리보기는 자유예요. 저장할 때만 Pro가 필요합니다.',
              'Locked templates can be previewed freely — Pro is only needed to save them.'
            )}
          </p>
        </Reveal>
        <div className="cl-plans center-grid">
          <Reveal className="cl-plan">
            <h3>{L('무료', 'Free')}</h3>
            <ul>
              <li>{L('4컷 부스 · 스트립 레이아웃', 'Photo booth with the strip layout')}</li>
              <li>{L('필름카메라 3종 · 영화 필터 9종 · 프레임 5종', '3 film cameras, 9 movie looks, 5 frames')}</li>
              <li>{L('촬영 · 불러오기 · 저장 무제한, 워터마크 없음', 'Unlimited shooting and saving, no watermark')}</li>
              <li>{L('스토리 · 피드 공유 카드 + 레시피 코드', 'Story and feed share cards + recipe codes')}</li>
              <li>{L('스탠다드 테마', 'Standard theme')}</li>
            </ul>
          </Reveal>
          <Reveal className="cl-plan cl-pro" delay={120}>
            <span className="cl-tag">{L('평생 소장', 'Lifetime')}</span>
            <h3>CineLook Pro</h3>
            <ul>
              <li>{L('레이아웃 4종 · 프레임 20종 전부', 'All 4 layouts and 20 frames')}</li>
              <li>{L('필름카메라 8종 · 영화 필터 35종 전부', 'All 8 cameras and 35 movie looks')}</li>
              <li>{L('UI 테마 3종 — 두들 · 카툰 · 그래피티', '3 UI themes — Doodle, Cartoonic, Graffiti')}</li>
              <li>{L('테마별 공유 카드 · 배지 끄기', 'Themed share cards, badge optional')}</li>
              <li>{L('AI 입체 조명 · 역광 · 세부 조정', 'AI depth light, backlight and fine-tune')}</li>
              <li>{L('앞으로 추가되는 템플릿 포함', 'Future templates included')}</li>
            </ul>
            <p className="cl-price-note">
              {L('앱 내 구매 1회 · 가격은 App Store에 표시됩니다', 'One in-app purchase · price shown in the App Store')}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============================== 페이지 ============================== */
function SubNav() {
  const { L } = useLang();
  const [cur, setCur] = useState('');
  useEffect(() => {
    const ids = ['booth', 'frames', 'looks', 'themes', 'share', 'pro'];
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) setCur(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  const links: [string, string][] = [
    ['booth', L('4컷 부스', 'Booth')],
    ['frames', L('프레임', 'Frames')],
    ['looks', L('필터', 'Looks')],
    ['themes', L('테마', 'Themes')],
    ['share', L('공유 카드', 'Share')],
    ['pro', 'Pro'],
  ];
  return (
    <nav className="lx-subnav" aria-label={L('페이지 안 이동', 'On this page')}>
      <div className="cl-wrap lx-subnav-in">
        {links.map(([id, t]) => (
          <a key={id} href={`#${id}`} className={cur === id ? 'on' : ''}>
            {t}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default function HomeContent() {
  const { L } = useLang();
  useDocTitle('CineLook — 주머니 속 네컷 사진관', 'CineLook — A photo booth in your pocket');
  return (
    <div className="lx">
      <Hero />
      <SubNav />
      <Booth />
      <Frames />
      <Looks />
      <Cameras />
      <Themes />
      <Share />
      <Privacy />
      <Pricing />
      <section className="lx-final">
        <div className="cl-wrap center">
          <Reveal>
            <img src="/cinelook/icon-256.webp" width="112" height="112" alt="" className="lx-icon" />
            <h2>
              {L(
                <>
                  오늘의 네 컷,
                  <br />
                  지금 찍어 보세요.
                </>,
                <>
                  Take today’s four shots
                  <br />
                  right now.
                </>
              )}
            </h2>
            <div className="cl-cta-row center">
              <StoreButton />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
