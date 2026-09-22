'use client';

/* 원본 NEXTGEN_CINEMATIC/site/src/pages/Support.jsx — 문안은 한 글자도 고치지 않았다.
   바뀐 것: 문의 주소(contact@).
   ⚠️ 이 주소가 App Store Connect 의 지원 URL 이다. */

import { MAIL, useDocTitle, useLang } from '../i18n';

export default function SupportContent() {
  const { L } = useLang();
  useDocTitle('고객 지원 — CineLook', 'Support — CineLook');

  const qa = [
    {
      q: L('무료로는 어디까지 쓸 수 있나요?', 'What can I do for free?'),
      a: L('필름카메라 3종, 영화 필터 9종, 프레임 5종, 4컷 스트립을 기간 제한 없이, 워터마크 없이 쓸 수 있습니다. 잠긴 템플릿도 미리보기는 자유이며, 저장할 때만 Pro 가 필요합니다.',
           'Three film cameras, nine movie filters, five frames and the booth strip — with no time limit and no watermark. Locked templates can be previewed freely; Pro is only needed when you save them.'),
    },
    {
      q: L('4컷 부스는 어떻게 쓰나요?', 'How does the photo booth work?'),
      a: L('홈에서 "4컷 부스"를 누르고 셔터를 한 번 누르면, 컷마다 3·2·1 카운트다운 후 네 장을 연속으로 찍어 스트립으로 만들어 줍니다. 편집 화면의 프레임 › 레이아웃에서 블랙 스트립 · 2×2 그리드 · 듀오로 바꿀 수 있어요(스트립은 무료, 나머지는 Pro).',
           'Tap “Photo Booth” on the home screen and press the shutter once: after a 3-2-1 countdown before each shot, it takes four photos in a row and lays them out as a strip. In the editor, Frames › Layouts switches to the black strip, 2×2 grid or duo (the strip is free; the others are Pro).'),
    },
    {
      q: L('앨범에 있는 사진으로 4컷을 만들 수 있나요?', 'Can I make a four-shot layout from photos in my library?'),
      a: L('네. 사진을 불러온 뒤 프레임 › 레이아웃에서 원하는 레이아웃을 고르면 사진 선택 화면이 열립니다. 필요한 장수만큼 골라 주세요.',
           'Yes. Import a photo, then choose a layout under Frames › Layouts — the photo picker opens so you can pick the rest of the shots.'),
    },
    {
      q: L('레이아웃을 쓰다가 프레임을 고르면 한 장짜리로 바뀌어요.', 'Choosing a frame turns my layout back into a single photo.'),
      a: L('프레임(인스턴트 · 티켓 · 매거진 커버 등)은 사진 한 장을 꾸미는 기능이라, 프레임을 고르면 4컷 레이아웃이 해제됩니다. 4컷을 유지하려면 레이아웃 탭에서 골라 주세요.',
           'Frames (instant, ticket, magazine cover and so on) dress up a single photo, so picking one turns the four-shot layout off. To keep four shots, choose from the Layouts tab instead.'),
    },
    {
      q: L('CineLook Pro 는 구독인가요?', 'Is CineLook Pro a subscription?'),
      a: L('아니요. 한 번 결제하면 평생 쓰는 앱 내 구매(비소모성)입니다. 자동 갱신도, 추가 요금도 없습니다. 앞으로 추가되는 템플릿도 포함됩니다.',
           'No. It is a one-time, non-consumable in-app purchase. It never renews and there are no extra charges. Templates added later are included.'),
    },
    {
      q: L('구매를 복원하고 싶어요 / 기기를 바꿨어요.', 'How do I restore my purchase on a new phone?'),
      a: L('편집 화면 오른쪽 위 ⚙ 설정 → 구매 복원을 누르세요. 구매할 때와 같은 Apple ID 로 로그인되어 있어야 합니다. 같은 Apple ID 를 쓰는 기기라면 추가 결제 없이 모두 사용할 수 있습니다.',
           'Tap ⚙ Settings (top right of the editor) → Restore Purchase, signed in with the Apple ID you bought it with. Any device on that Apple ID can use Pro at no extra cost.'),
    },
    {
      q: L('결제했는데 Pro 가 열리지 않아요.', 'I paid but Pro is still locked.'),
      a: L('① 구매 복원을 한 번 눌러 주세요 ② 앱을 완전히 종료한 뒤 다시 열어 주세요 ③ 그래도 안 되면 Apple 영수증 메일의 주문 번호(Order ID)를 적어 메일 주세요. 결제 정보는 Apple 이 관리하므로 저희는 카드 정보를 받지 않습니다.',
           'Tap Restore Purchase, then fully close and reopen the app. If it is still locked, email us the Order ID from your Apple receipt. Apple handles payments, so we never need your card details.'),
    },
    {
      q: L('환불은 어떻게 하나요?', 'How do I get a refund?'),
      a: L('App Store 결제의 환불은 Apple 이 처리합니다. reportaproblem.apple.com 에서 신청해 주세요.',
           'Refunds for App Store purchases are handled by Apple. Please request one at reportaproblem.apple.com.'),
    },
    {
      q: L('공유 카드와 레시피 코드는 뭔가요?', 'What are share cards and recipe codes?'),
      a: L('편집 화면 위의 [공유]를 누르면 사진이 스토리(9:16)·피드(4:5) 카드로 만들어집니다. 카드에 적힌 CL- 로 시작하는 레시피 코드를 친구가 홈 화면의 "# 레시피 코드"에 입력하면 같은 카메라·필터·프레임이 적용돼요. 공유할 때 코드와 해시태그가 클립보드에 복사되니 캡션에 붙여 넣기만 하면 됩니다.',
           'Tap Share at the top of the editor to turn your photo into a story (9:16) or feed (4:5) card. Friends can enter the CL- recipe code on the card under “# Recipe Code” on the home screen to get the same camera, filter and frame. When you share, the code and hashtags are copied to your clipboard, ready to paste into your caption.'),
    },
    {
      q: L('카드의 "Made with CineLook" 배지를 없앨 수 있나요?', 'Can I remove the “Made with CineLook” badge?'),
      a: L('무료 버전의 공유 카드에는 작은 배지가 들어갑니다. CineLook Pro 에서는 공유 시트의 배지 버튼으로 끌 수 있어요. 앨범에 저장하는 사진에는 무료·Pro 모두 워터마크가 없습니다.',
           'Share cards in the free version include a small badge; with CineLook Pro you can turn it off in the share sheet. Photos you save to your library never carry a watermark, free or Pro.'),
    },
    {
      q: L('테마는 어떻게 바꾸나요?', 'How do I change the theme?'),
      a: L('홈의 "🎨 테마" 또는 설정 › 테마에서 고릅니다. 스탠다드는 무료이고, 두들·카툰·그래피티는 Pro 테마예요. Pro 테마도 시트 안에서 미리 입어볼 수 있습니다.',
           'Use “🎨 Theme” on the home screen or Settings › Theme. Standard is free; Doodle, Cartoonic and Graffiti are Pro themes you can try on right in the sheet.'),
    },
    {
      q: L('오래된 필름처럼 거칠게 만들고 싶어요.', 'I want an old, grainy film look.'),
      a: L('필터 탭의 "올드필름" 무드를 골라 보세요. 거친 입자, 먼지, 가는 기스, 빛 번짐이 들어간 5가지 룩이 있고, 그중 "Home Movie"는 무료입니다.',
           'Try the Vintage mood in the Filters tab: five looks with coarse grain, dust, fine scratches and halation. “Home Movie” is free.'),
    },
    {
      q: L('제 사진이 어딘가로 전송되나요?', 'Are my photos uploaded anywhere?'),
      a: L('아니요. 필터·조명·프레임 처리는 전부 아이폰 안에서 이루어지고, 앱에는 네트워크 기능 자체가 없습니다. 저희를 포함해 누구도 사진에 접근할 수 없습니다.',
           'No. Filters, lighting and frames are processed entirely on your iPhone, and the app has no networking at all. Nobody — including us — can access your photos.'),
    },
    {
      q: L('원본 사진이 바뀌나요?', 'Does it change my original photo?'),
      a: L('바뀌지 않습니다. 저장하면 결과물이 사진 앱에 새 사진으로 추가됩니다. 사진 권한도 "추가 전용"이라 앨범을 읽거나 수정하지 않습니다.',
           'Never. Saving adds the result to Photos as a new picture. Photo access is add-only, so the app cannot read or modify your library.'),
    },
    {
      q: L('카메라 권한을 거절하면 못 쓰나요?', 'What if I decline camera access?'),
      a: L('사진 불러오기로 모든 필터·카메라 효과·프레임을 그대로 쓸 수 있습니다. 앱에서 바로 촬영하려면 설정 → CineLook → 카메라를 켜 주세요.',
           'You can still import photos and use every filter, camera effect and frame. To shoot inside the app, turn on Settings → CineLook → Camera.'),
    },
    {
      q: L('AI 조명이 어색하게 나와요.', 'The AI light looks off.'),
      a: L('인물이 또렷하게 보이는 사진에서 가장 자연스럽습니다. 조명 패널에서 방향 점을 옮기고 세기·크기를 낮춰 보세요. 인물이 없는 사진에서는 장면 전체에 빛이 들어갑니다. 조명은 한 장짜리 사진에서만 쓸 수 있습니다(레이아웃 제외).',
           'It works best when a person is clearly visible. In the Light panel, move the direction point and lower the strength or size. Without a person, the light falls on the whole scene. Light is available for single photos only, not layouts.'),
    },
    {
      q: L('날짜 스탬프를 끄고 싶어요.', 'How do I turn off the date stamp?'),
      a: L('카메라 탭의 "날짜 스탬프" 버튼으로 켜고 끌 수 있습니다. 디카 화면·매거진 커버처럼 자체 날짜가 들어가는 프레임에서는 스탬프가 겹치지 않도록 자동으로 빠집니다.',
           'Use the Date Stamp button in the Cameras tab. Frames that show their own date, such as the digicam screen and magazine cover, leave the stamp out automatically.'),
    },
    {
      q: L('저장한 사진의 해상도는요?', 'What resolution are saved photos?'),
      a: L('한 장짜리 사진은 원본 해상도를 유지해 긴 변 최대 4096px 로 저장됩니다. 4컷 레이아웃은 긴 변 3600px 입니다.',
           'Single photos keep their original resolution, up to 4096 px on the long side. Layouts are saved at 3600 px on the long side.'),
    },
  ];

  return (
    <div className="cl-wrap cl-narrow cl-doc">
      <h1>{L('고객 지원', 'Support')}</h1>
      <p className="cl-meta">{L('무엇이든 물어보세요 — 메일은 전부 읽습니다.', 'Ask us anything — we read every email.')}</p>

      <div className="cl-callout">
        <p>
          <strong>{L('문의', 'Contact')}</strong> ·{' '}
          <a className="cl-mailto" href={`mailto:${MAIL}?subject=${encodeURIComponent('[CineLook] ' + L('문의', 'Support'))}`}>{MAIL}</a>
        </p>
        <p>{L('버그를 알려주실 때 아이폰 기종과 iOS 버전을 함께 적어 주시면 훨씬 빨리 고칠 수 있습니다.',
              'When reporting a bug, including your iPhone model and iOS version helps us fix it much faster.')}</p>
      </div>

      <h2>{L('자주 묻는 질문', 'Frequently asked questions')}</h2>
      <div className="cl-faq">
        {qa.map((item, i) => (
          <details className="cl-qa" key={i} open={i === 0}>
            <summary>{item.q}</summary>
            <div className="cl-a"><p>{item.a}</p></div>
          </details>
        ))}
      </div>
    </div>
  );
}
