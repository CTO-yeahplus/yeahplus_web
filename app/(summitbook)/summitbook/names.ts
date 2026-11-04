/* 완등 수첩 — 이름은 가칭이다(APLUS/summitbook/docs/GDD.md §12). 바뀌면 여기 한 곳만 고친다.
   서버(layout · page 메타데이터)와 클라이언트(화면 · 캔버스 브랜드 줄) 둘 다 쓰므로 'use client' 를 붙이지 않는다. */
export const APP = { ko: '완등 수첩', en: 'Summit Book' } as const;
export const BASE = '/summitbook';
