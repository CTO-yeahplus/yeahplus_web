'use client';

/* 이 주소가 App Store Connect 의 지원 URL 이다 (https://www.yeahplus.co.kr/rocketparking/support).
   메뉴 이름은 앱 화면 그대로 — ☰ 메뉴(APLUS/ARThing/App/RocketReturn/ControlsView.swift). */

import { EMAIL } from '../i18n';

const FAQ: { q: [string, string]; a: [string, string] }[] = [
  {
    q: ['패드가 놓이지 않아요', 'The pad won’t go down'],
    a: [
      '밝은 곳에서 무늬가 있는 평평한 면(나뭇결 책상, 벤치, 타일 바닥)을 비추고 폰을 천천히 좌우로 움직여 주세요. 면이 잡히면 탭해서 패드를 놓습니다. 유리 · 거울 · 무늬 없는 흰 책상이나 어두운 곳은 잘 잡히지 않습니다. 다른 자리로 옮기려면 ☰ 메뉴 › &lsquo;패드 옮기기&rsquo;.',
      'In good light, point at a flat surface with some texture (a wood desk, a bench, a tiled floor) and move the phone slowly side to side. Once the surface is found, tap to place the pad. Glass, mirrors, plain white desks and dark rooms are hard to track. To move it, use ☰ menu › Move pad.',
    ],
  },
  {
    q: ['어떻게 세우나요?', 'How do I land it?'],
    a: [
      '오른손 엄지로 출력 띠를 밉니다. 줄어드는 고리가 판정 고리에 닿는 순간 끝까지 밀면 점화됩니다 — 점화는 한 번뿐입니다. 엔진은 최소 출력에서도 무게보다 세서 떠 있을 수 없고, 점화 뒤 40% 선 아래로 내리면 엔진이 꺼져 다시 켤 수 없습니다. 처음이라면 홈의 [모범 착륙]과 [훈련 3단계]부터 해 보세요. &lsquo;쉬움&rsquo;은 점화만 맞추면 감속 · 자세를 관제가 맡습니다.',
      'Push the throttle strip with your right thumb. When the shrinking ring meets the pad ring, push it all the way — that is your one ignition. Even at minimum the engine out-pushes its weight, so it cannot hover, and dropping below the 40% line after ignition shuts it off for good. New to it? Start with Model landing and the 3-step training on the home screen. On Easy, you only time the ignition; control handles the rest.',
    ],
  },
  {
    q: ['꼭 걸어 다녀야 하나요?', 'Do I have to walk around?'],
    a: [
      '아니요. 앉거나 선 채로 됩니다. 점화 직전 폰을 한 걸음 옆으로 옮겨 패드와 부스터가 겹치는지 보는 몸짓이면 충분합니다. 주변을 살피고, 차도나 계단 가까이에서는 하지 마세요.',
      'No. Sit or stand. Shifting the phone a step to the side just before ignition, to see whether the booster lines up with the pad, is all it takes. Watch your surroundings, and don’t play near traffic or stairs.',
    ],
  },
  {
    q: ['폰이 뜨거워져요', 'My phone gets warm'],
    a: [
      'AR 은 카메라와 그래픽을 함께 써서 열이 납니다. ☰ 메뉴에서 &lsquo;물건 뒤로 숨기(가림)&rsquo;와 &lsquo;실제 주변 반사&rsquo;를 끄면 가장 많이 줄어듭니다(둘 다 기본은 꺼짐). 기기가 뜨거워지면 앱이 스스로 효과를 줄입니다. &lsquo;성능 표시&rsquo;를 켜면 fps 와 열 상태가 보입니다.',
      'AR runs the camera and graphics together, so it warms up. Turning off ‘Hide behind objects’ and ‘Real surroundings on the rocket’ in the ☰ menu helps most (both are off by default). When the device gets hot, the app scales back effects by itself. Turn on ‘Performance’ to see fps and heat.',
    ],
  },
  {
    q: ['궤도 알림은 무엇인가요?', 'What is the orbit notification?'],
    a: [
      '[발사]로 쏜 부스터는 궤도에 머뭅니다. 처음 궤도에 들어간 뒤에만 알림 허용을 묻고, 허용하면 기기 안에서 &lsquo;아직 궤도에 있다&rsquo; 알림을 예약합니다(서버를 거치지 않습니다). 24시간 안에 귀환시키지 않으면 궤도를 벗어나 그 기체를 잃습니다. 알림을 거절해도 게임은 그대로 됩니다.',
      'A booster you Launch stays in orbit. The app asks for notifications only after your first orbit, and if you allow them it schedules an on-device ‘still in orbit’ reminder (no server involved). Bring it back within 24 hours or it leaves orbit and is lost. Everything works if you decline.',
    ],
  },
  {
    q: ['평생 주차권을 샀는데 다른 기기에서 잠겨 있어요', 'I bought the Lifetime Parking Pass but another device is locked'],
    a: [
      '같은 Apple ID 로 로그인한 기기에서 ☰ 메뉴 › &lsquo;평생 주차권 · 구입 복원&rsquo;을 누르세요. 도색 · 주차장 컬렉션도 함께 돌아옵니다. 가족 공유도 됩니다.',
      'On a device signed in with the same Apple ID, open ☰ menu › Lifetime Parking Pass · restore. Livery and Parking Lot collections come back too. Family Sharing works.',
    ],
  },
  {
    q: ['환불은 어떻게 하나요?', 'How do I get a refund?'],
    a: [
      '결제는 Apple 이 처리하므로 환불도 Apple 에 요청합니다: reportaproblem.apple.com 에서 로켓주차 구입을 고르세요. 회사는 결제 정보를 볼 수 없습니다.',
      'Apple handles payment, so refunds are requested from Apple: choose the ROCKET PARKING purchase at reportaproblem.apple.com. We cannot see payment details.',
    ],
  },
  {
    q: ['기록 · 주차 수첩이 사라졌어요', 'My records or parking log are gone'],
    a: [
      '미션 기록 · 기체 일지 · 주차 수첩은 기기 안에만 저장됩니다. 앱을 지우거나 기기를 바꾸면 옮겨지지 않고, 회사도 되살릴 수 없습니다(서버가 없습니다). 산 상품은 &lsquo;구입 복원&rsquo;으로 다시 열립니다.',
      'Mission records, the hull log and the parking log are kept only on your device. Deleting the app or changing devices does not carry them over, and we cannot restore them (there is no server). Purchases come back with Restore.',
    ],
  },
  {
    q: ['사진 카드 · 중계 클립은 어디로 가나요?', 'Where do mission cards and broadcast clips go?'],
    a: [
      '착륙하면 미션 카드(사진)와 중계 클립(영상)이 기기 안에서 만들어집니다. 공유 화면에서 고른 곳으로만 가고, &lsquo;이미지 저장&rsquo;을 고를 때만 사진 앱에 추가 권한을 묻습니다. 카드의 장소 이름 · 조종사 이름은 내가 적은 글자입니다.',
      'After a landing the mission card (photo) and broadcast clip (video) are made on your device. They go only where you send them from the share sheet, and the app asks for add-to-Photos permission only when you choose to save. Place and pilot names on the card are what you typed.',
    ],
  },
  {
    q: ['소리나 관제 무전을 끄고 싶어요', 'I want to turn off the sound or the radio'],
    a: [
      '화면 위의 [소리] 버튼이나 ☰ 메뉴 › &lsquo;소리 · 관제 무전&rsquo;에서 끕니다. 관제 음성은 iOS 에 들어 있는 음성 합성이고, 녹음해 보내지 않습니다.',
      'Use the Sound button at the top or ☰ menu › Sound · Control radio. The control voice is iOS’s built-in speech synthesis; nothing is recorded or sent.',
    ],
  },
  {
    q: ['한국어 · 영어를 바꾸려면?', 'How do I switch Korean / English?'],
    a: [
      '처음에는 기기 언어를 따릅니다. ☰ 메뉴 › &lsquo;언어&rsquo;에서 바꿀 수 있습니다.',
      'It follows your device language at first. Change it in ☰ menu › Language.',
    ],
  },
];

