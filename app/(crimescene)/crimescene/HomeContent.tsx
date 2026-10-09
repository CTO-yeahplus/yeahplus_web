'use client';

/* 전설의 조선 사건부 랜딩 — 원본: GAME/APLUS/crimescene/site-react/src/pages/Home.jsx.
   바뀐 것: framer-motion 가져오기, 타입, 클래스는 c('이름')(cs- 프리픽스), 위아래 줄은 layout 의 SiteShell 이 그린다.
   ⚠️ 이 파일은 tools/port 스크립트 없이 손으로 맞춘 사본이다 — 원본을 고치면 여기도 같이 고친다. */

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValue, useMotionValueEvent, useAnimationFrame, type MotionValue } from 'framer-motion';
import Link from 'next/link';
import { BASE, L, LB, MIN_IOS, NAME, type Pair, appStoreUrl, img, useDocTitle, useLang } from './i18n';
import { c } from './cx';

// ─────────────────────────────────────────────────────────────
// 랜딩 — 휠을 굴리면 이야기가 한 장씩 넘어간다.
// 눈 온 새벽의 성문(열다섯 해 전) → 성문 안으로 → 사건부가 펴진다 → 등불로 현장을 비춘다 → 사람들 → 의논(직접 고른다)
// → 해가 진다(기한) → 여덟 화 → 아버지의 글(먹이 번지듯 드러난다) → 받기.
// 장면마다 화면에 붙어 있는 구간(.pin, sticky)이 있고, 그 구간의 스크롤 진행도(0~1)가 그림과 글을 움직인다. 마우스는 등불과 책의 기울기를 움직인다.
// ─────────────────────────────────────────────────────────────

/** 한 장면: 높이(vh)만큼 스크롤되는 동안 안쪽(.pin)이 화면에 붙어 있다. p = 그 사이의 진행도 0~1 */
type MV = MotionValue<number>;
function useScene() {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  return [ref, p] as const;
}
// 진행도 구간 → 값. 구간이 0~1 을 다 덮지 않으면 양 끝을 채운다
// (motion 은 스크롤 진행도에서 나온 opacity·transform 을 브라우저의 스크롤 타임라인으로 돌린다. 양 끝 키프레임이 없으면 구간 밖에서 값이 흘러내린다 — noti/site-react 에서 겪은 문제)
function R<V extends number | string>(p: MV, i: number[], o: V[]): MotionValue<V> {
  const a = i[0] > 0, z = i[i.length - 1] < 1;
  return useTransform(p, [...(a ? [0] : []), ...i, ...(z ? [1] : [])], [...(a ? [o[0]] : []), ...o, ...(z ? [o[o.length - 1]] : [])]);
}
const rise = (p: MV, a: number, b = a + 0.07) => ({ opacity: R(p, [a, b], [0, 1]), y: R(p, [a, b], [30, 0]) });
const pass = (p: MV, a: number, b: number, c2: number, d: number) => ({ opacity: R(p, [a, b, c2, d], [0, 1, 1, 0]), y: R(p, [a, b, c2, d], [30, 0, 0, -30]) });
// 마우스 자리를 그 상자의 CSS 변수(--mx, --my: 0~100%)로 적는다 — 등불 · 책의 기울기가 이것을 읽는다
// (--nx, --ny 는 같은 자리를 -1~1 로 적은 것 — 각도 계산에 쓴다)
const track = (ref: React.RefObject<HTMLDivElement | null>) => (e: React.MouseEvent) => { const el = ref.current; if (!el) return; const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
  el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%'); el.style.setProperty('--nx', String(x * 2 - 1)); el.style.setProperty('--ny', String(y * 2 - 1)); };

// ── 눈: 성문 장면 위에 내린다. 휠을 빨리 굴리면 옆으로 날린다
function Snow({ wind }: { wind: MV }) {
  const cv = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const cvs = cv.current, g = cvs?.getContext('2d');
    if (!cvs || !g || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let W = 0, H = 0, raf = 0, on = true, last = performance.now();
    const fit = () => { const d = Math.min(2, devicePixelRatio || 1); W = cvs.clientWidth; H = cvs.clientHeight; cvs.width = W * d; cvs.height = H * d; g.setTransform(d, 0, 0, d, 0, 0); };
    const N = 130, F = Array.from({ length: N }, () => ({ x: Math.random(), y: Math.random(), r: 0.6 + Math.random() * 2.2, v: 0.03 + Math.random() * 0.07, s: Math.random() * 6.28 }));
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!on) return;
      const dt = Math.min(50, t - last) / 1000; last = t;
      const w = Math.max(-1.2, Math.min(1.2, wind.get() / 2200));
      g.clearRect(0, 0, W, H);
      for (const f of F) {
        f.y += f.v * dt * (1 + Math.abs(w) * 2); f.x += (Math.sin(t / 1400 + f.s) * 0.012 + 0.02 - w * 0.25) * dt;
        if (f.y > 1.03) { f.y = -0.03; f.x = Math.random(); }
        if (f.x > 1.03) f.x = -0.03; else if (f.x < -0.03) f.x = 1.03;
        g.globalAlpha = 0.35 + f.r / 4.5; g.fillStyle = '#fbf6ea';
        g.beginPath(); g.arc(f.x * W, f.y * H, f.r, 0, 6.28); g.fill();
      }
    };
    const io = new IntersectionObserver(([e]) => { on = e.isIntersecting; });
    fit(); io.observe(cvs); addEventListener('resize', fit); raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); io.disconnect(); removeEventListener('resize', fit); };
  }, [wind]);
  return <canvas className={c('snow')} ref={cv} aria-hidden="true" />;
}

