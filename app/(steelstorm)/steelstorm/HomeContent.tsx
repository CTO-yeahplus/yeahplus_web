'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EMAIL } from './i18n';

/* 문안 근거: steelstorm/docs/METADATA.md(제출 설명문·스크린샷 캡션),
   docs/REVIEW_SUBMISSION.md(개인정보 라벨), docs/GAME_CENTER.md(리더보드·도전 과제),
   app/ios/App/App/Info.plist(화면 방향)·Podfile(iOS 15.0), src/game.js(언어 4종·기체 4종).
   가격은 적지 않는다 — 변동 여지가 있어 App Store 표기를 따른다. */

/** 출시됨(2026-09). 이 값이 비면 버튼이 자동으로 「곧 출시」 안내로 돌아간다. */
const APP_STORE_URL = 'https://apps.apple.com/kr/app/id6810026354';

/** 스크린샷 — store/screenshots/raw/ko/iphone-6.9 (배너 문구를 얹기 전 원본). */
const SHOTS = [
  { src: 'swarm', ko: '탄막을 대시로 가른다', en: 'Dash through the wall of bullets' },
  { src: 'color', ko: '코어 컬러를 맞춰 최대 피해', en: 'Match the core color for full damage' },
  { src: 'build', ko: '웨이브마다 강화를 고른다', en: 'Pick an upgrade every wave' },
  { src: 'drive', ko: '3단 변신 — 맥스 드라이브', en: 'Evolve through three Overdrive forms' },
  { src: 'boss', ko: '5웨이브마다 보스전', en: 'A boss every 5th wave' },
];

const BADGES = [
  { ko: '완전 오프라인', en: 'Fully offline' },
  { ko: '광고 없음', en: 'No ads' },
  { ko: '인앱결제 없음', en: 'No in-app purchases' },
  { ko: '데이터 수집 없음', en: 'No data collected' },
  { ko: '한 판 2~5분', en: 'A run in 2–5 minutes' },
];

