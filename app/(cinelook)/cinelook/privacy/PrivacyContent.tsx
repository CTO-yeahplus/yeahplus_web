'use client';

/* 원본 NEXTGEN_CINEMATIC/site/src/pages/Privacy.jsx — 문안은 한 글자도 고치지 않았다.
   바뀐 것: 라우팅(react-router → next/link, 경로에 /cinelook 접두)과 문의 주소(contact@).
   ⚠️ 이 주소가 App Store Connect 의 개인정보 처리방침 URL 이다.
   앱의 실제 동작 · PrivacyInfo · ASC App Privacy("데이터를 수집하지 않음")와 반드시 일치해야 한다. */

import Link from 'next/link';
import { COMPANY, MAIL, useLang } from '../i18n';

const EFFECTIVE = '2026-09-15';

export default function PrivacyContent() {
  const { L } = useLang();

  return (
    <div className="cl-wrap cl-narrow cl-doc">
      <h1>{L('개인정보 처리방침', 'Privacy Policy')}</h1>
      <p className="cl-meta">
        {L(`시행일 ${EFFECTIVE} · ${COMPANY}`, `Effective ${EFFECTIVE} · ${COMPANY}`)}
      </p>

      <div className="cl-callout">
        <p>
          <strong>{L('요약 — 아무것도 수집하지 않습니다.', 'In short — we collect nothing.')}</strong>
        </p>
        <p>
          {L(
            'CineLook 은 어떤 개인정보도 수집·저장·전송하지 않습니다. 앱에는 네트워크 기능, 분석 도구, 광고 SDK, 계정 시스템이 없습니다.',
            'CineLook does not collect, store or transmit any personal data. The app contains no networking, no analytics, no advertising SDKs and no accounts.'
          )}
        </p>
      </div>

      <h2>{L('1. 사진과 카메라', '1. Photos and camera')}</h2>
      <ul>
        <li>
          {L(
            '불러온 사진과 카메라 영상은 오직 기기 안에서만 처리됩니다. 어디에도 업로드되지 않으며, 개발자를 포함한 누구도 접근할 수 없습니다.',
            'Imported photos and the camera feed are processed only on your device. Nothing is uploaded, and no one — including the developer — can access them.'
          )}
        </li>
        <li>
          {L(
            '사진 불러오기는 iOS 시스템 사진 선택 화면을 사용하므로, 선택한 사진 외에는 앱이 사진 보관함을 볼 수 없습니다.',
            'Importing uses the iOS system photo picker, so the app can only see the photos you choose.'
          )}
        </li>
        <li>
          {L(
            '카메라 권한은 앱 안에서 촬영할 때만 사용됩니다. 거절해도 불러오기로 모든 기능을 쓸 수 있습니다.',
            'Camera access is used only when you shoot inside the app. If you decline, every feature still works with imported photos.'
          )}
        </li>
        <li>
          {L(
            '사진 권한은 "추가 전용"입니다. 저장 버튼을 누르면 결과물이 사진 앱에 새 사진으로 추가될 뿐, 기존 사진을 읽거나 수정하지 않습니다.',
            'Photo access is add-only. Saving adds the result to Photos as a new picture; existing photos are never read or modified.'
          )}
        </li>
      </ul>

      <h2>{L('2. 온디바이스 AI', '2. On-device AI')}</h2>
      <p>
        {L(
          'AI 조명 기능은 기기에 내장된 Apple Vision 프레임워크와 앱에 포함된 깊이 추정 모델로 인물 영역과 깊이를 계산합니다. 계산은 기기 안에서만 이루어지고 결과는 편집 중에만 메모리에 있다가 사라집니다. 얼굴을 식별하거나 생체 정보를 만들지 않습니다.',
          'The AI light feature estimates the person area and scene depth using Apple’s built-in Vision framework and a depth model bundled with the app. This runs only on your device, and the results exist in memory only while you edit. It does not identify faces or create biometric data.'
        )}
      </p>

      <h2>{L('3. 앱 안에 저장되는 것', '3. What the app keeps on your device')}</h2>
      <p>
        {L(
          '언어·레터박스 같은 설정값과 Pro 구매 여부만 기기 안에 저장됩니다. 이 정보는 기기 밖으로 나가지 않으며, 앱을 삭제하면 함께 지워집니다.',
          'Only settings such as language and letterbox, and whether Pro has been purchased, are stored on your device. They never leave it and are deleted with the app.'
        )}
      </p>

      <h2>{L('4. 앱 내 구매', '4. In-app purchase')}</h2>
      <p>
        {L(
          'CineLook Pro 구매와 복원은 Apple 의 App Store 가 처리합니다. 결제 정보는 Apple 이 관리하며 앱과 개발자는 이에 접근하지 않습니다. Apple 의 개인정보 처리는 Apple 의 개인정보 처리방침을 따릅니다.',
          'CineLook Pro purchases and restores are handled by Apple’s App Store. Payment details are managed by Apple and are never accessible to the app or to us. Apple’s handling of your data is governed by Apple’s privacy policy.'
        )}
      </p>

      <h2>{L('5. 제3자 제공 · 추적', '5. Third parties and tracking')}</h2>
      <p>
        {L(
          '수집하는 정보가 없으므로 제3자에게 제공하거나 위탁하는 정보도 없습니다. 앱은 사용자를 추적하지 않으며 광고 식별자(IDFA)에 접근하지 않습니다.',
          'Because we collect nothing, nothing is shared with or processed by third parties. The app does not track you and does not access the advertising identifier (IDFA).'
        )}
      </p>

      <h2>{L('6. 연령', '6. Age')}</h2>
      <p>
        {L(
          '앱은 연령과 무관하게 어떤 정보도 수집하지 않습니다.',
          'The app collects no information from anyone, regardless of age.'
        )}
      </p>

      <h2>{L('7. 변경', '7. Changes')}</h2>
      <p>
        {L(
          '이 방침이 바뀌면 이 페이지에 새 시행일과 함께 게시합니다. 데이터를 수집하게 되는 변경이라면 앱 업데이트 전에 먼저 알려 드립니다.',
          'If this policy changes, we will post it here with a new effective date. Any change that would involve collecting data will be announced before the app update ships.'
        )}
      </p>

      <h2>{L('8. 문의', '8. Contact')}</h2>
      <p>
        {L('개인정보 보호 책임자', 'Privacy contact')} · {COMPANY} ·{' '}
        <a className="cl-mailto" href={`mailto:${MAIL}`}>
          {MAIL}
        </a>
      </p>

      <p className="cl-meta" style={{ marginTop: 30 }}>
        <Link href="/cinelook/terms">{L('이용 약관', 'Terms of Use')}</Link>
        {' · '}
        <Link href="/cinelook/support">{L('고객 지원', 'Support')}</Link>
      </p>
    </div>
  );
}
