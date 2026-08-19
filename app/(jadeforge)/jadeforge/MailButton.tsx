'use client';

// mailto: 는 기본 메일 앱이 없는 브라우저에서 조용히 무시되므로 주소 복사 버튼을 함께 둔다.
import { useState } from 'react';
import { EMAIL, useLang } from './i18n';

export default function MailButton() {
  const { lang } = useLang();
  const ko = lang === 'ko';
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="jf-mailrow">
      <span>
        문의 · Contact: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </span>
      <button type="button" className="jf-copybtn" onClick={copy}>
        {copied ? (ko ? '복사됨' : 'Copied') : ko ? '주소 복사' : 'Copy address'}
      </button>
    </div>
  );
}
