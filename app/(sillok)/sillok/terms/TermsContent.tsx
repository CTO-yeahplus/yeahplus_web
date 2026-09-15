'use client';

/* 원본 sillok/site/terms.html 의 본문을 기계 변환한 것. 법률 문서라 회사명 표기 외에는 한 글자도 고치지 않았다.
   scripts/conv_sillok.py 로 찍어낸 파일이다 — 문구를 고칠 일이 생기면
   sillok/site 쪽 HTML 을 먼저 고치고 생성기를 다시 돌리는 편이 안전하다. */

export default function TermsContent() {
  return (
    <>
      <div className="sl-wrap sl-doc">

        <div className="sl-doc-head">
          <h1>이용약관<br />Terms of Use</h1>
          <div className="sl-sub">조선왕조실록 — 왕의 선택 · Joseon Annals: King's Choice</div>
          <div className="sl-rev">시행일 2026년 8월 29일 · Effective 29 August 2026</div>
        </div>

        <div className="sl-callout">
          <p>이 약관은 주식회사 예아플러스(yeahplus)가 제공하는 iOS 앱 「조선왕조실록 — 왕의 선택」의 이용 조건을 정합니다. 앱을 내려받아 사용하시면 이 약관에 동의하신 것으로 봅니다.</p>
          <p style={{ marginTop: "10px" }}>These terms govern use of the iOS app "Joseon Annals: King's Choice" provided by yeahplus. Downloading and using the app constitutes acceptance of these terms.</p>
        </div>

        <section>
          <h2>1. 이용 허락의 범위</h2>
          <p>구매하신 분께는 개인적·비상업적 목적으로 앱을 사용할 수 있는, 양도할 수 없는 이용 권한이 부여됩니다. 가정에서의 사용과{' '}<strong>학교 수업 및 학급 활동에서의 사용을 허락합니다.</strong></p>
          <p>다음 행위는 허락되지 않습니다.</p>
          <ul className="sl-bullets">
            <li>앱 또는 앱에 담긴 텍스트·그림·음악을 복제하여 재배포하거나 판매하는 행위</li>
            <li>앱을 역컴파일·역설계하거나 보호 수단을 우회하는 행위</li>
            <li>앱의 콘텐츠를 추출해 별도의 저작물이나 서비스로 재구성하는 행위</li>
            <li>앱 또는 그 일부를 유상으로 대여·양도하는 행위</li>
          </ul>
          <div className="sl-en-block">
            <h3>1. Licence</h3>
            <p>Purchasers receive a non-transferable licence to use the app for personal, non-commercial purposes. Use at home and{' '}<strong>use in school lessons and classroom activities are permitted.</strong>{' '}Not permitted: redistributing or selling the app or its text, artwork or music; decompiling, reverse engineering or circumventing protections; extracting content to build another work or service; and renting or transferring the app or any part of it for a fee.</p>
          </div>
        </section>

        <section>
          <h2>2. 구매 · 환불</h2>
          <p>이 앱은 한 번 구매하면 모든 내용을 이용할 수 있는 유료 앱이며, 인앱결제와 구독이 없습니다. 구매와 환불은 App Store를 통해 이루어지고 그 정책을 따릅니다. 예아플러스는 결제 정보를 전달받지 않으며 직접 환불을 처리할 수 없습니다.</p>
          <div className="sl-en-block">
            <h3>2. Purchase and refunds</h3>
            <p>This is a paid app with no in-app purchases and no subscription; one purchase unlocks everything. Purchases and refunds go through the App Store and follow its policies. yeahplus does not receive payment information and cannot process refunds directly.</p>
          </div>
        </section>

        <section>
          <h2>3. 계정 없음 · 저장 데이터</h2>
          <p>이 앱에는 계정과 회원가입이 없습니다. 게임 진행 상황과 설정은{' '}<strong>이용자 기기 안에만</strong>{' '}저장되며, 예아플러스는 이를 보관하지 않고 접근할 수도 없습니다.</p>
          <p>따라서{' '}<strong>앱 삭제, 기기 초기화, 기기 분실, 기기 저장 공간 부족 등으로 진행 상황이 사라진 경우 복구가 불가능합니다.</strong>{' '}기기 사이 이어하기도 지원하지 않습니다. 자세한 내용은{' '}<a href="/sillok/privacy">개인정보처리방침</a>을 봐 주십시오.</p>
          <div className="sl-en-block">
            <h3>3. No account, and where your data lives</h3>
            <p>The app has no account and no sign-up. Progress and settings are stored{' '}<strong>only on the user's device</strong>; yeahplus neither holds nor can access them. Consequently,{' '}<strong>progress lost through deletion of the app, a device reset, a lost device or insufficient storage cannot be recovered,</strong>{' '}and progress cannot be carried between devices. See the{' '}<a href="/sillok/privacy">privacy policy</a>.</p>
          </div>
        </section>

        <section>
          <h2>4. 지식재산권</h2>
          <p>앱에 담긴 사건 서술, 해설, 낱말 뜻풀이, 그림, 음악, 코드 등 모든 창작물의 저작권은 주식회사 예아플러스(yeahplus)에 있습니다.</p>
          <p>역사적 사실 자체는 누구의 소유도 아닙니다. 이 앱의 문장은{' '}<strong>사실을 확인한 뒤 전부 새로 작성한 것</strong>이며, 타인의 번역물이나 해설을 옮기지 않았습니다. 사료 출처는 실록의 권과 날짜로만 표기합니다. 초상화나 유물 사진을 사용하지 않고 모든 그림을 직접 제작했습니다.</p>
          <div className="sl-en-block">
            <h3>4. Intellectual property</h3>
            <p>Copyright in the app's event narratives, commentary, glossary definitions, artwork, music and code belongs to yeahplus. Historical facts themselves belong to no one: all prose in this app was{' '}<strong>written fresh after verifying the facts,</strong>{' '}reproducing no one else's translation or commentary, and sources are cited by volume and date only. No portrait or artifact photography is used; all artwork is original.</p>
          </div>
        </section>

        <section>
          <h2>5. 콘텐츠의 성격</h2>
          <p>이 앱은 역사를 소재로 한{' '}<strong>게임이자 학습 보조물</strong>입니다. 학술 자료나 교과서를 대신하지 않으며, 특정 시험의 성적을 보장하지 않습니다.</p>
          <p>게임 안에서 이용자가 내리는 선택과 그 결과로 전개되는 「만약의 조선」은{' '}<strong>실제로 일어난 일이 아니라 가상의 전개</strong>입니다. 실제 역사는 매 사건마다 【실록 대조】 화면에서 따로 구분해 보여 드립니다.</p>
          <p>서술은 학계의 통설을 따르며 야사와 소수설은 다루지 않습니다. 특정 인물이나 집단을 비방하지 않고 현대의 정치적 사안과 연결하지 않습니다.</p>
          <div className="sl-en-block">
            <h3>5. Nature of the content</h3>
            <p>This is a{' '}<strong>game and a learning aid</strong>{' '}built on history. It does not replace scholarly sources or textbooks and guarantees no examination result. The choices a player makes and the alternate outcomes they produce are{' '}<strong>fictional, not events that occurred</strong>; the actual history is shown separately in the Annals Comparison panel for every event. Narratives follow mainstream scholarship, exclude folklore and minority theories, disparage no person or group, and are not connected to present-day political matters.</p>
          </div>
        </section>

        <section>
          <h2>6. 보증의 부인과 책임의 제한</h2>
          <p>예아플러스는 앱이 오류 없이 동작하도록 노력하지만, 모든 기기와 모든 iOS 버전에서 중단이나 오류가 전혀 없을 것을 보증하지는 않습니다. 앱은 현재 상태 그대로 제공됩니다.</p>
          <p>관련 법령이 허용하는 범위에서, 예아플러스는 앱의 이용 또는 이용 불능으로 발생한 간접적·부수적 손해에 대해 책임을 지지 않습니다. 다만{' '}<strong>예아플러스의 고의 또는 중대한 과실로 인한 손해와, 소비자를 보호하는 강행 법규가 인정하는 이용자의 권리는 이 조항으로 제한되지 않습니다.</strong></p>
          <div className="sl-en-block">
            <h3>6. Disclaimer and limitation of liability</h3>
            <p>We work to keep the app free of defects but do not warrant uninterrupted or error-free operation on every device and every iOS version; the app is provided as is. To the extent permitted by law, yeahplus is not liable for indirect or incidental damages arising from use or inability to use the app.{' '}<strong>This does not limit liability for wilful misconduct or gross negligence, nor any consumer right granted by mandatory law.</strong></p>
          </div>
        </section>

        <section>
          <h2>7. 업데이트와 서비스 제공 기간</h2>
          <p>앱의 개선과 오류 수정을 위해 업데이트가 제공될 수 있습니다. 이 앱은 서버 없이 기기에서 단독으로 동작하므로,{' '}<strong>예아플러스가 앞으로 업데이트를 중단하더라도 이미 설치된 앱은 계속 사용하실 수 있습니다.</strong></p>
          <div className="sl-en-block">
            <h3>7. Updates and availability</h3>
            <p>Updates may be issued to improve the app and fix defects. Because the app runs entirely on the device without a server,{' '}<strong>an already-installed copy keeps working even if updates cease.</strong></p>
          </div>
        </section>

        <section>
          <h2>8. 미성년자의 이용</h2>
          <p>이 앱은 아동이 사용할 것을 전제로 만들었습니다. 광고, 인앱결제, 외부 링크, 이용자 간 대화 기능이 없습니다. 미성년자가 이 앱을 구매하는 경우 보호자의 확인 아래 이루어지기를 권합니다.</p>
          <div className="sl-en-block">
            <h3>8. Use by minors</h3>
            <p>The app is designed for use by children: it contains no advertising, no in-app purchases, no outbound links and no communication between users. Where a minor is the purchaser, we recommend that a guardian oversee the purchase.</p>
          </div>
        </section>

        <section>
          <h2>9. 준거법 및 분쟁 해결</h2>
          <p>이 약관은 대한민국 법에 따릅니다. 분쟁이 생기면 우선 협의로 해결하되, 소송이 필요한 경우 민사소송법에 따른 관할 법원에 제기합니다. 대한민국 밖의 이용자에게는 거주 국가의 강행 소비자 보호 법규가 함께 적용될 수 있습니다.</p>
          <div className="sl-en-block">
            <h3>9. Governing law</h3>
            <p>These terms are governed by the laws of the Republic of Korea. Disputes are to be resolved by discussion first; where litigation is necessary, the competent court is determined under Korean civil procedure law. Users outside Korea may additionally benefit from mandatory consumer protection law in their country of residence.</p>
          </div>
        </section>

        <section>
          <h2>10. 약관의 변경</h2>
          <p>약관이 바뀌면 변경 내용과 시행일을 이 페이지에 게시합니다. 이용자에게 불리한 변경이라면 앱 업데이트 설명에도 함께 밝히겠습니다.</p>
          <p>현재 버전 시행일:{' '}<strong>2026년 8월 29일</strong></p>
          <div className="sl-en-block">
            <h3>10. Changes to these terms</h3>
            <p>Any change is posted here with its effective date; a change unfavourable to users is also stated in the app's update notes. Current version effective{' '}<strong>29 August 2026</strong>.</p>
          </div>
        </section>

        <section>
          <h2>11. 문의 · Contact</h2>
          <div className="sl-contact">
            <div style={{ fontSize: "14px", color: "var(--ink-3)" }}>주식회사 예아플러스(yeahplus)</div>
            <a className="sl-mail" href="mailto:cto@yeahplus.co.kr">cto@yeahplus.co.kr</a>
            <div className="sl-note">약관과 관련한 문의를 보내 주십시오.<br />Questions about these terms are welcome.</div>
          </div>
        </section>

      </div>{/* /doc */}
    </>
  );
}
