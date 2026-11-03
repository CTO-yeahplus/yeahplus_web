'use client';

/* 로켓주차 이용약관 — 원 테이크 약관과 같은 틀. 한/영 동시.
   상품은 APLUS/ARThing/docs/IAP.md (평생 주차권 kr.co.yeahplus.rocketparking.lifetime · 도색 컬렉션 1 · 주차장 컬렉션 1, 전부 비소모성). */

import { COMPANY, EMAIL } from '../i18n';

const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export default function TermsContent() {
  return (
    <div className="rp-wrap rp-doc">
      <div className="rp-doc-head">
        <h1>
          이용약관
          <br />
          Terms of Use
        </h1>
        <div className="rp-sub">로켓주차 · ROCKET PARKING</div>
        <div className="rp-rev">시행일 2026년 11월 3일 · Effective 3 November 2026</div>
      </div>

      <section>
        <h2>1. 사용권 계약</h2>
        <p>
          로켓주차의 이용에는 Apple 표준 사용권 계약(EULA)이 적용됩니다: <a href={EULA}>Apple 표준 EULA</a>. 이 약관은 그 계약에 더해
          로켓주차에만 해당하는 사항을 적은 것입니다.
        </p>
        <div className="rp-en-block">
          <h3>1. License agreement</h3>
          <p>
            Use of ROCKET PARKING is governed by Apple&rsquo;s standard Licensed Application End User License Agreement:{' '}
            <a href={EULA}>Apple Standard EULA</a>. These terms add only what is specific to ROCKET PARKING.
          </p>
        </div>
      </section>

      <section>
        <h2>2. 앱 안 구입</h2>
        <ul className="rp-bullets">
          <li>앱은 무료입니다. 착륙 · 훈련 · 모범 착륙 · 오늘의 주차 · 사진 카드 · 중계 클립은 구입 없이 끝없이 쓸 수 있습니다.</li>
          <li>
            <strong>평생 주차권</strong>은 한 번 사는 비소모성 상품입니다. 발사 → 궤도 → 귀환 무제한, 주차 수첩 무제한, 기체 종류(헤비 ·
            쇼트 · 쌍발), 난이도 전문가 · 전설이 열립니다. 기간이 없고 자동으로 갱신되지 않습니다.
          </li>
          <li>
            <strong>도색 컬렉션 1 · 주차장 컬렉션 1</strong>은 외형만 바뀌는 비소모성 묶음입니다. 점수나 난이도에 영향을 주지 않으며, 사기
            전에 격납고에서 입혀 볼 수 있습니다. 무작위 보상(뽑기)은 없습니다.
          </li>
          <li>결제 · 환불은 Apple 이 처리합니다. 환불은 Apple 의 &lsquo;문제 신고하기&rsquo;(reportaproblem.apple.com)로 요청해 주십시오.</li>
          <li>같은 Apple ID 의 다른 기기에서는 ☰ 메뉴의 &lsquo;구입 복원&rsquo;으로 다시 열 수 있습니다. 가족 공유를 지원합니다.</li>
          <li>기간 한정 콜라보 미션이나 라이선스 도색은 평생 주차권에 들어 있지 않을 수 있으며, 그때 따로 안내합니다.</li>
        </ul>
        <div className="rp-en-block">
          <h3>2. In-app purchases</h3>
          <ul className="rp-bullets">
            <li>The App is free. Landing, training, model landings, the daily parking, mission cards and broadcast clips are unlimited without a purchase.</li>
            <li>
              The <strong>Lifetime Parking Pass</strong> is a one-time, non-consumable purchase. It opens unlimited launch → orbit →
              return, an unlimited parking log, the Heavy, Short and Twin boosters, and Expert and Legend difficulty. It does not expire
              and does not renew.
            </li>
            <li>
              <strong>Livery Collection 1 and Parking Lot Collection 1</strong> are looks-only, non-consumable packs. They do not change
              scores or difficulty, and can be tried on in the hangar before buying. There are no random rewards.
            </li>
            <li>Payment and refunds are handled by Apple. Please request a refund through Apple&rsquo;s Report a Problem (reportaproblem.apple.com).</li>
            <li>On another device with the same Apple ID, use Restore in the ☰ menu. Family Sharing is supported.</li>
            <li>Limited-time collaboration missions or licensed liveries may not be included in the pass; we will say so when they appear.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>3. 안전하게</h2>
        <p>
          로켓주차는 카메라로 실제 장소를 비추며 즐기는 앱입니다. 걷지 않아도 되도록 만들었지만, 화면을 보는 동안 주변을 살피십시오.
          <strong> 차도 · 계단 · 승강장 가장자리 가까이에서는 하지 마십시오.</strong> 다른 사람의 얼굴이나 개인 공간이 찍히지 않도록
          주의해 주십시오. 앱 속 부스터 · 발사 · 착륙은 지어낸 것이며, 실제 기관 · 기업 · 발사체와 관계가 없습니다.
        </p>
        <div className="rp-en-block">
          <h3>3. Play safely</h3>
          <p>
            ROCKET PARKING shows real places through your camera. It is designed so you never need to walk, but stay aware of your
            surroundings while you look at the screen. <strong>Do not play near traffic, stairs or platform edges.</strong> Take care
            not to film other people&rsquo;s faces or private spaces. The boosters, launches and landings are fictional and have no
            connection to any real agency, company or launch vehicle.
          </p>
        </div>
      </section>

      <section>
        <h2>4. 이용자의 기록</h2>
        <p>
          미션 기록 · 기체 일지 · 주차 수첩과 설정은 이용자의 기기 안에만 있으며, 회사는 이를 받거나 이용하지 않습니다. 앱을 지우면 기록도
          지워지고, 회사가 되살려 드릴 수 없습니다.
        </p>
        <div className="rp-en-block">
          <h3>4. Your records</h3>
          <p>
            Your mission records, hull log, parking log and settings stay on your device; we neither receive nor use them. Deleting
            the App deletes them, and we cannot restore them.
          </p>
        </div>
      </section>

      <section>
        <h2>5. 콘텐츠와 권리</h2>
        <p>
          앱의 3D 그림 · 물리 · 소리는 회사가 만든 것이며, 관제 음성은 iOS 내장 음성 합성을 씁니다. 앱이나 그 안의 그림 · 소리를 따로 떼어
          팔거나 배포하지 마십시오. 이용자가 만든 미션 카드 · 중계 클립을 개인 SNS 에 올리는 것은 괜찮습니다.
        </p>
        <div className="rp-en-block">
          <h3>5. Content and rights</h3>
          <p>
            The App&rsquo;s 3D graphics, physics and sound were made by us; the control voice uses iOS&rsquo;s built-in speech
            synthesis. Do not sell or distribute the App or its graphics or sounds separately. Posting your own mission cards and
            broadcast clips on your social media is fine.
          </p>
        </div>
      </section>

      <section>
        <h2>6. 변경 · 준거법</h2>
        <p>약관이 바뀌면 이 페이지에 시행일과 함께 게시합니다. 이 약관은 대한민국 법을 따릅니다.</p>
        <div className="rp-en-block">
          <h3>6. Changes · governing law</h3>
          <p>Changes are posted on this page with their effective date. These terms are governed by the laws of the Republic of Korea.</p>
        </div>
      </section>

      <section>
        <h2>7. 문의 · Contact</h2>
        <a className="rp-mail" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--rp-ink-3)' }}>
          {COMPANY.name} · 대표 {COMPANY.ceo} · 사업자등록번호 {COMPANY.biz} · 통신판매업신고 {COMPANY.mailorder}
          <br />
          {COMPANY.nameEn} · CEO {COMPANY.ceoEn} · Business Reg. No. {COMPANY.biz} · Mail-order Reg. {COMPANY.mailorderEn}
        </p>
      </section>
    </div>
  );
}
