'use client';
/* eslint-disable @next/next/no-img-element */

/**
 * 현자의 서재 랜딩 — 스크롤 인터랙티브.
 *  · 히어로: 원탁 화면을 띄운 아이폰 + 양옆으로 벌어지는 필사·카드 화면
 *  · 원탁(sticky): 스크롤에 따라 네 자리를 돌며 그 현자의 답과 폰 화면이 함께 바뀐다
 *  · 구절 한 장: 원문 → 음독 → 번역 → 풀이를 눌러 층층이 펼친다
 *  · 필사: 한글 줄 공책 / 한문 원고지 전환 · 낙관 · 어록 · 카드 · 프라이버시
 * 본문과 구절은 앱의 content.json(파일럿 w1 '나를 함부로 대하는 사람이 있을 때')과
 * docs/METADATA_KO.md 문안을 그대로 가져왔다. 수량(고민·구절 편수)은 정식판 확정 전이라 적지 않는다.
 * 화면 사진은 앱 웹 빌드(web/index.html)를 아이폰 크기로 띄워 그대로 찍은 것이다.
 */

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { StoreButton } from './chrome';
import { useDocTitle, useLang } from './i18n';
import { reduceMotion, useCrossProgress, useInView, useScrollProgress } from './motion';

const SHOT = (f: string) => `/hyunja/shot/${f}`;
const ART = (f: string) => `/hyunja/art/${f}`;
const css = (o: Record<string, string | number>) => o as CSSProperties;

/* 화면에 들어오면 나타나는 껍데기 */
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
    <Tag
      ref={ref}
      className={`hj-rv ${inView ? 'hj-in' : ''} ${className}`}
      style={delay ? css({ transitionDelay: `${delay}ms` }) : undefined}
    >
      {children}
    </Tag>
  );
}

