import { Alarm } from "@/types/dataTypes";
import { timeAgo } from "@/utils/dateUtils";
import Image from "next/image";
import React from "react";

const RequestAlarm = ({ data }: { data: Alarm }) => {
  return (
    <div className="flex gap-5">
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src={data.image}
          alt="Profile"
          width={50}
          height={50}
          className="rounded-sm object-cover border"
        />
      </div>
      <div className="flex flex-col">
        <div className="text-sm text-secondary font-medium">{data.message}</div>
        <span className="text-xs text-gray-500 mt-1">
          {timeAgo(data.created_At)}
        </span>
      </div>
    </div>
  );
};

export default RequestAlarm;
