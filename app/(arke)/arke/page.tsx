import Link from 'next/link';
import { Check } from 'lucide-react';
import { CONTACT_EMAIL } from './legal';
import StoreButton from './StoreButton';
import { PHOTO_LIVE } from './config';
import ArkeHome from './home/ArkeHome';
import './home/home.css';

// 마케팅 랜딩 — 인스타그램·쇼츠·틱톡 프로필 링크가 오는 곳(yeahplus.co.kr/arke?from=ig).
// 기능을 늘어놓지 않고 "학생이 갖게 되는 것"부터 말한다(ARKE/marketing/PLAN_8W.md §2).
// 위쪽은 휠 인터랙티브 장면(home/ArkeHome.tsx), 아래는 학부모 · 요금 · FAQ.
// 첫 화면 버튼 두 개: 학생은 App Store 로 바로, 학부모는 아래 #parents 로.
// App Store 링크의 ct(유입 경로)는 StoreButton 이 ?from= 을 읽어 붙인다.
export const dynamic = 'force-static';

const PARENTS = [
  {
    title: '묻지 않아도 아는 한 주',
    desc: '한 주 동안 푼 문항 수, 공부한 날, 지난주보다 달라진 정답률, 약한 유형을 정리해 보여 드립니다. "공부했어?" 대신 "이 유형은 어땠어?"를 물을 수 있습니다.',
    note: '보호자 주간 리포트 · 프리미엄',
  },
  {
    title: '성적표가 대화가 됩니다',
    desc: '학평이 끝나면 아이가 틀린 번호만 입력합니다. 등급 숫자보다 "어디서 점수를 잃었는지"가 먼저 보입니다.',
    note: '학평 기록 · 무료',
  },
  {
    title: '안심하고 맡길 수 있게',
    desc: PHOTO_LIVE
      ? '문항과 지문은 자체 제작입니다. 정답부터 보여 주지 않고 힌트를 한 단계씩 엽니다. 올린 사진은 분석에만 쓰고 저장하지 않습니다.'
      : '문항과 지문은 자체 제작입니다. 정답부터 보여 주지 않고 힌트를 한 단계씩 엽니다. 구독은 Apple 계정에서 언제든 관리·해지할 수 있습니다.',
    note: '자체 제작 문항 · 단계 힌트',
  },
];

// 아래 목록과 비교표는 ARKE 앱의 apps/web/src/lib/plans.ts 를 그대로 따른다.
// 값을 바꿀 일이 생기면 앱 코드를 먼저 보고 여기를 맞춘다.
const FREE_FEATURES = [
  '첫 진단 10문항 · 학평 기록',
  '취약 개념 맵',
  '매일 수학 처방 1문항 · 영어 1세트(3문항)',
  '힌트 1단계 · 최근 오답 5문항',
  '주간 챌린지 · 기록 · 스트릭',
];

const PREMIUM_FEATURES = [
  '수학 처방 4슬롯 전체 · 영어 훈련 무제한',
  '단계 힌트 3단 전체 · 오답노트 전체 기록',
  '해설 “오답 분석” 탭',
  '보호자 주간 리포트',
  ...(PHOTO_LIVE ? ['틀린 문제 찍기 (하루 10회)'] : []),
];

const COMPARE: { label: string; free: string; premium: string }[] = [
  { label: '첫 진단 10문항 · 학평 기록', free: '포함', premium: '포함' },
  { label: '취약 개념 맵', free: '열람', premium: '열람' },
  { label: '하루 수학 처방', free: '1문항', premium: '4슬롯 전체' },
  { label: '하루 영어 훈련', free: '1세트 (3문항)', premium: '무제한' },
  { label: '수학 단계 힌트', free: '1단', premium: '3단 전체' },
  { label: '오답노트 기록', free: '최근 5문항', premium: '전체 기록' },
  { label: '해설 “오답 분석” 탭', free: '—', premium: '열람' },
  { label: '보호자 주간 리포트', free: '—', premium: '열람' },
  ...(PHOTO_LIVE ? [{ label: '틀린 문제 찍기', free: '—', premium: '하루 10회' }] : []),
  { label: '주간 챌린지 · 기록 · 배지', free: '포함', premium: '포함' },
];

