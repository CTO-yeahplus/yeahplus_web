'use client';

import Link from 'next/link';
import { EMAIL, UPDATED, useLang } from '../i18n';

const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export default function TermsContent() {
  const { lang } = useLang();
  const ko = lang === 'ko';

  return (
    <div className="mf-wrap">
      <article className="mf-doc">
        <header className="mf-doc-head">
          <h1>◆ Mineforge · 마인포지</h1>
          <div className="mf-sub">
            {ko ? '이용약관' : 'Terms of Use'} — {ko ? '최종 수정일' : 'Last updated'}: {UPDATED}
          </div>
        </header>

        {ko ? (
          <>
            <div className="mf-card">
              <p>
                본 앱의 이용에는 Apple의 표준 최종 사용자 사용권 계약(Standard EULA)이 적용됩니다:{' '}
                <a href={EULA} target="_blank" rel="noreferrer">
                  apple.com/legal/…/stdeula
                </a>
              </p>
            </div>
            <p>1. Mineforge(마인포지)는 YeahPlus Co., Ltd.가 개발·배포하는 1회 구매형 오프라인 싱글플레이 게임입니다.</p>
            <p>
              2. 본 앱은 광고와 인앱결제를 포함하지 않으며, 어떠한 개인정보도 수집하지 않습니다 (
              <Link href="/mineforge/privacy">개인정보 처리방침</Link> 참조).
            </p>
            <p>3. 게임 내 “골드”는 게임 안에서만 쓰이는 퍼즐 자원으로 현금 가치가 없으며 구매·환전할 수 없습니다.</p>
            <p>4. 앱과 그 콘텐츠(코드, 그래픽, 음악, 텍스트)의 저작권은 YeahPlus Co., Ltd.에 있습니다.</p>
            <p>
              5. 환불은 Apple App Store 정책을 따릅니다:{' '}
              <a href="https://reportaproblem.apple.com" target="_blank" rel="noreferrer">
                reportaproblem.apple.com
              </a>
            </p>
            <p>
              6. 문의: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </>
        ) : (
          <>
            <div className="mf-card">
              <p>
                Use of this app is governed by Apple&apos;s Standard End User License Agreement (EULA):{' '}
                <a href={EULA} target="_blank" rel="noreferrer">
                  apple.com/legal/…/stdeula
                </a>
              </p>
            </div>
            <p>1. Mineforge is a pay-once, offline, single-player game developed and published by YeahPlus Co., Ltd.</p>
            <p>
              2. The app contains no advertising and no in-app purchases, and collects no personal data (see the{' '}
              <Link href="/mineforge/privacy">Privacy Policy</Link>).
            </p>
            <p>3. In-game “gold” is a puzzle resource with no real-world value; it cannot be purchased or redeemed.</p>
            <p>4. The app and its contents (code, graphics, music, text) are © YeahPlus Co., Ltd.</p>
            <p>
              5. Refunds follow Apple App Store policy:{' '}
              <a href="https://reportaproblem.apple.com" target="_blank" rel="noreferrer">
                reportaproblem.apple.com
              </a>
            </p>
            <p>
              6. Contact: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            </p>
          </>
        )}
      </article>
    </div>
  );
}
