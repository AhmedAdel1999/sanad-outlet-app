"use client";
import { SearchSvg } from "@/icons/global";
import NavDivider from "./NavDivider";

const TabletSearchIcon = () => (
  <div className="hidden md:flex lg:hidden items-center">
    <div className="h-13 p-[8px_16px] flex items-center gap-2 cursor-pointer">
      <SearchSvg />
    </div>
    <NavDivider />
  </div>
);
export default TabletSearchIcon;
