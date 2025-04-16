"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";

const TableSearch = () => {
  const router = useRouter();
  const handelSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = (e.currentTarget[0] as HTMLInputElement).value;
    const params = new URLSearchParams(window.location.search);
    params.set("search", value);
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <form
      className="flex items-center gap-3 text-xs px-3 rounded-full ring-[1.5px] ring-gray-300"
      onSubmit={handelSubmit}
    >
      <Search />
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none w-[200px] p-3"
      />
    </form>
  );
};

export default TableSearch;
