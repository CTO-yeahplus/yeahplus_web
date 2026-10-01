'use client';

/* 현자의 서재 개인정보 처리방침 — 원본 site/hyunja/privacy.html 의 문안을 그대로 옮기고,
   영어는 원본의 English summary 를 전문으로 늘려 적었다. 바뀐 것은 문의 주소(contact@)뿐이다.
   ⚠️ 이 주소가 App Store Connect 의 개인정보 처리방침 URL 이다.
   앱의 실제 동작 · ASC App Privacy("데이터를 수집하지 않음")와 반드시 일치해야 한다. */

import Link from 'next/link';
import { COMPANY_EN, COMPANY_KO, MAIL, useDocTitle, useLang } from '../i18n';

const EFFECTIVE_KO = '2026년 9월 30일';
const EFFECTIVE_EN = 'September 30, 2026';

export default function PrivacyContent() {
  const { L } = useLang();
  useDocTitle('개인정보 처리방침 — 현자의 서재', 'Privacy Policy — The Sages’ Study');
  const COMPANY = L(COMPANY_KO, COMPANY_EN);

  return (
    <div className="hj-wrap hj-narrow hj-doc">
      <h1>{L('개인정보 처리방침', 'Privacy Policy')}</h1>
      <p className="hj-meta">
        {L(`시행일 ${EFFECTIVE_KO} · ${COMPANY}`, `Effective ${EFFECTIVE_EN} · ${COMPANY}`)}
      </p>

      <div className="hj-callout">
        <p>
          <strong>{L('요약 — 개인정보를 수집하지 않습니다.', 'In short — we collect no personal data.')}</strong>
        </p>
        <p>
          {L(
            '회원 가입이 없고, 광고·분석 도구가 없으며, 앱은 저희 서버로 어떤 정보도 보내지 않습니다. 사용자가 쓴 기록은 사용자의 기기와 사용자의 iCloud에만 저장되고, 저희는 볼 수 없습니다.',
            'There is no account, no advertising and no analytics, and the app sends nothing to any server of ours. What you write stays on your device and in your own iCloud, where we cannot see it.'
          )}
        </p>
      </div>

      <h2>{L('1. 수집하는 정보', '1. Information we collect')}</h2>
      <p>
        {L(
          '없습니다. 앱에는 자체 서버와 통신하는 기능이 없고, 이름·연락처·기기 식별자·위치·사용 기록을 수집하지 않습니다.',
          'None. The app has no code that talks to a server of ours, and it does not collect names, contact details, device identifiers, location or usage records.'
        )}
      </p>

      <h2>{L('2. 기기 안에 저장되는 것', '2. What is stored on your device')}</h2>
      <table className="hj-table-doc">
        <thead>
          <tr>
            <th>{L('무엇', 'What')}</th>
            <th>{L('어디에', 'Where')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {L(
                '원탁 선택, 한 줄 성찰, 필사 목록, 낙관 이름, 보기 설정, 알림 시간',
                'Which sage you chose, your one-line reflections, the list of tracings, your seal name, display settings and the reminder time'
              )}
            </td>
            <td>{L('사용자 기기의 앱 저장 공간', 'The app’s storage on your device')}</td>
          </tr>
          <tr>
            <td>{L('필사한 글씨 그림', 'The handwriting images from tracing')}</td>
            <td>{L('사용자 기기의 앱 저장 공간', 'The app’s storage on your device')}</td>
          </tr>
          <tr>
            <td>{L('위 글 기록과 낙관 이름 (그림 제외)', 'The text entries above and the seal name (not the images)')}</td>
            <td>
              {L(
                '사용자의 iCloud 키-값 저장소 — iCloud에 로그인한 경우에만, 같은 Apple 계정의 기기끼리 맞추는 데 씁니다',
                'Your own iCloud key-value storage — only if you are signed in, and only to keep devices on the same Apple Account in step'
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ marginTop: 14 }}>
        {L(
          '앱을 삭제하면 기기 안의 기록이 지워집니다. iCloud의 기록은 iPhone 설정 → Apple 계정 → iCloud → 저장 공간 관리에서 지울 수 있습니다. 앱 안에서 언제든 백업 파일이나 글로 내보낼 수 있습니다.',
          'Deleting the app removes what is on the device. What is in iCloud can be removed under Settings → Apple Account → iCloud → Manage Storage. Inside the app you can export everything to a backup file or to plain text at any time.'
        )}
      </p>

      <h2>{L('3. 앱이 요청하는 권한', '3. Permissions the app asks for')}</h2>
      <table className="hj-table-doc">
        <thead>
          <tr>
            <th>{L('권한', 'Permission')}</th>
            <th>{L('언제, 왜', 'When and why')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{L('알림', 'Notifications')}</td>
            <td>
              {L(
                '아침 알림 시간을 고를 때 한 번 여쭙니다. 알림은 기기 안에서 예약되며 외부 서버를 거치지 않습니다.',
                'Asked once, when you pick a morning time. Reminders are scheduled on the device and never pass through a server.'
              )}
            </td>
          </tr>
          <tr>
            <td>{L('사진 추가', 'Add to Photos')}</td>
            <td>
              {L(
                "카드를 보낼 때 '이미지 저장'을 고른 경우에만. 사진을 읽지 않고, 저장만 합니다.",
                'Only when you choose “Save Image” while sharing a card. The app never reads your library; it only adds.'
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <h2>{L('4. 제3자 제공·위탁', '4. Third parties')}</h2>
      <p>
        {L(
          '없습니다. 카드나 백업 파일을 보낼 때는 iOS 공유 화면이 열리고, 받을 곳은 사용자가 직접 고릅니다.',
          'None. Sharing a card or a backup file opens the iOS share sheet, and you choose where it goes.'
        )}
      </p>

      <h2>{L('5. 만 14세 미만', '5. Children')}</h2>
      <p>
        {L(
          '앱은 어떤 개인정보도 수집하지 않으므로 나이와 관계없이 수집되는 정보가 없습니다.',
          'The app collects no personal data from anyone, so nothing is collected regardless of age.'
        )}
      </p>

      <h2>{L('6. 문의', '6. Contact')}</h2>
      <p>
        {L('개인정보 보호 책임자', 'Privacy contact')} · {COMPANY} ·{' '}
        <a className="hj-mailto" href={`mailto:${MAIL}`}>
          {MAIL}
        </a>
      </p>
      <p>
        {L(
          '이 방침이 바뀌면 이 페이지와 앱 업데이트 안내에 알립니다.',
          'If this policy changes, we will post it here and note it in the app’s release notes.'
        )}
      </p>

      <p className="hj-meta" style={{ marginTop: 30 }}>
        <Link href="/hyunja/support">{L('도움말', 'Support')}</Link>
        {' · '}
        <Link href="/hyunja/terms">{L('이용 약관', 'Terms of Use')}</Link>
        {' · '}
        <Link href="/hyunja">{L('현자의 서재 홈', 'The Sages’ Study home')}</Link>
      </p>
    </div>
  );
}
