'use client';

import { useLang } from '../i18n';

export default function FaqContent() {
  const { t } = useLang();
  return (
    <section className="faq">
      <h1>{t.faq.title}</h1>
      {t.faq.items.map((item, i) => (
        <details className="qa" key={i}>
          <summary>{item.q}</summary>
          <div className="answer">{item.a}</div>
        </details>
      ))}
      <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 24 }}>{t.faq.notFound}</p>
    </section>
  );
}
