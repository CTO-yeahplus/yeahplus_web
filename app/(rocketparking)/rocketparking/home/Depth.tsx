'use client';

/* 2. 이 앱에서만 되는 몸짓 — 점화 직전 폰을 옆으로 옮겨 깊이를 본다.
   부스터는 패드에서 7cm 앞(정면 카메라 쪽)에 떠 있다. 정면 판(deskA)에서는 패드 위로 겹쳐 보이고,
   휠을 굴리면 폰이 옆으로 옮겨 가(휙 넘기는 전환) 옆 판(deskSide)에서 비껴 있는 게 보인다. 같은 방 · 같은 책상. */
import { useEffect, useRef } from 'react';
import { drawFrame, View, type Pose } from './render';
import { DESK_SIDE, PLATES, preload } from './plates';
import { ease, fit, progressOf, reduced, seg } from './stage';

const OFF = 0.07; // 패드 중심에서 앞으로 7cm
const HOVER = 0.16; // 패드 위 16cm 에 떠 있다
const POSE: Pose = { x: 0, z: OFF, y: HOVER * 250, lean: 0.03, legs: 0, th: 0, on: false };

export default function Depth() {
  const sec = useRef<HTMLElement | null>(null);
  const cv = useRef<HTMLCanvasElement | null>(null);
  const cap = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sec.current, c = cv.current, C = cap.current;
    if (!el || !c || !C) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const v = new View();
    const getPlate = preload([PLATES.desk.A, DESK_SIDE], () => {});
    let raf = 0, alive = true, pS = 0;
    const still = reduced();
    const loop = () => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      fit(c);
      const pT = progressOf(el);
      pS = still ? pT : pS + (pT - pS) * 0.12;
      const p = pS;
      const now = performance.now() / 1000;
      const k = ease(seg(p, 0.38, 0.62)); // 0 = 정면, 1 = 옆
      const side = k > 0.5;
      const pose = { ...POSE, y: POSE.y + Math.sin(now * 1.3) * 0.6 };
      // 옮기는 동안 화면이 옆으로 흐른다 — 앞 판은 왼쪽으로 밀려 나가고, 옆 판이 오른쪽에서 들어온다
      const whip = Math.sin(k * Math.PI); // 가운데에서 가장 세다
      const shift = (side ? 1 - k : -k) * c.width * 0.35;
      ctx.save();
      ctx.translate(shift, 0);
      drawFrame(ctx, v, {
        plate: getPlate(side ? DESK_SIDE : PLATES.desk.A),
        plateCam: { zoom: 1.04, look: 0.5, anchorY: 0.72 },
        place: 'desk',
        pose,
        t: 0,
        clock: now,
        puffs: [],
      });
      // 다림줄 — 부스터 바로 아래 바닥 점과 패드 중심까지
      const top = v.p([0, HOVER + 0.012, OFF]), foot = v.p([0, 0.001, OFF]), pad = v.p([0, 0.001, 0]);
      ctx.setLineDash([5, 6]);
      ctx.strokeStyle = 'rgba(255,179,31,.9)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(top.x, top.y);
      ctx.lineTo(foot.x, foot.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#FFB31F';
      ctx.beginPath();
      ctx.arc(foot.x, foot.y, 5, 0, Math.PI * 2);
      ctx.fill();
      if (side) {
        ctx.strokeStyle = 'rgba(244,246,248,.9)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pad.x, pad.y);
        ctx.lineTo(foot.x, foot.y);
        ctx.stroke();
        ctx.font = `700 ${Math.round(c.height * 0.03)}px ui-monospace,Menlo,monospace`;
        ctx.fillStyle = '#F4F6F8';
        ctx.textAlign = 'center';
        ctx.shadowColor = 'rgba(0,0,0,.7)';
        ctx.shadowBlur = 8;
        ctx.fillText('7 cm', (pad.x + foot.x) / 2, Math.max(pad.y, foot.y) + c.height * 0.055);
      }
      ctx.restore();
      // 휙 — 옮기는 순간의 흐림(가로 줄무늬 잔상)
      if (whip > 0.05) {
        ctx.save();
        ctx.globalAlpha = whip * 0.55;
        for (let i = 1; i <= 4; i++) ctx.drawImage(c, (side ? 1 : -1) * i * 18 * whip, 0);
        ctx.restore();
        ctx.fillStyle = `rgba(0,0,0,${whip * 0.25})`;
        ctx.fillRect(0, 0, c.width, c.height);
      }
      C.dataset.view = side ? 'side' : 'front';
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="rp-depth" ref={sec}>
      <div className="rp-stick">
        <canvas className="rp-cv" ref={cv} aria-hidden="true" />
        <div className="rp-depth-text" ref={cap} data-view="front">
          <div className="rp-eyebrow">THE GESTURE</div>
          <h2 className="rp-h2">
            <span data-l="ko">폰은 기울이지 않는다. 옮긴다.</span>
            <span data-l="en">You don&rsquo;t tilt the phone. You move it.</span>
          </h2>
          <p className="rp-depth-cap rp-depth-front">
            <span data-l="ko">정면에서는 패드 바로 위에 있는 것 같다.</span>
            <span data-l="en">Head-on, it looks dead centre over the pad.</span>
          </p>
          <p className="rp-depth-cap rp-depth-side">
            <span data-l="ko">한 걸음 옆에서 보면 7cm 앞이다. 노즐을 어느 쪽으로 꺾을지 보인다.</span>
            <span data-l="en">One step to the side: it&rsquo;s 7 cm in front. Now you know which way to steer.</span>
          </p>
          <p className="rp-depth-hint rp-mono">
            <span data-l="ko">휠을 굴리면 폰이 옆으로 옮겨 간다</span>
            <span data-l="en">Scroll to move the phone sideways</span>
          </p>
        </div>
      </div>
    </section>
  );
}
