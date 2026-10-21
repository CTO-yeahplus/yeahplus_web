/* 조선왕조실록 앱의 사건 데이터에서 뽑은 것 — 손으로 고치지 말고 앱 데이터(GAME/APLUS/sillok/src/events_*.js · kings.js)를 고친 뒤 다시 뽑는다.
   그림은 앱 1.1 의 사건 그림(src/scenes/<id>.webp)을 public/sillok/scenes/ 에 복사해 쓴다. */
export type Pair = { ko: string; en: string };
export type Scene = { id: string; year: number; order: number; king: Pair; title: Pair; source: string };
export const SCENES: Scene[] = [
 {
  "id": "taejo_gukho",
  "year": 1392,
  "order": 1,
  "king": {
   "ko": "태조",
   "en": "Taejo"
  },
  "title": {
   "ko": "새 나라의 이름을 정하시옵소서",
   "en": "Name the New Country"
  },
  "source": "태조실록, 태조 1년 11월"
 },
 {
  "id": "taejong_sinmungo",
  "year": 1401,
  "order": 3,
  "king": {
   "ko": "태종",
   "en": "Taejong"
  },
  "title": {
   "ko": "백성의 억울함을 어떻게 들을까",
   "en": "How Shall the King Hear the Wronged?"
  },
  "source": "태종실록, 태종 1년 8월 1일"
 },
 {
  "id": "sejong_jangyeongsil",
  "year": 1434,
  "order": 4,
  "king": {
   "ko": "세종",
   "en": "Sejong"
  },
  "title": {
   "ko": "노비 출신의 기술자",
   "en": "An Engineer Born a Slave"
  },
  "source": "세종실록, 세종 16년 7월 1일"
 },
 {
  "id": "sejong_hangul",
  "year": 1443,
  "order": 4,
  "king": {
   "ko": "세종",
   "en": "Sejong"
  },
  "title": {
   "ko": "백성을 위한 새 글자",
   "en": "New Letters for the People"
  },
  "source": "세종실록, 세종 25년 12월 30일"
 },
 {
  "id": "seongjong_daejeon",
  "year": 1485,
  "order": 9,
  "king": {
   "ko": "성종",
   "en": "Seongjong"
  },
  "title": {
   "ko": "법을 다시 고치지 않겠는가",
   "en": "Shall the Law Never Change Again?"
  },
  "source": "성종실록, 성종 16년 1월"
 },
 {
  "id": "seonjo_yisunsin",
  "year": 1591,
  "order": 14,
  "king": {
   "ko": "선조",
   "en": "Seonjo"
  },
  "title": {
   "ko": "이 사람을 수군절도사로",
   "en": "Raise This Man to Naval Commander?"
  },
  "source": "선조실록, 선조 24년 2월 13일"
 },
 {
  "id": "gwanghae_bogam",
  "year": 1610,
  "order": 15,
  "king": {
   "ko": "광해군",
   "en": "Gwanghaegun"
  },
  "title": {
   "ko": "백성이 볼 수 있는 의학책",
   "en": "A Medical Book for Everyone"
  },
  "source": "광해군일기, 광해군 2년 8월 6일"
 },
 {
  "id": "injo_namhan",
  "year": 1637,
  "order": 16,
  "king": {
   "ko": "인조",
   "en": "Injo"
  },
  "title": {
   "ko": "성문을 열 것인가",
   "en": "Shall the Gates Be Opened?"
  },
  "source": "인조실록, 인조 15년 1월 30일"
 },
 {
  "id": "hyojong_hamel",
  "year": 1653,
  "order": 17,
  "king": {
   "ko": "효종",
   "en": "Hyojong"
  },
  "title": {
   "ko": "바다에서 온 낯선 사람들",
   "en": "Strangers from the Sea"
  },
  "source": "효종실록, 효종 4년 8월"
 },
 {
  "id": "yeongjo_gyunyeok",
  "year": 1750,
  "order": 21,
  "king": {
   "ko": "영조",
   "en": "Yeongjo"
  },
  "title": {
   "ko": "군포를 반으로 줄일까요",
   "en": "Shall the Cloth Tax Be Halved?"
  },
  "source": "영조실록, 영조 26년 5월 19일"
 },
 {
  "id": "jeongjo_gyujanggak",
  "year": 1776,
  "order": 22,
  "king": {
   "ko": "정조",
   "en": "Jeongjo"
  },
  "title": {
   "ko": "책을 모으는 집을 지어라",
   "en": "A House to Gather Books"
  },
  "source": "정조실록, 정조 즉위년 9월 25일"
 },
 {
  "id": "jeongjo_hwaseong",
  "year": 1794,
  "order": 22,
  "king": {
   "ko": "정조",
   "en": "Jeongjo"
  },
  "title": {
   "ko": "성을 쌓을 새 기계",
   "en": "New Machines to Raise a Fortress"
  },
  "source": "정조실록, 정조 18년 1월"
 },
 {
  "id": "sunjo_honggyeongnae",
  "year": 1811,
  "order": 23,
  "king": {
   "ko": "순조",
   "en": "Sunjo"
  },
  "title": {
   "ko": "평안도에서 온 급한 글",
   "en": "Urgent Word from Pyeongan"
  },
  "source": "순조실록, 순조 11년 12월 22일"
 },
 {
  "id": "gojong_daehanjeguk",
  "year": 1897,
  "order": 26,
  "king": {
   "ko": "고종",
   "en": "Gojong"
  },
  "title": {
   "ko": "황제의 나라를 여시렵니까",
   "en": "Shall You Found an Empire?"
  },
  "source": "고종실록, 고종 34년 10월 12일"
 },
 {
  "id": "sunjong_girok",
  "year": 1910,
  "order": 27,
  "king": {
   "ko": "순종",
   "en": "Sunjong"
  },
  "title": {
   "ko": "무엇이 남을 것인가",
   "en": "What Will Remain"
  },
  "source": "조선왕조실록 사고본 서울 이관 기록, 1910년"
 }
];
export const DEMO = {
 "id": "taejo_gukho",
 "year": 1392,
 "king": {
  "ko": "태조",
  "en": "Taejo"
 },
 "title": {
  "ko": "새 나라의 이름을 정하시옵소서",
  "en": "Name the New Country"
 },
 "body": {
  "ko": "고려가 문을 닫고 새 나라가 열렸습니다. 그런데 아직 나라 이름이 없습니다. 신하들이 두 가지를 적어 올렸습니다. 하나는 옛 고조선을 잇는다는 뜻의 '조선', 다른 하나는 전하께서 태어나신 고장의 이름 '화령'입니다.",
  "en": "Goryeo has closed its doors and a new country has opened. But it still has no name. Your officials submit two: 'Joseon,' meaning the heir of ancient Gojoseon, and 'Hwaryeong,' the name of your birthplace."
 },
 "choices": [
  {
   "text": {
    "ko": "조선 — 옛 나라를 잇는 이름으로 하라",
    "en": "Joseon — the name that inherits the ancient country"
   },
   "delta": {
    "people": 6,
    "culture": 8
   },
   "result": {
    "ko": "백성들은 아주 오래된 나라의 이름이 돌아왔다며 반겼습니다. 새 나라가 뿌리 없는 나라가 아님을 온 백성이 알게 되었습니다.",
    "en": "The people welcomed the return of a very old name. Everyone now knew the new country was not without roots."
   },
   "historical": true
  },
  {
   "text": {
    "ko": "화령 — 내가 태어난 고장의 이름으로 하라",
    "en": "Hwaryeong — the name of my birthplace"
   },
   "delta": {
    "people": -4,
    "defense": 5,
    "treasury": 2
   },
   "result": {
    "ko": "북쪽 고향 사람들은 크게 기뻐했지만, 남쪽 백성들은 왕의 집안만 높이는 이름이라며 서운해했습니다.",
    "en": "Northerners rejoiced, but southerners felt slighted, saying the name honored only the king's own family."
   },
   "historical": false
  }
 ],
 "sillok": {
  "ko": "태조는 두 이름을 명나라에 함께 보내 물었고, 돌아온 답은 '조선'이었습니다. 1393년, 새 나라의 이름은 조선으로 정해졌습니다. 2천 년 전 고조선의 이름을 다시 쓴 것입니다.",
  "en": "Taejo sent both names to Ming and asked; the answer came back 'Joseon.' In 1393 the new country was named Joseon, reviving a name from two thousand years earlier."
 },
 "source": "태조실록, 태조 1년 11월"
} as const;
export const START = { people: 50, treasury: 45, defense: 55, culture: 40 } as const;   // 앱의 태조 즉위 화면 그대로
