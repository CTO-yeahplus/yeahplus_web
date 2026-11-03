'use client';

/* 5. 격납고 — 앱이 그린 실제 그림(시뮬레이터 룩북)을 두 줄 트랙으로. 휠을 내리면 기체 줄은 왼쪽, 패드 줄은 오른쪽으로 흐른다.
   무엇으로 열리는지는 앱 Collection.swift 와 같게 둔다(콜라보는 계약한 것만 — 여기엔 없다). */
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { progressOf, reduced } from './stage';

type U = 'free' | 'life' | 'livery' | 'ground' | 'flights' | 'faults' | 'dailies';
const UNLOCK: Record<U, { ko: string; en: string }> = {
  free: { ko: '무료', en: 'Free' },
  life: { ko: '평생 주차권', en: 'Lifetime Parking Pass' },
  livery: { ko: '도색 컬렉션 1', en: 'Livery Collection 1' },
  ground: { ko: '주차장 컬렉션 1', en: 'Parking Lot Collection 1' },
  flights: { ko: '한 기체로 20비행', en: '20 flights on one booster' },
  faults: { ko: '비상 10번 살아 돌아오기', en: 'Survive 10 emergencies' },
  dailies: { ko: '오늘의 주차 7일', en: '7 daily parkings' },
};

const BOOSTERS: { id: string; ko: string; en: string; u: U; note?: [string, string] }[] = [
  { id: 'standard', ko: '표준', en: 'Standard', u: 'free' },
  { id: 'heavy', ko: '헤비', en: 'Heavy', u: 'life', note: ['일찍 켜야 한다', 'Ignite early'] },
  { id: 'short', ko: '쇼트', en: 'Short', u: 'life', note: ['늦게 켜도 된다', 'Ignite late'] },
  { id: 'twin', ko: '쌍발', en: 'Twin', u: 'life', note: ['옆으로 민첩하다', 'Nimble sideways'] },
  { id: 'taxi', ko: '택시', en: 'Taxi', u: 'livery' },
  { id: 'tow', ko: '견인차', en: 'Tow Truck', u: 'livery' },
  { id: 'nightbus', ko: '심야버스', en: 'Night Bus', u: 'livery' },
  { id: 'valet', ko: '주차 요원', en: 'Parking Attendant', u: 'livery' },
  { id: 'crosswalk', ko: '횡단보도', en: 'Crosswalk', u: 'livery' },
  { id: 'sakura', ko: '벚꽃길', en: 'Cherry Blossom Road', u: 'livery' },
  { id: 'veteran', ko: '베테랑', en: 'Veteran', u: 'flights' },
  { id: 'rescue', ko: '구조대', en: 'Rescue', u: 'faults' },
  { id: 'regular', ko: '개근', en: 'Regular', u: 'dailies' },
];
const GROUND: { id: string; ko: string; en: string; u: U }[] = [
  { id: 'base', ko: '기본 패드', en: 'Standard Pad', u: 'free' },
  { id: 'asphalt', ko: '아스팔트', en: 'Asphalt', u: 'ground' },
  { id: 'grass', ko: '공원 잔디', en: 'Park Lawn', u: 'ground' },
  { id: 'neon', ko: '네온 밤', en: 'Neon Night', u: 'ground' },
  { id: 'checker', ko: '결승선', en: 'Finish Line', u: 'ground' },
  { id: 'harbor', ko: '항구 강판', en: 'Harbor Steel', u: 'ground' },
  { id: 'lot', ko: '주차 칸', en: 'Parking Bay', u: 'ground' },
  { id: 'barge', ko: '바지선', en: 'Barge', u: 'ground' },
  { id: 'roof', ko: '옥상 패드', en: 'Rooftop Pad', u: 'ground' },
  { id: 'tower', ko: '철탑', en: 'Steel Tower', u: 'ground' },
  { id: 'towerorange', ko: '주황 철탑', en: 'Orange Tower', u: 'ground' },
  { id: 'gantry', ko: '문형 크레인', en: 'Gantry Crane', u: 'ground' },
];

function Card({ dir, it }: { dir: string; it: { id: string; ko: string; en: string; u: U; note?: [string, string] } }) {
  return (
    <figure className="rp-hcard" data-u={it.u}>
      <Image src={`/rocketparking/${dir}/${it.id}.webp`} alt="" width={292} height={392} sizes="240px" />
      <figcaption>
        <b>
          <span data-l="ko">{it.ko}</span>
          <span data-l="en">{it.en}</span>
        </b>
        {it.note && (
          <small>
            <span data-l="ko">{it.note[0]}</span>
            <span data-l="en">{it.note[1]}</span>
          </small>
        )}
        <em className="rp-mono">
          <span data-l="ko">{UNLOCK[it.u].ko}</span>
          <span data-l="en">{UNLOCK[it.u].en}</span>
        </em>
      </figcaption>
    </figure>
  );
}

export default function Hangar() {
  const sec = useRef<HTMLElement | null>(null);
  const a = useRef<HTMLDivElement | null>(null);
  const b = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sec.current, A = a.current, B = b.current;
    if (!el || !A || !B) return;
    let raf = 0, alive = true, pS = 0;
    const still = reduced();
    const loop = () => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      const pT = progressOf(el);
      pS = still ? pT : pS + (pT - pS) * 0.12;
      const vw = window.innerWidth;
      const wa = A.scrollWidth - vw + 40, wb = B.scrollWidth - vw + 40;
      A.style.transform = `translate3d(${-pS * Math.max(0, wa)}px,0,0)`;
      B.style.transform = `translate3d(${-(1 - pS) * Math.max(0, wb)}px,0,0)`;
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="rp-hangar" id="hangar" ref={sec}>
      <div className="rp-stick rp-hangar-stick">
        <div className="rp-wrap">
          <div className="rp-eyebrow">
            HANGAR · <span data-l="ko">실제 앱 화면</span>
            <span data-l="en">REAL APP RENDERS</span>
          </div>
          <h2 className="rp-h2">
            <span data-l="ko">기체를 고르고, 입히고, 세운다</span>
            <span data-l="en">Pick it. Paint it. Park it.</span>
          </h2>
          <p className="rp-lead">
            <span data-l="ko">사기 전에 내 책상 위에서 입혀 볼 수 있다. 어떤 도색은 돈으로 살 수 없다.</span>
            <span data-l="en">Try anything on your own desk before you buy. Some liveries can’t be bought at all.</span>
          </p>
        </div>
        <div className="rp-track" ref={a}>
          {BOOSTERS.map((it) => (
            <Card key={it.id} dir="boosters" it={it} />
          ))}
        </div>
        <div className="rp-track rp-track-b" ref={b}>
          {GROUND.map((it) => (
            <Card key={it.id} dir="ground" it={it} />
          ))}
        </div>
      </div>
    </section>
  );
}
