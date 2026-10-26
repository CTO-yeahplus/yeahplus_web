/* 언어 저장 키 — 서버(layout 의 인라인 스크립트)와 클라이언트(i18n.tsx) 둘 다 쓴다.
   'use client' 파일에서 가져오면 서버 쪽에서는 값이 아니라 클라이언트 참조가 되어 undefined 로 찍힌다
   (getItem(undefined) — 저장한 언어가 새로고침 뒤 안 지켜졌다). 그래서 따로 둔다. */
export const STORAGE_KEY = 'onetake.site.lang';
