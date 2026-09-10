#!/usr/bin/env python3
"""Forge 5종의 '한 판의 흐름' 파이프라인을 한 템플릿에서 찍어낸다.

각 게임은 route group 마다 CSS 가 격리돼 있고 프리픽스와 변수 이름이 조금씩
다르다(wordforge 에는 --wf-accent 가 없고, pipforge 에는 --pf-panel2 가 없다).
그래서 게임마다 앞머리에서 --pl-* 토큰으로 한 번 매핑하고, 그 아래 CSS 는
다섯 게임이 글자 단위로 같다. 단계 수(N)만 4/5 로 다르므로 키프레임의 퍼센트는
'단계 하나 = 100/N %' 를 기준으로 계산해 찍는다.
"""

import os, re

# 이 스크립트는 <repo>/scripts/ 에 있다 — 저장소 루트는 한 단계 위.
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ── 게임별 설정 ───────────────────────────────────────────────────────────────
GAMES = {
    "wordforge": dict(p="wf", vars=dict(
        bg="--wf-bg", panel="--wf-panel", panel2="--wf-panel2", line="--wf-line",
        ink="--wf-ink", dim="--wf-dim", gold="--wf-gold", amber="--wf-amber",
        accent="--wf-gold", red="--wf-amber")),
    "pipforge": dict(p="pf", vars=dict(
        bg="--pf-bg", panel="--pf-panel", panel2="--pf-bg2", line="--pf-line",
        ink="--pf-ink", dim="--pf-dim", gold="--pf-gold", amber="--pf-amber",
        accent="--pf-gold", red="--pf-amber")),
    "aceforge": dict(p="af", vars=dict(
        bg="--af-bg", panel="--af-panel", panel2="--af-panel2", line="--af-line",
        ink="--af-ink", dim="--af-dim", gold="--af-gold", amber="--af-amber",
        accent="--af-accent", red="--af-red")),
    "jadeforge": dict(p="jf", vars=dict(
        bg="--jf-bg", panel="--jf-panel", panel2="--jf-panel2", line="--jf-line",
        ink="--jf-ink", dim="--jf-dim", gold="--jf-gold", amber="--jf-amber",
        accent="--jf-accent", red="--jf-red")),
    "mineforge": dict(p="mf", vars=dict(
        bg="--mf-bg", panel="--mf-panel", panel2="--mf-panel2", line="--mf-line",
        ink="--mf-ink", dim="--mf-dim", gold="--mf-gold", amber="--mf-amber",
        accent="--mf-accent", red="--mf-red")),
}

