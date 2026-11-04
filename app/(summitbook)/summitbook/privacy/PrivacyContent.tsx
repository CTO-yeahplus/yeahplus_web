'use client';

/* 이 주소가 App Store Connect · TestFlight 의 개인정보 처리방침 URL 이다 (https://www.yeahplus.co.kr/summitbook/privacy). 한/영 동시.
   근거: APLUS/summitbook/docs/SUBMISSION_ANSWERS.md 6절(데이터를 수집하지 않음 — 위치는 기기 안 판정만, 사진 PHPicker · Vision 기기 안,
   StoreKit, 공유 시트, TestFlight 현장 기록은 좌표 없이 테스터가 내보낼 때만). 앱이 바뀌면 이 문서와 App Privacy 라벨을 함께 고친다. */

import { COMPANY, EMAIL } from '../i18n';
import { APP } from '../names';

export default function PrivacyContent() {
  return (
    <div className="sb-wrap sb-doc">
      <div className="sb-doc-head">
        <h1>
          개인정보처리방침
          <br />
          Privacy Policy
        </h1>
        <div className="sb-sub">
          {APP.ko} · {APP.en}
        </div>
        <div className="sb-rev">시행일 2026년 11월 4일 · Effective 4 November 2026</div>
      </div>

      <div className="sb-callout">
        <p>
          <strong>{APP.ko} 앱은 사용자 데이터를 수집하거나 전송하지 않습니다.</strong> 위치는 정상 반경 안인지 기기 안에서 판정하는 데에만 쓰고, 저장하거나
          보내지 않습니다.
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>{APP.en} does not collect or transmit any user data.</strong> Location is used only to judge, on your device, whether you are within
          the summit radius. It is never stored or sent.
        </p>
      </div>

      <section>
        <h2>1. 수집하지 않는다는 말의 의미</h2>
        <ul className="sb-bullets">
          <li>앱 자체의 계정 · 회원가입 · 로그인이 없습니다.</li>
          <li>개발자는 이 앱을 위한 서버를 두지 않으며, 앱은 개발자에게 어떤 정보도 보내지 않습니다. 앱이 하는 통신은 Apple 의 앱 내 구입(StoreKit)뿐입니다.</li>
          <li>광고 · 분석 · 크래시 보고 도구 등 서드파티 SDK 가 없으며, 이용자를 추적하지 않습니다.</li>
          <li>
            오름 기록 · 사진 · 적은 글 · 설정은 <strong>이용자의 기기 안(앱 폴더)에만</strong> 저장되며, 앱을 삭제하면 함께 삭제됩니다.
          </li>
          <li>산 100곳의 목록과 좌표는 앱 안에 들어 있어, 인터넷 없이 동작합니다.</li>
        </ul>
        <div className="sb-en-block">
          <h3>1. What &ldquo;collects no data&rdquo; means here</h3>
          <ul className="sb-bullets">
            <li>The app has no account, sign-up or login of its own.</li>
            <li>The developer runs no server for this app, and the app sends nothing to the developer. Its only network use is Apple&rsquo;s in-app purchase (StoreKit).</li>
            <li>There are no third-party SDKs — no ads, no analytics, no crash reporting — and you are not tracked.</li>
            <li>
              Climbs, photos, notes and settings are stored <strong>only on your device (in the app&rsquo;s folder)</strong> and are deleted with the app.
            </li>
            <li>The list and coordinates of the 100 mountains are built into the app, so it works offline.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>2. 위치 정보</h2>
        <ul className="sb-bullets">
          <li>
            위치 권한은 <strong>앱을 사용하는 동안</strong>만 씁니다. 처음 돌탑 도장을 꾹 누를 때 묻습니다.
          </li>
          <li>
            도장을 누르는 동안 위치를 <strong>한 번</strong> 받아, 가장 가까운 정상까지의 거리를 기기 안에서 계산하고 정상 반경(150m) 안인지 판정한 뒤
            위치 받기를 끕니다. 산행 내내 기록하지 않습니다.
          </li>
          <li>
            받은 좌표는 <strong>저장하지 않습니다.</strong> 수첩에 남는 것은 어느 산인지, 시각, 정상까지의 거리, 위치 정확도뿐입니다.
          </li>
          <li>
            평생권의 &lsquo;내 산&rsquo;을 만들 때만, 이용자가 정상으로 정한 그 자리의 좌표를 이 기기 안에 저장합니다(다음에 그 정상을 판정하려고). 앱을
            삭제하거나 그 산을 지우면 함께 지워집니다.
          </li>
          <li>앱은 길 안내 · 위치 공유 · 백그라운드 위치를 쓰지 않습니다.</li>
        </ul>
        <div className="sb-en-block">
          <h3>2. Location</h3>
          <ul className="sb-bullets">
            <li>
              Location permission is <strong>While Using the App</strong> only. It is asked the first time you press and hold the cairn stamp.
            </li>
            <li>
              While you hold the stamp, the app takes <strong>one</strong> location fix, computes the distance to the nearest summit on the device,
              judges whether you are within the summit radius (150 m), and then stops. It does not track your hike.
            </li>
            <li>
              The coordinates are <strong>not stored.</strong> The notebook keeps only which mountain, the time, the distance to the summit and the
              accuracy of the fix.
            </li>
            <li>
              Only when you create a &ldquo;My Mountain&rdquo; (Lifetime pass) does the app store the spot you chose as a summit, on this device, so it
              can judge that summit next time. It is removed when you delete that mountain or the app.
            </li>
            <li>The app does not give directions, share your location, or use background location.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>3. 사진 · 기기 기능</h2>
        <ul className="sb-bullets">
          <li>
            <strong>사진 고르기</strong> — iOS 사진 선택 창(PHPicker)으로 이용자가 고른 사진만 받습니다. 사진 보관함 전체에 접근하는 권한을 요청하지
            않습니다.
          </li>
          <li>
            <strong>사람 오려 내기</strong> — 사진 속 사람을 Apple Vision 으로 <strong>기기 안에서</strong> 오려 정상 쪽에 놓습니다. 사진과 오려 낸 그림은 앱
            폴더에만 저장되고 어디로도 보내지 않습니다.
          </li>
          <li>
            <strong>사진 앱에 추가</strong> — 공유 화면에서 이용자가 &lsquo;이미지 저장&rsquo;을 고를 때만 사진 앱에 추가합니다(추가 전용 권한).
          </li>
          <li>
            <strong>소리 · 진동</strong> — 도장 소리는 기기 안에서 합성합니다. 마이크 · 카메라 · 연락처 · 건강 정보에 접근하지 않습니다.
          </li>
        </ul>
        <div className="sb-en-block">
          <h3>3. Photos and device features</h3>
          <ul className="sb-bullets">
            <li>
              <strong>Choosing photos</strong> — the iOS photo picker (PHPicker) hands the app only the photos you pick. The app does not ask for access
              to your photo library.
            </li>
            <li>
              <strong>Cutting out the person</strong> — Apple Vision cuts the person out <strong>on the device</strong> to place them on the summit page.
              The photo and the cutout stay in the app&rsquo;s folder and are sent nowhere.
            </li>
            <li>
              <strong>Add to Photos</strong> — only when you choose &ldquo;Save Image&rdquo; in the share sheet (add-only permission).
            </li>
            <li>
              <strong>Sound and haptics</strong> — the stamp sound is synthesised on the device. The app does not access the microphone, camera, contacts or
              health data.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>4. 앱 내 구입</h2>
        <p>
          평생권 결제는 <strong>Apple 이 처리</strong>합니다. 개발자는 이름 · 카드 등 결제 정보를 받지 않으며, 앱은 Apple 이 알려 주는 &lsquo;구입했음&rsquo;
          여부만 기기 안에서 확인합니다.
        </p>
        <div className="sb-en-block">
          <h3>4. In-app purchase</h3>
          <p>
            Payment for the Lifetime pass is <strong>handled by Apple</strong>. The developer never receives your name, card or other payment details; the
            app only checks, on the device, whether Apple reports a purchase.
          </p>
        </div>
      </section>

      <section>
        <h2>5. 이용자가 내보내는 것</h2>
        <p>
          정상 쪽 이미지 · 스토리 이미지 · PDF · 수첩 백업 파일은 이용자가 iOS 공유 화면에서 고른 곳으로만 가며, 개발자는 받지 않습니다. 이미지에는 산 이름 ·
          날짜 · 시각과 이용자가 적은 글(코스 · 함께 간 사람 · 한 줄)이 들어갑니다. 백업 파일에는 수첩 전체(사진 · 글 · 내 산의 자리 포함)가 들어갑니다. 함께
          찍힌 사람이 있다면 보내기 전에 그 사람의 뜻을 살펴 주십시오.
        </p>
        <div className="sb-en-block">
          <h3>5. What you export</h3>
          <p>
            Page images, story images, PDFs and notebook backup files go only where you send them from the iOS share sheet; the developer never receives
            them. Images include the mountain name, date, time and anything you wrote (route, companions, a line). A backup file contains the whole
            notebook (photos, notes and any My Mountain spots). If other people appear in a photo, please consider their wishes before sharing.
          </p>
        </div>
      </section>

      <section>
        <h2>6. 시험판(TestFlight)의 현장 기록</h2>
        <p>
          TestFlight 시험판에만 &lsquo;현장 기록&rsquo; 칸이 있으며, 시험 참여자가 직접 켜야 남습니다. 남는 것은 위치 정확도의 변화 · 걸린 시간 · 정상까지의
          거리이고 <strong>좌표는 남지 않습니다.</strong> 시험 참여자가 직접 파일로 내보내 보낼 때만 개발자에게 전달됩니다. App Store 판에는 이 칸이 없습니다.
        </p>
        <div className="sb-en-block">
          <h3>6. Field log in the TestFlight beta</h3>
          <p>
            Only TestFlight builds have a &ldquo;field log&rdquo; option, and it records nothing unless the tester turns it on. It keeps how the accuracy
            changed, how long it took and the distance to the summit — <strong>no coordinates.</strong> It reaches the developer only if the tester
            exports the file and sends it. App Store builds do not have this option.
          </p>
        </div>
      </section>

      <section>
        <h2>7. 데이터 삭제</h2>
        <p>
          이 앱이 기기에 저장한 것은 <strong>앱을 삭제하면 모두 사라집니다.</strong> 개발자에게 보관된 것이 없으므로 따로 요청하실 절차가 없습니다.
        </p>
        <div className="sb-en-block">
          <h3>7. Deleting your data</h3>
          <p>
            Everything this app stores on your device <strong>is removed when you delete the app.</strong> The developer holds nothing, so there is no
            request to make.
          </p>
        </div>
      </section>

      <section>
        <h2>8. 이 웹사이트</h2>
        <p>
          이 소개 페이지(yeahplus.co.kr)는 방문 통계를 위해 Vercel 의 웹 분석 도구를 씁니다. 이는 웹사이트에만 해당하며 앱과는 관계가 없습니다. 페이지 안의
          &lsquo;꾹 눌러 찍기&rsquo; 시연은 위치를 읽지 않습니다.
        </p>
        <div className="sb-en-block">
          <h3>8. This website</h3>
          <p>
            This page (yeahplus.co.kr) uses Vercel&rsquo;s web analytics for visit statistics. That applies to the website only, not the app. The
            &ldquo;press and hold&rdquo; demo on the page never reads your location.
          </p>
        </div>
      </section>

      <section>
        <h2>9. 방침의 변경</h2>
        <p>
          방침이 바뀌면 변경 내용과 시행일을 이 페이지에 게시합니다. 현재 버전 시행일: <strong>2026년 11월 4일</strong>
        </p>
        <div className="sb-en-block">
          <h3>9. Changes to this policy</h3>
          <p>
            Any change is posted here with its effective date. Current version effective <strong>4 November 2026</strong>.
          </p>
        </div>
      </section>

      <section>
        <h2>10. 개인정보 보호책임자 및 문의 · Contact</h2>
        <div className="sb-contact">
          <div style={{ fontSize: '14px', color: 'var(--sb-ink-3)' }}>
            {COMPANY.name} · 개인정보 보호책임자 {COMPANY.ceo}(대표)
            <br />
            {COMPANY.nameEn} · Privacy officer {COMPANY.ceoEn} (CEO)
          </div>
          <a className="sb-mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
      </section>
    </div>
  );
}
