'use client';
/* eslint-disable @next/next/no-img-element -- public/diogeneslamp 의 그림은 미리 줄여 둔 webp 라 그대로 쓴다 */

/**
 * 디오게네스의 등불 소개 — 휠을 굴리면 장면이 흐른다.
 *  1. 등불: 어두운 방에서 휠로 등불을 키우면(마우스로 비추면) 명언 카드가 드러나고 → '가짜' 도장 → 연표
 *  2. 판정: 카드 네 장이 휠에 맞춰 → 진짜 · ↑ 변조 · ← 가짜로 날아간다
 *  3. 사건 파일: 세 단계 명언의 연표가 휠에 맞춰 그려진다(1818 → 1866 → 지금)
 *  4. 원문 대조: 퍼진 문장에 줄이 그어지고 독일어 원문이 떠오른다
 *  5. 전시실 12곳: 세로 휠이 가로로 흐르고, 끝에서 두목의 정체가 뒤집힌다
 *  6. 오늘의 사건 · 원문 서고 · 약속 · 받기
 * 문장·연도·출처는 앱의 content.json(1.0-rc1)에서, 수량은 docs/METADATA_KO.md(전시실 12곳 · 사건 136건)에서 가져왔다.
 * 스토어 문안 규칙을 따라 현대 유명인·영화 이름은 쓰지 않는다. 모든 장면은 올리면 되감기고,
 * 모션 줄이기를 켠 기기에서는 붙잡지 않고 완성된 모습으로 둔다.
 */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as RPointerEvent, ReactNode } from 'react';
import { StoreButton } from './chrome';
import { useDocTitle, useLang } from './i18n';
import { clamp, ease, lerp, seg, slam, usePin, useSeen } from './home/motion';

const ART = (f: string) => `/diogeneslamp/art/${f}.webp`;
const css = (o: Record<string, string | number>) => o as CSSProperties;
type Pick2 = <T>(ko: T, en: T) => T;

type V = 'real' | 'fake' | 'twisted';
const STAMP: Record<V, { ko: string; en: string }> = {
  real: { ko: '진짜', en: 'REAL' },
  fake: { ko: '가짜', en: 'FAKE' },
  twisted: { ko: '변조', en: 'TWISTED' },
};

