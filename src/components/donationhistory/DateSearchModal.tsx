"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useEffect } from "react";

interface DateSearchModalProps {
  isDateModalOpen: boolean;
  setIsDateModalOpen: (open: boolean) => void;
}

const DateSearchModal = ({
  isDateModalOpen,
  setIsDateModalOpen,
}: DateSearchModalProps) => {
  const getTodayDateTime = () => {
    // 현재 날짜 시간 계산
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16); // 'YYYY-MM-DDTHH:mm'
  };

  const [startDate, setStartDate] = useState(getTodayDateTime());
  const [endDate, setEndDate] = useState(getTodayDateTime());
  const [isVisible, setIsVisible] = useState(false);

  // 모달 mount 후 등장 애니메이션 트리거
  useEffect(() => {
    if (isDateModalOpen) {
      // mount 되자마자 opacity/scale을 바로 주지 않고 약간 딜레이
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 30); // 30~50ms 정도가 자연스러움
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [isDateModalOpen]);

  const handleClose = () => {
    setIsVisible(false); // scale/opacity 축소 시작
    setTimeout(() => {
      setIsDateModalOpen(false); // 실제로 unmount
    }, 300); // 애니메이션 시간과 맞춰줘야 함
  };

  return (
    <div
      className={`absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}>
      <div className="relative max-w-[90vw] ">
        <div className="rounded-3xl bg-white border border-transparent mt-[58vh] overflow-hidden">
          <div
            className={`p-6 h-[34vh] transition-all duration-500 transform ${
              isDateModalOpen ? "scale-100" : "scale-95"
            }`}
            onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl text-secondary font-semibold mb-6 opacity-80">
              기간 선택
            </h3>

            <div className="mt-8 space-y-6">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="startDate"
                  className="text-right text-base text-secondary opacity-90">
                  시작일
                </Label>
                <div className="flex items-center">
                  <Input
                    type="datetime-local"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="mt-0.5 text-sm text-base p-2 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <Label
                  htmlFor="startDate"
                  className="text-right text-base text-secondary opacity-90">
                  종료일
                </Label>
                <div className="flex items-center">
                  <Input
                    type="datetime-local"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="mt-0.5 text-sm text-base p-2 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <Button
                variant="gray"
                className="h-10 text-base text-secondary rounded-2xl py-3"
                onClick={handleClose}>
                닫기
              </Button>
              <Button
                className="h-10 text-base text-white rounded-2xl py-3 "
                onClick={handleClose}>
                선택완료
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DateSearchModal;
