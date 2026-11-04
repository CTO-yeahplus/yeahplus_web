'use client';

/* 이 주소가 App Store Connect 의 지원 URL 이다 (https://www.yeahplus.co.kr/summitbook/support).
   메뉴 이름은 앱 화면 그대로 — 앞 면지의 백업 · 불러오기 · 복원(APLUS/summitbook/src/app.js). */

import Link from 'next/link';
import { EMAIL } from '../i18n';
import { APP } from '../names';

const FAQ: { q: [string, string]; a: [React.ReactNode, React.ReactNode] }[] = [
  {
    q: ['정상에 섰는데 도장 대신 연필로 적혔어요', 'I was at the summit, but it wrote a pencil record instead of a stamp'],
    a: [
      <>
        도장은 정상 좌표에서 150m 안, 위치 정확도가 ±40m 안일 때만 찍힙니다. 이렇게 해 보면 대부분 됩니다.
        <ul className="sb-bullets">
          <li>
            설정 › 개인정보 보호 및 보안 › 위치 서비스 › {APP.ko} 에서 <strong>&lsquo;정확한 위치&rsquo;</strong>가 켜져 있는지 확인. 꺼져 있으면 수백 m 단위로만
            잡혀 도장이 찍히지 않습니다.
          </li>
          <li>정상석 가까이에서, 하늘이 트인 곳에서 누릅니다. 바위 그늘 · 대피소 안은 정확도가 떨어집니다.</li>
          <li>고리가 금빛이 될 때까지 조금 더 오래 누르고 있다가 놓습니다. 손을 떼도 위치는 계속 받습니다.</li>
          <li>그 자리에서 다시 꾹 누르면 됩니다. 같은 날 같은 산 도장은 한 번만 찍힙니다.</li>
        </ul>
        그래도 정상석 바로 앞에서 안 된다면 산 이름과 정상석 자리를 메일로 알려 주십시오. 정상 좌표를 다시 확인합니다.
      </>,
      <>
        A stamp lands only within 150 m of the summit coordinates and with an accuracy of ±40 m or better. This usually fixes it:
        <ul className="sb-bullets">
          <li>
            In Settings › Privacy &amp; Security › Location Services › {APP.en}, check that <strong>Precise Location</strong> is on. Without it, the fix
            is only good to hundreds of metres.
          </li>
          <li>Hold the stamp near the summit stone, under open sky. Rock overhangs and shelters reduce accuracy.</li>
          <li>Keep holding until the ring turns gold, then let go. The fix keeps improving even after you lift your finger.</li>
          <li>Press and hold again on the spot. One stamp per mountain per day.</li>
        </ul>
        If it still fails right at the summit stone, email us the mountain and where the stone is, and we will re-check the coordinates.
      </>,
    ],
  },
  {
    q: ['위치를 묻지 않거나, 거절해 버렸어요', 'It never asked for location, or I declined'],
    a: [
      <>설정 › {APP.ko} › 위치 에서 &lsquo;앱을 사용하는 동안&rsquo;을 고르면 됩니다. 앱은 도장을 누를 때만 위치를 한 번 받고, 밖으로 보내지 않습니다.</>,
      <>In Settings › {APP.en} › Location, choose While Using the App. The app reads location once, only while you hold the stamp, and never sends it anywhere.</>,
    ],
  },
  {
    q: ['기기를 바꿔요. 수첩을 옮길 수 있나요?', 'I’m changing phones. Can I move my notebook?'],
    a: [
      <>
        서버가 없어서 저절로 옮겨지지 않습니다. 수첩을 펼쳐 맨 앞 <strong>앞 면지 › 백업 › 내보내기</strong>로 파일 하나를 만들어 iCloud Drive 등에 두고, 새
        기기의 <strong>앞 면지 › 불러오기</strong>에서 그 파일을 고릅니다. 사진 · 글 · 내 산까지 그대로 옮겨집니다.
      </>,
      <>
        There is no server, so nothing moves by itself. Open the notebook to the <strong>front endpaper › Backup › Export</strong> to make one file, keep
        it somewhere like iCloud Drive, then on the new phone use <strong>front endpaper › Import</strong>. Photos, notes and My Mountains come along.
      </>,
    ],
  },
  {
    q: ['평생권을 샀는데 다른 기기에서 잠겨 있어요', 'I bought the Lifetime pass but another device is locked'],
    a: [
      <>같은 Apple ID 로 로그인한 기기에서 앞 면지의 <strong>복원</strong>을 누르세요. 가족 공유도 됩니다.</>,
      <>On a device signed in with the same Apple ID, tap <strong>Restore</strong> on the front endpaper. Family Sharing works too.</>,
    ],
  },
  {
    q: ['‘내 산’이 무엇인가요?', 'What is “My Mountain”?'],
    a: [
      <>
        100대 명산 밖의 산에서, <strong>내가 선 자리를 직접 정상으로 정하는 것</strong>입니다(평생권). 앱이 확인한 공식 정상이나 공식 목록이 아니고, 가고 싶은 산을
        모아 두는 목록도 아닙니다(그건 수첩 쪽 오른쪽 위 &lsquo;귀퉁이 접기&rsquo;). 정상석 앞이나 가장 높은 곳에서 도장을 꾹 누른 뒤 <strong>이 자리를 정상으로 정하기</strong>를 누르고
        이름을 적으면, 다음부터 그 자리 150m 안에서 도장이 찍힙니다. 자리는 이 기기 안에만 저장되고, 100칸 · n / 100 에는 들지 않습니다. 이미 만든 내 산과 도장은
        평생권이 없어져도 잠기지 않습니다.
      </>,
      <>
        For mountains outside the list of 100, <strong>you declare the spot you stand on to be the summit</strong> (Lifetime pass). It is not an official summit
        the app has verified, and it is not a wish list either (that&rsquo;s the folded corner on a page). At the summit marker or the highest point, press and
        hold the stamp, tap <strong>Make this spot the summit</strong> and name it; from then on the stamp lands within 150 m of that spot. The spot stays on this
        device and does not count toward the 100 squares or n / 100. Mountains and stamps you already made never get locked.
      </>,
    ],
  },
  {
    q: ['사진에서 사람이 오려지지 않아요', 'The person isn’t cut out of my photo'],
    a: [
      <>사람과 배경이 뚜렷이 구분되는 사진일수록 잘 됩니다. 사람이 없거나 너무 작은 풍경 사진이면 오려 내지 않고 산 이름을 사진 위에 놓습니다.</>,
      <>It works best when the person stands out clearly from the background. For landscapes with no one in them (or someone very small), the mountain name simply goes on top of the photo.</>,
    ],
  },
  {
    q: ['산 목록과 정상 좌표는 어디서 왔나요?', 'Where do the mountain list and summit coordinates come from?'],
    a: [
      <>
        목록 · 높이 · 소재지는 산림청이 2002년에 선정 · 공표한 100대 명산, 정상 좌표는 OpenStreetMap 과 산림청 공공데이터를 대조해 골랐습니다. 데이터 파일은{' '}
        <Link href="/summitbook/data">산 데이터</Link> 페이지에서 ODbL 로 내려받을 수 있습니다.
      </>,
      <>
        The list, heights and locations are the Korea Forest Service&rsquo;s 100 famous mountains (2002); summit coordinates were chosen by cross-checking
        OpenStreetMap with Korea Forest Service open data. Download the file under the ODbL on the <Link href="/summitbook/data">summit data</Link> page.
      </>,
    ],
  },
  {
    q: ['환불은 어떻게 하나요?', 'How do I get a refund?'],
    a: [
      <>결제는 Apple 이 처리하므로 환불도 Apple 에 요청합니다: reportaproblem.apple.com 에서 {APP.ko} 구입을 고르세요. 회사는 결제 정보를 볼 수 없습니다.</>,
      <>Apple handles payment, so refunds are requested from Apple: choose the {APP.en} purchase at reportaproblem.apple.com. We cannot see payment details.</>,
    ],
  },
];

