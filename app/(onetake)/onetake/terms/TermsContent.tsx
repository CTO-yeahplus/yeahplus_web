'use client';

/* 원 테이크 이용약관 — 간직·실록 약관과 같은 틀. 한/영 동시.
   상품·가격 결정은 APLUS/drift/docs/BM.md (앱 무료 + 비소모성 '장소 평생권' kr.co.yeahplus.onetake.locations). */

import { COMPANY, EMAIL } from '../i18n';

const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export default function TermsContent() {
  return (
    <div className="ot-wrap ot-doc">
      <div className="ot-doc-head">
        <h1>
          이용약관
          <br />
          Terms of Use
        </h1>
        <div className="ot-sub">원 테이크 · ONE TAKE</div>
        <div className="ot-rev">시행일 2026년 10월 27일 · Effective 27 October 2026</div>
      </div>

      <section>
        <h2>1. 사용권 계약</h2>
        <p>
          원 테이크의 이용에는 Apple 표준 사용권 계약(EULA)이 적용됩니다: <a href={EULA}>Apple 표준 EULA</a>. 이 약관은 그
          계약에 더해 원 테이크에만 해당하는 사항을 적은 것입니다.
        </p>
        <div className="ot-en-block">
          <h3>1. License agreement</h3>
          <p>
            Use of ONE TAKE is governed by Apple&rsquo;s standard Licensed Application End User License Agreement:{' '}
            <a href={EULA}>Apple Standard EULA</a>. These terms add only what is specific to ONE TAKE.
          </p>
        </div>
      </section>

      <section>
        <h2>2. 앱 안 구입 — 장소 평생권</h2>
        <ul className="ot-bullets">
          <li>앱은 무료입니다. 야드와 붉은 흙 놀이터는 구입 없이 열려 있고, 모든 장소의 모범 테이크는 구입 없이 볼 수 있습니다.</li>
          <li>
            <strong>장소 평생권</strong>은 한 번 사는 비소모성 상품입니다. 나머지 장소 전부와 앞으로 추가되는 장소가 열리며,
            기간이 없고 자동으로 갱신되지 않습니다.
          </li>
          <li>결제·환불은 Apple 이 처리합니다. 환불은 Apple 의 &lsquo;문제 신고하기&rsquo;(reportaproblem.apple.com)로 요청해 주십시오.</li>
          <li>같은 Apple ID 의 다른 기기에서는 설정의 &lsquo;구입 복원&rsquo;으로 다시 열 수 있습니다. 가족 공유를 지원합니다.</li>
        </ul>
        <div className="ot-en-block">
          <h3>2. In-app purchase — All Locations pass</h3>
          <ul className="ot-bullets">
            <li>The App is free. The Yard and Red Dirt are open without a purchase, and the master take of every location can be watched without one.</li>
            <li>
              The <strong>All Locations pass</strong> is a one-time, non-consumable purchase. It opens every other location
              and every location added later. It does not expire and does not renew.
            </li>
            <li>Payment and refunds are handled by Apple. Please request a refund through Apple&rsquo;s Report a Problem (reportaproblem.apple.com).</li>
            <li>On another device with the same Apple ID, use &ldquo;Restore Purchases&rdquo; in Settings. Family Sharing is supported.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>3. 실제 도로에서 따라 하지 마십시오</h2>
        <p>
          원 테이크의 드리프트·점프·충돌은 <strong>가상의 촬영장에서만</strong> 일어나는 게임 속 연출입니다. 실제 도로나 공터에서
          따라 하지 마십시오. 앱에 나오는 장소·차·간판은 모두 지어낸 것입니다.
        </p>
        <div className="ot-en-block">
          <h3>3. Don&rsquo;t try this on a real road</h3>
          <p>
            The drifts, jumps and crashes in ONE TAKE happen <strong>only on a fictional film set</strong>. Do not try them on
            real roads or lots. All locations, cars and signs in the App are made up.
          </p>
        </div>
      </section>

      <section>
        <h2>4. 이용자의 기록</h2>
        <p>
          테이크 기록과 설정은 이용자의 기기 안에만 있으며, 회사는 이를 받거나 이용하지 않습니다. 앱을 지우면 기록도 지워지고,
          회사가 되살려 드릴 수 없습니다.
        </p>
        <div className="ot-en-block">
          <h3>4. Your records</h3>
          <p>
            Your takes and settings stay on your device; we neither receive nor use them. Deleting the App deletes them, and we
            cannot restore them.
          </p>
        </div>
      </section>

      <section>
        <h2>5. 콘텐츠와 권리</h2>
        <p>
          앱의 그림·물리·카메라 연출·음악·효과음은 회사가 만든 것이며, 타이어 마찰음 하나는 Pixabay 콘텐츠 라이선스에 따라 쓴
          녹음을 다듬은 것입니다. 앱이나 그 안의 그림·소리를 따로 떼어 팔거나 배포하지 마십시오. 이용자가 자기 플레이를 찍어
          개인 SNS 에 올리는 것은 괜찮습니다.
        </p>
        <div className="ot-en-block">
          <h3>5. Content and rights</h3>
          <p>
            The App&rsquo;s graphics, physics, camera direction, music and sound effects were made by us; one tyre-squeal
            sound is an edited recording used under the Pixabay Content License. Do not sell or distribute the App or its
            graphics or sounds separately. Recording your own play and posting it on your social media is fine.
          </p>
        </div>
      </section>

      <section>
        <h2>6. 변경 · 준거법</h2>
        <p>
          약관이 바뀌면 이 페이지에 시행일과 함께 게시합니다. 이 약관은 대한민국 법을 따릅니다.
        </p>
        <div className="ot-en-block">
          <h3>6. Changes · governing law</h3>
          <p>Changes are posted on this page with their effective date. These terms are governed by the laws of the Republic of Korea.</p>
        </div>
      </section>

      <section>
        <h2>7. 문의 · Contact</h2>
        <a className="ot-mail" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--ot-ink-3)' }}>
          {COMPANY.name} · 대표 {COMPANY.ceo} · 사업자등록번호 {COMPANY.biz} · 통신판매업신고 {COMPANY.mailorder}
          <br />
          {COMPANY.nameEn} · CEO {COMPANY.ceoEn} · Business Reg. No. {COMPANY.biz} · Mail-order Reg. {COMPANY.mailorderEn}
        </p>
      </section>
    </div>
  );
}
