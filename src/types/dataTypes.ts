export type campaignProps = {
  id: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  photo: string;
  title: string;
};

export interface Alarm {
  id: string;
  type: "textAlarm" | "requestAlarm" | "missionAlarm";
  message: string;
  created_At: Date;
  image: string;
}
