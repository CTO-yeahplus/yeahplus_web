'use client';

/* 이 주소가 App Store Connect 에 등록되는 Privacy Policy URL 이다
   (https://www.yeahplus.co.kr/onetake/privacy). 한/영을 동시에 보여준다.
   원본 문안: APLUS/drift/docs/PRIVACY_POLICY.md · 근거표: APLUS/drift/docs/SUBMISSION_ANSWERS.md 3-1절
   (데이터가 수집되지 않음 — 네트워크 호출 0, 분석·광고·크래시 SDK 없음, 저장은 기기 안, 결제는 Apple).
   2026-10-27 같은 날 개정(빌드 5): Game Center 순위표 · 릴/포스터(사진 '추가 전용' 권한) · 도전장 링크(# 뒤에 판 기록).
   2026-10-27 두 번째 개정(빌드 6): 도전장 짧은 주소 — 이용자가 [도전장]을 누를 때만 그 판 기록을 회사 사이트(Supabase, 싱가포르)에 7일 맡긴다
   (sql/onetake_dares.sql · api/dare/route.ts). App Privacy = '사용자 콘텐츠 › 게임 플레이 콘텐츠 · 사용자와 연결 안 됨 · 앱 기능'.
   앱에 분석·크래시·광고 SDK 가 생기거나 보내는 것이 늘면 이 문서와 App Privacy 라벨을 함께 고친다. */

import { COMPANY, EMAIL } from '../i18n';

