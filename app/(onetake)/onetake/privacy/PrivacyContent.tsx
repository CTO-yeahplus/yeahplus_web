'use client';

/* 이 주소가 App Store Connect 에 등록되는 Privacy Policy URL 이다
   (https://www.yeahplus.co.kr/onetake/privacy). 한/영을 동시에 보여준다.
   원본 문안: APLUS/drift/docs/PRIVACY_POLICY.md · 근거표: APLUS/drift/docs/SUBMISSION_ANSWERS.md 3-1절
   (데이터가 수집되지 않음 — 네트워크 호출 0, 분석·광고·크래시 SDK 없음, 저장은 기기 안, 결제는 Apple).
   앱에 분석·크래시·광고 SDK, 서버, Game Center 가 생기면 이 문서와 App Privacy 라벨을 함께 고친다. */

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
        <div className="ot-rev">시행일 2026년 10월 27일 · Effective 27 October 2026</div>
      </div>

      <div className="ot-callout">
        <p>
          <strong>원 테이크는 어떠한 개인정보도 수집하지 않습니다.</strong>
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>ONE TAKE collects no personal data.</strong>
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
          앱은 이름·이메일·전화번호·기기 식별자·위치·사진·연락처를 포함해 <strong>어떤 종류의 개인정보도 수집·저장·전송하지
          않습니다.</strong> 회원 가입과 로그인이 없습니다.
        </p>
        <div className="ot-en-block">
          <h3>1. Information we collect</h3>
          <p>
            The App does <strong>not collect, store or transmit any personal data</strong>, including names, email
            addresses, phone numbers, device identifiers, location, photos or contacts. There is no sign-up and no login.
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
          앱은 스스로 인터넷에 접속하지 않으며, 비행기 모드에서도 모든 기능이 작동합니다. 광고, 분석, 크래시 보고 등{' '}
          <strong>제3자 SDK 를 일절 쓰지 않으며</strong>, 이용자를 추적하지 않습니다.
        </p>
        <div className="ot-en-block">
          <h3>3. Network and third parties</h3>
          <p>
            The App does not connect to the internet on its own, and everything works in airplane mode. It uses{' '}
            <strong>no advertising networks, no analytics, no crash reporting and no third-party SDKs</strong>, and you are
            not tracked.
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
          <li>앱은 카메라·마이크·사진·위치·연락처 권한을 요청하지 않습니다.</li>
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
            <li>The App does not ask for camera, microphone, photo, location or contacts access.</li>
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
        <h2>6. 이용자가 직접 보내는 파일</h2>
        <p>
          이용자가 iOS 공유 화면으로 파일을 직접 보내는 경우, 그 파일은 이용자가 고른 곳으로만 가며 회사에는 전달되지
          않습니다.
        </p>
        <div className="ot-en-block">
          <h3>6. Files you share</h3>
          <p>If you send a file using the iOS share sheet, it goes only where you choose. It is not sent to us.</p>
        </div>
      </section>

      <section>
        <h2>7. 아동의 개인정보 · 이용자의 권리</h2>
        <p>
          앱은 누구의 개인정보도 수집하지 않으므로 아동의 개인정보도 수집하지 않습니다. 회사가 보관하는 개인정보가 없으므로
          열람·정정·삭제를 요청하실 대상이 없습니다. 기기 안의 기록은 <strong>앱을 지우면 모두 사라집니다.</strong>
        </p>
        <div className="ot-en-block">
          <h3>7. Children&rsquo;s privacy · your rights</h3>
          <p>
            The App collects no personal data from anyone, including children. We hold no personal data about you, so there
            is nothing for us to access, correct or delete. The records on your device <strong>are removed when you delete
            the App.</strong>
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
