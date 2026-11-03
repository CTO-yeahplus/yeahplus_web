'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { COMPANY, EMAIL, NAV, toggleLang } from './i18n';

function Nav() {
  const path = usePathname();
  const home = path === '/rocketparking';
  const bar = useRef<HTMLDivElement | null>(null);

  // 홈: 히어로(착륙 한 판)가 끝나면 바를 어둡게 — 그 전에는 화면 위에 투명하게 떠 있다
  useEffect(() => {
    const el = bar.current;
    if (!home || !el) return;
    const on = () => {
      const hero = document.querySelector('.rp-descent');
      const end = hero ? hero.getBoundingClientRect().bottom : 0;
      if (end < 64) el.setAttribute('data-solid', '1');
      else el.removeAttribute('data-solid');
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [home]);

  return (
    <div ref={bar} className={home ? 'rp-navbar rp-navbar-float' : 'rp-navbar'}>
      <nav className="rp-wrap">
        <Link className="rp-brand rp-plain" href="/rocketparking">
          <Image className="rp-mark" src="/rocketparking/icon-128.png" alt="" width={128} height={128} aria-hidden="true" />
          <span data-l="ko">로켓주차</span>
          <span data-l="en">ROCKET PARKING</span>
        </Link>
        <span className="rp-nav-links">
          {home ? (
            <>
              <a className="rp-nav-anchor" href="#play">
                <span data-l="ko">{NAV.ko.play}</span>
                <span data-l="en">{NAV.en.play}</span>
              </a>
              <a className="rp-nav-anchor" href="#hangar">
                <span data-l="ko">{NAV.ko.hangar}</span>
                <span data-l="en">{NAV.en.hangar}</span>
              </a>
            </>
          ) : (
            <Link href="/rocketparking">
              <span data-l="ko">{NAV.ko.home}</span>
              <span data-l="en">{NAV.en.home}</span>
            </Link>
          )}
          <Link href="/rocketparking/support">
            <span data-l="ko">{NAV.ko.support}</span>
            <span data-l="en">{NAV.en.support}</span>
          </Link>
          <Link href="/rocketparking/privacy">
            <span data-l="ko">{NAV.ko.privacy}</span>
            <span data-l="en">{NAV.en.privacy}</span>
          </Link>
          <button className="rp-lang-btn" type="button" onClick={toggleLang}>
            한 / EN
          </button>
        </span>
      </nav>
    </div>
  );
}

function Footer({ year }: { year: number }) {
  return (
    <footer className="rp-footer">
      <div className="rp-wrap">
        <div className="rp-flinks">
          <Link href="/rocketparking">
            <span data-l="ko">홈</span>
            <span data-l="en">Home</span>
          </Link>
          <Link href="/rocketparking/support">
            <span data-l="ko">지원 / FAQ</span>
            <span data-l="en">Support / FAQ</span>
          </Link>
          <Link href="/rocketparking/privacy">
            <span data-l="ko">개인정보처리방침</span>
            <span data-l="en">Privacy Policy</span>
          </Link>
          <Link href="/rocketparking/terms">
            <span data-l="ko">이용약관</span>
            <span data-l="en">Terms of Use</span>
          </Link>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <Link href="/">
            <span data-l="ko">yeahplus 홈</span>
            <span data-l="en">yeahplus home</span>
          </Link>
        </div>
        <div className="rp-biz">
          <span data-l="ko">주식회사 예아플러스 · 로켓주차</span>
          <span data-l="en">YeahPlus Co., Ltd. · ROCKET PARKING</span>
        </div>
        <div className="rp-biz" data-l="ko">
          © {year} {COMPANY.name} · 대표 {COMPANY.ceo} · 사업자등록번호 {COMPANY.biz}
          <br />
          통신판매업신고 {COMPANY.mailorder} · {COMPANY.addr}
        </div>
        <div className="rp-biz" data-l="en">
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
    <div className="rp-page">
      <Nav />
      <main>{children}</main>
      <Footer year={year} />
    </div>
  );
}
