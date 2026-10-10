/* TOWER 68 — 스크롤 스토리 랜딩 (휠/스크롤로 넘기는 "관제 한 판")
 *
 * window.T68Story.mount(rootEl, lang) → { setLang(lang), destroy() }
 * 마운트: app/(tower68)/tower68/StoryContent.tsx · 스타일: story.css (.t68s 범위)
 * 원본 프로토타입: LANDING_JFK/landing/prototype/scroll_story.src.html
 */
(function () {
'use strict';

// ASC → 앱 분석 → 획득 → 캠페인 의 pt 값을 넣으면 랜딩 유입이 ct=landing 으로 집계된다.
var PT = '';
var APP_URL = PT ? 'https://apps.apple.com/app/apple-store/id6790672799?pt=' + PT + '&ct=landing&mt=8'
                 : 'https://apps.apple.com/kr/app/tower-68/id6790672799';
var LOGO = '/tower68/tower68_logo.png';

var TEMPLATE =
  '<div class="story">' +
  '<div class="stage">' +
  '<canvas class="cv" aria-hidden="true"></canvas>' +
  '<img class="hero-logo" src="' + LOGO + '" alt="TOWER 68">' +
  '<div class="texts"></div>' +
  '<div class="radio r1" style="top:40%"><b>TOWER · JFK</b><div class="en">Korean Air 81, runway 4 Right, cleared to land.</div><div class="ko">즐거운 한가위 되세요.</div></div>' +
  '<div class="radio r2" style="top:calc(40% + 140px)"><b>KOREAN AIR 81</b><div class="en">Cleared to land 4 Right, Korean Air 81.</div><div class="ko">감사합니다. 수고 많으십니다!</div></div>' +
  '<div class="hud"><small class="hudLabel">LANDED</small><span class="hudNum">0</span></div>' +
  '<div class="toast"></div>' +
  '<div class="cta"><img src="' + LOGO + '" alt="TOWER 68"><h2 data-k="ctaTitle"></h2><p data-k="ctaSub"></p>' +
  '<a class="btn" href="' + APP_URL + '" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.6 2.1-3.8 2.2-3.9-1.2-1.8-3.1-2-3.7-2-1.6-.2-3.1.9-3.9.9-.8 0-2-.9-3.4-.9-1.7 0-3.3 1-4.2 2.6-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8 1.6 0 2 .8 3.4.8 1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9 0 0-2.7-1-2.7-4.1zM13.9 5c.7-.9 1.2-2 1-3.2-1 0-2.3.7-3 1.6-.7.8-1.2 2-1.1 3.1 1.2.1 2.3-.6 3.1-1.5z"/></svg><span data-k="store"></span></a>' +
  '<p class="s" data-k="ctaNote"></p></div>' +
  '<div class="hint"><span>SCROLL</span><i></i></div>' +
  '<nav class="rail" aria-label="chapters"></nav>' +
  '<div class="bar"></div>' +
  '</div></div>' +
  '<section class="after"><div class="kick">FEATURES</div><h3 data-k="featTitle"></h3><p class="lead" data-k="featLead"></p><div class="grid"></div></section>';

var CH = [
  ['hero', 0, .07], ['alert', .07, .17], ['draw', .17, .30], ['butter', .30, .37],
  ['story', .37, .53], ['radio', .53, .65], ['skins', .65, .76], ['play', .76, .90], ['cta', .90, 1.0001]
];

var L = {
  ko: {
    store: 'App Store에서 받기', ctaTitle: '지금 관제석에 앉아보세요',
    ctaSub: '무료 · iPhone · 한 손으로 1분', ctaNote: '※ 실화에서 영감을 받은 픽션입니다.',
    featTitle: '한 판 1분, 그러나 깊게',
    featLead: '배우는 데 10초. 완벽한 버터 랜딩을 노리는 데는 끝이 없습니다.',
    achv: '업적 달성!', prio: '우선착륙', gold: '골든 플레인',
    rail: ['시작', '경보', '유도', 'BUTTER', '실화', '무전', '스킨', '플레이', '다운로드'],
    T: {
      tag: '손끝으로 하늘의 질서를.', alert: '충돌 1초 전.', d1: '그어라.', d2: '꺾어라.', d3: '내려라.',
      butter: 'BUTTER.', butterSub: '곧고 부드럽게 — 완벽한 착륙엔 BUTTER',
      s1: 'JFK 관제탑에서<br>31년.', s2: '1시간에<br><span class="amber cnt">1</span>대.', s3: '실화다.',
      s3sub: '한 한국인 관제사의 이야기에서 시작했습니다.',
      radio: '명절엔, 모국어로.', radioSub: '영어 교신 끝에 건네던 짧은 한국어 안부.',
      skins: '레이더를 내 취향대로.', play: '직접 내려보세요.',
      playSub: '비행기를 눌러 <b>같은 색 활주로</b>까지 선을 그으세요'
    },
    hudLanded: 'LANDED', hudYou: 'YOU', wrong: '다른 색 활주로예요', nice: 'BUTTER!',
    skinNames: ['나이트', '클래식 그린', '앰버 CRT', '아틱 블루', '미드나잇', '블랙아웃'],
    feat: [
      ['라인 드로잉 관제', '손가락으로 선을 긋는 게 전부. 비행기를 같은 색 활주로로 유도하세요.', '핵심 조작'],
      ['버터 랜딩', '곧고 부드럽게 접지할수록 높은 판정. 완벽하면 BUTTER.', '판정'],
      ['매 판 다른 하늘', '우선착륙기 · 골든 플레인 · 돌풍 · 안개. 같은 판은 없습니다.', '변수'],
      ['랭킹 · 업적 24종', 'Game Center 글로벌 랭킹을 한 칸씩 올라가세요.', '경쟁'],
      ['트레일 · 레이더 스킨', '선 색과 레이더 화면을 내 취향대로.', '커스터마이즈'],
      ['명절엔 한국어 인사', '설 · 추석 · 크리스마스, 무전 너머로 건네는 모국어 안부.', '실화 모티프']
    ]
  },
  en: {
    store: 'Download on the App Store', ctaTitle: 'Take the tower seat.',
    ctaSub: 'Free · iPhone · one hand, one minute', ctaNote: 'Fiction inspired by a true story.',
    featTitle: 'One-minute runs. Endless depth.',
    featLead: 'Ten seconds to learn. No end to chasing the perfect butter landing.',
    achv: 'Achievement!', prio: 'PRIORITY', gold: 'GOLDEN',
    rail: ['Start', 'Alert', 'Draw', 'BUTTER', 'True story', 'Radio', 'Skins', 'Play', 'Download'],
    T: {
      tag: 'Bring order to the sky.', alert: '1 second to collision.', d1: 'Draw.', d2: 'Bend.', d3: 'Land.',
      butter: 'BUTTER.', butterSub: 'Straight and soft — a perfect landing is BUTTER',
      s1: '31 years<br>in JFK tower.', s2: '<span class="amber cnt">1</span> landings<br>in one hour.', s3: 'True story.',
      s3sub: 'Inspired by one Korean air traffic controller.',
      radio: 'On holidays, in Korean.', radioSub: 'A quiet greeting after the English readback.',
      skins: 'Make the radar yours.', play: 'Try it yourself.',
      playSub: 'Tap a plane and draw to the <b>runway of the same color</b>'
    },
    hudLanded: 'LANDED', hudYou: 'YOU', wrong: 'Wrong runway color', nice: 'BUTTER!',
    skinNames: ['Night', 'Classic Green', 'Amber CRT', 'Arctic Blue', 'Midnight', 'Blackout'],
    feat: [
      ['Line-drawing ATC', 'Just draw a line. Guide each plane to the runway of its color.', 'CORE'],
      ['Butter landings', 'The straighter and softer, the higher the grade. Perfect is BUTTER.', 'GRADING'],
      ['A different sky every run', 'Priority flights, golden planes, gusts and fog.', 'TWISTS'],
      ['Rankings · 24 achievements', 'Climb the Game Center leaderboard one spot at a time.', 'COMPETE'],
      ['Trail & radar skins', 'Pick your line color and your radar screen.', 'CUSTOMIZE'],
      ['Holiday greetings', 'A quiet greeting in Korean over the radio on the holidays.', 'TRUE STORY']
    ]
  }
};
// 장 · 시작 · 끝(장 안의 0~1) · 키 · 클래스 · 세로 위치
var TEXTS = [
  ['hero', 0, 1, 'tag', 'm soft', '58%'],
  ['alert', .12, 1, 'alert', 'xl warn', '14%'],
  ['draw', 0, .34, 'd1', 'xl cyan', '14%'], ['draw', .34, .67, 'd2', 'xl cyan', '14%'], ['draw', .67, 1, 'd3', 'xl cyan', '14%'],
  ['butter', 0, 1, 'butter', 'xl gold', '14%'], ['butter', .35, 1, 'butterSub', 's soft', 'calc(14% + clamp(70px,12vw,170px))'],
  ['story', 0, .38, 's1', 'l', '13%'], ['story', .38, .84, 's2', 'l', '13%'], ['story', .84, 1, 's3', 'xl amber', '14%'],
  ['story', .88, 1, 's3sub', 's soft', 'calc(14% + clamp(70px,12vw,170px))'],
  ['radio', 0, 1, 'radio', 'l', '14%'], ['radio', .08, 1, 'radioSub', 's soft', 'calc(14% + clamp(56px,8vw,110px))'],
  ['skins', 0, 1, 'skins', 'l', '14%'],
  ['play', 0, 1, 'play', 'l', '12%'], ['play', 0, 1, 'playSub', 's soft', 'calc(12% + clamp(56px,8vw,110px))']
];
var DEMOS = ['draw', 'butter', 'twist', 'rank', 'skins', 'radio'];

// ── 공용 수학 · 팔레트 ─────────────────────────────────────────────────────
function hex(h) { return [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)]; }
function rgba(c, a) { if (a === undefined) a = 1; return 'rgba(' + (c[0] | 0) + ',' + (c[1] | 0) + ',' + (c[2] | 0) + ',' + a + ')'; }
function mix(a, b, t) { return a.map(function (v, i) { return v + (b[i] - v) * t; }); }
function clamp(x, a, b) { if (a === undefined) a = 0; if (b === undefined) b = 1; return Math.max(a, Math.min(b, x)); }
function ease(x) { return 1 - Math.pow(1 - clamp(x), 3); }
var C = { prop: hex('#57E39A'), jet: hex('#4D9DFF'), wide: hex('#FFB020'), butter: hex('#FFD54A'),
          amber: hex('#FFC93C'), cyan: hex('#5CE1FF'), warn: hex('#FF2D55'), white: [255, 255, 255], radar: hex('#5EE6A8') };
// lib/game/atc/save.dart radarCatalog 와 같은 팔레트 (top, bottom, glow)
var SKINS = [['#05070F', '#0C1428', '#2A3358'], ['#02140A', '#073A1C', '#2BD96B'], ['#140A02', '#3A2007', '#E09A2B'],
             ['#04101C', '#0E3350', '#4FC3F7'], ['#0D0518', '#2A1046', '#9B5CFF'], ['#000000', '#0A0A0A', '#8A8A8A']]
  .map(function (s) { return s.map(hex); });
// 기체 실루엣 — clip_recorder.dart planeSilhouette() 와 같은 좌표(기수 방향, 우측 날개 방향)
var SIL = {
  prop: [[[10,0],[3,2],[-8,1.8],[-9.2,0],[-8,-1.8],[3,-2]],[[2.6,1.5],[.6,10.5],[-1.6,10.5],[-.6,1.5]],[[2.6,-1.5],[.6,-10.5],[-1.6,-10.5],[-.6,-1.5]],
         [[-7,1.3],[-8.6,4.8],[-9.6,4.8],[-9,1.3]],[[-7,-1.3],[-8.6,-4.8],[-9.6,-4.8],[-9,-1.3]]],
  jet: [[[12,0],[5,2.2],[-8,2],[-9.6,0],[-8,-2],[5,-2.2]],[[2.5,1.8],[-5,9.4],[-7.6,9.4],[-3,1.8]],[[2.5,-1.8],[-5,-9.4],[-7.6,-9.4],[-3,-1.8]],
        [[-7.4,1.6],[-10.6,5.1],[-11.9,5.1],[-9.5,1.6]],[[-7.4,-1.6],[-10.6,-5.1],[-11.9,-5.1],[-9.5,-1.6]]],
  wide: [[[14,0],[6,2.6],[-9,2.4],[-11.4,0],[-9,-2.4],[6,-2.6]],[[3,2.2],[-7,11.8],[-9.6,11.8],[-4,2.2]],[[3,-2.2],[-7,-11.8],[-9.6,-11.8],[-4,-2.2]],
         [[-8.6,2],[-12.2,6.4],[-13.6,6.4],[-11,2]],[[-8.6,-2],[-12.2,-6.4],[-13.6,-6.4],[-11,-2]],
         [[-1.4,5.2],[-4.6,5.2],[-4.6,6.9],[-1.4,6.9]],[[-3.4,8.8],[-6.3,8.8],[-6.3,10.3],[-3.4,10.3]],
         [[-1.4,-5.2],[-4.6,-5.2],[-4.6,-6.9],[-1.4,-6.9]],[[-3.4,-8.8],[-6.3,-8.8],[-6.3,-10.3],[-3.4,-10.3]]]
};
// 겹친 서브패스가 nonzero 채우기에서 구멍 나지 않도록 감김 방향 통일
Object.keys(SIL).forEach(function (k) {
  SIL[k] = SIL[k].map(function (p) {
    var a = 0;
    for (var i = 0; i < p.length; i++) { var q = p[(i + 1) % p.length]; a += p[i][0] * q[1] - q[0] * p[i][1]; }
    return a > 0 ? p : p.slice().reverse();
  });
});
var SCALE = { prop: 2.5, jet: 3.0, wide: 3.7 };
var RW = { prop: [-230, 790, 'RWY 04L'], jet: [0, 830, 'RWY 13R'], wide: [230, 790, 'RWY 22L'] };
var TYPES = ['prop', 'jet', 'wide'];
var FONT = "-apple-system,BlinkMacSystemFont,'Apple SD Gothic Neo','Noto Sans KR',sans-serif";

// 3차 베지어(호 길이 매개화)
function bez(P, n) {
  n = n || 120;
  var pts = [], cum = [0], i;
  for (i = 0; i <= n; i++) {
    var u = i / n, m = 1 - u;
    pts.push([m*m*m*P[0][0] + 3*m*m*u*P[1][0] + 3*m*u*u*P[2][0] + u*u*u*P[3][0],
              m*m*m*P[0][1] + 3*m*m*u*P[1][1] + 3*m*u*u*P[2][1] + u*u*u*P[3][1]]);
    if (i) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i-1][0], pts[i][1] - pts[i-1][1]));
  }
  var len = cum[n];
  function at(u) {
    var tg = clamp(u) * len, j = 1;
    while (j < n && cum[j] < tg) j++;
    var f = (tg - cum[j-1]) / ((cum[j] - cum[j-1]) || 1);
    return [pts[j-1][0] + (pts[j][0] - pts[j-1][0]) * f, pts[j-1][1] + (pts[j][1] - pts[j-1][1]) * f,
            Math.atan2(pts[j][1] - pts[j-1][1], pts[j][0] - pts[j-1][0])];
  }
  function seg(u0, u1, mm) { mm = mm || 40; var r = []; for (var k = 0; k <= mm; k++) r.push(at(u0 + (u1 - u0) * k / mm)); return r; }
  return { at: at, seg: seg, len: len };
}
function rng(seed) { return function () { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }; }

