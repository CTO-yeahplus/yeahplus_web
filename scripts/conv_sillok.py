#!/usr/bin/env python3
"""sillok 정적 사이트(HTML + CSS)를 Next 라우트 그룹으로 옮긴다.

법률 문서는 한 글자도 다시 쓰지 않는다 — 원본 HTML 을 기계적으로 JSX 로
바꾸는 쪽이 손으로 옮겨 적는 것보다 안전하다. 클래스와 CSS 변수에는
다른 게임과 같은 규칙으로 sl- / --sl- 프리픽스를 붙인다.
"""

import re, os, json

# 원본 정적 사이트(sillok/site)의 위치. 다른 저장소라 절대 경로로 둔다.
SRC = os.environ.get("SILLOK_SITE", os.path.expanduser("~/Documents/EKO_DEV/GAME/APLUS/sillok/site"))
OUT = os.environ.get("SILLOK_OUT", "/tmp/sillok_out")
os.makedirs(OUT, exist_ok=True)

# ── CSS ──────────────────────────────────────────────────────────────────────
def convert_css(css: str) -> str:
    # 주석은 건드리지 않는다 — 안에 style.css 같은 문자열이 있으면
    # 클래스 치환에 걸려 style.sl-css 가 된다.
    comments = []

    def stash(m):
        comments.append(m.group(0))
        return f"\x00C{len(comments) - 1}\x00"

    css = re.sub(r"/\*.*?\*/", stash, css, flags=re.S)

    # 1) 커스텀 프로퍼티: --foo → --sl-foo (선언과 var() 양쪽)
    css = re.sub(r"--(?!sl-)([a-zA-Z][\w-]*)", r"--sl-\1", css)

    # 2) 클래스 선택자: .foo → .sl-foo (이미 붙었으면 그대로)
    css = re.sub(r"\.(?!sl-)([a-zA-Z][\w-]*)", r".sl-\1", css)

    css = re.sub(r"\x00C(\d+)\x00", lambda m: comments[int(m.group(1))], css)
    return css + LANG_FIX


# 원본 사이트에 남아 있던 버그 하나를 이식하면서 고친다.
#
# `[data-l]{display:none}` 은 특정도가 (0,1,0) 이라 `.store-btn small{display:block}`
# 같은 (0,1,1) 규칙에 진다. 그래서 App Store 버튼 안의 영문 <small> 이 한국어
# 모드에서도 같이 보였다("iPhone · iPad" 가 두 줄). 숨김 쪽 특정도를 (0,2,1) 로
# 올려 어떤 요소 규칙에도 지지 않게 한다.
LANG_FIX = """

/* ── 이식 시 보정 ──────────────────────────────────────────────
   원본의 [data-l]{display:none} 은 .store-btn small 같은 (0,1,1) 규칙에
   져서 반대 언어가 함께 보이는 자리가 있었다. 숨김 규칙의 특정도를 올린다. */
html:not([data-lang="ko"]) [data-l="ko"],
html:not([data-lang="en"]) [data-l="en"]{display:none}
"""


# ── HTML → JSX ───────────────────────────────────────────────────────────────
SELF_CLOSING = {"br", "hr", "img", "input", "meta", "link", "source", "area", "base", "col", "embed", "param", "track", "wbr"}

