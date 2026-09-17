'use client';

/* 원본 NEXTGEN_CINEMATIC/site/src/i18n.jsx 를 옮긴 것.
   원본처럼 L(ko, en) 로 문자열을 고르는 방식을 그대로 쓴다 — 본문에 두 언어를
   모두 심고 CSS 로 숨기는 다른 제품 페이지와 달리, 여기서는 리렌더로 바꾼다.
   문안이 한 군데에만 있어 법률 문서를 옮길 때 어긋날 여지가 적다. */

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'ko' | 'en';

export const STORAGE_KEY = 'cl_site_lang';

/** 공개 문의 창구. 원본은 cto@ 였지만 사이트의 다른 제품 문서와 같이 contact@ 로 통일한다. */
export const MAIL = 'contact@yeahplus.co.kr';
export const COMPANY = 'YeahPlus Co., Ltd.';

/** 전자상거래법 표시사항 — 값은 그대로, 라벨만 언어를 따른다 */
export const BIZ = {
  ceo: '고재혁',
  regNo: '283-88-02519',
  address: '경기도 파주시 교하로159번길 33, 3층 304호 에이318',
  mailOrder: '2022-경기파주-2995',
} as const;

/**
 * App Store — 출시 후 ASC 'App Apple ID'(숫자)를 넣는다.
 * 비어 있으면 버튼이 '출시 준비 중' 안내로 바뀐다.
 * ⚠️ 국가 코드 없는 링크는 출시 직후 404 가 잦다 — 항상 kr/us 를 붙인다.
 */
export const APP_ID = '';
export const appStoreUrl = (lang: Lang) =>
  APP_ID ? `https://apps.apple.com/${lang === 'en' ? 'us' : 'kr'}/app/id${APP_ID}` : '';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  /** L(한국어, 영어) — 문자열도 JSX 도 받는다. */
  L: <T,>(ko: T, en: T) => T;
};

const LangContext = createContext<Ctx>({ lang: 'ko', setLang: () => {}, L: (ko) => ko });

export function useLang() {
  return useContext(LangContext);
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  // 서버 렌더와 첫 클라이언트 렌더를 'ko' 로 맞춘 뒤 마운트 후 실제 값을 반영한다.
  // 이렇게 해야 하이드레이션 불일치가 나지 않는다.
  const [lang, setLangState] = useState<Lang>('ko');

  useEffect(() => {
    let next: Lang | null = null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ko' || saved === 'en') next = saved;
    } catch {
      /* 프라이빗 모드 등 — 무시 */
    }
    if (!next) next = (navigator.language || 'en').toLowerCase().startsWith('ko') ? 'ko' : 'en';
    if (next !== 'ko') setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang: (l: Lang) => {
        setLangState(l);
        try {
          localStorage.setItem(STORAGE_KEY, l);
        } catch {
          /* 무시 */
        }
      },
      L: <T,>(ko: T, en: T) => (lang === 'ko' ? ko : en),
    }),
    [lang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}
