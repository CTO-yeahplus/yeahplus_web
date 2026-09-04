'use client';

import { CalendarDays, Eye, Hammer, Link2, Palette, Sparkles } from 'lucide-react';
import { useLang } from './i18n';

// 출시 후 아래에 실제 App Store URL 을 넣으면 버튼이 자동으로 활성화됩니다.
const APP_STORE_URL = '';

const FEATURES: { Icon: typeof CalendarDays; ko: [string, string]; en: [string, string] }[] = [
  {
    Icon: Link2,
    ko: ['체인 스코어링', '검증된 트라이픽스 손맛 위에 칩 × 배율. 체인 12는 화면이 흔들립니다.'],
    en: ['Chain scoring', 'The proven TriPeaks feel, scored chips × mult. A 12-chain shakes the screen.'],
  },
  {
    Icon: Hammer,
    ko: ['카드 세공', '끌질로 랭크를 깎고, 6종 인장을 새기고, 와일드를 주조하고, 못난 카드는 녹입니다.'],
    en: ['Card forging', 'Chisel ranks, stamp six seals, cast Wilds, melt the duds. Your deck carries every scar.'],
  },
  {
    Icon: Sparkles,
    ko: ['참 45종', '규칙을 비틀고 배율을 쌓는 유물들. 16종은 도전으로 해금됩니다.'],
    en: ['45 charms', 'Relics that bend the rules and stack multipliers. Sixteen unlock through play.'],
  },
  {
    Icon: Eye,
    ko: ['보스 8종 × 레이아웃 6종', '인장 봉인, 안개, 쇠사슬… 매 챕터 규칙이 바뀝니다.'],
    en: ['8 bosses × 6 layouts', 'Rusted seals, fog, chained cards… every chapter rewrites the rules.'],
  },
  {
    Icon: CalendarDays,
    ko: ['데일리 · 주간 챌린지', '매일, 그리고 매주 전 세계가 같은 보드를 벼립니다. Game Center 리더보드 3종 + 도전과제 15종.'],
    en: ['Daily & weekly challenges', 'Everyone forges the same board — daily and weekly. Three Game Center leaderboards, fifteen achievements.'],
  },
  {
    Icon: Palette,
    ko: ['테마 4종 · 테마별 카드덱', '대장간·선술집·던전·미니멀 — 카드 앞뒷면과 음악까지 통째로 바뀝니다.'],
    en: ['4 themes, 4 deck skins', 'Forge, Tavern, Dungeon, Minimal — cards, backs and soundtrack transform together.'],
  },
];

export default function HomeContent() {
  const { lang } = useLang();
  const ko = lang === 'ko';

  return (
    <main>
      <header className="af-header">
        <div className="af-floats" aria-hidden>
          <span className="af-fc b" style={{ left: '6%', top: '20%', '--r': '-10deg' } as React.CSSProperties}>A♠</span>
          <span className="af-fc r" style={{ left: '14%', top: '64%', '--r': '6deg', animationDelay: '1.2s' } as React.CSSProperties}>Q♥</span>
          <span className="af-fc b" style={{ right: '8%', top: '26%', '--r': '9deg', animationDelay: '.6s' } as React.CSSProperties}>K♣</span>
          <span className="af-fc r" style={{ right: '15%', top: '66%', '--r': '-7deg', animationDelay: '2s' } as React.CSSProperties}>J♦</span>
        </div>
        <div className="af-wrap" style={{ position: 'relative' }}>
          <div className="af-emblem">
            <span className="af-em-ring" />
            <span className="af-em-glyph">♠</span>
          </div>
          <h1 className="af-h1">
            ACE<b>FORGE</b>
          </h1>
          <div className="af-tagline">{ko ? '솔리테어 로그라이크' : 'A Solitaire Roguelike'}</div>
          <p className="af-pitch">
            {ko
              ? '잇고, 벼리고, 터뜨려라. 트라이픽스 솔리테어에 로그라이크 빌드를 결합했습니다. 체인이 길수록 배율이 폭발하고, 덱 52장은 한 장 한 장 당신 손으로 세공됩니다.'
              : 'Chain. Forge. Detonate. TriPeaks solitaire crossed with a roguelike builder — the longer the chain, the harder the score detonates, and every one of your 52 cards can be forged by hand.'}
          </p>
          <div className="af-store-row">
            <a
              className="af-store-btn"
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
            <span className="af-price-tag">
              {ko ? '유료 · 광고 없음 · 인앱결제 없음 · 완전 오프라인' : 'Premium · No ads · No IAP · Fully offline'}
            </span>
          </div>
        </div>
      </header>

      <div className="af-wrap">
        <section className="af-section">
          <div className="af-loop">
            {ko ? (
              <>
                <b>모루</b>보다 1 높거나 낮은 카드를 이어 <b>체인</b>을 만든다 → 체인 n번째 카드는{' '}
                <b>+(n−1) 배율</b> → 라운드 사이 <b>대장간</b>에서 카드를 세공한다 → 8개 챕터의 쿼터를
                돌파한다. A와 K는 이어진다.
              </>
            ) : (
              <>
                Play cards one rank above or below the <b>anvil</b> to build a <b>chain</b> → the n-th link
                scores at <b>+(n−1) mult</b> → between rounds, <b>forge</b> your cards → beat the quota across 8
                chapters. A and K connect.
              </>
            )}
          </div>
        </section>

        <section className="af-section" id="features">
          <h2 className="af-h2">{ko ? '특징' : 'Features'}</h2>
          <div className="af-grid">
            {FEATURES.map((f) => {
              const [title, desc] = ko ? f.ko : f.en;
              const Icon = f.Icon;
              return (
                <div className="af-feat" key={title}>
                  <span className="af-fi">
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <b>{title}</b>
                  <p>{desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="af-section">
          <h2 className="af-h2">{ko ? '정직한 가격' : 'An honest price'}</h2>
          <p>
            {ko
              ? '광고 없음. 인앱결제 없음. 계정도, 네트워크도 없습니다. 한 번 사면 끝 — 과금 요소는 당신의 운뿐입니다.'
              : 'No ads. No in-app purchases. No accounts, no network. Pay once — luck is the only microtransaction.'}
          </p>
        </section>

        <section className="af-section" id="series">
          <h2 className="af-h2">{ko ? 'Forge 시리즈' : 'The Forge series'}</h2>
          <p>
            {ko
              ? '같은 규칙으로 벼려낸 로그라이크 다섯 편. 광고도, 인앱결제도, 계정도 없습니다.'
              : 'Five roguelikes forged from one ruleset. No ads, no in-app purchases, no accounts.'}
          </p>
          <div className="af-series-grid">
            <a href="/wordforge">
              <b>WORDFORGE</b>
              <span>{ko ? '한글 워드 로그라이크' : 'A Hangul word roguelike'}</span>
            </a>
            <a href="/pipforge">
              <b>PIPFORGE</b>
              <span>{ko ? '주사위 로그라이크' : 'A dice roguelike'}</span>
            </a>
            <a href="/mineforge">
              <b>MINEFORGE</b>
              <span>{ko ? '지뢰찾기 로그라이크' : 'A minesweeper roguelike'}</span>
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
