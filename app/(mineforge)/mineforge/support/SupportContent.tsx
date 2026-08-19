'use client';

import MailButton from '../MailButton';
import { useLang } from '../i18n';

const FAQ_KO: [string, React.ReactNode][] = [
    ['진행 상황이 사라졌어요.', '저장 데이터는 기기 안에만 보관됩니다. 앱을 삭제하면 함께 삭제되며 복구할 수 없습니다(계정·클라우드 동기화 없음). 게임을 강제 종료해도 진행 중인 도전은 자동 저장돼 “이어하기”로 복원됩니다.'],
    ['지뢰를 밟았는데 게임이 안 끝났어요.', '버팀목(🪵)이 대신 부서지며 당신을 지킵니다 — 지뢰는 분화구가 되어 사라지고 주변 숫자가 갱신됩니다. 버팀목이 0개일 때 지뢰를 밟으면 라운드가 실패합니다. 상단의 🪵 개수를 항상 확인하세요.'],
    ['어느 칸도 확신이 없어요.', '카나리아(🐤)를 탭하면 확실히 안전한 칸 하나를 비춰줍니다. 횟수 제한이 있으니 아껴 쓰세요. 의심 칸에는 🚩 깃발 모드(또는 길게 누르기)로 표식을 남길 수 있습니다 — 깃발 칸은 파지지 않습니다.'],
    ['광맥(Seam)이 왜 끊겼나요?', '직전 발굴로 열린 칸들 바로 옆을 이어 파면 광맥 +1, 같은 숫자면 공명 +2로 이어집니다. 떨어진 곳을 파면 광맥이 끊깁니다. 메아리석(🔔)과 별똥석(✦)은 어디를 파도 광맥을 잇습니다.'],
    ['쿼터를 못 채웠는데 파낼 칸이 없어요.', '안전한 칸을 전부 파내면 완전 발파 보너스(150×챕터)가 먼저 더해지고, 그래도 쿼터에 못 미치면 라운드 실패입니다. 광맥을 길게 이어 배율을 키우는 것이 핵심입니다.'],
    ['계약(황색 배너)이 뭔가요?', '각 챕터의 두 번째 라운드는 쿼터에 더해 계약 조건(광맥 길이·한 광맥 점수·광석 발굴)까지 이행해야 클리어됩니다. 배너의 진행도를 확인하세요.'],
    ['리더보드/도전과제가 안 보여요.', 'Game Center 로그인이 필요합니다: 설정 → Game Center → 켬. 로그인 없이도 게임은 정상 동작합니다.'],
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
    ['I hit a mine but the game didn\'t end.', 'A pit prop (🪵) broke to save you — the mine becomes a crater and nearby numbers update. Strike a mine with zero props and the round fails. Watch the 🪵 counter up top.'],
    ['No tile feels safe.', 'Tap the canary (🐤) and it sings over one provably safe tile. Uses are limited — spend them wisely. Toggle 🚩 flag mode (or long-press) to mark suspects; flagged tiles never dig.'],
    ['Why did my seam break?', 'Dig next to any tile opened by your previous dig for seam +1, or hit the same number for resonance +2. Digging far away breaks the seam. Echo crystals (🔔) and Starfall stones (✦) link from anywhere.'],
    ['The quarry ran out before the quota.', 'Unearthing every safe tile pays the Full Clear bonus (150×chapter) first — if you\'re still short, the round is lost. Long seams and big multipliers are the answer.'],
    ['What is the amber Contract banner?', 'The second round of each chapter adds a side condition (seam length, single-seam score, stones unearthed) on top of the quota. Track progress in the banner.'],
    ['Leaderboards / achievements are missing.', 'Sign in to Game Center: Settings → Game Center → On. The game runs fine without it.'],
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
    <div className="mf-wrap">
      <article className="mf-doc">
        <header className="mf-doc-head">
          <h1>◆ Mineforge · 마인포지</h1>
          <div className="mf-sub">{ko ? '지원 / FAQ' : 'Support / FAQ'}</div>
        </header>

        <h2>{ko ? '자주 묻는 질문' : 'Frequently asked'}</h2>
        {faq.map(([q, a]) => (
          <details className="mf-faq" key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}

        <div className="mf-contact">
          {ko ? '해결되지 않으면 메일 주세요. 보통 1~2 영업일 안에 답변드립니다.' : 'Still stuck? Email us — we usually reply within one or two business days.'}
          <MailButton />
        </div>
      </article>
    </div>
  );
}
