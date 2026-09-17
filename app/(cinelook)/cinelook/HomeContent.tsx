'use client';

/* 원본 NEXTGEN_CINEMATIC/site/src/pages/Home.jsx — 문안은 한 글자도 고치지 않았다.
   바뀐 것: react-router Link → next/link(경로에 /cinelook 접두), <img> → next/image,
   이미지 확장자 jpg → webp. */

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from './i18n';
import { StoreButton } from './chrome';

export default function HomeContent() {
  const { lang, L } = useLang();
  // 앱 화면도 언어를 따라간다 (영문 심사자에게 한글 화면을 보여주지 않기 위해)
  const img = (n: number) => `/cinelook/img/s${n}${lang === 'en' ? '-en' : ''}.webp`;

  const features = [
    {
      k: '01',
      h: L('필름카메라 8종', 'Eight film cameras'),
      p: L(
        'Pocket CCD · Disposable 27 · Night Flash · Instant Pack… 플래시 번짐, 붉은 할레이션, 싼 렌즈의 색 번짐, 주황빛 날짜 스탬프까지 찍는 순간 입혀집니다.',
        'Pocket CCD, Disposable 27, Night Flash, Instant Pack and more — flash bloom, red halation, cheap-lens fringing and an orange date stamp, applied as you shoot.'
      ),
    },
    {
      k: '02',
      h: L('4컷 부스', 'Four-shot booth'),
      p: L(
        '셔터 한 번에 네 장을 연속으로. 스트립·블랙 스트립·2×2 그리드·듀오 레이아웃으로 바로 완성됩니다. 앨범에서 여러 장을 골라 만들 수도 있어요.',
        'One tap takes four shots in a row, laid out as a strip, a black strip, a 2×2 grid or a duo. You can also pick several photos from your library.'
      ),
    },
    {
      k: '03',
      h: L('프레임 20종', 'Twenty frames'),
      p: L(
        '인스턴트 사진, 35mm 필름, 디카 화면, 슬라이드, 티켓, 엽서, 매거진 커버까지. 사진 한 장이 오브제가 됩니다.',
        'Instant prints, 35mm film, a digicam screen, slides, tickets, postcards and a magazine cover. One photo becomes an object.'
      ),
    },
    {
      k: '04',
      h: L('영화 필터 30종', 'Thirty movie filters'),
      p: L(
        '필름 · 네온 밤 · 시네마 · 파스텔 · 무드 · 모노, 6가지 무드. 원본과 완전히 다른 과감한 색감을 탭 한 번으로.',
        'Film, Neon Night, Cinema, Pastel, Mood and Mono. Bold colour that looks nothing like the original, in a single tap.'
      ),
    },
    {
      k: '05',
      h: L('AI 입체 조명', 'AI depth lighting'),
      p: L(
        '기기 안의 AI가 인물과 깊이를 읽어, 얼굴 굴곡을 따라 떨어지는 키 라이트와 인물 뒤에서 터지는 역광을 만듭니다.',
        'On-device AI reads the person and the depth of the scene, then adds a key light that follows the shape of a face, or a backlight that bursts from behind.'
      ),
    },
    {
      k: '06',
      h: L('계정 · 광고 · 수집 없음', 'No account, ads or tracking'),
      p: L(
        '모든 처리는 기기 안에서. 앱에는 네트워크 기능 자체가 없습니다. 저장은 원본을 건드리지 않고 새 사진으로.',
        'Everything happens on your device — the app has no networking at all. Saving never touches the original; it adds a new photo.'
      ),
    },
  ];

  const shots = [
    {
      n: 2,
      alt: L('4컷 부스 스트립 레이아웃', 'Four-shot booth strip layout'),
      cap: L(
        <>
          <b>셔터 한 번</b>에 4컷 완성
        </>,
        <>
          <b>One tap</b>, four shots
        </>
      ),
    },
    {
      n: 3,
      alt: L('인스턴트 프레임과 골든 아워 필터', 'Instant frame with the Golden Hour filter'),
      cap: L(
        <>
          프레임 <b>20종</b>
        </>,
        <>
          <b>Twenty</b> frames
        </>
      ),
    },
    {
      n: 4,
      alt: L('영화 필터 목록과 틸 & 오렌지 적용 화면', 'Movie filters with Teal & Orange applied'),
      cap: L(
        <>
          영화 필터 <b>30종</b>
        </>,
        <>
          <b>Thirty</b> movie filters
        </>
      ),
    },
  ];

  return (
    <>
      <section className="cl-hero">
        <div className="cl-wrap cl-hero-grid">
          <div>
            <span className="cl-eyebrow">
              {L('필름카메라 · 시네마 · iPhone', 'Film camera · Cinema · iPhone')}
            </span>
            <h1>
              {L(
                <>
                  그 시절 디카 감성부터
                  <br />
                  <em>영화의 한 장면</em>까지.
                </>,
                <>
                  From old digicam vibes
                  <br />
                  to <em>a scene from a movie.</em>
                </>
              )}
            </h1>
            <p className="cl-lead">
              {L(
                <>
                  찍거나 불러와서, 카메라·필터·프레임을 <b>탭하면 끝.</b> 구독 없이, 한 번 사면
                  평생.
                </>,
                <>
                  Shoot or import, then <b>tap a camera, filter or frame.</b> No subscription — buy
                  once, keep forever.
                </>
              )}
            </p>
            <div className="cl-cta-row">
              <StoreButton />
              <Link className="cl-btn cl-ghost" href="/cinelook/support">
                {L('자주 묻는 질문', 'Read the FAQ')}
              </Link>
            </div>
            <ul className="cl-pills">
              <li>{L('계정 없음', 'No account')}</li>
              <li>{L('광고 없음', 'No ads')}</li>
              <li>{L('데이터 수집 없음', 'No data collected')}</li>
              <li>{L('워터마크 없음', 'No watermark')}</li>
            </ul>
          </div>
          <div className="cl-phone">
            <Image
              src={img(1)}
              width={600}
              height={1304}
              priority
              sizes="(max-width: 860px) 80vw, 330px"
              alt={L(
                'CineLook 카메라 탭 — Pocket CCD 바디와 날짜 스탬프',
                'CineLook camera tab with the Pocket CCD body and date stamp'
              )}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="cl-wrap">
          <div className="cl-sec-head">
            <h2>
              {L('한 앱에 카메라, 프레임, 영화 색감.', 'Camera, frames and film colour in one app.')}
            </h2>
            <p>
              {L(
                '필름카메라 앱과 색보정 앱을 오갈 필요가 없습니다.',
                'No more jumping between a retro camera app and a colour-grading app.'
              )}
            </p>
          </div>
          <div className="cl-cards">
            {features.map((f) => (
              <div className="cl-card" key={f.k}>
                <div className="cl-num" aria-hidden="true">
                  {f.k}
                </div>
                <h3>{f.h}</h3>
                <p>{f.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cl-tight">
        <div className="cl-wrap">
          <div className="cl-shots">
            {shots.map((s) => (
              <figure className="cl-shot" key={s.n}>
                <Image
                  src={img(s.n)}
                  width={600}
                  height={1304}
                  alt={s.alt}
                  loading="lazy"
                  sizes="(max-width: 600px) 300px, (max-width: 860px) 30vw, 330px"
                />
                <figcaption>{s.cap}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="cl-wrap">
          <div className="cl-sec-head">
            <h2>{L('무료로 시작, 한 번 사면 평생.', 'Start free. Buy once, keep forever.')}</h2>
            <p>
              {L(
                '구독이 아닙니다. 잠긴 템플릿도 미리보기는 자유예요.',
                'Not a subscription. Locked templates can still be previewed freely.'
              )}
            </p>
          </div>
          <div className="cl-plans">
            <div className="cl-plan">
              <h3>{L('무료', 'Free')}</h3>
              <ul>
                <li>{L('필름카메라 3종', '3 film cameras')}</li>
                <li>{L('영화 필터 8종', '8 movie filters')}</li>
                <li>{L('프레임 5종 · 4컷 스트립', '5 frames · booth strip')}</li>
                <li>{L('촬영 · 불러오기 · 저장 무제한', 'Unlimited shooting, importing, saving')}</li>
                <li>{L('워터마크 없음', 'No watermark')}</li>
              </ul>
            </div>
            <div className="cl-plan cl-pro">
              <span className="cl-tag">{L('평생 소장', 'Lifetime')}</span>
              <h3>CineLook Pro</h3>
              <ul>
                <li>{L('필름카메라 8종 · 필터 30종 전부', 'All 8 cameras and 30 filters')}</li>
                <li>{L('프레임 20종 · 레이아웃 4종 전부', 'All 20 frames and 4 layouts')}</li>
                <li>{L('AI 입체 조명 · 역광', 'AI depth light and backlight')}</li>
                <li>
                  {L(
                    '세부 조정 — 노출·대비·채도·온도·그레인·비네트',
                    'Fine-tune — exposure, contrast, saturation, warmth, grain, vignette'
                  )}
                </li>
                <li>{L('앞으로 추가되는 템플릿 포함', 'Future templates included')}</li>
              </ul>
              <p className="cl-price-note">
                {L(
                  '앱 내 구매 1회 · 가격은 App Store에 표시됩니다',
                  'One in-app purchase · price shown in the App Store'
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="cl-wrap">
          <div className="cl-promise">
            <h2>{L('사진은 기기를 떠나지 않습니다.', 'Your photos never leave your device.')}</h2>
            <ul>
              <li>
                {L(
                  '필터·조명·프레임 처리는 전부 아이폰 안에서 이루어집니다.',
                  'Filters, lighting and frames are all processed on your iPhone.'
                )}
              </li>
              <li>
                {L(
                  '앱에는 네트워크 기능이 없습니다 — 업로드할 방법 자체가 없어요.',
                  'The app has no networking — there is simply no way to upload.'
                )}
              </li>
              <li>
                {L(
                  '사진 권한은 "추가 전용"입니다. 저장할 때만 쓰고, 앨범을 읽지 않습니다.',
                  'Photo access is add-only: used to save, never to read your library.'
                )}
              </li>
              <li>{L('계정, 광고, 분석 도구가 없습니다.', 'No accounts, no ads, no analytics.')}</li>
            </ul>
            <p style={{ marginTop: 20 }}>
              <Link href="/cinelook/privacy">
                <b>{L('개인정보 처리방침 전문 보기 →', 'Read the full privacy policy →')}</b>
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
