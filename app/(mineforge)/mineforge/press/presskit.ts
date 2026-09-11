/* ─────────────────────────────────────────────────────────────
   프레스킷 원문.

   영문은 mineforge/site/press/mineforge-presskit.zip 안의 FACTSHEET.md 를
   **그대로** 옮긴 것이다. 기자가 이 페이지에서 복사해 기사에 쓰는 문장이므로
   임의로 다듬지 않는다 — 고칠 일이 생기면 FACTSHEET.md 를 먼저 고치고
   여기를 맞춘다. 한국어는 국내 매체용 번역본.
   ───────────────────────────────────────────────────────────── */

export const APP_STORE_URL = 'https://apps.apple.com/kr/app/id6802883164';
export const ZIP_URL = '/mineforge/press/mineforge-presskit.zip';
export const ZIP_SIZE = '11.8 MB';
export const ICON_URL = '/mineforge/press/icon-1024.png';
export const CONTACT = 'cto@yeahplus.co.kr';

/** 스크린샷 — 언어별 5장. zip 안에는 1290×2796 PNG 원본이 들어 있다. */
export const SHOTS = ['01', '02', '03', '04', '05'] as const;

type Row = readonly [string, string];

export const FACTS: { ko: Row[]; en: Row[] } = {
  en: [
    ['Developer', 'YeahPlus Co., Ltd. — solo developer, Seoul, Korea'],
    ['Contact', CONTACT],
    ['Release', 'August 2026, worldwide'],
    ['Platform', 'iPhone, iOS 15.0 or later · 10.9 MB'],
    ['Price', '$2.99 (launch price) · no ads · no in-app purchases · no subscription'],
    ['Languages', 'English, Korean'],
    ['Genre', 'Puzzle / Roguelike deckbuilder'],
    ['Age rating', '4+'],
    ['Privacy', 'Data Not Collected — the app makes no network calls of any kind'],
  ],
  ko: [
    ['개발', '주식회사 예아플러스 — 1인 개발, 서울'],
    ['문의', CONTACT],
    ['출시', '2026년 8월, 전 세계'],
    ['플랫폼', 'iPhone, iOS 15.0 이상 · 10.9 MB'],
    ['가격', '$2.99 (출시 가격) · 광고 없음 · 인앱결제 없음 · 구독 없음'],
    ['언어', '영어, 한국어'],
    ['장르', '퍼즐 / 로그라이크 덱빌더'],
    ['연령 등급', '4+'],
    ['개인정보', '데이터를 수집하지 않음 — 앱이 어떤 네트워크 통신도 하지 않습니다'],
  ],
};

export const ONE_LINE = {
  en: 'Minesweeper deduction, rebuilt as a roguelike run where your deck is buried in the level.',
  ko: '지뢰찾기의 추리를 그대로 두고, 당신의 덱이 판 속에 묻혀 있는 로그라이크로 다시 지었습니다.',
};

export const ONE_PARAGRAPH = {
  en:
    'Mineforge keeps classic minesweeper deduction intact and builds a run around it. Every dig ' +
    'scores, and a dig adjacent to your previous one raises a seam multiplier that resets the moment ' +
    'you break the chain — so the decision stops being "which tile is safe" and becomes "is this safe ' +
    'tile worth my chain". Mines break pit props instead of ending the game, leaving craters that ' +
    'recalculate the numbers around them. Between rounds you buy charms and load ore into a satchel, ' +
    'and that ore is then salted into your next board as treasure, glinting under the dirt. Eight ' +
    'chapters, a boss every third round that rewrites one rule, then Endless.',
  ko:
    '마인포지는 고전 지뢰찾기의 추리를 그대로 두고 그 위에 한 판의 여정을 얹습니다. 모든 발굴이 ' +
    '점수가 되고, 직전에 판 칸 옆을 이어 파면 광맥 배율이 오르며, 연결이 끊기는 순간 배율은 0으로 ' +
    '돌아갑니다. 그래서 판단이 "어느 칸이 안전한가"에서 "이 안전한 칸이 내 광맥을 끊을 만한 가치가 ' +
    '있는가"로 바뀝니다. 지뢰는 게임을 끝내는 대신 버팀목을 부수고, 그 자리에 남은 웅덩이가 주변 ' +
    '숫자를 다시 계산하게 만듭니다. 라운드 사이에는 참을 사고 배낭에 광석을 채우는데, 그 광석은 다음 ' +
    '판에 보물로 매설되어 흙 아래에서 반짝입니다. 8개 챕터, 세 라운드마다 규칙 하나를 다시 쓰는 보스, ' +
    '그리고 엔드리스.',
};

