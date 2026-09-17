'use client';

/* 원본은 contraptionlab/docs/privacy.html 이다. 문장은 그대로 옮기고, 공개 문의
   창구만 cto@ → contact@ 로 바꿨다(사이트의 다른 제품 문서와 같은 표기).
   이 페이지는 한/영을 동시에 보여준다 — App Store Connect 에 등록되는
   개인정보 처리방침 URL 이라 언어 토글을 눌러야만 영어가 보이면 곤란하다.
   문구를 고칠 일이 생기면 docs/privacy.html 과 이 파일을 같이 고칠 것. */

import { EMAIL } from '../i18n';

export default function PrivacyContent() {
  return (
    <div className="cp-wrap cp-doc">
      <div className="cp-doc-head">
        <h1>
          개인정보처리방침
          <br />
          Privacy Policy
        </h1>
        <div className="cp-sub">뚝딱 실험실 · Contraption Lab</div>
        <div className="cp-rev">최종 갱신 2026년 8월 28일 · Last updated 28 August 2026</div>
      </div>

      <div className="cp-callout">
        <p>
          뚝딱 실험실은 이용자의 개인정보를 <strong>수집하지 않습니다.</strong> 앱은 인터넷에
          연결하지 않으며, 어떤 정보도 기기 밖으로 나가지 않습니다.
        </p>
        <p style={{ marginTop: '10px' }}>
          Contraption Lab <strong>does not collect any personal information.</strong> The app never
          connects to the internet, and nothing ever leaves your device.
        </p>
      </div>

      <section>
        <h2>수집하는 정보</h2>
        <p>
          없습니다. 이름·이메일·전화번호·주소·생년월일·위치·연락처·사진 등 어떤 개인정보도
          요구하거나 수집하지 않습니다. 계정이나 로그인이 없습니다.
        </p>
        <div className="cp-en-block">
          <h3>Information we collect</h3>
          <p>
            None. We do not ask for or collect names, email addresses, phone numbers, addresses,
            dates of birth, location, contacts, or photos. There is no account and no login.
          </p>
        </div>
      </section>

      <section>
        <h2>기기에 저장되는 것</h2>
        <p>
          게임 진행 상황(클리어한 레벨, 모은 별, 언어와 소리 설정)만 기기 내부 저장소에 보관됩니다.
          이 정보는 다음과 같습니다.
        </p>
        <ul className="cp-bullets">
          <li>기기를 떠나지 않습니다. 서버로 전송되지 않습니다.</li>
          <li>개발사를 포함해 누구도 열람할 수 없습니다.</li>
          <li>앱을 삭제하면 함께 삭제됩니다.</li>
        </ul>
        <div className="cp-en-block">
          <h3>What is stored on your device</h3>
          <p>
            Only your game progress — which levels you cleared, the stars you earned, and your
            language and sound settings. This data:
          </p>
          <ul className="cp-bullets">
            <li>never leaves the device and is never sent to a server;</li>
            <li>cannot be read by anyone, including us;</li>
            <li>is deleted when you delete the app.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>네트워크 사용</h2>
        <p>
          앱은 어떤 네트워크 요청도 하지 않습니다. 비행기 모드에서도 모든 기능이 동일하게
          동작합니다.
        </p>
        <div className="cp-en-block">
          <h3>Network use</h3>
          <p>
            The app makes no network requests of any kind. Everything works identically in Airplane
            Mode.
          </p>
        </div>
      </section>

      <section>
        <h2>제3자 서비스</h2>
        <p>
          광고 네트워크, 분석(애널리틱스) 도구, 크래시 리포터, 소셜 로그인 등 제3자 SDK를 일절
          사용하지 않습니다. 앱 내 결제와 구독도 없습니다.
        </p>
        <div className="cp-en-block">
          <h3>Third-party services</h3>
          <p>
            We use no third-party SDKs — no ad networks, no analytics, no crash reporting, no social
            sign-in. There are no in-app purchases or subscriptions.
          </p>
        </div>
      </section>

      <section>
        <h2>어린이 개인정보</h2>
        <p>
          이 앱은 어린이가 사용하도록 만들어졌습니다. 아무 정보도 수집하지 않으므로, 어린이의
          개인정보 역시 수집·이용·제공하지 않습니다. 앱 안에는 외부 링크, 채팅, 이용자 생성 콘텐츠가
          없습니다.
        </p>
        <div className="cp-en-block">
          <h3>Children&rsquo;s privacy</h3>
          <p>
            This app is made for children. Because we collect no information at all, we collect no
            information from children either. The app contains no external links, no chat, and no
            user-generated content.
          </p>
        </div>
      </section>

      <section>
        <h2>정책 변경</h2>
        <p>정책이 바뀌면 이 페이지에서 갱신하고, 앱 업데이트 설명에 안내합니다.</p>
        <div className="cp-en-block">
          <h3>Changes</h3>
          <p>
            If this policy changes we will update this page and note it in the app&rsquo;s release
            notes.
          </p>
        </div>
      </section>

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
            개인정보와 관련한 문의를 보내 주십시오.
            <br />
            Questions about privacy are welcome.
          </div>
        </div>
      </section>
    </div>
  );
}
