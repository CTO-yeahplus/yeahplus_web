'use client';

/* 조선왕조실록 — 왕의 선택 · 소개 페이지 (휠에 반응하는 장면 페이지, 2026-10-21).
   흐름: 히어로 → 「당신이 왕입니다」(사건 카드 → 선택 → 지표 → 실록 대조, 직접 눌러 볼 수 있다)
        → 500년(휠을 내리면 그림이 가로로 흐르고 연도가 1392→1910) → 물려받는 나라(네 지표) → 담긴 것 → 학부모 · 교사 → 자주 묻는 질문.
   두 언어를 모두 마크업에 두고 html[data-lang] 으로 한쪽만 보인다(i18n.tsx) — 아래 B 가 그 꼴을 만든다.
   사건 · 연도 · 출처는 앱 데이터에서 뽑은 home/data.ts, 그림은 앱 1.1 의 사건 그림(public/sillok/scenes). */

import Image from 'next/image';
import { useState } from 'react';
import type { ReactNode } from 'react';
import { DEMO, SCENES, START } from './home/data';
import { clamp, ease, lerp, seg, useCount, usePin, useSeen } from './home/motion';
import './home/home.css';

/** 출시됨(2026-09). 이 값이 비면 버튼이 자동으로 「곧 출시」 안내로 돌아간다. */
const APP_STORE_URL = 'https://apps.apple.com/app/apple-store/id6810510913?pt=121180501&ct=site&mt=8';
const IMG = (id: string) => `/sillok/scenes/${id}.webp`;

/** 두 언어 — 지금 언어 쪽만 CSS 로 보인다 */
function B({ ko, en }: { ko: ReactNode; en: ReactNode }) {
  return (
    <>
      <span data-l="ko">{ko}</span>
      <span data-l="en">{en}</span>
    </>
  );
}

function StoreButton() {
  return (
    <div className="sl-store-row">
      <a
        className="sl-store-btn sl-plain"
        href={APP_STORE_URL || '#'}
        aria-disabled={APP_STORE_URL ? undefined : true}
        target={APP_STORE_URL ? '_blank' : undefined}
        rel={APP_STORE_URL ? 'noreferrer' : undefined}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.37 12.6c-.02-2.2 1.8-3.26 1.88-3.31-1.03-1.5-2.62-1.7-3.18-1.73-1.35-.14-2.64.8-3.33.8-.69 0-1.74-.78-2.86-.76-1.47.02-2.83.86-3.59 2.17-1.53 2.65-.39 6.58 1.1 8.73.73 1.05 1.6 2.23 2.73 2.19 1.1-.04 1.51-.71 2.84-.71 1.32 0 1.7.71 2.86.69 1.18-.02 1.93-1.07 2.65-2.13.84-1.22 1.18-2.4 1.2-2.46-.03-.01-2.29-.88-2.3-3.48ZM14.2 6.13c.6-.73 1.01-1.75.9-2.76-.87.04-1.92.58-2.54 1.31-.56.65-1.05 1.69-.92 2.68.97.08 1.96-.49 2.56-1.23Z" /></svg>
        <span>
          <small><B ko="iPhone · iPad" en="iPhone · iPad" /></small>
          {APP_STORE_URL ? <B ko="App Store에서 받기" en="Download on the App Store" /> : <B ko="App Store 곧 출시" en="Coming soon to the App Store" />}
        </span>
      </a>
      <span className="sl-price-note">
        <B ko="유료 앱 · 한 번 구매하면 추가 결제 없음 (가격은 App Store 참조)" en="Paid app · one purchase, nothing more (see the App Store for pricing)" />
      </span>
    </div>
  );
}

/* ═════════════════════════ 1. 히어로 ═════════════════════════ */

