/* 웹 로켓 = 앱의 히어로 기체 3D(2026-11-04 유진 "앱에서 본 고퀄러티 에셋이 아니네" → three.js).
   앱 실사 VFX 4단계 부품(힉스필드 3D: 다리 · 엔진 · 에어브레이크 꽃잎, ARThing/tools/web_assets.cjs 로 줄임)과
   동체 실사 질감(hull_detail · hull_normal)을 그대로 쓴다.
   그리는 방법: WebGL 렌더러 하나를 모든 캔버스가 함께 쓴다 — 로켓이 차지하는 상자만 그려 2D 캔버스에 drawImage.
   그래서 사진 · 패드 · 발사대 · 불꽃 · 연기의 2D 합성 순서는 예전 그대로이고, 카메라는 2D View(E · f · r · u · F · cx · cy)를 그대로 옮긴다.
   불러오기 전 · WebGL 이 없으면 render.ts 의 2D 그림으로. */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

type Vec3 = [number, number, number];
export type Cam = { E: Vec3; f: Vec3; r: Vec3; u: Vec3; F: number; cx: number; cy: number; w: number; h: number };
export type Liv = { hull: string; accent: string; ink?: string; pattern?: string; bands?: [number, number, string][] };
export type Spec = {
  O: Vec3;
  lean: number;
  legs: number;
  soot: number;
  scale: number;
  R: number; // 동체 반지름
  h: number; // 몸통 길이 비율(기체 종류)
  nose: number;
  cls: 'standard' | 'heavy' | 'sprint' | 'twin';
  liv: Liv;
};

const BASE = '/rocketparking/3d/';
const HINGE = 0.045;
const LEG_LEN = 0.072;

type Part = { geo: THREE.BufferGeometry; mat: THREE.Material; box: THREE.Box3 };
let state: 'idle' | 'loading' | 'ready' | 'failed' = 'idle';
let renderer: THREE.WebGLRenderer | null = null;
let scene: THREE.Scene | null = null;
let camera: THREE.Camera | null = null;
let key: THREE.DirectionalLight | null = null;
let rim: THREE.DirectionalLight | null = null;
let fillLight: THREE.HemisphereLight | null = null;
let engineLight: THREE.PointLight | null = null;
let pmrem: THREE.PMREMGenerator | null = null;
let roomEnv: THREE.Texture | null = null;

/* ─── 장소 빛(IBL) — 2026-11-05 유진 "배경 불빛이 기체에 반사가 안 된다" ───
   사진 판이 있으면 그 사진으로 주변 반사를 만든다(앱 CameraIBL 과 같은 생각): 앞 반구 = 사진을 넓혀 펼침,
   뒤 반구 = 좌우 뒤집은 사진(이음매 없이). 밝은 곳(가로등 · 창 · 스탠드)은 HDR 처럼 키워 코팅에 맺히게 하고,
   가장 밝은 자리에서 테두리 빛, 사진 평균 밝기 · 색으로 정면 빛을 맞춘다. 사진이 없으면 예전 스튜디오 방. */
type PlateEnv = { tex: THREE.Texture; sx: number; sy: number; hot: THREE.Color; hotK: number; mean: number; avg: THREE.Color };
const envCache = new Map<string, PlateEnv>();
/** ibl = 이 장소 빛 세기 배율 · soft = 불빛 반사를 넓히는 정도(환경 그림 px) · coat = 코팅 거칠기(기본 0.08) */
type PlateLight = { img: HTMLImageElement; el: number; fovY: number; engine: number; engineColor: [number, number, number]; ibl?: number; soft?: number; coat?: number };
let plateNow: PlateLight | null = null;
const NO_IBL = typeof location !== 'undefined' && /[?&]ibl=0/.test(location.search); // 비교용 — 예전 스튜디오 방

/** drawOnPlate 가 기체를 그리기 전에 부른다 — null 이면 스튜디오 방 */
export function setRocketPlate(p: PlateLight | null) {
  plateNow = p;
}

