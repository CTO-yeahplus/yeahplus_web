'use client';

/* sillok 약관을 뼈대로 삼고 이 게임에 맞게 고쳤다 — 달라지는 곳은
   Game Center(3조)·콘텐츠 성격(5조)·연령(8조) 세 군데다.
   법률 문서라 사실이 아닌 문장을 쓰지 않는다: 가격·출시일은 적지 않고,
   기능 서술은 docs/REVIEW_SUBMISSION.md 와 docs/GAME_CENTER.md 를 따랐다. */

import Link from 'next/link';
import { EMAIL } from '../i18n';

export default function TermsContent() {
  return (
    <div className="ss-wrap ss-doc">
      <div className="ss-doc-head">
        <h1>
          이용약관
          <br />
          Terms of Use
        </h1>
        <div className="ss-sub">스틸스톰 아레나 · SteelStorm Arena</div>
        <div className="ss-rev">시행일 2026년 9월 15일 · Effective 15 September 2026</div>
      </div>

      <div className="ss-callout">
        <p>
          이 약관은 주식회사 예아플러스(yeahplus)가 제공하는 iOS 앱 「스틸스톰 아레나」의 이용
          조건을 정합니다. 앱을 내려받아 사용하시면 이 약관에 동의하신 것으로 봅니다.
        </p>
        <p style={{ marginTop: '10px' }}>
          These terms govern use of the iOS app &ldquo;SteelStorm Arena&rdquo; provided by yeahplus.
          Downloading and using the app constitutes acceptance of these terms.
        </p>
      </div>

      <section>
        <h2>1. 이용 허락의 범위</h2>
        <p>
          구매하신 분께는 개인적·비상업적 목적으로 앱을 사용할 수 있는, 양도할 수 없는 이용 권한이
          부여됩니다. 게임 플레이 영상과 화면을 개인 방송·영상으로 공개하는 것은 허락합니다.
        </p>
        <p>다음 행위는 허락되지 않습니다.</p>
        <ul className="ss-bullets">
          <li>앱 또는 앱에 담긴 그래픽·음향·코드를 복제하여 재배포하거나 판매하는 행위</li>
          <li>앱을 역컴파일·역설계하거나 보호 수단을 우회하는 행위</li>
          <li>점수·기록을 부정한 방법으로 조작하여 리더보드에 제출하는 행위</li>
          <li>앱 또는 그 일부를 유상으로 대여·양도하는 행위</li>
        </ul>
        <div className="ss-en-block">
          <h3>1. Licence</h3>
          <p>
            Purchasers receive a non-transferable licence to use the app for personal,
            non-commercial purposes. Streaming or publishing your own gameplay footage is permitted.
            Not permitted: redistributing or selling the app or its graphics, audio or code;
            decompiling, reverse engineering or circumventing protections; manipulating scores or
            records by illegitimate means and submitting them to the leaderboards; and renting or
            transferring the app or any part of it for a fee.
          </p>
        </div>
      </section>

      <section>
        <h2>2. 구매 · 환불</h2>
        <p>
          이 앱은 한 번 구매하면 모든 내용을 이용할 수 있는 유료 앱이며, 인앱결제와 구독이 없습니다.
          게임 안의 기체와 영구 강화는 플레이로 모으는 고철로만 해금되고, 현금으로 사는 항목은
          없습니다. 구매와 환불은 App Store를 통해 이루어지고 그 정책을 따릅니다. 예아플러스는 결제
          정보를 전달받지 않으며 직접 환불을 처리할 수 없습니다.
        </p>
        <div className="ss-en-block">
          <h3>2. Purchase and refunds</h3>
          <p>
            This is a paid app with no in-app purchases and no subscription; one purchase unlocks
            everything. Chassis and permanent upgrades inside the game are unlocked only with
            salvage earned through play — nothing is sold for money. Purchases and refunds go
            through the App Store and follow its policies. yeahplus does not receive payment
            information and cannot process refunds directly.
          </p>
        </div>
      </section>

      <section>
        <h2>3. 계정 없음 · 저장 데이터 · Game Center</h2>
        <p>
          이 앱에는 계정과 회원가입이 없습니다. 진행 상황과 설정, 최고 점수는{' '}
          <strong>이용자 기기 안에만</strong> 저장되며, 예아플러스는 이를 보관하지 않고 접근할 수도
          없습니다. 따라서{' '}
          <strong>
            앱 삭제, 기기 초기화, 기기 분실, 기기 저장 공간 부족 등으로 기록이 사라진 경우 복구가
            불가능합니다.
          </strong>{' '}
          기기 사이 이어하기도 지원하지 않습니다.
        </p>
        <p>
          리더보드와 도전 과제는 Apple 의 Game Center 를 통해 제공되며 로그인은 선택입니다. Game
          Center 에 제출된 점수와 도전 과제는 Apple 이 운영·보관하며 그 이용 조건과
          개인정보처리방침이 함께 적용됩니다. 부정한 점수가 확인되는 경우 Apple 의 절차에 따라 해당
          기록이 조정될 수 있습니다. 자세한 내용은{' '}
          <Link href="/steelstorm/privacy">개인정보처리방침</Link>을 봐 주십시오.
        </p>
        <div className="ss-en-block">
          <h3>3. No account, stored data and Game Center</h3>
          <p>
            The app has no account and no sign-up. Progress, settings and best scores are stored{' '}
            <strong>only on the user&rsquo;s device</strong>; yeahplus neither holds nor can access
            them. Consequently,{' '}
            <strong>
              records lost through deletion of the app, a device reset, a lost device or insufficient
              storage cannot be recovered,
            </strong>{' '}
            and progress cannot be carried between devices. Leaderboards and achievements are
            provided through Apple&rsquo;s Game Center and signing in is optional; scores and
            achievements submitted there are operated and retained by Apple under its own terms and
            privacy policy, and illegitimate scores may be adjusted through Apple&rsquo;s process.
            See the <Link href="/steelstorm/privacy">privacy policy</Link>.
          </p>
        </div>
      </section>

      <section>
        <h2>4. 지식재산권</h2>
        <p>
          앱에 담긴 그래픽, 음향, 게임 규칙의 표현, 코드 등 모든 창작물의 저작권은 주식회사
          예아플러스(yeahplus)에 있습니다. 앱은 제3자의 콘텐츠를 포함하지 않으며, 그래픽과 소리는
          모두 직접 제작했습니다.
        </p>
        <div className="ss-en-block">
          <h3>4. Intellectual property</h3>
          <p>
            Copyright in the app&rsquo;s graphics, audio, the expression of its game rules and its
            code belongs to yeahplus. The app contains no third-party content; all graphics and
            sound are original.
          </p>
        </div>
      </section>

      <section>
        <h2>5. 콘텐츠의 성격</h2>
        <p>
          이 앱은 추상적인 기체와 드론이 등장하는{' '}
          <strong>액션 게임</strong>입니다. 사람이나 동물이 등장하지 않고, 유혈이나 신체 훼손
          표현이 없으며, 실존하는 총기를 묘사하지 않습니다.
        </p>
        <p>
          게임 안에는 확률형 보상이 없습니다. 웨이브를 마칠 때 제시되는 강화는 주어진 선택지 가운데
          고르는 방식이고, 격납고 해금은 정해진 가격을 고철로 지불합니다.
        </p>
        <div className="ss-en-block">
          <h3>5. Nature of the content</h3>
          <p>
            This is an <strong>action game</strong> in which abstract machines and drones fight. No
            people or animals appear, there is no blood or gore, and no real firearm is depicted.
            The game contains no chance-based rewards: upgrades after a wave are chosen from the
            options offered, and hangar unlocks are paid at a fixed price in salvage.
          </p>
        </div>
      </section>

      <section>
        <h2>6. 보증의 부인과 책임의 제한</h2>
        <p>
          예아플러스는 앱이 오류 없이 동작하도록 노력하지만, 모든 기기와 모든 iOS 버전에서 중단이나
          오류가 전혀 없을 것을 보증하지는 않습니다. 앱은 현재 상태 그대로 제공됩니다.
        </p>
        <p>
          관련 법령이 허용하는 범위에서, 예아플러스는 앱의 이용 또는 이용 불능으로 발생한
          간접적·부수적 손해에 대해 책임을 지지 않습니다. 다만{' '}
          <strong>
            예아플러스의 고의 또는 중대한 과실로 인한 손해와, 소비자를 보호하는 강행 법규가 인정하는
            이용자의 권리는 이 조항으로 제한되지 않습니다.
          </strong>
        </p>
        <div className="ss-en-block">
          <h3>6. Disclaimer and limitation of liability</h3>
          <p>
            We work to keep the app free of defects but do not warrant uninterrupted or error-free
            operation on every device and every iOS version; the app is provided as is. To the
            extent permitted by law, yeahplus is not liable for indirect or incidental damages
            arising from use or inability to use the app.{' '}
            <strong>
              This does not limit liability for wilful misconduct or gross negligence, nor any
              consumer right granted by mandatory law.
            </strong>
          </p>
        </div>
      </section>

      <section>
        <h2>7. 업데이트와 서비스 제공 기간</h2>
        <p>
          앱의 개선과 오류 수정을 위해 업데이트가 제공될 수 있습니다. 이 앱은 서버 없이 기기에서
          단독으로 동작하므로,{' '}
          <strong>
            예아플러스가 앞으로 업데이트를 중단하더라도 이미 설치된 앱은 계속 사용하실 수 있습니다.
          </strong>{' '}
          다만 리더보드와 도전 과제는 Apple 이 Game Center 서비스를 제공하는 동안에만 동작합니다.
        </p>
        <div className="ss-en-block">
          <h3>7. Updates and availability</h3>
          <p>
            Updates may be issued to improve the app and fix defects. Because the app runs entirely
            on the device without a server,{' '}
            <strong>an already-installed copy keeps working even if updates cease.</strong>{' '}
            Leaderboards and achievements, however, work only for as long as Apple provides the Game
            Center service.
          </p>
        </div>
      </section>

      <section>
        <h2>8. 미성년자의 이용</h2>
        <p>
          이 앱에는 광고, 인앱결제, 외부 링크, 이용자 간 대화 기능이 없습니다. 연령 등급은 App Store
          에 표시된 등급을 따릅니다. 미성년자가 이 앱을 구매하는 경우 보호자의 확인 아래 이루어지기를
          권합니다.
        </p>
        <div className="ss-en-block">
          <h3>8. Use by minors</h3>
          <p>
            The app contains no advertising, no in-app purchases, no outbound links and no
            communication between users. The age rating shown on the App Store applies. Where a
            minor is the purchaser, we recommend that a guardian oversee the purchase.
          </p>
        </div>
      </section>

      <section>
        <h2>9. 준거법 및 분쟁 해결</h2>
        <p>
          이 약관은 대한민국 법에 따릅니다. 분쟁이 생기면 우선 협의로 해결하되, 소송이 필요한 경우
          민사소송법에 따른 관할 법원에 제기합니다. 대한민국 밖의 이용자에게는 거주 국가의 강행
          소비자 보호 법규가 함께 적용될 수 있습니다.
        </p>
        <div className="ss-en-block">
          <h3>9. Governing law</h3>
          <p>
            These terms are governed by the laws of the Republic of Korea. Disputes are to be
            resolved by discussion first; where litigation is necessary, the competent court is
            determined under Korean civil procedure law. Users outside Korea may additionally
            benefit from mandatory consumer protection law in their country of residence.
          </p>
        </div>
      </section>

      <section>
        <h2>10. 약관의 변경</h2>
        <p>
          약관이 바뀌면 변경 내용과 시행일을 이 페이지에 게시합니다. 이용자에게 불리한 변경이라면 앱
          업데이트 설명에도 함께 밝히겠습니다.
        </p>
        <p>
          현재 버전 시행일: <strong>2026년 9월 15일</strong>
        </p>
        <div className="ss-en-block">
          <h3>10. Changes to these terms</h3>
          <p>
            Any change is posted here with its effective date; a change unfavourable to users is
            also stated in the app&rsquo;s update notes. Current version effective{' '}
            <strong>15 September 2026</strong>.
          </p>
        </div>
      </section>

      <section>
        <h2>11. 문의 · Contact</h2>
        <div className="ss-contact">
          <div style={{ fontSize: '14px', color: 'var(--ss-ink-3)' }}>
            주식회사 예아플러스(yeahplus)
          </div>
          <a className="ss-mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <div className="ss-note">
            약관과 관련한 문의를 보내 주십시오.
            <br />
            Questions about these terms are welcome.
          </div>
        </div>
      </section>
    </div>
  );
}
