'use client';

/* 원본 sillok/site/support.html 의 본문을 기계 변환한 것.
   scripts/conv_sillok.py 로 찍어낸 파일이다 — 문구를 고칠 일이 생기면
   sillok/site 쪽 HTML 을 먼저 고치고 생성기를 다시 돌리는 편이 안전하다. */

export default function SupportContent() {
  return (
    <>
      <div className="sl-wrap sl-doc">

        <div className="sl-doc-head">
          <h1>지원<br />Support</h1>
          <div className="sl-sub">조선왕조실록 — 왕의 선택 · Joseon Annals: King's Choice</div>
        </div>

        <div className="sl-contact">
          <div style={{ fontSize: "14px", color: "var(--ink-3)" }}>문의 · Contact</div>
          <a className="sl-mail" href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a>
          <div className="sl-note">{' '}한국어와 영어로 문의하실 수 있습니다. 보통 영업일 기준 2~3일 안에 답변드립니다.<br />{' '}Write in Korean or English. We usually reply within two to three business days.{' '}</div>
        </div>

        {/* ── 사용 환경 ── */}
        <section>
          <h2>사용 환경 · Requirements</h2>
          <div className="sl-table-wrap">
            <table>
              <tbody>
                <tr><th>기기 · Device</th><td>iPhone, iPad</td></tr>
                <tr><th>iOS</th><td>iOS 15.0 이상 · iOS 15.0 or later</td></tr>
                <tr><th>화면 · Orientation</th><td>세로 모드 · Portrait</td></tr>
                <tr><th>언어 · Language</th><td>한국어, English</td></tr>
                <tr><th>인터넷 · Internet</th><td>필요 없음 (완전 오프라인) · Not required (fully offline)</td></tr>
                <tr><th>대상 · Audience</th><td>초등 3~6학년 및 보호자 · Ages 9–12 and their families</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2>자주 묻는 질문 · Frequently asked questions</h2>

          <details>
            <summary>진행 상황이 사라졌어요. 되돌릴 수 있나요?</summary>
            <div className="sl-ans">
              <p>진행 상황은 기기 안에만 저장됩니다. 앱을 삭제하면 함께 삭제되고 복구할 방법이 없습니다. 계정도 클라우드 동기화도 없기 때문에 저희 쪽에도 남아 있는 사본이 없습니다. 기기 저장 공간이 매우 부족한 상태에서 iOS가 앱 데이터를 정리한 경우에도 같습니다.</p>
              <p>앱을 지우지 않으셨는데 「이어하기」가 보이지 않는다면, 아직 왕 한 명을 끝내기 전이거나 왕조 모드가 아니라 「한 왕 모드」로 플레이하신 경우입니다. 한 왕 모드는 이어하기를 만들지 않습니다.</p>
              <div className="sl-en">
                <p><b>My progress disappeared. Can it be restored?</b><br />{' '}Progress is stored only on the device. Deleting the app deletes it, with no way to recover — there is no account and no cloud sync, so we hold no copy either. If the app is still installed but Continue does not appear, the first reign may not be finished yet, or the session was played in Single King mode, which does not create a continue point.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>다른 기기에서 이어서 하고 싶습니다.</summary>
            <div className="sl-ans">
              <p>기기 사이 이어하기는 지원하지 않습니다. 계정과 서버가 없기 때문입니다. 개인정보를 전혀 받지 않기 위해 감수한 제약이며, 앞으로도 계정을 만들 계획은 없습니다.</p>
              <div className="sl-en">
                <p><b>Can I continue on another device?</b><br />{' '}No. Cross-device continuation would require an account and a server, and the app has neither. This is the trade-off we accepted in order to collect nothing, and we do not plan to add accounts.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>읽어주기 버튼을 눌러도 소리가 나지 않습니다.</summary>
            <div className="sl-ans">
              <p>차례로 확인해 주세요.</p>
              <ul className="sl-bullets">
                <li>기기 측면의 무음 스위치가 켜져 있는지</li>
                <li>볼륨이 0은 아닌지, 블루투스 기기로 소리가 나가고 있지는 않은지</li>
                <li>iOS 설정 → 손쉬운 사용 → 읽기 콘텐츠에서 한국어 음성이 내려받아져 있는지</li>
                <li>앱 설정에서 효과음·읽어주기가 꺼져 있지는 않은지</li>
              </ul>
              <p>읽어주기는 iOS에 내장된 음성 합성을 사용합니다. 기기에 해당 언어 음성이 없으면 소리가 나지 않을 수 있으며, 이 경우 iOS 설정에서 음성을 내려받으면 해결됩니다.</p>
              <div className="sl-en">
                <p><b>Read-aloud makes no sound.</b><br />{' '}Check the silent switch, the volume and any connected Bluetooth output; then check that a voice for the language is installed under iOS Settings → Accessibility → Spoken Content; then check that sound and read-aloud are enabled in the app's settings. Read-aloud uses the speech synthesis built into iOS, so a missing voice for that language will produce silence until the voice is downloaded in iOS Settings.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>글씨가 작아서 아이가 읽기 힘들어합니다.</summary>
            <div className="sl-ans">
              <p>앱 설정에서 글자 크기를 키울 수 있습니다. 본문은 기본값에서도 18pt 이상이며, 설정에서 더 크게 조절됩니다. 함께 읽어주기를 켜 두시면 아이가 눈으로 따라가면서 들을 수 있습니다.</p>
              <div className="sl-en">
                <p><b>The text is too small for my child.</b><br />{' '}Text size can be increased in the app's settings. Body text is 18pt or larger even at the default. Turning on read-aloud lets a child follow along by ear while reading.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>모르는 낱말이 나옵니다.</summary>
            <div className="sl-ans">
              <p>어려운 낱말에는 점선 밑줄이 그어져 있습니다. 그 낱말을 탭하면 초등학생이 이해할 수 있는 한 문장 설명이 말풍선으로 뜹니다. 179개 낱말이 등록되어 있고, 도감의 낱말 사전에서 전체를 훑어볼 수도 있습니다.</p>
              <div className="sl-en">
                <p><b>There are words my child does not know.</b><br />{' '}Difficult words carry a dotted underline; tapping one shows a single-sentence explanation written for this age. There are 179 entries, and the full list can be browsed in the codex.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>지표가 0이 되었습니다. 게임이 끝나나요?</summary>
            <div className="sl-ans">
              <p>끝나지 않습니다. 이 게임에는 게임 오버가 없습니다. 지표가 0이 되면 그에 맞는 위기 사건이 들어오고, 다음 왕은 최소값에서 다시 시작합니다. 실제 조선도 큰 전란을 겪고도 이어졌기 때문에, 실패로 플레이가 끊기지 않는 쪽이 역사적으로도 더 맞다고 보았습니다.</p>
              <div className="sl-en">
                <p><b>A stat hit zero — is the game over?</b><br />{' '}No. There is no game over. A matching crisis event is inserted and the next king starts from the minimum value. Joseon itself endured major wars and continued, so not ending on failure is the more accurate design.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>사초 조각이 잘 모이지 않습니다.</summary>
            <div className="sl-ans">
              <p>사초 조각은{' '}<b>실제 역사와 같은 선택</b>을 했을 때만 주어집니다. 다른 선택을 하면 사초 대신 「만약의 조선」이 어떻게 흘렀을지 보여 줍니다. 사초를 놓쳤다면 그 왕을 「한 왕 모드」에서 다시 플레이해 다른 선택을 해 보시면 됩니다. 한 왕 모드는 왕조 모드의 진행 상황에 영향을 주지 않습니다.</p>
              <div className="sl-en">
                <p><b>I am not collecting many record fragments.</b><br />{' '}A fragment is awarded only when the choice matches what actually happened; otherwise the game shows the Joseon that might have been instead. To pick up a missed fragment, replay that king in Single King mode — it does not affect the main dynasty run.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>언어를 바꾸고 싶습니다.</summary>
            <div className="sl-ans">
              <p>제목 화면 오른쪽 위의 언어 버튼이나 설정에서 한국어와 영어를 전환할 수 있습니다. 바꾸어도 진행 상황은 그대로 유지됩니다.</p>
              <div className="sl-en">
                <p><b>How do I change the language?</b><br />{' '}Use the language button at the top right of the title screen, or the setting in Settings. Switching languages keeps your progress intact.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>부모 계정으로 사서 아이 기기에 설치하고 싶습니다 (가족 공유)</summary>
            <div className="sl-ans">
              <p>이 앱은 Apple의{' '}<b>가족 공유</b>로 가족끼리 나눠 쓸 수 있습니다. 결제는 부모님이 한 번만 하시면 되고, 아이 기기에는 아이 계정으로 내려받습니다. 아이에게 결제 수단을 맡기지 않아도 됩니다.</p>
              <p><b>1단계 — 부모님(가족 관리자) 기기에서</b></p>
              <ul className="sl-bullets">
                <li>설정 → 맨 위의{' '}<b>본인 이름</b>{' '}→{' '}<b>가족</b></li>
                <li>가족이 없다면 먼저 가족을 만들고 아이를 초대합니다 (최대 6명)</li>
                <li><b>구매 항목 공유</b>를 켭니다 — 이걸 켜야 가족이 서로의 구매를 볼 수 있습니다</li>
              </ul>
              <p><b>2단계 — 아이 기기에서</b></p>
              <ul className="sl-bullets">
                <li>App Store를 열고 오른쪽 위{' '}<b>계정(사진 또는 이니셜)</b>을 누릅니다</li>
                <li><b>구입 항목</b>{' '}→{' '}<b>가족 구매 항목</b>{' '}→ 구매하신{' '}<b>부모님 이름</b>을 고릅니다</li>
                <li>목록에서 「조선왕조실록: 왕의 선택」 옆의{' '}<b>내려받기(⬇︎)</b>를 누릅니다</li>
              </ul>
              <p>「<b>자녀에게 묻고 구입</b>」이 켜져 있으면 아이가 내려받을 때 부모님 기기로 승인 요청이 갑니다. 승인해 주시면 설치됩니다. 추가로 청구되는 금액은 없습니다.</p>
              <p>아이가{' '}<b>부모님과 같은 Apple 계정</b>을 쓰는 기기라면 가족 공유 없이도 됩니다. App Store → 계정 → 구입 항목에서 바로 다시 받으시면 됩니다.</p>
              <p className="sl-hint">메뉴 이름은 iOS 버전에 따라 조금씩 다를 수 있습니다. 가족 공유는 Apple이 제공하는 기능이라 앱 쪽에서 켜고 끄는 설정이 없고, 동작 방식도 Apple의 정책을 따릅니다. 잘 되지 않으시면 알려 주십시오 — 저희가 아는 범위에서 함께 확인해 드리겠습니다.</p>
              <div className="sl-en">
                <p><b>I bought it on my account — how do I install it on my child's device? (Family Sharing)</b></p>
                <p>Buy once, install for the family.{' '}<b>On the parent's device:</b>{' '}Settings → your name → Family; create the family and invite your child if you have not already (up to six people), then turn on{' '}<b>Purchase Sharing</b>.{' '}<b>On the child's device:</b>{' '}open the App Store, tap the account icon at the top right, then Purchased → Family Purchases → the parent's name, and tap the download arrow next to Joseon Annals: King's Choice.</p>
                <p>If{' '}<b>Ask to Buy</b>{' '}is on, the download sends an approval request to the parent's device; approving it installs the app. Nothing further is charged. If the child's device signs in with the{' '}<b>same Apple Account</b>{' '}as the parent, Family Sharing is not needed at all — just re-download from App Store → Account → Purchased.</p>
                <p className="sl-hint">Menu names differ slightly between iOS versions. Family Sharing is Apple's feature — there is no switch for it inside the app, and how it behaves follows Apple's policy. If it does not work for you, write to us and we will help as far as we can.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>광고나 추가 결제가 나오나요?</summary>
            <div className="sl-ans">
              <p>없습니다. 광고와 인앱결제를 넣지 않았습니다. 한 번 구매하시면 27명의 왕과 모든 도감이 열려 있고, 이후 청구되는 금액이 없습니다. 아이가 혼자 사용하다가 결제 화면을 만나는 일도 없습니다.</p>
              <div className="sl-en">
                <p><b>Are there ads or extra charges?</b><br />{' '}No. The app has no advertising and no in-app purchases. One purchase opens all 27 kings and the whole codex, and nothing is billed afterwards. A child using the app alone will never meet a payment screen.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>환불하고 싶습니다.</summary>
            <div className="sl-ans">
              <p>구매는 App Store를 통해 이루어지므로 환불도 App Store의 환불 절차를 따릅니다. 저희는 결제 정보를 전달받지 않아 직접 환불해 드릴 수 없습니다. 다만 앱에 문제가 있어 환불을 고려하시는 경우라면 먼저 알려 주십시오 — 고칠 수 있는 문제인지 확인하겠습니다.</p>
              <div className="sl-en">
                <p><b>I would like a refund.</b><br />{' '}Purchases are made through the App Store, so refunds follow the App Store's refund process. We never receive payment information and cannot issue refunds ourselves. If a problem with the app is the reason, please tell us first — it may be something we can fix.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>역사 서술이 잘못된 것 같습니다.</summary>
            <div className="sl-ans">
              <p>알려 주시면 감사하겠습니다. 어느 왕의 어느 사건인지와, 어디가 어떻게 잘못되었다고 보시는지를{' '}<a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a>{' '}로 보내 주십시오. 확인 후 사실관계가 어긋난 것이 맞다면 다음 업데이트에서 고치겠습니다.</p>
              <p>참고로 이 게임의 모든 문장은 사실을 확인한 뒤 새로 쓴 것이며, 국역본 문장을 옮기지 않았습니다. 출처는 실록의 재위 연도와 날짜로만 표기합니다. 학계 통설을 따르고 야사는 넣지 않았습니다.</p>
              <div className="sl-en">
                <p><b>I think something in the history is wrong.</b><br />{' '}Please tell us. Send the king, the event and what you believe is inaccurate to{' '}<a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a>; if the fact is indeed wrong we will correct it in the next update. All prose in the game was written fresh after verifying the facts — no published translation is reproduced — and sources are cited by reign year and date only.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>수업이나 학급에서 써도 되나요?</summary>
            <div className="sl-ans">
              <p>교실에서 쓰시는 것을 환영합니다. 왕 한 명이 약 5분이라 한 차시 안에서 몇 대를 다루기 좋고, 「한 왕 모드」로 특정 왕만 골라 플레이할 수도 있습니다. 같은 사건을 두 모둠이 서로 다르게 결정한 뒤 【실록 대조】 화면을 함께 보는 방식도 잘 맞습니다.</p>
              <div className="sl-en">
                <p><b>May I use this in class?</b><br />{' '}Please do. A single reign takes about five minutes, which fits several reigns into one lesson, and Single King mode lets you pick one king. Having two groups decide the same event differently and then reading the Annals Comparison together works well.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>인터넷 없이도 되나요?</summary>
            <div className="sl-ans">
              <p>됩니다. 앱은 서버와 통신하지 않으며, 비행기 모드에서 처음부터 끝까지 동작합니다. 읽어주기도 기기에 내장된 음성을 쓰기 때문에 인터넷이 필요 없습니다.</p>
              <div className="sl-en">
                <p><b>Does it work without internet?</b><br />{' '}Yes. The app never contacts a server and runs from start to finish in airplane mode. Read-aloud uses the device's built-in voice, so it needs no connection either.</p>
              </div>
            </div>
          </details>

          <details>
            <summary>앱이 멈추거나 화면이 이상합니다.</summary>
            <div className="sl-ans">
              <p>앱을 완전히 종료했다가 다시 실행해 주세요. 진행 상황은 자동 저장되어 있습니다. 그래도 같은 문제가 반복되면 기기 모델, iOS 버전, 문제가 일어난 화면(어느 왕, 어느 사건인지)을 적어{' '}<a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a>{' '}로 보내 주십시오. 앱이 아무 정보도 수집하지 않기 때문에, 알려 주시는 내용이 저희가 확인할 수 있는 단서의 전부입니다.</p>
              <div className="sl-en">
                <p><b>The app froze or looks wrong.</b><br />{' '}Quit the app fully and reopen it; progress is saved automatically. If it recurs, send your device model, iOS version and where it happened (which king, which event) to{' '}<a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a>. Because the app collects nothing, your description is all we have to work from.</p>
              </div>
            </div>
          </details>
        </section>

        {/* ── 데이터 삭제 ── */}
        <section>
          <h2>데이터 삭제 · Deleting your data</h2>
          <p>이 앱과 관련해 기기에 저장된 모든 것은{' '}<strong>앱을 삭제하면 함께 사라집니다.</strong>{' '}저희 서버에 보관된 것이 없으므로 따로 요청하실 절차가 없습니다. 자세한 내용은{' '}<a href="/sillok/privacy">개인정보처리방침</a>을 봐 주십시오.</p>
          <div className="sl-en-block">
            <p>Everything this app stores on the device{' '}<strong>is removed when the app is deleted.</strong>{' '}Nothing is held on our servers, so there is no deletion request to make. See the{' '}<a href="/sillok/privacy">privacy policy</a>{' '}for details.</p>
          </div>
        </section>

      </div>{/* /doc */}
    </>
  );
}