const srgbToLin = (c: number) => (c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

function plateEnv(img: HTMLImageElement, el: number, fovY: number, soft = 0): PlateEnv | null {
  if (!renderer || !pmrem) return null;
  const ck = img.src + '|' + soft;
  const hit = envCache.get(ck);
  if (hit) return hit;
  const W = 512, H = 256;
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const c = cv.getContext('2d', { willReadFrequently: true });
  if (!c) return null;
  // 앞 반구(u 0.25…0.75) = 사진, 뒤(0.75…1 · 0…0.25) = 좌우 뒤집은 사진 — 경계에서 같은 쪽 가장자리끼리 만난다.
  // 세로는 실제 높이각에 — 사진 한 줄 = 카메라가 내려다본 각(el) ± 화각. 서 있는 원통은 수평 근처만 비추므로
  // 지평선 부근의 가로등 · 전조등이 그 줄에 와야 동체에 맺힌다(처음엔 사진을 위아래 끝까지 늘려 불빛이 위로 밀렸다).
  const half = document.createElement('canvas');
  half.width = W / 2;
  half.height = H;
  const hc = half.getContext('2d')!;
  const eTop = -el + fovY / 2, eBot = -el - fovY / 2;
  const yTop = Math.max(1, (0.5 - eTop / Math.PI) * H), yBot = Math.min(H - 1, (0.5 - eBot / Math.PI) * H);
  const iw = img.naturalWidth, ih = img.naturalHeight;
  hc.drawImage(img, 0, 0, iw, 2, 0, 0, W / 2, yTop); // 사진 위 = 하늘 · 천장을 천정까지
  hc.drawImage(img, 0, ih - 2, iw, 2, 0, yBot, W / 2, H - yBot); // 사진 아래 = 바닥을 천저까지
  hc.drawImage(img, 0, 0, iw, ih, 0, yTop, W / 2, yBot - yTop);
  c.drawImage(half, W * 0.25, 0);
  const fl = document.createElement('canvas');
  fl.width = W / 2;
  fl.height = H;
  const fc = fl.getContext('2d')!;
  fc.translate(W / 2, 0);
  fc.scale(-1, 1);
  fc.drawImage(half, 0, 0);
  c.drawImage(fl, W * 0.75, 0); // 오른쪽 끝에서 이어지고
  c.drawImage(fl, -W * 0.25, 0); // 둘레를 돌아 왼쪽 0.25 에서 사진 왼쪽 끝과 만난다
  const px = c.getImageData(0, 0, W, H).data;
  const n = W * H;
  const lin = new Float32Array(n * 3);
  const lums = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const r = srgbToLin(px[i * 4] / 255), g = srgbToLin(px[i * 4 + 1] / 255), b = srgbToLin(px[i * 4 + 2] / 255);
    lin[i * 3] = r;
    lin[i * 3 + 1] = g;
    lin[i * 3 + 2] = b;
    lums[i] = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  // 밝은 점만 HDR 처럼 — 사진마다 위 3% 밝기부터(밝은 대합실 전체가 '불빛'이 되지 않게).
  // 8비트 사진에선 가로등도 1.0 에서 잘려 반사가 흐렸다. 그 대신 전체 밝기는 원래 사진 근처로 되돌린다.
  const sorted = Float32Array.from(lums).sort();
  const cut = sorted[Math.floor(n * 0.97)], top = Math.max(cut + 1e-3, sorted[n - 1]);
  let mean0 = 0, mean1 = 0;
  const gain = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = Math.max(0, (lums[i] - cut) / (top - cut));
    gain[i] = 1 + 160 * t * t;
    mean0 += lums[i];
    mean1 += lums[i] * gain[i];
  }
  // 더해진 빛만 줄인다(사진 바탕은 그대로) — 불빛이 더한 에너지는 사진 평균의 6배까지
  const norm = Math.min(1, (6 * mean0) / Math.max(1e-6, mean1 - mean0));
  // 더한 빛(불빛)만 따로 — soft 만큼 번지게 하면 동체에 맺히는 줄이 굵어진다.
  // 실처럼 가는 줄은 기체가 움직일 때 화소 사이를 오가며 깜빡였다(2026-11-05 유진 '정류장 flickering').
  let add = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const e = (gain[i] - 1) * norm;
    add[i * 3] = lin[i * 3] * e;
    add[i * 3 + 1] = lin[i * 3 + 1] * e;
    add[i * 3 + 2] = lin[i * 3 + 2] * e;
  }
  if (soft > 0) {
    const r = Math.round(soft);
    const tmp = new Float32Array(n * 3);
    for (let pass = 0; pass < 2; pass++) {
      // 가로(둘레를 돌아 이어짐)
      for (let y = 0; y < H; y++)
        for (let ch = 0; ch < 3; ch++) {
          let acc = 0;
          for (let x = -r; x <= r; x++) acc += add[(y * W + ((x + W) % W)) * 3 + ch];
          for (let x = 0; x < W; x++) {
            tmp[(y * W + x) * 3 + ch] = acc / (2 * r + 1);
            acc += add[(y * W + ((x + r + 1) % W)) * 3 + ch] - add[(y * W + ((x - r + W) % W)) * 3 + ch];
          }
        }
      // 세로(위아래 끝은 붙잡음)
      const rv = Math.max(1, Math.round(r * 0.6));
      for (let x = 0; x < W; x++)
        for (let ch = 0; ch < 3; ch++) {
          let acc = 0;
          for (let y = -rv; y <= rv; y++) acc += tmp[(Math.min(H - 1, Math.max(0, y)) * W + x) * 3 + ch];
          for (let y = 0; y < H; y++) {
            add[(y * W + x) * 3 + ch] = acc / (2 * rv + 1);
            acc += tmp[(Math.min(H - 1, y + rv + 1) * W + x) * 3 + ch] - tmp[(Math.max(0, y - rv) * W + x) * 3 + ch];
          }
        }
    }
    // 번지며 낮아진 꼭대기를 조금 되돌린다
    const k = 1 + soft * 0.12;
    add = add.map((a) => a * k);
  }
  const data = new Uint16Array(n * 4);
  const avg = [0, 0, 0];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const o = ((H - 1 - y) * W + x) * 4; // 데이터 첫 줄 = 아래(천저)
      data[o] = THREE.DataUtils.toHalfFloat(lin[i * 3] + add[i * 3]);
      data[o + 1] = THREE.DataUtils.toHalfFloat(lin[i * 3 + 1] + add[i * 3 + 1]);
      data[o + 2] = THREE.DataUtils.toHalfFloat(lin[i * 3 + 2] + add[i * 3 + 2]);
      data[o + 3] = THREE.DataUtils.toHalfFloat(1);
      avg[0] += lin[i * 3];
      avg[1] += lin[i * 3 + 1];
      avg[2] += lin[i * 3 + 2];
    }
  }
  const lumSum = mean0;
  const tex = new THREE.DataTexture(data, W, H, THREE.RGBAFormat, THREE.HalfFloatType);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.LinearSRGBColorSpace;
  tex.magFilter = THREE.LinearFilter;
  tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  const env = pmrem.fromEquirectangular(tex).texture;
  tex.dispose();
  // 사진 자체에서 가장 밝은 자리(테두리 빛) — 작게 줄여 위 2% 의 밝기 가중 중심
  const sw = 48, sh = 27;
  const sc = document.createElement('canvas');
  sc.width = sw;
  sc.height = sh;
  const s2 = sc.getContext('2d', { willReadFrequently: true })!;
  s2.drawImage(img, 0, 0, sw, sh);
  const sp = s2.getImageData(0, 0, sw, sh).data;
  const lum: number[] = [];
  for (let i = 0; i < sw * sh; i++) lum.push(0.2126 * srgbToLin(sp[i * 4] / 255) + 0.7152 * srgbToLin(sp[i * 4 + 1] / 255) + 0.0722 * srgbToLin(sp[i * 4 + 2] / 255));
  const hotCut = [...lum].sort((a, b) => b - a)[Math.floor(sw * sh * 0.02)];
  let wx = 0, wy = 0, ws = 0;
  const hot = [0, 0, 0];
  for (let i = 0; i < sw * sh; i++) {
    if (lum[i] < hotCut) continue;
    const w = lum[i];
    wx += ((i % sw) + 0.5) * w;
    wy += (Math.floor(i / sw) + 0.5) * w;
    ws += w;
    hot[0] += srgbToLin(sp[i * 4] / 255) * w;
    hot[1] += srgbToLin(sp[i * 4 + 1] / 255) * w;
    hot[2] += srgbToLin(sp[i * 4 + 2] / 255) * w;
  }
  const hotC = new THREE.Color(hot[0] / ws, hot[1] / ws, hot[2] / ws);
  const hm = Math.max(hotC.r, hotC.g, hotC.b, 1e-4);
  const avgC = new THREE.Color(avg[0] / n, avg[1] / n, avg[2] / n);
  const am = Math.max(avgC.r, avgC.g, avgC.b, 1e-4);
  const out: PlateEnv = {
    tex: env,
    sx: wx / ws / sw,
    sy: wy / ws / sh,
    hot: hotC.multiplyScalar(1 / hm),
    hotK: ws / Math.max(1, Math.floor(sw * sh * 0.02)),
    mean: lumSum / n,
    avg: avgC.multiplyScalar(1 / am),
  };
  envCache.set(ck, out);
  return out;
}
const parts: Record<string, Part> = {};
let detailImg: HTMLImageElement | null = null;
let normalTex: THREE.Texture | null = null;