# SVG/HTML 속성 → React 프로퍼티
ATTR_MAP = {
    "class": "className",
    "for": "htmlFor",
    "tabindex": "tabIndex",
    "colspan": "colSpan",
    "rowspan": "rowSpan",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset",
    "fill-rule": "fillRule",
    "clip-rule": "clipRule",
    "stop-color": "stopColor",
    "stop-opacity": "stopOpacity",
    "text-anchor": "textAnchor",
    "font-size": "fontSize",
    "font-family": "fontFamily",
    "font-weight": "fontWeight",
    "xlink:href": "xlinkHref",
    "srcset": "srcSet",
    "autocomplete": "autoComplete",
    "maxlength": "maxLength",
    "readonly": "readOnly",
    "novalidate": "noValidate",
    "enctype": "encType",
    "accept-charset": "acceptCharset",
    "http-equiv": "httpEquiv",
    "datetime": "dateTime",
    # SVG — 대소문자를 지켜야 하는 속성들. 소문자로 떨어뜨리면 React 가
    # 알 수 없는 속성으로 보고 타입 에러를 낸다.
    "viewbox": "viewBox",
    "preserveaspectratio": "preserveAspectRatio",
    "gradientunits": "gradientUnits",
    "gradienttransform": "gradientTransform",
    "patternunits": "patternUnits",
    "patterncontentunits": "patternContentUnits",
    "clippath": "clipPath",
    "clippathunits": "clipPathUnits",
    "maskunits": "maskUnits",
    "maskcontentunits": "maskContentUnits",
    "markerwidth": "markerWidth",
    "markerheight": "markerHeight",
    "markerunits": "markerUnits",
    "refx": "refX",
    "refy": "refY",
    "spreadmethod": "spreadMethod",
    "stopcolor": "stopColor",
    "stopopacity": "stopOpacity",
    "stroke-miterlimit": "strokeMiterlimit",
    "stroke-opacity": "strokeOpacity",
    "fill-opacity": "fillOpacity",
    "vector-effect": "vectorEffect",
    "dominant-baseline": "dominantBaseline",
    "letter-spacing": "letterSpacing",
    "baseline-shift": "baselineShift",
    "color-interpolation-filters": "colorInterpolationFilters",
}


def css_prop_to_js(p: str) -> str:
    p = p.strip()
    if p.startswith("--"):
        return f"'{p}'"
    parts = p.split("-")
    return parts[0] + "".join(x.capitalize() for x in parts[1:])


def style_to_jsx(style: str) -> str:
    out = []
    for decl in style.split(";"):
        if ":" not in decl:
            continue
        k, v = decl.split(":", 1)
        key = css_prop_to_js(k)
        val = v.strip()
        out.append(f"{key}: {json.dumps(val)}")
    return "{{ " + ", ".join(out) + " }}"


def convert_attrs(attrs: str) -> str:
    """태그의 속성 문자열을 JSX 로."""
    out = []
    for m in re.finditer(r'([a-zA-Z_:][-\w:.]*)(?:\s*=\s*"([^"]*)"|\s*=\s*\'([^\']*)\')?', attrs):
        name = m.group(1)
        val = m.group(2) if m.group(2) is not None else m.group(3)

        low = name.lower()
        if low.startswith("on"):          # 인라인 핸들러는 React 쪽에서 다시 붙인다
            continue
        if low == "style" and val:
            out.append(f"style={style_to_jsx(val)}")
            continue
        if low == "class" and val:
            classes = " ".join(
                c if c.startswith("sl-") else f"sl-{c}" for c in val.split()
            )
            out.append(f'className="{classes}"')
            continue

        jsx_name = ATTR_MAP.get(low, name if ("-" in name or ":" in name) else low)
        if val is None:
            out.append(jsx_name)          # 불리언 속성
        else:
            v = val.replace("{", "&#123;").replace("}", "&#125;")
            out.append(f'{jsx_name}="{v}"')
    return (" " + " ".join(out)) if out else ""


