'use client';

/* 이 페이지는 한/영을 동시에 보여준다 — App Store Connect 의 Support URL 로 등록되는 주소라
   언어 토글을 눌러야만 영어가 보이면 곤란하다 (steelstorm/support 와 같은 규칙).

   답변 근거(APLUS/steelrace): stadium/index.html(HUD 버튼 자리 · 설정 항목 이름),
   stadium/app.js(기본값 — 조종 '기울기' · 연출 '자동'(루키 켬 · 프로 약하게) · 햅틱 '강하게',
   기울기에서 센서가 없으면 터치 스틱), stadium/core.js dailySeed(한국 시간 자정),
   docs/GAMECENTER.md(순위표에 오르는 조건), app/ios(iOS 15.0 · 가로 전용).
   앱에서 버튼 자리나 설정 이름이 바뀌면 이 페이지도 고친다. */

import Link from 'next/link';
import { EMAIL } from '../i18n';

export default function SupportContent() {
  return (
    <div className="sr-wrap sr-doc">
      <div className="sr-doc-head">
        <h1>
          지원
          <br />
          Support
        </h1>
        <div className="sr-sub">스틸레이스 · STEELRACE</div>
        <div className="sr-rev">
          문의는 보통 1~2 영업일 안에 답장 드립니다 · We usually reply within 1–2 business days
        </div>
      </div>

      {/* ── 문의 ── */}
      <section>
        <h2>문의 · Contact</h2>
        <div className="sr-contact">
          <div style={{ fontSize: '14px', color: 'var(--sr-ink-3)' }}>주식회사 예아플러스(yeahplus)</div>
          <a className="sr-mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <div className="sr-note">
            버그 제보와 의견을 보내 주십시오. 한국어와 영어로 답장 드립니다.
            <br />
            Bug reports and suggestions are welcome. We reply in Korean and English.
          </div>
        </div>
        <p className="sr-hint">
          버그를 알려 주실 때 <strong>기기 모델 · iOS 버전 · 앱 버전</strong>과 어떤 모드·장소에서
          일어났는지를 함께 적어 주시면 훨씬 빨리 원인을 찾을 수 있습니다. 화면 녹화가 있으면 가장
          좋습니다.
          <br />
          Please include your <strong>device model, iOS version and app version</strong>, plus the
          mode and the part of the course where it happened. A screen recording helps most of all.
        </p>
      </section>

      {/* ── 조작 ── */}
      <section>
        <h2>조작 · Controls</h2>
        <div className="sr-pad" aria-hidden="true">
          <span className="sr-p-top">⟲ ☰</span>
          <span className="sr-p-mid">
            기울기 · 또는 터치 스틱
            <small>Tilt · or touch stick</small>
          </span>
          <span className="sr-p-thr">
            스로틀
            <small>Throttle</small>
          </span>
          <span className="sr-p-brk">
            브레이크
            <small>Brake</small>
          </span>
        </div>
        <ul className="sr-bullets">
          <li>
            <strong>방향</strong> — 기본은 <strong>기울기</strong>입니다. 휴대폰을 기울이면 드론이
            기웁니다. 동작 센서 사용을 묻는 창이 뜨면 허용해 주세요.
          </li>
          <li>
            <strong>터치로 조종</strong> — 설정 ⚙ › 조종 › <strong>터치</strong>. 화면을 누른 자리에
            스틱이 생기고, 손가락을 끄는 쪽으로 납니다. 동작 센서를 허용하지 않았거나 쓸 수 없을 때도
            터치 스틱이 대신합니다.
          </li>
          <li>
            <strong>스로틀</strong>(왼쪽 아래) — 누르고 있는 동안 가속합니다.{' '}
            <strong>브레이크</strong>(오른쪽 아래) — 속도를 줄이고 미끄러짐을 정리합니다.
          </li>
          <li>
            오른쪽 위 <strong>⟲</strong> 은 바로 다시 날기, <strong>☰</strong> 은 메뉴입니다.
          </li>
          <li>
            기울기 조종이 한쪽으로 쏠리면 설정의 <strong>지금 자세 = 기준</strong>을 누르세요. 좌우가
            반대로 느껴지면 <strong>좌우 반전</strong>을 켭니다.
          </li>
        </ul>
        <div className="sr-en-block">
          <ul className="sr-bullets">
            <li>
              <strong>Steering</strong> — <strong>Tilt</strong> is the default: tilt the phone and the
              drone banks with it. If asked for motion-sensor access, allow it.
            </li>
            <li>
              <strong>Touch steering</strong> — Settings ⚙ › 조종 (Control) › <strong>터치</strong> (Touch). A stick
              appears where you touch the screen; drag toward where you want to go. The touch stick
              also takes over if motion access is not allowed or not available.
            </li>
            <li>
              <strong>Throttle</strong> (bottom left) accelerates while held. <strong>Brake</strong>{' '}
              (bottom right) slows you down and tidies up a slide.
            </li>
            <li>
              Top right: <strong>⟲</strong> restarts instantly, <strong>☰</strong> opens the menu.
            </li>
            <li>
              If tilt steering drifts to one side, tap <strong>지금 자세 = 기준</strong> (set current pose as
              level) in Settings. If left and right feel reversed, turn on <strong>좌우 반전</strong>{' '}
              (invert left/right).
            </li>
          </ul>
        </div>
      </section>

      {/* ── 모드 ── */}
      <section>
        <h2>모드 · Modes</h2>
        <div className="sr-table-wrap">
          <table className="sr-spec">
            <tbody>
              <tr>
                <th>
                  리그 나이트
                  <br />
                  League Night
                </th>
                <td>
                  기본 모드. 예선 히트(여섯 대 중 세 대) → 준결승(네 대 중 두 대) → 두 바퀴 골든 히트.
                  떨어지면 그 라운드부터 다시 납니다.
                  <br />
                  The default. Qualifying heat (three of six) → semifinal (two of four) → a two-lap
                  Golden Heat. Drop out and you retry that round.
                </td>
              </tr>
              <tr>
                <th>
                  구간 연습
                  <br />
                  Stage practice
                </th>
                <td>
                  장소 둘씩 이은 스테이지 세 개를 골라 반복합니다. 준비 비행 3초 뒤에 기록이 시작됩니다.
                  <br />
                  Pick one of three stages, two places each, and repeat it. The clock starts after a
                  three-second run-up.
                </td>
              </tr>
              <tr>
                <th>
                  1랩
                  <br />1 Lap
                </th>
                <td>
                  혼자 한 바퀴 타임어택. 오늘의 코스 기록은 Game Center 오늘의 순위표에 오릅니다.
                  <br />
                  A solo one-lap time attack. Times on today&rsquo;s course go to the daily Game
                  Center leaderboards.
                </td>
              </tr>
              <tr>
                <th>
                  히트 2랩
                  <br />
                  Heat
                </th>
                <td>
                  라이벌 셋과 두 바퀴.
                  <br />
                  Two laps against three rivals.
                </td>
              </tr>
              <tr>
                <th>
                  루키 · 프로 FPV
                  <br />
                  Rookie · Pro FPV
                </th>
                <td>
                  루키는 속도·높이·벽을 보조가 맡고 카메라가 뒤에서 따라갑니다. 프로는 FPV 화면으로
                  전부 손으로 납니다.
                  <br />
                  Rookie hands speed, height and walls to an assist, with a chase camera. Pro is the
                  FPV view, everything by hand.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 설정 ── */}
      <section>
        <h2>설정 · Settings</h2>
        <p>
          타이틀 화면의 ⚙ 에서 바꿉니다.
          <br />
          Change these from ⚙ on the title screen. This version&rsquo;s screens are in Korean — each
          item below gives the Korean label first.
        </p>
        <ul className="sr-bullets">
          <li>
            <strong>햅틱</strong> — 강하게(기본) · 보통 · 끔. 충돌·스침·콤보마다 진동 모양이 다릅니다.
            <br />
            <strong>Haptics</strong> — Strong (default) · Medium · Off.
          </li>
          <li>
            <strong>연출</strong> — 자동(기본) · 켬 · 약하게 · 끔. 슬로모션과 추락 리플레이 같은 연출의
            세기입니다. 자동은 루키에서 켬, 프로에서 약하게입니다.
            <br />
            <strong>Effects</strong> — Auto (default) · On · Light · Off: how much slow motion and crash
            replay you get. Auto is On for Rookie and Light for Pro.
          </li>
          <li>
            <strong>카메라</strong> — FPV · 추격. <strong>롤 · FOV · 노이즈</strong>는 프로 FPV 화면의
            멀미 조절용입니다.
            <br />
            <strong>Camera</strong> — FPV · Chase. <strong>Roll, FOV and Noise</strong> tune the Pro
            FPV view for motion comfort.
          </li>
          <li>
            <strong>코스</strong> — ◀ ▶ 로 다른 코스를 날고, <strong>오늘</strong>로 오늘의 코스에
            돌아옵니다.
            <br />
            <strong>Course</strong> — ◀ ▶ to fly other courses, <strong>Today</strong> to come back.
          </li>
        </ul>
      </section>

      {/* ── FAQ ── */}
      <section>
        <h2>자주 묻는 질문 · Frequently asked questions</h2>

        <details>
          <summary>
            <span className="sr-q">
              오늘의 코스는 언제 바뀌나요?
              <span className="sr-q-en">When does Today&rsquo;s Course change?</span>
            </span>
          </summary>
          <div className="sr-ans">
            <p>
              매일 <strong>한국 시간 자정</strong>(UTC 15:00)에 모두 같이 바뀌고, 오늘의 순위표도 그때
              새로 시작합니다. 다른 코스는 설정 › 코스 의 ◀ ▶ 로 날 수 있지만, 오늘의 순위표에는
              오늘 코스의 1랩 기록만 오릅니다.
            </p>
            <div className="sr-en">
              <p>
                Every day at <strong>midnight Korea time</strong> (15:00 UTC), for everyone at once —
                the daily leaderboards restart then too. Other courses can be flown via Settings ›
                Course ◀ ▶, but only 1 Lap times on today&rsquo;s course go to the daily leaderboards.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="sr-q">
              [순위] · [도전과제] 버튼이 보이지 않아요.
              <span className="sr-q-en">I can&rsquo;t see the Leaderboards or Achievements buttons.</span>
            </span>
          </summary>
          <div className="sr-ans">
            <p>
              두 버튼은 Game Center 에 로그인했을 때만 나타납니다. iPhone 의 설정 앱 › Game Center 에서
              로그인한 뒤 앱을 다시 열어 주세요. 로그인하지 않아도 레이스는 모두 할 수 있습니다. 순위표는
              인터넷 연결이 필요합니다.
            </p>
            <div className="sr-en">
              <p>
                Both buttons appear only when you are signed in to Game Center. Sign in from the
                Settings app › Game Center, then reopen the game. Every race works without signing
                in. Leaderboards need an internet connection.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="sr-q">
              리그 나이트에서 떨어지면 처음부터인가요?
              <span className="sr-q-en">If I drop out of League Night, do I start over?</span>
            </span>
          </summary>
          <div className="sr-ans">
            <p>
              아니요. 떨어진 <strong>그 라운드부터</strong> 다시 납니다. 막히는 장소가 있으면 구간
              연습에서 그 스테이지를 반복해 보세요.
            </p>
            <div className="sr-en">
              <p>
                No — you retry <strong>that round</strong>. If one part of the course keeps beating
                you, repeat its stage in Stage practice.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="sr-q">
              화면을 보면 어지러워요.
              <span className="sr-q-en">The view makes me dizzy.</span>
            </span>
          </summary>
          <div className="sr-ans">
            <p>
              설정에서 <strong>롤</strong>을 &lsquo;절반&rsquo;이나 &lsquo;수평&rsquo;으로,{' '}
              <strong>FOV</strong>를 낮게, <strong>노이즈</strong>를 끄거나 <strong>카메라</strong>를
              &lsquo;추격&rsquo;으로 바꿔 보세요. 루키는 늘 뒤에서 따라가는 카메라입니다. 연출을
              &lsquo;약하게&rsquo;나 &lsquo;끔&rsquo;으로 두면 슬로모션도 줄어듭니다.
            </p>
            <div className="sr-en">
              <p>
                In Settings, set <strong>Roll</strong> to Half or Level, lower the <strong>FOV</strong>,
                turn <strong>Noise</strong> off, or switch the <strong>Camera</strong> to Chase. Rookie
                always uses the chase camera. Setting Effects to Light or Off also cuts down slow
                motion.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="sr-q">
              진동이나 소리가 나지 않아요.
              <span className="sr-q-en">There is no vibration or sound.</span>
            </span>
          </summary>
          <div className="sr-ans">
            <p>
              진동은 설정 › <strong>햅틱</strong>이 &lsquo;끔&rsquo;이 아닌지 확인해 주세요. 소리는
              iPhone 이 <strong>무음 모드</strong>이면 나지 않을 수 있습니다. 모터·관중 소리가 360도로
              들리도록 만들어 이어폰을 권합니다.
            </p>
            <div className="sr-en">
              <p>
                For vibration, check that Settings › <strong>Haptics</strong> is not Off. Sound may
                not play while the iPhone is in <strong>Silent mode</strong>. Motors and crowd are
                placed in 360-degree space, so headphones are recommended.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="sr-q">
              기록을 다른 기기로 옮길 수 있나요?
              <span className="sr-q-en">Can I move my records to another device?</span>
            </span>
          </summary>
          <div className="sr-ans">
            <p>
              최고 기록·메달·설정은 그 기기 안에만 저장되어 옮겨지지 않으며, 앱을 삭제하면 함께
              사라집니다. Game Center 의 순위와 도전과제는 Apple 계정에 남습니다. 자세한 내용은{' '}
              <Link href="/steelrace/privacy">개인정보처리방침</Link>을 보세요.
            </p>
            <div className="sr-en">
              <p>
                Best times, medals and settings live only on that device; they don&rsquo;t transfer
                and are deleted with the app. Game Center leaderboard entries and achievements stay
                with your Apple account. See the <Link href="/steelrace/privacy">privacy policy</Link>.
              </p>
            </div>
          </div>
        </details>

        <details>
          <summary>
            <span className="sr-q">
              인터넷 없이 할 수 있나요?
              <span className="sr-q-en">Does it work offline?</span>
            </span>
          </summary>
          <div className="sr-ans">
            <p>네. 비행은 모두 오프라인으로 됩니다. Game Center 순위표만 연결이 필요합니다.</p>
            <div className="sr-en">
              <p>Yes. Every flight works offline; only the Game Center leaderboards need a connection.</p>
            </div>
          </div>
        </details>
      </section>

      {/* ── 동작 환경 ── */}
      <section>
        <h2>동작 환경 · Requirements</h2>
        <div className="sr-table-wrap">
          <table className="sr-spec">
            <tbody>
              <tr>
                <th>기기 · Device</th>
                <td>iPhone</td>
              </tr>
              <tr>
                <th>iOS</th>
                <td>iOS 15.0 이상 · iOS 15.0 or later</td>
              </tr>
              <tr>
                <th>화면 · Orientation</th>
                <td>가로 · Landscape</td>
              </tr>
              <tr>
                <th>앱 언어 · App language</th>
                <td>한국어 · Korean</td>
              </tr>
              <tr>
                <th>Game Center</th>
                <td>
                  순위표 4 · 도전과제 16 (로그인 선택)
                  <br />4 leaderboards · 16 achievements (sign-in optional)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