function Hero() {
  const [ref, p] = usePin<HTMLElement>(0);
  const k = ease(p);
  return (
    <header className="slh-hero" ref={ref}>
      <div className="slh-hero-stage">
        <div className="slh-hero-art" aria-hidden="true">
          {['sejong_hangul', 'taejo_gukho', 'jeongjo_hwaseong'].map((id, i) => (
            <div
              key={id}
              className={`slh-hero-frame f${i}`}
              style={{ transform: `translate3d(0, ${lerp(0, [-60, -140, -90][i], k)}px, 0) rotate(${[-4, 2.5, 5][i]}deg) scale(${lerp(1, 1.06, k)})` }}
            >
              <Image src={IMG(id)} alt="" width={960} height={538} priority={i === 1} sizes="(max-width: 760px) 70vw, 520px" />
            </div>
          ))}
        </div>
        <div className="slh-hero-copy" style={{ opacity: 1 - seg(p, 0.55, 0.95), transform: `translateY(${lerp(0, -40, k)}px)` }}>
          <Image className="sl-seal" src="/sillok/icon-256.webp" alt="" width={256} height={256} priority aria-hidden="true" />
          <div className="sl-hero-sub"><B ko="조선 500년 · 27명의 왕" en="500 YEARS · 27 KINGS" /></div>
          <h1><B ko="조선왕조실록 — 왕의 선택" en="Joseon Annals: King’s Choice" /></h1>
          <p className="slh-hero-line">
            <B ko={<>정답을 묻지 않습니다.<br />왕의 자리를 드립니다.</>} en={<>We never ask for the right answer.<br />We hand over the throne.</>} />
          </p>
          <StoreButton />
          <div className="sl-badges">
            <span className="sl-badge"><B ko="초등 3~6학년" en="Ages 9–12" /></span>
            <span className="sl-badge"><B ko="한국어 · English" en="Korean · English" /></span>
            <span className="sl-badge"><B ko="완전 오프라인" en="Fully offline" /></span>
            <span className="sl-badge"><B ko="광고 없음" en="No ads" /></span>
            <span className="sl-badge"><B ko="인앱결제 없음" en="No in-app purchases" /></span>
            <span className="sl-badge"><B ko="데이터 수집 없음" en="No data collected" /></span>
          </div>
          <p className="slh-cue" aria-hidden="true"><B ko="휠을 내리면 1392년이 열립니다" en="Scroll to open the year 1392" /><i /></p>
        </div>
      </div>
    </header>
  );
}

/* ═════════════════════════ 2. 당신이 왕입니다 ═════════════════════════ */

const STAT_KEYS = ['people', 'treasury', 'defense', 'culture'] as const;
const STAT_NAME = {
  people: { ko: '민심', en: 'People' },
  treasury: { ko: '국고', en: 'Treasury' },
  defense: { ko: '국방', en: 'Defense' },
  culture: { ko: '문화', en: 'Culture' },
} as const;

const STEPS = [
  {
    eyebrow: { ko: '1392년 · 제1대 태조', en: '1392 · Taejo, 1st king' },
    h: { ko: '당신이 왕입니다', en: 'You are the king' },
    p: { ko: '고려가 문을 닫고 새 나라가 열렸습니다. 그런데 아직 나라 이름이 없습니다. 실록에 실제로 기록된 사건이 두루마리로 펼쳐집니다.', en: 'Goryeo has closed its doors and a new country has opened, but it has no name yet. An event actually recorded in the annals unfolds as a scroll.' },
  },
  {
    eyebrow: { ko: '왜 퀴즈 앱이 아닌가', en: 'Why this is not a quiz app' },
    h: { ko: '정답을 묻지 않습니다', en: 'No right answers asked' },
    p: { ko: '아이에게 권한을 줍니다. 선택지 두 개는 둘 다 그럴듯하고, 맞고 틀림 표시가 없습니다. 카드에서 직접 골라 보세요.', en: 'The child is given authority. Both options are genuinely reasonable, and nothing is marked right or wrong. Try choosing on the card.' },
  },
  {
    eyebrow: { ko: '나라가 움직인다', en: 'The country responds' },
    h: { ko: '모든 결정에는 대가가 있습니다', en: 'Every decision costs something' },
    p: { ko: '민심 · 국고 · 국방 · 문화가 오르내립니다. 한 선택은 반드시 두 개 이상의 지표를 건드리고, 화살표와 부호로 함께 알려 줍니다.', en: 'People, Treasury, Defense and Culture shift. Every choice moves at least two of them, shown with arrows and signs as well as color.' },
  },
  {
    eyebrow: { ko: '【실록 대조】', en: 'Annals Comparison' },
    h: { ko: '고른 다음에, 진짜 역사', en: 'After the choice, real history' },
    p: { ko: '학습은 게임의 보상이지 관문이 아닙니다. 결정을 내린 다음에야 사관이 붓을 들고 실제 기록을 보여 주고, 출처는 실록의 권과 날짜로 적습니다.', en: 'Learning is the reward, not the gate. Only after deciding does the historian show the actual record, cited by volume and date.' },
  },
] as const;

