'use client';

// 원본 site/src/pages/Privacy.jsx 이식 — 문구는 그대로, 클래스만 wf- 프리픽스.
import { EMAIL, UI, UPDATED, useLang } from '../i18n';

const KO = (
  <>
    <h1>개인정보 처리방침</h1>
    <div className="wf-card wf-card-hero">
      <p className="wf-big">워드포지는 어떠한 개인정보도 수집하지 않습니다.</p>
      <p className="wf-muted" style={{ marginTop: 6 }}>
        계정도, 로그인도, 네트워크 통신도 없습니다. 앱은 완전히 오프라인으로 동작합니다.
      </p>
    </div>

    <h2>1. 수집하는 정보</h2>
    <p>
      없습니다. 워드포지는 이름, 이메일, 전화번호, 위치, 연락처, 사진, 기기 식별자 등
      <strong> 어떤 종류의 개인정보도 수집·저장·전송하지 않습니다.</strong>
    </p>

    <h2>2. 게임 저장 데이터</h2>
    <p>
      진행 상황(현재 도전, 보유한 참, 덱 구성, 최고 기록, 소리·언어·테마 설정)은
      <strong> 이용자의 기기 안에만</strong> 저장됩니다. 외부로 전송되지 않으며 개발자를 포함한 누구도
      접근할 수 없습니다. 앱을 삭제하면 함께 삭제됩니다.
    </p>

    <h2>3. 네트워크 및 제3자 서비스</h2>
    <p>
      워드포지는 인터넷에 연결하지 않습니다. 광고 네트워크, 분석 도구, 크래시 리포팅, 소셜 로그인 등
      <strong> 제3자 SDK를 일절 사용하지 않습니다.</strong> 따라서 제3자에게 제공되는 정보도 없습니다.
    </p>

    <h2>4. Game Center</h2>
    <p>
      이용자가 순위표 기능을 사용하는 경우, 점수는 Apple의 Game Center로 전송됩니다. 이 처리는{' '}
      <strong>Apple이 수행</strong>하며 개발자는 이용자의 Game Center 계정 정보를 저장하거나 열람하지
      않습니다. Game Center 사용은 선택 사항이며, 기기 설정에서 언제든 해제할 수 있습니다. 해당 데이터의
      취급은 Apple의 개인정보 처리방침을 따릅니다.
    </p>

    <h2>5. 광고 및 결제</h2>
    <p>
      광고와 인앱결제가 없습니다. 앱은 1회 유료 구매로 제공되며 결제는 Apple의 App Store를 통해서만
      처리됩니다. 개발자는 이용자의 결제 수단 정보를 전달받지 않습니다.
    </p>

    <h2>6. 아동의 개인정보</h2>
    <p>
      본 앱은 전 연령(4+)을 대상으로 하며, 아동을 포함한 어떤 이용자로부터도 개인정보를 수집하지 않습니다.
      미국 COPPA 및 대한민국 개인정보 보호법상 수집 행위 자체가 존재하지 않습니다.
    </p>

    <h2>7. 이용자의 권리</h2>
    <p>
      수집·보관하는 개인정보가 없으므로 열람·정정·삭제를 요청할 대상 정보가 존재하지 않습니다. 기기에
      저장된 게임 기록은 앱 삭제로 즉시 완전히 제거됩니다.
    </p>

    <h2>8. 방침의 변경</h2>
    <p>
      본 방침이 변경될 경우 이 페이지에 수정된 내용과 최종 수정일을 게시합니다. 향후 데이터를 수집하는
      기능이 추가된다면 해당 앱 업데이트 배포 전에 이 페이지에 먼저 고지합니다.
    </p>

    <h2>9. 문의</h2>
    <p>
      개인정보 처리방침 관련 문의: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </p>
  </>
);

const EN = (
  <>
    <h1>Privacy Policy</h1>
    <div className="wf-card wf-card-hero">
      <p className="wf-big">Wordforge collects no personal data. None.</p>
      <p className="wf-muted" style={{ marginTop: 6 }}>
        No accounts, no login, no network connection. The app runs entirely offline.
      </p>
    </div>

    <h2>1. Information We Collect</h2>
    <p>
      None. Wordforge does not collect, store, or transmit any personal information — no names, email
      addresses, phone numbers, location, contacts, photos, or device identifiers of any kind.
    </p>

    <h2>2. Game Save Data</h2>
    <p>
      Your progress (current run, charms, deck, records, sound/language/theme settings) is stored
      <strong> only on your device</strong>. It is never transmitted anywhere and is not accessible to the
      developer or anyone else. Deleting the app deletes it.
    </p>

    <h2>3. Network and Third Parties</h2>
    <p>
      Wordforge does not connect to the internet. It contains{' '}
      <strong>no advertising networks, no analytics, no crash reporting, and no third-party SDKs</strong>.
      There is no data to share with third parties because none is collected.
    </p>

    <h2>4. Game Center</h2>
    <p>
      If you choose to use leaderboards, your score is submitted to Apple’s Game Center. That processing is
      performed <strong>by Apple</strong>; the developer neither stores nor reads your Game Center account
      information. Game Center is optional and can be disabled in device settings at any time. Apple’s
      privacy policy governs that data.
    </p>

    <h2>5. Advertising and Purchases</h2>
    <p>
      There are no ads and no in-app purchases. The app is a one-time paid purchase handled entirely by
      Apple’s App Store. The developer never receives your payment details.
    </p>

    <h2>6. Children’s Privacy</h2>
    <p>
      This app is rated 4+ and suitable for all ages. It collects no information from any user, including
      children, and is therefore compliant with COPPA and equivalent regulations by design.
    </p>

    <h2>7. Your Rights</h2>
    <p>
      Because no personal data is collected or retained, there is nothing to access, correct, or delete.
      Local game data is removed completely when you delete the app.
    </p>

    <h2>8. Changes to This Policy</h2>
    <p>
      Any changes will be posted here with an updated revision date. If a future version were ever to
      collect data, this page would be updated before that version ships.
    </p>

    <h2>9. Contact</h2>
    <p>
      Questions about this policy: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </p>
  </>
);

export default function PrivacyContent() {
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
