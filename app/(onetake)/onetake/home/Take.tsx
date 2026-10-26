'use client';

/* 0. 원 테이크 — 휠(스크롤)이 곧 테이크다. 기획 APLUS/drift/docs/WEB_SITE.md 2절.
   야드 모범 테이크를 추격 카메라로 찍은 게임 프레임 120장(public/onetake/take/c###.webp)을 스크롤 진행도로 감는다.
   이웃 두 장을 섞어 그려 끊김을 줄이고, 화면 위치는 목표를 늦게 따라가 카메라처럼 움직인다.
   휠을 0.6초 멈추면 같은 순간의 감독판 앵글(d###.webp, 31장)로 바뀐다 — 앱의 '멈추면 편집본'.
   마우스: 화면이 카메라맨처럼 늦게 따라 패닝(오버스캔 6%) · 뷰파인더는 반대로 · 커서는 초점 링.
   React 상태를 쓰지 않는다 — 그리기·글자 갱신은 전부 rAF 안에서 ref 로(매 프레임 다시 그리지 않게). */
import { useEffect, useRef } from 'react';
import { SHOTS } from './data';

type TakeInfo = { fps: number; n: number; chase: number[]; cut: number[]; shots: { id: number; f: number }[] };

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const seg = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const pad = (n: number) => String(n).padStart(2, '0');
/** 게임 프레임(60fps) → 필름 타임코드 24fps */
const tc = (f: number) => {
  const s = f / 60, ff = Math.floor((s % 1) * 24);
  return `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(Math.floor(s) % 60)}:${pad(ff)}`;
};

