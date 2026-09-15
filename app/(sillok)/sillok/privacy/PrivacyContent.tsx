'use client';

/* 원본 sillok/site/privacy.html 의 본문을 기계 변환한 것. 법률 문서라 회사명 표기 외에는 한 글자도 고치지 않았다.
   scripts/conv_sillok.py 로 찍어낸 파일이다 — 문구를 고칠 일이 생기면
   sillok/site 쪽 HTML 을 먼저 고치고 생성기를 다시 돌리는 편이 안전하다. */

export default function PrivacyContent() {
  return (
    <>
      <div className="sl-wrap sl-doc">

        <div className="sl-doc-head">
          <h1>개인정보처리방침<br />Privacy Policy</h1>
          <div className="sl-sub">조선왕조실록 — 왕의 선택 · Joseon Annals: King's Choice</div>
          <div className="sl-rev">시행일 2026년 8월 29일 · Effective 29 August 2026</div>
        </div>

        <div className="sl-callout sl-red">
          <p><b>이 앱은 어떤 개인정보도 수집하지 않습니다.</b>{' '}계정도 회원가입도 없고, 광고도 인앱결제도 없으며, 앱이 서버와 정보를 주고받지 않습니다. 분석 도구와 제3자 SDK를 넣지 않았습니다. 모든 데이터는 기기 안에만 저장되고, 앱을 삭제하면 함께 사라집니다.</p>
          <p style={{ marginTop: "10px" }}><b>This app collects no personal information of any kind.</b>{' '}There is no account and no sign-up, no advertising and no in-app purchases, and the app exchanges no information with any server. No analytics and no third-party SDKs are included. All data stays on the device and is erased together with the app.</p>
        </div>

        {/* ── 1 ── */}
        <section>
          <h2>1. 수집하는 개인정보 항목</h2>
          <p>수집하는 항목이{' '}<strong>없습니다.</strong>{' '}아래 표는 모바일 앱에서 흔히 수집되는 항목을 이 앱이 어떻게 처리하는지 밝힌 것입니다. 자동으로 수집되는 항목도 없습니다.</p>

          <div className="sl-table-wrap">
            <table>
              <thead>
                <tr><th>항목 · Item</th><th>처리 · Handling</th></tr>
              </thead>
              <tbody>
                <tr><td>이름, 생년월일, 성별{' '}<br /><span style={{ color: "var(--ink-3)", fontSize: "13px" }}>Name, date of birth, gender</span></td><td>수집하지 않음 · Not collected</td></tr>
                <tr><td>이메일 주소, 전화번호{' '}<br /><span style={{ color: "var(--ink-3)", fontSize: "13px" }}>Email address, phone number</span></td><td>수집하지 않음 · Not collected</td></tr>
                <tr><td>주소, 위치 정보{' '}<br /><span style={{ color: "var(--ink-3)", fontSize: "13px" }}>Address, location data</span></td><td>수집하지 않음 · Not collected</td></tr>
                <tr><td>연락처, 사진, 마이크, 카메라{' '}<br /><span style={{ color: "var(--ink-3)", fontSize: "13px" }}>Contacts, photos, microphone, camera</span></td><td>권한을 요청하지 않음 · No permission requested</td></tr>
                <tr><td>기기 식별자, 광고 식별자(IDFA){' '}<br /><span style={{ color: "var(--ink-3)", fontSize: "13px" }}>Device identifiers, advertising identifier</span></td><td>수집·조회하지 않음 · Neither collected nor read</td></tr>
                <tr><td>IP 주소, 접속 기록{' '}<br /><span style={{ color: "var(--ink-3)", fontSize: "13px" }}>IP address, access logs</span></td><td>수집하지 않음(서버 없음) · Not collected (no server)</td></tr>
                <tr><td>사용 기록, 이용 통계{' '}<br /><span style={{ color: "var(--ink-3)", fontSize: "13px" }}>Usage data, analytics</span></td><td>수집·전송하지 않음 · Neither collected nor transmitted</td></tr>
                <tr><td>결제 정보{' '}<br /><span style={{ color: "var(--ink-3)", fontSize: "13px" }}>Payment information</span></td><td>앱이 접근하지 않음 · Not accessible to the app</td></tr>
              </tbody>
            </table>
          </div>

          <div className="sl-en-block">
            <h3>1. Personal information we collect</h3>
            <p><strong>None.</strong>{' '}The table above lists the items mobile apps commonly collect and states how this app treats each one. Nothing is collected automatically either.</p>
          </div>
        </section>

        {/* ── 2 ── */}
        <section>
          <h2>2. 기기에 저장되는 정보</h2>
          <p>게임을 이어서 하려면 진행 상황을 어딘가에 적어 두어야 합니다. 이 앱은 그것을{' '}<strong>기기 안의 localStorage</strong>에만 적습니다. 저장되는 내용은 다음과 같습니다.</p>
          <ul className="sl-bullets">
            <li>왕조 모드 진행 위치와 네 가지 지표(민심·국고·국방·문화), 점수</li>
            <li>해금한 왕·인물·사초 도감 목록</li>
            <li>최고 점수와 등급</li>
            <li>설정값 — 언어(한국어/영어), 배경음악·효과음 켜짐 여부, 읽어주기 여부, 글자 크기</li>
          </ul>
          <p>이 값들은{' '}<strong>사람을 식별하지 않는 게임 진행 기록</strong>이며, 기기 밖으로 나가지 않습니다. 저희는 이 값을 볼 수 없고, 받지도 않으며, 보관하지도 않습니다. 앱을 삭제하면 이 저장 공간도 함께 삭제되고 복구할 방법은 없습니다.</p>

          <div className="sl-en-block">
            <h3>2. Information stored on your device</h3>
            <p>To let a game be continued, progress has to be written down somewhere. This app writes it only to{' '}<strong>localStorage on the device itself</strong>:</p>
            <ul className="sl-bullets">
              <li>Position in the dynasty run, the four stats (People, Treasury, Defense, Culture) and the score</li>
              <li>Which kings, figures and record fragments have been unlocked</li>
              <li>Best score and grade</li>
              <li>Settings — language (Korean/English), music and sound effects, read-aloud, text size</li>
            </ul>
            <p>These values are{' '}<strong>game progress that identifies no one</strong>, and they never leave the device. We cannot see them, we do not receive them, and we do not store them. Deleting the app deletes this storage as well, with no way to recover it.</p>
          </div>
        </section>

        {/* ── 3 ── */}
        <section>
          <h2>3. 네트워크 통신 · 광고 · 분석</h2>
          <p>이 앱은 게임을 하기 위해 인터넷을 사용하지 않습니다. 비행기 모드에서도 처음부터 끝까지 동작합니다. 다음 항목이 앱에{' '}<strong>포함되어 있지 않습니다.</strong></p>
          <ul className="sl-bullets">
            <li>광고 네트워크 및 광고 SDK</li>
            <li>이용 통계·분석 도구(애널리틱스)</li>
            <li>충돌 보고(크래시 리포팅) 도구</li>
            <li>소셜 로그인, 소셜 공유 SDK</li>
            <li>푸시 알림</li>
            <li>그 밖의 모든 제3자 SDK</li>
          </ul>
          <p>읽어주기 기능은 iOS에 내장된 음성 합성을 사용하며, 이를 위해 텍스트를 외부로 전송하지 않습니다.</p>

          <div className="sl-en-block">
            <h3>3. Network, advertising and analytics</h3>
            <p>The app does not use the internet to play. It runs from start to finish in airplane mode. The following are{' '}<strong>not present in the app:</strong>{' '}advertising networks and ad SDKs; analytics; crash reporting; social login or social sharing SDKs; push notifications; and any other third-party SDK.</p>
            <p>Read-aloud uses the speech synthesis built into iOS and sends no text anywhere.</p>
          </div>
        </section>

        {/* ── 4 ── */}
        <section>
          <h2>4. 제3자 제공 및 처리위탁</h2>
          <p>수집하는 개인정보가 없으므로{' '}<strong>제3자에게 제공하는 개인정보도, 처리를 위탁하는 개인정보도 없습니다.</strong>{' '}국외로 이전되는 개인정보도 없습니다.</p>

          <div className="sl-en-block">
            <h3>4. Sharing and processors</h3>
            <p>Because no personal information is collected,{' '}<strong>none is shared with third parties, none is handed to processors, and none is transferred outside the country.</strong></p>
          </div>
        </section>

        {/* ── 5 ── */}
        <section>
          <h2>5. 아동의 개인정보 (만 14세 미만 · COPPA)</h2>
          <p>이 앱은 초등학교 3~6학년 아동이 주된 이용자입니다. 아동 이용자를 전제로 다음을 지킵니다.</p>
          <ul className="sl-bullets">
            <li>아동을 포함한{' '}<strong>모든 이용자로부터 개인정보를 일절 수집하지 않습니다.</strong>{' '}이름도, 나이도, 이메일도, 어떤 식별자도 묻지 않습니다.</li>
            <li>수집하는 개인정보가 없으므로 「개인정보 보호법」상{' '}<strong>만 14세 미만 아동의 법정대리인 동의를 받아야 하는 절차가 발생하지 않습니다.</strong>{' '}동의를 받을 대상 자체가 없기 때문입니다.</li>
            <li>같은 이유로 미국 「아동 온라인 개인정보 보호법(COPPA)」이 만 13세 미만 아동에게 요구하는{' '}<strong>검증 가능한 부모 동의(verifiable parental consent) 절차도 필요하지 않습니다.</strong>{' '}COPPA는 아동으로부터 개인정보를 수집할 때 적용되며, 이 앱은 수집하지 않습니다.</li>
            <li>아동에게 노출되는{' '}<strong>광고가 없고,</strong>{' '}아동이 지출할 수 있는{' '}<strong>인앱결제가 없습니다.</strong></li>
            <li>아동이 앱 밖으로 나갈 수 있는 링크를 두지 않았습니다. 문의용 이메일 주소는 설정 화면의{' '}<strong>보호자 확인 절차 뒤에</strong>{' '}있습니다.</li>
            <li>다른 이용자와 대화하거나 내용을 주고받는 기능이 없습니다.</li>
          </ul>
          <p>보호자께서 아이의 기기에서 이 앱과 관련된 모든 데이터를 지우고 싶으시면,{' '}<strong>앱을 삭제하시면 됩니다.</strong>{' '}그것으로 기기에 남는 데이터가 없습니다. 저희에게 요청하실 것은 없습니다.</p>

          <div className="sl-en-block">
            <h3>5. Children's privacy (under 14 in Korea · COPPA)</h3>
            <ul className="sl-bullets">
              <li>The app's primary users are children roughly 9 to 12 years old, and{' '}<strong>no personal information is collected from any user, children included</strong>{' '}— no name, no age, no email, no identifier of any kind.</li>
              <li>Because nothing is collected,{' '}<strong>the legal-guardian consent procedure that Korea's Personal Information Protection Act requires for children under 14 does not arise</strong>{' '}— there is nothing to consent to.</li>
              <li>For the same reason, the{' '}<strong>verifiable parental consent required by the U.S. Children's Online Privacy Protection Act (COPPA) for children under 13 is not applicable.</strong>{' '}COPPA applies to the collection of personal information from children; this app collects none.</li>
              <li>There is{' '}<strong>no advertising</strong>{' '}shown to children and{' '}<strong>no in-app purchase</strong>{' '}a child could spend money on.</li>
              <li>There are no links a child can follow out of the app. The contact address sits behind a{' '}<strong>parental check</strong>{' '}in Settings.</li>
              <li>There is no chat and no way to exchange content with other users.</li>
            </ul>
            <p>A guardian who wants every trace of this app removed from a child's device can simply{' '}<strong>delete the app.</strong>{' '}Nothing remains, and there is nothing to request from us.</p>
          </div>
        </section>

        {/* ── 6 ── */}
        <section>
          <h2>6. 이용자의 권리</h2>
          <p>「개인정보 보호법」은 정보주체에게 개인정보의 열람·정정·삭제·처리정지를 요구할 권리를 보장합니다. 이 앱은{' '}<strong>개인정보를 보유하고 있지 않으므로 열람하거나 정정하거나 삭제해 드릴 대상이 없습니다.</strong>{' '}기기에 저장된 게임 진행 기록은 이용자가 직접 통제하며, 앱을 삭제하면 즉시 완전히 사라집니다.</p>
          <p>이 방침의 내용이나 앱의 처리 방식에 대해 확인하고 싶은 점이 있으시면 아래 주소로 문의해 주십시오.</p>

          <div className="sl-en-block">
            <h3>6. Your rights</h3>
            <p>Korean law grants data subjects the right to access, correct, delete and suspend the processing of their personal information. As this app{' '}<strong>holds none, there is nothing to access, correct or delete.</strong>{' '}The game progress stored on the device is entirely under the user's control and disappears the moment the app is deleted. Questions about this policy are welcome at the address below.</p>
          </div>
        </section>

        {/* ── 7 ── */}
        <section>
          <h2>7. 안전성 확보 조치</h2>
          <p>개인정보를 전송하지 않고 보관하지 않는 것이 이 앱이 택한 보호 방법입니다. 유출될 개인정보를 애초에 만들지 않는 편이 확실하다고 판단했습니다. 앱에는 서버도, 데이터베이스도, 로그도 없습니다.</p>

          <div className="sl-en-block">
            <h3>7. Security</h3>
            <p>Transmitting nothing and storing nothing is this app's security measure. We judged it more reliable never to create personal data than to guard it. There is no server, no database and no log.</p>
          </div>
        </section>

        {/* ── 8 ── */}
        <section>
          <h2>8. 결제</h2>
          <p>이 앱은 한 번 구매하면 모든 내용을 이용할 수 있는 유료 앱이며, 인앱결제가 없습니다. 구매는 App Store를 통해 이루어지고 결제 수단과 청구 정보는 App Store 운영자가 처리합니다.{' '}<strong>앱은 결제 정보에 접근하지 않으며 저희는 이를 전달받지 않습니다.</strong>{' '}환불은 App Store의 환불 절차를 따릅니다.</p>

          <div className="sl-en-block">
            <h3>8. Payment</h3>
            <p>This is a paid app with no in-app purchases; one purchase unlocks everything. Purchases are made through the App Store, and payment methods and billing details are handled by the App Store operator.{' '}<strong>The app has no access to payment information and we never receive it.</strong>{' '}Refunds follow the App Store's refund process.</p>
          </div>
        </section>

        {/* ── 9 ── */}
        <section>
          <h2>9. 개인정보 보호책임자 및 문의처</h2>
          <div className="sl-contact">
            <div style={{ fontSize: "14px", color: "var(--ink-3)" }}>주식회사 예아플러스(yeahplus) · 개인정보 보호책임자</div>
            <a className="sl-mail" href="mailto:cto@yeahplus.co.kr">cto@yeahplus.co.kr</a>
            <div className="sl-note">보통 영업일 기준 2~3일 안에 답변드립니다.<br />{' '}We usually reply within two to three business days.</div>
          </div>
          <p style={{ marginTop: "16px" }}>개인정보 침해에 관한 상담이 필요하시면 개인정보침해신고센터(privacy.kisa.or.kr, 국번없이 118), 개인정보 분쟁조정위원회(kopico.go.kr) 등에 문의하실 수 있습니다.</p>

          <div className="sl-en-block">
            <h3>9. Contact</h3>
            <p>yeahplus, Privacy Officer —{' '}<a href="mailto:cto@yeahplus.co.kr">cto@yeahplus.co.kr</a>. Korean users may also contact the Korea Internet &amp; Security Agency privacy report centre (privacy.kisa.or.kr, dial 118) or the Personal Information Dispute Mediation Committee (kopico.go.kr).</p>
          </div>
        </section>

        {/* ── 10 ── */}
        <section>
          <h2>10. 방침의 변경</h2>
          <p>이 방침이 바뀌면 변경 내용과 시행일을 이 페이지에 게시합니다. 앱의 처리 방식이 지금과 달라지는 변경이라면, 앱 업데이트 설명에도 함께 밝히겠습니다.</p>
          <p>현재 버전 시행일:{' '}<strong>2026년 8월 29일</strong></p>

          <div className="sl-en-block">
            <h3>10. Changes to this policy</h3>
            <p>Any change will be posted on this page with its effective date. If a change alters how the app handles data, it will also be stated in the app's update notes. Current version effective{' '}<strong>29 August 2026</strong>.</p>
          </div>
        </section>

      </div>{/* /doc */}
    </>
  );
}