# ── 단계 정의 ────────────────────────────────────────────────────────────────
# art: (종류, 인자)  ko/en: (제목, 설명)
STAGES = {
    "wordforge": [
        dict(no="01", art=("row", dict(chips=["ㄴ", "ㅏ", "ㅁ", "ㅜ"], result="나무")),
             ko=("누른다", "자모 타일을 차례로 누르면 음절이 조합됩니다. 쌍자음도 겹받침도 그대로."),
             en=("Tap", "Tap jamo tiles in order and they assemble into syllables — clusters and all.")),
        dict(no="02", art=("mult", dict(values=["×2", "×5", "×9"])),
             ko=("터뜨린다", "점수는 칩 × 배율. 자모를 많이 쓴 낱말일수록 배율이 크게 붙습니다."),
             en=("Detonate", "Score is chips × mult. The more jamo a word spends, the bigger the multiplier.")),
        dict(no="03", art=("carve", {}),
             ko=("고른다", "라운드 사이 상점에서 이번 판의 조합을 고릅니다. 매판 다른 빌드로."),
             en=("Build", "Between rounds, pick this run's combination in the shop — a different build every time.")),
        dict(no="04", art=("quota", dict(pips=8)),
             ko=("돌파한다", "쿼터를 넘어서면 다음 라운드. 그리고 다시 첫 자모로."),
             en=("Break through", "Beat the quota and move on. Then back to the first tile.")),
    ],
    "pipforge": [
        dict(no="01", art=("dice", {}),
             ko=("굴린다", "주사위를 굴려 족보를 만듭니다. 같은 족보를 반복하면 점수가 식습니다."),
             en=("Roll", "Roll for a hand. Replay the same hand and it cools — the score halves.")),
        dict(no="02", art=("mult", dict(values=["×3", "×8", "×20"])),
             ko=("쌓는다", "칩 × 배율. 참 45종이 규칙을 비틀며 숫자를 말도 안 되는 곳까지 밀어 올립니다."),
             en=("Stack", "Chips × mult. 45 charms bend the rules and push the number somewhere absurd.")),
        dict(no="03", art=("carve", {}),
             ko=("세공한다", "면 하나하나를 끌질합니다. 5·6·7·8·9·9 주사위는 약속된 미래입니다."),
             en=("Chisel", "Chisel the faces one by one. A 5·6·7·8·9·9 die is a promised future.")),
        dict(no="04", art=("quota", dict(pips=8)),
             ko=("넘어선다", "점수만으로는 부족합니다. 계약을 이행하고 규칙을 비트는 보스 8인을 넘으세요."),
             en=("Overcome", "The quota alone is not enough — fulfill contracts and beat 8 rule-bending bosses.")),
    ],
    "aceforge": [
        dict(no="01", art=("row", dict(chips=["7", "8", "9", "10"], result="J")),
             ko=("잇는다", "모루보다 1 높거나 낮은 카드를 이어 체인을 만듭니다. A와 K도 이어집니다."),
             en=("Chain", "Play cards one rank above or below the anvil to build a chain. A and K connect.")),
        dict(no="02", art=("mult", dict(values=["×1", "×3", "×5"])),
             ko=("터뜨린다", "체인의 n번째 카드는 +(n−1) 배율. 길게 이을수록 점수가 폭발합니다."),
             en=("Detonate", "The n-th link scores at +(n−1) mult — the longer the chain, the harder it blows.")),
        dict(no="03", art=("carve", {}),
             ko=("세공한다", "라운드 사이 대장간에서 카드를 세공합니다. 덱 52장이 당신 손을 거칩니다."),
             en=("Forge", "Between rounds, forge your cards at the smithy — all 52 pass through your hands.")),
        dict(no="04", art=("quota", dict(pips=8)),
             ko=("돌파한다", "8개 챕터의 쿼터를 돌파합니다. 그리고 다시 첫 장으로."),
             en=("Break through", "Beat the quota across 8 chapters. Then back to the first card.")),
    ],
    "jadeforge": [
        dict(no="01", art=("row", dict(chips=["❋", "❋"], result="✓")),
             ko=("캔다", "위가 비고 옆이 열린 자유 타일 두 장을 짝지어 캡니다."),
             en=("Dig", "Match two free tiles — open on a side, nothing stacked on top.")),
        dict(no="02", art=("mult", dict(values=["×1", "×2", "×4"])),
             ko=("잇는다", "같은 문양은 맥 +1, 같은 숫자는 공명 +2. 맥 레벨만큼 배율이 붙습니다."),
             en=("Vein", "Same suit grows the vein +1, same number strikes resonance +2 — each level is +1 mult.")),
        dict(no="03", art=("carve", {}),
             ko=("세공한다", "라운드 사이 옥공방에서 타일을 종류별로 세공합니다."),
             en=("Carve", "Between rounds, carve your tiles kind by kind at the Jade Works.")),
        dict(no="04", art=("quota", dict(pips=8)),
             ko=("돌파한다", "8개 챕터의 쿼터를 돌파합니다. 막히면 재련 — 산은 언제나 풀 수 있게 다시 쌓입니다."),
             en=("Break through", "Beat the quota across 8 chapters. Stuck? Reforge — the mountain always restacks solvable.")),
    ],
    "mineforge": [
        dict(no="01", art=("grid3", {}),
             ko=("판다", "칸을 열면 숫자가 주변 지뢰 수를 알려준다."),
             en=("Dig", "Open a tile and its number counts the mines around it.")),
        dict(no="02", art=("seam", dict(values=["×1", "×2", "×4"])),
             ko=("잇는다", "직전 발굴 옆을 이어 파면 광맥 +1, 같은 숫자는 공명 +2. 레벨만큼 배율이 붙는다."),
             en=("Chain", "Chain an adjacent dig for seam +1, same number for resonance +2 — each level is +1 mult.")),
        dict(no="03", art=("safety", {}),
             ko=("버틴다", "지뢰는 버팀목이 대신 받고, 막히면 카나리아가 안전한 칸을 노래한다."),
             en=("Hold", "Pit props absorb your mine strikes; when you are stuck the canary sings over a safe tile.")),
        dict(no="04", art=("carve", {}),
             ko=("세공한다", "라운드 사이 발파 공방에서 광석을 심고 뇌관을 해체한다."),
             en=("Forge", "Between rounds, bury stones and defuse mines at the Blast Works.")),
        dict(no="05", art=("quota", dict(pips=8)),
             ko=("돌파한다", "8개 챕터의 쿼터를 넘어선다. 그리고 다시 첫 칸으로."),
             en=("Break through", "Beat the quota across 8 chapters. Then back to the first tile.")),
    ],
}

# mineforge 2단계는 배율 표시도 함께 쓴다.
MULT_FOR_SEAM = ["×1", "×2", "×4"]

SECTION_TITLE = {"ko": "한 판의 흐름", "en": "One run, step by step"}
CYCLE_NOTE = {
    4: ("한 판은 이 네 걸음을 계속 돈다.", "A run keeps circling these four steps."),
    5: ("한 판은 이 다섯 걸음을 계속 돈다.", "A run keeps circling these five steps."),
}


def pct(u, n):
    """단계 단위(1.0 = 한 단계)를 전체 주기의 퍼센트로 바꾼다."""
    v = u * (100.0 / n)
    return ("%.3f" % v).rstrip("0").rstrip(".") + "%"


