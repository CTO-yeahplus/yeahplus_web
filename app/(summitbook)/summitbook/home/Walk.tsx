'use client';

/* S#2 첫걸음 · S#3 쉼 — 앱이 나오지 않는 두 장. 수첩은 이 시간에 주머니 속에서 기다린다(걸음 · 속도 · 경로를 재지 않는다).
   스크롤 = 걸음. 첫걸음: 새벽 하늘이 밝아지며 헤드랜턴 불빛 하나가 지그재그 길을 오른다 · 소리 켬(기본 끔, 기기 안 합성 발소리 · 숨).
   쉼: 같은 길을 뒤돌아본다 — 귤이 반으로 갈라지고, 아침에 출발한 들머리가 손톱만 하게 보인다. 그림은 이름 없는 산(실제 산이 아니다). */
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ac, rng } from './engine';
import { ease, lerp, reduced, seg, useNear, useScrollProgress } from './stage';
import { Nb, sceneAttrs, skyOf, Slug } from './Scene';

/* 한 박자 — p 가 [a, b] 안에서만 보인다(앞뒤로 살짝 겹쳐 사라짐). 마지막 박자는 b = 2 */
function Beat({ p, a, b, children, cls = '' }: { p: number; a: number; b: number; children: ReactNode; cls?: string }) {
  const o = reduced() ? (p >= a && p < b ? 1 : 0) : seg(p, a, a + 0.06) * (1 - seg(p, b - 0.06, b));
  return (
    <div className={`sb-beat ${cls}`} style={{ opacity: o, transform: `translateY(${((1 - o) * 14).toFixed(1)}px)`, visibility: o < 0.01 ? 'hidden' : undefined }}>
      {children}
    </div>
  );
}
const T = ({ ko, en }: { ko: ReactNode; en: ReactNode }) => (
  <>
    <span data-l="ko">{ko}</span>
    <span data-l="en">{en}</span>
  </>
);

