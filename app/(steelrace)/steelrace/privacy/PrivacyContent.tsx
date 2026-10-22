'use client';

/* 이 주소가 App Store Connect 에 등록되는 Privacy Policy URL 이다
   (https://www.yeahplus.co.kr/steelrace/privacy). 한/영을 동시에 보여준다.
   근거: APLUS/steelrace/docs/SUBMISSION.md 4절(데이터가 수집되지 않음 — 네트워크 호출 0,
   분석·광고 SDK 없음, 저장은 기기 안 localStorage, Game Center 는 Apple 이 처리).
   앱에 분석·크래시·광고 SDK 나 서버 호출이 생기면 이 문서와 App Privacy 라벨을 함께 고친다. */

import { COMPANY, EMAIL } from '../i18n';

export default function PrivacyContent() {
  return (
    <div className="sr-wrap sr-doc">
      <div className="sr-doc-head">
        <h1>
          개인정보처리방침
          <br />
          Privacy Policy
        </h1>
        <div className="sr-sub">스틸레이스 · STEELRACE</div>
        <div className="sr-rev">시행일 2026년 10월 22일 · Effective 22 October 2026</div>
      </div>

      <div className="sr-callout">
        <p>
          <strong>스틸레이스는 사용자 데이터를 수집하거나 전송하지 않습니다.</strong>
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>STEELRACE does not collect or transmit any user data.</strong>
        </p>
      </div>

      <section>
        <h2>1. 수집하지 않는다는 말의 의미</h2>
        <ul className="sr-bullets">
          <li>앱 자체의 계정·회원가입·로그인이 없습니다.</li>
          <li>앱은 개발자의 서버로 어떤 정보도 보내지 않습니다. 개발자는 이 앱을 위한 서버를 두지 않습니다.</li>
          <li>광고·분석·크래시 보고 도구 등 서드파티 SDK 가 없으며, 이용자를 추적하지 않습니다.</li>
          <li>
            비행 기록, 최고 기록, 메달, 설정은 <strong>이용자의 기기 안에만</strong> 저장되며, 앱을
            삭제하면 함께 삭제됩니다.
          </li>
        </ul>
        <div className="sr-en-block">
          <h3>1. What &ldquo;collects no data&rdquo; means here</h3>
          <ul className="sr-bullets">
            <li>The app has no account, sign-up or login of its own.</li>
            <li>The app sends nothing to the developer. The developer runs no server for this app.</li>
            <li>
              There are no third-party SDKs — no ads, no analytics, no crash reporting — and you are
              not tracked.
            </li>
            <li>
              Your flight records, best times, medals and settings are stored{' '}
              <strong>only on your device</strong> and are deleted with the app.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>2. Game Center (선택)</h2>
        <p>
          순위표와 도전과제를 이용하려면 Apple 의 Game Center 에 로그인할 수 있습니다. 로그인은{' '}
          <strong>선택</strong>이며, 하지 않아도 레이스는 모두 그대로 할 수 있습니다. Game Center 를
          사용하면 기록·점수와 도전과제 달성 여부가 Apple 이 운영하는 서비스로 전송되어{' '}
          <strong>Apple 의 개인정보처리방침에 따라 Apple 이 처리</strong>합니다. 개발자는 그 정보를
          받거나 보관하지 않습니다.
        </p>
        <div className="sr-en-block">
          <h3>2. Game Center (optional)</h3>
          <p>
            You may sign in to Apple&rsquo;s Game Center to use leaderboards and achievements.
            Signing in is <strong>optional</strong>; every race works without it. If you use Game
            Center, your times, scores and achievement progress are sent to Apple&rsquo;s service and{' '}
            <strong>handled by Apple under Apple&rsquo;s privacy policy</strong>. The developer
            neither receives nor stores that information.
          </p>
        </div>
      </section>

      <section>
        <h2>3. 기기 기능</h2>
        <ul className="sr-bullets">
          <li>
            <strong>동작 센서</strong> — 설정의 &lsquo;기울기&rsquo; 조종을 쓸 때 기기의 기울기를 읽어
            드론을 조종합니다. 이 값은 그 순간의 조종에만 쓰이고 저장하거나 보내지 않습니다. 허용하지
            않아도 터치로 조종할 수 있습니다.
          </li>
          <li>
            <strong>진동(햅틱)</strong> — 기기에서 진동을 내기만 하며, 아무 정보도 읽거나 보내지
            않습니다.
          </li>
          <li>앱은 카메라·마이크·위치·연락처·사진에 접근하지 않습니다.</li>
        </ul>
        <div className="sr-en-block">
          <h3>3. Device features</h3>
          <ul className="sr-bullets">
            <li>
              <strong>Motion sensor</strong> — with the &lsquo;Tilt&rsquo; control in Settings, the app
              reads how the device is tilted to steer the drone. The reading is used for steering in
              that moment only; it is never stored or sent. You can steer by touch without allowing it.
            </li>
            <li>
              <strong>Haptics</strong> — the app only plays vibrations on the device; nothing is read
              or sent.
            </li>
            <li>The app does not access the camera, microphone, location, contacts or photos.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>4. 데이터 삭제</h2>
        <p>
          이 앱이 기기에 저장한 것은 <strong>앱을 삭제하면 모두 사라집니다.</strong> 개발자에게 보관된
          것이 없으므로 따로 요청하실 절차가 없습니다. Game Center 기록의 삭제는 Apple 의 절차를
          따릅니다.
        </p>
        <div className="sr-en-block">
          <h3>4. Deleting your data</h3>
          <p>
            Everything this app stores on your device <strong>is removed when you delete the
            app.</strong> The developer holds nothing, so there is no request to make. Removing Game
            Center records follows Apple&rsquo;s own process.
          </p>
        </div>
      </section>

      <section>
        <h2>5. 방침의 변경</h2>
        <p>
          방침이 바뀌면 변경 내용과 시행일을 이 페이지에 게시합니다. 현재 버전 시행일:{' '}
          <strong>2026년 10월 22일</strong>
        </p>
        <div className="sr-en-block">
          <h3>5. Changes to this policy</h3>
          <p>
            Any change is posted here with its effective date. Current version effective{' '}
            <strong>22 October 2026</strong>.
          </p>
        </div>
      </section>

      <section>
        <h2>6. 개인정보 보호책임자 및 문의 · Contact</h2>
        <div className="sr-contact">
          <div style={{ fontSize: '14px', color: 'var(--sr-ink-3)' }}>
            {COMPANY.name} · 개인정보 보호책임자 {COMPANY.ceo}(대표)
            <br />
            {COMPANY.nameEn} · Privacy officer {COMPANY.ceoEn} (CEO)
          </div>
          <a className="sr-mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <div className="sr-note">
            개인정보와 관련한 문의를 보내 주십시오.
            <br />
            Questions about privacy are welcome.
          </div>
        </div>
        <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--sr-ink-3)' }}>
          사업자등록번호 {COMPANY.biz} · 통신판매업신고 {COMPANY.mailorder} · {COMPANY.addr}
          <br />
          Business Reg. No. {COMPANY.biz} · Mail-order Reg. {COMPANY.mailorderEn} · {COMPANY.addrEn}
        </p>
      </section>
    </div>
  );
}