export default function SupportContent() {
  return (
    <div className="rp-wrap rp-doc">
      <div className="rp-doc-head">
        <h1>
          지원
          <br />
          Support
        </h1>
        <div className="rp-sub">로켓주차 · ROCKET PARKING</div>
      </div>

      <section>
        <h2>자주 묻는 질문 · FAQ</h2>
        {FAQ.map((f) => (
          <details key={f.q[1]}>
            <summary>
              <span data-l="ko">{f.q[0]}</span>
              <span data-l="en">{f.q[1]}</span>
            </summary>
            <div className="rp-ans">
              <div dangerouslySetInnerHTML={{ __html: f.a[0] }} />
              <div className="rp-en" dangerouslySetInnerHTML={{ __html: f.a[1] }} />
            </div>
          </details>
        ))}
      </section>

      <section>
        <h2>문의 · Contact</h2>
        <p>
          고장, 제안, 구입 문제 모두 이메일로 보내 주십시오. 기기 이름과 iOS 버전, 어떤 자리(책상 · 바닥 등)에서 생겼는지 적어 주시면
          빨리 찾을 수 있습니다.
        </p>
        <div className="rp-en-block">
          <p>
            Bugs, ideas and purchase problems — please email us. Your device model, iOS version and the kind of surface you were
            on (desk, floor…) help us find it fast.
          </p>
        </div>
        <a className="rp-mail" href={`mailto:${EMAIL}?subject=ROCKET%20PARKING`}>
          {EMAIL}
        </a>
      </section>
    </div>
  );
}
