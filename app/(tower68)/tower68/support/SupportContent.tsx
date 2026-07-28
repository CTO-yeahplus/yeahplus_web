'use client';

import Link from 'next/link';
import { COMPANY, useI18n } from '../i18n';

export default function SupportContent() {
  const { t } = useI18n();
  const s = t.support;

  return (
    <article className="t68-legal">
      <h1>{s.title}</h1>
      <p>{s.intro}</p>

      <div className="t68-faq">
        {s.faq.map(([q, a]) => (
          <details className="t68-faq-item" key={q}>
            <summary>{q}</summary>
            <p>{a}</p>
          </details>
        ))}
      </div>

      <h2>{s.channelTitle}</h2>
      <ul className="t68-legal-company">
        {s.channels.map(([k, v]) => (
          <li key={k}>
            <strong>{k}</strong> — {v}
          </li>
        ))}
      </ul>

      <h2>{s.contactTitle}</h2>
      <p>
        {s.contactText} <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> ·{' '}
        <Link href="/tower68/contact">{t.nav.contact}</Link>
      </p>
    </article>
  );
}