// ── 0. 성문 (열다섯 해 전 → 열다섯 해 뒤). 굴리면 성문 안으로 걸어 들어간다
function Gate() {
  const [ref, p] = useScene();
  const s = useSpring(p, { stiffness: 120, damping: 30 });
  const { scrollY } = useScroll();
  const wind = useSpring(useVelocity(scrollY), { stiffness: 200, damping: 40 });
  return (
    <section ref={ref} className={c('scene gate')} style={{ height: '300vh' }}>
      <div className={c('pin')}>
        <motion.img className={c('bg')} src={img('gate.webp')} alt="" style={{ scale: R(s, [0, 0.62, 1], [1.04, 1.7, 4.6]), opacity: R(s, [0, 0.82, 0.97], [1, 1, 0]), transformOrigin: '49% 57%' }} />
        <Snow wind={wind} />
        <div className={c('mist')} />
        <motion.div className={c('title')} style={{ opacity: R(s, [0, 0.16], [1, 0]), y: R(s, [0, 0.18], [0, -70]) }}>
          <p className={c('kicker')}><i /><L ko="증거로 푸는 조선 수사 이야기" en="A JOSEON-ERA DETECTIVE STORY" /></p>
          <h1><L ko={<>전설의 <br className={c('m')} />조선 사건부</>} en={<>Legendary <br className={c('m')} />Joseon Casebook</>} /></h1>
          <LB as="p" className={c('lead')} ko={<>아버지가 남긴 사건부.<br />풀지 못한 사건은 이제 내가 푼다.</>} en={<>Your father left a casebook of unsolved cases.<br />Now they are yours.</>} />
        </motion.div>
        <motion.p className={c('hint')} style={{ opacity: R(s, [0, 0.06], [1, 0]) }}><i /><L ko="휠을 굴리면 성문으로 들어선다" en="Scroll to walk through the gate" /></motion.p>
        <motion.div className={c('says')} style={pass(s, 0.2, 0.28, 0.4, 0.47)}>
          <small><L ko="열다섯 해 전 · 섣달 · 동틀 녘 · 숭례문 밖" en="FIFTEEN YEARS AGO · WINTER DAWN · OUTSIDE THE SOUTH GATE" /></small>
          <p><L ko="귀양 가는 아버지가 열 살 난 아이에게 책 한 권을 안긴다." en="A father on his way to exile presses a book into his ten-year-old son’s arms." /></p>
        </motion.div>
        <motion.blockquote className={c('father')} style={pass(s, 0.46, 0.54, 0.68, 0.75)}>
          <LB as="p" ko={<>“첫 장만 읽어라.<br />뒷장은 네 눈으로 주검 앞에 서 본 뒤에 펴거라.”</>} en={<>“Read only the first page.<br />Open the rest after you have stood before the dead with your own eyes.”</>} />
          <LB as="p" className={c('cut')} ko="“본 대로 적어라. 그리고 무원아…”" en="“Write what you see. And Mu-won…”" />
        </motion.blockquote>
        <motion.div className={c('later')} style={{ opacity: R(s, [0.78, 0.86, 0.95, 1], [0, 1, 1, 0]), scale: R(s, [0.78, 1], [0.94, 1.08]) }}>
          <b><L ko="열다섯 해 뒤" en="Fifteen years later" /></b>
          <span><L ko="책 한 권을 품에 넣은 젊은이가 그 문으로 들어선다" en="A young man walks in through that gate, the book inside his coat" /></span>
        </motion.div>
      </div>
    </section>
  );
}

