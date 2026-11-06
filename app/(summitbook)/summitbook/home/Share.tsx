'use client';

/* 5. 보내기 — 정상 쪽은 피드 4:5 · 스토리 9:16 두 가지로 공유 시트에 건넨다(앱 §18). 스토리는 위 · 아래(프로필 줄 · 답장 칸) 자리를 비우고
   가운데에 쪽, 아래에 100칸 줄(실제 산 높이 · 이번 산 = 흰 칸 + 깃발). 공유 이미지 아래 줄 = 앱 이름 · 회사 방패(평생권은 내 글 · 없음).
   S#7 돌아가는 길 — 함께 오른 사람에게 보내는 손편지(앱 §19)가 먼저. 연말 결산 카드는 S#10(Sheet)로 옮겼다. 앱과 같은 그림 코드로 그린 견본. */
import { useEffect, useRef, useState } from 'react';
import { BOOK_ORDER, byName } from './summits';
import { companion, facts, page, rng, samplePhoto, SEASONS, story, type Climb } from './engine';
import { useNear } from './stage';
import { Nb, sceneAttrs, Slug } from './Scene';

export default function Share() {
  const [mode, setMode] = useState<'feed' | 'story'>('story');
  const [ref, near] = useNear<HTMLElement>('-10% 0px');
  const feedCv = useRef<HTMLCanvasElement | null>(null);
  const storyCv = useRef<HTMLCanvasElement | null>(null);
  const withCv = useRef<HTMLCanvasElement | null>(null);
  const drawn = useRef(false);

  // 처음 가까워질 때 한 번 그린다(무거운 캔버스 셋)
  useEffect(() => {
    if (!near || drawn.current || !feedCv.current || !storyCv.current || !withCv.current) return;
    drawn.current = true;
    const s = byName('한라산'), ph = samplePhoto(11, '#D9822B');
    const climb: Climb = { id: 'share', layout: 'stone', course: '성판악', with: '엄마', note: '' };
    const a = { facts: facts(s, new Date(2026, 9, 3, 12, 8), true, 1), climb, photo: ph, seasons: new Set(['autumn']) };
    page(a, feedCv.current);
    const R = rng('share-strip');
    const strip = BOOK_ORDER.map((m) => ({ h: m.height, ink: m.id === s.id ? null : R() < 0.2 ? SEASONS[Math.floor(R() * 4)].ink : null, me: m.id === s.id }));
    story({ ...a, strip, done: strip.filter((x) => x.ink || x.me).length, label: '100대 명산' }, storyCv.current);
    companion({ ...a, to: '엄마', from: '' }, withCv.current);
  }, [near]);

  return (
    <section className="sb-sec sb-share" ref={ref} {...sceneAttrs('send')}>
      <div className="sb-wrap sb-share-grid">
        <div className="sb-share-copy">
          <Slug id="send" />
          <h2 className="sb-h2">
            <span data-l="ko">함께 오른 사람에게, 그날의 쪽을.</span>
            <span data-l="en">For whoever came along: that day&rsquo;s page.</span>
          </h2>
          <p className="sb-lead">
            <span data-l="ko">
              돌아가는 차 안, 히터 바람에 눈이 감긴다. 옆자리 사람도, 귤 반쪽을 나눈 사람도 같은 하루를 걸었다. 고맙다는 말을 하기엔 쑥스럽고, 사진 한 장으로는
              모자란 날.
            </span>
            <span data-l="en">
              The drive home; the heater makes your eyes heavy. The person beside you, the one who shared the tangerine, walked the same day. Too shy to
              say thank you, and one photo isn&rsquo;t quite enough.
            </span>
          </p>
          <Nb
            ko="쪽에 '함께'를 적어 두면, 그 사람에게 그날의 쪽과 손편지 한 장. 내 피드엔 4:5, 스토리엔 9:16 — 보내는 곳은 내가 고른 앱뿐이다."
            en="Write who came along, and send them that day's page with a short note. Feed 4:5 or story 9:16 for yourself — it goes only to the app you choose."
          />
          <div className="sb-cards">
            <figure className="sb-more-card">
              <canvas ref={withCv} width={1080} height={1350} role="img" aria-label="함께 오른 사람에게 — 견본" />
              <figcaption>
                <b><span data-l="ko">엄마에게 — 한라산 · 성판악</span><span data-l="en">To Mom — Hallasan · Seongpanak</span></b>
                <span data-l="ko">그날의 쪽을 사진처럼 붙이고, 아래에 손편지. 견본이다.</span>
                <span data-l="en">That day&rsquo;s page pinned like a photo, with a handwritten note below. A sample.</span>
              </figcaption>
            </figure>
            <div className="sb-cards-side">
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
              <p className="sb-note">
                <span data-l="ko">스토리는 화면 위아래를 가리는 자리를 비우고, 아래에 백 칸 줄을 단다 — 이번 산은 흰 칸에 깃발.</span>
                <span data-l="en">The story keeps clear of the bars at the top and bottom and adds the hundred-tick strip — this mountain gets the white tick and flag.</span>
              </p>
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
