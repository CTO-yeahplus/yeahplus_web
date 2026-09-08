import Link from 'next/link';
import Image from 'next/image';
import { Check, Flame } from 'lucide-react';
import { CONTACT_EMAIL } from './legal';

// 마케팅 랜딩 — 정적 프리렌더(상호작용은 FAQ <details> 뿐이라 전부 서버 컴포넌트).
// 화면 목업·도해는 실제 앱 UI를 HTML/CSS/SVG로 재현한 것(스크린샷 이미지 아님).
export const dynamic = 'force-static';

const STATS = [
  { v: '2', l: '과목 통합 (수학·영어)' },
  { v: '12', l: '수능 영어 독해 유형' },
  { v: '53', l: '수학 개념 그래프 노드' },
  { v: '3', l: '단계 AI 해설' },
];

const LOOP = [
  {
    no: '01',
    title: '진단 — 틀린 이유부터',
    desc: '점수 대신 원인을 봅니다. 오답을 개념·유형 단위로 쪼개 어디서 무너졌는지 짚습니다.',
    note: '수학 오답 진단 · 영어 유형별 정답률',
  },
  {
    no: '02',
    title: '처방 — 오늘 풀 것만',
    desc: '취약한 개념과 유형에서 오늘치 분량만 골라 줍니다. 뭘 풀지 고민하는 시간이 사라집니다.',
    note: '수학 처방 4슬롯 · 영어 3문항 세트',
  },
  {
    no: '03',
    title: '복습 — 잊을 때쯤 다시',
    desc: '틀린 문항은 사라지지 않습니다. 간격을 두고 다시 돌아와, 맞힐 때까지 큐에 남습니다.',
    note: '수학 재출제 · 영어 간격 반복(SRS)',
  },
];

// 앱의 QUESTION_TYPE_LABELS 와 같은 순서·같은 이름을 쓴다.
const ENGLISH_TYPES = [
  { ko: '빈칸 추론', en: 'blank' },
  { ko: '글의 순서', en: 'order' },
  { ko: '문장 삽입', en: 'insertion' },
  { ko: '요지·주제', en: 'main idea' },
  { ko: '함의 추론', en: 'implication' },
  { ko: '어법', en: 'grammar' },
  { ko: '문단 요약', en: 'summary' },
  { ko: '글의 목적', en: 'purpose' },
  { ko: '심경·분위기', en: 'mood' },
  { ko: '필자의 주장', en: 'claim' },
  { ko: '문맥 어휘', en: 'vocabulary' },
  { ko: '내용 일치', en: 'content match' },
];

/* ── 기능 카드에 들어가는 작은 도해 ── */

function FigConceptMap() {
  return (
    <svg className="ark-fig-graph" viewBox="0 0 220 80" role="img" aria-label="개념 그래프 도해">
      <line x1="28" y1="40" x2="80" y2="18" />
      <line x1="28" y1="40" x2="80" y2="62" />
      <line x1="80" y1="18" x2="140" y2="30" />
      <line x1="80" y1="62" x2="140" y2="30" />
      <line x1="80" y1="62" x2="140" y2="68" />
      <line x1="140" y1="30" x2="194" y2="46" />
      <circle cx="28" cy="40" r="7" />
      <circle cx="80" cy="18" r="7" />
      <circle className="weak" cx="80" cy="62" r="8" />
      <circle className="on" cx="140" cy="30" r="9" />
      <circle cx="140" cy="68" r="6" />
      <circle cx="194" cy="46" r="7" />
    </svg>
  );
}

function FigExplanation() {
  return (
    <>
      <div className="ark-fig-row">
        <span className="ark-fig-tag on">구조 분석</span>
        <span className="ark-fig-tag">정답 근거</span>
        <span className="ark-fig-tag">오답 분석</span>
      </div>
      <div className="ark-fig-row">
        <span className="ark-fig-line" />
      </div>
      <div className="ark-fig-row">
        <span className="ark-fig-line gold" style={{ flex: 0.7 }} />
        <span className="ark-fig-line" style={{ flex: 0.3 }} />
      </div>
    </>
  );
}

