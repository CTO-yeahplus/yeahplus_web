'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { APP, COMPANY, EMAIL, NAV, toggleLang } from './i18n';
import { BASE } from './names';

/** 회사 로고 = 막대 4개 방패(노란 십자는 게임 허브 마크라 쓰지 않는다) */
export function Shield({ size = 14 }: { size?: number }) {
  return (
    <svg className="sb-shield" viewBox="310 293 460 526" width={size * 0.875} height={size} aria-hidden="true">
      <path d="M310 293H411V600L310 499Z" />
      <path d="M430 293H530V819L430 719Z" />
      <path d="M550 293H650V719L550 819Z" />
      <path d="M669 293H770V499L669 600Z" />
    </svg>
  );
}

function Nav() {
  const path = usePathname();
  const home = path === BASE;
  const bar = useRef<HTMLDivElement | null>(null);

  // 홈: 표지(히어로)가 지나가면 바를 종이색으로 — 그 전에는 하늘 위에 투명하게 떠 있다
  useEffect(() => {
    const el = bar.current;
    if (!home || !el) return;
    const on = () => {
      const hero = document.querySelector('.sb-hero');
      const end = hero ? hero.getBoundingClientRect().bottom : 0;
      if (end < 64) el.setAttribute('data-solid', '1');
      else el.removeAttribute('data-solid');
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [home]);

  return (
    <div ref={bar} className={home ? 'sb-navbar sb-navbar-float' : 'sb-navbar'}>
      <nav className="sb-wrap">
        <Link className="sb-brand sb-plain" href={BASE}>
          <Image className="sb-mark" src="/summitbook/icon-128.png" alt="" width={128} height={128} aria-hidden="true" />
          <span data-l="ko">{APP.ko}</span>
          <span data-l="en">{APP.en}</span>
        </Link>
        <span className="sb-nav-links">
          {home ? (
            <>
              <a className="sb-nav-anchor" href="#stamp">
                <span data-l="ko">{NAV.ko.stamp}</span>
                <span data-l="en">{NAV.en.stamp}</span>
              </a>
              <a className="sb-nav-anchor" href="#pages">
                <span data-l="ko">{NAV.ko.pages}</span>
                <span data-l="en">{NAV.en.pages}</span>
              </a>
            </>
          ) : (
            <Link href={BASE}>
              <span data-l="ko">{NAV.ko.home}</span>
              <span data-l="en">{NAV.en.home}</span>
            </Link>
          )}
          <Link href={`${BASE}/support`}>
            <span data-l="ko">{NAV.ko.support}</span>
            <span data-l="en">{NAV.en.support}</span>
          </Link>
          <Link className="sb-nav-priv" href={`${BASE}/privacy`}>
            <span data-l="ko">{NAV.ko.privacy}</span>
            <span data-l="en">{NAV.en.privacy}</span>
          </Link>
          <button className="sb-lang-btn" type="button" onClick={toggleLang}>
            한 / EN
          </button>
        </span>
      </nav>
    </div>
  );
}

function Footer({ year }: { year: number }) {
  return (
    <footer className="sb-footer">
      <div className="sb-wrap">
        <div className="sb-flinks">
          <Link href={BASE}>
            <span data-l="ko">홈</span>
            <span data-l="en">Home</span>
          </Link>
          <Link href={`${BASE}/support`}>
            <span data-l="ko">지원 / FAQ</span>
            <span data-l="en">Support / FAQ</span>
          </Link>
          <Link href={`${BASE}/privacy`}>
            <span data-l="ko">개인정보처리방침</span>
            <span data-l="en">Privacy Policy</span>
          </Link>
          <Link href={`${BASE}/terms`}>
            <span data-l="ko">이용약관</span>
            <span data-l="en">Terms of Use</span>
          </Link>
          <Link href={`${BASE}/data`}>
            <span data-l="ko">산 데이터(ODbL)</span>
            <span data-l="en">Summit data (ODbL)</span>
          </Link>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <Link href="/">
            <span data-l="ko">yeahplus 홈</span>
            <span data-l="en">yeahplus home</span>
          </Link>
        </div>
        <div className="sb-biz sb-maker">
          <Shield size={13} />
          <span data-l="ko">주식회사 예아플러스 · {APP.ko}</span>
          <span data-l="en">YeahPlus Co., Ltd. · {APP.en}</span>
        </div>
        <div className="sb-biz" data-l="ko">
          © {year} {COMPANY.name} · 대표 {COMPANY.ceo} · 사업자등록번호 {COMPANY.biz}
          <br />
          통신판매업신고 {COMPANY.mailorder} · {COMPANY.addr}
        </div>
        <div className="sb-biz" data-l="en">
          © {year} {COMPANY.nameEn} · CEO {COMPANY.ceoEn} · Business Reg. No. {COMPANY.biz}
          <br />
          Mail-order Reg. {COMPANY.mailorderEn} · {COMPANY.addrEn}
        </div>
      </div>
    </footer>
  );
}

export default function SiteShell({ year, children }: { year: number; children: React.ReactNode }) {
  return (
    <div className="sb-page">
      <Nav />
      <main>{children}</main>
      <Footer year={year} />
    </div>
  );
}
