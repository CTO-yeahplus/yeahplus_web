'use client';

// mailto: 는 기본 메일 앱이 등록돼 있지 않은 브라우저에서 아무 반응 없이 무시된다.
// 그래서 메일 앱을 열어보되, 열리지 않는 환경을 위해 주소 복사 버튼을 함께 둔다.
import { useState } from 'react';
import { EMAIL, useLang } from './i18n';

export default function MailButton({ subject, label }: { subject: string; label: string }) {
  const { lang } = useLang();
  const ko = lang === 'ko';
  const [copied, setCopied] = useState(false);
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

  async function copy() {
    const text = `${EMAIL}`;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 클립보드 API 가 막힌 환경(비 HTTPS 등) 폴백
      const ta = document.createElement('textarea');
      ta.value = text;
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
    <div className="wf-mailrow">
      <a className="wf-mailbtn" href={href}>
        {label}
      </a>
      <button type="button" className="wf-copybtn" onClick={copy}>
        {copied ? (ko ? '복사됨' : 'Copied') : ko ? '주소 복사' : 'Copy address'}
      </button>
      <span className="wf-mailhint">
        {ko ? '메일 앱이 열리지 않으면 ' : 'If no mail app opens, write to '}
        <a href={href}>{EMAIL}</a>
        {ko ? ' 로 보내주세요.' : '.'}
      </span>
    </div>
  );
}