def html_to_jsx(html: str) -> str:
    # 주석 → JSX 주석
    html = re.sub(r"<!--(.*?)-->", lambda m: "{/*" + m.group(1).replace("*/", "*\\/") + "*/}", html, flags=re.S)

    def tag(m):
        closing, name, attrs, selfclose = m.group(1), m.group(2), m.group(3) or "", m.group(4)
        if closing:
            return f"</{name}>"
        a = convert_attrs(attrs)
        if selfclose or name.lower() in SELF_CLOSING:
            return f"<{name}{a} />"
        return f"<{name}{a}>"

    html = re.sub(r"<(/?)([a-zA-Z][\w:-]*)((?:\s+[^>]*?)?)(/?)>", tag, html)

    # 텍스트 노드 처리 — 두 가지를 손본다.
    #
    # 1) 중괄호: JSX 가 표현식으로 읽으므로 실체 참조로 바꾼다.
    # 2) 공백: HTML 은 줄바꿈을 공백 하나로 접지만 JSX 는 태그에 붙은
    #    줄바꿈을 아예 지운다. 그대로 두면 "</b>\n  계정도" 가
    #    "않습니다.계정도" 로 붙어 버린다. 공백을 하나로 접고, 앞뒤에
    #    공백이 있었으면 {' '} 로 명시해 브라우저와 같은 결과를 만든다.
    parts = re.split(r"(<[^>]*>|\{/\*.*?\*/\})", html, flags=re.S)
    for i in range(0, len(parts), 2):
        t = parts[i]
        if not t:
            continue
        t = t.replace("{", "&#123;").replace("}", "&#125;")
        if not t.strip():
            # 공백뿐인 노드는 JSX 기본 동작(줄바꿈 제거)에 맡긴다.
            parts[i] = t if "\n" in t else " "
            continue
        lead = " " if t[:1].isspace() else ""
        trail = " " if t[-1:].isspace() else ""
        body = re.sub(r"\s+", " ", t).strip()
        parts[i] = (("{' '}" if lead else "") + body + ("{' '}" if trail else ""))
    return "".join(parts)


def extract(html: str, start_marker: str, end_marker: str) -> str:
    i = html.index(start_marker)
    j = html.rindex(end_marker)
    return html[i + len(start_marker): j]


def indent(block: str, spaces: int) -> str:
    pad = " " * spaces
    return "\n".join(pad + l if l.strip() else l for l in block.strip().split("\n"))


# ── 페이지별 추출 ────────────────────────────────────────────────────────────
# 원본 문서가 회사명을 "예스플러스"로 적고 있다. 법인명은 「주식회사 예아플러스」로
# 사업자등록번호 283-88-02519 이며, 사이트의 다른 제품 문서는 모두 그렇게 쓴다.
# 약관은 계약 당사자를 적는 문서라 이름이 틀리면 그 자체가 문제다.
COMPANY_FIX = [
    ("예스플러스(yeahplus)", "주식회사 예아플러스(yeahplus)"),
    # 공개 문의 창구는 contact@ 다. cto@ 는 개인 주소라 문서에 싣지 않는다.
    ("cto@yeahplus.co.kr", "contact@yeahplus.co.kr"),
    ("예스플러스", "예아플러스"),
]


def body_of(fname: str) -> str:
    """nav 와 footer 를 뺀 본문만 꺼낸다 — 그 둘은 chrome.tsx 가 담당한다."""
    s = open(os.path.join(SRC, fname), encoding="utf-8").read()
    for a, b in COMPANY_FIX:
        s = s.replace(a, b)
    s = re.sub(r"<script\b.*?</script>", "", s, flags=re.S)
    # <div class="page"> 안쪽
    s = extract(s, '<div class="page">', "</div><!-- /page -->")
    # 첫 <div class="wrap"><nav>…</nav></div> 제거
    s = re.sub(r'<div class="wrap">\s*<nav>.*?</nav>\s*</div>', "", s, count=1, flags=re.S)
    # footer 제거
    s = re.sub(r"<footer>.*?</footer>", "", s, flags=re.S)
    return s.strip()


def main():
    # CSS
    css = open(os.path.join(SRC, "style.css"), encoding="utf-8").read()
    open(os.path.join(OUT, "globals.css"), "w", encoding="utf-8").write(convert_css(css))

    for f in ["index.html", "privacy.html", "terms.html", "support.html"]:
        jsx = html_to_jsx(body_of(f))
        name = f.replace(".html", "")
        open(os.path.join(OUT, f"{name}.jsx.txt"), "w", encoding="utf-8").write(jsx)
        print(f"{f:14s} → {len(jsx):6d} chars")


if __name__ == "__main__":
    main()
