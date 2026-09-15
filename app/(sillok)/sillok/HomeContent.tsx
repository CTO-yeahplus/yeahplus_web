'use client';

/* 원본 sillok/site/index.html 의 본문을 기계 변환한 것.
   scripts/conv_sillok.py 로 찍어낸 파일이다 — 문구를 고칠 일이 생기면
   sillok/site 쪽 HTML 을 먼저 고치고 생성기를 다시 돌리는 편이 안전하다. */

export default function HomeContent() {
  return (
    <>
      {/* ══════════════════ 히어로 ══════════════════ */}
      <header className="sl-hero">
        <div className="sl-wrap">
          <div className="sl-seal" aria-hidden="true">史</div>

          <div className="sl-hero-sub">
            <span data-l="ko">조선 500년 · 27명의 왕</span>
            <span data-l="en">500 YEARS · 27 KINGS</span>
          </div>

          <h1>
            <span data-l="ko">조선왕조실록 — 왕의 선택</span>
            <span data-l="en">Joseon Annals: King's Choice</span>
          </h1>

          <p className="sl-hero-pitch">
            <span data-l="ko">아이가 조선 27명의 왕이 되어, 실록에 실제로 기록된 사건을 하나씩 결정합니다. 고른{' '}<b>다음에</b>{' '}사관이 붓을 들고 나타나 실제 역사를 보여줍니다. 결정이 쌓이면 「나의 조선왕조실록」 한 권이 만들어집니다.</span>
            <span data-l="en">Your child rules as each of Joseon's 27 kings, deciding events that were actually recorded in the annals.{' '}<b>After</b>{' '}the choice, the court historian appears and shows what really happened. The decisions add up into one book: "My Annals of Joseon."</span>
          </p>

          <div className="sl-store-row">
            <a href="#" id="appstore" className="sl-store-btn sl-plain" aria-disabled="true">
              <span>
                <small data-l="ko">iPhone · iPad</small>
                <small data-l="en">iPhone · iPad</small>
                <span data-l="ko">App Store 곧 출시</span>
                <span data-l="en">Coming soon to the App Store</span>
              </span>
            </a>
            <span className="sl-price-note">
              <span data-l="ko">유료 앱 · 한 번 구매하면 추가 결제 없음 (가격은 App Store 참조)</span>
              <span data-l="en">Paid app · one purchase, nothing more (see the App Store for pricing)</span>
            </span>
          </div>

          <div className="sl-badges">
            <span className="sl-badge"><span data-l="ko">초등 3~6학년</span><span data-l="en">Ages 9–12</span></span>
            <span className="sl-badge"><span data-l="ko">한국어 · English</span><span data-l="en">Korean · English</span></span>
            <span className="sl-badge"><span data-l="ko">완전 오프라인</span><span data-l="en">Fully offline</span></span>
            <span className="sl-badge"><span data-l="ko">광고 없음</span><span data-l="en">No ads</span></span>
            <span className="sl-badge"><span data-l="ko">인앱결제 없음</span><span data-l="en">No in-app purchases</span></span>
            <span className="sl-badge"><span data-l="ko">데이터 수집 없음</span><span data-l="en">No data collected</span></span>
          </div>
        </div>
      </header>

      <div className="sl-wrap">

      {/* ══════════════════ 왜 퀴즈 앱이 아닌가 ══════════════════ */}
      <section id="why">
        <h2>
          <span className="sl-brush" aria-hidden="true">✒</span>
          <span data-l="ko">왜 퀴즈 앱이 아닌가</span>
          <span data-l="en">Why this is not a quiz app</span>
        </h2>
        <p className="sl-sec-lead">
          <span data-l="ko">이 게임에서 가장 중요한 설계 결정입니다. 아이에게 정답을 묻지 않습니다.</span>
          <span data-l="en">This is the single most important design decision in the game. We never ask the child for the right answer.</span>
        </p>

        <div className="sl-contrast">
          <div className="sl-c-no">
            <div className="sl-c-tag"><span data-l="ko">흔한 방식</span><span data-l="en">THE USUAL WAY</span></div>
            <p data-l="ko">역사를 문제로 바꾸어 묻습니다. 아이는 첫 화면에서 이미{' '}<b>학습지</b>라는 것을 알아채고 틀리지 않는 데만 집중합니다. 외운 답을 확인하는 자리라서, 답을 모르면 그냥 앱을 닫습니다.</p>
            <p data-l="en">History gets turned into questions. On the first screen the child recognizes a{' '}<b>worksheet</b>{' '}and starts playing not to be wrong. It only checks what was already memorized — so when the answer isn't known, the app simply gets closed.</p>
          </div>
          <div className="sl-c-yes">
            <div className="sl-c-tag"><span data-l="ko">이 게임</span><span data-l="en">THIS GAME</span></div>
            <p data-l="ko">아이에게{' '}<b>권한</b>을 줍니다. 왜란 앞에서 군사를 늘릴지 세금을 덜어 줄지, 새 글자를 반대하는 신하를 물리칠지 달랠지 — 왕으로서 고릅니다. 선택지 두 개는{' '}<b>둘 다 그럴듯합니다.</b>{' '}맞고 틀림 표시가 없습니다.</p>
            <p data-l="en">The child is given{' '}<b>authority</b>. Raise an army or lighten the taxes before an invasion; overrule or win over the officials opposing the new alphabet — the child decides as king. Both options are{' '}<b>genuinely reasonable.</b>{' '}Nothing is marked right or wrong.</p>
          </div>
        </div>

        <div className="sl-quote">
          <span data-l="ko">실제 실록에는 이렇게 적혀 있습니다.</span>
          <span data-l="en">Here is what the annals actually record.</span>
          <span className="sl-quote-by">
            <span data-l="ko">— 선택을 마친 뒤 사관이 펼쳐 보이는 【실록 대조】 화면</span>
            <span data-l="en">— the Annals Comparison panel, shown only after the choice is made</span>
          </span>
        </div>

        <h3>
          <span data-l="ko">학습은 게임의 보상이지, 게임에 들어가는 관문이 아닙니다</span>
          <span data-l="en">Learning is the reward, not the gate</span>
        </h3>
        <p>
          <span data-l="ko">아이가 결정을 내린{' '}<b>다음에</b>야 실제 역사가 나타납니다. 자기 선택과 실제가 같으면 사관이 인정하며 사초 조각을 남기고, 다르면 「만약의 조선」이 어떻게 흘렀을지 한두 문장으로 보여 줍니다. 어느 쪽이든 역사 서술을 반드시 읽게 되지만, 그때는 이미 아이가 그 사건의 결정권자였습니다. 자기가 내린 결정이라 궁금해서 읽습니다.</span>
          <span data-l="en">Real history appears only{' '}<b>after</b>{' '}the decision. If the choice matches what actually happened, the historian acknowledges it and leaves a fragment of the record; if it differs, one or two sentences sketch the Joseon that might have been. Either way the child reads the history — but by then the child was the one who decided. It gets read out of curiosity about one's own decision.</span>
        </p>
        <p>
          <span data-l="ko">지표가 0이 되어도 게임이 끝나지 않습니다. 대신 위기 사건이 들어오고 다음 왕이 이어받습니다. 실제 조선도 큰 전란을 겪고도 이어졌습니다 — 실패로 플레이가 끊기지 않는 편이 역사적으로도 더 정확합니다.</span>
          <span data-l="en">A stat hitting zero does not end the game. A crisis event is inserted instead and the next king carries on. Joseon itself endured major wars and continued — not ending on failure is the more historically accurate design.</span>
        </p>
      </section>

      {/* ══════════════════ 진행 방식 ══════════════════ */}
      <section id="how">
        <h2>
          <span className="sl-brush" aria-hidden="true">✒</span>
          <span data-l="ko">한 명의 왕, 약 5분</span>
          <span data-l="en">One king, about five minutes</span>
        </h2>
        <p className="sl-sec-lead">
          <span data-l="ko">태조부터 순종까지 27대를 차례로 다스립니다. 전체 완주는 약 150분, 이어하기를 지원합니다.</span>
          <span data-l="en">Rule all 27 reigns in order, from Taejo to Sunjong. A full run takes about 150 minutes, and progress is saved.</span>
        </p>

        <div className="sl-loop">
          <ol>
            <li>
              <span className="sl-n" aria-hidden="true">1</span>
              <span className="sl-lt">
                <b><span data-l="ko">즉위</span><span data-l="en">Enthronement</span></b>
                <span data-l="ko">왕의 이름, 재위 기간, 즉위한 나이를 봅니다. 앞선 왕이 남긴 나라 상태를 그대로 물려받습니다.</span>
                <span data-l="en">See the king's name, reign years and age at accession — and inherit the country exactly as the previous king left it.</span>
              </span>
            </li>
            <li>
              <span className="sl-n" aria-hidden="true">2</span>
              <span className="sl-lt">
                <b><span data-l="ko">사건 카드 3~5장</span><span data-l="en">Three to five event cards</span></b>
                <span data-l="ko">두루마리 상소가 펼쳐집니다. 상황 서너 문장을 읽고 선택지 두세 개 중 하나를 고릅니다.</span>
                <span data-l="en">A scroll unfurls. Read three or four sentences of context, then pick one of two or three courses of action.</span>
              </span>
            </li>
            <li>
              <span className="sl-n" aria-hidden="true">3</span>
              <span className="sl-lt">
                <b><span data-l="ko">나라가 움직인다</span><span data-l="en">The country responds</span></b>
                <span data-l="ko">민심·국고·국방·문화가 오르내립니다. 한 선택은 반드시 두 개 이상의 지표를 건드립니다 — 모든 결정에는 대가가 있습니다.</span>
                <span data-l="en">People, Treasury, Defense and Culture shift. Every choice moves at least two of them — every decision costs something.</span>
              </span>
            </li>
            <li>
              <span className="sl-n" aria-hidden="true">4</span>
              <span className="sl-lt">
                <b><span data-l="ko">【실록 대조】</span><span data-l="en">Annals Comparison</span></b>
                <span data-l="ko">사관이 실제로 무슨 일이 있었는지 들려줍니다. 출처는 실록의 권과 날짜로 표기합니다.</span>
                <span data-l="en">The court historian tells what actually happened, cited by the annals' volume and date.</span>
              </span>
            </li>
            <li>
              <span className="sl-n" aria-hidden="true">5</span>
              <span className="sl-lt">
                <b><span data-l="ko">승하, 그리고 한 줄의 기록</span><span data-l="en">Death, and one line in the record</span></b>
                <span data-l="ko">그 왕의 선택들을 모아 실록 문장 한두 줄이 만들어집니다. 27대가 끝나면 「나의 조선왕조실록」이 완성됩니다.</span>
                <span data-l="en">The reign's choices are composed into a line or two of annal prose. After 27 reigns, "My Annals of Joseon" is complete.</span>
              </span>
            </li>
          </ol>
        </div>
      </section>

      {/* ══════════════════ 4지표 ══════════════════ */}
      <section id="stats">
        <h2>
          <span className="sl-brush" aria-hidden="true">✒</span>
          <span data-l="ko">나라의 네 가지 형편</span>
          <span data-l="en">Four measures of the country</span>
        </h2>
        <p className="sl-sec-lead">
          <span data-l="ko">이 네 숫자는 다음 왕에게 그대로 넘어갑니다. 앞선 왕이 쌓아 둔 곳간을 다음 왕이 비울 수도 있습니다 — 「역사는 이어진다」를 설명 없이 체감하게 하는 장치입니다.</span>
          <span data-l="en">These four numbers pass untouched to the next king. One reign's full granary can be emptied by the next — that is how the game conveys historical continuity without explaining it.</span>
        </p>

        <div className="sl-stat-grid">
          <div className="sl-stat" data-k="people">
            <svg viewBox="0 0 24 24" fill="none" stroke="#3f6b4f" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><path d="M12 21V9" /><path d="M12 9c0-2.2 1.6-4 3.6-4 0 2.2-1.6 4-3.6 4Z" /><path d="M12 9C12 6.8 10.4 5 8.4 5c0 2.2 1.6 4 3.6 4Z" /><path d="M12 15c0-2.2 1.6-4 3.6-4 0 2.2-1.6 4-3.6 4Z" /><path d="M12 15c0-2.2-1.6-4-3.6-4 0 2.2 1.6 4 3.6 4Z" /></svg>
            <b><span data-l="ko">민심</span><span data-l="en">People</span></b>
            <span data-l="ko">백성이 왕을 얼마나 믿는가</span>
            <span data-l="en">How far the people trust the king</span>
            <span className="sl-bar" aria-hidden="true"><i></i></span>
          </div>
          <div className="sl-stat" data-k="treasury">
            <svg viewBox="0 0 24 24" fill="none" stroke="#b8912c" strokeWidth="1.7" aria-hidden="true"><ellipse cx="12" cy="6.5" rx="7" ry="3" /><path d="M5 6.5v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" /><path d="M5 11.5v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" /></svg>
            <b><span data-l="ko">국고</span><span data-l="en">Treasury</span></b>
            <span data-l="ko">나라 곳간에 곡식이 얼마나 있는가</span>
            <span data-l="en">How much grain sits in the state stores</span>
            <span className="sl-bar" aria-hidden="true"><i></i></span>
          </div>
          <div className="sl-stat" data-k="defense">
            <svg viewBox="0 0 24 24" fill="none" stroke="#2c5a76" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l7 3v6c0 4.2-2.9 7.7-7 9-4.1-1.3-7-4.8-7-9V6l7-3Z" /></svg>
            <b><span data-l="ko">국방</span><span data-l="en">Defense</span></b>
            <span data-l="ko">나라를 지킬 힘이 있는가</span>
            <span data-l="en">Whether the country can defend itself</span>
            <span className="sl-bar" aria-hidden="true"><i></i></span>
          </div>
          <div className="sl-stat" data-k="culture">
            <svg viewBox="0 0 24 24" fill="none" stroke="#a8322a" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 4h9a2 2 0 0 1 2 2v12a2 2 0 0 0 2 2H8a2 2 0 0 1-2-2V4Z" /><path d="M6 4a2 2 0 0 0-2 2v2h2" /><path d="M9.5 8.5h4M9.5 12h4" /></svg>
            <b><span data-l="ko">문화</span><span data-l="en">Culture</span></b>
            <span data-l="ko">학문·과학·예술이 얼마나 꽃피는가</span>
            <span data-l="en">How far learning, science and art flourish</span>
            <span className="sl-bar" aria-hidden="true"><i></i></span>
          </div>
        </div>
      </section>

      {/* ══════════════════ 담긴 것 ══════════════════ */}
      <section id="content">
        <h2>
          <span className="sl-brush" aria-hidden="true">✒</span>
          <span data-l="ko">담긴 것</span>
          <span data-l="en">What is inside</span>
        </h2>
        <p className="sl-sec-lead">
          <span data-l="ko">모든 사건은 실제 기록에 근거해 새로 서술했습니다.</span>
          <span data-l="en">Every event is newly written from the historical record.</span>
        </p>

        <div className="sl-facts">
          <div className="sl-fact">
            <div className="sl-num">27<small data-l="ko">대</small><small data-l="en"></small></div>
            <div className="sl-lbl"><span data-l="ko">태조부터 순종까지</span><span data-l="en">kings, Taejo to Sunjong</span></div>
          </div>
          <div className="sl-fact">
            <div className="sl-num">97<small data-l="ko">장</small><small data-l="en"></small></div>
            <div className="sl-lbl"><span data-l="ko">사건 카드</span><span data-l="en">event cards</span></div>
          </div>
          <div className="sl-fact">
            <div className="sl-num">73<small data-l="ko">명</small><small data-l="en"></small></div>
            <div className="sl-lbl"><span data-l="ko">인물 도감</span><span data-l="en">figures in the codex</span></div>
          </div>
          <div className="sl-fact">
            <div className="sl-num">179<small data-l="ko">개</small><small data-l="en"></small></div>
            <div className="sl-lbl"><span data-l="ko">낱말 뜻풀이</span><span data-l="en">glossary entries</span></div>
          </div>
        </div>

        <div className="sl-grid" style={{ marginTop: "14px" }}>
          <div className="sl-card">
            <span className="sl-ci"><svg viewBox="0 0 24 24" fill="none" stroke="#a8322a" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true"><path d="M4 17h16M4 17l-1-8 5 3.5L12 5l4 7.5L21 9l-1 8" /></svg></span>
            <b><span data-l="ko">왕 도감 27명</span><span data-l="en">27 kings</span></b>
            <p data-l="ko">재위 기간과 능호, 한 줄 평. 한 번이라도 다스려 본 왕은 따로 골라서 다시 플레이할 수 있습니다.</p>
            <p data-l="en">Reign years, tomb name and a one-line summary. Any king you have reached once can be replayed on their own.</p>
          </div>
          <div className="sl-card">
            <span className="sl-ci"><svg viewBox="0 0 24 24" fill="none" stroke="#2c5a76" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true"><circle cx="12" cy="8" r="3.6" /><path d="M4.8 20c.6-3.7 3.6-6 7.2-6s6.6 2.3 7.2 6" /></svg></span>
            <b><span data-l="ko">인물 도감 73명</span><span data-l="en">73 figures</span></b>
            <p data-l="ko">장영실, 신사임당, 이순신, 허준, 정약용, 김만덕 등. 관련 사건을 겪으면 도감에 해금됩니다.</p>
            <p data-l="en">Jang Yeong-sil, Shin Saimdang, Yi Sun-sin, Heo Jun, Jeong Yak-yong, Kim Man-deok and more — unlocked by playing the events they belong to.</p>
          </div>
          <div className="sl-card">
            <span className="sl-ci"><svg viewBox="0 0 24 24" fill="none" stroke="#3f6b4f" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20c3 0 4-1.5 4-4" /><path d="M8 16 18.5 5.5a2.1 2.1 0 0 1 3 3L11 19" /><path d="M8 16l3 3" /></svg></span>
            <b><span data-l="ko">사초 조각 97개</span><span data-l="en">97 record fragments</span></b>
            <p data-l="ko">실제 역사와 같은 선택을 했을 때 사관이 남기는 기록 조각. 모으면 조선 500년의 뼈대가 됩니다.</p>
            <p data-l="en">A fragment the historian leaves when your choice matches what actually happened. Collected, they form the spine of 500 years.</p>
          </div>
          <div className="sl-card">
            <span className="sl-ci"><svg viewBox="0 0 24 24" fill="none" stroke="#b8912c" strokeWidth="1.7" strokeLinejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5V5.5Z" /><path d="M20 18v3H6.5A2.5 2.5 0 0 1 4 18.5" /></svg></span>
            <b><span data-l="ko">낱말 사전 179개</span><span data-l="en">179 glossary terms</span></b>
            <p data-l="ko">수렴청정·붕당·탕평·환국처럼 어려운 낱말에 점선 밑줄이 붙습니다. 탭하면 초등 눈높이 한 문장 뜻풀이가 뜹니다.</p>
            <p data-l="en">Hard words carry a dotted underline. Tap one and a single sentence explains it at a nine-to-twelve-year-old's level.</p>
          </div>
        </div>
      </section>

      {/* ══════════════════ 학부모·교사 안내 ══════════════════ */}
      <section id="parents">
        <h2>
          <span className="sl-brush" aria-hidden="true">✒</span>
          <span data-l="ko">학부모·교사를 위한 안내</span>
          <span data-l="en">For parents and teachers</span>
        </h2>
        <p className="sl-sec-lead">
          <span data-l="ko">아이에게 건네 놓고 자리를 비워도 되는 앱인지가 가장 중요한 질문이라고 생각합니다.</span>
          <span data-l="en">We think the question that matters most is whether you can hand this to a child and walk away.</span>
        </p>

        <h3><span data-l="ko">앱 안에 없는 것</span><span data-l="en">What the app does not have</span></h3>
        <ul className="sl-checks">
          <li><span data-l="ko"><b>광고가 없습니다.</b>{' '}배너도 전면 광고도 보상형 영상도 없습니다.</span>
              <span data-l="en"><b>No ads.</b>{' '}No banners, no interstitials, no rewarded video.</span></li>
          <li><span data-l="ko"><b>인앱결제가 없습니다.</b>{' '}구매 후 모든 왕과 도감이 열려 있습니다.</span>
              <span data-l="en"><b>No in-app purchases.</b>{' '}Every king and every codex entry is open after purchase.</span></li>
          <li><span data-l="ko"><b>계정도 회원가입도 없습니다.</b>{' '}로그인 화면 자체가 없습니다.</span>
              <span data-l="en"><b>No account, no sign-up.</b>{' '}There is no login screen at all.</span></li>
          <li><span data-l="ko"><b>서버와 통신하지 않습니다.</b>{' '}비행기 모드에서도 전부 동작합니다.</span>
              <span data-l="en"><b>No server communication.</b>{' '}Everything runs in airplane mode.</span></li>
          <li><span data-l="ko"><b>개인정보를 수집하지 않습니다.</b>{' '}분석 도구도 제3자 SDK도 넣지 않았습니다.</span>
              <span data-l="en"><b>No personal data collected.</b>{' '}No analytics, no third-party SDKs.</span></li>
          <li><span data-l="ko"><b>아이가 눌러 나갈 외부 링크가 없습니다.</b>{' '}지원 이메일은 설정의 부모 확인 뒤에 있습니다.</span>
              <span data-l="en"><b>No outbound links a child can tap.</b>{' '}The support address sits behind a parent check in Settings.</span></li>
        </ul>

        <div className="sl-callout" style={{ marginTop: "20px" }}>
          <span data-l="ko"><b>저장 데이터는 기기 안에만 있습니다.</b>{' '}진행 상황과 설정은 기기의 localStorage에만 저장되며, 앱을 삭제하면 함께 사라집니다. 저희에게 전송되는 것은 없고, 저희가 복구해 드릴 수 있는 것도 없습니다.</span>
          <span data-l="en"><b>Saved data never leaves the device.</b>{' '}Progress and settings live only in the device's localStorage and are erased with the app. Nothing is sent to us, and there is nothing for us to restore.</span>
        </div>

        <h3><span data-l="ko">읽기가 아직 부담스러운 아이를 위해</span><span data-l="en">If reading is still hard</span></h3>
        <ul className="sl-bullets">
          <li><span data-l="ko"><b>읽어주기 버튼</b>{' '}— 카드 오른쪽 위의 버튼을 누르면 본문을 읽어 줍니다. iOS에 내장된 음성을 쓰기 때문에 인터넷이 필요 없고 추가 비용도 없습니다.</span>
              <span data-l="en"><b>Read-aloud</b>{' '}— the button at the top right of a card reads the text out. It uses the voice built into iOS, so no internet and no extra cost.</span></li>
          <li><span data-l="ko"><b>글자 크기 조절</b>{' '}— 본문은 기본 18pt 이상이고, 설정에서 더 키울 수 있습니다.</span>
              <span data-l="en"><b>Text size</b>{' '}— body text starts at 18pt or larger and can be increased in Settings.</span></li>
          <li><span data-l="ko"><b>한 카드에 서너 문장</b>{' '}— 한 화면에서 읽을 분량을 넘기지 않도록 규격을 정했습니다.</span>
              <span data-l="en"><b>Three or four sentences per card</b>{' '}— deliberately capped so one screen is one readable amount.</span></li>
          <li><span data-l="ko"><b>색만으로 알려 주지 않습니다</b>{' '}— 지표가 오르내릴 때 화살표와 부호를 함께 표시합니다.</span>
              <span data-l="en"><b>Never color alone</b>{' '}— stat changes show an arrow and a sign as well as a color.</span></li>
        </ul>

        <h3><span data-l="ko">교과 연계</span><span data-l="en">Curriculum fit</span></h3>
        <p>
          <span data-l="ko">사건 목록은 2022 개정 교육과정 초등 사회 5~6학년군의 조선 단원을 기준으로 골랐습니다. 교과서에서 만나는 사건이 게임 안에서 아이가 직접 결정해 본 사건이 되도록 맞추었습니다.</span>
          <span data-l="en">The event list was selected against the Joseon unit of the Korean elementary social studies curriculum for grades 5–6 (2022 revision), so that the events a child meets in the textbook are events the child already decided in the game.</span>
        </p>

        <h3><span data-l="ko">역사 서술 원칙</span><span data-l="en">How the history is written</span></h3>
        <ul className="sl-bullets">
          <li><span data-l="ko">연도·인물·사건은 교차 확인했고, 확신이 서지 않는 사건은 넣지 않았습니다.</span>
              <span data-l="en">Dates, people and events were cross-checked; anything we were unsure of was left out.</span></li>
          <li><span data-l="ko">국역본 문장은 한 줄도 옮기지 않았습니다. 사실만 확인하고 문장은 전부 새로 썼으며, 출처는 실록의 권과 날짜로만 표기합니다.</span>
              <span data-l="en">Not one sentence is copied from a published translation. Facts were verified and all prose written fresh; sources are cited by volume and date only.</span></li>
          <li><span data-l="ko">초상화나 유물 사진을 쓰지 않고 모든 그림을 직접 그렸습니다.</span>
              <span data-l="en">No portrait or artifact photography is used; every illustration is drawn in-app.</span></li>
          <li><span data-l="ko">학계 통설만 서술하고 야사는 쓰지 않습니다. 특정 인물을 깎아내리거나 현대 정치와 연결하지 않습니다.</span>
              <span data-l="en">Only mainstream scholarship, no folklore. No disparagement of individuals, no links to present-day politics.</span></li>
          <li><span data-l="ko">아이 눈높이를 넘는 잔혹한 표현은 쓰지 않습니다.</span>
              <span data-l="en">Nothing violent beyond what is appropriate for this age.</span></li>
        </ul>
      </section>

      {/* ══════════════════ 짧은 FAQ ══════════════════ */}
      <section id="faq">
        <h2>
          <span className="sl-brush" aria-hidden="true">✒</span>
          <span data-l="ko">자주 묻는 질문</span>
          <span data-l="en">Common questions</span>
        </h2>

        <details>
          <summary><span data-l="ko">역사를 하나도 모르는 아이도 할 수 있나요?</span><span data-l="en">Can a child with no background in history play?</span></summary>
          <div className="sl-ans">
            <p data-l="ko">그렇게 설계했습니다. 사건 카드는 필요한 상황을 서너 문장으로 먼저 설명하고, 그다음에 결정을 요청합니다. 미리 알아야 답할 수 있는 문제가 하나도 없습니다.</p>
            <p data-l="en">That is the design. Each card explains the situation in three or four sentences first, then asks for a decision. Nothing requires prior knowledge to answer.</p>
          </div>
        </details>
        <details>
          <summary><span data-l="ko">한 번에 다 끝내야 하나요?</span><span data-l="en">Does it have to be finished in one sitting?</span></summary>
          <div className="sl-ans">
            <p data-l="ko">아니요. 왕 한 명이 약 5분이고 언제든 멈출 수 있습니다. 진행 상황은 자동 저장되어 「이어하기」로 돌아옵니다.</p>
            <p data-l="en">No. One king takes about five minutes and you can stop anywhere. Progress saves automatically and Continue picks it up.</p>
          </div>
        </details>
        <details>
          <summary><span data-l="ko">아이가 "틀린" 선택을 하면 어떻게 되나요?</span><span data-l="en">What happens if the child chooses "wrong"?</span></summary>
          <div className="sl-ans">
            <p data-l="ko">틀린 선택이라는 개념이 없습니다. 실제 역사와 다른 선택을 하면 「만약의 조선」이 어떻게 흘렀을지 보여 주고, 그 결과를 안고 다음 사건으로 갑니다. 실제와 같은 선택에는 사초 조각이 보상으로 주어질 뿐입니다.</p>
            <p data-l="en">There is no wrong choice. A choice that differs from history shows the Joseon that might have been, and the reign continues carrying that result. Matching history simply earns a fragment of the record.</p>
          </div>
        </details>
        <details>
          <summary><span data-l="ko">기기 여러 대에서 이어서 할 수 있나요?</span><span data-l="en">Can progress move between devices?</span></summary>
          <div className="sl-ans">
            <p data-l="ko">아니요. 계정과 서버가 없기 때문에 기기 사이 동기화도 없습니다. 개인정보를 전혀 받지 않기 위해 감수한 제약입니다.</p>
            <p data-l="en">No. With no account and no server there is no sync between devices — the trade-off we accepted in order to collect nothing.</p>
          </div>
        </details>

        <p style={{ marginTop: "18px" }}>
          <span data-l="ko">더 궁금한 점은{' '}<a href="/sillok/support">지원 페이지</a>를 봐 주세요.</span>
          <span data-l="en">More answers are on the{' '}<a href="/sillok/support">support page</a>.</span>
        </p>
      </section>

      </div>{/* /wrap */}
    </>
  );
}