/** 처음 부르면 불러오기 시작 — 끝나면 true */
export function rocket3dReady(): boolean {
  if (state === 'idle' && typeof document !== 'undefined') void load();
  return state === 'ready';
}

async function load() {
  state = 'loading';
  try {
    const canvas = document.createElement('canvas');
    const r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, premultipliedAlpha: true, powerPreference: 'low-power' });
    r.setClearColor(0x000000, 0);
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 0.9;
    const s = new THREE.Scene();
    const pm = new THREE.PMREMGenerator(r);
    roomEnv = pm.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem = pm;
    s.environment = roomEnv;
    s.environmentIntensity = 0.42; // 너무 고르게 밝으면 원통이 납작한 흰 판처럼 보였다
    const k = new THREE.DirectionalLight(0xfff2e2, 2.6);
    k.position.set(0.5, 1, 0.6);
    s.add(k);
    s.add(k.target);
    const fill = new THREE.HemisphereLight(0xdfe8ff, 0x3a3028, 0.25);
    s.add(fill);
    const rm = new THREE.DirectionalLight(0xffffff, 0);
    s.add(rm);
    s.add(rm.target);
    const el = new THREE.PointLight(0xffaa55, 0, 0.5, 2);
    s.add(el);
    rim = rm;
    fillLight = fill;
    engineLight = el;
    const loader = new GLTFLoader();
    const grab = async (name: string) => {
      const g = await loader.loadAsync(BASE + name + '.glb');
      let mesh: THREE.Mesh | null = null;
      g.scene.traverse((o) => {
        if (!mesh && (o as THREE.Mesh).isMesh) mesh = o as THREE.Mesh;
      });
      if (!mesh) throw new Error('no mesh ' + name);
      const m = mesh as THREE.Mesh;
      m.geometry.computeBoundingBox();
      parts[name] = { geo: m.geometry, mat: m.material as THREE.Material, box: m.geometry.boundingBox!.clone() };
    };
    const img = (src: string) =>
      new Promise<HTMLImageElement>((res, rej) => {
        const i = new Image();
        i.onload = () => res(i);
        i.onerror = rej;
        i.src = src;
      });
    const [, , , d, n] = await Promise.all([grab('leg'), grab('engine'), grab('fin'), img(BASE + 'hull_detail.jpg'), img(BASE + 'hull_normal.jpg')]);
    detailImg = d;
    normalTex = new THREE.Texture(n);
    normalTex.wrapS = normalTex.wrapT = THREE.RepeatWrapping;
    normalTex.colorSpace = THREE.NoColorSpace;
    normalTex.needsUpdate = true;
    renderer = r;
    scene = s;
    key = k;
    const c = new THREE.Camera();
    c.matrixAutoUpdate = false;
    camera = c;
    state = 'ready';
  } catch (e) {
    console.warn('rocket3d', e);
    state = 'failed';
  }
}

