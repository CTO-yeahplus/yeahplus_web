'use client';

import Image from 'next/image';
import Link from 'next/link';

/* 문안 근거: APLUS/steelrace/docs/METADATA_KO.md · METADATA_EN.md(제출 설명문),
   docs/SUBMISSION.md(개인정보 라벨 · 연령), docs/GAMECENTER.md(리더보드 4 · 도전과제 16),
   stadium/index.html · app.js(모드 · 설정 이름), app/ios(iOS 15.0 · 가로 전용).
   가격·광고 문장은 쓰지 않는다 — 가격이 정해지지 않았다(METADATA_KO.md 의 금지 규칙과 같다).
   실존 리그·대회·제조사·다른 게임·자사 다른 앱 이름 금지 — steelrace/tools/scan_metadata.py 목록. */

/** 출시 뒤 App Store 주소를 넣는다. 비어 있으면 버튼이 「곧 출시」 안내로 보인다. */
const APP_STORE_URL = '';

const BADGES = [
  { ko: '두 엄지로 나는 FPV', en: 'FPV with two thumbs' },
  { ko: '오늘의 코스 · 매일 자정', en: "Today's Course · daily" },
  { ko: 'Game Center 순위 · 도전과제', en: 'Game Center leaderboards' },
  { ko: '오프라인 비행', en: 'Fly offline' },
  { ko: '데이터 수집 없음', en: 'No data collected' },
];

const ROUNDS = [
  {
    n: 'ROUND 1',
    ko: { t: '예선 히트', d: '여섯 대 중 세 대가 올라간다.' },
    en: { t: 'Qualifying heat', d: 'Three of six go through.' },
  },
  {
    n: 'ROUND 2',
    ko: { t: '준결승', d: '네 대 중 두 대가 올라간다.' },
    en: { t: 'Semifinal', d: 'Two of four go through.' },
  },
  {
    n: 'ROUND 3',
    ko: { t: '골든 히트', d: '두 바퀴짜리 결승. 0.25초 안의 접전은 사진 판정으로 다시 본다.' },
    en: { t: 'Golden Heat', d: 'A two-lap final. Anything closer than 0.25 s gets a photo finish.' },
  },
];

const VENUES = [
  { ko: '콘코스', en: 'Concourse', kos: '경기장 복도를 빠져나온다', ens: 'Out through the stadium hall' },
  { ko: '관중석 다이브', en: 'Stands dive', kos: '꼭대기에서 필드까지', ens: 'From the top row to the field' },
  { ko: '필드', en: 'Field', kos: '갠트리 밑을 스친다', ens: 'Under the gantries' },
  { ko: '램프 나선', en: 'Spiral ramp', kos: '감아 오른다', ens: 'Wind your way up' },
  { ko: '터널 헤어핀', en: 'Tunnel hairpin', kos: '꺾어 나온다', ens: 'Turn hard and out' },
  { ko: '마지막 직선', en: 'Home straight', kos: '결승선까지', ens: 'To the line' },
];

