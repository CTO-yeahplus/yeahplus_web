'use client';

/* 3. 정상 쪽 — 사진을 놓으면 앱이 쪽을 네 겹으로 세운다: 사진 → 산 이름이 솟고 → 오려 낸 사람이 떠올라 이름 앞에 서고 → 글 · 도장 쾅.
   판형 넷(정상석 · 등고선 무료 / 필름 · 엽서 평생권)을 앱과 같은 조판 엔진으로 그린다. 사진은 그린 견본(사람 사진 아님).
   화면에 들어오면 한 번 세우고, 3.6초마다 다음 판형으로 넘긴다(누르면 멈춘다). 화면 밖이면 멈춘다. */
import { useEffect, useRef, useState } from 'react';
import { byName } from './summits';
import { facts, page, PH, PW, samplePhoto, stoneLayers, type Climb, type Layout, type Photo } from './engine';
import { reduced, useNear } from './stage';
import { Nb, sceneAttrs, Slug } from './Scene';

const LAYS: { id: Layout; ko: string; en: string; pass: boolean }[] = [
  { id: 'stone', ko: '정상석', en: 'Summit stone', pass: false },
  { id: 'contour', ko: '등고선', en: 'Contour', pass: false },
  { id: 'film', ko: '필름', en: 'Film', pass: true },
  { id: 'postcard', ko: '엽서', en: 'Postcard', pass: true },
];

export default function Pages() {
  const [lay, setLay] = useState(0);
  const [auto, setAuto] = useState(true);
  const [run, setRun] = useState(0);
  const [wrapRef, near] = useNear<HTMLElement>('-20% 0px');
  const bg = useRef<HTMLCanvasElement | null>(null);
  const nm = useRef<HTMLCanvasElement | null>(null);
  const cut = useRef<HTMLCanvasElement | null>(null);
  const fg = useRef<HTMLCanvasElement | null>(null);
  const flat = useRef<HTMLCanvasElement | null>(null);
  const photo = useRef<Photo | null>(null);

  const args = (layout: Layout) => {
    if (!photo.current) photo.current = samplePhoto(7, '#2F6B8F');
    const s = byName('설악산');
    const climb: Climb = { id: 'pages', layout, course: '오색 → 대청봉', with: '민지 · 도윤', note: '구름이 발밑에 깔렸다' };
    return { facts: facts(s, new Date(2026, 9, 11, 9, 26), true, 2), climb, photo: photo.current, seasons: new Set(['autumn', 'summer']) };
  };

  // 정상석 네 겹 + 나머지 판형 한 장
  useEffect(() => {
    if (!bg.current || !nm.current || !cut.current || !fg.current || !flat.current) return;
    const L = LAYS[lay].id;
    if (L === 'stone') stoneLayers(args('stone'), { bg: bg.current, name: nm.current, cut: cut.current, fg: fg.current });
    else page(args(L), flat.current);
  }, [lay, run]);

  // 판형 자동 넘김(보일 때만 · 줄인 동작이면 안 함)
  useEffect(() => {
    if (!auto || !near || reduced()) return;
    const t = window.setTimeout(() => setLay((l) => (l + 1) % LAYS.length), LAYS[lay].id === 'stone' ? 4800 : 3600);
    return () => window.clearTimeout(t);
  }, [auto, near, lay, run]);

  const pick = (k: number) => {
    setAuto(false);
    setLay(k);
    if (k === 0) setRun((r) => r + 1);
  };
  const isStone = LAYS[lay].id === 'stone';

  return (
    <section className="sb-sec sb-dark" id="pages" ref={wrapRef} {...sceneAttrs('down')}>
      <div className="sb-wrap sb-pages-grid">
        <div className="sb-pages-copy">
          <Slug id="down" />
          <h2 className="sb-h2">
            <span data-l="ko">내려와서 한 장. 사진 속 내가 산 이름 앞에 섭니다.</span>
            <span data-l="en">One photo at the bottom. You, standing in front of the mountain&rsquo;s name.</span>
          </h2>
          <p className="sb-lead">
            <span data-l="ko">
              내리막에서 다리가 후들거리고, 긴장이 풀리며 말이 많아진다. &ldquo;다음엔 어디 갈까.&rdquo; 걸을 때는 휴대폰을 보지 않는다. 들머리에 내려와 신발
              끈을 풀고서야, 정상석 앞 줄에서 서둘러 찍은 사진을 넘겨 본다.
            </span>
            <span data-l="en">
              Your legs shake on the way down; you loosen up and start talking. &ldquo;Where next?&rdquo; You don&rsquo;t look at your phone while
              walking. Only at the bottom, laces undone, do you flick through the photo you snapped in a hurry at the summit stone.
            </span>
          </p>
          <Nb
            ko="그 사진 한 장을 놓으면, 기기 안에서 사람만 오려 내 새긴 산 이름 앞에 세운다. 해발 · 날짜 · 철 · 몇 번째 오름이 함께 적힌 한 쪽."
            en="Drop that one photo in, and the phone cuts out the person — on the device — and stands them in front of the carved name. Height, date, season, which climb: one page."
          />
          <div className="sb-tabs" role="tablist" aria-label="layouts">
            {LAYS.map((l, k) => (
              <button key={l.id} type="button" role="tab" aria-selected={k === lay} onClick={() => pick(k)}>
                <span data-l="ko">{l.ko}</span>
                <span data-l="en">{l.en}</span>
                {l.pass && (
                  <em>
                    <span data-l="ko">평생권</span>
                    <span data-l="en">Lifetime</span>
                  </em>
                )}
              </button>
            ))}
          </div>
          <button type="button" className="sb-linkbtn" onClick={() => pick(0)}>
            <span data-l="ko">↻ 사진 다시 놓기</span>
            <span data-l="en">↻ Drop the photo again</span>
          </button>
          <p className="sb-note">
            <span data-l="ko">견본 사진은 그림이다. 오려 내기(Apple Vision)는 앱에서 기기 안에서만 돌고, 사진은 앱 폴더 밖으로 나가지 않는다.</span>
            <span data-l="en">The sample photo is an illustration. In the app, the cutout (Apple Vision) runs only on the device and photos stay in the app.</span>
          </p>
        </div>

        <div className="sb-pages-frame">
          <div className={`sb-pframe ${isStone ? 'sb-pf-stone' : 'sb-pf-flat'}`} key={`${lay}-${run}`} data-play={near ? '1' : '0'}>
            <canvas ref={bg} width={PW} height={PH} className="sb-pl sb-pl-bg" aria-hidden="true" />
            <canvas ref={nm} width={PW} height={PH} className="sb-pl sb-pl-name" aria-hidden="true" />
            <canvas ref={cut} width={PW} height={PH} className="sb-pl sb-pl-cut" aria-hidden="true" />
            <canvas ref={fg} width={PW} height={PH} className="sb-pl sb-pl-fg" aria-hidden="true" />
            <canvas ref={flat} width={PW} height={PH} className="sb-pl sb-pl-flat" role="img" aria-label={`설악산 ${LAYS[lay].ko} 판형 견본`} />
          </div>
          <div className="sb-pframe-dots" aria-hidden="true">
            {LAYS.map((l, k) => (
              <i key={l.id} data-on={k === lay ? '1' : '0'} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
