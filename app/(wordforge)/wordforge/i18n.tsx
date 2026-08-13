'use client';

// 원본 site/src/i18n.js 이식 — 상수 + 한/영 UI 문자열 + 언어 컨텍스트.
import { createContext, useContext, useEffect, useState } from 'react';

export type Lang = 'ko' | 'en';

export const LANGS: { id: Lang; label: string }[] = [
  { id: 'ko', label: '한국어' },
  { id: 'en', label: 'English' },
];

export const NAV = {
  ko: { home: '홈', privacy: '개인정보 처리방침', terms: '이용약관', support: '지원' },
  en: { home: 'Home', privacy: 'Privacy', terms: 'Terms', support: 'Support' },
} as const;

export const UI = {
  ko: {
    tagline: '워드 로그라이크',
    updated: '최종 수정일',
    contact: '문의',
    home: '홈',
    backTop: '맨 위로',
    footer: '문의는 언제든 환영합니다.',
    yeahplus: 'yeahplus 홈',
  },
  en: {
    tagline: 'A Word Roguelike',
    updated: 'Last updated',
    contact: 'Contact',
    home: 'Home',
    backTop: 'Back to top',
    footer: 'Questions are always welcome.',
    yeahplus: 'yeahplus home',
  },
} as const;

export const EMAIL = 'contact@yeahplus.co.kr';
export const UPDATED = '2026-08-13';

/** 푸터 사업자 정보 — yeahplus 다른 제품 페이지와 동일한 표기. */
export const COMPANY = {
  name: '주식회사 예아플러스',
  nameEn: 'Yeahplus Inc.',
  short: 'YEAHPLUS',
  ceo: '고재혁',
  ceoEn: 'Jaehyuk Ko',
  biz: '283-88-02519',
  mailorder: '2022-경기파주-2995',
  mailorderEn: '2022-Gyeonggi Paju-2995',
  addr: '경기도 파주시 교하로159번길 33, 3층 304호 에이318(목동동, 목동프라자)',
  addrEn: '3F 304-A318, 33 Gyoha-ro 159beon-gil, Paju-si, Gyeonggi-do, Republic of Korea',
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void };
const I18nContext = createContext<Ctx>({ lang: 'ko', setLang: () => {} });

export function useLang() {
  return useContext(I18nContext);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // 서버 렌더와 첫 클라이언트 렌더를 'ko'로 맞춘 뒤, 마운트 후 저장값·브라우저 언어를 반영한다.
  const [lang, setLangState] = useState<Lang>('ko');

  useEffect(() => {
    let next: Lang | null = null;
    try {
      const saved = localStorage.getItem('wf_site_lang');
      if (saved === 'ko' || saved === 'en') next = saved;
    } catch {}
    if (!next) {
      const n = (navigator.language || 'ko').toLowerCase();
      next = n.startsWith('ko') ? 'ko' : 'en';
    }
    if (next !== 'ko') setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('wf_site_lang', l);
    } catch {}
  };

  return <I18nContext.Provider value={{ lang, setLang }}>{children}</I18nContext.Provider>;
}

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="wf-langs">
      {LANGS.map((l) => (
        <button key={l.id} type="button" className={lang === l.id ? 'on' : ''} onClick={() => setLang(l.id)}>
          {l.label}
        </button>
      ))}
    </div>
  );
}
