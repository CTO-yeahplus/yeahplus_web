/**
 * 예아플러스 제품 목록 — 회사 홈의 숫자(제품 수·출시 수)도 여기서 센다.
 * status: 'live' 는 App Store 나 웹에서 지금 쓸 수 있는 것, 'soon' 은 출시 준비 중.
 * 앱이 스토어에 오르면 그 줄의 status 만 'live' 로 바꾸면 홈의 숫자와 배지가 함께 바뀐다.
 * icon 이 없는 제품은 accent 색 타일에 mark 글자를 세운다.
 */

export type Category = 'image' | 'learn' | 'game' | 'daily';

export type Product = {
  id: string;
  cat: Category;
  ko: string;
  en: string;
  descKo: string;
  descEn: string;
  href: string;
  status: 'live' | 'soon';
  icon?: string;
  mark?: string;
  accent: string;
  /** 유료 앱의 공통 약속(광고·수집·구독 없음)을 제품 페이지에 적어 둔 앱 */
  promise?: boolean;
};

const I = (f: string) => `/site/icons/${f}.webp`;

export const PRODUCTS: Product[] = [
  // ── 사진과 이미지 ──
  {
    id: 'cinelook', cat: 'image', ko: 'CineLook', en: 'CineLook', href: '/cinelook', status: 'soon',
    icon: I('cinelook'), accent: '#b8893c', promise: true,
    descKo: '주머니 속 네컷 사진관. 셔터 한 번에 네 컷, 영화 필터와 프레임까지.',
    descEn: 'A photo booth in your pocket: four shots from one tap, with movie looks and frames.',
  },
  {
    id: '24stills', cat: 'image', ko: '24STILLS', en: '24STILLS', href: '/24stills', status: 'live',
    icon: I('24stills'), accent: '#c99a2e',
    descKo: '한 달 24컷, 사흘의 기다림. 디지털 시대의 아날로그 필름.',
    descEn: '24 frames a month and a three-day wait. Analog film for a digital age.',
  },
  {
    id: 'myohae', cat: 'image', ko: '묘해', en: 'MYOHAE', href: '/meow', status: 'live',
    icon: I('myohae'), accent: '#8a63e8',
    descKo: '집에서 찍은 우리 고양이가 AI 아트 작품이 됩니다.',
    descEn: 'The cat you photographed at home, turned into art by AI.',
  },
  {
    id: 'munghae', cat: 'image', ko: '멍해', en: 'MUNGHAE', href: '/munghae', status: 'soon',
    icon: I('munghae'), accent: '#c99a4a',
    descKo: '별이 된 아이들을 기억하는 공간. 반려동물을 위한 디지털 추모공원.',
    descEn: 'A place to remember pets who have passed. A digital memorial park.',
  },

  // ── 배움과 고전 ──
  {
    id: 'seodang', cat: 'learn', ko: '성어서당', en: 'Seodang', href: '/seodang', status: 'soon',
    icon: I('seodang'), accent: '#c0472f', promise: true,
    descKo: '이야기로 익히는 사자성어. 삽화 속으로 들어가 고르고, 듣고, 손으로 씁니다.',
    descEn: 'Four-character idioms learned through stories: step into the picture, choose, listen, then write.',
  },
  {
    id: 'hyunja', cat: 'learn', ko: '현자의 서재', en: 'The Sages’ Study', href: '/hyunja', status: 'soon',
    icon: I('hyunja'), accent: '#9e2b22', promise: true,
    descKo: '고민 하나에 공자·맹자·순자·노자의 답. 따라 쓰고 한 줄을 남겨 내 어록을 만듭니다.',
    descEn: 'One worry, four answers from Confucius, Mencius, Xunzi and Laozi. Trace them and keep your own book.',
  },
  {
    id: 'sillok', cat: 'learn', ko: '조선왕조실록', en: 'Joseon Annals', href: '/sillok', status: 'live',
    icon: I('sillok'), accent: '#b8382d', promise: true,
    descKo: '조선 27명의 왕이 되어 실록에 기록된 사건을 직접 결정합니다.',
    descEn: 'Rule as each of Joseon’s 27 kings and decide the events the annals recorded.',
  },
  {
    id: 'contraptionlab', cat: 'learn', ko: '뚝딱 실험실', en: 'Contraption Lab', href: '/contraptionlab', status: 'soon',
    icon: I('contraptionlab'), accent: '#bf5a13', promise: true,
    descKo: '부품을 놓고 돌려 구슬을 바구니까지. 결과는 진짜 물리가 판정합니다.',
    descEn: 'Place and turn parts to roll the marble home. Real physics decides.',
  },
  {
    id: 'arke', cat: 'learn', ko: 'ARKE', en: 'ARKE', href: '/arke', status: 'live',
    icon: I('arke'), accent: '#b68235',
    descKo: '오늘 무엇을 풀지 정해 주는 고2 수능 코치. 수학과 영어.',
    descEn: 'A Korean SAT coach for 11th graders that decides what to study today. Math and English.',
  },
  {
    id: 'neurovoca', cat: 'learn', ko: '뇌새김', en: 'NeuroVoca', href: 'https://neurovoca.co.kr', status: 'live',
    mark: '腦', accent: '#4f46e5',
    descKo: '잊기 직전에 다시 꺼내 주는 영어 단어 암기 엔진.',
    descEn: 'An English vocabulary engine that brings each word back just before you forget it.',
  },

  // ── 게임 ──
  {
    id: 'mineforge', cat: 'game', ko: 'MINEFORGE', en: 'MINEFORGE', href: '/mineforge', status: 'live',
    icon: I('mineforge'), accent: '#d79a3a', promise: true,
    descKo: '옆칸을 이어 파면 광맥이 자라는 지뢰찾기 로그라이크.',
    descEn: 'Minesweeper where chaining neighbouring digs grows a scoring seam.',
  },
  {
    id: 'steelstorm', cat: 'game', ko: '스틸스톰 아레나', en: 'SteelStorm Arena', href: '/steelstorm', status: 'live',
    icon: I('steelstorm'), accent: '#1aa6c4', promise: true,
    descKo: '조준은 기체가, 판단은 당신이. 코어 컬러와 3단 변신의 아레나 슈터.',
    descEn: 'The machine aims; you decide. An arena shooter of core colours and three-stage Overdrive.',
  },
  {
    id: 'tower68', cat: 'game', ko: 'TOWER 68', en: 'TOWER 68', href: '/tower68', status: 'live',
    icon: I('tower68'), accent: '#e0aa20',
    descKo: 'JFK 관제탑 31년, 한 시간에 68대. 손끝으로 하늘의 질서를.',
    descEn: 'Thirty-one years in the JFK tower, 68 landings an hour. Keep the sky in order.',
  },
  {
    id: 'pipforge', cat: 'game', ko: 'PIPFORGE', en: 'PIPFORGE', href: '/pipforge', status: 'soon',
    icon: I('pipforge'), accent: '#d58a2a', promise: true,
    descKo: '주사위 눈을 직접 세공해 배율을 쌓는 주사위 로그라이크.',
    descEn: 'Chisel your own dice and stack multipliers. A dice roguelike.',
  },
  {
    id: 'wordforge', cat: 'game', ko: 'WORDFORGE', en: 'WORDFORGE', href: '/wordforge', status: 'soon',
    icon: I('wordforge'), accent: '#d9a440',
    descKo: '자모를 이어 낱말을 만들고 점수를 터뜨리는 워드 로그라이크.',
    descEn: 'Chain letters into words and set off the score. A word roguelike.',
  },
  {
    id: 'aceforge', cat: 'game', ko: 'ACEFORGE', en: 'ACEFORGE', href: '/aceforge', status: 'soon',
    mark: 'A♠', accent: '#c4842a',
    descKo: '체인이 길수록 배율이 터지는 트라이픽스 솔리테어 로그라이크.',
    descEn: 'TriPeaks solitaire where longer chains detonate bigger multipliers.',
  },
  {
    id: 'jadeforge', cat: 'game', ko: 'JADEFORGE', en: 'JADEFORGE', href: '/jadeforge', status: 'soon',
    mark: '玉', accent: '#2f9a6a',
    descKo: '같은 문양을 이으면 맥이 자라는 마작 솔리테어 로그라이크.',
    descEn: 'Mahjong solitaire where matching a suit grows your vein.',
  },

  // ── 일상 ──
  {
    id: 'aura', cat: 'daily', ko: 'AURA', en: 'AURA', href: 'https://auraootd.com', status: 'live',
    icon: I('aura'), accent: '#d9779a',
    descKo: '오늘의 룩을 발견하고 바로 따라 사는 패션·뷰티 커뮤니티.',
    descEn: 'Discover today’s look and shop it right away.',
  },
  {
    id: 'woldeok', cat: 'daily', ko: '월덕', en: 'WOLDEOK', href: 'https://woldeok.app', status: 'live',
    icon: I('woldeok'), accent: '#c9a043',
    descKo: '생년월일로 사주 원국과 오늘의 흐름을 읽어 주는 운세.',
    descEn: 'Enter your birth date to read your saju chart and today’s flow.',
  },
  {
    id: 'faceroutine', cat: 'daily', ko: 'FaceRoutine', en: 'FaceRoutine', href: 'https://faceroutine.app', status: 'live',
    mark: 'F', accent: '#2f9e8a',
    descKo: '하루 5분, 카메라가 세어 주는 얼굴 근육 코치. 영상은 기기 안에서만 처리합니다.',
    descEn: 'Five minutes a day; the camera counts your facial reps, processed on the device.',
  },
];

