'use client';

/* 1. 꾹 눌러 찍기 — 앱의 정상 확인 몸짓을 그대로 흉내 낸 시연. 이 페이지는 위치를 읽지 않는다(가짜 정확도가 160 → 85 → 48 → 12m 로 들어온다).
   누르는 동안 고리가 차고(= 위치 정확도), 40m 안이면 금빛 → 놓으면:
   정상 반경 안 = 새 돌이 얹히고 도장 쾅(잉크 번짐 · 쪽 흔들림) / 150m 밖 = 도장 대신 연필로 '여기까지 왔다' / 일찍 놓으면 흐린 자국.
   소리는 기본 끔(켜면 기기 안에서 합성). */
import { useEffect, useMemo, useRef, useState } from 'react';
import { byName, REGION_EN, type Summit } from './summits';
import { cairnSide, dotDate, makeStamp, no3, ordinal, seasonOf, sound, sunset, tilt } from './engine';
import { buzz, reduced } from './stage';

type Phase = 'idle' | 'hold' | 'ready' | 'stamped' | 'pencil' | 'blur';
const PICKS = ['북한산', '설악산', '지리산', '한라산'];
const PICK_EN: Record<string, string> = { 북한산: 'Bukhansan', 설악산: 'Seoraksan', 지리산: 'Jirisan', 한라산: 'Hallasan' };
const STEPS = [160, 85, 48, 12];
const FAR = 320;

function sunsetText(now: Date) {
  const s = sunset(37.0, 127.5, now);
  if (!s) return ['', ''];
  const min = Math.round((s.getTime() - now.getTime()) / 60000), a = Math.abs(min), h = Math.floor(a / 60), m = a % 60;
  const ko = h ? `${h}시간${m ? ' ' + m + '분' : ''}` : `${m}분`, en = h ? `${h} h${m ? ' ' + m + ' min' : ''}` : `${m} min`;
  return min >= 0 ? [`해 지기까지 ${ko}`, `${en} until sunset`] : [`해가 진 지 ${ko}`, `Sun set ${en} ago`];
}

