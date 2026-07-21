'use client';

import Link from 'next/link';
import { PawPrint, Apple, Palette, Sparkles, Globe2 } from './components/icons';
import { useLang } from './i18n';

const FEATURE_ICONS = [Palette, Sparkles, Globe2];

export default function HomePage() {
  const { t } = useLang();
  const h = t.home;

  return (
    <>
      <section className="hero">
        <span className="badge">
          <PawPrint size={14} strokeWidth={2.2} /> {h.badge}
        </span>
        <h1>
          {h.titleTop}
          <br />
          <span className="accent">{h.titleAccent}</span>
        </h1>
        <p className="lead">{h.lead}</p>
        <div className="cta-row">
          {/* 출시 후 실제 App Store / Google Play 링크로 교체하세요 */}
          <a className="btn btn-primary" href="#" aria-label={h.ctaAppStore}>
            <Apple size={18} strokeWidth={2} /> {h.ctaAppStore}
          </a>
          <Link className="btn btn-ghost" href="/meow/feed">
            {h.ctaFeed}
          </Link>
        </div>
      </section>

      <section className="features" aria-label={h.badge}>
        {h.features.map((f, i) => {
          const Icon = FEATURE_ICONS[i];
          return (
            <div className="card" key={i}>
              <div className="ic"><Icon size={26} strokeWidth={1.8} /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          );
        })}
      </section>

      {/* Apple-style 쇼케이스 갤러리 (deco_01 ~ deco_06) */}
      <section className="showcase" aria-label={t.gallery.title.replace('\n', ' ')}>
        <div className="showcase-head">
          <h2 className="showcase-title">{t.gallery.title}</h2>
          <p className="showcase-sub">{t.gallery.subtitle}</p>
        </div>
        <div className="deco-bento">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <figure className={`deco deco-${n}`} key={n}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/meow/deco_0${n}.jpg`}
                alt={`MYOHAE ${t.gallery.title.replace('\n', ' ')} ${n}`}
                loading="lazy"
              />
            </figure>
          ))}
        </div>
      </section>

      <section className="hero" style={{ paddingTop: 40 }}>
        <h1 style={{ fontSize: 26 }}>{h.subTitle}</h1>
        <p className="lead">{h.subLead}</p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#">
            <Apple size={18} strokeWidth={2} /> {h.ctaAppStore}
          </a>
        </div>
      </section>
    </>
  );
}
