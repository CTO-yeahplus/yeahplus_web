'use client';

// 원본 site/src/pages/Support.jsx 이식 — 문구는 그대로, 클래스만 wf- 프리픽스.
import MailButton from '../MailButton';
import { EMAIL, UI, UPDATED, useLang } from '../i18n';

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="wf-faq">
      <div className="wf-q">{q}</div>
      <div className="wf-a">{children}</div>
    </div>
  );
}

const KO = (
  <>
    <h1>지원</h1>
    <div className="wf-card wf-card-hero">
      <p className="wf-big">막히는 부분이 있으면 메일 한 통이면 됩니다.</p>
      <p className="wf-muted" style={{ marginTop: 6 }}>
        보통 1~2일 안에 답장드립니다. 버그 제보에는 기기 모델과 iOS 버전을 함께 적어주시면 큰 도움이 됩니다.
      </p>
      <MailButton subject="[워드포지] 문의" label={`${EMAIL}로 문의하기`} />
    </div>

    <h2>게임 방법</h2>
    <div className="wf-card">
      <p>자모 타일을 순서대로 누르면 음절이 조합됩니다.</p>
      <div className="wf-tile-row">
        <div className="wf-jt">ㄴ</div>
        <div className="wf-jt">ㅏ</div>
        <div className="wf-jt">ㅁ</div>
        <div className="wf-jt">ㅜ</div>
      </div>
      <p className="wf-word">= 나무</p>
      <ul style={{ marginTop: 14 }}>
        <li>
          <strong>ㄱ + ㄱ = ㄲ</strong> — 같은 자음을 이어 누르면 쌍자음이 됩니다
        </li>
        <li>
          <strong>ㅗ + ㅏ = ㅘ</strong> — 모음도 합쳐집니다 (ㅜ+ㅣ=ㅟ, ㅡ+ㅣ=ㅢ)
        </li>
        <li>
          <strong>ㄹ + ㄱ = ㄺ</strong> — 겹받침도 그대로 만들어집니다 (닭, 값, 앉다)
        </li>
        <li>
          점수 = <strong>칩 × 배율</strong>. 자모를 많이 쓸수록 배율이 커집니다
        </li>
      </ul>
    </div>

    <h2>자주 묻는 질문</h2>

    <Faq q="분명 아는 단어인데 “사전에 없는 말”이라고 나옵니다.">
      게임은 공개 어휘 목록을 사용합니다. <b>신조어와 최근 외래어</b>(예: 숏츠, 스마트폰)는 아직 목록에 없을
      수 있습니다. 반대로 버스·컴퓨터 같은 정착된 외래어는 정상적으로 인정됩니다. 빠진 단어를 알려주시면 다음
      업데이트에 추가를 검토합니다.
    </Faq>

    <Faq q="한 글자 단어도 되나요?">
      네. <b>뇌, 약, 쥐, 닭, 꽃</b>처럼 자모 3개 이상이면 인정됩니다. 다만 가·나·이처럼 자모 2개인 글자는 너무
      쉬워서 제외했습니다.
    </Faq>

    <Faq q="만들 수 있는 단어가 하나도 없어 보입니다.">
      게임은 패를 나눠줄 때 <b>단어를 만들 수 있는지 자동으로 검사</b>하고, 불가능하면 다시 뽑습니다. 그래도 안
      보이면 <b>버리기</b>를 쓰세요. 플레이 횟수는 줄어들지 않습니다. 상점의 <b>통찰</b> 두루마리는 현재 패의
      최고 단어를 바로 찾아줍니다.
    </Faq>

    <Faq q="소리가 안 나요.">
      먼저 기기 측면의 <b>무음 스위치</b>를 확인해 주세요. 그다음 타이틀 화면의<b> 🔊 효과음</b>과{' '}
      <b>🎵 음악</b> 토글이 켜져 있는지 확인하세요. 두 가지는 따로 조절됩니다.
    </Faq>

    <Faq q="기록이 사라졌어요.">
      진행 상황은 기기에만 저장되어 서버 백업이 없습니다. 앱을 삭제하거나 기기를 초기화하면 복구할 수 없습니다.
      이는 개인정보를 일절 수집하지 않기 위한 설계상의 맞바꿈입니다.
    </Faq>

    <Faq q="순위표가 보이지 않습니다.">
      기기 <b>설정 → Game Center</b>에서 로그인되어 있어야 합니다. 순위표는 선택 기능이며, 사용하지 않아도
      게임의 모든 콘텐츠를 즐길 수 있습니다.
    </Faq>

    <Faq q="환불하고 싶습니다.">
      결제는 Apple이 처리하므로 환불도 Apple을 통해야 합니다.
      <a href="https://reportaproblem.apple.com" target="_blank" rel="noreferrer">
        {' '}
        reportaproblem.apple.com
      </a>
      에서 신청하실 수 있습니다.
    </Faq>

    <h2>버그 제보</h2>
    <div className="wf-card">
      <p>아래 정보를 함께 보내주시면 훨씬 빨리 고칠 수 있습니다.</p>
      <ul>
        <li>기기 모델과 iOS 버전 (예: iPhone 15 Pro, iOS 18.2)</li>
        <li>게임 언어와 테마</li>
        <li>어떤 상황에서 발생했는지 (라운드, 보스, 사용 중이던 참 등)</li>
        <li>가능하면 스크린샷 또는 화면 녹화</li>
      </ul>
      <MailButton subject="[워드포지] 버그 제보" label="버그 제보하기" />
    </div>
  </>
);

