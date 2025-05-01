import { cn } from "@/lib/utils";
import Image from "next/image";

interface CalendarGridProps {
  days: (Date | null)[];
  attendanceRecords: { date: string }[];
}

export default function CalendarGrid({
  days,
  attendanceRecords,
}: CalendarGridProps) {
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const hasAttendance = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return attendanceRecords.some((record) => record.date.startsWith(dateStr));
  };
  return (
    <>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map((day, i) => (
          <div
            key={i}
            className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, i) => (
          <div
            key={i}
            className={cn(
              "aspect-square flex items-center justify-center relative",
              day ? "text-gray-800" : "text-transparent"
            )}>
            {day && (
              <>
                <span className="h-8 w-8 flex items-center justify-center rounded-full">
                  {day.getDate()}
                </span>
                {hasAttendance(day) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      fill
                      alt="출석 도장"
                      src="/assets/icons/footprint.svg"
                      className="object-contain"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
