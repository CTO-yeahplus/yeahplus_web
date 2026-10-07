import type { LegalPage as LegalPageData } from './legalData';

/* 약관·개인정보·지원 — 읽는 문서라 효과 없이 서버에서 그린 HTML 그대로 내보낸다.
   한국어와 영어를 한 페이지에 모두 싣는다(자바스크립트가 꺼져 있어도, 심사자가 어느 언어로 봐도 전문이 보이도록).
   본문은 scripts/sync-24stills-legal.py 가 앱 저장소의 정본에서 옮긴 것이다. */
export default function LegalPage({ doc }: { doc: LegalPageData }) {
  return (
    <main className="st-legal">
      <nav className="st-legal-jump" aria-label="Language">
        <a href="#ko">한국어</a>
        <span aria-hidden="true">·</span>
        <a href="#en">English</a>
      </nav>

      <article id="ko" lang="ko">
        <h1>{doc.ko.title}</h1>
        {doc.ko.meta && <p className="st-legal-meta">{doc.ko.meta}</p>}
        <div dangerouslySetInnerHTML={{ __html: doc.ko.html }} />
      </article>

      <hr />

      <article id="en" lang="en">
        <h1>{doc.en.title}</h1>
        {doc.en.meta && <p className="st-legal-meta">{doc.en.meta}</p>}
        <div dangerouslySetInnerHTML={{ __html: doc.en.html }} />
      </article>
    </main>
  );
}
