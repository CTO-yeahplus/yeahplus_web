'use client';

// 원본 src/pages/Home.jsx 이식 — 문구는 그대로, 이모지 아이콘만 라인 아이콘(lucide)으로 교체.
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Flame, Globe, Hammer, ScrollText, Snowflake, Sparkles } from 'lucide-react';
import { useLang } from './i18n';

// App Store Connect 에 제출된 HashRouter 주소 호환: /pipforge/#/privacy → /pipforge/privacy
const HASH_ROUTES = ['privacy', 'support', 'terms'];

// 앱이 App Store 에 라이브되면 아래 주소를 실제 링크로 교체하세요(ASC 앱 페이지에서 복사).
const APP_STORE_URL = 'https://apps.apple.com/app/pipforge';

const ICONS = [Hammer, Sparkles, ScrollText, Snowflake, Flame, Globe];

const SHOTS = ['contract.png', 'fg_idle.png', 'cards_shop.png'];

const T = {
  ko: {
    tag: '주사위 로그라이크',
    hero1: '굴리고, 벼리고,',
    hero2: '터뜨려라',
    sub: '주사위 눈을 직접 세공해 나만의 조합을 만들고, 칩 × 배율을 말도 안 되는 숫자까지 쌓아 올리는 유료 로그라이크. 광고 없음, 인앱결제 없음, 완전 오프라인.',
    cta: 'App Store에서 다운로드',
    ctaSub: '$2.99 · iPhone (iOS 15+)',
    fTitle: '대장간에서 벌어지는 일',
    features: [
      ['주사위 세공', '면 하나하나를 끌질하세요. 5·6·7·8·9·9 주사위는 약속된 미래입니다.'],
      ['참 45종', '홀로그램 카드로 수집하는 유물들. 되지도 않을 조합을 굴려보는 재미.'],
      ['계약과 보스', '점수만으로는 부족합니다. 계약을 이행하고 규칙을 비트는 보스 8인을 넘으세요.'],
      ['식은 족보', '같은 족보를 반복하면 점수가 식습니다. 매 라운드를 다른 길로 풀어내세요.'],
      ['담금질 사다리', '이길수록 화로는 뜨거워집니다. 담금질 5단계, 승리 장부를 채우세요.'],
      ['글로벌 리더보드', '데일리 챌린지 — 오늘은 모두가 같은 주사위를 굴립니다. Game Center 순위 경쟁.'],
    ],
    shotsTitle: '스크린샷',
    noAds: '광고 없음 · 인앱결제 없음 · 한 번 사면 끝',
  },
  en: {
    tag: 'A DICE ROGUELIKE',
    hero1: 'Roll. Forge.',
    hero2: 'Detonate.',
    sub: 'Chisel the faces of your own dice, stack chips × mult to absurd numbers. A pay-once roguelike — no ads, no in-app purchases, fully offline.',
    cta: 'Download on the App Store',
    ctaSub: '$2.99 · iPhone (iOS 15+)',
    fTitle: 'What happens at the forge',
    features: [
      ['Dice forging', 'Chisel individual faces. A die with 5·6·7·8·9·9 is a promise.'],
      ['45 charms', 'Holographic collectible relics that bend every rule.'],
      ['Contracts & bosses', 'The quota alone is not enough. Fulfill contracts, survive 8 rule-bending bosses.'],
      ['Cooled combos', 'Replaying a combo halves it. Solve every round along a different line.'],
      ['Temper ladder', 'Every win makes the forge hotter. Five temper rungs, one victory ledger.'],
      ['Global leaderboards', 'Daily challenge — everyone rolls the same dice today. Game Center rankings.'],
    ],
    shotsTitle: 'Screenshots',
    noAds: 'No ads · No IAP · Pay once',
  },
} as const;

export default function HomeContent() {
  const { lang } = useLang();
  const t = T[lang];
  const router = useRouter();

  useEffect(() => {
    const target = window.location.hash.replace(/^#\/?/, '').split(/[?#]/)[0];
    if (HASH_ROUTES.includes(target)) router.replace(`/pipforge/${target}`);
  }, [router]);

  return (
    <main className="pf-main">
      <section className="pf-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="pf-hero-icon"
          src="/pipforge/pipforge_icon.png"
          alt="Pipforge app icon"
          width={112}
          height={112}
        />
        <div className="pf-hero-tag">{t.tag}</div>
        <h1>
          {t.hero1}
          <br />
          {t.hero2}
        </h1>
        <p className="pf-hero-sub">{t.sub}</p>
        <a className="pf-cta" href={APP_STORE_URL} target="_blank" rel="noreferrer">
          {t.cta}
        </a>
        <div className="pf-cta-sub">{t.ctaSub}</div>
        <div className="pf-badge-line">{t.noAds}</div>
      </section>

      <section className="pf-features">
        <h2>{t.fTitle}</h2>
        <div className="pf-feature-grid">
          {t.features.map(([h, b], i) => {
            const Icon = ICONS[i];
            return (
              <div className="pf-feature" key={h}>
                <span className="pf-f-ico">
                  <Icon size={21} strokeWidth={1.75} aria-hidden />
                </span>
                <h3>{h}</h3>
                <p>{b}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pf-shots">
        <h2>{t.shotsTitle}</h2>
        <div className="pf-shot-row">
          {SHOTS.map((f) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={f}
              src={`/pipforge/shots/${f}`}
              alt="Pipforge gameplay"
              width={390}
              height={844}
              loading="lazy"
            />
          ))}
        </div>
      </section>
    </main>
  );
}