export default function PrivacyContent() {
  return (
    <div className="ot-wrap ot-doc">
      <div className="ot-doc-head">
        <h1>
          개인정보처리방침
          <br />
          Privacy Policy
        </h1>
        <div className="ot-sub">원 테이크 · ONE TAKE</div>
        <div className="ot-rev">시행일 2026년 10월 27일 (같은 날 개정 — Game Center · 릴 · 도전장 짧은 주소) · Effective 27 October 2026 (revised the same day)</div>
      </div>

      <div className="ot-callout">
        <p>
          <strong>원 테이크는 계정 · 연락처 · 기기 식별자 · 위치를 수집하지 않습니다.</strong> 이용자가 직접
          &lsquo;도전장&rsquo;을 보낼 때만 그 판의 기록을 <strong>7일 동안</strong> 맡아 두었다가 지웁니다(6절).
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>ONE TAKE collects no account, contact, device-identifier or location data.</strong> Only when you send a
          &ldquo;dare&rdquo; do we keep that take&rsquo;s record, <strong>for 7 days</strong>, and then delete it (section 6).
        </p>
      </div>

      <section>
        <p>
          주식회사 예아플러스(이하 &lsquo;회사&rsquo;)가 만든 iOS 게임 &lsquo;원 테이크&rsquo;(이하 &lsquo;앱&rsquo;)의
          개인정보처리방침입니다.
        </p>
        <div className="ot-en-block">
          <p>This policy covers ONE TAKE (the &ldquo;App&rdquo;), an iOS game made by YeahPlus Co., Ltd. (&ldquo;we&rdquo;).</p>
        </div>
      </section>

      <section>
        <h2>1. 수집하는 정보</h2>
        <p>
          앱은 이메일·전화번호·기기 식별자·위치·사진·연락처를 <strong>수집하지 않습니다.</strong> 회원 가입과 로그인이
          없습니다. 회사에 전달되는 것은 이용자가 &lsquo;도전장&rsquo;을 보낼 때의 그 판 기록 하나뿐이며, 자세한 내용은 6절에
          있습니다.
        </p>
        <div className="ot-en-block">
          <h3>1. Information we collect</h3>
          <p>
            The App does <strong>not collect</strong> email addresses, phone numbers, device identifiers, location, photos or
            contacts. There is no sign-up and no login. The only thing that reaches us is a take&rsquo;s record when you send a
            &ldquo;dare&rdquo; &mdash; see section 6.
          </p>
        </div>
      </section>

      <section>
        <h2>2. 게임 기록</h2>
        <p>
          촬영 기록, 최고 테이크, 등급, 설정은 <strong>이용자의 기기 안에만</strong> 저장됩니다. 회사는 이 기록을 볼 수
          없습니다. 앱을 지우면 기록도 함께 지워집니다.
        </p>
        <div className="ot-en-block">
          <h3>2. Game records</h3>
          <p>
            Your takes, best takes, grades and settings are stored <strong>only on your device</strong>. We cannot see them.
            Deleting the App deletes them.
          </p>
        </div>
      </section>

      <section>
        <h2>3. 네트워크와 제3자 서비스</h2>
        <p>
          앱이 회사 서버에 접속하는 것은 이용자가 &lsquo;도전장&rsquo;을 보낼 때 한 번뿐입니다(6절). 순위표와 도전장을 빼면
          비행기 모드에서도 모든 기능이 작동합니다. 광고, 분석, 크래시 보고 등{' '}
          <strong>제3자 SDK 를 일절 쓰지 않으며</strong>, 이용자를 추적하지 않습니다.
        </p>
        <p>
          <strong>Game Center</strong> — 기기에서 Game Center 에 로그인해 있으면, 앱은 장소별 최고 점수와 &lsquo;오늘의 촬영&rsquo;
          점수를 Apple 의 Game Center 순위표에 올립니다. 이 처리는 Apple 이 하며, 회사는 점수나 계정 정보를 따로 받거나
          저장하지 않습니다. 순위표에는 Game Center 별명과 점수만 보입니다. 로그인하지 않으면 아무것도 올라가지 않습니다.
        </p>
        <div className="ot-en-block">
          <h3>3. Network and third parties</h3>
          <p>
            The App connects to our server only when you send a &ldquo;dare&rdquo; (section 6). Apart from leaderboards and
            dares, everything works in airplane mode. It uses{' '}
            <strong>no advertising networks, no analytics, no crash reporting and no third-party SDKs</strong>, and you are
            not tracked.
          </p>
          <p>
            <strong>Game Center</strong> — if you are signed in to Game Center on your device, the App posts your best score
            for each location and your &ldquo;Today&rsquo;s Shoot&rdquo; score to Apple&rsquo;s Game Center leaderboards. Apple
            handles this; we do not receive or store your scores or account details. Leaderboards show only your Game Center
            nickname and score. If you are not signed in, nothing is posted.
          </p>
        </div>
      </section>

      <section>
        <h2>4. 기기 기능</h2>
        <ul className="ot-bullets">
          <li>
            <strong>동작 센서</strong> — 설정에서 &lsquo;기울이기&rsquo; 조향을 켜면 기기를 기울인 각도(중력 방향)를 읽어
            차의 방향을 바꾸는 데에만 씁니다. 이 값은 그 순간 화면에 반영된 뒤 버려지며, 저장하거나 기기 밖으로 보내지
            않습니다. 켜지 않아도 터치로 조향할 수 있습니다.
          </li>
          <li>
            <strong>진동(햅틱)</strong> — 기기에서 진동을 내기만 하며, 아무 정보도 읽거나 보내지 않습니다.
          </li>
          <li>
            <strong>사진(추가만)</strong> — 만든 릴·포스터를 공유 화면에서 &lsquo;저장&rsquo;할 때만 사진 앱에 추가합니다. 앱은
            사진을 읽지 않으며, 허용하지 않아도 게임은 모두 됩니다.
          </li>
          <li>앱은 카메라·마이크·위치·연락처 권한을 요청하지 않습니다.</li>
        </ul>
        <div className="ot-en-block">
          <h3>4. Device features</h3>
          <ul className="ot-bullets">
            <li>
              <strong>Motion sensor</strong> — if you turn on tilt steering in Settings, the App reads the tilt of your device
              (the direction of gravity) to steer the car. The value is used for that moment on screen and then discarded;
              it is never stored or sent off the device. You can steer by touch without it.
            </li>
            <li>
              <strong>Haptics</strong> — the App only plays vibrations on the device; nothing is read or sent.
            </li>
            <li>
              <strong>Photos (add only)</strong> — the App adds a reel or poster you made to Photos only when you choose
              &ldquo;Save&rdquo; on the share sheet. It never reads your library, and everything works without it.
            </li>
            <li>The App does not ask for camera, microphone, location or contacts access.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>5. 앱 안 구입</h2>
        <p>
          &lsquo;장소 평생권&rsquo; 결제는 <strong>Apple 의 App Store 가 처리</strong>합니다. 회사는 결제 정보와 Apple ID 를
          받거나 볼 수 없습니다. 앱은 구입했다는 표시만 기기 안에 기억합니다. 구입 복원은 설정의 &lsquo;구입 복원&rsquo;에서
          할 수 있습니다. 앱에는 광고가 없습니다.
        </p>
        <div className="ot-en-block">
          <h3>5. In-app purchase</h3>
          <p>
            The &ldquo;All Locations&rdquo; purchase is <strong>handled by Apple&rsquo;s App Store</strong>. We never receive or
            see your payment details or Apple ID. The App only remembers on your device that the purchase was made. You can
            restore it with &ldquo;Restore Purchases&rdquo; in Settings. The App has no ads.
          </p>
        </div>
      </section>

      <section>
        <h2>6. 릴 · 포스터 · 도전장 — 이용자가 직접 보내는 것</h2>
        <p>
          릴(세로 영상)과 포스터는 <strong>기기 안에서</strong> 만들어지고, 이용자가 iOS 공유 화면으로 보낼 때만 이용자가
          고른 곳으로 갑니다. 회사에는 전달되지 않습니다.
        </p>
        <p>
          <strong>도전장</strong> — 이용자가 결과 화면에서 [도전장]을 누를 때만, 앱은 그 판의 기록을 회사 사이트에 보내
          짧은 주소(예: yeahplus.co.kr/onetake/c/Ab3x9Kq)를 받아 공유 화면에 넣습니다. 링크를 받은 사람은 이 기록으로 그 판을
          다시 보고, 그 내용을 볼 수 있습니다.
        </p>
        <ul className="ot-bullets">
          <li>
            <strong>보내는 것</strong> — 그 판의 조작 · 차 위치 · 점수 · 등급 · 장소 · 날짜, 그리고 설정에 적어 둔 경우 감독 이름.
            감독 이름은 비워 둘 수 있습니다. 계정 · 기기 식별자 · 위치는 보내지 않습니다.
          </li>
          <li>
            <strong>목적</strong> — 짧은 링크로 도전장을 전달하고 재생하기 위해서만 씁니다. 분석 · 광고 · 다른 목적에 쓰지
            않습니다.
          </li>
          <li>
            <strong>보관</strong> — 보낸 때부터 <strong>7일</strong>. 그 뒤에는 자동으로 지워지며 링크도 열리지 않습니다. 같은
            시간에 너무 많이 보내는 것을 막기 위해 접속 주소를 그대로 저장하지 않고 되돌릴 수 없는 값(해시)으로 바꿔 두며, 이
            값은 하루 뒤 지웁니다.
          </li>
          <li>
            <strong>국외 이전</strong> — 기록은 데이터베이스 서비스 Supabase Inc.(supabase.com)에 맡겨 저장하며 서버는
            싱가포르(지역 Southeast Asia)에 있습니다. [도전장]을 누를 때 암호화된 연결(HTTPS)로 옮겨집니다. 이 위탁 외에 다른
            곳에 제공하지 않습니다.
          </li>
          <li>
            <strong>거부</strong> — [도전장]을 누르지 않으면 아무것도 보내지 않습니다. 연결이 안 될 때는 예전처럼 기록을
            링크의 <strong>#</strong> 뒤에 담은 긴 링크를 보내며, 이 경우 <strong>#</strong> 뒤의 내용은 웹 서버로 전송되지
            않습니다.
          </li>
        </ul>
        <div className="ot-en-block">
          <h3>6. Reels, posters and dares — things you send yourself</h3>
          <p>
            Reels (vertical videos) and posters are made <strong>on your device</strong> and go only where you send them with
            the iOS share sheet. They are not sent to us.
          </p>
          <p>
            <strong>Dares</strong> &mdash; only when you tap &ldquo;Dare&rdquo; on the result screen, the App sends that
            take&rsquo;s record to our website and gets back a short link (e.g. yeahplus.co.kr/onetake/c/Ab3x9Kq) to put in the
            share sheet. Anyone you send it to can replay the take and see this record.
          </p>
          <ul className="ot-bullets">
            <li>
              <strong>What is sent</strong> &mdash; the take&rsquo;s controls, car position, score, grade, location and date,
              and your director name if you set one (you can leave it blank). No account, device identifier or location.
            </li>
            <li>
              <strong>Why</strong> &mdash; only to deliver and replay the dare through a short link. Never for analytics,
              advertising or anything else.
            </li>
            <li>
              <strong>How long</strong> &mdash; <strong>7 days</strong> from sending, then it is deleted automatically and the
              link stops working. To prevent flooding, your IP address is stored only as an irreversible hash, deleted after
              one day.
            </li>
            <li>
              <strong>Overseas transfer</strong> &mdash; records are stored with the database service Supabase Inc.
              (supabase.com) on servers in Singapore (region Southeast Asia), sent over an encrypted connection (HTTPS) when you
              tap &ldquo;Dare&rdquo;. They are not shared with anyone else.
            </li>
            <li>
              <strong>Opting out</strong> &mdash; if you don&rsquo;t tap &ldquo;Dare&rdquo;, nothing is sent. If there is no
              connection, the App falls back to a long link that carries the record after the <strong>#</strong>, which is
              never sent to the web server.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>7. 아동의 개인정보 · 이용자의 권리</h2>
        <p>
          앱은 계정 · 연락처 · 위치를 수집하지 않으며, 아동을 따로 알아보거나 아동의 정보를 모으지 않습니다. 회사가 맡아 두는
          것은 이용자가 보낸 도전장 기록뿐이며 7일 뒤 지워집니다. 그 전에 지우고 싶으면 짧은 주소의 마지막 7자를 아래
          문의처로 알려 주세요. 기기 안의 기록은 <strong>앱을 지우면 모두 사라집니다.</strong>
        </p>
        <div className="ot-en-block">
          <h3>7. Children&rsquo;s privacy · your rights</h3>
          <p>
            The App collects no account, contact or location data and does not identify or target children. The only thing
            we keep is a dare record you sent, deleted after 7 days; to have it deleted sooner, send us the last 7 characters
            of the short link at the contact below. The records on your device <strong>are removed when you delete the
            App.</strong>
          </p>
        </div>
      </section>

      <section>
        <h2>8. 이 웹사이트</h2>
        <p>
          이 안내 페이지(yeahplus.co.kr)는 Vercel 에서 운영되며, 페이지 방문 수와 속도를 쿠키 없이 집계하는 Vercel 의 통계
          도구를 씁니다. 앱과는 연결되지 않습니다.
        </p>
        <div className="ot-en-block">
          <h3>8. This website</h3>
          <p>
            This page (yeahplus.co.kr) is hosted on Vercel and uses Vercel&rsquo;s cookie-free analytics to count page visits
            and loading speed. It is not connected to the App.
          </p>
        </div>
      </section>

      <section>
        <h2>9. 방침의 변경</h2>
        <p>
          방침이 바뀌면 변경 내용과 시행일을 이 페이지에 게시합니다. 수집 방식이 달라지는 변경은 그 앱 업데이트보다 먼저
          알립니다. 현재 버전 시행일: <strong>2026년 10월 27일</strong>
        </p>
        <div className="ot-en-block">
          <h3>9. Changes to this policy</h3>
          <p>
            Any change is posted here with its effective date. A change in how data is handled is posted before the App
            update that makes it. Current version effective <strong>27 October 2026</strong>.
          </p>
        </div>
      </section>

      <section>
        <h2>10. 개인정보 보호책임자 및 문의 · Contact</h2>
        <p>
          {COMPANY.name} · 개인정보 보호책임자 {COMPANY.ceo}(대표)
          <br />
          {COMPANY.nameEn} · Privacy officer {COMPANY.ceoEn} (CEO)
        </p>
        <a className="ot-mail" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--ot-ink-3)' }}>
          사업자등록번호 {COMPANY.biz} · 통신판매업신고 {COMPANY.mailorder} · {COMPANY.addr}
          <br />
          Business Reg. No. {COMPANY.biz} · Mail-order Reg. {COMPANY.mailorderEn} · {COMPANY.addrEn}
        </p>
      </section>
    </div>
  );
}
