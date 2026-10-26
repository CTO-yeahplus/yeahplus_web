'use client';

/* 3. 예고편 — App Store 미리보기 영상(한/영, 실제 게임 화면 + 게임 효과음 + 음악).
   화면에 들어오면 소리 없이 재생, 나가면 멈춘다. [소리 켜기]. 영상은 화면에 가까워질 때 받는다(preload none).
   언어를 바꾸면 같은 시각부터 다른 언어 영상으로. */
import { useEffect, useRef, useState } from 'react';
import { currentLang } from '../i18n';

export default function Trailer() {
  const box = useRef<HTMLDivElement | null>(null);
  const vid = useRef<HTMLVideoElement | null>(null);
  const [sound, setSound] = useState(false);

  useEffect(() => {
    const v = vid.current, el = box.current;
    if (!v || !el) return;
    let near = false, inView = false;
    const src = () => `/onetake/video/trailer_${currentLang()}.mp4`;
    const poster = () => `/onetake/video/trailer_${currentLang()}.webp`;
    v.poster = poster();
    const sync = () => {
      if (near && !v.getAttribute('src')) v.src = src();
      if (inView && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(
      (es) => {
        for (const e of es) {
          near = near || e.intersectionRatio > 0 || e.isIntersecting;
          inView = e.intersectionRatio >= 0.4;
        }
        sync();
      },
      { threshold: [0, 0.4], rootMargin: '400px 0px' },
    );
    io.observe(el);
    const onLang = () => {
      v.poster = poster();
      if (!v.getAttribute('src')) return;
      const at = v.currentTime, playing = !v.paused;
      v.src = src();
      v.addEventListener(
        'loadedmetadata',
        () => {
          v.currentTime = at;
          if (playing) v.play().catch(() => {});
        },
        { once: true },
      );
    };
    window.addEventListener('onetake:lang', onLang);
    return () => {
      io.disconnect();
      window.removeEventListener('onetake:lang', onLang);
    };
  }, []);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted) v.play().catch(() => {});
    setSound(!v.muted);
  };

  return (
    <div className="ot-trailer" ref={box}>
      <video ref={vid} muted loop playsInline preload="none" aria-label="ONE TAKE trailer" />
      <button className="ot-sound" type="button" aria-pressed={sound} onClick={toggle}>
        <span data-l="ko">{sound ? '소리 끄기' : '소리 켜기'}</span>
        <span data-l="en">{sound ? 'Sound off' : 'Sound on'}</span>
      </button>
    </div>
  );
}
