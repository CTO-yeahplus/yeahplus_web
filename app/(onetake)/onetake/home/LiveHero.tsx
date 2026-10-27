'use client';

/* 0. 라이브 촬영장 — 기획 APLUS/drift/docs/WEB_HERO.md (2026-10-27 A안).
   히어로가 영상이 아니라 게임 엔진 그 자체다: /onetake/c?hero=1 (게임 저장소 drift 의 웹 빌드, 도전장 보기판과 같은 파일)을
   iframe 으로 띄우면 모범 테이크를 감독판 카메라로 끝없이 찍고, [직접 한 테이크]로 야드 SHOT 01~02 를 15초 몰면 내 편집본이 나온다.
   글자·버튼은 엔진 안에서 그린다(소리는 누른 화면 안에서만 켜지고 키보드도 그 안이 받아야 한다). 여기서 하는 일은 넷뿐:
     ① 첫 그림(포스터)을 바로 보여 주고, 페이지가 다 뜬 뒤 한가할 때 엔진을 부른다 → 엔진이 'live' 라고 알리면 크로스페이드
     ② 언어 바꿈을 엔진에 전달 ③ 히어로가 화면 밖이면 엔진을 멈춤(발열) ④ 모션 줄이기 · 데이터 절약 · 저사양 · 12초 안에 안 뜨면 예전 히어로(Take) */
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Take from './Take';
import { reduced } from './motion';

type Msg = { ot?: string; s?: string; scroll?: number; fling?: number };
const SRC = '/onetake/c?hero=1&scene=yard';

function lite() {
  if (reduced()) return true;
  const n = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (n.connection && n.connection.saveData) return true;
  if (typeof n.deviceMemory === 'number' && n.deviceMemory <= 2) return true;
  try {
    const c = document.createElement('canvas');
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) return true;
  } catch {
    return true;
  }
  return false;
}

export default function LiveHero() {
  const sec = useRef<HTMLElement | null>(null);
  const fr = useRef<HTMLIFrameElement | null>(null);
  const [mode, setMode] = useState<'live' | 'still'>('live');
  const [src, setSrc] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  /* ① 엔진 부르기 — 페이지가 다 뜨고 한가할 때 */
  useEffect(() => {
    if (lite()) { setMode('still'); return; }
    const lang = document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'ko';
    const go = () => setSrc(`${SRC}&lang=${lang}`);
    const ric = (window as Window & { requestIdleCallback?: (f: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
    const kick = () => (ric ? ric(go, { timeout: 1500 }) : setTimeout(go, 300));
    if (document.readyState === 'complete') kick();
    else window.addEventListener('load', kick, { once: true });
    return () => window.removeEventListener('load', kick);
  }, []);

  /* 엔진이 보내는 상태: live = 준비됨 · drive = 시승 시작(히어로를 화면에 꽉 차게) */
  useEffect(() => {
    if (!src) return;
    const t = setTimeout(() => { if (!ready) setMode('still'); }, 12000);
    const on = (e: MessageEvent<Msg>) => {
      if (e.origin !== location.origin || !e.data || e.data.ot !== 'hero') return;
      const d = e.data, html = document.documentElement;
      if (d.s === 'live') setReady(true);
      /* 시승 중엔 히어로를 화면에 꽉 차게 + 위 메뉴 바를 숨긴다(게임 HUD 를 덮는다) */
      if (d.s === 'drive' && sec.current) { html.classList.add('ot-driving'); window.scrollTo(0, sec.current.offsetTop); }
      if (d.s === 'live' || d.s === 'end' || d.s === 'cut') html.classList.remove('ot-driving');
      /* 엔진 위에서 끈 만큼 사이트를 스크롤 (iframe 이 터치·휠을 받아 버리므로 엔진이 넘겨 준다) */
      if (typeof d.scroll === 'number') window.scrollBy(0, d.scroll);
      if (typeof d.fling === 'number') window.scrollBy({ top: d.fling * 320, behavior: 'smooth' });
    };
    window.addEventListener('message', on);
    return () => { clearTimeout(t); window.removeEventListener('message', on); document.documentElement.classList.remove('ot-driving'); };
  }, [src, ready]);

  /* 시승 중 화면을 돌리거나 주소줄이 접히고 펴지면 히어로를 다시 화면 맨 위에 맞춘다 */
  useEffect(() => {
    const fit = () => { if (document.documentElement.classList.contains('ot-driving') && sec.current) window.scrollTo(0, sec.current.offsetTop); };
    const vv = window.visualViewport;
    window.addEventListener('resize', fit); window.addEventListener('orientationchange', fit); vv?.addEventListener('resize', fit);
    return () => { window.removeEventListener('resize', fit); window.removeEventListener('orientationchange', fit); vv?.removeEventListener('resize', fit); };
  }, []);

  /* ②·③ 언어 · 화면 밖 */
  useEffect(() => {
    if (!ready) return;
    const post = (m: Record<string, unknown>) => fr.current?.contentWindow?.postMessage({ ot: 'site', ...m }, location.origin);
    const html = document.documentElement;
    const mo = new MutationObserver(() => post({ lang: html.getAttribute('data-lang') === 'en' ? 'en' : 'ko' }));
    mo.observe(html, { attributes: true, attributeFilter: ['data-lang'] });
    const io = new IntersectionObserver(([en]) => post({ away: !en.isIntersecting }), { threshold: 0.05 });
    if (sec.current) io.observe(sec.current);
    const vis = () => post({ away: document.hidden });
    document.addEventListener('visibilitychange', vis);
    return () => { mo.disconnect(); io.disconnect(); document.removeEventListener('visibilitychange', vis); };
  }, [ready]);

  if (mode === 'still') return <Take />;
  return (
    <section className="ot-live" ref={sec} aria-label="ONE TAKE">
      <Image className="ot-live-poster" src="/onetake/hero/poster.webp" alt="" fill priority sizes="100vw" />
      <div className="ot-live-copy" aria-hidden={ready}>
        <div className="ot-eyebrow">SCENE 01 · THE YARD</div>
        <h1 className="ot-live-logo">ONE <span>TAKE</span></h1>
        <p>
          <span data-l="ko">차 한 대. 테이크 한 번. 컷 없이.</span>
          <span data-l="en">One car. One take. No cuts.</span>
        </p>
        <div className="ot-live-load">
          <i />
          <span data-l="ko">촬영장 준비 중</span>
          <span data-l="en">Setting up the shoot</span>
        </div>
      </div>
      {src && (
        <iframe
          ref={fr}
          className={ready ? 'ot-live-fr on' : 'ot-live-fr'}
          src={src}
          title="ONE TAKE — live"
          allow="autoplay; fullscreen; gyroscope; accelerometer"
          allowFullScreen
          loading="eager"
        />
      )}
    </section>
  );
}
