'use client';

/* 전설의 조선 사건부 고객 지원 — 문의 · 자주 묻는 질문(아코디언) · 라이선스.
   ⚠️ 이 주소가 App Store Connect 의 지원 URL 이다 (https://www.yeahplus.co.kr/crimescene/support).
   원본: GAME/APLUS/crimescene/site-react/src/pages/Support.jsx */

import { useState } from 'react';
import LegalLayout from '../legal';
import { L, LB, MAIL, MIN_IOS, NAME } from '../i18n';
import { c } from '../cx';

type QA = [{ ko: string; en: string }, { ko: React.ReactNode; en: React.ReactNode }];

const REFUND = 'https://reportaproblem.apple.com';
// 자주 묻는 것: [물음, 답]. 답은 JSX 를 쓸 수 있다
const FAQ: QA[] = [
  [{ ko: '증거를 다 찾지 못하겠어요', en: 'I can’t find all the evidence' },
   { ko: <>현장 화면 위쪽의 <b>귀띔</b>을 누르면 아직 찾지 못한 증거 가운데 하나가 있는 곳을 비춰 줍니다. 화마다 세 번 쓸 수 있고, 쓸 때마다 점수가 조금 깎입니다. 탐문을 마친 뒤에는 처음에 보이지 않던 증거가 현장에 더 나타나니, 다시 둘러보세요.</>,
     en: <>Tap <b>귀띔 (Hint)</b> at the top of the scene to light up one piece of evidence you have not found. You get three per episode, each at a small cost to your score. After the questioning stage, new evidence appears in the scene — look around again.</> }],
  [{ ko: '범인을 잘못 짚었어요', en: 'I accused the wrong person' },
   { ko: '틀려도 이야기는 미해결인 채로 다음 화로 넘어갑니다. 잘못 가둔 사람의 이름이 사건부 첫 장 여백에 적히고, 그 사람은 다음 화 첫머리에 한 번 나옵니다. 그 화의 장을 다시 펴서 바로잡을 수 있습니다(재심). 마지막 화만은 풀어야 닫힙니다.',
     en: 'The story continues to the next episode with the case unsolved. The name of the person you wrongly jailed is written on the first leaf of the casebook, and they appear once at the start of the next episode. You can reopen that episode and set it right (a retrial). Only the final episode must be solved to close.' }],
  [{ ko: '결말이 여럿인가요?', en: 'Are there multiple endings?' },
   { ko: '셋입니다. 화마다의 선택, 틈틈이 누구를 찾아가 이야기했는지, 그리고 잘못 가둔 사람을 바로잡았는지에 따라 마지막 화에서 갈립니다.',
     en: 'Three. They depend on the choice you make in each episode, whom you visit between scenes, and whether you have set right anyone you wrongly jailed.' }],
  [{ ko: '“아버지의 글”은 어디서 다시 보나요?', en: 'Where can I reread “Father’s note”?' },
   { ko: '사건을 풀어 닫을 때마다 사건부의 아버지 글이 한 장씩 펴집니다. 푼 화의 장에서 붉은 낙관 아래의 「아버지의 글」 쪽지를 누르면 다시 볼 수 있습니다. 범인을 잘못 짚은 화에서는 그 장이 펴지지 않으니, 그 화를 다시 펴서 바로잡아 보세요.',
     en: 'Each case you close opens one more page of your father’s notes in the casebook. On the leaf of a solved episode, tap the 「아버지의 글」 slip under the red seal to read it again. The page stays closed for an episode where you accused the wrong person — reopen that episode and set it right.' }],
  [{ ko: '다음 화가 열리지 않아요', en: 'The next episode is locked' },
   { ko: '이야기는 순서대로 열립니다. 앞 화를 끝까지(복기 화면까지) 마치면 다음 장을 펼 수 있습니다.',
     en: 'Episodes open in order. Finish the previous one through to the review screen to open the next leaf.' }],
  [{ ko: '책장은 어떻게 넘기나요?', en: 'How do I turn the pages?' },
   { ko: <>첫 화면의 사건부는 오른쪽을 실로 묶은 옛 책입니다. 다음 장으로 갈 때는 장을 <b>오른쪽으로</b> 끌어 넘기거나 아래의 「다음 장」 단추를 누릅니다. 표지는 누르기만 해도 펴집니다.</>,
     en: <>The casebook on the home screen is an old book stitched on the right. To go to the next leaf, drag the page <b>to the right</b> or tap 「다음 장」 below. Tap the cover to open it.</> }],
  [{ ko: '하다가 껐어요. 이어서 할 수 있나요?', en: 'Can I continue later?' },
   { ko: '네. 현장 조사, 탐문, 범인의 모습, 분석, 실마리 잇기, 지목 단계마다 저장됩니다. 그 화의 장에 「이어서 수사하기」가 나옵니다.',
     en: 'Yes. Progress is saved at each stage. 「이어서 수사하기」 (Resume) appears on that episode’s leaf.' }],
  [{ ko: '3화부터는 왜 잠겨 있나요?', en: 'Why are episodes 3 onward locked?' },
   { ko: '1화와 2화는 무료이고, 3화부터 8화까지(시즌 1)는 한 번 구매로 모두 열립니다. 3화 이후의 장에 있는 구매 단추를 누르면 됩니다. 추가 결제나 구독은 없습니다.',
     en: 'Episodes 1 and 2 are free. Episodes 3–8 (Season 1) unlock together with a one-time purchase, using the button on any of those leaves. There are no further purchases or subscriptions.' }],
  [{ ko: '구매했는데 잠겨 있어요 / 새 iPhone으로 바꿨어요', en: 'I bought it but it is locked / I have a new iPhone' },
   { ko: '구매할 때 쓴 Apple 계정으로 로그인한 뒤, 3화 이후의 장이나 사건부 첫 장에 있는 「구매 복원」을 누르세요. 다시 결제되지 않습니다.',
     en: 'Sign in with the Apple Account you bought it with, then tap 「구매 복원」 (Restore Purchases) on any locked leaf or on the first leaf of the casebook. You will not be charged again.' }],
  [{ ko: '환불하고 싶어요', en: 'Refunds' },
   { ko: <>결제는 Apple이 처리하기 때문에 환불도 Apple에 요청해야 합니다. <a href={REFUND}>reportaproblem.apple.com</a>에서 구매 내역을 찾아 요청할 수 있습니다.</>,
     en: <>Payments are handled by Apple, so refunds are requested from Apple at <a href={REFUND}>reportaproblem.apple.com</a>.</> }],
  [{ ko: '기록을 다른 기기로 옮길 수 있나요?', en: 'Can I move my progress to another device?' },
   { ko: '아니요. 개인정보를 모으지 않기 위해 기록은 기기 안에만 저장하고, 서버나 계정이 없습니다. 앱을 삭제하면 기록도 함께 지워지니 주의해 주세요. 구매는 「구매 복원」으로 되찾을 수 있습니다.',
     en: 'No. To avoid collecting personal data, progress is stored only on your device; there is no server or account. Deleting the app deletes your progress. Your purchase can be recovered with “Restore Purchases”.' }],
  [{ ko: '어떤 기기에서 되나요?', en: 'Which devices are supported?' },
   { ko: `iOS ${MIN_IOS} 이상의 iPhone과 iPad입니다. 세로·가로 모두 됩니다. 인터넷 연결 없이도 할 수 있습니다.`,
     en: `iPhone and iPad with iOS ${MIN_IOS} or later, in portrait or landscape. It plays fully offline.` }],
  [{ ko: '소리를 끄고 싶어요', en: 'Turning sound off' },
   { ko: '화면 왼쪽 아래의 소리 단추를 누르세요.', en: 'Tap the sound button at the bottom left.' }],
  [{ ko: '어떤 내용을 다루나요?', en: 'What is the content like?' },
   { ko: '조선 시대를 배경으로 살인·실종 사건의 수사를 다루는 지어낸 이야기입니다. 잔혹한 장면은 그리지 않았고, 현장은 본뜬 자리와 증거 표식으로만 나타냅니다. 그래도 죽음과 범죄를 다루므로 어린이에게는 권하지 않습니다.',
     en: 'A fictional story about investigating murders and disappearances in Joseon-era Korea. There is no graphic imagery; scenes use outlines and evidence markers only. It still deals with death and crime and is not recommended for young children.' }],
  [{ ko: '영어로 할 수 있나요?', en: 'Is it available in English?' },
   { ko: '지금은 한국어만 지원합니다.', en: 'The game text is in Korean only for now.' }],
];

