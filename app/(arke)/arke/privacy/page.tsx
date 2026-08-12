// 개인정보처리방침 — Google OAuth 게시 심사 / App Store 제출에 필요한 공개 정책 페이지.
// 콘텐츠 상수는 legal.ts 소관(사업자 정보·위탁사 목록을 한 곳에서 관리).
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  SERVICE_NAME,
  EFFECTIVE_DATE,
  CONTACT_EMAIL,
  COMPANY,
  PROCESSORS,
  COLLECTED_ITEMS,
} from '../legal';

// 고정 콘텐츠 — 빌드 시 프리렌더.
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `개인정보처리방침 — ${SERVICE_NAME}`,
  description: `${SERVICE_NAME}가 이용자의 개인정보를 어떻게 수집·이용·보관·파기하는지 안내합니다.`,
  alternates: { canonical: '/arke/privacy' },
  robots: { index: true, follow: true },
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function ArkePrivacyPage() {
  return (
    <article className="ark-legal">
      <header className="ark-legal-head">
        <h1>개인정보처리방침</h1>
        <p className="ark-legal-meta">
          {SERVICE_NAME} · 시행일: {EFFECTIVE_DATE}
        </p>
      </header>

      <p className="ark-legal-intro">
        {COMPANY.name}(이하 &lsquo;회사&rsquo;)는 이용자의 개인정보를 소중히 여기며, 「개인정보 보호법」 등
        관련 법령을 준수합니다. 본 방침은 회사가 제공하는 학습 서비스 {SERVICE_NAME}(이하
        &lsquo;서비스&rsquo;)에서 개인정보를 어떻게 수집·이용·보관·파기하는지 설명합니다.
      </p>

      <Section title="1. 수집하는 개인정보 항목">
        <div className="ark-legal-table-wrap">
          <table className="ark-legal-table">
            <thead>
              <tr>
                <th>구분</th>
                <th>항목</th>
                <th>이용 목적</th>
              </tr>
            </thead>
            <tbody>
              {COLLECTED_ITEMS.map((row) => (
                <tr key={row.category}>
                  <td>{row.category}</td>
                  <td>{row.items}</td>
                  <td>{row.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          회사는 주민등록번호를 수집하지 않으며, 결제가 필요한 경우 카드정보 등 결제정보는 결제대행사가
          직접 처리하고 회사는 보관하지 않습니다.
        </p>
      </Section>

      <Section title="2. 개인정보의 이용 목적">
        <p>
          회원 식별 및 로그인 유지, 학습 기록 저장과 복원, 오답 진단 및 맞춤 문항 추천, 학습 리포트 제공,
          서비스 개선을 위한 통계 분석, 공지사항 등 필수 안내 전달을 위해 개인정보를 이용합니다.
        </p>
      </Section>

      <Section title="3. 보유 및 이용 기간">
        <p>
          회원 탈퇴 시 개인정보를 <strong>지체 없이 파기</strong>합니다. 다만 관계 법령에 따라 보존이
          필요한 경우 해당 기간 동안 보관합니다.
        </p>
        <p className="ark-legal-fine">
          · 전자상거래법에 따른 계약·청약철회 기록: 5년
          <br />· 대금결제 및 재화 공급 기록: 5년
          <br />· 소비자 불만 또는 분쟁처리 기록: 3년
          <br />· 통신비밀보호법에 따른 접속 기록: 3개월
        </p>
      </Section>

      <Section title="4. 개인정보 처리의 위탁 및 국외 이전">
        <p>
          회사는 안정적인 서비스 제공을 위해 아래와 같이 개인정보 처리를 위탁하고 있으며, 해당 사업자의
          서버가 국외에 위치하여 개인정보가 국외로 이전됩니다.
        </p>
        <div className="ark-legal-table-wrap">
          <table className="ark-legal-table">
            <thead>
              <tr>
                <th>수탁자</th>
                <th>목적</th>
                <th>항목</th>
                <th>국가</th>
              </tr>
            </thead>
            <tbody>
              {PROCESSORS.map((p) => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  <td>{p.purpose}</td>
                  <td>{p.items}</td>
                  <td>{p.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ark-legal-fine">
          이전 시기 및 방법: 서비스 이용 시점에 네트워크를 통해 안전하게 전송됩니다. 이용자는 개인정보의
          국외 이전을 거부할 수 있으나, 이 경우 서비스 이용이 제한될 수 있습니다.
        </p>
      </Section>

      <Section title="5. 만 14세 미만 아동의 개인정보">
        <p>
          서비스는 고등학생을 주 대상으로 하며,{' '}
          <strong>만 14세 미만 아동의 가입을 받지 않습니다.</strong> 만 14세 미만 아동의 개인정보가
          법정대리인의 동의 없이 수집된 사실을 알게 되면 지체 없이 해당 정보를 파기합니다.
        </p>
        <p>
          미성년 이용자의 법정대리인은 자녀의 개인정보 열람·정정·삭제 및 처리정지를 요구할 수 있으며, 아래
          문의처로 연락하시면 신속히 처리해 드립니다.
        </p>
      </Section>

      <Section title="6. 이용자의 권리와 행사 방법">
        <p>
          이용자는 언제든지 자신의 개인정보에 대해 열람·정정·삭제·처리정지를 요구할 수 있습니다. 서비스 내
          설정에서 직접 확인·수정하거나, 아래 문의처로 요청하시면 지체 없이 조치합니다.
        </p>
      </Section>

      <Section title="7. 개인정보의 파기 절차 및 방법">
        <p>
          보유 기간이 지났거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다. 전자적 파일은 복구가
          불가능한 방법으로 영구 삭제하며, 출력물은 분쇄하거나 소각합니다.
        </p>
      </Section>

      <Section title="8. 개인정보의 안전성 확보 조치">
        <p>
          회사는 개인정보 접근 권한을 최소한의 인원으로 제한하고, 전송 구간을 암호화(HTTPS)하며,
          데이터베이스에 행 수준 보안(RLS)을 적용해 이용자가 본인의 데이터에만 접근하도록 통제합니다.
        </p>
      </Section>

      <Section title="9. 개인정보보호책임자 및 문의처">
        <div className="ark-legal-box">
          <div>상호: {COMPANY.name}</div>
          <div>대표자: {COMPANY.ceo}</div>
          <div>주소: {COMPANY.address}</div>
          <div>사업자등록번호: {COMPANY.bizNumber}</div>
          <div>통신판매업신고: {COMPANY.mailorder}</div>
          <div>개인정보보호책임자: {COMPANY.privacyOfficer}</div>
          <div>
            문의: <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </div>
        </div>
        <p className="ark-legal-fine" style={{ marginTop: 12 }}>
          개인정보 침해에 대한 신고·상담이 필요하면 개인정보침해신고센터(privacy.kisa.or.kr, 국번없이 118),
          대검찰청 사이버수사과(spo.go.kr, 1301), 경찰청 사이버수사국(ecrm.police.go.kr, 182)에 문의하실 수
          있습니다.
        </p>
      </Section>

      <Section title="10. 방침의 변경">
        <p>
          법령이나 서비스 내용의 변경에 따라 본 방침이 개정될 수 있으며, 변경 시 서비스 내 공지를 통해
          시행일 최소 7일 전에 알려드립니다. 이용자에게 불리한 중대한 변경의 경우 30일 전에 공지합니다.
        </p>
      </Section>

      <footer className="ark-legal-foot">
        <Link href="/arke/terms">이용약관</Link>
        <span>·</span>
        <Link href="/arke">ARKE 홈</Link>
      </footer>
    </article>
  );
}
