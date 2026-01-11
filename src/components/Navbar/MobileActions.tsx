"use client";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { CancelSvg, MenuSvg, SearchSvg, ShoppingCartSvg } from "@/icons/global";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import DrawerContentBox from "./DrawerContent";

const MobileActions = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setOpenDrawer(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex md:hidden items-center gap-4 bg-grey-50 rounded-[1111px] h-13 p-[8px_16px]">
      <button className="cursor-pointer hover:opacity-70 transition-opacity">
        <SearchSvg />
      </button>
      <div className="bg-grey-100 w-px h-2" />
      <Link
        href={"/cart"}
        className="cursor-pointer hover:opacity-70 transition-opacity"
      >
        <ShoppingCartSvg />
      </Link>
      <div className="bg-grey-100 w-px h-2" />

      <Drawer direction="left" open={openDrawer} onOpenChange={setOpenDrawer}>
        <DrawerTrigger asChild>
          <button className="cursor-pointer hover:opacity-70 transition-opacity">
            <MenuSvg />
          </button>
        </DrawerTrigger>
        <DrawerContent className="w-[300px]!">
          <div>
            <DrawerHeader>
              <DrawerTitle onClick={() => setOpenDrawer(false)}>
                <CancelSvg className="cursor-pointer" />
              </DrawerTitle>
            </DrawerHeader>
            <DrawerContentBox />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default MobileActions;
