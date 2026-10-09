'use client';

/* 노티 개인정보 처리방침.
   ⚠️ 이 주소가 App Store Connect 의 개인정보 처리방침 URL 이다 (https://yeahplus.co.kr/noti/privacy).
   앱의 실제 동작 · PrivacyInfo · ASC App Privacy("데이터를 수집하지 않음")와 반드시 일치해야 한다.
   근거: GAME/APLUS/noti/docs/APP_PRIVACY.md — 앱 번들에 네트워크 코드가 없다는 것은 그쪽 build.py 가 빌드마다 확인한다. */

import LegalLayout, { Sec } from '../legal';
import { BIZ, COMPANY_EN, COMPANY_KO, EFFECTIVE, MAIL, Tb } from '../i18n';

export default function PrivacyContent() {
  return (
    <LegalLayout
      title={{ ko: '개인정보 처리방침', en: 'Privacy Policy' }}
      sub={{ ko: `노티: 새벽 3시의 인턴 · 시행일 ${EFFECTIVE}`, en: `NOTI: The 3 A.M. Intern · Effective ${EFFECTIVE}` }}
    >
      <Tb as="p" className="nt-tldr" ko="한 줄 요약: 이 앱은 어떤 개인정보도 수집하지 않습니다." en="In one line: this app does not collect any personal data." />
      <Sec ko="1. 수집하는 정보" en="1. Data we collect">
        <Tb as="p"
          ko="없습니다. 계정·로그인이 없고, 광고·분석·추적 도구를 쓰지 않으며, 앱은 인터넷에 어떤 데이터도 보내지 않습니다. 개발자 서버 자체가 없습니다."
          en="None. There is no account or login, no advertising, analytics or tracking tools, and the app does not send any data over the internet. We do not run a server for it at all." />
      </Sec>
      <Sec ko="2. 기기에 저장되는 정보" en="2. Data stored on your device">
        <Tb as="p"
          ko="진행 상황(어느 화의 어느 장면까지 봤는지, 고른 선택, 화별 ‘오늘의 기록’), 고른 언어, 시즌권을 갖고 있는지 여부는 사용자의 기기 안에만 저장됩니다. 앱을 삭제하면 함께 삭제됩니다. 웹 체험판은 같은 정보를 브라우저 저장소에 보관합니다."
          en="Your progress (which scene of which episode you reached, the choices you made, and each episode’s record of the day), your language choice, and whether you own the season pass are stored only on your device. Deleting the app deletes them. The web demo keeps the same information in your browser’s storage." />
      </Sec>
      <Sec ko="3. 결제" en="3. Purchases">
        <Tb as="p"
          ko="시즌권 결제는 App Store 또는 Google Play 가 처리합니다. 앱은 결제 수단이나 계정 정보를 받지 않으며, 구매했는지 여부만 스토어에서 확인해 기기에 적어 둡니다."
          en="Season pass purchases are processed by the App Store or Google Play. The app never receives your payment method or account details; it only checks with the store whether you own the pass and notes that on your device." />
      </Sec>
      <Sec ko="4. 공유" en="4. Sharing">
        <Tb as="p"
          ko="‘기록 공유하기’를 누르면 앱이 기록 이미지를 만들어 기기의 공유 화면을 엽니다. 어디로 보낼지는 사용자가 고르며, 앱이 직접 어딘가에 올리지 않습니다."
          en="When you tap “Share record”, the app creates an image and opens your device’s share sheet. You choose where it goes; the app does not upload it anywhere itself." />
      </Sec>
      <Sec ko="5. 이 웹사이트" en="5. This website">
        <Tb as="p"
          ko="이 웹사이트에는 회원가입과 문의 양식, 광고가 없습니다. 고른 언어만 브라우저에 저장됩니다. 방문 통계와 페이지 속도는 Vercel 의 도구(Web Analytics · Speed Insights)로 집계하며, 이 도구들은 쿠키를 쓰지 않고 방문자를 개인 단위로 식별하지 않습니다. 글꼴과 그림, 영상은 모두 이 도메인에서 내려받습니다. 이메일로 문의하시면 답변을 위해 보내 주신 주소와 내용을 보관하며, 처리가 끝나면 1년 안에 지웁니다."
          en="This website has no sign-up, contact form or ads. Only your language choice is saved in your browser. Visit counts and page speed are measured with Vercel’s tools (Web Analytics and Speed Insights), which use no cookies and do not identify individual visitors. Fonts, images and video are all served from this domain. If you email us, we keep your address and message to reply, and delete them within one year after the matter is closed." />
      </Sec>
      <Sec ko="6. 제3자 제공 · 아동" en="6. Third parties · children">
        <Tb as="p"
          ko="앱이 수집하는 정보가 없으므로 제3자에게 제공하는 정보도 없습니다. 아동의 개인정보도 수집하지 않습니다."
          en="Because the app collects nothing, we share nothing with third parties. We do not collect personal data from children." />
      </Sec>
      <Sec ko="7. 방침의 변경" en="7. Changes">
        <Tb as="p" ko="방침을 바꿀 때는 이 페이지에 새 시행일과 함께 게시합니다." en="If this policy changes, we will post the new version here with a new effective date." />
      </Sec>
      <Sec ko="8. 문의" en="8. Contact">
        <Tb as="p"
          ko={<>{COMPANY_KO} (대표 {BIZ.ceo}) · <a href={`mailto:${MAIL}`}>{MAIL}</a><br />{BIZ.address}</>}
          en={<>{COMPANY_EN} · <a href={`mailto:${MAIL}`}>{MAIL}</a><br />{BIZ.address}</>} />
      </Sec>
    </LegalLayout>
  );
}