export const FEATURES: { ko: Row[]; en: Row[] } = {
  en: [
    ['Seam scoring', 'chained digs raise a multiplier; disconnected digs reset it to zero'],
    ['Pit props', 'mines break a prop and leave a crater; surrounding numbers recalculate'],
    ['Guaranteed safe first dig', 'on every board'],
    [
      'Solver-based canary',
      'hints only tiles that are provably safe; its silence means the board truly requires a guess',
    ],
    ['Ore as deck', '7 stone types buried into your next board as visible treasure'],
    ['45 charms', '16 unlocked through play'],
    ['8 bosses', 'each bending one rule for a whole round'],
    [
      '6 quarry layouts',
      '5 starting satchels, 3 difficulties, permanent upgrades between runs',
    ],
    ['Daily and weekly seeded boards', 'everyone digs the same minefield'],
    ['Game Center', '3 leaderboards, 15 achievements (entirely optional)'],
    ['4 visual themes', 'with per-theme music'],
  ],
  ko: [
    ['광맥 스코어링', '이어 판 칸이 배율을 올리고, 끊기면 0으로 돌아갑니다'],
    ['버팀목', '지뢰는 버팀목을 부수고 웅덩이를 남기며, 주변 숫자가 다시 계산됩니다'],
    ['첫 발굴은 언제나 안전', '모든 보드에서 보장됩니다'],
    [
      '솔버 기반 카나리아',
      '논리적으로 안전이 증명된 칸만 알려줍니다. 침묵한다면 그 판은 정말로 찍어야 하는 순간입니다',
    ],
    ['덱이 되는 광석', '7종의 광석이 다음 판에 보이는 보물로 매설됩니다'],
    ['참 45종', '그중 16종은 플레이로 해금됩니다'],
    ['보스 8인', '각자 한 라운드 동안 규칙 하나를 비틉니다'],
    ['채석장 배치 6종', '시작 배낭 5종, 난이도 3단계, 판과 판 사이의 영구 강화'],
    ['데일리·위클리 시드 보드', '전 세계가 같은 지뢰밭을 팝니다'],
    ['Game Center', '리더보드 3종, 업적 15종 (전부 선택)'],
    ['비주얼 테마 4종', '테마마다 다른 음악'],
  ],
};

/** 개발 노트 — 기사에 인용구로 쓰라고 넣어 둔 문단들. */
export const QUOTES = {
  en: [
    'The board is checked by a solver before it’s dealt. If the solver can’t open it by deduction, the board doesn’t get used.',
    'The hint isn’t a reveal — it’s a constraint solver. It only sings over a tile logic guarantees. When it goes quiet, that silence is information: you’re genuinely at a guess, and the game is telling you so.',
    'I cut an objective called "resonance" — clear pairs of adjacent equal numbers. It read as a deduction goal but the numbers are hidden until you dig, so it was pure luck in a deduction costume. It was the number one cause of death in bot testing.',
    'I balanced it with a bot that plays using the same solver and guesses only at minimum risk. Early on it won 95% of runs, because clearing the board was an instant win and the score quota was decorative. Making the quota the only win condition dropped it to zero overnight, and finding out why took longer than building the shop.',
  ],
  ko: [
    '보드는 깔리기 전에 솔버가 검사합니다. 솔버가 추리만으로 풀 수 없으면 그 보드는 쓰지 않습니다.',
    '힌트는 정답 공개가 아니라 제약 조건 솔버입니다. 논리가 보장하는 칸에서만 웁니다. 조용해진다면 그 침묵 자체가 정보입니다 — 지금은 정말로 찍어야 하는 순간이고, 게임이 그걸 알려주는 겁니다.',
    '"공명"이라는 목표를 잘라냈습니다. 인접한 같은 숫자 쌍을 지우는 건데, 추리 목표처럼 보이지만 숫자는 파기 전까지 숨어 있으니 추리의 탈을 쓴 순수한 운이었습니다. 봇 테스트에서 사망 원인 1위였습니다.',
    '같은 솔버로 플레이하고 위험이 가장 낮을 때만 찍는 봇으로 밸런스를 잡았습니다. 초기엔 봇이 95%를 이겼는데, 보드를 다 비우면 즉시 승리였고 점수 쿼터는 장식이었기 때문입니다. 쿼터를 유일한 승리 조건으로 바꾸자 하룻밤 사이 0%가 됐고, 왜 그런지 알아내는 데 상점을 만드는 것보다 오래 걸렸습니다.',
  ],
};