// ── 1. 사건부가 펴진다. 표지와 속장 두 장이 차례로 오른쪽으로 넘어가고 첫 장이 드러난다 (옛 책은 오른쪽을 묶는다). 마우스를 따라 책이 기운다
// 한 장(Leaf)은 세로 띠 SEG 개를 책등(오른쪽)에서부터 사슬처럼 이은 것이다 — 통짜 판을 돌리면 얇은 플라스틱처럼 보인다.
//   · 책등 쪽 띠가 land 도까지 돌고, 바깥 띠일수록 조금씩 앞서 돈다(curl) → 왼쪽 끝이 먼저 들리며 휘어 넘어간다 (게임 홈의 책장과 같은 방식)
//   · 띠마다 앞면(그림)과 뒷면(종이)이 있고, 넘어가는 동안 그늘이 진다. 맨 바깥 띠에는 종이의 두께(옆면)가 붙는다
//   · 넘어간 장은 책등 오른쪽에 조금씩 뜬 채로 쌓인다 (land 가 장마다 다르다) → 두꺼운 책으로 보인다
const SEG = 10;
function Leaf({ p, from, to, front, back = 'book_page.webp', land = 176, curl = 40, z = 1, edge = 3 }: { p: MV; from: number; to: number; front: string; back?: string; land?: number; curl?: number; z?: number; edge?: number }) {
  const t = R(p, [from, to], [0, 1]);
  const e = useTransform(t, (v) => v * v * (3 - 2 * v));
  const spine = useTransform(e, (v) => v * land);
  // 휨: 앞 절반은 바깥 끝이 손에 끌려 앞서고, 내려앉을 때는 공기에 밀려 조금 처진다 (빳빳한 종이라 크게 휘지는 않는다)
  const bend = useTransform(e, (v) => (curl / (SEG - 1)) * (0.62 * Math.sin(Math.PI * v) + 0.5 * Math.sin(2 * Math.PI * v)));
  const shadeF = useTransform(e, (v) => Math.min(0.5, v * 1.3));          // 앞면: 들릴수록 어두워진다
  const shadeB = useTransform(e, (v) => Math.max(0, 0.46 * (1 - v) - 0.02)); // 뒷면: 내려앉을수록 밝아진다
  const face = (name: string, i: number, flip?: boolean): React.CSSProperties => ({ backgroundImage: `url(${img(name)})`, backgroundSize: `${SEG * 100}% 100%`, backgroundPosition: `${((flip ? i : SEG - 1 - i) / (SEG - 1)) * 100}% 0` });
  const seg = (i: number): React.ReactElement => (
    <motion.div className={c('seg')} style={{ rotateY: i === 0 ? spine : bend }}>
      <div className={c('f')} style={face(front, i)}><motion.i style={{ opacity: shadeF }} /></div>
      <div className={c('b')} style={face(back, i, true)}><motion.i style={{ opacity: shadeB }} /></div>
      {i < SEG - 1 ? seg(i + 1) : <i className={c('edge')} style={{ width: edge }} />}
    </motion.div>
  );
  const rest = useTransform(t, (v) => (v <= 0.001 ? 1 : 0));   // 덮여 있는 동안은 통짜 그림을 얹어 띠의 이음매를 가린다
  return <div className={c('turner')} style={{ transform: `translateZ(${z}px)` }}>{seg(0)}<motion.img className={c('flat')} src={img(front)} alt="" style={{ opacity: rest }} /></div>;
}
function Book() {
  const [ref, p] = useScene();
  const pin = useRef<HTMLDivElement | null>(null);
  const open = R(p, [0.16, 0.64], [0, 1]);
  useMotionValueEvent(open, 'change', (v) => pin.current && pin.current.style.setProperty('--open', String(v)));   // 책이 펴지는 만큼 왼쪽으로 물러나 펼친 면이 다 보인다
  return (
    <section ref={ref} className={c('scene bookscene')} style={{ height: '340vh' }}>
      <div className={c('pin paper')} ref={pin} onMouseMove={track(pin)}>
        <motion.div className={c('book')} style={{ scale: R(p, [0, 0.16], [0.78, 1]), opacity: R(p, [0, 0.08], [0, 1]) }}>
          <div className={c('tilt')}>
            <div className={c('block')} />
            <div className={c('leaf first')} style={{ backgroundImage: `url(${img('book_page.webp')})` }}>
              <motion.h2 style={{ opacity: R(p, [0.56, 0.68], [0, 1]) }}><L ko="원통한 이가 없게 하라" en="Let no one be wronged" /></motion.h2>
              <motion.i className={c('seal')} style={{ opacity: R(p, [0.68, 0.74], [0, 1]), scale: R(p, [0.68, 0.76], [1.8, 1]) }}>無冤</motion.i>
              <motion.p style={{ opacity: R(p, [0.74, 0.82], [0, 1]) }}><L ko="없을 무, 원통할 원. 그 아이의 이름이다." en="Mu-won: “let no one be wronged.” It is the boy’s name." /></motion.p>
              <motion.div className={c('cast')} style={{ opacity: R(p, [0.16, 0.4, 0.66], [0, 0.6, 0]) }} />
            </div>
            <Leaf p={p} from={0.36} to={0.66} front="book_page.webp" land={170} curl={62} z={1} edge={3} />
            <Leaf p={p} from={0.27} to={0.58} front="book_page.webp" land={174} curl={58} z={2} edge={3} />
            <Leaf p={p} from={0.16} to={0.5} front="book_cover.webp" land={178} curl={46} z={3} edge={7} />
          </div>
        </motion.div>
        <div className={c('side')}>
          <motion.p className={c('big')} style={pass(p, 0.04, 0.12, 0.3, 0.38)}><L ko="아버지가 끝내 풀지 못한 일들을 적어 둔 책." en="The book where your father wrote down what he could not solve." /></motion.p>
          <motion.p className={c('big')} style={pass(p, 0.42, 0.5, 0.72, 0.8)}><L ko="사건 하나를 닫을 때마다 한 줄을 보탠다." en="Each case you close adds one line." /></motion.p>
          <motion.p className={c('big red')} style={rise(p, 0.84, 0.92)}><L ko="잘못 가둔 사람의 이름도, 이 책에 남는다." en="So does the name of anyone you jail by mistake." /></motion.p>
        </div>
      </div>
    </section>
  );
}

