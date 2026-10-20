'use client';

/* 수상한 명언 지원 — hyunja/support 와 같은 뼈대(문의 상자 + 자주 묻는 질문).
   메뉴 이름은 앱 template.html 의 문자열을 따랐다: 비망록 → 설정 → 효과음 · 비망록 → 수사본부 · '수상한 점 제보'(2026-10-20 메일 → 웹 양식).
   ⚠️ 이 주소가 App Store Connect 의 지원 URL 이다. */

import Link from 'next/link';
import { APP_EN, APP_KO, MAIL, useDocTitle, useLang } from '../i18n';

export default function SupportContent() {
  const { L } = useLang();
  useDocTitle(`지원 — ${APP_KO}`, `Support — ${APP_EN}`);

  const qa = [
    {
      q: L('어떻게 하는 게임인가요?', 'How does it work?'),
      a: L(
        '철학자의 이름이 붙은 명언 카드가 한 장씩 나옵니다. 진짜라고 생각하면 오른쪽, 가짜라면 왼쪽, 원문이 있지만 비틀렸다면 위로 밀어 판정하세요. 판정이 끝나면 증거 파일이 열리고, 진짜와 변조 판정에는 원문과 편집부 번역이 함께 나옵니다. 전시실 12곳의 사건을 풀어 위조범을 잡고, 매일 모두가 같은 문제를 푸는 오늘의 사건도 있습니다.',
        'Quote cards attributed to philosophers come up one at a time. Swipe right if you think it is Real, left if it is Fake, and up if there is a real source but the line has been Twisted. Each verdict opens an evidence file, and Real and Twisted verdicts also show the original text with our translation. Solve the cases in twelve rooms to catch the forgers — and try Today’s case, where everyone gets the same quotes each day.'
      ),
    },
    {
      q: L('진행 기록이 사라졌어요', 'My progress is gone'),
      a: L(
        '진행 기록은 그 기기 안에만 저장됩니다. 기기를 같은 기기의 iCloud 백업이나 컴퓨터 백업에서 복원하면 기록이 함께 돌아올 수 있습니다. 앱을 삭제하면 기록도 함께 지워지며, 회사 서버에 사본이 없어 저희가 되살려 드릴 수 없습니다.',
        'Your progress is stored only on the device. Restoring that device from its iCloud backup or a computer backup may bring it back. Deleting the app deletes the progress with it, and because there is no copy on any server of ours, we cannot recover it for you.'
      ),
    },
    {
      q: L('iPhone 과 iPad 에서 기록이 이어지나요?', 'Does my progress carry over between iPhone and iPad?'),
      a: L(
        '아니요. 기기 사이의 동기화 기능이 없어, 기기마다 기록이 따로 쌓입니다.',
        'No. There is no sync between devices, so each device keeps its own progress.'
      ),
    },
    {
      q: L('판정이 틀린 것 같아요', 'I think a verdict is wrong'),
      a: L(
        `알려 주시면 고맙겠습니다. 판정 화면 맨 아래의 '수상한 점 제보'를 누르면 그 사건이 적힌 수사본부 제보 양식이 열립니다. 편집부가 원문과 대조해 판결하고, 진행 상황은 사건 게시판에 접수번호로 올라갑니다. 채택된 제보에는 공로장을 드립니다. 메일(${MAIL})로 보내셔도 똑같이 접수합니다.`,
        `Please tell us — it helps. Tap “Something fishy? Report it” at the bottom of the verdict screen and the Case HQ report form opens with that case filled in. Our editors check it against the original, and progress is posted on the case board under your report number. Accepted reports earn a commendation. Emailing ${MAIL} works too.`
      ),
    },
    {
      q: L('감정받고 싶은 명언이 있어요', 'I have a quote I want checked'),
      a: L(
        `비망록 → 수사본부의 '수상한 명언 제보'를 누르거나, 이 사이트의 제보 양식(/fishyquotes/report)을 쓰세요. 앱 검색에 없는 문장이면 '이 명언 제보하기'를 눌러도 됩니다. 조사해서 판결하고, 새 사건이 되면 다음 업데이트에 실립니다.`,
        `Tap “Report a fishy quote” under My Book → Case HQ, or use the report form on this site (/fishyquotes/report). If a search in the app finds nothing, “Report this quote” works too. We investigate, post the verdict, and new cases join the next update.`
      ),
    },
    {
      q: L('공로장 코드는 어디에 넣나요?', 'Where do I enter a commendation code?'),
      a: L(
        '채택된 제보자에게 메일로 보내 드리는 코드입니다. 앱의 비망록 → 수사본부 → 코드 입력에 붙여 넣으면 \'명예 수사관\' 공로장이 비망록에 철해집니다. 코드는 기기 안에서 확인하며, 서버나 계정이 필요 없습니다.',
        'It is a code we email to reporters whose report is accepted. Paste it under My Book → Case HQ → Enter code in the app, and an “Honorary investigator” commendation is filed in your book. The code is checked on your device — no server or account needed.'
      ),
    },
    {
      q: L('소리가 나지 않아요', 'There is no sound'),
      a: L(
        '먼저 iPhone 이 무음 모드인지 확인하세요(옆면의 벨/무음 스위치나 동작 버튼, 또는 제어 센터). 볼륨 버튼으로 소리를 키워 보시고, 그래도 조용하면 앱의 비망록 → 설정에서 \'효과음\'이 켜져 있는지 봐 주세요.',
        'First check that the iPhone is not in Silent mode (the Ring/Silent switch or Action button on the side, or Control Center) and turn the volume up. If it is still quiet, make sure “Sound effects” is on under My Book → Settings in the app.'
      ),
    },
    {
      q: L('언어를 바꾸고 싶어요', 'How do I change the language?'),
      a: L(
        '앱 위쪽의 EN · 한 버튼을 누르면 영어와 한국어가 바로 바뀝니다.',
        'Tap the EN · 한 button at the top of the app to switch between English and Korean.'
      ),
    },
    {
      q: L('인터넷 연결이 필요한가요?', 'Do I need an internet connection?'),
      a: L(
        '아니요. 모든 사건과 원문이 앱 안에 들어 있어 비행기 모드에서도 똑같이 동작합니다. 판정의 출처 링크를 누를 때만 Safari 로 외부 사이트가 열립니다.',
        'No. Every case and every original text is bundled in the app, so it works the same in airplane mode. Only tapping a source link opens an outside website in Safari.'
      ),
    },
    {
      q: L('철학자 초상은 실제 모습인가요?', 'Are the portraits real likenesses?'),
      a: L(
        '아니요. 철학자 초상과 그림은 AI 그림 도구로 그린 상상도이며 역사 자료가 아닙니다. 앱의 판권면에도 적어 두었습니다.',
        'No. The portraits and other artwork were drawn with an AI image tool; they are imagined likenesses, not historical documents. The colophon in the app says so too.'
      ),
    },
    {
      q: L('iPad 에서도 쓸 수 있나요?', 'Does it work on iPad?'),
      a: L(
        '네. iOS 15 이상의 iPhone 과 iPad 에서 쓸 수 있습니다.',
        'Yes, on iPhone and iPad running iOS 15 or later.'
      ),
    },
    {
      q: L('광고나 협찬이 있나요?', 'Are there ads or sponsorships?'),
      a: L(
        '지금 버전에는 없습니다. 앞으로 제휴·협찬 콘텐츠가 실릴 수 있으며, 그때는 앱 안에 ‘협찬’이라고 표시합니다. 협찬이 있어도 계정이나 앱 안 추가 결제는 생기지 않고, 개인정보를 수집하거나 사용자를 추적하지 않습니다.',
        'Not in the current version. Partner or sponsored content may appear in future, and it will be labeled “Sponsored” in the app. Even then there is no account and no in-app purchase, and we collect no personal data and do not track you.'
      ),
    },
    {
      q: L('환불은 어떻게 하나요?', 'How do I get a refund?'),
      a: L(
        '구매와 환불은 Apple 이 처리합니다. reportaproblem.apple.com 에서 신청할 수 있습니다.',
        'Purchases and refunds are handled by Apple. You can request one at reportaproblem.apple.com.'
      ),
    },
  ];

  return (
    <div className="dl-wrap dl-narrow dl-doc">
      <h1>{L('지원', 'Support')}</h1>
      <p className="dl-meta">
        {L(
          '궁금한 점은 메일로 알려 주세요. 영업일 기준 사흘 안에 답합니다. 틀린 판정·번역이나 수상한 명언은 수사본부에 제보해 주세요.',
          'Questions? Email us — we reply within three business days. For a verdict or translation that looks wrong, or a fishy quote, please report it to Case HQ.'
        )}
      </p>

      <div className="dl-callout">
        <p>
          <strong>{L('문의', 'Contact')}</strong> ·{' '}
          <a
            className="dl-mailto"
            href={`mailto:${MAIL}?subject=${encodeURIComponent('[' + L(APP_KO, APP_EN) + '] ' + L('문의', 'Support'))}`}
          >
            {MAIL}
          </a>
        </p>
        <p>
          <strong>{L('수사본부', 'Case HQ')}</strong> ·{' '}
          <Link href="/fishyquotes/report">{L('수상한 명언 제보', 'Report a fishy quote')}</Link>
          {' · '}
          <Link href="/fishyquotes/cases">{L('사건 게시판', 'Case board')}</Link>
        </p>
        <p>
          {L(
            '메일 제목에 [수상한 명언]을 붙여 주시면 빨리 찾습니다. 기기 모델과 iOS 버전을 함께 적어 주시면 좋습니다.',
            'Putting [Fishy Quotes] in the subject helps us find it. Including your device model and iOS version helps more.'
          )}
        </p>
      </div>

      <h2>{L('자주 묻는 질문', 'Frequently asked questions')}</h2>
      <div>
        {qa.map((item, i) => (
          <details className="dl-qa" key={i} open={i === 0}>
            <summary>{item.q}</summary>
            <div className="dl-a">
              <p>{item.a}</p>
            </div>
          </details>
        ))}
      </div>

      <p className="dl-meta" style={{ marginTop: 30 }}>
        <Link href="/fishyquotes/privacy">{L('개인정보 처리방침', 'Privacy Policy')}</Link>
        {' · '}
        <Link href="/fishyquotes/terms">{L('이용 약관', 'Terms of Use')}</Link>
        {' · '}
        <Link href="/fishyquotes">{L('수상한 명언 홈', 'Fishy Quotes home')}</Link>
      </p>
    </div>
  );
}
