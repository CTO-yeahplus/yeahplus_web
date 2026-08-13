'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useLang } from './i18n';

// 이전 정적 배포에서 HashRouter 로 안내된 주소 호환: /wordforge/#/privacy → /wordforge/privacy
const HASH_ROUTES = ['privacy', 'terms', 'support'];

const TILES = ['ㄴ', 'ㅏ', 'ㅁ', 'ㅜ'];

const KO = {
  badge: 'yeahplus 제작 · 워드 로그라이크',
  tagline: '낱말을 만들어 점수를 터뜨린다.',
  sub: '자모를 이어 음절을 만들고, 참과 두루마리를 모아 판을 키우세요. 광고도, 인앱결제도, 인터넷 연결도 없습니다.',
  appstore: 'App Store (준비 중)',
  support: '지원 · FAQ',
  note: '한국어 · English · 4+ 전 연령 · iPhone',
  combineKicker: '자모 조합',
  combineTitle: '누른 순서대로 글자가 됩니다.',
  combineLead: '자모 타일을 차례로 누르면 음절이 조합됩니다. 쌍자음도, 이중모음도, 겹받침도 그대로 만들어집니다.',
  rules: [
    { eq: 'ㄱ + ㄱ = ㄲ', desc: '같은 자음을 이어 누르면 쌍자음' },
    { eq: 'ㅗ + ㅏ = ㅘ', desc: '모음도 합쳐집니다 (ㅜ+ㅣ=ㅟ, ㅡ+ㅣ=ㅢ)' },
    { eq: 'ㄹ + ㄱ = ㄺ', desc: '겹받침까지 — 닭, 값, 앉다' },
  ],
  scoreKicker: '점수',
  scoreTitle: '길게 쓸수록 크게 터집니다.',
  scoreLead: '점수는 칩과 배율의 곱입니다. 자모를 많이 쓴 단어일수록 배율이 커지고, 한 판의 승부가 갈립니다.',
  lootKicker: '로그라이크',
  lootTitle: '매판 다른 조합으로.',
  loot: [
    {
      cap: 'Charms',
      title: '참 — 최대 5개',
      desc: '판이 끝날 때까지 계속 작동하는 패시브. 무엇을 남기고 무엇을 버릴지가 곧 빌드입니다.',
      list: [],
    },
    {
      cap: 'Scrolls',
      title: '두루마리 — 최대 2개',
      desc: '한 번 쓰고 사라지는 도구. 통찰 두루마리는 지금 패에서 만들 수 있는 최고의 단어를 바로 찾아 줍니다.',
      list: [],
    },
    {
      cap: 'Forge',
      title: '단조 — 타일 강화',
      desc: '타일을 벼려 영구 보너스를 붙입니다.',
      list: [
        ['무쇠 Iron', '칩 증가'],
        ['도금 Gilded', '배율 증가'],
        ['잉걸 Ember', '두 번 채점'],
      ],
    },
  ],
  featKicker: '이런 게임입니다',
  featTitle: '조용하고, 정직하게.',
  feats: [
    { t: '완전 오프라인', d: '인터넷에 연결하지 않습니다. 비행기 안에서도 그대로.' },
    { t: '광고 없음', d: '배너도 전면 광고도 없습니다.' },
    { t: '1회 구매', d: '인앱결제 없이 한 번 사면 끝입니다.' },
    { t: '개인정보 미수집', d: '계정도 로그인도 없습니다. 기록은 기기 안에만.' },
    { t: '한국어 · English', d: '두 언어 모드. 영어는 공개 어휘 목록(ENABLE) 기준.' },
    { t: '순위표', d: 'Game Center 순위표는 선택 기능입니다.' },
    { t: '막힌 패 없음', d: '패를 나눌 때 단어 가능 여부를 검사하고, 안 되면 다시 뽑습니다.' },
    { t: '4+ 전 연령', d: '누구나 즐길 수 있는 등급으로 준비했습니다.' },
  ],
  ctaTitle: '오늘의 한 판.',
  ctaText: '자모 몇 개면 충분합니다.',
};

const EN = {
  badge: 'Made by yeahplus · A word roguelike',
  tagline: 'Build words. Blow up the score.',
  sub: 'Chain letters into words, stack charms and scrolls, and push the run further. No ads, no in-app purchases, no internet connection.',
  appstore: 'App Store (coming soon)',
  support: 'Support · FAQ',
  note: 'Korean · English · Ages 4+ · iPhone',
  combineKicker: 'Assembly',
  combineTitle: 'Tap in order, letters become a word.',
  combineLead:
    'In Korean mode, jamo tiles assemble into syllables as you tap them — double consonants, compound vowels and final clusters all included.',
  rules: [
    { eq: 'ㄱ + ㄱ = ㄲ', desc: 'Repeat a consonant for its tense form' },
    { eq: 'ㅗ + ㅏ = ㅘ', desc: 'Vowels combine too (ㅜ+ㅣ=ㅟ, ㅡ+ㅣ=ㅢ)' },
    { eq: 'ㄹ + ㄱ = ㄺ', desc: 'Even final clusters — 닭, 값, 앉다' },
  ],
  scoreKicker: 'Scoring',
  scoreTitle: 'The longer the word, the bigger the blast.',
  scoreLead:
    'Score is chips times mult. Longer words raise the mult, and one good word can decide the whole round.',
  lootKicker: 'Roguelike',
  lootTitle: 'A different build every run.',
  loot: [
    {
      cap: 'Charms',
      title: 'Charms — up to 5',
      desc: 'Passive powers that keep working for the whole run. What you keep and what you drop is your build.',
      list: [],
    },
    {
      cap: 'Scrolls',
      title: 'Scrolls — up to 2',
      desc: 'One-use tools. The Insight scroll reveals the best word available in your current hand.',
      list: [],
    },
    {
      cap: 'Forge',
      title: 'Forge — upgrade tiles',
      desc: 'Forge tiles for permanent bonuses.',
      list: [
        ['Iron', '+chips'],
        ['Gilded', '+mult'],
        ['Ember', 'scores twice'],
      ],
    },
  ],
  featKicker: 'What it is',
  featTitle: 'Quiet and honest.',
  feats: [
    { t: 'Fully offline', d: 'The game never connects to the internet. Works on a plane.' },
    { t: 'No ads', d: 'No banners, no interstitials.' },
    { t: 'One-time purchase', d: 'Buy once. There are no in-app purchases.' },
    { t: 'No data collected', d: 'No accounts, no login. Progress stays on your device.' },
    { t: 'Korean & English', d: 'Two language modes; English uses the public ENABLE word list.' },
    { t: 'Leaderboards', d: 'Game Center leaderboards are entirely optional.' },
    { t: 'No dead hands', d: 'Every deal is checked for a playable word and re-drawn if there is none.' },
    { t: 'Rated 4+', d: 'Suitable for all ages.' },
  ],
  ctaTitle: 'One run today.',
  ctaText: 'A handful of letters is enough.',
};

