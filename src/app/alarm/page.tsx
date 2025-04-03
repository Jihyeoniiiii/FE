import { alarmList } from "@/lib/alarmMessage";
import TextAlarm from "@/components/alarm/RequestAlarm";
import RequestAlarm from "@/components/alarm/TextAlarm";
import BackButton from "@/components/BackButton";

export default function AlarmPage() {
  const sortedAlarmList = alarmList.sort(
    (a, b) => b.created_At.getTime() - a.created_At.getTime()
  );

  return (
    <>
      <BackButton />
      <div className="flex justify-center items-center pt-10">
        <div className="h-full overflow-y-scroll pl-8 pr-6 space-y-6 scrollbar-none">
          {sortedAlarmList.map((alarmData) => {
            if (alarmData.type === "requestAlarm") {
              return <TextAlarm key={alarmData.id} data={alarmData} />;
            } else {
              return <RequestAlarm key={alarmData.id} data={alarmData} />;
            }
          })}
        </div>
      </div>
    </>
  );
}
