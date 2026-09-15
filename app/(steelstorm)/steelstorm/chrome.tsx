'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPANY, EMAIL, LangProvider, NAV, useLang } from './i18n';

function Nav() {
  const { lang, setLang } = useLang();
  const path = usePathname();
  const home = path === '/steelstorm';

  return (
    <div className="ss-wrap">
      <nav>
        <Link className="ss-brand ss-plain" href="/steelstorm">
          <Image
            className="ss-mark"
            src="/steelstorm/emblem-128.webp"
            alt=""
            width={128}
            height={128}
            aria-hidden="true"
          />
          <span data-l="ko">스틸스톰 아레나</span>
          <span data-l="en">SteelStorm Arena</span>
        </Link>
        <span className="ss-nav-links">
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
            <Link href="/steelstorm">
              <span data-l="ko">{NAV.ko.home}</span>
              <span data-l="en">{NAV.en.home}</span>
            </Link>
          )}
          <Link href="/steelstorm/support">
            <span data-l="ko">{NAV.ko.support}</span>
            <span data-l="en">{NAV.en.support}</span>
          </Link>
          <Link href="/steelstorm/privacy">
            <span data-l="ko">{NAV.ko.privacy}</span>
            <span data-l="en">{NAV.en.privacy}</span>
          </Link>
          <button
            className="ss-lang-btn"
            type="button"
            onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
          >
            한 / EN
          </button>
        </span>
      </nav>
    </div>
  );
}

function Footer({ year }: { year: number }) {
  const { lang } = useLang();
  const ko = lang === 'ko';

  return (
    <footer>
      <div className="ss-wrap">
        <div className="ss-flinks">
          <Link href="/steelstorm">
            <span data-l="ko">홈</span>
            <span data-l="en">Home</span>
          </Link>
          <Link href="/steelstorm/support">
            <span data-l="ko">지원 / FAQ</span>
            <span data-l="en">Support / FAQ</span>
          </Link>
          <Link href="/steelstorm/privacy">
            <span data-l="ko">개인정보처리방침</span>
            <span data-l="en">Privacy Policy</span>
          </Link>
          <Link href="/steelstorm/terms">
            <span data-l="ko">이용약관</span>
            <span data-l="en">Terms of Use</span>
          </Link>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <Link href="/">
            <span data-l="ko">yeahplus 홈</span>
            <span data-l="en">yeahplus home</span>
          </Link>
        </div>
        <div className="ss-biz">
          <span data-l="ko">주식회사 예아플러스 · 스틸스톰 아레나</span>
          <span data-l="en">YeahPlus Co., Ltd. · SteelStorm Arena</span>
        </div>
        <div className="ss-biz">
          © {year} {ko ? COMPANY.name : COMPANY.nameEn} · {ko ? '대표' : 'CEO'}{' '}
          {ko ? COMPANY.ceo : COMPANY.ceoEn} · {ko ? '사업자등록번호' : 'Business Reg. No.'} {COMPANY.biz}
          <br />
          {ko ? '통신판매업신고' : 'Mail-order Reg.'} {ko ? COMPANY.mailorder : COMPANY.mailorderEn} ·{' '}
          {ko ? COMPANY.addr : COMPANY.addrEn}
        </div>
      </div>
    </footer>
  );
}

export default function SiteShell({ year, children }: { year: number; children: React.ReactNode }) {
  return (
    <LangProvider>
      <div className="ss-page">
        <Nav />
        <main>{children}</main>
        <Footer year={year} />
      </div>
    </LangProvider>
  );
}
