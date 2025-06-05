import React, { useState } from "react";
import Dropdown from "../ui/Dropdown";

interface FilterButtonsProps {
  onSortConditionChange: (condition: "최신순" | "추천순") => void;
  currentSortCondition?: "최신순" | "추천순";
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ onSortConditionChange, currentSortCondition }) => {
  const [conditionType, setConditionType] = useState<"최신순" | "추천순">(currentSortCondition || "최신순"); // 초기값을 "최신순"으로 설정
  const conditionOptions: ("최신순" | "추천순")[] = ["최신순", "추천순"];

  const handleConditionTypeSelect = (value: string) => {
    const selectedCondition = value as "최신순" | "추천순";
    setConditionType(selectedCondition);
    onSortConditionChange(selectedCondition);
  };

  return (
      <Dropdown
        options={conditionOptions}
        onSelect={handleConditionTypeSelect}
      >
        {conditionType}
      </Dropdown>
  );
};

export default FilterButtons;