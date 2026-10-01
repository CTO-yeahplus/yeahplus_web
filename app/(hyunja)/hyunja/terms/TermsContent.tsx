'use client';

/* 현자의 서재 이용 약관 — 원본 폴더에는 약관이 없어, 이 사이트의 다른 제품 약관과 같은
   뼈대로 새로 썼다. 사실관계는 docs/METADATA_KO.md · SUBMISSION_ANSWERS.md · site/hyunja 에서 가져왔다:
   완전 유료(한 번 구매·앱 내 구매 없음) · 기록은 기기와 본인 iCloud · 번역 저본 · 현자 그림은 상상도. */

import Link from 'next/link';
import { COMPANY_EN, COMPANY_KO, MAIL, useDocTitle, useLang } from '../i18n';

const EFFECTIVE_KO = '2026년 10월 1일';
const EFFECTIVE_EN = 'October 1, 2026';
const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export default function TermsContent() {
  const { L } = useLang();
  useDocTitle('이용 약관 — 현자의 서재', 'Terms of Use — The Sages’ Study');
  const COMPANY = L(COMPANY_KO, COMPANY_EN);

  return (
    <div className="hj-wrap hj-narrow hj-doc">
      <h1>{L('이용 약관', 'Terms of Use')}</h1>
      <p className="hj-meta">
        {L(`시행일 ${EFFECTIVE_KO} · ${COMPANY}`, `Effective ${EFFECTIVE_EN} · ${COMPANY}`)}
      </p>

      <p>
        {L(
          <>
            이 약관은 {COMPANY}(이하 &quot;회사&quot;)가 제공하는 현자의 서재 앱의 이용 조건입니다. 앱
            사용권에 관해서는 Apple 의{' '}
            <a href={EULA} target="_blank" rel="noreferrer">
              표준 최종 사용자 사용권 계약(EULA)
            </a>
            이 함께 적용됩니다.
          </>,
          <>
            These terms govern your use of The Sages’ Study, provided by {COMPANY} (&ldquo;we&rdquo;).
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
          '현자의 서재는 『논어』·『맹자』·『순자』·『도덕경』의 구절을 삶의 고민별로 엮은 디지털 책입니다. 고민 하나에 네 현자의 구절이 하나씩 놓이고, 사용자는 마음이 가는 구절을 골라 따라 쓰고 한 줄의 기록을 남깁니다. 회원 가입이 없고, 모든 내용이 앱 안에 들어 있어 인터넷 연결 없이 동작합니다.',
          'The Sages’ Study is a digital book that arranges passages from the Analects, Mencius, Xunzi and the Tao Te Ching around everyday worries. Each worry is answered by one passage from each of the four thinkers; you choose the one that speaks to you, trace it, and leave a line of your own. There is no sign-up, and everything is bundled in the app, so it works without an internet connection.'
        )}
      </p>

      <h2>{L('2. 구매 범위', '2. What your purchase includes')}</h2>
      <ul>
        <li>
          {L(
            '현자의 서재는 한 번 결제하면 계속 쓰는 유료 앱입니다. 자동 갱신되는 구독이 아니며, 앱 안에 추가 결제가 없습니다.',
            'The Sages’ Study is a paid app you buy once and keep. It is not an auto-renewing subscription, and there are no in-app purchases.'
          )}
        </li>
        <li>
          {L(
            '구매하시면 앱에 실린 고민과 구절, 풀이와 출처, 필사와 어록 기능을 모두 쓸 수 있습니다. 앞으로 회사가 더하는 구절과 기능도 같은 판 안에서는 추가 결제 없이 열립니다.',
            'Your purchase opens every worry and passage in the app, with its commentary and source, along with the tracing and journal features. Passages and features we add within the same edition unlock at no extra cost.'
          )}
        </li>
        <li>
          {L(
            '가족 공유를 쓰실 수 있습니다. 가족 공유 그룹에서 "구입 항목 공유"를 켜 두셨다면 한 번 구매로 가족 구성원이 각자의 기기에서 내려받아 쓸 수 있습니다(설정 › 가족 › 구입 항목 공유). 기록은 각자의 기기와 각자의 iCloud에 따로 쌓입니다.',
            'Family Sharing is supported: with “Purchase Sharing” switched on for your family group, one purchase lets every member download it on their own device (Settings › Family › Purchase Sharing). Each person’s notes stay on their own device and in their own iCloud.'
          )}
        </li>
        <li>
          {L(
            '결제는 구매 확정 시 Apple 계정으로 청구됩니다. 가격은 App Store 에 표시되며 국가와 시기에 따라 달라질 수 있습니다. 환불은 Apple 의 정책을 따릅니다 — reportaproblem.apple.com 에서 신청하세요.',
            'Payment is charged to your Apple Account when you confirm. The price is shown in the App Store and may vary by country and over time. Refunds are handled by Apple — request one at reportaproblem.apple.com.'
          )}
        </li>
      </ul>

      <h2>{L('3. 나의 기록', '3. Your notes')}</h2>
      <p>
        {L(
          '앱에 적은 한 줄 성찰과 필사한 글씨의 권리는 사용자에게 있습니다. 회사는 이 기록에 접근하지 않고, 서버에 보관하지도 않습니다. 기록은 기기와 사용자 본인의 iCloud에 저장되므로, 기기를 초기화하거나 iCloud에서 지우면 회사가 복구해 드릴 수 없습니다. 설정 → 기록 지키기에서 백업 파일을 만들어 두시길 권합니다.',
          'The reflections you write and the sheets you trace are yours. We never access them and keep no copy on any server. They live on your device and in your own iCloud, so once a device is erased or the iCloud data removed, we cannot restore them — we recommend making a backup file under Settings → Keep my notes.'
        )}
      </p>

      <h2>{L('4. 원전과 번역', '4. Source texts and translation')}</h2>
      <p>
        {L(
          '원전은 공유 재산인 고전이지만, 앱에 실린 번역·음독·풀이·엮음은 회사가 만든 것입니다. 『논어』와 『맹자』는 주희의 집주, 『도덕경』은 왕필본, 『순자』는 왕선겸의 『순자집해』를 저본으로 삼았습니다. 네 현자의 그림은 전해지는 초상을 따르지 않은 상상도입니다. 구절의 번역과 그림을 따로 뽑아 배포하거나 다른 상품에 쓰지 마세요.',
          'The classics themselves are in the public domain, but the translations, Korean readings, commentary and arrangement in the app are ours. The base editions are Zhu Xi’s commentaries for the Analects and Mencius, the Wang Bi recension for the Tao Te Ching, and Wang Xianqian’s collected commentary for the Xunzi. The portraits of the four thinkers are imaginative paintings, not historical likenesses. Please do not extract the translations or artwork for redistribution or for use in another product.'
        )}
      </p>

      <h2>{L('5. 올바른 이용', '5. Acceptable use')}</h2>
      <p>
        {L(
          '앱을 역설계하거나, 유료 콘텐츠를 우회하거나, 앱의 내용을 별도의 상품으로 복제·배포하지 마세요. 개인적으로 읽고 쓰는 일, 가정과 교실에서 함께 읽는 일은 물론 자유입니다.',
          'Please do not reverse-engineer the app, circumvent paid content, or copy and redistribute its contents as a separate product. Reading and writing for yourself — or together at home or in a classroom — is of course fine.'
        )}
      </p>

      <h2>{L('6. 책임 제한', '6. Limitation of liability')}</h2>
      <p>
        {L(
          '법이 허용하는 범위에서 앱은 "있는 그대로" 제공됩니다. 고전의 해석에는 여러 견해가 있을 수 있으며, 앱의 풀이는 저본의 주석을 따른 한 가지 읽기입니다. 앱의 내용은 읽을거리이지 의학·법률·재무상의 조언이 아닙니다. 회사는 앱 이용으로 발생한 간접적·부수적 손해에 대해 책임지지 않으며, 소비자로서 법률상 보장되는 권리는 이 조항으로 제한되지 않습니다.',
          'To the extent permitted by law, the app is provided “as is”. Classical texts admit of more than one reading, and the commentary here follows the base edition’s. The contents are reading material, not medical, legal or financial advice. We are not liable for indirect or incidental damages arising from use of the app, and nothing here limits your statutory rights as a consumer.'
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
        <a className="hj-mailto" href={`mailto:${MAIL}`}>
          {MAIL}
        </a>
      </p>

      <p className="hj-meta" style={{ marginTop: 30 }}>
        <Link href="/hyunja/privacy">{L('개인정보 처리방침', 'Privacy Policy')}</Link>
        {' · '}
        <Link href="/hyunja/support">{L('도움말', 'Support')}</Link>
        {' · '}
        <Link href="/hyunja">{L('현자의 서재 홈', 'The Sages’ Study home')}</Link>
      </p>
    </div>
  );
}
