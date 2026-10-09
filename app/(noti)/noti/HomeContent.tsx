'use client';

/* 노티 랜딩 — 원본: GAME/APLUS/noti/site-react/src/pages/Home.jsx.
   바뀐 것: framer-motion 가져오기, 타입, 언어 전환을 이 사이트의 방식(L(ko, en))으로, 앱 화면(미리보기 영상 · 스크린샷) 장 추가. */

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useVelocity, useMotionValue, useMotionValueEvent, useAnimationFrame, type MotionValue } from 'framer-motion';
import { DEMO_URL, Tb, Tx, useDocTitle, useLang } from './i18n';
import { StoreButtons } from './chrome';

// ─────────────────────────────────────────────────────────────
// 랜딩 — 휠을 굴리면 시간이 흐른다.
// 첫 화면은 새벽 02:58 의 닫힌 문. 굴리면 시계가 여덟 시간을 거꾸로 감겨 18:40 이 되고,
// 거기서부터 그 밤을 다시 걸어 02:58 의 문 앞으로 돌아온다 (앱 1화의 구성과 같다).
// 장면마다 화면에 붙어 있는 구간(sticky)이 있고, 그 구간의 스크롤 진행도가 그림·글·시계를 움직인다.
// ─────────────────────────────────────────────────────────────
const img = (n: string) => `/noti/img/${n}.webp`;
const T = (h: number, m: number) => (h < 12 ? h + 24 : h) * 60 + m;         // 자정을 넘긴 시각은 24를 더해 한 줄로 잇는다
const ClockCtx = createContext<MotionValue<number> | null>(null);
const useClock = () => useContext(ClockCtx) as MotionValue<number>;

/** 한 장면: 높이 h(vh)만큼 스크롤되는 동안 안쪽이 화면에 붙어 있다. from → to 는 그 사이에 흐르는 시각(분) */
function useScene(from: number, to: number) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const mins = useClock();
  useMotionValueEvent(p, 'change', (v) => { if (v > 0.001 && v < 0.999) mins.set(from + (to - from) * v); });
  return [ref, p] as const;
}
// 진행도 구간 → 값. 구간이 0~1 을 다 덮지 않으면 양 끝을 채운다.
// (motion 은 스크롤 진행도에서 바로 나온 opacity·transform 을 브라우저의 스크롤 타임라인으로 돌리는데, 그때 양 끝 키프레임이 없으면 구간 밖에서 값이 원래대로 흘러내린다)
function R<V extends number | string>(p: MotionValue<number>, i: number[], o: V[]): MotionValue<V> {
  const a = i[0] > 0, z = i[i.length - 1] < 1;
  return useTransform(p, [...(a ? [0] : []), ...i, ...(z ? [1] : [])], [...(a ? [o[0]] : []), ...o, ...(z ? [o[o.length - 1]] : [])]);
}
const fade = (p: MotionValue<number>, a: number, b = a + 0.07) => ({ opacity: R(p, [a, b], [0, 1]), y: R(p, [a, b], [28, 0]) });

function Clock() {
  const mins = useClock();
  const ref = useRef<HTMLElement | null>(null);
  const [past, setPast] = useState(false);
  useMotionValueEvent(mins, 'change', (v) => {
    const m = Math.round(v) % 1440;
    if (ref.current) ref.current.textContent = String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');
  });
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => { const night = document.getElementById('night'); if (night) setPast(y > night.offsetTop + night.offsetHeight - window.innerHeight * 0.6); });
  return (
    <div className={'nt-clock' + (past ? ' nt-off' : '')} aria-hidden="true">
      <small><Tx ko="3월 2일 → 3일" en="MAR 2 → 3" /></small><b ref={ref}>02:58</b>
    </div>
  );
}

