'use client';

import { CalendarDays, Eye, Flag, Gem, Palette, Pickaxe, Sparkles } from 'lucide-react';
import { useLang } from './i18n';

// 출시 후 아래에 실제 App Store URL 을 넣으면 버튼이 자동으로 활성화됩니다.
const APP_STORE_URL = '';

const FEATURES: { Icon: typeof CalendarDays; ko: [string, string]; en: [string, string] }[] = [
  {
    Icon: Pickaxe,
    ko: ['광맥 스코어링', '검증된 지뢰찾기 추리 위에 칩 × 배율. 광맥 12는 화면이 흔들립니다.'],
    en: ['Seam scoring', 'The proven minesweeper deduction, scored chips × mult. A 12-link seam shakes the screen.'],
  },
  {
    Icon: Gem,
    ko: ['보물 매설', '보석·금덩이·잉걸돌·정동·행운석·메아리석·별똥석 — 배낭의 광석이 매 보드에 심기고, 흙 밑 반짝임이 보입니다.'],
    en: ['Buried treasure', 'Gems, gold, ember stones, geodes, lucky lodes, echo crystals, starfall — your satchel seeds every board, glinting under the dirt.'],
  },
  {
    Icon: Sparkles,
    ko: ['참 45종', '규칙을 비틀고 배율을 쌓는 유물들. 16종은 도전으로 해금됩니다.'],
    en: ['45 charms', 'Relics that bend the rules and stack multipliers. Sixteen unlock through play.'],
  },
  {
    Icon: Eye,
    ko: ['보스 8종 × 채석장 6종', '광석 봉인, 침묵하는 카나리아, 돌무더기… 매 챕터 규칙이 바뀝니다. 노천광·십자·금강석·동굴·계단·왕관.'],
    en: ['8 bosses × 6 quarries', 'Inert stones, muzzled canaries, rubble-choked tiles… every chapter rewrites the rules. Pit, Crosscut, Adamant, Cavern, Terraces, Crown.'],
  },
  {
    Icon: CalendarDays,
    ko: ['데일리 · 주간 채석장', '매일, 그리고 매주 전 세계가 같은 지뢰밭을 팝니다. Game Center 리더보드 3종 + 도전과제 15종.'],
    en: ['Daily & weekly quarries', 'Everyone digs the same field — daily and weekly. Three Game Center leaderboards, fifteen achievements.'],
  },
  {
    Icon: Palette,
    ko: ['테마 4종', '갱도·대장간·수정 동굴·설계도면 — 보드와 음악까지 통째로 바뀝니다.'],
    en: ['4 themes', 'Gallery, Forge, Crystal Cavern, Blueprint — board and soundtrack transform together.'],
  },
];