/** 아이폰 목업 — 여러 화면을 겹쳐 두고 i 번째만 보여 준다 */
function Phone({
  shots,
  i = 0,
  alt,
  className = '',
  small = false,
}: {
  shots: string[];
  i?: number;
  alt: string;
  className?: string;
  small?: boolean;
}) {
  return (
    <div className={`hj-phone ${small ? 'hj-phone-sm' : ''} ${className}`}>
      <div className="hj-screen">
        {shots.map((s, k) => (
          <img
            key={s}
            src={SHOT(s)}
            width={560}
            height={1211}
            alt={k === i ? alt : ''}
            className={k === i ? 'hj-show' : ''}
            loading={k === 0 ? 'eager' : 'lazy'}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================== 히어로 ============================== */
function Hero() {
  const { L } = useLang();
  const ref = useScrollProgress<HTMLElement>();
  return (
    <section className="hj-hero" ref={ref}>
      <div className="hj-wrap hj-hero-copy">
        <Reveal as="p" className="hj-kicker">
          {L('공자 · 맹자 · 순자 · 노자', 'Confucius · Mencius · Xunzi · Laozi')}
        </Reveal>
        <Reveal as="h1" className="hj-h1" delay={80}>
          {L(
            <>
              고민 하나에,
              <br />
              <em>네 현자의 답.</em>
            </>,
            <>
              One worry,
              <br />
              <em>four answers.</em>
            </>
          )}
        </Reveal>
        <Reveal as="p" className="hj-lead" delay={160}>
          {L(
            '삶의 고민 하나를 고르면 네 현자가 각자의 자리에서 답합니다. 마음이 가는 말을 골라 손으로 따라 쓰고, 오늘의 한 줄을 남기면 하루하루가 내 이름의 어록 한 권이 됩니다.',
            'Pick one of life’s worries and four classical thinkers answer from their own seat. Choose the one that speaks to you, trace it by hand, and leave a line of your own — day by day it becomes a book under your name.'
          )}
        </Reveal>
        <Reveal className="hj-cta-row hj-center" delay={240}>
          <StoreButton />
          <a className="hj-btn" href="#table">
            {L('둘러보기 ↓', 'Take a look ↓')}
          </a>
        </Reveal>
        <Reveal as="ul" className="hj-pills" delay={300}>
          <li>{L('한 번 구매', 'Buy once')}</li>
          <li>{L('광고 없음', 'No ads')}</li>
          <li>{L('회원 가입 없음', 'No account')}</li>
          <li>{L('iPhone · iPad', 'iPhone and iPad')}</li>
        </Reveal>
      </div>

      <div className="hj-hero-stage" aria-hidden="true">
        <div className="hj-float hj-float-l">
          <img src={SHOT('copy-hanmun.webp')} width={560} height={1211} alt="" />
        </div>
        <Phone shots={['table.webp']} alt="" className="hj-hero-phone" />
        <div className="hj-float hj-float-r">
          <img src={SHOT('card.webp')} width={560} height={1211} alt="" />
        </div>
      </div>
    </section>
  );
}

/* ============================== 섹션 안 내비 ============================== */
function SubNav() {
  const { L } = useLang();
  const [cur, setCur] = useState('');
  useEffect(() => {
    const ids = ['table', 'passage', 'copy', 'seal', 'book', 'card', 'privacy-sec'];
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCur(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  const links: [string, string][] = [
    ['table', L('원탁', 'Round table')],
    ['passage', L('구절', 'Passage')],
    ['copy', L('필사', 'Tracing')],
    ['seal', L('낙관', 'Seal')],
    ['book', L('어록', 'My book')],
    ['card', L('카드', 'Cards')],
    ['privacy-sec', L('기록', 'Privacy')],
  ];
  return (
    <nav className="hj-subnav" aria-label={L('페이지 안 이동', 'On this page')}>
      <div className="hj-wrap hj-subnav-in">
        {links.map(([id, t]) => (
          <a key={id} href={`#${id}`} className={cur === id ? 'hj-on' : ''}>
            {t}
          </a>
        ))}
      </div>
    </nav>
  );
}

/* ============================== 원탁 (sticky) ============================== */
const SAGES = [
  {
    id: 'kongzi',
    ko: '공자',
    en: 'Confucius',
    hanja: '孔',
    coreKo: '인(仁)과 예(禮), 관계의 도리',
    coreEn: 'Benevolence and ritual — how we treat each other',
    gistKo: '참지도 앙갚음하지도 말고, 곧게 대하라',
    gistEn: 'Neither swallow it nor strike back — answer with straightness',
    noteKo:
      '무례를 무조건 참으라는 말이 아닙니다. 감정대로 되갚지도, 억지로 웃어넘기지도 말고 공정한 선을 그으라는 뜻입니다.',
    noteEn:
      'Not a call to endure rudeness. Do not repay in kind, and do not force a smile either — draw a fair line.',
    srcKo: '『논어』 헌문편 36장',
    srcEn: 'Analects 14.36',
  },
  {
    id: 'mengzi',
    ko: '맹자',
    en: 'Mencius',
    hanja: '孟',
    coreKo: '사람의 본성은 선하다',
    coreEn: 'Human nature is good',
    gistKo: '먼저 나를 돌아보고, 그래도 떳떳하면 마음을 거두라',
    gistEn: 'Look at yourself first; if you stand clear, let it go',
    noteKo:
      '돌아봐도 잘못이 없다면 그 사람의 몫입니다. 거기까지가 내가 할 일이라고 맹자는 말합니다.',
    noteEn:
      'If you look and find no fault of your own, the rest belongs to them. That, says Mencius, is where your part ends.',
    srcKo: '『맹자』 이루 하편 28장',
    srcEn: 'Mencius 4B.28',
  },
  {
    id: 'xunzi',
    ko: '순자',
    en: 'Xunzi',
    hanja: '荀',
    coreKo: '본성은 거칠고, 배움이 사람을 만든다',
    coreEn: 'Nature is rough; learning makes a person',
    gistKo: '기분 나쁜 말 속에 맞는 말이 있는지 가려라',
    gistEn: 'Sort out whether the hurtful words hold anything true',
    noteKo:
      '기분과 사실을 갈라 보라는 쪽입니다. 맞는 말이면 고치고, 아니면 흘려보내면 됩니다.',
    noteEn:
      'Separate the sting from the substance: fix what is true, and let the rest pass.',
    srcKo: '『순자』 수신편',
    srcEn: 'Xunzi, “Self-cultivation”',
  },
  {
    id: 'laozi',
    ko: '노자',
    en: 'Laozi',
    hanja: '老',
    coreKo: '무위(無爲), 물처럼 낮게',
    coreEn: 'Non-striving — low like water',
    gistKo: '원한을 품고 있는 것부터 내려놓아라',
    gistEn: 'Begin by setting down the grudge itself',
    noteKo:
      '공자와 정면으로 갈리는 대목입니다. 원한을 붙들고 있는 일부터 내려놓으라는 말입니다.',
    noteEn:
      'Here Laozi parts ways with Confucius: the first thing to put down is the holding on.',
    srcKo: '『도덕경』 63장',
    srcEn: 'Tao Te Ching 63',
  },
];

function RoundTable() {
  const { L } = useLang();
  const [i, setI] = useState(0);
  const ref = useScrollProgress<HTMLElement>((p) => {
    if (reduceMotion()) return;
    const next = Math.min(SAGES.length - 1, Math.max(0, Math.floor((p - 0.08) / 0.21)));
    setI((o) => (o === next ? o : next));
  });
  const cur = SAGES[i];
  return (
    <section id="table" className="hj-table" ref={ref}>
      <div className="hj-sticky">
        <div className="hj-wrap hj-table-grid">
          <div className="hj-round" aria-hidden="true">
            {SAGES.map((s, k) => (
              <span key={s.id} className={`hj-seat hj-seat-${k} ${k === i ? 'hj-on' : ''}`}>
                <img src={ART(`${s.id}-face.webp`)} width={220} height={220} alt="" loading="lazy" />
              </span>
            ))}
            <span className="hj-round-mid">
              <b>{L(cur.ko, cur.en)}</b>
              <span>{L('곁에 앉았습니다', 'You take the seat beside them')}</span>
            </span>
          </div>

          <div>
            <p className="hj-kicker">{L('네 현자의 원탁', 'The round table')}</p>
            <h2 style={{ fontSize: 'clamp(26px, 3.4vw, 40px)', marginBottom: 18 }}>
              {L('나를 함부로 대하는 사람이 있을 때', 'When someone treats you badly')}
            </h2>
            <div className="hj-answer">
              {SAGES.map((s, k) => (
                <article key={s.id} className={`hj-a ${k === i ? 'hj-on' : ''}`} aria-hidden={k !== i}>
                  <div className="hj-who">
                    <img src={ART(`${s.id}-face.webp`)} width={92} height={92} alt="" loading="lazy" />
                    <span>
                      <b>{L(s.ko, s.en)}</b>
                      <br />
                      <span>{L(s.coreKo, s.coreEn)}</span>
                    </span>
                  </div>
                  <h3>{L(s.gistKo, s.gistEn)}</h3>
                  <p>{L(s.noteKo, s.noteEn)}</p>
                  <cite>{L(s.srcKo, s.srcEn)}</cite>
                </article>
              ))}
            </div>
            <div className="hj-dots" aria-hidden="true">
              {SAGES.map((s, k) => (
                <i key={s.id} className={k === i ? 'hj-on' : ''} />
              ))}
            </div>
            <p style={{ marginTop: 22, color: 'var(--hj-ink-2)', fontSize: 15.5 }}>
              {L(
                '네 사람의 답은 서로 다릅니다. 같은 고민에 곧게 맞서라는 말과 내려놓으라는 말이 함께 놓입니다. 어느 쪽이 지금 나에게 맞는지 고르면 됩니다.',
                'The four answers disagree. “Stand straight” and “let it go” sit side by side on the same worry — you choose the one that fits you today.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== 구절 한 장 ============================== */
/* 층층이 펼쳐지는 네 겹(원문·음독·번역·풀이)을 스크롤 진행도에 묶는다.
   올라가면 되감기고, 눌러서 직접 열 수도 있다(누르면 그 뒤로는 손을 따른다). */
function Passage() {
  const { L } = useLang();
  const [pick, setPick] = useState<number | null>(null);
  const [ref, p] = useCrossProgress<HTMLElement>();
  const byScroll = Math.max(0, Math.min(3, Math.floor((p - 0.3) / 0.11)));
  const open = pick ?? (reduceMotion() ? 3 : byScroll);

  return (
    <section id="passage" ref={ref}>
      <div className="hj-wrap hj-split">
        <div>
          <Reveal>
            <p className="hj-kicker">{L('구절 한 장', 'One passage')}</p>
            <div className="hj-head">
              <h2>
                {L(
                  <>
                    원문부터 풀이까지,
                    <br />한 장에.
                  </>,
                  <>
                    From the original
                    <br />
                    to the reading.
                  </>
                )}
              </h2>
              <p>
                {L(
                  '구절마다 원문과 한국 한자음, 우리말 번역, 짧은 풀이, 출처를 함께 싣습니다. 원문은 필요할 때만 펼쳐 볼 수 있고, 세로쓰기로도 읽을 수 있습니다.',
                  'Every passage carries the original text, its Korean reading, our translation, a short commentary and the chapter reference. The original opens only when you want it, and can be read vertically too.'
                )}
              </p>
            </div>
          </Reveal>
          <div className="hj-steps" role="tablist" aria-label={L('구절 펼치기', 'Open the passage')}>
            {[
              L('원문', 'Original'),
              L('음독', 'Reading'),
              L('번역', 'Translation'),
              L('풀이', 'Commentary'),
            ].map((t, k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={open >= k}
                className={open >= k ? 'hj-on' : ''}
                onClick={() => setPick(k)}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="hj-meta">
            {L('스크롤을 내리면 한 겹씩 펼쳐집니다.', 'Scroll on and it opens a layer at a time.')}
          </p>
        </div>

        <Reveal className="hj-passage" delay={100}>
          <p className="hj-orig">或曰：「以德報怨，何如？」子曰：「何以報德？以直報怨，以德報德。」</p>
          <div className={`hj-layer ${open >= 1 ? 'hj-open' : ''}`}>
            <div className="hj-layer-in">
              <p className="hj-eum" style={{ margin: 0 }}>
                혹왈 이덕보원 하여 / 자왈 하이보덕 이직보원 이덕보덕
              </p>
            </div>
          </div>
          <div className={`hj-layer ${open >= 2 ? 'hj-open' : ''}`}>
            <div className="hj-layer-in">
              <p style={{ margin: 0, fontSize: 17 }}>
                {L(
                  '누군가 물었다. "덕으로 원한을 갚으면 어떻습니까?" 공자께서 말씀하셨다. "그러면 덕은 무엇으로 갚겠느냐? 곧음으로 원한을 갚고, 덕으로 덕을 갚아야 한다."',
                  'Someone asked: “What if I repay resentment with kindness?” The Master said: “Then with what will you repay kindness? Repay resentment with straightness, and kindness with kindness.”'
                )}
              </p>
            </div>
          </div>
          <div className={`hj-layer ${open >= 3 ? 'hj-open' : ''}`}>
            <div className="hj-layer-in">
              <p style={{ margin: 0, color: 'var(--hj-ink-2)' }}>
                {L(
                  '무례를 무조건 참으라는 말이 아닙니다. 감정대로 되갚지도, 억지로 웃어넘기지도 말고 공정한 선을 그으라는 뜻입니다. 좋은 사람에게 줄 따뜻함까지 무례한 사람에게 써 버리지 말라는 말이기도 합니다.',
                  'This is not a call to endure rudeness. Do not repay in kind, and do not force a smile — draw a fair line. It also says: do not spend on a rude person the warmth you owe to a good one.'
                )}
              </p>
              <p className="hj-eum" style={{ marginTop: 14 }}>
                {L('『논어』 헌문편 36장', 'Analects, Book 14, Chapter 36')}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== 필사 ============================== */
function Copying() {
  const { L } = useLang();
  const [tab, setTab] = useState(0);
  return (
    <section id="copy">
      <div className="hj-wrap hj-split hj-rev">
        <div>
          <Reveal>
            <p className="hj-kicker">{L('필사', 'Tracing')}</p>
            <div className="hj-head">
              <h2>
                {L(
                  <>
                    손으로 한 번 쓰면
                    <br />
                    다르게 남습니다.
                  </>,
                  <>
                    Write it once by hand
                    <br />
                    and it stays with you.
                  </>
                )}
              </h2>
              <p>
                {L(
                  '흐린 글씨 위를 손가락이나 Apple Pencil로 따라 씁니다. 한글 번역은 줄 공책에, 한문 원문은 원고지 칸에 씁니다. 천천히 그으면 굵게, 빠르게 그으면 가늘게 먹이 묻어납니다.',
                  'Trace the pale guide with a finger or Apple Pencil. The Korean translation goes on lined paper, the classical Chinese into a square manuscript grid. Draw slowly and the ink runs thick; quickly and it thins out.'
                )}
              </p>
            </div>
            <div className="hj-tabs" role="tablist" aria-label={L('필사 모드', 'Tracing mode')}>
              {[L('한글 줄 공책', 'Lined paper'), L('한문 원고지', 'Manuscript grid')].map((t, k) => (
                <button
                  key={k}
                  type="button"
                  role="tab"
                  aria-selected={tab === k}
                  className={tab === k ? 'hj-on' : ''}
                  onClick={() => setTab(k)}
                >
                  {t}
                </button>
              ))}
            </div>
            <p style={{ marginTop: 20, color: 'var(--hj-ink-2)', fontSize: 15.5 }}>
              {L(
                '다 쓰면 나의 낙관이 찍히고, 그 글씨는 필사 카드로 만들 수 있습니다.',
                'When you finish, your seal is stamped on it — and the sheet can become a card.'
              )}
            </p>
          </Reveal>
        </div>
        <Reveal className="hj-cta-row hj-center" delay={100}>
          <Phone
            shots={['copy-ko.webp', 'copy-hanmun.webp']}
            i={tab}
            alt={L(
              tab === 0 ? '한글 번역을 줄 공책에 따라 쓰는 화면' : '한문 원문을 원고지 칸에 따라 쓰는 화면',
              tab === 0 ? 'Tracing the Korean translation on lined paper' : 'Tracing the classical Chinese in a manuscript grid'
            )}
          />
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== 낙관 ============================== */
function Seal() {
  const { L } = useLang();
  const [tab, setTab] = useState(0);
  return (
    <section id="seal">
      <div className="hj-wrap hj-split">
        <Reveal className="hj-cta-row hj-center">
          <Phone
            shots={['seal.webp', 'seal-hanja.webp']}
            i={tab}
            alt={L(
              tab === 0 ? '한글 이름 홍길동을 백문으로 새긴 낙관' : '한자 이름 洪吉童을 주문으로 새긴 낙관',
              tab === 0
                ? 'A seal carved from the Korean name Hong Gil-dong, cut in white'
                : 'A seal carved from the Chinese characters 洪吉童, left in red'
            )}
          />
        </Reveal>
        <Reveal delay={100}>
          <p className="hj-kicker">{L('나의 낙관', 'Your seal')}</p>
          <div className="hj-head">
            <h2>
              {L(
                <>
                  이름을 적으면
                  <br />
                  인장이 새겨집니다.
                </>,
                <>
                  Type your name,
                  <br />
                  and a seal is carved.
                </>
              )}
            </h2>
            <p>
              {L(
                '한글로 적어도, 한자로 적어도 됩니다. 흰 글씨를 파낸 백문과 붉은 글씨를 남긴 주문 가운데 고르세요. 두 자는 ‘之印’을, 세 자는 ‘印’을 더해 네 칸으로 새기고 오른쪽 줄부터 읽습니다.',
                'Write it in Hangul or in Chinese characters. Choose a baekmun seal, where the characters are cut away and print white, or a jumun seal, where they stay and print red. Two-character names add “之印” and three-character names add “印” to fill four squares, read from the right-hand column.'
              )}
            </p>
          </div>
          <div className="hj-tabs" role="tablist" aria-label={L('낙관 새김 방식', 'Seal style')}>
            {[L('홍길동 · 백문', 'Hangul · baekmun'), L('洪吉童 · 주문', 'Hanja · jumun')].map((t, k) => (
              <button
                key={k}
                type="button"
                role="tab"
                aria-selected={tab === k}
                className={tab === k ? 'hj-on' : ''}
                onClick={() => setTab(k)}
              >
                {t}
              </button>
            ))}
          </div>
          <p style={{ marginTop: 20, color: 'var(--hj-ink-2)', fontSize: 15.5 }}>
            {L(
              '이 낙관이 필사 끝에, 어록 표지에, 카드 귀퉁이에 찍힙니다.',
              'This seal is stamped at the end of a tracing, on your book cover and in the corner of a card.'
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== 어록 (sticky · 세 박자) ============================== */
/* 이 앱의 셀링 포인트. 한 줄 → 펼침면 → 한 권으로 넘어가는 장면을 스크롤에 묶었다.
   화면을 올리면 그대로 되감긴다. */
const BEATS = [
  {
    img: 'record.webp',
    kickerKo: '오늘',
    kickerEn: 'Today',
    hKo: '오늘은 한 줄이었습니다.',
    hEn: 'Today it was one line.',
    pKo: '고민 하나를 읽고, 마음이 가는 현자 곁에 앉고, 오늘의 질문에 한 줄로 답합니다. 쓰는 데 걸리는 시간은 일 분 남짓입니다.',
    pEn: 'Read one worry, take the seat beside the sage who speaks to you, and answer the day’s question in a single line. It takes about a minute.',
  },
  {
    img: 'book-spread.webp',
    kickerKo: '한 달',
    kickerEn: 'A month',
    hKo: '왼쪽엔 현자의 말, 오른쪽엔 나의 말.',
    hEn: 'The sage at left, you at right.',
    pKo: '한 장을 펼치면 그날 읽은 구절과 그날의 내 문장이 마주 봅니다. 달마다 차례가 생기고 쪽 번호가 매겨집니다.',
    pEn: 'Open a spread and the passage you read that day faces the sentence you wrote. Months become chapters, and the pages are numbered.',
  },
  {
    img: 'book-cover.webp',
    kickerKo: '한 해',
    kickerEn: 'A year',
    hKo: '그리고 내 이름의 책이 됩니다.',
    hEn: 'And it becomes a book with your name on it.',
    pKo: '표지에는 내 이름과 내 낙관이 찍힙니다. 올해 몇 편을 남겼는지, 어느 현자 곁에 자주 앉았는지도 여기에 적힙니다.',
    pEn: 'Your name and your seal go on the cover, along with how many entries you left this year and whose seat you took most often.',
  },
];

function Book() {
  const { L } = useLang();
  const [i, setI] = useState(0);
  const ref = useScrollProgress<HTMLElement>((p) => {
    if (reduceMotion()) return;
    const next = Math.min(BEATS.length - 1, Math.max(0, Math.floor((p - 0.04) / 0.26)));
    setI((o) => (o === next ? o : next));
  });
  return (
    <section id="book" className="hj-book" ref={ref}>
      <div className="hj-sticky">
        <div className="hj-wrap hj-book-grid">
          <div className="hj-book-stage" aria-hidden="true">
            <div className={`hj-book-slot ${i === 0 ? 'hj-on' : ''}`}>
              <Phone shots={['record.webp']} alt="" />
            </div>
            <div className={`hj-book-slot hj-piece ${i === 1 ? 'hj-on' : ''}`}>
              <img src="/hyunja/piece/book-spread.webp" width={760} height={922} alt="" loading="lazy" />
            </div>
            <div className={`hj-book-slot hj-piece hj-piece-cover ${i === 2 ? 'hj-on' : ''}`}>
              <img src="/hyunja/piece/book-cover.webp" width={760} height={613} alt="" loading="lazy" />
            </div>
          </div>

          <div>
            <p className="hj-kicker">{L('나의 어록', 'Your own book')}</p>
            <h2 className="hj-book-h2">
              {L('하루 한 줄이 쌓여 한 권이 됩니다.', 'A line a day becomes a book.')}
            </h2>
            <div className="hj-beats">
              {BEATS.map((b, k) => (
                <div key={b.img} className={`hj-beat ${k === i ? 'hj-on' : ''}`} aria-hidden={k !== i}>
                  <span className="hj-beat-no">{L(b.kickerKo, b.kickerEn)}</span>
                  <h3>{L(b.hKo, b.hEn)}</h3>
                  <p>{L(b.pKo, b.pEn)}</p>
                </div>
              ))}
            </div>
            <div className="hj-dots" aria-hidden="true">
              {BEATS.map((b, k) => (
                <i key={b.img} className={k === i ? 'hj-on' : ''} />
              ))}
            </div>
            <p className="hj-quote">
              {L(
                '현자의 말로 시작해, 나의 문장으로 끝나는 책.',
                'A book that opens in the words of a sage and closes in your own.'
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== 오늘의 구절 · 카드 ============================== */
/* 공유 카드가 주인공이라 카드를 폰 바깥으로 꺼내 크게 둔다.
   등장은 스크롤 진행도에 묶여 있어 올리면 되감긴다. */
function Cards() {
  const { L } = useLang();
  const [ref, p] = useCrossProgress<HTMLElement>();
  const show = reduceMotion() ? 1 : Math.max(0, Math.min(1, (p - 0.2) / 0.28));
  const lift = (d: number) => {
    if (reduceMotion()) return undefined;
    const v = Math.max(0, Math.min(1, (show - d) / Math.max(0.001, 1 - d)));
    return css({ opacity: v, transform: `translateY(${(1 - v) * 40}px)` });
  };

  return (
    <section id="card" ref={ref}>
      <div className="hj-wrap">
        <div className="hj-head hj-center" style={lift(0)}>
          <p className="hj-kicker">{L('오늘의 구절 · 카드', 'Daily passage and cards')}</p>
          <h2>{L('아침에 한 구절, 나눌 땐 한 장.', 'A passage in the morning, a card to share.')}</h2>
          <p>
            {L(
              '날마다 한 구절이 펼쳐집니다. 원하는 아침 시간에 알림으로 받을 수 있고, 마음에 남은 구절은 카드 한 장으로 만들어 보내거나 사진에 저장합니다.',
              'A passage opens each day, at a morning hour you pick if you like. The one that stays with you becomes a single card to send or save.'
            )}
          </p>
        </div>

        <div className="hj-cardstage">
          <div className="hj-cardlead" style={lift(0.2)}>
            <Phone
              shots={['library.webp']}
              alt={L('오늘의 구절이 펼쳐진 서재 화면', 'The library screen with today’s passage')}
              small
            />
            <p className="hj-cardnote">
              {L(
                '날마다 한 구절. 아침 알림은 기기 안에서만 울립니다.',
                'One passage a day. The morning reminder is scheduled on the device alone.'
              )}
            </p>
          </div>

          <figure className="hj-cardbig" style={lift(0.1)}>
            <img
              src="/hyunja/piece/card-morning.webp"
              width={760}
              height={952}
              alt={L(
                '순자의 구절과 출처, 홍길동의 낙관이 찍힌 아침 인사 카드',
                'A morning card with a passage from Xunzi, its source and Hong Gil-dong’s seal'
              )}
              loading="lazy"
            />
            <figcaption>
              {L(
                '스토리에 올리기 좋은 4:5 — 구절과 출처, 나의 낙관이 함께 찍힙니다.',
                'A 4:5 card made to post — the passage, its source and your seal.'
              )}
            </figcaption>
          </figure>

          <div className="hj-cardside">
            <div style={lift(0.28)}>
              <Phone
                shots={['card.webp']}
                alt={L('아침 인사 카드를 고르는 화면', 'Choosing a greeting for the morning card')}
                small
              />
              <p className="hj-cardnote">
                {L(
                  '인사말 세 가지 가운데 고르고, 보내기 · 사진에 저장을 누릅니다. 카드는 기기 안에서 그려지고, 보낼 곳은 직접 고릅니다.',
                  'Pick one of three greetings, then send or save. The card is drawn on the device; where it goes is up to you.'
                )}
              </p>
            </div>
            <div style={lift(0.42)}>
              <Phone
                shots={['stamp.webp']}
                alt={L('필사를 마치고 낙관이 찍힌 화면', 'A finished tracing with the seal stamped on it')}
                small
              />
              <p className="hj-cardnote">
                {L(
                  '따라 쓴 글씨도 카드가 됩니다. 필사 끝에 찍힌 낙관이 그대로 들어갑니다.',
                  'Your handwriting becomes a card too, carrying the seal stamped at the end of the tracing.'
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================== 기록은 나에게만 ============================== */
function Privacy() {
  const { L } = useLang();
  const zeros = [
    L('계정', 'accounts'),
    L('광고', 'ads'),
    L('추가 결제', 'extra charges'),
    L('분석 도구', 'analytics'),
  ];
  return (
    <section id="privacy-sec" style={{ background: 'var(--hj-paper-2)', borderTop: '1px solid var(--hj-line)', borderBottom: '1px solid var(--hj-line)' }}>
      <div className="hj-wrap">
        <Reveal className="hj-head hj-center">
          <p className="hj-kicker">{L('나의 기록은 나에게만', 'Your notes stay yours')}</p>
          <h2>{L('쓴 글은 저희에게 오지 않습니다.', 'What you write never reaches us.')}</h2>
        </Reveal>
        <div className="hj-zeros">
          {zeros.map((w, k) => (
            <Reveal key={k} className="hj-zero" delay={k * 100}>
              <b>0</b>
              <span>{w}</span>
            </Reveal>
          ))}
        </div>
        <Reveal as="ul" className="hj-plist">
          <li>
            {L(
              '회원 가입이 없습니다. 기록은 이 기기와 나의 iCloud에만 저장되어 같은 Apple 계정의 기기끼리 이어집니다.',
              'There is no sign-up. Your notes live on this device and in your own iCloud, so they carry over between devices on the same Apple Account.'
            )}
          </li>
          <li>
            {L(
              '앱은 자체 서버와 통신하지 않습니다. 이야기와 그림, 글꼴까지 모두 앱 안에 들어 있습니다.',
              'The app talks to no server of ours. The texts, the paintings and even the fonts are bundled inside it.'
            )}
          </li>
          <li>
            {L(
              '언제든 백업 파일이나 글로 내보낼 수 있습니다. 사진 권한은 카드를 저장할 때만, 추가 전용으로 씁니다.',
              'You can export a backup file or plain text at any time. Photo access is add-only and used only when you save a card.'
            )}
          </li>
        </Reveal>
        <p style={{ textAlign: 'center', marginTop: 24 }}>
          <Link href="/hyunja/privacy">
            <b>{L('개인정보 처리방침 전문 보기 →', 'Read the full privacy policy →')}</b>
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ============================== 구매 ============================== */
function Buy() {
  const { L } = useLang();
  return (
    <section>
      <div className="hj-wrap">
        <Reveal className="hj-buy">
          <p className="hj-kicker">{L('한 번 구매', 'One purchase')}</p>
          <h2 style={{ fontSize: 'clamp(26px, 3.6vw, 40px)' }}>
            {L('사면 끝. 그다음은 없습니다.', 'Buy it once. That is the end of it.')}
          </h2>
          <ul>
            <li>{L('한 번 구매로 모든 내용을 봅니다', 'One purchase opens everything')}</li>
            <li>{L('구독도, 앱 안 추가 결제도 없습니다', 'No subscription and no in-app purchases')}</li>
            <li>{L('광고가 없습니다', 'No advertising')}</li>
            <li>{L('글자 크기 세 단계 · 어두운 화면 지원', 'Three text sizes and a dark screen')}</li>
            <li>{L('iPhone과 iPad에서 쓸 수 있습니다', 'Works on iPhone and iPad')}</li>
          </ul>
          <div className="hj-cta-row hj-center">
            <StoreButton />
          </div>
          <p className="hj-meta" style={{ marginTop: 16 }}>
            {L('가격은 App Store에 표시됩니다.', 'The price is shown in the App Store.')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== 번역에 대하여 · 마무리 ============================== */
function About() {
  const { L } = useLang();
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="hj-wrap hj-narrow">
        <Reveal className="hj-passage">
          <p className="hj-kicker">{L('번역에 대하여', 'About the translation')}</p>
          <p style={{ margin: 0, color: 'var(--hj-ink-2)' }}>
            {L(
              '모든 구절은 원문에서 직접 옮겼습니다. 『논어』와 『맹자』는 주희의 집주, 『도덕경』은 왕필본, 『순자』는 왕선겸의 『순자집해』를 기준으로 삼았고, 해석이 갈리는 구절은 기준 판본의 주석을 따랐습니다.',
              'Every passage was translated from the original. We follow Zhu Xi’s commentaries for the Analects and Mencius, the Wang Bi recension for the Tao Te Ching, and Wang Xianqian’s collected commentary for the Xunzi; where readings diverge, we follow the commentary of the base edition.'
            )}
          </p>
          <p style={{ marginBottom: 0, marginTop: 14, color: 'var(--hj-ink-2)', fontSize: 15 }}>
            {L(
              '네 현자의 그림은 전해지는 초상을 따르지 않은 상상도입니다. 앱의 판권면(설정 → 이 책을 만든 사람들)에 원전과 참고 자료, 글꼴 라이선스를 함께 밝혀 두었습니다.',
              'The four portraits are imaginative paintings, not historical likenesses. The colophon inside the app (Settings → Who made this book) lists the source editions, references and font licences.'
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Final() {
  const { L } = useLang();
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="hj-wrap hj-final">
        <Reveal>
          <img className="hj-icon" src="/hyunja/icon-256.webp" width={104} height={104} alt="" />
          <h2>
            {L(
              <>
                오늘의 고민 하나,
                <br />
                네 현자에게 물어보세요.
              </>,
              <>
                Bring today’s worry
                <br />
                to the four sages.
              </>
            )}
          </h2>
          <div className="hj-cta-row hj-center">
            <StoreButton />
            <Link className="hj-btn" href="/hyunja/support">
              {L('도움말 보기', 'Read the help page')}
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export default function HomeContent() {
  useDocTitle('현자의 서재 — 공자·맹자·순자·노자에게 묻다', 'The Sages’ Study — ask Confucius, Mencius, Xunzi and Laozi');
  return (
    <div className="hj">
      <Hero />
      <SubNav />
      <RoundTable />
      <Passage />
      <Copying />
      <Seal />
      <Book />
      <Cards />
      <Privacy />
      <Buy />
      <About />
      <Final />
    </div>
  );
}
