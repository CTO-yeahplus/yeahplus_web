'use client';

/* 이 주소가 App Store Connect 의 Privacy Policy URL 이다 (https://www.yeahplus.co.kr/rocketparking/privacy). 한/영 동시.
   근거: APLUS/ARThing/docs/SUBMISSION_ANSWERS.md 4절(데이터가 수집되지 않음 — 서버 · 계정 · 분석 · 광고 SDK 없음,
   네트워크는 StoreKit 만, 카메라 영상은 화면 합성에만, 기록은 기기 안). 앱이 바뀌면 이 문서와 App Privacy 라벨을 함께 고친다. */

import { COMPANY, EMAIL } from '../i18n';

export default function PrivacyContent() {
  return (
    <div className="rp-wrap rp-doc">
      <div className="rp-doc-head">
        <h1>
          개인정보처리방침
          <br />
          Privacy Policy
        </h1>
        <div className="rp-sub">로켓주차 · ROCKET PARKING</div>
        <div className="rp-rev">시행일 2026년 11월 3일 · Effective 3 November 2026</div>
      </div>

      <div className="rp-callout">
        <p>
          <strong>로켓주차는 사용자 데이터를 수집하거나 전송하지 않습니다.</strong>
        </p>
        <p style={{ marginTop: '10px' }}>
          <strong>ROCKET PARKING does not collect or transmit any user data.</strong>
        </p>
      </div>

      <section>
        <h2>1. 수집하지 않는다는 말의 의미</h2>
        <ul className="rp-bullets">
          <li>앱 자체의 계정 · 회원가입 · 로그인이 없습니다.</li>
          <li>앱은 개발자의 서버로 어떤 정보도 보내지 않습니다. 개발자는 이 앱을 위한 서버를 두지 않습니다. 앱이 하는 통신은 Apple 의 앱 내 구입(StoreKit)뿐입니다.</li>
          <li>광고 · 분석 · 크래시 보고 도구 등 서드파티 SDK 가 없으며, 이용자를 추적하지 않습니다.</li>
          <li>
            미션 기록, 기체 일지, 주차 수첩, 조종사 이름, 설정은 <strong>이용자의 기기 안에만</strong> 저장되며, 앱을 삭제하면 함께
            삭제됩니다.
          </li>
          <li>
            앱은 <strong>위치 정보를 쓰지 않습니다.</strong> 주차 수첩의 &lsquo;자리&rsquo;는 이용자가 직접 적은 이름입니다.
          </li>
        </ul>
        <div className="rp-en-block">
          <h3>1. What &ldquo;collects no data&rdquo; means here</h3>
          <ul className="rp-bullets">
            <li>The app has no account, sign-up or login of its own.</li>
            <li>The app sends nothing to the developer, who runs no server for it. Its only network use is Apple&rsquo;s in-app purchase (StoreKit).</li>
            <li>There are no third-party SDKs — no ads, no analytics, no crash reporting — and you are not tracked.</li>
            <li>
              Mission records, the hull log, the parking log, your pilot name and settings are stored <strong>only on your device</strong>{' '}
              and are deleted with the app.
            </li>
            <li>
              The app <strong>does not use location.</strong> A &lsquo;spot&rsquo; in the parking log is a name you type.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>2. 기기 기능</h2>
        <ul className="rp-bullets">
          <li>
            <strong>카메라</strong> — 착륙장을 비추는 증강현실(AR) 화면에 씁니다. 카메라 영상은 화면에 그리는 데에만 쓰고{' '}
            <strong>저장하거나 보내지 않습니다.</strong> 바닥 · 책상 면을 찾는 계산도 기기 안에서만 이루어집니다.
          </li>
          <li>
            <strong>사진 앱에 추가</strong> — 미션 카드(사진)와 중계 클립(영상)을 이용자가 &lsquo;저장&rsquo;을 고를 때만 사진 앱에
            추가합니다. 앱은 사진 보관함을 읽지 않습니다.
          </li>
          <li>
            <strong>알림</strong> — 부스터가 궤도에 있을 때 &lsquo;아직 궤도에 있다&rsquo;는 알림을 기기 안에서 예약합니다(로컬 알림).
            서버 푸시가 아니며, 허용하지 않아도 게임은 그대로 됩니다.
          </li>
          <li>
            <strong>소리 · 진동</strong> — 엔진 소리와 관제 무전은 기기 안에서 합성합니다(관제 음성은 iOS 내장 음성 합성). 마이크는
            쓰지 않습니다.
          </li>
          <li>앱은 마이크 · 연락처 · 위치 · 건강 정보에 접근하지 않습니다.</li>
        </ul>
        <div className="rp-en-block">
          <h3>2. Device features</h3>
          <ul className="rp-bullets">
            <li>
              <strong>Camera</strong> — used for the augmented-reality view of your landing spot. Camera frames are only drawn on
              screen and are <strong>never stored or sent.</strong> Finding the desk or floor surface happens on the device.
            </li>
            <li>
              <strong>Add to Photos</strong> — mission cards (photos) and broadcast clips (videos) are added to Photos only when you
              choose to save them. The app does not read your photo library.
            </li>
            <li>
              <strong>Notifications</strong> — while a booster is in orbit, the app schedules an on-device &lsquo;still in orbit&rsquo;
              reminder (a local notification). There is no server push, and the game works if you decline.
            </li>
            <li>
              <strong>Sound and haptics</strong> — engine sound and the control radio are synthesised on the device (the voice is
              iOS&rsquo;s built-in speech synthesis). The microphone is not used.
            </li>
            <li>The app does not access the microphone, contacts, location or health data.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>3. 앱 내 구입</h2>
        <p>
          평생 주차권과 소장품 묶음의 결제는 <strong>Apple 이 처리</strong>합니다. 개발자는 이름 · 카드 등 결제 정보를 받지 않으며,
          앱은 Apple 이 알려 주는 &lsquo;구입했음&rsquo; 여부만 기기 안에서 확인합니다.
        </p>
        <div className="rp-en-block">
          <h3>3. In-app purchases</h3>
          <p>
            Payment for the Lifetime Parking Pass and collection packs is <strong>handled by Apple</strong>. The developer never
            receives your name, card or other payment details; the app only checks, on the device, whether Apple reports a purchase.
          </p>
        </div>
      </section>

      <section>
        <h2>4. 이용자가 공유하는 것</h2>
        <p>
          미션 카드와 중계 클립에는 이용자가 적은 장소 이름 · 조종사 이름과 착륙 기록, 카메라에 비친 실제 배경이 담길 수 있습니다.
          이 파일은 이용자가 공유 화면에서 고른 곳으로만 가며, 개발자는 받지 않습니다. 공유하기 전에 배경에 다른 사람이나 개인
          정보가 찍히지 않았는지 살펴 주십시오.
        </p>
        <div className="rp-en-block">
          <h3>4. What you share</h3>
          <p>
            Mission cards and broadcast clips may include the place and pilot names you typed, your landing data and the real
            background your camera saw. They go only where you send them from the share sheet; the developer never receives them.
            Before sharing, check that no other people or personal details are in the background.
          </p>
        </div>
      </section>

      <section>
        <h2>5. 데이터 삭제</h2>
        <p>
          이 앱이 기기에 저장한 것은 <strong>앱을 삭제하면 모두 사라집니다.</strong> 개발자에게 보관된 것이 없으므로 따로 요청하실
          절차가 없습니다.
        </p>
        <div className="rp-en-block">
          <h3>5. Deleting your data</h3>
          <p>
            Everything this app stores on your device <strong>is removed when you delete the app.</strong> The developer holds
            nothing, so there is no request to make.
          </p>
        </div>
      </section>

      <section>
        <h2>6. 이 웹사이트</h2>
        <p>
          이 소개 페이지(yeahplus.co.kr)는 방문 통계를 위해 Vercel 의 웹 분석 도구를 씁니다. 이는 웹사이트에만 해당하며 앱과는
          관계가 없습니다. 페이지 안의 &lsquo;직접 세워 보기&rsquo; 최고 점수와 &lsquo;주차 수첩&rsquo; 칸은 이 브라우저에만 저장되고
          어디로도 보내지 않습니다.
        </p>
        <div className="rp-en-block">
          <h3>6. This website</h3>
          <p>
            This page (yeahplus.co.kr) uses Vercel&rsquo;s web analytics for visit statistics. That applies to the website only,
            not the app. The &lsquo;Land one yourself&rsquo; best score and the parking-log spots on this page are stored in this
            browser only and are sent nowhere.
          </p>
        </div>
      </section>

      <section>
        <h2>7. 방침의 변경</h2>
        <p>
          방침이 바뀌면 변경 내용과 시행일을 이 페이지에 게시합니다. 현재 버전 시행일: <strong>2026년 11월 3일</strong>
        </p>
        <div className="rp-en-block">
          <h3>7. Changes to this policy</h3>
          <p>
            Any change is posted here with its effective date. Current version effective <strong>3 November 2026</strong>.
          </p>
        </div>
      </section>

      <section>
        <h2>8. 개인정보 보호책임자 및 문의 · Contact</h2>
        <div className="rp-contact">
          <div style={{ fontSize: '14px', color: 'var(--rp-ink-3)' }}>
            {COMPANY.name} · 개인정보 보호책임자 {COMPANY.ceo}(대표)
            <br />
            {COMPANY.nameEn} · Privacy officer {COMPANY.ceoEn} (CEO)
          </div>
          <a className="rp-mail" href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
        </div>
      </section>
    </div>
  );
}