const FAQ: [string, string][] = [
  [
    '누구를 위한 앱인가요?',
    '수능을 준비하는 고2, 곧 고3이 되는 학생을 기준으로 만들었습니다. 수학은 고2 과정 개념을 따라가고, 영어는 수능 독해 12개 유형을 훈련합니다.',
  ],
  [
    '무료로는 어디까지 쓸 수 있나요?',
    '첫 진단 10문항, 학평 기록, 취약 개념 맵, 그리고 매일 수학 1문항과 영어 1세트(3문항)를 정답·풀이까지 그대로 봅니다. 프리미엄은 처방 4슬롯 전체, 3단 힌트, 오답노트 전체, 보호자 주간 리포트를 엽니다.',
  ],
  [
    '학평 문제를 앱에 올리나요?',
    '아닙니다. 시험 이름, 점수(선택), 틀린 번호만 입력합니다. 문제 원문은 담지 않습니다. 번호마다 어느 개념이었는지 고르면 그 개념부터 다음 날 처방에 나옵니다.',
  ],
  [
    '부모가 아이 공부를 볼 수 있나요?',
    '프리미엄의 보호자 주간 리포트로 한 주 동안 푼 문항 수, 공부한 날, 정답률 변화, 약한 유형을 볼 수 있습니다.',
  ],
  ...(PHOTO_LIVE
    ? ([
        [
          '틀린 문제를 찍으면 풀이를 써 주나요?',
          '아닙니다. 어떤 개념의 문제인지, 어디서 틀렸을 가능성이 큰지를 짚고 같은 개념 문제 3개를 골라 드립니다. 다시 풀어야 내 것이 되기 때문입니다. 사진은 분석에만 쓰고 저장하지 않습니다.',
        ],
      ] as [string, string][])
    : []),
  [
    'AI 해설은 믿어도 되나요?',
    '문항과 해설은 AI의 도움을 받아 만들고 자체 검수를 거칩니다. 그래도 오류가 있을 수 있어 앱 안에서 바로 신고할 수 있습니다. ARKE는 학습을 돕는 도구이며 성적을 보장하지 않습니다.',
  ],
  [
    '문의는 어디로 하나요?',
    `${CONTACT_EMAIL} 로 메일 주시면 영업일 기준으로 확인 후 답변드립니다. 개인정보 열람·정정·삭제 요청도 같은 주소로 받습니다.`,
  ],
];

export default function ArkeLandingPage() {
  return (
    <>
      <ArkeHome />

      {/* ── 학부모님께 ── */}
      <section className="ark-section ark-container" id="parents">
        <div className="ark-section-head">
          <p className="ark-kicker">For parents</p>
          <h2 className="ark-section-title">잔소리 대신, 보이는 한 주.</h2>
          <p className="ark-section-lead">
            &ldquo;공부했어?&rdquo; &ldquo;응.&rdquo; 으로 끝나던 대화를, 아이의 실제 한 주로 시작할 수 있게.
          </p>
        </div>
        <div className="ark-parents">
          {PARENTS.map((p) => (
            <div className="ark-parent" key={p.title}>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <span>{p.note}</span>
            </div>
          ))}
        </div>
        <div className="ark-parent-cta">
          <StoreButton role="parent" className="ark-btn ark-btn-primary ark-btn-lg">
            App Store에서 자세히 보기
          </StoreButton>
          <p>아이와 같이 첫 진단 10문항을 풀어 보세요. 무료입니다.</p>
        </div>
      </section>

      {/* ── 요금 ── */}
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

      {/* ── FAQ ── */}
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
          찾는 답이 없다면 <Link href="/arke/support">지원 · FAQ</Link> 페이지에서 로그인·기록·결제 관련 문제 해결
          방법을 확인하실 수 있습니다.
        </p>
      </section>

      <div className="ark-container">
        <section className="ark-cta-band">
          <h2>같은 문제에 두 번 지지 않는 겨울.</h2>
          <p>첫 진단 10문항은 무료입니다. 15분이면 어디부터인지 보입니다.</p>
          <StoreButton role="student" className="ark-btn ark-btn-gold">
            App Store에서 받기
          </StoreButton>
        </section>
      </div>
    </>
  );
}
