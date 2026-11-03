'use client';

// 한/영 토글 — 본문에 두 언어를 모두 두고 CSS 로 한쪽만 보여준다(원 테이크와 같은 방식).
export type Lang = 'ko' | 'en';

import { STORAGE_KEY } from './langkey';

export { STORAGE_KEY };

export const NAV = {
  ko: { home: '홈', play: '직접 세우기', hangar: '격납고', support: '지원', privacy: '개인정보' },
  en: { home: 'Home', play: 'Try it', hangar: 'Hangar', support: 'Support', privacy: 'Privacy' },
} as const;

/** 공개 문의 창구 */
export const EMAIL = 'contact@yeahplus.co.kr';

/** 푸터 사업자 정보 — yeahplus 다른 제품 페이지와 같은 표기 */
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

export function currentLang(): Lang {
  if (typeof document === 'undefined') return 'ko';
  return document.documentElement.getAttribute('data-lang') === 'en' ? 'en' : 'ko';
}

/** 한/영 전환 — 값은 <html data-lang> 하나에만. 언어에 따라 그림을 다시 그리는 곳은 'rocketparking:lang' 을 듣는다 */
export function toggleLang() {
  const el = document.documentElement;
  const next: Lang = el.getAttribute('data-lang') === 'en' ? 'ko' : 'en';
  el.setAttribute('data-lang', next);
  el.setAttribute('lang', next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {}
  window.dispatchEvent(new Event('rocketparking:lang'));
}
