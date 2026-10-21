'use client';

/* 수상한 명언 개인정보 처리방침 — hyunja·seodang 의 처리방침과 같은 뼈대로 새로 썼다.
   '이 웹사이트' 항목은 crimescene/privacy 4번의 문장을 그대로 옮겼다(이 라우트도 Vercel Analytics · Speed Insights 를 싣는다).
   ⚠️ 이 주소가 App Store Connect 의 개인정보 처리방침 URL 이다.
   앱의 실제 동작 · PrivacyInfo · ASC App Privacy("데이터를 수집하지 않음")와 반드시 일치해야 한다.
   저장 위치: 앱 저장소 + Documents/diogeneslamp/save.json (iCloud·기기 백업에 포함될 수 있음).
   2026-10-20: 수사본부 제보 양식(웹사이트)이 받는 항목·보관 기간·위탁을 7절에 더했다 — sql/fishyquotes_case_hq.sql 과 맞춰 둘 것.
   2026-10-21: Supabase 는 묘해 프로젝트(지역 Southeast Asia = 싱가포르) → 7절에 국외 이전 고지(개인정보 보호법 28조의8)를 넣었다. 프로젝트를 옮기면 이 표를 고칠 것. */

import Link from 'next/link';
import { APP_EN, APP_KO, BIZ, COMPANY_EN, COMPANY_KO, MAIL, useDocTitle, useLang } from '../i18n';

const EFFECTIVE_KO = '2026년 10월 20일';
const EFFECTIVE_EN = 'October 20, 2026';

