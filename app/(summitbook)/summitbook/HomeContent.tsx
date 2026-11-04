'use client';

/* 완등 수첩 소개 — 수첩 한 권을 손에 들고 넘기는 순서.
   0 닫힌 수첩(지금 시각의 하늘 · 끈 밀기 · 펼침) → 1 꾹 눌러 찍기(도장 / 연필 기록) → 2 백 칸 후루룩(실제 산 높이)
   → 3 정상 쪽(네 겹이 서는 연출 · 판형 넷) → 4 철 도장 · 백 개의 봉우리 → 5 보내기(피드 · 스토리 · 연말 카드 예고)
   → 무료와 평생권 → 위치 · 계정 · 서버 → 안전 → 끝. 그림은 전부 앱과 같은 조판 엔진(home/engine.ts), 외부 라이브러리 · CDN 없음.
   쓰지 않는 말: 다른 회사 · 민간 등산 프로그램 · 앱 이름, 자사 다른 앱, 길 안내 · 소요 시간 · 겨루기 · 건강 효과. */
import Link from 'next/link';
import Cover from './home/Cover';
import HoldStamp from './home/HoldStamp';
import Riffle from './home/Riffle';
import Pages from './home/Pages';
import Seasons from './home/Seasons';
import Sheet from './home/Sheet';
import Share from './home/Share';
import { Shield } from './chrome';
import { APP } from './names';

type T = string | { ko: string; en: string };
const PASS: { ko: string; en: string; free: T; life: T }[] = [
  { ko: '정상 확인 · 돌탑 도장 · 사계 칸 · 연필 기록', en: 'Summit check · cairn stamp · season rim · pencil record', free: { ko: '100곳 전부', en: 'All 100' }, life: { ko: '100곳 전부', en: 'All 100' } },
  { ko: '수첩 · 후루룩 줄 · 리본 · 귀퉁이 접기', en: 'Notebook · riffle strip · ribbon · dog-ears', free: '✓', life: '✓' },
  { ko: '사진 놓기 · 쪽에 쓰기 · 공유(피드 · 스토리) · 백업', en: 'Photo drop · notes · share (feed · story) · backup', free: '✓', life: '✓' },
  { ko: '정상 쪽 판형', en: 'Page layouts', free: { ko: '정상석 · 등고선', en: 'Summit stone · Contour' }, life: { ko: '+ 필름 · 엽서', en: '+ Film · Postcard' } },
  { ko: '내 산 — 100대 명산 밖에서, 선 자리를 내가 정상으로 정하기(공식 정상 아님)', en: 'My Mountain — off the list, you declare the spot you stand on as the summit (not an official one)', free: '—', life: '✓' },
  { ko: '돌탑 돌', en: 'Cairn stone', free: { ko: '화강암', en: 'Granite' }, life: { ko: '+ 현무암 · 청석 · 사암 · 지역 따라', en: '+ Basalt · Slate · Sandstone · By region' } },
  { ko: '뒤 면지', en: 'Back endpaper', free: { ko: '한 철', en: 'One season' }, life: { ko: '+ 사계판', en: '+ Four seasons' } },
  { ko: '한 권 PDF', en: 'Notebook PDF', free: '—', life: { ko: '화면용 · 인쇄용 · 모든 해', en: 'Screen · print · all years' } },
  { ko: '공유 이미지 아래 줄', en: 'Line under shared images', free: { ko: `${APP.ko} · YEAHPLUS`, en: `${APP.ko} · YEAHPLUS` }, life: { ko: '내 글 · 없음', en: 'Your own text · none' } },
];

