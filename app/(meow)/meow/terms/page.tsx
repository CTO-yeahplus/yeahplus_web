import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 — MYOHAE (묘해)',
  description: '묘해(MYOHAE) 서비스 이용약관',
};

export default function TermsPage() {
  return (
    <article className="doc">
      <h1>이용약관</h1>
      <p className="updated">시행일: 2026-07-21 · 최종 개정일: 2026-07-21</p>

      <h2>제1조 (목적)</h2>
      <p>
        본 약관은 주식회사 예아플러스(이하 &ldquo;회사&rdquo;)가 제공하는 모바일 애플리케이션 &ldquo;묘해(MYOHAE)&rdquo; 및 관련
        제반 서비스(이하 &ldquo;서비스&rdquo;)의 이용과 관련하여 회사와 이용자 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.
      </p>

      <h2>제2조 (정의)</h2>
      <ul>
        <li>&ldquo;이용자&rdquo;란 본 약관에 따라 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
        <li>&ldquo;회원&rdquo;이란 회사에 개인정보를 제공하여 계정을 생성하고 서비스를 이용하는 자를 말합니다.</li>
        <li>&ldquo;콘텐츠&rdquo;란 이용자가 서비스 내에서 생성·업로드·게시하는 사진, 이미지, 텍스트 등 일체의 자료를 말합니다.</li>
      </ul>

      <h2>제3조 (약관의 효력 및 변경)</h2>
      <p>
        본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다. 회사는 관련 법령을 위반하지
        않는 범위에서 약관을 변경할 수 있으며, 변경 시 적용일자 및 사유를 명시하여 사전에 공지합니다.
      </p>

      <h2>제4조 (서비스의 내용)</h2>
      <p>회사는 다음의 서비스를 제공합니다.</p>
      <ul>
        <li>사진 꾸미기(스티커·프레임·배경 등) 및 AI 이미지 변환</li>
        <li>커뮤니티 피드 열람, 게시물 작성·공유 및 소셜 기능(좋아요·댓글·팔로우 등)</li>
        <li>디지털 에셋 및 구독 등 유료 서비스</li>
        <li>기타 회사가 정하는 서비스</li>
      </ul>
      <p>커뮤니티 피드 열람 등 일부 기능은 비회원도 이용할 수 있으며, 계정 기반 기능은 회원 가입 후 이용할 수 있습니다.</p>

      <h2>제5조 (계정 및 관리 책임)</h2>
      <p>
        이용자는 Apple, Google, Kakao 계정 또는 이메일을 통해 회원 가입할 수 있습니다. 이용자는 자신의 계정 정보를 안전하게 관리할
        책임이 있으며, 계정의 부정 사용을 인지한 경우 즉시 회사에 통지해야 합니다. 회원은 서비스 내 설정을 통해 언제든지 계정을 삭제할 수 있습니다.
      </p>

      <h2>제6조 (이용자 콘텐츠 및 라이선스)</h2>
      <p>
        이용자가 생성·게시한 콘텐츠의 저작권은 해당 이용자에게 있습니다. 다만 이용자는 서비스의 운영·개선 및 홍보(피드 노출, 공유
        기능 등)를 위해 필요한 범위에서 회사가 해당 콘텐츠를 사용·복제·전송·전시할 수 있는 비독점적 라이선스를 부여합니다.
      </p>
      <p>
        이용자는 자신이 게시하는 콘텐츠에 대해 적법한 권리를 보유하고 있어야 하며, 제3자의 저작권·초상권 등 권리를 침해하지 않아야 합니다.
      </p>

      <h2>제7조 (금지행위)</h2>
      <ul>
        <li>타인의 권리를 침해하거나 불법·음란·폭력적이거나 타인을 비방·차별하는 콘텐츠의 게시</li>
        <li>서비스의 정상적인 운영을 방해하는 행위 및 자동화된 수단의 무단 사용</li>
        <li>타인의 계정·개인정보를 도용하거나 허위 정보를 등록하는 행위</li>
        <li>회사의 사전 동의 없이 서비스를 상업적으로 이용하는 행위</li>
      </ul>

      <h2>제8조 (유료 서비스 및 결제·환불)</h2>
      <p>
        구독, 크레딧(츄르), 디지털 에셋 등 유료 서비스의 결제는 Apple App Store 및 Google Play 등 각 앱 마켓의 인앱결제를 통해
        이루어집니다. 구독의 관리·해지 및 환불은 각 마켓의 정책과 절차에 따르며, 관련 법령에서 정한 이용자의 청약철회권은 보장됩니다.
      </p>

      <h2>제9조 (지식재산권)</h2>
      <p>
        서비스 및 서비스에 포함된 소프트웨어, 디자인, 상표, 회사가 제공하는 에셋 등에 대한 지식재산권은 회사 또는 정당한 권리자에게
        귀속됩니다. 이용자는 회사의 사전 서면 동의 없이 이를 복제·배포·2차적저작물 작성 등의 방법으로 이용할 수 없습니다.
      </p>

      <h2>제10조 (서비스의 변경 및 중단)</h2>
      <p>
        회사는 서비스의 전부 또는 일부를 운영상·기술상 필요에 따라 변경하거나 중단할 수 있으며, 이 경우 관련 법령에 따라 사전에
        공지합니다.
      </p>

      <h2>제11조 (면책 및 책임의 제한)</h2>
      <p>
        회사는 천재지변, 이용자의 귀책사유, 제3자의 행위 등 회사의 통제 범위를 벗어난 사유로 발생한 손해에 대하여 책임을 지지 않습니다.
        회사는 이용자가 게시한 콘텐츠의 신뢰성·정확성에 대해 보증하지 않습니다. 본 조는 관련 법령이 허용하는 최대 범위 내에서 적용됩니다.
      </p>

      <h2>제12조 (준거법 및 관할)</h2>
      <p>
        본 약관은 대한민국 법률에 따라 규율되며, 서비스 이용과 관련하여 분쟁이 발생한 경우 관련 법령이 정한 절차에 따른 법원을 관할
        법원으로 합니다.
      </p>

      <h2>제13조 (문의)</h2>
      <p>
        본 약관에 관한 문의는 <a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a> 으로 연락 주시기 바랍니다.
      </p>
      <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 24, lineHeight: 1.7 }}>
        상호: 주식회사 예아플러스 · 대표자: 고재혁 · 사업자등록번호: 283-88-02519
        <br />
        통신판매업신고번호: 2022-경기파주-2995
        <br />
        주소: 경기도 파주시 교하로159번길 33, 3층 304호 에이318(목동동, 목동프라자)
      </p>

      {/* ───────────────────────── English version ───────────────────────── */}
      <hr style={{ margin: '48px 0', border: 0, borderTop: '1px solid var(--border)' }} />

      <h1>Terms of Service</h1>
      <p className="updated">Effective date: 2026-07-21 · Last updated: 2026-07-21</p>
      <p style={{ color: 'var(--muted)', fontSize: 13 }}>
        This is an English translation provided for convenience. In the event of any conflict between the
        Korean and English versions, the Korean version prevails.
      </p>

      <h2>Article 1 (Purpose)</h2>
      <p>
        These Terms govern the rights, obligations, and responsibilities between yeahplus Co., Ltd.
        (the &ldquo;Company&rdquo;) and users in connection with the use of the mobile application
        &ldquo;MYOHAE&rdquo; and all related services (the &ldquo;Service&rdquo;) provided by the Company.
      </p>

      <h2>Article 2 (Definitions)</h2>
      <ul>
        <li>&ldquo;User&rdquo; means any member or non-member who uses the Service under these Terms.</li>
        <li>&ldquo;Member&rdquo; means a person who creates an account by providing personal information to the Company and uses the Service.</li>
        <li>&ldquo;Content&rdquo; means any and all materials — including photos, images, and text — that a User creates, uploads, or posts within the Service.</li>
      </ul>

      <h2>Article 3 (Effect and Amendment of the Terms)</h2>
      <p>
        These Terms take effect when posted on the Service screen or otherwise notified to Users. The Company
        may amend these Terms within the scope permitted by applicable law, and will announce any amendment in
        advance, specifying the effective date and the reason for the change.
      </p>

      <h2>Article 4 (Service Content)</h2>
      <p>The Company provides the following services.</p>
      <ul>
        <li>Photo decoration (stickers, frames, backgrounds, etc.) and AI image transformation</li>
        <li>Viewing the community feed, creating and sharing posts, and social features (likes, comments, follows, etc.)</li>
        <li>Paid services such as digital assets and subscriptions</li>
        <li>Other services determined by the Company</li>
      </ul>
      <p>Some features, such as viewing the community feed, are available to non-members, while account-based features are available after signing up.</p>

      <h2>Article 5 (Accounts and Responsibility for Management)</h2>
      <p>
        Users may sign up via an Apple, Google, or Kakao account, or by email. Users are responsible for
        securely managing their own account information and must notify the Company immediately upon becoming
        aware of any unauthorized use of their account. Members may delete their account at any time through the
        in-service settings.
      </p>

      <h2>Article 6 (User Content and License)</h2>
      <p>
        Copyright in the Content created and posted by a User belongs to that User. However, the User grants the
        Company a non-exclusive license to use, reproduce, transmit, and display such Content to the extent
        necessary to operate, improve, and promote the Service (e.g., feed display and sharing features).
      </p>
      <p>
        Users must hold lawful rights to the Content they post and must not infringe the copyrights, portrait
        rights, or other rights of any third party.
      </p>

      <h2>Article 7 (Prohibited Conduct)</h2>
      <ul>
        <li>Posting Content that infringes others&rsquo; rights or that is illegal, obscene, violent, or defamatory or discriminatory toward others</li>
        <li>Interfering with the normal operation of the Service and the unauthorized use of automated means</li>
        <li>Misappropriating another person&rsquo;s account or personal information, or registering false information</li>
        <li>Using the Service for commercial purposes without the Company&rsquo;s prior consent</li>
      </ul>

      <h2>Article 8 (Paid Services, Payment, and Refunds)</h2>
      <p>
        Payment for paid services such as subscriptions, credits (&ldquo;Churu&rdquo;), and digital assets is made
        through the in-app purchase systems of each app marketplace, including the Apple App Store and Google
        Play. Management, cancellation, and refunds of subscriptions follow the policies and procedures of each
        marketplace, and Users&rsquo; right of withdrawal as provided by applicable law is guaranteed.
      </p>

      <h2>Article 9 (Intellectual Property)</h2>
      <p>
        Intellectual property rights in the Service and in the software, designs, trademarks, and assets provided
        by the Company belong to the Company or its rightful owners. Users may not reproduce, distribute, or
        create derivative works from these without the Company&rsquo;s prior written consent.
      </p>

      <h2>Article 10 (Change and Suspension of the Service)</h2>
      <p>
        The Company may change or suspend all or part of the Service as required for operational or technical
        reasons, and in such cases will provide advance notice in accordance with applicable law.
      </p>

      <h2>Article 11 (Disclaimer and Limitation of Liability)</h2>
      <p>
        The Company is not liable for damages arising from causes beyond its control, including force majeure,
        the User&rsquo;s fault, or the acts of third parties. The Company does not guarantee the reliability or
        accuracy of Content posted by Users. This Article applies to the maximum extent permitted by applicable law.
      </p>

      <h2>Article 12 (Governing Law and Jurisdiction)</h2>
      <p>
        These Terms are governed by the laws of the Republic of Korea. Any dispute arising in connection with use
        of the Service shall be subject to the court determined in accordance with applicable law.
      </p>

      <h2>Article 13 (Contact)</h2>
      <p>
        For inquiries regarding these Terms, please contact <a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a>.
      </p>
      <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 24, lineHeight: 1.7 }}>
        Company: yeahplus Co., Ltd. · Representative: Jaehyuk Ko · Business Registration No.: 283-88-02519
        <br />
        Mail-Order Sales Registration No.: 2022-Gyeonggi Paju-2995
        <br />
        Address: 3F 304-A318, 33 Gyoha-ro 159beon-gil, Paju-si, Gyeonggi-do, Republic of Korea
      </p>
    </article>
  );
}
