import React, { useEffect } from "react";

interface ProgressBarProps {
  catData: {
    id: number;
    level: number;
    experiencePoint: number;
    levelUpPercentage: number;
  };
}

const ProgressBar: React.FC<ProgressBarProps> = ({ catData }) => {
  const widthPercent = `${catData.levelUpPercentage}%`;

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-center">
        <div
          className="flex w-[80%] h-4 bg-gray-200 rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Number(catData.levelUpPercentage)}
          aria-valuemin={Number(0)}
          aria-valuemax={Number(100)}>
          <div
            className="flex justify-center h-4 rounded-full overflow-hidden bg-primary whitespace-nowrap transition duration-500"
            style={{ width: widthPercent }}></div>
        </div>
      </div>
      <div className="flex px-10 sm:px-13 md:px-16 justify-between">
        <span className="flex px-3 bg-white text-sm font-semibold items-center rounded-2xl">
          레벨{catData.level}
        </span>
        <span className="text-sm font-semibold">{widthPercent}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
