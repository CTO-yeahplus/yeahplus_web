'use client';

/* 수상한 명언 — 언어 전환. hyunja·seodang 과 같은 방식(L(ko, en) 로 고르고 리렌더).
   앱 용어(감정·서고·비망록·변조 / Appraise·Library·My Book·Twisted)는 앱 template.html 의 문자열을 따랐다. */

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'ko' | 'en';

export const STORAGE_KEY = 'dl_site_lang';

/** 공개 문의 창구 — 앱의 '오류 제보'·'감정 의뢰' 메일도 이 주소로 간다. */
export const MAIL = 'contact@yeahplus.co.kr';
export const COMPANY_KO = '주식회사 예아플러스';
export const COMPANY_EN = 'YeahPlus Co., Ltd.';
/** 앱 이름 */
export const APP_KO = '수상한 명언';
export const APP_EN = 'Fishy Quotes';

/** 전자상거래법 표시사항 — 값은 hyunja·seodang 과 같다. 라벨만 언어를 따른다 */
export const BIZ = {
  ceo: '고재혁',
  regNo: '283-88-02519',
  address: '경기도 파주시 교하로159번길 33, 3층 304호 에이318',
  mailOrder: '2022-경기파주-2995',
} as const;

/**
 * App Store — 출시 후 ASC 'App Apple ID'(숫자)를 넣는다.
 * 비어 있으면 버튼이 '곧 출시' 안내로 바뀐다(링크 없음).
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
    // 앱이 여는 주소(수사본부 제보·게시판)는 ?l=ko|en 으로 앱의 언어를 넘긴다 — 저장된 선택보다 앞선다.
    const fromUrl = new URLSearchParams(window.location.search).get('l');
    if (fromUrl === 'ko' || fromUrl === 'en') next = fromUrl;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!next && (saved === 'ko' || saved === 'en')) next = saved;
    } catch {
      /* 프라이빗 모드 등 — 무시 */
    }
    if (!next) next = (navigator.language || 'ko').toLowerCase().startsWith('ko') ? 'ko' : 'en';
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

/**
 * 제목 — 서버 렌더는 한국어, 영어 사용자는 마운트 후 바꾼다.
 * Next 메타데이터가 하이드레이션 뒤 <title> 을 한 번 더 그리므로 <head> 를 지켜본다.
 */
export function useDocTitle(ko: string, en: string) {
  const { lang } = useLang();
  useEffect(() => {
    const want = lang === 'ko' ? ko : en;
    const apply = () => {
      if (document.title !== want) document.title = want;
    };
    apply();
    const mo = new MutationObserver(apply);
    mo.observe(document.head, { subtree: true, childList: true, characterData: true });
    return () => mo.disconnect();
  }, [lang, ko, en]);
}
