import { Search } from "lucide-react";
import React from "react";

const TableSearch = () => {
  return (
    <div className="flex items-center gap-3 text-xs px-3 rounded-full ring-[1.5px] ring-gray-300">
      <Search />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none w-[200px] p-3"
      />
    </div>
  );
};

export default TableSearch;
