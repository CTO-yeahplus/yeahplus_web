'use client';

/* 전설의 조선 사건부 개인정보 처리방침.
   ⚠️ 이 주소가 App Store Connect 의 개인정보 처리방침 URL 이다 (https://www.yeahplus.co.kr/crimescene/privacy).
   앱의 실제 동작 · PrivacyInfo · ASC App Privacy("데이터를 수집하지 않음")와 반드시 일치해야 한다.
   근거: GAME/APLUS/crimescene/docs/APP_PRIVACY.md. 원본: 그쪽 site-react/src/pages/Privacy.jsx — 4번(이 웹사이트)만 이 사이트의 실제에 맞춰 고쳤다. */

import LegalLayout, { List, P, Sec, Who } from '../legal';
import { EFFECTIVE, NAME } from '../i18n';

export default function PrivacyContent() {
  return (
    <LegalLayout title={{ ko: '개인정보 처리방침', en: 'Privacy Policy' }}
      sub={{ ko: `${NAME.ko} · 시행일 ${EFFECTIVE.ko}`, en: `${NAME.en} · Effective ${EFFECTIVE.en}` }}>
      <Sec ko="한 줄 요약" en="In short">
        <P className="lead"
          ko={<><b>{NAME.ko}는 개인정보를 수집하지 않고, 어디로도 보내지 않습니다.</b> 회원 가입이 없고, 광고·분석·추적 도구를 쓰지 않으며, 게임 기록을 받는 서버도 없습니다. 게임은 인터넷 연결 없이 동작하며, 구매하거나 구매를 복원할 때만 Apple의 App Store에 연결합니다.</>}
          en={<><b>{NAME.en} does not collect any personal data and does not send your data anywhere.</b> There is no account, no advertising, analytics or tracking SDK, and no server that receives your game records. The game plays offline; it connects to Apple’s App Store only when you buy or restore a purchase.</>} />
      </Sec>
      <Sec ko="1. 기기 안에만 저장되는 정보" en="1. Data stored only on your device">
        <P ko={<>게임을 이어서 하기 위해 아래 정보가 <b>여러분의 기기 안에만</b> 저장됩니다. 회사는 이 정보를 볼 수 없습니다.</>}
          en={<>To let you continue your game, the following is stored <b>only on your device</b>. We cannot see it.</>} />
        <List items={[
          ['수사 진행: 하다 만 화를 어디서부터 이어 할지', 'Investigation progress: where to resume an unfinished episode'],
          ['화별 기록: 해결 여부, 점수와 등급', 'Per-episode records: solved or not, score and grade'],
          ['이야기에서 고른 선택과, 잘못 지목해 사건부에 적힌 이름', 'The story choices you made, and the names written in the casebook after a wrong accusation'],
          ['3~8화(시즌 1)를 구매했는지 여부', 'Whether you have purchased episodes 3–8 (Season 1)'],
          ['여는 장면을 보았는지 여부, 소리 켬·끔', 'Whether you have seen the opening scene; sound on or off'],
        ]} />
        <P ko="앱을 삭제하면 이 정보도 함께 지워집니다. 기기 사이 동기화나 백업 서버는 없습니다."
          en="Deleting the app deletes this data. There is no sync or backup server." />
      </Sec>
      <Sec ko="2. 권한" en="2. Permissions">
        <P ko={<>앱은 카메라, 마이크, 위치, 연락처, 사진, 알림을 포함해 <b>어떤 권한도 요청하지 않습니다.</b></>}
          en={<>The app requests <b>no permissions</b> — no camera, microphone, location, contacts, photos or notifications.</>} />
      </Sec>
      <Sec ko="3. 구매" en="3. Purchases">
        <P ko="앱 안에서 3화부터 8화까지(시즌 1)를 한 번 구매로 열 수 있습니다. 결제는 Apple이 처리하며, 회사는 결제 정보나 Apple 계정 정보를 받지 않습니다. 앱은 “이 상품을 갖고 있는가”만 App Store에 묻고 그 답을 기기 안에 적어 둡니다. 구매 내역을 받는 회사 서버는 없습니다."
          en="Episodes 3–8 (Season 1) can be unlocked with a one-time in-app purchase. Payment is handled by Apple; we do not receive your payment details or Apple Account information. The app only asks the App Store whether you own the item and stores the answer on your device. We have no server that receives purchase records." />
      </Sec>
      <Sec ko="4. 이 웹사이트" en="4. This website">
        <P ko="이 웹사이트에는 회원가입과 문의 양식, 광고가 없고 쿠키를 쓰지 않습니다. 고른 언어(한국어/English)만 여러분의 브라우저에 저장됩니다. 글꼴과 그림은 모두 이 도메인에서 내려받습니다."
          en="This website has no sign-up, contact form or ads, and uses no cookies. Only your language choice (한국어/English) is saved in your browser. Fonts and images are all served from this domain." />
        <P ko="방문 통계와 페이지 속도는 Vercel 의 도구(Web Analytics · Speed Insights)로 집계합니다. 이 도구들은 쿠키를 쓰지 않고 방문자를 개인 단위로 식별하지 않습니다. 호스팅 업체가 보안과 운영을 위해 접속 기록(IP 주소, 브라우저 종류, 요청 시각 등)을 짧은 기간 자동으로 보관할 수 있으며, 회사는 이 기록으로 방문자를 식별하지 않습니다."
          en="Visit counts and page speed are measured with Vercel’s tools (Web Analytics and Speed Insights), which use no cookies and do not identify individual visitors. Our hosting provider may automatically keep access logs (IP address, browser type, request time) for a short period for security and operations; we do not use them to identify visitors." />
        <P ko="지원 메일을 보내시면 답변을 위해 메일 주소와 내용을 보관하며, 문의가 끝난 뒤 1년이 지나면 지웁니다."
          en="If you email support, we keep your address and message in order to reply, and delete them one year after the inquiry is closed." />
      </Sec>
      <Sec ko="5. 아동" en="5. Children">
        <P ko="이 앱은 범죄 수사를 다루는 이야기로, 어린이를 대상으로 만들지 않았습니다. 아동을 포함한 누구의 개인정보도 수집하지 않습니다."
          en="The app is a story about criminal investigation and is not directed at children. We do not collect personal data from anyone, including children." />
      </Sec>
      <Sec ko="6. 여러분의 권리" en="6. Your rights">
        <P ko="회사는 개인정보를 보유하지 않으므로 열람·정정·삭제를 요청할 대상 정보가 없습니다. 기기 안의 게임 기록은 앱을 삭제해 언제든 지울 수 있습니다."
          en="Because we hold no personal data, there is nothing for us to provide, correct or delete. You can erase the game records on your device at any time by deleting the app." />
      </Sec>
      <Sec ko="7. 변경" en="7. Changes">
        <P ko="이 방침이 바뀌면 이 페이지에 새 시행일과 함께 게시합니다. 앱이 개인정보를 수집하게 되는 변경이라면 그 전에 앱과 이 페이지에서 먼저 알립니다."
          en="If this policy changes, we will post it here with a new effective date. If a change would make the app collect personal data, we will announce it in the app and on this page beforehand." />
      </Sec>
      <Sec ko="8. 문의" en="8. Contact"><Who officer /></Sec>
    </LegalLayout>
  );
}
