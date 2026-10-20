/* 수상한 명언 수사본부 — 사건 게시판 데이터 (공개).
 * 쓰는 사람은 우리뿐이라 DB 대신 이 파일로 둔다: 사건을 더하거나 상태를 바꾸고 커밋 → push 하면 게시판에 실린다.
 * 들어온 제보(fq_reports, 비공개)를 그대로 옮기지 않는다 — 명언·인물·판결문은 우리가 정리해 적는다. 제보 원문·이메일은 절대 적지 않는다.
 * 운영 절차: 앱 저장소 APLUS/fishyquotes/docs/CASE_BOARD.md
 *
 * 예)
 *   { no: '0007', date: '2026-11-07', kind: 'err', caseId: 'k-5',
 *     quote: { ko: '악법도 법이다.', en: 'A bad law is still the law.' }, who: { ko: '소크라테스', en: 'Socrates' },
 *     status: 'verdict', verdict: 'unchanged',
 *     summary: { ko: '…다시 대조한 결과 원판정(가짜)이 맞다…', en: '…' },
 *     sources: ['https://…'], fixedIn: '', nickname: '소크라테스팬', pinned: true }
 */

export type Status = 'received' | 'investigating' | 'verdict' | 'dismissed';
export type Verdict = 'real' | 'fake' | 'twisted' | 'unchanged';
type T = { ko: string; en: string };

export type BoardCase = {
  /** 접수번호 — 제보 양식이 알려 준 번호(네 자리) */
  no: string;
  /** 게시판에 올린 날 YYYY-MM-DD */
  date: string;
  /** err = 앱 판정에 대한 이의 · new = 새 수상한 명언 */
  kind: 'err' | 'new';
  /** 앱의 사건 번호(err 일 때, 또는 새 사건이 된 뒤) */
  caseId?: string;
  quote: T;
  who: T;
  status: Status;
  /** status 가 verdict 일 때 */
  verdict?: Verdict;
  /** 판결문 2~3줄(verdict) 또는 기각 이유 한 줄(dismissed) */
  summary?: T;
  sources?: string[];
  /** 앱에 반영된 버전(예: '1.0.1') */
  fixedIn?: string;
  /** 제보자가 동의한 닉네임만 */
  nickname?: string;
  /** 이번 주 수배 명언 — 한 건만 */
  pinned?: boolean;
};

export const BOARD: BoardCase[] = [];
