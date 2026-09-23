'use client';

/* 성어서당 이용 약관.
   원본 폴더에는 약관이 없어, 이 사이트의 다른 제품 약관과 같은 뼈대로 새로 썼다.
   §2 는 구매 범위 기준이다 — 앞으로 더해지는 오리지널 콘텐츠는 추가 결제 없이 포함되고,
   캐릭터·브랜드 제휴 콘텐츠는 별도 상품이 될 수 있다. (CineLook 과 같은 기준) */

import Link from 'next/link';
import { COMPANY_EN, COMPANY_KO, MAIL, useDocTitle, useLang } from '../i18n';

const EFFECTIVE = '2026-09-23';
const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export default function TermsContent() {
  const { L } = useLang();
  useDocTitle('이용 약관 — 성어서당', 'Terms of Use — Seodang');
  const COMPANY = L(COMPANY_KO, COMPANY_EN);

  return (
    <div className="sd-wrap sd-doc">
      <h1>{L('이용 약관', 'Terms of Use')}</h1>
      <p className="sd-meta">
        {L(`시행일 ${EFFECTIVE} · ${COMPANY}`, `Effective ${EFFECTIVE} · ${COMPANY}`)}
      </p>

      <p>
        {L(
          <>
            이 약관은 {COMPANY}(이하 &quot;회사&quot;)가 제공하는 성어서당 앱의 이용 조건입니다. 앱
            사용권에 관해서는 Apple 의{' '}
            <a href={EULA} target="_blank" rel="noreferrer">
              표준 최종 사용자 사용권 계약(EULA)
            </a>
            이 함께 적용됩니다.
          </>,
          <>
            These terms govern your use of the Seodang app provided by {COMPANY} (&ldquo;we&rdquo;).
            Apple&rsquo;s{' '}
            <a href={EULA} target="_blank" rel="noreferrer">
              Standard Licensed Application End User License Agreement
            </a>{' '}
            also applies to your licence to use the app.
          </>
        )}
      </p>

      <h2>{L('1. 서비스', '1. The service')}</h2>
      <p>
        {L(
          '성어서당은 초등 3~6학년을 위한 사자성어 학습 앱입니다. 고사 장면에서 직접 고르고, 옛 책으로 결말과 출전을 확인하고, 한자 네 글자를 획순에 따라 따라 씁니다. 회원 가입이 없고, 모든 내용이 앱 안에 들어 있어 인터넷 연결 없이 동작합니다.',
          'Seodang is an app for learning four-character Chinese idioms, made for ages 9–12. Children choose inside the old tale, read the ending and its source in the classics, then trace the four characters in stroke order. There is no sign-up, and everything is bundled in the app, so it works without an internet connection.'
        )}
      </p>

      <h2>{L('2. 구매 범위', '2. What your purchase includes')}</h2>
      <ul>
        <li>
          {L(
            '성어서당은 한 번 결제하면 계속 쓰는 앱입니다. 자동 갱신되는 구독이 아니며, 앱 안에서 이야기를 더 사라고 하지 않습니다.',
            'Seodang is bought once and kept. It is not an auto-renewing subscription, and the app never asks a child to buy more stories.'
          )}
        </li>
        <li>
          {L(
            '구매하시면 사자성어 60편과 그 안의 삽화·획순 시범을 모두 쓸 수 있습니다.',
            'Your purchase unlocks all 60 idiom stories together with their illustrations and stroke-order demonstrations.'
          )}
        </li>
        <li>
          {L(
            '앞으로 회사가 자체 제작해 더하는 오리지널 콘텐츠(이야기 · 삽화 · 획순 자료)는 추가 결제 없이 그대로 열립니다.',
            'Original content we create and add later — stories, illustrations and stroke data — unlocks at no extra cost.'
          )}
        </li>
        <li>
          {L(
            '캐릭터·브랜드 등 제3자와 제휴해 만드는 콘텐츠는 위 범위에 포함되지 않으며, 기간 한정 무료 이벤트 또는 별도의 앱 내 구매로 제공될 수 있습니다. 제휴 콘텐츠를 별도로 구매한 경우, 구매 후에도 계속 사용할 수 있도록 제공합니다.',
            'Content made in collaboration with third parties, such as characters or brands, is not part of that scope. It may be offered as a limited-time free event or as a separate in-app purchase. Collaboration content you buy separately remains available to you after purchase.'
          )}
        </li>
        <li>
          {L(
            '가족 공유를 사용할 수 있습니다. 같은 가족 그룹의 구성원은 한 번의 구매로 각자의 기기에서 앱을 쓸 수 있으며, 가족 공유의 조건과 인원은 Apple 의 정책을 따릅니다.',
            'Family Sharing is supported: members of the same family group can use the app on their own devices from a single purchase. The terms and size of a family group follow Apple’s policy.'
          )}
        </li>
        <li>
          {L(
            '결제는 구매 확정 시 Apple ID 로 청구됩니다. 가격은 App Store 에 표시되며 국가와 시기에 따라 달라질 수 있습니다. 같은 Apple ID 를 쓰는 기기에서는 App Store 에서 다시 내려받아 그대로 쓸 수 있습니다.',
            'Payment is charged to your Apple ID when you confirm. The price is shown in the App Store and may vary by country and over time. On any device using the same Apple ID you can download the app again and keep what you bought.'
          )}
        </li>
        <li>
          {L(
            '환불은 Apple 의 정책을 따릅니다 — reportaproblem.apple.com 에서 신청하세요.',
            'Refunds are handled by Apple — request one at reportaproblem.apple.com.'
          )}
        </li>
      </ul>

      <h2>{L('3. 어린이 이용자', '3. Children')}</h2>
      <p>
        {L(
          '이 앱은 어린이가 주로 사용합니다. 앱에는 광고가 없고, 아이를 외부 사이트로 데려가지 않으며, 앱 안에서 결제를 유도하지 않습니다. 구매는 기기 소유자(보호자)의 Apple ID 로 이루어집니다.',
          'This app is used mainly by children. It carries no advertising, never sends a child out to another site, and does not prompt purchases inside the experience. Any purchase is made with the device owner’s (a guardian’s) Apple ID.'
        )}
      </p>

      <h2>{L('4. 올바른 이용', '4. Acceptable use')}</h2>
      <p>
        {L(
          '앱을 역설계하거나, 유료 콘텐츠를 우회하거나, 앱의 이야기·삽화를 따로 뽑아 배포하지 마세요. 개인적인 학습 용도로 쓰시는 것은 물론 자유이며, 가정과 교실에서 아이와 함께 보는 것도 포함됩니다.',
          'Please do not reverse-engineer the app, circumvent paid content, or extract and redistribute its stories or artwork. Using it for personal learning is of course free — including reading it together with a child at home or in a classroom.'
        )}
      </p>

      <h2>{L('5. 지식재산', '5. Intellectual property')}</h2>
      <p>
        {L(
          `앱과 그 구성 요소(이야기 문안, 삽화, 캐릭터 「붓선생」, 화면 디자인)의 권리는 ${COMPANY}에 있습니다. 구매하시는 것은 개인적 사용권입니다. 획순 시범 자료는 AnimCJK 의 자료를 Arphic Public License 에 따라 사용합니다.`,
          `The app and its components (story text, illustrations, the Master Brush character, screen design) belong to ${COMPANY}. What you buy is a personal licence to use them. Stroke-order data comes from AnimCJK and is used under the Arphic Public License.`
        )}
      </p>

      <h2>{L('6. 책임 제한', '6. Limitation of liability')}</h2>
      <p>
        {L(
          '법이 허용하는 범위에서 앱은 "있는 그대로" 제공됩니다. 학습 기록은 기기 안에만 저장되므로, 기기를 초기화하거나 앱을 삭제하면 복구할 수 없습니다. 회사는 앱 이용으로 발생한 간접적·부수적 손해에 대해 책임지지 않습니다. 소비자로서 법률상 보장되는 권리는 이 조항으로 제한되지 않습니다.',
          'To the extent permitted by law, the app is provided “as is”. Progress is stored on the device only, so resetting the device or deleting the app removes it for good. We are not liable for indirect or incidental damages arising from use of the app. Nothing here limits your statutory rights as a consumer.'
        )}
      </p>

      <h2>{L('7. 약관 변경', '7. Changes')}</h2>
      <p>
        {L(
          '약관이 바뀌면 이 페이지에 새 시행일과 함께 게시합니다. 변경 후 계속 이용하시면 새 약관에 동의한 것으로 봅니다.',
          'If these terms change, we will post the new version here with a new effective date. Continuing to use the app afterwards means you accept it.'
        )}
      </p>

      <h2>{L('8. 준거법과 문의', '8. Governing law and contact')}</h2>
      <p>
        {L(
          '이 약관은 대한민국 법을 준거법으로 합니다.',
          'These terms are governed by the laws of the Republic of Korea.'
        )}
        <br />
        {COMPANY} ·{' '}
        <a className="sd-mailto" href={`mailto:${MAIL}`}>
          {MAIL}
        </a>
      </p>

      <p className="sd-meta" style={{ marginTop: 30 }}>
        <Link href="/seodang/privacy">{L('개인정보 처리방침', 'Privacy Policy')}</Link>
        {' · '}
        <Link href="/seodang/support">{L('고객 지원', 'Support')}</Link>
        {' · '}
        <Link href="/seodang">{L('성어서당 홈', 'Seodang home')}</Link>
      </p>
    </div>
  );
}
