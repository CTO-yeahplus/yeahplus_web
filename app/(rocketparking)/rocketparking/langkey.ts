/* 언어 저장 키 — 서버(layout 의 인라인 스크립트)와 클라이언트(i18n.tsx) 둘 다 쓴다.
   'use client' 파일에서 가져오면 서버 쪽에서는 undefined 가 되므로 따로 둔다(원 테이크에서 겪은 것). */
export const STORAGE_KEY = 'rocketparking.site.lang';
