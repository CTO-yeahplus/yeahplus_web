'use client';

/* 2. 이 앱에서만 되는 몸짓 — 점화 직전 폰을 옆으로 옮겨 깊이를 본다.
   부스터는 패드에서 7cm 앞(카메라 쪽)에 떠 있다. 정면에서는 패드 위로 겹쳐 보이고, 옆으로 돌면 비껴 있는 게 보인다.
   휠로 내려가면 카메라가 돌고, 마우스를 올리면 마우스가 카메라다. */
import { useEffect, useRef } from 'react';
import { drawFrame, View, type Pose } from './render';
import { fit, lerp, progressOf, reduced } from './stage';

const OFF = 0.07; // 패드 중심에서 앞으로 7cm
const POSE: Pose = { x: 0, z: OFF, y: 0.3 * 250, lean: 0.03, legs: 0, th: 0, on: false };

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
    let raf = 0, alive = true, yaw = 0, mouse: number | null = null, lastMove = 0;
    const still = reduced();
    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = c.getBoundingClientRect();
      mouse = lerp(-1.35, 1.35, Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
      lastMove = performance.now();
    };
    c.addEventListener('pointermove', move);
    const loop = () => {
      if (!alive) return;
      raf = requestAnimationFrame(loop);
      const r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      fit(c);
      const p = progressOf(el);
      const target = mouse != null && performance.now() - lastMove < 2500 ? mouse : lerp(0, 1.35, Math.min(1, p * 1.25));
      yaw = still ? target : yaw + (target - yaw) * 0.1;
      const now = performance.now() / 1000;
      v.set(c.width, c.height, { yaw, el: 0.16, dist: 0.8, ty: 0.2, fov: 0.85 });
      drawFrame(ctx, v, { place: 'desk', pose: { ...POSE, y: POSE.y + Math.sin(now * 1.3) * 0.6 }, t: 0, clock: now, puffs: [] });
      // 다림줄 — 부스터 바로 아래 바닥 점
      const top = v.p([0, 0.3 + 0.012, OFF]), foot = v.p([0, 0.001, OFF]), pad = v.p([0, 0.001, 0]);
      ctx.save();
      ctx.setLineDash([5, 6]);
      ctx.strokeStyle = 'rgba(255,179,31,.85)';
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
      // 패드 중심에서 떨어진 거리 — 옆에서 볼수록 길어 보인다
      const side = Math.abs(Math.sin(yaw));
      if (side > 0.25) {
        ctx.strokeStyle = 'rgba(244,246,248,.8)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(pad.x, pad.y);
        ctx.lineTo(foot.x, foot.y);
        ctx.stroke();
        ctx.font = `700 ${Math.round(c.height * 0.028)}px ui-monospace,Menlo,monospace`;
        ctx.fillStyle = '#F4F6F8';
        ctx.textAlign = 'center';
        ctx.globalAlpha = Math.min(1, (side - 0.25) * 3);
        ctx.fillText('7 cm', (pad.x + foot.x) / 2, Math.min(pad.y, foot.y) - c.height * 0.035);
      }
      ctx.restore();
      C.dataset.view = side < 0.3 ? 'front' : 'side';
      C.style.setProperty('--yaw', String(yaw));
    };
    raf = requestAnimationFrame(loop);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      c.removeEventListener('pointermove', move);
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
            <span data-l="ko">휠을 굴리거나, 마우스를 좌우로</span>
            <span data-l="en">Scroll, or move the mouse sideways</span>
          </p>
        </div>
      </div>
    </section>
  );
}
