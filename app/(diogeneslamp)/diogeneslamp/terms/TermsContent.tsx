'use client';

/* 디오게네스의 등불 이용 약관 — hyunja/terms 의 뼈대를 이 앱에 맞게 고쳐 썼다.
   사실관계: 한 번 구입하는 유료 앱(앱 내 구입·구독·계정 없음. 제휴·협찬 콘텐츠는 열어 둔다 — 2026-10-15) · Apple 표준 EULA ·
   원문은 퍼블릭 도메인, 영·한 번역은 편집부가 새로 옮김, 대조용 옛 영역본은 퍼블릭 도메인 번역만 ·
   가짜 판정은 공개 자료 근거 + 앱 안 출처 링크 · 초상과 그림은 AI 그림 도구로 그린 상상도. */

import Link from 'next/link';
import { APP_EN, APP_KO, COMPANY_EN, COMPANY_KO, MAIL, useDocTitle, useLang } from '../i18n';

const EFFECTIVE_KO = '2026년 10월 15일';
const EFFECTIVE_EN = 'October 15, 2026';
const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export default function TermsContent() {
  const { L } = useLang();
  useDocTitle(`이용 약관 — ${APP_KO}`, `Terms of Use — ${APP_EN}`);
  const COMPANY = L(COMPANY_KO, COMPANY_EN);

  return (
    <div className="dl-wrap dl-narrow dl-doc">
      <h1>{L('이용 약관', 'Terms of Use')}</h1>
      <p className="dl-meta">
        {L(`시행일 ${EFFECTIVE_KO} · ${COMPANY}`, `Effective ${EFFECTIVE_EN} · ${COMPANY}`)}
      </p>

      <p>
        {L(
          <>
            이 약관은 {COMPANY}(이하 &quot;회사&quot;)가 제공하는 디오게네스의 등불 앱의 이용 조건입니다.
            앱 사용권에 관해서는 Apple 의{' '}
            <a href={EULA} target="_blank" rel="noreferrer">
              표준 최종 사용자 사용권 계약(EULA)
            </a>
            이 함께 적용됩니다.
          </>,
          <>
            These terms govern your use of Diogenes’ Lamp, provided by {COMPANY} (&ldquo;we&rdquo;).
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
          '디오게네스의 등불은 인터넷에 떠도는 철학자 명언이 진짜인지, 가짜인지, 비틀린(변조) 것인지 판정하는 퀴즈 게임입니다. 판정마다 증거와 원문, 편집부 번역을 보여 줍니다. 회원 가입이 없고, 모든 내용이 앱 안에 들어 있어 인터넷 연결 없이 동작합니다. 앱에는 AI 기능이 없습니다.',
          'Diogenes’ Lamp is a quiz game in which you decide whether philosophers’ quotes found online are real, fake or twisted. Each verdict comes with the evidence, the original text and our own translation. There is no sign-up, everything is bundled in the app so it works without an internet connection, and the app has no AI features.'
        )}
      </p>

      <h2>{L('2. 구매', '2. Your purchase')}</h2>
      <ul>
        <li>
          {L(
            '디오게네스의 등불은 한 번 구입하는 유료 앱입니다. 자동 갱신되는 구독이 아니며, 앱 안의 추가 결제가 없습니다. 앱에 제휴·협찬 콘텐츠가 실릴 수 있으며, 그런 콘텐츠에는 협찬임을 표시합니다.',
            'Diogenes’ Lamp is a paid app you buy once. It is not an auto-renewing subscription, and there are no in-app purchases. The app may include partner or sponsored content; such content is labeled as sponsored.'
          )}
        </li>
        <li>
          {L(
            '결제는 구매 확정 시 Apple 계정으로 청구됩니다. 가격은 App Store 에 표시되며 국가와 시기에 따라 달라질 수 있습니다. 환불은 Apple 의 정책을 따릅니다 — reportaproblem.apple.com 에서 신청하세요.',
            'Payment is charged to your Apple Account when you confirm. The price is shown in the App Store and may vary by country and over time. Refunds are handled by Apple — request one at reportaproblem.apple.com.'
          )}
        </li>
      </ul>

      <h2>{L('3. 진행 기록', '3. Your progress')}</h2>
      <p>
        {L(
          '이름표에 적은 이름, 판정 기록, 저녁 성찰 메모, 담아 둔 구절은 사용자의 기기 안에만 저장됩니다. 회사는 이 기록에 접근하지 않고 서버에 보관하지도 않습니다. 기기 사이의 동기화 기능은 없으며, 앱을 삭제하거나 기기를 초기화하면 회사가 복구해 드릴 수 없습니다. 같은 기기의 iCloud 백업이나 기기 백업에서 복원하면 기록이 함께 돌아올 수 있습니다.',
          'The name on your bookplate, your verdicts, your evening review notes and the passages you kept are stored only on your device. We never access them and keep no copy on any server. There is no sync between devices, and once the app is deleted or the device erased we cannot restore them. Restoring the device from an iCloud or device backup may bring them back.'
        )}
      </p>

      <h2>{L('4. 원문과 번역, 그림', '4. Source texts, translations and artwork')}</h2>
      <p>
        {L(
          '철학자의 원문은 퍼블릭 도메인입니다. 앱에 실린 영어·한국어 번역은 편집부가 원문에서 새로 옮긴 것이고, 대조용으로 싣는 옛 영역본은 퍼블릭 도메인 번역만 씁니다. 번역과 해설, 증거 정리, 사건의 구성은 회사가 만든 것입니다. 철학자 초상과 그림은 AI 그림 도구로 그린 상상도이며 역사 자료가 아닙니다(앱의 판권면에도 적혀 있습니다). 번역과 그림을 따로 뽑아 배포하거나 다른 상품에 쓰지 마세요.',
          'The philosophers’ original texts are in the public domain. The English and Korean translations in the app were made fresh from the originals by our editors, and the older English translations shown for comparison are public-domain translations only. The translations, commentary, evidence write-ups and arrangement of the cases are ours. The portraits and other artwork were drawn with an AI image tool; they are imagined likenesses, not historical documents (the colophon in the app says so too). Please do not extract the translations or artwork for redistribution or for use in another product.'
        )}
      </p>

      <h2>{L('5. 판정의 정확성과 오류 제보', '5. Accuracy of verdicts and reporting errors')}</h2>
      <p>
        {L(
          '가짜 명언의 판정은 공개 자료를 근거로 하며, 앱 안에 출처 링크를 달아 사용자가 직접 확인할 수 있게 했습니다. 다만 판정은 만들 당시 확인할 수 있었던 자료에 따른 것이므로, 새 자료가 나오면 달라질 수 있습니다. 앱의 내용은 즐길 거리이자 읽을거리이며, 학술적 판단이나 법률·전문 조언을 대신하지 않습니다.',
          'Verdicts on fake quotes are based on public sources, and the app links to them so you can check for yourself. Verdicts reflect the material available when they were written and may change if new evidence comes to light. The contents are for enjoyment and reading; they are not a substitute for scholarly judgement or for legal or professional advice.'
        )}
      </p>
      <p>
        {L(
          <>
            판정이나 번역에 오류가 있으면 앱의 &lsquo;오류 제보&rsquo;나{' '}
            <a className="dl-mailto" href={`mailto:${MAIL}`}>
              {MAIL}
            </a>{' '}
            로 알려 주세요. 확인해 다음 업데이트에 고칩니다.
          </>,
          <>
            If you find an error in a verdict or translation, tell us with &ldquo;Report an error&rdquo; in the
            app or at{' '}
            <a className="dl-mailto" href={`mailto:${MAIL}`}>
              {MAIL}
            </a>
            . We will check it and fix it in the next update.
          </>
        )}
      </p>

      <h2>{L('6. 올바른 이용', '6. Acceptable use')}</h2>
      <p>
        {L(
          '앱을 역설계하거나, 앱의 내용을 별도의 상품으로 복제·배포하지 마세요. 개인적으로 즐기는 일, 판정 결과를 공유하는 일은 물론 자유입니다.',
          'Please do not reverse-engineer the app or copy and redistribute its contents as a separate product. Playing for yourself and sharing your results is of course fine.'
        )}
      </p>

      <h2>{L('7. 책임 제한', '7. Limitation of liability')}</h2>
      <p>
        {L(
          '법이 허용하는 범위에서 앱은 "있는 그대로" 제공됩니다. 회사는 앱 이용으로 발생한 간접적·부수적 손해에 대해 책임지지 않으며, 소비자로서 법률상 보장되는 권리는 이 조항으로 제한되지 않습니다.',
          'To the extent permitted by law, the app is provided “as is”. We are not liable for indirect or incidental damages arising from use of the app, and nothing here limits your statutory rights as a consumer.'
        )}
      </p>

      <h2>{L('8. 약관 변경', '8. Changes')}</h2>
      <p>
        {L(
          '약관이 바뀌면 이 페이지에 새 시행일과 함께 게시합니다. 변경 후 계속 이용하시면 새 약관에 동의한 것으로 봅니다.',
          'If these terms change, we will post the new version here with a new effective date. Continuing to use the app afterwards means you accept it.'
        )}
      </p>

      <h2>{L('9. 준거법과 문의', '9. Governing law and contact')}</h2>
      <p>
        {L(
          '이 약관은 대한민국 법을 준거법으로 합니다.',
          'These terms are governed by the laws of the Republic of Korea.'
        )}
        <br />
        {COMPANY} ·{' '}
        <a className="dl-mailto" href={`mailto:${MAIL}`}>
          {MAIL}
        </a>
      </p>

      <p className="dl-meta" style={{ marginTop: 30 }}>
        <Link href="/diogeneslamp/privacy">{L('개인정보 처리방침', 'Privacy Policy')}</Link>
        {' · '}
        <Link href="/diogeneslamp/support">{L('지원', 'Support')}</Link>
        {' · '}
        <Link href="/diogeneslamp">{L('디오게네스의 등불 홈', 'Diogenes’ Lamp home')}</Link>
      </p>
    </div>
  );
}
