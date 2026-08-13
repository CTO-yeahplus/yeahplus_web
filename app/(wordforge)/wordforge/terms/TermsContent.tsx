'use client';

// 원본 site/src/pages/Terms.jsx 이식 — 문구는 그대로, 클래스만 wf- 프리픽스.
import { COMPANY, EMAIL, UI, UPDATED, useLang } from '../i18n';

const KO = (
  <>
    <h1>이용약관</h1>
    <p className="wf-muted">
      본 약관은 {COMPANY.name}(이하 “회사”)가 제공하는 모바일 게임 <strong>워드포지</strong>(이하 “게임”)의
      이용 조건을 정합니다. 게임을 설치·이용하면 본 약관에 동의한 것으로 봅니다.
    </p>

    <h2>1. 이용 허락의 범위</h2>
    <p>
      회사는 이용자에게 개인적·비상업적 목적으로 게임을 이용할 수 있는, 양도 불가능하고 비독점적인 권리를
      부여합니다. 이용자는 게임을 복제·배포·판매·대여하거나, 역컴파일·역어셈블·리버스 엔지니어링을 통해
      소스 코드를 추출할 수 없습니다.
    </p>

    <h2>2. 구매와 환불</h2>
    <p>
      게임은 <strong>1회 유료 구매</strong> 방식이며 광고와 인앱결제가 없습니다. 모든 결제는 Apple App
      Store를 통해 처리되며, <strong>환불은 Apple의 환불 정책에 따릅니다.</strong> 회사는 결제 정보를
      보유하지 않으며 환불을 직접 처리할 권한이 없습니다. 환불 요청은{' '}
      <a href="https://reportaproblem.apple.com" target="_blank" rel="noreferrer">
        reportaproblem.apple.com
      </a>
      에서 진행해 주세요.
    </p>

    <h2>3. 게임 데이터</h2>
    <p>
      진행 상황과 기록은 이용자의 기기에만 저장됩니다. 회사는 이를 보관하지 않으므로
      <strong> 기기 변경·초기화·앱 삭제로 사라진 데이터를 복구해 드릴 수 없습니다.</strong> 중요한 기록이
      있다면 기기 백업을 이용해 주세요.
    </p>

    <h2>4. 지식재산권</h2>
    <p>
      게임의 코드, 그래픽, 사운드, 게임 디자인, 상표 등 일체의 지식재산권은 회사에 귀속됩니다. 게임 플레이
      영상·스크린샷의 개인 및 상업적 공유(스트리밍, 리뷰, 영상 제작 등)는 자유롭게 허용하며 별도 허가를 받을
      필요가 없습니다.
    </p>

    <h2>5. 사전(辭典) 데이터</h2>
    <p>
      게임은 공개된 어휘 목록을 기반으로 단어를 판정합니다. 특정 단어의 수록 여부나 표기는 해당 목록을
      따르며, <strong>어문 규범에 대한 회사의 공식 견해를 나타내지 않습니다.</strong> 수록 오류나 부적절한
      단어를 발견하시면 알려주시면 검토 후 반영합니다.
    </p>

    <h2>6. 보증의 부인</h2>
    <p>
      게임은 “있는 그대로” 제공됩니다. 회사는 게임이 오류 없이 작동하거나 특정 목적에 적합함을 보증하지
      않습니다. 다만 알려진 결함은 합리적인 범위에서 수정하기 위해 노력합니다.
    </p>

    <h2>7. 책임의 제한</h2>
    <p>
      관련 법령이 허용하는 최대 범위에서, 회사의 손해배상 책임은
      <strong> 이용자가 게임 구매를 위해 실제로 지급한 금액</strong>을 한도로 합니다. 회사의 고의 또는
      중대한 과실로 인한 손해에는 이 제한이 적용되지 않습니다.
    </p>

    <h2>8. 약관의 변경</h2>
    <p>
      본 약관이 변경될 경우 이 페이지에 변경 내용과 최종 수정일을 게시합니다. 변경 후에도 게임을 계속
      이용하면 변경된 약관에 동의한 것으로 봅니다.
    </p>

    <h2>9. 준거법 및 분쟁 해결</h2>
    <p>
      본 약관은 대한민국 법률에 따라 해석됩니다. 분쟁이 발생한 경우 우선 상호 협의로 해결하며, 협의가
      이루어지지 않을 때에는 민사소송법에 따른 관할 법원에 소를 제기할 수 있습니다.
    </p>

    <h2>10. 문의</h2>
    <p>
      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </p>
  </>
);

