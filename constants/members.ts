export interface Member {
  id: string;
  rank: string;
  location: string;
  experience: string;
  age: string;
  motivation: string;
  joined_at: string;
  points?: number;
}

export const PERMANENT_MEMBERS: Member[] = [
  { id: "cntfed", rank: "방장", location: "-", experience: "-", age: "-", motivation: "사령부 총괄", joined_at: "2026-04-19 2:46", points: 1000 },
  { id: "hjrubbi", rank: "회원", location: "청주", experience: "-", age: "40대", motivation: "핵심 대원", joined_at: "2026-04-19 3:50", points: 850 },
  { id: "fire33", rank: "회원", location: "서울", experience: "1-3년", age: "30대", motivation: "경제적자유 열심히공부할게요", joined_at: "2026-04-19 2:46", points: 15 },
  { id: "sebinhi", rank: "회원", location: "인천", experience: "5-10년", age: "40대", motivation: "경제적 자유", joined_at: "2026-04-19 2:57", points: 12 },
  { id: "popsong98", rank: "회원", location: "서울", experience: "1-3년", age: "20대 이하", motivation: "파이어족 되고 싶습니다!!", joined_at: "2026-04-19 3:16", points: 28 },
  { id: "MoneySnipper", rank: "회원", location: "서울", experience: "3-5년", age: "30대", motivation: "빠른 은퇴", joined_at: "2026-04-19 3:26", points: 8 },
  { id: "wlgh8654", rank: "회원", location: "서울", experience: "5-10년", age: "40대", motivation: "미국주식을 통한 경제적 자유 및 적극 활동", joined_at: "2026-04-19 3:49", points: 5 }
];

export const SHEET_CONFIG = {
  ID: '1HbC_U1I78HAdV99X6qS1hmY_RiRGPrHX92AYbBPrIpU',
  NAME_TAB_GID: '1180564490'
};
