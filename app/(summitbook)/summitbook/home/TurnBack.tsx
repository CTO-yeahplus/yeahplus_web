'use client';

/* S#5 돌아선 날 — 브랜드의 중심 장면. 정상이 바로 저기인데 돌아선 날, 도장 칸은 비워 두고 연필로 '정상 300m 아래에서'.
   앱의 반경 밖 기록(연필)과 같은 모양. 화면에 들어오면 연필 선이 한 번 그어진다(견본 쪽 — 실제 기록이 아니다). */
import { useEffect, useRef } from 'react';
import { byName } from './summits';
import { makeStamp, no3 } from './engine';
import { useNear } from './stage';
import { Nb, sceneAttrs, Slug } from './Scene';

const S = byName('설악산');

export default function TurnBack() {
  const [ref, near] = useNear<HTMLDivElement>('-15% 0px');
  const box = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!box.current) return;
    box.current.replaceChildren(makeStamp(150, { summit: S, empty: true }));
  }, []);
  return (
    <section className="sb-sec sb-turn" {...sceneAttrs('turn')}>
      <div className="sb-wrap sb-turn-grid">
        <div>
          <Slug id="turn" />
          <h2 className="sb-h2">
            <span data-l="ko">돌아선 날도 수첩에 남습니다. 연필로.</span>
            <span data-l="en">The day you turned back stays in the notebook too. In pencil.</span>
          </h2>
          <p className="sb-lead">
            <span data-l="ko">
              구름이 내려앉고 바람이 바뀐다. 혹은 무릎이 말을 듣지 않고, 혹은 동행이 지쳤다. 정상이 바로 저기인데 — 돌아선다. 아쉽다. 그런데 산에 오래 다닌
              사람들은 안다. 돌아설 줄 아는 것이 실력이라는 것을.
            </span>
            <span data-l="en">
              The cloud drops and the wind turns. Or your knee won&rsquo;t cooperate, or your partner is spent. The top is right there — and you turn
              around. It stings. But people who&rsquo;ve walked mountains for years know: knowing when to turn back is the skill.
            </span>
          </p>
          <Nb
            ko={<>도장 칸은 비워 두고, 연필로 &lsquo;정상 300m 아래에서&rsquo;. 그날의 날짜와 철은 그대로 남는다 — 다음에 다시 올 이유와 함께.</>}
            en={<>The stamp box stays empty; in pencil, &ldquo;300 m below the summit&rdquo;. The date and season stay — along with a reason to come back.</>}
          />
        </div>

        <div className="sb-turn-play" ref={ref}>
          <div className="sb-notepage sb-turn-page">
            <div className="sb-np-head">
              <small className="sb-mono">
                {no3(S.id)} · <span data-l="ko">{S.region}</span>
                <span data-l="en">Gangwon</span>
              </small>
              <h3>{S.name}</h3>
              <p>
                <span data-l="ko">
                  {S.peak} · 해발 {S.height.toLocaleString('ko-KR')}m
                </span>
                <span data-l="en">{S.height.toLocaleString('en-US')} m above sea level</span>
              </p>
            </div>
            <div className="sb-np-stamp">
              <div className="sb-stamp-box sb-stamp-empty" ref={box} />
              {near && (
                <div className="sb-pencil">
                  <svg viewBox="0 0 320 120" aria-hidden="true">
                    <path d="M14 70 C 70 58, 120 84, 170 66 S 260 60, 306 72" />
                    <path className="sb-pencil-2" d="M30 92 C 90 86, 150 100, 220 90" />
                  </svg>
                  <p className="sb-hand">
                    <span data-l="ko">2026.11.08 · 정상 300m 아래에서</span>
                    <span data-l="en">2026.11.08 · 300 m below the summit</span>
                  </p>
                </div>
              )}
            </div>
            <div className="sb-np-foot">
              <small className="sb-turn-again">
                <span data-l="ko">도장 칸은 비워 둔다. 다시 올 테니까.</span>
                <span data-l="en">The stamp box stays empty. You&rsquo;ll be back.</span>
              </small>
            </div>
          </div>
          <p className="sb-note">
            <span data-l="ko">견본 쪽이다. 앱은 정상 반경 150m 밖에서 누르면 도장 대신 이렇게 적는다.</span>
            <span data-l="en">A sample page. Press outside the 150 m summit radius and the app writes this instead of stamping.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
