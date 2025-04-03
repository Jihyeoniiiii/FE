import { Alarm } from "@/types/dataTypes";
import { randomUUID } from "crypto";

export const alarmList: Alarm[] = [
  {
    id: randomUUID(),
    type: "textAlarm",
    message: "펀딩이 완료되었습니다.확인해보세요!",
    created_At: new Date("2025-04-03T15:30:25"),
    image: "/assets/images/study.png",
  },
  {
    id: randomUUID(),
    type: "textAlarm",
    message: "현지현님이 기부에 참여하였습니다.",
    created_At: new Date("2025-04-03T13:30:25"),
    image: "/assets/images/study.png",
  },
  {
    id: randomUUID(),
    type: "requestAlarm",
    message: "박애리님이 친구를 신청했습니다.",
    created_At: new Date("2025-04-03T11:30:25"),
    image: "/assets/icons/woman-profile.png",
  },
  {
    id: randomUUID(),
    type: "textAlarm",
    message: "송재훈님이 기부에 참여하였습니다.",
    created_At: new Date("2025-04-03T09:30:25"),
    image: "/assets/images/study.png",
  },
  {
    id: randomUUID(),
    type: "textAlarm",
    message: "노형준님께서 기부에 참여하였습니다.",
    created_At: new Date("2025-04-03T01:30:25"),
    image: "/assets/images/study.png",
  },
  {
    id: randomUUID(),
    type: "missionAlarm",
    message: "미션을 완료하였습니다. 아이템을 수령하세요!",
    created_At: new Date("2025-04-02T21:30:25"),
    image: "/assets/icons/mission.svg",
  },
  {
    id: randomUUID(),
    type: "requestAlarm",
    message: "김범준님이 친구를 신청했습니다.",
    created_At: new Date("2025-04-02T19:30:25"),
    image: "/assets/icons/man-profile.png",
  },
  {
    id: randomUUID(),
    type: "requestAlarm",
    message: "송재훈님이 친구를 신청했습니다.",
    created_At: new Date("2025-04-02T17:30:25"),
    image: "/assets/icons/woman-profile.png",
  },
  {
    id: randomUUID(),
    type: "textAlarm",
    message: "수혜자 서류 검토가 완료되었습니다!",
    created_At: new Date("2025-04-02T15:30:25"),
    image: "/assets/icons/paper.png",
  },
];
