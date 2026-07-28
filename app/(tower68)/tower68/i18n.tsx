'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

/* ─────────────────────────────────────────────────────────────
   TOWER 68 — 랜딩 다국어 사전 (ko / en)
   원본: LANDING_JFK/landing (Vite + HashRouter) 를 Next.js 라우트로 이식.
   회사 정보는 법적 사실이므로 언어와 무관하게 동일 값(표기만 전환).
   ───────────────────────────────────────────────────────────── */

export const COMPANY = {
  name: '주식회사 예아플러스',
  nameEn: 'Yeahplus Inc.',
  ceo: '고재혁',
  ceoEn: 'Jaehyuk Ko',
  biz: '283-88-02519',
  mailorder: '2022-경기파주-2995',
  mailorderEn: '2022-Gyeonggi Paju-2995',
  addr: '경기도 파주시 교하로159번길 33, 3층 304호 에이318(목동동, 목동프라자)',
  addrEn: '3F 304-A318, 33 Gyoha-ro 159beon-gil, Paju-si, Gyeonggi-do, Republic of Korea',
  email: 'contact@yeahplus.co.kr',
} as const;

export const EFFECTIVE = '2026-08-01';

type Pair = readonly [string, string];

export const DICT = {
  ko: {
    label: '한국어',
    nav: { home: '홈', support: '지원', privacy: '개인정보', terms: '약관', contact: '문의' },
    footer: {
      home: '홈',
      support: '지원',
      privacy: '개인정보 처리방침',
      terms: '이용약관',
      contact: '문의',
      ceo: '대표',
      biz: '사업자등록번호',
      mailorder: '통신판매업신고',
      inquiry: '문의',
      rights: 'All rights reserved.',
      backToYeahplus: 'yeahplus 홈',
    },
    home: {
      badge: 'yeahplus 제작 · 캐주얼 아케이드',
      taglineA: 'JFK 관제탑 31년, 1시간 68대.',
      taglineB: '손끝으로 하늘의 질서를.',
      sub: '실화에서 영감을 받은 관제 아케이드. 손끝으로 비행기를 같은 색 활주로로 유도해 완벽한 버터 랜딩에 도전하세요.',
      appstore: 'App Store (준비 중)',
      faqBtn: '지원 · FAQ',
      note: '※ 실화에서 영감을 받은 픽션입니다.',
      featuresKicker: '게임 특징',
      featuresTitle: '관제탑의 1시간, 손안에서.',
      features: [
        { icon: 'route', title: '라인 드로잉 관제', desc: '손가락으로 선을 그어 비행기를 같은 색 활주로로 유도하세요.' },
        { icon: 'landing', title: '버터 랜딩', desc: '곧고 부드럽게 접지할수록 높은 판정 — 완벽하면 BUTTER!' },
        { icon: 'wind', title: '변수와 긴장감', desc: '우선착륙기·골든 플레인·돌풍·안개, 매 판 달라지는 관제 유형.' },
        { icon: 'trophy', title: '랭킹과 도전', desc: '글로벌 랭킹·일일 챌린지·콤보·스킨·업적으로 계속 도전.' },
        { icon: 'clip', title: '순간을 공유', desc: '버터 랜딩의 순간을 짧은 영상으로 저장해 친구에게 공유.' },
        { icon: 'radio', title: '명절엔 한국어 인사', desc: '설·추석·크리스마스엔 조종사와 무전 너머 한국어 안부를.' },
      ],
      howKicker: '플레이 방법',
      howTitle: '세 번의 손짓이면 충분합니다.',
      how: [
        { step: '01', title: '비행기를 잡는다', desc: '화면에 들어온 항공기를 손가락으로 짚습니다.' },
        { step: '02', title: '선을 긋는다', desc: '기체와 같은 색 활주로까지 경로를 그려 유도합니다.' },
        { step: '03', title: '버터로 앉힌다', desc: '곧고 부드럽게 접지하면 BUTTER 판정과 보너스 점수.' },
      ],
      statsKicker: '한눈에',
      stats: [
        { value: '68', label: '1시간의 기록' },
        { value: '31', label: '년의 관제탑' },
        { value: '1', label: '손가락이면 충분' },
      ],
      ctaTitle: '지금 관제석에 앉아보세요',
      ctaText: '한 손으로, 짧게, 그러나 깊게 빠져드는 관제의 세계.',
    },
    privacy: {
      title: '개인정보 처리방침',
      effective: `시행일: ${EFFECTIVE}`,
      intro:
        '주식회사 예아플러스(이하 "회사")는 「개인정보 보호법」 등 관련 법령을 준수하며, 앱 TOWER 68(이하 "서비스") 이용자의 개인정보를 소중히 다룹니다. 본 방침은 회사가 어떤 정보를 어떻게 처리하는지 설명합니다.',
      s: [
        ['1. 회원가입 및 로그인', '서비스는 회원가입이나 로그인이 필요하지 않습니다. 회사는 이름, 이메일, 전화번호 등 개인을 식별할 수 있는 정보를 서비스 이용 과정에서 직접 수집하지 않습니다.'],
        ['2. 기기 내 저장 정보', '최고 점수, 코인, 설정값(사운드·진동 등), 진행 상황 등은 이용자의 기기 내부에만 저장되며 회사 서버로 전송되지 않습니다. 앱을 삭제하면 해당 데이터도 함께 삭제됩니다.'],
        ['3. Game Center(랭킹)', '이용자가 글로벌 랭킹 기능을 사용할 경우, 점수는 Apple의 Game Center를 통해 처리·표시됩니다. 이 경우 해당 데이터의 처리는 Apple의 개인정보 처리방침을 따릅니다.'],
        ['4. 광고 및 자동 수집 정보', '본 버전의 서비스는 광고나 분석을 위한 개인정보를 수집하지 않습니다. 향후 앱 내 광고가 도입될 경우, 광고 파트너가 광고 제공 및 성과 측정을 위해 광고 식별자·기기 정보 등을 수집·처리할 수 있으며, 그 시점에 본 방침을 갱신하고 이용자에게 고지합니다.'],
        ['5. 제3자 제공', '회사는 이용자의 개인정보를 제3자에게 제공하지 않습니다. 랭킹 기능에 사용되는 Game Center는 Apple이 제공하는 서비스입니다.'],
        ['6. 아동의 개인정보', '서비스는 만 14세 미만 아동을 주 대상으로 하지 않으며, 아동의 개인정보를 고의로 수집하지 않습니다.'],
        ['7. 이용자의 권리 및 데이터 파기', '기기 내 데이터는 이용자가 앱을 삭제하거나 기기 설정에서 초기화함으로써 언제든지 삭제할 수 있습니다.'],
        ['9. 고지의 의무', '본 방침의 내용 추가·삭제·수정이 있을 경우 시행일 전에 서비스 내 공지 또는 본 페이지를 통해 고지합니다.'],
      ] as Pair[],
      contactTitle: '8. 개인정보 보호책임자 및 문의',
    },
    terms: {
      title: '이용약관',
      effective: `시행일: ${EFFECTIVE}`,
      s: [
        ['제1조 (목적)', '본 약관은 주식회사 예아플러스(이하 "회사")가 제공하는 모바일 애플리케이션 TOWER 68(이하 "서비스")의 이용과 관련하여 회사와 이용자 간의 권리·의무 및 책임사항을 규정함을 목적으로 합니다.'],
        ['제2조 (정의)', '"이용자"란 본 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 말합니다. 본 약관에서 정하지 않은 용어는 관계 법령 및 일반 관례에 따릅니다.'],
        ['제3조 (약관의 효력 및 변경)', '본 약관은 서비스 내 또는 본 페이지에 게시함으로써 효력이 발생합니다. 회사는 관련 법령을 위배하지 않는 범위에서 약관을 변경할 수 있으며, 변경 시 시행일과 변경 내용을 사전에 고지합니다.'],
        ['제4조 (서비스의 제공 및 변경)', '회사는 서비스의 내용, 기능, 구성 등을 운영상·기술상의 필요에 따라 변경할 수 있습니다. 회사는 서비스의 품질 향상을 위해 노력하나, 무중단·무결점을 보증하지는 않습니다.'],
        ['제5조 (이용자의 의무)', '이용자는 서비스의 정상적 운영을 방해하는 행위, 타인의 권리·명예를 침해하는 행위, 관련 법령 또는 공서양속에 위배되는 행위, 회사의 지식재산권을 침해하는 행위를 하여서는 안 됩니다.'],
        ['제6조 (지식재산권)', '서비스 및 서비스에 포함된 콘텐츠(디자인, 로고, 그래픽, 코드 등)에 대한 저작권 및 기타 지식재산권은 회사에 귀속됩니다. 이용자는 회사의 사전 동의 없이 이를 복제·배포·변형·상업적 이용할 수 없습니다.'],
        ['제7조 (유료 서비스 및 환불)', '서비스에 유료 항목(인앱결제 등)이 도입될 경우, 결제 및 환불은 Apple App Store의 정책과 관련 법령을 따릅니다. 본 버전에는 유료 항목이 포함되어 있지 않습니다.'],
        ['제8조 (면책)', '회사는 천재지변, 이용자의 귀책, 제3자 서비스(App Store, Game Center 등)의 장애 등 회사의 합리적 통제를 벗어난 사유로 인한 손해에 대해 책임을 지지 않습니다. 서비스는 오락 목적으로 제공되며, "실화에서 영감을 받은 픽션"입니다.'],
        ['제9조 (준거법 및 관할)', '본 약관은 대한민국 법령에 따라 규율되며, 서비스 이용과 관련한 분쟁에 대해서는 회사의 주소지를 관할하는 법원을 관할 법원으로 합니다.'],
      ] as Pair[],
      addendumTitle: '부칙',
      addendum: `본 약관은 ${EFFECTIVE}부터 시행합니다.`,
    },
    support: {
      title: '지원 · 자주 묻는 질문',
      intro: '궁금한 점이 있으신가요? 아래 FAQ를 확인하시고, 해결되지 않으면 언제든 문의해 주세요.',
      faq: [
        ['게임을 어떻게 하나요?', "'관제 시작'을 누른 뒤, 화면에 나타나는 비행기를 손가락으로 드래그해 같은 색 활주로로 유도하면 착륙합니다. 곧고 부드럽게 내려올수록 높은 판정(버터 랜딩)을 받습니다."],
        ['글로벌 랭킹이 보이지 않아요.', '글로벌 랭킹은 Apple Game Center를 사용합니다. 기기 설정 → Game Center에서 로그인되어 있는지 확인해 주세요. 로그인 후 게임을 한 판 하면 점수가 랭킹에 반영됩니다.'],
        ['기기를 바꾸니 기록이 사라졌어요.', '최고 점수·코인·설정은 기기 내부에 저장됩니다. 앱을 삭제하거나 기기를 변경하면 로컬 기록은 초기화됩니다. 단, Game Center에 올린 랭킹 점수는 Apple 계정에 유지됩니다.'],
        ['소리가 나지 않아요 / 화면이 너무 흔들려요.', '게임 내 설정에서 사운드, 진동, 모션 줄이기, 배터리 절약을 조절할 수 있습니다. 발열이 느껴지면 배터리 절약(30fps)을 켜보세요.'],
        ['광고나 결제가 있나요?', '현재 버전에는 광고와 인앱결제가 포함되어 있지 않습니다. 추후 업데이트로 도입될 수 있으며, 그 경우 별도로 안내드립니다.'],
      ] as Pair[],
      channelTitle: '문의 채널 및 응답 시간',
      channels: [
        ['이메일 문의', `${COMPANY.email} · 24시간 접수`],
        ['응답 시간', '영업일 기준 24시간 이내(주말·공휴일 제외, 최대 48시간)'],
        ['운영 시간', '평일 10:00 – 18:00 (KST, UTC+9)'],
      ] as Pair[],
      contactTitle: '문의하기',
      contactText:
        '추가 도움이 필요하시면 아래 이메일로 연락하시거나 문의 페이지를 이용해 주세요. 기기 모델과 iOS 버전, 문제 상황을 함께 적어주시면 빠르게 도와드릴 수 있습니다.',
    },
    contact: {
      title: '문의하기',
      intro: '아래 양식을 작성해 보내주시면, 기본 메일 앱을 통해 문의가 전달됩니다. 또는 아래 이메일로 직접 보내주셔도 됩니다.',
      name: '이름',
      email: '회신 받을 이메일',
      message: '문의 내용',
      send: '메일 보내기',
      companyTitle: '회사 정보',
      subjectPrefix: 'TOWER 68 문의',
      nameLabel: '이름',
      replyLabel: '회신 이메일',
    },
  },

  en: {
    label: 'English',
    nav: { home: 'Home', support: 'Support', privacy: 'Privacy', terms: 'Terms', contact: 'Contact' },
    footer: {
      home: 'Home',
      support: 'Support',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      contact: 'Contact',
      ceo: 'CEO',
      biz: 'Business Reg. No.',
      mailorder: 'Mail-order Reg.',
      inquiry: 'Contact',
      rights: 'All rights reserved.',
      backToYeahplus: 'yeahplus home',
    },
    home: {
      badge: 'Built by yeahplus · Casual arcade',
      taglineA: '31 years in the JFK tower. 68 landings in one hour.',
      taglineB: 'Bring order to the sky with your fingertip.',
      sub: 'A line-drawing air-traffic arcade inspired by a true story. Guide each plane to its matching runway and stick the perfect butter landing.',
      appstore: 'App Store (coming soon)',
      faqBtn: 'Support · FAQ',
      note: '* This game is fiction inspired by a true story.',
      featuresKicker: 'Features',
      featuresTitle: 'One hour in the tower, in your hand.',
      features: [
        { icon: 'route', title: 'Line-drawing control', desc: 'Draw a line to guide each plane to the runway of its color.' },
        { icon: 'landing', title: 'Butter landings', desc: 'The straighter and softer the touchdown, the higher the grade — nail it for BUTTER!' },
        { icon: 'wind', title: 'Tension & variety', desc: 'Priority landings, golden planes, gusts and fog, a new profile every run.' },
        { icon: 'trophy', title: 'Ranking & challenge', desc: 'Global leaderboard, daily challenge, combos, skins and achievements.' },
        { icon: 'clip', title: 'Share the moment', desc: 'Save the butter-landing moment as a short clip and share it.' },
        { icon: 'radio', title: 'Holiday greetings', desc: 'On holidays, exchange greetings with pilots over the radio in Korean.' },
      ],
      howKicker: 'How to play',
      howTitle: 'Three gestures. That is all.',
      how: [
        { step: '01', title: 'Grab a plane', desc: 'Touch an aircraft as it enters your airspace.' },
        { step: '02', title: 'Draw the path', desc: 'Trace a line to the runway that matches its color.' },
        { step: '03', title: 'Land it soft', desc: 'A straight, gentle touchdown earns a BUTTER grade and bonus points.' },
      ],
      statsKicker: 'At a glance',
      stats: [
        { value: '68', label: 'landings in one hour' },
        { value: '31', label: 'years in the tower' },
        { value: '1', label: 'finger is enough' },
      ],
      ctaTitle: 'Take your seat in the tower',
      ctaText: 'Pick up and play with one hand — short sessions, deep focus.',
    },
    privacy: {
      title: 'Privacy Policy',
      effective: `Effective date: ${EFFECTIVE}`,
      intro:
        'Yeahplus Inc. ("Company") complies with applicable laws including the Personal Information Protection Act and respects the privacy of users of the app TOWER 68 ("Service"). This policy explains what information the Company processes and how.',
      s: [
        ['1. Sign-up and login', 'The Service does not require sign-up or login. The Company does not directly collect personally identifiable information such as name, email, or phone number during use of the Service.'],
        ['2. On-device data', 'High scores, coins, settings (sound, haptics, etc.) and progress are stored only on the user’s device and are not transmitted to the Company’s servers. Deleting the app also deletes this data.'],
        ['3. Game Center (ranking)', 'When a user uses the global ranking feature, scores are processed and displayed through Apple Game Center. In that case, such data is handled under Apple’s privacy policy.'],
        ['4. Advertising and automatically collected data', 'This version of the Service does not collect personal data for advertising or analytics. If in-app advertising is introduced in the future, advertising partners may collect and process advertising identifiers and device information to deliver and measure ads; at that time this policy will be updated and users notified.'],
        ['5. Third-party sharing', 'The Company does not provide users’ personal data to third parties. Game Center, used for ranking, is a service provided by Apple.'],
        ['6. Children’s privacy', 'The Service is not primarily directed to children under 14 and does not knowingly collect children’s personal data.'],
        ['7. User rights and data deletion', 'On-device data can be deleted at any time by deleting the app or resetting it in device settings.'],
        ['9. Duty of notice', 'Any additions, deletions, or changes to this policy will be announced within the Service or on this page before the effective date.'],
      ] as Pair[],
      contactTitle: '8. Privacy officer and contact',
    },
    terms: {
      title: 'Terms of Use',
      effective: `Effective date: ${EFFECTIVE}`,
      s: [
        ['Article 1 (Purpose)', 'These Terms govern the rights, obligations and responsibilities between Yeahplus Inc. ("Company") and users regarding the use of the mobile application TOWER 68 ("Service").'],
        ['Article 2 (Definitions)', '"User" means a person who uses the Service under these Terms. Terms not defined here follow relevant laws and general practice.'],
        ['Article 3 (Effect and amendment)', 'These Terms take effect when posted within the Service or on this page. The Company may amend these Terms within the scope permitted by law, and will announce the effective date and changes in advance.'],
        ['Article 4 (Provision and change of the Service)', 'The Company may change the content, features and composition of the Service as operationally or technically necessary. The Company strives to improve quality but does not guarantee uninterrupted or error-free operation.'],
        ['Article 5 (User obligations)', 'Users must not interfere with the normal operation of the Service, infringe others’ rights or reputation, violate applicable laws or public order and morals, or infringe the Company’s intellectual property.'],
        ['Article 6 (Intellectual property)', 'Copyright and other intellectual property rights in the Service and its content (design, logo, graphics, code, etc.) belong to the Company. Users may not reproduce, distribute, modify, or commercially use them without prior consent.'],
        ['Article 7 (Paid services and refunds)', 'If paid items (such as in-app purchases) are introduced, payment and refunds follow Apple App Store policies and applicable laws. This version contains no paid items.'],
        ['Article 8 (Disclaimer)', 'The Company is not liable for damages arising from causes beyond its reasonable control, such as force majeure, user fault, or failures of third-party services (App Store, Game Center, etc.). The Service is provided for entertainment and is "fiction inspired by a true story."'],
        ['Article 9 (Governing law and jurisdiction)', 'These Terms are governed by the laws of the Republic of Korea, and disputes shall be subject to the court having jurisdiction over the Company’s address.'],
      ] as Pair[],
      addendumTitle: 'Addendum',
      addendum: `These Terms take effect on ${EFFECTIVE}.`,
    },
    support: {
      title: 'Support · FAQ',
      intro: 'Have a question? Check the FAQ below, and contact us anytime if it doesn’t help.',
      faq: [
        ['How do I play?', 'Tap the start button, then drag each incoming plane with your finger to the runway that matches its color to land it. The straighter and softer the touchdown, the higher your grade (butter landing).'],
        ['I can’t see the global ranking.', 'The global ranking uses Apple Game Center. Make sure you are signed in under Settings → Game Center. After signing in, play a round and your score will appear on the leaderboard.'],
        ['My records disappeared after changing devices.', 'High scores, coins and settings are stored on the device. Deleting the app or changing devices resets local records. However, scores submitted to Game Center stay with your Apple account.'],
        ['No sound / the screen shakes too much.', 'In the in-game settings you can adjust sound, haptics, Reduce Motion, and Battery Saver. If the device gets warm, try Battery Saver (30fps).'],
        ['Are there ads or purchases?', 'This version contains no ads or in-app purchases. They may be introduced in a future update, in which case we will provide separate notice.'],
      ] as Pair[],
      channelTitle: 'Contact channels and response time',
      channels: [
        ['Email', `${COMPANY.email} · received 24/7`],
        ['Response time', 'Within 24 hours on business days (excluding weekends and holidays; up to 48 hours)'],
        ['Business hours', 'Weekdays 10:00 – 18:00 (KST, UTC+9)'],
      ] as Pair[],
      contactTitle: 'Contact us',
      contactText:
        'If you need more help, email us below or use the contact page. Including your device model, iOS version and a description of the issue helps us assist you faster.',
    },
    contact: {
      title: 'Contact',
      intro: 'Fill out the form below and it will be sent via your default mail app. You can also email us directly at the address below.',
      name: 'Name',
      email: 'Reply email',
      message: 'Message',
      send: 'Send email',
      companyTitle: 'Company information',
      subjectPrefix: 'TOWER 68 inquiry',
      nameLabel: 'Name',
      replyLabel: 'Reply email',
    },
  },
};

export type Lang = 'ko' | 'en';
type Dict = (typeof DICT)['ko'];

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
} | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // 서버 렌더와 동일한 초기값('ko')으로 시작해 하이드레이션 불일치를 방지하고,
  // 마운트 후 저장값/브라우저 언어를 반영한다.
  const [lang, setLangState] = useState<Lang>('ko');

  useEffect(() => {
    let next: Lang | null = null;
    try {
      const saved = localStorage.getItem('t68_lang');
      if (saved === 'ko' || saved === 'en') next = saved;
    } catch {
      /* storage 접근 불가 환경 무시 */
    }
    if (!next) {
      const n = (navigator.language || 'ko').toLowerCase();
      next = n.startsWith('ko') ? 'ko' : 'en';
    }
    if (next !== 'ko') setLangState(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem('t68_lang', l);
    } catch {
      /* noop */
    }
  };

  return <I18nContext.Provider value={{ lang, setLang, t: DICT[lang] }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <button
      type="button"
      className="t68-lang"
      onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
      aria-label="language"
    >
      {lang === 'ko' ? 'EN' : '한'}
    </button>
  );
}
