'use client';

// 원본 src/pages/Support.jsx 이식 — 문구 그대로.
import MailButton from '../MailButton';
import { EMAIL, useLang } from '../i18n';

const T = {
  ko: {
    h1: '지원',
    intro:
      '핍포지에 관한 질문이나 문제가 있으면 아래 자주 묻는 질문을 확인하시고, 해결되지 않으면 이메일로 연락해 주세요. 보통 1~2 영업일 안에 답변드립니다.',
    contact: '문의하기',
    faqs: [
      [
        '게임 진행이 사라졌어요.',
        '진행 상황은 기기 안에만 저장됩니다. 앱을 삭제하면 기록도 함께 삭제되며 복구할 수 없습니다. iOS 기기 이전 시에는 기기 백업(iCloud/컴퓨터 백업)에 앱 데이터가 포함되어 있으면 함께 이전됩니다.',
      ],
      [
        '리더보드가 안 보여요.',
        'Game Center 로그인이 필요합니다. 설정 → Game Center에서 로그인 여부를 확인하세요. 로그인하지 않아도 게임의 다른 모든 기능은 정상 동작합니다.',
      ],
      [
        '데일리 챌린지는 언제 리셋되나요?',
        '매일 자정(UTC 기준)에 리셋됩니다. 한국 시간으로는 오전 9시입니다. 하루에 한 번만 도전할 수 있습니다.',
      ],
      ['소리/음악을 끄고 싶어요.', '타이틀 화면 또는 게임 중 메뉴(≡)에서 소리와 음악을 각각 켜고 끌 수 있습니다.'],
      [
        '너무 어려워요.',
        '주철 난이도로 시작하세요. 참 도감의 🔒 카드를 눌러 해금 조건을 확인하고, 계약 라운드에서는 재굴림이 1회 더 주어진다는 점을 활용하세요. 같은 족보를 반복하면 점수가 절반씩 식으니(❄) 매 굴림 다른 족보를 노리는 것이 핵심입니다.',
      ],
      [
        '환불은 어떻게 하나요?',
        '앱 구매 환불은 Apple이 처리합니다. reportaproblem.apple.com 에 로그인해 요청하실 수 있습니다.',
      ],
      [
        '버그를 발견했어요.',
        '아래 이메일로 기기 모델, iOS 버전, 재현 방법을 보내주시면 빠르게 수정하겠습니다. 타이틀 화면 하단의 빌드 번호도 함께 알려주세요.',
      ],
    ],
  },
  en: {
    h1: 'Support',
    intro:
      'Questions or problems with Pipforge? Check the FAQ below, and if that does not solve it, email us — we usually reply within 1–2 business days.',
    contact: 'Contact us',
    faqs: [
      [
        'My progress disappeared.',
        'Progress is stored only on your device. Deleting the app deletes your records permanently. When moving to a new iPhone, app data transfers if it is included in your device backup (iCloud or computer).',
      ],
      [
        'Leaderboards are not showing.',
        'Game Center sign-in is required. Check Settings → Game Center on your device. Everything except leaderboards works without signing in.',
      ],
      ['When does the Daily Challenge reset?', 'At midnight UTC every day. One attempt per day.'],
      ['How do I turn off sound/music?', 'Both can be toggled on the title screen or from the in-game menu (≡).'],
      [
        'The game is too hard.',
        'Start on Cast Iron difficulty. Tap 🔒 cards in the collection to see unlock conditions, and remember contract rounds grant an extra reroll. Replaying the same combo cools it (❄ ×0.5) — solving each cast with a different combo is the key skill.',
      ],
      [
        'How do I get a refund?',
        'App purchases are refunded by Apple. Sign in at reportaproblem.apple.com to request one.',
      ],
      [
        'I found a bug.',
        'Email us your device model, iOS version, and steps to reproduce — plus the build number shown at the bottom of the title screen. We fix fast.',
      ],
    ],
  },
} as const;

export default function SupportContent() {
  const { lang } = useLang();
  const t = T[lang];

  return (
    <main className="pf-main pf-doc">
      <h1>{t.h1}</h1>
      <p>{t.intro}</p>
      <MailButton subject="Pipforge Support" label={`${t.contact} — ${EMAIL}`} />
      <div className="pf-faq-list">
        {t.faqs.map(([q, a]) => (
          <details key={q} className="pf-faq">
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </main>
  );
}
