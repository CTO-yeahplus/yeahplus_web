// ARKE 법적 고지 공용 상수 (개인정보처리방침 / 이용약관 / 푸터)
// 원본: ARKE 앱의 src/lib/legal.ts — 사업자 정보는 예아플러스 실제 등록 정보로 채웠다.

/** 서비스명 */
export const SERVICE_NAME = 'ARKE';

/** 시행일 — 내용을 개정하면 이 날짜도 함께 갱신한다. */
export const EFFECTIVE_DATE = '2026년 8월 12일';

/** 문의 이메일(개인정보 관련 문의·열람·정정·삭제 요청 창구) */
export const CONTACT_EMAIL = 'contact@yeahplus.co.kr';

export const COMPANY = {
  name: '주식회사 예아플러스',
  ceo: '고재혁',
  address: '경기도 파주시 교하로159번길 33, 3층 304호 에이318(목동동, 목동프라자)',
  bizNumber: '283-88-02519',
  mailorder: '2022-경기파주-2995',
  privacyOfficer: '고재혁 / 대표',
} as const;

/**
 * 개인정보를 처리하는 위탁·제3자 서비스 목록.
 * 국내 개인정보보호법상 국외 이전 사실을 고지해야 하므로 소재 국가를 함께 표기한다.
 */
export const PROCESSORS = [
  {
    name: 'Supabase',
    purpose: '회원 인증(로그인)·학습 기록 데이터베이스 운영',
    items: '이메일, 소셜 계정 식별자, 학습 활동 기록',
    country: '미국',
  },
  {
    name: 'Vercel',
    purpose: '웹 서비스 호스팅 및 전송',
    items: '접속 로그(IP, 브라우저 정보)',
    country: '미국',
  },
  {
    name: 'OpenAI',
    purpose: '오답 진단·해설 생성(AI 코치 기능)',
    items: '학습 문항 풀이 내용(개인 식별정보 미포함)',
    country: '미국',
  },
  {
    name: 'Resend',
    purpose: '인증 코드 등 이메일 발송',
    items: '이메일 주소',
    country: '미국',
  },
] as const;

/** 수집하는 개인정보 항목 */
export const COLLECTED_ITEMS = [
  {
    category: '필수',
    items: '이메일 주소',
    reason: '회원 식별 및 로그인, 인증 코드 발송',
  },
  {
    category: '선택(소셜 로그인 시)',
    items: '닉네임, 프로필 사진',
    reason: '카카오·Google·Apple 계정으로 로그인할 때 해당 서비스가 제공하는 정보',
  },
  {
    category: '자동 수집',
    items: '학습 활동 기록(푼 문항, 정·오답, 학습 시간, 획득 점수), 접속 로그',
    reason: '오답 진단·맞춤 문항 처방 등 서비스 핵심 기능 제공',
  },
] as const;
