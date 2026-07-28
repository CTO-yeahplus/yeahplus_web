import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침 — 멍해 (MUNGHAE)',
  description: '멍해(MUNGHAE) 개인정보처리방침',
};

export default function MunghaePrivacy() {
  return (
    <div className="container">
      <article className="mh-doc">
        <h1>개인정보처리방침</h1>
        <p className="updated">최종 업데이트: 2025년 1월</p>

        <p className="lead">
          주식회사 예아플러스(이하 &ldquo;회사&rdquo;)는 이용자의 개인정보를 소중히 다루며, 관련 법령을 준수합니다.
          본 방침은 멍해(MUNGHAE) 서비스에서 개인정보가 어떻게 수집·이용·보관·관리되는지 설명합니다.
        </p>

        <h2>1. 수집 정보</h2>
        <p>
          서비스 이용에 필요한 최소한의 정보만 수집합니다. 업로드된 미디어와 추모공간 데이터는 기기 내에 안전하게
          저장됩니다.
        </p>

        <h2>2. 정보 공유</h2>
        <p>
          사용자 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 법적 요구가 있는 경우는 예외입니다.
        </p>

        <h2>3. 데이터 보안</h2>
        <p>
          데이터는 암호화되어 저장되며, 정기적인 보안 점검을 통해 안전하게 관리됩니다.
        </p>

        <h2>4. 사용자 권리</h2>
        <p>
          언제든지 데이터 삭제·수정·다운로드를 요청할 수 있으며, 프로필 → 데이터 관리에서 직접 처리하실 수 있습니다.
        </p>

        <h2>문의</h2>
        <p>
          개인정보 관련 문의는 <a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a> 으로 연락 주시기
          바랍니다.
        </p>

        <p className="legal-note">
          상호: 주식회사 예아플러스 · 대표자: 고재혁 · 사업자등록번호: 283-88-02519
          <br />
          개인정보 보호책임자: 고재혁 · contact@yeahplus.co.kr
          <br />
          주소: 경기도 파주시 교하로159번길 33, 3층 304호 에이318(목동동, 목동프라자)
        </p>
      </article>
    </div>
  );
}
