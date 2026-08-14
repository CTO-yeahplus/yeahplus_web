'use client';

// mailto: 는 기본 메일 앱이 없는 브라우저에서 아무 반응 없이 무시되므로 주소 복사 버튼을 함께 둔다.
import { useState } from 'react';
import { Mail } from 'lucide-react';
import { EMAIL, useLang } from './i18n';

export default function MailButton({ subject, label }: { subject: string; label: string }) {
  const { lang } = useLang();
  const ko = lang === 'ko';
  const [copied, setCopied] = useState(false);
  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}`;

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
    <div className="pf-mailrow">
      <a className="pf-cta pf-cta-small" href={href} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <Mail size={16} strokeWidth={2} aria-hidden /> {label}
      </a>
      <button type="button" className="pf-copybtn" onClick={copy}>
        {copied ? (ko ? '복사됨' : 'Copied') : ko ? '주소 복사' : 'Copy address'}
      </button>
      <span className="pf-mailhint">
        {ko ? '메일 앱이 열리지 않으면 ' : 'If no mail app opens, write to '}
        <a href={href}>{EMAIL}</a>
        {ko ? ' 로 보내주세요.' : '.'}
      </span>
    </div>
  );
}
