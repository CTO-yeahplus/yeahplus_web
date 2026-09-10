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
  const chips = ['❋', '❋'];
  return (
    <div className="jf-pl-row" aria-hidden>
      {chips.map((c, i) => (
        <span key={i} className="jf-pl-chip" style={{ '--n': i } as React.CSSProperties}>
          {c}
        </span>
      ))}
      <span className="jf-pl-arrow" />
      <span className="jf-pl-result">✓</span>
    </div>
  );
}

/** 배율이 단계별로 올라간다. 한 번에 하나만 보이게 노출 구간을 겹치지 않게 잡았다. */
function ArtMult() {
  const values = ['×1', '×2', '×4'];
  return (
    <div className="jf-pl-mult" aria-hidden>
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
    <div className="jf-pl-carve" aria-hidden>
      <span className="jf-pl-slot">
        <b className="jf-pl-seed" />
      </span>
      <span className="jf-pl-slot">
        <b className="jf-pl-edge" />
      </span>
    </div>
  );
}

/** 쿼터 게이지가 차고 챕터가 하나씩 점등된다. */
function ArtQuota() {
  return (
    <div className="jf-pl-quota" aria-hidden>
      <span className="jf-pl-bar">
        <i />
      </span>
      <span className="jf-pl-pips">
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
    ko: ['캔다', '위가 비고 옆이 열린 자유 타일 두 장을 짝지어 캡니다.'],
    en: ['Dig', 'Match two free tiles — open on a side, nothing stacked on top.'],
  },
  {
    no: '02',
    art: <ArtMult />,
    ko: ['잇는다', '같은 문양은 맥 +1, 같은 숫자는 공명 +2. 맥 레벨만큼 배율이 붙습니다.'],
    en: ['Vein', 'Same suit grows the vein +1, same number strikes resonance +2 — each level is +1 mult.'],
  },
  {
    no: '03',
    art: <ArtCarve />,
    ko: ['세공한다', '라운드 사이 옥공방에서 타일을 종류별로 세공합니다.'],
    en: ['Carve', 'Between rounds, carve your tiles kind by kind at the Jade Works.'],
  },
  {
    no: '04',
    art: <ArtQuota />,
    ko: ['돌파한다', '8개 챕터의 쿼터를 돌파합니다. 막히면 재련 — 산은 언제나 풀 수 있게 다시 쌓입니다.'],
    en: ['Break through', 'Beat the quota across 8 chapters. Stuck? Reforge — the mountain always restacks solvable.'],
  },
];

export default function LoopPipeline() {
  const { lang } = useLang();
  const ko = lang === 'ko';

  return (
    <div className="jf-pl">
      <ol className="jf-pl-track">
        {STAGES.map((s, i) => {
          const [title, desc] = ko ? s.ko : s.en;
          return (
            <li className="jf-pl-step" key={s.no} style={{ '--i': i } as React.CSSProperties}>
              <div className="jf-pl-card">
                <span className="jf-pl-no">{s.no}</span>
                <div className="jf-pl-art">{s.art}</div>
                <h3 className="jf-pl-title">{title}</h3>
                <p className="jf-pl-desc">{desc}</p>
              </div>
              {i < STAGES.length - 1 && (
                <span className="jf-pl-link" aria-hidden>
                  <i />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="jf-pl-cycle">{ko ? '한 판은 이 네 걸음을 계속 돈다.' : 'A run keeps circling these four steps.'}</p>
    </div>
  );
}
