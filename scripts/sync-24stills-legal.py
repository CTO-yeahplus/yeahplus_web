#!/usr/bin/env python3
"""24STILLS 약관·개인정보·지원 문서 동기화.

정본은 앱 저장소의 docs/legal/{privacy,terms,support}.html 이다(앱 안의 약관 화면도 거기서 만든다).
이 스크립트가 그 본문을 app/(stills)/24stills/legalData.ts 로 옮긴다 — 손으로 고치지 말 것.

    python3 scripts/sync-24stills-legal.py [앱 저장소의 docs/legal 경로]
"""
import json, os, re, sys

SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.expanduser('~/Documents/EKO_DEV/CODE_24/CODE_24/docs/legal')
OUT = os.path.join(os.path.dirname(__file__), '..', 'app', '(stills)', '24stills', 'legalData.ts')
ALLOWED = re.compile(r'</?(h2|p|ul|li|b|a|br)(\s[^>]*)?/?>')


def section(part: str) -> dict:
    title = re.search(r'<h1>(.*?)</h1>', part, re.S).group(1).strip()
    meta_m = re.search(r'<p class="meta">(.*?)</p>', part, re.S)
    body = part[part.index('</h1>') + 5:]
    if meta_m:
        body = body.replace(meta_m.group(0), '')
    body = re.sub(r'<!--.*?-->', '', body, flags=re.S)
    body = re.sub(r'<p class="lang">.*?</p>', '', body, flags=re.S)
    body = re.sub(r'</body>|</html>', '', body)
    # 페이지끼리 서로 가리키는 링크는 새 주소(확장자 없음)로
    body = re.sub(r'https://www\.yeahplus\.co\.kr/24stills/(privacy|terms|support)\.html', r'/24stills/\1', body)
    for tag in re.findall(r'<[^>]+>', body):
        assert ALLOWED.fullmatch(tag), f'허용하지 않는 태그: {tag}'
    return {'title': title, 'meta': meta_m.group(1).strip() if meta_m else '', 'html': body.strip()}


data = {}
for name in ('privacy', 'terms', 'support'):
    html = open(os.path.join(SRC, f'{name}.html'), encoding='utf-8').read()
    body = html[html.index('<body>') + 6:]
    body = re.sub(r'<p class="nav">.*?</p>', '', body, flags=re.S)
    ko, en = body.split('<hr/>', 1)
    data[name] = {'ko': section(ko), 'en': section(en)}

with open(OUT, 'w', encoding='utf-8') as f:
    f.write('// 자동 생성 — scripts/sync-24stills-legal.py. 직접 고치지 말 것.\n'
            '// 정본: 24STILLS 앱 저장소 docs/legal/*.html\n\n'
            'export type LegalDoc = { title: string; meta: string; html: string };\n'
            'export type LegalPage = { ko: LegalDoc; en: LegalDoc };\n\n'
            'export const LEGAL: Record<"privacy" | "terms" | "support", LegalPage> = '
            + json.dumps(data, ensure_ascii=False, indent=2) + ';\n')
print('wrote', os.path.normpath(OUT), {k: len(v['ko']['html']) for k, v in data.items()})
