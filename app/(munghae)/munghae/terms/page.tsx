import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '이용약관 — 멍해 (MUNGHAE)',
  description: '멍해(MUNGHAE) 서비스 이용약관',
};

export default function MunghaeTerms() {
  return (
    <div className="container">
      <article className="mh-doc">
        <h1>이용약관</h1>
        <p className="updated">최종 업데이트: 2025년 1월</p>

        <p className="lead">
          본 약관은 주식회사 예아플러스(이하 &ldquo;회사&rdquo;)가 제공하는 반려동물 디지털 추모 서비스
          &ldquo;멍해(MUNGHAE)&rdquo;(이하 &ldquo;서비스&rdquo;)의 이용과 관련하여 회사와 이용자 간의 권리·의무 및
          책임사항을 규정합니다.
        </p>

        <h2>1. 서비스 이용</h2>
        <p>
          멍해(MUNGHAE)는 반려가족이 사랑하는 반려동물을 디지털로 기억하고 추모할 수 있는 서비스입니다. 서비스를
          이용함으로써 본 약관에 동의하게 됩니다.
        </p>

        <h2>2. 콘텐츠 책임</h2>
        <p>
          사용자가 업로드하는 사진·영상·텍스트의 저작권은 사용자에게 있으며, 멍해는 서비스 제공 목적 외에 해당
          콘텐츠를 사용하지 않습니다.
        </p>

        <h2>3. 서비스 제한</h2>
        <p>
          불법 콘텐츠, 타인 비방, 개인정보 침해 등의 목적으로 서비스를 이용하는 경우 계정이 정지될 수 있습니다.
        </p>

        <h2>4. 구독 및 결제</h2>
        <p>
          프리미엄 구독은 App Store 또는 Google Play를 통해 처리되며, 구독 취소 시에도 현재 결제 기간이 종료될
          때까지 서비스를 이용할 수 있습니다.
        </p>

        <h2>문의</h2>
        <p>
          본 약관에 관한 문의는 <a href="mailto:contact@yeahplus.co.kr">contact@yeahplus.co.kr</a> 으로 연락 주시기
          바랍니다.
        </p>

        <p className="legal-note">
          상호: 주식회사 예아플러스 · 대표자: 고재혁 · 사업자등록번호: 283-88-02519
          <br />
          통신판매업신고번호: 2022-경기파주-2995
          <br />
          주소: 경기도 파주시 교하로159번길 33, 3층 304호 에이318(목동동, 목동프라자)
        </p>
      </article>
    </div>
  );
}