// ════════════════════════════════════════════════════════════════════════════
function mount(root, initialLang) {
  var lang = initialLang === 'en' ? 'en' : 'ko';
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.innerHTML = TEMPLATE;
  function q(sel) { return root.querySelector(sel); }

  var storyEl = q('.story'), cv = q('.cv'), mainG = cv.getContext('2d'), g = mainG;
  var textBox = q('.texts'), rail = q('.rail'), hud = q('.hud'), hudNum = q('.hudNum'), hudLabel = q('.hudLabel');
  var heroLogo = q('.hero-logo'), hint = q('.hint'), cta = q('.cta'), r1 = q('.r1'), r2 = q('.r2'), bar = q('.bar'), toastEl = q('.toast');
  var grid = q('.grid');
  var lastCnt = -1, lastSkin = -1, minisDirty = true, alive = true, raf = 0;

  var textEls = TEXTS.map(function (d) {
    var el = document.createElement('div');
    el.className = 't ' + d[4]; el.style.top = d[5];
    textBox.appendChild(el);
    return { ch: d[0], a: d[1], b: d[2], k: d[3], el: el };
  });
  var skinEl = document.createElement('div');
  skinEl.className = 't m soft'; skinEl.style.top = 'calc(14% + clamp(56px,8vw,110px))';
  textBox.appendChild(skinEl);
  var railBtns = CH.map(function (c, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.innerHTML = '<i></i><span></span>';
    b.onclick = function () { jumpTo(c[1] + (i ? .012 : 0)); };
    rail.appendChild(b);
    return b;
  });

  function applyLang() {
    var D = L[lang];
    root.querySelectorAll('[data-k]').forEach(function (el) { el.textContent = D[el.dataset.k]; });
    textEls.forEach(function (t) { t.el.innerHTML = D.T[t.k]; });
    railBtns.forEach(function (b, i) { b.querySelector('span').textContent = D.rail[i]; });
    lastCnt = lastSkin = -1;
    grid.innerHTML = D.feat.map(function (f, i) {
      return '<div class="card' + (i < 2 ? ' big' : i === 5 ? ' wide' : '') + '" style="transition-delay:' + (i % 3) * 90 + 'ms">' +
        '<canvas data-demo="' + DEMOS[i] + '" aria-hidden="true"></canvas>' +
        '<div class="tx"><span class="tag">' + f[2] + '</span><h4>' + f[0] + '</h4><p>' + f[1] + '</p></div></div>';
    }).join('');
    minisDirty = true;
  }
  applyLang();

  // ── 캔버스 · 월드 좌표(세로 1000 단위, 가로 중심 0) ─────────────────────────
  var W = 0, H = 0, DPR = 1, K = 1, OY = 0, VW = 500;
  function resize() {
    DPR = Math.min(2, window.devicePixelRatio || 1);
    W = cv.clientWidth; H = cv.clientHeight;
    cv.width = W * DPR; cv.height = H * DPR;
    K = Math.min(H / 1000, W / 640);
    OY = (H - 1000 * K) / 2;
    VW = W / 2 / K;
  }
  window.addEventListener('resize', resize); resize();

  // ── 그리기 프리미티브(게임 문법) ─────────────────────────────────────────
  function plane(x, y, hd, type, col, a, sc) {
    if (a === undefined) a = 1; if (!sc) sc = 1;
    var s = SCALE[type] * sc, vx = Math.cos(hd), vy = Math.sin(hd);
    function path(ox, oy) {
      g.beginPath();
      SIL[type].forEach(function (poly) {
        poly.forEach(function (pt, i) {
          var X = ox + vx * pt[0] * s - vy * pt[1] * s, Y = oy + vy * pt[0] * s + vx * pt[1] * s;
          if (i) g.lineTo(X, Y); else g.moveTo(X, Y);
        });
        g.closePath();
      });
    }
    path(x + 2.4 * s, y + 4 * s);
    g.fillStyle = 'rgba(0,0,0,' + .35 * a + ')'; g.fill('nonzero');
    path(x, y);
    g.fillStyle = rgba(col || C[type], a); g.fill('nonzero');
  }
  function runway(type, t, hi, a, pos, s) {
    if (a === undefined) a = 1; if (!s) s = 2.3;
    var r = pos || RW[type], x = r[0], y = r[1], label = r[2], col = C[type];
    g.beginPath(); g.arc(x, y, 11 * s, 0, 7); g.fillStyle = rgba(col, .95 * a); g.fill();
    [22, 34].forEach(function (rr, i) {
      g.beginPath(); g.arc(x, y, rr * s, 0, 7);
      g.strokeStyle = rgba(col, ((hi ? .55 : .3) - i * .13) * a); g.lineWidth = (hi ? 2.6 : 1.5) * s; g.stroke();
    });
    var p = (t * 1.1) % 1;
    g.beginPath(); g.arc(x, y, (24 + p * (hi ? 14 : 7)) * s, 0, 7);
    g.strokeStyle = rgba(col, (hi ? .7 : .3) * (1 - p) * a); g.lineWidth = 1.4 * s; g.stroke();
    var flow = (t * 55) % 26; g.lineCap = 'round';
    for (var k = 0; k < 3; k++) {
      var ay = y - 92 * s + (k * 26 + flow) * s;
      if (ay > y - 96 * s && ay < y - 8 * s) {
        g.beginPath(); g.moveTo(x - 8 * s, ay); g.lineTo(x, ay + 7 * s); g.lineTo(x + 8 * s, ay);
        g.strokeStyle = rgba(col, .5 * clamp((ay - (y - 96 * s)) / (88 * s)) * a); g.lineWidth = 2 * s; g.stroke();
      }
    }
    g.font = '700 ' + 13 * s + 'px ' + FONT; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.fillStyle = 'rgba(255,255,255,' + .62 * a + ')'; g.fillText(label, x, y + 30 * s);
  }
  function line(pts, col, w, a, glow) {
    if (a === undefined) a = 1; if (glow === undefined) glow = true;
    if (pts.length < 2) return;
    g.lineCap = g.lineJoin = 'round';
    (glow ? [[5.5, .07], [3, .14], [1, 1]] : [[1, 1]]).forEach(function (l) {
      g.beginPath();
      pts.forEach(function (p, i) { if (i) g.lineTo(p[0], p[1]); else g.moveTo(p[0], p[1]); });
      g.strokeStyle = rgba(col, l[1] * a); g.lineWidth = w * l[0]; g.stroke();
    });
  }
  function trail(pts, col) {
    g.lineCap = 'round';
    for (var i = 1; i < pts.length; i++) {
      var a = i / pts.length;
      g.beginPath(); g.moveTo(pts[i-1][0], pts[i-1][1]); g.lineTo(pts[i][0], pts[i][1]);
      g.strokeStyle = rgba(col, a * .34); g.lineWidth = 2 + a * 3; g.stroke();
    }
  }
  function rings(x, y, dt, big, col) {
    if (big === undefined) big = true; col = col || C.butter;
    if (dt < 0) return;
    [0, .12, .26].forEach(function (d, k) {
      var p = (dt - d) / .75; if (p < 0 || p > 1) return;
      g.beginPath(); g.arc(x, y, 18 + (big ? 120 : 60) * ease(p), 0, 7);
      g.strokeStyle = rgba(k < 2 ? col : hex('#FFE9A0'), (1 - p) * .85); g.lineWidth = 5 - 3 * p; g.stroke();
    });
    var ga = Math.max(0, 1 - dt / .9) * (big ? .45 : .25);
    if (ga > 0) {
      var rr = big ? 150 : 80, gr = g.createRadialGradient(x, y, 0, x, y, rr);
      gr.addColorStop(0, rgba(col, ga)); gr.addColorStop(1, rgba(col, 0));
      g.fillStyle = gr; g.beginPath(); g.arc(x, y, rr, 0, 7); g.fill();
    }
  }
  function roundel(x, y, r) {   // 태극 국적기 표시
    g.beginPath(); g.arc(x, y, r, Math.PI, 2 * Math.PI); g.fillStyle = '#CD2E3A'; g.fill();
    g.beginPath(); g.arc(x, y, r, 0, Math.PI); g.fillStyle = '#0047A0'; g.fill();
    g.beginPath(); g.arc(x, y, r, 0, 7); g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = r * .15; g.stroke();
  }
  function txt(s, x, y, size, col, a, align, weight) {
    if (a === undefined) a = 1;
    g.font = (weight || 800) + ' ' + size + 'px ' + FONT; g.textAlign = align || 'center'; g.textBaseline = 'middle';
    g.fillStyle = rgba(col, a); g.fillText(s, x, y);
  }
  function rrect(x, y, w, h, r) {
    g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
    g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
  }

  // 배경(화면 좌표)
  var sweep = 0;
  function background(pal, t, warnA) {
    var top = pal[0], bot = pal[1], glow = pal[2];
    var gr = g.createLinearGradient(0, 0, 0, H); gr.addColorStop(0, rgba(top)); gr.addColorStop(1, rgba(bot));
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    gr = g.createRadialGradient(W / 2, H, 0, W / 2, H, H * .95);
    gr.addColorStop(0, rgba(glow, .35)); gr.addColorStop(1, rgba(glow, 0));
    g.fillStyle = gr; g.fillRect(0, 0, W, H);
    var step = 110 * K, x, y;
    g.strokeStyle = 'rgba(255,255,255,.035)'; g.lineWidth = 1; g.beginPath();
    for (x = (W / 2) % step; x < W; x += step) { g.moveTo(x, 0); g.lineTo(x, H); }
    for (y = OY % step; y < H; y += step) { g.moveTo(0, y); g.lineTo(W, y); }
    g.stroke();
    var cx = W / 2, cy = OY + 620 * K;
    g.strokeStyle = 'rgba(255,255,255,.03)';
    [280, 520, 760].forEach(function (r) { g.beginPath(); g.arc(cx, cy, r * K, 0, 7); g.stroke(); });
    for (var k = 0; k < 24; k++) {
      var an = sweep - k * .035;
      g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(an) * 1600 * K, cy + Math.sin(an) * 1600 * K);
      g.strokeStyle = rgba(mix(C.radar, glow, .4), .13 * (1 - k / 24)); g.lineWidth = 5 * K; g.stroke();
    }
    if (warnA > 0) edgeFlash(C.warn, warnA);
  }
  function edgeFlash(col, a) {
    var th = Math.min(W, H) * .16;
    [[0, 0, 0, th, 0, 0, W, th], [0, H, 0, H - th, 0, H - th, W, th],
     [0, 0, th, 0, 0, 0, th, H], [W, 0, W - th, 0, W - th, 0, th, H]].forEach(function (e) {
      var gr = g.createLinearGradient(e[0], e[1], e[2], e[3]);
      gr.addColorStop(0, rgba(col, a)); gr.addColorStop(1, rgba(col, 0));
      g.fillStyle = gr; g.fillRect(e[4], e[5], e[6], e[7]);
    });
  }

  // ── 배경 비행 ────────────────────────────────────────────────────────────
  function makeFlight(r) {
    var type = TYPES[Math.floor(r() * 3)], rx = RW[type][0], ry = RW[type][1];
    var side = r();
    var sx = side < .33 ? -VW - 80 : side < .66 ? VW + 80 : (r() - .5) * VW * 1.6;
    var sy = side < .66 ? 120 + r() * 380 : -60;
    return { type: type, path: bez([[sx, sy], [sx * .5 + (r() - .5) * 300, sy + 150 + r() * 200], [rx + (r() - .5) * 120, ry - 260 - r() * 120], [rx, ry]]) };
  }
  var story = null, storyVW = 0;
  function storyFlights() {
    if (story && storyVW === VW) return story;
    var r = rng(68); storyVW = VW;
    story = [];
    for (var i = 0; i < 68; i++) { var f = makeFlight(r); f.land = .03 + .9 * i / 67; story.push(f); }
    return story;
  }
  var amb = [], ambVW = 0;
  function ambient(t, a, n) {
    n = n || 4;
    if (amb.length !== n || ambVW !== VW) {
      var r = rng(7); amb = []; ambVW = VW;
      for (var i = 0; i < n; i++) { var f = makeFlight(r); f.off = i / n; amb.push(f); }
    }
    amb.forEach(function (f) {
      var period = 9, u = ((t / period + f.off) % 1), qq = u / .9;
      if (qq <= 1) {
        trail(f.path.seg(Math.max(0, qq - .12), qq, 20), C[f.type]);
        var p = f.path.at(qq); plane(p[0], p[1], p[2], f.type, null, a);
      } else rings(RW[f.type][0], RW[f.type][1], (u - .9) * period, false);
    });
  }

  // ── 플레이 모드(직접 그어 내리기) ──────────────────────────────────────────
  var play = { p: null, drawing: false, landed: 0, toastT: 0 };
  function spawn() {
    var r = Math.random, type = TYPES[Math.floor(r() * 3)], left = r() < .5;
    var x = left ? -VW - 30 : VW + 30, y = 180 + r() * 220, tx = (r() - .5) * 200, ty = 480;
    play.p = { type: type, x: x, y: y, hd: Math.atan2(ty - y, tx - x), path: [], landedAt: 0, trail: [], warned: false };
  }
  function toWorld(e) {
    var b = cv.getBoundingClientRect();
    return [(e.clientX - b.left - W / 2) / K, (e.clientY - b.top - OY) / K];
  }
  var inPlay = false, dragScroll = null;
  function onDown(e) {
    if (!inPlay) return;
    var w = toWorld(e), p = play.p;
    if (p && !p.landedAt && Math.hypot(w[0] - p.x, w[1] - p.y) < 110) {
      play.drawing = true; p.path = [w]; cv.setPointerCapture(e.pointerId); e.preventDefault();
    } else if (e.pointerType !== 'mouse') {
      dragScroll = { y: e.clientY, s: window.scrollY }; cv.setPointerCapture(e.pointerId);
    }
  }
  function onMove(e) {
    if (play.drawing) {
      var w = toWorld(e), path = play.p.path, l = path[path.length - 1];
      if (!l || Math.hypot(w[0] - l[0], w[1] - l[1]) > 6) path.push(w);
    } else if (dragScroll) window.scrollTo(0, dragScroll.s - (e.clientY - dragScroll.y));
  }
  function onUp() { play.drawing = false; dragScroll = null; }
  cv.addEventListener('pointerdown', onDown);
  cv.addEventListener('pointermove', onMove);
  cv.addEventListener('pointerup', onUp);
  cv.addEventListener('pointercancel', onUp);

  function showToast(s, col) { toastEl.textContent = s; toastEl.style.color = rgba(col); play.toastT = performance.now(); }
  function stepPlay(dt, t) {
    if (!play.p) spawn();
    var p = play.p, speed = p.path.length ? 120 : 60;   // 그리기 전엔 천천히, 선을 따라갈 땐 빠르게
    if (p.landedAt) { if (t - p.landedAt > 1.3) spawn(); return; }
    var move = speed * dt;
    while (move > 0 && p.path.length) {
      var tx = p.path[0][0], ty = p.path[0][1], d = Math.hypot(tx - p.x, ty - p.y);
      if (d <= move) { if (d > .5) p.hd = Math.atan2(ty - p.y, tx - p.x); p.x = tx; p.y = ty; p.path.shift(); move -= d; }
      else { p.hd = Math.atan2(ty - p.y, tx - p.x); p.x += (tx - p.x) / d * move; p.y += (ty - p.y) / d * move; move = 0; }
    }
    if (move > 0) { p.x += Math.cos(p.hd) * move; p.y += Math.sin(p.hd) * move; }
    p.trail.push([p.x, p.y]); if (p.trail.length > 26) p.trail.shift();
    TYPES.forEach(function (type) {
      if (p.landedAt) return;
      if (Math.hypot(p.x - RW[type][0], p.y - RW[type][1]) < 30) {
        if (type === p.type) { p.landedAt = t; p.path = []; play.landed++; showToast(L[lang].nice, C.butter); }
        else if (!p.warned) { p.warned = true; showToast(L[lang].wrong, C.warn); }
      }
    });
    if (p.x < -VW - 120 || p.x > VW + 120 || p.y < -120 || p.y > 1120) spawn();
  }
  function drawPlay(t) {
    TYPES.forEach(function (type) { runway(type, t, play.p && play.p.type === type); });
    var p = play.p; if (!p) return;
    if (p.landedAt) { rings(RW[p.type][0], RW[p.type][1], t - p.landedAt); return; }
    if (p.path.length) line([[p.x, p.y]].concat(p.path), C.cyan, 3.2, .95);
    trail(p.trail, C[p.type]);
    g.beginPath(); g.arc(p.x, p.y, 44 + Math.sin(t * 6) * 6, 0, 7); g.strokeStyle = rgba(C[p.type], .55); g.lineWidth = 2.5; g.stroke();
    plane(p.x, p.y, p.hd, p.type);
  }

  // ── 장면 ────────────────────────────────────────────────────────────────
  var A_PATH = bez([[-60, 360], [-330, 420], [-190, 690], [0, 830]]);
  function skinLabel(i) { if (i !== lastSkin) { lastSkin = i; skinEl.innerHTML = '<span class="amber">' + L[lang].skinNames[i] + '</span>'; } }
  function counter(n) { if (n !== lastCnt) { lastCnt = n; var c = root.querySelector('.cnt'); if (c) c.textContent = n; hudNum.textContent = n; } }
  function scene(id, u, t) {
    var pal = SKINS[0], warn = 0, shake = 0, zoom = 1, x, y, hd, p;
    if (id === 'alert') warn = (.25 + .35 * u) * (REDUCED ? 1 : (.75 + .25 * Math.sin(t * 14)));
    if (id === 'radio') pal = [SKINS[0][0], mix(SKINS[0][1], hex('#2a1a08'), .6), C.amber];
    if (id === 'skins') {
      var f = u * (SKINS.length - 1), si = Math.min(SKINS.length - 2, Math.floor(f)), sk = ease((f - si - .55) / .45);
      pal = SKINS[si].map(function (c, j) { return mix(c, SKINS[si + 1][j], sk); });
      skinLabel(Math.round(f));
    }
    if (id === 'butter' && !REDUCED) shake = Math.max(0, 1 - u * 4) * 16;
    if (id === 'story') zoom = 1 - .22 * ease(u);
    // 배경은 CSS 픽셀 좌표로(레티나에서 1/4 만 칠해지던 문제 방지)
    g.setTransform(DPR, 0, 0, DPR, 0, 0);
    g.clearRect(0, 0, W, H);
    background(pal, t, warn);

    g.save();
    var sx = shake * Math.sin(t * 95), sy = shake * Math.cos(t * 81) * .7;
    g.setTransform(K * DPR, 0, 0, K * DPR, (W / 2 + sx) * DPR, (OY + sy) * DPR);
    if (zoom !== 1) { g.translate(0, 620); g.scale(zoom, zoom); g.translate(0, -620); }

    if (id === 'hero' || id === 'cta') {
      var dim = id === 'cta' ? .3 : .6;
      TYPES.forEach(function (ty) { runway(ty, t, false, dim); });
      ambient(t, dim);
    } else if (id === 'alert') {
      TYPES.forEach(function (ty) { runway(ty, t, false, .5); });
      var e = ease(u), ax = -VW - 60 + VW * e, bx = VW + 60 - VW * e;
      trail([[ax - 160, 360], [ax, 360]], C.jet); trail([[bx + 160, 360], [bx, 360]], C.wide);
      g.setLineDash([14, 12]); line([[ax + 50, 360], [bx - 60, 360]], C.warn, 3, .5 + .5 * u, false); g.setLineDash([]);
      [[ax, 'jet', 0], [bx, 'wide', Math.PI]].forEach(function (o) {
        g.beginPath(); g.arc(o[0], 360, 56 + 8 * Math.sin(t * 12), 0, 7); g.strokeStyle = rgba(C.warn, .7); g.lineWidth = 3; g.stroke();
        plane(o[0], 360, o[2], o[1]);
      });
    } else if (id === 'draw') {
      TYPES.forEach(function (ty) { runway(ty, t, ty === 'jet'); });
      var gl = clamp(u / .45), qq = clamp((u - .25) / .75) * .985;
      line(A_PATH.seg(qq, gl, 50), C.cyan, 3.4, .95);
      if (gl < 1) {
        var fp = A_PATH.at(gl);
        g.beginPath(); g.arc(fp[0], fp[1], 16, 0, 7); g.fillStyle = 'rgba(255,255,255,.9)'; g.fill();
        g.beginPath(); g.arc(fp[0], fp[1], 30, 0, 7); g.strokeStyle = 'rgba(255,255,255,.3)'; g.lineWidth = 3; g.stroke();
      }
      trail(A_PATH.seg(Math.max(0, qq - .1), qq, 16), C.jet);
      p = A_PATH.at(qq); plane(p[0], p[1], p[2], 'jet');
      var bx2 = 60 - (VW + 160) * ease(u); trail([[bx2 + 160, 360], [bx2, 360]], C.wide); plane(bx2, 360, Math.PI, 'wide');
    } else if (id === 'butter') {
      TYPES.forEach(function (ty) { runway(ty, t, ty === 'jet'); });
      rings(RW.jet[0], RW.jet[1], u * 1.6);
      plane(RW.jet[0], RW.jet[1] - 6, Math.PI / 2, 'jet', null, 1 - ease(u * 2) * .6, 1 - .3 * ease(u * 2));
    } else if (id === 'story') {
      TYPES.forEach(function (ty) { runway(ty, t, false, .85); });
      var n = 0;
      storyFlights().forEach(function (fl) {
        var q2 = (u - (fl.land - .1)) / .1;
        if (q2 >= 0 && q2 <= 1) {
          trail(fl.path.seg(Math.max(0, q2 - .14), q2, 14), C[fl.type]);
          var pp = fl.path.at(q2); plane(pp[0], pp[1], pp[2], fl.type);
        }
        if (u >= fl.land) { n++; if (u - fl.land < .03) rings(RW[fl.type][0], RW[fl.type][1], (u - fl.land) * 22, false); }
      });
      counter(Math.max(1, n));
    } else if (id === 'radio') {
      // 무전 카드(왼쪽)와 겹치지 않게 오른쪽에서 22L 로 내려오는 국적기
      TYPES.forEach(function (ty) { runway(ty, t, ty === 'wide', .7); });
      var rp = bez([[Math.max(380, VW * .8), -40], [Math.max(330, VW * .55), 260], [300, 560], [RW.wide[0], RW.wide[1]]]);
      var q3 = clamp(u * .95);
      trail(rp.seg(Math.max(0, q3 - .12), q3, 16), C.wide);
      p = rp.at(q3); plane(p[0], p[1], p[2], 'wide', null, 1, 1.2);
      roundel(p[0] - Math.cos(p[2]) * 2, p[1] - Math.sin(p[2]) * 2, 5);
    } else if (id === 'skins') {
      TYPES.forEach(function (ty) { runway(ty, t, false); });
      ambient(t, 1, 5);
    } else if (id === 'play') {
      drawPlay(t);
    }
    g.restore();
    if (id === 'butter' && !REDUCED && u < .25) {   // BUTTER 진입 순간 골드 플래시
      g.setTransform(DPR, 0, 0, DPR, 0, 0);
      g.fillStyle = rgba(C.butter, .35 * (1 - u / .25)); g.fillRect(0, 0, W, H);
      edgeFlash(C.butter, .6 * (1 - u / .25));
    }
  }

  // ── 기능 카드 미니 데모 — 보일 때만 그린다 ──────────────────────────────────
  var minis = [];
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      e.target._vis = e.isIntersecting;
      if (e.isIntersecting) e.target.closest('.card').classList.add('in');
    });
  }, { rootMargin: '120px' }) : null;
  function setupMinis() {
    minisDirty = false;
    if (io) io.disconnect();
    minis = Array.prototype.slice.call(root.querySelectorAll('canvas[data-demo]')).map(function (c) {
      if (io) io.observe(c); else { c._vis = true; c.closest('.card').classList.add('in'); }
      return { c: c, x: c.getContext('2d'), demo: c.dataset.demo, w: 0, h: 0, cache: {} };
    });
  }
  function memo(m, key, fn) { return m.cache[key] || (m.cache[key] = fn()); }
  function miniBg(cw, ch, demo, t) {
    var pal = SKINS[0];
    if (demo === 'skins') {
      var n = SKINS.length, f = (t / 2.2) % n, i = Math.floor(f), k = ease((f - i - .75) / .25);
      pal = SKINS[i].map(function (c, j) { return mix(c, SKINS[(i + 1) % n][j], k); });
    }
    if (demo === 'radio') pal = [SKINS[0][0], mix(SKINS[0][1], hex('#2a1a08'), .6), C.amber];
    if (demo === 'butter') pal = [SKINS[0][0], SKINS[0][1], C.butter];
    var gr = g.createLinearGradient(0, 0, 0, ch); gr.addColorStop(0, rgba(pal[0])); gr.addColorStop(1, rgba(pal[1]));
    g.fillStyle = gr; g.fillRect(0, 0, cw, ch);
    gr = g.createRadialGradient(cw / 2, ch, 0, cw / 2, ch, ch * 1.1);
    gr.addColorStop(0, rgba(pal[2], .3)); gr.addColorStop(1, rgba(pal[2], 0));
    g.fillStyle = gr; g.fillRect(0, 0, cw, ch);
    g.strokeStyle = 'rgba(255,255,255,.04)'; g.lineWidth = 1; g.beginPath();
    for (var x = 16; x < cw; x += 32) { g.moveTo(x, 0); g.lineTo(x, ch); }
    for (var y = 16; y < ch; y += 32) { g.moveTo(0, y); g.lineTo(cw, y); }
    g.stroke();
  }
  var MINI = {
    // 1) 선을 긋고 → 비행기가 따라가 → 착륙
    draw: function (t, wh, m) {
      var P = 4.2, u = (t % P) / P, rx = 95, ry = wh - 50;
      runway('prop', t, false, .45, [-120, ry, 'RWY 04L'], 1.05);
      runway('jet', t, true, 1, [rx, ry, 'RWY 13R'], 1.05);
      var path = memo(m, 'p' + Math.round(wh), function () { return bez([[-175, 34], [10, 20], [rx - 40, ry - 120], [rx, ry]]); });
      var gl = clamp(u / .35), qq = clamp((u - .28) / .58) * .99, fade = 1 - clamp((u - .88) / .08);
      line(path.seg(qq, gl, 40), C.cyan, 2.4, fade);
      if (gl < 1) {
        var fp = path.at(gl);
        g.beginPath(); g.arc(fp[0], fp[1], 9, 0, 7); g.fillStyle = 'rgba(255,255,255,.9)'; g.fill();
        g.beginPath(); g.arc(fp[0], fp[1], 17, 0, 7); g.strokeStyle = 'rgba(255,255,255,.3)'; g.lineWidth = 2; g.stroke();
      }
      if (u < .87) { trail(path.seg(Math.max(0, qq - .12), qq, 12), C.jet); var p = path.at(qq); plane(p[0], p[1], p[2], 'jet', null, 1, .75); }
      else rings(rx, ry, (u - .87) * P, false);
    },
    // 2) 접지 → 골드 링 → BUTTER 슬램
    butter: function (t, wh, m) {
      var P = 3.4, u = (t % P) / P, rx = 0, ry = wh - 58, td = .45;
      runway('wide', t, true, 1, [rx, ry, 'RWY 22L'], 1.15);
      if (u < td) {
        var pth = memo(m, 'p' + Math.round(wh), function () { return bez([[-190, 26], [-90, 40], [-12, ry - 100], [rx, ry]]); });
        var qq = u / td; trail(pth.seg(Math.max(0, qq - .2), qq, 16), C.wide);
        var p = pth.at(qq); plane(p[0], p[1], p[2], 'wide', null, 1, .8);
      } else {
        var dt = (u - td) * P, ty = Math.min(62, wh * .3);
        rings(rx, ry, dt, true);
        plane(rx, ry - 4, Math.PI / 2, 'wide', null, Math.max(0, 1 - dt * .8), .8 - .2 * ease(dt));
        var s = 1 + .4 * Math.exp(-dt * 14);
        g.save(); g.translate(0, ty); g.scale(s, s);
        txt('BUTTER', 0, 0, 50, C.butter, clamp(2 - dt), 'center', 900);
        g.restore();
        txt('PERFECT  ×1.5', 0, ty + 36, 13, C.white, .7 * clamp(2 - dt));
      }
    },
    // 3) 안개 · 돌풍 · 우선착륙기 · 골든 플레인
    twist: function (t, wh) {
      var i, x, y, gr;
      for (i = 0; i < 5; i++) {
        x = ((t * 16 + i * 130) % 650) - 325; y = 30 + (i * 57) % Math.max(60, wh - 50);
        gr = g.createRadialGradient(x, y, 0, x, y, 95);
        gr.addColorStop(0, 'rgba(200,215,240,.12)'); gr.addColorStop(1, 'rgba(200,215,240,0)');
        g.fillStyle = gr; g.fillRect(x - 95, y - 95, 190, 190);
      }
      g.lineCap = 'round';
      for (i = 0; i < 8; i++) {
        x = ((t * 170 + i * 67) % 520) - 260; y = 24 + (i * 41) % Math.max(60, wh - 40);
        g.beginPath(); g.moveTo(x, y); g.lineTo(x + 36, y); g.strokeStyle = 'rgba(255,255,255,.16)'; g.lineWidth = 2; g.stroke();
      }
      var px = -95 + Math.sin(t * .8) * 22, py = wh * .42 + Math.sin(t * 2.4) * 7, pr = 26 + 5 * Math.sin(t * 6);
      g.beginPath(); g.arc(px, py, pr, 0, 7); g.strokeStyle = rgba(C.warn, .75); g.lineWidth = 2; g.stroke();
      plane(px, py, .25 + Math.sin(t * 2.4) * .15, 'jet', null, 1, .7);
      txt(L[lang].prio, px, py - pr - 14, 14, C.warn);
      var gx = 105 + Math.cos(t * .7) * 20, gy = wh * .6 + Math.sin(t * 1.3) * 10;
      gr = g.createRadialGradient(gx, gy, 0, gx, gy, 46);
      gr.addColorStop(0, rgba(C.butter, .35)); gr.addColorStop(1, rgba(C.butter, 0));
      g.fillStyle = gr; g.fillRect(gx - 46, gy - 46, 92, 92);
      plane(gx, gy, Math.PI + .35, 'prop', C.butter, 1, .95);
      for (var k = 0; k < 3; k++) {
        var a = t * 3 + k * 2.1, sx = gx + Math.cos(a) * 30, sy = gy + Math.sin(a * 1.3) * 22, ss = 3 + 2 * Math.sin(t * 8 + k);
        g.beginPath(); g.moveTo(sx - ss, sy); g.lineTo(sx + ss, sy); g.moveTo(sx, sy - ss); g.lineTo(sx, sy + ss);
        g.strokeStyle = rgba(C.butter, .9); g.lineWidth = 1.5; g.stroke();
      }
      txt(L[lang].gold, gx, gy + 38, 14, C.butter);
    },
    // 4) 랭킹을 한 칸씩 올라가고 → 업적 배지
    rank: function (t, wh) {
      var P = 6, u = (t % P) / P;
      var you = 61200 + Math.round(ease(clamp((u - .1) / .5)) * 9000);
      var rows = [['ATC_KIM', 68420, 0], ['YOU', you, 1], ['JFK_TWR', 59870, 0], ['BUTTER99', 55310, 0]]
        .sort(function (a, b) { return b[1] - a[1]; });
      var top = 24, rh = Math.min(34, (wh - 44) / 4.4);
      rows.forEach(function (r, i) {
        var y = top + i * rh, me = r[2], col = me ? C.amber : C.white;
        if (me) { rrect(-188, y - rh * .42, 376, rh * .84, 8); g.fillStyle = rgba(C.amber, .14); g.fill(); g.strokeStyle = rgba(C.amber, .6); g.lineWidth = 1.5; g.stroke(); }
        txt(String(i + 1), -168, y, 15, col, me ? 1 : .55);
        txt(r[0], -148, y, 14, col, me ? 1 : .75, 'left');
        rrect(-30, y - 4, 130 * (r[1] / 71000), 8, 4); g.fillStyle = rgba(col, me ? .9 : .18); g.fill();
        txt(r[1].toLocaleString('en-US'), 182, y, 14, col, me ? 1 : .7, 'right');
      });
      var bu = (u - .66) / .3;
      if (bu > 0 && bu < 1) {
        var bx = 150, by = wh - 30, sc = 1 + .5 * Math.exp(-bu * 10), a = Math.min(1, (1 - bu) * 4);
        g.save(); g.translate(bx, by); g.scale(sc, sc);
        g.beginPath();
        for (var k = 0; k < 6; k++) {
          var an = Math.PI / 6 + k * Math.PI / 3;
          if (k) g.lineTo(Math.cos(an) * 19, Math.sin(an) * 19); else g.moveTo(Math.cos(an) * 19, Math.sin(an) * 19);
        }
        g.closePath(); g.fillStyle = rgba(C.butter, a); g.fill();
        txt('★', 0, 1, 18, hex('#1a1300'), a);
        g.restore();
        txt(L[lang].achv, bx - 30, by, 14, C.butter, a, 'right');
      }
    },
    // 5) 레이더 팔레트 + 트레일 색이 바뀐다
    skins: function (t, wh) {
      var n = SKINS.length, i = Math.floor((t / 2.2) % n);
      var cols = [C.cyan, hex('#FF5A5A'), hex('#57E39A'), hex('#B98CFF'), C.butter, C.white];
      var pts = [];
      for (var k = 40; k >= 0; k--) { var a = t * 1.1 - k * .035; pts.push([Math.sin(a) * 140, wh * .44 + Math.sin(a * 2) * 46]); }
      line(pts, cols[i], 2.6, .9);
      var p1 = pts[pts.length - 2], p2 = pts[pts.length - 1];
      plane(p2[0], p2[1], Math.atan2(p2[1] - p1[1], p2[0] - p1[0]), 'jet', null, 1, .75);
      txt(L[lang].skinNames[i], -186, wh - 22, 14, C.amber, 1, 'left');
      SKINS.forEach(function (s, kk) {
        g.beginPath(); g.arc(68 + kk * 23, wh - 22, kk === i ? 8 : 6, 0, 7); g.fillStyle = rgba(s[2]); g.fill();
        if (kk === i) { g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 2; g.stroke(); }
      });
    },
    // 6) 영어 교신 → 한국어 안부가 한 글자씩
    radio: function (t, wh, m, hw) {
      var P = 7.5, s = t % P, out = 1 - clamp((s - (P - .5)) / .4);
      var wide = hw > 255, cx = wide ? -hw * .28 : 0;
      if (wide) {   // 가로로 긴 카드: 오른쪽에서 국적기가 22L 로 내려온다
        var rx = hw * .62, ry = wh - 46;
        runway('wide', t, true, .9, [rx, ry, 'RWY 22L'], 1.05);
        var pth = memo(m, 'r' + Math.round(hw), function () { return bez([[rx + 260, -30], [rx + 120, 40], [rx - 60, ry - 110], [rx, ry]]); });
        var qq = clamp(s / (P - .8));
        trail(pth.seg(Math.max(0, qq - .15), qq, 16), C.wide);
        var p = pth.at(qq); plane(p[0], p[1], p[2], 'wide', null, 1, .72); roundel(p[0] - Math.cos(p[2]) * 2, p[1] - Math.sin(p[2]) * 2, 3.4);
      }
      function card(y, h, label, en, ko, t0) {
        var a = clamp((s - t0) / .3) * out; if (a <= 0) return;
        var yy = y + 10 * (1 - ease((s - t0) / .4));
        rrect(cx - 186, yy, 372, h, 12); g.fillStyle = 'rgba(14,20,48,' + .95 * a + ')'; g.fill();
        g.strokeStyle = rgba(C.amber, .35 * a); g.lineWidth = 1; g.stroke();
        rrect(cx - 186, yy, 5, h, 3); g.fillStyle = rgba(C.amber, a); g.fill();
        g.beginPath(); g.arc(cx - 168, yy + 16, 4, 0, 7); g.fillStyle = rgba(C.radar, a); g.fill();
        txt(label, cx - 158, yy + 16, 12, C.amber, a, 'left');
        txt(en, cx - 170, yy + 35, 12.5, C.white, .7 * a, 'left', 500);
        var nch = Math.floor(clamp((s - t0 - .6) / 1.2) * ko.length);
        var caret = nch < ko.length && Math.floor(s * 4) % 2 ? '▍' : '';
        txt(ko.slice(0, nch) + caret, cx - 170, yy + h - 18, 18, C.butter, a, 'left', 800);
      }
      var h = Math.min(78, (wh - 32) / 2.15);
      card(12, h, 'TOWER · JFK', 'Korean Air 81, runway 4 Right, cleared to land.', '즐거운 한가위 되세요.', .2);
      card(24 + h, h, 'KOREAN AIR 81', 'Cleared to land 4 Right, Korean Air 81.', '감사합니다. 수고하세요!', 3.2);
    }
  };
  function drawMinis(t) {
    if (minisDirty) setupMinis();
    minis.forEach(function (m) {
      if (!m.c._vis) return;
      var cw = m.c.clientWidth, ch = m.c.clientHeight;
      if (!cw || !ch) return;
      if (m.w !== cw || m.h !== ch) { m.w = cw; m.h = ch; m.c.width = cw * DPR; m.c.height = ch * DPR; m.cache = {}; }
      // 세로 210·가로 400 이상이 보이도록. 가로로 긴 카드는 hw(반폭)가 넓어진다
      var k = Math.min(cw / 400, ch / 210), wh = ch / k, hw = cw / k / 2;
      g = m.x;
      try {
        g.setTransform(DPR, 0, 0, DPR, 0, 0);
        miniBg(cw, ch, m.demo, t);
        g.setTransform(k * DPR, 0, 0, k * DPR, cw / 2 * DPR, 0);
        MINI[m.demo](t, wh, m, hw);
      } finally { g = mainG; }
    });
  }

  // ── 스크롤 → 진행도(관성 보간) ───────────────────────────────────────────
  function stageH() { return storyEl.offsetHeight - window.innerHeight; }
  function storyTop() { return storyEl.getBoundingClientRect().top + window.scrollY; }
  function jumpTo(p) { window.scrollTo({ top: storyTop() + p * stageH(), behavior: REDUCED ? 'auto' : 'smooth' }); }
  var target = 0, cur = 0, last = performance.now();

  function frame(now) {
    if (!alive) return;
    var dt = Math.min(.05, (now - last) / 1000); last = now;
    target = clamp((window.scrollY - storyTop()) / stageH());
    var prev = cur;
    cur = REDUCED ? target : cur + (target - cur) * (1 - Math.exp(-dt * 9));
    if (Math.abs(target - cur) < 1e-4) cur = target;
    var vel = (cur - prev) / (dt || .016), t = now / 1000;
    sweep += dt * (1.1 + Math.min(14, Math.abs(vel) * 60));   // 휠을 굴리면 레이더가 빨라진다

    var ci = -1;
    for (var i = 0; i < CH.length; i++) if (cur >= CH[i][1] && cur < CH[i][2]) { ci = i; break; }
    if (ci < 0) ci = CH.length - 1;
    var id = CH[ci][0], u = clamp((cur - CH[ci][1]) / (CH[ci][2] - CH[ci][1]));
    inPlay = id === 'play';
    cv.style.touchAction = inPlay ? 'none' : 'auto';
    if (inPlay) stepPlay(dt, t);

    // 스토리 구간이 화면 밖이면 큰 캔버스는 쉬게 한다
    var sb = storyEl.getBoundingClientRect();
    if (sb.bottom > 0 && sb.top < window.innerHeight) scene(id, u, t);
    drawMinis(t);

    textEls.forEach(function (te) { te.el.classList.toggle('on', te.ch === id && u >= te.a && u < te.b + (te.b >= 1 ? 1 : 0)); });
    skinEl.classList.toggle('on', id === 'skins');
    r1.classList.toggle('on', id === 'radio' && u > .15);
    r2.classList.toggle('on', id === 'radio' && u > .5);
    heroLogo.style.opacity = id === 'hero' ? String(1 - ease((u - .55) / .45)) : '0';
    hint.style.opacity = id === 'hero' ? '1' : '0';
    cta.classList.toggle('on', id === 'cta');
    hud.classList.toggle('on', id === 'story' || id === 'play');
    if (id === 'play') { hudLabel.textContent = L[lang].hudYou; hudNum.textContent = play.landed; lastCnt = -1; }
    else if (id === 'story') hudLabel.textContent = L[lang].hudLanded;
    toastEl.style.opacity = inPlay && now - play.toastT < 900 ? '1' : '0';
    railBtns.forEach(function (bt, k) { bt.classList.toggle('on', k === ci); });
    bar.style.width = (cur * 100).toFixed(2) + '%';
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return {
    setLang: function (l) { l = l === 'en' ? 'en' : 'ko'; if (l !== lang) { lang = l; applyLang(); } },
    destroy: function () {
      alive = false;
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      if (io) io.disconnect();
      root.innerHTML = '';
    }
  };
}

window.T68Story = { mount: mount };
})();