/* ─── 기체 한 대(종류 · 도색마다 하나 — 바뀔 때만 다시 짓는다) ─── */
type Built = { root: THREE.Group; legs: THREE.Group[]; hullMats: THREE.MeshPhysicalMaterial[]; key: string };
const built = new Map<string, Built>();

/** 몸통 감싼 그림 — 도색 바탕색 · 무늬 · 띠 · YEAHPLUS 를 그리고 동체 세부(이음매 · 해치)를 곱한다.
    가로 = 둘레(three 원통의 θ: x = sinθ · z = cosθ), 세로 = 몸통 아래(0.062) → 위(hEnd) — 위가 그림 위 */
function hullTexture(liv: Liv, h: number): THREE.CanvasTexture {
  const W = 512, H = 1024;
  const cv = document.createElement('canvas');
  cv.width = W;
  cv.height = H;
  const g = cv.getContext('2d')!;
  g.fillStyle = liv.hull;
  g.fillRect(0, 0, W, H);
  const u0 = 0.062, u1 = 0.062 + 0.143 * h;
  const U = (u: number) => 0.062 + (u - 0.062) * h;
  const yOf = (u: number) => H * (1 - (u - u0) / (u1 - u0));
  // 2D 무늬의 둘레 t(0…1, th = 2πt) → three 둘레 u3 = 0.25 − t
  const xOf = (t: number) => ((((0.25 - t) % 1) + 1) % 1) * W;
  const band = (b0: number, b1: number) => [yOf(U(b1)), yOf(U(b0))] as const;
  const pu0 = U(0.068), pu1 = U(0.158);
  const PH = pu1 - pu0;
  const cellRect = (t0: number, t1: number, h0: number, h1: number) => {
    const y0 = yOf(pu0 + h1 * PH), y1 = yOf(pu0 + h0 * PH);
    const xa = xOf(t1), xb = xOf(t0);
    if (xb >= xa) g.fillRect(xa, y0, xb - xa, y1 - y0);
    else {
      g.fillRect(xa, y0, W - xa, y1 - y0);
      g.fillRect(0, y0, xb, y1 - y0);
    }
  };
  const strip = (h0: number, h1: number, on: (t: number) => boolean, n = 64) => {
    for (let i = 0; i < n; i++) if (on((i + 0.5) / n)) cellRect(i / n, (i + 1) / n, h0, h1);
  };
  g.fillStyle = liv.accent;
  const p = liv.pattern;
  const circ = 2 * Math.PI * 0.0112;
  if (p === 'checker') {
    const a = circ / 16 / PH;
    for (let row = 0; row < 2; row++) for (const base of [row * a, 1 - (row + 1) * a]) strip(base, base + a, (t) => (Math.floor(t * 16) + row) % 2 === 0, 64);
  } else if (p === 'hazard') {
    const bandH = 0.2, n = 18;
    for (const y0 of [0, 1 - bandH])
      for (let j = 0; j < 4; j++) strip(y0 + (j / 4) * bandH, y0 + ((j + 1) / 4) * bandH, (t) => (t * n + (j / 4) * 0.5) % 1 < 0.5, 72);
  } else if (p === 'crosswalk') {
    for (const [h0, h1] of [[0, 0.26], [0.74, 1]]) strip(h0, h1, (t) => Math.floor(t * 12) % 2 === 0, 48);
  } else if (p === 'pinstripe') {
    for (const y of [0.06, 0.28, 0.72, 0.94]) strip(y, y + 0.025, () => true, 48);
  } else if (p === 'stencil') {
    for (const [h0, h1] of [[0.1, 0.19], [0.81, 0.9]]) strip(h0, h1, () => true, 48);
  } else if (p === 'petals') {
    const hs = (n: number) => {
      const x = Math.sin(n * 127.1) * 43758.5453;
      return x - Math.floor(x);
    };
    for (let i = 0; i < 70; i++) {
      const t = hs(i * 3.1 + 11), hh = hs(i * 7.7 + 5);
      if (Math.abs(hh - 0.5) < 0.16) continue;
      const r = (0.0022 + 0.0024 * hs(i + 2)) / circ * W;
      g.save();
      g.translate(xOf(t), yOf(pu0 + hh * PH));
      g.rotate(hs(i + 9) * Math.PI);
      g.beginPath();
      g.ellipse(0, 0, r, r * 0.55, 0, 0, Math.PI * 2);
      g.fill();
      g.restore();
    }
  }
  // 라임 띠
  for (const [b0, b1, c] of liv.bands ?? [
    [0.168, 0.176, liv.accent],
    [0.188, 0.192, liv.accent],
  ]) {
    const [ya, yb] = band(b0, b1);
    g.fillStyle = c;
    g.fillRect(0, ya, W, yb - ya);
  }
  // YEAHPLUS — 동체 앞뒤 두 곳(2D 와 같은 자리 th = ±π/2 → u3 = 0 · 0.5), 아래에서 위로 읽는 세로 글자
  g.fillStyle = liv.ink ?? 'rgba(20,22,26,.82)';
  const fsz = W * 0.11;
  g.font = `800 ${fsz}px ui-monospace,Menlo,monospace`;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  for (const x of [0, W * 0.5, W]) {
    g.save();
    g.translate(x, yOf(U(0.113)));
    g.rotate(-Math.PI / 2);
    g.fillText('YEAHPLUS', 0, 0);
    g.restore();
  }
  // 동체 세부(흑백) 곱하기 — 둘레 1바퀴, 높이는 두 번 반복(앱 UV 와 같은 비율)
  if (detailImg) {
    g.globalCompositeOperation = 'multiply';
    const reps = Math.max(1, Math.round((u1 - u0) / circ));
    for (let i = 0; i < reps; i++) g.drawImage(detailImg, 0, (H / reps) * i, W, H / reps);
    g.globalCompositeOperation = 'source-over';
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function physical(color: string | THREE.Color, extra: Partial<THREE.MeshPhysicalMaterialParameters> = {}) {
  return new THREE.MeshPhysicalMaterial({ color, roughness: 0.3, metalness: 0, ior: 1.6, clearcoat: 0.85, clearcoatRoughness: 0.08, ...extra });
}

function build(s: Spec): Built {
  const R = s.R, h = s.h;
  const hEnd = 0.062 + 0.143 * h, top = hEnd + 0.035 * s.nose;
  const root = new THREE.Group();
  const hullMats: THREE.MeshPhysicalMaterial[] = [];
  // 동체 몸통 — 도색 그림 + 노멀
  const bodyH = hEnd - 0.062;
  const nt = normalTex!.clone();
  nt.needsUpdate = true;
  nt.repeat.set(1, Math.max(1, bodyH / (2 * Math.PI * R)));
  const bodyMat = physical('#ffffff', { map: hullTexture(s.liv, h), normalMap: nt, normalScale: new THREE.Vector2(0.8, 0.8) });
  hullMats.push(bodyMat);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(R, R, bodyH, 64, 1, true), bodyMat);
  body.position.y = 0.062 + bodyH / 2;
  root.add(body);
  // 코
  const noseMat = physical(s.liv.hull);
  hullMats.push(noseMat);
  const nose = new THREE.Mesh(new THREE.ConeGeometry(R, top - hEnd, 64), noseMat);
  nose.position.y = hEnd + (top - hEnd) / 2;
  root.add(nose);
  // 아래 그을린 토막 · 추력판
  const soot = new THREE.Mesh(new THREE.CylinderGeometry(R, R, 0.062 - 0.0455, 48), new THREE.MeshStandardMaterial({ color: '#5a5048', roughness: 0.8 }));
  soot.position.y = (0.062 + 0.0455) / 2;
  root.add(soot);
  const plate = new THREE.Mesh(new THREE.CylinderGeometry(R * 1.04, R * 1.04, 0.0025, 48), new THREE.MeshStandardMaterial({ color: '#34363b', roughness: 0.5, metalness: 0.6 }));
  plate.position.y = 0.0442;
  root.add(plate);
  // 헤비 — 옆 탱크 둘
  if (s.cls === 'heavy')
    for (const sg of [-1, 1]) {
      const th = 0.143 * h * 0.62, tr = R * 0.42;
      const tank = new THREE.Mesh(new THREE.CylinderGeometry(tr, tr, th, 32), physical(s.liv.hull));
      tank.position.set(sg * R * 1.3, 0.03 + th / 2, 0);
      const cap = new THREE.Mesh(new THREE.ConeGeometry(tr, 0.143 * h * 0.1, 32), physical(s.liv.accent));
      cap.position.set(sg * R * 1.3, 0.03 + th + 0.143 * h * 0.05, 0);
      root.add(tank, cap);
    }
  // 엔진 — 노즐 출구 = 바닥(0), 출구 지름에 맞춘다(위쪽 터보펌프는 동체 안으로). 쌍발은 둘
  const eng = parts.engine;
  const bellK = s.cls === 'twin' ? 0.62 : 1;
  const ex = eng.box.max.clone().sub(eng.box.min), ec = eng.box.getCenter(new THREE.Vector3());
  const ek = (2 * 0.0105 * s.R / 0.0112 * bellK) / Math.max(ex.x, ex.z);
  for (const x of s.cls === 'twin' ? [-R * 0.46, R * 0.46] : [0]) {
    const m = new THREE.Mesh(eng.geo, eng.mat);
    m.scale.setScalar(ek);
    m.position.set(x - ec.x * ek, -(ec.y - ex.y / 2) * ek, -ec.z * ek);
    root.add(m);
  }
  // 다리 넷 — 힌지(동체 바깥 · 높이 0.045)에서 접힘 = 위로, 펴짐 = 바깥 · 아래 125°. GLB: 높이 1 · 힌지 위 → 뒤집는다
  const leg = parts.leg;
  const legs: THREE.Group[] = [];
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2;
    const pivot = new THREE.Group();
    pivot.position.set(Math.cos(a) * R, HINGE, Math.sin(a) * R);
    pivot.rotation.y = -a; // +x 가 바깥
    const swing = new THREE.Group();
    const m = new THREE.Mesh(leg.geo, leg.mat);
    m.scale.set(LEG_LEN * 0.8, LEG_LEN, LEG_LEN * 0.8);
    m.rotation.x = Math.PI;
    m.position.y = LEG_LEN / 2;
    swing.add(m);
    pivot.add(swing);
    root.add(pivot);
    legs.push(swing);
  }
  // 에어브레이크 꽃잎 넷 — 위쪽 동체를 따라 눕고 아래 끝이 힌지, 6° 벌림
  const fin = parts.fin;
  const fx = fin.box.max.clone().sub(fin.box.min), fc = fin.box.getCenter(new THREE.Vector3());
  const fk = (0.034 * Math.min(1, s.h + 0.2)) / fx.y; // 꽃잎 길이 ≈ 3.4cm — 몸통 위쪽에 눕는다(코까지 올라가면 떠 보였다)
  for (let i = 0; i < 4; i++) {
    const th = (i * Math.PI) / 2;
    const r0 = new THREE.Group();
    r0.position.set(Math.cos(th) * R, hEnd - 0.036 * h - 0.004, Math.sin(th) * R);
    r0.rotation.y = Math.PI / 2 - th;
    const tilt = new THREE.Group();
    tilt.rotation.x = (2 * Math.PI) / 180;
    const m = new THREE.Mesh(fin.geo, fin.mat);
    m.scale.setScalar(fk);
    m.position.set(-fc.x * fk, -(fc.y - fx.y / 2) * fk, (fx.z / 2 - fc.z) * fk * 0.6); // 안쪽 면이 동체에 살짝 묻히게
    tilt.add(m);
    r0.add(tilt);
    root.add(r0);
  }
  return { root, legs, hullMats, key: '' };
}

