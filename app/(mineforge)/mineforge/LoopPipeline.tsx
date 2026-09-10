'use client';

import { useLang } from './i18n';

/* ─────────────────────────────────────────────────────────────
   한 판의 흐름을 5단계 파이프라인으로 보여준다.

   애니메이션은 전부 CSS 키프레임이다 — 10초를 한 바퀴로 잡고 각 단계가
   2초씩 순서대로 밝아지며, 연결선의 불꽃이 그 사이를 건너간다. JS 타이머를
   쓰지 않으므로 탭이 백그라운드로 가면 브라우저가 알아서 멈춘다.
   `prefers-reduced-motion` 에서는 전부 정지하고 모든 단계를 밝은 상태로 둔다.
   ───────────────────────────────────────────────────────────── */

type Stage = {
  no: string;
  ko: [string, string];
  en: [string, string];
  art: React.ReactNode;
};

/** 1. 발굴 — 3×3 격자에서 가운데 칸이 열리며 숫자가 드러난다. */
function ArtDig() {
  return (
    <div className="mf-pl-grid" aria-hidden>
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className={i === 4 ? 'mf-pl-cell mf-pl-cell-open' : 'mf-pl-cell'}>
          {i === 4 ? <b>2</b> : null}
        </span>
      ))}
    </div>
  );
}

/** 2. 광맥 — 옆으로 이어 파면 타일이 순서대로 켜지고 배율이 오른다. */
function ArtSeam() {
  return (
    <div className="mf-pl-seam" aria-hidden>
      <div className="mf-pl-seam-row">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="mf-pl-seam-tile" style={{ '--n': i } as React.CSSProperties} />
        ))}
      </div>
      <div className="mf-pl-mult">
        <span style={{ '--n': 0 } as React.CSSProperties}>×1</span>
        <span style={{ '--n': 1 } as React.CSSProperties}>×2</span>
        <span style={{ '--n': 2 } as React.CSSProperties}>×4</span>
      </div>
    </div>
  );
}

/** 3. 안전장치 — 지뢰는 버팀목이 받아내고, 카나리아가 안전한 칸을 노래한다. */
function ArtSafety() {
  return (
    <div className="mf-pl-safety" aria-hidden>
      <span className="mf-pl-mine" />
      <span className="mf-pl-prop" />
      <span className="mf-pl-canary">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}

/** 4. 발파 공방 — 광석을 심고, 뇌관의 도화선을 끊는다. */
function ArtWorks() {
  return (
    <div className="mf-pl-works" aria-hidden>
      <span className="mf-pl-slot">
        <b className="mf-pl-ore" />
      </span>
      <span className="mf-pl-slot">
        <b className="mf-pl-fuse" />
      </span>
    </div>
  );
}

/** 5. 돌파 — 쿼터 게이지가 차고 8개 챕터가 하나씩 점등된다. */
function ArtQuota() {
  return (
    <div className="mf-pl-quota" aria-hidden>
      <span className="mf-pl-bar">
        <i />
      </span>
      <span className="mf-pl-pips">
        {Array.from({ length: 8 }, (_, i) => (
          <i key={i} style={{ '--n': i } as React.CSSProperties} />
        ))}
      </span>
    </div>
  );
}

const STAGES: Stage[] = [
  {
    no: '01',
    art: <ArtDig />,
    ko: ['판다', '칸을 열면 숫자가 주변 지뢰 수를 알려준다.'],
    en: ['Dig', 'Open a tile and its number counts the mines around it.'],
  },
  {
    no: '02',
    art: <ArtSeam />,
    ko: ['잇는다', '직전 발굴 옆을 이어 파면 광맥 +1, 같은 숫자는 공명 +2. 레벨만큼 배율이 붙는다.'],
    en: ['Chain', 'Chain an adjacent dig for seam +1, or strike the same number for resonance +2 — each level is +1 mult.'],
  },
  {
    no: '03',
    art: <ArtSafety />,
    ko: ['버틴다', '지뢰는 버팀목이 대신 받고, 막히면 카나리아가 안전한 칸을 노래한다.'],
    en: ['Hold', 'Pit props absorb your mine strikes, and when you are stuck the canary sings over a provably safe tile.'],
  },
  {
    no: '04',
    art: <ArtWorks />,
    ko: ['세공한다', '라운드 사이 발파 공방에서 광석을 심고 뇌관을 해체한다.'],
    en: ['Forge', 'Between rounds, bury stones and defuse mines at the Blast Works.'],
  },
  {
    no: '05',
    art: <ArtQuota />,
    ko: ['돌파한다', '8개 챕터의 쿼터를 넘어선다. 그리고 다시 첫 칸으로.'],
    en: ['Break through', 'Beat the quota across 8 chapters. Then back to the first tile.'],
  },
];

export default function LoopPipeline() {
  const { lang } = useLang();
  const ko = lang === 'ko';

  return (
    <div className="mf-pl">
      <ol className="mf-pl-track">
        {STAGES.map((s, i) => {
          const [title, desc] = ko ? s.ko : s.en;
          return (
            <li className="mf-pl-step" key={s.no} style={{ '--i': i } as React.CSSProperties}>
              <div className="mf-pl-card">
                <span className="mf-pl-no">{s.no}</span>
                <div className="mf-pl-art">{s.art}</div>
                <h3 className="mf-pl-title">{title}</h3>
                <p className="mf-pl-desc">{desc}</p>
              </div>
              {i < STAGES.length - 1 && (
                <span className="mf-pl-link" aria-hidden>
                  <i />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mf-pl-cycle">
        {ko ? '한 판은 이 다섯 걸음을 계속 돈다.' : 'A run keeps circling these five steps.'}
      </p>
    </div>
  );
}