export default function HomeContent() {
  return (
    <>
      <header className="ss-hero ss-wrap">
        <Image
          className="ss-emblem"
          src="/steelstorm/emblem-512.webp"
          alt=""
          width={512}
          height={512}
          priority
          aria-hidden="true"
        />
        <div className="ss-kicker">
          <span data-l="ko">변신 메카 아레나 슈터</span>
          <span data-l="en">Transforming mecha shooter</span>
        </div>
        <h1>
          <span data-l="ko">스틸스톰 아레나</span>
          <span data-l="en">SteelStorm Arena</span>
        </h1>
        <div className="ss-hero-pitch">
          <p data-l="ko">
            기체는 알아서 조준하고 발사합니다. 당신이 할 일은{' '}<b>판단</b>입니다 — 포위를 읽고,
            대시로 탄막을 빠져나가고, 코어 컬러를 맞추고, 변신할 순간을 고르는 것.
          </p>
          <p data-l="en">
            Your machine aims and fires on its own. Your job is{' '}<b>judgment</b> — read the swarm,
            dash through bullet walls, match your core color, and pick the moment to transform.
          </p>
        </div>

        <div className="ss-store-row">
          <a
            className="ss-store-btn ss-plain"
            href={APP_STORE_URL || '#'}
            aria-disabled={APP_STORE_URL ? undefined : true}
            target={APP_STORE_URL ? '_blank' : undefined}
            rel={APP_STORE_URL ? 'noreferrer' : undefined}
          >
            <span>
              <small data-l="ko">iPhone · iPad</small>
              <small data-l="en">iPhone · iPad</small>
              {APP_STORE_URL ? (
                <>
                  <span data-l="ko">App Store에서 받기</span>
                  <span data-l="en">Download on the App Store</span>
                </>
              ) : (
                <>
                  <span data-l="ko">App Store 곧 출시</span>
                  <span data-l="en">Coming soon to the App Store</span>
                </>
              )}
            </span>
          </a>
          <span className="ss-price-note">
            <span data-l="ko">유료 앱 · 한 번 구매하면 추가 결제 없음 (가격은 App Store 참조)</span>
            <span data-l="en">Paid app · one purchase, nothing more (see the App Store for pricing)</span>
          </span>
        </div>

        <div className="ss-badges">
          {BADGES.map((b) => (
            <span className="ss-badge" key={b.en}>
              <span data-l="ko">{b.ko}</span>
              <span data-l="en">{b.en}</span>
            </span>
          ))}
        </div>
      </header>

      <div className="ss-wrap">
        {/* ── 핵심 규칙 ── */}
        <section id="how">
          <h2>
            <span data-l="ko">한 판을 가르는 세 가지</span>
            <span data-l="en">Three things decide a run</span>
          </h2>
          <p className="ss-lead">
            <span data-l="ko">
              조준은 기체가 합니다. 그래서 이 게임의 난이도는 조준 실력이 아니라, 아래 셋을 언제
              쓰느냐에서 나옵니다.
            </span>
            <span data-l="en">
              The machine does the aiming. Difficulty here is not about your aim — it is about when
              you use these three.
            </span>
          </p>

          <div className="ss-grid">
            <div className="ss-card">
              <span className="ss-tag ss-t-cyan">
                <span data-l="ko">코어 컬러</span>
                <span data-l="en">Core color</span>
              </span>
              <h3>
                <span data-l="ko">같은 색으로 맞힌다</span>
                <span data-l="en">Hit the matching color</span>
              </h3>
              <p data-l="ko">
                적과 같은 색의 코어로 맞히면 최대 피해에 점수 1.5배. 색을 바꾸는 한 번의 판단이
                교전 전체를 뒤집습니다.
              </p>
              <p data-l="en">
                A matching core color deals full damage and scores 1.5&times;. One switch at the
                right moment turns a whole fight around.
              </p>
              <div className="ss-cores" aria-hidden="true">
                <span className="ss-core ss-c1" />
                <span className="ss-core ss-c2" />
                <span className="ss-core ss-c3" />
              </div>
            </div>

            <div className="ss-card">
              <span className="ss-tag ss-t-magenta">
                <span data-l="ko">오버드라이브</span>
                <span data-l="en">Overdrive</span>
              </span>
              <h3>
                <span data-l="ko">변신은 세 번 진화한다</span>
                <span data-l="en">Transform, then evolve twice</span>
              </h3>
              <p data-l="ko">
                격추로 게이지를 채워 변신하고, 변신한 상태에서 다시 채워 진화합니다. 단계마다
                기체가 커지고 화력·연사·기동이 올라갑니다.
              </p>
              <p data-l="en">
                Fill the gauge with kills to transform, then refill it mid-form to evolve. Each
                stage grows the machine and raises firepower, fire rate and speed.
              </p>
              <div className="ss-stages" aria-hidden="true">
                <span className="ss-stage ss-s1">1</span>
                <span className="ss-arrow">›</span>
                <span className="ss-stage ss-s2">2</span>
                <span className="ss-arrow">›</span>
                <span className="ss-stage ss-s3">MAX</span>
              </div>
            </div>

            <div className="ss-card">
              <span className="ss-tag ss-t-orange">
                <span data-l="ko">대시</span>
                <span data-l="en">Dash</span>
              </span>
              <h3>
                <span data-l="ko">무적 프레임으로 빠져나간다</span>
                <span data-l="en">Slip out with i-frames</span>
              </h3>
              <p data-l="ko">
                대시에는 짧은 무적 구간이 있습니다. 탄막이 닫히기 직전에 쓰면 포위를 그대로
                통과합니다. 쿨타임을 언제 쓰느냐가 곧 생존입니다.
              </p>
              <p data-l="en">
                A dash carries brief invincibility. Used just before the bullets close, it takes you
                straight through the encirclement. Spending that cooldown well is survival.
              </p>
            </div>
          </div>
        </section>

        {/* ── 웨이브와 보스 ── */}
        <section>
          <h2>
            <span data-l="ko">웨이브를 버티고, 빌드를 만든다</span>
            <span data-l="en">Survive waves, build your machine</span>
          </h2>

          <div className="ss-grid">
            <div className="ss-card">
              <h3>
                <span data-l="ko">5웨이브마다 보스</span>
                <span data-l="en">A boss every 5th wave</span>
              </h3>
              <p data-l="ko">
                쫓아오는 드론, 측면을 잡는 스팅어, 갈라지는 스플리터, 밀고 들어오는 탱크. 다섯
                웨이브마다 보스가 아레나를 탄막으로 덮고, 웨이브 25에는 최종 보스 타이탄이
                기다립니다. 격파하면 끝없는 폭풍 모드가 열립니다.
              </p>
              <p data-l="en">
                Chasing drones, flanking stingers, splitting swarmers, crushing tanks. A boss floods
                the arena every fifth wave, and the Titan waits at wave 25 — beat it to unlock
                Endless Storm.
              </p>
            </div>

            <div className="ss-card">
              <h3>
                <span data-l="ko">기체 4종과 8계열 강화</span>
                <span data-l="en">Four chassis, eight upgrade lines</span>
              </h3>
              <p data-l="ko">
                격납고에서 스톰 · 벌워크 · 스위프트 · 랜스를 해금합니다. 웨이브마다 8계열 강화 중
                하나를 고르고, 전장에서 모은 고철로 유도 미사일 · EMP 펄스 · 포탑 드론을 삽니다.
              </p>
              <p data-l="en">
                Unlock four chassis in the hangar — Storm, Bulwark, Swift and Lance. Pick one of
                eight upgrade lines every wave, and spend battlefield salvage on homing missiles, an
                EMP pulse or a turret drone.
              </p>
            </div>

            <div className="ss-card">
              <h3>
                <span data-l="ko">미션과 데일리 런</span>
                <span data-l="en">Missions and the Daily Run</span>
              </h3>
              <p data-l="ko">
                웨이브마다 미션이 바뀝니다 — 지정 표적 격파, 순번대로 파괴, 이동하는 세이프 링
                안에서 생존. 데일리 런은 그날 하루 모두가 같은 아레나에 도전합니다.
              </p>
              <p data-l="en">
                A rotating mission every wave: destroy the marked target, destroy in sequence,
                survive inside a moving safe ring. And in the Daily Run, everyone faces the same
                arena that day.
              </p>
            </div>

            <div className="ss-card">
              <h3>
                <span data-l="ko">Game Center</span>
                <span data-l="en">Game Center</span>
              </h3>
              <p data-l="ko">
                리더보드 두 종(최고 점수 · 데일리 런)과 도전 과제 15종. 로그인은 선택이며, 하지
                않아도 게임의 모든 기능을 그대로 쓸 수 있습니다.
              </p>
              <p data-l="en">
                Two leaderboards (best score and daily run) and 15 achievements. Signing in is
                optional — every feature of the game works without it.
              </p>
            </div>
          </div>
        </section>

        {/* ── 스크린샷 ── */}
        <section>
          <h2>
            <span data-l="ko">화면</span>
            <span data-l="en">Screens</span>
          </h2>
          <p className="ss-lead">
            <span data-l="ko">실제 게임 화면입니다. 표시 언어는 앱 안에서 바꿀 수 있습니다.</span>
            <span data-l="en">
              Actual gameplay, captured in Korean — the display language is switchable in-app.
            </span>
          </p>
          <div className="ss-shots">
            {SHOTS.map((s, i) => (
              <figure className="ss-shot" key={s.src}>
                <Image
                  src={`/steelstorm/shots/${s.src}.webp`}
                  alt={s.ko}
                  width={640}
                  height={1391}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  sizes="(max-width: 560px) 46vw, 200px"
                />
                <figcaption>
                  <span data-l="ko">{s.ko}</span>
                  <span data-l="en">{s.en}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── 조작 ── */}
        <section>
          <h2>
            <span data-l="ko">조작</span>
            <span data-l="en">Controls</span>
          </h2>
          <ul className="ss-bullets">
            <li>
              <span data-l="ko">화면 왼쪽을 끌어 이동 — 조준과 발사는 자동</span>
              <span data-l="en">Drag on the left of the screen to move — aiming and firing are automatic</span>
            </li>
            <li>
              <span data-l="ko">DASH — 짧은 무적이 붙은 회피</span>
              <span data-l="en">DASH — a quick evade with brief invincibility</span>
            </li>
            <li>
              <span data-l="ko">COLOR — 코어 컬러 전환</span>
              <span data-l="en">COLOR — switch your core color</span>
            </li>
            <li>
              <span data-l="ko">DRIVE — 게이지가 차면 오버드라이브 변신</span>
              <span data-l="en">DRIVE — transform when the gauge is full</span>
            </li>
            <li>
              <span data-l="ko">WPN — 고철로 산 보조무기 사용</span>
              <span data-l="en">WPN — fire the secondary weapon you bought with salvage</span>
            </li>
            <li>
              <span data-l="ko">게임패드로도 조작할 수 있습니다</span>
              <span data-l="en">A connected gamepad works too</span>
            </li>
          </ul>
        </section>

        {/* ── 사양 ── */}
        <section id="specs">
          <h2>
            <span data-l="ko">사양</span>
            <span data-l="en">Specs</span>
          </h2>
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
                  <td>
                    <span data-l="ko">필요 없음 (완전 오프라인)</span>
                    <span data-l="en">Not required (fully offline)</span>
                  </td>
                </tr>
                <tr>
                  <th>Game Center</th>
                  <td>
                    <span data-l="ko">리더보드 2종 · 도전 과제 15종 (로그인 선택)</span>
                    <span data-l="en">2 leaderboards · 15 achievements (sign-in optional)</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <span data-l="ko">결제</span>
                    <span data-l="en">Payment</span>
                  </th>
                  <td>
                    <span data-l="ko">유료 앱 · 인앱결제 없음 · 구독 없음</span>
                    <span data-l="en">Paid app · no in-app purchases · no subscription</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section>
          <h2>
            <span data-l="ko">자주 묻는 질문</span>
            <span data-l="en">Frequently asked questions</span>
          </h2>

          <details>
            <summary>
              <span className="ss-q">
                <span data-l="ko">슈팅 게임을 잘 못해도 할 수 있나요?</span>
                <span data-l="en">I am not good at shooters. Can I play?</span>
              </span>
            </summary>
            <div className="ss-ans">
              <p data-l="ko">
                조준과 발사는 기체가 자동으로 합니다. 손이 빨라야 하는 게임이 아니라, 지금 대시를
                쓸지 색을 바꿀지 변신할지를 고르는 게임입니다. 한 판이 2~5분이라 몇 판만 돌려도
                감이 잡힙니다.
              </p>
              <div className="ss-en">
                <p>
                  The machine aims and fires for you. This is not a game about fast hands — it is
                  about choosing whether to dash, switch color or transform right now. A run takes
                  two to five minutes, so a few runs are enough to get the feel.
                </p>
              </div>
            </div>
          </details>

          <details>
            <summary>
              <span className="ss-q">
                <span data-l="ko">인터넷이 없어도 되나요?</span>
                <span data-l="en">Does it work without internet?</span>
              </span>
            </summary>
            <div className="ss-ans">
              <p data-l="ko">
                됩니다. 게임은 기기에서 단독으로 돌아가며 서버에 연결하지 않습니다. 비행기 모드에서
                해 보셔도 똑같이 동작합니다. Game Center 순위만 애플 서비스를 쓰고, 그마저도
                선택입니다.
              </p>
              <div className="ss-en">
                <p>
                  Yes. The game runs entirely on the device and connects to no server — try Airplane
                  Mode and it plays the same. Only Game Center rankings use an Apple service, and
                  even that is optional.
                </p>
              </div>
            </div>
          </details>

          <details>
            <summary>
              <span className="ss-q">
                <span data-l="ko">광고나 추가 결제가 있나요?</span>
                <span data-l="en">Are there ads or extra charges?</span>
              </span>
            </summary>
            <div className="ss-ans">
              <p data-l="ko">
                없습니다. 광고도, 인앱결제도, 구독도 없습니다. 한 번 구매하면 기체 4종과 모든
                모드가 플레이로 열립니다. 격납고 해금은 게임 안에서 모으는 고철로만 합니다.
              </p>
              <div className="ss-en">
                <p>
                  None. No ads, no in-app purchases, no subscription. One purchase, and all four
                  chassis and every mode open through play. Hangar unlocks are paid for with salvage
                  earned in game.
                </p>
              </div>
            </div>
          </details>

          <details>
            <summary>
              <span className="ss-q">
                <span data-l="ko">데일리 런은 무엇인가요?</span>
                <span data-l="en">What is the Daily Run?</span>
              </span>
            </summary>
            <div className="ss-ans">
              <p data-l="ko">
                날짜로 만든 씨앗으로 웨이브 구성과 미션, 제시되는 강화까지 모두 같게 맞춘 하루짜리
                판입니다. 같은 날 도전하는 사람은 모두 같은 아레나를 만나므로, 순위가 운이 아니라
                판단의 차이가 됩니다.
              </p>
              <div className="ss-en">
                <p>
                  A run of the day, generated from a date seed so that the waves, the missions and
                  even the upgrades offered are identical for everyone. Same arena for all players
                  that day, which makes the ranking a difference in judgment rather than luck.
                </p>
              </div>
            </div>
          </details>

          <details>
            <summary>
              <span className="ss-q">
                <span data-l="ko">기록은 어디에 저장되나요?</span>
                <span data-l="en">Where is my progress stored?</span>
              </span>
            </summary>
            <div className="ss-ans">
              <p data-l="ko">
                설정 · 진행 상황 · 최고 점수 모두 기기 안에만 저장됩니다. 계정도 클라우드 동기화도
                없어서 저희 쪽에는 사본이 없고, 앱을 삭제하면 함께 사라집니다. 자세한 내용은{' '}
                <Link href="/steelstorm/privacy">개인정보처리방침</Link>을 봐 주십시오.
              </p>
              <div className="ss-en">
                <p>
                  Settings, progress and best scores live only on your device. There is no account
                  and no cloud sync, so we hold no copy, and deleting the app deletes them. See the{' '}
                  <Link href="/steelstorm/privacy">privacy policy</Link> for details.
                </p>
              </div>
            </div>
          </details>
        </section>

        {/* ── 문의 ── */}
        <section>
          <h2>
            <span data-l="ko">문의</span>
            <span data-l="en">Contact</span>
          </h2>
          <div className="ss-contact">
            <div style={{ fontSize: '14px', color: 'var(--ss-ink-3)' }}>
              <span data-l="ko">주식회사 예아플러스(yeahplus)</span>
              <span data-l="en">YeahPlus Co., Ltd.</span>
            </div>
            <a className="ss-mail" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <div className="ss-note">
              <span data-l="ko">
                버그 제보와 의견을 보내 주십시오. 답장은 한국어와 영어로 드립니다.
              </span>
              <span data-l="en">
                Bug reports and thoughts are welcome. We reply in Korean and English.
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
