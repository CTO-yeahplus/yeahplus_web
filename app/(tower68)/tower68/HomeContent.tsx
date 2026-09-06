'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Clapperboard, PlaneLanding, Radio, Spline, Trophy, Wind } from 'lucide-react';
import { useI18n } from './i18n';

/** TOWER 68 App Store 페이지 — 히어로와 하단 배너가 같은 주소를 쓴다. */
const APP_STORE_URL = 'https://apps.apple.com/kr/app/tower-68/id6790672799';

// 이전 정적 배포(HashRouter) 주소 호환: /tower68/#/privacy → /tower68/privacy
const HASH_ROUTES = ['support', 'privacy', 'terms', 'contact'];

// 이모지 대신 SF Symbols 계열의 얇은 라인 아이콘(lucide)을 사용한다.
const FEATURE_ICONS = {
  route: Spline,
  landing: PlaneLanding,
  wind: Wind,
  trophy: Trophy,
  clip: Clapperboard,
  radio: Radio,
} as const;

type FeatureIcon = keyof typeof FEATURE_ICONS;

export default function HomeContent() {
  const { t } = useI18n();
  const h = t.home;
  const router = useRouter();

  useEffect(() => {
    const target = window.location.hash.replace(/^#\/?/, '').split(/[?#]/)[0];
    if (HASH_ROUTES.includes(target)) router.replace(`/tower68/${target}`);
  }, [router]);

  return (
    <>
      <section className="t68-hero">
        <div className="t68-hero-inner">
          <span className="t68-badge">{h.badge}</span>
          <br />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/tower68/tower68_logo.png" alt="TOWER 68" width={128} height={128} className="t68-hero-logo" />
          <h1 className="t68-hero-title">TOWER 68</h1>
          <p className="t68-hero-tagline">
            {h.taglineA}
            <br />
            {h.taglineB}
          </p>
          <p className="t68-hero-sub">{h.sub}</p>
          <div className="t68-hero-cta">
            <a
              className="t68-btn t68-btn-primary"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {h.appstore}
            </a>
            <Link className="t68-btn t68-btn-ghost" href="/tower68/support">
              {h.faqBtn}
            </Link>
          </div>
          <p className="t68-hero-note">{h.note}</p>
        </div>
        <div className="t68-runway" />
      </section>

      <section className="t68-section t68-container">
        <p className="t68-kicker">{h.featuresKicker}</p>
        <h2 className="t68-section-title">{h.featuresTitle}</h2>
        <div className="t68-features">
          {h.features.map((f) => {
            const Icon = FEATURE_ICONS[f.icon as FeatureIcon] ?? Spline;
            return (
              <div className="t68-feature" key={f.title}>
                <span className="t68-feature-icon">
                  <Icon size={22} strokeWidth={1.75} aria-hidden />
                </span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="t68-section t68-container">
        <p className="t68-kicker">{h.howKicker}</p>
        <h2 className="t68-section-title">{h.howTitle}</h2>
        <div className="t68-steps">
          {h.how.map((s) => (
            <div className="t68-step" key={s.step}>
              <div className="t68-step-no">{s.step}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="t68-section t68-container">
        <p className="t68-kicker">{h.statsKicker}</p>
        <div className="t68-stats">
          {h.stats.map((s) => (
            <div key={s.label}>
              <div className="t68-stat-v">{s.value}</div>
              <div className="t68-stat-l">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="t68-cta-band">
        <h2>{h.ctaTitle}</h2>
        <p>{h.ctaText}</p>
        <a
          className="t68-btn t68-btn-primary"
          href={APP_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          {h.appstore}
        </a>
      </section>
    </>
  );
}
