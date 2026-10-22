'use client';

// 한/영 토글. 본문은 두 언어를 모두 담고 CSS 로 한쪽만 보여주므로 <html data-lang> 값만 바꾼다.
import { STORAGE_KEY } from './site';

export type Lang = 'ko' | 'en';

export function toggleLang() {
  const el = document.documentElement;
  const next: Lang = el.getAttribute('data-lang') === 'en' ? 'ko' : 'en';
  el.setAttribute('data-lang', next);
  el.setAttribute('lang', next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {}
}
