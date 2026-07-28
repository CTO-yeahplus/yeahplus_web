import type { Metadata } from 'next';
import Link from 'next/link';
import { Mail, MessageCircle, CreditCard, Clock, HelpCircle } from '../icons';

export const metadata: Metadata = {
  title: '고객지원 — 멍해 (MUNGHAE)',
  description: '멍해(MUNGHAE) 고객지원 — 문의 방법, 운영·응답 시간, 도움말 및 앱 정보 안내.',
};

const CHANNELS = [
  {
    Icon: Mail,
    label: '이메일 문의',
    value: 'contact@yeahplus.co.kr',
    desc: '가장 정확한 방법입니다. 사용 기기와 앱 버전, 문의 내용을 함께 보내주시면 빠르게 도와드립니다.',
    href: 'mailto:contact@yeahplus.co.kr?subject=%5B멍해%5D%20고객지원%20문의',
  },
  {
    Icon: MessageCircle,
    label: '앱 내 문의',
    value: '설정 › 도움말/문의',
    desc: '앱에서 바로 문의하면 기기·버전 정보가 함께 전달되어 더 빠르게 처리됩니다.',
  },
  {
    Icon: CreditCard,
    label: '결제·환불',
    value: 'App Store · Google Play',
    desc: '구독 관리·해지 및 환불은 각 스토어의 계정 설정에서 진행됩니다. 관련 문의는 이메일로도 도와드립니다.',
  },
];

const TOPICS = [
  { label: '이용약관', href: '/munghae/terms' },
  { label: '개인정보처리방침', href: '/munghae/privacy' },
  { label: '데이터 삭제·수정·다운로드 안내', href: '/munghae/privacy' },
  { label: '구독·결제·환불 안내', href: '/munghae/terms' },
];

export default function MunghaeSupport() {
  return (
    <div className="mh-support">
      <header className="mh-support-head">
        <h1>고객지원</h1>
        <p>
          멍해(MUNGHAE)를 이용해 주셔서 감사합니다. 궁금한 점이나 도움이 필요하시면 아래 방법으로 문의해 주세요.
          소중한 추모의 시간을 방해받지 않도록 정성껏 돕겠습니다.
        </p>
      </header>

      <h2 className="mh-h2">문의 채널</h2>
      <div className="mh-channels">
        {CHANNELS.map((c, i) => {
          const inner = (
            <>
              <span className="ic"><c.Icon size={22} /></span>
              <span>
                <span className="lab" style={{ display: 'block' }}>{c.label}</span>
                <span className="val" style={{ display: 'block' }}>{c.value}</span>
                <span className="dsc" style={{ display: 'block' }}>{c.desc}</span>
              </span>
            </>
          );
          return c.href ? (
            <a className="mh-ch" href={c.href} key={i}>{inner}</a>
          ) : (
            <div className="mh-ch" key={i}>{inner}</div>
          );
        })}
      </div>

      <h2 className="mh-h2">운영 및 응답</h2>
      <div className="mh-info">
        <div className="mh-info-card">
          <span className="ic"><Clock size={20} /></span>
          <div>
            <div className="lab">운영 시간</div>
            <div className="val">평일 10:00–18:00 (KST)</div>
            <div className="note">주말·공휴일 휴무</div>
          </div>
        </div>
        <div className="mh-info-card">
          <span className="ic"><MessageCircle size={20} /></span>
          <div>
            <div className="lab">응답 시간</div>
            <div className="val">영업일 기준 1–2일 이내</div>
            <div className="note">문의량이 많을 경우 다소 지연될 수 있습니다.</div>
          </div>
        </div>
      </div>

      <h2 className="mh-h2">자주 찾는 도움말</h2>
      <ul className="mh-topics">
        {TOPICS.map((t, i) => (
          <li key={i}>
            <Link href={t.href}>
              <HelpCircle size={18} />
              <span>{t.label}</span>
              <span className="chev" aria-hidden>›</span>
            </Link>
          </li>
        ))}
      </ul>

      <h2 className="mh-h2">앱 정보</h2>
      <div className="mh-appinfo">
        <b>앱 이름</b> 멍해 (MUNGHAE)<br />
        <b>제공자</b> 주식회사 예아플러스 (yeahplus Co., Ltd.)<br />
        <b>카테고리</b> 라이프스타일<br />
        <b>지원 문의</b> <a href="mailto:contact@yeahplus.co.kr" style={{ color: 'var(--night3)' }}>contact@yeahplus.co.kr</a>
      </div>

      <p className="mh-support-note">
        더 궁금한 점이 있으면 언제든{' '}
        <a href="mailto:contact@yeahplus.co.kr" style={{ color: 'var(--night3)', textDecoration: 'underline' }}>
          contact@yeahplus.co.kr
        </a>{' '}
        로 연락 주세요. 반려가족의 마음에 늘 함께하겠습니다.
      </p>
    </div>
  );
}
