'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Check, Copy, Download, ExternalLink } from 'lucide-react';
import { useLang } from '../i18n';
import {
  APP_STORE_URL,
  CONTACT,
  FACTS,
  FEATURES,
  ICON_URL,
  ONE_LINE,
  ONE_PARAGRAPH,
  QUOTES,
  SHOTS,
  UI,
  ZIP_URL,
} from './presskit';

/** 기자가 문장을 그대로 가져갈 수 있게 하는 복사 버튼. */
function CopyButton({ text, label, done }: { text: string; label: string; done: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 클립보드 권한이 없거나 http 로 열린 경우 — 선택 영역으로 대신 넘긴다.
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <button type="button" className="mf-pk-copy" onClick={copy} aria-live="polite">
      {copied ? <Check size={13} strokeWidth={2.4} aria-hidden /> : <Copy size={13} strokeWidth={2} aria-hidden />}
      {copied ? done : label}
    </button>
  );
}

export default function PressContent() {
  const { lang } = useLang();
  const ko = lang === 'ko';
  const u = UI[lang];
  const facts = FACTS[lang];
  const features = FEATURES[lang];
  const quotes = QUOTES[lang];

  return (
    <div className="mf-wrap">
      <article className="mf-pk">
        <header className="mf-pk-head">
          <p className="mf-pk-kicker">{u.kicker}</p>
          <div className="mf-pk-headline">
            <Image
              src="/mineforge/press/icon-256.webp"
              alt=""
              width={84}
              height={84}
              className="mf-pk-appicon"
              priority
            />
            <div>
              <h1>{u.title}</h1>
              <p className="mf-pk-lead">{u.lead}</p>
            </div>
          </div>

          <div className="mf-pk-actions">
            <a className="mf-pk-btn mf-pk-btn-primary" href={ZIP_URL} download>
              <Download size={16} strokeWidth={2} aria-hidden />
              <span>
                {u.download}
                <small>{u.downloadSub}</small>
              </span>
            </a>
            <a className="mf-pk-btn" href={APP_STORE_URL} target="_blank" rel="noreferrer">
              <ExternalLink size={15} strokeWidth={2} aria-hidden />
              {u.appstore}
            </a>
          </div>
        </header>

        <section className="mf-pk-section">
          <h2>{u.factsTitle}</h2>
          <dl className="mf-pk-facts">
            {facts.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mf-pk-section">
          <div className="mf-pk-h2row">
            <h2>{u.oneLineTitle}</h2>
            <CopyButton text={ONE_LINE[lang]} label={u.copy} done={u.copied} />
          </div>
          <p className="mf-pk-oneline">{ONE_LINE[lang]}</p>
        </section>

        <section className="mf-pk-section">
          <div className="mf-pk-h2row">
            <h2>{u.paraTitle}</h2>
            <CopyButton text={ONE_PARAGRAPH[lang]} label={u.copy} done={u.copied} />
          </div>
          <p className="mf-pk-para">{ONE_PARAGRAPH[lang]}</p>
        </section>

        <section className="mf-pk-section">
          <h2>{u.featuresTitle}</h2>
          <ul className="mf-pk-features">
            {features.map(([k, v]) => (
              <li key={k}>
                <b>{k}</b>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mf-pk-section">
          <h2>{u.quotesTitle}</h2>
          <p className="mf-pk-sub">{u.quotesLead}</p>
          <div className="mf-pk-quotes">
            {quotes.map((q) => (
              <blockquote className="mf-pk-quote" key={q.slice(0, 24)}>
                <p>{q}</p>
                <CopyButton text={q} label={u.copy} done={u.copied} />
              </blockquote>
            ))}
          </div>
        </section>

        <section className="mf-pk-section">
          <h2>{u.shotsTitle}</h2>
          <p className="mf-pk-sub">{u.shotsLead}</p>
          <div className="mf-pk-shots">
            {SHOTS.map((n) => {
              const src = `/mineforge/press/shots/${lang}-${n}.webp`;
              return (
                <a className="mf-pk-shot" href={src} target="_blank" rel="noreferrer" key={n}>
                  <Image
                    src={src}
                    alt={`${ko ? '스크린샷' : 'Screenshot'} ${n}`}
                    width={620}
                    height={1344}
                    sizes="(max-width: 700px) 45vw, 200px"
                    loading="lazy"
                  />
                </a>
              );
            })}
          </div>
        </section>

        <section className="mf-pk-section">
          <h2>{u.iconTitle}</h2>
          <a className="mf-pk-icon" href={ICON_URL} download>
            <Image src="/mineforge/press/icon-256.webp" alt="" width={72} height={72} />
            <span>
              icon-1024.png
              <small>{u.iconSub}</small>
            </span>
            <Download size={15} strokeWidth={2} aria-hidden />
          </a>
        </section>

        <section className="mf-pk-section">
          <h2>{u.termsTitle}</h2>
          <p>{u.terms}</p>
        </section>

        <section className="mf-pk-section">
          <h2>{u.contactTitle}</h2>
          <p>
            {u.contactText} <a href={`mailto:${CONTACT}`}>{CONTACT}</a>
          </p>
        </section>

        <p className="mf-pk-back">
          <Link href="/mineforge">{u.back}</Link>
        </p>
      </article>
    </div>
  );
}
