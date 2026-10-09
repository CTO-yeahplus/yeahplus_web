'use client';

/* 노티 이용약관. 이 사이트의 다른 제품 약관과 같은 뼈대다. 다른 점: 3조(의학적 조언이 아님), Android, 영어판이 초벌이라는 점(6조). */

import Link from 'next/link';
import LegalLayout, { Sec } from '../legal';
import { BASE, BIZ, COMPANY_EN, COMPANY_KO, EFFECTIVE, MAIL, Tb } from '../i18n';

export default function TermsContent() {
  return (
    <LegalLayout
      title={{ ko: '이용약관', en: 'Terms of Use' }}
      sub={{ ko: `노티: 새벽 3시의 인턴 · 시행일 ${EFFECTIVE}`, en: `NOTI: The 3 A.M. Intern · Effective ${EFFECTIVE}` }}
    >
      <Sec ko="1. 적용" en="1. Scope">
        <Tb as="p"
          ko={`이 약관은 ${COMPANY_KO}(이하 "회사")가 제공하는 앱 「노티: 새벽 3시의 인턴」(이하 "앱"), 웹 체험판, 그리고 이 웹사이트에 적용됩니다.`}
          en={`These terms apply to the app “NOTI: The 3 A.M. Intern” (the “App”), its web demo and this website, provided by ${COMPANY_EN} (“we”).`} />
      </Sec>
      <Sec ko="2. 구매와 사용권" en="2. Purchase and license">
        <Tb as="p"
          ko="앱은 무료로 받을 수 있고, 1화와 2화는 구매 없이 볼 수 있습니다. 3화부터 8화까지는 앱 안에서 시즌권을 한 번 구매하면 모두 열리며(비소모성), 구매한 스토어 계정으로 언제든 복원할 수 있습니다. 가격은 App Store 또는 Google Play 화면에 표시된 내용을 따릅니다. 결제와 환불은 각 스토어가 처리하며 그 정책을 따릅니다. iOS 에서 앱을 쓸 수 있는 권리(사용권)는 Apple 의 표준 최종 사용자 사용권 계약(EULA)을 따르고, 이 약관은 그 내용을 보충합니다. 둘이 다르면 EULA 가 우선합니다."
          en="The App is free to download, and episodes 1 and 2 can be played without a purchase. Episodes 3–8 are unlocked together by a one-time in-app season pass (non-consumable), which you can restore at any time with the store account you bought it with. The price is as shown on the App Store or Google Play. Payments and refunds are handled by each store under its own policies. On iOS, your license to use the App is governed by Apple’s Standard Licensed Application End User License Agreement (EULA); these terms supplement it, and the EULA prevails if they conflict." />
      </Sec>
      <Sec ko="3. 지어낸 이야기 — 의학적 조언이 아닙니다" en="3. A work of fiction — not medical advice">
        <Tb as="p"
          ko="앱에 나오는 병원, 인물, 환자, 사건은 모두 지어낸 것입니다. 진단과 처치는 이야기를 위해 단순화했으며, 앱의 내용은 의학적 조언이나 진료 지침이 아닙니다. 몸이 아프거나 응급 상황이면 의료기관을 찾거나 119 에 연락하세요. 앱의 내용을 실제 진료나 건강에 관한 결정의 근거로 삼아서는 안 됩니다."
          en="Every hospital, person, patient and event in the App is fictional. Diagnosis and treatment are simplified for the story, and nothing in the App is medical advice or clinical guidance. If you are unwell or in an emergency, see a medical professional or call your local emergency number. Do not rely on the App for any real medical or health decision." />
      </Sec>
      <Sec ko="4. 콘텐츠의 권리" en="4. Content rights">
        <Tb as="p"
          ko="이야기, 인물, 그림, 글 등 앱의 모든 콘텐츠에 대한 권리는 회사에 있습니다. ‘오늘의 기록’ 카드와 스크린샷을 개인적으로 공유하는 것은 자유롭게 하셔도 됩니다. 다만 앱이나 콘텐츠를 허락 없이 복제·배포·판매하거나, 역설계해 다른 서비스에 쓰는 것은 금지됩니다."
          en="All content in the App, including the story, characters, artwork and text, belongs to us. You are welcome to share your record cards and screenshots personally. Copying, distributing or selling the App or its content without permission, or reverse-engineering it for use in another service, is prohibited." />
      </Sec>
      <Sec ko="5. 기록과 개인정보" en="5. Your progress and privacy">
        <Tb as="p"
          ko={<>진행 기록은 사용자의 기기 안에만 저장됩니다. 앱을 삭제하면 기록도 함께 지워지며, 회사는 기록을 보관하지 않아 복구해 드릴 수 없습니다. 개인정보는 <Link href={`${BASE}/privacy`}>개인정보 처리방침</Link>을 따릅니다.</>}
          en={<>Your progress is stored only on your device. Deleting the App deletes it, and because we do not keep a copy we cannot restore it. Personal data is handled as described in the <Link href={`${BASE}/privacy`}>Privacy Policy</Link>.</>} />
      </Sec>
      <Sec ko="6. 서비스의 변경" en="6. Changes to the App">
        <Tb as="p"
          ko="회사는 업데이트로 이야기·기능을 고치거나 추가할 수 있습니다. 의학·현장 감수에 따라 대사와 장면이 바뀔 수 있고, 영어 번역은 계속 다듬습니다. 이미 구매한 시즌권으로 볼 수 있는 화를 정당한 이유 없이 없애지 않습니다."
          en="We may revise or add story content and features through updates. Dialogue and scenes may change following medical review, and the English translation will continue to be refined. We will not remove episodes you have already paid for without good reason." />
      </Sec>
      <Sec ko="7. 책임" en="7. Liability">
        <Tb as="p"
          ko="회사는 앱이 안정적으로 동작하도록 노력합니다. 회사의 고의 또는 중대한 과실로 인한 손해를 제외하고, 관련 법령이 허용하는 범위에서 앱 이용으로 생긴 간접적인 손해에 대해서는 책임을 지지 않습니다. 소비자에게 보장된 법적 권리는 이 약관으로 제한되지 않습니다."
          en="We work to keep the App running reliably. Except for damage caused by our intent or gross negligence, and to the extent permitted by law, we are not liable for indirect damages arising from use of the App. Nothing in these terms limits rights guaranteed to you as a consumer by law." />
      </Sec>
      <Sec ko="8. 준거법과 분쟁" en="8. Governing law">
        <Tb as="p"
          ko="이 약관은 대한민국 법을 따릅니다. 분쟁이 생기면 먼저 아래 연락처로 문의해 주세요. 소송이 필요한 경우 민사소송법에 따른 관할 법원에서 다룹니다."
          en="These terms are governed by the laws of the Republic of Korea. If a dispute arises, please contact us first. Any lawsuit will be heard by the court with jurisdiction under the Korean Civil Procedure Act." />
      </Sec>
      <Sec ko="9. 약관의 변경" en="9. Changes to these terms">
        <Tb as="p"
          ko="약관을 바꿀 때는 이 페이지에 새 시행일과 함께 게시합니다. 사용자에게 불리한 변경은 시행 7일 전부터 알립니다."
          en="If we change these terms, we will post the new version here with a new effective date. Changes unfavourable to users will be announced at least 7 days in advance." />
      </Sec>
      <Sec ko="10. 문의" en="10. Contact">
        <Tb as="p"
          ko={<>{COMPANY_KO} (대표 {BIZ.ceo}) · <a href={`mailto:${MAIL}`}>{MAIL}</a><br />{BIZ.address}</>}
          en={<>{COMPANY_EN} · <a href={`mailto:${MAIL}`}>{MAIL}</a><br />{BIZ.address}</>} />
      </Sec>
    </LegalLayout>
  );
}
