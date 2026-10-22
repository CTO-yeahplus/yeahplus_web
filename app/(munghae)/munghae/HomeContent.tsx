/* 간직 소개. 문장은 기능 목록이 아니라 보호자가 가져가는 것부터 — 기능은 짧게 뒤에.
   스크린샷은 앱 저장소의 tools/shots.js 결과(store/screenshots/<ko|en>/69)를 560px webp 로 줄인 것. */

function Shot({ name, alt, eager }: { name: string; alt: string; eager?: boolean }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-l="ko" className="kp-shot" src={`/munghae/${name}-ko.webp`} alt={alt} width={560} height={1217} loading={eager ? 'eager' : 'lazy'} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-l="en" className="kp-shot" src={`/munghae/${name}-en.webp`} alt={alt} width={560} height={1217} loading={eager ? 'eager' : 'lazy'} />
    </>
  );
}

const FEATURES = [
  {
    shot: 'farewell',
    ko: ['하루 한 번, 49일의 배웅', '촛불을 켤 때마다 무지개다리를 한 걸음씩 함께 건넙니다. 마흔아홉 번째 날, 그 애만의 별자리가 하늘에 자리 잡습니다.'],
    en: ['One candle a day, a 49-day farewell', 'Each candle is one step across the rainbow bridge together. On the forty-ninth day, their own constellation settles into the sky.'],
  },
  {
    shot: 'artwork',
    ko: ['사진은 그대로, 수채는 종이와 액자에', '간직한 사진으로 추억 네컷과 수채 액자를 만듭니다. 얼굴은 손대지 않고, 수채화는 둘레에만 담았습니다.'],
    en: ['Photos untouched, watercolor around them', 'Turn kept photos into a memory strip or a watercolor frame. Their face is never altered — the watercolor lives only in the paper and frame.'],
  },
  {
    shot: 'letters',
    ko: ['편지 한 통이 별 하나가 되어', '보고 싶은 마음을 편지로 적어 하늘로 보내면, 스노우볼 하늘에 별이 하나 늘어납니다. 보낸 편지는 언제든 다시 읽을 수 있습니다.'],
    en: ['Each letter becomes a star', 'Write down how much you miss them and send it to the sky — one more star appears above the globe. Every letter stays for you to read again.'],
  },
] as const;

export default function HomeContent() {
  return (
    <>
      <section className="kp-hero">
        <div className="kp-wrap kp-hero-grid">
          <div>
            <p className="kp-eyebrow">
              <span data-l="ko">반려동물 추모 스노우볼 · iPhone</span>
              <span data-l="en">A memorial snow globe for pets · iPhone</span>
            </p>
            <h1>
              <span data-l="ko">그 애를,<br />유리 안에 간직하세요.</span>
              <span data-l="en">Keep them close,<br />inside the glass.</span>
            </h1>
            <p className="kp-lead">
              <span data-l="ko">
                먼저 떠난 반려견·반려묘를 위한 조용한 개인 공간입니다. 촛불을 켜고, 보고 싶은 마음을 편지로 적고,
                사진과 기억을 가꿉니다. 재촉하는 알림도, 광고도, 계정도 없습니다.
              </span>
              <span data-l="en">
                A quiet, private space for the dog or cat who went ahead. Light a candle, write down how much you miss
                them, and tend their photos and memories. No pushy notifications, no ads, no account.
              </span>
            </p>
            <p className="kp-badge">
              <span data-l="ko">App Store 출시 준비 중</span>
              <span data-l="en">Coming soon to the App Store</span>
            </p>
          </div>
          <Shot name="globe" alt="" eager />
        </div>
      </section>

      <section id="inside" className="kp-wrap kp-features">
        {FEATURES.map((f) => (
          <article key={f.shot} className="kp-feature">
            <Shot name={f.shot} alt="" />
            <div>
              <h2>
                <span data-l="ko">{f.ko[0]}</span>
                <span data-l="en">{f.en[0]}</span>
              </h2>
              <p>
                <span data-l="ko">{f.ko[1]}</span>
                <span data-l="en">{f.en[1]}</span>
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="kp-wrap kp-promise">
        <h2>
          <span data-l="ko">이 공간의 약속</span>
          <span data-l="en">What this space promises</span>
        </h2>
        <ul>
          <li>
            <span data-l="ko">기록에는 자물쇠를 걸지 않습니다 — 사진·편지·방명록·기념일·촛불·백업은 언제까지나 무료입니다.</span>
            <span data-l="en">Remembering is never locked — photos, letters, guestbook, anniversaries, candles and backup stay free.</span>
          </li>
          <li>
            <span data-l="ko">계정·서버·광고·분석 도구가 없습니다. 모든 기록은 내 기기 안에만 있습니다.</span>
            <span data-l="en">No account, server, ads or analytics. Every record stays on your device.</span>
          </li>
          <li>
            <span data-l="ko">스트릭도, 배지도, 푸시 알림도 없습니다. 촛불은 &lsquo;오늘 켤 수 있다&rsquo;일 뿐입니다.</span>
            <span data-l="en">No streaks, badges or push notifications. A candle is simply there for you, today.</span>
          </li>
          <li>
            <span data-l="ko">프로(한 번 구매, 평생)는 공간을 더 아름답게 가꾸는 꾸밈만 엽니다 — 계절 테마·소품·카드·음악·여러 반려동물.</span>
            <span data-l="en">Pro (one purchase, forever) only adds ways to decorate — seasons, decorations, cards, music and more pets.</span>
          </li>
        </ul>
        <p className="kp-close">
          <span data-l="ko">떠났다고 해서 잊는 것은 아닙니다. 그 기억이 머무를 자리, 간직.</span>
          <span data-l="en">Gone from sight, never from the heart. Keepsake keeps a place for them.</span>
        </p>
      </section>
    </>
  );
}
