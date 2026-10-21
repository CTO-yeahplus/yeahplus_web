'use client';

/* 예아플러스 회사 개인정보처리방침 — https://yeahplus.co.kr/privacy
   ⚠️ 이 주소가 회사 SNS 자동 게시용 Meta 앱의 "개인정보처리방침 URL", #deletion 이 "데이터 삭제 안내 URL" 이다.
   적은 내용은 실제 동작과 맞아야 한다:
     · 회사 홈: app/(site)/layout.tsx — Vercel Analytics · Speed Insights, 글꼴은 jsDelivr(Pretendard) · Google Fonts(JetBrains Mono)
     · 언어 선택만 브라우저에 저장: components/site/lang.tsx (yp_site_lang)
     · 자동 게시: marketing/AUTOMATION.md — 토큰은 GitHub Actions Secrets, 이미지는 Supabase 공개 버킷, 게시 기록은 저장소의 refs/yeahplus-social/state
   제품(앱 · 서비스)은 각자의 처리방침을 따른다. */

import Link from 'next/link';
import LegalPage, { EFFECTIVE, Mail, Sec, T } from '@/components/site/Legal';
import { PRODUCTS } from '@/components/site/products';
import { useLang } from '@/components/site/lang';

function ProductPolicies() {
  const { L } = useLang();
  return (
    <ul className="yp-legal-links">
      {PRODUCTS.map((p) => {
        const inner = p.href.startsWith('/');
        const href = inner ? `${p.href}/privacy` : p.href;
        return (
          <li key={p.id}>
            {inner ? <Link href={href}>{L(p.ko, p.en)}</Link> : <a href={href} target="_blank" rel="noopener noreferrer">{L(p.ko, p.en)}</a>}
            {!inner && <span> {L('(자체 사이트)', '(own site)')}</span>}
          </li>
        );
      })}
    </ul>
  );
}