# ── TSX ──────────────────────────────────────────────────────────────────────
ART_TSX = {
    "grid3": lambda p, a: f"""
/** 3×3 격자에서 가운데 칸이 열리며 숫자가 드러난다. */
function ArtGrid() {{
  return (
    <div className="{p}-pl-grid" aria-hidden>
      {{Array.from({{ length: 9 }}, (_, i) => (
        <span key={{i}} className={{i === 4 ? '{p}-pl-cell {p}-pl-cell-open' : '{p}-pl-cell'}}>
          {{i === 4 ? <b>2</b> : null}}
        </span>
      ))}}
    </div>
  );
}}""",
    "row": lambda p, a: f"""
/** 칩이 왼쪽부터 차례로 켜지고, 마지막에 결과가 나타난다. */
function ArtRow() {{
  const chips = {a['chips']!r};
  return (
    <div className="{p}-pl-row" aria-hidden>
      {{chips.map((c, i) => (
        <span key={{i}} className="{p}-pl-chip" style={{{{ '--n': i }} as React.CSSProperties}}>
          {{c}}
        </span>
      ))}}
      <span className="{p}-pl-arrow" />
      <span className="{p}-pl-result">{a['result']}</span>
    </div>
  );
}}""",
    "seam": lambda p, a: f"""
/** 광맥 — 옆으로 이어 파면 타일이 차례로 켜지고 배율이 오른다. */
function ArtSeam() {{
  const values = {a['values']!r};
  return (
    <div className="{p}-pl-seam" aria-hidden>
      <div className="{p}-pl-row">
        {{[0, 1, 2, 3].map((i) => (
          <span key={{i}} className="{p}-pl-chip" style={{{{ '--n': i }} as React.CSSProperties}} />
        ))}}
      </div>
      <div className="{p}-pl-mult">
        {{values.map((v, i) => (
          <span key={{v}} style={{{{ '--n': i }} as React.CSSProperties}}>
            {{v}}
          </span>
        ))}}
      </div>
    </div>
  );
}}""",
    "mult": lambda p, a: f"""
/** 배율이 단계별로 올라간다. 한 번에 하나만 보이게 노출 구간을 겹치지 않게 잡았다. */
function ArtMult() {{
  const values = {a['values']!r};
  return (
    <div className="{p}-pl-mult" aria-hidden>
      {{values.map((v, i) => (
        <span key={{v}} style={{{{ '--n': i }} as React.CSSProperties}}>
          {{v}}
        </span>
      ))}}
    </div>
  );
}}""",
    "dice": lambda p, a: f"""
/** 주사위 세 개 — 마지막 하나의 눈이 끌질로 바뀐다. */
function ArtDice() {{
  return (
    <div className="{p}-pl-dice" aria-hidden>
      {{[1, 2, 3].map((d) => (
        <span key={{d}} className="{p}-pl-die" style={{{{ '--n': d - 1 }} as React.CSSProperties}}>
          {{Array.from({{ length: d + 1 }}, (_, i) => (
            <i key={{i}} />
          ))}}
        </span>
      ))}}
    </div>
  );
}}""",
    "safety": lambda p, a: f"""
/** 지뢰는 버팀목이 받아내고, 카나리아가 안전한 칸을 노래한다. */
function ArtSafety() {{
  return (
    <div className="{p}-pl-safety" aria-hidden>
      <span className="{p}-pl-mine" />
      <span className="{p}-pl-prop" />
      <span className="{p}-pl-canary">
        <i />
        <i />
        <i />
      </span>
    </div>
  );
}}""",
    "carve": lambda p, a: f"""
/** 공방 — 하나를 심고, 하나의 날을 깎아낸다. */
function ArtCarve() {{
  return (
    <div className="{p}-pl-carve" aria-hidden>
      <span className="{p}-pl-slot">
        <b className="{p}-pl-seed" />
      </span>
      <span className="{p}-pl-slot">
        <b className="{p}-pl-edge" />
      </span>
    </div>
  );
}}""",
    "quota": lambda p, a: f"""
/** 쿼터 게이지가 차고 챕터가 하나씩 점등된다. */
function ArtQuota() {{
  return (
    <div className="{p}-pl-quota" aria-hidden>
      <span className="{p}-pl-bar">
        <i />
      </span>
      <span className="{p}-pl-pips">
        {{Array.from({{ length: {a['pips']} }}, (_, i) => (
          <i key={{i}} style={{{{ '--n': i }} as React.CSSProperties}} />
        ))}}
      </span>
    </div>
  );
}}""",
}

ART_COMPONENT = {
    "grid3": "ArtGrid", "row": "ArtRow", "mult": "ArtMult", "seam": "ArtSeam",
    "dice": "ArtDice", "safety": "ArtSafety", "carve": "ArtCarve", "quota": "ArtQuota",
}


