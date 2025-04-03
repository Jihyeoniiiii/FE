import { timeAgo } from "@/utils/dateUtils";
import { Button } from "../ui/button";
import Image from "next/image";
import { Alarm } from "@/types/dataTypes";

const TextAlarm = ({ data }: { data: Alarm }) => {
  return (
    <div className="flex gap-5">
      <div className="relative w-10 h-10 flex-shrink-0">
        <Image
          src={data.image}
          alt={data.type}
          width={50}
          height={50}
          className="rounded-full object-cover border"
        />
      </div>
      <div className="flex flex-col flex-grow">
        <div className="flex gap-2 items-center w-full">
          <div className="text-sm text-secondary font-medium">{data.message}</div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="default"
              className="text-xs text-secondary h-7 px-4 rounded-full">
              수락
            </Button>
            <Button
              variant="default"
              size="default"
              className="text-xs h-7 px-4 rounded-full">
              삭제
            </Button>
          </div>
        </div>
        <span className="text-xs text-gray-500 mt-1">
          {timeAgo(data.created_At)}
        </span>
      </div>
    </div>
  );
};

export default TextAlarm;