function FigWrongNote() {
  return (
    <>
      <div className="ark-fig-row">
        <span className="ark-fig-tag on">수학</span>
        <span className="ark-fig-tag">영어</span>
        <span className="ark-fig-cap" style={{ marginLeft: 'auto' }}>
          오늘 복습 4
        </span>
      </div>
      <div className="ark-fig-row">
        <span className="ark-fig-line" style={{ flex: 0.75 }} />
        <span className="ark-fig-tag gold">재출제</span>
      </div>
      <div className="ark-fig-row">
        <span className="ark-fig-line" style={{ flex: 0.6 }} />
        <span className="ark-fig-tag">D+3</span>
      </div>
    </>
  );
}

function FigDashboard() {
  return (
    <>
      <div className="ark-fig-bars" aria-hidden>
        <i style={{ height: '34%' }} />
        <i style={{ height: '58%' }} />
        <i style={{ height: '46%' }} />
        <i className="on" style={{ height: '76%' }} />
        <i style={{ height: '62%' }} />
        <i className="on" style={{ height: '88%' }} />
        <i style={{ height: '52%' }} />
      </div>
      <div className="ark-fig-cap">최근 8주 추세 · 수학 + 영어 합산</div>
    </>
  );
}

function FigStreak() {
  return (
    <>
      <div className="ark-fig-streak" aria-hidden>
        <span className="on" />
        <span className="on" />
        <span className="on" />
        <span className="on" />
        <span className="on" />
        <span />
        <span />
      </div>
      <div className="ark-fig-row">
        <span className="ark-fig-tag gold" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <Flame size={11} strokeWidth={2.2} aria-hidden /> 5일 연속
        </span>
        <span className="ark-fig-tag">Lv.4</span>
        <span className="ark-fig-tag">빈칸 정복</span>
      </div>
    </>
  );
}

function FigLogin() {
  return (
    <>
      <div className="ark-fig-row">
        <span className="ark-fig-tag">카카오</span>
        <span className="ark-fig-tag">Google</span>
        <span className="ark-fig-tag">Apple</span>
      </div>
      <div className="ark-fig-code" aria-hidden>
        <span className="on">4</span>
        <span className="on">7</span>
        <span className="on">2</span>
        <span />
        <span />
        <span />
      </div>
    </>
  );
}

function FigWeekly() {
  return (
    <>
      <div className="ark-fig-row">
        <span className="ark-fig-tag gold">이번 주 3문항</span>
        <span className="ark-fig-tag">전국 공통</span>
      </div>
      <div className="ark-fig-bars" aria-hidden>
        <i style={{ height: '38%' }} />
        <i className="on" style={{ height: '72%' }} />
        <i style={{ height: '54%' }} />
      </div>
      <div className="ark-fig-cap">문항별 실제 정답률</div>
    </>
  );
}

function FigReminder() {
  return (
    <>
      <div className="ark-fig-row">
        <span className="ark-fig-tag">오답</span>
        <span className="ark-fig-tag gold">D+3</span>
        <span className="ark-fig-tag gold">D+7</span>
        <span className="ark-fig-tag">졸업</span>
      </div>
      <div className="ark-fig-cap">두 번 맞히면 큐에서 내려갑니다</div>
    </>
  );
}

/** 실제 앱 스크린샷(App Store 제출본에서 문구 배너만 떼어낸 것). */
const SCREENS = [
  {
    src: '/arke/shots/prescription.webp',
    alt: 'ARKE 수학 · 오늘의 처방 화면',
    title: '오늘의 처방',
    cap: '왜 이 문항인지 이유와 함께',
  },
  {
    src: '/arke/shots/conceptmap.webp',
    alt: 'ARKE 수학 · 개념 진단과 취약 개념 히트맵 화면',
    title: '개념 진단',
    cap: '어느 개념부터 손봐야 하는지',
  },
  {
    src: '/arke/shots/record.webp',
    alt: 'ARKE 기록 · 통합 대시보드 화면',
    title: '기록',
    cap: '푼 문항 · 정답률 · 공부한 날',
  },
];