// ── 0. 문 앞 (02:58 → 여덟 시간 전)
function Hero() {
  const [ref, p] = useScene(T(2, 58), T(18, 40));
  const pin = useRef<HTMLDivElement | null>(null);
  const onMove = (e: React.MouseEvent) => { const el = pin.current; if (!el) return; const r = el.getBoundingClientRect(); el.style.setProperty('--nt-mx', ((e.clientX - r.left) / r.width) * 100 + '%'); el.style.setProperty('--nt-my', ((e.clientY - r.top) / r.height) * 100 + '%'); };
  const s = useSpring(p, { stiffness: 120, damping: 30 });
  return (
    <section ref={ref} className="nt-scene nt-hero" style={{ height: '230vh' }}>
      <div className="nt-pin" ref={pin} onMouseMove={onMove}>
        <motion.img className="nt-bg" src={img('door')} alt="" style={{ scale: R(s, [0, 1], [1.02, 1.5]), opacity: R(s, [0, 0.55, 0.9], [1, 0.75, 0]), filter: R(s, [0.3, 0.9], ['blur(0px)', 'blur(14px)']) }} />
        <div className="nt-light" />
        <motion.div className="nt-title" style={{ opacity: R(s, [0, 0.28], [1, 0]), y: R(s, [0, 0.3], [0, -80]) }}>
          <p className="nt-kicker"><Tx ko="당신이 주인공인 메디컬 드라마" en="A MEDICAL DRAMA YOU PLAY" /></p>
          <h1><Tx ko="노티" en="NOTI" /></h1>
          <p className="nt-sub"><Tx ko="새벽 3시의 인턴" en="The 3 A.M. Intern" /></p>
          <Tb as="p" className="nt-lead" ko={<>닫힌 문 앞에 서 있다.<br />두드리면 사흘 만에 잠든 사람이 깬다.</>} en={<>You are standing at a closed door.<br />Knock, and you wake someone who hasn’t slept in three days.</>} />
        </motion.div>
        <motion.p className="nt-hint" style={{ opacity: R(s, [0, 0.08], [1, 0]) }}><i /><Tx ko="휠을 굴리면 시간이 흐른다" en="Scroll to move the clock" /></motion.p>
        <motion.div className="nt-rewind" style={{ opacity: R(s, [0.34, 0.5, 0.86, 0.98], [0, 1, 1, 0]), scale: R(s, [0.34, 0.98], [0.92, 1.08]) }}>
          <b><Tx ko="여덟 시간 전" en="Eight hours earlier" /></b>
          <span><Tx ko="이 병원에 아는 사람은 한 명도 없었다" en="You knew no one in this hospital" /></span>
        </motion.div>
      </div>
    </section>
  );
}

// ── 1. 응급실 앞 (18:40)
function Arrive() {
  const [ref, p] = useScene(T(18, 40), T(19, 0));
  return (
    <section ref={ref} className="nt-scene nt-arrive" style={{ height: '240vh' }}>
      <div className="nt-pin">
        <motion.img className="nt-bg" src={img('entrance')} alt="" style={{ y: R(p, [0, 1], ['-4%', '4%']), scale: 1.1, opacity: R(p, [0, 0.12, 0.88, 1], [0, 0.85, 0.85, 0]) }} />
        <div className="nt-veil" />
        <div className="nt-lines">
          <motion.p className="nt-when" style={fade(p, 0.06)}><Tx ko="3월 2일 · 연화대학교병원 응급실 앞" en="March 2 · Outside the ER, Yeonhwa University Hospital" /></motion.p>
          <motion.p className="nt-big" style={fade(p, 0.16)}><Tx ko="3월엔 대학병원에 가지 말라는 말이 있다." en="They say: stay out of teaching hospitals in March." /></motion.p>
          <motion.p className="nt-big" style={fade(p, 0.36)}><Tx ko="새 인턴이 들어오는 달이라서다." en="It’s the month the new interns start." /></motion.p>
          <motion.p className="nt-big nt-gold" style={fade(p, 0.56)}><Tx ko="그 말이 가리키는 사람이, 오늘부터 나다." en="As of today, that intern is you." /></motion.p>
          <motion.p className="nt-note" style={fade(p, 0.74)}><Tx ko="바라는 건 하나. 1년 뒤에도 이 문으로 출근하는 것." en="You want one thing: to still be walking through this door a year from now." /></motion.p>
        </div>
      </div>
    </section>
  );
}

