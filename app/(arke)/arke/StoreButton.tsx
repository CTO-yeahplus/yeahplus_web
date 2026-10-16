'use client';

import { useSyncExternalStore } from 'react';

// App Store 캠페인 링크. ct 는 "어디서 왔나_누가 눌렀나" — 예: ig_student · yt_parent · web_student.
// 어디서 왔는지는 프로필 링크의 ?from= 으로 받는다(yeahplus.co.kr/arke?from=ig).
// 주소에 /kr/ 를 꼭 넣는다 — ARKE 는 한국 스토어에만 있어서, 나라가 빠진 /app/… 주소는
// 기기·브라우저 지역이 한국이 아니면 "페이지를 찾을 수 없음"(404)이 된다(2026-10-16 확인).
const BASE = 'https://apps.apple.com/kr/app/arke/id6800566496?pt=121180501&mt=8';
const SOURCES = new Set(['ig', 'yt', 'tt', 'fb', 'th', 'blog', 'kakao']);

export function storeUrl(from: string, role: 'student' | 'parent'): string {
  return `${BASE}&ct=${from}_${role}`;
}

// 주소창의 ?from= 과 오늘 날짜는 바뀌지 않으므로 구독할 것이 없다.
const noop = () => () => {};

function useFrom(): string {
  return useSyncExternalStore(
    noop,
    () => {
      const from = new URLSearchParams(window.location.search).get('from') ?? '';
      return SOURCES.has(from) ? from : 'web';
    },
    () => 'web', // 정적 HTML 에는 web_* 로 그리고, 브라우저에서 ?from= 으로 바꾼다
  );
}

export default function StoreButton({
  role,
  className,
  children,
}: {
  role: 'student' | 'parent';
  className: string;
  children: React.ReactNode;
}) {
  const href = storeUrl(useFrom(), role);
  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

/** "고3 개학까지 D-n" — 3월 2일(KST 0시)까지 남은 날. 지나면 아무것도 그리지 않는다. */
export function Dday() {
  const n = useSyncExternalStore(
    noop,
    () => {
      const days = Math.ceil((Date.UTC(2027, 2, 1, 15) - Date.now()) / 86_400_000); // 2027-03-02 00:00 KST
      return days > 0 ? days : null;
    },
    () => null,
  );
  if (n === null) return <span className="ark-dday" aria-hidden />;
  return (
    <span className="ark-dday">
      고3 개학까지 <b>D-{n}</b>
    </span>
  );
}
