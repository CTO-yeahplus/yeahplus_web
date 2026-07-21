'use client';

import React, { createContext, useContext, useState } from 'react';

// 지원 언어: 한국어 · 영어 · 일본어 · 만다린(简体) · 광둥어(繁體)
export type Lang = 'ko' | 'en' | 'ja' | 'zh' | 'yue';

export const LANGS: { code: Lang; label: string; aria: string }[] = [
  { code: 'ko', label: '한', aria: '한국어' },
  { code: 'en', label: 'EN', aria: 'English' },
  { code: 'ja', label: '日', aria: '日本語' },
  { code: 'zh', label: '简', aria: '普通话 (简体)' },
  { code: 'yue', label: '繁', aria: '廣東話 (繁體)' },
];

type FaqItem = { q: string; a: React.ReactNode };

type Dict = {
  nav: { feed: string; faq: string; terms: string; privacy: string; home: string; contact: string };
  footer: { copy: (year: number) => string };
  home: {
    badge: string;
    titleTop: string;
    titleAccent: string;
    lead: string;
    ctaAppStore: string;
    ctaFeed: string;
    features: { title: string; desc: string }[];
    subTitle: string;
    subLead: string;
  };
  gallery: { title: string; subtitle: string };
  faq: {
    title: string;
    items: FaqItem[];
    notFound: React.ReactNode;
  };
};

const MAIL = 'contact@yeahplus.co.kr';
const mailLink = <a href={`mailto:${MAIL}`}>{MAIL}</a>;
const privacyLink = (label: string) => <a href="/meow/privacy">{label}</a>;