/* 꺾인 선 위의 점 — t 0…1 */
type Pt = [number, number];
function along(pts: Pt[], t: number): Pt {
  const seglen = pts.slice(1).map((q, i) => Math.hypot(q[0] - pts[i][0], q[1] - pts[i][1]));
  let d = Math.max(0, Math.min(1, t)) * seglen.reduce((a, b) => a + b, 0);
  for (let i = 0; i < seglen.length; i++) {
    if (d <= seglen[i]) {
      const k = d / seglen[i];
      return [lerp(pts[i][0], pts[i + 1][0], k), lerp(pts[i][1], pts[i + 1][1], k)];
    }
    d -= seglen[i];
  }
  return pts[pts.length - 1];
}
const poly = (pts: Pt[]) => 'M' + pts.map((q) => q.join(' ')).join(' L');
const mix = (a: string, b: string, k: number) => {
  const A = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16)), B = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${A.map((v, i) => Math.round(lerp(v, B[i], k))).join(',')})`;
};

/* 발소리 · 숨 — 기기 안에서 합성(녹음 파일 없음) */
function walkSfx(kind: 'step' | 'breath') {
  const a = ac();
  if (!a) return;
  const t = a.currentTime, len = kind === 'step' ? 0.16 : 1.3;
  const buf = a.createBuffer(1, Math.ceil(a.sampleRate * len), a.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) {
    const x = i / d.length;
    d[i] = (Math.random() * 2 - 1) * (kind === 'step' ? (1 - x) ** 4 : Math.sin(Math.PI * x) ** 2);
  }
  const n = a.createBufferSource(), f = a.createBiquadFilter(), g = a.createGain();
  n.buffer = buf;
  f.type = kind === 'step' ? 'lowpass' : 'bandpass';
  f.frequency.value = kind === 'step' ? 700 + Math.random() * 500 : 620;
  f.Q.value = kind === 'step' ? 0.7 : 0.6;
  g.gain.value = kind === 'step' ? 0.32 : 0.07;
  n.connect(f).connect(g).connect(a.destination);
  n.start(t);
}

// 지그재그 길(뷰박스 400×300, 이름 없는 산)
const TRAIL: Pt[] = [[206, 300], [150, 268], [234, 238], [170, 206], [228, 176], [184, 146], [222, 118], [198, 96]];
const MOUNT = 'M0 300 L0 214 L44 196 L86 174 L124 146 L162 116 L192 90 L214 72 L238 88 L268 106 L306 132 L348 158 L400 176 L400 300Z';
const BACK = 'M0 300 L0 176 L60 150 L110 160 L150 132 L200 150 L250 120 L300 140 L350 118 L400 134 L400 300Z';

export function FirstSteps() {
  const [ref, p] = useScrollProgress<HTMLElement>();
  const [nearRef, near] = useNear<HTMLDivElement>('0px');
  const [snd, setSnd] = useState(false);
  const stars = useMemo(() => {
    const R = rng('dawn-stars');
    return Array.from({ length: 46 }, () => [R() * 400, R() * 140, 0.4 + R() * 0.9] as const);
  }, []);
  const k = ease(seg(p, 0.0, 1));
  const sky = skyOf(5.8 + 1.8 * k);
  const lamp = along(TRAIL, seg(p, 0.04, 0.9));
  // 지나온 길: 시작점부터 지금 불빛까지
  const walked: Pt[] = (() => {
    const t = seg(p, 0.04, 0.9), out: Pt[] = [TRAIL[0]];
    const total = TRAIL.slice(1).reduce((s, q, i) => s + Math.hypot(q[0] - TRAIL[i][0], q[1] - TRAIL[i][1]), 0);
    let acc = 0;
    for (let i = 1; i < TRAIL.length; i++) {
      const l = Math.hypot(TRAIL[i][0] - TRAIL[i - 1][0], TRAIL[i][1] - TRAIL[i - 1][1]);
      if ((acc + l) / total <= t) out.push(TRAIL[i]);
      else break;
      acc += l;
    }
    out.push(lamp);
    return out;
  })();

  // 소리: 켰고 화면에 있을 때만. 발소리 0.62초 · 숨 두 걸음마다(오르막 박자)
  useEffect(() => {
    if (!snd || !near) return;
    let n = 0;
    const id = window.setInterval(() => {
      walkSfx('step');
      if (n++ % 3 === 0) walkSfx('breath');
    }, 620);
    return () => window.clearInterval(id);
  }, [snd, near]);

  return (
    <section ref={ref} className="sb-walk sb-walk-climb" {...sceneAttrs('start')} aria-label="S#2">
      <div className="sb-walk-stick" ref={nearRef}>
        <div className="sb-sky" style={{ background: `linear-gradient(${sky[0]}, ${sky[1]} 62%, ${sky[2]})` }} />
        <svg className="sb-walk-art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          {stars.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r * 0.6} fill="#fff" opacity={(1 - seg(p, 0.15, 0.8)) * (0.35 + (i % 5) * 0.12)} />
          ))}
          <path d={BACK} fill={mix('#141B2A', '#3A4258', k)} />
          <path d={MOUNT} fill={mix('#0C111B', '#232A3A', k)} />
          <path d={poly(TRAIL)} className="sb-trail" />
          <path d={poly(walked)} className="sb-trail sb-trail-on" />
          <circle cx={lamp[0]} cy={lamp[1]} r={9} className="sb-lamp-glow" />
          <circle cx={lamp[0]} cy={lamp[1]} r={1.9} fill="#FFE7B0" />
        </svg>

        <div className="sb-walk-slug">
          <Slug id="start" />
        </div>
        <div className="sb-walk-copy">
          <Beat p={p} a={0.02} b={0.22}>
            <p className="sb-beat-m">
              <T ko="몸이 아직 덜 깼다. 차가운 공기가 코끝을 찌른다." en="Your body isn't awake yet. The cold air stings your nose." />
            </p>
            <small>
              <T ko="앞서 가는 스틱 소리. 헤드랜턴 불빛 몇 개." en="Trekking poles clicking ahead. A few headlamps." />
            </small>
          </Beat>
          <Beat p={p} a={0.22} b={0.42}>
            <p className="sb-beat-m">
              <T ko="첫 오르막 15분. 숨이 턱까지 찬다." en="The first fifteen minutes uphill. You're out of breath." />
            </p>
          </Beat>
          <Beat p={p} a={0.42} b={0.6} cls="sb-beat-xl">
            <p>
              <T ko="“내가 왜 왔지.”" en="“Why did I come?”" />
            </p>
          </Beat>
          <Beat p={p} a={0.6} b={0.78}>
            <p className="sb-beat-m">
              <T ko="삼십 분쯤 지나면 몸이 풀린다." en="Half an hour in, your body loosens up." />
            </p>
            <small>
              <T ko="내 숨소리와 발소리만 남는다. 산에 오는 사람들이 진짜 좋아하는 건, 사실 이 시간이다." en="Only your breath and your steps are left. Truth is, this is the part people come for." />
            </small>
          </Beat>
          <Beat p={p} a={0.78} b={2} cls="sb-beat-end">
            <h2 className="sb-h2">
              <T ko="올라가는 동안, 수첩은 주머니에서 기다립니다." en="On the way up, the notebook waits in your pocket." />
            </h2>
            <Nb
              ko="걸음 수 · 속도 · 경로를 재지 않고, 누구와도 견주지 않는다. 위치는 정상에서 한 번만 읽는다."
              en="No step count, no pace, no track, no comparing. It reads your location once — at the summit."
            />
          </Beat>
        </div>

        <button type="button" className="sb-walk-snd" aria-pressed={snd} onClick={() => setSnd((v) => !v)}>
          <T ko={`발소리 ${snd ? '켬' : '끔'}`} en={`Footsteps ${snd ? 'on' : 'off'}`} />
        </button>
      </div>
    </section>
  );
}

/* S#3 쉼 — 뒤돌아본 길. 들머리(P)에서 지금 자리까지 지나온 길이 그려지고, 아침 불빛이 손톱만 하게 깜빡인다 */
const BACKTRAIL: Pt[] = [[60, 300], [96, 274], [150, 262], [128, 244], [190, 236], [176, 222], [230, 216], [222, 206], [262, 202]];
export function Rest() {
  const [ref, p] = useScrollProgress<HTMLElement>();
  const sky = skyOf(8.17);
  const split = ease(seg(p, 0.24, 0.34));
  const draw = ease(seg(p, 0.4, 0.56));
  const len = 330;
  const glow = seg(p, 0.5, 0.56);
  return (
    <section ref={ref} className="sb-walk sb-walk-rest" {...sceneAttrs('rest')} aria-label="S#3">
      <div className="sb-walk-stick">
        <div className="sb-sky" style={{ background: `linear-gradient(${sky[0]}, ${sky[1]} 62%, ${sky[2]})` }} />
        <svg className="sb-walk-art" viewBox="0 0 400 300" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <path d="M0 300 L0 178 L50 168 L100 176 L160 160 L220 172 L280 156 L340 168 L400 160 L400 300Z" fill="#9BAAC0" opacity=".8" />
          <path d="M0 300 L0 196 L70 186 L130 198 L190 184 L250 196 L320 182 L400 192 L400 300Z" fill="#7C8BA3" />
          <path d="M0 300 L0 212 L80 206 L150 214 L230 200 L300 210 L400 204 L400 300Z" fill="#5B6880" />
          <path d={poly(BACKTRAIL)} className="sb-trail sb-trail-day" style={{ strokeDasharray: len, strokeDashoffset: len * (1 - draw) }} />
          <g transform="translate(262 202)" opacity={0.4 + glow * 0.6}>
            <circle r={6 * glow} className="sb-lamp-glow" />
            <rect x={-3.2} y={-3.2} width={6.4} height={6.4} rx={1} fill="#F2ECDF" opacity={glow} />
            <text y={2.1} textAnchor="middle" fontSize={5} fontWeight={900} fill="#2C3A2F" opacity={glow}>
              P
            </text>
          </g>
          {/* 너럭바위 */}
          <path d="M0 300 L0 256 C 60 246, 120 250, 190 244 C 260 238, 330 248, 400 242 L400 300Z" fill="#2E3338" />
          <path d="M0 262 C 70 252, 140 256, 200 251" stroke="rgba(255,255,255,.08)" strokeWidth={1.2} fill="none" />
          {/* 귤 — 반으로 갈라진다 */}
          <g transform="translate(200 250) scale(1.15)">
            <g transform={`translate(${-split * 9} ${split * 1}) rotate(${-split * 16})`}>
              <path d="M0 -9 A9 9 0 0 0 0 9 Z" fill="#F08A1E" />
              {split > 0.05 && <path d="M0 -8 A8 8 0 0 0 0 8 Z" fill="#F7B04A" opacity={split} />}
            </g>
            <g transform={`translate(${split * 9} ${split * 1}) rotate(${split * 16})`}>
              <path d="M0 -9 A9 9 0 0 1 0 9 Z" fill="#E87F16" />
              {split > 0.05 && <path d="M0 -8 A8 8 0 0 1 0 8 Z" fill="#F7B04A" opacity={split} />}
              {split < 0.05 && <path d="M1 -9 C 4 -13, 8 -12, 9 -10 C 6 -9, 3 -9, 1 -9Z" fill="#4E7A2E" />}
            </g>
          </g>
        </svg>

        <div className="sb-walk-slug sb-walk-slug-dark">
          <Slug id="rest" />
        </div>
        <div className="sb-walk-copy sb-walk-copy-day">
          <Beat p={p} a={0.02} b={0.22}>
            <p className="sb-beat-m">
              <T ko="배낭을 내리면, 등의 땀이 식는다." en="Bag off. The sweat on your back turns cold." />
            </p>
            <small>
              <T ko="겉옷을 꺼내 입는다." en="You pull on a layer." />
            </small>
          </Beat>
          <Beat p={p} a={0.22} b={0.4}>
            <p className="sb-beat-m">
              <T ko="물 한 모금이 이렇게 달 수가 없다." en="Water has never tasted this good." />
            </p>
            <small>
              <T ko="동행과 말없이 귤을 나눈다." en="You split a tangerine with whoever came along, without a word." />
            </small>
          </Beat>
          <Beat p={p} a={0.4} b={0.58}>
            <p className="sb-beat-m">
              <T ko="뒤돌아보면, 아침의 내가 손톱만 하다." en="Look back, and this morning's you is the size of a fingernail." />
            </p>
          </Beat>
          <Beat p={p} a={0.58} b={0.78} cls="sb-beat-talk">
            <p>
              <T ko="“얼마나 남았어요?”" en="“How much further?”" />
            </p>
            <p style={{ opacity: seg(p, 0.65, 0.69) }}>
              <T ko="“거의 다 왔어요.”" en="“Almost there.”" />
            </p>
          </Beat>
          <Beat p={p} a={0.78} b={2} cls="sb-beat-end">
            <h2 className="sb-h2">
              <T ko="“거의 다 왔어요”는 산에서 가장 다정한 거짓말이다." en="“Almost there” is the kindest lie on any mountain." />
            </h2>
            <Nb
              ko={
                <>
                  여전히 조용하다. 귤 반쪽을 나눈 사람의 이름은, 내려가서 쪽의 &lsquo;함께&rsquo; 칸에 적는다.
                </>
              }
              en={<>Still quiet. The name of whoever shared that tangerine goes in the page&rsquo;s &ldquo;with&rdquo; line later, on the way down.</>}
            />
          </Beat>
        </div>
      </div>
    </section>
  );
}
