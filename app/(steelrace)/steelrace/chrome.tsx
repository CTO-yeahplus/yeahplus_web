'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPANY, EMAIL, NAV, toggleLang } from './i18n';

function Nav() {
  const path = usePathname();
  const home = path === '/steelrace';

  return (
    <div className="sr-wrap">
      <nav>
        <Link className="sr-brand sr-plain" href="/steelrace">
          <Image
            className="sr-mark"
            src="/steelrace/icon-128.png"
            alt=""
            width={128}
            height={128}
            aria-hidden="true"
          />
          <span data-l="ko">스틸레이스</span>
          <span data-l="en">STEELRACE</span>
        </Link>
        <span className="sr-nav-links">
          {/* 앵커는 홈에서만 의미가 있다. 다른 페이지에서는 홈 링크로 바꾼다. */}
          {home ? (
            <>
              <a href="#how">
                <span data-l="ko">{NAV.ko.how}</span>
                <span data-l="en">{NAV.en.how}</span>
              </a>
              <a href="#specs">
                <span data-l="ko">{NAV.ko.specs}</span>
                <span data-l="en">{NAV.en.specs}</span>
              </a>
            </>
          ) : (
            <Link href="/steelrace">
              <span data-l="ko">{NAV.ko.home}</span>
              <span data-l="en">{NAV.en.home}</span>
            </Link>
          )}
          <Link href="/steelrace/support">
            <span data-l="ko">{NAV.ko.support}</span>
            <span data-l="en">{NAV.en.support}</span>
          </Link>
          <Link href="/steelrace/privacy">
            <span data-l="ko">{NAV.ko.privacy}</span>
            <span data-l="en">{NAV.en.privacy}</span>
          </Link>
          <button
            className="sr-lang-btn"
            type="button"
            onClick={toggleLang}
          >
            한 / EN
          </button>
        </span>
      </nav>
    </div>
  );
}

function Footer({ year }: { year: number }) {
  return (
    <footer>
      <div className="sr-wrap">
        <div className="sr-flinks">
          <Link href="/steelrace">
            <span data-l="ko">홈</span>
            <span data-l="en">Home</span>
          </Link>
          <Link href="/steelrace/support">
            <span data-l="ko">지원 / FAQ</span>
            <span data-l="en">Support / FAQ</span>
          </Link>
          <Link href="/steelrace/privacy">
            <span data-l="ko">개인정보처리방침</span>
            <span data-l="en">Privacy Policy</span>
          </Link>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <Link href="/">
            <span data-l="ko">yeahplus 홈</span>
            <span data-l="en">yeahplus home</span>
          </Link>
        </div>
        <div className="sr-biz">
          <span data-l="ko">주식회사 예아플러스 · 스틸레이스</span>
          <span data-l="en">YeahPlus Co., Ltd. · STEELRACE</span>
        </div>
        <div className="sr-biz" data-l="ko">
          © {year} {COMPANY.name} · 대표 {COMPANY.ceo} · 사업자등록번호 {COMPANY.biz}
          <br />
          통신판매업신고 {COMPANY.mailorder} · {COMPANY.addr}
        </div>
        <div className="sr-biz" data-l="en">
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
    <div className="sr-page">
      <Nav />
      <main>{children}</main>
      <Footer year={year} />
    </div>
  );
}
