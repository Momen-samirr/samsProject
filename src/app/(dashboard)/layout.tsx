import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex">
      {/* Left Side */}
      <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-5">
        <Link href={"/"} className="flex items-center gap-3">
          <Image src={"/rawan.png"} alt="logo" width={33} height={33} />
          <span className="hidden lg:block">Rawan Project</span>
        </Link>
        <Menu />
      </div>
      {/* Right Side */}
      <div className="w-[86%] md-w-[92%] lg:w-[84%] xl:w-[86%] bg-[#f5f5f5] overflow-scroll flex flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
