'use client';

/* 성어서당 개인정보 처리방침.
   원본 폴더의 privacy.html 은 공유되지 않아, 앱의 실제 동작(랜딩의 "안심" 항목 ·
   수집 없음 · 네트워크 없음)과 이 사이트의 다른 제품 문서를 기준으로 새로 썼다.
   ⚠️ 이 주소가 App Store Connect 의 개인정보 처리방침 URL 이다.
   앱의 실제 동작 · PrivacyInfo · ASC App Privacy("데이터를 수집하지 않음")와 반드시 일치해야 한다. */

import Link from 'next/link';
import { COMPANY_EN, COMPANY_KO, MAIL, useDocTitle, useLang } from '../i18n';

const EFFECTIVE = '2026-09-23';

export default function PrivacyContent() {
  const { L } = useLang();
  useDocTitle('개인정보 처리방침 — 성어서당', 'Privacy Policy — Seodang');
  const COMPANY = L(COMPANY_KO, COMPANY_EN);

  return (
    <div className="sd-wrap sd-doc">
      <h1>{L('개인정보 처리방침', 'Privacy Policy')}</h1>
      <p className="sd-meta">
        {L(`시행일 ${EFFECTIVE} · ${COMPANY}`, `Effective ${EFFECTIVE} · ${COMPANY}`)}
      </p>

      <div className="sd-callout">
        <p>
          <strong>{L('요약 — 아무것도 수집하지 않습니다.', 'In short — we collect nothing.')}</strong>
        </p>
        <p>
          {L(
            '성어서당은 어떤 개인정보도 수집하지 않습니다. 계정이 없고, 분석 도구와 광고 SDK 가 들어 있지 않으며, 개발자에게 보내는 통신이 없습니다. 개발자 서버 자체가 없습니다.',
            'Seodang collects no personal data. There are no accounts, no analytics and no advertising SDKs, and the app makes no network requests to the developer — we do not run a server at all.'
          )}
        </p>
      </div>

      <h2>{L('1. 수집하지 않는 것', '1. What we do not collect')}</h2>
      <ul>
        <li>
          {L(
            '이름 · 생년월일 · 이메일 · 전화번호 같은 개인정보를 묻지 않습니다. 회원 가입도, 로그인도 없습니다.',
            'We never ask for a name, birthday, email address or phone number. There is no sign-up and no login.'
          )}
        </li>
        <li>
          {L(
            '광고 식별자(IDFA)에 접근하지 않고, 사용자를 추적하지 않습니다.',
            'The app does not access the advertising identifier (IDFA) and does not track you.'
          )}
        </li>
        <li>
          {L(
            '사용 기록이나 학습 기록을 개발자에게 보내지 않습니다. 분석 도구가 들어 있지 않습니다.',
            'Usage and learning records are never sent to the developer; no analytics tools are bundled.'
          )}
        </li>
      </ul>

      <h2>{L('2. 기기에 저장되는 것', '2. What is stored on the device')}</h2>
      <p>
        {L(
          '학습 진행 상황(모은 성어, 엽전, 놀이마당 최고 기록, 책장 꾸미기·읽어 주기 설정)은 앱이 설치된 기기 안에 저장됩니다. 개발자에게는 전송되지 않으며, 앱을 삭제하면 기기에서 지워집니다.',
          'Learning progress and settings — idioms collected, coins, the best Play Yard score, the shelf theme and read-aloud — are stored on the device where the app is installed. They are never sent to the developer, and they are removed when the app is deleted.'
        )}
      </p>

      <h2>{L('3. iCloud 동기화와 백업 파일', '3. iCloud sync and backup files')}</h2>
      <p>
        {L(
          '같은 Apple 계정을 쓰는 기기끼리 진행 상황을 이어서 볼 수 있도록, Apple 의 iCloud 키-값 저장소에 같은 정보를 함께 보관합니다. 이 정보는 이용자 본인의 iCloud 계정에 저장되며 개발자는 접근할 수 없습니다. 개발자 서버는 존재하지 않습니다.',
          'So that progress carries over between devices signed in to the same Apple Account, the same information is also kept in Apple’s iCloud key-value store. It lives in the user’s own iCloud account, the developer cannot access it, and there is no developer server.'
        )}
      </p>
      <p>
        {L(
          '원하지 않으시면 기기의 설정 → Apple 계정 → iCloud 에서 이 앱의 iCloud 사용을 끄시면 됩니다. 끄더라도 앱은 그대로 동작하고, 진행 상황은 기기 안에만 남습니다.',
          'If you would rather not use it, turn iCloud off for this app in Settings → Apple Account → iCloud. The app keeps working, and progress simply stays on that device.'
        )}
      </p>
      <p>
        {L(
          '책장 화면의 "진행 상황 지키기"에서 진행 상황을 파일 하나로 내보내 다른 기기에서 불러올 수도 있습니다. 이 파일은 이용자가 고른 곳(파일 앱 등)에만 저장되며 개발자에게 전송되지 않습니다.',
          'From “Keep my progress” on the shelf screen you can also export everything to a single file and import it on another device. That file is saved only where you choose (the Files app, for example) and is never sent to the developer.'
        )}
      </p>

      <h2>{L('4. 읽어 주기와 카드로 보내기', '4. Read-aloud and share cards')}</h2>
      <p>
        {L(
          '읽어 주기는 기기에 내장된 한국어 음성을 사용합니다. 목소리를 녹음하거나 전송하지 않습니다. "카드로 보내기"는 기기 안에서 그림 한 장을 만들어 iOS 공유 시트를 열 뿐이며, 어디로 보낼지는 이용자가 고릅니다. 앱이 직접 올리는 곳은 없습니다.',
          'Read-aloud uses the Korean voice built into the device; nothing is recorded or transmitted. “Send as a card” draws a picture on the device and opens the iOS share sheet — you choose where it goes, and the app itself uploads nothing.'
        )}
      </p>

      <h2>{L('5. 인터넷 연결', '5. Network access')}</h2>
      <p>
        {L(
          '성어서당은 자체 서버를 두지 않으며, 개발자에게 보내는 네트워크 통신이 없습니다(위의 iCloud 동기화는 Apple 이 제공하는 기능입니다). 이야기 60편, 삽화 242장, 획순 시범 자료와 글꼴까지 모두 앱 안에 들어 있어 비행기 모드에서도 똑같이 동작합니다.',
          'Seodang has no server of its own and makes no network requests to the developer (the iCloud sync above is a feature provided by Apple). All 60 stories, 242 illustrations, the stroke-order data and the fonts are bundled in the app, so it works the same in airplane mode.'
        )}
      </p>

      <h2>{L('6. 어린이 이용자', '6. Children')}</h2>
      <p>
        {L(
          '이 앱은 초등학생이 주로 사용합니다. 앱은 연령과 무관하게 어떤 정보도 수집하지 않으며, 어린이에게 광고를 보여 주거나 앱 안에서 외부 사이트로 유도하지 않습니다. 앱 밖으로 나가는 링크는 부모님이 사용하는 문의 메일뿐입니다.',
          'This app is used mainly by primary-school children. It collects no information from anyone, regardless of age, shows no advertising and does not push children out to other sites. The only outbound link is the contact email meant for parents.'
        )}
      </p>

      <h2>{L('7. 결제', '7. Purchases')}</h2>
      <p>
        {L(
          '구매와 복원은 Apple 의 App Store 가 처리합니다. 결제 정보는 Apple 이 관리하며 앱과 개발자는 이에 접근하지 않습니다. 앞으로 제휴 콘텐츠가 별도 상품으로 제공되더라도 결제는 마찬가지로 Apple 이 처리합니다.',
          'Purchases and restores are handled by Apple’s App Store. Payment details are managed by Apple and are never accessible to the app or to us. If collaboration content is ever offered as a separate item, Apple handles that payment in the same way.'
        )}
      </p>

      <h2>{L('8. 제3자 제공', '8. Third parties')}</h2>
      <p>
        {L(
          '수집하는 정보가 없으므로 제3자에게 제공하거나 위탁하는 정보도 없습니다.',
          'Because we collect nothing, nothing is shared with or processed by third parties.'
        )}
      </p>

      <h2>{L('9. 변경', '9. Changes')}</h2>
      <p>
        {L(
          '이 방침이 바뀌면 이 페이지에 새 시행일과 함께 게시합니다. 데이터를 수집하게 되는 변경이라면 앱 업데이트 전에 먼저 알려 드립니다.',
          'If this policy changes, we will post it here with a new effective date. Any change that would involve collecting data will be announced before the app update ships.'
        )}
      </p>

      <h2>{L('10. 문의', '10. Contact')}</h2>
      <p>
        {L('개인정보 보호 책임자', 'Privacy contact')} · {COMPANY} ·{' '}
        <a className="sd-mailto" href={`mailto:${MAIL}`}>
          {MAIL}
        </a>
      </p>

      <p className="sd-meta" style={{ marginTop: 30 }}>
        <Link href="/seodang/support">{L('고객 지원', 'Support')}</Link>
        {' · '}
        <Link href="/seodang/terms">{L('이용 약관', 'Terms of Use')}</Link>
        {' · '}
        <Link href="/seodang">{L('성어서당 홈', 'Seodang home')}</Link>
      </p>
    </div>
  );
}