const FACTS = [
  { ko: ['앱 무료', '도장은 100곳 모두 무료. 평생권 ₩6,600 한 번, 구독 없음'], en: ['Free to download', 'Stamps for all 100 are free. One Lifetime pass, ₩6,600 — no subscription'] },
  { ko: ['광고 없음', '수첩에 끼어드는 것이 없다'], en: ['No ads', 'Nothing interrupts the notebook'] },
  { ko: ['계정 없음', '가입 · 로그인이 없다. 수첩은 이 기기에'], en: ['No account', 'No sign-up, no login. The notebook lives on the phone'] },
  { ko: ['인터넷 없이', '산 목록이 앱 안에 있고, GPS 는 신호 없이도 된다'], en: ['Works offline', 'The list is built in, and GPS works without signal'] },
  { ko: ['산 목록', '산림청이 2002년에 선정 · 공표한 100대 명산'], en: ['The list', 'The 100 famous mountains chosen by the Korea Forest Service in 2002'] },
  { ko: ['한국어 · iPhone', '한국의 산을 위한 수첩'], en: ['Korean · iPhone', 'The app is in Korean, for Korea’s mountains'] },
] as const;

const cell = (x: T) =>
  typeof x === 'string' ? (
    x
  ) : (
    <>
      <span data-l="ko">{x.ko}</span>
      <span data-l="en">{x.en}</span>
    </>
  );

