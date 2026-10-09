/** 클래스 이름에 cs- 를 붙인다: c('voice right') → 'cs-voice cs-right'. globals.css 의 모든 클래스가 cs- 로 시작한다. */
export const c = (s: string) => s.split(/\s+/).filter(Boolean).map((x) => 'cs-' + x).join(' ');