// ── 2. 현장. 어두운 현장을 등불(마우스)로 비춘다. 굴릴수록 빛이 넓어지고 증거 표식이 드러난다
function Scene() {
  const [ref, p] = useScene();
  const pin = useRef<HTMLDivElement | null>(null), n = useRef<HTMLElement | null>(null);
  const r = R(p, [0.1, 0.5, 0.8], [13, 30, 135]);   // 한동안은 등불만큼만 보이다가, 끝에서 한꺼번에 밝아진다
  const found = R(p, [0.16, 0.74], [0, 8]);
  useMotionValueEvent(r, 'change', (v) => pin.current && pin.current.style.setProperty('--r', v + 'vmax'));
  useMotionValueEvent(found, 'change', (v) => { if (n.current) n.current.textContent = String(Math.round(v)); });
  return (
    <section ref={ref} className={c('scene site')} style={{ height: '320vh' }}>
      <div className={c('pin dark')} ref={pin} onMouseMove={track(pin)} style={{ '--r': '13vmax', '--mx': '56%', '--my': '46%' } as React.CSSProperties}>
        <img className={c('bg plain')} src={img('scene_a.webp')} alt="" />
        <img className={c('bg lit')} src={img('scene_b.webp')} alt="" />
        <div className={c('glow')} />
        <div className={c('shade')} />
        <div className={c('lines top')}>
          <motion.p className={c('when')} style={rise(p, 0.03)}><L ko="유월 초닷새 · 남촌 · 목멱산 아래 민가" en="THE FIFTH OF THE SIXTH MONTH · A HOUSE BELOW MOUNT MONGMYEOK" /></motion.p>
          <motion.p className={c('big')} style={pass(p, 0.08, 0.15, 0.36, 0.44)}><L ko="책에는 냄새가 적혀 있지 않았다." en="The books never mentioned the smell." /></motion.p>
          <motion.p className={c('big')} style={pass(p, 0.44, 0.52, 0.7, 0.78)}><L ko="등불을 움직여 살피자. 아는 대로, 차례대로." en="Move the lantern and look. In order, as you were taught." /></motion.p>
          <motion.p className={c('big')} style={rise(p, 0.82, 0.9)}><L ko="무엇이 없어졌는가가 아니라, 무엇이 그대로인가." en="Not what is missing — what was left untouched." /></motion.p>
        </div>
        <motion.div className={c('count')} style={rise(p, 0.12)}><L ko="증거" en="EVIDENCE" /> <b ref={n}>0</b> / 8</motion.div>
      </div>
    </section>
  );
}

