'use client';

/* 노티 지원 — 자주 묻는 것(아코디언) · 마음이 힘들 때 · 문의.
   ⚠️ 이 주소가 App Store Connect 의 지원 URL 이다 (https://yeahplus.co.kr/noti/support). */

import { useState } from 'react';
import LegalLayout from '../legal';
import { MAIL, Tb, useLang } from '../i18n';

const FAQ: [{ ko: string; en: string }, { ko: string; en: string }][] = [
  [{ ko: '고른 선택을 되돌릴 수 있나요?', en: 'Can I undo a choice?' },
   { ko: '되돌릴 수 없습니다. 다만 홈에서 그 화를 처음부터 다시 할 수 있고, 그러면 그 화의 기록이 새로 쓰입니다.', en: 'No. You can replay an episode from the start from the home screen, and its record will be rewritten.' }],
  [{ ko: '진행 상황은 어디에 저장되나요?', en: 'Where is my progress saved?' },
   { ko: '기기 안에만 저장됩니다. 장면이 바뀔 때마다 저장되며, 앱을 지우거나 기기를 바꾸면 따라가지 않습니다.', en: 'Only on your device. It is saved at every scene change, and does not follow you if you delete the app or change devices.' }],
  [{ ko: '어디까지 무료인가요?', en: 'How much is free?' },
   { ko: '1화와 2화는 무료입니다. 3화부터 8화까지는 시즌권을 한 번 구매하면 모두 열립니다. 가격은 스토어에 표시된 대로이며, 구독이 아니라 한 번 결제입니다.', en: 'Episodes 1 and 2 are free. A one-time season pass unlocks episodes 3 to 8. The price is as shown in the store; it is a single purchase, not a subscription.' }],
  [{ ko: '시즌권을 샀는데 3화가 잠겨 있어요', en: 'I bought the season pass but episode 3 is locked' },
   { ko: '홈 화면의 ‘시즌권 · 구매 복원’을 눌러 ‘구매 복원’을 해 보세요. 구매할 때와 같은 스토어 계정이어야 합니다. 그래도 안 되면 구매 영수증 메일과 함께 문의해 주세요.', en: 'Open “Season pass · Restore” on the home screen and tap “Restore purchase”. You must be signed in to the same store account you bought it with. If that doesn’t help, email us with your purchase receipt.' }],
  [{ ko: '환불은 어떻게 하나요?', en: 'How do I get a refund?' },
   { ko: '결제와 환불은 App Store 와 Google Play 가 처리합니다. Apple 은 reportaproblem.apple.com, Google 은 Play 스토어의 주문 내역에서 요청할 수 있습니다.', en: 'Payments and refunds are handled by the App Store and Google Play. For Apple use reportaproblem.apple.com; for Google, request it from your order history in the Play Store.' }],
  [{ ko: '언어는 어떻게 바꾸나요?', en: 'How do I change the language?' },
   { ko: '한국어와 영어로 할 수 있습니다. 처음에는 기기 언어를 따르고, 홈 화면 아래의 English / 한국어 단추나 ‘만든 곳 · 라이선스’ 화면에서 바꿉니다. 영어는 첫 번역이라 어색한 곳이 있으면 알려 주세요.', en: 'The game is available in Korean and English. It follows your device language at first; switch with the 한국어 / English button at the bottom of the home screen or on the Credits screen. The English is a first translation, so please tell us where it reads oddly.' }],
  [{ ko: '웹에서 한 1화가 앱으로 이어지나요?', en: 'Does my web demo progress carry over to the app?' },
   { ko: '이어지지 않습니다. 앱에서는 1화부터 다시 고릅니다.', en: 'No. In the app you start again from episode 1.' }],
  [{ ko: '의학 내용이 실제와 같나요?', en: 'Is the medicine accurate?' },
   { ko: '이야기를 위해 단순화한 것이며 의학적 조언이 아닙니다. 몸이 아프면 의료기관을 찾으세요. 사실과 다른 대목을 발견하셨다면 알려 주세요 — 고치겠습니다.', en: 'It is simplified for the story and is not medical advice. If you are unwell, see a medical professional. If you spot something wrong, tell us — we will fix it.' }],
];

export default function SupportContent() {
  const { L } = useLang();
  const [open, setOpen] = useState(0);
  return (
    <LegalLayout title={{ ko: '지원', en: 'Support' }} sub={{ ko: '노티: 새벽 3시의 인턴', en: 'NOTI: The 3 A.M. Intern' }}>
      <section>
        <h2>{L('자주 묻는 것', 'Frequently asked')}</h2>
        <ul className="nt-faq">
          {FAQ.map(([q, a], i) => (
            <li key={i} className={open === i ? 'nt-on' : ''}>
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                {L(q.ko, q.en)}
                <i />
              </button>
              <div>
                <p>{L(a.ko, a.en)}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className="nt-care">
        <h2>{L('마음이 힘들 때', 'If you are struggling')}</h2>
        <Tb as="p"
          ko="이 이야기는 과로와 소진을 다룹니다. 비슷한 마음이 든다면 자살예방 상담전화 109 (24시간)에 말할 수 있습니다."
          en="This story deals with overwork and burnout. If it touches something close to home, please reach out to a crisis line where you live. In Korea, call 109 (24 hours)." />
      </section>
      <section>
        <h2>{L('문의', 'Contact')}</h2>
        <Tb as="p"
          ko={<>오류 제보, 내용에 대한 의견, 결제 문의 — <a href={`mailto:${MAIL}`}>{MAIL}</a><br />기기 종류와 OS 버전, 어느 화의 어느 장면인지 적어 주시면 빨리 찾을 수 있습니다.</>}
          en={<>Bug reports, comments on the content, purchase questions — <a href={`mailto:${MAIL}`}>{MAIL}</a><br />Telling us your device, OS version, and which scene of which episode helps us find it quickly.</>} />
      </section>
    </LegalLayout>
  );
}
