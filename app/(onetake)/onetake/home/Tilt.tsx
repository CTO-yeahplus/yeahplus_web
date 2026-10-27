'use client';

/* 1-b. 기울이기(자이로) 조향 — HARD MODE. 앱 설정 '조향 → 기울이기'(CoreMotion 중력값, drift/src/tilt.js).
   폰 틀 안의 게임 화면(public/onetake/how/tilt.webp — 실제 게임의 기울이기 화면: 기울기 막대 · 왼손 사이드·브레이크 · 오른손 GAS)이
   좌우로 기운다. 화면에 들어오면 수평계가 같이 흔들린다. 숫자로 된 성공률은 없다 — 지어내지 않는다. */
import Image from 'next/image';
import { useSeen } from './motion';

const RULES = [
  {
    ko: ['폰이 곧 핸들', '엄지 조향이 꺼진다. 왼손은 사이드·브레이크, 오른손은 GAS 하나.'],
    en: ['The phone is the wheel', 'Thumb steering is off. Left hand: handbrake and brake. Right hand: gas.'],
  },
  {
    ko: ['손목이 떨리면 차도 떨린다', '기울인 만큼 그대로 미끄럼각이 된다. 도넛 두 바퀴를 손목으로 버텨야 한다.'],
    en: ['Shaky wrist, shaky car', 'Every degree of tilt becomes slip angle. Hold two donuts with your wrists alone.'],
  },
  {
    ko: ['기울이기로 찍은 S 컷이라면', '아무나 못 한다. 그 테이크는 자랑해도 된다.'],
    en: ['An S cut on tilt', 'Not everyone can. That take is worth showing off.'],
  },
] as const;

export default function Tilt() {
  const [ref, seen] = useSeen<HTMLDivElement>(0.3);
  return (
    <section className="ot-sec ot-tilt" id="tilt">
      <div className="ot-wrap ot-tilt-grid" ref={ref}>
        <div className="ot-tilt-copy">
          <div className="ot-eyebrow">
            <span className="ot-hard">HARD MODE</span> <span data-l="ko">기울이기(자이로) 조향</span>
            <span data-l="en">Tilt (gyro) steering</span>
          </div>
          <h2 className="ot-h2">
            <span data-l="ko">폰을 기울여 운전한다. 아무나 못 한다.</span>
            <span data-l="en">Steer by tilting the phone. Not everyone can.</span>
          </h2>
          <p className="ot-lead">
            <span data-l="ko">설정 › 조향을 &lsquo;기울이기&rsquo;로 바꾸면 손목이 핸들이 된다. 처음 몇 테이크는 컨테이너부터 긁는다.</span>
            <span data-l="en">Switch Settings › Steering to Tilt and your wrists become the wheel. Your first few takes will scrape the containers.</span>
          </p>
          <ol className="ot-tilt-rules">
            {RULES.map((r, i) => (
              <li key={r.en[0]} className={seen ? 'in' : ''} style={{ transitionDelay: seen ? `${0.15 + i * 0.12}s` : undefined }}>
                <b>
                  <span data-l="ko">{r.ko[0]}</span>
                  <span data-l="en">{r.en[0]}</span>
                </b>
                <span data-l="ko">{r.ko[1]}</span>
                <span data-l="en">{r.en[1]}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className={seen ? 'ot-tilt-stage in' : 'ot-tilt-stage'} aria-hidden="true">
          <div className="ot-phone">
            <Image src="/onetake/how/tilt.webp" alt="" width={1280} height={720} sizes="(max-width:860px) 88vw, 520px" />
            <span className="ot-phone-notch" />
          </div>
          <div className="ot-level">
            <i />
          </div>
          <div className="ot-tilt-cap">
            <span data-l="ko">기울기 1° = 미끄럼각</span>
            <span data-l="en">1° of tilt = slip angle</span>
          </div>
        </div>
      </div>
    </section>
  );
}