const EN = (
  <>
    <h1>Support</h1>
    <div className="wf-card wf-card-hero">
      <p className="wf-big">Stuck on something? One email is all it takes.</p>
      <p className="wf-muted" style={{ marginTop: 6 }}>
        We usually reply within one or two days. For bug reports, please include your device model and iOS
        version.
      </p>
      <MailButton subject="[Wordforge] Support" label={`Email ${EMAIL}`} />
    </div>

    <h2>How to play</h2>
    <div className="wf-card">
      <p>Tap letter tiles in order to build a word, then hit PLAY.</p>
      <ul style={{ marginTop: 10 }}>
        <li>
          Score = <strong>chips × mult</strong>. Longer words raise the mult.
        </li>
        <li>
          <strong>Charms</strong> are passive powers (max 5); <strong>Scrolls</strong> are one-use tools (max
          2).
        </li>
        <li>
          <strong>Forge</strong> tiles for permanent bonuses: Iron (+chips), Gilded (+mult), Ember (scores
          twice).
        </li>
        <li>Korean mode assembles syllables from jamo: ㄴ+ㅏ+ㅁ+ㅜ = 나무.</li>
      </ul>
    </div>

    <h2>Frequently asked</h2>

    <Faq q="A word I know is rejected.">
      The game uses a public word list (ENABLE for English). Very new coinages may not be in it. Tell us the
      word and we will consider adding it in the next update.
    </Faq>

    <Faq q="My hand looks unplayable.">
      The game checks every deal and re-draws hands that cannot form a word. If you still cannot see one, use{' '}
      <b>DISCARD</b> — it does not cost a play. The <b>Insight</b> scroll reveals the best word in hand.
    </Faq>

    <Faq q="There is no sound.">
      Check the physical <b>Silent switch</b> first, then the <b>🔊 Sound</b> and <b>🎵 Music</b> toggles on
      the title screen. They are controlled separately.
    </Faq>

    <Faq q="I lost my progress.">
      Progress is stored on your device only — there is no server backup. Deleting the app or resetting the
      device removes it permanently. That is the trade-off for collecting no personal data at all.
    </Faq>

    <Faq q="Leaderboards do not appear.">
      Sign in under <b>Settings → Game Center</b> on your device. Leaderboards are optional; every piece of
      game content is available without them.
    </Faq>

    <Faq q="I would like a refund.">
      Purchases are handled by Apple, so refunds go through Apple at
      <a href="https://reportaproblem.apple.com" target="_blank" rel="noreferrer">
        {' '}
        reportaproblem.apple.com
      </a>
      .
    </Faq>

    <h2>Reporting a bug</h2>
    <div className="wf-card">
      <p>Including these details helps enormously:</p>
      <ul>
        <li>Device model and iOS version</li>
        <li>Game language and theme</li>
        <li>What you were doing (round, boss, charms in play)</li>
        <li>A screenshot or screen recording if possible</li>
      </ul>
      <MailButton subject="[Wordforge] Bug report" label="Report a bug" />
    </div>
  </>
);

export default function SupportContent() {
  const { lang } = useLang();
  return (
    <main className="wf-main">
      <div className="wf-wrap">
        <article className="wf-doc">
          {lang === 'ko' ? KO : EN}
          <p className="wf-meta" style={{ marginTop: 34 }}>
            {UI[lang].updated}: {UPDATED}
          </p>
        </article>
      </div>
    </main>
  );
}
