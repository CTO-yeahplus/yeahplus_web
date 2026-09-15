'use client';

/* 이 페이지는 한/영을 동시에 보여준다 — App Store Connect 의 Support URL 로
   등록되는 주소라 언어 토글을 눌러야만 영어가 보이면 곤란하다.
   FAQ 질문은 summary 에 한글·영어를 나란히 적는다.

   답변 근거: src/game.js(설정 항목·조작·미션·데일리 런),
   app/ios/App/App/Info.plist(화면 방향), app/ios/App/Podfile(iOS 15.0),
   docs/GAME_CENTER.md(리더보드 2종·도전 과제 15종),
   docs/REVIEW_SUBMISSION.md(데이터 미수집). 확인되지 않은 것은 쓰지 않았다. */

import Link from 'next/link';
import { EMAIL } from '../i18n';

export default function SupportContent() {
  return (
    <div className="ss-wrap ss-doc">
      <div className="ss-doc-head">
        <h1>
          지원
          <br />
          Support
        </h1>
        <div className="ss-sub">스틸스톰 아레나 · SteelStorm Arena</div>
        <div className="ss-rev">
          문의는 보통 1~2 영업일 안에 답장 드립니다 · We usually reply within 1–2 business days
        </div>
      </div>

      {/* ── 문의 ── */}
      <section>
        <h2>문의 · Contact</h2>
        <div className="ss-contact">
          <div style={{ fontSize: '14px', color: 'var(--ss-ink-3)' }}>
            주식회사 예아플러스(yeahplus)
          </div>
          <a className="ss-mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <div className="ss-note">
            버그 제보와 의견을 보내 주십시오. 한국어와 영어로 답장 드립니다.
            <br />
            Bug reports and suggestions are welcome. We reply in Korean and English.
          </div>
        </div>
        <p className="ss-hint">
          버그를 알려 주실 때 <strong>기기 모델 · iOS 버전 · 앱 버전</strong>과 어떤 상황에서
          일어났는지를 함께 적어 주시면 훨씬 빨리 원인을 찾을 수 있습니다. 화면 녹화가 있으면 가장
          좋습니다.
          <br />
          Please include your <strong>device model, iOS version and app version</strong>, plus what
          you were doing when it happened. A screen recording helps most of all.
        </p>
      </section>

      {/* ── 동작 환경 ── */}
      <section>
        <h2>동작 환경 · Requirements</h2>
        <div className="ss-table-wrap">
          <table className="ss-spec">
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
                <td>세로 · 가로 모두 · Portrait and landscape</td>
              </tr>
              <tr>
                <th>언어 · Language</th>
                <td>한국어 · English · 日本語 · 繁體中文</td>
              </tr>
              <tr>
                <th>인터넷 · Internet</th>
                <td>필요 없음 (완전 오프라인) · Not required (fully offline)</td>
              </tr>
              <tr>
                <th>Game Center</th>
                <td>
                  리더보드 2종 · 도전 과제 15종 (로그인 선택)
                  <br />2 leaderboards · 15 achievements (sign-in optional)
                </td>
              </tr>
              <tr>
                <th>
                  컨트롤러 · Controller
                </th>
                <td>
                  터치 · 게임패드 · Touch and gamepad
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ ──
          질문은 한글·영어를 summary 에 나란히 적는다. 답변은 한글 먼저,
          .ss-en 블록에 영어. */}
      <section>
        <h2>자주 묻는 질문 · Frequently asked questions</h2>

        <details>
          <summary>
            <span className="ss-q">
              조작을 어떻게 하는지 모르겠습니다.
              <span className="ss-q-en">How do the controls work?</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>화면 왼쪽을 손가락으로 끌면 기체가 따라옵니다. 조준과 발사는 자동입니다.</p>
            <ul className="ss-bullets">
              <li>
                <strong>DASH</strong> — 짧은 무적이 붙은 회피. 탄막이 닫히기 직전에 씁니다.
              </li>
              <li>
                <strong>COLOR</strong> — 코어 컬러를 시안 · 마젠타 · 오렌지로 전환합니다.
              </li>
              <li>
                <strong>DRIVE</strong> — 게이지가 차면 오버드라이브로 변신합니다.
              </li>
              <li>
                <strong>WPN</strong> — 고철로 산 보조무기를 씁니다.
              </li>
            </ul>
            <p>게임패드를 연결하면 스틱과 버튼으로도 조작할 수 있습니다.</p>
            <div className="ss-en">
              <p>
                Drag on the left side of the screen and the machine follows; aiming and firing are
                automatic. <strong>DASH</strong> is a quick evade with brief invincibility — use it
                just before the bullets close. <strong>COLOR</strong> switches your core between
                cyan, magenta and orange. <strong>DRIVE</strong> transforms you into Overdrive once
                the gauge is full. <strong>WPN</strong> fires the secondary weapon you bought with
                salvage. A connected gamepad works too.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="ss-q">
              코어 컬러가 무슨 뜻인가요?
              <span className="ss-q-en">What does the core color do?</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>
              적에게도 색이 있습니다. <strong>내 코어와 같은 색의 적</strong>을 맞히면 최대 피해가
              들어가고 점수도 1.5배가 됩니다. 색이 다르면 피해가 줄어듭니다. 그래서 무엇을 먼저
              잡을지 정하고 거기에 색을 맞추는 것이 이 게임의 기본 판단입니다.
            </p>
            <p>
              색 구분이 어려우시면 설정에서{' '}
              <strong>「코어 기호 표시」</strong>를 켜 주십시오. 색 대신 모양(● ▲ ◆)으로도 코어를
              구분할 수 있습니다.
            </p>
            <div className="ss-en">
              <p>
                Enemies have colors too. Hitting an enemy{' '}
                <strong>whose color matches your core</strong> deals full damage and scores 1.5&times;;
                a mismatch deals less. Deciding what to kill first and matching its color is the
                basic judgment of the game. If colors are hard to tell apart, turn on{' '}
                <strong>Core glyphs</strong> in settings — cores are then also marked by shape
                (● ▲ ◆).
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="ss-q">
              변신(오버드라이브)이 안 됩니다.
              <span className="ss-q-en">I cannot transform into Overdrive.</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>
              오버드라이브 게이지는 <strong>적을 격추해야</strong> 찹니다. 화면 아래 게이지가 가득
              차면 DRIVE 버튼이 켜지고 안내 문구가 뜹니다. 그때 누르면 변신합니다.
            </p>
            <p>
              변신한 상태에서 계속 격추해 게이지를 다시 채우면 DRIVE 를 한 번 더 눌러 진화할 수
              있습니다. 이렇게 3단(맥스 드라이브)까지 올라갑니다.
            </p>
            <div className="ss-en">
              <p>
                The Overdrive gauge fills <strong>by destroying enemies</strong>. When the gauge at
                the bottom is full, the DRIVE button lights up with a prompt — press it to
                transform. Keep killing while transformed to refill the gauge and press DRIVE again
                to evolve, up to the third stage (MAX DRIVE).
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="ss-q">
              소리가 나지 않습니다.
              <span className="ss-q-en">There is no sound.</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>차례로 확인해 주세요.</p>
            <ul className="ss-bullets">
              <li>기기 측면의 무음 스위치가 켜져 있는지</li>
              <li>음량 버튼으로 소리가 올라가 있는지</li>
              <li>
                설정 화면의 <strong>전체 음량 · 음악 · 효과음 · 무전 음성</strong> 슬라이더가 0 이
                아닌지
              </li>
              <li>다른 앱이 오디오를 잡고 있지는 않은지 (통화·음악 앱을 잠시 닫아 보십시오)</li>
            </ul>
            <div className="ss-en">
              <p>
                Check in order: the silent switch on the side of the device, the volume buttons, and
                the <strong>master, music, effects and voice</strong> sliders in the settings
                screen. Also close any other app that may be holding the audio session, such as a
                call or a music player.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="ss-q">
              화면 흔들림과 섬광이 부담스럽습니다.
              <span className="ss-q-en">The screen shake and flashes bother me.</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>
              설정에서 <strong>화면 흔들림</strong>과 <strong>섬광 효과</strong>를 각각 줄이거나 끌
              수 있습니다. <strong>진동(햅틱)</strong>도 따로 끌 수 있습니다.
            </p>
            <div className="ss-en">
              <p>
                In settings you can lower or switch off <strong>screen shake</strong> and{' '}
                <strong>flash effects</strong> independently, and turn off{' '}
                <strong>haptics</strong> as well.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="ss-q">
              언어를 바꾸고 싶습니다.
              <span className="ss-q-en">How do I change the language?</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>
              타이틀 화면 오른쪽 위의 언어 버튼을 누르면 한국어 · English · 日本語 · 繁體中文 순으로
              바뀝니다. 처음 실행할 때는 기기 언어를 따릅니다.
            </p>
            <div className="ss-en">
              <p>
                The language button at the top right of the title screen cycles through Korean,
                English, Japanese and Traditional Chinese. On first launch the app follows your
                device language.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="ss-q">
              Game Center 랭킹 버튼이 보이지 않습니다.
              <span className="ss-q-en">The Game Center ranking button is missing.</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>
              랭킹과 도전 과제 버튼은 <strong>Game Center 를 쓸 수 있는 기기에서만</strong>{' '}
              표시됩니다. iOS 설정 → Game Center 에서 로그인되어 있는지 확인해 주십시오. 로그인을
              하지 않아도 게임의 모든 기능은 그대로 동작하며, 점수만 순위에 오르지 않습니다.
            </p>
            <p>
              리더보드는 <strong>최고 점수</strong>와 <strong>데일리 런</strong> 두 종이고, 도전 과제는
              15종입니다.
            </p>
            <div className="ss-en">
              <p>
                The ranking and achievement buttons appear{' '}
                <strong>only where Game Center is available</strong>. Check that you are signed in
                under iOS Settings → Game Center. Without it every feature of the game still works;
                only your scores do not reach the rankings. There are two leaderboards —{' '}
                <strong>best score</strong> and <strong>daily run</strong> — and 15 achievements.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="ss-q">
              데일리 런은 무엇인가요?
              <span className="ss-q-en">What is the Daily Run?</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>
              날짜로 만든 씨앗을 써서 웨이브 구성과 미션, 제시되는 강화까지 모두 같게 맞춘
              하루짜리 판입니다. 같은 날 도전하는 사람은 모두 같은 아레나를 만납니다. 오늘의 최고
              점수는 기기에도 저장되어 타이틀 화면에 표시됩니다.
            </p>
            <div className="ss-en">
              <p>
                A run of the day built from a date seed, so the waves, the missions and even the
                upgrades offered are the same for everyone playing that day. Your best score for
                today is also stored on the device and shown on the title screen.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="ss-q">
              진행 상황과 최고 점수가 사라졌습니다.
              <span className="ss-q-en">My progress and best score are gone.</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>
              기록은 기기 안에만 저장됩니다. 앱을 삭제하면 함께 삭제되고 복구할 방법이 없습니다.
              계정도 클라우드 동기화도 없기 때문에 저희 쪽에도 사본이 남아 있지 않습니다. 기기 저장
              공간이 매우 부족한 상태에서 iOS 가 앱 데이터를 정리한 경우에도 같습니다.
            </p>
            <p>
              Game Center 에 제출된 점수는 Apple 이 보관하므로, 로그인해 두셨다면 리더보드의 기록은
              남아 있습니다.
            </p>
            <div className="ss-en">
              <p>
                Records are stored only on the device. Deleting the app deletes them, with no way to
                recover — there is no account and no cloud sync, so we hold no copy either. The same
                applies if iOS cleared app data because storage was critically low. Scores already
                submitted to Game Center are held by Apple, so if you were signed in, the
                leaderboard entries remain.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="ss-q">
              다른 기기에서 이어서 하고 싶습니다.
              <span className="ss-q-en">Can I continue on another device?</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>
              기기 사이 이어하기는 지원하지 않습니다. 계정과 서버가 없기 때문입니다. 개인정보를
              전혀 받지 않기 위해 감수한 제약이며, 앞으로도 계정을 만들 계획은 없습니다.
            </p>
            <div className="ss-en">
              <p>
                No. Cross-device continuation would require an account and a server, and the app has
                neither. This is the trade-off we accepted in order to collect nothing, and we do
                not plan to add accounts.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="ss-q">
              인터넷 없이도 되나요?
              <span className="ss-q-en">Does it work without internet?</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>
              됩니다. 게임은 기기에서 단독으로 돌아가며 서버에 연결하지 않습니다. 비행기 모드에서도
              똑같이 동작합니다. Game Center 순위만 애플 서비스를 쓰고, 그마저도 선택입니다.
            </p>
            <div className="ss-en">
              <p>
                Yes. The game runs entirely on the device and connects to no server — it plays the
                same in Airplane Mode. Only Game Center rankings use an Apple service, and even that
                is optional.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="ss-q">
              광고나 추가 결제가 나오나요?
              <span className="ss-q-en">Are there ads or extra charges?</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>
              없습니다. 광고도, 인앱결제도, 구독도 없습니다. 격납고의 기체와 영구 강화는 게임 안에서
              모으는 고철로만 해금되며, 현금으로 사는 항목은 하나도 없습니다.
            </p>
            <div className="ss-en">
              <p>
                None. No ads, no in-app purchases, no subscription. Chassis and permanent upgrades in
                the hangar are unlocked only with salvage earned in game; nothing is sold for money.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="ss-q">
              환불하고 싶습니다.
              <span className="ss-q-en">I would like a refund.</span>
            </span>
          </summary>
          <div className="ss-ans">
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
            <div className="ss-en">
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
            <span className="ss-q">
              앱이 멈추거나 화면이 이상합니다.
              <span className="ss-q-en">The app froze or looks wrong.</span>
            </span>
          </summary>
          <div className="ss-ans">
            <p>
              앱을 완전히 종료했다가 다시 열어 주십시오. 그래도 같다면 기기를 한 번 재시동해
              보십시오. 계속된다면 위 문의 주소로 기기 모델 · iOS 버전 · 앱 버전과 함께 알려
              주십시오.
            </p>
            <p className="ss-hint">
              앱을 지우고 다시 설치하면 대부분 해결되지만,{' '}
              <strong>기기에 저장된 기록도 함께 지워집니다.</strong> 마지막 수단으로만 쓰십시오.
              <br />
              Reinstalling usually helps, but{' '}
              <strong>it also erases the records stored on your device.</strong> Keep it as a last
              resort.
            </p>
            <div className="ss-en">
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
          <Link href="/steelstorm/privacy">개인정보처리방침</Link>을 봐 주십시오.
        </p>
        <div className="ss-en-block">
          <p>
            Everything this app stores on your device is removed when you delete the app. We hold
            nothing on a server, so there is no request to make. See the{' '}
            <Link href="/steelstorm/privacy">privacy policy</Link> for details.
          </p>
        </div>
      </section>
    </div>
  );
}