def build_tsx(game, cfg, stages):
    p = cfg["p"]
    n = len(stages)
    # 이 게임이 실제로 쓰는 도해만 만든다
    kinds, seen = [], set()
    for s in stages:
        k = s["art"][0]
        if k not in seen:
            seen.add(k)
            kinds.append((k, s["art"][1]))
    # seam 행은 배율도 함께 쓴다
    needs_mult = any(s["art"][0] == "mult" for s in stages)
    arts = "\n".join(ART_TSX[k](p, a) for k, a in kinds)

    rows = []
    for s in stages:
        comp = ART_COMPONENT[s["art"][0]]
        extra = ""
        if s["art"][0] == "row" and s["art"][1].get("seam"):
            extra = f'\n        <ArtMultSeam />'
        rows.append(
            "  {\n"
            f"    no: '{s['no']}',\n"
            f"    art: <{comp} />,\n"
            f"    ko: [{s['ko'][0]!r}, {s['ko'][1]!r}],\n"
            f"    en: [{s['en'][0]!r}, {s['en'][1]!r}],\n"
            "  },"
        )
    note_ko, note_en = CYCLE_NOTE[n]

    lang_hook = "useLang" if game != "tower68" else "useI18n"
    return f"""'use client';

import {{ {lang_hook} }} from './i18n';

/* ─────────────────────────────────────────────────────────────
   한 판의 흐름 — {n}단계 파이프라인.

   애니메이션은 전부 CSS 키프레임이다. {n * 2}초를 한 바퀴로 잡고 각 단계가
   2초씩 순서대로 밝아지며, 연결선의 불꽃이 그 사이를 건너간다. JS 타이머를
   쓰지 않으므로 탭이 백그라운드로 가면 브라우저가 알아서 멈춘다.
   `prefers-reduced-motion` 에서는 전부 정지하고 모든 단계를 완료 상태로 둔다.

   ⚠️ 이 파일은 scripts/gen_pipeline.py 로 다섯 게임에 같이 찍어낸 것이다.
   한 게임만 손보면 나머지와 어긋난다 — 문구가 아니라 구조를 바꿀 때는
   생성기를 고치고 전부 다시 찍는 편이 낫다.
   ───────────────────────────────────────────────────────────── */
{arts}

type Stage = {{ no: string; art: React.ReactNode; ko: [string, string]; en: [string, string] }};

const STAGES: Stage[] = [
{chr(10).join(rows)}
];

export default function LoopPipeline() {{
  const {{ lang }} = {lang_hook}();
  const ko = lang === 'ko';

  return (
    <div className="{p}-pl">
      <ol className="{p}-pl-track">
        {{STAGES.map((s, i) => {{
          const [title, desc] = ko ? s.ko : s.en;
          return (
            <li className="{p}-pl-step" key={{s.no}} style={{{{ '--i': i }} as React.CSSProperties}}>
              <div className="{p}-pl-card">
                <span className="{p}-pl-no">{{s.no}}</span>
                <div className="{p}-pl-art">{{s.art}}</div>
                <h3 className="{p}-pl-title">{{title}}</h3>
                <p className="{p}-pl-desc">{{desc}}</p>
              </div>
              {{i < STAGES.length - 1 && (
                <span className="{p}-pl-link" aria-hidden>
                  <i />
                </span>
              )}}
            </li>
          );
        }})}}
      </ol>
      <p className="{p}-pl-cycle">{{ko ? {note_ko!r} : {note_en!r}}}</p>
    </div>
  );
}}
"""