// ── 3. 사람들 (가로로 흐른다)
const PEOPLE: [string, Pair, Pair, Pair, Pair][] = [
  ['mu', { ko: '한무원', en: 'Han Mu-won' }, { ko: '검률 · 나', en: 'Legal officer · you' }, { ko: '글로는 다 아오.', en: 'I know it all — on paper.' }, { ko: '책으로만 검험을 배웠다. 죽은 사람은 한 번도 본 적이 없다.', en: 'He learned inquests from books. He has never seen the dead.' }],
  ['yeon', { ko: '연이', en: 'Yeon-i' }, { ko: '포도청 다모', en: 'Constable of the bureau' }, { ko: '먼저 “놀라셨지요” 하세요. 그 한마디면 사람들은 묻지 않은 것까지 말해 줘요.', en: 'Start with “That must have been a shock.” After that, people tell you things you never asked.' }, { ko: '사라진 사람 일이면 눈빛이 달라진다. 까닭은 아무도 모른다.', en: 'Her eyes change when someone goes missing. No one knows why.' }],
  ['gwak', { ko: '곽 노인', en: 'Old Gwak' }, { ko: '오작인 · 서른 해', en: 'Coroner’s man · thirty years' }, { ko: '토하는 사람은 믿을 만합니다. 아무렇지 않은 사람이 무서운 겁니다.', en: 'A man who throws up can be trusted. It’s the ones who feel nothing you should fear.' }, { ko: '아버지 곁에서 일하던 사람. 그 얘기는 차차 하자고 한다.', en: 'He worked beside your father. “We’ll get to that,” he says.' }],
  ['kang', { ko: '강 종사관', en: 'Officer Kang' }, { ko: '포도청 종사관', en: 'Senior officer' }, { ko: '닫는 것도 사람을 살리는 일이야.', en: 'Closing a case saves lives too.' }, { ko: '허리춤에 서고의 열쇠가 있다. “여기서 버텨 보게. 버티면 주지.”', en: 'The archive key hangs at his waist. “Last here, and it’s yours.”' }],
];
function People() {
  const [ref, p] = useScene();
  const t = R(p, [0.1, 0.92], [0, 1]);
  const transform = useTransform(t, (v) => `translateX(calc(${-v * 100}% + ${v * 100}vw - ${v * 8}vw))`);
  return (
    <section ref={ref} className={c('scene people')} style={{ height: '360vh' }}>
      <div className={c('pin paper')}>
        <motion.p className={c('head')} style={rise(p, 0.02)}><L ko="혼자 푸는 이야기가 아니다" en="You do not solve it alone" /></motion.p>
        <motion.div className={c('track')} style={{ transform }}>
          {PEOPLE.map(([id, name, role, say, note]) => (
            <article key={id} className={c('person')}>
              <img src={img(id + '.webp')} alt="" loading="lazy" />
              <div>
                <h3><L ko={name.ko} en={name.en} /></h3>
                <small><L ko={role.ko} en={role.en} /></small>
                <blockquote><L ko={'“' + say.ko + '”'} en={'“' + say.en + '”'} /></blockquote>
                <p><L ko={note.ko} en={note.en} /></p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── 4. 의논. 세 사람의 생각 가운데 직접 고른다
// 게임 1화의 "범인의 나이와 몸집" 문항이다 — 인물화가 있는 세 사람(강 종사관 · 곽 노인 · 연이)이 저마다 다른 생각을 내는 문항을 골랐다. 맞는 생각은 곽 노인(RIGHT)
const VOICES: [string, Pair, Pair, Pair][] = [
  ['kang', { ko: '강 종사관', en: 'Officer Kang' }, { ko: '쉰을 넘긴 사내', en: 'A man past fifty' }, { ko: '담장으로 언성 높인 이웃 정 노인이 쉰여덟일세. 앙심은 나이 먹은 자가 오래 품는 법이지.', en: 'Old Jeong next door quarrelled over the wall, and he’s fifty-eight. It’s the old who nurse a grudge.' }],
  ['gwak', { ko: '곽 노인', en: 'Old Gwak' }, { ko: '스물에서 서른 사이의 날랜 장정', en: 'A nimble man in his twenties' }, { ko: '짚신 자국이 크고 보폭이 넓습니다. 넉 자 들창을 소리 없이 넘었고요. 한창때의 장정입니다.', en: 'The sandal prints are large and the stride is long. He cleared a chest-high window without a sound. A man in his prime.' }],
  ['yeon', { ko: '연이', en: 'Yeon-i' }, { ko: '열대여섯 살의 마른 소년', en: 'A thin boy of fifteen or so' }, { ko: '들창이 좁아요. 저만한 구멍은 몸집 작은 아이나 소리 없이 드나들어요.', en: 'That window is narrow. Only someone small gets through a gap like that quietly.' }],
];
const RIGHT = 1;
function Council() {
  const [ref, p] = useScene();
  const [pick, setPick] = useState(-1);
  return (
    <section ref={ref} className={c('scene council')} style={{ height: '280vh' }}>
      <div className={c('pin paper')}>
        <div className={c('panel')}>
          <motion.small className={c('kicker2')} style={rise(p, 0.03)}><L ko="범인의 모습 · 의논" en="THE OFFENDER · COUNSEL" /></motion.small>
          <motion.h2 style={rise(p, 0.08)}><L ko="범인의 나이와 몸집은?" en="How old is he, and how is he built?" /></motion.h2>
          <motion.p className={c('bet')} style={rise(p, 0.14)}><L ko="연이: “틀린 말 한 사람이 엿 한 가락이에요.”" en="Yeon-i: “Whoever’s wrong owes a stick of taffy.”" /></motion.p>
          <div className={c('opts')}>
            {VOICES.map(([id, who, opt, say], k) => (
              <motion.button key={k} style={rise(p, 0.2 + k * 0.1, 0.3 + k * 0.1)} disabled={pick >= 0} onClick={() => setPick(k)}
                className={c('voice' + (pick >= 0 ? (k === RIGHT ? ' right' : k === pick ? ' wrong' : ' dim') : ''))}>
                <span className={c('mini')}><img src={img(id + '.webp')} alt="" /></span>
                <span><b><L ko={who.ko} en={who.en} /></b><em><L ko={opt.ko} en={opt.en} /></em><q><L ko={say.ko} en={say.en} /></q></span>
              </motion.button>
            ))}
          </div>
          <div className={c('verdict' + (pick >= 0 ? ' on' : ''))} aria-live="polite">
            {pick === RIGHT
              ? <LB as="p" ko={<><b>정확한 판단.</b> 큰 짚신 자국과 넓은 보폭, 넉 자 들창을 소리 없이 넘는 몸놀림. 곽 노인은 본 것만 말했다.</>} en={<><b>Correct.</b> Large prints, a long stride, and a chest-high window cleared in silence. Gwak only said what he saw.</>} />
              : pick >= 0
                ? <LB as="p" ko={<><b>다시 보자.</b> 대청에 찍힌 짚신 자국은 크고 보폭이 넓다. 엿 한 가락은 당신 몫이다.</>} en={<><b>Look again.</b> The prints in the hall are large and far apart. The taffy is on you.</>} />
                : <LB as="p" className={c('wait')} ko="곁의 사람들이 저마다 다른 것을 본다. 정하는 것은 나다." en="Each of them sees something different. The decision is yours." />}
            {pick >= 0 && <button className={c('again')} onClick={() => setPick(-1)}><L ko="다시 고르기" en="Choose again" /></button>}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 5. 해가 진다. 화마다 시계가 있다 — 1화는 기한이다
const CLOCK: Pair[] = [{ ko: '해 질 때까지 세 시진', en: 'THREE WATCHES TO SUNSET' }, { ko: '해 질 때까지 두 시진', en: 'TWO WATCHES TO SUNSET' }, { ko: '해 질 때까지 한 시진', en: 'ONE WATCH TO SUNSET' }, { ko: '해가 진다', en: 'THE SUN IS SETTING' }];
function Dusk() {
  const [ref, p] = useScene();
  const [k, setK] = useState(0);
  useMotionValueEvent(p, 'change', (v) => setK(v < 0.3 ? 0 : v < 0.52 ? 1 : v < 0.74 ? 2 : 3));
  return (
    <section ref={ref} className={c('scene dusk')} style={{ height: '300vh' }}>
      <div className={c('pin')}>
        <motion.img className={c('bg')} src={img('office.webp')} alt="" style={{ scale: R(p, [0, 1], [1.12, 1.02]) }} />
        <motion.div className={c('tone')} style={{ opacity: R(p, [0.08, 0.95], [0, 1]) }} />
        <motion.i className={c('sun')} style={{ top: R(p, [0, 1], ['5%', '31%']), left: R(p, [0, 1], ['56%', '90%']), opacity: R(p, [0, 0.1, 0.82, 0.96], [0, 0.9, 0.9, 0]) }} />
        <div className={c('veil')} />
        <div className={c('lines')}>
          <motion.em className={c('clock')} style={rise(p, 0.05)}><L ko={CLOCK[k].ko} en={CLOCK[k].en} /></motion.em>
          <motion.p className={c('big')} style={pass(p, 0.08, 0.16, 0.32, 0.4)}><L ko="“해 질 때까지일세. 그때까지 그자가 아니라는 것을 내게 보이게.”" en="“You have until sunset. Show me by then that it wasn’t him.”" /></motion.p>
          <motion.p className={c('big')} style={pass(p, 0.4, 0.48, 0.62, 0.7)}><L ko="화마다 되돌릴 수 없는 선택이 하나 있다." en="Every episode has one choice you cannot take back." /></motion.p>
          <motion.p className={c('big gold')} style={rise(p, 0.72, 0.82)}><L ko="어느 쪽에도 값이 있다. 여덟 화의 선택이 세 가지 결말로 간다." en="Either way costs something. Eight choices lead to three endings." /></motion.p>
        </div>
      </div>
    </section>
  );
}

// ── 6. 여덟 화 (책장이 가로로 펼쳐진다)
const EPS: [Pair, Pair][] = [
  [{ ko: '오경의 들창', en: 'The Window Before Dawn' }, { ko: '사건이 난 자리로 거처를 짐작한다', en: 'Where the offender lives, from where it happened' }],
  [{ ko: '막배 떠난 나루', en: 'The Ferry Landing After the Last Boat' }, { ko: '물길의 기록을 맞대어 배 한 척을 가린다', en: 'Cross-checking river records to find one boat' }],
  [{ ko: '논둑길의 매듭', en: 'The Knot on the Paddy Path' }, { ko: '수법과 버릇을 갈라 사건을 잇는다', en: 'Telling method from habit to link cases' }],
  [{ ko: '돌아오지 않는 부름', en: 'The Summons No One Came Back From' }, { ko: '멈춘 것인가, 바꾼 것인가', en: 'Did he stop, or only change?' }],
  [{ ko: '약방의 세 번째 초상', en: 'The Third Funeral at the Apothecary' }, { ko: '거듭된 불행에서 이득 본 사람을 본다', en: 'Who gained, each time misfortune struck' }],
  [{ ko: '불탄 사랑채', en: 'The Burnt Study' }, { ko: '사고였다면 있어야 할 것을 적어 본다', en: 'What should be there, if it were an accident' }],
  [{ ko: '둘 중 하나', en: 'One of the Two' }, { ko: '말이 엇갈리면 흔적을 읽는다', en: 'When accounts conflict, read the traces' }],
  [{ ko: '겹매듭의 스승', en: 'The Master of the Double Knot' }, { ko: '열다섯 해 묵은 사건을 다시 읽는다', en: 'Reopening a fifteen-year-old case' }],
];
function Episodes() {
  const [ref, p] = useScene();
  const t = R(p, [0.08, 0.94], [0, 1]);
  const transform = useTransform(t, (v) => `translateX(calc(${-v * 100}% + ${v * 100}vw - ${v * 8}vw))`);
  return (
    <section ref={ref} className={c('scene eps')} style={{ height: '460vh' }}>
      <div className={c('pin paper')}>
        <motion.p className={c('head')} style={rise(p, 0.02)}><L ko="여덟 화 · 여덟 가지 수사법" en="Eight episodes · eight methods" /></motion.p>
        <motion.div className={c('track')} style={{ transform }}>
          {EPS.map(([t2, m], i) => (
            <article key={i} className={c('ep')} style={{ backgroundImage: `url(${img('book_page.webp')})` }}>
              <small className={c('no')}><L ko={`제${i + 1}화`} en={`EPISODE ${i + 1}`} /></small>
              <h3><L ko={t2.ko} en={t2.en} /></h3>
              <img src={img(`J${i + 1}.webp`)} alt="" loading="lazy" />
              <p><L ko={m.ko} en={m.en} /></p>
              <em className={i < 2 ? c('free') : undefined}><L ko={i < 2 ? '무료' : '시즌 1'} en={i < 2 ? 'FREE' : 'SEASON 1'} /></em>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ── 7. 아버지의 글. 굴리는 만큼 먹이 번지듯 글자가 드러난다
function Inked({ text, p, from, to, className }: { text: string; p: MV; from: number; to: number; className?: string }) {
  const el = useRef<HTMLSpanElement | null>(null);
  const q = R(p, [from, to], [0, 1]);
  useEffect(() => { if (el.current) el.current.style.setProperty('--p', String(q.get())); }, [q]);
  useMotionValueEvent(q, 'change', (v) => el.current && el.current.style.setProperty('--p', String(v)));
  const ch = [...text];
  return <span className={c('inked ' + (className || ''))} ref={el} style={{ '--n': ch.length, '--p': 0 } as React.CSSProperties}>{ch.map((ch1, i) => <i key={i} style={{ '--i': i } as React.CSSProperties}>{ch1}</i>)}</span>;
}
const NOTE: Pair = { ko: '첫 검험 날 나는 마당에 나가 토했다. 오작인 곽가가 말없이 물을 떠 왔다. 부끄럽지 않다. 토하지 않는 날이 오면 그때 부끄러워할 것.', en: 'On the day of my first inquest I went out to the yard and was sick. Gwak brought water and said nothing. I am not ashamed. The day I am no longer sick — that is the day to be ashamed.' };
const REPLY: Pair = { ko: '저는 문설주를 잡았습니다. 곽 노인이 지금도 여기 있습니다.', en: 'I held on to the doorpost. Old Gwak is still here.' };
function Note() {
  const [ref, p] = useScene();
  return (
    <section ref={ref} className={c('scene note')} style={{ height: '320vh' }}>
      <div className={c('pin')}>
        <motion.img className={c('bg')} src={img('room.webp')} alt="" style={{ scale: R(p, [0, 1], [1.04, 1.14]), opacity: R(p, [0, 0.1], [0, 0.55]) }} />
        <div className={c('veil')} />
        <div className={c('sheet')} style={{ backgroundImage: `url(${img('book_page.webp')})` }}>
          <motion.small style={rise(p, 0.04)}><L ko="아버지의 글씨 · 둘째 장의 여백" en="YOUR FATHER’S HAND · IN THE MARGIN OF THE SECOND LEAF" /></motion.small>
          <p className={c('hand')}><L ko={<Inked text={NOTE.ko} p={p} from={0.1} to={0.56} />} en={<Inked text={NOTE.en} p={p} from={0.1} to={0.56} />} /></p>
          <motion.small className={c('mine')} style={rise(p, 0.6)}><L ko="그 아래, 무원의 글씨" en="BELOW IT, IN MU-WON’S HAND" /></motion.small>
          <p className={c('hand me')}><L ko={<Inked text={REPLY.ko} p={p} from={0.64} to={0.8} />} en={<Inked text={REPLY.en} p={p} from={0.64} to={0.8} />} /></p>
        </div>
        <motion.p className={c('under')} style={rise(p, 0.84, 0.92)}><L ko="사건 하나를 닫을 때마다, 아버지의 장을 한 장 편다. 대답은 없다. 그래도 혼자 적는 것 같지는 않다." en="Each case you close opens one more of your father’s pages. He does not answer. Still, it no longer feels like writing alone." /></motion.p>
      </div>
    </section>
  );
}

// ── 8. 사건부에 보태는 줄들 — 휠 속도에 따라 빨라지는 띠
const LINES: Pair[] = [
  { ko: '무엇을 하지 않았는지를 보라', en: 'Look at what was not done' }, { ko: '사라진 사람은 기다려 주지 않는다', en: 'The missing do not wait' },
  { ko: '수법은 바뀌어도 버릇은 남는다', en: 'Methods change; habits stay' }, { ko: '멈춘 사건을 믿지 마라', en: 'Do not trust a case that went quiet' },
  { ko: '거듭되는 불행에서 이득 보는 자를 보라', en: 'See who gains from repeated misfortune' }, { ko: '사고였다면 있어야 할 것을 적어 보라', en: 'List what an accident would have left' },
  { ko: '말이 엇갈리면 흔적을 읽으라', en: 'When words conflict, read the traces' }, { ko: '혼자 적지 말라', en: 'Do not write alone' },
];
function Band() {
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { stiffness: 260, damping: 46 });
  const x = useMotionValue(0);
  useAnimationFrame((_, d) => { const s = v.get(); let nx = x.get() - (0.004 + Math.min(0.06, Math.abs(s) / 42000)) * d * (s < -60 ? -1 : 1); if (nx <= -50) nx += 50; if (nx > 0) nx -= 50; x.set(nx); });
  const tx = useTransform(x, (n) => n + '%');
  const skewX = useTransform(v, [-3000, 3000], [9, -9]);
  const row = (key: string) => LINES.map((l, i) => <span key={key + i}><L ko={l.ko} en={l.en} /><i /></span>);
  return (
    <section className={c('band')} aria-hidden="true">
      <motion.div className={c('belt')} style={{ x: tx, skewX }}>{row('a')}{row('b')}</motion.div>
    </section>
  );
}

// ── 9. 받기
function Get() {
  const { lang } = useLang();
  const store = appStoreUrl(lang);
  return (
    <section className={c('get paper')} id="get">
      <div className={c('shots')}>
        {[1, 2, 3].map((n) => <motion.img key={n} src={img(`shot${n}.webp`)} alt="" loading="lazy" initial={{ opacity: 0, y: 60, rotate: (n - 2) * 5 }} whileInView={{ opacity: 1, y: n === 2 ? -18 : 0, rotate: (n - 2) * 5 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: n * 0.12 }} />)}
      </div>
      <div className={c('cta')}>
        <img className={c('icon')} src={img('icon-180.png')} alt="" width="92" height="92" />
        <h2><L ko="전설의 조선 사건부" en="Legendary Joseon Casebook" /></h2>
        <LB as="p" ko="1화와 2화는 무료. 3화부터 8화까지는 시즌 1 — 한 번 구매로 모두 열립니다." en="Episodes 1 and 2 are free. Episodes 3–8 are Season 1 — one purchase unlocks them all." />
        {store
          ? <a className={c('store')} href={store} target="_blank" rel="noreferrer"><L ko="App Store 에서 받기" en="Download on the App Store" /></a>
          : <span className={c('store soon')}><L ko="App Store 출시 준비 중" en="Coming soon to the App Store" /></span>}
        <ul className={c('facts')}>
          <li><L ko={`iPhone · iPad · iOS ${MIN_IOS} 이상`} en={`iPhone · iPad · iOS ${MIN_IOS}+`} /></li>
          <li><L ko="계정 · 광고 · 구독 없음" en="No account, ads or subscription" /></li>
          <li><L ko="인터넷 없이 됩니다" en="Plays offline" /></li>
          <li><L ko="게임의 글은 한국어입니다" en="The game text is in Korean" /></li>
        </ul>
        <p className={c('fine')}><L ko="이야기 속 인물과 사건은 모두 지어낸 것입니다. 범행 장면과 주검은 그리지 않았습니다." en="All people and events are fictional. No crime is shown and no body is depicted." /> <Link href={`${BASE}/support`}><L ko="자주 묻는 질문" en="FAQ" /></Link></p>
      </div>
    </section>
  );
}

// 옆 줄: 얼마나 내려왔는지를 먹 줄과 낙관으로 보인다
function Rail() {
  const { scrollYProgress } = useScroll();
  const s = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return <div className={c('rail')} aria-hidden="true"><motion.i style={{ scaleY: s }} /><motion.b style={{ top: useTransform(s, (v) => v * 100 + '%') }}>解</motion.b></div>;
}

export default function HomeContent() {
  useDocTitle(`${NAME.ko} — 증거로 푸는 조선 수사 이야기`, `${NAME.en} — a detective story you solve by the evidence`);
  return (
    <>
      <Rail />
      <Gate />
      <Book />
      <Scene />
      <People />
      <Council />
      <Dusk />
      <Episodes />
      <Note />
      <Band />
      <Get />
    </>
  );
}