export default function HomeContent() {
  const { lang } = useLang();
  const t = lang === 'ko' ? KO : EN;
  const router = useRouter();

  useEffect(() => {
    const target = window.location.hash.replace(/^#\/?/, '').split(/[?#]/)[0];
    if (HASH_ROUTES.includes(target)) router.replace(`/wordforge/${target}`);
  }, [router]);

  return (
    <main className="wf-main wf-main-home">
      <section className="wf-hero">
        <div className="wf-hero-inner">
          <span className="wf-badge">{t.badge}</span>
          <div className="wf-hero-logo">W</div>
          <h1 className="wf-hero-title">WORDFORGE</h1>
          <div className="wf-hero-kr">워드포지</div>
          <p className="wf-hero-tagline">{t.tagline}</p>
          <p className="wf-hero-sub">{t.sub}</p>
          <div className="wf-cta-row">
            {/* 앱이 App Store 에 라이브되면 아래 href 를 실제 링크로 교체하세요. */}
            <a className="wf-btn wf-btn-primary" href="#" aria-disabled="true">
              {t.appstore}
            </a>
            <Link className="wf-btn wf-btn-ghost" href="/wordforge/support">
              {t.support}
            </Link>
          </div>
          <p className="wf-hero-note">{t.note}</p>
        </div>
        <div className="wf-rule" />
      </section>

      <section className="wf-section wf-wrap-wide">
        <p className="wf-kicker">{t.combineKicker}</p>
        <h2 className="wf-section-title">{t.combineTitle}</h2>
        <p className="wf-section-lead">{t.combineLead}</p>
        <div className="wf-combo">
          <div className="wf-tile-row">
            {TILES.map((c, i) => (
              <div className="wf-jt" key={`${c}-${i}`}>
                {c}
              </div>
            ))}
            <span className="wf-eq">=</span>
            <div className="wf-jt" style={{ width: 44 }}>
              나
            </div>
            <div className="wf-jt" style={{ width: 44 }}>
              무
            </div>
          </div>
          <p className="wf-word">나무</p>
          <div className="wf-rules">
            {t.rules.map((r) => (
              <div className="wf-rule-card" key={r.eq}>
                <div className="wf-rule-eq">{r.eq}</div>
                <div className="wf-rule-desc">{r.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="wf-section wf-wrap-wide">
        <p className="wf-kicker">{t.scoreKicker}</p>
        <h2 className="wf-section-title">{t.scoreTitle}</h2>
        <p className="wf-section-lead">{t.scoreLead}</p>
        <div className="wf-formula">
          <span className="wf-chip">{lang === 'ko' ? '칩' : 'chips'}</span>
          <span className="wf-x">×</span>
          <span className="wf-mult">{lang === 'ko' ? '배율' : 'mult'}</span>
          <span className="wf-eqs">=</span>
          <span className="wf-score">{lang === 'ko' ? '점수' : 'score'}</span>
        </div>
      </section>

      <section className="wf-section wf-wrap-wide">
        <p className="wf-kicker">{t.lootKicker}</p>
        <h2 className="wf-section-title">{t.lootTitle}</h2>
        <div className="wf-loot">
          {t.loot.map((l) => (
            <div className="wf-loot-card" key={l.title}>
              <div className="wf-loot-cap">{l.cap}</div>
              <h3>{l.title}</h3>
              <p>{l.desc}</p>
              {l.list.length > 0 && (
                <ul className="wf-loot-list">
                  {l.list.map(([name, effect]) => (
                    <li key={name}>
                      <b>{name}</b> — {effect}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="wf-section wf-wrap-wide">
        <p className="wf-kicker">{t.featKicker}</p>
        <h2 className="wf-section-title">{t.featTitle}</h2>
        <div className="wf-feats">
          {t.feats.map((f) => (
            <div className="wf-feat" key={f.t}>
              <div className="wf-feat-t">{f.t}</div>
              <div className="wf-feat-d">{f.d}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="wf-wrap-wide">
        <section className="wf-cta-band">
          <h2>{t.ctaTitle}</h2>
          <p>{t.ctaText}</p>
          <a className="wf-btn wf-btn-primary" href="#" aria-disabled="true">
            {t.appstore}
          </a>
        </section>
      </div>
    </main>
  );
}
