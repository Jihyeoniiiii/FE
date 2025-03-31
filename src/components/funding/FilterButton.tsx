import { ChevronDown } from "lucide-react";
import React from "react";

const FilterButtons = () => {
  return (
    <div className="absolute top-[8vh] flex gap-2">
      <button className={StButton}>
        최신순 <ChevronDown className="h-4 w-4" />
      </button>
      <button className={StButton}>
        추천순 <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
};
const StButton =
  "flex items-center gap-1 bg-white text-sm rounded-lg px-2 py-1.5 shadow-sm";

export default FilterButtons;
