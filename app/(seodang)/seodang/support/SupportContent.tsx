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
        '없습니다. 배너도 영상 광고도 없고, 한 번 구매하면 60편 전부를 쓸 수 있습니다. 앞으로 저희가 만들어 더하는 오리지널 이야기도 추가 결제 없이 그대로 열립니다. 다만 캐릭터·브랜드와 함께 만드는 제휴 콘텐츠는 기간 한정 무료 이벤트나 별도 상품으로 제공될 수 있습니다. 어느 쪽이든 앱 안에서 아이에게 무언가를 사라고 하지 않습니다.',
        'No. There are no banners and no video ads, and one purchase unlocks all 60 stories. Original stories we add later unlock at no extra cost. Content made with outside characters or brands may come as a limited-time free event or as a separate item. Either way, the app never asks a child to buy anything.'
      ),
    },
    {
      q: L('형제가 같이 쓸 수 있나요?', 'Can my other children use it too?'),
      a: L(
        'App Store 가족 공유를 켜 두었습니다. 한 번 구매하면 같은 가족 그룹(본인 포함 최대 6명)의 기기에서 함께 쓸 수 있어, 아이마다 따로 살 필요가 없습니다. 설정 → 가족에서 가족 공유를 켜 두시면 됩니다. 학습 기록은 기기마다 따로 쌓이므로, 형제가 각자의 속도로 읽어 나갈 수 있습니다.',
        'Family Sharing is switched on. One purchase covers the devices in your family group — up to six people including you — so you do not need a copy per child. Turn Family Sharing on under Settings → Family. Progress is kept per device, so each child reads at their own pace.'
      ),
    },
    {
      q: L('인터넷이 없어도 되나요?', 'Does it need an internet connection?'),
      a: L(
        '필요 없습니다. 이야기·삽화·획순 자료·글꼴이 모두 앱 안에 들어 있어 비행기 모드에서도 똑같이 동작합니다. 앱이 개발자에게 보내는 통신은 없고, 인터넷을 쓰는 것은 켜 두셨을 때의 iCloud 동기화뿐입니다.',
        'It does not. The stories, illustrations, stroke data and fonts are all bundled, so it works the same in airplane mode. The app makes no network requests to the developer; the only thing that uses the internet is iCloud sync, when you leave it on.'
      ),
    },
    {
      q: L('아이의 기록이 어딘가로 전송되나요?', 'Is my child’s activity sent anywhere?'),
      a: L(
        '개발자에게는 아무것도 전송되지 않습니다. 계정이 없고, 분석 도구도 광고도 없으며 개발자 서버 자체가 없습니다. 진행 상황은 기기에 저장되고, 같은 Apple 계정 기기끼리 이어 보도록 이용자 본인의 iCloud 에도 함께 보관됩니다. 이 정보에는 개발자가 접근할 수 없습니다.',
        'Nothing is sent to the developer. There are no accounts, no analytics, no ads — and no developer server at all. Progress is stored on the device and, so it can carry over between devices on the same Apple Account, also in the user’s own iCloud, which the developer cannot access.'
      ),
    },
    {
      q: L('기기를 바꾸면 기록이 옮겨지나요?', 'Does progress move to a new device?'),
      a: L(
        '같은 Apple 계정을 쓰는 기기끼리는 iCloud 로 자동으로 맞춰집니다(모은 성어·엽전·최고 기록·책장 꾸미기). 계정이 다르거나 iCloud 를 끄고 쓰신다면, 책장 화면의 "진행 상황 지키기"에서 백업 파일을 만들어 새 기기에서 불러오시면 됩니다. 구매 자체는 같은 Apple 계정이라면 App Store 에서 다시 내려받아 그대로 쓸 수 있습니다.',
        'Devices signed in to the same Apple Account are kept in step through iCloud — idioms, coins, best score and shelf theme. For a different account, or with iCloud turned off, use “Keep my progress” on the shelf screen to export a backup file and import it on the new device. The purchase itself follows your Apple Account: download the app again from the App Store and it is yours.'
      ),
    },
    {
      q: L('iCloud 동기화를 끄고 싶어요.', 'Can I turn iCloud sync off?'),
      a: L(
        '기기의 설정 → Apple 계정 → iCloud 에서 성어서당의 iCloud 사용을 끄시면 됩니다. 끄더라도 앱은 그대로 동작하고, 진행 상황은 그 기기 안에만 남습니다. iCloud 에 저장되는 내용은 모은 성어·엽전·설정값뿐이고, 개발자는 이 정보에 접근할 수 없습니다.',
        'Turn iCloud off for Seodang in Settings → Apple Account → iCloud. The app keeps working and progress simply stays on that device. What iCloud holds is only the idioms, coins and settings — and the developer cannot access any of it.'
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
      q: L('이야기를 읽어 줄 수도 있나요?', 'Can the app read the story aloud?'),
      a: L(
        '네. 이야기 화면의 "읽어 주기"를 누르면 기기에 내장된 한국어 음성이 읽어 줍니다. 늘 읽어 주도록 켜 둘 수도 있어요. 목소리를 녹음하거나 어딘가로 보내지 않습니다.',
        'Yes. Tap “Read aloud” on the story screen and the Korean voice built into your device reads it. You can leave it on for every story. Nothing is recorded or sent anywhere.'
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
        <Link href="/seodang/terms">{L('이용 약관', 'Terms of Use')}</Link>
        {' · '}
        <Link href="/seodang">{L('성어서당 홈', 'Seodang home')}</Link>
      </p>
    </div>
  );
}