const EN = (
  <>
    <h1>Terms of Service</h1>
    <p className="wf-muted">
      These terms govern your use of <strong>Wordforge</strong> (the “Game”), published by{' '}
      {COMPANY.nameEn} (the “Company”). Installing or playing the Game means you accept them.
    </p>

    <h2>1. Licence</h2>
    <p>
      The Company grants you a non-exclusive, non-transferable right to use the Game for personal,
      non-commercial purposes. You may not copy, distribute, sell, rent, decompile, disassemble or otherwise
      reverse engineer the Game.
    </p>

    <h2>2. Purchases and Refunds</h2>
    <p>
      The Game is a <strong>one-time paid purchase</strong> with no ads and no in-app purchases. All payments
      are handled by the Apple App Store and <strong>refunds follow Apple’s refund policy</strong>. The
      Company does not hold your payment details and cannot issue refunds directly. Please request refunds at{' '}
      <a href="https://reportaproblem.apple.com" target="_blank" rel="noreferrer">
        reportaproblem.apple.com
      </a>
      .
    </p>

    <h2>3. Game Data</h2>
    <p>
      Progress and records are stored only on your device. The Company keeps no copy, so
      <strong> data lost through device changes, resets or app deletion cannot be recovered.</strong> Use your
      device backup if a record matters to you.
    </p>

    <h2>4. Intellectual Property</h2>
    <p>
      All code, art, audio, game design and marks in the Game belong to the Company. You are free to share
      gameplay footage and screenshots — including commercially, for streaming, reviews or video — without
      asking permission.
    </p>

    <h2>5. Dictionary Data</h2>
    <p>
      Word validity is decided by public word lists. Whether a particular word is included reflects those
      lists and <strong>is not an editorial position of the Company</strong> on language. Report errors or
      objectionable entries and we will review them.
    </p>

    <h2>6. Disclaimer of Warranty</h2>
    <p>
      The Game is provided “as is”. The Company does not warrant that it will be error-free or fit for a
      particular purpose, though we make reasonable efforts to fix known defects.
    </p>

    <h2>7. Limitation of Liability</h2>
    <p>
      To the maximum extent permitted by law, the Company’s total liability is limited to
      <strong> the amount you actually paid for the Game</strong>. This limit does not apply to damage caused
      by the Company’s wilful misconduct or gross negligence.
    </p>

    <h2>8. Changes</h2>
    <p>
      Changes will be posted on this page with a revision date. Continuing to play after a change means you
      accept the revised terms.
    </p>

    <h2>9. Governing Law</h2>
    <p>
      These terms are governed by the laws of the Republic of Korea. Disputes will first be addressed by
      good-faith discussion; failing that, they may be brought before the competent court under the Korean
      Civil Procedure Act.
    </p>

    <h2>10. Contact</h2>
    <p>
      <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </p>
  </>
);

export default function TermsContent() {
  const { lang } = useLang();
  return (
    <main className="wf-main">
      <div className="wf-wrap">
        <article className="wf-doc">
          {lang === 'ko' ? KO : EN}
          <p className="wf-meta" style={{ marginTop: 34 }}>
            {UI[lang].updated}: {UPDATED}
          </p>
        </article>
      </div>
    </main>
  );
}
