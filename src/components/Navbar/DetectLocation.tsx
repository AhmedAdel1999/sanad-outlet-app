"use client";
import { ArrowDownSvg, MapLocationSvg } from "@/icons/global";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const DetectLocation = ({
  isVisible,
  className,
}: {
  isVisible?: boolean;
  className?: string;
}) => {
  const t = useTranslations();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className={`${
            isVisible ? "flex" : "hidden md:flex"
          } items-center gap-2 h-13 cursor-pointer shrink-0 rounded-lg ${
            className ? className : "p-2"
          }`}
        >
          <MapLocationSvg />
          <div
            className={`flex items-end gap-1 ${
              isVisible ? "flex" : "md:hidden lg:flex"
            }`}
          >
            <div>
              <p className="typo-regular1 text-grey-500 text-left">
                {t("navbar.deliverTo")}
              </p>
              <p className="typo-regular2 text-left">
                {t("navbar.selectLocation")}
              </p>
            </div>
            <ArrowDownSvg className="-translate-y-2" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogTitle>{t("navbar.selectLocation")}</DialogTitle>
        <div>{/* Add location selection content here */}</div>
      </DialogContent>
    </Dialog>
  );
};

export default DetectLocation;
