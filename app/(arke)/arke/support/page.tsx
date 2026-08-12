// 지원(Support) — App Store 제출 시 "지원 URL"로 쓰는 공개 페이지.
import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICE_NAME, CONTACT_EMAIL, COMPANY } from '../legal';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `지원 · FAQ — ${SERVICE_NAME}`,
  description: `${SERVICE_NAME} 이용 중 궁금한 점과 문제 해결 방법, 문의 접수 창구를 안내합니다.`,
  alternates: { canonical: '/arke/support' },
  robots: { index: true, follow: true },
};

const CHANNELS: [string, string][] = [
  ['이메일', `${CONTACT_EMAIL} · 24시간 접수`],
  ['응답 시간', '영업일 기준 24시간 이내 (주말·공휴일 제외, 최대 48시간)'],
  ['운영 시간', '평일 10:00 – 18:00 (KST, UTC+9)'],
];

const FAQ: [string, string][] = [
  [
    '이메일 인증 코드가 오지 않아요.',
    '스팸함과 프로모션함을 먼저 확인해 주세요. 코드는 6자리 숫자로 발송되며 일정 시간이 지나면 만료됩니다. 코드 재요청 후에도 오지 않으면 가입에 쓰신 이메일 주소를 적어 문의해 주세요. 카카오·Google·Apple 계정으로도 바로 로그인할 수 있습니다.',
  ],
  [
    '기기를 바꿨더니 학습 기록이 보이지 않아요.',
    '학습 기록은 기기가 아니라 계정에 저장됩니다. 이전에 쓰던 것과 같은 방법(같은 이메일 또는 같은 소셜 계정)으로 로그인했는지 확인해 주세요. 예전에는 이메일로 가입했는데 새 기기에서 소셜 로그인을 하면 다른 계정으로 잡힐 수 있습니다.',
  ],
  [
    '스트릭이 끊겼어요. 복구되나요?',
    '스트릭은 하루에 한 문항이라도 풀면 이어지고, 하루를 통째로 건너뛰면 초기화됩니다. 수학·영어를 합산하기 때문에 둘 중 아무 과목이나 풀면 유지됩니다. 서비스 장애로 기록이 저장되지 않은 경우라면 날짜를 알려 주시면 확인 후 조정해 드립니다.',
  ],
  [
    '오답노트에서 예전 문항이 사라졌어요.',
    '무료 플랜은 오답노트에서 최근 20문항까지 볼 수 있습니다. 그보다 오래된 기록은 삭제된 것이 아니라 열람이 제한된 것이며, 프리미엄으로 전환하면 전체 기록이 다시 보입니다.',
  ],
  [
    '해설 내용이 이상하거나 틀린 것 같아요.',
    'ARKE의 문항·해설·진단 중 일부는 AI가 생성합니다. 교차검증으로 품질을 관리하지만 오류가 섞일 수 있어, 제보해 주시면 확인 후 수정합니다. 과목과 유형, 문항 화면 캡처, 어떤 부분이 이상했는지를 함께 보내 주시면 가장 빠릅니다.',
  ],
  [
    '결제와 환불은 어떻게 하나요?',
    '프리미엄은 월 9,900원 또는 연 79,000원(VAT 포함)입니다. 결제 기능은 앱 출시 시점에 앱 내에서 안내하며, 청약철회와 환불은 「전자상거래 등에서의 소비자보호에 관한 법률」과 이용약관 제9조를 따릅니다. 이미 이용한 기간에 해당하는 금액은 공제될 수 있습니다.',
  ],
  [
    '회원 탈퇴나 데이터 삭제를 요청하고 싶어요.',
    '앱 내 설정에서 탈퇴할 수 있고, 문의 메일로 요청하셔도 됩니다. 탈퇴 시 개인정보는 지체 없이 파기하며, 관계 법령상 보존 의무가 있는 기록만 해당 기간 동안 보관합니다. 자세한 내용은 개인정보처리방침 3항과 7항을 참고해 주세요.',
  ],
  [
    '만 14세 미만도 쓸 수 있나요?',
    '아니요. ARKE는 고등학생을 주 대상으로 하며 만 14세 미만은 가입할 수 없습니다. 미성년 이용자의 법정대리인은 자녀의 개인정보 열람·정정·삭제와 처리정지를 요청할 수 있습니다.',
  ],
];

export default function ArkeSupportPage() {
  return (
    <article className="ark-legal">
      <header className="ark-legal-head">
        <h1>지원 · FAQ</h1>
        <p className="ark-legal-meta">{SERVICE_NAME} — 고2 수능 코치 · 수학 + 영어</p>
      </header>

      <p className="ark-legal-intro">
        쓰다가 막히는 부분이 있으면 아래 FAQ를 먼저 확인해 주세요. 해결되지 않으면 언제든 메일 주시면
        됩니다. 문항 오류나 해설 제보도 같은 주소로 받습니다.
      </p>

      <section>
        <h2>문의 창구와 응답 시간</h2>
        <div className="ark-legal-box">
          {CHANNELS.map(([k, v]) => (
            <div key={k}>
              <strong>{k}</strong> — {v}
            </div>
          ))}
        </div>
        <div className="ark-cta-row" style={{ justifyContent: 'flex-start', marginTop: 18 }}>
          <a className="ark-btn ark-btn-primary" href={`mailto:${CONTACT_EMAIL}`}>
            메일로 문의하기
          </a>
          <Link className="ark-btn ark-btn-ghost" href="/arke">
            ARKE 살펴보기
          </Link>
        </div>
      </section>

      <section>
        <h2>자주 묻는 질문</h2>
        <div className="ark-faq">
          {FAQ.map(([q, a]) => (
            <details className="ark-faq-item" key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <section>
        <h2>문항 오류를 제보할 때</h2>
        <p>
          아래 내용을 함께 보내 주시면 확인이 훨씬 빠릅니다. 과목(수학 · 영어)과 유형, 문항이 보이는 화면
          캡처, 어떤 점이 잘못됐다고 보셨는지, 그리고 가입에 사용한 이메일 주소입니다.
        </p>
        <p className="ark-legal-fine">
          제보해 주신 내용은 문항·해설 품질 개선에만 사용하며, 확인 후 결과를 회신드립니다.
        </p>
      </section>

      <section>
        <h2>서비스 제공자</h2>
        <div className="ark-legal-box">
          <div>상호: {COMPANY.name}</div>
          <div>대표자: {COMPANY.ceo}</div>
          <div>주소: {COMPANY.address}</div>
          <div>사업자등록번호: {COMPANY.bizNumber}</div>
          <div>통신판매업신고: {COMPANY.mailorder}</div>
          <div>
            문의: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </div>
      </section>

      <footer className="ark-legal-foot">
        <Link href="/arke/privacy">개인정보처리방침</Link>
        <span>·</span>
        <Link href="/arke/terms">이용약관</Link>
        <span>·</span>
        <Link href="/arke">ARKE 홈</Link>
      </footer>
    </article>
  );
}
