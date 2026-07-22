/**
 * 애플 스타일(라인 기반, 둥근 캡) 인라인 SVG 아이콘.
 * 외부 의존성 없이 동작하도록 직접 정의합니다. color/size 는 currentColor·size prop 로 제어.
 */
import * as React from 'react';

type IconProps = {
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
};

function stroke(size: number, sw: number) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: sw,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
}
function filled(size: number) {
  return { width: size, height: size, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': true };
}

export function PawPrint({ size = 24, className, style }: IconProps) {
  return (
    <svg {...filled(size)} className={className} style={style}>
      <ellipse cx="5.6" cy="12" rx="1.7" ry="2.2" />
      <ellipse cx="9.6" cy="8.6" rx="1.8" ry="2.4" />
      <ellipse cx="14.4" cy="8.6" rx="1.8" ry="2.4" />
      <ellipse cx="18.4" cy="12" rx="1.7" ry="2.2" />
      <path d="M12 12.4c-2.6 0-4.7 1.9-4.7 4.2 0 1.6 1.3 2.6 3 2.6.9 0 1.3-.35 1.7-.35s.8.35 1.7.35c1.7 0 3-1 3-2.6 0-2.3-2.1-4.2-4.7-4.2z" />
    </svg>
  );
}

export function Apple({ size = 24, className, style }: IconProps) {
  return (
    <svg {...filled(size)} className={className} style={style}>
      <path d="M16.4 12.7c0-2 1.6-3 1.7-3-.9-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.4 2 2.5 2 1 0 1.3-.6 2.5-.6 1.2 0 1.5.6 2.5.6s1.7-.9 2.4-1.9c.5-.7.8-1.4 1-2.2-1.9-.7-2.3-3.4-1.3-3.3z" />
      <path d="M14.3 6.3c.6-.7.9-1.7.8-2.6-.8.05-1.8.55-2.4 1.25-.5.6-1 1.6-.8 2.5.9.05 1.8-.45 2.4-1.15z" />
    </svg>
  );
}

export function Palette({ size = 24, strokeWidth = 1.8, className, style }: IconProps) {
  return (
    <svg {...stroke(size, strokeWidth)} className={className} style={style}>
      <path d="M12 3a9 9 0 000 18 2.3 2.3 0 002.3-2.3c0-.6-.25-1.05-.6-1.45-.3-.35-.5-.8-.5-1.3a1.6 1.6 0 011.6-1.6H16a5 5 0 005-5C21 5.6 17 3 12 3z" />
      <circle cx="7.6" cy="11" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="10" cy="7.4" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="14.2" cy="7.4" r="1.05" fill="currentColor" stroke="none" />
      <circle cx="16.8" cy="11" r="1.05" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Sparkles({ size = 24, className, style }: IconProps) {
  return (
    <svg {...filled(size)} className={className} style={style}>
      <path d="M12 3.5l1.7 4.8L18.5 10l-4.8 1.7L12 16.5l-1.7-4.8L5.5 10l4.8-1.7z" />
      <path d="M18.5 14.5l.75 2 2 .75-2 .75-.75 2-.75-2-2-.75 2-.75z" />
    </svg>
  );
}

export function Globe2({ size = 24, strokeWidth = 1.8, className, style }: IconProps) {
  return (
    <svg {...stroke(size, strokeWidth)} className={className} style={style}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 2.4 3.9 5.6 3.9 9s-1.4 6.6-3.9 9c-2.5-2.4-3.9-5.6-3.9-9S9.5 5.4 12 3z" />
    </svg>
  );
}

export function Heart({ size = 24, className, style }: IconProps) {
  return (
    <svg {...filled(size)} className={className} style={style}>
      <path d="M12 20.3l-1.1-1C6.4 15.4 3.5 12.8 3.5 9.6 3.5 7.1 5.5 5.2 8 5.2c1.4 0 2.8.7 3.6 1.7l.4.5.4-.5C13.2 5.9 14.6 5.2 16 5.2c2.5 0 4.5 1.9 4.5 4.4 0 3.2-2.9 5.8-7.4 9.7l-1.1 1z" />
    </svg>
  );
}

export function Mail({ size = 24, strokeWidth = 1.8, className, style }: IconProps) {
  return (
    <svg {...stroke(size, strokeWidth)} className={className} style={style}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7.5l7.3 5a1.2 1.2 0 001.4 0l7.3-5" />
    </svg>
  );
}

export function Clock({ size = 24, strokeWidth = 1.8, className, style }: IconProps) {
  return (
    <svg {...stroke(size, strokeWidth)} className={className} style={style}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function MessageCircle({ size = 24, strokeWidth = 1.8, className, style }: IconProps) {
  return (
    <svg {...stroke(size, strokeWidth)} className={className} style={style}>
      <path d="M21 11.5a7.5 7.5 0 01-10.9 6.7L4 20l1.8-6.1A7.5 7.5 0 1121 11.5z" />
    </svg>
  );
}

export function HelpCircle({ size = 24, strokeWidth = 1.8, className, style }: IconProps) {
  return (
    <svg {...stroke(size, strokeWidth)} className={className} style={style}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.3a2.4 2.4 0 014.6.9c0 1.6-2.2 2-2.2 3.4" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CreditCard({ size = 24, strokeWidth = 1.8, className, style }: IconProps) {
  return (
    <svg {...stroke(size, strokeWidth)} className={className} style={style}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 9.5h18" />
      <path d="M6.5 14.5h3" />
    </svg>
  );
}