export default function PrivacyContent() {
  return (
    <LegalPage
      title={{ ko: '개인정보처리방침', en: 'Privacy Policy' }}
      sub={{ ko: `주식회사 예아플러스 · 시행일 ${EFFECTIVE}`, en: `YeahPlus Inc. · Effective ${EFFECTIVE}` }}
    >
      <p className="yp-legal-tldr">
        <T
          ko="한 줄 요약: 이 웹사이트에는 회원가입이 없고 방문자를 개인 단위로 추적하지 않습니다. 회사 SNS 자동 게시 앱은 예아플러스가 운영하는 계정의 정보만 다룹니다."
          en="In one line: this website has no sign-up and does not track visitors individually. Our social posting app only handles the accounts YeahPlus itself operates."
        />
      </p>

      <Sec ko="1. 적용 범위" en="1. Scope">
        <p>
          <T
            ko="이 방침은 주식회사 예아플러스(이하 “회사”)가 운영하는 회사 홈페이지(yeahplus.co.kr)와 이 문서들, 회사의 공식 SNS 계정(인스타그램 · 페이스북 페이지 · Threads), 그리고 그 계정에 글을 올리는 데 쓰는 회사의 Meta 앱(이하 “자동 게시 앱”)에 적용됩니다."
            en="This policy covers the company website operated by YeahPlus Inc. (“we”) at yeahplus.co.kr and these documents, our official social accounts (Instagram, Facebook Page and Threads), and the Meta app we use to post to those accounts (the “posting app”)."
          />
        </p>
        <p>
          <T
            ko="회사가 만든 각 앱과 서비스는 각자의 개인정보처리방침을 따릅니다."
            en="Each app and service we make has its own privacy policy:"
          />
        </p>
        <ProductPolicies />
      </Sec>

      <Sec ko="2. 웹사이트에서 처리하는 정보" en="2. What the website processes">
        <ul>
          <li>
            <T
              ko="회원가입 · 로그인 · 문의 양식 · 광고가 없습니다. 이름이나 연락처를 입력받지 않습니다."
              en="There is no sign-up, login, contact form or advertising. We do not ask for your name or contact details."
            />
          </li>
          <li>
            <T
              ko="고른 언어(한국어 · 영어)만 브라우저 저장소에 남습니다. 쿠키는 쓰지 않습니다."
              en="Only your language choice (Korean or English) is kept in your browser’s storage. We do not use cookies."
            />
          </li>
          <li>
            <T
              ko="방문 통계와 페이지 속도는 Vercel 의 도구(Web Analytics · Speed Insights)로 집계합니다. 이 도구들은 쿠키를 쓰지 않고 방문자를 개인 단위로 식별하지 않으며, 본 페이지 · 들어온 경로 · 브라우저와 기기 종류 · 대략의 국가 · 로딩 속도 같은 합계만 보여 줍니다."
              en="Visit counts and page speed are measured with Vercel’s tools (Web Analytics and Speed Insights). They use no cookies and do not identify individual visitors; they show only totals such as pages viewed, referrers, browser and device type, approximate country and loading speed."
            />
          </li>
          <li>
            <T
              ko="웹사이트는 Vercel 에서 운영되며, Vercel 은 서비스 운영과 보안을 위해 접속 기록(IP 주소, 요청 시각, 브라우저 정보)을 처리할 수 있습니다."
              en="The website is hosted on Vercel, which may process access logs (IP address, request time, browser information) to run and secure the service."
            />
          </li>
          <li>
            <T
              ko="본문 글꼴(Pretendard)은 jsDelivr 에서, 숫자 글꼴(JetBrains Mono)은 Google Fonts 에서 내려받습니다. 이때 방문자의 브라우저가 그 회사에 IP 주소와 브라우저 정보를 보냅니다."
              en="The body font (Pretendard) is loaded from jsDelivr and the numeral font (JetBrains Mono) from Google Fonts. When this happens, your browser sends your IP address and browser information to those providers."
            />
          </li>
        </ul>
      </Sec>

      <Sec ko="3. 이메일 문의" en="3. Email enquiries">
        <p>
          <T
            ko={<>
              <Mail />로 문의하시면 답변을 위해 보내 주신 이메일 주소와 이름(적으신 경우), 내용을 보관합니다. 답변 외의 목적으로 쓰지 않으며, 처리가 끝나면 1년 안에 지웁니다.
            </>}
            en={<>
              If you email <Mail />, we keep your address, your name (if given) and your message to reply. We use them for nothing else and delete them within one year after the matter is closed.
            </>}
          />
        </p>
      </Sec>

      <Sec ko="4. 공식 SNS 계정과 자동 게시 앱" en="4. Official social accounts and the posting app">
        <p>
          <T
            ko="회사는 미리 만든 글과 그림을 정해진 시각에 회사의 인스타그램 · 페이스북 페이지 · Threads 계정에 올리기 위해 Meta 앱을 씁니다. 이 앱은 회사가 운영하는 계정에만 연결되며, 다음만 처리합니다."
            en="We use a Meta app to publish prepared posts and images to our own Instagram, Facebook Page and Threads accounts at scheduled times. The app is connected only to accounts we operate and processes only the following:"
          />
        </p>
        <ul>
          <li><T ko="회사 페이지 · 계정의 식별 번호와 이름" en="The ID numbers and names of our own Page and accounts" /></li>
          <li><T ko="그 계정에 글을 올리기 위한 접근 토큰" en="Access tokens for posting to those accounts" /></li>
          <li><T ko="올릴 글과 그림, 올린 결과(게시물 번호 · 게시 시각)" en="The posts and images to publish, and the results (post IDs and publish times)" /></li>
        </ul>
        <p>
          <T
            ko="자동 게시 앱은 팔로워나 다른 이용자의 개인정보를 수집하지 않고, 댓글 · 메시지를 API 로 읽지 않으며, 광고 타기팅에 쓰지 않습니다. 댓글과 메시지에는 회사 담당자가 각 앱에서 직접 답합니다. 플랫폼 안에서 처리되는 정보는 Meta 의 개인정보처리방침을 따릅니다."
            en="The posting app does not collect personal data about followers or other users, does not read comments or messages through the API, and is not used for ad targeting. Our staff reply to comments and messages directly in each app. Data processed within the platforms is governed by Meta’s privacy policy."
          />
        </p>
        <p>
          <T
            ko="접근 토큰은 GitHub Actions 의 암호화된 비밀 값으로, 게시 기록은 회사 저장소에 보관합니다. 올릴 그림은 게시 전까지 Supabase 저장소의 공개 주소에 두고, 게시가 끝나면 지울 수 있습니다."
            en="Access tokens are stored as encrypted GitHub Actions secrets, and publishing records in our repository. Images waiting to be posted are kept at a public Supabase storage address until they are posted, and may be deleted afterwards."
          />
        </p>
      </Sec>

      <Sec ko="5. 데이터 삭제 요청" en="5. Data deletion" id="deletion">
        <p>
          <T
            ko="자동 게시 앱은 회사 계정 외의 이용자 정보를 저장하지 않습니다. 그래도 회사가 보관 중인 내 정보(예: 문의 메일)의 삭제를 원하시거나, 회사 계정과 주고받은 내용에 관해 요청하실 것이 있으면 아래처럼 해 주세요."
            en="The posting app stores no information about anyone other than our own accounts. If you would still like us to delete information we hold about you (such as an enquiry email), or have a request about your interactions with our accounts, please do the following:"
          />
        </p>
        <ol>
          <li>
            <T
              ko={<><Mail />로 제목을 “데이터 삭제 요청”으로 보내 주세요. 관련 계정 이름이나 메일 주소를 함께 적어 주시면 찾기 쉽습니다.</>}
              en={<>Email <Mail /> with the subject “Data deletion request”, including the account name or email address involved.</>}
            />
          </li>
          <li>
            <T
              ko="회사는 확인 후 30일 안에 삭제하고 결과를 회신합니다. 법령상 보관해야 하는 정보는 그 기간이 끝난 뒤 지웁니다."
              en="We will delete the data within 30 days of confirming the request and reply with the result. Data we are required by law to keep is deleted when that period ends."
            />
          </li>
          <li>
            <T
              ko="페이스북 계정에서 앱 연결을 끊으려면: 페이스북 ▸ 설정 및 개인정보 ▸ 설정 ▸ 앱 및 웹사이트(또는 비즈니스 통합)에서 해당 앱을 삭제합니다."
              en="To remove an app connection from your Facebook account: Facebook ▸ Settings & privacy ▸ Settings ▸ Apps and websites (or Business integrations), then remove the app."
            />
          </li>
        </ol>
      </Sec>

      <Sec ko="6. 처리 위탁과 국외 이전" en="6. Processors and transfers abroad">
        <p>
          <T
            ko="회사는 개인정보를 판매하지 않습니다. 위 기능을 위해 다음 사업자가 정보를 처리하며, 이들의 서버가 국외에 있어 해당 정보가 국외로 이전될 수 있습니다."
            en="We do not sell personal data. The following providers process information for the functions above, and because their servers are located abroad, that information may be transferred outside Korea."
          />
        </p>
        <div className="yp-legal-table">
          <table>
            <thead>
              <tr>
                <th><T ko="받는 자 (국가)" en="Recipient (country)" /></th>
                <th><T ko="목적" en="Purpose" /></th>
                <th><T ko="항목" en="Data" /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vercel Inc. (<T ko="미국" en="USA" />)</td>
                <td><T ko="웹사이트 운영 · 방문 통계" en="Website hosting and visit statistics" /></td>
                <td><T ko="접속 기록, 합계 통계" en="Access logs, aggregate statistics" /></td>
              </tr>
              <tr>
                <td>GitHub, Inc. (<T ko="미국" en="USA" />)</td>
                <td><T ko="자동 게시 실행 · 게시 기록 · 토큰 보관" en="Running scheduled posts, records, token storage" /></td>
                <td><T ko="회사 계정 정보, 게시 기록" en="Our account details, publishing records" /></td>
              </tr>
              <tr>
                <td>Supabase, Inc. (<T ko="미국" en="USA" />)</td>
                <td><T ko="게시 전 그림 보관" en="Storing images before posting" /></td>
                <td><T ko="게시할 그림" en="Images to be posted" /></td>
              </tr>
              <tr>
                <td>Meta Platforms, Inc. (<T ko="미국" en="USA" />)</td>
                <td><T ko="공식 계정에 게시" en="Publishing to our official accounts" /></td>
                <td><T ko="게시할 글과 그림, 회사 계정 정보" en="Posts and images, our account details" /></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <T
            ko="이전 시점은 웹사이트에 접속하거나 회사가 글을 게시할 때이며, 각 사업자의 보유 기간과 정책을 따릅니다. 글꼴 제공자(jsDelivr · Google)에 전달되는 정보는 2조와 같습니다."
            en="Transfers occur when you visit the website or when we publish a post, and are retained according to each provider’s own policy. Information sent to the font providers (jsDelivr and Google) is described in section 2."
          />
        </p>
      </Sec>

      <Sec ko="7. 이용자의 권리" en="7. Your rights">
        <p>
          <T
            ko={<>회사가 보관 중인 내 정보의 열람 · 정정 · 삭제 · 처리 정지를 언제든 <Mail />로 요청하실 수 있습니다. 회사는 지체 없이 처리하고 결과를 알려 드립니다.</>}
            en={<>You may ask to access, correct, delete or stop the processing of information we hold about you at any time by emailing <Mail />. We will act without delay and tell you the result.</>}
          />
        </p>
      </Sec>

      <Sec ko="8. 아동" en="8. Children">
        <p>
          <T
            ko="이 웹사이트와 공식 계정은 아동의 개인정보를 일부러 수집하지 않습니다."
            en="This website and our official accounts do not knowingly collect personal data from children."
          />
        </p>
      </Sec>

      <Sec ko="9. 안전성 확보 조치" en="9. Security">
        <p>
          <T
            ko="접근 토큰과 키는 암호화된 비밀 값으로만 보관하고 문서 · 메시지에 적지 않으며, 다룰 수 있는 사람을 회사 관리자로 제한합니다."
            en="Access tokens and keys are kept only as encrypted secrets, never written into documents or messages, and only company administrators can use them."
          />
        </p>
      </Sec>

      <Sec ko="10. 개인정보 보호책임자와 문의" en="10. Privacy officer and contact">
        <p>
          <T
            ko={<>개인정보 보호책임자: 고재혁(대표이사) · <Mail /><br />주식회사 예아플러스 · 경기도 파주시 교하로159번길 33, 3층 304호 에이318</>}
            en={<>Privacy officer: Jaehyuk Ko (CEO) · <Mail /><br />YeahPlus Inc. · 3F 304-A318, 33 Gyoha-ro 159beon-gil, Paju-si, Gyeonggi-do, Korea</>}
          />
        </p>
        <p>
          <T
            ko="개인정보 침해에 관한 신고나 상담은 개인정보침해신고센터(privacy.kisa.go.kr, 국번 없이 118)나 개인정보분쟁조정위원회(kopico.go.kr, 1833-6972)에 하실 수 있습니다."
            en="For complaints or advice about privacy violations, you may also contact the Korea Internet & Security Agency’s Privacy Center (privacy.kisa.go.kr, 118) or the Personal Information Dispute Mediation Committee (kopico.go.kr, 1833-6972)."
          />
        </p>
      </Sec>

      <Sec ko="11. 방침의 변경" en="11. Changes">
        <p>
          <T ko="방침을 바꿀 때는 이 페이지에 새 시행일과 함께 게시합니다." en="If this policy changes, we will post the new version here with a new effective date." />
        </p>
      </Sec>
    </LegalPage>
  );
}
