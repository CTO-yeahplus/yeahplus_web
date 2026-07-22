'use client';

import Link from 'next/link';
import { useLang } from '../i18n';
import { Mail, MessageCircle, CreditCard, Clock, HelpCircle } from '../components/icons';

const CH_ICON = { mail: Mail, chat: MessageCircle, card: CreditCard } as const;

export default function SupportContent() {
  const { t } = useLang();
  const s = t.support;

  return (
    <section className="support">
      <header className="support-head">
        <h1>{s.title}</h1>
        <p className="support-intro">{s.intro}</p>
      </header>

      {/* 문의 채널 */}
      <h2 className="support-h2">{s.channelsTitle}</h2>
      <div className="support-channels">
        {s.channels.map((c, i) => {
          const Icon = CH_ICON[c.icon];
          const inner = (
            <>
              <span className="ch-ic"><Icon size={22} strokeWidth={1.8} /></span>
              <span className="ch-body">
                <span className="ch-label">{c.label}</span>
                <span className="ch-value">{c.value}</span>
                <span className="ch-desc">{c.desc}</span>
              </span>
            </>
          );
          return c.href ? (
            <a className="ch-card" href={c.href} key={i}>{inner}</a>
          ) : (
            <div className="ch-card" key={i}>{inner}</div>
          );
        })}
      </div>

      {/* 운영 시간 · 응답 */}
      <h2 className="support-h2">{s.infoTitle}</h2>
      <div className="support-info">
        <div className="info-card">
          <span className="info-ic"><Clock size={20} strokeWidth={1.8} /></span>
          <div>
            <div className="info-label">{s.hours.label}</div>
            <div className="info-value">{s.hours.value}</div>
            <div className="info-note">{s.hours.note}</div>
          </div>
        </div>
        <div className="info-card">
          <span className="info-ic"><MessageCircle size={20} strokeWidth={1.8} /></span>
          <div>
            <div className="info-label">{s.response.label}</div>
            <div className="info-value">{s.response.value}</div>
            <div className="info-note">{s.response.note}</div>
          </div>
        </div>
      </div>

      {/* 자주 찾는 도움말 */}
      <h2 className="support-h2">{s.topicsTitle}</h2>
      <ul className="support-topics">
        {s.topics.map((tp, i) => (
          <li key={i}>
            <Link href={tp.href}>
              <HelpCircle size={18} strokeWidth={1.8} />
              <span>{tp.label}</span>
              <span className="chev" aria-hidden>›</span>
            </Link>
          </li>
        ))}
      </ul>

      <p className="support-note">{s.note}</p>
    </section>
  );
}
