'use client';

// 원본 정적 사이트의 한/영 토글을 React Context 로 이식.
import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'ko' | 'en';

export const NAV = {
  ko: { home: '홈', features: '특징', support: '지원', privacy: '개인정보', terms: '이용약관' },
  en: { home: 'Home', features: 'Features', support: 'Support', privacy: 'Privacy', terms: 'Terms' },
} as const;

export const EMAIL = 'contact@yeahplus.co.kr';
export const UPDATED = '2026-08-15';

/** 푸터 사업자 정보 — yeahplus 다른 제품 페이지와 동일한 표기. */
export const COMPANY = {
  name: '주식회사 예아플러스',
  nameEn: 'YeahPlus Co., Ltd.',
  ceo: '고재혁',
  ceoEn: 'Jaehyuk Ko',
  biz: '283-88-02519',
  mailorder: '2022-경기파주-2995',
  mailorderEn: '2022-Gyeonggi Paju-2995',
  addr: '경기도 파주시 교하로159번길 33, 3층 304호 에이318(목동동, 목동프라자)',
  addrEn: '3F 304-A318, 33 Gyoha-ro 159beon-gil, Paju-si, Gyeonggi-do, Republic of Korea',
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: 'ko', setLang: () => {} });

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  // 서버 렌더와 첫 클라이언트 렌더를 'ko'로 맞춘 뒤, 마운트 후 저장값·브라우저 언어를 반영한다.
  const [lang, setLangState] = useState<Lang>('ko');

  useEffect(() => {
    let next: Lang | null = null;
    try {
      const saved = localStorage.getItem('jf_site_lang');
      if (saved === 'ko' || saved === 'en') next = saved;
    } catch {}
    if (!next) next = (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
    if (next !== 'ko') setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('jf_site_lang', l);
    } catch {}
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
