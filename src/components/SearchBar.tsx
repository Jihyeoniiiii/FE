import { Search } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";

type SearchBarProps = {
  placeholdertext: string;
};

const SearchBar = ({ placeholdertext }: SearchBarProps) => {
  return (
    <div className="w-full max-w-xl flex relative">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-gray-500" />
      </div>
      <Input
        type="text"
        placeholder={placeholdertext}
        className="w-full pl-11 h-10 bg-white rounded-full text-sm !placeholder-gray-400 "
      />
    </div>
  );
};

export default SearchBar;
