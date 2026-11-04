'use client';

/* 5. 보내기 — 정상 쪽은 피드 4:5 · 스토리 9:16 두 가지로 공유 시트에 건넨다(앱 §18). 스토리는 위 · 아래(프로필 줄 · 답장 칸) 자리를 비우고
   가운데에 쪽, 아래에 100칸 줄(실제 산 높이 · 이번 산 = 흰 칸 + 깃발). 공유 이미지 아래 줄 = 앱 이름 · 회사 방패(평생권은 내 글 · 없음).
   옆: 준비 중인 연말 카드 · 함께 오른 사람에게 보내기 예고. */
import { useEffect, useRef, useState } from 'react';
import { BOOK_ORDER, byName } from './summits';
import { facts, page, rng, samplePhoto, SEASONS, story, yearCover, type Climb } from './engine';
import { useNear } from './stage';

export default function Share() {
  const [mode, setMode] = useState<'feed' | 'story'>('story');
  const [ref, near] = useNear<HTMLElement>('-10% 0px');
  const feedCv = useRef<HTMLCanvasElement | null>(null);
  const storyCv = useRef<HTMLCanvasElement | null>(null);
  const yearCv = useRef<HTMLCanvasElement | null>(null);
  const drawn = useRef(false);

  // 처음 가까워질 때 한 번 그린다(무거운 캔버스 셋)
  useEffect(() => {
    if (!near || drawn.current || !feedCv.current || !storyCv.current || !yearCv.current) return;
    drawn.current = true;
    const s = byName('한라산'), ph = samplePhoto(11, '#D9822B');
    const climb: Climb = { id: 'share', layout: 'stone', course: '성판악', with: '엄마', note: '' };
    const a = { facts: facts(s, new Date(2026, 9, 3, 12, 8), true, 1), climb, photo: ph, seasons: new Set(['autumn']) };
    page(a, feedCv.current);
    const R = rng('share-strip');
    const strip = BOOK_ORDER.map((m) => ({ h: m.height, ink: m.id === s.id ? null : R() < 0.2 ? SEASONS[Math.floor(R() * 4)].ink : null, me: m.id === s.id }));
    story({ ...a, strip, done: strip.filter((x) => x.ink || x.me).length, label: '100대 명산' }, storyCv.current);
    yearCover({ year: 2026, owner: '', climbs: 14, summits: 11, done: 23 }, yearCv.current);
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

          <div className="sb-soon-list">
            <div className="sb-year">
              <canvas ref={yearCv} width={1080} height={1350} role="img" aria-label="올해의 산행 카드 — 견본" />
            </div>
            <div>
              <b>
                <span data-l="ko">연말 카드 · 함께 오른 사람에게 보내기</span>
                <span data-l="en">Year-end card · send to the people you climbed with</span>
              </b>
              <p>
                <span data-l="ko">한 해의 정상을 한 장으로, 같이 간 사람에게는 그날의 쪽을. 지금 만들고 있다.</span>
                <span data-l="en">The year&rsquo;s summits on one card, and that day&rsquo;s page for whoever came along. In the works.</span>
              </p>
              <em className="sb-tag">
                <span data-l="ko">준비 중</span>
                <span data-l="en">Coming</span>
              </em>
            </div>
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
