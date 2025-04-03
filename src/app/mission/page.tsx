import BackButton from "@/components/BackButton";
import MissionContainer from "@/components/mission/MissionContainer";
import { missionList } from "@/lib/missionList";
import Image from "next/image";
import React from "react";

const MissionPage = () => {
  return (
    <div className="text-secondary">
      <BackButton>미션</BackButton>
      <div className="flex flex-col gap-6">
        <span className="flex justify-center py-4 text-md opacity-80">
          매일 밤 12시에 미션이 다시 시작돼요.
        </span>

        {missionList.map((mission) => {
          return (
            <div className="flex justify-center" key={mission.id}>
              <MissionContainer>
                <div className="flex w-[90%] items-center justify-between">
                  <Image
                    src={mission.src}
                    alt={mission.alt}
                    width={mission.width}
                    height={mission.height}
                    className="ml-5"
                  />
                  <span>{mission.label}</span>
                  <span>{mission.count}</span>
                </div>
              </MissionContainer>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MissionPage;
