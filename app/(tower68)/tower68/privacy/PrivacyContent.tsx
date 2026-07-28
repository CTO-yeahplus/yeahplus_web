'use client';

import { COMPANY, useI18n } from '../i18n';

export default function PrivacyContent() {
  const { t, lang } = useI18n();
  const p = t.privacy;
  const ko = lang === 'ko';

  return (
    <article className="t68-legal">
      <h1>{p.title}</h1>
      <p className="t68-legal-meta">{p.effective}</p>
      <p>{p.intro}</p>

      {p.s.map(([title, body]) => (
        <div key={title}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      ))}

      <h2>{p.contactTitle}</h2>
      <ul className="t68-legal-company">
        <li>
          {ko ? COMPANY.name : COMPANY.nameEn} ({t.footer.ceo}: {ko ? COMPANY.ceo : COMPANY.ceoEn})
        </li>
        <li>
          {t.footer.biz}: {COMPANY.biz}
        </li>
        <li>{ko ? COMPANY.addr : COMPANY.addrEn}</li>
        <li>
          {t.footer.inquiry}: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </li>
      </ul>
    </article>
  );
}
