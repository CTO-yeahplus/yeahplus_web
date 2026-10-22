/* App Store Connect 의 Support URL (https://www.yeahplus.co.kr/munghae/support).
   메뉴 이름은 앱 문자열(MUNGHAE-Mem/src/content.js)과 똑같이 적는다. */

import { EMAIL } from '../site';

const FAQ: { ko: [string, string]; en: [string, string] }[] = [
  {
    ko: ['기록은 어디에 저장되나요?', '사진·편지·방명록·기념일 등 모든 기록은 이 iPhone 안에만 저장됩니다. 계정과 서버가 없어서 개발자도 볼 수 없습니다.'],
    en: ['Where are my records kept?', 'Every photo, letter, guestbook entry and date is kept only on this iPhone. There is no account or server, so not even the developer can see them.'],
  },
  {
    ko: ['휴대폰을 바꾸면 기록을 옮길 수 있나요?', '설정 → 백업 파일 내보내기로 기록과 사진을 담은 파일 하나를 파일 앱 등에 저장하세요. 새 휴대폰에서 설정 → 백업 파일 가져오기로 그 파일을 고르면 그대로 돌아옵니다. iCloud 기기 백업에도 앱 데이터가 함께 들어갑니다.'],
    en: ['Can I move my records to a new phone?', 'In Settings → Export backup file, save one file with your records and photos (for example to the Files app). On the new phone, choose that file in Settings → Import backup file and everything comes back. App data is also included in your iCloud device backup.'],
  },
  {
    ko: ['앱을 지우면 어떻게 되나요?', '기기 안의 기록이 모두 지워지고 되돌릴 수 없습니다. 지우기 전에 꼭 백업 파일을 내보내 두세요. 설정의 백업 줄에 마지막으로 백업한 날이 보입니다.'],
    en: ['What happens if I delete the app?', 'Everything stored on the device is removed and cannot be recovered. Please export a backup file first — the backup row in Settings shows when you last made one.'],
  },
  {
    ko: ['무료로 어디까지 쓸 수 있나요?', '사진·편지·방명록·기념일·촛불·49일의 배웅·스노우볼·멍·백업은 전부 무료이고 개수 제한이 없습니다. 간직 프로(한 번 구매, 평생)는 계절 테마·꾸미기 소품·카드와 아트웍 템플릿(살아있는 액자 포함)·배경 음악 전체와 여러 반려동물을 엽니다.'],
    en: ['What is free?', 'Photos, letters, the guestbook, anniversaries, candles, the 49-day farewell, the snow globe, Drift and backup are all free and unlimited. Keepsake Pro (one purchase, forever) unlocks every seasonal theme, decoration, card and artwork template (including Living Frame), all music and more than one companion.'],
  },
  {
    ko: ['구매한 프로가 사라졌어요.', '설정 → 프로 화면의 구매 복원을 눌러 주세요. 같은 Apple 계정이면 다시 열립니다.'],
    en: ['My Pro purchase is missing.', 'Tap Restore purchase on the Pro screen in Settings. It comes back on the same Apple account.'],
  },
  {
    ko: ['살아있는 액자가 보이지 않아요.', '사진에서 반려동물만 오려내는 기능은 iOS 17 이상에서 동작합니다. 그보다 낮은 버전에서는 사진이 둥근 액자로 보이고 살아있는 액자 템플릿은 숨겨집니다.'],
    en: ['I can’t find Living Frame.', 'Lifting your pet out of a photo needs iOS 17 or later. On earlier versions the photo appears in a round frame and the Living Frame template is hidden.'],
  },
  {
    ko: ['카드 구석의 작은 서명을 빼고 싶어요.', '설정 → 카드에 작은 서명을 끄면 저장하는 카드에 앱 이름이 들어가지 않습니다.'],
    en: ['Can I remove the small mark on cards?', 'Turn off Settings → Small signature on cards, and saved cards will no longer carry the app name.'],
  },
];

export default function SupportContent() {
  return (
    <div className="kp-wrap kp-doc">
      <div className="kp-doc-head">
        <h1>지원 · Support</h1>
        <div className="kp-sub">간직 · Keepsake</div>
      </div>

      <section>
        <h2>
          <span data-l="ko">자주 묻는 질문</span>
          <span data-l="en">Frequently asked questions</span>
        </h2>
        {FAQ.map((f) => (
          <details key={f.en[0]} className="kp-faq">
            <summary>
              <span data-l="ko">{f.ko[0]}</span>
              <span data-l="en">{f.en[0]}</span>
            </summary>
            <p>
              <span data-l="ko">{f.ko[1]}</span>
              <span data-l="en">{f.en[1]}</span>
            </p>
          </details>
        ))}
      </section>

      <section>
        <h2>
          <span data-l="ko">문의</span>
          <span data-l="en">Contact</span>
        </h2>
        <div className="kp-contact">
          <a className="kp-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <div className="kp-note">
            <span data-l="ko">쓰시는 iPhone 기종과 iOS 버전, 무슨 일이 있었는지 적어 주시면 더 빨리 도와드릴 수 있습니다.</span>
            <span data-l="en">Telling us your iPhone model, iOS version and what happened helps us answer faster.</span>
          </div>
        </div>
      </section>
    </div>
  );
}
