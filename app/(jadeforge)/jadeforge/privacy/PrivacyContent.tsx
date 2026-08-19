'use client';

import { EMAIL, UPDATED, useLang } from '../i18n';

const KO = (
  <>
    <div className="jf-card">
      <p className="jf-big">제이드포지는 어떠한 개인정보도 수집하지 않습니다.</p>
      <p style={{ marginTop: 8, opacity: 0.75 }}>
        계정도, 로그인도, 네트워크 통신도 없습니다. 앱은 완전히 오프라인으로 동작합니다.
      </p>
    </div>

    <h3>1. 수집하는 정보</h3>
    <p>
      없습니다. 제이드포지는 이름, 이메일, 전화번호, 위치, 연락처, 사진, 기기 식별자 등{' '}
      <strong>어떤 종류의 개인정보도 수집·저장·전송하지 않습니다.</strong>
    </p>

    <h3>2. 게임 저장 데이터</h3>
    <p>
      진행 상황(현재 도전, 보유한 참, 주머니 구성, 최고 기록, 소리·언어 설정)은{' '}
      <strong>이용자의 기기 안에만</strong> 저장됩니다. 이 데이터는 외부로 전송되지 않으며, 개발자를 포함한
      누구도 접근할 수 없습니다. 앱을 삭제하면 함께 삭제됩니다.
    </p>

    <h3>3. 네트워크 및 제3자 서비스</h3>
    <p>
      제이드포지는 인터넷에 연결하지 않습니다. 광고 네트워크, 분석 도구(애널리틱스), 크래시 리포팅, 소셜
      로그인 등 <strong>제3자 SDK를 일절 사용하지 않습니다.</strong> 따라서 제3자에게 제공되는 정보도 없습니다.
    </p>

    <h3>4. 광고 및 인앱결제</h3>
    <p>
      광고와 인앱결제가 없습니다. 앱은 1회 유료 구매로 제공되며, 결제는 Apple의 App Store를 통해서만
      처리됩니다. 개발자는 이용자의 결제 수단 정보를 전달받지 않습니다.
    </p>

    <h3>5. Game Center (선택 사항)</h3>
    <p>
      리더보드 순위 기능은 Apple의 <strong>Game Center</strong>를 통해 제공됩니다. 점수 제출과 순위 표시는
      Apple이 자체 개인정보 처리방침에 따라 처리하며,{' '}
      <strong>개발자는 Game Center 데이터(닉네임·점수 등)를 수집·저장·열람하지 않습니다.</strong> Game
      Center에 로그인하지 않아도 리더보드를 제외한 게임의 모든 기능을 이용할 수 있습니다.
    </p>

    <h3>6. 아동의 개인정보</h3>
    <p>
      본 앱은 전 연령(4+)을 대상으로 하며, 아동을 포함한 어떤 이용자로부터도 개인정보를 수집하지 않습니다.
      미국 COPPA 및 대한민국 개인정보 보호법상 수집 행위 자체가 존재하지 않습니다.
    </p>

    <h3>7. 이용자의 권리</h3>
    <p>
      수집·보관하는 개인정보가 없으므로 열람·정정·삭제를 요청할 대상 정보가 존재하지 않습니다. 기기에 저장된
      게임 기록은 앱 삭제로 즉시 완전히 제거됩니다.
    </p>

    <h3>8. 방침의 변경</h3>
    <p>
      본 방침이 변경될 경우 이 페이지에 수정된 내용과 최종 수정일을 게시합니다. 향후 데이터를 수집하는 기능이
      추가된다면 앱 업데이트 전에 이 페이지에 먼저 고지합니다.
    </p>

    <h3>9. 문의</h3>
    <p>
      개인정보 처리방침 또는 앱 관련 문의: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </p>
  </>
);

const EN = (
  <>
    <div className="jf-card">
      <p className="jf-big">Jadeforge collects no personal data. None.</p>
      <p style={{ marginTop: 8, opacity: 0.75 }}>
        No accounts, no login, no network connection. The app runs entirely offline.
      </p>
    </div>

    <h3>1. Information We Collect</h3>
    <p>
      None. Jadeforge does not collect, store, or transmit any personal information — no names, email
      addresses, phone numbers, location, contacts, photos, or device identifiers of any kind.
    </p>

    <h3>2. Game Save Data</h3>
    <p>
      Your progress (current run, charms, pouch, best-run records, sound and language settings) is stored{' '}
      <strong>only on your device</strong>. It is never transmitted anywhere and is not accessible to the
      developer or anyone else. Deleting the app deletes it.
    </p>

    <h3>3. Network and Third Parties</h3>
    <p>
      Jadeforge does not connect to the internet. It contains{' '}
      <strong>no advertising networks, no analytics, no crash reporting, and no third-party SDKs</strong>.
      There is no data to share with third parties because none is collected.
    </p>

    <h3>4. Advertising and Purchases</h3>
    <p>
      There are no ads and no in-app purchases. The app is a one-time paid purchase handled entirely by
      Apple&apos;s App Store. The developer never receives your payment details.
    </p>

    <h3>5. Game Center (Optional)</h3>
    <p>
      Leaderboards are provided through Apple&apos;s <strong>Game Center</strong>. Score submission and
      rankings are handled by Apple under Apple&apos;s own privacy policy;{' '}
      <strong>the developer does not collect, store, or access any Game Center data</strong> (nicknames,
      scores, or otherwise). If you are not signed in to Game Center, every feature of the game except
      leaderboards works normally.
    </p>

    <h3>6. Children&apos;s Privacy</h3>
    <p>
      This app is rated 4+ and suitable for all ages. It collects no information from any user, including
      children, and is therefore compliant with COPPA and equivalent regulations by design.
    </p>

    <h3>7. Your Rights</h3>
    <p>
      Because no personal data is collected or retained, there is nothing to access, correct, or delete. Local
      game data is removed completely when you delete the app.
    </p>

    <h3>8. Changes to This Policy</h3>
    <p>
      Any changes will be posted on this page with an updated revision date. If a future version were ever to
      collect data, this page would be updated before that version ships.
    </p>

    <h3>9. Contact</h3>
    <p>
      Questions about this policy or the app: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
    </p>
  </>
);

export default function PrivacyContent() {
  const { lang } = useLang();
  const ko = lang === 'ko';

  return (
    <div className="jf-wrap">
      <article className="jf-doc">
        <header className="jf-doc-head">
          <h1>發 Jadeforge · 제이드포지</h1>
          <div className="jf-sub">{ko ? '개인정보 처리방침' : 'Privacy Policy'}</div>
          <div className="jf-sub">
            {ko ? '최종 수정일' : 'Last updated'}: {UPDATED}
          </div>
        </header>
        {ko ? KO : EN}
      </article>
    </div>
  );
}