export default function SupportContent() {
  const [open, setOpen] = useState(0);
  return (
    <LegalLayout title={{ ko: '고객 지원', en: 'Support' }} sub={{ ko: NAME.ko, en: NAME.en }}>
      <section>
        <h2><L ko="문의" en="Contact" /></h2>
        <LB as="p" ko="궁금한 점이나 불편한 점이 있으면 메일로 알려 주세요. 기기 모델과 iOS 버전, 어느 화의 어떤 화면에서 생긴 일인지 함께 적어 주시면 더 빨리 도와드릴 수 있습니다."
          en="Questions or problems? Email us. Including your device model, iOS version, and the episode and screen where it happened helps us help you faster." />
        <p className={c('mail')}><a href={`mailto:${MAIL}`}>{MAIL}</a></p>
      </section>
      <section>
        <h2><L ko="자주 묻는 질문" en="Frequently asked" /></h2>
        <ul className={c('faq')}>
          {FAQ.map(([q, a], i) => (
            <li key={i} className={open === i ? c('on') : undefined}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}><span><L ko={q.ko} en={q.en} /></span><i /></button>
              <div><LB as="p" ko={a.ko} en={a.en} /></div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2><L ko="만든 곳 · 라이선스" en="Credits and licenses" /></h2>
        <ul>
          <li><L ko="서체: 고운바탕(Gowun Batang), 나눔손글씨 붓(Nanum Brush Script) — SIL Open Font License 1.1" en="Fonts: Gowun Batang, Nanum Brush Script — SIL Open Font License 1.1" /></li>
          <li><L ko="3D: three.js — MIT License" en="3D: three.js — MIT License" /></li>
          <li><L ko="앱 래핑: Capacitor — MIT License · 결제: cordova-plugin-purchase — MIT License" en="App wrapper: Capacitor — MIT License · Purchases: cordova-plugin-purchase — MIT License" /></li>
          <li><L ko="인물·배경·책 그림은 AI 도구로 그린 삽화입니다." en="Character, background and book artwork are illustrations made with AI tools." /></li>
        </ul>
      </section>
    </LegalLayout>
  );
}
