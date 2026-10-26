/* ONE TAKE 랜딩 — 글과 장면 목록. 샷 이름·설명은 앱(APLUS/drift/src/scenes/yard.js) 그대로, 영어는 이 페이지용 번역.
   장소 이름·한 줄도 앱의 META(이름 · en · sub) 그대로. 그림은 tools/web_assets.cjs 가 public/onetake 에 만든다. */

/** 야드 샷 9개 — 번호 순서. take.json 의 shots[].id 와 맞춘다 */
export const SHOTS: { ko: string; en: string; hintKo: string; hintEn: string }[] = [
  { ko: '셔터 출격', en: 'Shutter Launch', hintKo: '창고 문을 미끄러지며 빠져나간다', hintEn: 'Slide out through the warehouse door' },
  { ko: '컨테이너 협곡', en: 'Container Canyon', hintKo: '오른쪽 컨테이너 벽에 바짝 붙어 돈다', hintEn: 'Hug the container wall on the right' },
  { ko: '바늘구멍', en: 'The Needle', hintKo: '두 컨테이너 사이를 옆으로 꿰뚫는다', hintEn: 'Thread sideways between two containers' },
  { ko: '드럼 볼링', en: 'Drum Bowling', hintKo: '열 개를 한 번에', hintEn: 'All ten in one go' },
  { ko: '트레일러 점프', en: 'Trailer Jump', hintKo: '발판을 밟고 트레일러를 넘는다', hintEn: 'Hit the ramp, clear the trailer' },
  { ko: '크레인 도넛', en: 'Crane Donut', hintKo: '크레인 기둥을 감고 세 바퀴', hintEn: 'Three laps around the crane leg' },
  { ko: '창고 B 슬라럼', en: 'Warehouse B Slalom', hintKo: '기둥 사이를 좌우로 바꿔 가며', hintEn: 'Switch sides between the pillars' },
  { ko: '팔레트 벽', en: 'Pallet Wall', hintKo: '빠르게 들이받아 부순다', hintEn: 'Hit it fast, break it down' },
  { ko: '피날레', en: 'Finale', hintKo: '조명탑을 두 바퀴 감고 멈춘다 — 컷!', hintEn: 'Two laps around the light tower, then stop — cut!' },
];

/** 장소 7곳 — free: 장소 평생권 없이 열림 */
export const SCENES: { id: string; no: number; ko: string; en: string; subKo: string; subEn: string; free?: boolean }[] = [
  { id: 'yard', no: 1, ko: '야드', en: 'The Yard', subKo: '컨테이너 · 창고 · 크레인', subEn: 'Containers · warehouses · a crane', free: true },
  { id: 'dirt', no: 2, ko: '붉은 흙 놀이터', en: 'Red Dirt', subKo: '사암 · 모래 언덕 · 흙먼지', subEn: 'Sandstone · dunes · red dust', free: true },
  { id: 'hill', no: 3, ko: '언덕 도시', en: 'Hilltown', subKo: '가파른 언덕 · 교차로 점프 · 부두', subEn: 'Steep streets · crossing jumps · the pier' },
  { id: 'channel', no: 4, ko: '콘크리트 수로', en: 'Dry Channel', subKo: '비스듬한 벽 · 다리 밑 · 수로 탈출', subEn: 'Sloped walls · under the bridges · the way out' },
  { id: 'highway', no: 5, ko: '사막 국도', en: 'Open Road', subKo: '언덕 마루 · 철교 밑 열차 · 가드레일 굽이', subEn: 'Crests · a train overhead · guardrail bends' },
  { id: 'pass', no: 6, ko: '구름 위 고갯길', en: 'Cloud Pass', subKo: '구름 속 점프 · 헤어핀 · 정상', subEn: 'Jumps in the cloud · hairpins · the summit' },
  { id: 'channel_rain', no: 7, ko: '콘크리트 수로 — 폭우', en: 'Dry Channel — Storm', subKo: '젖은 바닥 · 물보라 · 빗속 벽 타기', subEn: 'Wet floor · spray · wall rides in the rain' },
];
