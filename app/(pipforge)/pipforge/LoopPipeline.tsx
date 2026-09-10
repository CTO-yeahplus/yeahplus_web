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

/** 주사위 세 개 — 마지막 하나의 눈이 끌질로 바뀐다. */
function ArtDice() {
  return (
    <div className="pf-pl-dice" aria-hidden>
      {[1, 2, 3].map((d) => (
        <span key={d} className="pf-pl-die" style={{ '--n': d - 1 } as React.CSSProperties}>
          {Array.from({ length: d + 1 }, (_, i) => (
            <i key={i} />
          ))}
        </span>
      ))}
    </div>
  );
}

/** 배율이 단계별로 올라간다. 한 번에 하나만 보이게 노출 구간을 겹치지 않게 잡았다. */
function ArtMult() {
  const values = ['×3', '×8', '×20'];
  return (
    <div className="pf-pl-mult" aria-hidden>
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
    <div className="pf-pl-carve" aria-hidden>
      <span className="pf-pl-slot">
        <b className="pf-pl-seed" />
      </span>
      <span className="pf-pl-slot">
        <b className="pf-pl-edge" />
      </span>
    </div>
  );
}

/** 쿼터 게이지가 차고 챕터가 하나씩 점등된다. */
function ArtQuota() {
  return (
    <div className="pf-pl-quota" aria-hidden>
      <span className="pf-pl-bar">
        <i />
      </span>
      <span className="pf-pl-pips">
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
    art: <ArtDice />,
    ko: ['굴린다', '주사위를 굴려 족보를 만듭니다. 같은 족보를 반복하면 점수가 식습니다.'],
    en: ['Roll', 'Roll for a hand. Replay the same hand and it cools — the score halves.'],
  },
  {
    no: '02',
    art: <ArtMult />,
    ko: ['쌓는다', '칩 × 배율. 참 45종이 규칙을 비틀며 숫자를 말도 안 되는 곳까지 밀어 올립니다.'],
    en: ['Stack', 'Chips × mult. 45 charms bend the rules and push the number somewhere absurd.'],
  },
  {
    no: '03',
    art: <ArtCarve />,
    ko: ['세공한다', '면 하나하나를 끌질합니다. 5·6·7·8·9·9 주사위는 약속된 미래입니다.'],
    en: ['Chisel', 'Chisel the faces one by one. A 5·6·7·8·9·9 die is a promised future.'],
  },
  {
    no: '04',
    art: <ArtQuota />,
    ko: ['넘어선다', '점수만으로는 부족합니다. 계약을 이행하고 규칙을 비트는 보스 8인을 넘으세요.'],
    en: ['Overcome', 'The quota alone is not enough — fulfill contracts and beat 8 rule-bending bosses.'],
  },
];

export default function LoopPipeline() {
  const { lang } = useLang();
  const ko = lang === 'ko';

  return (
    <div className="pf-pl">
      <ol className="pf-pl-track">
        {STAGES.map((s, i) => {
          const [title, desc] = ko ? s.ko : s.en;
          return (
            <li className="pf-pl-step" key={s.no} style={{ '--i': i } as React.CSSProperties}>
              <div className="pf-pl-card">
                <span className="pf-pl-no">{s.no}</span>
                <div className="pf-pl-art">{s.art}</div>
                <h3 className="pf-pl-title">{title}</h3>
                <p className="pf-pl-desc">{desc}</p>
              </div>
              {i < STAGES.length - 1 && (
                <span className="pf-pl-link" aria-hidden>
                  <i />
                </span>
              )}
            </li>
          );
        })}
      </ol>
      <p className="pf-pl-cycle">{ko ? '한 판은 이 네 걸음을 계속 돈다.' : 'A run keeps circling these four steps.'}</p>
    </div>
  );
}
