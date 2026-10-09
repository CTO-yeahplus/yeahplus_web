/**
 * /meow 첫 화면(휠 인터랙티브) 문구 — 5개 언어.
 * 사실관계는 MYOHAE/docs/release_1.1.0.md(What's New · 심사 메모), docs/deco_template_design.md,
 * APPSTORE_METADATA.md 에서 가져왔다. 없는 기능·숫자는 쓰지 않는다.
 */
import type { Lang } from '../i18n';

type Copy = {
  hero: { kicker: string; line1: string; line2: string; lead: string; hint: string; sok: string };
  explode: { kicker: string; title: string; body: string; layers: [string, string, string, string]; after: string };
  deck: { kicker: string; title: string; body: string; free: string; lock: string; count: (n: number, all: number) => string };
  shuffle: { kicker: string; title: string; body: string; button: string; popOn: string; popOff: string; note: string; wall: string; frame: string; tiers: Record<'free' | 'sub' | 'pack', string> };
  gallery: { kicker: string; title: string; body: string; honest: string };
  remix: { kicker: string; title: string; body: string; feed: string; mine: string; done: string; chips: [string, string, string, string]; button: string };
  more: { title: string; items: { t: string; d: string }[]; draft: string; saved: string; churu: string };
  honest: { title: string; sub: string; items: { b: string; d: string }[] };
  final: { title: string; body: string; store: string; feed: string };
};

