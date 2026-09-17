'use client';

import Image from 'next/image';
import Link from 'next/link';
import { EMAIL } from './i18n';

/* 문안 근거: contraptionlab/docs/METADATA.md(제출 설명문·챕터 8개 목록),
   README.md(8챕터 48레벨·부품 13종·레벨 에디터), docs/REVIEW_NOTES.md(오프라인·무결제),
   docs/AGE_RATING.md(4+·외부 링크 없음), docs/privacy.html(수집 없음).

   ⚠️ METADATA.md 의 금칙어 규칙을 따른다 — 이 앱은 Kids 카테고리를 쓰지 않으므로
   마케팅 문안에 「아이」「어린이」「kids」 같은 아동 대상 표현을 쓰지 않는다(2.3.8 / 5.1.4b).
   대신 학년으로 적는다: 초등 1~6학년 · grades 1-6.

   출시 전이라 App Store 링크와 가격은 적지 않는다. */

/** 8개 챕터 — METADATA.md 의 설명문 목록 그대로. */
const CHAPTERS = [
  { ko: ['중력과 비탈', '가파를수록 빨라진다'], en: ['Gravity & Slopes', 'Steeper means faster'] },
  { ko: ['마찰', '같은 각도라도 바닥이 결과를 바꾼다'], en: ['Friction', 'The same slope behaves differently on a different surface'] },
  { ko: ['튀는 힘', '탄성은 에너지를 돌려주되 조금씩 잃는다'], en: ['Bounce', 'Springy things give energy back, but lose a little each time'] },
  { ko: ['시소와 지레', '받침점에서 멀수록 돌리는 힘이 커진다'], en: ['Seesaws & Levers', 'Farther from the pivot means a stronger turn'] },
  { ko: ['부딪히는 힘', '무거운 것은 멈추기 어렵고, 그 힘은 옮겨간다'], en: ['Momentum', 'Heavy things are hard to stop, and pass their force on'] },
  { ko: ['공기와 물', '바람은 가벼운 것을 밀고, 물은 가벼운 것을 띄운다'], en: ['Air & Water', 'Wind pushes light things; water floats them'] },
  { ko: ['자석과 회전', '보이지 않는 힘도 힘이다'], en: ['Magnets & Spin', 'Invisible forces are forces too'] },
  { ko: ['에너지 사슬', '높이가 속도가 되고, 속도가 튀는 힘이 된다'], en: ['Energy Chain', 'Height becomes speed, speed becomes bounce'] },
];

/** 스크린샷 — store/iphone-6.9/ko 에서 마케팅 배너만 잘라낸 것. */
const SHOTS = [
  { src: 'play', ko: '비탈을 놓고, 돌리고, 출발', en: 'Drop a ramp, turn it, press Go' },
  { src: 'friction', ko: '나무는 붙잡고 얼음은 놓아준다', en: 'Wood grips, ice lets go' },
  { src: 'clear', ko: '성공한 다음에 「왜 그럴까?」', en: '“Why?” comes after you succeed' },
  { src: 'levels', ko: '8개 챕터 · 48개 실험실', en: 'Eight chapters, 48 labs' },
  { src: 'build', ko: '내가 만든 판도 앱이 풀어 본다', en: 'The app solves your lab before saving it' },
];

const BADGES = [
  { ko: '완전 오프라인', en: 'Fully offline' },
  { ko: '광고 없음', en: 'No ads' },
  { ko: '인앱결제 없음', en: 'No in-app purchases' },
  { ko: '계정 없음', en: 'No account' },
  { ko: '외부 링크 없음', en: 'No outside links' },
  { ko: '한 판 30초~3분', en: '30 seconds to 3 minutes' },
];

