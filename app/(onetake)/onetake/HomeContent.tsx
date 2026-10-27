'use client';

/* ONE TAKE 랜딩 — 기획 APLUS/drift/docs/WEB_SITE.md
   0 라이브 촬영장(실시간 엔진 · 15초 직접 · 내 편집본 — 안 되는 기기는 예전 '휠 = 테이크') → 1 찍는 법(세 박자) → 1-b 기울이기(자이로) HARD MODE → 2 장소 7곳(가로 트랙) → 3 예고편 → 4 조건표 → 5 끝.
   바닥 전체에 타이어 자국(Skid). 글은 한 번에 한 문장 — 기능 나열 대신 '해 보는 것'. */
import Image from 'next/image';
import LiveHero from './home/LiveHero';
import Skid from './home/Skid';
import Scenes from './home/Scenes';
import Trailer from './home/Trailer';
import Tilt from './home/Tilt';
import { useSeen, useTilt } from './home/motion';

const BEATS = [
  {
    img: 'hud',
    ko: ['한 번에 찍는다', '샷 아홉 개를 멈추지 않고 이어서. 하나를 놓쳐도 카메라는 계속 돈다.'],
    en: ['Shoot it in one go', 'Nine shots back to back without stopping. Miss one and the camera keeps rolling.'],
  },
  {
    img: 'thumb',
    ko: ['엄지 = 드리프트 각', '왼쪽을 끌어 차를 틀고, 손을 놓아도 미끄러짐은 이어진다.'],
    en: ['Your thumb sets the angle', 'Drag on the left to throw the car. Let go and the slide keeps going.'],
  },
  {
    img: 'cut',
    ko: ['멈추면 편집본', '컷, 슬로모션, 망원 삼각대, 휠캠. 고르는 건 앱이 한다.'],
    en: ['Stop, and it’s edited', 'Cuts, slow motion, a long lens, a wheel cam. The app picks them.'],
  },
] as const;

function Beat({ b, i, seen }: { b: (typeof BEATS)[number]; i: number; seen: boolean }) {
  const ref = useTilt<HTMLElement>(6);
  return (
    <article className={seen ? 'ot-beat in' : 'ot-beat'} ref={ref} style={{ transitionDelay: seen ? `${i * 0.12}s` : undefined }}>
      <div className="ot-shot">
        <Image src={`/onetake/how/${b.img}.webp`} alt="" width={1280} height={720} sizes="(max-width:860px) 92vw, 360px" />
        <div className="ot-glare" />
        <span className="ot-num">{String(i + 1).padStart(2, '0')}</span>
      </div>
      <div className="ot-body">
        <h3>
          <span data-l="ko">{b.ko[0]}</span>
          <span data-l="en">{b.en[0]}</span>
        </h3>
        <p>
          <span data-l="ko">{b.ko[1]}</span>
          <span data-l="en">{b.en[1]}</span>
        </p>
      </div>
    </article>
  );
}

const FACTS = [
  { ko: ['앱 무료', '야드 · 붉은 흙 놀이터는 그냥 열린다'], en: ['Free to download', 'The Yard and Red Dirt are open from the start'] },
  { ko: ['장소 평생권', '한 번 사면 나머지 다섯 곳과 앞으로 나올 장소까지'], en: ['All Locations pass', 'One purchase: the other five, and every location to come'] },
  { ko: ['모범 테이크 7편', '사기 전에 장소마다 처음부터 끝까지 본다'], en: ['7 master takes', 'Watch every location start to finish before you buy'] },
  { ko: ['광고 없음', '중간에 끊는 것이 없다'], en: ['No ads', 'Nothing cuts in'] },
  { ko: ['계정도 추적도 없음', '기록은 기기 안에. 보낸 도전장만 7일 맡아 둔다'], en: ['No account, no tracking', 'Records stay on your device. Only dares you send are kept, for 7 days'] },
  { ko: ['인터넷 없이', '촬영은 비행기 모드에서도 된다'], en: ['Works offline', 'Shooting runs in airplane mode'] },
  { ko: ['iPhone · iPad', '가로 화면. 자이로 조향은 HARD MODE'], en: ['iPhone · iPad', 'Landscape. Gyro steering is hard mode'] },
  { ko: ['합성한 소리', '엔진·자갈·빗소리·음악을 실시간으로'], en: ['Live sound', 'Engine, gravel, rain and music made in real time'] },
] as const;

export default function HomeContent() {
  const [beatsRef, seen] = useSeen<HTMLDivElement>(0.25);
  return (
    <>
      <Skid />
      <LiveHero />

      <section className="ot-sec" id="how">
        <div className="ot-wrap">
          <div className="ot-eyebrow">HOW IT WORKS</div>
          <h2 className="ot-h2">
            <span data-l="ko">달리는 건 당신, 편집은 앱이</span>
            <span data-l="en">You drive. The app edits.</span>
          </h2>
          <p className="ot-lead">
            <span data-l="ko">원 테이크는 촬영장이다. 샷 리스트를 받고, 차 한 대로 처음부터 끝까지 한 번에 찍는다.</span>
            <span data-l="en">ONE TAKE is a film set. You get a shot list and drive it, start to finish, in a single take.</span>
          </p>
          <div className="ot-beats" ref={beatsRef}>
            {BEATS.map((b, i) => (
              <Beat key={b.img} b={b} i={i} seen={seen} />
            ))}
          </div>
        </div>
      </section>

      <Tilt />

      <Scenes />

      <section className="ot-sec">
        <div className="ot-wrap">
          <div className="ot-eyebrow">TRAILER · 25s</div>
          <h2 className="ot-h2">
            <span data-l="ko">멈추는 순간, 편집은 이미 끝나 있다</span>
            <span data-l="en">Stop, and the edit is already done</span>
          </h2>
          <Trailer />
        </div>
      </section>

      <section className="ot-sec">
        <div className="ot-wrap">
          <div className="ot-eyebrow">CALL SHEET</div>
          <h2 className="ot-h2">
            <span data-l="ko">조건은 이렇다</span>
            <span data-l="en">The terms of the shoot</span>
          </h2>
          <div className="ot-facts">
            {FACTS.map((f) => (
              <div className="ot-fact" key={f.en[0]}>
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

      <section className="ot-sec ot-final">
        <div className="ot-wrap">
          <div className="ot-eyebrow">ONE TAKE</div>
          <h2 className="ot-h2">
            <span data-l="ko">차 한 대. 테이크 한 번. 컷 없이.</span>
            <span data-l="en">One car. One take. No cuts.</span>
          </h2>
          <div className="ot-soon" aria-label="App Store">
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
