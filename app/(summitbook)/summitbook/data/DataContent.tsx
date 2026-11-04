'use client';

/* 산 데이터 공개 — 앱에 들어 있는 정상 좌표 표(summits.json)는 OpenStreetMap 좌표를 담은 파생 데이터베이스라 ODbL 1.0 으로 공개한다
   (APLUS/summitbook/data/SOURCES.md 4절). 파일 = public/summitbook/summits.json — 원본 APLUS/summitbook/data/summits.json 을 그대로 복사.
   앱의 '정보 · 출처' 화면이 이 주소를 가리킨다. 앱의 좌표가 바뀌면 이 파일도 같이 바꾼다. */

import { useEffect, useMemo, useState } from 'react';
import { EMAIL } from '../i18n';
import { APP } from '../names';

type Row = { id: number; name: string; peak: string; height: number; sido: string; region: string; lat: number | null; lon: number | null; src: string; check: boolean; note: string };
const FILE = '/summitbook/summits.json';
const ODBL = 'https://opendatacommons.org/licenses/odbl/1-0/';
const OSM = 'https://www.openstreetmap.org/copyright';
const DATA_GO = 'https://www.data.go.kr/data/15112801/fileData.do';

export default function DataContent() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [q, setQ] = useState('');
  useEffect(() => {
    let live = true;
    fetch(FILE)
      .then((r) => r.json())
      .then((d: Row[]) => live && setRows(d))
      .catch(() => live && setRows([]));
    return () => {
      live = false;
    };
  }, []);
  const shown = useMemo(() => (rows || []).filter((r) => !q || `${r.name} ${r.peak} ${r.sido} ${r.region}`.includes(q.trim())), [rows, q]);

  return (
    <div className="sb-wrap sb-doc">
      <div className="sb-doc-head">
        <h1>
          산 데이터
          <br />
          Summit data
        </h1>
        <div className="sb-sub">
          {APP.ko} · {APP.en} — summits.json
        </div>
        <div className="sb-rev">Open Database License (ODbL) 1.0</div>
      </div>

      <div className="sb-callout">
        <p>
          {APP.ko} 앱이 정상 판정에 쓰는 100대 명산 정상 좌표 표를 <strong>Open Database License(ODbL) 1.0</strong> 으로 공개합니다. 앱 안에 들어 있는 것과
          같은 파일입니다.
        </p>
        <p style={{ marginTop: '10px' }}>
          The summit coordinate table {APP.en} uses to judge summits is published under the <strong>Open Database License (ODbL) 1.0</strong>. It is the
          same file that ships inside the app.
        </p>
      </div>

      <section>
        <a className="sb-dl" href={FILE} download="summits.json">
          <b>↓ summits.json</b>
          <small>JSON · 100 rows · ~35 KB</small>
        </a>
      </section>

      <section>
        <h2>출처 · Attribution</h2>
        <ul className="sb-bullets">
          <li>
            정상 좌표: <strong>© OpenStreetMap contributors</strong> (<a href={OSM}>openstreetmap.org/copyright</a>), ODbL 1.0
          </li>
          <li>
            산 목록 · 높이 · 소재지: <strong>산림청 「100대 명산」</strong>(2002년 선정 · 공표)
          </li>
          <li>
            정상 좌표 대조: 산림청 국립자연휴양림관리소 「숲나들e 숲길 100대명산 정보」(<a href={DATA_GO}>공공데이터포털 15112801</a>, 이용허락범위 제한 없음)
          </li>
        </ul>
        <div className="sb-en-block">
          <ul className="sb-bullets">
            <li>
              Summit coordinates: <strong>© OpenStreetMap contributors</strong> (<a href={OSM}>openstreetmap.org/copyright</a>), ODbL 1.0
            </li>
            <li>
              Mountain list, heights and locations: <strong>Korea Forest Service, &ldquo;100 Famous Mountains&rdquo;</strong> (selected and announced in 2002)
            </li>
            <li>
              Coordinate cross-check: Korea Forest Service open data, Public Data Portal dataset <a href={DATA_GO}>15112801</a> (no usage restrictions)
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>라이선스 · License</h2>
        <p>
          이 데이터베이스는 <a href={ODBL}>Open Database License (ODbL) 1.0</a> 으로 제공합니다. 출처를 밝히면 자유롭게 쓰고 고치고 나눌 수 있으며, 이 데이터를
          고쳐 만든 데이터베이스를 공개할 때는 같은 ODbL 로 공개해야 합니다. 앱의 화면 · 그림 · 코드는 이 라이선스에 포함되지 않습니다.
        </p>
        <div className="sb-en-block">
          <p>
            This database is made available under the <a href={ODBL}>Open Database License (ODbL) 1.0</a>. You are free to use, adapt and share it with
            attribution; if you publicly use an adapted version of the database, you must offer it under the ODbL too. The app&rsquo;s screens, graphics and
            code are not covered by this license.
          </p>
        </div>
      </section>

      <section>
        <h2>어떻게 골랐나 · How the coordinates were chosen</h2>
        <ul className="sb-bullets">
          <li>OpenStreetMap 의 정상 봉우리 가운데 이름이 맞고 높이가 산림청 높이와 ±30m 안인 곳을 찾았습니다.</li>
          <li>그 봉우리가 산림청 공공데이터 좌표와 150m 안이면 공공데이터 좌표를 쓰고, 아니면 OpenStreetMap 정상 좌표를 씁니다(공공데이터 좌표는 정상이 아닌 산 대표 지점인 경우가 많습니다).</li>
          <li>
            <code>check: false</code> 인 6곳은 아직 확인이 덜 된 곳입니다. 이유는 각 줄의 <code>note</code> 에 있습니다. 틀린 곳을 아시면{' '}
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a> 로 알려 주십시오.
          </li>
        </ul>
        <div className="sb-en-block">
          <ul className="sb-bullets">
            <li>We looked for OpenStreetMap peaks whose name matches and whose elevation is within ±30 m of the Korea Forest Service height.</li>
            <li>If that peak is within 150 m of the Forest Service open-data point, the open-data point is used; otherwise the OpenStreetMap summit is used (the open-data points are often a representative point of the mountain, not its summit).</li>
            <li>
              The 6 rows with <code>check: false</code> are not fully verified yet; the reason is in each row&rsquo;s <code>note</code>. Spotted an error? Email{' '}
              <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </li>
          </ul>
        </div>
      </section>

      <section>
        <h2>칸 · Fields</h2>
        <p style={{ fontFamily: 'var(--sb-mono)', fontSize: '13px' }}>
          id · name · peak · height(m) · sido · region · lat · lon (WGS84) · src · check · note
        </p>
      </section>

      <section>
        <h2>미리 보기 · Preview</h2>
        <input className="sb-search" type="search" placeholder="산 이름 · 지역 / name · region" value={q} onChange={(e) => setQ(e.target.value)} aria-label="search" />
        <div className="sb-table-wrap">
          <table className="sb-table">
            <thead>
              <tr>
                <th>id</th>
                <th>name</th>
                <th>peak</th>
                <th>height</th>
                <th>sido</th>
                <th>lat</th>
                <th>lon</th>
                <th>check</th>
              </tr>
            </thead>
            <tbody>
              {rows == null ? (
                <tr>
                  <td colSpan={8}>…</td>
                </tr>
              ) : (
                shown.map((r) => (
                  <tr key={r.id} title={r.note}>
                    <td className="sb-num">{r.id}</td>
                    <td>{r.name}</td>
                    <td>{r.peak}</td>
                    <td className="sb-num">{r.height}</td>
                    <td>{r.sido}</td>
                    <td className="sb-num">{r.lat ?? '—'}</td>
                    <td className="sb-num">{r.lon ?? '—'}</td>
                    <td className="sb-num">{r.check ? '✓' : '·'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
