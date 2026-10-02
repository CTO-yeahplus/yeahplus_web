'use client';
/* eslint-disable @next/next/no-img-element -- public/site 의 이미지는 미리 줄여 webp 로 만들어 둔 것이라 그대로 쓴다 */

/**
 * yeahplus.co.kr 회사 홈.
 * 읽는 사람: 파트너·투자자·제휴처. 할 일: 이 팀이 무엇을 잘하는지 근거와 함께 보여 주고, 연락으로 잇는 것.
 * 흐름: 히어로(실제 앱 화면) → 네 기둥(로고의 네 기둥 = 네 가지 강점) → 분야별 제품 → 만드는 사람 → 연혁 → 함께 일하기.
 * 숫자는 전부 products.ts 에서 센다 — 손으로 적어 둔 숫자가 제품 목록과 어긋나지 않게.
 */
import Link from 'next/link';
import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { LangProvider, useLang } from './lang';
import { Logo } from './Logo';
import { useActiveIndex, useProgressVar, useReveal, useTopProgress } from './motion';
import { CATS, COUNT, PRODUCTS } from './products';
import type { Product } from './products';

const MAIL = 'contact@yeahplus.co.kr';
const SHOT = (f: string) => `/site/shots/${f}.webp`;
const css = (o: Record<string, string | number>) => o as CSSProperties;

/* ─────────────────────────── 공통 ─────────────────────────── */

function Phone({ src, alt, className = '', style }: { src: string; alt: string; className?: string; style?: CSSProperties }) {
  return (
    <div className={`yp-phone ${className}`} style={style}>
      <div className="yp-screen">
        <img src={src} alt={alt} width={520} height={1126} loading="lazy" />
      </div>
    </div>
  );
}

function AppIcon({ p, size = 56 }: { p: Product; size?: number }) {
  if (p.icon) {
    return <img className="yp-icon" src={p.icon} alt="" width={size} height={size} loading="lazy" style={css({ width: size, height: size })} />;
  }
  return (
    <span className="yp-icon yp-icon-mark" style={css({ width: size, height: size, '--a': p.accent, fontSize: size * 0.36 })} aria-hidden="true">
      {p.mark}
    </span>
  );
}