export default function HomeContent() {
  const { lang } = useLang();
  const ko = lang === 'ko';

  return (
    <main>
      <header className="mf-header">
        <div className="mf-floats" aria-hidden>
          <span className="mf-ft open b" style={{ left: '6%', top: '20%', '--r': '-10deg' } as React.CSSProperties}>1</span>
          <span className="mf-ft gm" style={{ left: '14%', top: '64%', '--r': '6deg', animationDelay: '1.2s' } as React.CSSProperties}>
            <Gem size={24} strokeWidth={1.8} aria-hidden />
          </span>
          <span className="mf-ft open r" style={{ right: '8%', top: '26%', '--r': '9deg', animationDelay: '.6s' } as React.CSSProperties}>3</span>
          <span className="mf-ft gm" style={{ right: '15%', top: '66%', '--r': '-7deg', animationDelay: '2s' } as React.CSSProperties}>
            <Flag size={22} strokeWidth={1.8} aria-hidden />
          </span>
        </div>
        <div className="mf-wrap" style={{ position: 'relative' }}>
          <div className="mf-emblem">
            <span className="mf-em-ring" />
            <span className="mf-em-glyph"><Gem size={44} strokeWidth={1.6} aria-hidden /></span>
          </div>
          <h1 className="mf-h1">
            MINE<b>FORGE</b>
          </h1>
          <div className="mf-tagline">{ko ? '지뢰찾기 로그라이크' : 'A Minesweeper Roguelike'}</div>
          <p className="mf-pitch">
            {ko
              ? '파고, 잇고, 터뜨려라. 지뢰찾기에 로그라이크 빌드를 결합했습니다. 직전 칸 옆을 이어 파면 광맥이 자라 배율이 폭발하고, 배낭 속 광석은 매 보드에 보물로 매설됩니다. 첫 발굴은 언제나 안전합니다.'
              : 'Dig. Chain. Detonate. Classic minesweeper crossed with a roguelike builder — chain adjacent digs and the seam multiplies every score, and the stones in your satchel are buried as treasure in every board. Your first dig is always safe.'}
          </p>
          <div className="mf-store-row">
            <a
              className="mf-store-btn"
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
            <span className="mf-price-tag">
              {ko ? '유료 · 광고 없음 · 인앱결제 없음 · 완전 오프라인' : 'Premium · No ads · No IAP · Fully offline'}
            </span>
          </div>
        </div>
      </header>

      <div className="mf-wrap">
        <section className="mf-section">
          <div className="mf-loop">
            {ko ? (
              <>
                칸을 파면 숫자가 주변 지뢰를 알려준다 → 직전 발굴 옆을 이어 파면 <b>광맥 +1</b>, 같은 숫자는{' '}
                <b>공명 +2</b> — 레벨만큼 배율 → 지뢰는 <b>버팀목</b>이 대신 받고, 막히면 <b>카나리아</b>가
                안전한 칸을 노래한다 → 라운드 사이 <b>발파 공방</b>에서 광석을 심고 뇌관을 해체한다 → 8개
                챕터의 쿼터를 돌파한다.
              </>
            ) : (
              <>
                Dig a tile and the numbers count nearby mines → chain adjacent digs to grow the{' '}
                <b>seam +1</b>, same number strikes <b>resonance +2</b> — each level is +1 mult →{' '}
                <b>pit props</b> absorb your mine strikes, and the <b>canary</b> sings over a provably safe tile
                → between rounds, bury stones and defuse mines at the <b>Blast Works</b> → beat the quota across
                8 chapters.
              </>
            )}
          </div>
        </section>

        <section className="mf-section" id="features">
          <h2 className="mf-h2">{ko ? '특징' : 'Features'}</h2>
          <div className="mf-grid">
            {FEATURES.map((f) => {
              const [title, desc] = ko ? f.ko : f.en;
              const Icon = f.Icon;
              return (
                <div className="mf-feat" key={title}>
                  <span className="mf-fi">
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <b>{title}</b>
                  <p>{desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mf-section">
          <h2 className="mf-h2">{ko ? '정직한 가격' : 'An honest price'}</h2>
          <p>
            {ko
              ? '광고 없음. 인앱결제 없음. 계정도, 네트워크도 없습니다. 한 번 사면 끝 — 과금 요소는 당신의 운뿐입니다.'
              : 'No ads. No in-app purchases. No accounts, no network. Pay once — luck is the only microtransaction.'}
          </p>
        </section>

        <section className="mf-section" id="series">
          <h2 className="mf-h2">{ko ? 'Forge 시리즈' : 'The Forge series'}</h2>
          <p>
            {ko
              ? '같은 규칙으로 벼려낸 로그라이크 다섯 편. 광고도, 인앱결제도, 계정도 없습니다.'
              : 'Five roguelikes forged from one ruleset. No ads, no in-app purchases, no accounts.'}
          </p>
          <div className="mf-series-grid">
            <a href="/wordforge">
              <b>WORDFORGE</b>
              <span>{ko ? '한글 워드 로그라이크' : 'A Hangul word roguelike'}</span>
            </a>
            <a href="/pipforge">
              <b>PIPFORGE</b>
              <span>{ko ? '주사위 로그라이크' : 'A dice roguelike'}</span>
            </a>
            <a href="/aceforge">
              <b>ACEFORGE</b>
              <span>{ko ? '솔리테어 로그라이크' : 'A solitaire roguelike'}</span>
            </a>
            <a href="/jadeforge">
              <b>JADEFORGE</b>
              <span>{ko ? '마작 로그라이크' : 'A mahjong roguelike'}</span>
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