const FEATURES = [
  {
    fig: <FigConceptMap />,
    title: '개념 지도',
    desc: '수학 개념 53개와 선수 관계를 그래프로 잇습니다. 틀린 문항에서 출발해 뿌리 개념까지 거슬러 올라갑니다.',
  },
  {
    fig: <FigExplanation />,
    title: 'AI 3단 해설',
    desc: '구조 분석 · 정답 근거 · 오답 분석을 나눠서 보여 줍니다. 지문 어휘는 별도 탭에서 한 번 더.',
  },
  {
    fig: <FigWrongNote />,
    title: '통합 오답노트',
    desc: '수학 재출제 대기 문항과 영어 간격 반복 큐를 한 화면에서 과목 탭으로 오갑니다.',
  },
  {
    fig: <FigDashboard />,
    title: '통합 대시보드',
    desc: '푼 문항·정답률·공부한 날·학습 시간을 이번 주와 지난주로 나란히 놓고, 최근 8주 추세까지 봅니다.',
  },
  {
    fig: <FigStreak />,
    title: '스트릭과 배지',
    desc: '수학·영어를 합산한 연속 학습일과 XP 레벨. 유형별 정복 배지로 오늘 하루를 이어 갑니다.',
  },
  {
    fig: <FigWeekly />,
    title: '주간 챌린지',
    desc: '매주 월요일, 전국이 같은 3문항을 풉니다. 다 풀면 다른 학생들이 몇 %나 맞혔는지 실제 참여 기록으로 보여 줍니다.',
  },
  {
    fig: <FigReminder />,
    title: '복습 알림',
    desc: '틀린 문항은 3일 뒤에 다시 나옵니다. 한 번 맞히면 7일 뒤, 두 번 맞히면 졸업. 복습할 날이 오면 알림으로 알려 드립니다.',
  },
  {
    fig: <FigLogin />,
    title: '간편 로그인',
    desc: '카카오 · Google · Apple 계정, 또는 이메일로 받은 6자리 코드로 바로 시작합니다.',
  },
];

// 아래 두 목록과 비교표는 앱의 apps/web/src/lib/plans.ts 를 그대로 따른다.
// 값을 바꿀 일이 생기면 코드를 먼저 보고 여기를 맞춘다 — 반대로 하면 어긋난다.
const FREE_FEATURES = [
  '매일 수학 처방 1문항',
  '매일 영어 훈련 1세트 (3문항)',
  '정답과 풀이 · 힌트 1단계',
  '주간 챌린지 · 기록 · 스트릭 · 배지',
];

const PREMIUM_FEATURES = [
  '수학 처방 4슬롯 전체 · 영어 훈련 무제한',
  '단계 힌트 3단 전체',
  '취약 개념 맵 · 오답노트 전체 기록',
  '해설 “오답 분석” 탭 · 학부모 주간 리포트',
];

const COMPARE: { label: string; free: string; premium: string }[] = [
  { label: '하루 수학 처방', free: '1문항', premium: '4슬롯 전체' },
  { label: '하루 영어 훈련', free: '1세트 (3문항)', premium: '무제한' },
  { label: '수학 단계 힌트', free: '1단', premium: '3단 전체' },
  { label: '오답노트 기록', free: '최근 5문항', premium: '전체 기록' },
  { label: '취약 개념 맵', free: '—', premium: '열람' },
  { label: '해설 “오답 분석” 탭', free: '—', premium: '열람' },
  { label: '학부모 주간 리포트', free: '—', premium: '열람' },
  { label: '구조 분석 · 정답 근거 해설', free: '열람', premium: '열람' },
  { label: '주간 챌린지 · 기록 · 배지', free: '포함', premium: '포함' },
];