export default function Take() {
  const sec = useRef<HTMLElement | null>(null);
  const cv = useRef<HTMLCanvasElement | null>(null);
  const vf = useRef<HTMLDivElement | null>(null);
  const cursor = useRef<HTMLDivElement | null>(null);
  const t = {
    tc: useRef<HTMLSpanElement | null>(null),
    no: useRef<HTMLSpanElement | null>(null),
    nameKo: useRef<HTMLSpanElement | null>(null),
    nameEn: useRef<HTMLSpanElement | null>(null),
    hintKo: useRef<HTMLSpanElement | null>(null),
    hintEn: useRef<HTMLSpanElement | null>(null),
    speed: useRef<HTMLSpanElement | null>(null),
    dots: useRef<HTMLDivElement | null>(null),
    title: useRef<HTMLDivElement | null>(null),
    end: useRef<HTMLDivElement | null>(null),
    hud: useRef<HTMLDivElement | null>(null),
    tip: useRef<HTMLDivElement | null>(null),
    load: useRef<HTMLDivElement | null>(null),
  };

  useEffect(() => {
    const el = sec.current, canvas = cv.current;
    if (!el || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarse = window.matchMedia('(pointer: coarse), (max-width: 720px)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    let alive = true, raf = 0, info: TakeInfo | null = null;
    let chase: (HTMLImageElement | null)[] = [], cut: (HTMLImageElement | null)[] = [];
    const ok = (im: HTMLImageElement | null | undefined): im is HTMLImageElement => !!im && im.complete && im.naturalWidth > 0;

    /* ── 그림 받기: 첫 장 → 성긴 간격부터 촘촘히(어디를 감아도 가까운 장이 먼저 있게). 휴대폰은 두 장에 한 장만 ── */
    const load = (url: string) =>
      new Promise<HTMLImageElement>((res) => {
        const im = new Image();
        im.decoding = 'async';
        im.onload = im.onerror = () => res(im);
        im.src = url;
      });
    async function start() {
      try {
        info = (await (await fetch('/onetake/take/take.json')).json()) as TakeInfo;
      } catch {
        return;
      }
      if (!alive || !info) return;
      const N = info.chase.length, M = info.cut.length, step = coarse ? 2 : 1;
      chase = new Array(N).fill(null);
      cut = new Array(M).fill(null);
      const order: number[] = [];
      for (let s = 32; s >= step; s = s / 2) for (let i = 0; i < N; i += s) if (!order.includes(i)) order.push(i);
      if (!order.includes(N - 1)) order.splice(1, 0, N - 1);
      const jobs: (() => Promise<void>)[] = order.map((i) => async () => {
        chase[i] = await load(`/onetake/take/c${String(i).padStart(3, '0')}.webp`);
      });
      // 감독판은 추격 성긴 간격(8)이 다 온 뒤에 끼워 넣는다
      const cutJobs = Array.from({ length: M }, (_, k) => async () => {
        cut[k] = await load(`/onetake/take/d${String(k).padStart(3, '0')}.webp`);
      });
      const firstPass = order.findIndex((i, j) => j > 0 && i % 8 !== 0 && i !== N - 1);
      jobs.splice(firstPass < 0 ? jobs.length : firstPass, 0, ...cutJobs);
      const total = jobs.length;
      let done = 0, next = 0;
      const worker = async () => {
        while (alive && next < jobs.length) {
          const j = jobs[next++];
          await j();
          done++;
          if (t.load.current) t.load.current.style.width = `${(done / total) * 100}%`;
        }
      };
      await Promise.all(Array.from({ length: 6 }, worker));
      if (t.load.current) t.load.current.style.opacity = '0';
    }
    start();

    /* ── 크기 ── */
    let W = 0, H = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    /* ── 마우스: 카메라맨 ── */
    let mx = 0, my = 0, ox = 0, oy = 0, rot = 0;
    const stage = canvas.parentElement as HTMLElement;
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      mx = clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
      my = clamp(((e.clientY - r.top) / r.height) * 2 - 1, -1, 1);
      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
        cursor.current.style.opacity = '1';
      }
    };
    const onLeave = () => {
      mx = my = 0;
      if (cursor.current) cursor.current.style.opacity = '0';
    };
    if (fine && !reduced) {
      stage.addEventListener('pointermove', onMove);
      stage.addEventListener('pointerleave', onLeave);
    }

    /* ── 한 프레임 ── */
    let pos = 0, last = performance.now(), still = 0, cutA = 0, cutting = false, sp = 0, everCut = false, tipT = 0;
    let prevShot = -1, prevTc = '', prevSpeed = '', prevTip = '';
    const progress = () => {
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      return span > 0 ? clamp(-r.top / span) : 0;
    };
    const cover = (im: HTMLImageElement, alpha: number) => {
      if (alpha <= 0.002) return;
      const s = Math.max(W / im.naturalWidth, H / im.naturalHeight) * (reduced ? 1 : 1.06);
      const w = im.naturalWidth * s, h = im.naturalHeight * s;
      ctx.globalAlpha = alpha;
      ctx.drawImage(im, (W - w) / 2 + ox, (H - h) / 2 + oy, w, h);
    };
    const nearest = (arr: (HTMLImageElement | null)[], i: number, dir: 1 | -1) => {
      for (let k = i; k >= 0 && k < arr.length; k += dir) if (ok(arr[k])) return k;
      return -1;
    };
    const tick = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const p = reduced ? 0 : progress();
      const q = seg(p, 0.04, 0.96);
      if (info && chase.length) {
        const N = chase.length;
        const target = q * (N - 1);
        const prev = pos;
        pos += (target - pos) * (1 - Math.exp(-dt * 8));
        if (Math.abs(target - pos) < 0.002) pos = target;
        const span = info.chase[N - 1] - info.chase[0];
        const perIdx = span / (N - 1) / 60; // 한 장 = 테이크 몇 초
        const v = Math.abs(pos - prev) / Math.max(dt, 1e-3) * perIdx; // 테이크 초 / 실제 초
        sp += (v - sp) * (1 - Math.exp(-dt * 6));

        /* 멈춤 → 컷 */
        if (Math.abs(target - pos) < 0.03 && v < 0.05) still += dt;
        else still = 0;
        const want = !reduced && still > 0.6 && q > 0.004 && q < 0.996;
        if (want && !cutting) {
          cutting = true;
          everCut = true;
          el.setAttribute('data-cut', '1');
          el.setAttribute('data-clap', '1');
          setTimeout(() => el.removeAttribute('data-clap'), 340);
          cursor.current?.classList.add('cut');
        } else if (!want && cutting) {
          cutting = false;
          tipT = 2.4;
          el.removeAttribute('data-cut');
          cursor.current?.classList.remove('cut');
        }
        cutA += ((cutting ? 1 : 0) - cutA) * (1 - Math.exp(-dt * (cutting ? 7 : 16)));

        /* 카메라맨 패닝 */
        ox += (-mx * W * 0.022 - ox) * (1 - Math.exp(-dt * 2.6));
        oy += (-my * H * 0.018 - oy) * (1 - Math.exp(-dt * 2.6));
        rot += (mx * 0.004 - rot) * (1 - Math.exp(-dt * 2));

        /* 그리기 */
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, W, H);
        ctx.translate(W / 2, H / 2);
        ctx.rotate(rot);
        ctx.translate(-W / 2, -H / 2);
        const i0 = Math.floor(pos);
        const a = nearest(chase, i0, -1), b = nearest(chase, Math.min(N - 1, i0 + 1), 1);
        const ia = a >= 0 ? a : b;
        if (ia >= 0) {
          cover(chase[ia]!, 1);
          if (b >= 0 && b !== ia && b - ia <= 4) cover(chase[b]!, clamp((pos - ia) / (b - ia)));
        }
        /* 같은 순간의 감독판 */
        const fm = info.chase[0] + span * (pos / (N - 1));
        if (cutA > 0.002 && cut.length) {
          const M = cut.length;
          const k = Math.round(((fm - info.cut[0]) / (info.cut[M - 1] - info.cut[0])) * (M - 1));
          const kk = nearest(cut, clamp(k, 0, M - 1), -1);
          if (kk >= 0 && Math.abs(kk - k) <= 1) cover(cut[kk]!, cutA);
        }
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        /* 글자 — 바뀔 때만 */
        const code = tc(fm);
        if (code !== prevTc && t.tc.current) t.tc.current.textContent = prevTc = code;
        let shot = info.shots.findIndex((s) => s.f >= fm);
        if (shot < 0) shot = info.shots.length - 1;
        if (shot !== prevShot) {
          prevShot = shot;
          const S = SHOTS[shot];
          if (t.no.current) t.no.current.textContent = `SHOT ${pad(shot + 1)} / ${pad(SHOTS.length)}`;
          if (t.nameKo.current) t.nameKo.current.textContent = S.ko;
          if (t.nameEn.current) t.nameEn.current.textContent = S.en;
          if (t.hintKo.current) t.hintKo.current.textContent = S.hintKo;
          if (t.hintEn.current) t.hintEn.current.textContent = S.hintEn;
          t.dots.current?.querySelectorAll('i').forEach((d, j) => {
            d.className = j < shot ? 'on' : j === shot ? 'now' : '';
          });
        }
        const sTxt = cutting ? '■ CUT' : `×${Math.min(9.9, sp).toFixed(1)}`;
        if (sTxt !== prevSpeed && t.speed.current) t.speed.current.textContent = prevSpeed = sTxt;
        el.style.setProperty('--sp', clamp((sp - 1.6) / 4).toFixed(3));
        if (vf.current) {
          vf.current.style.setProperty('--vx', `${(mx * 7).toFixed(1)}px`);
          vf.current.style.setProperty('--vy', `${(my * 5).toFixed(1)}px`);
        }
      }
      /* 첫 화면 제목 · 끝 화면 · 안내 */
      const tOp = 1 - seg(p, 0.004, 0.03), eOp = seg(p, 0.962, 0.99);
      if (t.title.current) t.title.current.style.opacity = tOp.toFixed(3);
      if (t.hud.current) t.hud.current.style.opacity = ((1 - tOp) * (1 - eOp)).toFixed(3);
      if (t.end.current) t.end.current.style.opacity = eOp.toFixed(3);
      tipT = Math.max(0, tipT - dt);
      const tip = reduced || eOp > 0 ? '' : q > 0.05 && q < 0.6 && !everCut ? 'stop' : tipT > 0 ? 'again' : '';
      if (tip !== prevTip && t.tip.current) {
        prevTip = tip;
        t.tip.current.style.opacity = tip ? '1' : '0';
        t.tip.current.querySelectorAll<HTMLElement>('[data-tip]').forEach((n) => {
          n.style.display = n.dataset.tip === tip ? '' : 'none';
        });
      }
      if (alive && visible) raf = requestAnimationFrame(tick);
    };

    /* 화면에 보일 때만 돈다 */
    let visible = true;
    const io = new IntersectionObserver((es) => {
      visible = es.some((e) => e.isIntersecting);
      if (visible && !raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    });
    io.observe(el);
    raf = requestAnimationFrame(tick);

    return () => {
      alive = false;
      io.disconnect();
      window.removeEventListener('resize', resize);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
    // ref 객체(t)는 바뀌지 않는다
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="ot-take" ref={sec} aria-label="ONE TAKE">
      <div className="ot-take-stage">
        <canvas className="ot-take-cv" ref={cv} aria-hidden="true" />
        <div className="ot-streak" aria-hidden="true" />
        <div className="ot-vf" ref={vf} aria-hidden="true">
          <div className="ot-vf-frame">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="ot-vf-cross" />
          <div ref={t.hud} style={{ opacity: 0 }}>
            <div className="ot-hud ot-hud-tl">
              <span className="ot-rec">
                <b />
                REC
              </span>
              <br />
              <span className="ot-tc" ref={t.tc}>
                00:00:00:00
              </span>
              <br />
              <span className="ot-dim">TAKE 1 · SCENE 01 YARD</span>
            </div>
            <div className="ot-hud ot-hud-tr">
              <span className="ot-dim">SPEED</span>
              <br />
              <span className="ot-speed" ref={t.speed}>
                ×0.0
              </span>
            </div>
            <div className="ot-hud ot-hud-bl">
              <span className="ot-shot-no" ref={t.no}>
                SHOT 01 / 09
              </span>
              <span className="ot-shot-name" data-l="ko" ref={t.nameKo}>
                {SHOTS[0].ko}
              </span>
              <span className="ot-shot-name" data-l="en" ref={t.nameEn}>
                {SHOTS[0].en}
              </span>
              <span className="ot-shot-hint" data-l="ko" ref={t.hintKo}>
                {SHOTS[0].hintKo}
              </span>
              <span className="ot-shot-hint" data-l="en" ref={t.hintEn}>
                {SHOTS[0].hintEn}
              </span>
            </div>
            <div className="ot-hud ot-hud-br">
              <span className="ot-dim" data-l="ko">
                컷 0번
              </span>
              <span className="ot-dim" data-l="en">
                0 CUTS
              </span>
              <div className="ot-dots" ref={t.dots}>
                {SHOTS.map((s, i) => (
                  <i key={s.en} className={i === 0 ? 'now' : ''} />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="ot-cut" aria-hidden="true">
          <span data-l="ko">CUT · 감독판</span>
          <span data-l="en">CUT · DIRECTOR&rsquo;S CUT</span>
        </div>
        <div className="ot-slate t" aria-hidden="true" />
        <div className="ot-slate b" aria-hidden="true" />

        <div className="ot-title" ref={t.title}>
          <div className="ot-kick">SCENE 01 · TAKE 1</div>
          <h1>ONE TAKE</h1>
          <p className="ot-tag" data-l="ko">
            차 한 대. 테이크 한 번. 컷 없이.
          </p>
          <p className="ot-tag" data-l="en">
            One car. One take. No cuts.
          </p>
          <div className="ot-hint" aria-hidden="true">
            <span data-l="ko">스크롤하면 촬영이 시작됩니다</span>
            <span data-l="en">SCROLL TO ROLL CAMERA</span>
            <i />
          </div>
        </div>
        <div className="ot-end" ref={t.end} aria-hidden="true">
          <div className="ot-big" data-l="ko">
            컷!
          </div>
          <div className="ot-big" data-l="en">
            Cut!
          </div>
          <div className="ot-small" data-l="ko">
            샷 9개 · 컷 0번 · 테이크 1
          </div>
          <div className="ot-small" data-l="en">
            9 SHOTS · 0 CUTS · 1 TAKE
          </div>
        </div>
        <div className="ot-tip" ref={t.tip} style={{ opacity: 0 }} aria-hidden="true">
          <span data-tip="stop">
            <span data-l="ko">멈춰 보세요 — 편집은 이미 끝나 있습니다</span>
            <span data-l="en">Stop scrolling — the edit is already done</span>
          </span>
          <span data-tip="again" style={{ display: 'none' }}>
            <span data-l="ko">다시 굴리면 테이크가 이어집니다</span>
            <span data-l="en">Scroll again and the take rolls on</span>
          </span>
        </div>
        <div className="ot-load" ref={t.load} style={{ width: '0%' }} aria-hidden="true" />
      </div>
      <div className="ot-cursor" ref={cursor} aria-hidden="true" />
    </section>
  );
}
