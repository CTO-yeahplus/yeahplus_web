'use client';

import { COMPANY, useI18n } from '../i18n';

export default function TermsContent() {
  const { t, lang } = useI18n();
  const tm = t.terms;
  const ko = lang === 'ko';

  return (
    <article className="t68-legal">
      <h1>{tm.title}</h1>
      <p className="t68-legal-meta">{tm.effective}</p>

      {tm.s.map(([title, body]) => (
        <div key={title}>
          <h2>{title}</h2>
          <p>{body}</p>
        </div>
      ))}

      <h2>{tm.addendumTitle}</h2>
      <p>{tm.addendum}</p>
      <ul className="t68-legal-company">
        <li>
          {ko ? COMPANY.name : COMPANY.nameEn} ({t.footer.ceo}: {ko ? COMPANY.ceo : COMPANY.ceoEn})
        </li>
        <li>
          {t.footer.biz}: {COMPANY.biz} · {t.footer.mailorder}: {ko ? COMPANY.mailorder : COMPANY.mailorderEn}
        </li>
        <li>{ko ? COMPANY.addr : COMPANY.addrEn}</li>
        <li>
          {t.footer.inquiry}: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </li>
      </ul>
    </article>
  );
}