const FAQ: [string, string][] = [
  [
    '누구를 위한 앱인가요?',
    '수능을 준비하는 고2를 기준으로 설계했습니다. 수학은 고2 과정 개념 그래프를 따라가고, 영어는 수능 독해 12개 유형을 훈련합니다. 고3·재수생이 취약 유형을 다시 훑는 용도로 써도 무방합니다.',
  ],
  [
    '수학과 영어를 따로 설치해야 하나요?',
    '아닙니다. 한 앱 안에서 두 과목을 오갑니다. 스트릭과 XP도 두 과목을 합산하기 때문에, 오늘 영어만 했더라도 연속 기록은 이어집니다.',
  ],
  [
    'AI 해설은 믿어도 되나요?',
    '생성과 검증에 서로 다른 모델을 붙여 교차검증하지만, AI가 만든 결과에는 오류가 섞일 수 있습니다. ARKE의 진단과 처방은 학습 참고 자료이며 성적을 보장하지 않습니다. 중요한 판단은 선생님과 함께 확인해 주세요.',
  ],
  [
    '무료로는 어디까지 쓸 수 있나요?',
    '매일 수학 처방 1문항과 영어 훈련 1세트(3문항)를 정답·풀이까지 그대로 봅니다. 주간 챌린지·기록·스트릭·배지도 무료입니다. 프리미엄은 처방 4슬롯 전체, 3단 힌트, 취약 개념 맵, 오답노트 전체 기록, 학부모 주간 리포트를 엽니다.',
  ],
  [
    '영어 지문은 어디서 가져오나요?',
    '앱에 실린 영어 지문 139개는 전부 자체 제작물입니다. 기출 원문은 출제 원리를 분석하는 단계에만 참고하고 앱에 싣지 않습니다. 수학 문항도 자체 제작입니다.',
  ],
  [
    '앱은 언제 나오나요?',
    'iOS 앱이 App Store 심사를 받고 있습니다. 승인되면 이 페이지의 버튼이 실제 다운로드 링크로 바뀝니다.',
  ],
  [
    '문의는 어디로 하나요?',
    `${CONTACT_EMAIL} 로 메일 주시면 영업일 기준으로 확인 후 답변드립니다. 개인정보 열람·정정·삭제 요청도 같은 주소로 받습니다.`,
  ],
];