export default function PrivacyContent() {
  const { L } = useLang();
  useDocTitle(`개인정보 처리방침 — ${APP_KO}`, `Privacy Policy — ${APP_EN}`);
  const COMPANY = L(COMPANY_KO, COMPANY_EN);

  return (
    <div className="dl-wrap dl-narrow dl-doc">
      <h1>{L('개인정보 처리방침', 'Privacy Policy')}</h1>
      <p className="dl-meta">
        {L(`시행일 ${EFFECTIVE_KO} · ${COMPANY}`, `Effective ${EFFECTIVE_EN} · ${COMPANY}`)}
      </p>

      <div className="dl-callout">
        <p>
          <strong>{L('요약 — 개인정보를 수집하지 않습니다.', 'In short — we collect no personal data.')}</strong>
        </p>
        <p>
          {L(
            '수상한 명언에는 계정과 로그인이 없고, 광고 추적·분석·크래시 보고 도구(SDK)가 들어 있지 않으며, 회사 서버도 없습니다. 앱은 스스로 네트워크 요청을 하지 않습니다. 진행 기록은 사용자의 기기 안에만 저장되고, 회사는 볼 수 없습니다.',
            'Fishy Quotes has no account and no login, contains no ad-tracking, analytics or crash-reporting tools (SDKs), and talks to no server of ours. The app makes no network requests of its own. Your progress is stored only on your device, where we cannot see it.'
          )}
        </p>
        <p>
          {L(
            '앱 밖의 일 하나: 이 웹사이트의 수사본부 제보 양식에 직접 적어 보내는 내용(명언·제보 내용, 고르면 닉네임·이메일)은 회사가 받아 보관합니다. 7절에 무엇을 언제까지 보관하는지 적었습니다.',
            'One thing outside the app: what you choose to send through the Case HQ report form on this website (the quote and your report, and a nickname and email if you add them) is received and kept by us. Section 7 says what and for how long.'
          )}
        </p>
      </div>

      <h2>{L('1. 수집하는 정보', '1. Information we collect')}</h2>
      <p>
        {L(
          '없습니다. 이름·연락처·기기 식별자·광고 식별자·위치·사용 기록을 수집하지 않고, 사용자를 추적하지 않습니다. 앱에는 회사 서버와 통신하는 기능이 없으며, 앱이 스스로 네트워크 요청을 하지 않는지는 빌드 단계에서 검사합니다.',
          'None. We do not collect names, contact details, device or advertising identifiers, location or usage records, and we do not track you. The app has no code that talks to a server of ours, and every build is checked to confirm that it makes no network requests of its own.'
        )}
      </p>

      <h2>{L('2. 기기 안에 저장되는 것', '2. What is stored on your device')}</h2>
      <table className="dl-table-doc">
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
                '진행 기록 — 이름표에 적은 이름, 정답·별·검거 기록, 저녁 성찰 메모, 담아 둔 구절',
                'Your progress — the name on your bookplate, your answers, stars and forgers caught, your evening review notes and the passages you kept'
              )}
            </td>
            <td>
              {L(
                <>
                  사용자 기기의 앱 저장 공간과, 앱의 Documents 폴더에 있는 파일 하나(
                  <code>diogeneslamp/save.json</code>)
                </>,
                <>
                  The app’s storage on your device, and one file in the app’s Documents folder (
                  <code>diogeneslamp/save.json</code>)
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ marginTop: 14 }}>
        {L(
          '이 정보는 회사로 전송되지 않습니다. 위 파일은 iOS 의 동작에 따라 사용자의 iCloud 백업이나 기기 백업에 포함될 수 있습니다. 백업은 Apple 이 관리하며 회사는 볼 수 없습니다. 앱을 삭제하면 기기 안의 진행 기록도 함께 지워집니다.',
          'None of this is ever sent to us. Depending on how iOS backs up your device, the file above may be included in your iCloud backup or your device backup. Backups are managed by Apple and we cannot see them. Deleting the app deletes the progress stored on the device.'
        )}
      </p>

      <h2>{L('3. 앱이 요청하는 권한', '3. Permissions the app asks for')}</h2>
      <table className="dl-table-doc">
        <thead>
          <tr>
            <th>{L('권한', 'Permission')}</th>
            <th>{L('언제, 왜', 'When and why')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{L('사진 추가', 'Add to Photos')}</td>
            <td>
              {L(
                "공유 시트에서 '이미지 저장'을 누를 때만 iOS 가 묻습니다. 사진을 읽지 않고, 저장만 합니다.",
                'iOS asks only when you tap “Save Image” in the share sheet. The app never reads your library; it only adds the image.'
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <h2>{L('4. 출처 링크 · 수사본부 · 메일', '4. Source links, Case HQ and email')}</h2>
      <ul>
        <li>
          {L(
            '판정의 출처 링크를 누르면 Safari 로 외부 사이트(Project Gutenberg 등)가 열립니다. 그 사이트에서는 그 사이트의 개인정보 처리방침이 적용됩니다.',
            'Tapping a source link opens an outside website (such as Project Gutenberg) in Safari. That site’s own privacy policy applies there.'
          )}
        </li>
        <li>
          {L(
            `'수상한 점 제보'·'수상한 명언 제보'·'사건 게시판'은 Safari 로 이 웹사이트의 수사본부 페이지를 열 뿐입니다. 이때 주소에는 사건 번호·앱 언어·(검색에 없던) 검색어만 담기며, 앱이 데이터를 보내지는 않습니다. 제보를 보낼지 말지는 사용자가 그 페이지에서 정합니다(7절).`,
            `“Something fishy? Report it”, “Report a fishy quote” and “Case board” simply open the Case HQ pages of this website in Safari. The address carries only the case number, the app language and (when a search found nothing) the search words; the app sends no data. Whether to send a report is up to you on that page (section 7).`
          )}
        </li>
        <li>
          {L(
            `공로장 코드는 앱 안에서 서명만 확인합니다. 코드를 넣어도 앱은 어디에도 연결하지 않습니다.`,
            `A commendation code is checked on the device by its signature alone. Entering one does not make the app connect anywhere.`
          )}
        </li>
        <li>
          {L(
            `${MAIL} 로 직접 보내 주시는 메일은 답변을 위해 보관하며, 문의가 끝난 뒤 1년이 지나면 지웁니다.`,
            `Emails you send to ${MAIL} are kept so we can reply, and deleted one year after the inquiry is closed.`
          )}
        </li>
      </ul>

      <h2>{L('5. 구매', '5. Purchases')}</h2>
      <p>
        {L(
          '앱은 App Store 에서 한 번 구입하는 유료 앱이며, 앱 안의 추가 결제가 없습니다. 결제는 Apple 이 처리하고, 회사는 결제 정보나 Apple 계정 정보를 받지 않습니다.',
          'The app is a one-time paid download from the App Store, with no in-app purchases. Payment is handled by Apple; we never receive your payment details or Apple Account information.'
        )}
      </p>

      <h2>{L('6. 제3자 제공·위탁', '6. Third parties')}</h2>
      <p>
        {L(
          '앱은 수집하는 정보가 없으므로 제3자에게 제공하거나 위탁하는 정보도 없습니다. 카드 이미지를 보낼 때는 iOS 공유 화면이 열리고, 받을 곳은 사용자가 직접 고릅니다. 앱에 제휴·협찬 콘텐츠가 실리더라도 협찬사에 사용자 정보를 넘기지 않으며, 협찬 콘텐츠를 보여 주려고 사용자를 추적하거나 광고 식별자를 쓰지 않습니다.',
          'Because the app collects nothing, nothing is shared with or processed by third parties. Sharing an image opens the iOS share sheet, and you choose where it goes. If the app carries partner or sponsored content, no information about you goes to the sponsor, and we do not track you or use advertising identifiers to show it.'
        )}
      </p>

      <h2>{L('7. 이 웹사이트', '7. This website')}</h2>
      <p>
        {L(
          '이 웹사이트에는 회원가입이 없고 쿠키를 쓰지 않습니다. 고른 언어(한국어/English)만 여러분의 브라우저에 저장됩니다. 글꼴과 그림은 모두 이 도메인에서 내려받습니다.',
          'This website has no sign-up and uses no cookies. Only your language choice (한국어/English) is saved in your browser. Fonts and images are all served from this domain.'
        )}
      </p>
      <p>
        {L(
          '수사본부 제보 양식(/fishyquotes/report)에 적어 보내는 내용은 아래와 같이 받습니다. 제보 내용과 이메일은 사건 게시판에 공개하지 않습니다.',
          'What you send through the Case HQ report form (/fishyquotes/report) is handled as below. Your report text and email are never published on the case board.'
        )}
      </p>
      <table className="dl-table-doc">
        <thead>
          <tr>
            <th>{L('항목', 'What')}</th>
            <th>{L('목적', 'Why')}</th>
            <th>{L('보관', 'How long')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{L('명언·사건 번호·제보 내용·근거 링크·언어', 'Quote, case number, report text, source links, language')}</td>
            <td>{L('원문 대조·판결, 앱 사건 수정', 'Checking and ruling on it, fixing the case in the app')}</td>
            <td>{L('판결 뒤 3년(같은 명언이 다시 제보될 때 대조용)', '3 years after the verdict (to compare when the same quote is reported again)')}</td>
          </tr>
          <tr>
            <td>{L('닉네임 (선택, 동의 시)', 'Nickname (optional, with consent)')}</td>
            <td>{L('사건 게시판·앱 판결문에 제보자 표시', 'Crediting you on the case board and in the app')}</td>
            <td>{L('게시물과 앱 판결문이 있는 동안', 'As long as the board entry and the app credit exist')}</td>
          </tr>
          <tr>
            <td>{L('이메일 (선택, 동의 시)', 'Email (optional, with consent)')}</td>
            <td>{L('결과와 공로장 코드 안내', 'Sending you the result and a commendation code')}</td>
            <td>{L('판결·기각 후 30일 안에 삭제', 'Deleted within 30 days of the verdict or dismissal')}</td>
          </tr>
          <tr>
            <td>{L('접속 주소(IP)를 되돌릴 수 없게 바꾼 값', 'A one-way hash of your IP address')}</td>
            <td>{L('같은 곳에서 짧은 시간에 몰리는 스팸 막기(시간당 5건)', 'Blocking spam floods from one place (5 per hour)')}</td>
            <td>{L('하루 뒤 삭제', 'Deleted after one day')}</td>
          </tr>
        </tbody>
      </table>
      <p>
        {L(
          '제보 내용은 데이터베이스 서비스 Supabase 에 맡겨 저장하며, 저장 서버는 싱가포르에 있습니다. 개인정보 보호법에 따른 국외 이전 사항은 아래와 같습니다. 이 위탁 외에 다른 곳에 제공하지 않습니다.',
          'Reports are stored with the database service Supabase, on servers in Singapore. The details of this overseas transfer are below. Reports are not shared with anyone else.'
        )}
      </p>
      <table className="dl-table-doc fq-xfer">
        <tbody>
          <tr>
            <th>{L('이전받는 자', 'Recipient')}</th>
            <td>{L('Supabase Inc. (supabase.com) — 데이터베이스 호스팅', 'Supabase Inc. (supabase.com) — database hosting')}</td>
          </tr>
          <tr>
            <th>{L('이전 국가', 'Country')}</th>
            <td>{L('싱가포르 (Supabase 서버 지역 Southeast Asia)', 'Singapore (Supabase region Southeast Asia)')}</td>
          </tr>
          <tr>
            <th>{L('이전 시기·방법', 'When and how')}</th>
            <td>{L('제보 양식을 보낼 때, 암호화된 연결(HTTPS)로', 'When you send the report form, over an encrypted connection (HTTPS)')}</td>
          </tr>
          <tr>
            <th>{L('항목·목적·보관', 'What, why, how long')}</th>
            <td>{L('위 표와 같습니다', 'As in the table above')}</td>
          </tr>
          <tr>
            <th>{L('거부 방법과 효과', 'How to refuse')}</th>
            <td>
              {L(
                `제보하지 않거나 ${MAIL} 로 메일을 보내면 국외로 이전되지 않습니다. 양식에서 닉네임·이메일을 비워 두면 그 두 항목은 이전되지 않으며, 대신 결과 안내와 공로장을 받을 수 없습니다.`,
                `If you do not report, or email ${MAIL} instead, nothing is transferred abroad. Leaving the nickname and email empty keeps those two out of the transfer; you just won’t get the result or a commendation.`
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        {L(
          '보낸 제보를 지우고 싶으면 접수번호와 함께 아래 문의처로 알려 주세요.',
          'To have a report deleted, send us its report number at the contact below.'
        )}
      </p>
      <p>
        {L(
          '방문 통계와 페이지 속도는 Vercel 의 도구(Web Analytics · Speed Insights)로 집계합니다. 이 도구들은 쿠키를 쓰지 않고 방문자를 개인 단위로 식별하지 않습니다. 호스팅 업체가 보안과 운영을 위해 접속 기록(IP 주소, 브라우저 종류, 요청 시각 등)을 짧은 기간 자동으로 보관할 수 있으며, 회사는 이 기록으로 방문자를 식별하지 않습니다.',
          'Visit counts and page speed are measured with Vercel’s tools (Web Analytics and Speed Insights), which use no cookies and do not identify individual visitors. Our hosting provider may automatically keep access logs (IP address, browser type, request time) for a short period for security and operations; we do not use them to identify visitors.'
        )}
      </p>

      <h2>{L('8. 만 14세 미만', '8. Children')}</h2>
      <p>
        {L(
          '이 앱은 만 14세 미만 아동을 대상으로 하지 않습니다. 아동을 포함해 누구의 개인정보도 수집하지 않습니다.',
          'The app is not directed at children under 14. We do not collect personal data from anyone, including children.'
        )}
      </p>

      <h2>{L('9. 이용자의 권리', '9. Your rights')}</h2>
      <p>
        {L(
          '회사는 개인정보를 보유하지 않으므로 열람·정정·삭제를 요청할 대상 정보가 없습니다. 기기 안의 진행 기록은 앱을 삭제해 언제든 지울 수 있습니다.',
          'Because we hold no personal data, there is nothing for us to provide, correct or delete. You can erase the progress on your device at any time by deleting the app.'
        )}
      </p>

      <h2>{L('10. 변경', '10. Changes')}</h2>
      <p>
        {L(
          '이 방침이 바뀌면 이 페이지에 새 시행일과 함께 게시합니다. 앱이 개인정보를 수집하게 되는 변경이라면 그 전에 앱과 이 페이지에서 먼저 알립니다.',
          'If this policy changes, we will post it here with a new effective date. If a change would make the app collect personal data, we will announce it in the app and on this page beforehand.'
        )}
      </p>

      <h2>{L('11. 문의', '11. Contact')}</h2>
      <p>
        {L('개인정보 보호 책임자', 'Privacy officer')} · {BIZ.ceo} ({L('대표', 'CEO')}) · {COMPANY} ·{' '}
        <a className="dl-mailto" href={`mailto:${MAIL}`}>
          {MAIL}
        </a>
      </p>

      <p className="dl-meta" style={{ marginTop: 30 }}>
        <Link href="/fishyquotes/support">{L('지원', 'Support')}</Link>
        {' · '}
        <Link href="/fishyquotes/terms">{L('이용 약관', 'Terms of Use')}</Link>
        {' · '}
        <Link href="/fishyquotes">{L('수상한 명언 홈', 'Fishy Quotes home')}</Link>
      </p>
    </div>
  );
}
