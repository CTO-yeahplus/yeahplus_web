'use client';

import { useLang } from './i18n';

/* ─────────────────────────────────────────────────────────────
   한 판의 흐름 — 4단계 파이프라인.

   애니메이션은 전부 CSS 키프레임이다. 8초를 한 바퀴로 잡고 각 단계가
   2초씩 순서대로 밝아지며, 연결선의 불꽃이 그 사이를 건너간다. JS 타이머를
   쓰지 않으므로 탭이 백그라운드로 가면 브라우저가 알아서 멈춘다.
   `prefers-reduced-motion` 에서는 전부 정지하고 모든 단계를 완료 상태로 둔다.

   ⚠️ 이 파일은 scripts/gen_pipeline.py 로 다섯 게임에 같이 찍어낸 것이다.
   한 게임만 손보면 나머지와 어긋난다 — 문구가 아니라 구조를 바꿀 때는
   생성기를 고치고 전부 다시 찍는 편이 낫다.
   ───────────────────────────────────────────────────────────── */

/** 칩이 왼쪽부터 차례로 켜지고, 마지막에 결과가 나타난다. */
function ArtRow() {
  const chips = ['7', '8', '9', '10'];
  return (
    <div className="af-pl-row" aria-hidden>
      {chips.map((c, i) => (
        <span key={i} className="af-pl-chip" style={{ '--n': i } as React.CSSProperties}>
          {c}
        </span>
      ))}
      <span className="af-pl-arrow" />
      <span className="af-pl-result">J</span>
    </div>
  );
}

/** 배율이 단계별로 올라간다. 한 번에 하나만 보이게 노출 구간을 겹치지 않게 잡았다. */
function ArtMult() {
  const values = ['×1', '×3', '×5'];
  return (
    <div className="af-pl-mult" aria-hidden>
      {values.map((v, i) => (
        <span key={v} style={{ '--n': i } as React.CSSProperties}>
          {v}
        </span>
      ))}
    </div>
  );
}

/** 공방 — 하나를 심고, 하나의 날을 깎아낸다. */
function ArtCarve() {
  return (
    <div className="af-pl-carve" aria-hidden>
      <span className="af-pl-slot">
        <b className="af-pl-seed" />
      </span>
      <span className="af-pl-slot">
        <b className="af-pl-edge" />
      </span>
    </div>
  );
}

/** 쿼터 게이지가 차고 챕터가 하나씩 점등된다. */
function ArtQuota() {
  return (
    <div className="af-pl-quota" aria-hidden>
      <span className="af-pl-bar">
        <i />
      </span>
      <span className="af-pl-pips">
        {Array.from({ length: 8 }, (_, i) => (
          <i key={i} style={{ '--n': i } as React.CSSProperties} />
        ))}
      </span>
    </div>
  );
}

type Stage = { no: string; art: React.ReactNode; ko: [string, string]; en: [string, string] };

const STAGES: Stage[] = [
  {
    no: '01',
    art: <ArtRow />,
    ko: ['잇는다', '모루보다 1 높거나 낮은 카드를 이어 체인을 만듭니다. A와 K도 이어집니다.'],
    en: ['Chain', 'Play cards one rank above or below the anvil to build a chain. A and K connect.'],
  },
  {
    no: '02',
    art: <ArtMult />,
    ko: ['터뜨린다', '체인의 n번째 카드는 +(n−1) 배율. 길게 이을수록 점수가 폭발합니다.'],
    en: ['Detonate', 'The n-th link scores at +(n−1) mult — the longer the chain, the harder it blows.'],
  },
  {
    no: '03',
    art: <ArtCarve />,
    ko: ['세공한다', '라운드 사이 대장간에서 카드를 세공합니다. 덱 52장이 당신 손을 거칩니다.'],
    en: ['Forge', 'Between rounds, forge your cards at the smithy — all 52 pass through your hands.'],
  },
  {
    no: '04',
    art: <ArtQuota />,
    ko: ['돌파한다', '8개 챕터의 쿼터를 돌파합니다. 그리고 다시 첫 장으로.'],
    en: ['Break through', 'Beat the quota across 8 chapters. Then back to the first card.'],
  },
];

export default function LoopPipeline() {
  const { lang } = useLang();
  const ko = lang === 'ko';

  return (
    <div className="af-pl">
      <ol className="af-pl-track">
        {STAGES.map((s, i) => {
          const [title, desc] = ko ? s.ko : s.en;
          return (
            <li className="af-pl-step" key={s.no} style={{ '--i': i } as React.CSSProperties}>
              <div className="af-pl-card">
                <span className="af-pl-no">{s.no}</span>
                <div className="af-pl-art">{s.art}</div>
                <h3 className="af-pl-title">{title}</h3>
                <p className="af-pl-desc">{desc}</p>
              </div>
              {i < STAGES.length - 1 && (
                <span className="af-pl-link" aria-hidden>
                  <i />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="af-pl-cycle">{ko ? '한 판은 이 네 걸음을 계속 돈다.' : 'A run keeps circling these four steps.'}</p>
    </div>
  );
}
