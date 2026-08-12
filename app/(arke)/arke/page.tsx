import Link from 'next/link';
import { Check, Flame } from 'lucide-react';
import { CONTACT_EMAIL } from './legal';

// 마케팅 랜딩 — 정적 프리렌더(상호작용은 FAQ <details> 뿐이라 전부 서버 컴포넌트).
// 화면 목업·도해는 실제 앱 UI를 HTML/CSS/SVG로 재현한 것(스크린샷 이미지 아님).
export const dynamic = 'force-static';

const STATS = [
  { v: '2', l: '과목 통합 (수학·영어)' },
  { v: '7', l: '수능 영어 독해 유형' },
  { v: '60', l: '수학 개념 그래프 노드' },
  { v: '3', l: '단계 AI 해설' },
];

const LOOP = [
  {
    no: '01',
    title: '진단 — 틀린 이유부터',
    desc: '점수 대신 원인을 봅니다. 오답을 개념·유형 단위로 쪼개 어디서 무너졌는지 짚습니다.',
    note: '수학 오답 진단 · 영어 유형 진단',
  },
  {
    no: '02',
    title: '처방 — 오늘 풀 것만',
    desc: '취약한 개념과 유형에서 오늘치 분량만 골라 줍니다. 뭘 풀지 고민하는 시간이 사라집니다.',
    note: '수학 데일리 5문제 · 영어 3문항 세트',
  },
  {
    no: '03',
    title: '복습 — 잊을 때쯤 다시',
    desc: '틀린 문항은 사라지지 않습니다. 간격을 두고 다시 돌아와, 맞힐 때까지 큐에 남습니다.',
    note: '수학 재출제 · 영어 간격 반복(SRS)',
  },
];

