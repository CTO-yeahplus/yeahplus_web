/* App Store Connect 의 Privacy Policy URL (https://www.yeahplus.co.kr/munghae/privacy).
   근거: 앱 저장소 MUNGHAE-Mem — 네트워크 호출 0(tools/scan_metadata.py 가 번들을 검사), 분석·광고 SDK 없음,
   저장은 WKWebView localStorage·IndexedDB, 사진은 시스템 선택기(읽기 권한 없음), 저장은 add-only 권한.
   앱에 서버 호출·SDK 가 생기면 이 문서와 App Privacy 라벨을 함께 고친다.
   2026-10-22 멍해 본편(계정·서버가 있던 앱)을 대체하면서 전부 새로 썼다. */

import { COMPANY, EMAIL } from '../site';

function Sec({ n, ko, en, children, enChildren }: {
  n: number; ko: string; en: string; children: React.ReactNode; enChildren: React.ReactNode;
}) {
  return (
    <section>
      <h2>{n}. {ko}</h2>
      {children}
      <div className="kp-en-block">
        <h3>{n}. {en}</h3>
        {enChildren}
      </div>
    </section>
  );
}

export default function PrivacyContent() {
  return (
    <div className="kp-wrap kp-doc">
      <div className="kp-doc-head">
        <h1>개인정보처리방침<br />Privacy Policy</h1>
        <div className="kp-sub">간직 · Keepsake</div>
        <div className="kp-rev">시행일 2026년 10월 22일 · Effective 22 October 2026</div>
      </div>

      <div className="kp-callout">
        <p><strong>간직은 사용자 데이터를 수집하거나 전송하지 않습니다.</strong></p>
        <p><strong>Keepsake does not collect or transmit any user data.</strong></p>
      </div>

      <Sec n={1} ko="수집하지 않는다는 말의 의미" en="What “collects no data” means here"
        enChildren={
          <ul className="kp-bullets">
            <li>The app has no account, sign-up or login.</li>
            <li>The app makes no network requests. The developer runs no server for this app.</li>
            <li>There are no third-party SDKs — no ads, analytics or crash reporting — and you are not tracked.</li>
            <li>Photos, letters, guestbook entries, anniversaries and every other record are stored <strong>only on your device</strong>.</li>
          </ul>
        }>
        <ul className="kp-bullets">
          <li>계정·회원가입·로그인이 없습니다.</li>
          <li>앱은 인터넷으로 아무것도 보내지 않습니다. 개발자는 이 앱을 위한 서버를 두지 않습니다.</li>
          <li>광고·분석·크래시 보고 도구 등 서드파티 SDK 가 없으며, 이용자를 추적하지 않습니다.</li>
          <li>사진·편지·방명록·기념일 등 모든 기록은 <strong>이용자의 기기 안에만</strong> 저장됩니다.</li>
        </ul>
      </Sec>

      <Sec n={2} ko="기기 기능" en="Device features"
        enChildren={
          <ul className="kp-bullets">
            <li><strong>Photos</strong> — photos are chosen with the system picker, so the app never reads your library. Only the photos you pick are copied into the app.</li>
            <li><strong>Saving to Photos</strong> — saving a memorial card or artwork asks for add-only access. The app can add images but cannot see your library.</li>
            <li><strong>Lifting your pet from a photo</strong> — done entirely on the device with Apple&rsquo;s Vision framework (iOS 17 or later). No image leaves the device.</li>
            <li><strong>Motion</strong> — shaking or tilting moves the snow and the scene. The reading is used in that moment only and is never stored or sent.</li>
            <li>The app does not use the camera, microphone, location or contacts.</li>
          </ul>
        }>
        <ul className="kp-bullets">
          <li><strong>사진</strong> — 시스템 사진 선택기로 고르므로 앱은 사진 보관함을 읽지 않습니다. 고른 사진만 앱 안으로 복사됩니다.</li>
          <li><strong>사진 앱에 저장</strong> — 추모 카드·아트웍을 저장할 때 &lsquo;추가 전용&rsquo; 권한을 요청합니다. 사진을 더할 수만 있고 보관함을 볼 수는 없습니다.</li>
          <li><strong>사진에서 반려동물 오려내기</strong> — Apple Vision 으로 기기 안에서만 처리합니다(iOS 17 이상). 사진은 기기 밖으로 나가지 않습니다.</li>
          <li><strong>동작 센서</strong> — 흔들거나 기울이면 눈과 풍경이 움직입니다. 그 순간에만 쓰고 저장하거나 보내지 않습니다.</li>
          <li>카메라·마이크·위치·연락처는 쓰지 않습니다.</li>
        </ul>
      </Sec>

      <Sec n={3} ko="백업 파일" en="Backup files"
        enChildren={
          <p>
            Settings → <em>Export backup file</em> creates one file with your records and photos, and the iOS share sheet lets
            you choose where it goes (for example the Files app). Where it is kept is up to you; the developer never receives it.
          </p>
        }>
        <p>
          설정 → <em>백업 파일 내보내기</em>를 누르면 기록과 사진을 담은 파일 하나가 만들어지고, iOS 공유 시트에서 보관할 곳(예: 파일 앱)을
          이용자가 고릅니다. 보관 장소는 이용자의 선택이며 개발자에게 전달되지 않습니다.
        </p>
      </Sec>

      <Sec n={4} ko="구입" en="Purchases"
        enChildren={<p>In-app purchases are processed by Apple. The developer receives no payment details or personal information.</p>}>
        <p>앱 안 구입은 Apple 이 처리합니다. 개발자는 결제 정보나 개인정보를 받지 않습니다.</p>
      </Sec>

      <Sec n={5} ko="데이터 삭제" en="Deleting your data"
        enChildren={
          <p>
            Deleting the app removes everything it stored on the device. The developer holds nothing, so there is no request to
            make. Backup files you exported stay wherever you saved them until you delete them.
          </p>
        }>
        <p>
          앱을 삭제하면 기기에 저장된 것이 모두 사라집니다. 개발자에게 보관된 것이 없으므로 따로 요청하실 절차가 없습니다. 이용자가
          내보낸 백업 파일은 직접 지우기 전까지 보관한 곳에 남습니다.
        </p>
      </Sec>

      <Sec n={6} ko="이 웹사이트" en="This website"
        enChildren={
          <p>
            This page (yeahplus.co.kr) uses Vercel Analytics and Speed Insights to count visits and measure loading speed in
            aggregate. They use no cookies and do not identify you. This applies to the website only, not to the app.
          </p>
        }>
        <p>
          이 페이지(yeahplus.co.kr)는 방문 수와 로딩 속도를 묶음 통계로 보기 위해 Vercel Analytics·Speed Insights 를 씁니다. 쿠키를
          쓰지 않고 방문자를 식별하지 않습니다. 이 항목은 웹사이트에만 해당하며 앱과는 관계없습니다.
        </p>
      </Sec>

      <Sec n={7} ko="방침의 변경" en="Changes to this policy"
        enChildren={<p>Any change is posted here with its effective date. Current version effective <strong>22 October 2026</strong>.</p>}>
        <p>방침이 바뀌면 변경 내용과 시행일을 이 페이지에 게시합니다. 현재 버전 시행일: <strong>2026년 10월 22일</strong></p>
      </Sec>

      <section>
        <h2>8. 개인정보 보호책임자 및 문의 · Contact</h2>
        <div className="kp-contact">
          <div className="kp-note">
            {COMPANY.name} · 개인정보 보호책임자 {COMPANY.ceo}(대표)
            <br />
            {COMPANY.nameEn} · Privacy officer {COMPANY.ceoEn} (CEO)
          </div>
          <a className="kp-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </section>
    </div>
  );
}
