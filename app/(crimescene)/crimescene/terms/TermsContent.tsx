'use client';

/* 전설의 조선 사건부 이용약관. Apple 표준 EULA 를 쓰고 이 약관은 보충이다 (무료 + 3~8화 한 번 구매).
   원본: GAME/APLUS/crimescene/site-react/src/pages/Terms.jsx */

import Link from 'next/link';
import LegalLayout, { P, Sec, Who } from '../legal';
import { BASE, COMPANY_EN, COMPANY_KO, EFFECTIVE, MIN_IOS, NAME } from '../i18n';

const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export default function TermsContent() {
  return (
    <LegalLayout title={{ ko: '이용약관', en: 'Terms of Use' }}
      sub={{ ko: `${NAME.ko} · 시행일 ${EFFECTIVE.ko}`, en: `${NAME.en} · Effective ${EFFECTIVE.en}` }}>
      <Sec ko="1. 적용" en="1. Scope">
        <P ko={`이 약관은 ${COMPANY_KO}(이하 “회사”)가 제공하는 iOS 앱 「${NAME.ko}」(이하 “앱”)와 이 웹사이트에 적용됩니다. 앱은 iOS ${MIN_IOS} 이상의 iPhone과 iPad에서 동작합니다.`}
          en={`These terms apply to the iOS app “${NAME.en}” (the “App”) and this website, provided by ${COMPANY_EN} (“we”). The App runs on iPhone and iPad with iOS ${MIN_IOS} or later.`} />
      </Sec>
      <Sec ko="2. 구매와 사용권" en="2. Purchase and license">
        <P ko={<>앱은 무료로 받을 수 있고, 1화와 2화는 구매 없이 즐길 수 있습니다. 3화부터 8화까지(시즌 1)는 앱 안에서 한 번 구매하면 모두 열리며(비소모성), 구매한 Apple 계정으로 언제든 복원할 수 있습니다. 구독이나 추가 결제는 없습니다. 가격은 App Store 화면에 표시된 내용을 따릅니다. 결제와 환불은 Apple이 처리하며 Apple의 정책을 따릅니다. 앱을 쓸 수 있는 권리(사용권)는 Apple의 <a href={EULA}>표준 최종 사용자 사용권 계약(EULA)</a>을 따르고, 이 약관은 그 내용을 보충합니다. 둘이 다르면 EULA가 우선합니다.</>}
          en={<>The App is free to download, and episodes 1 and 2 can be played without a purchase. Episodes 3–8 (Season 1) are unlocked together by a one-time in-app purchase (non-consumable), which you can restore at any time with the Apple Account you bought it with. There are no subscriptions or further purchases. The price is as shown on the App Store. Payments and refunds are handled by Apple under Apple’s policies. Your license to use the App is governed by Apple’s <a href={EULA}>Standard Licensed Application End User License Agreement (EULA)</a>; these terms supplement it, and the EULA prevails if they conflict.</>} />
      </Sec>
      <Sec ko="3. 지어낸 이야기" en="3. A work of fiction">
        <P ko="앱에 나오는 인물, 사건, 관청의 일은 모두 지어낸 것입니다. 조선 시대를 배경으로 삼았으나 역사 기록이 아니며, 앱의 내용은 수사·법률에 관한 전문적인 조언이 아닙니다. 게임의 글은 한국어로 제공됩니다."
          en="All people, cases and official proceedings in the App are fictional. It is set in Joseon-era Korea but is not a historical record, and nothing in it is professional investigative or legal advice. The game text is provided in Korean." />
      </Sec>
      <Sec ko="4. 콘텐츠의 권리" en="4. Content rights">
        <P ko="이야기, 인물, 그림, 글, 소리 등 앱의 모든 콘텐츠에 대한 권리는 회사에 있습니다. 스크린샷을 개인적으로 공유하는 것은 자유롭게 하셔도 됩니다. 다만 앱이나 콘텐츠를 허락 없이 복제·배포·판매하거나, 역설계해 다른 서비스에 쓰는 것은 금지됩니다."
          en="All content in the App, including the story, characters, artwork, text and sound, belongs to us. You are welcome to share screenshots personally. Copying, distributing or selling the App or its content without permission, or reverse engineering it for use in other services, is not allowed." />
      </Sec>
      <Sec ko="5. 기록과 개인정보" en="5. Progress and privacy">
        <P ko={<>게임 기록은 사용자의 기기 안에만 저장됩니다. 앱을 삭제하면 기록도 함께 지워지며, 회사는 기록을 보관하지 않아 복구해 드릴 수 없습니다(구매는 「구매 복원」으로 되찾을 수 있습니다). 개인정보는 <Link href={`${BASE}/privacy`}>개인정보 처리방침</Link>을 따릅니다.</>}
          en={<>Your progress is stored only on your device. Deleting the App deletes it, and because we keep no copy we cannot restore it (your purchase can be recovered with “Restore Purchases”). Personal data is covered by our <Link href={`${BASE}/privacy`}>Privacy Policy</Link>.</>} />
      </Sec>
      <Sec ko="6. 서비스의 변경" en="6. Changes to the App">
        <P ko="회사는 업데이트로 이야기·기능·규칙을 고치거나 추가할 수 있습니다. 이미 구매한 앱의 핵심 기능을 정당한 이유 없이 없애지 않습니다."
          en="We may revise or add story content, features and rules through updates. We will not remove core features of an App you have purchased without good reason." />
      </Sec>
      <Sec ko="7. 책임" en="7. Liability">
        <P ko="회사는 앱이 안정적으로 동작하도록 노력합니다. 회사의 고의 또는 중대한 과실로 인한 손해를 제외하고, 관련 법령이 허용하는 범위에서 앱 이용으로 생긴 간접적인 손해에 대해서는 책임을 지지 않습니다. 소비자에게 보장된 법적 권리는 이 약관으로 제한되지 않습니다."
          en="We work to keep the App running reliably. Except for damage caused by our intent or gross negligence, and to the extent permitted by law, we are not liable for indirect damage arising from use of the App. Nothing in these terms limits your statutory consumer rights." />
      </Sec>
      <Sec ko="8. 준거법과 분쟁" en="8. Governing law">
        <P ko="이 약관은 대한민국 법을 따릅니다. 분쟁이 생기면 먼저 아래 연락처로 문의해 주세요. 소송이 필요한 경우 민사소송법에 따른 관할 법원에서 다룹니다."
          en="These terms are governed by the laws of the Republic of Korea. If a dispute arises, please contact us first. If litigation is needed, the court with jurisdiction under the Korean Civil Procedure Act will hear it." />
      </Sec>
      <Sec ko="9. 약관의 변경" en="9. Changes to these terms">
        <P ko="약관을 바꿀 때는 이 페이지에 새 시행일과 함께 게시합니다. 사용자에게 불리한 변경은 시행 7일 전부터 알립니다."
          en="When we change these terms we will post them here with a new effective date. Changes unfavorable to users will be announced at least 7 days before they take effect." />
      </Sec>
      <Sec ko="10. 문의" en="10. Contact"><Who /></Sec>
    </LegalLayout>
  );
}