function DemoCard({ step, k2, chosen, choose, still }: { step: number; k2: number; chosen: number | null; choose: (i: number) => void; still: boolean }) {
  // 고르지 않았으면 2단계부터는 실제 역사 쪽(조선)이 골라진 것으로 보여 준다
  const pick = chosen ?? (step >= 1 ? DEMO.choices.findIndex((c) => c.historical) : null);
  const c = pick === null ? null : DEMO.choices[pick];
  const showDelta = step >= 2 && c;
  return (
    <div className="slh-card" role="group" aria-label="게임 화면 예시">
      <div className="slh-card-top">
        <B ko="제 1대 · 태조 — 1 / 5" en="1st reign · Taejo — 1 / 5" />
      </div>
      <div className="slh-stats">
        {STAT_KEYS.map((key) => {
          const d = showDelta ? (c!.delta as Record<string, number>)[key] || 0 : 0;
          const v = Math.round(START[key] + d * (still ? 1 : k2));
          return (
            <div key={key} className={`slh-stat k-${key}`}>
              <span className="slh-stat-n"><B ko={STAT_NAME[key].ko} en={STAT_NAME[key].en} /></span>
              <b>{v}</b>
              <span className="slh-stat-bar"><i style={{ width: `${v}%` }} /></span>
              {d !== 0 && (
                <em className={d > 0 ? 'up' : 'down'} style={{ opacity: still ? 1 : k2 }}>
                  {d > 0 ? '▲ +' : '▼ '}{d}
                </em>
              )}
            </div>
          );
        })}
      </div>
      <div className="slh-scroll">
        <div className="slh-scroll-img">
          <Image src={IMG(DEMO.id)} alt="" width={960} height={538} sizes="(max-width: 760px) 90vw, 440px" />
        </div>
        <p className="slh-card-meta">1392 · <B ko="왕실" en="Royal court" /></p>
        <h3 className="slh-card-title"><B ko={DEMO.title.ko} en={DEMO.title.en} /></h3>
        <p className="slh-card-body"><B ko={DEMO.body.ko} en={DEMO.body.en} /></p>
        <div className={`slh-choices ${step >= 1 ? 'on' : ''}`}>
          {DEMO.choices.map((ch, i) => (
            <button
              key={i}
              type="button"
              className={pick === i ? 'picked' : ''}
              aria-pressed={pick === i}
              onClick={() => choose(i)}
              tabIndex={step >= 1 ? 0 : -1}
            >
              <B ko={ch.text.ko} en={ch.text.en} />
            </button>
          ))}
        </div>
      </div>
      <div className={`slh-annal ${step >= 3 ? 'on' : ''}`} aria-hidden={step < 3}>
        <span className="slh-annal-seal" aria-hidden="true">史</span>
        {c && !c.historical && (
          <p className="slh-annal-if">
            <b><B ko="만약의 조선" en="The Joseon that might have been" /></b>
            <B ko={c.result.ko} en={c.result.en} />
          </p>
        )}
        <p className="slh-annal-lead"><B ko="실제 실록에는 이렇게 적혀 있습니다." en="Here is what the annals actually record." /></p>
        <p className="slh-annal-text"><B ko={DEMO.sillok.ko} en={DEMO.sillok.en} /></p>
        <p className="slh-annal-src">— {DEMO.source}</p>
      </div>
    </div>
  );
}

