'use client';

/* 이 주소가 App Store Connect 의 지원 URL 이다 (https://www.yeahplus.co.kr/onetake/support).
   설정 이름은 앱 화면 그대로 — 설정(콜 시트) 부서 탭: 운전 STUNT · 카메라 CAMERA · 소리 SOUND · 현장 SET (APLUS/drift/index.html). */

import { EMAIL } from '../i18n';

const FAQ: { q: [string, string]; a: [string, string] }[] = [
  {
    q: ['어떻게 조작하나요?', 'How do I drive?'],
    a: [
      '화면 왼쪽 절반을 끌어 방향을 틀고, 오른쪽의 GAS(가속) · 사이드 · 브레이크를 누릅니다. 손을 놓아도 미끄러짐이 이어지는 것은 의도한 것입니다. 처음이라면 타이틀의 [리허설](1분 연습)부터 해 보세요.',
      'Drag on the left half of the screen to steer; on the right, press GAS, the handbrake and the brake. The slide carrying on after you let go is intended. If you are new, start with Rehearsal (a one-minute practice) on the title screen.',
    ],
  },
  {
    q: ['폰을 기울여서 조향할 수 있나요?', 'Can I steer by tilting the phone?'],
    a: [
      '설정 › 운전 › 조향을 &lsquo;기울이기&rsquo;로 바꾸면 폰을 운전대처럼 돌려 조향합니다(왼손 사이드·브레이크, 오른손 GAS). 촬영을 시작할 때 쥔 자세가 가운데이고, 민감도는 &lsquo;기울이기 민감도&rsquo;에서 고릅니다. 센서 값은 조향에만 쓰고 어디에도 보내지 않습니다.',
      'Set Settings › Stunt › Steering to Tilt and turn the phone like a wheel (handbrake and brake on the left, GAS on the right). The way you hold the phone when the take starts is centre; choose how sharp it is in Tilt sensitivity. The sensor reading is used for steering only and is never sent anywhere.',
    ],
  },
  {
    q: ['폰이 뜨거워지거나 배터리가 빨리 닳아요', 'My phone gets warm or the battery drains fast'],
    a: [
      '설정 › 카메라 › &lsquo;절전&rsquo;을 켜면 경기도 30fps 로 그리고 빛 번짐을 끕니다. &lsquo;화질&rsquo;을 보통·낮음으로 내리거나 &lsquo;시네마 렌즈&rsquo;를 끄는 것도 도움이 됩니다. &lsquo;자동 화질&rsquo;은 느려지면 스스로 화질을 낮춥니다.',
      'Turn on Settings › Camera › Power saving: races draw at 30 fps and bloom is off. Lowering Quality or turning off Cinema lens also helps. Auto quality lowers the quality by itself when things slow down.',
    ],
  },
  {
    q: ['장소 평생권을 샀는데 다른 기기에서 잠겨 있어요', 'I bought the All Locations pass but another device is locked'],
    a: [
      '같은 Apple ID 로 로그인한 기기에서 설정 › 현장 › &lsquo;구입 복원&rsquo;을 누르세요. 가족 공유도 됩니다. 한 번 열린 기기에서는 비행기 모드에서도 열려 있습니다.',
      'On a device signed in with the same Apple ID, tap Settings › Set › Restore Purchases. Family Sharing works too. Once unlocked, a device stays unlocked even in airplane mode.',
    ],
  },
  {
    q: ['환불은 어떻게 하나요?', 'How do I get a refund?'],
    a: [
      '결제는 Apple 이 처리하므로 환불도 Apple 에 요청합니다: reportaproblem.apple.com 에서 원 테이크 구입을 고르세요. 회사는 결제 정보를 볼 수 없습니다.',
      'Apple handles payment, so refunds are requested from Apple: choose the ONE TAKE purchase at reportaproblem.apple.com. We cannot see payment details.',
    ],
  },
  {
    q: ['다음 장소가 열리지 않아요', 'The next location won’t open'],
    a: [
      '붉은 흙 놀이터는 야드에서 B 등급 이상을 받으면 열립니다. 언덕 도시부터는 장소 평생권으로 열리고, 권장 순서가 있습니다. 모든 장소의 모범 테이크는 사지 않아도 타이틀의 [모범 테이크]에서 볼 수 있습니다.',
      'Red Dirt opens after a B grade or better at The Yard. From Hilltown on, locations open with the All Locations pass, in a suggested order. The master take of every location can be watched from Master take on the title screen without buying.',
    ],
  },
  {
    q: ['기록이 사라졌어요', 'My records are gone'],
    a: [
      '기록은 기기 안에만 저장됩니다. 앱을 지우거나 기기를 바꾸면 기록은 옮겨지지 않고, 회사도 되살릴 수 없습니다(서버가 없습니다). 장소 평생권은 &lsquo;구입 복원&rsquo;으로 다시 열립니다.',
      'Records are kept only on your device. Deleting the app or changing devices does not carry them over, and we cannot restore them (there is no server). The All Locations pass comes back with Restore Purchases.',
    ],
  },
  {
    q: ['찍은 판을 영상으로 남길 수 있나요?', 'Can I keep a take as a video?'],
    a: [
      '결과 화면의 [릴 뽑기]를 누르면 방금 본 편집본이 세로 영상(인스타 릴스·쇼츠 크기)으로 만들어집니다. 끝에는 슬레이트가 붙고, 크게 부딪힌 판은 [NG 릴]도 뽑을 수 있습니다. [포스터]는 그 판의 가장 큰 순간 한 장입니다. 슬레이트·포스터의 이름은 설정 › 현장 › &lsquo;감독 이름&rsquo;에서 적습니다. 영상은 기기 안에서 만들어지고, 공유 화면에서 고른 곳으로만 갑니다.',
      'Tap Reel on the results screen and the edit you just watched becomes a vertical video (Reels / Shorts size) with a slate at the end; a take with a big crash can also make an NG reel. Poster is one frame from the biggest moment. Set the name on the slate and poster in Settings › Set › Director name. Everything is made on your device and goes only where you send it.',
    ],
  },
  {
    q: ['친구에게 도전장을 보내려면?', 'How do I dare a friend?'],
    a: [
      '결과 화면의 [도전장]을 누르면 링크가 만들어집니다. 받은 사람은 링크를 열어 브라우저에서 그 판의 편집본을 보고, 앱이 있으면 [앱에서 도전]으로 같은 장소에서 반투명 차(도전장)와 함께 달립니다. 링크는 짧은 주소(yeahplus.co.kr/onetake/c/…)이며, 그 판 기록은 보낸 날부터 7일 동안만 열립니다 — 지난 도전장은 새로 보내 주세요. 연결이 안 될 때는 기록을 담은 긴 링크가 대신 만들어지며, 메신저에서 잘리면 끝까지 복사해 붙여 넣어 주세요.',
      'Tap Dare on the results screen to make a link. Your friend opens it to watch your take in the browser, and with the app installed taps Take the dare to race your translucent car on the same location. The link is a short address (yeahplus.co.kr/onetake/c/…) and the take stays available for 7 days from sending — send a new dare after that. Without a connection the app makes a long link that carries the take instead; if a messenger cuts it, copy and paste the whole thing.',
    ],
  },
  {
    q: ['오늘의 촬영과 순위는 무엇인가요?', 'What are Today’s Shoot and the leaderboards?'],
    a: [
      '장소 카드 줄 맨 앞의 &lsquo;오늘의 촬영&rsquo;은 한국 시각 자정마다 바뀌는 하루 한 판입니다. 모두 같은 장소에서 같은 지시(짧은 필름 · 무사고 · 롱테이크 · S 컷만)로 찍습니다. Game Center 에 로그인해 있으면 오늘의 촬영 점수와 장소별 최고 점수가 [순위]에 올라갑니다.',
      'Today’s Shoot, the first card in the location row, is one take a day that changes at midnight Korea time: everyone shoots the same location with the same order (short film, no crashes, long take, S cuts only). If you are signed in to Game Center, your Today’s Shoot score and your best score for each location go to the Leaderboards.',
    ],
  },
  {
    q: ['소리나 음악을 줄이고 싶어요', 'I want less sound or music'],
    a: [
      '설정 › 소리에서 &lsquo;소리&rsquo; · &lsquo;음악&rsquo;을 따로 끄고, &lsquo;음악 크기&rsquo;를 고릅니다. 이어폰을 쓰면 360도로 놓인 소리를 더 잘 들을 수 있습니다.',
      'In Settings › Sound, turn Sound and Music off separately and choose Music volume. Headphones bring out the 360° sound.',
    ],
  },
  {
    q: ['눈이 내리거나 호박이 나와요', 'There is snow, or pumpkins, on the set'],
    a: [
      '기기 날짜에 맞춰 장소가 꾸며지는 시즌 테마입니다(크리스마스 · 새해 · 할로윈 · 여름). 코스와 점수는 바뀌지 않습니다. 설정 › 현장 › &lsquo;시즌 테마&rsquo;에서 끌 수 있습니다.',
      'That is the seasonal dressing, set by your device date (Christmas, New Year, Halloween, summer). Courses and scores do not change. Turn it off in Settings › Set › Seasonal theme.',
    ],
  },
];

