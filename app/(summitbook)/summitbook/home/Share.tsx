'use client';

/* 5. 보내기 — 정상 쪽은 피드 4:5 · 스토리 9:16 두 가지로 공유 시트에 건넨다(앱 §18). 스토리는 위 · 아래(프로필 줄 · 답장 칸) 자리를 비우고
   가운데에 쪽, 아래에 100칸 줄(실제 산 높이 · 이번 산 = 흰 칸 + 깃발). 공유 이미지 아래 줄 = 앱 이름 · 회사 방패(평생권은 내 글 · 없음).
   옆: 연말 결산 카드 · 함께 오른 사람에게 보내는 손편지(앱 §19) — 앱과 같은 그림 코드로 그린 견본. */
import { useEffect, useRef, useState } from 'react';
import { BOOK_ORDER, byName } from './summits';
import { companion, facts, page, recap, rng, samplePhoto, seasonOf, SEASONS, story, type Climb, type RecapClimb } from './engine';
import { useNear } from './stage';

export default function Share() {
  const [mode, setMode] = useState<'feed' | 'story'>('story');
  const [ref, near] = useNear<HTMLElement>('-10% 0px');
  const feedCv = useRef<HTMLCanvasElement | null>(null);
  const storyCv = useRef<HTMLCanvasElement | null>(null);
  const recapCv = useRef<HTMLCanvasElement | null>(null);
  const withCv = useRef<HTMLCanvasElement | null>(null);
  const drawn = useRef(false);

  // 처음 가까워질 때 한 번 그린다(무거운 캔버스 셋)
  useEffect(() => {
    if (!near || drawn.current || !feedCv.current || !storyCv.current || !recapCv.current || !withCv.current) return;
    drawn.current = true;
    const s = byName('한라산'), ph = samplePhoto(11, '#D9822B');
    const climb: Climb = { id: 'share', layout: 'stone', course: '성판악', with: '엄마', note: '' };
    const a = { facts: facts(s, new Date(2026, 9, 3, 12, 8), true, 1), climb, photo: ph, seasons: new Set(['autumn']) };
    page(a, feedCv.current);
    const R = rng('share-strip');
    const strip = BOOK_ORDER.map((m) => ({ h: m.height, ink: m.id === s.id ? null : R() < 0.2 ? SEASONS[Math.floor(R() * 4)].ink : null, me: m.id === s.id }));
    story({ ...a, strip, done: strip.filter((x) => x.ink || x.me).length, label: '100대 명산' }, storyCv.current);
    // 결산 카드 견본: 한 해 11번(지어낸 견본 — 실제 사람 기록이 아니다)
    const plan: [string, number, number][] = [['관악산', 1, 18], ['도봉산', 3, 9], ['북한산', 4, 13], ['소백산', 5, 24], ['한라산', 5, 31], ['설악산', 6, 21], ['지리산', 7, 12], ['오대산', 8, 30], ['덕유산', 9, 27], ['한라산', 10, 3], ['내장산', 10, 25]];
    const list: RecapClimb[] = plan.map(([n, m, d], i) => { const at = new Date(2026, m, d, 11, 30); return { summit: byName(n), ink: seasonOf(at).ink, season: seasonOf(at), at, id: 'rc' + i }; });
    const now = new Map(list.map((c) => [c.summit.id, c.ink]));
    const R2 = rng('recap-strip');
    const rstrip = BOOK_ORDER.map((m) => ({ h: m.height, now: now.has(m.id), ink: now.get(m.id) || (R2() < 0.12 ? '#5c4630' : null) }));
    recap({ year: 2026, owner: '', list, strip: rstrip, done: rstrip.filter((x) => x.ink).length }, recapCv.current);
    companion({ ...a, to: '엄마', from: '' }, withCv.current);
  }, [near]);

  return (
    <section className="sb-sec sb-share" ref={ref}>
      <div className="sb-wrap sb-share-grid">
        <div className="sb-share-copy">
          <div className="sb-eyebrow">
            <span data-l="ko">05 · 보내기</span>
            <span data-l="en">05 · SHARE</span>
          </div>
          <h2 className="sb-h2">
            <span data-l="ko">피드 한 장, 스토리 한 장.</span>
            <span data-l="en">One for the feed, one for the story.</span>
          </h2>
          <p className="sb-lead">
            <span data-l="ko">
              쪽 위 [공유]를 누르면 두 크기를 미리 보고 고른다. 스토리는 화면 위아래를 가리는 자리를 비워 두고, 아래에 백 칸 줄을 단다 — 이번 산은 흰 칸에
              깃발. 보내는 곳은 내가 고른 앱뿐이다.
            </span>
            <span data-l="en">
              Tap Share on a page and preview both sizes. The story leaves room for the bars that cover the top and bottom of the screen, and adds the
              hundred-tick strip underneath — this mountain gets the white tick and the flag. It goes only to the app you choose.
            </span>
          </p>
          <div className="sb-seg sb-seg-dark" role="group" aria-label="format">
            <button type="button" aria-pressed={mode === 'feed'} onClick={() => setMode('feed')}>
              <span data-l="ko">피드 4:5</span>
              <span data-l="en">Feed 4:5</span>
            </button>
            <button type="button" aria-pressed={mode === 'story'} onClick={() => setMode('story')}>
              <span data-l="ko">스토리 9:16</span>
              <span data-l="en">Story 9:16</span>
            </button>
          </div>

          <div className="sb-more">
            <figure className="sb-more-card">
              <canvas ref={recapCv} width={1080} height={1350} role="img" aria-label="연말 결산 카드 — 견본" />
              <figcaption>
                <b><span data-l="ko">연말 결산 카드</span><span data-l="en">Year-end card</span></b>
                <span data-l="ko">한 해의 정상 · 철 · 달을 한 장에. 12월이면 닫힌 수첩 아래에 나타난다.</span>
                <span data-l="en">The year&rsquo;s summits, seasons and months on one card. It shows up under the notebook in December.</span>
              </figcaption>
            </figure>
            <figure className="sb-more-card">
              <canvas ref={withCv} width={1080} height={1350} role="img" aria-label="함께 오른 사람에게 — 견본" />
              <figcaption>
                <b><span data-l="ko">함께 오른 사람에게</span><span data-l="en">For whoever came along</span></b>
                <span data-l="ko">쪽에 &lsquo;함께&rsquo;를 적어 두면, 그 사람에게 그날의 쪽과 손편지 한 장.</span>
                <span data-l="en">Write who came along, and send them that day&rsquo;s page with a short note.</span>
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="sb-phone-wrap" data-mode={mode} data-in={near ? '1' : '0'}>
          <div className="sb-phone">
            <div className="sb-phone-screen">
              <canvas ref={storyCv} className="sb-sh-story" width={1080} height={1920} role="img" aria-label="스토리 9:16 견본" />
              <div className="sb-sh-feedbox">
                <canvas ref={feedCv} className="sb-sh-feed" width={1080} height={1350} role="img" aria-label="피드 4:5 견본" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