export default function HoldStamp() {
  const [name, setName] = useState('북한산');
  const [inside, setInside] = useState(true);
  const [phase, setPhase] = useState<Phase>('idle');
  const [acc, setAcc] = useState<number | null>(null);
  const [climbs, setClimbs] = useState<Record<string, number>>({});
  const [snd, setSnd] = useState(false);
  const [tick, setTick] = useState(0);
  const timers = useRef<number[]>([]);
  const held = useRef(false);
  const stampBox = useRef<HTMLDivElement | null>(null);
  const inkRef = useRef<HTMLCanvasElement | null>(null);
  const summit: Summit = byName(name);
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(new Date());
  }, []);
  const season = seasonOf(now || new Date(2026, 10, 4));
  const n = climbs[name] || 0;
  const settled = acc != null && acc <= 40;

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clear, []);

  const reset = (keepName?: string) => {
    clear();
    held.current = false;
    setPhase('idle');
    setAcc(null);
    if (keepName) setName(keepName);
  };

  const start = () => {
    if (held.current) return;
    if (phase === 'stamped' || phase === 'pencil') reset();
    held.current = true;
    setPhase('hold');
    const fast = reduced() ? 0.5 : 1;
    STEPS.forEach((a, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setAcc(a);
          if (a <= 40) {
            setPhase((ph) => (ph === 'hold' ? 'ready' : ph));
            buzz(12);
            if (snd) sound('tick');
          }
        }, i * 300 * fast + 60),
      );
    });
  };

  const release = () => {
    if (!held.current) return;
    held.current = false;
    clear();
    if (!settled) {
      setPhase('blur');
      return;
    }
    if (inside) {
      setPhase('stamped');
      setClimbs((c) => ({ ...c, [name]: (c[name] || 0) + 1 }));
      setTick((t) => t + 1);
      buzz([10, 50, 24]);
      if (snd) {
        sound('tick');
        window.setTimeout(() => sound('thunk'), 160);
      }
    } else {
      setPhase('pencil');
      if (snd) sound('pencil');
    }
  };

  // 찍힌 도장(자국 = 로고 · 아래 호 = 오늘 날짜 · 그 철 잉크)
  useEffect(() => {
    const box = stampBox.current;
    if (!box) return;
    box.innerHTML = '';
    const stamped = phase === 'stamped';
    const ghost = phase === 'blur';
    const c = makeStamp(150, {
      summit,
      ink: season.ink,
      empty: !stamped && !ghost,
      seasons: stamped || ghost ? new Set([season.id]) : null,
      date: now ? dotDate(now) : undefined,
      inkSeed: String(n),
    });
    c.className = stamped ? 'sb-stamp-cv sb-stamp-hit' : ghost ? 'sb-stamp-cv sb-stamp-ghost' : 'sb-stamp-cv sb-stamp-empty';
    if (stamped || ghost) c.style.setProperty('--rot', `${((tilt(summit.id, String(n)) * 180) / Math.PI).toFixed(2)}deg`);
    box.appendChild(c);
    // 잉크 번짐: 쾅 하는 순간 잠깐 퍼지는 자국
    const ink = inkRef.current;
    if (ink && stamped) {
      const x = ink.getContext('2d') as CanvasRenderingContext2D;
      x.clearRect(0, 0, ink.width, ink.height);
      x.fillStyle = season.ink;
      for (let i = 0; i < 26; i++) {
        const a = Math.random() * Math.PI * 2, d = 120 + Math.random() * 90, r = 3 + Math.random() * 10;
        x.globalAlpha = 0.25 + Math.random() * 0.5;
        x.beginPath();
        x.arc(240 + Math.cos(a) * d, 240 + Math.sin(a) * d, r, 0, 7);
        x.fill();
      }
    }
  }, [phase, summit, season, now, n, tick]);

  const stones = Math.min(5, 2 + n);
  const cairn = useMemo(() => cairnSide(stones, season.ink, inside && (phase === 'ready' || phase === 'hold') && settled), [stones, season.ink, inside, phase, settled]);
  const ring = acc == null ? 0 : Math.min(1, (160 - acc) / (160 - 12));
  const [sunKo, sunEn] = now ? sunsetText(now) : ['', ''];

  const head =
    phase === 'idle' || (!settled && (phase === 'hold' || phase === 'blur'))
      ? null
      : inside
        ? 'in'
        : 'out';

  return (
    <section className="sb-sec sb-desk" id="stamp">
      <div className="sb-wrap sb-stamp-grid">
        <div className="sb-stamp-copy">
          <div className="sb-eyebrow">
            <span data-l="ko">01 · 꾹 눌러 찍기</span>
            <span data-l="en">01 · PRESS AND HOLD</span>
          </div>
          <h2 className="sb-h2">
            <span data-l="ko">정상에서는 돌탑을 꾹 누른다.</span>
            <span data-l="en">At the top, press and hold the cairn.</span>
          </h2>
          <p className="sb-lead">
            <span data-l="ko">
              누르는 동안 위치가 한 번 잡히고, 고리가 정확도만큼 찬다. 놓으면 쾅. 산을 고를 필요도 없다 — 가장 가까운 정상을 수첩이 스스로 찾는다.
            </span>
            <span data-l="en">
              While you hold, the phone takes one location fix and the ring fills with its accuracy. Let go and it lands. No need to pick a
              mountain — the notebook finds the nearest summit itself.
            </span>
          </p>
          <ul className="sb-rules">
            <li>
              <b>150m</b>
              <span data-l="ko">정상 좌표에서 이 안이면 도장</span>
              <span data-l="en">Within this of the summit: a stamp</span>
            </li>
            <li>
              <b>±40m</b>
              <span data-l="ko">위치가 이만큼 또렷해야 판정</span>
              <span data-l="en">Accuracy needed before judging</span>
            </li>
            <li>
              <b>0</b>
              <span data-l="ko">밖으로 보내는 위치 정보</span>
              <span data-l="en">Location data sent anywhere</span>
            </li>
          </ul>
          <p className="sb-note">
            <span data-l="ko">이 시연은 위치를 읽지 않는다. 정확도 숫자는 앱이 실제로 받는 순서를 흉내 낸 것이다.</span>
            <span data-l="en">This demo never reads your location. The accuracy numbers mimic the sequence the app really receives.</span>
          </p>
        </div>

        <div className="sb-stamp-play">
          <div className="sb-seg" role="group" aria-label="mode">
            <button type="button" aria-pressed={inside} onClick={() => (setInside(true), reset())}>
              <span data-l="ko">정상 반경 안</span>
              <span data-l="en">Within 150 m</span>
            </button>
            <button type="button" aria-pressed={!inside} onClick={() => (setInside(false), reset())}>
              <span data-l="ko">{FAR}m 아래</span>
              <span data-l="en">{FAR} m below</span>
            </button>
          </div>
          <div className="sb-chips" role="group" aria-label="mountain">
            {PICKS.map((k) => (
              <button key={k} type="button" aria-pressed={k === name} onClick={() => reset(k)}>
                <span data-l="ko">{k}</span>
                <span data-l="en">{PICK_EN[k]}</span>
              </button>
            ))}
            <button type="button" className="sb-snd" aria-pressed={snd} onClick={() => setSnd((v) => !v)}>
              <span data-l="ko">소리 {snd ? '켬' : '끔'}</span>
              <span data-l="en">Sound {snd ? 'on' : 'off'}</span>
            </button>
          </div>

          <div className={`sb-notepage${phase === 'stamped' ? ' sb-shake' : ''}`} key={`p${tick}`}>
            <div className="sb-np-head">
              {head == null ? (
                <>
                  <small className="sb-mono">No.??? · ···</small>
                  <h3>
                    <span data-l="ko">어느 산일까</span>
                    <span data-l="en">Which mountain?</span>
                  </h3>
                  <p>
                    <span data-l="ko">{phase === 'idle' ? '돌탑을 꾹 누르면 위치를 받기 시작합니다' : '위치를 받는 중…'}</span>
                    <span data-l="en">{phase === 'idle' ? 'Press and hold the cairn to start a fix' : 'Getting a fix…'}</span>
                  </p>
                </>
              ) : (
                <>
                  <small className="sb-mono">
                    {no3(summit.id)} · <span data-l="ko">{summit.region}</span>
                    <span data-l="en">{REGION_EN[summit.region]}</span>
                  </small>
                  <h3>
                    <span data-l="ko">{summit.name}</span>
                    <span data-l="en">{PICK_EN[summit.name]}</span>
                  </h3>
                  <p>
                    <span data-l="ko">
                      {summit.peak} · 해발 {summit.height.toLocaleString('ko-KR')}m · {summit.sido}
                    </span>
                    <span data-l="en">
                      {summit.height.toLocaleString('en-US')} m · {REGION_EN[summit.region]}
                    </span>
                  </p>
                </>
              )}
            </div>
            <div className="sb-np-stamp">
              <canvas ref={inkRef} className={phase === 'stamped' ? 'sb-ink sb-ink-go' : 'sb-ink'} width={480} height={480} aria-hidden="true" />
              <div ref={stampBox} className="sb-stamp-box" style={{ opacity: phase === 'pencil' ? 0 : 1 }} />
              {phase === 'pencil' && (
                <div className="sb-pencil">
                  <svg viewBox="0 0 320 120" aria-hidden="true">
                    <path d="M14 70 C 70 58, 120 84, 170 66 S 260 60, 306 72" />
                    <path className="sb-pencil-2" d="M30 92 C 90 86, 150 100, 220 90" />
                  </svg>
                  <p className="sb-hand">
                    <span data-l="ko">
                      {summit.name} 정상 아래에서 · 약 {FAR}m
                    </span>
                    <span data-l="en">
                      Below {PICK_EN[summit.name]} summit · about {FAR} m
                    </span>
                  </p>
                </div>
              )}
            </div>
            <div className="sb-np-foot">
              {phase === 'stamped' && (
                <>
                  <b>
                    <span data-l="ko">
                      {no3(summit.id)} · {ordinal(n)} 오름 · {season.name}
                    </span>
                    <span data-l="en">
                      {no3(summit.id)} · climb {n} · {season.en}
                    </span>
                  </b>
                  <small>
                    <span data-l="ko">{sunKo}</span>
                    <span data-l="en">{sunEn}</span>
                  </small>
                </>
              )}
              {phase === 'pencil' && (
                <small>
                  <span data-l="ko">도장은 정상 150m 안에서만 찍힙니다. 대신 &lsquo;여기까지 왔다&rsquo;를 연필로 적어 둡니다.</span>
                  <span data-l="en">The stamp lands only within 150 m of the summit. Instead, a pencil line notes how far you got.</span>
                </small>
              )}
              {phase === 'blur' && (
                <small>
                  <span data-l="ko">아직 흐릿합니다 — 조금 더 오래 누르면 또렷해집니다.</span>
                  <span data-l="en">Still blurry — hold a little longer for a sharper fix.</span>
                </small>
              )}
              {phase === 'ready' && (
                <small className="sb-gold">
                  <span data-l="ko">{inside ? '놓으면 찍힙니다' : '놓으면 연필로 적습니다'}</span>
                  <span data-l="en">{inside ? 'Let go to stamp' : 'Let go to pencil it in'}</span>
                </small>
              )}
            </div>
          </div>

          <div className="sb-tool-row">
            <div className="sb-acc sb-mono" aria-live="polite">
              {acc == null ? (
                <>
                  <span data-l="ko">정확도 —</span>
                  <span data-l="en">accuracy —</span>
                </>
              ) : (
                <>
                  <span data-l="ko">정확도 ±{acc}m</span>
                  <span data-l="en">accuracy ±{acc} m</span>
                </>
              )}
            </div>
            <div className="sb-tool-wrap">
              <svg className="sb-ringwrap" viewBox="0 0 220 220" aria-hidden="true">
                <circle cx="110" cy="110" r="100" className="sb-ring-bg" />
                <circle
                  cx="110"
                  cy="110"
                  r="100"
                  className={settled ? 'sb-ring-fg sb-ring-ok' : 'sb-ring-fg'}
                  strokeDasharray="628"
                  strokeDashoffset={(628 * (1 - (phase === 'idle' ? 0 : ring))).toFixed(1)}
                  transform="rotate(-90 110 110)"
                />
              </svg>
              <button
                type="button"
                className={`sb-tool${phase === 'hold' || phase === 'ready' ? ' sb-tool-down' : ''}${phase === 'stamped' ? ' sb-tool-hit' : ''}`}
                aria-label="돌탑 도장 — 꾹 누르기"
                onPointerDown={(e) => {
                  e.preventDefault();
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                  start();
                }}
                onPointerUp={release}
                onPointerCancel={release}
                onContextMenu={(e) => e.preventDefault()}
                onKeyDown={(e) => {
                  if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) {
                    e.preventDefault();
                    start();
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') release();
                }}
                dangerouslySetInnerHTML={{ __html: cairn }}
              />
            </div>
            <div className="sb-tool-cap">
              <span data-l="ko">{phase === 'stamped' || phase === 'pencil' ? '한 번 더 꾹' : '꾹 누르고 있다가 놓기'}</span>
              <span data-l="en">{phase === 'stamped' || phase === 'pencil' ? 'Hold again' : 'Press, hold, let go'}</span>
              <em>
                <span data-l="ko">돌 {stones}개 — 오를 때마다 하나씩 얹힌다</span>
                <span data-l="en">{stones} stones — one more each climb</span>
              </em>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
