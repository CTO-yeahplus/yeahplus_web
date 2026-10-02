/**
 * 예아플러스 로고 — app/icon.png 의 네 기둥을 측정해 다각형으로 옮겼다.
 * active 를 주면 그 기둥만 짙게, 나머지는 옅게 칠한다(강점 네 가지의 목차로 쓴다).
 */
const BARS = [
  '0,0 21.9,0 21.9,67 0,45',
  '26,0 47.9,0 47.9,114.4 26,92.5',
  '52.1,0 74,0 74,92.5 52.1,114.4',
  '78.1,0 100,0 100,45 78.1,67',
];

export function Logo({
  size = 22,
  active,
  className,
}: {
  size?: number;
  active?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size * 1.144}
      viewBox="0 0 100 114.4"
      aria-hidden="true"
      focusable="false"
    >
      {BARS.map((pts, k) => (
        <polygon
          key={k}
          points={pts}
          className={active === undefined ? 'yp-bar' : k === active ? 'yp-bar yp-bar-on' : 'yp-bar yp-bar-off'}
        />
      ))}
    </svg>
  );
}
