'use client';

/* 전설의 조선 사건부 — 언어 전환과 사이트 설정 한 곳.
   원본(GAME/APLUS/crimescene/site-react)과 같이 **두 언어를 함께 렌더하고 <html data-lang> 으로 한쪽만 보인다**
   (<L ko en /> 안쪽은 <span data-l> 두 개 — globals.css 가 다른 쪽을 숨긴다). 랜딩의 CSS 가 이 구조에 기대고 있어 그대로 옮겼다.
   처음엔 브라우저 언어를 따르고(layout.tsx 의 머리 스크립트가 그리기 전에 정한다), 고른 언어는 localStorage 에 남는다. */

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

export type Lang = 'ko' | 'en';
export type Pair = { ko: string; en: string };

export const STORAGE_KEY = 'cs_lang';
export const BASE = '/crimescene';

/** 공개 문의 창구 — 사이트 전체 기준(contact@) */
export const MAIL = 'contact@yeahplus.co.kr';
export const NAME: Pair = { ko: '전설의 조선 사건부', en: 'Legendary Joseon Casebook' };
export const COMPANY_KO = '주식회사 예아플러스';
export const COMPANY_EN = 'YeahPlus Co., Ltd.';

/** 전자상거래법 표시사항 — 값은 그대로, 라벨만 언어를 따른다 */
export const BIZ = {
  ceo: '고재혁',
  regNo: '283-88-02519',
  address: '경기도 파주시 교하로159번길 33, 3층 304호 에이318',
  addressEn: '304-A318, 3F, 33 Gyoha-ro 159beon-gil, Paju-si, Gyeonggi-do, Republic of Korea',
  mailOrder: '2022-경기파주-2995',
} as const;

export const EFFECTIVE: Pair = { ko: '2026년 10월 9일', en: 'October 9, 2026' };
/** 앱이 도는 가장 낮은 iOS (사건부 홈이 CSS 컨테이너 단위를 쓴다) */
export const MIN_IOS = '16.0';

/**
 * App Store — 출시 후 ASC 'App Apple ID'(숫자)를 넣는다. 비어 있으면 버튼이 '출시 준비 중'으로 바뀐다.
 * ⚠️ 국가 코드 없는 링크는 출시 직후 404 가 잦다 — 항상 kr/us 를 붙인다.
 */
export const APP_ID = '';
export const appStoreUrl = (lang: Lang) => (APP_ID ? `https://apps.apple.com/${lang === 'en' ? 'us' : 'kr'}/app/id${APP_ID}` : '');

/** 그림: public/crimescene/img/ (GAME/APLUS/crimescene 의 tools/site_shots.js 가 만든 것을 옮긴다) */
export const img = (n: string) => `${BASE}/img/${n}`;

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const LangContext = createContext<Ctx>({ lang: 'ko', setLang: () => {} });
export const useLang = () => useContext(LangContext);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ko');
  // 머리 스크립트가 이미 <html data-lang> 을 정해 두었다 — 그 값을 읽어 온다
  useEffect(() => {
    setLangState(document.documentElement.dataset.lang === 'en' ? 'en' : 'ko');
  }, []);
  const setLang = useCallback((l: Lang) => {
    const h = document.documentElement;
    h.dataset.lang = l;
    h.lang = l;
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* 저장 안 돼도 된다 */
    }
    setLangState(l);
  }, []);
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

/** 인라인 두 언어: <L ko="안녕" en="Hello" /> */
export function L({ ko, en }: { ko: React.ReactNode; en: React.ReactNode }) {
  return (
    <>
      <span data-l="ko">{ko}</span>
      <span data-l="en">{en}</span>
    </>
  );
}
/** 블록 두 언어: <LB as="p" className="…" ko={…} en={…} /> */
export function LB({ ko, en, as: Tag = 'div', className }: { ko: React.ReactNode; en: React.ReactNode; as?: 'div' | 'p' | 'blockquote'; className?: string }) {
  return (
    <>
      <Tag data-l="ko" className={className}>{ko}</Tag>
      <Tag data-l="en" className={className}>{en}</Tag>
    </>
  );
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
