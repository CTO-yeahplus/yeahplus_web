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
            '성어서당은 어떤 개인정보도 수집·저장·전송하지 않습니다. 계정이 없고, 앱에는 네트워크 기능, 분석 도구, 광고 SDK 가 들어 있지 않습니다.',
            'Seodang does not collect, store or transmit any personal data. There are no accounts, and the app contains no networking, no analytics and no advertising SDKs.'
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
            '사용 기록이나 학습 기록을 외부로 보내지 않습니다. 분석 도구가 들어 있지 않습니다.',
            'Usage and learning records are never sent anywhere; no analytics tools are bundled.'
          )}
        </li>
      </ul>

      <h2>{L('2. 기기 안에 저장되는 것', '2. What stays on the device')}</h2>
      <p>
        {L(
          '어디까지 읽었는지, 어떤 성어 카드를 모았는지, 소리·글자 크기 같은 설정값은 기기 안에만 저장됩니다. 이 정보는 기기 밖으로 나가지 않으며, 앱을 삭제하면 함께 지워집니다.',
          'How far the child has read, which idiom cards they have collected, and settings such as sound and text size are stored only on the device. They never leave it and are deleted with the app.'
        )}
      </p>

      <h2>{L('3. 인터넷 연결', '3. Network access')}</h2>
      <p>
        {L(
          '이야기 60편, 삽화 242장, 획순 시범 자료가 모두 앱 안에 들어 있어 인터넷 연결이 필요하지 않습니다. 비행기 모드에서도 똑같이 동작합니다.',
          'All 60 stories, 242 illustrations and the stroke-order demonstrations are bundled inside the app, so no internet connection is needed. It works the same in airplane mode.'
        )}
      </p>

      <h2>{L('4. 어린이 이용자', '4. Children')}</h2>
      <p>
        {L(
          '이 앱은 초등학생이 주로 사용합니다. 앱은 연령과 무관하게 어떤 정보도 수집하지 않으며, 어린이에게 광고를 보여 주거나 앱 안에서 외부 사이트로 유도하지 않습니다. 앱 밖으로 나가는 링크는 부모님이 사용하는 문의 메일뿐입니다.',
          'This app is used mainly by primary-school children. It collects no information from anyone, regardless of age, shows no advertising and does not push children out to other sites. The only outbound link is the contact email meant for parents.'
        )}
      </p>

      <h2>{L('5. 결제', '5. Purchases')}</h2>
      <p>
        {L(
          '구매와 복원은 Apple 의 App Store 가 처리합니다. 결제 정보는 Apple 이 관리하며 앱과 개발자는 이에 접근하지 않습니다. 앞으로 제휴 콘텐츠가 별도 상품으로 제공되더라도 결제는 마찬가지로 Apple 이 처리합니다.',
          'Purchases and restores are handled by Apple’s App Store. Payment details are managed by Apple and are never accessible to the app or to us. If collaboration content is ever offered as a separate item, Apple handles that payment in the same way.'
        )}
      </p>

      <h2>{L('6. 제3자 제공', '6. Third parties')}</h2>
      <p>
        {L(
          '수집하는 정보가 없으므로 제3자에게 제공하거나 위탁하는 정보도 없습니다.',
          'Because we collect nothing, nothing is shared with or processed by third parties.'
        )}
      </p>

      <h2>{L('7. 변경', '7. Changes')}</h2>
      <p>
        {L(
          '이 방침이 바뀌면 이 페이지에 새 시행일과 함께 게시합니다. 데이터를 수집하게 되는 변경이라면 앱 업데이트 전에 먼저 알려 드립니다.',
          'If this policy changes, we will post it here with a new effective date. Any change that would involve collecting data will be announced before the app update ships.'
        )}
      </p>

      <h2>{L('8. 문의', '8. Contact')}</h2>
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
