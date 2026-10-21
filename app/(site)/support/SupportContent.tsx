'use client';

/* 예아플러스 회사 지원 — https://yeahplus.co.kr/support
   제품별 지원 페이지로 잇는 것이 주된 일이다. 목록은 components/site/products.ts 에서 만든다(제품이 늘면 저절로 늘어난다). */

import Link from 'next/link';
import { useState } from 'react';
import LegalPage, { MAIL, Sec, T } from '@/components/site/Legal';
import { CATS, PRODUCTS } from '@/components/site/products';
import { useLang } from '@/components/site/lang';

function CopyMail() {
  const { L } = useLang();
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(MAIL);
      setDone(true);
      setTimeout(() => setDone(false), 1800);
    } catch {
      const el = document.getElementById('yp-support-mail');
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(r);
      }
    }
  };
  return (
    <div className="yp-legal-mail">
      <a id="yp-support-mail" href={`mailto:${MAIL}`}>{MAIL}</a>
      <button type="button" className="yp-btn" onClick={copy}>{done ? L('복사했습니다', 'Copied') : L('주소 복사', 'Copy address')}</button>
    </div>
  );
}

function ProductSupport() {
  const { L } = useLang();
  return (
    <div className="yp-legal-cats">
      {CATS.map((c) => (
        <div key={c.id}>
          <h3>{L(c.ko, c.en)}</h3>
          <ul className="yp-legal-links">
            {PRODUCTS.filter((p) => p.cat === c.id).map((p) => {
              const inner = p.href.startsWith('/');
              return (
                <li key={p.id}>
                  {inner ? (
                    <Link href={`${p.href}/support`}>{L(p.ko, p.en)}</Link>
                  ) : (
                    <a href={p.href} target="_blank" rel="noopener noreferrer">{L(p.ko, p.en)}</a>
                  )}
                  {p.status === 'soon' && <span> {L('· 준비 중', '· coming soon')}</span>}
                  {!inner && <span> {L('· 자체 사이트', '· own site')}</span>}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default function SupportContent() {
  return (
    <LegalPage
      title={{ ko: '지원', en: 'Support' }}
      sub={{ ko: '앱 사용 문의 · 오류 제보 · 제휴 문의', en: 'App help · error reports · partnerships' }}
    >
      <Sec ko="문의하기" en="Contact us">
        <p>
          <T
            ko="앱 사용, 결제, 오류, 콘텐츠의 사실 오류, 제휴 · 협업 · 취재 문의는 모두 아래 메일로 받습니다."
            en="For questions about using an app, purchases, bugs, factual errors in our content, or partnerships, collaborations and press, please email us:"
          />
        </p>
        <CopyMail />
        <p>
          <T
            ko="앱에 관한 문의라면 앱 이름, 기기와 OS 버전, 가능하면 화면 캡처를 함께 보내 주세요. 빨리 확인할 수 있습니다."
            en="If it’s about an app, please include the app name, your device and OS version, and a screenshot if possible. It helps us check quickly."
          />
        </p>
      </Sec>

      <Sec ko="제품별 지원" en="Support by product">
        <p>
          <T
            ko="자주 묻는 질문과 제품별 안내는 각 제품의 지원 페이지에 있습니다."
            en="Each product’s support page has its FAQ and product-specific help."
          />
        </p>
        <ProductSupport />
      </Sec>

      <Sec ko="결제와 환불" en="Purchases and refunds">
        <p>
          <T
            ko={<>App Store 에서 결제한 항목의 환불은 Apple 이 처리합니다. <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a> 에서 요청하실 수 있습니다. 구입한 항목이 앱에 나타나지 않으면 앱의 ‘구입 복원’을 먼저 눌러 보시고, 그래도 안 되면 메일로 알려 주세요.</>}
            en={<>Refunds for App Store purchases are handled by Apple. You can request one at <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a>. If a purchase doesn’t appear in an app, try the app’s “Restore Purchases” first, and email us if that doesn’t help.</>}
          />
        </p>
      </Sec>

      <Sec ko="콘텐츠 오류 제보" en="Reporting content errors">
        <p>
          <T
            ko="예아플러스는 역사 · 고전 · 연구 내용을 원문까지 확인해 만듭니다. 그래도 틀린 곳이 보이면 어느 앱(또는 게시물)의 어느 부분인지와 근거 자료를 함께 보내 주세요. 확인한 뒤 고치고 회신하겠습니다."
            en="We build our history, classics and research content from original sources. If you still spot an error, tell us which app (or post) and where, along with your source. We will check, correct it and reply."
          />
        </p>
      </Sec>

      <Sec ko="회사 정보" en="Company">
        <p>
          <T
            ko={<>주식회사 예아플러스 · 대표 고재혁 · 사업자등록번호 283-88-02519 · 통신판매업신고 2022-경기파주-2995<br />경기도 파주시 교하로159번길 33, 3층 304호 에이318</>}
            en={<>YeahPlus Inc. · CEO Jaehyuk Ko · Business Reg. No. 283-88-02519 · Mail-order Reg. 2022-Gyeonggi Paju-2995<br />3F 304-A318, 33 Gyoha-ro 159beon-gil, Paju-si, Gyeonggi-do, Korea</>}
          />
        </p>
      </Sec>
    </LegalPage>
  );
}
