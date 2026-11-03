'use client';

/* 6. 주차 수첩 — 세운 자리가 P-01 부터 칸으로 쌓인다. 위치 정보는 쓰지 않는다: 자리는 내가 붙인 이름이다.
   여기서도 이름을 적어 칸을 찍어 볼 수 있다(이 브라우저에만, 어디로도 보내지 않는다). 무료 10곳, 11번째부터 평생 주차권. */
import { useEffect, useState } from 'react';

type Spot = { name: string; score: number; when: string };
const SEED: Spot[] = [
  { name: '정류장 벤치', score: 96, when: '07:42' },
  { name: '사무실 책상', score: 91, when: '18:54' },
  { name: '공원 평상', score: 88, when: '12:10' },
];
const SEED_EN: Spot[] = [
  { name: 'Bus-stop bench', score: 96, when: '07:42' },
  { name: 'Office desk', score: 91, when: '18:54' },
  { name: 'Park table', score: 88, when: '12:10' },
];
const KEY = 'rocketparking.site.log';

export default function Logbook() {
  const [mine, setMine] = useState<Spot[]>([]);
  const [name, setName] = useState('');
  const [fresh, setFresh] = useState(-1);

  useEffect(() => {
    try {
      const s = localStorage.getItem(KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (s) setMine(JSON.parse(s).slice(0, 20));
    } catch {}
  }, []);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim().slice(0, 18);
    if (!n) return;
    const d = new Date();
    const spot = { name: n, score: 80 + Math.floor(Math.random() * 18), when: `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}` };
    const next = [...mine, spot].slice(0, 20);
    setMine(next);
    setFresh(SEED.length + next.length - 1);
    setName('');
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  };
  const clear = () => {
    setMine([]);
    try {
      localStorage.removeItem(KEY);
    } catch {}
  };

  const cells = (seed: Spot[]) => {
    const all = [...seed, ...mine];
    const n = Math.max(12, all.length + 1);
    return Array.from({ length: n }, (_, i) => {
      const s = all[i];
      const locked = i >= 10;
      return (
        <li key={i} className="rp-spot" data-fill={s ? '1' : '0'} data-lock={locked ? '1' : '0'} data-fresh={i === fresh ? '1' : '0'}>
          <span className="rp-spot-no rp-mono">P-{String(i + 1).padStart(2, '0')}</span>
          {s ? (
            <>
              <b>{s.name}</b>
              <span className="rp-spot-meta rp-mono">
                S {s.score} · {s.when}
              </span>
              <span className="rp-spot-stamp">PARKED</span>
            </>
          ) : locked ? (
            <span className="rp-spot-meta rp-mono">🔒</span>
          ) : (
            <span className="rp-spot-meta rp-mono">—</span>
          )}
        </li>
      );
    });
  };

  return (
    <section className="rp-sec rp-logbook">
      <div className="rp-wrap">
        <div className="rp-eyebrow">PARKING LOG</div>
        <h2 className="rp-h2">
          <span data-l="ko">세운 자리가 수첩에 남는다</span>
          <span data-l="en">Every spot you land on goes in the log</span>
        </h2>
        <p className="rp-lead">
          <span data-l="ko">위치 정보는 쓰지 않는다. 자리는 내가 붙인 이름이다. 무료 수첩은 10곳 — 차도 지워지지 않고, 11번째부터는 평생 주차권으로 열린다.</span>
          <span data-l="en">No location data. A spot is whatever you call it. The free log holds 10 — nothing is erased when it fills; the Lifetime Parking Pass opens the rest.</span>
        </p>
        <form className="rp-spot-form" onSubmit={add}>
          <label className="rp-mono" htmlFor="rp-spot-name">
            <span data-l="ko">오늘 세울 자리</span>
            <span data-l="en">Where you’d land today</span>
          </label>
          <input id="rp-spot-name" value={name} onChange={(e) => setName(e.target.value)} maxLength={18} placeholder="예: 3층 탕비실 / Kitchen counter" autoComplete="off" />
          <button type="submit" className="rp-btn rp-btn-go">
            <span data-l="ko">수첩에 찍기</span>
            <span data-l="en">Stamp it</span>
          </button>
          {mine.length > 0 && (
            <button type="button" className="rp-btn" onClick={clear}>
              <span data-l="ko">지우기</span>
              <span data-l="en">Clear</span>
            </button>
          )}
        </form>
        <p className="rp-spot-privacy rp-mono">
          <span data-l="ko">이 칸은 이 브라우저에만 남는다. 어디로도 보내지 않는다.</span>
          <span data-l="en">These stay in this browser only. Nothing is sent anywhere.</span>
        </p>
        <ol className="rp-spots" data-l="ko">
          {cells(SEED)}
        </ol>
        <ol className="rp-spots" data-l="en">
          {cells(SEED_EN)}
        </ol>
      </div>
    </section>
  );
}
