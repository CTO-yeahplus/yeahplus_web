'use client';

/* 현자의 서재 도움말 — 원본 site/hyunja/support.html 의 문안을 그대로 옮기고,
   앱 동작(첫 실행 3단계·필사·어록·카드)에서 확인한 문항을 몇 개 더했다.
   바뀐 것은 문의 주소(contact@)다.
   ⚠️ 이 주소가 App Store Connect 의 지원 URL 이다. */

import Link from 'next/link';
import { MAIL, useDocTitle, useLang } from '../i18n';

export default function SupportContent() {
  const { L } = useLang();
  useDocTitle('도움말 — 현자의 서재', 'Support — The Sages’ Study');

  const qa = [
    {
      q: L('어떻게 쓰는 앱인가요?', 'How does it work?'),
      a: L(
        '서재에서 마음에 걸리는 고민을 하나 고르면 네 현자의 원탁이 열립니다. 자리를 누르면 그 현자의 구절과 풀이가 보이고, 마음이 가는 자리를 고르면 "곁에 앉았습니다"가 됩니다. 그 구절을 따라 쓰고, 오늘의 질문에 한 줄로 답하면 그날의 기록이 됩니다.',
        'Pick the worry that is on your mind and the round table opens. Tap a seat to read that thinker’s passage and commentary; choose one and you “take the seat beside them”. Trace the passage, answer the day’s question in one line, and that is your entry for the day.'
      ),
    },
    {
      q: L('기록은 어디에 저장되나요?', 'Where are my notes stored?'),
      a: L(
        '이 기기 안에 저장됩니다. iCloud에 로그인되어 있으면 같은 Apple 계정의 다른 기기와 글 기록(원탁·성찰·필사 목록)과 낙관이 맞춰집니다. 필사한 글씨 그림은 용량 때문에 그 기기에만 남습니다. 저희 회사는 어떤 기록도 볼 수 없습니다.',
        'On your device. If you are signed in to iCloud, the text entries (your chosen seats, reflections, the list of tracings) and your seal are kept in step across devices on the same Apple Account. The handwriting images stay on the device that made them, because of their size. We cannot see any of it.'
      ),
    },
    {
      q: L('기록을 옮기거나 보관하고 싶어요', 'How do I move or keep my notes?'),
      a: L(
        '서재 화면 오른쪽 위 설정 → 기록 지키기에서 세 가지를 할 수 있습니다. ① 백업 파일 만들기 — 필사 그림까지 모두 담은 파일을 만듭니다. 파일 앱이나 메일에 보관하세요. ② 어록을 글로 내보내기 — 날짜별 기록을 읽을 수 있는 글로 내보냅니다. ③ 백업 불러오기 — 백업 파일의 기록을 지금 기록에 더합니다. 같은 기록은 두 번 들어가지 않습니다.',
        'Settings (top right of the library) → Keep my notes gives you three options. (1) Make a backup file — everything including the handwriting images; keep it in Files or email it to yourself. (2) Export as text — your entries by date in readable plain text. (3) Import a backup — merges a backup into what you have now, without duplicating entries.'
      ),
    },
    {
      q: L('아침 알림이 오지 않아요', 'The morning reminder is not arriving'),
      a: L(
        '설정 → 아침 알림에서 시간을 골랐는지 확인하세요. 그래도 오지 않으면 iPhone의 설정 앱 → 현자의 서재 → 알림이 켜져 있는지 봐 주세요. 알림은 앱을 연 날로부터 30일치가 기기 안에 예약됩니다. 한 달 넘게 앱을 열지 않으면 알림이 멈추고, 다시 열면 이어집니다.',
        'First check that a time is selected under Settings → Morning reminder. If it still does not arrive, open the iPhone Settings app → The Sages’ Study → Notifications. Reminders are scheduled on the device 30 days ahead from the last time you opened the app; if you leave it unopened for more than a month they stop, and resume when you open it again.'
      ),
    },
    {
      q: L('낙관을 바꾸고 싶어요', 'I want to change my seal'),
      a: L(
        '설정 → 나의 낙관 → 다시 새기기. 이미 찍힌 필사 그림의 낙관은 바뀌지 않고, 어록 표지와 앞으로의 카드에는 새 낙관이 찍힙니다.',
        'Settings → My seal → Carve again. Seals already stamped on saved tracings stay as they are; the book cover and any new cards use the new one.'
      ),
    },
    {
      q: L('한문 필사가 어렵습니다', 'Tracing the classical Chinese is hard'),
      a: L(
        '필사 화면 위의 한글 · 한문 단추로 바꿀 수 있습니다. 한글은 줄 공책, 한문은 원고지 칸에 흐린 글씨가 깔립니다. 글씨는 획을 채점하지 않으니 편한 속도로 쓰시면 됩니다. 천천히 그으면 굵게, 빠르게 그으면 가늘게 먹이 묻어납니다.',
        'Use the Korean / Classical Chinese switch above the sheet. Korean goes on lined paper, classical Chinese into a square grid, both with a pale guide underneath. Nothing is graded, so write at whatever pace suits you — slow strokes run thick, quick strokes run thin.'
      ),
    },
    {
      q: L('번역은 어떤 기준으로 했나요?', 'What editions are the translations based on?'),
      a: L(
        '모든 구절은 원문에서 직접 옮겼습니다. 『논어』와 『맹자』는 주희의 집주, 『도덕경』은 왕필본, 『순자』는 왕선겸의 『순자집해』를 기준으로 삼았고, 해석이 갈리는 구절은 기준 판본의 주석을 따랐습니다. 앱의 설정 → 이 책을 만든 사람들에서 판권면을 볼 수 있습니다.',
        'Every passage was translated from the original. We follow Zhu Xi’s commentaries for the Analects and Mencius, the Wang Bi recension for the Tao Te Ching, and Wang Xianqian’s collected commentary for the Xunzi; where readings diverge we follow the commentary of the base edition. The colophon is in the app under Settings → Who made this book.'
      ),
    },
    {
      q: L('잘못된 번역이나 출처를 발견했어요', 'I found a mistranslation or a wrong reference'),
      a: L(
        '알려 주시면 고맙겠습니다. 구절이 들어 있는 고민 제목과 해당 문장을 함께 적어 메일 주세요. 고치면 다음 업데이트에 반영하고, 판권면에 반영 사실을 적습니다.',
        'Please tell us — it helps. Email the worry the passage sits under together with the sentence in question. Corrections ship in the next update and are noted in the colophon.'
      ),
    },
    {
      q: L('iPad에서도 쓸 수 있나요?', 'Does it work on iPad?'),
      a: L(
        '네. iPhone과 iPad 모두에서 쓸 수 있고, 넓은 화면에서는 글자와 필사 칸이 커집니다. 필사는 손가락과 Apple Pencil 모두 됩니다.',
        'Yes, on both iPhone and iPad; on a larger screen the type and the tracing sheet grow with it. Tracing works with a finger or with Apple Pencil.'
      ),
    },
    {
      q: L('환불은 어떻게 하나요?', 'How do I get a refund?'),
      a: L(
        '구매와 환불은 Apple이 처리합니다. reportaproblem.apple.com에서 신청할 수 있습니다.',
        'Purchases and refunds are handled by Apple. You can request one at reportaproblem.apple.com.'
      ),
    },
  ];

  return (
    <div className="hj-wrap hj-narrow hj-doc">
      <h1>{L('도움말', 'Support')}</h1>
      <p className="hj-meta">
        {L(
          '궁금한 점이나 잘못된 번역·출처를 발견하시면 메일로 알려 주세요. 영업일 기준 사흘 안에 답합니다.',
          'Questions, or a translation or reference that looks wrong? Email us — we reply within three business days.'
        )}
      </p>

      <div className="hj-callout">
        <p>
          <strong>{L('문의', 'Contact')}</strong> ·{' '}
          <a
            className="hj-mailto"
            href={`mailto:${MAIL}?subject=${encodeURIComponent('[현자의 서재] ' + L('문의', 'Support'))}`}
          >
            {MAIL}
          </a>
        </p>
        <p>
          {L(
            '메일 제목에 [현자의 서재]를 붙여 주시면 빨리 찾습니다. 기기 모델과 iOS 버전을 함께 적어 주시면 좋습니다.',
            'Putting [현자의 서재] in the subject helps us find it. Including your device model and iOS version helps more.'
          )}
        </p>
      </div>

      <h2>{L('자주 묻는 질문', 'Frequently asked questions')}</h2>
      <div>
        {qa.map((item, i) => (
          <details className="hj-qa" key={i} open={i === 0}>
            <summary>{item.q}</summary>
            <div className="hj-a">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>

      <p className="hj-meta" style={{ marginTop: 30 }}>
        <Link href="/hyunja/privacy">{L('개인정보 처리방침', 'Privacy Policy')}</Link>
        {' · '}
        <Link href="/hyunja/terms">{L('이용 약관', 'Terms of Use')}</Link>
        {' · '}
        <Link href="/hyunja">{L('현자의 서재 홈', 'The Sages’ Study home')}</Link>
      </p>
    </div>
  );
}
