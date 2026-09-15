'use client';

// 원본 정적 사이트(sillok/site)의 한/영 토글을 React Context 로 이식.
//
// 원본은 본문 안에 두 언어를 모두 두고 `html[data-lang]` + `[data-l]` CSS 로
// 한쪽만 보여준다. 그 구조를 그대로 유지한다 — 법률 문서까지 손으로 옮겨
// 적지 않으려면 마크업을 건드리지 않는 편이 안전하다. 여기서는 `data-lang`
// 속성만 관리한다.
import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'ko' | 'en';

export const STORAGE_KEY = 'sillok.site.lang';

export const NAV = {
  ko: { home: '홈', why: '차별점', parents: '학부모 안내', support: '지원', privacy: '개인정보', terms: '약관' },
  en: { home: 'Home', why: 'Why', parents: 'For Parents', support: 'Support', privacy: 'Privacy', terms: 'Terms' },
} as const;

export const EMAIL = 'contact@yeahplus.co.kr';

/** 푸터 사업자 정보 — yeahplus 다른 제품 페이지와 같은 표기. */
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
  // 서버 렌더와 첫 클라이언트 렌더를 'ko' 로 맞춘 뒤 마운트 후 실제 값을 반영한다.
  // 깜빡임은 layout 의 인라인 스크립트가 먼저 data-lang 을 세워 막는다.
  const [lang, setLangState] = useState<Lang>('ko');

  useEffect(() => {
    const current = document.documentElement.getAttribute('data-lang');
    if (current === 'en') setLangState('en');
  }, []);

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute('data-lang', lang);
    el.setAttribute('lang', lang);
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}