export default function HomeContent() {
  return (
    <>
      <Cover />
      <HoldStamp />
      <Riffle />
      <Pages />
      <Seasons />
      <Sheet />
      <Share />

      <section className="sb-sec">
        <div className="sb-wrap">
          <div className="sb-eyebrow">
            <span data-l="ko">07 · 무료와 평생권</span>
            <span data-l="en">07 · FREE AND LIFETIME</span>
          </div>
          <h2 className="sb-h2">
            <span data-l="ko">도장은 끝까지 무료.</span>
            <span data-l="en">The stamps stay free. All hundred.</span>
          </h2>
          <div className="sb-pass">
            <div className="sb-pass-row sb-pass-head">
              <span />
              <span>
                <span data-l="ko">무료</span>
                <span data-l="en">Free</span>
              </span>
              <span>
                <span data-l="ko">평생권</span>
                <span data-l="en">Lifetime</span>
              </span>
            </div>
            {PASS.map((r) => (
              <div className="sb-pass-row" key={r.en}>
                <span>
                  <span data-l="ko">{r.ko}</span>
                  <span data-l="en">{r.en}</span>
                </span>
                <span>{cell(r.free)}</span>
                <span className="sb-pass-life">{cell(r.life)}</span>
              </div>
            ))}
            <p className="sb-pass-foot">
              <span data-l="ko">평생권 ₩6,600 · 한 번 구입 · 구독 아님 · 가족 공유. 이미 만든 내 산과 도장은 어떤 경우에도 잠기지 않는다.</span>
              <span data-l="en">Lifetime pass: one purchase, not a subscription, Family Sharing. Mountains and stamps you already made never get locked.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="sb-sec sb-dark sb-privacy-sec">
        <div className="sb-wrap">
          <div className="sb-eyebrow">
            <span data-l="ko">08 · 수첩은 내 것</span>
            <span data-l="en">08 · YOUR NOTEBOOK</span>
          </div>
          <div className="sb-trust">
            <div>
              <b>
                <span data-l="ko">위치는 기기 밖으로 나가지 않는다.</span>
                <span data-l="en">Your location never leaves the phone.</span>
              </b>
              <p>
                <span data-l="ko">도장을 누르는 동안 한 번 읽어 정상 반경을 기기 안에서 판정하고 끈다. 남는 것은 정상까지의 거리뿐이다.</span>
                <span data-l="en">It is read once while you hold the stamp, judged against the summit radius on the device, then switched off. Only the distance to the summit is kept.</span>
              </p>
            </div>
            <div>
              <b>
                <span data-l="ko">계정이 없다.</span>
                <span data-l="en">No account.</span>
              </b>
              <p>
                <span data-l="ko">가입도 로그인도 없다. 기기를 바꿀 때는 앞 면지에서 파일 하나로 내보내고 불러온다.</span>
                <span data-l="en">No sign-up, no login. Moving phones? Export one file from the front endpaper and import it.</span>
              </p>
            </div>
            <div>
              <b>
                <span data-l="ko">서버가 없다.</span>
                <span data-l="en">No server.</span>
              </b>
              <p>
                <span data-l="ko">분석 · 광고 도구도 없다. 사진 오려 내기도 기기 안에서. App Store 개인정보 표시는 &lsquo;데이터를 수집하지 않음&rsquo;.</span>
                <span data-l="en">No analytics or ad tools either. Photo cutouts happen on the device. The App Store privacy label: &ldquo;Data Not Collected&rdquo;.</span>
              </p>
            </div>
          </div>
          <Link className="sb-more" href="/summitbook/privacy">
            <span data-l="ko">개인정보처리방침 →</span>
            <span data-l="en">Privacy policy →</span>
          </Link>
        </div>
      </section>

      <section className="sb-sec sb-safety">
        <div className="sb-wrap">
          <div className="sb-safety-box">
            <div className="sb-eyebrow">
              <span data-l="ko">09 · 안전</span>
              <span data-l="en">09 · SAFETY</span>
            </div>
            <p className="sb-safety-big">
              <span data-l="ko">이 수첩은 입산 통제 · 날씨 · 길을 모른다.</span>
              <span data-l="en">This notebook knows nothing about closures, weather or trails.</span>
            </p>
            <p>
              <span data-l="ko">
                코스 · 소요 시간을 말하지 않고, 누가 더 빨리 올랐는지도 겨루지 않는다. 앱이 말하는 것은 &lsquo;여기가 정상 반경 안이다&rsquo;와 &lsquo;오늘 해 지는
                시각&rsquo;뿐이다. 산에 가기 전에는 산림청 · 국립공원의 안내를 확인하는 편이 안전하다.
              </span>
              <span data-l="en">
                It gives no routes or travel times, and nobody races anybody. All it ever says is &ldquo;you are within the summit radius&rdquo; and
                &ldquo;today&rsquo;s sunset time&rdquo;. Before you go, the notices of the Korea Forest Service and the national parks are the place to check.
              </span>
            </p>
          </div>
        </div>
      </section>

      <section className="sb-sec">
        <div className="sb-wrap">
          <div className="sb-eyebrow">
            <span data-l="ko">조건</span>
            <span data-l="en">THE SMALL PRINT</span>
          </div>
          <div className="sb-facts">
            {FACTS.map((f) => (
              <div className="sb-fact" key={f.en[0]}>
                <b>
                  <span data-l="ko">{f.ko[0]}</span>
                  <span data-l="en">{f.en[0]}</span>
                </b>
                <span data-l="ko">{f.ko[1]}</span>
                <span data-l="en">{f.en[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sb-sec sb-final">
        <div className="sb-wrap">
          <div className="sb-eyebrow">{APP.en.toUpperCase()}</div>
          <h2 className="sb-h2">
            <span data-l="ko">백 개의 봉우리, 한 권.</span>
            <span data-l="en">A hundred peaks, one notebook.</span>
          </h2>
          <div className="sb-soon" aria-label="App Store">
            <span>
              <small>
                <span data-l="ko">곧 출시</span>
                <span data-l="en">Coming soon</span>
              </small>
              App Store
            </span>
          </div>
          <p className="sb-final-links">
            <Link href="/summitbook/support">
              <span data-l="ko">지원 · 자주 묻는 것</span>
              <span data-l="en">Support · FAQ</span>
            </Link>
            <Link href="/summitbook/data">
              <span data-l="ko">산 데이터 내려받기(ODbL)</span>
              <span data-l="en">Download the summit data (ODbL)</span>
            </Link>
          </p>
          <p className="sb-final-maker">
            <Shield size={14} /> YEAHPLUS
          </p>
        </div>
      </section>
    </>
  );
}
