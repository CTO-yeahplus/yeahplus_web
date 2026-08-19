'use client';

import MailButton from '../MailButton';
import { useLang } from '../i18n';

const FAQ_KO: [string, React.ReactNode][] = [
    ['진행 상황이 사라졌어요.', '저장 데이터는 기기 안에만 보관됩니다. 앱을 삭제하면 함께 삭제되며 복구할 수 없습니다(계정·클라우드 동기화 없음). 게임을 강제 종료해도 진행 중인 도전은 자동 저장돼 “이어하기”로 복원됩니다.'],
    ['맞출 수 있는 쌍이 없어요.', '초록으로 빛나는 타일이 자유 타일입니다. 같은 자유 타일 두 장이 없다면 재련(왼쪽 아래 🔨)을 탭해 남은 타일을 다시 쌓으세요 — 재련 후의 산은 언제나 풀 수 있게 배치됩니다. 재련까지 바닥나면 라운드가 종료됩니다. 어디를 봐야 할지 모르겠다면 💡 힌트가 짝 하나를 비춰줍니다.'],
    ['맥(Vein)이 왜 끊겼나요?', '직전 매치와 같은 문양(동전·대나무·만수·명예)이면 맥 +1, 같은 숫자면 공명 +2로 이어집니다. 둘 다 아니면 맥이 끊깁니다. 백옥(✦)은 다리 역할을 해 맥을 유지합니다.'],
    ['계약(황색 배너)이 뭔가요?', '각 챕터의 두 번째 라운드는 쿼터에 더해 계약 조건(맥 길이·한 맥 점수·명예 타일·공명 횟수)까지 이행해야 클리어됩니다. 배너의 진행도를 확인하세요.'],
    ['백옥으로 쌍을 나눠 썼더니 홀짝 타일이 남았어요.', '백옥은 어떤 타일과도 짝이 되지만, 원래 쌍이었던 타일의 남은 한 장은 다른 백옥으로만 구제할 수 있습니다. 백옥을 언제 쓸지가 전략입니다. (일반 세공은 항상 쌍 단위로 적용되므로 이 상황은 백옥 사용 시에만 생깁니다.)'],
    ['리더보드/도전과제가 안 보여요.', 'Game Center 로그인이 필요합니다: 설정 → Game Center → 켬. 로그인 없이도 게임은 정상 동작합니다.'],
    ['소리/음악을 끄고 싶어요.', '타이틀 화면 또는 게임 중 ≡ 메뉴에서 소리와 음악을 각각 켜고 끌 수 있습니다.'],
    [
      '환불은 어떻게 하나요?',
      (
        <>
          App Store 구매는 Apple이 처리합니다: <a href="https://reportaproblem.apple.com" target="_blank" rel="noreferrer">reportaproblem.apple.com</a>에서 요청할 수 있습니다.
        </>
      ),
    ],
];

const FAQ_EN: [string, React.ReactNode][] = [
    ['My progress disappeared.', 'Save data lives only on your device. Deleting the app deletes it (no accounts, no cloud sync). Force-quitting is safe — an in-progress run is auto-saved and restored via CONTINUE.'],
    ['I have no matching pairs.', 'Green-glowing tiles are free. If no two identical free tiles exist, tap Reforge (🔨, bottom-left) to restack the remaining tiles — every reshuffle is guaranteed solvable. When reforges run dry too, the round ends. Lost? The 💡 hint flashes one matching pair.'],
    ['Why did my vein break?', 'Match the same suit as your previous match for vein +1, or the same number for resonance +2. Anything else breaks the vein. White Jade (✦) bridges anything and keeps the vein alive.'],
    ['What is the amber Contract banner?', 'The second round of each chapter adds a side condition (vein length, single-vein score, honor pairs, resonances) on top of the quota. Track progress in the banner.'],
    ['I split a pair with White Jade and now a tile is orphaned.', 'White Jade matches anything — but the twin it leaves behind can only be rescued by another White Jade. Choosing when to spend a wild is the strategy. (Regular carving always applies to both tiles of a kind, so orphans can only come from wild use.)'],
    ['Leaderboards / achievements are missing.', 'Sign in to Game Center: Settings → Game Center → On. The game runs fine without it.'],
    ['How do I turn off sound or music?', 'On the title screen, or in the ≡ menu during a run.'],
    [
      'How do refunds work?',
      (
        <>
          App Store purchases are handled by Apple: request at <a href="https://reportaproblem.apple.com" target="_blank" rel="noreferrer">reportaproblem.apple.com</a>.
        </>
      ),
    ],
];

export default function SupportContent() {
  const { lang } = useLang();
  const ko = lang === 'ko';
  const faq = ko ? FAQ_KO : FAQ_EN;

  return (
    <div className="jf-wrap">
      <article className="jf-doc">
        <header className="jf-doc-head">
          <h1>發 Jadeforge · 제이드포지</h1>
          <div className="jf-sub">{ko ? '지원 / FAQ' : 'Support / FAQ'}</div>
        </header>

        <h2>{ko ? '자주 묻는 질문' : 'Frequently asked'}</h2>
        {faq.map(([q, a]) => (
          <details className="jf-faq" key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}

        <div className="jf-contact">
          {ko ? '해결되지 않으면 메일 주세요. 보통 1~2 영업일 안에 답변드립니다.' : 'Still stuck? Email us — we usually reply within one or two business days.'}
          <MailButton />
        </div>
      </article>
    </div>
  );
}
