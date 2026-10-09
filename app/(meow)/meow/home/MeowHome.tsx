'use client';
/* eslint-disable @next/next/no-img-element -- public/meow/v2 의 그림은 미리 줄여 둔 webp 라 그대로 쓴다 */

/**
 * /meow 첫 화면 — 휠을 굴리면 장면이 흐른다.
 *  1. 튀어나오기: 액자에 끼운 고양이가 휠에 맞춰 액자 밖으로 쏙 → 네 층으로 분해되어 원리를 보여 주고 → 다시 합쳐진다
 *  2. 템플릿 12종: 카드 더미를 휠로 한 장씩 넘긴다
 *  3. 섞기: 직접 눌러 보는 놀이판(앱과 같은 액자·배경·누끼로 그린다)
 *  4. 튀어나오기 여덟 마리: 세로 휠이 가로로 흐른다 (배경·액자는 구독·팩 재료)
 *  5. 따라 하기: 피드의 꾸미기가 내 사진으로 옮겨 간다
 *  6. 원래 하던 것들 · 솔직한 정리 · 시연 영상 · 받기
 * 모든 장면은 올리면 되감긴다. 모션 줄이기를 켠 기기에서는 붙잡지 않고 완성된 모습으로 둔다.
 */
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { Apple } from '../components/icons';
import { useLang } from '../i18n';
import { COPY } from './copy';
import { TEMPLATES } from './templates';
import PopCard from './PopCard';
import { FRAMES, GALLERY, WALLS } from './assets';
import type { Tier } from './assets';
import { clamp, ease, lerp, seg, usePin } from './motion';

const APP_STORE_URL = 'https://apps.apple.com/kr/app/id6787869861';
const V = (f: string) => `/meow/v2/${f}.webp`;

/* ───────────── 1. 튀어나오기 ───────────── */
function Hero() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [ref, p] = usePin<HTMLElement>(0.4);
  const pop = ease(seg(p, 0.04, 0.34));
  const up = ease(seg(p, 0.44, 0.66));
  const down = ease(seg(p, 0.84, 0.97));
  const explode = up * (1 - down);
  const showExplain = up > 0.35 && down < 0.65;
  return (
    <section className="mw-hero" ref={ref}>
      <div className="mw-pin">
        <div className="mw-hero-grid">
          <div className="mw-hero-copy">
            <div className={`mw-swap ${showExplain ? 'mw-swap-b' : ''}`}>
              <div className="mw-swap-a-in">
                <p className="mw-kicker">{c.hero.kicker}</p>
                <h1 className="mw-h1">
                  <span>{c.hero.line1}</span>
                  <span className="mw-h1-pop" style={{ opacity: clamp(pop * 1.6 - 0.4), transform: `translateY(${(1 - pop) * 18}px)` }}>
                    {c.hero.line2}
                  </span>
                </h1>
                <p className="mw-lead">{c.hero.lead}</p>
                <div className="mw-cta">
                  <a className="mw-btn mw-btn-dark" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
                    <Apple size={18} strokeWidth={2} /> {c.final.store}
                  </a>
                </div>
              </div>
              <div className="mw-swap-b-in" aria-hidden={!showExplain}>
                <p className="mw-kicker">{c.explode.kicker}</p>
                <h2 className="mw-h2">{c.explode.title}</h2>
                <ol className="mw-layers">
                  {c.explode.layers.map((l, i) => (
                    <li key={l} style={{ opacity: clamp(up * 4 - i * 0.7) }}>
                      <i>{i + 1}</i>
                      {l}
                    </li>
                  ))}
                </ol>
                <p className="mw-body">{down > 0.3 ? c.explode.after : c.explode.body}</p>
              </div>
            </div>
          </div>
          <div className="mw-hero-art">
            <PopCard pop={pop} explode={explode} frame="polaroid_cream_s4" wall="spotty-petal_dusk_s5" size={0.78} cy={0.56} label={`${c.hero.line1} ${c.hero.line2}`} />
            <span className="mw-sok" style={{ opacity: clamp((pop - 0.75) * 4) * (1 - up), transform: `rotate(-12deg) scale(${0.6 + clamp((pop - 0.75) * 4) * 0.4})` }}>
              {c.hero.sok}
            </span>
          </div>
        </div>
        <p className="mw-hint" style={{ opacity: 1 - clamp(p * 12) }}>
          {c.hero.hint} <span aria-hidden="true">↓</span>
        </p>
      </div>
    </section>
  );
}

