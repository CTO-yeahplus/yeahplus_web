'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useI18n } from './i18n';
import './story.css';

/* 휠/스크롤로 넘기는 "관제 한 판" 랜딩.
   그리기·스크롤 로직은 public/tower68/story.js (순수 JS, 캔버스) — 여기서는 마운트/해제와 언어만 연결한다.
   이전 랜딩(HomeContent.tsx)은 되돌리기용으로 그대로 둔다. */

type StoryHandle = { setLang: (lang: string) => void; destroy: () => void };
type StoryApi = { mount: (root: HTMLElement, lang: string) => StoryHandle };

declare global {
  interface Window {
    T68Story?: StoryApi;
  }
}

const SCRIPT_SRC = '/tower68/story.js?v=1';
// 이전 정적 배포(HashRouter) 주소 호환: /tower68/#/privacy → /tower68/privacy
const HASH_ROUTES = ['support', 'privacy', 'terms', 'contact'];

function loadScript(): Promise<StoryApi> {
  if (window.T68Story) return Promise.resolve(window.T68Story);
  return new Promise((resolve, reject) => {
    let el = document.querySelector<HTMLScriptElement>('script[data-t68-story]');
    if (!el) {
      el = document.createElement('script');
      el.src = SCRIPT_SRC;
      el.async = true;
      el.dataset.t68Story = '1';
      document.body.appendChild(el);
    }
    el.addEventListener('load', () => (window.T68Story ? resolve(window.T68Story) : reject(new Error('T68Story missing'))));
    el.addEventListener('error', () => reject(new Error('story.js failed to load')));
  });
}

export default function StoryContent() {
  const { lang } = useI18n();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<StoryHandle | null>(null);
  const langRef = useRef<string>(lang);

  useEffect(() => {
    const target = window.location.hash.replace(/^#\/?/, '').split(/[?#]/)[0];
    if (HASH_ROUTES.includes(target)) router.replace(`/tower68/${target}`);
  }, [router]);

  useEffect(() => {
    let cancelled = false;
    loadScript()
      .then((api) => {
        if (cancelled || !rootRef.current) return;
        handleRef.current = api.mount(rootRef.current, langRef.current);
      })
      .catch(() => {
        /* 스크립트를 못 불러오면 아래 noscript 대체 문구만 남는다 */
      });
    return () => {
      cancelled = true;
      handleRef.current?.destroy();
      handleRef.current = null;
    };
  }, []);

  useEffect(() => {
    langRef.current = lang;
    handleRef.current?.setLang(lang);
  }, [lang]);

  return (
    <div className="t68s">
      <div ref={rootRef} />
      <noscript>
        <p style={{ textAlign: 'center', padding: '80px 24px' }}>
          <a href="https://apps.apple.com/kr/app/tower-68/id6790672799">App Store — TOWER 68</a>
        </p>
      </noscript>
    </div>
  );
}
