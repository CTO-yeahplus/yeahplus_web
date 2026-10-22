// 서버·클라이언트 양쪽에서 쓰는 값. 'use client' 파일(i18n.tsx)에 두면 서버 컴포넌트가
// 문자열 대신 클라이언트 참조를 받으므로 따로 둔다.
export const STORAGE_KEY = 'keepsake.site.lang';

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
