'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPANY, EMAIL, LangProvider, NAV, useLang } from './i18n';

function Nav() {
  const { lang, setLang } = useLang();
  const n = NAV[lang];
  const path = usePathname();
  const home = path === '/sillok';

  return (
    <div className="sl-wrap">
      <nav>
        <Link className="sl-brand sl-plain" href="/sillok">
          <Image
            className="sl-seal-sm"
            src="/sillok/icon-96.webp"
            alt=""
            width={96}
            height={96}
            aria-hidden="true"
          />
          <span data-l="ko">조선왕조실록</span>
          <span data-l="en">Joseon Annals</span>
        </Link>
        <span className="sl-nav-links">
          {/* 앵커는 홈에서만 의미가 있다. 다른 페이지에서는 홈 링크로 바꾼다. */}
          {home ? (
            <>
              <a href="#why">
                <span data-l="ko">{NAV.ko.why}</span>
                <span data-l="en">{NAV.en.why}</span>
              </a>
              <a href="#parents">
                <span data-l="ko">{NAV.ko.parents}</span>
                <span data-l="en">{NAV.en.parents}</span>
              </a>
            </>
          ) : (
            <Link href="/sillok">
              <span data-l="ko">{NAV.ko.home}</span>
              <span data-l="en">{NAV.en.home}</span>
            </Link>
          )}
          <Link href="/sillok/support">
            <span data-l="ko">{NAV.ko.support}</span>
            <span data-l="en">{NAV.en.support}</span>
          </Link>
          <Link href="/sillok/privacy">
            <span data-l="ko">{NAV.ko.privacy}</span>
            <span data-l="en">{NAV.en.privacy}</span>
          </Link>
          <button
            className="sl-lang-btn"
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
      <div className="sl-wrap">
        <div className="sl-flinks">
          <Link href="/sillok">
            <span data-l="ko">홈</span>
            <span data-l="en">Home</span>
          </Link>
          <Link href="/sillok/support">
            <span data-l="ko">지원 / FAQ</span>
            <span data-l="en">Support / FAQ</span>
          </Link>
          <Link href="/sillok/privacy">
            <span data-l="ko">개인정보처리방침</span>
            <span data-l="en">Privacy Policy</span>
          </Link>
          <Link href="/sillok/terms">
            <span data-l="ko">이용약관</span>
            <span data-l="en">Terms of Use</span>
          </Link>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <Link href="/">
            <span data-l="ko">yeahplus 홈</span>
            <span data-l="en">yeahplus home</span>
          </Link>
        </div>
        <div className="sl-biz">
          <span data-l="ko">주식회사 예아플러스 · 조선왕조실록 — 왕의 선택</span>
          <span data-l="en">YeahPlus Co., Ltd. · Joseon Annals: King&rsquo;s Choice</span>
        </div>
        <div className="sl-biz">
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
      <div className="sl-page">
        <Nav />
        {children}
        <Footer year={year} />
      </div>
    </LangProvider>
  );
}
