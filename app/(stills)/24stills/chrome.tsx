'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useSyncExternalStore } from 'react';

export const APP_STORE_URL = 'https://apps.apple.com/app/24stills/id6769758084';

export type Lang = 'ko' | 'en';
const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'ko', setLang: () => {} });
export const useLang = () => useContext(LangContext);

/* 언어 저장소 — 서버와 첫 하이드레이션은 한국어('ko')로 그리고, 그 직후 브라우저의 실제 값
   (저장한 선택 > 브라우저 언어)으로 바뀐다. useSyncExternalStore 가 그 전환을 불일치 없이 처리한다. */
let current: Lang | null = null;
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => { listeners.add(cb); return () => { listeners.delete(cb); }; };
function readLang(): Lang {
  if (current) return current;
  let next: Lang = 'ko';
  try {
    const saved = localStorage.getItem('st-lang');
    next = saved === 'ko' || saved === 'en' ? saved : navigator.language.toLowerCase().startsWith('ko') ? 'ko' : 'en';
  } catch { /* 저장소 접근 불가 — 기본값 */ }
  current = next;
  return next;
}
function writeLang(l: Lang) {
  current = l;
  try { localStorage.setItem('st-lang', l); } catch { /* noop */ }
  listeners.forEach(cb => cb());
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readLang, () => 'ko' as Lang);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  return <LangContext.Provider value={{ lang, setLang: writeLang }}>{children}</LangContext.Provider>;
}

export function StillsNav() {
  const { lang, setLang } = useLang();
  const isLanding = usePathname() === '/24stills';
  return (
    <header className="st-nav">
      <div className="st-nav-inner">
        <Link href="/24stills" className="st-brand" aria-label="24STILLS">
          <span className="st-brand-24">24</span>
          <span className="st-brand-stills">STILLS</span>
        </Link>
        <nav className="st-nav-links">
          <Link href="/24stills/support" className="st-nav-link">{lang === 'ko' ? '지원' : 'Support'}</Link>
          {isLanding && (
            <button
              type="button"
              className="st-lang"
              onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
              aria-label={lang === 'ko' ? 'Switch to English' : '한국어로 보기'}
            >
              {lang === 'ko' ? 'EN' : 'KO'}
            </button>
          )}
          <a href={APP_STORE_URL} className="st-nav-cta">{lang === 'ko' ? '다운로드' : 'Get the app'}</a>
        </nav>
      </div>
    </header>
  );
}

export function StillsFooter({ year }: { year: number }) {
  const { lang } = useLang();
  const ko = lang === 'ko';
  return (
    <footer className="st-footer">
      <div className="st-footer-links">
        <Link href="/24stills/privacy">{ko ? '개인정보처리방침' : 'Privacy Policy'}</Link>
        <Link href="/24stills/terms">{ko ? '이용약관' : 'Terms of Service'}</Link>
        <Link href="/24stills/support">{ko ? '지원 / 문의' : 'Support'}</Link>
      </div>
      <p className="st-footer-meta">
        24STILLS · {ko ? '주식회사 예아플러스' : 'YEAHPLUS Inc.'} · <a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a>
      </p>
      <p className="st-footer-meta">© {year} YEAHPLUS Inc. {ko ? '' : 'All rights reserved.'}</p>
    </footer>
  );
}
