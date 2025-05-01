import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
}

export default function CalendarHeader({ currentDate, onPrev, onNext }: Props) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="flex items-center justify-between mb-4">
      <button onClick={onPrev} className="p-1">
        <ChevronLeft className="h-5 w-5 text-gray-500" />
      </button>
      <h2 className="text-lg font-semibold">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h2>
      <button onClick={onNext} className="p-1">
        <ChevronRight className="h-5 w-5 text-gray-500" />
      </button>
    </div>
  );
}