export default function SupportContent() {
  return (
    <div className="ot-wrap ot-doc">
      <div className="ot-doc-head">
        <h1>
          지원
          <br />
          Support
        </h1>
        <div className="ot-sub">원 테이크 · ONE TAKE</div>
      </div>

      <section>
        <h2>자주 묻는 질문 · FAQ</h2>
        {FAQ.map((f) => (
          <details key={f.q[1]}>
            <summary>
              <span data-l="ko">{f.q[0]}</span>
              <span data-l="en">{f.q[1]}</span>
            </summary>
            <div className="ot-ans">
              <div dangerouslySetInnerHTML={{ __html: f.a[0] }} />
              <div className="ot-en" dangerouslySetInnerHTML={{ __html: f.a[1] }} />
            </div>
          </details>
        ))}
      </section>

      <section>
        <h2>문의 · Contact</h2>
        <p>
          고장, 제안, 구입 문제 모두 이메일로 보내 주십시오. 기기 이름과 iOS 버전, 어느 장소에서 생겼는지 적어 주시면 빨리
          찾을 수 있습니다. 설정 › 현장 맨 아래에 앱 빌드 번호가 있습니다.
        </p>
        <div className="ot-en-block">
          <p>
            Bugs, ideas and purchase problems — please email us. Your device model, iOS version and the location where it
            happened help us find it fast. The app build number is at the bottom of Settings › Set.
          </p>
        </div>
        <a className="ot-mail" href={`mailto:${EMAIL}?subject=ONE%20TAKE`}>
          {EMAIL}
        </a>
      </section>
    </div>
  );
}