// ── 2. 사람들 (가로로 흐른다)
type Pair = { ko: string; en: string };
const PEOPLE: [string, Pair, Pair, Pair][] = [
  ['sunyoung', { ko: '박선영', en: 'Park Sun-young' }, { ko: '응급실 책임간호사', en: 'ER charge nurse' }, { ko: '모르면 물어보세요. 물어보는 인턴은 사고 안 쳐요.', en: 'If you don’t know, ask. Interns who ask don’t cause accidents.' }],
  ['hyunseok', { ko: '오현석', en: 'Oh Hyun-seok' }, { ko: '응급의학과 2년차 · 사흘째 당직', en: 'EM resident · third day on call' }, { ko: '죽을 일 아니면 깨우지 마.', en: 'Unless someone’s dying, don’t wake me.' }],
  ['minjae', { ko: '강민재', en: 'Kang Min-jae' }, { ko: '내과 치프', en: 'Chief resident, internal medicine' }, { ko: '결론. 좋아졌어, 나빠졌어. 그것부터.', en: 'Bottom line. Better or worse. Start there.' }],
  ['gyeongran', { ko: '차경란', en: 'Cha Gyeong-ran' }, { ko: '외과 과장', en: 'Head of surgery' }, { ko: '거기. 더 당겨.', en: 'You there. Pull harder.' }],
  ['jian', { ko: '서지안', en: 'Seo Ji-an' }, { ko: '동기 · 본교 수석', en: 'Fellow intern · top of the class' }, { ko: '알아서 하는 동안 환자는 기다려 주지 않아.', en: 'Patients don’t wait while you figure it out.' }],
  ['doyun', { ko: '한도윤', en: 'Han Do-yun' }, { ko: '동기 · 서른넷 늦깎이', en: 'Fellow intern · started at thirty-four' }, { ko: '내일도 와. 그게 제일 어려운 건데.', en: 'Come back tomorrow. That’s the hard part.' }],
  ['taehee', { ko: '문태희', en: 'Moon Tae-hee' }, { ko: '동기 · 수첩 세 권', en: 'Fellow intern · three notebooks' }, { ko: '우린 다 하나씩 들고 있어.', en: 'We’re all carrying one.' }],
];
function People() {
  const [ref, p] = useScene(T(19, 0), T(21, 30));
  const t = R(p, [0.1, 0.92], [0, 1]);
  const transform = useTransform(t, (v) => `translateX(calc(${-v * 100}% + ${v * 100}vw))`);
  return (
    <section ref={ref} className="nt-scene nt-people" style={{ height: '380vh' }}>
      <div className="nt-pin">
        <motion.h2 style={{ opacity: R(p, [0, 0.06, 0.9, 1], [0, 1, 1, 0]) }}><Tx ko="깨는 사람들, 버티게 하는 사람들" en="The ones who break you, the ones who keep you standing" /></motion.h2>
        <motion.div className="nt-track" style={{ transform }}>
          {PEOPLE.map(([id, name, role, say]) => (
            <article key={id} className="nt-card">
              <img src={img('p_' + id)} alt="" loading="lazy" />
              <Tb as="blockquote" ko={<>“{say.ko}”</>} en={<>“{say.en}”</>} />
              <p className="nt-who"><b><Tx ko={name.ko} en={name.en} /></b><span><Tx ko={role.ko} en={role.en} /></span></p>
            </article>
          ))}
          <article className="nt-card nt-end">
            <Tb as="p" ko={<>악당은 없다.<br />잠 못 잔 보통 사람들이<br />서로에게 가혹하고,<br />그래도 서로를 버티게 한다.</>} en={<>There are no villains.<br />Just ordinary, sleepless people<br />who are hard on each other<br />and still hold each other up.</>} />
          </article>
        </motion.div>
      </div>
    </section>
  );
}

