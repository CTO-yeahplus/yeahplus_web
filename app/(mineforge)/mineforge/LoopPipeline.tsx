'use client';

import { useLang } from './i18n';

/* ─────────────────────────────────────────────────────────────
   한 판의 흐름 — 5단계 파이프라인.

   애니메이션은 전부 CSS 키프레임이다. 10초를 한 바퀴로 잡고 각 단계가
   2초씩 순서대로 밝아지며, 연결선의 불꽃이 그 사이를 건너간다. JS 타이머를
   쓰지 않으므로 탭이 백그라운드로 가면 브라우저가 알아서 멈춘다.
   `prefers-reduced-motion` 에서는 전부 정지하고 모든 단계를 완료 상태로 둔다.

   ⚠️ 이 파일은 scripts/gen_pipeline.py 로 다섯 게임에 같이 찍어낸 것이다.
   한 게임만 손보면 나머지와 어긋난다 — 문구가 아니라 구조를 바꿀 때는
   생성기를 고치고 전부 다시 찍는 편이 낫다.
   ───────────────────────────────────────────────────────────── */

/** 3×3 격자에서 가운데 칸이 열리며 숫자가 드러난다. */
function ArtGrid() {
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

/** 광맥 — 옆으로 이어 파면 타일이 차례로 켜지고 배율이 오른다. */
function ArtSeam() {
  const values = ['×1', '×2', '×4'];
  return (
    <div className="mf-pl-seam" aria-hidden>
      <div className="mf-pl-row">
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="mf-pl-chip" style={{ '--n': i } as React.CSSProperties} />
        ))}
      </div>
      <div className="mf-pl-mult">
        {values.map((v, i) => (
          <span key={v} style={{ '--n': i } as React.CSSProperties}>
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

/** 지뢰는 버팀목이 받아내고, 카나리아가 안전한 칸을 노래한다. */
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

/** 공방 — 하나를 심고, 하나의 날을 깎아낸다. */
function ArtCarve() {
  return (
    <div className="mf-pl-carve" aria-hidden>
      <span className="mf-pl-slot">
        <b className="mf-pl-seed" />
      </span>
      <span className="mf-pl-slot">
        <b className="mf-pl-edge" />
      </span>
    </div>
  );
}

/** 쿼터 게이지가 차고 챕터가 하나씩 점등된다. */
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

type Stage = { no: string; art: React.ReactNode; ko: [string, string]; en: [string, string] };

const STAGES: Stage[] = [
  {
    no: '01',
    art: <ArtGrid />,
    ko: ['판다', '칸을 열면 숫자가 주변 지뢰 수를 알려준다.'],
    en: ['Dig', 'Open a tile and its number counts the mines around it.'],
  },
  {
    no: '02',
    art: <ArtSeam />,
    ko: ['잇는다', '직전 발굴 옆을 이어 파면 광맥 +1, 같은 숫자는 공명 +2. 레벨만큼 배율이 붙는다.'],
    en: ['Chain', 'Chain an adjacent dig for seam +1, same number for resonance +2 — each level is +1 mult.'],
  },
  {
    no: '03',
    art: <ArtSafety />,
    ko: ['버틴다', '지뢰는 버팀목이 대신 받고, 막히면 카나리아가 안전한 칸을 노래한다.'],
    en: ['Hold', 'Pit props absorb your mine strikes; when you are stuck the canary sings over a safe tile.'],
  },
  {
    no: '04',
    art: <ArtCarve />,
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
      <p className="mf-pl-cycle">{ko ? '한 판은 이 다섯 걸음을 계속 돈다.' : 'A run keeps circling these five steps.'}</p>
    </div>
  );
}