export const UI = {
  ko: {
    kicker: '프레스킷',
    title: 'Mineforge: Sweeper Roguelike',
    lead: '아래 자료는 기사·영상·리뷰에 자유롭게 쓰실 수 있습니다. 별도 허락이 필요 없습니다.',
    download: '프레스킷 전체 내려받기',
    downloadSub: `.zip · ${ZIP_SIZE} · 스크린샷 원본 10장, 아이콘, 팩트시트`,
    appstore: 'App Store에서 보기',
    factsTitle: '기본 정보',
    oneLineTitle: '한 줄 소개',
    paraTitle: '한 문단 소개',
    featuresTitle: '주요 기능',
    quotesTitle: '개발 노트',
    quotesLead: '기사에 그대로 인용하셔도 됩니다.',
    shotsTitle: '스크린샷',
    shotsLead: '아래는 미리보기입니다. 원본(1290×2796 PNG)은 프레스킷 zip에 들어 있습니다.',
    iconTitle: '아이콘',
    iconSub: '1024×1024 PNG',
    copy: '복사',
    copied: '복사됨',
    termsTitle: '이용 조건',
    terms:
      '이 페이지와 프레스킷의 모든 자료는 보도·리뷰·영상 제작에 자유롭게 사용하실 수 있습니다. 별도 문의 없이 쓰시면 됩니다. 그 밖의 용도는 아래로 문의해 주세요.',
    contactTitle: '문의',
    contactText: '리뷰 코드, 추가 자료, 인터뷰 요청은 아래로 보내주세요. 보통 영업일 기준 24시간 안에 답합니다.',
    back: '← Mineforge 홈',
  },
  en: {
    kicker: 'Press kit',
    title: 'Mineforge: Sweeper Roguelike',
    lead: 'Everything below is free to use in coverage. No permission needed.',
    download: 'Download the full press kit',
    downloadSub: `.zip · ${ZIP_SIZE} · 10 full-size screenshots, icon, fact sheet`,
    appstore: 'View on the App Store',
    factsTitle: 'Fact sheet',
    oneLineTitle: 'One line',
    paraTitle: 'One paragraph',
    featuresTitle: 'Features',
    quotesTitle: 'Development notes',
    quotesLead: 'Usable as quotes.',
    shotsTitle: 'Screenshots',
    shotsLead: 'Previews below. Full-size originals (1290×2796 PNG) are in the press kit zip.',
    iconTitle: 'Icon',
    iconSub: '1024×1024 PNG',
    copy: 'Copy',
    copied: 'Copied',
    termsTitle: 'Terms of use',
    terms:
      'All assets on this page and in the press kit are free to use in coverage — articles, reviews and videos. No need to ask. For anything else, get in touch below.',
    contactTitle: 'Contact',
    contactText:
      'For review codes, extra assets or interview requests, write to us below. We usually reply within one business day.',
    back: '← Mineforge home',
  },
} as const;
