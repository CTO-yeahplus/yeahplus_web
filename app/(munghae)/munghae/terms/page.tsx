import type { Metadata } from 'next';
import { EMAIL } from '../site';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: '이용약관 · Terms — 간직 Keepsake',
  description: '간직 이용약관. Apple 표준 사용권 계약(EULA)을 따르며, 앱 안 구입은 한 번 구매로 평생 이용하는 비소모성 상품입니다.',
  alternates: { canonical: '/munghae/terms' },
};

/* 별도 약관 대신 Apple 표준 EULA 를 쓴다 (METADATA_EN 설명 끝에도 같은 링크).
   2026-10-22 멍해 본편(계정·구독이 있던 앱)의 약관을 대체했다. */
const EULA = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

export default function KeepsakeTerms() {
  return (
    <div className="kp-wrap kp-doc">
      <div className="kp-doc-head">
        <h1>이용약관<br />Terms of Use</h1>
        <div className="kp-sub">간직 · Keepsake</div>
        <div className="kp-rev">시행일 2026년 10월 22일 · Effective 22 October 2026</div>
      </div>

      <section>
        <h2>1. 사용권 계약</h2>
        <p>간직의 이용에는 Apple 표준 사용권 계약(EULA)이 적용됩니다: <a href={EULA}>{EULA}</a></p>
        <div className="kp-en-block">
          <h3>1. License agreement</h3>
          <p>Use of Keepsake is governed by Apple&rsquo;s standard Licensed Application End User License Agreement: <a href={EULA}>{EULA}</a></p>
        </div>
      </section>

      <section>
        <h2>2. 앱 안 구입</h2>
        <p>
          간직 프로와 아트 팩은 한 번 구매하면 같은 Apple 계정에서 평생 쓰는 비소모성 상품입니다. 구독이 없으며, 환불은 Apple 의 절차를
          따릅니다. 기록 기능(사진·편지·방명록·기념일·촛불·백업)은 구입과 관계없이 무료입니다.
        </p>
        <div className="kp-en-block">
          <h3>2. In-app purchases</h3>
          <p>
            Keepsake Pro and art packs are one-time, non-consumable purchases for your Apple account. There are no
            subscriptions; refunds follow Apple&rsquo;s process. Record-keeping features (photos, letters, guestbook,
            anniversaries, candles, backup) are free regardless of purchases.
          </p>
        </div>
      </section>

      <section>
        <h2>3. 이용자의 기록</h2>
        <p>앱에 남긴 사진과 글은 이용자의 것이며 이용자의 기기 안에만 있습니다. 개발자는 이를 받거나 이용하지 않습니다.</p>
        <div className="kp-en-block">
          <h3>3. Your records</h3>
          <p>The photos and words you keep in the app are yours and stay on your device. The developer neither receives nor uses them.</p>
        </div>
      </section>

      <section>
        <h2>4. 문의 · Contact</h2>
        <div className="kp-contact">
          <a className="kp-mail" href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </section>
    </div>
  );
}
