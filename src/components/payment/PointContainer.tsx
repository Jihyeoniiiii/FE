import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const PointContainer = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[80%] h-[100px] bg-white/50 border-2 border-white rounded-2xl">
        <div className="flex justify-between p-3">
          <div className="flex gap-1.5">
            <div className="flex justify-center items-center w-7 h-7 rounded-full bg-white">
              <span className="text-[#FC6677] font-semibold text-2xl">P</span>
            </div>
            <span className="flex justify-center items-center text-sm text-secondary">
              나의 보유 포인트
            </span>
          </div>
          <span className="flex justify-center items-center text-sm text-secondary">
            3000 포인트
          </span>
        </div>

        <div className="flex gap-2 px-4 justify-between">
          <span className="flex justify-center items-center w-[25px] text-secondary text-xs font-semibold">
            사용
          </span>
          <Input className="text-right" placeholder="0원" />
          <Button variant="soft" className="text-xs p-2">
            전액사용
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PointContainer;
