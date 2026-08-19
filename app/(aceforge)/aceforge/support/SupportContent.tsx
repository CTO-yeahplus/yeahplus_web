'use client';

import MailButton from '../MailButton';
import { useLang } from '../i18n';

const FAQ_KO: [string, React.ReactNode][] = [
    ['진행 상황이 사라졌어요.', '저장 데이터는 기기 안에만 보관됩니다. 앱을 삭제하면 함께 삭제되며 복구할 수 없습니다(계정·클라우드 동기화 없음). 게임을 강제 종료해도 진행 중인 도전은 자동 저장돼 “이어하기”로 복원됩니다.'],
    ['낼 수 있는 카드가 없어요.', '빛나는 카드가 지금 낼 수 있는 카드입니다. 하나도 없다면 화로(왼쪽 아래 더미)를 탭해 새 모루를 뽑으세요. 화로까지 비면 라운드가 종료됩니다.'],
    ['A 다음에 K를 낼 수 있나요?', '네. A와 K는 이어집니다(랩). 2·A·K·Q처럼 끝을 감아 도는 체인도 가능합니다.'],
    ['계약(황색 배너)이 뭔가요?', '각 챕터의 두 번째 라운드는 쿼터에 더해 계약 조건(체인 길이·한 체인 점수·봉우리·A↔K 연결)까지 이행해야 클리어됩니다. 배너의 진행도를 확인하세요.'],
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
    ['I have no playable cards.', 'Glowing cards are playable right now. If none glow, tap the stock pile (bottom-left) for a fresh anvil. When the stock runs dry too, the round ends.'],
    ['Can I play a King on an Ace?', 'Yes — A and K connect (wrap). Chains like 2·A·K·Q are legal and encouraged.'],
    ['What is the amber Contract banner?', 'The second round of each chapter adds a side condition (chain length, single-chain score, peaks, A↔K links) on top of the quota. Track progress in the banner.'],
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
    <div className="af-wrap">
      <article className="af-doc">
        <header className="af-doc-head">
          <h1>♠ Aceforge · 에이스포지</h1>
          <div className="af-sub">{ko ? '지원 / FAQ' : 'Support / FAQ'}</div>
        </header>

        <h2>{ko ? '자주 묻는 질문' : 'Frequently asked'}</h2>
        {faq.map(([q, a]) => (
          <details className="af-faq" key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}

        <div className="af-contact">
          {ko ? '해결되지 않으면 메일 주세요. 보통 1~2 영업일 안에 답변드립니다.' : 'Still stuck? Email us — we usually reply within one or two business days.'}
          <MailButton />
        </div>
      </article>
    </div>
  );
}