function ProductLink({ p, children, className }: { p: Product; children: ReactNode; className?: string }) {
  if (p.href.startsWith('/')) {
    return (
      <Link href={p.href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={p.href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function Status({ s }: { s: Product['status'] }) {
  const { L } = useLang();
  return <span className={`yp-status ${s === 'live' ? 'yp-live' : ''}`}>{s === 'live' ? L('출시', 'Live') : L('준비 중', 'Coming soon')}</span>;
}

/* ─────────────────────────── 머리 ─────────────────────────── */

function Header() {
  const { L, lang, toggle } = useLang();
  const nav = [
    ['#pillars', L('강점', 'Strengths')],
    ['#products', L('제품', 'Products')],
    ['#people', L('사람', 'People')],
    ['#history', L('연혁', 'History')],
  ];
  return (
    <header className="yp-header">
      <div className="yp-wrap yp-header-in">
        <a href="#top" className="yp-brand" aria-label="YeahPlus">
          <Logo size={20} />
          <span>YeahPlus</span>
        </a>
        <nav className="yp-nav" aria-label={L('주요 메뉴', 'Main')}>
          {nav.map(([h, t]) => (
            <a key={h} href={h}>
              {t}
            </a>
          ))}
        </nav>
        <div className="yp-header-end">
          <button type="button" className="yp-lang" onClick={toggle} aria-label={L('Switch to English', '한국어로 보기')}>
            {lang === 'ko' ? 'EN' : '한국어'}
          </button>
          <a href="#contact" className="yp-pill">
            {L('함께 일하기', 'Work with us')}
          </a>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────── 히어로 ─────────────────────────── */

const HERO_SHOTS: { f: string; ko: string; en: string }[] = [
  { f: 'myohae', ko: '묘해 — 고양이 사진 꾸미기 결과', en: 'MYOHAE: decorated cat photos' },
  { f: 'cinelook', ko: 'CineLook 촬영 화면', en: 'CineLook camera screen' },
  { f: 'seodang', ko: '성어서당 이야기 삽화 화면', en: 'Seodang story screen' },
  { f: 'hyunja', ko: '현자의 서재 원탁 화면', en: 'The Sages’ Study round table' },
  { f: 'kkorong', ko: '꼬롱을 찾아라 시장 장면', en: 'Find Kkorong market scene' },
];

function Hero() {
  const { L } = useLang();
  const ref = useTopProgress<HTMLElement>(560);
  const facts = [
    { n: COUNT.all, ko: '제품', en: 'products' },
    { n: COUNT.live, ko: '출시·운영 중', en: 'live today' },
    { n: COUNT.cats, ko: '분야', en: 'fields' },
    { n: 2022, ko: '창업', en: 'founded' },
  ];
  return (
    <section className="yp-hero" id="top" ref={ref}>
      <div className="yp-wrap yp-hero-copy">
        <p className="yp-eyebrow">{L('주식회사 예아플러스', 'YeahPlus Inc.')}</p>
        <h1 className="yp-h1">
          {L(
            <>
              매일 손에 쥐는 앱을
              <br />
              처음부터 끝까지 만듭니다.
            </>,
            <>
              Apps people keep in hand,
              <br />
              made from start to finish.
            </>
          )}
        </h1>
        <p className="yp-lead">
          {L(
            '예아플러스는 사진과 배움, 놀이에 기술을 더하는 작은 스튜디오입니다. 기획과 디자인, 개발과 출시, 제품 페이지와 약관까지 한 팀이 직접 만듭니다.',
            'YeahPlus is a small studio that brings technology to photos, learning and play. One team handles the planning, design, engineering and launch, down to each product page and policy.'
          )}
        </p>
        <div className="yp-cta-row">
          <a href="#products" className="yp-btn yp-btn-dark">
            {L('제품 보기', 'See the products')}
          </a>
          <a href="#contact" className="yp-btn">
            {L('함께 일하기', 'Work with us')}
          </a>
        </div>
      </div>

      <div className="yp-fan" aria-label={L('예아플러스 앱 화면', 'YeahPlus app screens')}>
        {HERO_SHOTS.map((s, k) => {
          const o = k - 2;
          return (
            <Phone
              key={s.f}
              src={SHOT(s.f)}
              alt={L(s.ko, s.en)}
              className={o === 0 ? 'yp-fan-mid' : ''}
              style={css({ '--o': o, '--a': Math.abs(o), zIndex: 10 - Math.abs(o) })}
            />
          );
        })}
      </div>

      <div className="yp-wrap">
        <dl className="yp-facts">
          {facts.map((f) => (
            <div key={f.ko}>
              <dt>{L(f.ko, f.en)}</dt>
              <dd>{f.n}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ─────────────────────────── 네 기둥 ─────────────────────────── */

const PILLAR_IDS = ['pillar-craft', 'pillar-vision', 'pillar-respect', 'pillar-depth'];

function IconWall() {
  const { L } = useLang();
  const ref = useProgressVar<HTMLDivElement>(1, 0.6);
  return (
    <div className="yp-wall" ref={ref} role="list" aria-label={L('예아플러스 제품 아이콘', 'YeahPlus product icons')}>
      {PRODUCTS.map((p, k) => {
        // 흩어진 자리 — 매번 같은 모양이 나오도록 번호로 정한다
        const dx = ((k * 37) % 9) - 4;
        const dy = ((k * 53) % 7) - 3;
        const r = ((k * 29) % 11) - 5;
        return (
          <span key={p.id} role="listitem" className="yp-wall-tile" style={css({ '--dx': dx, '--dy': dy, '--r': r })} title={L(p.ko, p.en)}>
            <AppIcon p={p} size={64} />
          </span>
        );
      })}
    </div>
  );
}

function Pillars() {
  const { L } = useLang();
  const active = useActiveIndex(PILLAR_IDS);
  const titles = [
    L('작은 팀, 많은 완성작', 'A small team, many finished products'),
    L('영화를 만들던 눈', 'An eye trained on film'),
    L('사람을 존중하는 설계', 'Design that respects people'),
    L('근거가 있는 콘텐츠', 'Content with sources'),
  ];
  const promiseApps = PRODUCTS.filter((p) => p.promise);
  const looks = ['original', 'goldenhour', 'noir', 'tealorange', 'toylens', 'pastelsym'];
  const lookNames: Record<string, string> = {
    original: 'Original', goldenhour: 'Golden Hour', noir: 'Noir', tealorange: 'Teal & Orange', toylens: 'Toy Lens', pastelsym: 'Pastel',
  };
  const sources = [
    {
      app: L('조선왕조실록', 'Joseon Annals'),
      tag: L('사료', 'Primary source'),
      cite: L('『조선왕조실록』', 'Annals of the Joseon Dynasty'),
      body: L('조선 27명의 왕이 내린 결정을 실록에 적힌 기록과 그대로 대조합니다.', 'Each king’s decision is checked against what the annals actually record, across all 27 reigns.'),
    },
    {
      app: L('현자의 서재', 'The Sages’ Study'),
      tag: L('저본', 'Base editions'),
      cite: L('주희 집주 · 왕필본 · 왕선겸 『순자집해』', 'Zhu Xi · Wang Bi · Wang Xianqian'),
      body: L('네 고전의 구절을 원문에서 직접 옮기고, 해석이 갈리는 곳은 저본의 주석을 따릅니다.', 'Passages are translated from the original, and disputed readings follow the base edition’s commentary.'),
    },
    {
      app: L('성어서당', 'Seodang'),
      tag: L('감수', 'Review'),
      cite: L('한문 전문가 · 초등교사', 'Classical Chinese scholar · teacher'),
      body: L('아이들이 보는 사자성어 이야기는 한문 전문가와 초등교사의 감수를 거칩니다.', 'Idiom stories for children are reviewed by a classical Chinese scholar and an elementary school teacher.'),
    },
    {
      app: L('뚝딱 실험실', 'Contraption Lab'),
      tag: L('물리', 'Physics'),
      cite: L('실험실 48개', '48 labs'),
      body: L('정답을 미리 정해 두지 않습니다. 구슬이 바구니에 들어가는지는 실제 물리 계산이 판정합니다.', 'No answer is scripted. Real physics decides whether the marble reaches the basket.'),
    },
    {
      app: L('뇌새김', 'NeuroVoca'),
      tag: L('기억 과학', 'Memory science'),
      cite: 'FSRS 4.5',
      body: L('간격 반복 알고리즘으로 잊기 직전의 단어를 골라 다시 꺼냅니다.', 'A spaced-repetition model picks the words you are about to forget and brings them back.'),
    },
  ];

  return (
    <section id="pillars" className="yp-pillars">
      <div className="yp-wrap">
        <header className="yp-sec-head yp-rv">
          <p className="yp-eyebrow">{L('왜 예아플러스인가', 'Why YeahPlus')}</p>
          <h2 className="yp-h2">{L('로고의 네 기둥처럼, 네 가지가 받칩니다.', 'Four pillars, like the four bars in our mark.')}</h2>
        </header>

        <div className="yp-pillar-grid">
          <aside className="yp-rail" aria-hidden="true">
            <div className="yp-rail-in">
              <Logo size={64} active={active} />
              <ol>
                {titles.map((t, k) => (
                  <li key={k} className={k === active ? 'yp-on' : ''}>
                    {t}
                  </li>
                ))}
              </ol>
            </div>
          </aside>

          <div className="yp-chapters">
            {/* 1 · 작은 팀, 많은 완성작 */}
            <article id={PILLAR_IDS[0]} className="yp-chapter">
              <div className="yp-chapter-copy yp-rv">
                <p className="yp-kicker">{titles[0]}</p>
                <h3 className="yp-h3">
                  {L(`작은 팀이 ${COUNT.all}개의 제품을 끝까지 만들었습니다.`, `A small team has taken ${COUNT.all} products all the way.`)}
                </h3>
                <p>
                  {L(
                    '2022년 창업 뒤로 사진, 배움, 게임, 일상 네 분야에서 제품을 만들어 왔습니다. 앱마다 자기 이름과 아이콘, 제품 페이지, 도움말, 개인정보 처리방침과 약관을 갖추고 나갑니다.',
                    'Since 2022 we have built products across photo, learning, games and everyday life. Each one ships with its own name and icon, product page, help centre, privacy policy and terms.'
                  )}
                </p>
                <ol className="yp-pipe" aria-label={L('한 팀이 맡는 일', 'What one team owns')}>
                  {[L('기획', 'Planning'), L('디자인', 'Design'), L('개발', 'Engineering'), L('스토어 심사', 'Store review'), L('제품 페이지', 'Product page'), L('고객 지원', 'Support')].map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
              </div>
              <IconWall />
            </article>

            {/* 2 · 영화를 만들던 눈 */}
            <article id={PILLAR_IDS[1]} className="yp-chapter">
              <div className="yp-chapter-copy yp-rv">
                <p className="yp-kicker">{titles[1]}</p>
                <h3 className="yp-h3">{L('영화의 화면을 만들던 눈으로 사진 앱을 만듭니다.', 'We build photo apps with an eye trained on film.')}</h3>
                <p>
                  {L(
                    '창업자는 루카스필름에서 시니어 TD로 일했고, 대학에서 가르치며 VFX·CG 수퍼바이저로 큰 프로젝트를 이끌었습니다. 지금은 포토 키오스크 플랫폼 인생네컷의 CTO입니다. 빛과 색, 카메라를 다뤄 온 경험이 CineLook과 24STILLS, 묘해에 들어갑니다.',
                    'Our founder was a senior TD at Lucasfilm, then taught at university while supervising VFX and CG on major projects, and is now CTO of the photo-kiosk platform Life4Cuts. That work with light, colour and cameras goes straight into CineLook, 24STILLS and MYOHAE.'
                  )}
                </p>
                <ul className="yp-path" aria-label={L('경력', 'Career')}>
                  <li>Lucasfilm Ltd. · Senior TD</li>
                  <li>{L('대학 교수 · VFX/CG 수퍼바이저', 'Professor · VFX/CG supervisor')}</li>
                  <li>{L('인생네컷 CTO', 'CTO, Life4Cuts')}</li>
                  <li>YeahPlus</li>
                </ul>
              </div>
              <figure className="yp-vision yp-rv">
                <img className="yp-booth" src={SHOT('booth')} width={720} height={900} alt={L('CineLook 4컷 부스로 찍은 사진', 'A four-shot strip from the CineLook booth')} loading="lazy" />
                <div className="yp-looks">
                  {looks.map((n) => (
                    <span key={n}>
                      <img src={SHOT(`look-${n}`)} width={288} height={360} alt="" loading="lazy" />
                      <small>{lookNames[n]}</small>
                    </span>
                  ))}
                </div>
                <figcaption>{L('CineLook — 영화 필터 35종, 프레임 19종, 4컷 부스', 'CineLook: 35 movie looks, 19 frames and a four-shot booth')}</figcaption>
              </figure>
            </article>

            {/* 3 · 사람을 존중하는 설계 */}
            <article id={PILLAR_IDS[2]} className="yp-chapter">
              <div className="yp-chapter-copy yp-rv">
                <p className="yp-kicker">{titles[2]}</p>
                <h3 className="yp-h3">{L('광고로 붙잡지 않고, 데이터를 가져가지 않습니다.', 'No ads to hold you, no data taken from you.')}</h3>
                <p>
                  {L(
                    `유료 앱 ${COUNT.promise}편은 같은 약속을 제품 페이지와 개인정보 처리방침에 적어 두었습니다. 카메라 보정처럼 무거운 일도 가능한 한 기기 안에서 끝냅니다.`,
                    `Our ${COUNT.promise} paid apps put the same promises in writing, on their product pages and privacy policies. Even heavy work like camera processing stays on the device wherever we can.`
                  )}
                </p>
              </div>
              <div className="yp-promise yp-rv">
                <ul className="yp-promise-list">
                  <li>
                    <b>{L('광고 없음', 'No ads')}</b>
                    <span>{L('배너도, 영상 광고도 넣지 않습니다.', 'No banners and no video ads.')}</span>
                  </li>
                  <li>
                    <b>{L('수집 없음', 'No data collection')}</b>
                    <span>{L('개인정보를 모으거나 개발자에게 보내지 않습니다.', 'Nothing personal is collected or sent to us.')}</span>
                  </li>
                  <li>
                    <b>{L('구독 없음', 'No subscriptions')}</b>
                    <span>{L('한 번 사면 계속 씁니다.', 'Buy once and keep it.')}</span>
                  </li>
                </ul>
                <div className="yp-promise-apps">
                  {promiseApps.map((p) => (
                    <ProductLink key={p.id} p={p} className="yp-mini">
                      <AppIcon p={p} size={44} />
                      <span>{L(p.ko, p.en)}</span>
                    </ProductLink>
                  ))}
                </div>
              </div>
            </article>

            {/* 4 · 근거가 있는 콘텐츠 */}
            <article id={PILLAR_IDS[3]} className="yp-chapter yp-chapter-wide">
              <div className="yp-chapter-copy yp-rv">
                <p className="yp-kicker">{titles[3]}</p>
                <h3 className="yp-h3">{L('가볍게 쓰여도, 근거는 깊게 둡니다.', 'Light to use, deep in its sources.')}</h3>
                <p>
                  {L(
                    '아이들이 보는 앱일수록, 고전을 옮기는 앱일수록 출처가 중요합니다. 사료와 원전, 전문가 감수, 실제 물리와 기억 과학을 바탕에 둡니다.',
                    'The more a product is used by children, or carries the classics, the more its sources matter. We build on primary records, original texts, expert review, real physics and memory science.'
                  )}
                </p>
              </div>
              <div className="yp-sources">
                {sources.map((s) => (
                  <div key={s.app} className="yp-source yp-rv">
                    <span className="yp-source-tag">{s.tag}</span>
                    <b>{s.app}</b>
                    <p>{s.body}</p>
                    <cite>{s.cite}</cite>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── 제품 ─────────────────────────── */

const FLAGSHIP: Partial<Record<Product['cat'], { id: string; shot: string }>> = {
  image: { id: 'cinelook', shot: 'cinelook' },
  learn: { id: 'seodang', shot: 'seodang' },
  game: { id: 'mineforge', shot: 'mineforge' },
};

function Products() {
  const { L } = useLang();
  const active = useActiveIndex(CATS.map((c) => `cat-${c.id}`));
  return (
    <section id="products" className="yp-products">
      <div className="yp-wrap">
        <header className="yp-sec-head yp-rv">
          <p className="yp-eyebrow">{L('제품', 'Products')}</p>
          <h2 className="yp-h2">
            {L(`네 분야, ${COUNT.all}개의 제품.`, `Four fields, ${COUNT.all} products.`)}
          </h2>
          <p className="yp-sec-lead">
            {L(
              `지금 ${COUNT.live}개를 출시해 운영하고 있고, ${COUNT.soon}개가 출시를 준비하고 있습니다.`,
              `${COUNT.live} are live today and ${COUNT.soon} more are getting ready to launch.`
            )}
          </p>
        </header>
      </div>

      <nav className="yp-cats" aria-label={L('분야', 'Fields')}>
        <div className="yp-wrap yp-cats-in">
          {CATS.map((c, k) => (
            <a key={c.id} href={`#cat-${c.id}`} className={k === active ? 'yp-on' : ''} style={css({ '--c': c.color })}>
              <i aria-hidden="true" />
              {L(c.ko, c.en)}
              <small>{PRODUCTS.filter((p) => p.cat === c.id).length}</small>
            </a>
          ))}
        </div>
      </nav>

      <div className="yp-wrap">
        {CATS.map((c) => {
          const list = PRODUCTS.filter((p) => p.cat === c.id);
          const f = FLAGSHIP[c.id];
          const flag = f ? list.find((p) => p.id === f.id) : undefined;
          const rest = flag ? list.filter((p) => p !== flag) : list;
          return (
            <section key={c.id} id={`cat-${c.id}`} className="yp-cat" style={css({ '--c': c.color })}>
              <header className="yp-cat-head yp-rv">
                <h3>{L(c.ko, c.en)}</h3>
                <p>{L(c.leadKo, c.leadEn)}</p>
              </header>

              {flag && f && (
                <ProductLink p={flag} className="yp-flag yp-rv">
                  <div className="yp-flag-copy">
                    <div className="yp-flag-name">
                      <AppIcon p={flag} size={64} />
                      <div>
                        <b>{L(flag.ko, flag.en)}</b>
                        <Status s={flag.status} />
                      </div>
                    </div>
                    <p>{L(flag.descKo, flag.descEn)}</p>
                    <span className="yp-more">{L('제품 페이지 보기', 'View product page')} →</span>
                  </div>
                  <div className="yp-flag-art">
                    <Phone src={SHOT(f.shot)} alt={L(`${flag.ko} 화면`, `${flag.en} screen`)} />
                  </div>
                </ProductLink>
              )}

              <div className="yp-cards">
                {rest.map((p) => (
                  <ProductLink key={p.id} p={p} className="yp-card yp-rv">
                    <AppIcon p={p} size={52} />
                    <div className="yp-card-body">
                      <div className="yp-card-top">
                        <b>{L(p.ko, p.en)}</b>
                        <Status s={p.status} />
                      </div>
                      <p>{L(p.descKo, p.descEn)}</p>
                      <span className="yp-card-url">{p.href.startsWith('/') ? `yeahplus.co.kr${p.href}` : p.href.replace('https://', '')}</span>
                    </div>
                  </ProductLink>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────── 사람 ─────────────────────────── */

function People() {
  const { L } = useLang();
  const career = [
    { tag: L('지금', 'Now'), t: L('인생네컷 CTO', 'CTO, Life4Cuts'), d: L('글로벌 포토 키오스크 플랫폼의 기술을 총괄합니다. 비전 AI와 클라우드 인프라를 다룹니다.', 'Leads technology for a global photo-kiosk platform, from vision AI to cloud infrastructure.') },
    { tag: L('경력', 'Career'), t: L('대학 교수 · VFX/CG 수퍼바이저', 'Professor · VFX/CG supervisor'), d: L('대학에서 후학을 가르치며 국내외 대형 프로젝트의 시각효과를 이끌었습니다.', 'Taught at university while leading visual effects on major projects in Korea and abroad.') },
    { tag: L('시작', 'Origin'), t: 'Lucasfilm Ltd. · Senior TD', d: L('조지 루카스가 세운 시각효과 스튜디오에서 세계 기준의 제작 파이프라인을 익혔습니다.', 'Learned world-standard production pipelines at the visual effects studio George Lucas founded.') },
  ];
  return (
    <section id="people" className="yp-people">
      <div className="yp-wrap yp-people-grid">
        <div className="yp-people-photos yp-rv">
          <img className="yp-founder" src={SHOT('founder')} width={700} height={700} alt={L('창업자 Eugene Ko', 'Founder Eugene Ko')} loading="lazy" />
          <figure className="yp-lucas">
            <img src={SHOT('lucasfilm')} width={720} height={590} alt={L('루카스필름에서 조지 루카스와 함께', 'With George Lucas at Lucasfilm')} loading="lazy" />
            <figcaption>With George Lucas · Lucasfilm Ltd.</figcaption>
          </figure>
        </div>
        <div className="yp-rv">
          <p className="yp-eyebrow">{L('만드는 사람', 'The people')}</p>
          <h2 className="yp-h2">Eugene Ko</h2>
          <blockquote className="yp-quote">
            {L(
              '기술은 가장 복잡한 곳에서 태어나, 가장 단순한 형태로 우리와 만나야 합니다.',
              'Technology is born in the most complex places, but should meet us in its simplest form.'
            )}
          </blockquote>
          <ol className="yp-career">
            {career.map((c) => (
              <li key={c.t}>
                <span>{c.tag}</span>
                <b>{c.t}</b>
                <p>{c.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── 연혁 ─────────────────────────── */

function History() {
  const { L } = useLang();
  const appStore = ['묘해', '24STILLS', 'TOWER 68', 'ARKE', '조선왕조실록', '스틸스톰 아레나', 'MINEFORGE'];
  const appStoreEn = ['MYOHAE', '24STILLS', 'TOWER 68', 'ARKE', 'Joseon Annals', 'SteelStorm Arena', 'MINEFORGE'];
  const steps = [
    { y: '2022', t: L('창업', 'Founded'), d: L('콘텐츠에 기술을 더해 일상을 넓히겠다는 생각으로 시작했습니다.', 'Started with the idea of widening everyday life by adding technology to content.') },
    { y: '2023', t: L('기반', 'Foundation'), d: L('핵심 소프트웨어를 납품하고 기술 검증을 마쳤습니다.', 'Delivered core software and completed technical validation.') },
    { y: '2024', t: 'Content Labs', d: L('사진·영상·학습에서 아이디어를 시제품으로 만들며 방향을 정했습니다.', 'Prototyped ideas across photo, video and learning to set our direction.') },
    { y: '2025', t: L('뇌새김 출시', 'NeuroVoca launch'), d: L('뇌과학에 바탕을 둔 영어 단어 암기 서비스를 정식으로 내놓았습니다.', 'Launched our neuroscience-based English vocabulary service.') },
    {
      y: L('지금', 'Today'),
      t: L('네 분야의 제품군', 'A four-field product line'),
      d: L(
        `App Store에 ${appStore.join(', ')}를 내놓았고, CineLook·성어서당·현자의 서재를 비롯한 ${COUNT.soon}개가 출시를 앞두고 있습니다.`,
        `On the App Store: ${appStoreEn.join(', ')}. ${COUNT.soon} more, including CineLook, Seodang and The Sages’ Study, are close to launch.`
      ),
    },
  ];
  return (
    <section id="history" className="yp-history">
      <div className="yp-wrap">
        <header className="yp-sec-head yp-rv">
          <p className="yp-eyebrow">{L('연혁', 'History')}</p>
          <h2 className="yp-h2">{L('2022년부터 지금까지.', 'From 2022 to today.')}</h2>
        </header>
        <ol className="yp-timeline">
          {steps.map((s) => (
            <li key={s.y} className="yp-rv">
              <span className="yp-year">{s.y}</span>
              <div>
                <b>{s.t}</b>
                <p>{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ─────────────────────────── 함께 일하기 ─────────────────────────── */

function Contact() {
  const { L } = useLang();
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const el = document.getElementById('yp-mail');
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(r);
      }
    }
  };
  const ways = [
    { t: L('콘텐츠와 IP', 'Content & IP'), d: L('고전, 교육, 캐릭터처럼 깊이 있는 콘텐츠를 오래 쓰이는 앱으로 옮기는 일.', 'Turning deep content, from classics and education to characters, into apps people keep using.') },
    { t: L('교육 현장', 'Education'), d: L('학교·도서관·교육 기관과 함께 배움 앱을 만들고 다듬는 일.', 'Building and refining learning apps with schools, libraries and education partners.') },
    { t: L('투자와 사업 제휴', 'Investment & partnerships'), d: L('제품군과 앞으로의 계획을 자세히 설명드립니다.', 'We are glad to walk you through the product line and what comes next.') },
  ];
  return (
    <section id="contact" className="yp-contact">
      <div className="yp-wrap">
        <header className="yp-sec-head yp-rv">
          <p className="yp-eyebrow">{L('함께 일하기', 'Work with us')}</p>
          <h2 className="yp-h2">{L('함께 만들 분을 찾습니다.', 'We are looking for people to build with.')}</h2>
        </header>
        <div className="yp-ways">
          {ways.map((w) => (
            <div key={w.t} className="yp-way yp-rv">
              <b>{w.t}</b>
              <p>{w.d}</p>
            </div>
          ))}
        </div>
        <div className="yp-mailbox yp-rv">
          <span className="yp-mail-label">{L('문의', 'Contact')}</span>
          <a id="yp-mail" href={`mailto:${MAIL}`} className="yp-mail">
            {MAIL}
          </a>
          <button type="button" className="yp-btn" onClick={copy}>
            {copied ? L('복사했습니다', 'Copied') : L('주소 복사', 'Copy address')}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────── 꼬리 ─────────────────────────── */

function Footer() {
  const { L } = useLang();
  return (
    <footer className="yp-footer">
      <div className="yp-wrap">
        <div className="yp-foot-top">
          <a href="#top" className="yp-brand" aria-label="YeahPlus">
            <Logo size={18} />
            <span>YeahPlus</span>
          </a>
          <div className="yp-foot-cols">
            {CATS.map((c) => (
              <nav key={c.id} aria-label={L(c.ko, c.en)}>
                <b>{L(c.ko, c.en)}</b>
                <ul>
                  {PRODUCTS.filter((p) => p.cat === c.id).map((p) => (
                    <li key={p.id}>
                      <ProductLink p={p}>{L(p.ko, p.en)}</ProductLink>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <address className="yp-biz">
          {L('주식회사 예아플러스', 'YeahPlus Inc.')} · {L('대표', 'CEO')} {L('고재혁', 'Jaehyuk Ko')} · {L('사업자등록번호', 'Business Reg. No.')} 283-88-02519 ·{' '}
          {L('통신판매업신고', 'Mail-order Reg.')} {L('2022-경기파주-2995', '2022-Gyeonggi Paju-2995')}
          <br />
          {L('경기도 파주시 교하로159번길 33, 3층 304호 에이318', '3F 304-A318, 33 Gyoha-ro 159beon-gil, Paju-si, Gyeonggi-do, Korea')} · {MAIL}
          <br />© {new Date().getFullYear()} YeahPlus Inc.
        </address>
      </div>
    </footer>
  );
}

/* ─────────────────────────── 페이지 ─────────────────────────── */

function Page() {
  useReveal();
  return (
    <div className="yp">
      <Header />
      <main>
        <Hero />
        <Pillars />
        <Products />
        <People />
        <History />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}
