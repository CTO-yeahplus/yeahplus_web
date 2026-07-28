import * as React from 'react';

type P = { size?: number; className?: string };
const base = (s: number) => ({
  width: s, height: s, viewBox: '0 0 24 24', fill: 'none',
  stroke: 'currentColor', strokeWidth: 1.7,
  strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true,
});

export function Paw({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <ellipse cx="6" cy="12" rx="1.7" ry="2.2" />
      <ellipse cx="9.8" cy="8.7" rx="1.8" ry="2.4" />
      <ellipse cx="14.2" cy="8.7" rx="1.8" ry="2.4" />
      <ellipse cx="18" cy="12" rx="1.7" ry="2.2" />
      <path d="M12 12.6c-2.6 0-4.6 1.9-4.6 4.1 0 1.6 1.3 2.5 2.9 2.5.9 0 1.3-.34 1.7-.34s.8.34 1.7.34c1.6 0 2.9-.9 2.9-2.5 0-2.2-2-4.1-4.5-4.1z" />
    </svg>
  );
}

export function Star({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 3.2l2.5 5.7 6.1.5-4.7 4 1.5 6-5.4-3.4-5.4 3.4 1.5-6-4.7-4 6.1-.5z" />
    </svg>
  );
}

export function Flame({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M12 3.5c.6 2.5-1.9 3.4-1.9 6 0 1 .7 1.8 1.9 1.8s1.9-.9 1.9-2c0-.5-.1-.9-.3-1.3 1.9 1 3.2 3 3.2 5.4A5 5 0 017 13.6c0-.9.2-1.7.6-2.4" />
      <path d="M12 21a4 4 0 004-4c0-2-1.6-3.2-2.4-4.2" />
    </svg>
  );
}

export function Images({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="5" width="14" height="12" rx="2.4" />
      <path d="M6.5 12.5l2.3-2.2 2 1.9 2.6-3 2.6 3.2" />
      <circle cx="8" cy="8.6" r="1" fill="currentColor" stroke="none" />
      <path d="M8 20h10a3 3 0 003-3V9" />
    </svg>
  );
}

export function Bell({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 9a6 6 0 0112 0c0 4 1.4 5.3 2 6H4c.6-.7 2-2 2-6z" />
      <path d="M10 20a2 2 0 004 0" />
    </svg>
  );
}

export function HeartMsg({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M4 5h16a1.5 1.5 0 011.5 1.5v9A1.5 1.5 0 0120 17H9l-4 3v-3H4a1.5 1.5 0 01-1.5-1.5v-9A1.5 1.5 0 014 5z" />
      <path d="M12 8.4c.9-1 2.6-.7 3 .6.3 1-.5 1.9-1.6 2.8L12 13.2l-1.4-1.3c-1-.9-1.9-1.8-1.6-2.8.4-1.3 2.1-1.6 3-.6z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Users({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="8.5" cy="9" r="2.6" />
      <path d="M3.5 18.5a5 5 0 019.8 0" />
      <path d="M15.5 7.2a2.6 2.6 0 010 5.1" />
      <path d="M16 14.2a5 5 0 014 4.3" />
    </svg>
  );
}

export function Calendar({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="4" y="5.5" width="16" height="14" rx="2.4" />
      <path d="M4 9.5h16M8 3.5v4M16 3.5v4" />
      <circle cx="12" cy="14" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footprints({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M6 7.5c0-1.4.8-2.5 1.9-2.5S9.8 6 9.6 7.5c-.1 1-.2 1.7-.2 2.4 0 .9-.6 1.4-1.5 1.4s-1.5-.5-1.5-1.4c0-.8-.9-1-.9-2.4z" fill="currentColor" stroke="none" />
      <path d="M6.3 13.6c1.6 0 2.7.7 2.7 2.1 0 1.6-1 2.8-2.6 2.8S4 17.6 4 16.2c0-1.5.9-2.6 2.3-2.6z" fill="currentColor" stroke="none" />
      <path d="M17.8 10.5c0-1.4-.8-2.5-1.9-2.5s-1.9 1-1.7 2.5c.1 1 .2 1.7.2 2.4 0 .9.6 1.4 1.5 1.4s1.5-.5 1.5-1.4c0-.8.9-1 .9-2.4z" fill="currentColor" stroke="none" />
      <path d="M17.7 16.6c1.4 0 2.3 1.1 2.3 2.6 0 1.4-1.1 2.3-2.4 2.3s-2.4-1.2-2.4-2.8c0-1.4 1.1-2.1 2.5-2.1z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Bowl({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3.5 11h17a8.5 8.5 0 01-17 0z" />
      <path d="M12 11c0-2.2-1.4-3-1.4-4.4A2 2 0 0112 4.6" />
      <path d="M7.5 19.4h9" />
    </svg>
  );
}

export function Book({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M5 4.5h9a2.5 2.5 0 012.5 2.5v12H7.5A2.5 2.5 0 015 16.5z" />
      <path d="M16.5 19v-14a2.5 2.5 0 012.5 2.5v11.5a2.5 2.5 0 00-2.5-2.5" />
      <path d="M8 8.5h5M8 11.5h5" />
    </svg>
  );
}

export function Activity({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M3.5 12.5h3.5l2-5 3 10 2-7 1.5 2h4.5" />
    </svg>
  );
}

export function Sun({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2.2M12 18.8V21M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M3 12h2.2M18.8 12H21M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </svg>
  );
}

export function Mail({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7.5l7.3 5a1.2 1.2 0 001.4 0l7.3-5" />
    </svg>
  );
}

export function Clock({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function MessageCircle({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <path d="M21 11.5a7.5 7.5 0 01-10.9 6.7L4 20l1.8-6.1A7.5 7.5 0 1121 11.5z" />
    </svg>
  );
}

export function HelpCircle({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 9.3a2.4 2.4 0 014.6.9c0 1.6-2.2 2-2.2 3.4" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function CreditCard({ size = 24, className }: P) {
  return (
    <svg {...base(size)} className={className}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3 9.5h18M6.5 14.5h3" />
    </svg>
  );
}

export function Apple({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M16.4 12.7c0-2 1.6-3 1.7-3-.9-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.6.8-3.3 2-1.4 2.4-.4 6 1 8 .7 1 1.4 2 2.5 2 1 0 1.3-.6 2.5-.6 1.2 0 1.5.6 2.5.6s1.7-.9 2.4-1.9c.5-.7.8-1.4 1-2.2-1.9-.7-2.3-3.4-1.3-3.3z" />
      <path d="M14.3 6.3c.6-.7.9-1.7.8-2.6-.8.05-1.8.55-2.4 1.25-.5.6-1 1.6-.8 2.5.9.05 1.8-.45 2.4-1.15z" />
    </svg>
  );
}
