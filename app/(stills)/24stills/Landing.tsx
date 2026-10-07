'use client';

/* 24STILLS 랜딩 — 스크롤에 반응하는 섹션들.
   각 장면은 "높은 컨테이너 + 화면에 붙는(sticky) 무대"로 만들고, 컨테이너를 지나는 동안의
   스크롤 진행도(0→1)로 숫자·격자·현상·필름 스트립을 움직인다. 자동 재생 애니메이션은 없다
   (스크롤을 멈추면 화면도 멈춘다 → 모션 민감 사용자에게도 안전). */

import { useEffect, useRef, useState } from 'react';
import {
  motion, useMotionTemplate, useMotionValueEvent, useScroll, useTransform, type MotionValue,
} from 'framer-motion';
import { APP_STORE_URL, useLang } from './chrome';

const IMG = '/24stills/landing';
const ROLL = [57, 62, 174, 155, 164, 110, 77, 71, 124, 82, 29, 171, 63, 17, 185, 76, 13, 15, 25, 37, 49, 128, 179, 42];
const FILMS: { id: number; name: string }[] = [
  { id: 57, name: 'Cinema 400' }, { id: 62, name: 'Gold 200' }, { id: 110, name: 'Sunset Chrome' },
  { id: 124, name: 'Deep Blue' }, { id: 82, name: 'Tokyo Morning' }, { id: 29, name: 'Skyline' },
  { id: 171, name: 'Noir Teal' }, { id: 63, name: 'Retro 265' },
];

const COPY = {
  ko: {
    heroKicker: '필름 카메라 앱',
    heroTitle: ['덜 찍고,', '더 기억한다.'],
    heroSub: '한 달 24장. 3일의 기다림.',
    scroll: '스크롤',
    floodLabel: '내 카메라롤 속 사진',
    floodQ: ['그중', '기억나는 건', '몇 장?'],
    rollTitle: ['한 달,', '24장.'],
    rollBody: '필름 한 롤처럼, 매달 딱 24장. 늘릴 수 없어요. 그래서 셔터 앞에서 한 번 더 보게 돼요.',
    rollLeft: '남은 컷',
    devTitle: ['3일을', '기다려요.'],
    devBody: '찍은 사진은 바로 보이지 않아요. 암실에서 3일을 보낸 뒤에야 나타나요. 무엇이 찍혔을지 궁금해하는 시간까지가 필름이에요.',
    devWait: '현상 중', devDone: '현상 완료', day: 'DAY',
    filmTitle: ['필터가 아니라,', '필름으로.'],
    filmBody: '색, 그레인, 빛번짐까지. 미리보기에서 본 그대로 현상돼요.',
    filmCount: ['필름 26+', '그레인 20+'],
    randLabel: '랜덤 롤 · 1:1',
    randTitle: ['낯선 누군가와,', '한 롤.'],
    randBody: '세계 어딘가의 한 사람과 1:1로 매칭돼요. 서로 모르는 채로 12장씩, 한 롤을 채워요.',
    sharedLabel: '공동 롤 · 최대 6명',
    sharedTitle: ['친구들과,', '한 롤.'],
    sharedBody: '초대 링크로 친구들을 불러 한 롤을 나눠 찍어요. 24장을 다 채우면 3일 뒤 함께 현상돼요.',
    me: '나', them: '상대', friend: '친구',
    moreTitle: '찍지 않는 날에도',
    cards: [
      { t: '주간 챌린지', d: '매주 새 주제로 한 장. 좋아요를 많이 받으면 포인트를 받아요. 참가비는 없어요.' },
      { t: '리워드 포인트', d: '찍고, 이어 찍고, 챌린지에 내면 쌓여요. 한정 필름과 그레인을 30일 동안 열 수 있어요.' },
      { t: '로그인 없이 둘러보기', d: '전 세계에서 현상된 필름 사진을 가입 전에 먼저 보세요.' },
    ],
    ctaTitle: ['지금,', '첫 롤을 시작하세요.'],
    ctaBtn: 'App Store에서 다운로드',
    ctaNote: '무료 · 앱 내 구입 포함 · iPhone',
  },
  en: {
    heroKicker: 'A FILM CAMERA APP',
    heroTitle: ['Shoot less.', 'Remember more.'],
    heroSub: '24 shots a month. A 3-day wait.',
    scroll: 'Scroll',
    floodLabel: 'PHOTOS IN MY CAMERA ROLL',
    floodQ: ['How many', 'do you', 'remember?'],
    rollTitle: ['One month.', '24 shots.'],
    rollBody: 'Like a roll of film: just 24 frames each month, and no way to add more. So you look once more before you press the shutter.',
    rollLeft: 'LEFT',
    devTitle: ['Then wait', '3 days.'],
    devBody: "Your photo doesn't appear right away. It spends 3 days in the darkroom first. Wondering what you caught is part of film.",
    devWait: 'DEVELOPING', devDone: 'DEVELOPED', day: 'DAY',
    filmTitle: ['Not filtered.', 'Filmed.'],
    filmBody: 'Color, grain, and glow — developed exactly as you saw it in the preview.',
    filmCount: ['26+ films', '20+ grains'],
    randLabel: 'RANDOM ROLL · 1:1',
    randTitle: ['One stranger.', 'One roll.'],
    randBody: 'Get matched 1:1 with someone, somewhere in the world. You never meet — 12 frames each, one roll.',
    sharedLabel: 'SHARED ROLL · UP TO 6',
    sharedTitle: ['Your friends.', 'One roll.'],
    sharedBody: 'Invite friends with a link and shoot one roll between you. Fill all 24 frames and it develops together 3 days later.',
    me: 'YOU', them: 'THEM', friend: 'FRIEND',
    moreTitle: 'A reason to open it on days you don’t shoot',
    cards: [
      { t: 'Weekly Challenge', d: 'One photo on a new theme each week. Earn points for the most likes. Free to enter.' },
      { t: 'Reward points', d: 'Earn them by shooting, keeping streaks, and joining challenges. Unlock limited films and grains for 30 days.' },
      { t: 'Browse without signing up', d: 'See developed film photos from around the world before you create an account.' },
    ],
    ctaTitle: ['Start your', 'first roll today.'],
    ctaBtn: 'Download on the App Store',
    ctaNote: 'Free · In-app purchases · iPhone',
  },
} as const;

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (v: number) => 1 - (1 - clamp01(v)) ** 3;

