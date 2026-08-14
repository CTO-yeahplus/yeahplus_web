'use client';

// 원본 src/pages/Terms.jsx 이식 — 문구 그대로, 클래스만 pf- 프리픽스.
import { COMPANY, EMAIL, UPDATED, useLang } from '../i18n';

const KO = (
  <>
    <h1>이용약관 (EULA)</h1>
    <div className="pf-doc-sub">최종 수정일: {UPDATED}</div>
    <p>
      본 약관은 {COMPANY.nameEn}(이하 &quot;회사&quot;)가 제공하는 iOS 게임 &quot;Pipforge(핍포지)&quot;(이하
      &quot;앱&quot;)의 이용 조건을 정합니다. 앱을 다운로드하거나 사용하면 본 약관에 동의한 것으로 봅니다.
      앱은 Apple App Store를 통해 배포되며, Apple의 표준 최종사용자 라이선스 계약(Standard EULA)이 함께
      적용됩니다.
    </p>
    <h3>1. 라이선스</h3>
    <p>
      회사는 이용자에게 개인적·비상업적 용도로 이용자가 소유하거나 관리하는 Apple 기기에서 앱을 사용할 수
      있는, 양도 불가능한 비독점적 라이선스를 부여합니다. 앱을 복제·배포·역컴파일·리버스 엔지니어링하거나
      파생물을 만드는 행위는 금지됩니다.
    </p>
    <h3>2. 구매 및 환불</h3>
    <p>
      앱은 1회 결제로 구매하는 유료 앱이며 추가 결제(인앱결제·구독)가 없습니다. 결제와 환불은 Apple App
      Store 정책에 따라 Apple이 처리합니다.
    </p>
    <h3>3. 게임 콘텐츠의 성격</h3>
    <p>
      앱 내 주사위, 골드, 점수는 게임 진행을 위한 가상의 요소로 어떠한 현금 가치도 갖지 않으며, 현금이나
      실물로 교환·환전할 수 없습니다. 앱은 사행성 게임(도박)이 아니며 베팅 요소를 포함하지 않습니다.
    </p>
    <h3>4. Game Center</h3>
    <p>
      리더보드는 Apple Game Center를 통해 제공되며 Apple의 약관이 적용됩니다. 부정한 방법으로 순위를 조작하는
      행위는 금지되며, 이 경우 Apple의 정책에 따라 조치될 수 있습니다.
    </p>
    <h3>5. 지식재산권</h3>
    <p>앱과 그 안의 모든 콘텐츠(그래픽, 게임 디자인, 텍스트, 음악 포함)에 대한 권리는 회사에 있습니다.</p>
    <h3>6. 보증의 부인 및 책임 제한</h3>
    <p>
      앱은 &quot;있는 그대로&quot; 제공됩니다. 회사는 관련 법이 허용하는 최대 범위에서 앱 사용으로 발생하는
      간접적·부수적 손해에 대해 책임을 지지 않습니다. 게임 진행 데이터는 기기에만 저장되며, 기기 변경·삭제로
      인한 데이터 손실은 복구가 불가능합니다.
    </p>
    <h3>7. 약관의 변경</h3>
    <p>본 약관이 변경될 경우 이 페이지에 게시하며, 게시 시점부터 효력을 갖습니다.</p>
    <h3>8. 준거법 및 문의</h3>
    <p>
      본 약관은 대한민국 법을 준거법으로 합니다. 문의: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </p>
  </>
);

const EN = (
  <>
    <h1>Terms of Use (EULA)</h1>
    <div className="pf-doc-sub">Last updated: {UPDATED}</div>
    <p>
      These terms govern your use of the iOS game &quot;Pipforge&quot; (the &quot;App&quot;) provided by{' '}
      {COMPANY.nameEn} (the &quot;Company&quot;). By downloading or using the App you agree to these terms. The
      App is distributed via the Apple App Store and Apple&apos;s Standard EULA also applies.
    </p>
    <h3>1. License</h3>
    <p>
      The Company grants you a non-transferable, non-exclusive license to use the App for personal,
      non-commercial purposes on Apple devices you own or control. Copying, distributing, decompiling,
      reverse-engineering, or creating derivative works of the App is prohibited.
    </p>
    <h3>2. Purchase and Refunds</h3>
    <p>
      The App is a one-time paid purchase with no in-app purchases or subscriptions. Payments and refunds are
      handled by Apple under App Store policies.
    </p>
    <h3>3. Nature of Game Content</h3>
    <p>
      In-game dice, gold, and scores are virtual elements for gameplay only. They have no monetary value and
      cannot be exchanged for cash or goods. The App is not a gambling product and contains no wagering.
    </p>
    <h3>4. Game Center</h3>
    <p>
      Leaderboards are provided through Apple Game Center and are subject to Apple&apos;s terms. Manipulating
      rankings by illegitimate means is prohibited.
    </p>
    <h3>5. Intellectual Property</h3>
    <p>
      All rights to the App and its contents (including graphics, game design, text, and music) belong to the
      Company.
    </p>
    <h3>6. Disclaimer and Limitation of Liability</h3>
    <p>
      The App is provided &quot;as is.&quot; To the maximum extent permitted by law, the Company is not liable
      for indirect or incidental damages arising from use of the App. Game data is stored only on your device;
      loss caused by device changes or deletion cannot be recovered.
    </p>
    <h3>7. Changes</h3>
    <p>Changes to these terms will be posted on this page and take effect upon posting.</p>
    <h3>8. Governing Law and Contact</h3>
    <p>
      These terms are governed by the laws of the Republic of Korea. Contact:{' '}
      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </p>
  </>
);

export default function TermsContent() {
  const { lang } = useLang();
  return <main className="pf-main pf-doc">{lang === 'ko' ? KO : EN}</main>;
}
