'use client';

// 한/영 토글. 본문은 두 언어를 모두 담고 CSS 로 한쪽만 보여주므로
// 여기서는 <html data-lang> 값만 바꾼다.
export type Lang = 'ko' | 'en';

export const STORAGE_KEY = 'steelrace.site.lang';

export const NAV = {
  ko: { home: '홈', how: '레이스', specs: '사양', support: '지원', privacy: '개인정보' },
  en: { home: 'Home', how: 'The race', specs: 'Specs', support: 'Support', privacy: 'Privacy' },
} as const;

/** 공개 문의 창구. cto@ 는 개인 주소라 문서에 싣지 않는다. */
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

/**
 * 한/영 전환. 언어 값은 <html data-lang> 하나에만 둔다 — 첫 값은 layout 의 인라인 스크립트가
 * 페인트 전에 세우고, 본문·푸터는 data-l 로 두 언어를 모두 담아 CSS 가 한쪽만 보여준다.
 * React 상태를 두지 않으므로 서버 HTML 과 어긋날 일도, 마운트 뒤 다시 그릴 일도 없다.
 */
export function toggleLang() {
  const el = document.documentElement;
  const next: Lang = el.getAttribute('data-lang') === 'en' ? 'ko' : 'en';
  el.setAttribute('data-lang', next);
  el.setAttribute('lang', next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {}
}