export const COPY: Record<Lang, Copy> = {
  ko: {
    hero: {
      kicker: '묘해 1.1 · 새로 나온 튀어나오기 템플릿',
      line1: '액자에 넣었더니,',
      line2: '쏙 나와 버렸어요.',
      lead: '집에서 찍은 우리 냥이 사진 한 장. 템플릿을 한 번 누르면 액자 밖으로 고개를 쏙 내밀어요.',
      hint: '휠을 굴려 보세요',
      sok: '쏙!',
    },
    explode: {
      kicker: '비밀을 털어놓자면',
      title: '같은 사진을 한 번 더 오려서, 액자 위에 얹었어요.',
      body: '창 안에는 사진을 그대로 끼우고, 똑같은 자리·크기로 오린 고양이를 액자 위에 한 장 더 올려요. 창 밖으로 나간 머리와 꼬리만 테두리 위에 보이고, 발은 액자 안에 남아요.',
      layers: ['배경', '사진', '액자', '한 번 더 오린 고양이'],
      after: '그래서 레이어는 전부 그대로예요. 액자를 돌려도, 고양이를 옮겨도 돼요.',
    },
    deck: {
      kicker: '꾸미기 템플릿',
      title: '꾸미기, 고민하지 마세요. 탭 한 번이면 끝.',
      body: '배경·액자·스티커가 한꺼번에 깔려요. 결과 그림 한 장이 아니라 레이어 묶음이라, 다 깔린 뒤에도 하나씩 고칠 수 있어요.',
      free: '무료',
      lock: '구독',
      count: (n, all) => `${all}개 중 ${n}번째`,
    },
    shuffle: {
      kicker: '섞기',
      title: '마음에 안 들면, 섞기.',
      body: '여기선 구독하면 열리는 배경·액자까지 한데 섞어 봤어요. 앱에서는 고른 템플릿과 같은 계열 안에서 바뀌고, 직접 올린 스티커는 그대로 남아요.',
      button: '섞기',
      popOn: '튀어나오기 켜짐',
      popOff: '튀어나오기 꺼짐',
      note: '직접 눌러 보세요. 앱에 들어 있는 배경·액자 파일 그대로예요.',
      wall: '배경', frame: '액자', tiers: { free: '무료', sub: '구독', pack: '팩' },
    },
    gallery: {
      kicker: '튀어나오기',
      title: '고양이마다 자리는 달라도, 쏙.',
      body: '사진 속 고양이가 어디에 있든, 앱이 위치를 보고 크기와 자리를 맞춰요. 휠을 굴리면 여덟 마리가 차례로 나와요. 배경과 액자는 구독·팩 재료로 골랐어요.',
      honest: '솔직히 말하면, 머리가 사진 위에서 잘린 컷은 튀어나올 수 없어요. 그럴 땐 액자에 얌전히 끼워 드려요.',
    },
    remix: {
      kicker: '따라 하기',
      title: '피드에서 본 그 꾸미기, 내 사진으로.',
      body: '마음에 든 게시물에서 ‘따라 하기’를 누르면 같은 배경·액자·텍스처·스티커가 내 사진에 그대로 깔려요.',
      feed: '피드에서 본 꾸미기',
      mine: '내 사진',
      done: '따라 하기 완료',
      chips: ['배경', '액자', '텍스처', '스티커 2'],
      button: '따라 하기',
    },
    more: {
      title: '그리고 원래 잘하던 것들',
      items: [
        { t: 'AI 아트', d: '탭 한 번에 우리 냥이가 다른 세상의 주인공으로. 파리의 노을, 필름 감성까지.' },
        { t: '전 세계 집사들의 피드', d: '자랑하고, 둘러보고, 팔로우하고. 로그인 없이도 구경할 수 있어요.' },
        { t: '초안 자동 저장', d: '꾸미다 나가도 괜찮아요. 나 › 초안에서 이어서 해요.' },
        { t: '에디터 안에서 바로', d: '팩과 츄르를 에디터에서 나가지 않고 살 수 있어요.' },
      ],
      draft: '초안', saved: '자동 저장됨', churu: '츄르',
    },
    honest: {
      title: '솔직하게 정리하면',
      sub: '좋은 말만 하면 재미없잖아요. 미리 아시면 좋은 것들.',
      items: [
        { b: '꾸미기는 무료', d: '기본 꾸미기와 무료 템플릿에는 돈이 들지 않아요.' },
        { b: '자물쇠 = 구독', d: '자물쇠 템플릿과 구독 배경·액자는 구독하면 열려요.' },
        { b: '츄르 1개 = 그림 1장', d: '츄르는 AI 아트에만 써요.' },
        { b: 'iOS 17 이상', d: '튀어나오기는 앱이 사진 속 고양이를 찾았을 때 돼요.' },
        { b: '광고 0', d: '1.1에서 광고 SDK를 아예 뺐어요.' },
      ],
    },
    final: {
      title: '우리 냥이도 쏙, 해 볼까요?',
      body: '사진 한 장이면 충분해요.',
      store: 'App Store에서 받기',
      feed: '피드 둘러보기',
    },
  },

  en: {
    hero: {
      kicker: 'MYOHAE 1.1 · New pop-out templates',
      line1: 'We put it in a frame.',
      line2: 'It popped right out.',
      lead: 'One photo of your cat, taken at home. Tap a template and your cat leans right out of the frame.',
      hint: 'Scroll with your wheel',
      sok: 'Pop!',
    },
    explode: {
      kicker: 'Here’s the secret',
      title: 'We cut the same photo out once more and set it on top of the frame.',
      body: 'The photo sits inside the window, and an identical cut-out of your cat goes on top of the frame, in exactly the same place and size. Only the head and tail that leave the window show over the border; the paws stay inside.',
      layers: ['Backdrop', 'Photo', 'Frame', 'Cut-out cat, once more'],
      after: 'So every layer stays a layer. Turn the frame, move the cat, it all still works.',
    },
    deck: {
      kicker: 'Decoration templates',
      title: 'Don’t overthink it. One tap and you’re done.',
      body: 'Backdrop, frame and stickers land all at once. It’s a stack of layers, not a flat picture, so you can still change each piece afterwards.',
      free: 'Free',
      lock: 'Subscriber',
      count: (n, all) => `${n} of ${all}`,
    },
    shuffle: {
      kicker: 'Shuffle',
      title: 'Not feeling it? Shuffle.',
      body: 'Here we threw the subscriber backdrops and frames into the mix too. In the app, shuffle stays within the family of the template you picked, and stickers you placed yourself stay put.',
      button: 'Shuffle',
      popOn: 'Pop-out on',
      popOff: 'Pop-out off',
      note: 'Go ahead and tap. These are the exact backdrop and frame files from the app.',
      wall: 'Backdrop', frame: 'Frame', tiers: { free: 'Free', sub: 'Subscriber', pack: 'Pack' },
    },
    gallery: {
      kicker: 'Pop-out',
      title: 'Every cat sits somewhere else. Every cat pops.',
      body: 'Wherever your cat is in the photo, the app finds it and sets the size and position. Keep scrolling and eight cats lean out, one after another. Backdrops and frames here are subscriber and pack pieces.',
      honest: 'To be honest: if the head is cut off at the top of the photo, it can’t pop out. In that case we tuck it neatly into the frame.',
    },
    remix: {
      kicker: 'Remix',
      title: 'That look you saw in the feed, on your own photo.',
      body: 'Tap “Remix” on a post you like and the same backdrop, frame, texture and stickers land on your photo.',
      feed: 'Seen in the feed',
      mine: 'Your photo',
      done: 'Remixed',
      chips: ['Backdrop', 'Frame', 'Texture', '2 stickers'],
      button: 'Remix',
    },
    more: {
      title: 'And the things it already did well',
      items: [
        { t: 'AI art', d: 'One tap and your cat stars in another world, from Paris sunsets to film-camera moods.' },
        { t: 'A feed of cat people worldwide', d: 'Show off, browse, follow. You can look around without signing in.' },
        { t: 'Auto-saved drafts', d: 'Leave mid-edit and pick it up again under Me › Drafts.' },
        { t: 'Right inside the editor', d: 'Buy packs and Churu without leaving the editor.' },
      ],
      draft: 'Draft', saved: 'Auto-saved', churu: 'Churu',
    },
    honest: {
      title: 'The straight answers',
      sub: 'Only saying the nice parts would be boring. Here’s what’s good to know up front.',
      items: [
        { b: 'Decorating is free', d: 'Basic decorating and the free templates cost nothing.' },
        { b: 'Lock = subscription', d: 'Locked templates and subscriber backdrops and frames open up with a subscription.' },
        { b: '1 Churu = 1 image', d: 'Churu is only for AI art.' },
        { b: 'iOS 17 or later', d: 'Pop-out works when the app can find the cat in the photo.' },
        { b: 'Zero ads', d: 'Version 1.1 removed the ad SDKs completely.' },
      ],
    },
    final: {
      title: 'Ready to make your cat pop?',
      body: 'One photo is all it takes.',
      store: 'Download on the App Store',
      feed: 'Browse the feed',
    },
  },

  ja: {
    hero: {
      kicker: 'MYOHAE 1.1 · 新しい「飛び出す」テンプレート',
      line1: 'フレームに入れたら、',
      line2: 'ぴょこっと出てきた。',
      lead: '家で撮ったうちの子の写真が一枚。テンプレートをタップすると、フレームの外へひょっこり顔を出します。',
      hint: 'ホイールを回してみて',
      sok: 'ぴょこっ!',
    },
    explode: {
      kicker: '種明かしをすると',
      title: '同じ写真をもう一度切り抜いて、フレームの上にのせています。',
      body: '窓には写真をそのまま入れ、同じ位置・同じ大きさで切り抜いた猫をフレームの上にもう一枚重ねます。窓からはみ出した頭やしっぽだけが縁の上に見え、足はフレームの中に残ります。',
      layers: ['背景', '写真', 'フレーム', 'もう一度切り抜いた猫'],
      after: 'だからレイヤーはそのまま。フレームを回しても、猫を動かしても大丈夫。',
    },
    deck: {
      kicker: 'デコテンプレート',
      title: '迷わなくていい。ワンタップで完成。',
      body: '背景・フレーム・ステッカーが一度に並びます。一枚の完成画像ではなくレイヤーの束なので、あとから一つずつ直せます。',
      free: '無料',
      lock: 'サブスク',
      count: (n, all) => `${all}個中 ${n}番目`,
    },
    shuffle: {
      kicker: 'シャッフル',
      title: 'しっくりこなければ、シャッフル。',
      body: 'ここではサブスクで使える背景・フレームまで混ぜてみました。アプリでは選んだテンプレートと同じ系統の中で入れ替わり、自分で貼ったステッカーはそのまま残ります。',
      button: 'シャッフル',
      popOn: '飛び出す オン',
      popOff: '飛び出す オフ',
      note: '押してみてください。アプリに入っている背景・フレームのファイルそのままです。',
      wall: '背景', frame: 'フレーム', tiers: { free: '無料', sub: 'サブスク', pack: 'パック' },
    },
    gallery: {
      kicker: '飛び出す',
      title: '猫の場所はそれぞれでも、ぴょこっ。',
      body: '写真のどこに猫がいても、アプリが位置を見て大きさと場所を合わせます。スクロールすると八匹が順番に顔を出します。背景とフレームはサブスク・パックの素材から選びました。',
      honest: '正直に言うと、頭が写真の上で切れているカットは飛び出せません。そのときはフレームにきちんと収めます。',
    },
    remix: {
      kicker: 'まねる',
      title: 'フィードで見たあのデコを、自分の写真に。',
      body: '気に入った投稿で「まねる」をタップすると、同じ背景・フレーム・テクスチャ・ステッカーが自分の写真にそのまま並びます。',
      feed: 'フィードで見たデコ',
      mine: '自分の写真',
      done: 'まねる完了',
      chips: ['背景', 'フレーム', 'テクスチャ', 'ステッカー2'],
      button: 'まねる',
    },
    more: {
      title: 'もともと得意なこと',
      items: [
        { t: 'AIアート', d: 'ワンタップで、うちの子が別世界の主人公に。パリの夕焼けからフィルムの雰囲気まで。' },
        { t: '世界中の飼い主のフィード', d: '自慢して、眺めて、フォローして。ログインなしでも見られます。' },
        { t: '下書きの自動保存', d: '途中でやめても大丈夫。マイ › 下書きから続けられます。' },
        { t: 'エディターの中で', d: 'パックとチュルをエディターを離れずに購入できます。' },
      ],
      draft: '下書き', saved: '自動保存済み', churu: 'チュル',
    },
    honest: {
      title: '正直にまとめると',
      sub: 'いいことばかり言ってもつまらないので。先に知っておくと安心なこと。',
      items: [
        { b: 'デコは無料', d: '基本のデコと無料テンプレートはお金がかかりません。' },
        { b: '鍵 = サブスク', d: '鍵つきテンプレートとサブスクの背景・フレームは、サブスクで開きます。' },
        { b: 'チュル1つ = 1枚', d: 'チュルを使うのは AI アートだけです。' },
        { b: 'iOS 17 以降', d: '飛び出すは、アプリが写真の中の猫を見つけたときに使えます。' },
        { b: '広告ゼロ', d: '1.1 で広告SDKを完全に外しました。' },
      ],
    },
    final: {
      title: 'うちの子も、ぴょこっとさせてみる？',
      body: '写真一枚で十分です。',
      store: 'App Store でダウンロード',
      feed: 'フィードを見る',
    },
  },

  zh: {
    hero: {
      kicker: 'MYOHAE 1.1 · 全新「跃出」模板',
      line1: '放进相框里，',
      line2: '它却探出头来了。',
      lead: '一张在家里拍的猫咪照片。点一下模板，猫咪就从相框里探出头来。',
      hint: '滚动鼠标滚轮试试',
      sok: '嗖！',
    },
    explode: {
      kicker: '说个小秘密',
      title: '我们把同一张照片再抠一次，叠在相框上面。',
      body: '照片原样放进相框的窗口里，再把同位置、同大小抠出的猫咪叠在相框上。只有探出窗口的头和尾巴会露在边框上，爪子留在相框里。',
      layers: ['背景', '照片', '相框', '再抠一次的猫咪'],
      after: '所以每一层都还是独立的。转动相框、移动猫咪都没问题。',
    },
    deck: {
      kicker: '装饰模板',
      title: '不用纠结，点一下就好。',
      body: '背景、相框、贴纸一次铺好。它不是一张成品图，而是一组图层，铺好之后还能逐个修改。',
      free: '免费',
      lock: '订阅',
      count: (n, all) => `共 ${all} 个 · 第 ${n} 个`,
    },
    shuffle: {
      kicker: '随机换',
      title: '不满意？随机换一下。',
      body: '这里把订阅才能用的背景和相框也混了进来。在 App 里，随机换只在所选模板的同一系列中替换，你自己贴的贴纸保持不动。',
      button: '随机换',
      popOn: '跃出 开',
      popOff: '跃出 关',
      note: '点点看。这些就是 App 里的背景和相框文件。',
      wall: '背景', frame: '相框', tiers: { free: '免费', sub: '订阅', pack: '素材包' },
    },
    gallery: {
      kicker: '跃出',
      title: '每只猫的位置不同，照样探出头。',
      body: '无论猫咪在照片的哪里，App 都会找到它并调整大小和位置。继续滚动，八只猫会依次探出头来。这里的背景和相框都选自订阅和素材包。',
      honest: '老实说，如果猫头在照片顶部被裁掉了，就没法跃出。这时我们会把照片乖乖放进相框里。',
    },
    remix: {
      kicker: '套用',
      title: '在动态里看到的装饰，用在自己的照片上。',
      body: '在喜欢的帖子上点「套用」，相同的背景、相框、纹理和贴纸就会铺到你的照片上。',
      feed: '动态里看到的装饰',
      mine: '我的照片',
      done: '套用完成',
      chips: ['背景', '相框', '纹理', '贴纸 2'],
      button: '套用',
    },
    more: {
      title: '还有原本就擅长的',
      items: [
        { t: 'AI 艺术', d: '点一下，猫咪就成了另一个世界的主角。从巴黎晚霞到胶片氛围。' },
        { t: '全球猫奴的动态', d: '晒图、浏览、关注。不登录也能逛。' },
        { t: '草稿自动保存', d: '装饰到一半离开也没关系，在「我 › 草稿」里继续。' },
        { t: '在编辑器里直接买', d: '不用离开编辑器就能买素材包和啾噜。' },
      ],
      draft: '草稿', saved: '已自动保存', churu: '啾噜',
    },
    honest: {
      title: '老实说',
      sub: '光说好话就没意思了。这些事先知道会更安心。',
      items: [
        { b: '装饰免费', d: '基本装饰和免费模板不花钱。' },
        { b: '带锁 = 订阅', d: '带锁模板和订阅背景、相框在订阅后解锁。' },
        { b: '1 个啾噜 = 1 张图', d: '啾噜只用于 AI 艺术。' },
        { b: 'iOS 17 及以上', d: 'App 在照片里找到猫咪时才能跃出。' },
        { b: '零广告', d: '1.1 版已经彻底移除广告 SDK。' },
      ],
    },
    final: {
      title: '让你家猫咪也探出头来？',
      body: '一张照片就够了。',
      store: '在 App Store 下载',
      feed: '逛逛动态',
    },
  },

  yue: {
    hero: {
      kicker: 'MYOHAE 1.1 · 全新「躍出」範本',
      line1: '放咗入相框，',
      line2: '佢就探個頭出嚟。',
      lead: '一張喺屋企影嘅貓仔相。撳一下範本，貓仔就由相框探頭出嚟。',
      hint: '轆一轆滑鼠滾輪',
      sok: '噗！',
    },
    explode: {
      kicker: '講個秘密你知',
      title: '我哋將同一張相再剪多一次，疊喺相框上面。',
      body: '相片原封不動放入相框個窗，再將同一位置、同一大小剪出嚟嘅貓仔疊喺相框上面。淨係探出窗外嘅頭同尾會喺邊框上見到，腳仔留喺相框入面。',
      layers: ['背景', '相片', '相框', '再剪多次嘅貓仔'],
      after: '所以每一層都仲係獨立嘅。轉相框、移貓仔都冇問題。',
    },
    deck: {
      kicker: '裝飾範本',
      title: '唔使諗咁多，撳一下就搞掂。',
      body: '背景、相框、貼紙一次過鋪好。佢唔係一張成品圖，而係一疊圖層，鋪好之後仲可以逐樣改。',
      free: '免費',
      lock: '訂閱',
      count: (n, all) => `共 ${all} 個 · 第 ${n} 個`,
    },
    shuffle: {
      kicker: '隨機換',
      title: '唔啱心水？隨機換。',
      body: '呢度連訂閱先用到嘅背景同相框都撈埋一齊。喺 App 入面，隨機換只會喺揀咗嘅範本同一系列入面換，你自己貼嘅貼紙唔會郁。',
      button: '隨機換',
      popOn: '躍出 開',
      popOff: '躍出 關',
      note: '試吓撳。呢啲就係 App 入面嘅背景同相框檔案。',
      wall: '背景', frame: '相框', tiers: { free: '免費', sub: '訂閱', pack: '素材包' },
    },
    gallery: {
      kicker: '躍出',
      title: '每隻貓嘅位置唔同，一樣探頭。',
      body: '無論貓仔喺相入面邊度，App 都會搵到佢再調好大小同位置。繼續轆，八隻貓會一隻接一隻探頭出嚟。呢度嘅背景同相框都係揀自訂閱同素材包。',
      honest: '老實講，如果貓頭喺相片頂部被切咗，就躍唔出嚟。咁我哋會乖乖將相放入相框。',
    },
    remix: {
      kicker: '套用',
      title: '喺動態見到嘅裝飾，用喺自己張相度。',
      body: '喺鍾意嘅帖文撳「套用」，同樣嘅背景、相框、紋理同貼紙就會鋪落你張相度。',
      feed: '動態見到嘅裝飾',
      mine: '我張相',
      done: '套用完成',
      chips: ['背景', '相框', '紋理', '貼紙 2'],
      button: '套用',
    },
    more: {
      title: '仲有本來就擅長嘅',
      items: [
        { t: 'AI 藝術', d: '撳一下，貓仔就變成另一個世界嘅主角。由巴黎晚霞到菲林氛圍。' },
        { t: '全球貓奴嘅動態', d: '曬相、睇吓、追蹤。唔登入都可以睇。' },
        { t: '草稿自動儲存', d: '整到一半走開都唔緊要，喺「我 › 草稿」繼續。' },
        { t: '喺編輯器入面直接買', d: '唔使離開編輯器就可以買素材包同啾嚕。' },
      ],
      draft: '草稿', saved: '已自動儲存', churu: '啾嚕',
    },
    honest: {
      title: '老老實實講',
      sub: '淨係講好嘢就冇癮啦。呢啲預先知道會安心啲。',
      items: [
        { b: '裝飾免費', d: '基本裝飾同免費範本唔使錢。' },
        { b: '有鎖 = 訂閱', d: '有鎖範本同訂閱背景、相框，訂閱之後就解鎖。' },
        { b: '1 個啾嚕 = 1 張圖', d: '啾嚕只係用喺 AI 藝術。' },
        { b: 'iOS 17 或以上', d: 'App 喺相入面搵到隻貓先可以躍出。' },
        { b: '零廣告', d: '1.1 版已經完全移除廣告 SDK。' },
      ],
    },
    final: {
      title: '等你隻貓都探個頭出嚟？',
      body: '一張相就夠。',
      store: '喺 App Store 下載',
      feed: '睇吓動態',
    },
  },
};