/** 이번 그림의 빛 — 사진 판이면 그 사진의 반사 · 밝기 · 색, 아니면 스튜디오 방 */
function lightForPlate(v: Cam, s: Spec) {
  const pe = plateNow && !NO_IBL ? plateEnv(plateNow.img, plateNow.el, plateNow.fovY, plateNow.soft ?? 0) : null;
  const sc = scene!;
  const coat = plateNow && !NO_IBL ? (plateNow.coat ?? 0.08) : 0.08;
  for (const [, o] of built) for (const m of o.hullMats) m.clearcoatRoughness = coat;
  if (!pe) {
    sc.environment = roomEnv;
    sc.environmentIntensity = 0.42;
    sc.environmentRotation.set(0, 0, 0);
    key!.color.set(0xfff2e2);
    key!.intensity = 2.6;
    fillLight!.intensity = 0.25;
    rim!.intensity = 0;
    engineLight!.intensity = 0;
    return;
  }
  sc.environment = pe.tex;
  // 사진 가운데(환경 +x)가 카메라가 보는 쪽(수평)으로 — 셰이더는 R_y(−θ)·방향으로 찾는다
  sc.environmentRotation.set(0, Math.atan2(-v.f[2], v.f[0]), 0);
  // 사진이 이제 빛 — 평균 밝기로 세기를 맞춘다(밤 정류장은 어둡게 · 낮 책상은 밝게)
  const m = Math.min(1, pe.mean / 0.22);
  const ib = plateNow!.ibl ?? 1; // 장소마다 눈으로 맞춘 배율(대합실은 밝은 바닥 · 천장이 사방에서 비춰 넘쳤다)
  sc.environmentIntensity = (0.7 + 0.2 * m) * ib;
  key!.color.copy(pe.avg).lerp(new THREE.Color(1, 1, 1), 0.35);
  key!.intensity = (0.15 + 1.65 * Math.pow(m, 1.5)) * ib; // 밤엔 정면 빛을 줄여 불빛 반사가 묻히지 않게
  fillLight!.intensity = (0.08 + 0.12 * m) * ib;
  // 테두리 빛 — 사진에서 가장 밝은 자리 쪽(기체 뒤 먼 곳)에서
  const tanY = Math.tan((plateNow!.fovY || 0.74) / 2);
  const tanX = tanY * (plateNow!.img.naturalWidth / Math.max(1, plateNow!.img.naturalHeight));
  const ax = (pe.sx - 0.5) * 2 * tanX, ay = -(pe.sy - 0.5) * 2 * tanY;
  const d: Vec3 = [v.f[0] + v.r[0] * ax + v.u[0] * ay, v.f[1] + v.r[1] * ax + v.u[1] * ay, v.f[2] + v.r[2] * ax + v.u[2] * ay];
  rim!.position.set(s.O[0] + d[0], s.O[1] + Math.max(0.2, d[1]) + 0.1, s.O[2] + d[2]);
  rim!.target.position.set(s.O[0], s.O[1] + 0.1, s.O[2]);
  rim!.color.copy(pe.hot);
  rim!.intensity = Math.min(3, 0.6 + 2.2 * pe.hotK) * ib;
  // 엔진 불빛이 동체 아래 · 다리를 비춘다
  const g = plateNow!.engine;
  engineLight!.intensity = g > 0.01 ? 0.06 * g * s.scale : 0;
  engineLight!.position.set(s.O[0], s.O[1] - 0.01 * s.scale, s.O[2]);
  engineLight!.distance = 0.4 * s.scale;
  const [er, eg, eb] = plateNow!.engineColor;
  engineLight!.color.setRGB(er / 255, eg / 255, eb / 255, THREE.SRGBColorSpace);
}

