'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPANY, EMAIL } from './site';
import { toggleLang } from './i18n';

function Nav() {
  const home = usePathname() === '/munghae';
  return (
    <div className="kp-wrap">
      <nav>
        <Link className="kp-brand" href="/munghae">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="kp-mark" src="/munghae/icon-128.png" alt="" width={64} height={64} aria-hidden="true" />
          <span data-l="ko">간직</span>
          <span data-l="en">Keepsake</span>
        </Link>
        <span className="kp-nav-links">
          {home ? (
            <a href="#inside">
              <span data-l="ko">소개</span>
              <span data-l="en">Inside</span>
            </a>
          ) : (
            <Link href="/munghae">
              <span data-l="ko">홈</span>
              <span data-l="en">Home</span>
            </Link>
          )}
          <Link href="/munghae/support">
            <span data-l="ko">지원</span>
            <span data-l="en">Support</span>
          </Link>
          <Link href="/munghae/privacy">
            <span data-l="ko">개인정보</span>
            <span data-l="en">Privacy</span>
          </Link>
          <button className="kp-lang-btn" type="button" onClick={toggleLang}>
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
      <div className="kp-wrap">
        <div className="kp-flinks">
          <Link href="/munghae">
            <span data-l="ko">홈</span>
            <span data-l="en">Home</span>
          </Link>
          <Link href="/munghae/support">
            <span data-l="ko">지원 / 자주 묻는 질문</span>
            <span data-l="en">Support / FAQ</span>
          </Link>
          <Link href="/munghae/privacy">
            <span data-l="ko">개인정보처리방침</span>
            <span data-l="en">Privacy Policy</span>
          </Link>
          <Link href="/munghae/terms">
            <span data-l="ko">이용약관</span>
            <span data-l="en">Terms</span>
          </Link>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          <Link href="/">
            <span data-l="ko">yeahplus 홈</span>
            <span data-l="en">yeahplus home</span>
          </Link>
        </div>
        <div className="kp-biz" data-l="ko">
          © {year} {COMPANY.name} · 대표 {COMPANY.ceo} · 사업자등록번호 {COMPANY.biz}
          <br />
          통신판매업신고 {COMPANY.mailorder} · {COMPANY.addr}
        </div>
        <div className="kp-biz" data-l="en">
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
    <div className="kp-page">
      <Nav />
      <main>{children}</main>
      <Footer year={year} />
    </div>
  );
}
