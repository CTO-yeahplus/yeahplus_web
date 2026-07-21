import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 — MYOHAE (묘해)',
  description: '묘해(MYOHAE) 개인정보처리방침',
};

export default function PrivacyPage() {
  return (
    <article className="doc">
      <h1>개인정보처리방침</h1>
      <p className="updated">시행일: 2026-07-21 · 최종 개정일: 2026-07-21</p>

      <p>
        주식회사 예아플러스(이하 &ldquo;회사&rdquo;)는 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수합니다.
        본 방침은 묘해(MYOHAE) 서비스(이하 &ldquo;서비스&rdquo;)에서 개인정보가 어떻게 수집·이용·보관·제공되는지 설명합니다.
      </p>

      <h2>1. 수집하는 개인정보 항목</h2>
      <table>
        <thead>
          <tr><th>구분</th><th>항목</th></tr>
        </thead>
        <tbody>
          <tr><td>계정</td><td>이메일 주소, 소셜 로그인 식별자(Apple/Google/Kakao), 닉네임, 프로필 이미지</td></tr>
          <tr><td>콘텐츠</td><td>이용자가 업로드한 사진 및 생성 결과물, 고양이 프로필(이름·품종·생일 등 이용자가 입력한 정보)</td></tr>
          <tr><td>이용/기기</td><td>서비스 이용 기록, 기기 정보, 푸시 알림 토큰, 접속 로그, 쿠키/유사 기술</td></tr>
          <tr><td>결제</td><td>구독·구매 내역(결제 자체는 App Store/Google Play를 통해 처리되며, 회사는 카드 등 결제수단 정보를 저장하지 않습니다)</td></tr>
        </tbody>
      </table>

      <h2>2. 수집·이용 목적</h2>
      <ul>
        <li>회원 식별 및 계정 관리, 로그인·인증</li>
        <li>사진 꾸미기·AI 이미지 변환 등 핵심 기능 제공</li>
        <li>커뮤니티 게시·공유 및 소셜 기능 제공</li>
        <li>유료 서비스 제공 및 구매 내역 관리</li>
        <li>서비스 개선, 오류 분석, 통계, 부정 이용 방지</li>
        <li>공지·문의 응대 및 (동의 시) 알림 발송</li>
      </ul>

      <h2>3. 보유 및 이용 기간</h2>
      <p>
        회사는 원칙적으로 개인정보의 수집·이용 목적이 달성되거나 회원 탈퇴 시 지체 없이 파기합니다. 다만 관련 법령에 따라 보존이
        필요한 경우 해당 기간 동안 보관합니다(예: 전자상거래 등에서의 소비자 보호에 관한 법률에 따른 거래 기록 등).
      </p>

      <h2>4. 처리위탁 및 제3자 제공</h2>
      <p>회사는 안정적인 서비스 제공을 위해 아래와 같이 개인정보 처리를 위탁하거나 제3자 서비스를 이용합니다.</p>
      <table>
        <thead>
          <tr><th>수탁사/제공받는 자</th><th>목적</th></tr>
        </thead>
        <tbody>
          <tr><td>클라우드·백엔드 제공사 (예: Supabase 등)</td><td>인증, 데이터베이스, 이미지 저장·전송</td></tr>
          <tr><td>소셜 로그인 제공사 (Apple, Google, Kakao)</td><td>간편 로그인 및 계정 인증</td></tr>
          <tr><td>AI 이미지 처리 제공사</td><td>사진의 AI 변환 처리</td></tr>
          <tr><td>분석·오류 리포팅 제공사 (예: Amplitude 등)</td><td>이용 통계 및 서비스 품질 개선</td></tr>
          <tr><td>앱 마켓 (Apple, Google)</td><td>인앱 결제 처리</td></tr>
        </tbody>
      </table>
      <p>회사는 법령에 근거하거나 이용자의 동의가 있는 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다.</p>

      <h2>5. 개인정보의 국외 이전</h2>
      <p>
        위 수탁사 중 일부는 국외에 서버를 둘 수 있으며, 이 경우 서비스 제공에 필요한 범위에서 개인정보가 국외로 이전·처리될 수
        있습니다. 회사는 관련 법령이 요구하는 보호조치를 취하며, 국외 이전이 발생하는 경우 이전받는 자·이전 국가·이전 항목 및 시점·
        보유기간 등 구체적인 사항을 본 방침 또는 별도 고지를 통해 안내합니다.
      </p>

      <h2>6. 이용자의 권리</h2>
      <p>
        이용자는 언제든지 자신의 개인정보에 대한 열람·정정·삭제·처리정지를 요청할 수 있으며, 앱 내 설정에서 계정 삭제를 진행할 수
        있습니다. 동의를 철회하거나 권리 행사를 원하는 경우 아래 문의처로 연락 주시기 바랍니다.
      </p>

      <h2>7. 개인정보의 파기</h2>
      <p>
        보유 기간이 경과하거나 처리 목적이 달성된 개인정보는 지체 없이 파기합니다. 전자적 파일은 복구가 불가능한 방법으로 삭제하며,
        출력물은 분쇄 또는 소각합니다.
      </p>

      <h2>8. 아동의 개인정보</h2>
      <p>
        서비스는 관련 법령 및 앱 마켓 정책에 따른 연령 기준을 준수합니다. 만 14세 미만(또는 각 국가에서 정한 연령 미만) 아동의
        개인정보는 원칙적으로 수집하지 않으며, 필요한 경우 법정대리인의 동의 절차를 따릅니다.
      </p>

      <h2>9. 안전성 확보 조치</h2>
      <p>
        회사는 개인정보의 안전한 처리를 위해 접근권한 관리, 전송구간 암호화(HTTPS/TLS), 접근기록 보관 등 관리적·기술적 보호조치를
        시행합니다.
      </p>

      <h2>10. 개인정보 보호책임자 및 문의</h2>
      <p>
        개인정보 관련 문의·불만·피해구제는 아래로 연락 주시기 바랍니다.
      </p>
      <ul>
        <li>개인정보 보호책임자: 고재혁</li>
        <li>이메일: <a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a></li>
        <li>상호: 주식회사 예아플러스 · 대표자: 고재혁 · 사업자등록번호: 283-88-02519</li>
        <li>주소: 경기도 파주시 교하로159번길 33, 3층 304호 에이318(목동동, 목동프라자)</li>
      </ul>

      <h2>11. 방침의 변경</h2>
      <p>
        본 방침은 법령·서비스 변경에 따라 개정될 수 있으며, 변경 시 시행일자 및 변경 내용을 서비스 내 공지 등을 통해 사전에
        알립니다.
      </p>

      {/* ───────────────────────── English version ───────────────────────── */}
      <hr style={{ margin: '48px 0', border: 0, borderTop: '1px solid var(--border)' }} />

      <h1>Privacy Policy</h1>
      <p className="updated">Effective date: 2026-07-21 · Last updated: 2026-07-21</p>
      <p style={{ color: 'var(--muted)', fontSize: 13 }}>
        This is an English translation provided for convenience. In the event of any conflict between the
        Korean and English versions, the Korean version prevails.
      </p>

      <p>
        yeahplus Co., Ltd. (the &ldquo;Company&rdquo;) values users&rsquo; personal information and complies with
        applicable laws, including the Personal Information Protection Act. This Policy explains how personal
        information is collected, used, stored, and provided in the MYOHAE service (the &ldquo;Service&rdquo;).
      </p>

      <h2>1. Personal Information We Collect</h2>
      <table>
        <thead>
          <tr><th>Category</th><th>Items</th></tr>
        </thead>
        <tbody>
          <tr><td>Account</td><td>Email address, social login identifier (Apple/Google/Kakao), nickname, profile image</td></tr>
          <tr><td>Content</td><td>Photos uploaded by the user and generated results, cat profile (name, breed, birthday, and other information entered by the user)</td></tr>
          <tr><td>Usage/Device</td><td>Service usage records, device information, push notification token, access logs, cookies/similar technologies</td></tr>
          <tr><td>Payment</td><td>Subscription/purchase history (payment itself is processed via the App Store/Google Play; the Company does not store payment method information such as card details)</td></tr>
        </tbody>
      </table>

      <h2>2. Purposes of Collection and Use</h2>
      <ul>
        <li>Member identification and account management, login and authentication</li>
        <li>Providing core features such as photo decoration and AI image transformation</li>
        <li>Providing community posting/sharing and social features</li>
        <li>Providing paid services and managing purchase history</li>
        <li>Service improvement, error analysis, statistics, and prevention of misuse</li>
        <li>Notices, responding to inquiries, and (where consented) sending notifications</li>
      </ul>

      <h2>3. Retention and Use Period</h2>
      <p>
        In principle, the Company destroys personal information without delay once the purpose of collection and
        use is achieved or upon membership withdrawal. However, where retention is required by applicable law,
        the information is retained for the relevant period (e.g., transaction records under the Act on Consumer
        Protection in Electronic Commerce).
      </p>

      <h2>4. Outsourcing and Provision to Third Parties</h2>
      <p>The Company outsources the processing of personal information or uses third-party services as follows in order to provide a stable service.</p>
      <table>
        <thead>
          <tr><th>Processor / Recipient</th><th>Purpose</th></tr>
        </thead>
        <tbody>
          <tr><td>Cloud/backend providers (e.g., Supabase)</td><td>Authentication, database, image storage and transmission</td></tr>
          <tr><td>Social login providers (Apple, Google, Kakao)</td><td>Simple login and account authentication</td></tr>
          <tr><td>AI image processing providers</td><td>AI transformation processing of photos</td></tr>
          <tr><td>Analytics/error reporting providers (e.g., Amplitude)</td><td>Usage statistics and service quality improvement</td></tr>
          <tr><td>App marketplaces (Apple, Google)</td><td>In-app payment processing</td></tr>
        </tbody>
      </table>
      <p>The Company does not provide personal information to third parties except where based on law or with the user&rsquo;s consent.</p>

      <h2>5. Overseas Transfer of Personal Information</h2>
      <p>
        Some of the above processors may operate servers overseas, in which case personal information may be
        transferred and processed abroad to the extent necessary to provide the Service. The Company implements
        the protective measures required by applicable law and, where an overseas transfer occurs, provides
        details such as the recipient, destination country, items and timing of transfer, and retention period
        through this Policy or a separate notice.
      </p>

      <h2>6. Users&rsquo; Rights</h2>
      <p>
        Users may at any time request access to, correction of, deletion of, or suspension of processing of their
        personal information, and may delete their account in the app settings. To withdraw consent or exercise
        your rights, please contact us at the address below.
      </p>

      <h2>7. Destruction of Personal Information</h2>
      <p>
        Personal information whose retention period has elapsed or whose processing purpose has been achieved is
        destroyed without delay. Electronic files are deleted by irrecoverable means, and printed materials are
        shredded or incinerated.
      </p>

      <h2>8. Children&rsquo;s Personal Information</h2>
      <p>
        The Service complies with the age standards set by applicable law and app marketplace policies. In
        principle, it does not collect the personal information of children under the age of 14 (or under the age
        set by each country) and, where necessary, follows the consent process of a legal guardian.
      </p>

      <h2>9. Security Measures</h2>
      <p>
        The Company implements administrative and technical safeguards for the secure processing of personal
        information, including access-privilege management, encryption of transmission channels (HTTPS/TLS), and
        retention of access logs.
      </p>

      <h2>10. Data Protection Officer and Contact</h2>
      <p>For inquiries, complaints, or remedies regarding personal information, please contact us below.</p>
      <ul>
        <li>Data Protection Officer: Jaehyuk Ko</li>
        <li>Email: <a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a></li>
        <li>Company: yeahplus Co., Ltd. · Representative: Jaehyuk Ko · Business Registration No.: 283-88-02519</li>
        <li>Address: 3F 304-A318, 33 Gyoha-ro 159beon-gil, Paju-si, Gyeonggi-do, Republic of Korea</li>
      </ul>

      <h2>11. Changes to This Policy</h2>
      <p>
        This Policy may be revised in accordance with changes in law or the Service, and any change will be
        announced in advance, including the effective date and details of the change, through in-service notices
        and other means.
      </p>
    </article>
  );
}
