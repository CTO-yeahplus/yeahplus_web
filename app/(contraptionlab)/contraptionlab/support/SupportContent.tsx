'use client';

/* 이 페이지는 한/영을 동시에 보여준다 — App Store Connect 의 Support URL 로
   등록되는 주소라 언어 토글을 눌러야만 영어가 보이면 곤란하다.
   FAQ 질문은 summary 에 한글·영어를 나란히 적는다.

   답변 근거: docs/METADATA.md(설명문·8챕터), README.md(레벨 에디터·검증기),
   docs/REVIEW_NOTES.md(오프라인·해법 보기 버튼·챕터 해금 규칙),
   docs/AGE_RATING.md(4+·외부 링크 없음), docs/privacy.html(수집 없음).
   확인되지 않은 것은 쓰지 않았다. 심사용 잠금 해제 방법은 싣지 않는다. */

import Link from 'next/link';
import { EMAIL } from '../i18n';

export default function SupportContent() {
  return (
    <div className="cp-wrap cp-doc">
      <div className="cp-doc-head">
        <h1>
          지원
          <br />
          Support
        </h1>
        <div className="cp-sub">뚝딱 실험실 · Contraption Lab</div>
        <div className="cp-rev">
          문의는 보통 1~2 영업일 안에 답장 드립니다 · We usually reply within 1–2 business days
        </div>
      </div>

      {/* ── 문의 ── */}
      <section>
        <h2>문의 · Contact</h2>
        <div className="cp-contact">
          <div style={{ fontSize: '14px', color: 'var(--cp-ink-3)' }}>
            주식회사 예아플러스(yeahplus)
          </div>
          <a className="cp-mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <div className="cp-note">
            막히는 판, 이상한 동작, 고쳤으면 하는 점을 보내 주십시오. 한국어와 영어로 답장 드립니다.
            <br />
            Tell us about a lab you are stuck on, anything that behaves oddly, or anything you would
            like fixed. We reply in Korean and English.
          </div>
        </div>
        <p className="cp-hint">
          버그를 알려 주실 때 <strong>기기 모델 · iOS 버전 · 앱 버전</strong>과 몇 번 판에서
          일어났는지를 함께 적어 주시면 훨씬 빨리 원인을 찾을 수 있습니다. 화면 녹화가 있으면 가장
          좋습니다.
          <br />
          Please include your <strong>device model, iOS version and app version</strong>, plus which
          lab it happened in. A screen recording helps most of all.
        </p>
      </section>

      {/* ── 동작 환경 ── */}
      <section>
        <h2>동작 환경 · Requirements</h2>
        <div className="cp-table-wrap">
          <table className="cp-spec">
            <tbody>
              <tr>
                <th>기기 · Device</th>
                <td>iPhone · iPad</td>
              </tr>
              <tr>
                <th>iOS</th>
                <td>iOS 15.0 이상 · iOS 15.0 or later</td>
              </tr>
              <tr>
                <th>화면 · Orientation</th>
                <td>
                  아이폰 세로 · 아이패드 4방향
                  <br />
                  iPhone portrait · iPad all four orientations
                </td>
              </tr>
              <tr>
                <th>언어 · Language</th>
                <td>한국어 · English</td>
              </tr>
              <tr>
                <th>분량 · Content</th>
                <td>
                  8개 챕터 · 48개 실험실 · 부품 13종 · 레벨 에디터
                  <br />8 chapters · 48 labs · 13 parts · a level editor
                </td>
              </tr>
              <tr>
                <th>인터넷 · Internet</th>
                <td>필요 없음 (완전 오프라인) · Not required (fully offline)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section>
        <h2>자주 묻는 질문 · Frequently asked questions</h2>

        <details>
          <summary>
            <span className="cp-q">
              어떻게 하는 게임인가요?
              <span className="cp-q-en">How does it work?</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>구슬을 바구니에 넣으면 성공입니다. 네 단계로 진행됩니다.</p>
            <ul className="cp-bullets">
              <li>아래 선반에서 부품을 끌어 점선 안에 놓습니다.</li>
              <li>놓은 부품을 눌러 고른 뒤 회전 버튼으로 각도를 맞춥니다.</li>
              <li>「출발!」을 누르면 구슬이 실제 물리 계산대로 굴러갑니다.</li>
              <li>빗나가면 무엇 때문에 빗나갔는지 알려 줍니다. 고쳐서 다시 하면 됩니다.</li>
            </ul>
            <div className="cp-en">
              <p>
                Get the marble into the basket. Drag a part from the shelf at the bottom into the
                dashed area, tap the placed part to select it and use the rotate buttons, then press
                Go — the marble rolls under a real physics simulation. If it misses, the workshop
                tells you what went wrong, and you fix it and try again.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              한 판이 너무 어렵습니다.
              <span className="cp-q-en">I am stuck on a lab.</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              화면 오른쪽 위의 <strong>「?」 버튼</strong>을 누르면 검증된 해법 하나를 흐린 윤곽으로
              보여 줍니다. 정답을 대신 놓아 주는 것이 아니라 어디에 무엇을 두면 되는지만 비쳐
              보이므로, 보고 나서 직접 놓으면 됩니다.
            </p>
            <p>
              한 판에 정답은 하나가 아닙니다. 윤곽과 다르게 풀어도 성공이고, 별 조건(부품 개수·한
              번에 성공)도 따로 충족할 수 있습니다.
            </p>
            <div className="cp-en">
              <p>
                The <strong>&ldquo;?&rdquo; button</strong> at the top right shows one verified
                solution as a translucent ghost. It does not place the parts for you — it only shows
                where they could go, and you still place them yourself. There is never only one
                answer, so solving it differently from the ghost still counts, and the star
                conditions can be met your own way.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              다음 챕터가 잠겨 있습니다.
              <span className="cp-q-en">The next chapter is locked.</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              한 판을 깨면 다음 판이 열리고, <strong>앞 챕터를 네 판 깨면 다음 챕터</strong>가
              열립니다. 별을 모두 모아야 열리는 것은 아니니, 막히는 판은 넘어가지 말고 「?」 버튼을
              써서 한 번 통과해 두시면 됩니다.
            </p>
            <div className="cp-en">
              <p>
                Clearing a level opens the next one, and{' '}
                <strong>clearing four levels of a chapter opens the following chapter.</strong> You
                do not need every star, so when a lab blocks you, use the &ldquo;?&rdquo; button to
                get past it once.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              별 세 개는 어떻게 받나요?
              <span className="cp-q-en">How do I earn three stars?</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              판마다 조건이 화면 아래에 적혀 있습니다 — 바구니에 넣기, 정해진 개수 이하의 부품으로
              성공하기, 한 번에 성공하기 같은 것들입니다. 세 조건을 한 번의 시도에서 모두 채울 필요는
              없습니다.
            </p>
            <div className="cp-en">
              <p>
                Each lab lists its conditions under the board — land the marble, finish within a
                given number of parts, succeed on the first try, and so on. They do not all have to
                happen in the same attempt.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              「내 실험실」에서 만든 판이 저장되지 않습니다.
              <span className="cp-q-en">My own lab will not save.</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              만든 판은 <strong>앱이 먼저 직접 풀어 본 뒤에만</strong> 저장됩니다. 풀 수 없는
              배치라면 저장을 막고 그 사실을 알려 줍니다. 받는 사람이 절대 못 푸는 판을 받지 않게
              하려는 장치입니다.
            </p>
            <p>
              저장이 안 될 때는 줄 부품의 개수를 늘리거나, 출발 지점과 바구니 사이를 이을 수 있는
              여지를 더 두고 다시 시도해 보십시오.
            </p>
            <div className="cp-en">
              <p>
                A lab is saved{' '}
                <strong>only after the app has solved it itself.</strong> If the layout cannot be
                solved, saving is blocked and the app says so — this is what guarantees that
                whatever you pass on is solvable. If it refuses, raise the number of parts you
                allow, or leave more room between the start and the basket, and try again.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              만든 판을 다른 사람에게 어떻게 보내나요?
              <span className="cp-q-en">How do I send a lab to someone?</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              짧은 글자 코드로 주고받습니다. 메시지든 쪽지든 편한 방법으로 코드를 전달하고, 받는
              사람은 「내 실험실」에서 그 코드를 넣으면 됩니다. 서버를 거치지 않으므로 인터넷도 계정도
              필요 없습니다.
            </p>
            <div className="cp-en">
              <p>
                Labs travel as a short text code. Send it however you like, and the other person
                enters it in My Lab. It never passes through a server, so no internet and no account
                are involved.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              진행 상황과 별이 사라졌습니다.
              <span className="cp-q-en">My progress and stars are gone.</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              진행 상황은 기기 안에만 저장됩니다. 앱을 삭제하면 함께 삭제되고 복구할 방법이
              없습니다. 계정도 클라우드 동기화도 없기 때문에 저희 쪽에도 사본이 남아 있지 않습니다.
              기기 저장 공간이 매우 부족한 상태에서 iOS 가 앱 데이터를 정리한 경우에도 같습니다.
            </p>
            <div className="cp-en">
              <p>
                Progress is stored only on the device. Deleting the app deletes it, with no way to
                recover — there is no account and no cloud sync, so we hold no copy either. The same
                applies if iOS cleared app data because storage was critically low.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              다른 기기에서 이어서 하고 싶습니다.
              <span className="cp-q-en">Can I continue on another device?</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              기기 사이 이어하기는 지원하지 않습니다. 계정과 서버가 없기 때문입니다. 개인정보를 전혀
              받지 않기 위해 감수한 제약이며, 앞으로도 계정을 만들 계획은 없습니다. 다만 만든 판은
              글자 코드로 옮길 수 있습니다.
            </p>
            <div className="cp-en">
              <p>
                No. Cross-device continuation would require an account and a server, and the app has
                neither. This is the trade-off we accepted in order to collect nothing, and we do not
                plan to add accounts. Labs you built can still be carried over as a text code.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              소리를 끄고 싶습니다.
              <span className="cp-q-en">How do I turn the sound off?</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              첫 화면의 <strong>「소리」 버튼</strong>으로 켜고 끌 수 있습니다. 설정은 기기에
              저장되어 다음에 열 때도 유지됩니다.
            </p>
            <div className="cp-en">
              <p>
                Use the <strong>Sound button</strong> on the home screen. The setting is kept on the
                device for next time.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              언어를 바꾸고 싶습니다.
              <span className="cp-q-en">How do I change the language?</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              첫 화면의 <strong>「한국어 / English」 버튼</strong>을 누르면 바뀝니다. 처음 실행할
              때는 기기 언어를 따릅니다.
            </p>
            <div className="cp-en">
              <p>
                Tap the <strong>Korean / English button</strong> on the home screen. On first launch
                the app follows your device language.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              인터넷 없이도 되나요?
              <span className="cp-q-en">Does it work without internet?</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              됩니다. 앱은 어떤 네트워크 요청도 하지 않습니다. 비행기 모드에서도 모든 기능이
              동일하게 동작합니다.
            </p>
            <div className="cp-en">
              <p>
                Yes. The app makes no network requests of any kind — everything works identically in
                Airplane Mode.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              광고나 추가 결제가 나오나요?
              <span className="cp-q-en">Are there ads or extra charges?</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              없습니다. 광고도, 인앱결제도, 구독도 없습니다. 앱 안에 외부로 나가는 링크도 하나도
              없습니다.
            </p>
            <div className="cp-en">
              <p>
                None. No ads, no in-app purchases, no subscription — and not a single link that
                leads out of the app.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              환불하고 싶습니다.
              <span className="cp-q-en">I would like a refund.</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              구매와 환불은 App Store 를 통해 이루어집니다.{' '}
              <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">
                reportaproblem.apple.com
              </a>
              에서 Apple 에 직접 요청하실 수 있습니다. 저희는 결제 정보를 받지 않아 직접 환불해 드릴
              수 없습니다.
            </p>
            <p>
              다만 문제 때문에 환불을 생각하고 계시다면 먼저 알려 주십시오 — 고칠 수 있는 문제일 수
              있습니다.
            </p>
            <div className="cp-en">
              <p>
                Purchases and refunds go through the App Store; request one from Apple at{' '}
                <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">
                  reportaproblem.apple.com
                </a>
                . We never receive payment information and cannot issue refunds ourselves. If a
                problem is what brought you here, please tell us first — it may be something we can
                fix.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="cp-q">
              앱이 멈추거나 화면이 이상합니다.
              <span className="cp-q-en">The app froze or looks wrong.</span>
            </span>
          </summary>
          <div className="cp-ans">
            <p>
              앱을 완전히 종료했다가 다시 열어 주십시오. 그래도 같다면 기기를 한 번 재시동해
              보십시오. 계속된다면 위 문의 주소로 기기 모델 · iOS 버전 · 앱 버전과 함께 알려
              주십시오.
            </p>
            <p className="cp-hint">
              앱을 지우고 다시 설치하면 대부분 해결되지만,{' '}
              <strong>기기에 저장된 진행 상황과 만든 판도 함께 지워집니다.</strong> 마지막 수단으로만
              쓰십시오.
              <br />
              Reinstalling usually helps, but{' '}
              <strong>it also erases your progress and the labs you built.</strong> Keep it as a last
              resort.
            </p>
            <div className="cp-en">
              <p>
                Force-quit the app and open it again; if that does not help, restart the device. If
                it persists, write to us with your device model, iOS version and app version.
              </p>
            </div>
          </div>
        </details>
      </section>

      {/* ── 데이터 삭제 ── */}
      <section>
        <h2>데이터 삭제 · Deleting your data</h2>
        <p>
          이 앱과 관련해 기기에 저장된 모든 것은{' '}
          <strong>앱을 삭제하면 함께 사라집니다.</strong> 저희 서버에 보관된 것이 없으므로 따로
          요청하실 절차가 없습니다. 자세한 내용은{' '}
          <Link href="/contraptionlab/privacy">개인정보처리방침</Link>을 봐 주십시오.
        </p>
        <div className="cp-en-block">
          <p>
            Everything this app stores on your device is removed when you delete the app. We hold
            nothing on a server, so there is no request to make. See the{' '}
            <Link href="/contraptionlab/privacy">privacy policy</Link> for details.
          </p>
        </div>
      </section>
    </div>
  );
}