export const dictionaries: Record<Lang, Dict> = {
  // ─────────────────────────────── 한국어 ───────────────────────────────
  ko: {
    nav: { feed: '피드', faq: 'FAQ', terms: '이용약관', privacy: '개인정보처리방침', home: '홈', contact: '문의' },
    footer: { copy: (y) => `© ${y} 주식회사 예아플러스 (yeahplus Co., Ltd.) All rights reserved.` },
    home: {
      badge: '우리 냥이가 주인공',
      titleTop: '집에서 찍은 우리 고양이,',
      titleAccent: '작품이 되다',
      lead:
        '고양이는 산책을 안 하니까, 집에서 먼저 찍고 상황에 맞게 꾸미세요. 스티커·프레임으로 꾸미고 AI 아트로 다른 세상 속 주인공으로 변신시켜, 전 세계 집사들과 나눠요.',
      ctaAppStore: 'App Store에서 받기',
      ctaFeed: '지금 올라온 피드 보기',
      features: [
        { title: '찍고, 바로 꾸미기', desc: '집에서 찍은 사진에 스티커·프레임·배경을 더해 우리 냥이만의 감성을 완성하세요.' },
        { title: 'AI 아트 변신', desc: '탭 한 번으로 파리 노을·필름 감성 등 다른 세상 속 주인공으로 변신시켜요.' },
        { title: '전 세계에 자랑', desc: '완성한 작품을 커뮤니티에 공유하고 팔로우로 이어지는 집사들과 만나세요.' },
      ],
      subTitle: '지금 우리 냥이를 주인공으로',
      subLead: '둘러보기는 로그인 없이도 자유롭게. 만들기·저장·공유는 간편 가입 후 이용하세요.',
    },
    gallery: {
      title: '한 장의 사진,\n무한한 변신.',
      subtitle: '스티커·프레임부터 AI 아트까지. 우리 냥이가 주인공이 되는 순간들.',
    },
    faq: {
      title: '자주 묻는 질문',
      items: [
        { q: '묘해는 어떤 앱인가요?', a: '집에서 찍은 우리 고양이 사진을 스티커·프레임으로 꾸미고, AI 아트로 변신시켜 커뮤니티에 공유하는 모바일 사진 앱입니다.' },
        { q: '회원가입을 꼭 해야 하나요?', a: '아니요. 커뮤니티 피드 둘러보기는 로그인 없이 자유롭게 이용할 수 있습니다. 만들기(촬영·꾸미기·AI), 좋아요·저장·댓글·팔로우, 상점 구매, 프로필·보관함 등 계정 기능은 로그인이 필요합니다.' },
        { q: '어떻게 로그인하나요?', a: 'Apple, Google, Kakao 간편 로그인 또는 이메일(인증 코드) 로그인을 지원합니다.' },
        { q: 'AI 변신은 어떻게 동작하나요?', a: '사진을 업로드하면 서버의 AI 모델이 선택한 테마로 재해석해 새로운 결과물을 만들어 줍니다. 네트워크 연결이 필요하며 몇 초 정도 걸릴 수 있습니다.' },
        { q: '무료로 쓸 수 있나요?', a: '기본 기능은 무료로 제공되며, 매월 일정량의 변환 크레딧(츄르)을 드립니다. 더 많은 변환·독점 에셋·구독은 인앱 결제로 이용할 수 있습니다.' },
        { q: '구독/결제는 어디서 관리하나요?', a: '모든 결제는 App Store(또는 Google Play)를 통해 이루어집니다. 구독 관리·해지와 환불 문의는 각 스토어의 계정 설정에서 진행합니다.' },
        { q: '보관함과 저장(위시)은 어떻게 다른가요?', a: '보관함은 내가 만든 작품 중 아직 공개하지 않은 비공개 드래프트를 모아두는 곳이고, 저장(위시)은 피드에서 마음에 든 다른 게시물을 북마크해 두는 곳입니다.' },
        { q: '내 사진과 개인정보는 안전한가요?', a: <>업로드한 사진은 서비스 제공(꾸미기·AI 변환·공유) 목적에 한해 처리됩니다. 자세한 내용은 {privacyLink('개인정보처리방침')}을 참고하세요.</> },
        { q: '계정을 삭제할 수 있나요?', a: '네. 앱의 설정 화면에서 계정 삭제를 진행할 수 있으며, 관련 데이터는 방침에 따라 처리됩니다.' },
        { q: '문의는 어디로 하나요?', a: <>{mailLink} 으로 연락 주세요.</> },
      ],
      notFound: <>원하는 답을 찾지 못하셨나요? {mailLink} 으로 문의해 주세요.</>,
    },
  },

  // ─────────────────────────────── English ───────────────────────────────
  en: {
    nav: { feed: 'Feed', faq: 'FAQ', terms: 'Terms', privacy: 'Privacy Policy', home: 'Home', contact: 'Contact' },
    footer: { copy: (y) => `© ${y} yeahplus Co., Ltd. All rights reserved.` },
    home: {
      badge: 'Your cat, the star',
      titleTop: 'The cat you shot at home,',
      titleAccent: 'becomes art',
      lead:
        'Cats don’t go for walks — so shoot at home first and dress up the shot to fit the mood. Decorate with stickers and frames, transform your cat into the star of another world with AI art, and share it with cat lovers everywhere.',
      ctaAppStore: 'Get it on the App Store',
      ctaFeed: 'See the latest feed',
      features: [
        { title: 'Shoot, then style instantly', desc: 'Add stickers, frames, and backgrounds to your home photos to capture your cat’s unique vibe.' },
        { title: 'AI art transformation', desc: 'With a single tap, turn your cat into the star of another world — a Paris sunset, film-grain mood, and more.' },
        { title: 'Show off worldwide', desc: 'Share your finished works to the community and meet fellow cat lovers who follow along.' },
      ],
      subTitle: 'Make your cat the star, right now',
      subLead: 'Browse freely without signing in. Sign up quickly to create, save, and share.',
    },
    gallery: {
      title: 'One photo.\nInfinite transformations.',
      subtitle: 'From stickers and frames to AI art — the moments your cat becomes the star.',
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        { q: 'What kind of app is MYOHAE?', a: 'A mobile photo app where you decorate home photos of your cat with stickers and frames, transform them with AI art, and share them to the community.' },
        { q: 'Do I have to sign up?', a: 'No. Browsing the community feed is free without logging in. Account features — creating (shooting, decorating, AI), likes/saves/comments/follows, store purchases, profile and library — require signing in.' },
        { q: 'How do I sign in?', a: 'We support quick sign-in with Apple, Google, and Kakao, or email (verification code) sign-in.' },
        { q: 'How does the AI transformation work?', a: 'When you upload a photo, our server-side AI model reinterprets it in the theme you choose to create a new result. A network connection is required and it may take a few seconds.' },
        { q: 'Is it free to use?', a: 'Core features are free, and you receive a set amount of conversion credits (“Churu”) each month. More conversions, exclusive assets, and subscriptions are available via in-app purchase.' },
        { q: 'Where do I manage subscriptions/payments?', a: 'All payments are processed through the App Store (or Google Play). Manage or cancel subscriptions and request refunds from your account settings in each store.' },
        { q: 'How is the Library different from Saved (Wish)?', a: 'The Library holds private drafts of your own works that you haven’t published yet, while Saved (Wish) is where you bookmark other posts you liked from the feed.' },
        { q: 'Are my photos and personal data safe?', a: <>Uploaded photos are processed only to provide the service (decoration, AI conversion, sharing). For details, see our {privacyLink('Privacy Policy')}.</> },
        { q: 'Can I delete my account?', a: 'Yes. You can delete your account from the app’s settings screen, and related data is handled according to our policy.' },
        { q: 'How do I get in touch?', a: <>Please reach us at {mailLink}.</> },
      ],
      notFound: <>Didn’t find the answer you were looking for? Contact us at {mailLink}.</>,
    },
  },

  // ─────────────────────────────── 日本語 ───────────────────────────────
  ja: {
    nav: { feed: 'フィード', faq: 'よくある質問', terms: '利用規約', privacy: 'プライバシーポリシー', home: 'ホーム', contact: 'お問い合わせ' },
    footer: { copy: (y) => `© ${y} yeahplus Co., Ltd. All rights reserved.` },
    home: {
      badge: 'うちの猫が主役',
      titleTop: 'おうちで撮ったうちの猫が、',
      titleAccent: '作品になる',
      lead:
        '猫はお散歩しないから、まずはおうちで撮って、シーンに合わせて飾りましょう。ステッカーやフレームでデコレーションし、AIアートで別世界の主役に変身させて、世界中の猫好きとシェアできます。',
      ctaAppStore: 'App Storeで入手',
      ctaFeed: '最新のフィードを見る',
      features: [
        { title: '撮って、すぐデコ', desc: 'おうちで撮った写真にステッカー・フレーム・背景を重ねて、うちの猫だけの雰囲気を完成させましょう。' },
        { title: 'AIアート変身', desc: 'ワンタップで、パリの夕焼けやフィルム調など、別世界の主役に変身させられます。' },
        { title: '世界に自慢', desc: '完成した作品をコミュニティにシェアして、フォローでつながる猫好きたちと出会いましょう。' },
      ],
      subTitle: 'いま、うちの猫を主役に',
      subLead: '閲覧はログインなしで自由に。作成・保存・シェアはかんたん登録後にご利用ください。',
    },
    gallery: {
      title: '一枚の写真から、\n無限の変身。',
      subtitle: 'ステッカー・フレームからAIアートまで。うちの猫が主役になる瞬間。',
    },
    faq: {
      title: 'よくある質問',
      items: [
        { q: '묘해（MYOHAE）はどんなアプリですか？', a: 'おうちで撮った猫の写真をステッカーやフレームで飾り、AIアートで変身させてコミュニティにシェアするモバイル写真アプリです。' },
        { q: '会員登録は必須ですか？', a: 'いいえ。コミュニティフィードの閲覧はログインなしで自由にご利用いただけます。作成（撮影・デコ・AI）、いいね・保存・コメント・フォロー、ストア購入、プロフィール・ライブラリなどのアカウント機能にはログインが必要です。' },
        { q: 'ログイン方法は？', a: 'Apple・Google・Kakaoのかんたんログイン、またはメール（認証コード）ログインに対応しています。' },
        { q: 'AI変身はどのように動作しますか？', a: '写真をアップロードすると、サーバー上のAIモデルが選んだテーマで再解釈し、新しい作品を生成します。ネットワーク接続が必要で、数秒かかる場合があります。' },
        { q: '無料で使えますか？', a: '基本機能は無料で、毎月一定量の変換クレジット（チュール）を差し上げます。追加の変換・限定アセット・サブスクリプションはアプリ内課金でご利用いただけます。' },
        { q: 'サブスク／決済はどこで管理しますか？', a: 'すべての決済はApp Store（またはGoogle Play）を通じて行われます。サブスクの管理・解約や返金のお問い合わせは、各ストアのアカウント設定から行ってください。' },
        { q: 'ライブラリと保存（ウィッシュ）の違いは？', a: 'ライブラリは、自分が作った作品のうちまだ公開していない非公開の下書きをまとめる場所です。保存（ウィッシュ）は、フィードで気に入った他の投稿をブックマークしておく場所です。' },
        { q: '写真や個人情報は安全ですか？', a: <>アップロードした写真は、サービス提供（デコ・AI変換・シェア）の目的に限り処理されます。詳しくは{privacyLink('プライバシーポリシー')}をご覧ください。</> },
        { q: 'アカウントを削除できますか？', a: 'はい。アプリの設定画面からアカウント削除を行うことができ、関連データはポリシーに従って処理されます。' },
        { q: 'お問い合わせ先は？', a: <>{mailLink} までご連絡ください。</> },
      ],
      notFound: <>お探しの答えが見つかりませんでしたか？ {mailLink} までお問い合わせください。</>,
    },
  },

  // ────────────────────────── 普通话 (简体中文) ──────────────────────────
  zh: {
    nav: { feed: '动态', faq: '常见问题', terms: '使用条款', privacy: '隐私政策', home: '首页', contact: '联系我们' },
    footer: { copy: (y) => `© ${y} yeahplus Co., Ltd. 保留所有权利。` },
    home: {
      badge: '我家猫咪当主角',
      titleTop: '在家拍下的猫咪，',
      titleAccent: '变成作品',
      lead:
        '猫咪不出门散步，那就先在家拍，再按场景装饰吧。用贴纸和相框点缀，用 AI 艺术把猫咪变成另一个世界的主角，和全世界的铲屎官一起分享。',
      ctaAppStore: '在 App Store 下载',
      ctaFeed: '查看最新动态',
      features: [
        { title: '拍完即装饰', desc: '给在家拍的照片叠加贴纸、相框和背景，打造只属于你家猫咪的氛围感。' },
        { title: 'AI 艺术变身', desc: '轻轻一点，就能把猫咪变成巴黎晚霞、胶片质感等另一个世界的主角。' },
        { title: '向全世界炫耀', desc: '把完成的作品分享到社区，结识因关注而相连的铲屎官们。' },
      ],
      subTitle: '现在就让你家猫咪当主角',
      subLead: '浏览无需登录，自由自在。创作、保存、分享请在快速注册后使用。',
    },
    gallery: {
      title: '一张照片，\n无限变身。',
      subtitle: '从贴纸、相框到 AI 艺术——猫咪成为主角的每一刻。',
    },
    faq: {
      title: '常见问题',
      items: [
        { q: 'MYOHAE（묘해）是什么样的应用？', a: '这是一款移动照片应用：用贴纸和相框装饰在家拍的猫咪照片，用 AI 艺术让它变身，并分享到社区。' },
        { q: '一定要注册吗？', a: '不需要。浏览社区动态无需登录即可自由使用。创作（拍摄、装饰、AI）、点赞/收藏/评论/关注、商店购买、个人资料与收藏库等账号功能需要登录。' },
        { q: '如何登录？', a: '支持 Apple、Google、Kakao 快捷登录，或邮箱（验证码）登录。' },
        { q: 'AI 变身是如何运作的？', a: '上传照片后，服务器端的 AI 模型会按你选择的主题重新演绎，生成新的作品。需要联网，可能需要几秒钟。' },
        { q: '可以免费使用吗？', a: '基础功能免费提供，并每月赠送一定数量的转换额度（Churu）。更多转换、专属素材和订阅可通过应用内购买使用。' },
        { q: '订阅／付款在哪里管理？', a: '所有付款都通过 App Store（或 Google Play）进行。订阅的管理、取消及退款咨询，请在各商店的账号设置中办理。' },
        { q: '收藏库和收藏（心愿）有什么区别？', a: '收藏库用于存放你创作但尚未公开的私密草稿；收藏（心愿）则用于把动态中喜欢的他人作品收藏起来。' },
        { q: '我的照片和个人信息安全吗？', a: <>上传的照片仅用于提供服务（装饰、AI 转换、分享）。详情请参阅我们的{privacyLink('隐私政策')}。</> },
        { q: '可以删除账号吗？', a: '可以。你可以在应用的设置页面删除账号，相关数据将按政策处理。' },
        { q: '如何联系你们？', a: <>请通过 {mailLink} 与我们联系。</> },
      ],
      notFound: <>没有找到想要的答案吗？请通过 {mailLink} 联系我们。</>,
    },
  },

  // ────────────────────────── 廣東話 (繁體中文) ──────────────────────────
  yue: {
    nav: { feed: '動態', faq: '常見問題', terms: '使用條款', privacy: '私隱政策', home: '主頁', contact: '聯絡我們' },
    footer: { copy: (y) => `© ${y} yeahplus Co., Ltd. 版權所有。` },
    home: {
      badge: '我隻貓做主角',
      titleTop: '喺屋企影嘅貓貓，',
      titleAccent: '變成作品',
      lead:
        '貓貓唔使去散步，所以喺屋企先影，再按場景嚟裝飾啦。用貼紙同相框裝飾，用 AI 藝術將貓貓變成另一個世界嘅主角，同全世界嘅貓奴一齊分享。',
      ctaAppStore: '喺 App Store 下載',
      ctaFeed: '睇最新動態',
      features: [
        { title: '影完即裝飾', desc: '喺屋企影嘅相加上貼紙、相框同背景，整出只屬於你隻貓嘅感覺。' },
        { title: 'AI 藝術變身', desc: '撳一下，就可以將貓貓變成巴黎晚霞、菲林質感等另一個世界嘅主角。' },
        { title: '同全世界炫耀', desc: '將完成嘅作品分享到社群，識到因關注而連繫嘅貓奴。' },
      ],
      subTitle: '而家就等你隻貓做主角',
      subLead: '瀏覽唔使登入，自由自在。創作、儲存、分享請喺快速註冊後使用。',
    },
    gallery: {
      title: '一張相，\n變化無限。',
      subtitle: '由貼紙、相框到 AI 藝術——貓貓做主角嘅每一刻。',
    },
    faq: {
      title: '常見問題',
      items: [
        { q: 'MYOHAE（묘해）係咩應用程式？', a: '呢個係一款手機相片應用：用貼紙同相框裝飾喺屋企影嘅貓貓相，再用 AI 藝術變身，然後分享到社群。' },
        { q: '一定要註冊嗎？', a: '唔使。瀏覽社群動態唔使登入都可以自由使用。創作（影相、裝飾、AI）、讚好／收藏／留言／追蹤、商店購買、個人檔案同收藏庫等帳戶功能就需要登入。' },
        { q: '點樣登入？', a: '支援 Apple、Google、Kakao 快捷登入，或者電郵（驗證碼）登入。' },
        { q: 'AI 變身係點運作？', a: '上載相片後，伺服器端嘅 AI 模型會按你揀嘅主題重新演繹，生成新作品。需要連網，可能要幾秒。' },
        { q: '可以免費用嗎？', a: '基本功能免費提供，每月仲會送一定數量嘅轉換額度（Churu）。更多轉換、專屬素材同訂閱可以透過應用程式內購買使用。' },
        { q: '訂閱／付款喺邊度管理？', a: '所有付款都經 App Store（或 Google Play）進行。訂閱嘅管理、取消同退款查詢，請喺各商店嘅帳戶設定辦理。' },
        { q: '收藏庫同收藏（心願）有咩分別？', a: '收藏庫係放你創作但仲未公開嘅私密草稿；收藏（心願）就係將動態入面鍾意嘅他人作品加入書籤。' },
        { q: '我嘅相片同個人資料安全嗎？', a: <>上載嘅相片只會用嚟提供服務（裝飾、AI 轉換、分享）。詳情請參閱我哋嘅{privacyLink('私隱政策')}。</> },
        { q: '可以刪除帳戶嗎？', a: '可以。你可以喺應用程式嘅設定頁面刪除帳戶，相關資料會按政策處理。' },
        { q: '點樣聯絡你哋？', a: <>請透過 {mailLink} 聯絡我哋。</> },
      ],
      notFound: <>搵唔到想要嘅答案？請透過 {mailLink} 聯絡我哋。</>,
    },
  },
};

// ─────────────────────────────── Context ───────────────────────────────
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict } | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko');
  return <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}

// 우측 하단 플로팅 언어 토글
export function LanguageToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l.code}
          type="button"
          onClick={() => setLang(l.code)}
          aria-label={l.aria}
          aria-pressed={lang === l.code}
          className={lang === l.code ? 'active' : ''}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
