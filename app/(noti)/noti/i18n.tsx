'use client';

/* 노티 — 언어 전환. 성어서당 · CineLook 과 같은 방식(L(ko, en) 로 고르고 리렌더)이다.
   서버 렌더와 첫 클라이언트 렌더는 한국어이고, 마운트 뒤 저장된 값이나 브라우저 언어를 따른다. */

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'ko' | 'en';

export const STORAGE_KEY = 'nt_site_lang';
export const BASE = '/noti';

/** 공개 문의 창구 — 사이트 전체 기준(contact@) */
export const MAIL = 'contact@yeahplus.co.kr';
export const COMPANY_KO = '주식회사 예아플러스';
export const COMPANY_EN = 'YeahPlus Co., Ltd.';

/** 전자상거래법 표시사항 — 값은 그대로, 라벨만 언어를 따른다 */
export const BIZ = {
  ceo: '고재혁',
  regNo: '283-88-02519',
  address: '경기도 파주시 교하로159번길 33, 3층 304호 에이318',
  mailOrder: '2022-경기파주-2995',
} as const;

export const EFFECTIVE = '2026-10-09';

/**
 * App Store — 출시 후 ASC 'App Apple ID'(숫자)를 넣는다. 비어 있으면 버튼이 '출시 준비 중'으로 바뀐다.
 * ⚠️ 국가 코드 없는 링크는 출시 직후 404 가 잦다 — 항상 kr/us 를 붙인다.
 */
export const APP_ID = '';
export const appStoreUrl = (lang: Lang) =>
  APP_ID ? `https://apps.apple.com/${lang === 'en' ? 'us' : 'kr'}/app/id${APP_ID}` : '';
/** Google Play — 출시 후 주소를 넣는다 */
export const PLAY_URL = '';
/** 웹 체험판(1화) — public/noti/demo/index.html. GAME/APLUS/noti 의 build.py 가 만든 것을 tools/sync_site.sh 로 옮긴다 */
export const DEMO_URL = `${BASE}/demo/index.html`;

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
  const [lang, setLangState] = useState<Lang>('ko');

  useEffect(() => {
    let next: Lang | null = null;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'ko' || saved === 'en') next = saved;
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

/** 인라인 두 언어: <Tx ko="안녕" en="Hello" /> */
export function Tx({ ko, en }: { ko: React.ReactNode; en: React.ReactNode }) {
  const { L } = useLang();
  return <>{L(ko, en)}</>;
}
/** 블록 두 언어: <Tb as="p" className="…" ko={…} en={…} /> */
export function Tb({ ko, en, as: Tag = 'div', className }: { ko: React.ReactNode; en: React.ReactNode; as?: 'div' | 'p' | 'blockquote'; className?: string }) {
  const { L } = useLang();
  return <Tag className={className}>{L(ko, en)}</Tag>;
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
