'use client';

/* 회사 홈의 한·영 전환. 서버 렌더와 첫 렌더는 한국어로 맞추고,
   마운트 뒤에 저장된 선택이나 브라우저 언어를 반영한다(예전 키 yp_site_lang 을 그대로 쓴다). */
import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Lang = 'ko' | 'en';
type Ctx = { lang: Lang; toggle: () => void; L: <T>(ko: T, en: T) => T };

const C = createContext<Ctx | null>(null);
const KEY = 'yp_site_lang';

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');

  useEffect(() => {
    let next: Lang | null = null;
    try {
      const s = localStorage.getItem(KEY);
      if (s === 'ko' || s === 'en') next = s;
    } catch {}
    if (!next) next = (navigator.language || 'ko').toLowerCase().startsWith('ko') ? 'ko' : 'en';
    // 서버 렌더와 첫 화면을 한국어로 맞춘 뒤에만 바꿀 수 있어 effect 안에서 한 번 고친다(수화 불일치 방지).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (next !== 'ko') setLang(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(KEY, lang);
    } catch {}
  }, [lang]);

  const value: Ctx = {
    lang,
    toggle: () => setLang((l) => (l === 'ko' ? 'en' : 'ko')),
    L: (ko, en) => (lang === 'ko' ? ko : en),
  };
  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useLang() {
  const c = useContext(C);
  if (!c) throw new Error('useLang must be used inside LangProvider');
  return c;
}
