"use client";

import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axiosInstance from "@/lib/api/axios";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "@/lib/debounce";

const PointContainer = () => {
  const [usePoints, setUsePoints] = useState<number | "">("");
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const fetchPoints = async () => {
    try {
      const { data } = await axiosInstance.get("/api/v1/member/point");
      return data.data; // 숫자 형태의 포인트 값
    } catch (error) {
      console.error("error:", error);
    }
  };

  const { data: points, isPending } = useQuery({
    queryKey: ["points"],
    queryFn: fetchPoints,
  });

  // 숫자만 입력받도록 핸들링
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setUsePoints(value === "" ? "" : parseInt(value));
    debounce(
      () => {
        console.log("Debounced input:", e.target.value);
      },
      2000,
      timerIdRef
    );
  };

  const handleUseAllPoints = () => {
    if (typeof points === "number") {
      setUsePoints(points);
    }
  };

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
            {isPending ? "조회중" : `${points?.toLocaleString()} P`}
          </span>
        </div>

        <div className="flex gap-2 px-4 justify-between">
          <span className="flex justify-center items-center w-[25px] text-secondary text-xs font-semibold">
            사용
          </span>
          <Input
            className="text-right"
            placeholder="0원"
            value={usePoints === "" ? "" : usePoints.toString()}
            onChange={handleChange}
          />
          <Button
            variant="soft"
            className="text-xs p-2"
            onClick={handleUseAllPoints}>
            전액사용
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PointContainer;
