import type { Metadata } from 'next';
import PrivacyContent from './PrivacyContent';
import { APP } from '../names';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: `개인정보처리방침 · Privacy Policy — ${APP.ko}`,
  description: `${APP.ko} 앱은 사용자 데이터를 수집하거나 전송하지 않습니다. 위치는 정상 반경을 기기 안에서 판정하는 데에만 쓰고 저장하거나 보내지 않습니다.`,
  alternates: { canonical: '/summitbook/privacy' },
  robots: { index: true, follow: true },
};

export default function SummitBookPrivacyPage() {
  return <PrivacyContent />;
}
