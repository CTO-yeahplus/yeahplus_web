'use client';

/* 로켓주차 랜딩 — 휠이 곧 조작이다.
   0 착륙 한 판(휠 = 시간) → 1 직접 세우기(브라우저 게임, 앱과 같은 물리) → 2 옮기는 몸짓(휠 · 마우스 = 카메라)
   → 3 아침 발사 · 저녁 귀환(휠 = 하루) → 4 비상 · 기체 일지(휠 = 비행 수) → 5 격납고(휠 = 두 줄 트랙)
   → 6 주차 수첩(이름 적어 찍기) → 7 무료와 평생 주차권 → 8 조건표 → 끝.
   글은 한 번에 한 문장 — 기능 나열 대신 해 보는 것. 그림은 전부 캔버스 · 앱 실제 화면, 외부 라이브러리 · CDN 없음. */
import Descent from './home/Descent';
import Play from './home/Play';
import Depth from './home/Depth';
import Commute from './home/Commute';
import Faults from './home/Faults';
import Hangar from './home/Hangar';
import Logbook from './home/Logbook';

type T = string | { ko: string; en: string };
const PASS: { ko: string; en: string; free: T; life: T }[] = [
  { ko: '착륙 · 연습 3단계 · 모범 착륙', en: 'Landing, 3-step training, model landing', free: '∞', life: '∞' },
  { ko: '난이도', en: 'Difficulty', free: { ko: '쉬움 · 보통 · 어려움', en: 'Easy · Normal · Hard' }, life: { ko: '+ 전문가 · 전설', en: '+ Expert · Legend' } },
  { ko: '오늘의 주차', en: 'Daily parking', free: '∞', life: '∞' },
  { ko: '사진 카드 · 중계 클립', en: 'Mission card · broadcast clip', free: '∞', life: '∞' },
  { ko: '발사 → 궤도 → 귀환', en: 'Launch → orbit → return', free: { ko: '1번', en: 'Once' }, life: '∞' },
  { ko: '주차 수첩', en: 'Parking log', free: { ko: '10곳', en: '10 spots' }, life: '∞' },
  { ko: '기체 종류', en: 'Booster types', free: { ko: '표준', en: 'Standard' }, life: { ko: '+ 헤비 · 쇼트 · 쌍발', en: '+ Heavy · Short · Twin' } },
];

const FACTS = [
  { ko: ['앱 무료', '착륙은 끝없이. 나머지는 평생 주차권 ₩6,600 한 번'], en: ['Free to download', 'Land as often as you like. The rest is one Lifetime Parking Pass'] },
  { ko: ['광고 없음', '중간에 끊는 것이 없다'], en: ['No ads', 'Nothing cuts in'] },
  { ko: ['수집 없음', '계정도 서버도 없다. 카메라 영상은 화면에만 쓰고 저장하지 않는다'], en: ['Collects nothing', 'No account, no server. Camera frames are drawn on screen, never stored'] },
  { ko: ['위치 안 씀', '주차 수첩의 자리는 내가 붙인 이름이다'], en: ['No location', 'Parking-log spots are names you give them'] },
  { ko: ['인터넷 없이', '오늘의 주차도 날짜로 정해진다'], en: ['Works offline', 'Even the daily parking comes from the date'] },
  { ko: ['앉거나 서서', '걷지 않아도 된다. 폰을 한 걸음 옆으로 옮길 뿐'], en: ['Sit or stand', 'No walking. Just shift the phone a step'] },
  { ko: ['한국어 · English', '관제 음성도 두 언어로'], en: ['Korean · English', 'Mission control speaks both'] },
  { ko: ['iPhone · iOS 18', 'AR 월드 트래킹이 되는 iPhone'], en: ['iPhone · iOS 18', 'Any iPhone with AR world tracking'] },
] as const;

const cell = (x: T) =>
  typeof x === 'string' ? (
    x
  ) : (
    <>
      <span data-l="ko">{x.ko}</span>
      <span data-l="en">{x.en}</span>
    </>
  );

export default function HomeContent() {
  return (
    <>
      <Descent />
      <Play />
      <Depth />
      <Commute />
      <Faults />
      <Hangar />
      <Logbook />

      <section className="rp-sec">
        <div className="rp-wrap">
          <div className="rp-eyebrow">FREE · LIFETIME PARKING PASS</div>
          <h2 className="rp-h2">
            <span data-l="ko">세우는 건 끝까지 무료</span>
            <span data-l="en">Landing stays free. Always.</span>
          </h2>
          <div className="rp-pass rp-console">
            <div className="rp-pass-row rp-pass-head rp-mono">
              <span />
              <span>
                <span data-l="ko">무료</span>
                <span data-l="en">FREE</span>
              </span>
              <span>
                <span data-l="ko">평생 주차권</span>
                <span data-l="en">LIFETIME PASS</span>
              </span>
            </div>
            {PASS.map((r) => (
              <div className="rp-pass-row" key={r.en}>
                <span>
                  <span data-l="ko">{r.ko}</span>
                  <span data-l="en">{r.en}</span>
                </span>
                <span className="rp-mono">{cell(r.free)}</span>
                <span className="rp-mono rp-pass-life">{cell(r.life)}</span>
              </div>
            ))}
            <p className="rp-pass-foot">
              <span data-l="ko">평생 주차권 ₩6,600 · 한 번 구입 · 구독 아님 · 가족 공유. 도색 · 주차장 컬렉션은 외형만 바뀌는 별도 묶음이고, 사기 전에 입혀 볼 수 있다.</span>
              <span data-l="en">Lifetime Parking Pass: one purchase, not a subscription, Family Sharing. Livery and Parking Lot collections are separate, looks-only packs you can try on first.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="rp-sec">
        <div className="rp-wrap">
          <div className="rp-eyebrow">PRE-FLIGHT</div>
          <h2 className="rp-h2">
            <span data-l="ko">조건은 이렇다</span>
            <span data-l="en">Pre-flight checklist</span>
          </h2>
          <div className="rp-facts">
            {FACTS.map((f) => (
              <div className="rp-fact" key={f.en[0]}>
                <b>
                  <span data-l="ko">{f.ko[0]}</span>
                  <span data-l="en">{f.en[0]}</span>
                </b>
                <span data-l="ko">{f.ko[1]}</span>
                <span data-l="en">{f.en[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rp-sec rp-final">
        <div className="rp-wrap">
          <div className="rp-eyebrow">ROCKET PARKING</div>
          <h2 className="rp-h2">
            <span data-l="ko">내 자리에 로켓 세우기</span>
            <span data-l="en">Park a rocket where you are</span>
          </h2>
          <div className="rp-soon" aria-label="App Store">
            <span>
              <small>
                <span data-l="ko">곧 출시</span>
                <span data-l="en">Coming soon</span>
              </small>
              App Store
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
