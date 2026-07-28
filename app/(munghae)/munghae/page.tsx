import type { Metadata } from 'next';
import {
  Star, Flame, Images, Bell, HeartMsg, Users, Calendar, Apple,
  Footprints, Bowl, Book, Activity, Sun,
} from './icons';

export const metadata: Metadata = {
  title: '멍해 (MUNGHAE) — 함께하는 지금부터, 별이 된 이후까지',
  description:
    '반려가족의 오늘을 기록하는 생활공간이자, 언젠가 이별한 뒤 소중히 기억하는 디지털 추모공원. 멍해(MUNGHAE)와 함께하는 지금부터 별이 된 이후까지.',
};

const LIVING = [
  { Icon: Footprints, title: '원탭 기록', desc: '산책·식사·몸무게를 3초 만에 남겨요. 매일의 작은 순간이 소중한 기록이 됩니다.' },
  { Icon: Book, title: '성장 일기', desc: '사진과 함께 오늘의 이야기를 적어보세요. 우리 아이의 하루하루가 쌓여갑니다.' },
  { Icon: Activity, title: '건강 수첩', desc: '접종·병원·투약 기록과 몸무게 변화를 한곳에서. 건강을 놓치지 않도록 돕습니다.' },
  { Icon: Calendar, title: '기념일 D-day', desc: '생일과 가족이 된 날을 헤아려요. 함께한 날들이 늘어나는 걸 지켜보세요.' },
];

const MEMORIAL = [
  { Icon: Star, title: '추모공간 만들기', desc: '이름·종류·생일과 떠난 날, 우리 아이의 이야기를 담아 세상 하나뿐인 자리를 엽니다.' },
  { Icon: Images, title: '추억 갤러리', desc: '함께한 사진들을 한곳에 모아두세요. 언제든 다시 꺼내보며 그날의 온기를 떠올려요.' },
  { Icon: Flame, title: '촛불 헌화', desc: '조용히 촛불을 밝히고 마음을 전합니다. 보고 싶은 마음을 담아 곁에 불을 켜두세요.' },
  { Icon: HeartMsg, title: '추모 메시지', desc: '전하지 못한 말들을 남겨보세요. 사랑과 그리움의 문장이 오래도록 머뭅니다.' },
  { Icon: Bell, title: '기일 알림', desc: '생일과 기일을 잊지 않도록 알려드립니다. 기억이 흐려지지 않게 곁에서 돕습니다.' },
  { Icon: Users, title: '함께 기억하기', desc: '가족과 함께 추모공간을 돌보고, 서로의 추억과 위로를 나눌 수 있습니다.' },
];

const STEPS = [
  { n: 1, title: '가족을 등록해요', desc: '우리 아이의 이름과 사진, 이야기를 담아 생활공간을 시작합니다.' },
  { n: 2, title: '매일을 기록해요', desc: '산책·식사·사진·일기로 함께하는 지금을 가볍게 남깁니다.' },
  { n: 3, title: '오래 기억해요', desc: '이별의 순간, 그동안의 기록이 추모공간으로 이어져 곁에 남습니다.' },
];

export default function MunghaeHome() {
  return (
    <>
      {/* Hero */}
      <section className="mh-hero">
        <div className="mh-hero-inner">
          <span className="mh-eyebrow"><Star size={13} /> 반려생활 기록 · 디지털 추모</span>
          <h1>
            {'함께하는 지금부터,\n'}
            <span className="accent">별이 된 이후까지</span>
          </h1>
          <p>{'멍해는 반려가족의 오늘을 기록하는 생활공간이자,\n언젠가 이별한 뒤 소중히 기억하는 추모공간입니다.'}</p>
          <a className="mh-cta" href="#" aria-label="App Store에서 멍해 받기">
            <Apple size={18} /> App Store에서 받기
          </a>
          <span className="mh-cta-note">iPhone에서 만나보세요 · 곧 출시됩니다</span>
        </div>
      </section>

      {/* 두 개의 공간 */}
      <section className="mh-section" id="features">
        <div className="container">
          <div className="mh-sec-head">
            <h2>하나의 앱, 두 개의 공간</h2>
            <p>함께하는 지금을 매일 기록하고, 별이 된 이후를 오래도록 기억합니다.</p>
          </div>
          <div className="mh-duo">
            <div className="duo-card duo-life">
              <span className="duo-ic"><Sun size={26} /></span>
              <span className="duo-tag">생활공간</span>
              <h3>함께하는 지금</h3>
              <p>오늘의 산책과 식사, 무럭무럭 자라는 순간들을 가볍게 기록해요. 매일 열어보는 우리 아이의 일상.</p>
            </div>
            <div className="duo-card duo-memorial">
              <span className="duo-ic"><Star size={24} /></span>
              <span className="duo-tag">추모공간</span>
              <h3>별이 된 기억</h3>
              <p>떠난 아이를 위한 조용한 자리. 촛불을 밝히고 그리움을 전하며, 함께한 시간을 오래 간직합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 생활공간 features */}
      <section className="mh-section life alt">
        <div className="container">
          <div className="mh-sec-head">
            <span className="mh-kicker life">생활공간 · 함께하는 지금</span>
            <h2>오늘을 기록하는 가장 쉬운 방법</h2>
            <p>산책하고, 밥 먹고, 무럭무럭 자란 하루 — 단 3초면 남길 수 있어요.</p>
          </div>
          <div className="mh-features">
            {LIVING.map((f, i) => (
              <div className="mh-card" key={i}>
                <span className="ic"><f.Icon size={24} /></span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 추모공간 features */}
      <section className="mh-section">
        <div className="container">
          <div className="mh-sec-head">
            <span className="mh-kicker gold">추모공간 · 별이 된 기억</span>
            <h2>그리움을 담는 따뜻한 방법</h2>
            <p>떠나보낸 우리 아이를, 사라지지 않는 공간에 오래도록 기억합니다.</p>
          </div>
          <div className="mh-features">
            {MEMORIAL.map((f, i) => (
              <div className="mh-card" key={i}>
                <span className="ic"><f.Icon size={24} /></span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bridge quote band */}
      <section className="mh-quote">
        <p>
          {'“함께 남긴 모든 기록은 사라지지 않습니다.\n그리움이 찾아온 날, 추억이 되어 곁에 머뭅니다.”'}
          <span className="by">— 생활의 기록이 추모의 자산이 되도록</span>
        </p>
      </section>

      {/* How it works */}
      <section className="mh-section alt">
        <div className="container">
          <div className="mh-sec-head">
            <h2>이렇게 함께해요</h2>
            <p>매일의 기록이 자연스럽게 이어져, 이별의 순간에도 곁을 지킵니다.</p>
          </div>
          <div className="mh-steps">
            {STEPS.map((s) => (
              <div className="mh-step" key={s.n}>
                <div className="num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mh-final">
        <div className="container">
          <h2>오늘의 기록부터, 오래도록 곁에 두는 기억까지</h2>
          <p>지금 우리 아이의 하루를 남기고, 언젠가의 이별 뒤에도 함께하세요.</p>
          <a className="mh-cta" href="#" aria-label="App Store에서 멍해 받기">
            <Apple size={18} /> App Store에서 받기
          </a>
        </div>
      </section>
    </>
  );
}