const ENGLISH_TYPES = [
  { ko: '빈칸 추론', en: 'blank' },
  { ko: '순서 배열', en: 'order' },
  { ko: '문장 삽입', en: 'insertion' },
  { ko: '주제·요지', en: 'main idea' },
  { ko: '함축 의미', en: 'implication' },
  { ko: '어법', en: 'grammar' },
  { ko: '요약문', en: 'summary' },
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
      <div className="ark-fig-cap">최근 7일 학습량 · 수학 + 영어 합산</div>
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

const FEATURES = [
  {
    fig: <FigConceptMap />,
    title: '개념 지도',
    desc: '약 60개 수학 개념과 선수 관계를 그래프로 잇습니다. 틀린 문항에서 출발해 뿌리 개념까지 거슬러 올라갑니다.',
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
    desc: '두 과목의 정답률, 이번 주 학습량, 취약 개념 요약을 한 장으로 확인합니다.',
  },
  {
    fig: <FigStreak />,
    title: '스트릭과 배지',
    desc: '수학·영어를 합산한 연속 학습일과 XP 레벨. 유형별 정복 배지로 오늘 하루를 이어 갑니다.',
  },
  {
    fig: <FigLogin />,
    title: '간편 로그인',
    desc: '카카오 · Google · Apple 계정, 또는 이메일로 받은 6자리 코드로 바로 시작합니다.',
  },
];

const FREE_FEATURES = [
  '하루 훈련 2세트 (세트당 3문항)',
  '오답노트 최근 20문항',
  '유형 진단 · 개념맵 열람',
  '스트릭 · XP · 배지',
];

const PREMIUM_FEATURES = [
  '훈련 세트 무제한',
  '오답노트 전체 기록',
  '해설 “오답 분석” 탭 열람',
  '무료 플랜의 모든 기능',
];

const COMPARE: { label: string; free: string; premium: string }[] = [
  { label: '하루 훈련 세트', free: '2세트 (6문항)', premium: '무제한' },
  { label: '오답노트 기록', free: '최근 20문항', premium: '전체 기록' },
  { label: '해설 “오답 분석” 탭', free: '—', premium: '열람' },
  { label: '구조 분석 · 정답 근거 해설', free: '열람', premium: '열람' },
  { label: '유형 진단 · 개념맵', free: '열람', premium: '열람' },
  { label: '스트릭 · XP · 배지', free: '포함', premium: '포함' },
];

const FAQ: [string, string][] = [
  [
    '누구를 위한 앱인가요?',
    '수능을 준비하는 고2를 기준으로 설계했습니다. 수학은 고2 과정 개념 그래프를 따라가고, 영어는 수능 독해 7개 유형을 훈련합니다. 고3·재수생이 취약 유형을 다시 훑는 용도로 써도 무방합니다.',
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
    '앱은 언제 나오나요?',
    'iOS 앱을 준비하고 있습니다. App Store 출시가 확정되면 이 페이지의 버튼이 실제 다운로드 링크로 바뀝니다.',
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
              App Store (준비 중)
            </a>
            <a className="ark-btn ark-btn-ghost" href="#features">
              기능 살펴보기
            </a>
          </div>
          <p className="ark-hero-note">수학 · 영어 통합 · iPhone 앱 준비 중</p>
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

      {/* ── 화면 미리보기 ── */}
      <section className="ark-section ark-container" id="screens">
        <div className="ark-section-head">
          <p className="ark-kicker">Screens</p>
          <h2 className="ark-section-title">앱을 열면 이렇게 보입니다.</h2>
          <p className="ark-section-lead">
            할 일을 고르는 화면, 세 문항을 푸는 화면, 왜 틀렸는지 읽는 화면. 하루 한 바퀴는 이 세 장이 전부입니다.
          </p>
        </div>
        <div className="ark-phones">
          {/* 1. 통합 홈 */}
          <div className="ark-phone-wrap">
            <div className="ark-phone">
              <div className="ark-scr">
                <div className="ark-m-top">
                  <span className="ark-m-brand">ARKE</span>
                  <span className="ark-m-chip">
                    <Flame size={10} strokeWidth={2.2} aria-hidden /> 12일 연속
                  </span>
                </div>
                <div className="ark-m-goal">
                  <div className="ark-m-goal-row">
                    <span>오늘의 목표</span>
                    <span>6 / 8문항</span>
                  </div>
                  <div className="ark-m-bar">
                    <i style={{ width: '75%' }} />
                  </div>
                  <div className="ark-m-goal-row" style={{ margin: '8px 0 0' }}>
                    <span>Lv.4 · XP 1,240</span>
                    <span>수학 5 · 영어 1</span>
                  </div>
                </div>
                <div className="ark-m-card ark-m-card-ink">
                  <p className="ark-m-label">Σ 수학 · 오늘의 처방</p>
                  <p className="ark-m-title">취약 개념 5문제</p>
                  <p className="ark-m-sub">미분계수의 정의 · 접선의 방정식</p>
                  <span className="ark-m-pill">처방 받기</span>
                  <span className="ark-m-pill ark-m-pill-ghost" style={{ marginLeft: 6 }}>
                    개념맵
                  </span>
                </div>
                <div className="ark-m-card">
                  <p className="ark-m-label">✦ 영어 · 오늘의 훈련</p>
                  <p className="ark-m-title">빈칸 추론 3문항</p>
                  <p className="ark-m-sub">최근 정답률 52% · 가장 약한 유형</p>
                  <span className="ark-m-pill">훈련 시작</span>
                  <span className="ark-m-pill ark-m-pill-ghost" style={{ marginLeft: 6 }}>
                    오답노트
                  </span>
                </div>
                <div className="ark-m-spacer" />
              </div>
            </div>
            <p className="ark-phone-cap">
              <strong>오늘 할 일</strong>
              두 과목의 오늘치를 한 화면에서
            </p>
          </div>

          {/* 2. 영어 훈련 */}
          <div className="ark-phone-wrap">
            <div className="ark-phone">
              <div className="ark-scr">
                <div className="ark-m-top">
                  <span className="ark-m-chip">빈칸 추론</span>
                  <div className="ark-m-dots" aria-hidden>
                    <span className="ark-m-dot on" />
                    <span className="ark-m-dot on" />
                    <span className="ark-m-dot" />
                  </div>
                </div>
                <div className="ark-m-card">
                  <div className="ark-m-lines">
                    <span className="ark-m-line" />
                    <span className="ark-m-line w90" />
                    <span className="ark-m-line w70" />
                    <span className="ark-m-line gold w55" />
                    <span className="ark-m-line w90" />
                    <span className="ark-m-line w70" />
                  </div>
                </div>
                <div className="ark-m-opts">
                  <div className="ark-m-opt">
                    <em>①</em>
                    <span className="ark-m-line w70" />
                  </div>
                  <div className="ark-m-opt">
                    <em>②</em>
                    <span className="ark-m-line w90" />
                  </div>
                  <div className="ark-m-opt sel">
                    <em>③</em>
                    <span className="ark-m-line w70" />
                  </div>
                  <div className="ark-m-opt">
                    <em>④</em>
                    <span className="ark-m-line w55" />
                  </div>
                </div>
                <div className="ark-m-spacer" />
                <span className="ark-m-pill" style={{ textAlign: 'center' }}>
                  제출하기
                </span>
              </div>
            </div>
            <p className="ark-phone-cap">
              <strong>3문항 세트</strong>
              약한 유형에서 뽑은 오늘의 훈련
            </p>
          </div>

          {/* 3. AI 3단 해설 */}
          <div className="ark-phone-wrap">
            <div className="ark-phone">
              <div className="ark-scr">
                <span className="ark-m-answer">정답 ③ · 맞았습니다</span>
                <div className="ark-m-tabs">
                  <span className="ark-m-tab on">구조 분석</span>
                  <span className="ark-m-tab">정답 근거</span>
                  <span className="ark-m-tab">오답 분석</span>
                </div>
                <div className="ark-m-card">
                  <div className="ark-m-lines">
                    <span className="ark-m-line w90" />
                    <span className="ark-m-line" />
                    <span className="ark-m-line gold w70" />
                    <span className="ark-m-line w90" />
                  </div>
                </div>
                <div className="ark-m-card">
                  <p className="ark-m-label" style={{ marginBottom: 7 }}>
                    지문 어휘
                  </p>
                  <div className="ark-m-vocab">
                    <span>substantial</span>
                    <span>infer</span>
                    <span>arbitrary</span>
                    <span>yield</span>
                  </div>
                </div>
                <div className="ark-m-spacer" />
                <span className="ark-m-pill ark-m-pill-ghost" style={{ textAlign: 'center' }}>
                  오답노트에 저장됨
                </span>
              </div>
            </div>
            <p className="ark-phone-cap">
              <strong>AI 3단 해설</strong>
              구조 · 근거 · 오답을 나눠서
            </p>
          </div>
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
            <h3 className="ark-subject-title">취약 개념 데일리 5문제</h3>
            <p className="ark-subject-desc">
              푼 문항의 오답을 개념 단위로 진단하고, 개념맵에서 약한 노드를 찾아 오늘 풀 다섯 문제를 처방합니다.
            </p>
            <div className="ark-chips">
              <span className="ark-chip">오답 진단</span>
              <span className="ark-chip">개념맵</span>
              <span className="ark-chip">데일리 처방</span>
              <span className="ark-chip">재출제</span>
            </div>
          </div>

          <div className="ark-subject">
            <span className="ark-glyph" aria-hidden="true">
              A
            </span>
            <p className="ark-subject-eyebrow">✦ 영어 · 오늘의 훈련</p>
            <h3 className="ark-subject-title">약점 유형 3문항 세트</h3>
            <p className="ark-subject-desc">
              유형별 정답률을 보고 가장 약한 유형에서 세 문항을 뽑습니다. 풀고 나면 3단 해설과 오답노트가 따라옵니다.
            </p>
            <div className="ark-chips">
              <span className="ark-chip">유형 진단</span>
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
          표시 가격은 VAT 포함가입니다. 결제 기능은 앱 출시 시점에 앱 내에서 안내하며, 청약철회·환불은{' '}
          <Link href="/arke/terms">이용약관</Link> 제9조를 따릅니다.
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
