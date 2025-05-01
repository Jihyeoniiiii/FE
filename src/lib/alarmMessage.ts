import { Alarm } from "@/types/dataTypes";
import { v4 as uuidv4 } from "uuid";

export const alarmList: Alarm[] = [
  {
    id: uuidv4(),
    type: "textAlarm",
    message: "펀딩이 완료되었습니다.확인해보세요!",
    created_At: new Date("2025-04-03T15:30:25"),
    image: "/assets/images/study.png",
  },
  {
    id: uuidv4(),
    type: "textAlarm",
    message: "현지현님이 기부에 참여하였습니다.",
    created_At: new Date("2025-04-03T13:30:25"),
    image: "/assets/images/study.png",
  },
  {
    id: uuidv4(),
    type: "requestAlarm",
    message: "박애리님이 친구를 신청했습니다.",
    created_At: new Date("2025-04-03T11:30:25"),
    image: "/assets/icons/woman-profile.png",
  },
  {
    id: uuidv4(),
    type: "textAlarm",
    message: "송재훈님이 기부에 참여하였습니다.",
    created_At: new Date("2025-04-03T09:30:25"),
    image: "/assets/images/study.png",
  },
  {
    id: uuidv4(),
    type: "textAlarm",
    message: "노형준님께서 기부에 참여하였습니다.",
    created_At: new Date("2025-04-03T01:30:25"),
    image: "/assets/images/study.png",
  },
  {
    id: uuidv4(),
    type: "missionAlarm",
    message: "아이템을 획득하였습니다!",
    created_At: new Date("2025-04-02T21:30:25"),
    image: "/assets/icons/mission.svg",
  },
  {
    id: uuidv4(),
    type: "requestAlarm",
    message: "김범준님이 친구를 신청했습니다.",
    created_At: new Date("2025-04-02T19:30:25"),
    image: "/assets/icons/man-profile.png",
  },
  {
    id: uuidv4(),
    type: "requestAlarm",
    message: "송재훈님이 친구를 신청했습니다.",
    created_At: new Date("2025-04-02T17:30:25"),
    image: "/assets/icons/woman-profile.png",
  },
  {
    id: uuidv4(),
    type: "textAlarm",
    message: "수혜자 서류 검토가 완료되었습니다!",
    created_At: new Date("2025-04-02T15:30:25"),
    image: "/assets/icons/paper.png",
  },
];
