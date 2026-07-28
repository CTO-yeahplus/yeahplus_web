'use client';

import { useState } from 'react';
import { COMPANY, useI18n } from '../i18n';

export default function ContactContent() {
  const { t, lang } = useI18n();
  const c = t.contact;
  const ko = lang === 'ko';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // 별도 서버 없이 기본 메일 앱으로 문의를 전송(mailto).
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const subject = encodeURIComponent(`[${c.subjectPrefix}] ${name || '-'}`);
    const body = encodeURIComponent(`${c.nameLabel}: ${name}\n${c.replyLabel}: ${email}\n\n${message}`);
    window.location.href = `mailto:${COMPANY.email}?subject=${subject}&body=${body}`;
  }

  return (
    <article className="t68-legal">
      <h1>{c.title}</h1>
      <p>
        {c.intro} <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
      </p>

      <form className="t68-form" onSubmit={submit}>
        <label>
          {c.name}
          <input value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          {c.email}
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          {c.message}
          <textarea rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required />
        </label>
        <button type="submit" className="t68-btn t68-btn-primary">
          {c.send}
        </button>
      </form>

      <h2>{c.companyTitle}</h2>
      <ul className="t68-legal-company">
        <li>
          {ko ? COMPANY.name : COMPANY.nameEn} ({t.footer.ceo}: {ko ? COMPANY.ceo : COMPANY.ceoEn})
        </li>
        <li>
          {t.footer.biz}: {COMPANY.biz}
        </li>
        <li>
          {t.footer.mailorder}: {ko ? COMPANY.mailorder : COMPANY.mailorderEn}
        </li>
        <li>{ko ? COMPANY.addr : COMPANY.addrEn}</li>
        <li>
          {t.footer.inquiry}: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
        </li>
      </ul>
    </article>
  );
}
