'use client';

/* 예아플러스 회사 웹사이트 · 공식 SNS 이용약관 — https://yeahplus.co.kr/terms
   회사의 Meta 앱(SNS 자동 게시)의 "서비스 약관 URL" 로도 쓴다. 제품(앱 · 서비스)은 각자의 약관을 따른다. */

import LegalPage, { EFFECTIVE, Mail, Sec, T } from '@/components/site/Legal';

export default function TermsContent() {
  return (
    <LegalPage
      title={{ ko: '이용약관', en: 'Terms of Use' }}
      sub={{ ko: `회사 웹사이트 · 공식 SNS · 시행일 ${EFFECTIVE}`, en: `Company website and official social accounts · Effective ${EFFECTIVE}` }}
    >
      <Sec ko="1. 적용 범위" en="1. Scope">
        <p>
          <T
            ko="이 약관은 주식회사 예아플러스(이하 “회사”)가 운영하는 회사 홈페이지(yeahplus.co.kr)와 회사의 공식 SNS 계정(인스타그램 · 페이스북 페이지 · Threads)을 이용하는 데 적용됩니다. 회사가 만든 각 앱과 서비스는 해당 페이지에 있는 각자의 약관을 따릅니다."
            en="These terms apply to your use of the company website operated by YeahPlus Inc. (“we”) at yeahplus.co.kr and our official social accounts (Instagram, Facebook Page and Threads). Each app and service we make is governed by its own terms, found on its page."
          />
        </p>
      </Sec>

      <Sec ko="2. 콘텐츠와 저작권" en="2. Content and copyright">
        <p>
          <T
            ko="웹사이트와 공식 계정의 글 · 그림 · 앱 화면 · 로고는 회사 또는 정당한 권리자에게 권리가 있습니다. 출처(예아플러스)를 밝히고 원래 게시물로 연결하는 공유는 환영합니다. 상업적으로 쓰거나 고쳐 쓰려면 먼저 회사의 허락을 받아 주세요."
            en="The text, images, app screens and logos on the website and our official accounts belong to us or their rightful owners. Sharing with credit to YeahPlus and a link to the original post is welcome. Please ask us first before any commercial use or modification."
          />
        </p>
        <p>
          <T
            ko="공공누리 등 공개 이용 조건이 붙은 자료는 그 조건을 따르며, 게시물에 출처를 적습니다."
            en="Materials published under open licences such as the Korea Open Government License follow those licences, and their sources are credited in each post."
          />
        </p>
      </Sec>

      <Sec ko="3. 정보의 정확성" en="3. Accuracy">
        <p>
          <T
            ko={<>회사는 역사 · 고전 · 연구에 관한 내용을 원문과 원 자료까지 확인한 뒤 올리지만, 해석이 갈리는 부분이 있을 수 있습니다. 틀린 곳을 발견하시면 <Mail />로 알려 주세요. 확인하고 고치겠습니다. 게시물은 일반적인 정보이며 법률 · 의료 · 투자 등의 전문적인 조언이 아닙니다.</>}
            en={<>We check history, classics and research claims against original sources before publishing, but some points remain open to interpretation. If you find an error, please tell us at <Mail /> and we will check and correct it. Posts are general information, not professional legal, medical, financial or other advice.</>}
          />
        </p>
      </Sec>

      <Sec ko="4. 외부 링크" en="4. External links">
        <p>
          <T
            ko="웹사이트와 게시물에는 App Store, 협력사, 출처 자료 같은 외부 사이트로 가는 링크가 있습니다. 그 사이트의 내용과 정책은 각 운영자의 책임입니다."
            en="The website and our posts link to external sites such as the App Store, partners and source materials. Their content and policies are the responsibility of their operators."
          />
        </p>
      </Sec>

      <Sec ko="5. 공식 계정에서의 소통" en="5. Conduct on our accounts">
        <p>
          <T
            ko="댓글과 메시지는 언제든 환영합니다. 다만 욕설 · 혐오 표현, 광고 · 스팸, 다른 사람의 개인정보 노출, 권리 침해에 해당하는 내용은 숨기거나 지울 수 있고, 반복되면 계정을 차단할 수 있습니다. 각 플랫폼의 이용 규칙도 함께 적용됩니다."
            en="Comments and messages are always welcome. We may hide or remove content that is abusive or hateful, advertising or spam, exposes other people’s personal information, or infringes others’ rights, and may block accounts that repeat it. Each platform’s own rules also apply."
          />
        </p>
      </Sec>

      <Sec ko="6. 책임의 제한" en="6. Limitation of liability">
        <p>
          <T
            ko="웹사이트와 공식 계정은 무료로 제공됩니다. 회사는 고의나 중대한 과실이 없는 한, 이를 이용하면서 생긴 간접적인 손해에 대해 관련 법령이 허용하는 범위에서 책임을 지지 않습니다. 서비스 점검이나 외부 플랫폼의 사정으로 일시적으로 이용할 수 없을 수 있습니다."
            en="The website and our official accounts are provided free of charge. Except in cases of intent or gross negligence, and to the extent permitted by law, we are not liable for indirect damages arising from their use. They may be temporarily unavailable due to maintenance or circumstances of external platforms."
          />
        </p>
      </Sec>

      <Sec ko="7. 약관의 변경" en="7. Changes">
        <p>
          <T ko="약관을 바꿀 때는 이 페이지에 새 시행일과 함께 게시합니다." en="If these terms change, we will post the new version here with a new effective date." />
        </p>
      </Sec>

      <Sec ko="8. 준거법과 관할" en="8. Governing law">
        <p>
          <T
            ko="이 약관은 대한민국 법을 따르며, 분쟁이 생기면 민사소송법에 따른 관할 법원에서 해결합니다."
            en="These terms are governed by the laws of the Republic of Korea, and any dispute will be resolved by the competent court under the Korean Civil Procedure Act."
          />
        </p>
      </Sec>

      <Sec ko="9. 문의" en="9. Contact">
        <p>
          <T
            ko={<>주식회사 예아플러스 (대표 고재혁) · <Mail /></>}
            en={<>YeahPlus Inc. (CEO Jaehyuk Ko) · <Mail /></>}
          />
        </p>
      </Sec>
    </LegalPage>
  );
}