export default function SupportContent() {
  return (
    <div className="sb-wrap sb-doc">
      <div className="sb-doc-head">
        <h1>
          지원
          <br />
          Support
        </h1>
        <div className="sb-sub">
          {APP.ko} · {APP.en}
        </div>
      </div>

      <section>
        <h2>자주 묻는 질문 · FAQ</h2>
        {FAQ.map((f) => (
          <details key={f.q[1]}>
            <summary>
              <span data-l="ko">{f.q[0]}</span>
              <span data-l="en">{f.q[1]}</span>
            </summary>
            <div className="sb-ans">
              <div>{f.a[0]}</div>
              <div className="sb-en">{f.a[1]}</div>
            </div>
          </details>
        ))}
      </section>

      <section>
        <h2>산에서 · On the mountain</h2>
        <p>
          {APP.ko} 앱은 입산 통제 · 날씨 · 길을 모릅니다. 코스나 소요 시간을 알려 주지 않고, 앱이 말하는 것은 &lsquo;정상 반경 안인가&rsquo;와 &lsquo;오늘 해 지는
          시각&rsquo;뿐입니다. 산에 가기 전에는 산림청 · 국립공원의 안내를 확인하는 편이 안전합니다. 출입이 막힌 봉우리에는 들어가지 마십시오 — 그 아래에서 적은
          연필 기록도 수첩에 남습니다.
        </p>
        <div className="sb-en-block">
          <p>
            {APP.en} knows nothing about closures, weather or trails. It gives no routes or travel times; all it says is whether you are within the summit
            radius and today&rsquo;s sunset time. Before you go, check the notices of the Korea Forest Service and the national parks. Please do not enter
            closed peaks — a pencil record made below them still goes in the notebook.
          </p>
        </div>
      </section>

      <section>
        <h2>문의 · Contact</h2>
        <p>
          고장, 제안, 구입 문제 모두 이메일로 보내 주십시오. 기기 이름과 iOS 버전, 어느 산에서 생겼는지 적어 주시면 빨리 찾을 수 있습니다.
        </p>
        <div className="sb-en-block">
          <p>Bugs, ideas and purchase problems — please email us. Your device model, iOS version and the mountain where it happened help us find it fast.</p>
        </div>
        <a className="sb-mail" href={`mailto:${EMAIL}?subject=${encodeURIComponent(APP.en)}`}>
          {EMAIL}
        </a>
      </section>
    </div>
  );
}