export default function HomeContent() {
  return (
    <>
      <header className="cp-hero cp-wrap">
        <Image
          className="cp-icon"
          src="/contraptionlab/icon-320.webp"
          alt=""
          width={320}
          height={320}
          priority
          aria-hidden="true"
        />
        <div className="cp-kicker">
          <span data-l="ko">굴리고 튕기는 물리 퍼즐 · 초등 1~6학년</span>
          <span data-l="en">Physics puzzles, grades 1-6</span>
        </div>
        <h1>
          <span data-l="ko">뚝딱 실험실</span>
          <span data-l="en">Contraption Lab</span>
        </h1>
        <div className="cp-hero-pitch">
          <p data-l="ko">
            구슬 하나와 바구니 하나. 그 사이를 어떻게 이을지는 직접 정합니다. 비탈을 놓고,
            돌리고, 출발을 누르고, 빗나가면 고칩니다.{' '}
            <b>정답이 여럿이라서 놓는 사람마다 다른 장치가 나옵니다.</b>
          </p>
          <p data-l="en">
            One marble, one basket. How to connect them is up to you — drop a ramp, turn it, press
            Go, and fix what missed.{' '}
            <b>There is never one answer, so no two contraptions look alike.</b>
          </p>
        </div>

        <div className="cp-store-row">
          {/* 아직 심사 제출 전이다. 링크가 생기면 href 와 문구만 바꾸면 된다. */}
          <a href="#" className="cp-store-btn cp-plain" aria-disabled="true">
            <span>
              <small data-l="ko">iPhone · iPad</small>
              <small data-l="en">iPhone · iPad</small>
              <span data-l="ko">App Store 곧 출시</span>
              <span data-l="en">Coming soon to the App Store</span>
            </span>
          </a>
          <span className="cp-price-note">
            <span data-l="ko">유료 앱 · 한 번 구매하면 추가 결제 없음 (가격은 App Store 참조)</span>
            <span data-l="en">Paid app · one purchase, nothing more (see the App Store for pricing)</span>
          </span>
        </div>

        <div className="cp-badges">
          {BADGES.map((b) => (
            <span className="cp-badge" key={b.en}>
              <span data-l="ko">{b.ko}</span>
              <span data-l="en">{b.en}</span>
            </span>
          ))}
        </div>
      </header>

      <div className="cp-wrap">
        {/* ── 어떻게 노나 ── */}
        <section id="how">
          <h2>
            <span data-l="ko">물리를 배우는 게임이 아니라, 물리로 노는 게임</span>
            <span data-l="en">Not a game that teaches physics — a game you play with physics</span>
          </h2>
          <p className="cp-lead">
            <span data-l="ko">
              설명이 놀이보다 먼저 오지 않습니다. 먼저 만들고, 빗나가고, 고치고, 성공한 다음에
              이름을 붙여 줍니다.
            </span>
            <span data-l="en">
              Explanation never comes before play. Build first, miss, fix it, succeed — and only
              then does the game give the thing a name.
            </span>
          </p>

          <div className="cp-grid">
            <div className="cp-card">
              <h3>
                <span data-l="ko">진짜 물리로 판정합니다</span>
                <span data-l="en">Real physics decides</span>
              </h3>
              <p data-l="ko">
                나무 비탈에서 멈춘 구슬이 얼음 비탈에서는 미끄러집니다. 연출이 아니라 계산입니다.
                쇠 구슬은 나무 구슬보다 세 배 무거워서 시소도 세 배 세게 기울입니다.{' '}
                <b>「왜 그렇지?」라고 물었을 때 답이 실제로 존재합니다.</b>
              </p>
              <p data-l="en">
                A marble that stops on a wood ramp slides right off an ice one — that is friction
                being calculated, not faked. A steel marble weighs three times what wood does, and
                tips a seesaw three times harder.{' '}
                <b>When someone asks “why?”, there is an actual answer.</b>
              </p>
            </div>

            <div className="cp-card">
              <h3>
                <span data-l="ko">개념 카드는 성공한 다음에</span>
                <span data-l="en">The idea card opens after you succeed</span>
              </h3>
              <p data-l="ko">
                성공하기 전에는 개념 설명이 열리지 않습니다. 손으로 먼저 겪은 다음에야 「아, 이게
                마찰이구나」가 붙습니다. 순서를 뒤집지 않는 것이 이 게임의 설계입니다.
              </p>
              <p data-l="en">
                The explanation stays closed until the marble lands. Only after you have felt it by
                hand does the game say “so that was friction.” Keeping that order is the design.
              </p>
            </div>

            <div className="cp-card">
              <h3>
                <span data-l="ko">빗나가도 벌이 없습니다</span>
                <span data-l="en">Missing costs nothing</span>
              </h3>
              <p data-l="ko">
                목숨도, 시간 제한도, 광고도 없습니다. 빗나가면 무엇 때문에 빗나갔는지 알려 주고,
                다시 하면 됩니다. 한 판은 30초에서 3분이라 짧게 끊어 놀기 좋습니다.
              </p>
              <p data-l="en">
                No lives, no timers, no ads. When the marble misses, the workshop tells you what
                went wrong and you try again. A puzzle takes 30 seconds to 3 minutes.
              </p>
            </div>

            <div className="cp-card">
              <h3>
                <span data-l="ko">내 실험실 — 직접 만들기</span>
                <span data-l="en">Build your own</span>
              </h3>
              <p data-l="ko">
                판을 직접 만들어 볼 수도 있습니다. 만든 판은{' '}
                <b>앱이 먼저 풀어 본 뒤에만</b> 저장됩니다. 못 푸는 판은 저장되지 않으니 누구에게
                보내도 반드시 풀 수 있습니다. 공유는 짧은 글자 코드로 — 인터넷도, 계정도 쓰지
                않습니다.
              </p>
              <p data-l="en">
                You can design labs of your own. A lab is saved{' '}
                <b>only after the app has solved it,</b> so anything you pass along is guaranteed
                solvable. Sharing uses a short text code — no internet, no account.
              </p>
            </div>
          </div>
        </section>

        {/* ── 화면 ── */}
        <section>
          <h2>
            <span data-l="ko">화면</span>
            <span data-l="en">Screens</span>
          </h2>
          <p className="cp-lead">
            <span data-l="ko">실제 게임 화면입니다. 표시 언어는 앱 안에서 바꿀 수 있습니다.</span>
            <span data-l="en">
              Actual gameplay, captured in Korean — the display language is switchable in-app.
            </span>
          </p>
          <div className="cp-shots">
            {SHOTS.map((s, i) => (
              <figure className="cp-shot" key={s.src}>
                <Image
                  src={`/contraptionlab/shots/${s.src}.webp`}
                  alt={s.ko}
                  width={620}
                  height={1204}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  sizes="(max-width: 560px) 46vw, 190px"
                />
                <figcaption>
                  <span data-l="ko">{s.ko}</span>
                  <span data-l="en">{s.en}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── 8개 챕터 ── */}
        <section id="labs">
          <h2>
            <span data-l="ko">48개 실험실, 8개 주제</span>
            <span data-l="en">48 labs across eight ideas</span>
          </h2>
          <p className="cp-lead">
            <span data-l="ko">
              한 챕터는 한 가지 개념만 다룹니다. 앞 챕터를 네 판 깨면 다음 챕터가 열립니다.
            </span>
            <span data-l="en">
              Each chapter is about one idea. Clearing four levels of a chapter opens the next one.
            </span>
          </p>
          <div className="cp-chapters">
            {CHAPTERS.map((c, i) => (
              <div className="cp-chapter" key={c.en[0]}>
                <span className="cp-no" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3>
                    <span data-l="ko">{c.ko[0]}</span>
                    <span data-l="en">{c.en[0]}</span>
                  </h3>
                  <p>
                    <span data-l="ko">{c.ko[1]}</span>
                    <span data-l="en">{c.en[1]}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 이 앱에 없는 것 ── */}
        <section>
          <h2>
            <span data-l="ko">이 앱에 없는 것</span>
            <span data-l="en">What this app does not have</span>
          </h2>
          <ul className="cp-bullets">
            <li>
              <span data-l="ko">광고 없음 · 앱 내 결제 없음 · 계정 없음 · 외부 링크 없음</span>
              <span data-l="en">No ads, no in-app purchases, no accounts, no outside links</span>
            </li>
            <li>
              <span data-l="ko">
                인터넷 연결이 필요 없고, 어떤 정보도 기기 밖으로 나가지 않습니다
              </span>
              <span data-l="en">Works fully offline; nothing ever leaves the device</span>
            </li>
            <li>
              <span data-l="ko">
                진행 상황은 기기 안에만 저장됩니다. 자세한 내용은{' '}
                <Link href="/contraptionlab/privacy">개인정보처리방침</Link>을 봐 주십시오.
              </span>
              <span data-l="en">
                Progress is stored only on the device — see the{' '}
                <Link href="/contraptionlab/privacy">privacy policy</Link>.
              </span>
            </li>
          </ul>
        </section>

        {/* ── 사양 ── */}
        <section>
          <h2>
            <span data-l="ko">사양</span>
            <span data-l="en">Specs</span>
          </h2>
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
                    <span data-l="ko">아이폰 세로 · 아이패드 4방향</span>
                    <span data-l="en">iPhone portrait · iPad all four orientations</span>
                  </td>
                </tr>
                <tr>
                  <th>언어 · Language</th>
                  <td>한국어 · English</td>
                </tr>
                <tr>
                  <th>
                    <span data-l="ko">분량</span>
                    <span data-l="en">Content</span>
                  </th>
                  <td>
                    <span data-l="ko">8개 챕터 · 48개 실험실 · 부품 13종 · 레벨 에디터</span>
                    <span data-l="en">8 chapters · 48 labs · 13 parts · a level editor</span>
                  </td>
                </tr>
                <tr>
                  <th>인터넷 · Internet</th>
                  <td>
                    <span data-l="ko">필요 없음 (완전 오프라인)</span>
                    <span data-l="en">Not required (fully offline)</span>
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

        {/* ── 문의 ── */}
        <section>
          <h2>
            <span data-l="ko">문의</span>
            <span data-l="en">Contact</span>
          </h2>
          <div className="cp-contact">
            <div style={{ fontSize: '14px', color: 'var(--cp-ink-3)' }}>
              <span data-l="ko">주식회사 예아플러스(yeahplus)</span>
              <span data-l="en">YeahPlus Co., Ltd.</span>
            </div>
            <a className="cp-mail" href={`mailto:${EMAIL}`}>
              {EMAIL}
            </a>
            <div className="cp-note">
              <span data-l="ko">
                막히는 판이나 고쳤으면 하는 점을 보내 주십시오. 한국어와 영어로 답장 드립니다.
              </span>
              <span data-l="en">
                Tell us about a lab you are stuck on, or anything you would like fixed. We reply in
                Korean and English.
              </span>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