export default function HomeContent() {
  return (
    <>
      <header className="sr-hero sr-wrap">
        <Image
          className="sr-emblem"
          src="/steelrace/icon-512.png"
          alt=""
          width={512}
          height={512}
          priority
          aria-hidden="true"
        />
        <div className="sr-kicker">
          <span data-l="ko">야간 FPV 드론 레이스</span>
          <span data-l="en">Night FPV drone racing</span>
        </div>
        <h1>
          <span data-l="ko">스틸레이스</span>
          <span data-l="en">STEELRACE</span>
        </h1>
        <div className="sr-hero-pitch">
          <p data-l="ko">
            오늘 밤 경기장이 열렸다. 관중석을 내리꽂고, 갠트리 밑을 스치고, 터널을 꺾어 나온다.
            예선·준결승·골든 히트를 뚫고 <b>우승컵까지</b>.
          </p>
          <p data-l="en">
            The stadium opens tonight. Dive down the stands, skim under the gantries, turn hard out
            of the tunnel. Through the heat, the semifinal and the Golden Heat — <b>all the way to
            the cup</b>.
          </p>
        </div>

        <div className="sr-store-row">
          <a
            className="sr-store-btn sr-plain"
            href={APP_STORE_URL || '#'}
            aria-disabled={APP_STORE_URL ? undefined : true}
            target={APP_STORE_URL ? '_blank' : undefined}
            rel={APP_STORE_URL ? 'noreferrer' : undefined}
          >
            <span>
              <small>iPhone</small>
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
        </div>

        <div className="sr-badges">
          {BADGES.map((b) => (
            <span className="sr-badge" key={b.en}>
              <span data-l="ko">{b.ko}</span>
              <span data-l="en">{b.en}</span>
            </span>
          ))}
        </div>
      </header>

      <div className="sr-wrap">
        {/* ── 리그 나이트 ── */}
        <section id="how">
          <h2>
            <span data-l="ko">리그 나이트</span>
            <span data-l="en">League Night</span>
          </h2>
          <p className="sr-lead">
            <span data-l="ko">
              라운드마다 라이벌이 빨라진다. 떨어지면 그 라운드부터 다시 — 처음으로 돌아가지 않는다.
            </span>
            <span data-l="en">
              Rivals get faster every round. Drop out and you retry that round, not the whole night.
            </span>
          </p>
          <div className="sr-rounds">
            {ROUNDS.map((r, i) => (
              <div className={`sr-round${i === 2 ? ' sr-r3' : ''}`} key={r.n}>
                <div className="sr-rn">{r.n}</div>
                <div className="sr-rt">
                  <span data-l="ko">{r.ko.t}</span>
                  <span data-l="en">{r.en.t}</span>
                </div>
                <div className="sr-rd">
                  <span data-l="ko">{r.ko.d}</span>
                  <span data-l="en">{r.en.d}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 오늘의 코스 ── */}
        <section>
          <h2>
            <span data-l="ko">오늘의 코스</span>
            <span data-l="en">Today&rsquo;s Course</span>
          </h2>
          <p className="sr-lead">
            <span data-l="ko">
              매일 자정(한국 시간)에 새 코스가 열린다. 여섯 장소를 한 바퀴에 — 기록은 Game Center
              오늘의 순위표에 오른다.
            </span>
            <span data-l="en">
              A new course opens every day at midnight Korea time. Six places in one lap — times go to
              Game Center&rsquo;s daily leaderboard.
            </span>
          </p>
          <ol className="sr-venues">
            {VENUES.map((v) => (
              <li key={v.en}>
                <span data-l="ko">{v.ko}</span>
                <span data-l="en">{v.en}</span>
                <small>
                  <span data-l="ko">{v.kos}</span>
                  <span data-l="en">{v.ens}</span>
                </small>
              </li>
            ))}
          </ol>
        </section>

        {/* ── 비행 ── */}
        <section>
          <h2>
            <span data-l="ko">손에 붙을 때까지</span>
            <span data-l="en">Until it&rsquo;s in your hands</span>
          </h2>
          <div className="sr-grid">
            <div className="sr-card">
              <span className="sr-tag sr-t-cyan">Rookie · Pro</span>
              <h3>
                <span data-l="ko">첫 비행 13초</span>
                <span data-l="en">A 13-second first flight</span>
              </h3>
              <p data-l="ko">
                루키는 속도와 높이를 보조가 맡고, 프로는 FPV 화면으로 전부 손으로 난다.
              </p>
              <p data-l="en">
                Rookie hands speed and height to an assist; Pro puts you in the FPV view with
                everything in your hands.
              </p>
            </div>
            <div className="sr-card">
              <span className="sr-tag sr-t-gold">Practice</span>
              <h3>
                <span data-l="ko">구간 연습</span>
                <span data-l="en">Stage practice</span>
              </h3>
              <p data-l="ko">
                장소 둘씩 이은 스테이지 세 개를 반복해서 연습한다. 준비 비행 3초 뒤에 기록이
                시작되고, 바로 다시 날 수 있다.
              </p>
              <p data-l="en">
                Practice three stages of two places each. The clock starts after a three-second
                run-up, and a restart is one tap away.
              </p>
            </div>
            <div className="sr-card">
              <span className="sr-tag sr-t-hot">Crash</span>
              <h3>
                <span data-l="ko">부딪히면</span>
                <span data-l="en">When you hit something</span>
              </h3>
              <p data-l="ko">
                벽을 세게 긁으면 프로펠러 하나를 잃고도 계속 난다 — 한 번 더 부딪히면 떨어진다.
                추락하면 신호가 끊기고, 슬로모션과 위에서 본 화면으로 무슨 일이 있었는지 보여 준다.
              </p>
              <p data-l="en">
                Scrape a wall hard and you lose a prop but keep flying — one more hit and you go down.
                A crash cuts the signal, then shows what happened in slow motion and from above.
              </p>
            </div>
            <div className="sr-card">
              <span className="sr-tag sr-t-cyan">Sound · Haptics</span>
              <h3>
                <span data-l="ko">소리와 진동</span>
                <span data-l="en">Sound and feel</span>
              </h3>
              <p data-l="ko">
                모터 소리, 라이벌의 도플러, 관중 함성을 모두 합성해 360도 공간에 놓았다. 충돌·스침·
                콤보마다 모양이 다른 진동이 온다. 이어폰을 권한다.
              </p>
              <p data-l="en">
                Motors, rivals&rsquo; Doppler and the crowd are all synthesized and placed in
                360-degree space. Hits, scrapes and combos each have their own haptic shape.
                Headphones recommended.
              </p>
            </div>
          </div>
        </section>

        {/* ── 사양 ── */}
        <section id="specs">
          <h2>
            <span data-l="ko">사양</span>
            <span data-l="en">Specs</span>
          </h2>
          <div className="sr-table-wrap">
            <table className="sr-spec">
              <tbody>
                <tr>
                  <th>
                    <span data-l="ko">기기</span>
                    <span data-l="en">Device</span>
                  </th>
                  <td>
                    <span data-l="ko">iPhone · iOS 15.0 이상</span>
                    <span data-l="en">iPhone · iOS 15.0 or later</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <span data-l="ko">화면</span>
                    <span data-l="en">Orientation</span>
                  </th>
                  <td>
                    <span data-l="ko">가로</span>
                    <span data-l="en">Landscape</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <span data-l="ko">앱 언어</span>
                    <span data-l="en">App language</span>
                  </th>
                  <td>
                    <span data-l="ko">한국어</span>
                    <span data-l="en">Korean</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <span data-l="ko">인터넷</span>
                    <span data-l="en">Internet</span>
                  </th>
                  <td>
                    <span data-l="ko">비행은 오프라인 · 순위표만 연결 필요</span>
                    <span data-l="en">Fly offline · only the leaderboards need a connection</span>
                  </td>
                </tr>
                <tr>
                  <th>Game Center</th>
                  <td>
                    <span data-l="ko">순위표 4 · 도전과제 16 (로그인 선택)</span>
                    <span data-l="en">4 leaderboards · 16 achievements (sign-in optional)</span>
                  </td>
                </tr>
                <tr>
                  <th>
                    <span data-l="ko">계정 · 결제</span>
                    <span data-l="en">Account · purchases</span>
                  </th>
                  <td>
                    <span data-l="ko">가입 없음 · 앱 내 구입 없음</span>
                    <span data-l="en">No sign-up · no in-app purchases</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="sr-hint">
            <span data-l="ko">
              조작·모드·설정은 <Link href="/steelrace/support">지원 페이지</Link>에, 데이터는{' '}
              <Link href="/steelrace/privacy">개인정보처리방침</Link>에 적었습니다.
            </span>
            <span data-l="en">
              Controls, modes and settings are on the <Link href="/steelrace/support">support
              page</Link>; data handling is in the <Link href="/steelrace/privacy">privacy
              policy</Link>.
            </span>
          </p>
        </section>
      </div>
    </>
  );
}