// ── 3. 환자 (21:30 — 직접 묻는다)
const ASK: [Pair, Pair][] = [
  [{ ko: '어떻게 아픈가요?', en: 'What does it feel like?' }, { ko: '쓰려요. 명치가 타는 것처럼. 체했을 때 딱 이래.', en: 'It burns. Right here. Just like indigestion.' }],
  [{ ko: '언제부터요?', en: 'When did it start?' }, { ko: '밥 먹고 나서 슬슬 올라오더니 점점.', en: 'After dinner. It crept up, little by little.' }],
  [{ ko: '드시는 약은요?', en: 'Any medication?' }, { ko: '혈압약 먹어요. 당도 좀 있고. 담배는… 하루 한 갑.', en: 'Blood pressure pills. A bit of diabetes. And… a pack a day.' }],
];
function Patient() {
  const [ref, p] = useScene(T(21, 30), T(23, 35));
  const [n, setN] = useState(0);
  useMotionValueEvent(p, 'change', (v) => { const k = v > 0.78 ? 4 : v > 0.58 ? 3 : v > 0.42 ? 2 : v > 0.26 ? 1 : 0; setN((x) => Math.max(x, k)); });
  return (
    <section ref={ref} className="nt-scene nt-patient" style={{ height: '300vh' }}>
      <div className="nt-pin">
        <motion.img className="nt-bg" src={img('obs')} alt="" style={{ opacity: R(p, [0, 0.1, 0.92, 1], [0, 0.5, 0.5, 0]), scale: R(p, [0, 1], [1.12, 1]) }} />
        <div className="nt-veil" />
        <div className="nt-cols">
          <motion.div className="nt-bed" style={fade(p, 0.05)}>
            <p className="nt-when"><Tx ko="7번 침대 · 정만호 · 58세 · 택시기사" en="Bed 7 · Jung Man-ho · 58 · taxi driver" /></p>
            <img src={img('p_manho')} alt="" />
            <Tb as="blockquote" ko="“소화제나 하나 주면 갈게요.”" en="“Just give me something for my stomach and I’ll go.”" />
            <p className="nt-vit"><span><Tx ko="맥박" en="HR" /> <b>108</b></span><span>SpO₂ <b>96</b></span><span><Tx ko="심전도" en="ECG" /> <b><Tx ko="정상" en="normal" /></b></span></p>
          </motion.div>
          <motion.div className="nt-ask" style={fade(p, 0.16)}>
            <h2><Tx ko="묻고, 보고, 듣고 병을 좁힌다" en="Ask, look, listen — and narrow it down" /></h2>
            {ASK.map(([q, a], i) => (
              <button key={i} className={'nt-q' + (n > i ? ' nt-on' : '')} onClick={() => setN((x) => Math.max(x, i + 1))}>
                <span className="nt-qq"><Tx ko={q.ko} en={q.en} /></span>
                <span className="nt-aa"><Tx ko={a.ko} en={a.en} /></span>
              </button>
            ))}
            <div className={'nt-verdict' + (n > 3 ? ' nt-on' : '')}>
              <img src={img('p_hyunseok')} alt="" />
              <p><b><Tx ko="오현석" en="Oh Hyun-seok" /></b><Tx ko="정상. 쓰리고, 밥 먹고 시작했고. 식도염이네. 제산제 주고 보내." en="Normal. Burning, started after a meal. Reflux. Give him an antacid and send him home." /></p>
            </div>
            <p className={'nt-rule' + (n > 3 ? ' nt-on' : '')}><Tx ko="흔한 병을 의심하되, 위험한 병부터 지워라." en="Suspect the common. Rule out the dangerous first." /></p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 4. 새벽 (02:50 → 02:58, 다시 문 앞)
const ECG = (() => {            // 심전도 한 줄: 앞쪽은 고른 박동, 뒤쪽은 ST 분절이 들린다
  let d = 'M0 60', x = 0;
  for (let i = 0; i < 18; i++) {
    const st = i > 10 ? Math.min(14, (i - 10) * 3) : 0, w = i > 13 ? 50 : 60;
    d += ` l${w * 0.3} 0 l4 -6 l4 6 l6 0 l3 8 l5 -54 l5 ${58 - st} l${w * 0.18} 0 q8 ${-12 - st * 0.4} 16 ${st} l${w * 0.2} 0`;
    x += w;
  }
  return d;
})();
function Three() {
  const [ref, p] = useScene(T(2, 50), T(2, 58));
  const mins = useClock();
  const [pick, setPick] = useState<null | 'knock' | 'wait'>(null);
  const choose = (k: 'knock' | 'wait') => { setPick(k); mins.set(T(3, 40)); };
  return (
    <section ref={ref} className="nt-scene nt-three" style={{ height: '420vh' }}>
      <div className="nt-pin">
        <motion.img className="nt-bg" src={img('door')} alt="" style={{ opacity: R(p, [0.5, 0.68], [0, 0.9]), scale: R(p, [0.5, 1], [1.25, 1.04]) }} />
        <svg className="nt-ecg" viewBox="0 0 1100 120" preserveAspectRatio="none" aria-hidden="true">
          <motion.path d={ECG} fill="none" stroke="currentColor" strokeWidth="1.6" vectorEffect="non-scaling-stroke" style={{ pathLength: R(p, [0.02, 0.6], [0, 1]) }} />
        </svg>
        <div className="nt-lines">
          <motion.p className="nt-when" style={fade(p, 0.03)}><Tx ko="새벽 02:50 · 응급실 관찰 구역" en="2:50 a.m. · ER observation area" /></motion.p>
          <motion.div className="nt-say" style={fade(p, 0.1)}><img src={img('p_sunyoung')} alt="" /><p><b><Tx ko="박선영" en="Park Sun-young" /></b><Tx ko="선생님. 아까보다 안색이 안 좋아요. 한 번만 더 보시죠." en="Doctor. He looks worse than before. Take one more look." /></p></motion.div>
          <motion.div className="nt-say" style={fade(p, 0.22)}><img src={img('p_manho')} alt="" /><p><b><Tx ko="정만호" en="Jung Man-ho" /></b><Tx ko="아까는 쓰렸는데… 지금은 누가 가슴을 깔고 앉은 것 같아. 근데 괜찮아요, 딸 금방 와요." en="It was burning before… now it’s like someone is sitting on my chest. I’m fine, though. My daughter’s coming." /></p></motion.div>
          <motion.p className="nt-big" style={fade(p, 0.36)}><Tx ko="윗연차는 사흘 만에 잠들었다." en="Your senior just fell asleep for the first time in three days." /></motion.p>
          <motion.div className="nt-door" style={{ opacity: R(p, [0.62, 0.74], [0, 1]), y: R(p, [0.62, 0.74], [40, 0]) }}>
            <h2><Tx ko="깨울 것인가." en="Do you knock?" /></h2>
            <div className={'nt-opts' + (pick ? ' nt-done' : '')}>
              <button className={pick === 'knock' ? 'nt-on' : ''} onClick={() => choose('knock')}><Tx ko="당직실 문을 두드린다" en="Knock on the on-call room door" /></button>
              <button className={pick === 'wait' ? 'nt-on' : ''} onClick={() => choose('wait')}><Tx ko="삼십 분만 더 보고 결정한다" en="Watch him for thirty more minutes" /></button>
            </div>
            <div className={'nt-after' + (pick ? ' nt-on' : '')}>
              {pick === 'knock' && <Tb as="p" ko={<>“(두 장을 3초쯤 본다) 똑같잖아. 다음엔 결론부터 말해.”<br />문이 다시 닫힌다.</>} en={<>“(He looks at the two ECGs for three seconds.) They’re the same. Next time, lead with the bottom line.”<br />The door closes again.</>} />}
              {pick === 'wait' && <Tb as="p" ko={<>환자 옆에 의자를 끌어다 앉았다.<br />시계는 03시 25분이었다.</>} en={<>You pull a chair up beside him.<br />The clock says 3:25.</>} />}
              <Tb as="p" className="nt-gold" ko={<>03:40. 길게 한 번 우는 소리.<br />정답은 없다. 고른 것은 되돌릴 수 없고, 다음 화가 그 선택을 기억한다.</>} en={<>3:40. One long alarm.<br />There is no right answer. You can’t take it back, and the next episode remembers.</>} />
              <a className="nt-btn nt-gold" href={DEMO_URL}><Tx ko="1화를 처음부터 해 보기 →" en="Play episode 1 from the start →" /></a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── 휠 속도에 반응하는 말의 띠
function Marquee() {
  const base = useMotionValue(0);
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(v, [-2000, 0, 2000], [-6, 0, 6], { clamp: false });
  const skew = useTransform(v, [-2500, 2500], [10, -10]);
  const dir = useRef(1);
  useAnimationFrame((_, dt) => {
    const f = factor.get();
    if (f < 0) dir.current = -1; else if (f > 0) dir.current = 1;
    let x = base.get() + dir.current * (1.2 + Math.abs(f) * 2.2) * (dt / 1000) * -1;
    if (x < -50) x += 50; else if (x > 0) x -= 50;
    base.set(x);
  });
  const x = useTransform(base, (b) => b + '%');
  const words = [['노티 했어?', 'Did you report it?'], ['결론부터.', 'Bottom line first.'], ['죽을 일 아니면 깨우지 마.', 'Don’t wake me unless someone’s dying.'], ['한 번만 더 보시죠.', 'Take one more look.'], ['괜찮아요.', 'I’m fine.']];
  const row = (k: number) => <span key={k}>{words.map(([ko, en], i) => <em key={i}><Tx ko={ko} en={en} /></em>)}</span>;
  return <div className="nt-marquee" aria-hidden="true"><motion.div style={{ x, skewX: skew }}>{row(1)}{row(2)}{row(3)}{row(4)}</motion.div></div>;
}

// ── 앱 화면: 미리보기 영상(화면에 들어오면 재생)과 실제 화면 넷. 고른 언어의 것을 보여 준다
const SHOTS: [string, Pair][] = [
  ['01_door', { ko: '1화 첫 장면', en: 'The opening scene' }],
  ['02_choice', { ko: '새벽 3시의 선택', en: 'The 3 a.m. choice' }],
  ['03_case', { ko: '직접 묻고 좁히는 진단', en: 'Ask and narrow it down' }],
  ['06_record', { ko: '내 선택으로 쓰인 기록', en: 'The record your choices write' }],
];
function Screens() {
  const { lang, L } = useLang();
  const video = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const v = video.current;
    if (!v || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, [lang]);
  return (
    <section className="nt-screens">
      <header>
        <p className="nt-kicker">{L('앱 화면', 'IN THE APP')}</p>
        <h2>{L('읽고, 묻고, 고른다', 'Read. Ask. Choose.')}</h2>
        <p>{L('한국어와 영어로 할 수 있습니다. 한 화에 25~35분.', 'Available in Korean and English. 25–35 minutes per episode.')}</p>
      </header>
      <div className="nt-screens-row">
        <motion.div className="nt-phone nt-phone-main" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }} transition={{ duration: 0.7 }}>
          <video key={lang} ref={video} src={`/noti/video/preview_${lang}.mp4`} poster={`/noti/video/poster_${lang}.webp`} muted loop playsInline preload="none" />
        </motion.div>
        <div className="nt-shots">
          {SHOTS.map(([id, cap], i) => (
            <motion.figure key={id} initial={{ opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 }} whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, margin: '-8% 0px' }} transition={{ duration: 0.6, delay: i * 0.08 }} whileHover={{ y: -8, scale: 1.02 }}>
              <div className="nt-phone"><img src={`/noti/shot/${id}_${lang}.webp`} alt="" loading="lazy" /></div>
              <figcaption>{L(cap.ko, cap.en)}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 여덟 화
const EPS: [string, string, string, string, string, string][] = [
  ['3월', 'MAR', '3월 2일', 'March 2', '첫 야간 당직. 새벽 3시, 자고 있는 윗연차를 깨울 것인가', 'Your first night shift. At 3 a.m., do you wake your senior?'],
  ['4월', 'APR', '노티', 'Noti', '콜 마흔 통 중 진짜 급한 셋. 그리고 틀리는 법을 모르던 동기가 틀린다', 'Forty calls, three that matter. And the classmate who never makes mistakes makes one.'],
  ['5월', 'MAY', '칼잡이들', 'The Knives', '서른여섯 시간째, 교수는 사진을 찍지 말라고 한다', 'Hour thirty-six. The professor says: no scan.'],
  ['6월', 'JUN', 'M&M', 'M&M', '백이십 명 앞에서 그날 밤을 다시 세운다', 'You rebuild that night in front of a hundred and twenty people.'],
  ['8월', 'AUG', '소아과의 밤', 'A Night in Pediatrics', '말 못 하는 환자, 그리고 무너지는 동기', 'A patient who can’t speak, and a friend who is falling apart.'],
  ['10월', 'OCT', '오프', 'Day Off', '석 달 만의 휴일, 지하철에서 사람이 쓰러진다', 'Your first day off in three months. Someone collapses on the subway.'],
  ['12월', 'DEC', 'VIP', 'VIP', '병상 하나, 환자 둘', 'One bed. Two patients.'],
  ['2월', 'FEB', '2월', 'February', '명단이 붙는다. 이번엔 내가 깨워지는 쪽이다', 'The list goes up. This time you are the one being woken.'],
];
function Episodes() {
  return (
    <section className="nt-eps">
      <header>
        <p className="nt-kicker"><Tx ko="시즌 1 · 인턴" en="SEASON 1 · THE INTERN" /></p>
        <h2><Tx ko="여덟 화, 인턴의 1년" en="Eight episodes. One year." /></h2>
        <Tb as="p" ko="한 화에 25~35분. 화가 끝나면 내 선택으로 쓴 ‘오늘의 기록’이 남는다." en="25–35 minutes each. Every episode ends with a record of the day, written from your choices." />
      </header>
      <ol>
        {EPS.map(([m, me, t, te, h, he], i) => (
          <motion.li key={i} initial={{ opacity: 0, x: i % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: '-12% 0px' }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>
            <span className="nt-mo"><Tx ko={m} en={me} /></span>
            <span className="nt-no">{i + 1}</span>
            <div><h3><Tx ko={t} en={te} />{i < 2 && <i><Tx ko="무료" en="FREE" /></i>}</h3><p><Tx ko={h} en={he} /></p></div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

function Promises() {
  const P: [string, string][] = [['광고 없음', 'No ads'], ['계정 없음', 'No account'], ['데이터 수집 없음', 'No data collected'], ['비행기 모드에서도', 'Works offline']];
  return (
    <section className="nt-promise">
      <ul>{P.map(([ko, en], i) => <motion.li key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.5 }}><Tx ko={ko} en={en} /></motion.li>)}</ul>
      <Tb as="p" ko="1화와 2화는 무료. 3화부터는 시즌권 한 번으로 끝까지 — 구독이 아닙니다. 점수는 없다. 결과는 사람들의 반응과 환자의 결말로 돌아온다." en="Episodes 1 and 2 are free. A one-time season pass opens the rest — no subscription. There is no score: the results come back as how people treat you and what happens to your patients." />
      <Tb as="p" className="nt-fine" ko="한국어 · English. 가상의 병원과 인물, 환자를 다루는 이야기이며 의학적 조언이 아닙니다. 의료 사고, 환자의 죽음, 과로와 소진을 다룹니다." en="Korean · English. A work of fiction, not medical advice. It deals with medical error, the death of patients, overwork and burnout." />
    </section>
  );
}

function Cta() {
  return (
    <section className="nt-cta">
      <img className="nt-bg" src={img('entrance')} alt="" loading="lazy" />
      <div className="nt-veil" />
      <p className="nt-when"><Tx ko="3월 2일 18:40" en="March 2, 6:40 p.m." /></p>
      <h2><Tx ko="첫 당직이 시작된다" en="Your first shift begins" /></h2>
      <div className="nt-btns">
        <a className="nt-btn nt-gold" href={DEMO_URL}><Tx ko="웹에서 1화 해 보기" en="Play episode 1 in your browser" /></a>
        <StoreButtons />
      </div>
    </section>
  );
}

export default function HomeContent() {
  useDocTitle('노티: 새벽 3시의 인턴 — 당신이 주인공인 메디컬 드라마', 'NOTI: The 3 A.M. Intern — a medical drama you play');
  const mins = useMotionValue(T(2, 58));
  return (
    <>
      <ClockCtx.Provider value={mins}>
        <Clock />
        <div id="night">
          <Hero />
          <Arrive />
          <People />
          <Patient />
          <Three />
        </div>
      </ClockCtx.Provider>
      <Marquee />
      <Screens />
      <Episodes />
      <Promises />
      <Cta />
    </>
  );
}