# ── CSS ──────────────────────────────────────────────────────────────────────
def build_css(cfg, stages, wide):
    p, v = cfg["p"], cfg["vars"]
    n = len(stages)
    P = lambda u: pct(u, n)
    kinds = {s["art"][0] for s in stages}

    css = f"""

/* ═══════════════════════════════════════════════════════════════
   한 판의 흐름 — {n}단계 파이프라인 (LoopPipeline.tsx · gen_pipeline.py 생성)

   {n * 2}초가 한 바퀴. 단계 i 는 (i × 2초)에 깨어나 2초 동안 밝다.
   아래 퍼센트는 전부 '한 단계 = {P(1)}' 를 기준으로 계산돼 있다.
   ═══════════════════════════════════════════════════════════════ */
.{p}-pl {{
  --pl-cycle: {n * 2}s;
  --pl-step: 2s;
  /* 게임마다 다른 변수 이름을 여기서 한 번만 맞춘다 */
  --pl-bg: var({v['bg']});
  --pl-panel: var({v['panel']});
  --pl-panel2: var({v['panel2']});
  --pl-line: var({v['line']});
  --pl-ink: var({v['ink']});
  --pl-dim: var({v['dim']});
  --pl-gold: var({v['gold']});
  --pl-amber: var({v['amber']});
  --pl-accent: var({v['accent']});
  --pl-red: var({v['red']});
  /* {n}열이 들어가려면 본문보다 넓어야 한다. 부모를 건드리지 않고
     가운데를 기준으로만 넓힌다 — 화면이 좁으면 자동으로 줄어든다. */
  width: min({wide}px, calc(100vw - 44px));
  margin-left: 50%;
  transform: translateX(-50%);
}}

.{p}-pl-track {{ list-style: none; display: grid; gap: 18px; grid-template-columns: repeat({n}, 1fr); }}
.{p}-pl-step {{ position: relative; display: flex; }}

.{p}-pl-card {{
  position: relative; flex: 1; display: flex; flex-direction: column;
  background: var(--pl-panel); border: 1px solid var(--pl-line); border-radius: 14px;
  padding: 16px 14px 15px; text-align: left; overflow: hidden;
  animation: {p}-pl-wake var(--pl-cycle) linear infinite;
  animation-delay: calc(var(--i) * var(--pl-step));
}}
.{p}-pl-card::before {{
  content: ''; position: absolute; inset: -1px; border-radius: 14px; pointer-events: none;
  background: radial-gradient(120px 60px at 50% -10%, color-mix(in srgb, var(--pl-accent) 22%, transparent), transparent 70%);
  opacity: 0;
  animation: {p}-pl-glow var(--pl-cycle) linear infinite;
  animation-delay: calc(var(--i) * var(--pl-step));
}}
@keyframes {p}-pl-wake {{
  0%, 100%      {{ border-color: var(--pl-line); transform: translateY(0); }}
  {P(.10)}      {{ border-color: var(--pl-accent); transform: translateY(-3px); }}
  {P(.90)}      {{ border-color: var(--pl-accent); transform: translateY(-3px); }}
  {P(1.20)}     {{ border-color: var(--pl-line); transform: translateY(0); }}
}}
@keyframes {p}-pl-glow {{
  0%, 100%             {{ opacity: 0; }}
  {P(.15)}, {P(.90)}   {{ opacity: 1; }}
  {P(1.20)}            {{ opacity: 0; }}
}}

.{p}-pl-no {{
  font-family: Georgia, 'Times New Roman', serif; font-size: 12px; letter-spacing: 2px;
  color: var(--pl-dim);
  animation: {p}-pl-no var(--pl-cycle) linear infinite;
  animation-delay: calc(var(--i) * var(--pl-step));
}}
@keyframes {p}-pl-no {{
  0%, 100%             {{ color: var(--pl-dim); }}
  {P(.15)}, {P(.90)}   {{ color: var(--pl-accent); }}
  {P(1.20)}            {{ color: var(--pl-dim); }}
}}

.{p}-pl-art {{ height: 62px; margin: 10px 0 12px; display: flex; align-items: center; justify-content: center; }}
.{p}-pl-title {{ font-size: 15px; color: var(--pl-ink); margin-bottom: 4px; }}
.{p}-pl-desc {{ font-size: 12.5px; line-height: 1.65; color: var(--pl-dim); }}

/* ── 단계 사이 연결선 + 건너가는 불꽃 ── */
.{p}-pl-link {{
  position: absolute; top: 48px; right: -18px; width: 18px; height: 2px;
  background: var(--pl-panel2); z-index: 1;
}}
.{p}-pl-link::after {{
  content: ''; position: absolute; right: -1px; top: -3px;
  border-left: 5px solid var(--pl-panel2);
  border-top: 4px solid transparent; border-bottom: 4px solid transparent;
}}
.{p}-pl-link i {{
  position: absolute; inset: 0; border-radius: 2px; background: var(--pl-accent);
  transform-origin: left center; transform: scaleX(0);
  animation: {p}-pl-spark var(--pl-cycle) linear infinite;
  animation-delay: calc(var(--i) * var(--pl-step) + 1.6s);
}}
@keyframes {p}-pl-spark {{
  0%                   {{ transform: scaleX(0); opacity: 1; }}
  {P(.20)}             {{ transform: scaleX(1); opacity: 1; }}
  {P(.50)}             {{ transform: scaleX(1); opacity: 0; }}
  {P(.55)}, 100%       {{ transform: scaleX(0); opacity: 0; }}
}}
"""

    if "grid3" in kinds:
        css += f"""
/* ── 도해: 격자 발굴 ── */
.{p}-pl-grid {{ display: grid; grid-template-columns: repeat(3, 15px); gap: 3px; }}
.{p}-pl-cell {{ width: 15px; height: 15px; border-radius: 3px; background: var(--pl-panel2); border: 1px solid var(--pl-line); }}
.{p}-pl-cell-open {{ display: flex; align-items: center; justify-content: center; animation: {p}-pl-open var(--pl-cycle) linear infinite; }}
.{p}-pl-cell-open b {{ font-size: 10px; color: var(--pl-accent); opacity: 0; animation: {p}-pl-num var(--pl-cycle) linear infinite; }}
@keyframes {p}-pl-open {{
  0%, 100%           {{ background: var(--pl-panel2); border-color: var(--pl-line); transform: rotateY(0); }}
  {P(.20)}           {{ transform: rotateY(90deg); }}
  {P(.40)}, {P(.90)} {{ background: var(--pl-bg); border-color: var(--pl-accent); transform: rotateY(0); }}
  {P(1.20)}          {{ background: var(--pl-panel2); border-color: var(--pl-line); }}
}}
@keyframes {p}-pl-num {{
  0%, {P(.30)}       {{ opacity: 0; }}
  {P(.45)}, {P(.90)} {{ opacity: 1; }}
  {P(1.20)}, 100%    {{ opacity: 0; }}
}}
"""

    if "row" in kinds or "seam" in kinds:
        idx = next(i for i, s in enumerate(stages) if s["art"][0] in ("row", "seam"))
        css += f"""
/* ── 도해: 이어 붙이기 ── */
.{p}-pl-row {{ display: flex; align-items: center; gap: 4px; }}
.{p}-pl-chip {{
  min-width: 15px; height: 17px; padding: 0 3px; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  font-size: 11px; color: var(--pl-dim);
  background: var(--pl-panel2); border: 1px solid var(--pl-line);
  animation: {p}-pl-lit var(--pl-cycle) linear infinite;
  animation-delay: calc({idx} * var(--pl-step) + var(--n) * 0.18s);
}}
@keyframes {p}-pl-lit {{
  0%, 100%           {{ background: var(--pl-panel2); border-color: var(--pl-line); color: var(--pl-dim); box-shadow: none; }}
  {P(.15)}, {P(.80)} {{ background: var(--pl-amber); border-color: var(--pl-accent); color: var(--pl-bg);
                        box-shadow: 0 0 8px color-mix(in srgb, var(--pl-accent) 50%, transparent); }}
  {P(1.10)}          {{ background: var(--pl-panel2); border-color: var(--pl-line); color: var(--pl-dim); box-shadow: none; }}
}}
.{p}-pl-seam {{ display: flex; flex-direction: column; align-items: center; gap: 8px; }}
.{p}-pl-arrow {{
  width: 0; height: 0; margin: 0 1px;
  border-left: 5px solid var(--pl-line);
  border-top: 4px solid transparent; border-bottom: 4px solid transparent;
}}
.{p}-pl-result {{
  padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 700;
  color: var(--pl-gold); border: 1px solid var(--pl-line); background: var(--pl-bg);
  opacity: 0; animation: {p}-pl-result var(--pl-cycle) linear infinite;
  animation-delay: calc({idx} * var(--pl-step));
}}
@keyframes {p}-pl-result {{
  0%, {P(.55)}       {{ opacity: 0; transform: scale(0.8); }}
  {P(.70)}, {P(.90)} {{ opacity: 1; transform: scale(1); }}
  {P(1.15)}, 100%    {{ opacity: 0; transform: scale(0.8); }}
}}
"""

    if "mult" in kinds or "seam" in kinds:
        idx = next(i for i, s in enumerate(stages) if s["art"][0] in ("mult", "seam"))
        css += f"""
/* ── 도해: 배율 ── */
.{p}-pl-mult {{ position: relative; height: 20px; width: 46px; }}
.{p}-pl-mult span {{
  position: absolute; inset: 0; text-align: center;
  font-family: Georgia, 'Times New Roman', serif; font-size: 16px; color: var(--pl-gold);
  opacity: 0; animation: {p}-pl-mult var(--pl-cycle) linear infinite;
  animation-delay: calc({idx} * var(--pl-step) + var(--n) * 0.45s);
}}
/* 세 배율이 겹쳐 보이면 없는 숫자로 읽힌다 — 노출 구간(0.3s)을 간격(0.45s)보다 짧게. */
@keyframes {p}-pl-mult {{
  0%, {P(.05)}       {{ opacity: 0; }}
  {P(.10)}, {P(.25)} {{ opacity: 1; }}
  {P(.30)}, 100%     {{ opacity: 0; }}
}}
/* 마지막 배율은 단계가 끝날 때까지 남는다 — 도달한 결과이기 때문이다. */
.{p}-pl-mult span:last-child {{ animation-name: {p}-pl-mult-hold; }}
@keyframes {p}-pl-mult-hold {{
  0%, {P(.05)}       {{ opacity: 0; }}
  {P(.10)}, {P(.80)} {{ opacity: 1; }}
  {P(1.00)}, 100%    {{ opacity: 0; }}
}}
"""

    if "dice" in kinds:
        idx = next(i for i, s in enumerate(stages) if s["art"][0] == "dice")
        css += f"""
/* ── 도해: 주사위 ── */
.{p}-pl-dice {{ display: flex; gap: 6px; }}
.{p}-pl-die {{
  width: 24px; height: 24px; border-radius: 5px; padding: 3px;
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 2px; place-items: center;
  background: var(--pl-panel2); border: 1px solid var(--pl-line);
  animation: {p}-pl-roll var(--pl-cycle) linear infinite;
  animation-delay: calc({idx} * var(--pl-step) + var(--n) * 0.14s);
}}
.{p}-pl-die i {{ width: 4px; height: 4px; border-radius: 50%; background: var(--pl-dim); }}
@keyframes {p}-pl-roll {{
  0%, 100%           {{ transform: rotate(0) scale(1); border-color: var(--pl-line); }}
  {P(.12)}           {{ transform: rotate(-14deg) scale(1.12); }}
  {P(.26)}           {{ transform: rotate(10deg) scale(1.12); }}
  {P(.40)}, {P(.85)} {{ transform: rotate(0) scale(1); border-color: var(--pl-accent); }}
  {P(1.10)}          {{ border-color: var(--pl-line); }}
}}
/* 마지막 주사위 눈은 끌질로 금빛이 된다 */
.{p}-pl-die:last-child i {{
  animation: {p}-pl-chisel var(--pl-cycle) linear infinite;
  animation-delay: calc({idx} * var(--pl-step));
}}
@keyframes {p}-pl-chisel {{
  0%, {P(.40)}       {{ background: var(--pl-dim); }}
  {P(.55)}, {P(.85)} {{ background: var(--pl-gold); }}
  {P(1.10)}, 100%    {{ background: var(--pl-dim); }}
}}
"""

    if "safety" in kinds:
        idx = next(i for i, s in enumerate(stages) if s["art"][0] == "safety")
        css += f"""
/* ── 도해: 버팀목과 카나리아 ── */
.{p}-pl-safety {{ position: relative; width: 92px; height: 56px; }}
.{p}-pl-mine {{
  position: absolute; left: 12px; top: 0; width: 11px; height: 11px; border-radius: 50%;
  background: var(--pl-red);
  animation: {p}-pl-drop var(--pl-cycle) linear infinite;
  animation-delay: calc({idx} * var(--pl-step));
}}
@keyframes {p}-pl-drop {{
  0%, 100%           {{ transform: translateY(-6px); opacity: 0; }}
  {P(.15)}           {{ transform: translateY(-6px); opacity: 1; }}
  {P(.50)}           {{ transform: translateY(22px); opacity: 1; }}
  {P(.65)}, {P(.90)} {{ transform: translateY(22px) scale(0.3); opacity: 0; }}
}}
.{p}-pl-prop {{
  position: absolute; left: 4px; top: 34px; width: 28px; height: 5px; border-radius: 2px;
  background: var(--pl-line);
  animation: {p}-pl-brace var(--pl-cycle) linear infinite;
  animation-delay: calc({idx} * var(--pl-step));
}}
@keyframes {p}-pl-brace {{
  0%, {P(.45)}, 100% {{ background: var(--pl-line); transform: scaleY(1); }}
  {P(.55)}           {{ background: var(--pl-gold); transform: scaleY(1.9); }}
  {P(.90)}           {{ background: var(--pl-line); transform: scaleY(1); }}
}}
.{p}-pl-canary {{ position: absolute; right: 6px; top: 16px; width: 22px; height: 22px; }}
.{p}-pl-canary i {{
  position: absolute; inset: 0; border-radius: 50%;
  border: 1.5px solid var(--pl-accent); opacity: 0;
  animation: {p}-pl-sing var(--pl-cycle) linear infinite;
}}
.{p}-pl-canary i:nth-child(1) {{ animation-delay: calc({idx} * var(--pl-step)); }}
.{p}-pl-canary i:nth-child(2) {{ animation-delay: calc({idx} * var(--pl-step) + 0.35s); }}
.{p}-pl-canary i:nth-child(3) {{ animation-delay: calc({idx} * var(--pl-step) + 0.7s); }}
@keyframes {p}-pl-sing {{
  0%, {P(.05)}    {{ transform: scale(0.4); opacity: 0; }}
  {P(.20)}        {{ opacity: 0.9; }}
  {P(.70)}        {{ transform: scale(1.35); opacity: 0; }}
  {P(.75)}, 100%  {{ opacity: 0; }}
}}
"""

    if "carve" in kinds:
        idx = next(i for i, s in enumerate(stages) if s["art"][0] == "carve")
        css += f"""
/* ── 도해: 공방 ── */
.{p}-pl-carve {{ display: flex; gap: 12px; }}
.{p}-pl-slot {{
  position: relative; width: 32px; height: 32px; border-radius: 7px;
  background: var(--pl-panel2); border: 1px solid var(--pl-line);
  display: flex; align-items: center; justify-content: center; overflow: hidden;
}}
.{p}-pl-seed {{
  width: 12px; height: 12px; border-radius: 3px; background: var(--pl-gold);
  transform: translateY(-26px); opacity: 0;
  animation: {p}-pl-plant var(--pl-cycle) linear infinite;
  animation-delay: calc({idx} * var(--pl-step));
}}
@keyframes {p}-pl-plant {{
  0%, {P(.10)}       {{ transform: translateY(-26px); opacity: 0; }}
  {P(.20)}           {{ transform: translateY(-26px); opacity: 1; }}
  {P(.50)}           {{ transform: translateY(0); opacity: 1; }}
  {P(.60)}           {{ transform: translateY(0) scale(1.3); }}
  {P(.70)}, {P(.90)} {{ transform: translateY(0) scale(1); opacity: 1; }}
  {P(1.10)}, 100%    {{ opacity: 0; }}
}}
.{p}-pl-edge {{
  width: 18px; height: 3px; border-radius: 2px; background: var(--pl-red);
  transform-origin: right center;
  animation: {p}-pl-shave var(--pl-cycle) linear infinite;
  animation-delay: calc({idx} * var(--pl-step));
}}
@keyframes {p}-pl-shave {{
  0%, {P(.20)}       {{ transform: scaleX(1); background: var(--pl-red); }}
  {P(.80)}           {{ transform: scaleX(0.05); background: var(--pl-red); }}
  {P(.85)}, {P(1.10)} {{ transform: scaleX(0.05); background: var(--pl-line); }}
  {P(1.15)}, 100%    {{ transform: scaleX(1); background: var(--pl-red); }}
}}
"""

    if "quota" in kinds:
        idx = next(i for i, s in enumerate(stages) if s["art"][0] == "quota")
        css += f"""
/* ── 도해: 쿼터와 챕터 ── */
.{p}-pl-quota {{ display: flex; flex-direction: column; align-items: center; gap: 9px; }}
.{p}-pl-bar {{
  display: block; width: 76px; height: 7px; border-radius: 4px;
  background: var(--pl-panel2); border: 1px solid var(--pl-line); overflow: hidden;
}}
.{p}-pl-bar i {{
  display: block; height: 100%; width: 100%;
  background: linear-gradient(90deg, var(--pl-amber), var(--pl-gold));
  transform-origin: left center; transform: scaleX(0);
  animation: {p}-pl-fill var(--pl-cycle) linear infinite;
  animation-delay: calc({idx} * var(--pl-step));
}}
@keyframes {p}-pl-fill {{
  0%, {P(.10)}       {{ transform: scaleX(0); }}
  {P(.85)}, {P(1.10)} {{ transform: scaleX(1); }}
  {P(1.15)}, 100%    {{ transform: scaleX(0); }}
}}
.{p}-pl-pips {{ display: flex; gap: 4px; }}
.{p}-pl-pips i {{
  width: 5px; height: 5px; border-radius: 50%; background: var(--pl-line);
  animation: {p}-pl-pip var(--pl-cycle) linear infinite;
  animation-delay: calc({idx} * var(--pl-step) + var(--n) * 0.16s);
}}
@keyframes {p}-pl-pip {{
  0%, {P(.10)}       {{ background: var(--pl-line); }}
  {P(.25)}, {P(1.10)} {{ background: var(--pl-gold); }}
  {P(1.15)}, 100%    {{ background: var(--pl-line); }}
}}
"""

    css += f"""
.{p}-pl-cycle {{ margin-top: 14px; text-align: center; font-size: 13px; color: var(--pl-dim); }}

/* ── 좁은 화면 ── */
@media (max-width: 900px) {{
  .{p}-pl-track {{ grid-template-columns: repeat(2, 1fr); gap: 16px; }}
  /* 2열에서는 연결선이 줄바꿈을 가로질러 거짓말을 하게 된다 — 숨긴다. */
  .{p}-pl-link {{ display: none; }}
}}
@media (max-width: 520px) {{
  .{p}-pl-track {{ grid-template-columns: 1fr; gap: 20px; }}
  .{p}-pl-art {{ height: 54px; }}
  .{p}-pl-link {{
    display: block; top: auto; right: auto; left: 30px; bottom: -20px;
    width: 2px; height: 20px;
  }}
  .{p}-pl-link::after {{
    right: auto; top: auto; left: -3px; bottom: -1px;
    border-left: 4px solid transparent; border-right: 4px solid transparent;
    border-top: 5px solid var(--pl-panel2); border-bottom: 0;
  }}
  .{p}-pl-link i {{ transform-origin: center top; }}
  @keyframes {p}-pl-spark {{
    0%             {{ transform: scaleY(0); opacity: 1; }}
    {P(.20)}       {{ transform: scaleY(1); opacity: 1; }}
    {P(.50)}       {{ transform: scaleY(1); opacity: 0; }}
    {P(.55)}, 100% {{ transform: scaleY(0); opacity: 0; }}
  }}
}}

/* ── 모션 최소화: 전부 멈추고 모든 단계를 완료 상태로 고정한다 ── */
@media (prefers-reduced-motion: reduce) {{
  .{p}-pl *, .{p}-pl *::before {{ animation: none !important; transition: none !important; }}
  .{p}-pl-card {{ border-color: var(--pl-accent); }}
  .{p}-pl-card::before {{ opacity: 1; }}
  .{p}-pl-no {{ color: var(--pl-accent); }}
  .{p}-pl-cell-open {{ background: var(--pl-bg); border-color: var(--pl-accent); }}
  .{p}-pl-cell-open b {{ opacity: 1; }}
  .{p}-pl-chip {{ background: var(--pl-amber); border-color: var(--pl-accent); color: var(--pl-bg); }}
  .{p}-pl-result {{ opacity: 1; transform: scale(1); }}
  .{p}-pl-mult span {{ opacity: 0; }}
  .{p}-pl-mult span:last-child {{ opacity: 1; }}
  .{p}-pl-die {{ border-color: var(--pl-accent); }}
  .{p}-pl-die:last-child i {{ background: var(--pl-gold); }}
  .{p}-pl-mine {{ opacity: 1; transform: translateY(16px); }}
  .{p}-pl-canary i:first-child {{ opacity: 0.9; }}
  .{p}-pl-seed {{ opacity: 1; transform: translateY(0); }}
  .{p}-pl-edge {{ transform: scaleX(0.05); background: var(--pl-line); }}
  .{p}-pl-bar i {{ transform: scaleX(1); }}
  .{p}-pl-pips i {{ background: var(--pl-gold); }}
  .{p}-pl-link i {{ transform: scaleX(1); opacity: 1; }}
}}
"""
    return css


def main():
    for game, cfg in GAMES.items():
        stages = STAGES[game]
        n = len(stages)
        wide = 1120 if n == 5 else 980

        tsx = build_tsx(game, cfg, stages)
        tsx_path = f"{ROOT}/app/({game})/{game}/LoopPipeline.tsx"
        open(tsx_path, "w").write(tsx)

        css_path = f"{ROOT}/app/({game})/{game}/globals.css"
        css = open(css_path).read()
        # 이전에 찍은 블록이 있으면 잘라낸다 (재실행 가능하게)
        marker = "\n\n/* ═══════════════════════════════════════════════════════════════\n   한 판의 흐름"
        if marker in css:
            css = css[: css.index(marker)]
        old_marker = "\n/* ═══════════════════════════════════════════════════════════════\n   한 판의 흐름"
        if old_marker in css:
            css = css[: css.index(old_marker)]
        css = css.rstrip() + build_css(cfg, stages, wide)
        open(css_path, "w").write(css)
        print(f"{game:11s} · {n}단계 · {os.path.getsize(tsx_path)//1024}KB tsx")


if __name__ == "__main__":
    main()