/** 마우스 위치를 --mx/--my 로 — 리렌더 없이 등불을 옮긴다 */
function trackPointer(e: RPointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const b = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${((e.clientX - b.left) / b.width) * 100}%`);
  el.style.setProperty('--my', `${((e.clientY - b.top) / b.height) * 100}%`);
}

/* ───────────── 1. 등불 ───────────── */
function Lamp() {
  const { L } = useLang();
  const [ref, p, still] = usePin<HTMLElement>(1);
  const light = ease(seg(p, 0.02, 0.34)); // 등불 크기
  const stamp = slam(seg(p, 0.38, 0.47));
  const tl = seg(p, 0.5, 0.82);
  const owner = seg(p, 0.84, 0.94);
  const r = still ? 160 : lerp(16, 160, light);
  const EV = [
    {
      y: '1897',
      t: L(
        '스코틀랜드의 한 목사가 성탄 메시지에 “가엾이 여겨라, 누구나 힘든 싸움을 하고 있다”고 씀',
        'A Scottish minister writes “Be pitiful, for every man is fighting a hard battle” in a Christmas message'
      ),
    },
    { y: '1898', t: L('미국 보스턴의 잡지가 그 목사의 말로 다시 실음', 'A Boston magazine reprints it, credited to him') },
    {
      y: L('지금', 'Now'),
      t: L('‘친절하라’로 바뀌어 플라톤의 말로 퍼짐. 고대 출처 없음', 'Modernised to “Be kind” and pinned on Plato. No ancient source'),
    },
  ];
  return (
    <section className="dlx-lamp" ref={ref}>
      <div className="dlx-pin">
        <div className="dlx-wrap dlx-lamp-grid">
          <div className="dlx-lamp-copy">
            <p className="dlx-kicker">{L('디오게네스의 등불', 'Diogenes’ Lamp')}</p>
            <h1 className="dlx-h1">
              {L(
                <>
                  그 명언,
                  <br />
                  <em>진짜일까?</em>
                </>,
                <>
                  That quote.
                  <br />
                  <em>Is it real?</em>
                </>
              )}
            </h1>
            <p className="dlx-lead">
              {L(
                '인터넷에 떠도는 철학자 명언을 원문으로 감정하는 게임. 진짜면 오른쪽, 가짜면 왼쪽, 진짜 출처를 비틀어 퍼진 말이면 위로 밀어 판정하세요. 판정마다 증거가 따라옵니다.',
                'A game of appraising the philosopher quotes that float around the internet. Swipe right if it’s real, left if it’s fake, up if a real source was twisted. Every verdict comes with the evidence.'
              )}
            </p>
            <div className="dlx-cta">
              <StoreButton primary />
              <a className="dl-btn dlx-ghost" href="#verdict">
                {L('둘러보기 ↓', 'Take a look ↓')}
              </a>
            </div>
          </div>

          <div className="dlx-room" onPointerMove={trackPointer} style={css({ '--r': r })}>
            <div className="dlx-room-in">
              <figure className="dlx-qcard">
                <span className="dlx-qmark" aria-hidden="true">
                  “
                </span>
                <blockquote>
                  {L('친절하라. 당신이 만나는 모든 사람은 힘겨운 싸움을 하고 있으니.', 'Be kind, for everyone you meet is fighting a hard battle.')}
                </blockquote>
                <figcaption>— {L('플라톤?', 'Plato?')}</figcaption>
                <span
                  className="dlx-stamp dlx-st-fake"
                  style={{ opacity: stamp > 0 ? 1 : 0, transform: `translate(-50%, -50%) rotate(-12deg) scale(${lerp(2.6, 1, stamp)})` }}
                >
                  {L(STAMP.fake.ko, STAMP.fake.en)}
                </span>
              </figure>
              <ol className="dlx-ev">
                {EV.map((e, i) => {
                  const t = seg(tl, i / 3, (i + 1) / 3);
                  return (
                    <li key={i} style={{ opacity: t, transform: `translateX(${(1 - t) * 24}px)` }}>
                      <b className={i === 2 ? 'dlx-now' : ''}>{e.y}</b>
                      <span>{e.t}</span>
                    </li>
                  );
                })}
              </ol>
              <p className="dlx-owner" style={{ opacity: owner, transform: `translateY(${(1 - owner) * 10}px)` }}>
                {L('진짜 주인 · 스코틀랜드 목사 이언 매클래런 (1897)', 'Real owner · Ian Maclaren, a Scottish minister (1897)')}
              </p>
            </div>
            <div className="dlx-dark" aria-hidden="true" />
            <span className="dlx-room-hint" style={{ opacity: 1 - clamp(p * 6) }}>
              {L('휠을 굴려 등불을 키우세요', 'Scroll to raise the lamp')} <i aria-hidden="true">↓</i>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 2. 판정 ───────────── */
const DECK: { who: string; v: V; ko: string; en: string; name: [string, string]; note: [string, string] }[] = [
  {
    who: 'marcus',
    v: 'real',
    ko: '최고의 복수는 원수를 닮지 않는 것이다.',
    en: 'The best revenge is not to be like your enemy.',
    name: ['마르쿠스 아우렐리우스', 'Marcus Aurelius'],
    note: ['『명상록』 6권 6장, 그리스어 여섯 단어짜리 메모', 'Meditations 6.6 — a six-word note in Greek'],
  },
  {
    who: 'montaigne',
    v: 'twisted',
    ko: '철학한다는 것은 죽는 법을 배우는 것이다.',
    en: 'To philosophize is to learn how to die.',
    name: ['미셸 드 몽테뉴', 'Michel de Montaigne'],
    note: ['몽테뉴의 장 제목이 맞지만, 첫 문장부터 “키케로가 말하기를”', 'It is his chapter title — but his first line says “Cicero says”'],
  },
  {
    who: 'schopenhauer',
    v: 'fake',
    ko: '행복을 자기 안에서 찾기는 어렵지만, 다른 곳에서 찾기는 불가능하다.',
    en: 'It is difficult to find happiness within oneself, but it is impossible to find it anywhere else.',
    name: ['아르투어 쇼펜하우어', 'Arthur Schopenhauer'],
    note: ['1795년 프랑스 잠언집의 문장. 쇼펜하우어는 인용했을 뿐', 'A French maxim of 1795. Schopenhauer only quoted it'],
  },
  {
    who: 'nietzsche',
    v: 'real',
    ko: '나를 죽이지 않는 것은 나를 더 강하게 만든다.',
    en: 'What does not kill me makes me stronger.',
    name: ['프리드리히 니체', 'Friedrich Nietzsche'],
    note: ['『우상의 황혼』(1889) 「잠언과 화살」 8', 'Twilight of the Idols (1889), “Maxims and Arrows” 8'],
  },
];
const FLY: Record<V, (t: number) => string> = {
  real: (t) => `translate(${t * 135}%, ${-t * 8}%) rotate(${t * 22}deg)`,
  fake: (t) => `translate(${-t * 135}%, ${-t * 8}%) rotate(${-t * 22}deg)`,
  twisted: (t) => `translate(0, ${-t * 150}%) rotate(${t * 4}deg)`,
};

function verdictNote(L: Pick2, done: number) {
  if (done <= 0) return L('카드는 휠에 맞춰 한 장씩 날아갑니다.', 'Cards fly off one by one as you scroll.');
  if (done >= DECK.length)
    return L(
      '맞히면 콤보, 틀리면 인장이 깨집니다. 판정 뒤에는 늘 근거가 열립니다.',
      'Get it right for a combo; get it wrong and a seal cracks. The evidence always opens after.'
    );
  const c = DECK[done - 1];
  return L(`근거 · ${c.note[0]}`, `Evidence · ${c.note[1]}`);
}

function Verdict() {
  const { L } = useLang();
  const [ref, p, still] = usePin<HTMLElement>(1);
  const N = DECK.length;
  const k = still ? N : seg(p, 0.06, 0.92) * N;
  const live = DECK[Math.min(N - 1, Math.floor(k))];
  const done = still ? N : Math.min(N, Math.floor(k + 0.75)); // 도장이 찍힌 장 수
  const dirs: { v: V; key: string; ko: string; en: string }[] = [
    { v: 'real', key: '→', ko: '오른쪽으로 밀면 진짜', en: 'Swipe right — real' },
    { v: 'fake', key: '←', ko: '왼쪽으로 밀면 가짜', en: 'Swipe left — fake' },
    { v: 'twisted', key: '↑', ko: '위로 밀면 변조 — 진짜 출처를 비틀어 퍼진 말', en: 'Swipe up — twisted: a real source, distorted' },
  ];
  return (
    <section className="dlx-verdict" id="verdict" ref={ref}>
      <div className="dlx-pin">
        <div className="dlx-wrap dlx-two">
          <div className="dlx-verdict-copy">
            <p className="dlx-kicker">{L('판정', 'The verdict')}</p>
            <h2 className="dlx-h2">{L('밀어서 판정하세요.', 'Swipe to judge.')}</h2>
            <ul className="dlx-dirs">
              {dirs.map((d) => (
                <li key={d.v} className={`dlx-dir-${d.v} ${!still && k < N && live.v === d.v ? 'dlx-on' : ''}`}>
                  <kbd>{d.key}</kbd>
                  {L(d.ko, d.en)}
                </li>
              ))}
            </ul>
            <div className="dlx-log">
              {DECK.map((c, i) => (
                <span key={c.who} className={`dlx-chip dlx-chip-${c.v} ${i < done ? 'dlx-on' : ''}`}>
                  {L(STAMP[c.v].ko, STAMP[c.v].en)}
                </span>
              ))}
            </div>
            <p className="dlx-note">{verdictNote(L, done)}</p>
          </div>
          <div className={`dlx-deck ${still ? 'dlx-deck-still' : ''}`}>
            {DECK.map((c, i) => {
              const t = clamp(k - i);
              const st = seg(t, 0.04, 0.26);
              const fly = ease(seg(t, 0.5, 1));
              const off = Math.max(0, i - k);
              const style: CSSProperties = still
                ? {}
                : t > 0
                  ? { transform: FLY[c.v](fly), opacity: 1 - seg(fly, 0.7, 1), zIndex: 20 - i }
                  : {
                      transform: `translate(${off * 12}px, ${off * 14}px) rotate(${(i % 2 ? 1 : -1) * off * 2.6}deg) scale(${1 - off * 0.04})`,
                      zIndex: 20 - i,
                    };
              return (
                <figure key={c.who} className={`dlx-card dlx-c-${c.who}`} style={style}>
                  <img src={ART(c.who)} alt="" loading={i < 2 ? 'eager' : 'lazy'} />
                  <div className="dlx-card-txt">
                    <blockquote>“{L(c.ko, c.en)}”</blockquote>
                    <figcaption>— {L(c.name[0], c.name[1])}</figcaption>
                  </div>
                  <span
                    className={`dlx-stamp dlx-st-${c.v}`}
                    style={{
                      opacity: still || st > 0 ? 1 : 0,
                      transform: `translate(-50%, -50%) rotate(-10deg) scale(${still ? 1 : lerp(2.4, 1, slam(st))})`,
                    }}
                  >
                    {L(STAMP[c.v].ko, STAMP[c.v].en)}
                  </span>
                </figure>
              );
            })}
            {!still && (
              <p className="dlx-deck-end" style={{ opacity: seg(k, N - 0.2, N) }}>
                {L('네 장 모두 맞혔다면', 'All four right?')} <b>◆◆◆◆</b>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 3. 사건 파일 ───────────── */
function CaseFile() {
  const { L } = useLang();
  const [ref, p, still] = usePin<HTMLElement>(1);
  const line = still ? 1 : seg(p, 0.08, 0.86);
  const fake = seg(line, 0.62, 0.74);
  const EV = [
    {
      y: '1818',
      tone: 'gold',
      h: L('쇼펜하우어의 진짜 서문', 'Schopenhauer’s real preface'),
      t: L(
        '진리는 역설이라 비난받다가 사소하다고 폄하되기 전, 잠깐 승리할 뿐 — 단계는 둘.',
        'Truth gets a brief victory between being called paradoxical and being called trivial — two stages.'
      ),
    },
    {
      y: '1866',
      tone: 'red',
      h: L('세 단계 공식이 처음 나타남', 'The three-stage formula appears'),
      t: L('다른 학자가 또 다른 사람의 말이라며 ‘조롱 → 반대 → 자명’ 세 단계를 씀.', 'Another scholar writes “ridicule → opposition → self-evident”, crediting someone else.'),
    },
    {
      y: L('지금', 'Now'),
      tone: 'ink',
      h: L('쇼펜하우어의 말로 굳어짐', 'Pinned on Schopenhauer'),
      t: L('세 단계판이 그의 이름을 달고 퍼짐. 그의 글에는 없음.', 'The three-stage version travels under his name. It is not in his writing.'),
    },
  ];
  return (
    <section className="dlx-case" ref={ref}>
      <div className="dlx-pin">
        <div className="dlx-wrap dlx-two dlx-case-grid">
          <div>
            <p className="dlx-kicker">{L('사건 파일', 'The case file')}</p>
            <h2 className="dlx-h2">{L('판정마다, 증거가 따라옵니다.', 'Every verdict comes with evidence.')}</h2>
            <figure className="dlx-suspect dlx-c-schopenhauer">
              <img src={ART('schopenhauer')} alt="" loading="lazy" />
              <blockquote>
                “
                {L(
                  '모든 진리는 세 단계를 거친다. 처음엔 조롱당하고, 다음엔 격렬한 반대에 부딪히며, 마지막엔 자명한 것으로 받아들여진다.',
                  'All truth passes through three stages. First, it is ridiculed. Second, it is violently opposed. Third, it is accepted as being self-evident.'
                )}
                ”
              </blockquote>
              <span
                className="dlx-stamp dlx-st-fake"
                style={{ opacity: fake > 0 ? 1 : 0, transform: `translate(-50%,-50%) rotate(-8deg) scale(${lerp(2.2, 1, slam(fake))})` }}
              >
                {L('가짜', 'FAKE')}
              </span>
            </figure>
          </div>
          <div className="dlx-tl">
            <span className="dlx-tl-line" style={{ transform: `scaleY(${line})` }} aria-hidden="true" />
            {EV.map((e, i) => {
              const t = seg(line, i * 0.3, i * 0.3 + 0.18);
              return (
                <div key={i} className={`dlx-tl-row dlx-tone-${e.tone}`} style={{ opacity: t, transform: `translateY(${(1 - t) * 18}px)` }}>
                  <b>{e.y}</b>
                  <div>
                    <h3>{e.h}</h3>
                    <p>{e.t}</p>
                  </div>
                </div>
              );
            })}
            <p className="dlx-tl-foot" style={{ opacity: seg(line, 0.9, 1) }}>
              {L(
                '처음 나타난 곳과 퍼져 나간 과정을 연표로. 출처 링크로 직접 확인할 수 있습니다.',
                'Where it first appeared and how it spread, as a timeline. Check the source links yourself.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 4. 원문 대조 ───────────── */
function Strike({ t, children }: { t: number; children: ReactNode }) {
  return (
    <span className="dlx-strike" style={css({ '--s': t })}>
      {children}
    </span>
  );
}
/** 퍼진 문장에서 빠진 말 — 교정 부호처럼 끼워 넣는다 */
function Ins({ t, children }: { t: number; children: ReactNode }) {
  return (
    <span className="dlx-ins" style={css({ '--s': t })} aria-label={String(children)}>
      <span>{children}</span>{' '}
    </span>
  );
}
function Original() {
  const { L } = useLang();
  const [ref, p, still] = usePin<HTMLElement>(1);
  const strike = still ? 1 : seg(p, 0.12, 0.36);
  const de = still ? 1 : seg(p, 0.42, 0.62);
  const tr = still ? 1 : seg(p, 0.68, 0.86);
  return (
    <section className="dlx-orig" ref={ref}>
      <div className="dlx-pin">
        <div className="dlx-wrap dlx-orig-in">
          <p className="dlx-kicker">{L('원문 대조', 'Against the original')}</p>
          <h2 className="dlx-h2">{L('퍼진 문장과 원문을 나란히.', 'The viral line, next to the original.')}</h2>
          <blockquote className="dlx-viral">
            “
            {L(
              <>
                괴물과 <Strike t={strike}>싸우지 마라</Strike>, 그대 자신이 괴물이 되지 않도록. 그리고 심연을 <Ins t={strike}>오래</Ins>들여다보면 심연 또한 그대를 들여다본다.
              </>,
              <>
                <Strike t={strike}>Battle not with monsters</Strike>, lest ye become a monster; and if you gaze <Ins t={strike}>long</Ins>into the abyss, the abyss gazes also into you.
              </>
            )}
            ”<small>— {L('인터넷의 니체', 'Nietzsche, according to the internet')}</small>
          </blockquote>
          <div className="dlx-de" style={{ opacity: de, transform: `translateY(${(1 - de) * 20}px)` }}>
            <span className="dlx-lang">Deutsch · {L('『선악의 저편』(1886) 146절', 'Beyond Good and Evil (1886), §146')}</span>
            <p lang="de">
              Wer mit Ungeheuern kämpft, <mark style={css({ '--m': de })}>mag zusehn</mark>, dass er nicht dabei zum Ungeheuer wird. Und wenn du{' '}
              <mark style={css({ '--m': de })}>lange</mark> in einen Abgrund blickst, blickt der Abgrund auch in dich hinein.
            </p>
          </div>
          <div className="dlx-tr" style={{ opacity: tr, transform: `translateY(${(1 - tr) * 16}px)` }}>
            <span className="dlx-lang">{L('편집부 번역', 'Our translation')}</span>
            <p>
              {L(
                <>
                  괴물과 싸우는 자는 그 과정에서 스스로 괴물이 되지 않도록 <b>조심해야 한다</b>. 그리고 네가 <b>오래</b> 심연을 들여다보면, 심연 또한 네 안을 들여다본다.
                </>,
                <>
                  Whoever fights with monsters <b>should see to it</b> that he does not become a monster in the process. And if you gaze <b>long</b> into an abyss, the abyss also gazes into you.
                </>
              )}
            </p>
            <p className="dlx-verdict-line">
              <span className="dlx-chip dlx-chip-twisted dlx-on">{L('변조', 'TWISTED')}</span>
              {L('니체는 “싸우지 마라”고 하지 않았습니다. 싸우는 사람은 스스로를 살피라고 했습니다.', 'Nietzsche never said “don’t fight”. He told the fighter to watch himself.')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 5. 전시실 12곳 ───────────── */
const WINGS: { n: number; ko: string; en: string; sko: string; sen: string; hi: string; lo: string; art?: string }[] = [
  { n: 8, ko: '견습실', en: 'The Training Room', sko: '몸풀기 사건 여덟 개', sen: 'Eight warm-up cases', hi: '#FFC53D', lo: '#2B0F3A', art: 'desk' },
  { n: 10, ko: '마르쿠스관', en: 'The Marcus Room', sko: '황제의 수첩, 그리고 도용', sen: 'The emperor’s notebook, misquoted', hi: '#FF6B8B', lo: '#2B0F3A', art: 'marcus' },
  { n: 10, ko: '로마와 중세관', en: 'Rome and After', sko: '세네카, 키케로, 아우구스티누스, 단테', sen: 'Seneca, Cicero, Augustine, Dante', hi: '#FF8A4C', lo: '#3A1300' },
  { n: 12, ko: '몽테뉴관', en: 'The Montaigne Room', sko: '수상록의 주인과 그의 고양이', sen: 'The essayist and his cat', hi: '#FFC53D', lo: '#3B2300', art: 'montaigne' },
  { n: 13, ko: '쇼펜하우어관', en: 'The Schopenhauer Wing', sko: '오해받은 비관주의', sen: 'Pessimism, misquoted', hi: '#39C2B0', lo: '#062E2A', art: 'schopenhauer' },
  { n: 11, ko: '니체관', en: 'The Nietzsche Vault', sko: '인터넷에서 가장 많이 도용된 이름', sen: 'The most misquoted man online', hi: '#9A88FF', lo: '#170C45', art: 'nietzsche' },
  { n: 13, ko: '아테네관', en: 'The Athens Gallery', sko: '소크라테스, 플라톤, 아리스토텔레스, 그리고 붓다', sen: 'Socrates, Plato, Aristotle — and the Buddha', hi: '#FF8A4C', lo: '#3A1300' },
  { n: 14, ko: '계몽과 혁명관', en: 'Enlightenment & Revolution', sko: '파스칼, 볼테르, 칸트…', sen: 'Pascal, Voltaire, Kant…', hi: '#9A88FF', lo: '#170C45' },
  { n: 11, ko: '근대 위조실', en: 'Modern Forgeries', sko: '유명인의 이름을 빌린 근대의 가짜', sen: 'Modern fakes on famous names', hi: '#39C2B0', lo: '#062E2A' },
  { n: 7, ko: '20세기 위조실', en: '20th-Century Forgeries', sko: '포스터에 붙은 그 이름들', sen: 'The names on the posters', hi: '#FFC53D', lo: '#2B0F3A' },
  { n: 13, ko: '한국 특별관: 교과서', en: 'Made in Korea: Textbooks', sko: '학교에서 배운 그 명언', sen: 'What we learned at school', hi: '#FF6B8B', lo: '#170C45' },
  { n: 14, ko: '한국 특별관: 인터넷', en: 'Made in Korea: The Internet', sko: '한국에서 유독 유명한 가짜들', sen: 'Fakes that went viral in Korea', hi: '#39C2B0', lo: '#170C45' },
];

function Galleries() {
  const { L } = useLang();
  const [ref, p, still] = usePin<HTMLElement>(1);
  const track = useRef<HTMLDivElement | null>(null);
  const [max, setMax] = useState(0);
  useEffect(() => {
    const m = () => {
      const el = track.current;
      if (el) setMax(Math.max(0, el.scrollWidth - el.clientWidth));
    };
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);
  const q = still ? 1 : seg(p, 0.05, 0.8);
  const reveal = still ? 1 : ease(seg(p, 0.84, 0.96));
  const caught = still ? WINGS.length : Math.min(WINGS.length, Math.floor(q * (WINGS.length + 0.6)));
  return (
    <section className="dlx-gal" ref={ref}>
      <div className="dlx-pin dlx-pin-col">
        <div className="dlx-wrap dlx-gal-head">
          <div>
            <p className="dlx-kicker">{L('전시실 12곳 · 사건 136건', '12 galleries · 136 cases')}</p>
            <h2 className="dlx-h2">{L('방마다 위조범이 기다립니다.', 'A forger waits in every room.')}</h2>
          </div>
          <div className="dlx-count" aria-hidden="true">
            <b>{String(caught).padStart(2, '0')}</b>
            <span>/ 12 {L('검거', 'caught')}</span>
          </div>
        </div>
        <div className="dlx-track" ref={track}>
          <div className="dlx-track-in" style={{ transform: `translateX(${-(still ? 0 : q * max)}px)` }}>
            {WINGS.map((w, i) => (
              <article key={w.ko} className={`dlx-wing ${i < caught ? 'dlx-caught' : ''}`} style={css({ '--hi': w.hi, '--lo': w.lo })}>
                <span className="dlx-wing-no">{String(i + 1).padStart(2, '0')}</span>
                <div className="dlx-wing-art">
                  {w.art ? <img src={ART(w.art)} alt="" loading="lazy" /> : <span aria-hidden="true">“</span>}
                </div>
                <h3>{L(w.ko, w.en)}</h3>
                <p>{L(w.sko, w.sen)}</p>
                <small>{L(`사건 ${w.n}건 · 위조범 1명`, `${w.n} cases · 1 forger`)}</small>
                <i className="dlx-wanted">{L('검거', 'CAUGHT')}</i>
              </article>
            ))}
            <article className="dlx-wing dlx-boss" style={css({ '--f': reveal })}>
              <div className="dlx-boss-in">
                <div className="dlx-boss-a">
                  <span className="dlx-wing-no">13</span>
                  <b className="dlx-boss-q">?</b>
                  <h3>{L('두목', 'The Kingpin')}</h3>
                  <p>{L('열두 명을 모두 잡으면, 그 뒤에 숨은 두목에게 이어집니다.', 'Catch all twelve and the trail leads to the one behind them.')}</p>
                </div>
                <div className="dlx-boss-b">
                  <span className="dlx-wing-no">13</span>
                  <b className="dlx-boss-q">“ ”</b>
                  <h3>{L('출처 미상', 'Author Unknown')}</h3>
                  <p>{L('확인 없이 퍼 나른, 우리 모두.', 'Everyone who shared it without checking.')}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
        <p className="dlx-wrap dlx-gal-foot">
          {L(
            '방마다 인장은 몇 개뿐. 틀리면 하나가 깨지고, 모두 깨지면 파면입니다. 방의 끝에서는 세 문장 중 진짜 하나를 골라 위조범을 잡으세요.',
            'Each room gives you only a few seals. A wrong call cracks one; lose them all and you’re dismissed. At the end of each room, pick the one genuine line out of three to catch the forger.'
          )}
        </p>
      </div>
    </section>
  );
}

/* ───────────── 6. 오늘의 사건 ───────────── */
function caseNo() {
  // 앱과 같은 규칙: 2026-10-01 이 1번, 하루에 하나씩
  const start = Date.UTC(2026, 9, 1);
  const now = new Date();
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.max(1, Math.floor((today - start) / 86400000) + 1);
}
function Daily() {
  const { L, lang } = useLang();
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [no, setNo] = useState(14);
  const [n, setN] = useState(0);
  useEffect(() => setNo(caseNo()), []);
  const text = `Diogenes’ Lamp · Case No. ${no}\n◆◆◇◆◆ 4/5`;
  useEffect(() => {
    if (!seen) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setN(i);
      if (i >= text.length) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, [seen, text.length]);
  return (
    <section className="dlx-daily">
      <div className="dlx-wrap dlx-two" ref={ref}>
        <div>
          <p className="dlx-kicker">{L('오늘의 사건', 'Today’s case')}</p>
          <h2 className="dlx-h2">{L('매일, 모두가 같은 다섯 문장.', 'Every day, the same five lines for everyone.')}</h2>
          <p className="dlx-body">
            {L(
              '날마다 모두가 같은 명언 다섯 개를 감정합니다. 결과는 정답을 드러내지 않는 기호로 나눌 수 있어요.',
              'Each day everyone appraises the same five quotes. Share your result as symbols that don’t give the answers away.'
            )}
          </p>
          <pre className="dlx-share" aria-label={text}>
            {seen ? text.slice(0, n) : ''}
            <span className="dlx-caret" aria-hidden="true" />
          </pre>
          <p className="dlx-note">{L(`오늘은 ${no}번 사건입니다. ◆ 정답 · ◇ 오답`, `Today is case No. ${no}. ◆ right · ◇ wrong`)}</p>
        </div>
        <div className="dlx-phones">
          <img className="dlx-phone" src={`/diogeneslamp/shot/${lang}-07.webp`} alt={L('오늘의 사건 화면', 'Today’s case screen')} loading="lazy" />
          <img className="dlx-phone dlx-phone-b" src={`/diogeneslamp/shot/${lang}-05.webp`} alt={L('출처 추적 화면', 'Source trace screen')} loading="lazy" />
        </div>
      </div>
    </section>
  );
}

/* ───────────── 7. 원문 서고 · 화면 ───────────── */
function Screens() {
  const { L, lang } = useLang();
  const [ref, seen] = useSeen<HTMLDivElement>();
  const shots = [
    { f: '01', ko: '밀어서 판정', en: 'Swipe to judge' },
    { f: '02', ko: '가짜의 증거 파일', en: 'Evidence for a fake' },
    { f: '03', ko: '위조범 대면', en: 'Face the forger' },
    { f: '06', ko: '전시실', en: 'The galleries' },
    { f: '08', ko: '원문과 편집부 번역', en: 'Original and our translation' },
  ];
  return (
    <section className="dlx-screens">
      <div className="dlx-wrap">
        <p className="dlx-kicker">{L('원문 서고', 'The library of originals')}</p>
        <h2 className="dlx-h2">{L('풀 때마다, 원문이 한 권씩 꽂힙니다.', 'Solve a case, shelve an original.')}</h2>
        <p className="dlx-body">
          {L(
            '진짜·변조 사건을 풀면 그 원문이 서고에 꽂힙니다. 모두 80편이 넘습니다. 그리스어·라틴어·독일어·프랑스어 원문과 편집부의 새 번역을 나란히 읽으세요.',
            'Each real or twisted case you solve shelves its original — more than 80 in all. Read the Greek, Latin, German or French next to our own new translation.'
          )}
        </p>
      </div>
      <div className={`dlx-shots ${seen ? 'dlx-in' : ''}`} ref={ref}>
        {shots.map((s, i) => (
          <figure key={s.f} style={css({ '--i': i })}>
            <img src={`/diogeneslamp/shot/${lang}-${s.f}.webp`} alt={L(s.ko, s.en)} loading="lazy" />
            <figcaption>{L(s.ko, s.en)}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ───────────── 8. 약속 · 받기 ───────────── */
function Deal() {
  const { L } = useLang();
  const items: [string, string][] = [
    [L('한 번 구입', 'Buy once'), L('구독도, 앱 안 추가 결제도 없습니다', 'No subscription, no in-app purchases')],
    [L('광고 없음', 'No ads'), L('판정 사이에 끼어드는 것이 없습니다', 'Nothing between you and the case')],
    [L('계정 없음', 'No account'), L('가입 없이 바로 시작합니다', 'Start straight away')],
    [L('데이터 수집 없음', 'No data collection'), L('진행 기록은 기기 안에만', 'Your progress stays on your device')],
    [L('오프라인 플레이', 'Plays offline'), L('인터넷 없이도 됩니다', 'No connection needed')],
    [L('한국어 · English', 'English · 한국어'), L('기기 언어를 따르고, 언제든 바꿀 수 있습니다', 'Follows your device; switch any time')],
  ];
  return (
    <section className="dlx-deal">
      <div className="dlx-wrap">
        <p className="dlx-kicker">{L('한 번 구입', 'One purchase')}</p>
        <h2 className="dlx-h2">{L('사면 끝. 그다음은 없습니다.', 'Buy it once. That’s it.')}</h2>
        <ul className="dlx-grid">
          {items.map(([a, b]) => (
            <li key={a}>
              <b>{a}</b>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <p className="dlx-note">
          {L('판정이 틀린 것 같다면 앱 안의 ‘오류 제보’로 알려 주세요. 확인해서 고칩니다.', 'Think a verdict is wrong? Use “Report an error” in the app — we check and fix it.')}{' '}
          <Link href="/diogeneslamp/support">{L('지원 페이지 →', 'Support →')}</Link>
        </p>
      </div>
    </section>
  );
}

function Final() {
  const { L } = useLang();
  return (
    <section className="dlx-final" onPointerMove={trackPointer}>
      <div className="dlx-wrap dlx-final-in">
        <img src="/diogeneslamp/icon-256.webp" width={96} height={96} alt="" className="dlx-final-icon" />
        <p className="dlx-anecdote">
          {L(
            '디오게네스는 대낮에 등불을 들고 아테네를 걸었다. “사람을 찾고 있소.”',
            'Diogenes walked Athens with a lamp in broad daylight. “I am looking for a human.”'
          )}
        </p>
        <h2 className="dlx-h2">
          {L(
            <>
              그의 등불을 들고,
              <br />
              진짜 명언을 찾으세요.
            </>,
            <>
              Take up his lamp
              <br />
              and look for the real quote.
            </>
          )}
        </h2>
        <div className="dlx-cta dlx-center">
          <StoreButton primary />
          <Link className="dl-btn dlx-ghost" href="/diogeneslamp/support">
            {L('지원 · 자주 묻는 질문', 'Support & FAQ')}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomeContent() {
  useDocTitle('디오게네스의 등불 — 그 명언, 진짜일까?', 'Diogenes’ Lamp — Fake or Sage? Find the source');
  return (
    <div className="dlx">
      <Lamp />
      <Verdict />
      <CaseFile />
      <Original />
      <Galleries />
      <Daily />
      <Screens />
      <Deal />
      <Final />
    </div>
  );
}