/* ───────────── 2. 템플릿 카드 더미 ───────────── */
function Deck() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [ref, p] = usePin<HTMLElement>(0);
  const N = TEMPLATES.length;
  const k = seg(p, 0.06, 0.94) * (N - 1);
  const cur = Math.round(k);
  const t = TEMPLATES[cur];
  return (
    <section className="mw-deck" ref={ref}>
      <div className="mw-pin">
        <div className="mw-two">
          <div className="mw-copy">
            <p className="mw-kicker">{c.deck.kicker}</p>
            <h2 className="mw-h2">{c.deck.title}</h2>
            <p className="mw-body">{c.deck.body}</p>
            <div className="mw-deck-now">
              <b>{t.label[lang]}</b>
              <span className={`mw-tier ${t.tier === 'free' ? 'mw-tier-free' : ''}`}>{t.tier === 'free' ? c.deck.free : c.deck.lock}</span>
              <small>{c.deck.count(cur + 1, N)}</small>
            </div>
            <div className="mw-tray" aria-hidden="true">
              {TEMPLATES.map((x, i) => (
                <img key={x.key} src={V(`tpl_${x.key}`)} alt="" className={i === cur ? 'mw-on' : ''} loading="lazy" />
              ))}
            </div>
          </div>
          <div className="mw-cards" aria-label={c.deck.kicker}>
            {TEMPLATES.map((x, i) => {
              const o = i - k;
              if (o > 4.5 || o < -1.2) return null;
              const style =
                o < 0
                  ? { transform: `translate(${o * 120}%, ${o * 16}%) rotate(${o * 32}deg)`, opacity: clamp(1 + o * 0.9), zIndex: 50 + i }
                  : { transform: `translate(${o * 14}px, ${-o * 12}px) rotate(${o * 2.5}deg) scale(${1 - o * 0.045})`, opacity: o > 3.5 ? 4.5 - o : 1, zIndex: 50 - i };
              return (
                <figure key={x.key} className="mw-card" style={style}>
                  <img src={V(`tpl_${x.key}`)} alt={x.label[lang]} loading={i < 3 ? 'eager' : 'lazy'} />
                </figure>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 3. 섞기 놀이판 ───────────── */
const FRAME_KEYS = Object.keys(FRAMES);
const WALL_KEYS = Object.keys(WALLS);
/** 무료만 나오면 심심하다 — 넷 중 셋은 구독·팩 재료에서 고른다. 직전 것은 다시 안 나온다. */
function pick(keys: string[], tierOf: (k: string) => Tier, prev: string) {
  const paid = Math.random() < 0.75;
  const pool = keys.filter((k) => k !== prev && (tierOf(k) !== 'free') === paid);
  const from = pool.length ? pool : keys.filter((k) => k !== prev);
  return from[Math.floor(Math.random() * from.length)];
}

function Shuffle() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [st, setSt] = useState({ frame: 'instax_solid_s5', wall: 'spotty-petal_candy_s2', tilt: -3 });
  const [pop, setPop] = useState(true);
  const [spin, setSpin] = useState(0);
  const shuffle = () => {
    setSt((o) => ({
      frame: pick(FRAME_KEYS, (k) => FRAMES[k].tier, o.frame),
      wall: pick(WALL_KEYS, (k) => WALLS[k], o.wall),
      tilt: Math.round((Math.random() * 12 - 6) * 10) / 10,
    }));
    setSpin((s) => s + 1);
  };
  const tierTag = (t: Tier) => <span className={`mw-tier mw-tier-${t}`}>{c.shuffle.tiers[t]}</span>;
  return (
    <section className="mw-shuffle">
      <div className="mw-wrap mw-two">
        <div className="mw-copy">
          <p className="mw-kicker">{c.shuffle.kicker}</p>
          <h2 className="mw-h2">{c.shuffle.title}</h2>
          <p className="mw-body">{c.shuffle.body}</p>
          <div className="mw-cta">
            <button type="button" className="mw-btn mw-btn-brand" onClick={shuffle}>
              <span className="mw-dice" key={spin} aria-hidden="true">⟳</span> {c.shuffle.button}
            </button>
            <button type="button" className={`mw-btn mw-toggle ${pop ? 'mw-on' : ''}`} aria-pressed={pop} onClick={() => setPop((v) => !v)}>
              <i aria-hidden="true" /> {pop ? c.shuffle.popOn : c.shuffle.popOff}
            </button>
          </div>
          <div className="mw-combo" aria-live="polite" key={`c${spin}`}>
            <span>
              <img src={V(`bw_${st.wall}`)} alt="" />
              {c.shuffle.wall} {tierTag(WALLS[st.wall])}
            </span>
            <span>
              <img src={V(`fr_${st.frame}`)} alt="" className="mw-combo-fr" />
              {c.shuffle.frame} {tierTag(FRAMES[st.frame].tier)}
            </span>
          </div>
          <p className="mw-note">{c.shuffle.note}</p>
        </div>
        <div className="mw-shuffle-art">
          <PopCard pop={pop ? 1 : 0} frame={st.frame} wall={st.wall} tilt={st.tilt} stickers smooth label={c.shuffle.title} />
        </div>
      </div>
    </section>
  );
}

/* ───────────── 4. 여덟 마리가 차례로 쏙 (세로 휠 → 가로) ───────────── */
function Gallery() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [ref, p, still] = usePin<HTMLElement>(0);
  const track = useRef<HTMLDivElement | null>(null);
  const [max, setMax] = useState(0);
  useEffect(() => {
    const m = () => {
      const el = track.current;
      if (el) setMax(Math.max(0, el.scrollWidth - el.clientWidth));
    };
    m();
    window.addEventListener('resize', m);
    return () => window.removeEventListener('resize', m);
  }, []);
  const shift = still ? 0 : seg(p, 0.1, 0.9) * max;
  return (
    <section className="mw-gallery" ref={ref}>
      <div className="mw-pin mw-pin-col">
        <div className="mw-wrap mw-gallery-head">
          <p className="mw-kicker">{c.gallery.kicker}</p>
          <h2 className="mw-h2">{c.gallery.title}</h2>
          <p className="mw-body">{c.gallery.body}</p>
        </div>
        <div className="mw-track" ref={track}>
          <div className="mw-track-in" style={{ transform: `translateX(${-shift}px)` }}>
            {GALLERY.map((g, i) => {
              // 화면 가운데를 지나는 카드가 살짝 들린다
              const center = max ? (i + 0.5) / GALLERY.length - seg(p, 0.1, 0.9) : 0;
              const lift = still ? 0 : clamp(1 - Math.abs(center) * 5);
              const tiers = Array.from(new Set([g.wall, g.frame])).filter((t) => t !== 'free');
              return (
                <figure key={i} className="mw-pop" style={{ transform: `translateY(${-lift * 18}px) rotate(${(i % 2 ? 2 : -2) * (1 - lift)}deg)` }}>
                  <img src={V(`gal_0${i + 1}`)} alt={`${c.gallery.kicker} ${i + 1}`} loading="lazy" />
                  {tiers.length > 0 && <figcaption>{tiers.map((t) => c.shuffle.tiers[t]).join(' · ')}</figcaption>}
                </figure>
              );
            })}
          </div>
        </div>
        <p className="mw-wrap mw-honest-line">{c.gallery.honest}</p>
      </div>
    </section>
  );
}

/* ───────────── 5. 따라 하기 ───────────── */
function Remix() {
  const { lang } = useLang();
  const c = COPY[lang];
  const [ref, p] = usePin<HTMLElement>(1);
  const t = seg(p, 0.12, 0.78);
  return (
    <section className="mw-remix" ref={ref}>
      <div className="mw-pin mw-pin-col">
        <div className="mw-wrap mw-remix-head">
          <p className="mw-kicker">{c.remix.kicker}</p>
          <h2 className="mw-h2">{c.remix.title}</h2>
          <p className="mw-body">{c.remix.body}</p>
        </div>
        <div className="mw-wrap mw-remix-stage">
          <figure className="mw-rcard">
            <span className="mw-rtag">{c.remix.feed}</span>
            <img src={V('rx_feed')} alt={c.remix.feed} loading="lazy" />
            <span className="mw-rbtn" style={{ transform: `scale(${1 - 0.08 * seg(t, 0, 0.08) + 0.08 * seg(t, 0.08, 0.16)})` }}>
              {c.remix.button}
            </span>
          </figure>
          <div className="mw-rpath" aria-hidden="true">
            {c.remix.chips.map((chip, i) => {
              const q = ease(seg(t, 0.08 + i * 0.1, 0.46 + i * 0.1));
              return (
                <span key={chip} className="mw-chip" style={{ left: `${lerp(0, 100, q)}%`, top: `${20 + i * 20}%`, opacity: q > 0.02 && q < 0.98 ? 1 : 0 }}>
                  {chip}
                </span>
              );
            })}
          </div>
          <figure className="mw-rcard">
            <span className="mw-rtag">{t > 0.92 ? c.remix.done : c.remix.mine}</span>
            <img src={V('rx_src')} alt={c.remix.mine} loading="lazy" />
            <img
              className="mw-rafter"
              src={V('rx_mine')}
              alt={c.remix.done}
              loading="lazy"
              style={{ clipPath: `inset(0 ${100 - ease(seg(t, 0.45, 0.95)) * 100}% 0 0)` }}
            />
          </figure>
        </div>
      </div>
    </section>
  );
}

/* ───────────── 6. 나머지 ───────────── */
function More() {
  const { lang, t } = useLang();
  const c = COPY[lang];
  return (
    <>
      <section className="mw-wrap mw-more">
        <h2 className="mw-h2">{c.more.title}</h2>
        <div className="mw-more-grid">
          {c.more.items.map((m, i) => (
            <div key={m.t} className="mw-more-card">
              <div className={`mw-v mw-v-${['ai', 'feed', 'draft', 'shop'][i]}`} aria-hidden="true">
                {i === 0 && (
                  <>
                    <img src={V('ai_seoul')} alt="" loading="lazy" />
                    <img src={V('ai_paris')} alt="" loading="lazy" />
                    <img src={V('ai_hk')} alt="" loading="lazy" />
                  </>
                )}
                {i === 1 && (
                  <>
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <img key={n} src={V(`feed_${n}`)} alt="" loading="lazy" />
                    ))}
                    <span className="mw-v-pill">{c.remix.button}</span>
                  </>
                )}
                {i === 2 && (
                  <>
                    <img className="mw-v-back" src={V('gal_07')} alt="" loading="lazy" />
                    <img className="mw-v-front" src={V('rx_mine')} alt="" loading="lazy" />
                    <span className="mw-v-tag">{c.more.draft}</span>
                    <span className="mw-v-saved">✓ {c.more.saved}</span>
                  </>
                )}
                {i === 3 && (
                  <>
                    {['st_macaron', 'st_donut', 'st_A1_hero-maki-roll', 'st_A1_hero-cone-single', 'st_A1_hero-saturn', 'st_A1_hero-beach-scene'].map((f) => (
                      <span key={f} className="mw-v-tile">
                        <img src={V(f)} alt="" loading="lazy" />
                      </span>
                    ))}
                    <span className="mw-v-coin">
                      <i />
                      {c.more.churu}
                    </span>
                  </>
                )}
              </div>
              <b>{m.t}</b>
              <p>{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mw-wrap mw-honest">
        <div className="mw-honest-panel">
          <img className="mw-honest-cat" src={V('gal_01')} alt="" loading="lazy" />
          <h2 className="mw-h2">{c.honest.title}</h2>
          <p className="mw-body">{c.honest.sub}</p>
          <ol className="mw-honest-grid">
            {c.honest.items.map((h, i) => (
              <li key={h.b}>
                <small>{String(i + 1).padStart(2, '0')}</small>
                <b>{h.b}</b>
                <span>{h.d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 시연 영상 (YouTube Shorts, 세로 9:16) — 기존 페이지에서 그대로 */}
      <section className="mw-wrap demo" aria-label={t.video.title}>
        <div className="demo-head">
          <h2 className="showcase-title">{t.video.title}</h2>
          <p className="showcase-sub">{t.video.subtitle}</p>
        </div>
        <div className="demo-frame">
          <iframe
            src="https://www.youtube.com/embed/b8bRrrsecUY?rel=0&playsinline=1"
            title={t.video.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </section>

      <section className="mw-final">
        <img src={V('gal_04')} alt="" className="mw-final-art" loading="lazy" />
        <h2 className="mw-h2">{c.final.title}</h2>
        <p className="mw-body">{c.final.body}</p>
        <div className="mw-cta mw-cta-center">
          <a className="mw-btn mw-btn-dark" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
            <Apple size={18} strokeWidth={2} /> {c.final.store}
          </a>
          <Link className="mw-btn" href="/meow/feed">
            {c.final.feed}
          </Link>
        </div>
      </section>
    </>
  );
}

export default function MeowHome() {
  return (
    <div className="mw">
      <Hero />
      <Deck />
      <Shuffle />
      <Gallery />
      <Remix />
      <More />
    </div>
  );
}