export default function ArkeLandingPage() {
  return (
    <>
      <section className="ark-hero">
        <div className="ark-hero-inner">
          <span className="ark-badge">yeahplus · 고2 수능 코치</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/arke/arke_logo.png" alt="ARKE" width={84} height={84} className="ark-hero-logo" />
          <h1 className="ark-hero-title">
            오늘 뭘 풀지는,
            <br />
            <em>ARKE</em>가 정합니다.
          </h1>
          <p className="ark-hero-sub">
            수학은 틀린 이유부터 짚고, 영어는 약한 유형부터 채웁니다. 진단 → 처방 → 복습, 하루 한 바퀴면
            충분한 수능 훈련 루프.
          </p>
          <div className="ark-cta-row">
            {/* 앱이 App Store 에 라이브되면 아래 href 를 실제 링크로 교체하세요. */}
            <a className="ark-btn ark-btn-primary" href="#" aria-disabled="true">
              App Store (심사 중)
            </a>
            <a className="ark-btn ark-btn-ghost" href="#features">
              기능 살펴보기
            </a>
          </div>
          <p className="ark-hero-note">수학 · 영어 통합 · iPhone 앱 심사 중</p>
        </div>
        <div className="ark-rule" />
      </section>

      <div className="ark-container">
        <div className="ark-stats">
          {STATS.map((s) => (
            <div className="ark-stat" key={s.l}>
              <div className="ark-stat-v">{s.v}</div>
              <div className="ark-stat-l">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 화면 미리보기 — 실제 앱 스크린샷 ── */}
      <section className="ark-section ark-container" id="screens">
        <div className="ark-section-head">
          <p className="ark-kicker">Screens</p>
          <h2 className="ark-section-title">앱을 열면 이렇게 보입니다.</h2>
          <p className="ark-section-lead">
            오늘 풀 것을 고르는 화면, 어디서 무너졌는지 읽는 화면, 이번 주가 어땠는지 보는 화면.
            하루 한 바퀴는 이 세 장이 전부입니다.
          </p>
        </div>
        <div className="ark-phones">
          {SCREENS.map((sc) => (
            <div className="ark-phone-wrap" key={sc.src}>
              <div className="ark-phone">
                <Image
                  className="ark-shot"
                  src={sc.src}
                  alt={sc.alt}
                  width={760}
                  height={1491}
                  sizes="(max-width: 720px) 90vw, 268px"
                />
              </div>
              <p className="ark-phone-cap">
                <strong>{sc.title}</strong>
                {sc.cap}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="ark-section ark-container">
        <div className="ark-section-head">
          <p className="ark-kicker">Two subjects</p>
          <h2 className="ark-section-title">한 앱에서 두 과목을.</h2>
          <p className="ark-section-lead">
            수학과 영어는 약점의 모양이 다릅니다. ARKE는 과목마다 다른 루프를 돌리고, 기록만 하나로 모읍니다.
          </p>
        </div>
        <div className="ark-subjects">
          <div className="ark-subject ark-subject-math">
            <span className="ark-glyph" aria-hidden="true">
              π
            </span>
            <p className="ark-subject-eyebrow">Σ 수학 · 오늘의 처방</p>
            <h3 className="ark-subject-title">이유가 붙는 오늘의 처방</h3>
            <p className="ark-subject-desc">
              푼 문항의 오답을 개념 단위로 진단하고, 취약 보강 · 오답 재출제 · 간격 반복 · 현행 진도
              네 갈래에서 오늘 풀 문항을 고릅니다. 문항마다 왜 골랐는지가 함께 적힙니다.
            </p>
            <div className="ark-chips">
              <span className="ark-chip">오답 진단</span>
              <span className="ark-chip">개념맵</span>
              <span className="ark-chip">처방 이유 표시</span>
              <span className="ark-chip">단계 힌트</span>
            </div>
          </div>

          <div className="ark-subject">
            <span className="ark-glyph" aria-hidden="true">
              A
            </span>
            <p className="ark-subject-eyebrow">✦ 영어 · 오늘의 훈련</p>
            <h3 className="ark-subject-title">약점 유형 3문항 세트</h3>
            <p className="ark-subject-desc">
              유형별 정답률을 보고 가장 약한 유형에서 세 문항을 뽑습니다. 수능 독해 12개 유형을 다루고, 풀고 나면 3단 해설과 오답노트가 따라옵니다.
            </p>
            <div className="ark-chips">
              <span className="ark-chip">유형별 정답률</span>
              <span className="ark-chip">3문항 세트</span>
              <span className="ark-chip">AI 3단 해설</span>
              <span className="ark-chip">간격 반복</span>
            </div>
          </div>
        </div>
      </section>

      <section className="ark-section ark-container">
        <div className="ark-section-head">
          <p className="ark-kicker">The loop</p>
          <h2 className="ark-section-title">공부량이 아니라 순서를 바꿉니다.</h2>
        </div>
        <div className="ark-steps">
          {LOOP.map((s) => (
            <div className="ark-step" key={s.no}>
              <div className="ark-step-no">{s.no}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="ark-step-note">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="ark-section ark-container">
        <div className="ark-section-head">
          <p className="ark-kicker">English types</p>
          <h2 className="ark-section-title">수능 영어 독해, 일곱 개의 유형.</h2>
          <p className="ark-section-lead">
            유형마다 정답률을 따로 쌓습니다. 약한 유형이 먼저 나오고, 정복한 유형에는 배지가 붙습니다.
          </p>
        </div>
        <div className="ark-types">
          {ENGLISH_TYPES.map((t) => (
            <div className="ark-type" key={t.en}>
              {t.ko}
              <span>{t.en}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="ark-section ark-container" id="features">
        <div className="ark-section-head">
          <p className="ark-kicker">Features</p>
          <h2 className="ark-section-title">기록이 쌓일수록 정확해집니다.</h2>
        </div>
        <div className="ark-features">
          {FEATURES.map((f) => (
            <div className="ark-feature" key={f.title}>
              <div className="ark-fig">{f.fig}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="ark-section ark-container" id="pricing">
        <div className="ark-section-head">
          <p className="ark-kicker">Pricing</p>
          <h2 className="ark-section-title">무료로 시작하고, 필요할 때 넓히세요.</h2>
        </div>
        <div className="ark-plans">
          <div className="ark-plan">
            <p className="ark-plan-name">무료</p>
            <p className="ark-price">
              0원
              <small>/ 월</small>
            </p>
            <p className="ark-price-sub">가입만 하면 매일 쓸 수 있습니다.</p>
            <ul className="ark-plan-list">
              {FREE_FEATURES.map((f) => (
                <li key={f}>
                  <Check size={15} strokeWidth={2} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="ark-plan ark-plan-featured">
            <p className="ark-plan-name">프리미엄</p>
            <p className="ark-price">
              9,900원
              <small>/ 월</small>
            </p>
            <p className="ark-price-sub">연 결제 79,000원 — 월 6,583원 꼴, 약 33% 절약</p>
            <ul className="ark-plan-list">
              {PREMIUM_FEATURES.map((f) => (
                <li key={f}>
                  <Check size={15} strokeWidth={2} aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="ark-compare-wrap">
          <table className="ark-compare">
            <thead>
              <tr>
                <th>기능</th>
                <th>무료</th>
                <th className="gold col-premium">프리미엄</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE.map((row) => (
                <tr key={row.label}>
                  <th scope="row">{row.label}</th>
                  <td className={row.free === '—' ? 'muted' : undefined}>{row.free}</td>
                  <td className="yes col-premium">{row.premium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="ark-plan-note">
          표시 가격은 VAT 포함가입니다. 구독은 App Store 인앱결제로 자동 갱신되며, 기간이 끝나기 24시간 전까지
          해지하지 않으면 같은 금액으로 갱신됩니다. 관리·해지는 iPhone 설정 → Apple 계정 → 구독에서 언제든지 할 수
          있고, 청약철회·환불은 <Link href="/arke/terms">이용약관</Link> 제9조를 따릅니다.
        </p>
      </section>

      <section className="ark-section ark-container" id="faq">
        <div className="ark-section-head">
          <p className="ark-kicker">FAQ</p>
          <h2 className="ark-section-title">자주 묻는 질문</h2>
        </div>
        <div className="ark-faq">
          {FAQ.map(([q, a]) => (
            <details className="ark-faq-item" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
        <p className="ark-plan-note">
          찾는 답이 없다면 <Link href="/arke/support">지원 · FAQ</Link> 페이지에서 로그인·기록·결제 관련
          문제 해결 방법을 확인하실 수 있습니다.
        </p>
      </section>

      <div className="ark-container">
        <section className="ark-cta-band">
          <h2>고2에게 부족한 건 시간이 아니라 순서입니다.</h2>
          <p>오늘 풀 다섯 문제와 세 문항, ARKE가 골라 두겠습니다.</p>
          <a className="ark-btn ark-btn-gold" href="#" aria-disabled="true">
            App Store (준비 중)
          </a>
        </section>
      </div>
    </>
  );
}
