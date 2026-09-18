'use client';

/* 원본 NEXTGEN_CINEMATIC/site/src/pages/Terms.jsx — 문안은 한 글자도 고치지 않았다.
   바뀐 것: 라우팅(react-router → next/link, 경로에 /cinelook 접두)과 문의 주소(contact@). */

import Link from 'next/link';
import { COMPANY, MAIL, useLang } from '../i18n';

const EFFECTIVE = '2026-09-15';
const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export default function TermsContent() {
  const { L } = useLang();

  return (
    <div className="cl-wrap cl-narrow cl-doc">
      <h1>{L('이용 약관', 'Terms of Use')}</h1>
      <p className="cl-meta">
        {L(`시행일 ${EFFECTIVE} · ${COMPANY}`, `Effective ${EFFECTIVE} · ${COMPANY}`)}
      </p>

      <p>
        {L(
          <>
            이 약관은 {COMPANY}(이하 &quot;회사&quot;)가 제공하는 CineLook 앱의 이용 조건입니다. 앱
            사용권에 관해서는 Apple 의{' '}
            <a href={EULA} target="_blank" rel="noreferrer">
              표준 최종 사용자 사용권 계약(EULA)
            </a>
            이 함께 적용됩니다.
          </>,
          <>
            These terms govern your use of the CineLook app provided by {COMPANY} (&ldquo;we&rdquo;).
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
          'CineLook 은 사진을 촬영하거나 불러와 카메라 효과·영화 필터·프레임·레이아웃·조명을 적용하는 사진 편집 앱입니다. 무료 기능과, 앱 내 구매(CineLook Pro)로 여는 기능으로 구성됩니다. 모든 처리는 기기 안에서 이루어지며 회원 가입이 없습니다.',
          'CineLook is a photo app for shooting or importing photos and applying camera effects, movie filters, frames, layouts and lighting. It has free features and features unlocked by an in-app purchase (CineLook Pro). All processing happens on your device, and there is no sign-up.'
        )}
      </p>

      <h2>{L('2. CineLook Pro (평생 소장)', '2. CineLook Pro (lifetime)')}</h2>
      <ul>
        <li>
          {L(
            'CineLook Pro 는 1회 결제하는 비소모성 앱 내 구매이며, 자동으로 갱신되지 않습니다.',
            'CineLook Pro is a one-time, non-consumable in-app purchase. It does not renew.'
          )}
        </li>
        <li>
          {L(
            '결제는 구매 확정 시 Apple ID 로 청구됩니다. 가격은 구매 화면과 App Store 에 표시되며, 국가와 시기에 따라 달라질 수 있습니다.',
            'Payment is charged to your Apple ID when you confirm. The price is shown on the purchase screen and in the App Store and may vary by country and over time.'
          )}
        </li>
        <li>
          {L(
            '같은 Apple ID 를 쓰는 기기에서 "구매 복원"으로 다시 사용할 수 있습니다.',
            'You can restore it with “Restore Purchase” on any device using the same Apple ID.'
          )}
        </li>
        <li>
          {L(
            'Pro 에는 구매 시점의 유료 기능(필터·카메라·프레임·레이아웃 전부, UI 테마와 테마별 공유 카드, AI 조명, 세부 조정)과 이후 추가되는 템플릿이 포함됩니다.',
            'Pro includes the paid features available at purchase — every filter, camera, frame and layout, the UI themes and their share-card styles, AI lighting and the fine-tune sliders — plus templates added afterwards.'
          )}
        </li>
        <li>
          {L(
            '환불은 Apple 의 정책을 따릅니다 — reportaproblem.apple.com 에서 신청하세요.',
            'Refunds are handled by Apple — request one at reportaproblem.apple.com.'
          )}
        </li>
      </ul>

      <h2>{L('3. 내 사진', '3. Your photos')}</h2>
      <p>
        {L(
          '앱으로 찍거나 편집한 사진의 권리는 사용자에게 있습니다. 회사는 사진에 접근하지 않으며 어떤 권리도 주장하지 않습니다. 결과물은 개인적 용도와 상업적 용도 모두 자유롭게 사용할 수 있습니다. 다만 다른 사람의 사진이나 초상을 편집·게시할 때는 그 사람의 권리를 존중해 주세요.',
          'You own the photos you shoot or edit with the app. We never access them and claim no rights in them, and you may use the results for personal or commercial purposes. When editing or posting other people’s photos or likeness, please respect their rights.'
        )}
      </p>

      <h2>{L('4. 올바른 이용', '4. Acceptable use')}</h2>
      <p>
        {L(
          '앱을 역설계하거나, 유료 기능을 우회하거나, 앱의 템플릿·프레임 디자인을 별도의 상품으로 복제·배포하지 마세요. 앱을 불법적인 콘텐츠를 만드는 데 사용해서는 안 됩니다.',
          'Please do not reverse-engineer the app, circumvent paid features, or copy and redistribute its templates or frame designs as separate products. Do not use the app to create unlawful content.'
        )}
      </p>

      <h2>{L('5. 지식재산', '5. Intellectual property')}</h2>
      <p>
        {L(
          `앱과 그 구성 요소(필터 레시피, 카메라 효과, 프레임·레이아웃 디자인, 문구, 그래픽)의 권리는 ${COMPANY}에 있습니다. 구매하시는 것은 개인적 사용권이며, 템플릿 이름은 무드를 설명하는 이름으로 특정 영화·인물·제품과 관련이 없습니다.`,
          `The app and its components (filter recipes, camera effects, frame and layout designs, copy, artwork) belong to ${COMPANY}. What you buy is a personal licence to use them. Template names describe a mood and are not affiliated with any film, person or product.`
        )}
      </p>

      <h2>{L('6. 책임 제한', '6. Limitation of liability')}</h2>
      <p>
        {L(
          '법이 허용하는 범위에서 앱은 "있는 그대로" 제공됩니다. 원본 사진은 앱이 수정하지 않지만, 중요한 사진은 따로 백업해 두시길 권합니다. 회사는 앱 이용으로 발생한 간접적·부수적 손해에 대해 책임지지 않습니다. 소비자로서 법률상 보장되는 권리는 이 조항으로 제한되지 않습니다.',
          'To the extent permitted by law, the app is provided “as is”. The app never modifies your originals, but we recommend backing up important photos. We are not liable for indirect or incidental damages arising from use of the app. Nothing here limits your statutory rights as a consumer.'
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
        <a className="cl-mailto" href={`mailto:${MAIL}`}>
          {MAIL}
        </a>
      </p>

      <p className="cl-meta" style={{ marginTop: 30 }}>
        <Link href="/cinelook/privacy">{L('개인정보 처리방침', 'Privacy Policy')}</Link>
        {' · '}
        <Link href="/cinelook/support">{L('고객 지원', 'Support')}</Link>
      </p>
    </div>
  );
}
