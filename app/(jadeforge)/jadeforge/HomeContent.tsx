'use client';

import { CalendarDays, Eye, Hammer, Palette, Pickaxe, Sparkles } from 'lucide-react';
import { useLang } from './i18n';

// 출시 후 아래에 실제 App Store URL 을 넣으면 버튼이 자동으로 활성화됩니다.
const APP_STORE_URL = '';

const FEATURES: { Icon: typeof CalendarDays; ko: [string, string]; en: [string, string] }[] = [
  {
    Icon: Pickaxe,
    ko: ['맥 스코어링', '검증된 마작 솔리테어 손맛 위에 칩 × 배율. 맥 12는 화면이 흔들립니다.'],
    en: ['Vein scoring', 'The proven mahjong-solitaire feel, scored chips × mult. A 12-link vein shakes the screen.'],
  },
  {
    Icon: Hammer,
    ko: ['타일 세공', '숫자를 조각하고, 6종 각인을 새기고, 백옥을 주조하고, 못난 쌍은 녹입니다. 세공은 언제나 쌍 단위 — 홀짝 미스매치가 없습니다.'],
    en: ['Tile carving', 'Renumber kinds, engrave six marks, cast White Jade, melt the duds. Carving is always pair-wise — no orphaned tiles, ever.'],
  },
  {
    Icon: Sparkles,
    ko: ['참 45종', '규칙을 비틀고 배율을 쌓는 유물들. 16종은 도전으로 해금됩니다.'],
    en: ['45 charms', 'Relics that bend the rules and stack multipliers. Sixteen unlock through play.'],
  },
  {
    Icon: Eye,
    ko: ['보스 8종 × 산 6종', '각인 봉인, 안개, 사슬… 매 챕터 규칙이 바뀝니다. 거북·용·탑·정원·다리·왕관.'],
    en: ['8 bosses × 6 mountains', 'Rusted engravings, fog, chained tiles… every chapter rewrites the rules. Turtle, Dragon, Pagoda, Garden, Bridge, Crown.'],
  },
  {
    Icon: CalendarDays,
    ko: ['데일리 · 주간 옥산', '매일, 그리고 매주 전 세계가 같은 산을 캡니다. Game Center 리더보드 3종 + 도전과제 15종.'],
    en: ['Daily & weekly mountains', 'Everyone digs the same mountain — daily and weekly. Three Game Center leaderboards, fifteen achievements.'],
  },
  {
    Icon: Palette,
    ko: ['테마 4종 · 테마별 타일', '옥공방·대장간·야시장·미니멀 — 타일 앞뒷면과 음악까지 통째로 바뀝니다.'],
    en: ['4 themes, 4 tile skins', 'Jade Works, Forge, Night Market, Minimal — tiles, backs and soundtrack transform together.'],
  },
];

export default function HomeContent() {
  const { lang } = useLang();
  const ko = lang === 'ko';

  return (
    <main>
      <header className="jf-header">
        <div className="jf-floats" aria-hidden>
          <span className="jf-ft g" style={{ left: '6%', top: '20%', '--r': '-10deg' } as React.CSSProperties}>發</span>
          <span className="jf-ft a" style={{ left: '14%', top: '64%', '--r': '6deg', animationDelay: '1.2s' } as React.CSSProperties}>9●</span>
          <span className="jf-ft r" style={{ right: '8%', top: '26%', '--r': '9deg', animationDelay: '.6s' } as React.CSSProperties}>中</span>
          <span className="jf-ft w" style={{ right: '15%', top: '66%', '--r': '-7deg', animationDelay: '2s' } as React.CSSProperties}>東</span>
        </div>
        <div className="jf-wrap" style={{ position: 'relative' }}>
          <div className="jf-emblem">
            <span className="jf-em-ring" />
            <span className="jf-em-glyph">發</span>
          </div>
          <h1 className="jf-h1">
            JADE<b>FORGE</b>
          </h1>
          <div className="jf-tagline">{ko ? '마작 로그라이크' : 'A Mahjong Roguelike'}</div>
          <p className="jf-pitch">
            {ko
              ? '잇고, 캐고, 터뜨려라. 마작 솔리테어에 로그라이크 빌드를 결합했습니다. 같은 문양을 이으면 맥이 자라 배율이 폭발하고, 타일 한 벌은 종류별로 당신 손으로 세공됩니다. 모든 산은 반드시 풀 수 있게 쌓입니다.'
              : 'Match. Vein. Detonate. Mahjong solitaire crossed with a roguelike builder — follow the suit and your vein multiplies every score, and every tile kind can be carved by hand. Every deal is guaranteed solvable.'}
          </p>
          <div className="jf-store-row">
            <a
              className="jf-store-btn"
              href={APP_STORE_URL || '#'}
              aria-disabled={APP_STORE_URL ? undefined : true}
              target={APP_STORE_URL ? '_blank' : undefined}
              rel={APP_STORE_URL ? 'noreferrer' : undefined}
            >
              <span>
                <small>{ko ? 'App Store에서' : 'Download on the'}</small>
                App Store
              </span>
            </a>
            <span className="jf-price-tag">
              {ko ? '유료 · 광고 없음 · 인앱결제 없음 · 완전 오프라인' : 'Premium · No ads · No IAP · Fully offline'}
            </span>
          </div>
        </div>
      </header>

      <div className="jf-wrap">
        <section className="jf-section">
          <div className="jf-loop">
            {ko ? (
              <>
                위가 비고 옆이 열린 <b>자유 타일</b> 두 장을 짝지어 캔다 → 같은 문양은 <b>맥 +1</b>, 같은
                숫자는 <b>공명 +2</b> — 맥 레벨만큼 배율 → 라운드 사이 <b>옥공방</b>에서 타일을 세공한다 → 8개
                챕터의 쿼터를 돌파한다. 막히면 <b>재련</b> — 산은 언제나 풀 수 있게 다시 쌓인다.
              </>
            ) : (
              <>
                Match two identical <b>free tiles</b> to dig → same suit grows the <b>vein +1</b>, same number
                strikes <b>resonance +2</b> — each level is +1 mult → between rounds, <b>carve</b> your tiles at
                the Jade Works → beat the quota across 8 chapters. Stuck? <b>Reforge</b> — the mountain always
                restacks solvable.
              </>
            )}
          </div>
        </section>

        <section className="jf-section" id="features">
          <h2 className="jf-h2">{ko ? '특징' : 'Features'}</h2>
          <div className="jf-grid">
            {FEATURES.map((f) => {
              const [title, desc] = ko ? f.ko : f.en;
              const Icon = f.Icon;
              return (
                <div className="jf-feat" key={title}>
                  <span className="jf-fi">
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <b>{title}</b>
                  <p>{desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="jf-section">
          <h2 className="jf-h2">{ko ? '정직한 가격' : 'An honest price'}</h2>
          <p>
            {ko
              ? '광고 없음. 인앱결제 없음. 계정도, 네트워크도 없습니다. 한 번 사면 끝 — 과금 요소는 당신의 운뿐입니다.'
              : 'No ads. No in-app purchases. No accounts, no network. Pay once — luck is the only microtransaction.'}
          </p>
        </section>
      </div>
    </main>
  );
}
