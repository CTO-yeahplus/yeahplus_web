'use client';

/* 산행 하루 — 장면 머리(시나리오 S#) · 수첩 한 줄 · 장면별 하늘. 원본 문장은 APLUS/summitbook/marketing/BRAND_STORY.md.
   각 장 = 큰 한 문장(정서) → 수첩 한 줄(Nb) → 그 장면에서만 만지는 것. 앱이 나오지 않는 장(첫걸음 · 쉼)은 앱을 보여 주지 않는다.
   시각은 늦가을 당일 산행 기준(입산 가능 시각 · 일몰 안). */
import type { ReactNode } from 'react';
import { skyAt } from './engine';

export type SceneId = 'eve' | 'start' | 'rest' | 'summit' | 'turn' | 'down' | 'send' | 'night' | 'year' | 'yearend';
type S = { n: string; time: string; h: number; ko: string; en: string };
export const SCENES: Record<SceneId, S> = {
  eve: { n: 'S#1', time: '21:40', h: 21.67, ko: '전날 밤 · 거실 바닥', en: 'The night before · living-room floor' },
  start: { n: 'S#2', time: '06:20', h: 6.33, ko: '새벽 · 들머리', en: 'Dawn · trailhead' },
  rest: { n: 'S#3', time: '08:10', h: 8.17, ko: '능선 아래 너럭바위', en: 'A flat rock below the ridge' },
  summit: { n: 'S#4', time: '10:15', h: 10.25, ko: '정상석 앞', en: 'At the summit stone' },
  turn: { n: 'S#5', time: '11:40', h: 11.67, ko: '다른 날 · 정상 300m 아래', en: 'Another day · 300 m below the top' },
  down: { n: 'S#6', time: '14:30', h: 14.5, ko: '하산길 끝 · 들머리', en: 'Bottom of the trail' },
  send: { n: 'S#7', time: '15:20', h: 15.33, ko: '돌아가는 길', en: 'On the way home' },
  night: { n: 'S#8', time: '22:30', h: 22.5, ko: '그날 밤 · 이불 속', en: 'That night · under the covers' },
  year: { n: 'S#9', time: '', h: 12.5, ko: '일 년 뒤 · 같은 산, 다른 철', en: 'A year later · same mountain, another season' },
  yearend: { n: 'S#10', time: '12.31', h: 16.6, ko: '섣달 · 한 해의 끝', en: 'December · the end of the year' },
};

/** 늦가을 해 지는 시각(서울 근처 17:25 무렵)으로 고정 — 서버 그림과 브라우저 그림이 같게 */
const SH = 17.42;
export const skyOf = (h: number) => skyAt(h, SH);

export const sceneAttrs = (id: SceneId) => ({ 'data-scene': id });

/** 장면 머리 — S#4. 정상석 앞 · 10:15 */
export function Slug({ id }: { id: SceneId }) {
  const s = SCENES[id];
  return (
    <div className="sb-slug">
      <b>{s.n}.</b>
      <span>
        <span data-l="ko">{s.ko}</span>
        <span data-l="en">{s.en}</span>
      </span>
      {s.time && <time>{s.time}</time>}
    </div>
  );
}

/** 수첩 한 줄 — 그 장면에서 수첩이 하는 일(또는 하지 않는 일). 정서 다음에 작게 */
export function Nb({ ko, en }: { ko: ReactNode; en: ReactNode }) {
  return (
    <p className="sb-nb">
      <em>
        <span data-l="ko">수첩</span>
        <span data-l="en">Notebook</span>
      </em>
      <span>
        <span data-l="ko">{ko}</span>
        <span data-l="en">{en}</span>
      </span>
    </p>
  );
}