/** 높은 컨테이너 안에서 화면에 붙어 있는 무대. children 에 진행도(0→1)를 넘긴다. */
function Pin({ vh, className, children }: {
  vh: number; className?: string; children: (p: MotionValue<number>) => React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return (
    <section ref={ref} className={`st-pin ${className ?? ''}`} style={{ height: `${vh}vh` }}>
      <div className="st-stage">{children(scrollYProgress)}</div>
    </section>
  );
}

/** 진행도가 구간을 넘을 때만 리렌더하도록 정수 단계로 바꾼다. */
function useStep(p: MotionValue<number>, toStep: (v: number) => number) {
  const [step, setStep] = useState(0);
  useMotionValueEvent(p, 'change', v => {
    const next = toStep(v);
    setStep(prev => (prev === next ? prev : next));
  });
  return step;
}

function Lines({ lines, className }: { lines: readonly string[]; className?: string }) {
  return (
    <h2 className={`st-h2 ${className ?? ''}`}>
      {lines.map((l, i) => <span key={i} className={i === lines.length - 1 ? 'st-accent' : undefined}>{l}</span>)}
    </h2>
  );
}

// ── 0. 히어로 ───────────────────────────────────────────────────────────────
function Hero({ c }: { c: (typeof COPY)[keyof typeof COPY] }) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 480], [1, 0]);
  const scale = useTransform(scrollY, [0, 480], [1, 0.9]);
  return (
    <section className="st-hero">
      <motion.div className="st-hero-inner" style={{ opacity, scale }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${IMG}/logo.png`} alt="24STILLS" width={168} height={168} className="st-hero-logo" />
        <p className="st-kicker">{c.heroKicker}</p>
        <h1 className="st-h1">
          <span>{c.heroTitle[0]}</span>
          <span className="st-accent">{c.heroTitle[1]}</span>
        </h1>
        <p className="st-hero-sub">{c.heroSub}</p>
      </motion.div>
      <motion.div className="st-scrollcue" style={{ opacity }} aria-hidden="true">
        <span>{c.scroll}</span>
        <i />
      </motion.div>
    </section>
  );
}

// ── 1. 카메라롤 홍수 ────────────────────────────────────────────────────────
function Flood({ p, c }: { p: MotionValue<number>; c: (typeof COPY)[keyof typeof COPY] }) {
  const numRef = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(p, 'change', v => {
    if (numRef.current) numRef.current.textContent = Math.round(easeOut(v / 0.62) * 12483).toLocaleString('en-US');
  });
  const gridY = useTransform(p, [0, 1], ['0%', '-42%']);
  const gridBlur = useTransform(p, [0.6, 0.78], [0, 10]);
  const gridFilter = useMotionTemplate`blur(${gridBlur}px)`;
  const numOpacity = useTransform(p, [0, 0.06, 0.64, 0.74], [0, 1, 1, 0]);
  const qOpacity = useTransform(p, [0.72, 0.82], [0, 1]);
  const qScale = useTransform(p, [0.72, 0.84], [1.12, 1]);
  const tiles = [...ROLL, ...ROLL, ...ROLL, ...ROLL, ...ROLL];   // 끝까지 내려도 화면 아래가 비지 않을 만큼
  return (
    <>
      <motion.div className="st-flood-grid" style={{ y: gridY, filter: gridFilter }} aria-hidden="true">
        {tiles.map((id, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={i} src={`${IMG}/t${id}.jpg`} alt="" loading="lazy" decoding="async" />
        ))}
      </motion.div>
      <div className="st-flood-shade" aria-hidden="true" />
      <motion.div className="st-flood-num" style={{ opacity: numOpacity }}>
        <span ref={numRef} className="st-bignum">0</span>
        <span className="st-mono">{c.floodLabel}</span>
      </motion.div>
      <motion.div className="st-flood-q" style={{ opacity: qOpacity, scale: qScale }}>
        <Lines lines={c.floodQ} className="st-h2-xl" />
      </motion.div>
    </>
  );
}

// ── 2. 한 달 24장 ───────────────────────────────────────────────────────────
function Roll({ p, c }: { p: MotionValue<number>; c: (typeof COPY)[keyof typeof COPY] }) {
  const shot = useStep(p, v => Math.min(24, Math.floor(clamp01((v - 0.08) / 0.8) * 24.999)));
  return (
    <div className="st-split">
      <div className="st-copy">
        <Lines lines={c.rollTitle} />
        <p className="st-body-text">{c.rollBody}</p>
        <p className="st-mono st-counter">
          {c.rollLeft} <b>{String(24 - shot).padStart(2, '0')}</b>/24
        </p>
      </div>
      <div className="st-roll-grid" aria-hidden="true">
        {ROLL.map((id, i) => (
          <div key={id} className={`st-cell ${i < shot ? 'is-on' : ''}`}>
            <span>{i + 1}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/t${id}.jpg`} alt="" loading="lazy" decoding="async" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 3. 3일 현상 ─────────────────────────────────────────────────────────────
function Develop({ p, c }: { p: MotionValue<number>; c: (typeof COPY)[keyof typeof COPY] }) {
  // 0 = 암실, 1 = 현상 완료. 스크롤과 같은 속도로 천천히 드러나게 직선에 가깝게 둔다.
  const k = useTransform(p, v => clamp01((v - 0.12) / 0.68) ** 1.4);
  const gray = useTransform(k, [0, 1], [1, 0]);
  const blur = useTransform(k, [0, 1], [14, 0]);
  const bright = useTransform(k, [0, 1], [0.55, 1]);
  const filter = useMotionTemplate`grayscale(${gray}) blur(${blur}px) brightness(${bright})`;
  const red = useTransform(k, [0, 1], [0.92, 0]);
  const bar = useTransform(p, v => `${clamp01((v - 0.12) / 0.68) * 100}%`);
  const day = useStep(p, v => { const t = clamp01((v - 0.12) / 0.68); return t >= 1 ? 4 : Math.min(3, Math.floor(t * 3) + 1); });
  return (
    <div className="st-split st-split-rev">
      <div className="st-frame">
        <motion.img src={`${IMG}/p164.jpg`} alt="" loading="lazy" decoding="async" style={{ filter }} />
        <motion.div className="st-safelight" style={{ opacity: red }} aria-hidden="true" />
        <div className="st-frame-hud">
          <span className="st-mono">{day >= 4 ? c.devDone : `${c.devWait} · ${c.day} ${day}/3`}</span>
          <div className="st-bar"><motion.i style={{ width: bar }} className={day >= 4 ? 'is-done' : ''} /></div>
        </div>
      </div>
      <div className="st-copy">
        <Lines lines={c.devTitle} />
        <p className="st-body-text">{c.devBody}</p>
      </div>
    </div>
  );
}

// ── 4. 필름 ─────────────────────────────────────────────────────────────────
function Films({ p, c }: { p: MotionValue<number>; c: (typeof COPY)[keyof typeof COPY] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) setMaxX(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);
  const x = useTransform(p, v => -clamp01((v - 0.06) / 0.86) * maxX);
  return (
    <div className="st-films">
      <div className="st-films-head">
        <Lines lines={c.filmTitle} />
        <p className="st-body-text">{c.filmBody}</p>
      </div>
      <motion.div ref={trackRef} className="st-track" style={{ x }}>
        {FILMS.map(f => (
          <figure key={f.id} className="st-film">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/p${f.id}.jpg`} alt={f.name} loading="lazy" decoding="async" />
            <figcaption className="st-mono">{f.name.toUpperCase()}</figcaption>
          </figure>
        ))}
        <div className="st-film st-film-end">
          <span>{c.filmCount[0]}</span>
          <span className="st-accent">{c.filmCount[1]}</span>
        </div>
      </motion.div>
    </div>
  );
}

// ── 5. 함께 채우는 롤 ───────────────────────────────────────────────────────
function Together({ p, c }: { p: MotionValue<number>; c: (typeof COPY)[keyof typeof COPY] }) {
  // 한 무대에서 두 장면: 앞 절반은 랜덤 롤(1:1, 두 사람), 뒤 절반은 공동 롤(친구 여럿).
  const shared = useStep(p, v => (v >= 0.5 ? 1 : 0)) === 1;
  const n = useStep(p, v => {
    const t = v < 0.5 ? (v - 0.05) / 0.36 : (v - 0.56) / 0.36;
    return Math.min(24, Math.floor(clamp01(t) * 24.999));
  });
  const people = shared ? 4 : 2;
  const counts = Array.from({ length: people }, (_, k) => Math.floor((n + people - 1 - k) / people));
  const names = shared ? [1, 2, 3, 4].map(i => `${c.friend} ${i}`) : [c.me, c.them];
  return (
    <div className="st-split">
      <div className="st-copy" key={shared ? 'shared' : 'random'}>
        <p className="st-mono st-tog-label">{shared ? c.sharedLabel : c.randLabel}</p>
        <Lines lines={shared ? c.sharedTitle : c.randTitle} />
        <p className="st-body-text">{shared ? c.sharedBody : c.randBody}</p>
        <p className="st-mono st-counter st-tally">
          {counts.map((cnt, k) => (
            <span key={k} className="st-tally-item">
              <i className={`st-dot st-c${k}`} /> {names[k]} <b>{String(cnt).padStart(2, '0')}</b>
            </span>
          ))}
          {n >= 24 && <span className="st-accent">{shared ? '6 + 6 + 6 + 6 = 24' : '12 + 12 = 24'}</span>}
        </p>
      </div>
      <div className="st-roll-grid" aria-hidden="true" key={shared ? 'g-shared' : 'g-random'}>
        {ROLL.map((id, i) => (
          <div key={id} className={`st-cell ${i < n ? 'is-on' : ''}`}>
            <span>{i + 1}</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${IMG}/t${ROLL[(i * (shared ? 5 : 7) + (shared ? 3 : 0)) % 24]}.jpg`} alt="" loading="lazy" decoding="async" />
            <em className={`st-c${i % people}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Landing() {
  const { lang } = useLang();
  const c = COPY[lang];
  return (
    <main className="st-landing">
      <Hero c={c} />
      <Pin vh={300} className="st-flood">{p => <Flood p={p} c={c} />}</Pin>
      <Pin vh={300}>{p => <Roll p={p} c={c} />}</Pin>
      <Pin vh={300} className="st-dark">{p => <Develop p={p} c={c} />}</Pin>
      <Pin vh={340} className="st-bleed">{p => <Films p={p} c={c} />}</Pin>
      <Pin vh={460}>{p => <Together p={p} c={c} />}</Pin>

      <section className="st-more">
        <motion.h2
          className="st-h2 st-h2-sm"
          initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15% 0px' }} transition={{ duration: 0.6 }}
        >
          {c.moreTitle}
        </motion.h2>
        <div className="st-cards">
          {c.cards.map((card, i) => (
            <motion.article
              key={card.t} className="st-card"
              initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <span className="st-mono">0{i + 1}</span>
              <h3>{card.t}</h3>
              <p>{card.d}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="st-cta">
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-20% 0px' }} transition={{ duration: 0.7 }}
        >
          <Lines lines={c.ctaTitle} className="st-h2-xl" />
          <a href={APP_STORE_URL} className="st-btn">{c.ctaBtn}</a>
          <p className="st-cta-note">{c.ctaNote}</p>
        </motion.div>
      </section>
    </main>
  );
}
