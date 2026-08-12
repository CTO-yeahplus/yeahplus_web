// 이용약관 — Google OAuth 게시 심사 / App Store 제출에 필요한 공개 약관 페이지.
import type { Metadata } from 'next';
import Link from 'next/link';
import { SERVICE_NAME, EFFECTIVE_DATE, CONTACT_EMAIL, COMPANY } from '../legal';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `이용약관 — ${SERVICE_NAME}`,
  description: `${SERVICE_NAME} 서비스 이용에 관한 회사와 이용자의 권리·의무를 정합니다.`,
  alternates: { canonical: '/arke/terms' },
  robots: { index: true, follow: true },
};

function Article({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function ArkeTermsPage() {
  return (
    <article className="ark-legal">
      <header className="ark-legal-head">
        <h1>이용약관</h1>
        <p className="ark-legal-meta">
          {SERVICE_NAME} · 시행일: {EFFECTIVE_DATE}
        </p>
      </header>

      <Article title="제1조 (목적)">
        <p>
          본 약관은 {COMPANY.name}(이하 &lsquo;회사&rsquo;)가 제공하는 학습 서비스 {SERVICE_NAME}(이하
          &lsquo;서비스&rsquo;)의 이용 조건과 절차, 회사와 이용자의 권리·의무 및 책임사항을 정하는 것을
          목적으로 합니다.
        </p>
      </Article>

      <Article title="제2조 (정의)">
        <p>
          &lsquo;이용자&rsquo;란 본 약관에 동의하고 서비스를 이용하는 자를 말합니다.
          &lsquo;회원&rsquo;이란 이메일 또는 제휴 소셜 계정으로 가입해 서비스를 이용하는 자를 말합니다.
          &lsquo;콘텐츠&rsquo;란 회사가 서비스에서 제공하는 학습 문항, 해설, 진단 결과 등 일체의 자료를
          말합니다.
        </p>
      </Article>

      <Article title="제3조 (약관의 효력 및 변경)">
        <p>
          본 약관은 서비스 화면에 게시함으로써 효력이 발생합니다. 회사는 관련 법령을 위배하지 않는
          범위에서 약관을 변경할 수 있으며, 변경 시 시행일 7일 전부터 공지합니다. 이용자에게 불리한 변경은
          30일 전에 공지하며, 이용자가 변경에 동의하지 않으면 이용계약을 해지할 수 있습니다.
        </p>
      </Article>

      <Article title="제4조 (회원가입 및 계정)">
        <p>
          가입은 이메일 인증 코드 또는 카카오·Google·Apple 계정 인증으로 이루어집니다. 이용자는 본인의
          정확한 정보로 가입해야 하며, 계정을 타인에게 양도하거나 공유할 수 없습니다. 계정 관리 소홀로
          발생한 손해에 대한 책임은 이용자에게 있습니다.
        </p>
        <p>서비스는 고등학생을 주 대상으로 하며, 만 14세 미만은 가입할 수 없습니다.</p>
      </Article>

      <Article title="제5조 (서비스의 제공)">
        <p>
          회사는 학습 문항 제공, 오답 진단, 맞춤 문항 처방, 학습 리포트 등의 기능을 제공합니다. 서비스는
          연중무휴 24시간 제공함을 원칙으로 하나, 시스템 점검·설비 교체·천재지변 등 부득이한 사유가 있는
          경우 일시 중단될 수 있으며, 이 경우 사전에 공지합니다.
        </p>
        <p>회사는 서비스의 내용과 구성을 개선하기 위해 기능을 변경하거나 중단할 수 있습니다.</p>
      </Article>

      <Article title="제6조 (AI 생성 콘텐츠에 관한 고지)">
        <p>
          서비스의 학습 문항, 해설, 오답 진단 결과 중 일부는 <strong>인공지능(AI)에 의해 생성</strong>
          됩니다. 회사는 교차검증 등으로 품질을 관리하지만 AI 생성 결과에 오류나 부정확한 내용이 포함될 수
          있습니다.
        </p>
        <p>
          따라서 서비스가 제공하는 진단·처방은 <strong>학습 참고 자료</strong>이며, 시험 성적이나 특정
          학습 성과를 보장하지 않습니다. 이용자는 중요한 학습 판단 시 교사 등 전문가의 조언을 함께
          참고하시기 바랍니다.
        </p>
      </Article>

      <Article title="제7조 (이용자의 의무)">
        <p>이용자는 다음 행위를 해서는 안 됩니다.</p>
        <p className="ark-legal-fine">
          · 타인의 계정을 도용하거나 개인정보를 부정하게 이용하는 행위
          <br />· 서비스의 콘텐츠를 회사의 사전 승낙 없이 복제·배포·출판·판매하는 행위
          <br />· 자동화된 수단(크롤러·봇 등)으로 콘텐츠를 대량 수집하는 행위
          <br />· 서비스의 정상적인 운영을 방해하거나 시스템에 부하를 가하는 행위
          <br />· 법령 또는 공서양속에 반하는 행위
        </p>
      </Article>

      <Article title="제8조 (콘텐츠의 지식재산권)">
        <p>
          서비스가 제공하는 콘텐츠에 대한 저작권 등 지식재산권은 회사에 귀속됩니다. 이용자는 서비스를 통해
          제공받은 콘텐츠를 <strong>개인적인 학습 목적</strong>으로만 이용할 수 있으며, 회사의 사전 서면
          동의 없이 영리 목적으로 이용하거나 제3자에게 제공할 수 없습니다.
        </p>
        <p>
          이용자가 서비스에 입력한 학습 기록은 이용자에게 귀속되며, 회사는 서비스 제공 및 개선을 위한
          범위에서만 이를 이용합니다.
        </p>
      </Article>

      <Article title="제9조 (유료 서비스 및 환불)">
        <p>
          회사는 일부 기능을 유료로 제공할 수 있으며, 요금과 결제 방법은 결제 화면에 표시합니다. 유료
          서비스의 청약철회 및 환불은 「전자상거래 등에서의 소비자보호에 관한 법률」 등 관련 법령을
          따릅니다. 이미 이용한 기간에 해당하는 금액은 공제될 수 있습니다.
        </p>
      </Article>

      <Article title="제10조 (이용계약의 해지)">
        <p>
          이용자는 언제든지 서비스 내 설정 또는 문의처를 통해 탈퇴를 요청할 수 있으며, 회사는 지체 없이
          처리합니다. 회사는 이용자가 본 약관을 중대하게 위반한 경우 사전 통지 후 이용을 제한하거나 계약을
          해지할 수 있습니다.
        </p>
      </Article>

      <Article title="제11조 (책임의 제한)">
        <p>
          회사는 천재지변, 통신망 장애 등 불가항력으로 서비스를 제공할 수 없는 경우 책임을 지지 않습니다.
          회사는 이용자의 귀책사유로 인한 서비스 이용 장애, 이용자가 서비스를 통해 기대하는 학습 성과를
          얻지 못한 것에 대해서는 책임을 지지 않습니다.
        </p>
      </Article>

      <Article title="제12조 (분쟁의 해결)">
        <p>
          본 약관은 대한민국 법률에 따라 규율되며, 서비스 이용과 관련하여 분쟁이 발생한 경우 회사와
          이용자는 원만한 해결을 위해 성실히 협의합니다. 협의가 이루어지지 않을 경우 관할 법원은
          민사소송법에 따라 정합니다.
        </p>
      </Article>

      <Article title="문의처">
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
      </Article>

      <footer className="ark-legal-foot">
        <Link href="/arke/privacy">개인정보처리방침</Link>
        <span>·</span>
        <Link href="/arke">ARKE 홈</Link>
      </footer>
    </article>
  );
}
