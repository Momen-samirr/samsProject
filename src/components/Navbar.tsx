import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { AlertCircle, MessageCircle, Search, User2 } from "lucide-react";
import React from "react";

const Navbar = async () => {
  const user = await currentUser();
  const role = user?.publicMetadata.role as string;
  return (
    <div className="flex items-center justify-between p-5">
      {/* Search Bar*/}
      <div className="hidden md:flex items-center gap-3 text-xs px-3 rounded-full ring-[1.5px] ring-gray-300">
        <Search />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none w-[200px] p-3"
        />
      </div>
      {/* Avatar */}
      <div className="flex items-center gap-6 w-full justify-end">
        <div className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <MessageCircle />
        </div>
        <div className="bg-white relative rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
          <AlertCircle />
          <div className="absolute -top-3 -right-3 bg-sky-500 w-5 h-5 rounded-full text-white flex items-center justify-center">
            3
          </div>
        </div>
        <div className="flex flex-col cursor-pointer">
          <span className="text-xs leading-3 font-semibold">Rawan Mohmed</span>
          <span className="text-[10px] text-right text-gray-500">{role}</span>
        </div>
        <div className="cursor-pointer">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
