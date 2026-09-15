'use client';

/* 원본은 steelstorm/docs/privacy.html 이다. 문장은 그대로 옮기고, 공개 문의
   창구만 cto@ → contact@ 로 바꿨다(사이트의 다른 제품 문서와 같은 표기).
   문구를 고칠 일이 생기면 docs/privacy.html 과 이 파일을 같이 고칠 것 —
   이 주소가 App Store Connect 에 등록되는 Privacy Policy URL 이다. */

import { EMAIL } from '../i18n';

export default function PrivacyContent() {
  return (
    <div className="ss-wrap ss-doc">
      <div className="ss-doc-head">
        <h1>
          개인정보처리방침
          <br />
          Privacy Policy
        </h1>
        <div className="ss-sub">스틸스톰 아레나 · SteelStorm Arena</div>
        <div className="ss-rev">시행일 2026년 9월 15일 · Effective 15 September 2026</div>
      </div>

      <div className="ss-callout">
        <p>
          <strong>스틸스톰 아레나는 어떠한 데이터도 수집하지 않습니다.</strong>
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>SteelStorm Arena does not collect any data.</strong>
        </p>
      </div>

      <section>
        <h2>1. 수집하지 않는다는 말의 의미</h2>
        <ul className="ss-bullets">
          <li>앱 자체의 계정·로그인이 없습니다.</li>
          <li>앱은 자체 서버를 두지 않으며, 이용자의 정보를 외부로 전송하지 않습니다.</li>
          <li>광고·분석 도구·서드파티 SDK 가 없습니다.</li>
          <li>
            설정, 진행 상황, 최고 점수 등 모든 게임 기록은 이용자의 기기 안에만 저장되며, 앱을
            삭제하면 함께 삭제됩니다.
          </li>
        </ul>
        <div className="ss-en-block">
          <h3>1. What &ldquo;collects no data&rdquo; means here</h3>
          <ul className="ss-bullets">
            <li>The app has no account and no login of its own.</li>
            <li>The app operates no server of its own and never transmits your information anywhere.</li>
            <li>There are no ads, no analytics, and no third-party SDKs.</li>
            <li>
              Settings, progress and records such as your best score are stored only on your device
              and are deleted with the app.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>2. Game Center (선택)</h2>
        <p>
          리더보드와 도전 과제를 이용하려면 Apple 의 Game Center 에 로그인할 수 있습니다. 로그인은{' '}
          <strong>선택</strong>이며, 하지 않아도 게임의 모든 기능을 그대로 이용할 수 있습니다. Game
          Center 를 사용하는 경우 점수와 도전 과제 달성 여부는 Apple 이 운영하는 서비스로 전송되어
          Apple 의 개인정보처리방침에 따라 처리됩니다. 개발자는 해당 정보를 수집하거나 보관하지
          않습니다.
        </p>
        <div className="ss-en-block">
          <h3>2. Game Center (optional)</h3>
          <p>
            You may sign in to Apple&rsquo;s Game Center to use leaderboards and achievements.
            Signing in is <strong>optional</strong> and every feature of the game works without it.
            If you use Game Center, your scores and achievement progress are sent to Apple&rsquo;s
            service and handled under Apple&rsquo;s privacy policy. The developer neither collects
            nor stores that information.
          </p>
        </div>
      </section>

      <section>
        <h2>3. 결과 공유 (선택)</h2>
        <p>
          전투 결과 이미지를 공유할 때는 iOS 의 기본 공유 시트가 열립니다. 어디로 보낼지는 이용자가
          직접 선택하며, 앱이 이미지를 임의로 전송하지 않습니다.
        </p>
        <div className="ss-en-block">
          <h3>3. Sharing results (optional)</h3>
          <p>
            Sharing a result image opens the standard iOS share sheet. You choose where it goes; the
            app never sends the image on its own.
          </p>
        </div>
      </section>

      <section>
        <h2>4. 데이터 삭제</h2>
        <p>
          이 앱과 관련해 기기에 저장된 모든 것은{' '}
          <strong>앱을 삭제하면 함께 사라집니다.</strong> 저희 서버에 보관된 것이 없으므로 따로
          요청하실 절차가 없습니다. Game Center 쪽 기록의 삭제는 Apple 의 절차를 따릅니다.
        </p>
        <div className="ss-en-block">
          <h3>4. Deleting your data</h3>
          <p>
            Everything this app stores on your device{' '}
            <strong>is removed when you delete the app.</strong> We hold nothing on a server, so
            there is no request to make. Removing Game Center records follows Apple&rsquo;s own
            process.
          </p>
        </div>
      </section>

      <section>
        <h2>5. 방침의 변경</h2>
        <p>
          방침이 바뀌면 변경 내용과 시행일을 이 페이지에 게시합니다. 현재 버전 시행일:{' '}
          <strong>2026년 9월 15일</strong>
        </p>
        <div className="ss-en-block">
          <h3>5. Changes to this policy</h3>
          <p>
            Any change is posted here with its effective date. Current version effective{' '}
            <strong>15 September 2026</strong>.
          </p>
        </div>
      </section>

      <section>
        <h2>6. 문의 · Contact</h2>
        <div className="ss-contact">
          <div style={{ fontSize: '14px', color: 'var(--ss-ink-3)' }}>
            주식회사 예아플러스(yeahplus)
          </div>
          <a className="ss-mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <div className="ss-note">
            개인정보와 관련한 문의를 보내 주십시오.
            <br />
            Questions about privacy are welcome.
          </div>
        </div>
      </section>
    </div>
  );
}
