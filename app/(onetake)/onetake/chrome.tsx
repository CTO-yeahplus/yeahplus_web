'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { COMPANY, EMAIL, NAV, toggleLang } from './i18n';

function Nav() {
  const path = usePathname();
  const home = path === '/onetake';
  const bar = useRef<HTMLDivElement | null>(null);

  // 홈: 원 테이크 화면이 끝나면 바를 어둡게(data-solid) — 그 전에는 화면 위에 투명하게 떠 있다
  useEffect(() => {
    const el = bar.current;
    if (!home || !el) return;
    const on = () => {
      const take = document.querySelector('.ot-live, .ot-take');
      const end = take ? take.getBoundingClientRect().bottom : 0;
      if (end < 64) el.setAttribute('data-solid', '1');
      else el.removeAttribute('data-solid');
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, [home]);

  return (
    // 홈에서는 화면 위에 떠 있는 투명 바(원 테이크 화면 위), 문서 페이지에서는 보통 바
    <div ref={bar} className={home ? 'ot-navbar ot-navbar-float' : 'ot-navbar'}>
      <nav className="ot-wrap">
        <Link className="ot-brand ot-plain" href="/onetake">
          <Image className="ot-mark" src="/onetake/icon-128.png" alt="" width={128} height={128} aria-hidden="true" />
          <span data-l="ko">원 테이크</span>
          <span data-l="en">ONE TAKE</span>
        </Link>
        <span className="ot-nav-links">
          {/* 앵커는 홈에서만 의미가 있다. 다른 페이지에서는 홈 링크로 바꾼다. */}
          {home ? (
            <>
              <a className="ot-nav-anchor" href="#how">
                <span data-l="ko">{NAV.ko.how}</span>
                <span data-l="en">{NAV.en.how}</span>
              </a>
              <a className="ot-nav-anchor" href="#scenes">
                <span data-l="ko">{NAV.ko.scenes}</span>
                <span data-l="en">{NAV.en.scenes}</span>
              </a>
            </>
          ) : (
            <Link href="/onetake">
              <span data-l="ko">{NAV.ko.home}</span>
              <span data-l="en">{NAV.en.home}</span>
            </Link>
          )}
          <Link href="/onetake/support">
            <span data-l="ko">{NAV.ko.support}</span>
            <span data-l="en">{NAV.en.support}</span>
          </Link>
          <Link href="/onetake/privacy">
            <span data-l="ko">{NAV.ko.privacy}</span>
            <span data-l="en">{NAV.en.privacy}</span>
          </Link>
          <button className="ot-lang-btn" type="button" onClick={toggleLang}>
            한 / EN
          </button>
        </span>
      </nav>
    </div>
  );
}

function Footer({ year }: { year: number }) {
  return (
    <footer className="ot-footer">
      <div className="ot-wrap">
        <div className="ot-flinks">
          <Link href="/onetake">
            <span data-l="ko">홈</span>
            <span data-l="en">Home</span>
          </Link>
          <Link href="/onetake/support">
            <span data-l="ko">지원 / FAQ</span>
            <span data-l="en">Support / FAQ</span>
          </Link>
          <Link href="/onetake/privacy">
            <span data-l="ko">개인정보처리방침</span>
            <span data-l="en">Privacy Policy</span>
          </Link>
          <Link href="/onetake/terms">
            <span data-l="ko">이용약관</span>
            <span data-l="en">Terms of Use</span>
          </Link>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <Link href="/">
            <span data-l="ko">yeahplus 홈</span>
            <span data-l="en">yeahplus home</span>
          </Link>
        </div>
        <div className="ot-biz">
          <span data-l="ko">주식회사 예아플러스 · 원 테이크</span>
          <span data-l="en">YeahPlus Co., Ltd. · ONE TAKE</span>
        </div>
        <div className="ot-biz" data-l="ko">
          © {year} {COMPANY.name} · 대표 {COMPANY.ceo} · 사업자등록번호 {COMPANY.biz}
          <br />
          통신판매업신고 {COMPANY.mailorder} · {COMPANY.addr}
        </div>
        <div className="ot-biz" data-l="en">
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
    <div className="ot-page">
      <Nav />
      <main>{children}</main>
      <Footer year={year} />
    </div>
  );
}
