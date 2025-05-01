"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import BackButton from "@/components/BackButton";
import { getSavedAttendance, saveAttendance } from "@/lib/attendance";
import { generateCalendarDays } from "@/utils/dateUtils";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import AttendanceModal from "@/components/AttendanceModal";

export default function AttendancePage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceRecords, setAttendanceRecords] = useState<
    { date: string }[] | null
  >(null);

  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const saved = getSavedAttendance();
    setAttendanceRecords(saved);
  }, []);

  useEffect(() => {
    if (attendanceRecords !== null) {
      saveAttendance(attendanceRecords);
    }
  }, [attendanceRecords]);

  if (attendanceRecords === null) {
    return <div>불러오는 중...</div>; // 혹은 return null;
  }

  const changeMonth = (offset: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1)
    );
  };

  const handleAttendance = () => {
    if (!attendanceRecords) return; // null이면 조기 리턴

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split("T")[0];

    const alreadyChecked = attendanceRecords.some((record) =>
      record.date.startsWith(todayStr)
    );

    if (!alreadyChecked) {
      setAttendanceRecords((prev) =>
        prev
          ? [...prev, { date: today.toISOString() }]
          : [{ date: today.toISOString() }]
      );
      setIsOpenModal(true);
    }
  };

  const days = generateCalendarDays(currentDate);

  return (
    <div className="w-full flex flex-col rounded-xl overflow-hidden">
      <div className="text-center mb-6 sm:mb-4">
        <BackButton>출석 체크</BackButton>
      </div>

      <div className="w-full max-h-full space-y-24 md:space-y-6 px-12 mt-21 md:mt-3">
      <div className="w-full mx-auto bg-white p-6 sm:p-5 md:p-3 rounded-xl shadow-sm">
          <CalendarHeader
            currentDate={currentDate}
            onPrev={() => changeMonth(-1)}
            onNext={() => changeMonth(1)}
          />
          <CalendarGrid days={days} attendanceRecords={attendanceRecords} />
        </div>

        <div className="px-2 flex justify-center">
          <Button
            onClick={handleAttendance}
            className="w-full py-5 mt-6 text-white text-lg rounded-full shadow-md h-15 md:py-3 mb-6 mt-0 ">
            출석 혜택 받기!
          </Button>
        </div>

        <AttendanceModal
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
          totalDays={attendanceRecords.length}
        />
      </div>
    </div>
  );
}
