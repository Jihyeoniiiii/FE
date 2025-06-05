"use client";

import React, { useState } from "react";
import { Button } from "./button";

interface DropdownProps {
    options: string[];
    children?: React.ReactNode;
    onSelect: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, children, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    setSelectedValue(option);
    setIsOpen(false);
    onSelect(option);
  };

  return (
    <div className="relative inline-block text-left w-[100px]"> 
      <Button
        variant="soft"
        size="none" 
        className="flex justify-between w-full px-4 py-1.5 rounded-lg text-base font-semibold opacity-70"
        onClick={toggleDropdown}
      >
        {selectedValue || children || "선택하세요"}
        <svg
          className="-mr-1 ml-2 h-5 w-5 inline-block"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </Button>
      {isOpen && (
        <div className="absolute w-full z-10 mt-1 rounded-md shadow-lg bg-white">
          <div className="py-1">
            {options.map((option: string) => (
              <button
                key={option}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-900 w-full text-left"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
