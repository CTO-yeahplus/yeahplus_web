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
  const chips = ['ㄴ', 'ㅏ', 'ㅁ', 'ㅜ'];
  return (
    <div className="wf-pl-row" aria-hidden>
      {chips.map((c, i) => (
        <span key={i} className="wf-pl-chip" style={{ '--n': i } as React.CSSProperties}>
          {c}
        </span>
      ))}
      <span className="wf-pl-arrow" />
      <span className="wf-pl-result">나무</span>
    </div>
  );
}

/** 배율이 단계별로 올라간다. 한 번에 하나만 보이게 노출 구간을 겹치지 않게 잡았다. */
function ArtMult() {
  const values = ['×2', '×5', '×9'];
  return (
    <div className="wf-pl-mult" aria-hidden>
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
    <div className="wf-pl-carve" aria-hidden>
      <span className="wf-pl-slot">
        <b className="wf-pl-seed" />
      </span>
      <span className="wf-pl-slot">
        <b className="wf-pl-edge" />
      </span>
    </div>
  );
}

/** 쿼터 게이지가 차고 챕터가 하나씩 점등된다. */
function ArtQuota() {
  return (
    <div className="wf-pl-quota" aria-hidden>
      <span className="wf-pl-bar">
        <i />
      </span>
      <span className="wf-pl-pips">
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
    ko: ['누른다', '자모 타일을 차례로 누르면 음절이 조합됩니다. 쌍자음도 겹받침도 그대로.'],
    en: ['Tap', 'Tap jamo tiles in order and they assemble into syllables — clusters and all.'],
  },
  {
    no: '02',
    art: <ArtMult />,
    ko: ['터뜨린다', '점수는 칩 × 배율. 자모를 많이 쓴 낱말일수록 배율이 크게 붙습니다.'],
    en: ['Detonate', 'Score is chips × mult. The more jamo a word spends, the bigger the multiplier.'],
  },
  {
    no: '03',
    art: <ArtCarve />,
    ko: ['고른다', '라운드 사이 상점에서 이번 판의 조합을 고릅니다. 매판 다른 빌드로.'],
    en: ['Build', "Between rounds, pick this run's combination in the shop — a different build every time."],
  },
  {
    no: '04',
    art: <ArtQuota />,
    ko: ['돌파한다', '쿼터를 넘어서면 다음 라운드. 그리고 다시 첫 자모로.'],
    en: ['Break through', 'Beat the quota and move on. Then back to the first tile.'],
  },
];

export default function LoopPipeline() {
  const { lang } = useLang();
  const ko = lang === 'ko';

  return (
    <div className="wf-pl">
      <ol className="wf-pl-track">
        {STAGES.map((s, i) => {
          const [title, desc] = ko ? s.ko : s.en;
          return (
            <li className="wf-pl-step" key={s.no} style={{ '--i': i } as React.CSSProperties}>
              <div className="wf-pl-card">
                <span className="wf-pl-no">{s.no}</span>
                <div className="wf-pl-art">{s.art}</div>
                <h3 className="wf-pl-title">{title}</h3>
                <p className="wf-pl-desc">{desc}</p>
              </div>
              {i < STAGES.length - 1 && (
                <span className="wf-pl-link" aria-hidden>
                  <i />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="wf-pl-cycle">{ko ? '한 판은 이 네 걸음을 계속 돈다.' : 'A run keeps circling these four steps.'}</p>
    </div>
  );
}