const camMat = new THREE.Matrix4();
const projMat = new THREE.Matrix4();

/** 로켓을 3D 로 그려 ctx 에 붙인다. 못 그리면 false(부른 쪽이 2D 로) */
export function drawRocket3d(ctx: CanvasRenderingContext2D, v: Cam, s: Spec): boolean {
  if (state !== 'ready' || !renderer || !scene || !camera) return false;
  const bkey = `${s.cls}|${s.liv.hull}|${s.liv.accent}|${s.liv.ink ?? ''}|${s.liv.pattern ?? ''}|${JSON.stringify(s.liv.bands ?? '')}`;
  let b = built.get(bkey);
  if (!b) {
    b = build(s);
    b.key = bkey;
    built.set(bkey, b);
    if (built.size > 8) {
      const first = built.keys().next().value as string;
      const old = built.get(first);
      if (old && old !== b) {
        old.root.removeFromParent();
        built.delete(first);
      }
    }
  }
  // 이번 그림의 자세
  for (const [, o] of built) o.root.visible = o === b;
  if (b.root.parent !== scene) scene.add(b.root);
  b.root.position.set(s.O[0], s.O[1], s.O[2]);
  b.root.rotation.set(0, 0, -s.lean);
  b.root.scale.setScalar(s.scale);
  const legAng = Math.max(0, Math.min(1, s.legs)) * ((125 * Math.PI) / 180);
  for (const l of b.legs) l.rotation.z = -legAng;
  const sootK = Math.max(0, Math.min(1, s.soot));
  // 그을음 — 각 재질의 원래 색에 곱한다(코는 도색 색, 몸통은 흰색 × 그림)
  for (const m of b.hullMats) {
    const base = (m.userData.base as THREE.Color | undefined) ?? (m.userData.base = m.color.clone());
    m.color.setRGB(base.r * (1 - 0.35 * sootK), base.g * (1 - 0.4 * sootK), base.b * (1 - 0.45 * sootK));
  }

  // 화면에서 로켓이 차지하는 상자(다리 끝까지) — 그 크기만 그린다
  const P = (p: Vec3) => {
    const d: Vec3 = [p[0] - v.E[0], p[1] - v.E[1], p[2] - v.E[2]];
    const z = Math.max(0.02, d[0] * v.f[0] + d[1] * v.f[1] + d[2] * v.f[2]);
    return [v.cx + ((d[0] * v.r[0] + d[1] * v.r[1] + d[2] * v.r[2]) / z) * v.F, v.cy - ((d[0] * v.u[0] + d[1] * v.u[1] + d[2] * v.u[2]) / z) * v.F];
  };
  b.root.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(b.root);
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (let i = 0; i < 8; i++) {
    const q = P([i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z]);
    x0 = Math.min(x0, q[0]);
    y0 = Math.min(y0, q[1]);
    x1 = Math.max(x1, q[0]);
    y1 = Math.max(y1, q[1]);
  }
  const pad = 4;
  x0 = Math.max(0, Math.floor(x0 - pad));
  y0 = Math.max(0, Math.floor(y0 - pad));
  x1 = Math.min(v.w, Math.ceil(x1 + pad));
  y1 = Math.min(v.h, Math.ceil(y1 + pad));
  const bw = x1 - x0, bh = y1 - y0;
  if (bw < 6 || bh < 6) return false;
  if (bw > 2400 || bh > 2400) return false;

  // 렌더러 크기 — 64px 단위로 넉넉히(자주 다시 잡지 않게)
  const cw = Math.ceil(bw / 64) * 64, ch = Math.ceil(bh / 64) * 64;
  const size = renderer.getSize(new THREE.Vector2());
  if (size.x < cw || size.y < ch) renderer.setSize(Math.max(cw, size.x), Math.max(ch, size.y), false);
  const GH = renderer.domElement.height;

  // 카메라 = 2D View: 세계 → 카메라(오른쪽 r · 위 u · 뒤 −f), 그리고 상자만 보는 투영
  camMat.set(v.r[0], v.u[0], -v.f[0], v.E[0], v.r[1], v.u[1], -v.f[1], v.E[1], v.r[2], v.u[2], -v.f[2], v.E[2], 0, 0, 0, 1);
  camera.matrixWorld.copy(camMat);
  camera.matrixWorldInverse.copy(camMat).invert();
  const n = 0.005, far = 50;
  const ox = (2 * (v.cx - x0)) / bw - 1, oy = 1 - (2 * (v.cy - y0)) / bh;
  projMat.set((2 * v.F) / bw, 0, -ox, 0, 0, (2 * v.F) / bh, -oy, 0, 0, 0, -(far + n) / (far - n), (-2 * far * n) / (far - n), 0, 0, -1, 0);
  camera.projectionMatrix.copy(projMat);
  camera.projectionMatrixInverse.copy(projMat).invert();
  // 키 빛 — 화면 왼쪽 위 · 카메라 쪽에서(사진 대부분이 그쪽이 밝다)
  key!.position.set(s.O[0] - v.r[0] * 0.5 + v.u[0] * 0.8 - v.f[0] * 0.4, s.O[1] - v.r[1] * 0.5 + v.u[1] * 0.8 - v.f[1] * 0.4, s.O[2] - v.r[2] * 0.5 + v.u[2] * 0.8 - v.f[2] * 0.4);
  key!.target.position.set(s.O[0], s.O[1] + 0.1, s.O[2]);
  lightForPlate(v, s);

  renderer.setViewport(0, 0, bw, bh);
  renderer.setScissor(0, 0, bw, bh);
  renderer.setScissorTest(true);
  renderer.clear();
  renderer.render(scene, camera);
  // WebGL 원점은 왼쪽 아래 — 캔버스 그림에서는 아래쪽 bh 줄
  ctx.drawImage(renderer.domElement, 0, GH - bh, bw, bh, x0, y0, bw, bh);
  return true;
}
