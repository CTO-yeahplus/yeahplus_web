'use client';
/* eslint-disable @next/next/no-img-element */

/**
 * 성어서당 랜딩 — 원본 seodang/web/src/(App·components/*) 를 한 파일로 옮긴 것.
 * 한국어 문안은 원본 그대로다. 영어는 이 사이트의 다른 제품 페이지와 같은 기준으로 옮겼다.
 * 바뀐 것: 이미지 경로(/seodang/img/…), 링크(next/link · /seodang 접두),
 *          클래스 이름에 sd- 접두, 서버 렌더에서 window 를 만지지 않도록 한 것.
 * <img> 를 그대로 쓰는 이유: 스크롤 연동으로 겹치고 움직이는 연출이라
 * next/image 의 래핑 규칙과 맞지 않는다. 에셋은 이미 JPEG/WebP 로 줄여져 있다.
 */

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ElementType, ReactNode } from 'react';
import { useCountUp, useInView, useReducedMotion, useScrollProgress } from './hooks';
import { useDocTitle, useLang } from './i18n';
import { StoreButton } from './chrome';
import { STROKE_SVG } from './strokeSvg';

const IMG = (f: string) => `/seodang/img/${f}`;
const ANSWER = ['刻', '舟', '求', '劍'];

/* 화면에 들어오면 부드럽게 나타나는 껍데기 */
function Reveal({
  as: Tag = 'div',
  className = '',
  children,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children?: ReactNode;
  [k: string]: unknown;
}) {
  const [ref, seen] = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={`sd-reveal ${seen ? 'sd-in' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/* ============================== 히어로 ============================== */
function Hero() {
  const { L } = useLang();
  const reduce = useReducedMotion();
  const busun = useRef<HTMLImageElement | null>(null);
  const blobs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = scrollY;
        blobs.current.forEach((el) => {
          if (el) el.style.transform = `translateY(${y * Number(el.dataset.par)}px)`;
        });
      });
    };
    const onMove = (e: PointerEvent) => {
      const dx = e.clientX / innerWidth - 0.5;
      const dy = e.clientY / innerHeight - 0.5;
      if (busun.current)
        busun.current.style.transform = `translate(${dx * 16}px, ${dy * 14}px) rotate(${dx * 2.2}deg)`;
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('pointermove', onMove);
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  const blob = (i: number, cls: string, par: number) => (
    <i
      key={cls}
      ref={(el) => {
        blobs.current[i] = el;
      }}
      className={`sd-blob sd-${cls}`}
      data-par={par}
    />
  );

  return (
    <header className="sd-hero">
      {blob(0, 'b1', 0.06)}
      {blob(1, 'b2', -0.05)}
      {blob(2, 'b3', 0.03)}
      <div className="sd-wrap">
        <div>
          <div className="sd-eyebrow">
            {L('초등 3~6학년 · iPhone · iPad', 'Ages 9–12 · iPhone · iPad')}
          </div>
          <h1>
            <span className="sd-line">
              <span>{L('이야기로 익히는', 'Four-character idioms,')}</span>
            </span>
            <span className="sd-line">
              <span className="sd-brush">{L('사자성어', 'learned as stories')}</span>
            </span>
          </h1>
          <p className="sd-lead">
            {L(
              '고사 속에서 내가 먼저 골라 보고, 붓선생이 펼친 옛 책으로 진짜 이야기를 확인하고, 네 글자 한자를 붓으로 따라 씁니다. 이야기 60편이 앱 안에 모두 들어 있습니다.',
              'Children choose for themselves inside the old tale, read what really happened in the classic Master Brush opens, then trace the four Chinese characters with a brush. All 60 stories live inside the app.'
            )}
          </p>
          <div className="sd-cta">
            <a className="sd-btn sd-pri" href="#try">
              {L('먼저 체험해 보기', 'Try a scene')}
            </a>
            <a className="sd-btn" href="#why">
              {L('어떤 앱인가요?', 'What is it?')}
            </a>
          </div>
          <div className="sd-cta" style={{ marginTop: 12 }}>
            <StoreButton />
          </div>
        </div>
        <div className="sd-heroArt">
          <div className="sd-bubble">{L('허허, 어서 오너라!', 'Well now — come in!')}</div>
          <img
            ref={busun}
            src={IMG('busun.webp')}
            width={900}
            height={900}
            alt={L(
              '붓 모양의 할아버지 캐릭터 붓선생',
              'Master Brush, an old teacher shaped like a writing brush'
            )}
          />
        </div>
      </div>
      <div className="sd-scrollCue">
        <i />
        {L('내려서 보기', 'Scroll')}
      </div>
    </header>
  );
}

/* ============================== 배우는 순서 (가로 스크롤) ============================== */
function StoryScroll() {
  const { L } = useLang();
  const sec = useRef<HTMLElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const p = useScrollProgress(sec);
  // 원본은 렌더 중에 innerWidth 를 읽었다 — 서버 렌더에서는 쓸 수 없으므로 마운트 후 잰다.
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => {
      const el = track.current;
      if (el) setDist(Math.max(0, el.scrollWidth - innerWidth + 40));
    };
    measure();
    addEventListener('resize', measure);
    return () => removeEventListener('resize', measure);
  }, []);

  const panels = [
    {
      tag: L('하나', 'One'),
      img: IMG('gak_1.jpg'),
      alt: L('강에서 칼을 떨어뜨리는 사람', 'A man dropping his sword into the river'),
      h: L('이야기 속으로 들어갑니다', 'Step inside the story'),
      p: L(
        '옛날 초나라, 배 위에서 칼이 강물에 빠집니다. 아이는 구경꾼이 아니라 이야기 속 인물이 됩니다.',
        'In old Chu, a sword slips off a boat into the river. The child is not a spectator but a character in the tale.'
      ),
    },
    {
      tag: L('둘', 'Two'),
      img: IMG('sa_1.jpg'),
      alt: L('고민하는 장수', 'A general deep in thought'),
      h: L('내가 먼저 골라 봅니다', 'Make the choice yourself'),
      p: L(
        '"너라면 어떻게 할래?" 정답은 없습니다. 무엇을 고르든 붓선생이 생각을 이어 줍니다.',
        '“What would you do?” There is no wrong answer — whatever they pick, Master Brush carries the thought forward.'
      ),
    },
    {
      tag: L('셋', 'Three'),
      img: IMG('woo_3.jpg'),
      alt: L('산을 옮기는 우공', 'The old man who moved the mountains'),
      h: L('옛 책이 진짜 이야기를 들려줍니다', 'The classics tell what really happened'),
      p: L(
        '실제로 어떻게 되었는지, 출전은 어느 책인지까지 읽습니다. 「열자」, 「사기」처럼 근거를 밝힙니다.',
        'Children read how it actually ended and which book it comes from — the Liezi, the Records of the Grand Historian, and so on.'
      ),
    },
    {
      tag: L('넷', 'Four'),
      img: IMG('hwa_r.jpg'),
      alt: L('용을 그리는 화가', 'A painter finishing a dragon'),
      h: L('한자 네 글자를 손으로 씁니다', 'Write the four characters by hand'),
      p: L(
        '획순 시범을 보고 붓으로 따라 씁니다. 다 쓰면 성어 카드가 책장에 꽂힙니다.',
        'They watch the stroke order, then trace it with a brush. Finish it and the idiom card goes onto the shelf.'
      ),
    },
  ];

  return (
    <section className="sd-story" id="how" aria-label={L('배우는 순서', 'How it works')} ref={sec}>
      <div className="sd-stickyWrap">
        <div className="sd-track" ref={track} style={{ transform: `translateX(${-p * dist}px)` }}>
          {panels.map((x) => (
            <article className="sd-panel" key={x.img}>
              <img src={x.img} width={720} height={542} alt={x.alt} loading="lazy" />
              <div className="sd-t">
                <span className="sd-tag">{x.tag}</span>
                <h3>{x.h}</h3>
                <p>{x.p}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="sd-bar" style={{ width: `${p * 100}%` }} />
    </section>
  );
}

/* ============================== 선택 체험 ============================== */
function TryChoice() {
  const { L } = useLang();
  const [pick, setPick] = useState(-1);
  const chosen = pick >= 0;

  const choices = [
    {
      o: L('당장 강물에 뛰어든다!', 'Jump into the river right now!'),
      re: L(
        '용감한데? 하지만 물살이 세서 위험해 보여.',
        'Brave! But the current looks strong — that could be dangerous.'
      ),
    },
    {
      o: L('뱃사공에게 배를 세워 달라고 한다', 'Ask the boatman to stop the boat'),
      re: L(
        '오, 침착하네! 그 자리에서 바로 찾아볼 수 있겠어.',
        'Oh, level-headed! You could look for it right where it fell.'
      ),
    },
    {
      o: L(
        '칼이 떨어진 뱃전에 칼자국으로 표시를 해 둔다',
        'Cut a mark on the boat where the sword fell'
      ),
      re: L('음… 표시라, 과연 그게 통할까?', 'Hmm… a mark. Do you think that will work?'),
    },
  ];

  return (
    <section id="try">
      <div className="sd-wrap">
        <Reveal>
          <div className="sd-eyebrow">{L('직접 해 보기', 'Try it yourself')}</div>
          <h2 className="sd-sec-h">
            {L('각주구검, 이 사람은 어떻게 했을까요?', 'So what did the man in the boat do?')}
          </h2>
          <p className="sd-sec-p">
            {L(
              '앱에서 아이가 만나는 장면 그대로입니다. 하나 골라 보세요. 틀린 선택은 없습니다.',
              'This is the scene exactly as a child meets it in the app. Pick one — there is no wrong answer.'
            )}
          </p>
        </Reveal>

        <Reveal className="sd-demo">
          <div className="sd-scene">
            <img
              src={IMG('gak_1.jpg')}
              width={720}
              height={542}
              alt={L(
                '배 위에서 칼을 강물에 빠뜨린 사람',
                'A man who has dropped his sword from a boat into the river'
              )}
            />
          </div>
          <p className="sd-q">{L('큰일났다! 너라면 어떻게 할래?', 'Oh no! What would you do?')}</p>

          <div>
            {choices.map((c, i) => (
              <button
                key={c.o}
                type="button"
                className={`sd-opt ${pick === i ? 'sd-on' : ''}`}
                onClick={() => setPick(i)}
              >
                {c.o}
              </button>
            ))}
          </div>

          <div className={`sd-say ${chosen ? 'sd-in' : ''}`}>
            <span className="sd-av">
              <img src={IMG('busun.webp')} width={900} height={900} alt="" />
            </span>
            <span className="sd-bb">
              <b>{L('붓선생', 'Master Brush')}</b>
              {chosen ? ` ${choices[pick].re}` : ''}
            </span>
          </div>

          <div className={`sd-book ${chosen ? 'sd-in' : ''}`}>
            <span className="sd-bk">{L('옛 책', 'The classic')}</span>
            {L(
              <>
                배는 계속 움직였는데 칼은 그 자리에 가라앉아 있었으니, 칼을 찾을 수 있었을까?
                사람들은 <b>배에 새겨서(刻舟) 칼을 구하려 한(求劍)</b> 이 사람처럼, 상황이 변한 줄
                모르고 옛 방식만 고집하는 걸 <b>각주구검</b>이라 부르게 되었어. 「여씨춘추」에 나오는
                이야기야.
              </>,
              <>
                The boat kept moving while the sword stayed where it sank — could he ever find it?
                Ever since, people have called it <b>gakjugugeom</b>: to{' '}
                <b>notch the boat (刻舟) in order to seek the sword (求劍)</b> — clinging to the old
                way without noticing that everything has moved on. The tale comes from the Spring and
                Autumn Annals of Master Lü.
              </>
            )}
          </div>

          <p className="sd-hint">
            {chosen
              ? L(
                  '옛 책이 펼쳐졌습니다. 앱에서는 여기까지 읽고 한자 맞추기로 넘어갑니다.',
                  'The book is open. In the app, this is where the character puzzle begins.'
                )
              : L(
                  '보기를 누르면 붓선생이 대답합니다. 마음이 바뀌면 다른 것을 눌러도 괜찮아요.',
                  'Tap an answer and Master Brush replies. Changed your mind? Tap another one.'
                )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== 한자 네 글자 맞추기 ============================== */
const shuffle = (a: string[]) =>
  a
    .map((v) => [Math.random(), v] as const)
    .sort((x, y) => x[0] - y[0])
    .map((x) => x[1]);

function TileGame() {
  const { L } = useLang();
  const [round, setRound] = useState(0);
  // 서버 렌더와 첫 렌더는 원래 순서로 두고(하이드레이션 불일치 방지), 마운트 후 섞는다.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const order = useMemo(() => (mounted ? shuffle(ANSWER) : ANSWER), [round, mounted]);
  const [done, setDone] = useState<string[]>([]);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [shake, setShake] = useState<string | null>(null);

  const tap = (ch: string) => {
    if (ch !== ANSWER[done.length]) {
      setShake(ch);
      setTimeout(() => setShake(null), 220);
      setMsg({ text: L('순서를 다시 생각해 볼까요?', 'Shall we think about the order again?'), ok: false });
      return;
    }
    const next = [...done, ch];
    setDone(next);
    setMsg(
      next.length === ANSWER.length
        ? {
            text: L(
              '각주구검 — 완성! 성어 카드를 얻었습니다.',
              'Gakjugugeom — complete! You earned the idiom card.'
            ),
            ok: true,
          }
        : null
    );
  };

  const again = () => {
    setDone([]);
    setMsg(null);
    setRound((r) => r + 1);
  };

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="sd-wrap">
        <Reveal>
          <h2 className="sd-sec-h">
            {L('네 글자를 순서대로 놓아 보세요', 'Put the four characters in order')}
          </h2>
          <p className="sd-sec-p">
            {L(
              '이야기를 다 읽으면 한자 네 글자가 흩어집니다. 순서대로 놓으면 성어 카드가 완성됩니다.',
              'When the story ends, the four characters scatter. Put them back in order and the idiom card is complete.'
            )}
          </p>
        </Reveal>

        <Reveal className="sd-demo">
          <div className="sd-slots">
            {ANSWER.map((ch, i) => (
              <div key={ch} className={`sd-slot ${done[i] ? 'sd-fill sd-ok' : ''}`}>
                {done[i] || ''}
              </div>
            ))}
          </div>

          <div className="sd-tiles">
            {order.map((ch) => (
              <button
                key={ch}
                type="button"
                className={`sd-tile ${done.includes(ch) ? 'sd-used' : ''} ${
                  shake === ch ? 'sd-shake' : ''
                }`}
                onClick={() => tap(ch)}
              >
                {ch}
              </button>
            ))}
          </div>

          <p className="sd-done-msg" style={{ color: msg?.ok ? 'var(--sd-good)' : 'var(--sd-ink2)' }}>
            {msg?.text || ''}
          </p>
          {done.length === ANSWER.length && (
            <p style={{ textAlign: 'center' }}>
              <button type="button" className="sd-replay" onClick={again}>
                ↻ {L('다시 해 보기', 'Play again')}
              </button>
            </p>
          )}
          <p className="sd-hint" style={{ textAlign: 'center' }}>
            {L(
              '각 · 주 · 구 · 검 — 새길 각, 배 주, 구할 구, 칼 검',
              'gak · ju · gu · geom — notch, boat, seek, sword'
            )}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== 획순 시범 ============================== */
function StrokeDemo() {
  const { L } = useLang();
  const [boxRef, seen] = useInView<HTMLDivElement>({ threshold: 0.5 });
  const [play, setPlay] = useState(0);
  useEffect(() => {
    if (seen) setPlay((n) => n + 1);
  }, [seen]);

  return (
    <section style={{ paddingTop: 0 }}>
      <div className="sd-wrap">
        <Reveal>
          <h2 className="sd-sec-h">
            {L('획순은 붓선생이 먼저 보여 줍니다', 'Master Brush shows the strokes first')}
          </h2>
          <p className="sd-sec-p">
            {L(
              '한 획씩 어떻게 긋는지 보여 준 뒤에 따라 쓰게 합니다. 한 획이라도 빠지면 다시 쓰자고 합니다.',
              'Every stroke is demonstrated before the child traces it. Miss one and it asks them to write it again.'
            )}
          </p>
        </Reveal>

        <Reveal className="sd-stroke">
          <div>
            <div className="sd-strokeBox" ref={boxRef}>
              <div key={play} dangerouslySetInnerHTML={{ __html: STROKE_SVG }} />
            </div>
            <button className="sd-replay" type="button" onClick={() => setPlay((n) => n + 1)}>
              ▶ {L('다시 보기', 'Play again')}
            </button>
          </div>
          <div>
            <h3 style={{ fontSize: 22 }}>{L('뫼 산 (山)', 'san (山) — mountain')}</h3>
            <p style={{ color: 'var(--sd-ink2)', marginTop: 10 }}>
              {L(
                <>
                  앱에는 이런 획순 시범이 <b>186자</b> 들어 있습니다. 따라 쓰기는 획 하나하나를
                  확인해서, 아이가 끝까지 쓰도록 안내합니다.
                </>,
                <>
                  The app holds <b>186</b> characters demonstrated this way. Tracing checks every
                  single stroke, guiding the child to the end.
                </>
              )}
            </p>
            <p className="sd-credit">
              {L('획순 시범 자료: AnimCJK (Arphic Public License)', 'Stroke data: AnimCJK (Arphic Public License)')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ============================== 숫자 ============================== */
function Num({ n, label, start, reduce }: { n: number; label: string; start: boolean; reduce: boolean }) {
  const v = useCountUp(n, start, reduce ? 0 : 1100);
  return (
    <div className="sd-num">
      <b>{v}</b>
      <span>{label}</span>
    </div>
  );
}

function Numbers() {
  const { L } = useLang();
  const [ref, seen] = useInView<HTMLDivElement>({ threshold: 0.4 });
  const reduce = useReducedMotion();
  const nums = [
    { n: 60, label: L('이야기 (사자성어 60편)', 'stories (60 idioms)') },
    { n: 242, label: L('장면 삽화', 'scene illustrations') },
    { n: 186, label: L('획순 시범 한자', 'characters with stroke demos') },
  ];
  return (
    <section style={{ paddingTop: 0 }}>
      <div className="sd-wrap">
        <h2 className="sd-sec-h">{L('앱 안에 들어 있는 것', 'What is inside the app')}</h2>
        <div className="sd-nums" ref={ref}>
          {nums.map((x) => (
            <Num key={x.label} {...x} start={seen} reduce={reduce} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================== 갤러리 ============================== */
function Gallery() {
  const { L } = useLang();
  const gal = [
    { src: IMG('sae_1.jpg'), alt: L('새옹지마 장면', 'A scene from “the old man’s horse”') },
    { src: IMG('dada_1.jpg'), alt: L('다다익선 장면', 'A scene from “the more the better”') },
    { src: IMG('jeong_1.jpg'), alt: L('정저지와 장면', 'A scene from “the frog in the well”') },
    { src: IMG('yongdu_r.jpg'), alt: L('용두사미 장면', 'A scene from “dragon head, snake tail”') },
  ];
  return (
    <section style={{ paddingTop: 0 }}>
      <Reveal className="sd-wrap">
        <h2 className="sd-sec-h">{L('모든 장면을 그렸습니다', 'Every scene is illustrated')}</h2>
        <p className="sd-sec-p">
          {L(
            '이야기가 넘어갈 때마다 그림도 함께 넘어갑니다. 한 편에 네다섯 장, 모두 242장입니다.',
            'The picture turns with the story — four or five per tale, 242 in all.'
          )}
        </p>
        <div className="sd-gal">
          {gal.map((g) => (
            <img key={g.src} src={g.src} width={720} height={542} alt={g.alt} loading="lazy" />
          ))}
        </div>
      </Reveal>
    </section>
  );
}

/* ============================== 안심 ============================== */
function Safe() {
  const { L } = useLang();
  const safe = [
    {
      ic: '🚫',
      h: L('광고 없음', 'No ads'),
      p: L('배너도, 영상 광고도 없습니다.', 'No banners and no video ads.'),
    },
    {
      ic: '💳',
      h: L('추가 결제 없음', 'No extra purchases'),
      p: L(
        '한 번 구매하면 60편 전부입니다. 앞으로 더해지는 오리지널 이야기도 추가 결제 없이 열립니다. 캐릭터·브랜드 제휴 콘텐츠는 별도 상품이 될 수 있어요.',
        'Buy once and all 60 stories are yours — original stories added later unlock at no extra cost. Content made with outside characters or brands may be offered separately.'
      ),
    },
    {
      ic: '✈️',
      h: L('인터넷 없이', 'Works offline'),
      p: L('비행기 모드에서도 똑같이 동작합니다.', 'It works the same in airplane mode.'),
    },
    {
      ic: '🔒',
      h: L('수집 없음', 'No data collected'),
      p: L(
        '계정이 없고, 어떤 정보도 모으지 않습니다.',
        'There are no accounts, and nothing is collected.'
      ),
    },
  ];
  return (
    <section id="why" style={{ paddingTop: 0 }}>
      <Reveal className="sd-wrap">
        <h2 className="sd-sec-h">{L('부모님이 안심하실 부분', 'What parents can count on')}</h2>
        <div className="sd-safe">
          {safe.map((s) => (
            <div key={s.h}>
              <div className="sd-ic">{s.ic}</div>
              <h3>{s.h}</h3>
              <p>{s.p}</p>
            </div>
          ))}
        </div>
        <div className="sd-family">
          <div className="sd-ic" aria-hidden="true">
            👨‍👩‍👧‍👦
          </div>
          <div>
            <h3>{L('가족 공유 — 한 번 사서 형제까지', 'Family Sharing — buy once for the whole family')}</h3>
            <p>
              {L(
                'App Store 가족 공유를 켜 두었습니다. 한 번 구매하면 같은 가족 그룹(본인 포함 최대 6명)이 함께 쓸 수 있어, 형제가 있어도 아이마다 따로 살 필요가 없습니다.',
                'Family Sharing is switched on. One purchase covers your family group — up to six people including you — so brothers and sisters do not need a copy each.'
              )}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ============================== 마무리 ============================== */
function EndCta() {
  const { L } = useLang();
  return (
    <div className="sd-wrap">
      <Reveal className="sd-end">
        <h2>{L('붓선생이 기다리고 있어요', 'Master Brush is waiting')}</h2>
        <p>
          {L(
            '초등 3~6학년을 위한 사자성어 60편. iPhone과 iPad에서 쓸 수 있습니다.',
            'Sixty four-character idioms for ages 9–12, on iPhone and iPad.'
          )}
        </p>
        <div className="sd-cta" style={{ justifyContent: 'center' }}>
          <StoreButton />
          <Link className="sd-btn" href="/seodang/support">
            {L('지원 페이지 보기', 'Visit support')}
          </Link>
        </div>
      </Reveal>
    </div>
  );
}

export default function HomeContent() {
  useDocTitle('성어서당 — 이야기로 익히는 사자성어', 'Seodang — idioms learned as stories');
  return (
    <>
      <Hero />
      <StoryScroll />
      <TryChoice />
      <TileGame />
      <StrokeDemo />
      <Numbers />
      <Gallery />
      <Safe />
      <EndCta />
    </>
  );
}