function Demo() {
  const [ref, p, still] = usePin<HTMLElement>(1);
  const [chosen, setChosen] = useState<number | null>(null);
  const cut = [0, 0.22, 0.47, 0.72];
  const step = still ? 3 : cut.filter((c) => p >= c).length - 1;
  const k2 = ease(seg(p, 0.47, 0.6));
  return (
    <section id="why" className={`slh-pin slh-demo ${still ? 'still' : ''}`} ref={ref}>
      <div className="slh-stage">
        <div className="slh-demo-grid">
          <div className="slh-demo-text">
            {STEPS.map((s, i) => (
              <div key={i} className={`slh-step ${i === step ? 'on' : ''} ${i < step ? 'past' : ''}`}>
                <p className="slh-eyebrow"><B ko={s.eyebrow.ko} en={s.eyebrow.en} /></p>
                <h2><B ko={s.h.ko} en={s.h.en} /></h2>
                <p><B ko={s.p.ko} en={s.p.en} /></p>
              </div>
            ))}
            <ol className="slh-dots" aria-hidden="true">
              {STEPS.map((_, i) => <li key={i} className={i <= step ? 'on' : ''} />)}
            </ol>
          </div>
          <DemoCard step={step} k2={k2} chosen={chosen} choose={setChosen} still={still} />
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ 3. 500년 ═════════════════════════ */

function Journey() {
  const [ref, p, still] = usePin<HTMLElement>(1);
  const n = SCENES.length;
  const f = still ? n - 1 : clamp(p * 1.04 - 0.02) * (n - 1);   // 앞뒤로 조금 여유
  const i = Math.min(n - 1, Math.floor(f));
  const t = f - i;
  const a = SCENES[i];
  const b = SCENES[Math.min(n - 1, i + 1)];
  const year = Math.round(lerp(a.year, b.year, t));
  const cur = t < 0.5 ? a : b;
  return (
    <section id="how" className={`slh-pin slh-journey ${still ? 'still' : ''}`} ref={ref}>
      <div className="slh-stage">
        <div className="slh-journey-head">
          <p className="slh-eyebrow"><B ko="한 명의 왕, 약 5분" en="One king, about five minutes" /></p>
          <h2><B ko="태조부터 순종까지, 27대 500년" en="Taejo to Sunjong: 27 reigns, 500 years" /></h2>
          <p className="slh-year" aria-live="off">{year}</p>
          <p className="slh-reign">
            <B ko={`제${cur.order}대 ${cur.king.ko}`} en={`${cur.king.en} · reign ${cur.order}`} />
            <span> · </span>
            <B ko={cur.title.ko} en={cur.title.en} />
          </p>
        </div>
        <div className="slh-strip-wrap">
          <ol className="slh-strip" style={still ? undefined : { transform: `translate3d(calc(${-f} * (var(--card) + var(--gap))), 0, 0)` }}>
            {SCENES.map((s, j) => {
              const d = Math.abs(j - f);
              return (
                <li key={s.id} style={still ? undefined : { opacity: lerp(1, 0.35, clamp(d)), transform: `scale(${lerp(1, 0.86, clamp(d))})` }}>
                  <Image src={IMG(s.id)} alt="" width={960} height={538} sizes="(max-width: 760px) 78vw, 640px" loading="eager" />
                  <span className="slh-strip-cap">
                    <b>{s.year}</b> <B ko={`${s.king.ko} · ${s.title.ko}`} en={`${s.king.en} · ${s.title.en}`} />
                    <small>{s.source}</small>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="slh-rail" aria-hidden="true">
          {Array.from({ length: 27 }, (_, k) => (
            <i key={k} className={k + 1 <= cur.order ? 'on' : ''} />
          ))}
        </div>
        <p className="slh-journey-note">
          <B
            ko="왕마다 사건 카드 3~5장 · 전체 완주 약 150분 · 이어하기 지원. 그림은 실제 사건 카드에 들어가는 장면입니다."
            en="Three to five event cards per king · about 150 minutes in all · progress saved. Each picture is a scene from an actual event card."
          />
        </p>
      </div>
    </section>
  );
}

/* ═════════════════════════ 4. 물려받는 나라 ═════════════════════════ */

// 예시 플레이의 숫자 — 실제 게임의 한 판이 이렇게 흘러간다는 그림이다(실제 기록의 숫자가 아니다)
const REIGNS = [
  { k: { ko: '세종, 즉위', en: 'Sejong takes the throne' }, v: [62, 58, 49, 55] },
  { k: { ko: '세종, 승하 — 문화가 쌓였다', en: 'Sejong dies — culture has grown' }, v: [71, 52, 53, 84] },
  { k: { ko: '문종에게 그대로', en: 'Passed to Munjong as is' }, v: [71, 52, 53, 84] },
  { k: { ko: '선조, 왜란 — 국방이 바닥나도 나라는 이어진다', en: 'Seonjo, the invasion — even near zero, the country goes on' }, v: [38, 27, 9, 61] },
];

function Inherit() {
  const [ref, p, still] = usePin<HTMLElement>(1);
  const f = still ? REIGNS.length - 1 : clamp(p) * (REIGNS.length - 1);
  const i = Math.min(REIGNS.length - 1, Math.floor(f));
  const t = ease(f - i);
  const a = REIGNS[i];
  const b = REIGNS[Math.min(REIGNS.length - 1, i + 1)];
  const cur = t < 0.5 ? a : b;
  return (
    <section id="stats" className={`slh-pin slh-inherit ${still ? 'still' : ''}`} ref={ref}>
      <div className="slh-stage">
        <div className="slh-inherit-in">
          <p className="slh-eyebrow"><B ko="나라의 네 가지 형편" en="Four measures of the country" /></p>
          <h2><B ko="이 네 숫자는 다음 왕에게 그대로 넘어갑니다" en="These four numbers pass untouched to the next king" /></h2>
          <p className="slh-inherit-k"><B ko={cur.k.ko} en={cur.k.en} /></p>
          <div className="slh-bars">
            {STAT_KEYS.map((key, j) => {
              const v = Math.round(lerp(a.v[j], b.v[j], t));
              return (
                <div key={key} className={`slh-bar k-${key}`}>
                  <span><B ko={STAT_NAME[key].ko} en={STAT_NAME[key].en} /></span>
                  <span className="slh-bar-track"><i style={{ width: `${v}%` }} /></span>
                  <b>{v}</b>
                </div>
              );
            })}
          </div>
          <p className="slh-inherit-note">
            <B
              ko="앞선 왕이 쌓아 둔 곳간을 다음 왕이 비울 수도 있습니다. 지표가 0이 되어도 게임은 끝나지 않고, 위기 사건이 들어온 뒤 다음 왕이 이어받습니다. (숫자는 예시 플레이)"
              en="One reign’s full granary can be emptied by the next. A stat at zero does not end the game: a crisis arrives and the next king carries on. (Numbers from an example run.)"
            />
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ 5. 담긴 것 ═════════════════════════ */

function Fact({ n, ko, en, unit, on }: { n: number; ko: string; en: string; unit: string; on: boolean }) {
  const v = useCount(n, on);
  return (
    <div className="sl-fact">
      <div className="sl-num">{v}<small data-l="ko">{unit}</small><small data-l="en"></small></div>
      <div className="sl-lbl"><B ko={ko} en={en} /></div>
    </div>
  );
}

function Contents() {
  const [ref, seen] = useSeen<HTMLElement>();
  return (
    <section id="content" ref={ref} className="slh-plain">
      <h2><span className="sl-brush" aria-hidden="true">✒</span><B ko="담긴 것" en="What is inside" /></h2>
      <p className="sl-sec-lead"><B ko="모든 사건은 실제 기록에 근거해 새로 서술했습니다." en="Every event is newly written from the historical record." /></p>
      <div className="sl-facts">
        <Fact n={27} unit="대" ko="태조부터 순종까지" en="kings, Taejo to Sunjong" on={seen} />
        <Fact n={97} unit="장" ko="사건 카드" en="event cards" on={seen} />
        <Fact n={73} unit="명" ko="인물 도감" en="figures in the codex" on={seen} />
        <Fact n={179} unit="개" ko="낱말 뜻풀이" en="glossary entries" on={seen} />
      </div>
      <div className="sl-grid" style={{ marginTop: '14px' }}>
        <div className="sl-card">
          <b><B ko="왕 도감 27명" en="27 kings" /></b>
          <p data-l="ko">재위 기간과 능호, 한 줄 평. 한 번이라도 다스려 본 왕은 따로 골라서 다시 플레이할 수 있습니다.</p>
          <p data-l="en">Reign years, tomb name and a one-line summary. Any king you have reached once can be replayed on their own.</p>
        </div>
        <div className="sl-card">
          <b><B ko="인물 도감 73명" en="73 figures" /></b>
          <p data-l="ko">장영실, 신사임당, 이순신, 허준, 정약용, 김만덕 등. 관련 사건을 겪으면 도감에 해금됩니다.</p>
          <p data-l="en">Jang Yeong-sil, Shin Saimdang, Yi Sun-sin, Heo Jun, Jeong Yak-yong, Kim Man-deok and more — unlocked by playing the events they belong to.</p>
        </div>
        <div className="sl-card">
          <b><B ko="사초 조각 97개" en="97 record fragments" /></b>
          <p data-l="ko">실제 역사와 같은 선택을 했을 때 사관이 남기는 기록 조각. 모으면 조선 500년의 뼈대가 됩니다.</p>
          <p data-l="en">A fragment the historian leaves when your choice matches what actually happened. Collected, they form the spine of 500 years.</p>
        </div>
        <div className="sl-card">
          <b><B ko="낱말 사전 179개" en="179 glossary terms" /></b>
          <p data-l="ko">수렴청정·붕당·탕평·환국처럼 어려운 낱말에 점선 밑줄이 붙습니다. 탭하면 초등 눈높이 한 문장 뜻풀이가 뜹니다.</p>
          <p data-l="en">Hard words carry a dotted underline. Tap one and a single sentence explains it at a nine-to-twelve-year-old’s level.</p>
        </div>
      </div>
    </section>
  );
}

/* ═════════════════════════ 6. 학부모 · 교사 / 질문 ═════════════════════════ */

function Parents() {
  return (
    <section id="parents" className="slh-plain">
      <h2><span className="sl-brush" aria-hidden="true">✒</span><B ko="학부모·교사를 위한 안내" en="For parents and teachers" /></h2>
      <p className="sl-sec-lead"><B ko="아이에게 건네 놓고 자리를 비워도 되는 앱인지가 가장 중요한 질문이라고 생각합니다." en="We think the question that matters most is whether you can hand this to a child and walk away." /></p>

      <h3><B ko="앱 안에 없는 것" en="What the app does not have" /></h3>
      <ul className="sl-checks">
        <li><B ko={<><b>광고가 없습니다.</b> 배너도 전면 광고도 보상형 영상도 없습니다.</>} en={<><b>No ads.</b> No banners, no interstitials, no rewarded video.</>} /></li>
        <li><B ko={<><b>인앱결제가 없습니다.</b> 구매 후 모든 왕과 도감이 열려 있습니다.</>} en={<><b>No in-app purchases.</b> Every king and every codex entry is open after purchase.</>} /></li>
        <li><B ko={<><b>계정도 회원가입도 없습니다.</b> 로그인 화면 자체가 없습니다.</>} en={<><b>No account, no sign-up.</b> There is no login screen at all.</>} /></li>
        <li><B ko={<><b>서버와 통신하지 않습니다.</b> 비행기 모드에서도 전부 동작합니다.</>} en={<><b>No server communication.</b> Everything runs in airplane mode.</>} /></li>
        <li><B ko={<><b>개인정보를 수집하지 않습니다.</b> 분석 도구도 제3자 SDK도 넣지 않았습니다.</>} en={<><b>No personal data collected.</b> No analytics, no third-party SDKs.</>} /></li>
        <li><B ko={<><b>아이가 눌러 나갈 외부 링크가 없습니다.</b> 앱 안에는 이메일이나 웹 주소로 나가는 버튼이 하나도 없습니다 — 문의는 이 사이트의 지원 페이지로 받습니다.</>} en={<><b>No outbound links a child can tap.</b> There is no button inside the app that leads to e-mail or the web — support is handled on this website.</>} /></li>
      </ul>

      <div className="sl-callout" style={{ marginTop: '20px' }}>
        <B ko={<><b>저장 데이터는 기기 안에만 있습니다.</b> 진행 상황과 설정은 기기의 localStorage에만 저장되며, 앱을 삭제하면 함께 사라집니다. 저희에게 전송되는 것은 없고, 저희가 복구해 드릴 수 있는 것도 없습니다.</>}
           en={<><b>Saved data never leaves the device.</b> Progress and settings live only in the device’s localStorage and are erased with the app. Nothing is sent to us, and there is nothing for us to restore.</>} />
      </div>

      <h3><B ko="읽기가 아직 부담스러운 아이를 위해" en="If reading is still hard" /></h3>
      <ul className="sl-bullets">
        <li><B ko={<><b>읽어주기 버튼</b> — 카드 오른쪽 위의 버튼을 누르면 본문을 읽어 줍니다. iOS에 내장된 음성을 쓰기 때문에 인터넷이 필요 없고 추가 비용도 없습니다.</>} en={<><b>Read-aloud</b> — the button at the top right of a card reads the text out. It uses the voice built into iOS, so no internet and no extra cost.</>} /></li>
        <li><B ko={<><b>글자 크기 조절</b> — 본문은 기본 18pt 이상이고, 설정에서 더 키울 수 있습니다.</>} en={<><b>Text size</b> — body text starts at 18pt or larger and can be increased in Settings.</>} /></li>
        <li><B ko={<><b>한 카드에 서너 문장</b> — 한 화면에서 읽을 분량을 넘기지 않도록 규격을 정했습니다.</>} en={<><b>Three or four sentences per card</b> — deliberately capped so one screen is one readable amount.</>} /></li>
        <li><B ko={<><b>색만으로 알려 주지 않습니다</b> — 지표가 오르내릴 때 화살표와 부호를 함께 표시합니다.</>} en={<><b>Never color alone</b> — stat changes show an arrow and a sign as well as a color.</>} /></li>
      </ul>

      <h3><B ko="교과 연계" en="Curriculum fit" /></h3>
      <p><B ko="사건 목록은 2022 개정 교육과정 초등 사회 5~6학년군의 조선 단원을 기준으로 골랐습니다. 교과서에서 만나는 사건이 게임 안에서 아이가 직접 결정해 본 사건이 되도록 맞추었습니다." en="The event list was selected against the Joseon unit of the Korean elementary social studies curriculum for grades 5–6 (2022 revision), so that the events a child meets in the textbook are events the child already decided in the game." /></p>

      <h3><B ko="역사 서술 원칙" en="How the history is written" /></h3>
      <ul className="sl-bullets">
        <li><B ko="연도·인물·사건은 교차 확인했고, 확신이 서지 않는 사건은 넣지 않았습니다." en="Dates, people and events were cross-checked; anything we were unsure of was left out." /></li>
        <li><B ko="국역본 문장은 한 줄도 옮기지 않았습니다. 사실만 확인하고 문장은 전부 새로 썼으며, 출처는 실록의 권과 날짜로만 표기합니다." en="Not one sentence is copied from a published translation. Facts were verified and all prose written fresh; sources are cited by volume and date only." /></li>
        <li><B ko="임금의 초상은 국립고궁박물관이 공개한 어진(공공누리 제1유형)을 출처와 함께 실었고, 그 밖의 그림은 모두 이 앱을 위해 새로 그렸습니다." en="Royal portraits are public-domain works released by the National Palace Museum of Korea (KOGL Type 1), credited in the app; every other illustration was made for this app." /></li>
        <li><B ko="학계 통설만 서술하고 야사는 쓰지 않습니다. 특정 인물을 깎아내리거나 현대 정치와 연결하지 않습니다." en="Only mainstream scholarship, no folklore. No disparagement of individuals, no links to present-day politics." /></li>
        <li><B ko="아이 눈높이를 넘는 잔혹한 표현은 쓰지 않습니다." en="Nothing violent beyond what is appropriate for this age." /></li>
      </ul>
    </section>
  );
}

const FAQ = [
  { q: { ko: '역사를 하나도 모르는 아이도 할 수 있나요?', en: 'Can a child with no background in history play?' },
    a: { ko: '그렇게 설계했습니다. 사건 카드는 필요한 상황을 서너 문장으로 먼저 설명하고, 그다음에 결정을 요청합니다. 미리 알아야 답할 수 있는 문제가 하나도 없습니다.', en: 'That is the design. Each card explains the situation in three or four sentences first, then asks for a decision. Nothing requires prior knowledge to answer.' } },
  { q: { ko: '한 번에 다 끝내야 하나요?', en: 'Does it have to be finished in one sitting?' },
    a: { ko: '아니요. 왕 한 명이 약 5분이고 언제든 멈출 수 있습니다. 진행 상황은 자동 저장되어 「이어하기」로 돌아옵니다.', en: 'No. One king takes about five minutes and you can stop anywhere. Progress saves automatically and Continue picks it up.' } },
  { q: { ko: '아이가 "틀린" 선택을 하면 어떻게 되나요?', en: 'What happens if the child chooses "wrong"?' },
    a: { ko: '틀린 선택이라는 개념이 없습니다. 실제 역사와 다른 선택을 하면 「만약의 조선」이 어떻게 흘렀을지 보여 주고, 그 결과를 안고 다음 사건으로 갑니다. 실제와 같은 선택에는 사초 조각이 보상으로 주어질 뿐입니다.', en: 'There is no wrong choice. A choice that differs from history shows the Joseon that might have been, and the reign continues carrying that result. Matching history simply earns a fragment of the record.' } },
  { q: { ko: '기기 여러 대에서 이어서 할 수 있나요?', en: 'Can progress move between devices?' },
    a: { ko: '아니요. 계정과 서버가 없기 때문에 기기 사이 동기화도 없습니다. 개인정보를 전혀 받지 않기 위해 감수한 제약입니다.', en: 'No. With no account and no server there is no sync between devices — the trade-off we accepted in order to collect nothing.' } },
];

function Faq() {
  return (
    <section id="faq" className="slh-plain">
      <h2><span className="sl-brush" aria-hidden="true">✒</span><B ko="자주 묻는 질문" en="Common questions" /></h2>
      {FAQ.map((f, i) => (
        <details key={i}>
          <summary><B ko={f.q.ko} en={f.q.en} /></summary>
          <div className="sl-ans">
            <p data-l="ko">{f.a.ko}</p>
            <p data-l="en">{f.a.en}</p>
          </div>
        </details>
      ))}
      <p style={{ marginTop: '18px' }}>
        <B ko={<>더 궁금한 점은 <a href="/sillok/support">지원 페이지</a>를 봐 주세요.</>} en={<>More answers are on the <a href="/sillok/support">support page</a>.</>} />
      </p>
    </section>
  );
}

function Finale() {
  return (
    <section className="slh-finale">
      <div className="slh-finale-img" aria-hidden="true">
        <Image src={IMG('sunjong_girok')} alt="" width={960} height={538} sizes="100vw" />
      </div>
      <div className="slh-finale-in">
        <p className="slh-eyebrow"><B ko="1910년, 그리고 당신의 실록" en="1910, and your own annals" /></p>
        <h2><B ko="27대가 끝나면 「나의 조선왕조실록」 한 권이 남습니다" en="After 27 reigns, one book remains: “My Annals of Joseon”" /></h2>
        <StoreButton />
      </div>
    </section>
  );
}

export default function HomeContent() {
  return (
    <div className="slh">
      <Hero />
      <Demo />
      <Journey />
      <Inherit />
      <div className="sl-wrap">
        <Contents />
        <Parents />
        <Faq />
      </div>
      <Finale />
    </div>
  );
}
