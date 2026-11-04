'use client';

/* 완등 수첩 이용약관 — 회사 사이트 다른 제품 약관과 같은 틀. 한/영 동시.
   상품: kr.co.yeahplus.summitbook.lifetime 평생권 ₩6,600 비소모성(APLUS/summitbook/docs/SUBMISSION_ANSWERS.md 2절). */

import Link from 'next/link';
import { COMPANY, EMAIL } from '../i18n';
import { APP } from '../names';

const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export default function TermsContent() {
  return (
    <div className="sb-wrap sb-doc">
      <div className="sb-doc-head">
        <h1>
          이용약관
          <br />
          Terms of Use
        </h1>
        <div className="sb-sub">
          {APP.ko} · {APP.en}
        </div>
        <div className="sb-rev">시행일 2026년 11월 4일 · Effective 4 November 2026</div>
      </div>

      <section>
        <h2>1. 사용권 계약</h2>
        <p>
          {APP.ko}의 이용에는 Apple 표준 사용권 계약(EULA)이 적용됩니다: <a href={EULA}>Apple 표준 EULA</a>. 이 약관은 그 계약에 더해 {APP.ko}에만 해당하는
          사항을 적은 것입니다.
        </p>
        <div className="sb-en-block">
          <h3>1. License agreement</h3>
          <p>
            Use of {APP.en} is governed by Apple&rsquo;s standard Licensed Application End User License Agreement: <a href={EULA}>Apple Standard EULA</a>.
            These terms add only what is specific to {APP.en}.
          </p>
        </div>
      </section>

      <section>
        <h2>2. 앱 안 구입</h2>
        <ul className="sb-bullets">
          <li>앱은 무료입니다. 100곳 정상 확인 · 도장 · 수첩 · 정상 쪽 판형 2가지 · 공유는 구입 없이 쓸 수 있습니다.</li>
          <li>
            <strong>평생권</strong>은 한 번 사는 비소모성 상품입니다. 내 산 · 돌탑 돌 고르기 · 판형 4가지 · 사계 면지 · 화면용 · 인쇄용 PDF · 공유 이미지 아래 줄
            바꾸기가 열립니다. 기간이 없고 자동으로 갱신되지 않습니다.
          </li>
          <li>평생권이 없어지더라도(환불 등) 이미 만든 내 산과 찍은 도장은 지우거나 잠그지 않습니다.</li>
          <li>결제 · 환불은 Apple 이 처리합니다. 환불은 Apple 의 &lsquo;문제 신고하기&rsquo;(reportaproblem.apple.com)로 요청해 주십시오.</li>
          <li>같은 Apple ID 의 다른 기기에서는 앞 면지의 &lsquo;복원&rsquo;으로 다시 열 수 있습니다. 가족 공유를 지원합니다.</li>
        </ul>
        <div className="sb-en-block">
          <h3>2. In-app purchase</h3>
          <ul className="sb-bullets">
            <li>The App is free. The summit check and stamps for all 100 mountains, the notebook, two page layouts and sharing need no purchase.</li>
            <li>
              The <strong>Lifetime pass</strong> is a one-time, non-consumable purchase. It opens My Mountain, cairn stone choices, all four page layouts, the
              four-season endpaper, screen and print PDFs, and a custom line under shared images. It does not expire and does not renew.
            </li>
            <li>If the pass goes away (for example after a refund), My Mountains and stamps you already made are neither deleted nor locked.</li>
            <li>Payment and refunds are handled by Apple. Please request a refund through Apple&rsquo;s Report a Problem (reportaproblem.apple.com).</li>
            <li>On another device with the same Apple ID, use Restore on the front endpaper. Family Sharing is supported.</li>
          </ul>
        </div>
      </section>

      <section>
        <h2>3. 산에서</h2>
        <p>
          {APP.ko} 앱은 기록하는 수첩일 뿐 산행 안내 도구가 아닙니다. 앱은 입산 통제 · 날씨 · 길 · 소요 시간을 알지 못하며 알려 주지 않습니다. 정상 판정은 기기
          위치의 오차 때문에 틀릴 수 있습니다. <strong>산행 계획과 안전은 이용자가 스스로 판단</strong>해 주십시오 — 산림청 · 국립공원의 안내와 출입 통제를 따르고,
          막힌 봉우리 · 통제 구역에는 들어가지 마십시오. 도장을 위해 무리하지 마십시오. 정상 아래에서 적은 연필 기록도 수첩에 남습니다.
        </p>
        <div className="sb-en-block">
          <h3>3. On the mountain</h3>
          <p>
            {APP.en} is a notebook for keeping records, not a hiking guide. The App does not know, and does not tell you, closures, weather, trails or travel
            times. Summit checks can be wrong because of device location error. <strong>You are responsible for planning your hike and staying safe</strong>{' '}
            — follow the notices and closures of the Korea Forest Service and the national parks, and do not enter closed peaks or restricted areas. No stamp
            is worth a risk; a pencil record made below the summit still goes in the notebook.
          </p>
        </div>
      </section>

      <section>
        <h2>4. 이용자의 기록</h2>
        <p>
          오름 기록 · 사진 · 글 · 설정은 이용자의 기기 안에만 있으며, 회사는 이를 받거나 이용하지 않습니다. 앱을 지우면 기록도 지워지고, 회사가 되살려 드릴 수
          없습니다. 기기를 바꿀 때는 앞 면지의 백업 내보내기 · 불러오기를 쓰십시오.
        </p>
        <div className="sb-en-block">
          <h3>4. Your records</h3>
          <p>
            Your climbs, photos, notes and settings stay on your device; we neither receive nor use them. Deleting the App deletes them, and we cannot
            restore them. When changing phones, use Export and Import on the front endpaper.
          </p>
        </div>
      </section>

      <section>
        <h2>5. 콘텐츠와 권리</h2>
        <p>
          앱의 그림 · 도장 · 조판 · 소리는 회사가 만든 것입니다. 산 목록은 산림청이 공표한 100대 명산이며, 정상 좌표 데이터는 OpenStreetMap 기여자들의 데이터를
          포함해 Open Database License(ODbL) 1.0 으로 <Link href="/summitbook/data">따로 공개</Link>합니다. 이용자가 만든 정상 쪽 · 스토리 이미지를 개인 SNS 에
          올리는 것은 괜찮습니다. 앱이나 그 안의 그림을 따로 떼어 팔거나 배포하지 마십시오.
        </p>
        <div className="sb-en-block">
          <h3>5. Content and rights</h3>
          <p>
            The App&rsquo;s graphics, stamps, page layouts and sounds were made by us. The mountain list is the Korea Forest Service&rsquo;s 100 famous
            mountains, and the summit coordinate data — which includes data from OpenStreetMap contributors — is{' '}
            <Link href="/summitbook/data">published separately</Link> under the Open Database License (ODbL) 1.0. Posting the pages and story images you made
            on your social media is fine. Do not sell or distribute the App or its graphics separately.
          </p>
        </div>
      </section>

      <section>
        <h2>6. 변경 · 준거법</h2>
        <p>약관이 바뀌면 이 페이지에 시행일과 함께 게시합니다. 이 약관은 대한민국 법을 따릅니다.</p>
        <div className="sb-en-block">
          <h3>6. Changes · governing law</h3>
          <p>Changes are posted on this page with their effective date. These terms are governed by the laws of the Republic of Korea.</p>
        </div>
      </section>

      <section>
        <h2>7. 문의 · Contact</h2>
        <a className="sb-mail" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
        <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--sb-ink-3)' }}>
          {COMPANY.name} · 대표 {COMPANY.ceo} · 사업자등록번호 {COMPANY.biz} · 통신판매업신고 {COMPANY.mailorder}
          <br />
          {COMPANY.nameEn} · CEO {COMPANY.ceoEn} · Business Reg. No. {COMPANY.biz} · Mail-order Reg. {COMPANY.mailorderEn}
        </p>
      </section>
    </div>
  );
}