export const CATS: { id: Category; ko: string; en: string; leadKo: string; leadEn: string; color: string }[] = [
  { id: 'image', ko: '사진과 이미지', en: 'Photo & Image', color: '#c9772f',
    leadKo: '카메라와 색, 빛을 다루는 앱.', leadEn: 'Apps that work with cameras, colour and light.' },
  { id: 'learn', ko: '배움과 고전', en: 'Learning & Classics', color: '#2f8a62',
    leadKo: '아이와 어른이 함께 보는, 근거 있는 배움.', leadEn: 'Learning for children and adults, built on real sources.' },
  { id: 'game', ko: '게임', en: 'Games', color: '#5b4fc4',
    leadKo: '짧게 하고 오래 남는 게임.', leadEn: 'Short sessions that stay with you.' },
  { id: 'daily', ko: '일상', en: 'Everyday', color: '#c2477a',
    leadKo: '하루의 작은 선택을 돕는 서비스.', leadEn: 'Services for the small choices of the day.' },
];

export const COUNT = {
  all: PRODUCTS.length,
  live: PRODUCTS.filter((p) => p.status === 'live').length,
  soon: PRODUCTS.filter((p) => p.status === 'soon').length,
  promise: PRODUCTS.filter((p) => p.promise).length,
  cats: CATS.length,
};
