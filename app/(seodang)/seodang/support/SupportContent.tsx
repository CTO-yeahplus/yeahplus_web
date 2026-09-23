'use client';

/* 성어서당 고객 지원.
   원본 폴더의 support.html 은 공유되지 않아, 랜딩 문안과 앱 동작을 기준으로 새로 썼다.
   ⚠️ 이 주소가 App Store Connect 의 지원 URL 이다. */

import Link from 'next/link';
import { MAIL, useDocTitle, useLang } from '../i18n';

export default function SupportContent() {
  const { L } = useLang();
  useDocTitle('고객 지원 — 성어서당', 'Support — Seodang');

  const qa = [
    {
      q: L('어떤 아이에게 맞나요?', 'Who is it for?'),
      a: L(
        '초등 3~6학년을 기준으로 만들었습니다. 이야기는 소리 내어 읽어 주기 좋은 길이이고, 한자는 획순 시범을 보고 따라 쓰기 때문에 한자를 처음 접하는 아이도 할 수 있습니다.',
        'It is built for ages 9–12. The stories are short enough to read aloud together, and because every character is demonstrated stroke by stroke, a child meeting Chinese characters for the first time can follow along.'
      ),
    },
    {
      q: L('무엇이 들어 있나요?', 'What is included?'),
      a: L(
        '사자성어 60편, 장면 삽화 242장, 획순 시범 한자 186자가 앱 안에 모두 들어 있습니다. 추가로 내려받을 것이 없습니다.',
        'Sixty idioms, 242 scene illustrations and 186 characters with stroke-order demonstrations — all bundled in the app, with nothing extra to download.'
      ),
    },
    {
      q: L('광고나 추가 결제가 있나요?', 'Are there ads or extra purchases?'),
      a: L(
        '없습니다. 배너도 영상 광고도 없고, 한 번 구매하면 60편 전부를 쓸 수 있습니다. 앱 안에서 무언가를 더 사라고 하지 않습니다.',
        'No. There are no banners and no video ads, and one purchase unlocks all 60 stories. The app never asks the child to buy anything.'
      ),
    },
    {
      q: L('인터넷이 없어도 되나요?', 'Does it need an internet connection?'),
      a: L(
        '필요 없습니다. 비행기 모드에서도 똑같이 동작합니다. 차 안이나 비행기에서도 그대로 쓸 수 있어요.',
        'It does not. Everything works the same in airplane mode — in the car or on a plane.'
      ),
    },
    {
      q: L('아이의 기록이 어딘가로 전송되나요?', 'Is my child’s activity sent anywhere?'),
      a: L(
        '아니요. 계정이 없고, 어떤 정보도 모으지 않습니다. 읽은 곳과 모은 성어 카드는 기기 안에만 남습니다.',
        'No. There are no accounts and nothing is collected. Reading progress and collected cards stay on the device.'
      ),
    },
    {
      q: L('기기를 바꾸면 기록이 옮겨지나요?', 'Does progress move to a new device?'),
      a: L(
        '기록은 기기 안에만 저장되므로 자동으로 옮겨지지 않습니다. 구매는 같은 Apple ID 라면 App Store 에서 다시 내려받아 그대로 쓸 수 있습니다.',
        'Progress is stored on the device only, so it does not transfer automatically. The purchase itself follows your Apple ID — download the app again from the App Store and it is yours.'
      ),
    },
    {
      q: L('iPad 에서도 쓸 수 있나요?', 'Does it work on iPad?'),
      a: L(
        '네. iPhone 과 iPad 모두에서 쓸 수 있습니다. 따라 쓰기는 손가락으로도, Apple Pencil 로도 됩니다.',
        'Yes, on both iPhone and iPad. Tracing works with a finger or with Apple Pencil.'
      ),
    },
    {
      q: L('따라 쓰기가 자꾸 다시 쓰라고 해요.', 'Tracing keeps asking my child to write it again.'),
      a: L(
        '획을 하나하나 확인하기 때문에, 한 획이라도 빠지거나 방향이 다르면 다시 쓰자고 합니다. 붓선생의 획순 시범을 한 번 더 본 뒤에 천천히 그어 보게 해 주세요.',
        'Every stroke is checked, so a missing stroke or one drawn in the wrong direction prompts a retry. Watch Master Brush’s demonstration once more and draw it slowly.'
      ),
    },
    {
      q: L('선택한 답이 틀리면 어떻게 되나요?', 'What if my child picks the “wrong” answer?'),
      a: L(
        '틀린 선택은 없습니다. 무엇을 고르든 붓선생이 생각을 이어 주고, 그다음에 옛 책이 실제로 어떻게 되었는지 알려 줍니다.',
        'There is no wrong answer. Whatever the child picks, Master Brush carries the thought forward, and then the classic tells what actually happened.'
      ),
    },
    {
      q: L('환불은 어떻게 하나요?', 'How do I get a refund?'),
      a: L(
        'App Store 결제의 환불은 Apple 이 처리합니다. reportaproblem.apple.com 에서 신청해 주세요.',
        'Refunds for App Store purchases are handled by Apple. Please request one at reportaproblem.apple.com.'
      ),
    },
  ];

  return (
    <div className="sd-wrap sd-doc">
      <h1>{L('고객 지원', 'Support')}</h1>
      <p className="sd-meta">
        {L('무엇이든 물어보세요 — 메일은 전부 읽습니다.', 'Ask us anything — we read every email.')}
      </p>

      <div className="sd-callout">
        <p>
          <strong>{L('문의', 'Contact')}</strong> ·{' '}
          <a
            className="sd-mailto"
            href={`mailto:${MAIL}?subject=${encodeURIComponent('[성어서당] ' + L('문의', 'Support'))}`}
          >
            {MAIL}
          </a>
        </p>
        <p>
          {L(
            '문제를 알려주실 때 기기 종류(iPhone·iPad)와 iOS 버전을 함께 적어 주시면 훨씬 빨리 고칠 수 있습니다.',
            'When reporting a problem, including your device (iPhone or iPad) and iOS version helps us fix it much faster.'
          )}
        </p>
      </div>

      <h2>{L('자주 묻는 질문', 'Frequently asked questions')}</h2>
      <div>
        {qa.map((item, i) => (
          <details className="sd-qa" key={i} open={i === 0}>
            <summary>{item.q}</summary>
            <div className="sd-a">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>

      <p className="sd-meta" style={{ marginTop: 30 }}>
        <Link href="/seodang/privacy">{L('개인정보 처리방침', 'Privacy Policy')}</Link>
        {' · '}
        <Link href="/seodang">{L('성어서당 홈', 'Seodang home')}</Link>
      </p>
    </div>
  );
}
