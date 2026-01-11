import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  ArrowDown,
  LogoutIcon,
  PackageThreeIcon,
  SmallLeftArrowIcon,
  UserEditIcon,
} from "@/icons/global";
import AvatarImg from "@/assets/avatar.png";

const UserBtn = () => {
  const t = useTranslations();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          style={{
            background:
              "linear-gradient(85deg, var(--Colors-Primary-500, rgba(33, 191, 115, 0.08)) -6.74%, var(--Colors-Secondary-500, rgba(46, 193, 172, 0.08)) 123.06%)",
          }}
          className="cursor-pointer flex items-center gap-2 h-13 rounded-full ltr:p-[8px_16px_8px_4px] rtl:p-[8px_4px_8px_16px]"
        >
          <Image
            alt="profile img"
            src={AvatarImg.src}
            width={44}
            height={44}
            className="rounded-full"
          />
          <span className="typo-regular2">{t("navbar.myAccount")}</span>
          <ArrowDown />
        </button>
      </PopoverTrigger>
      <PopoverContent className="max-w-[200px] p-0!">
        <Link
          href={"/orders"}
          className="flex items-center gap-2 px-7 py-5 justify-between"
        >
          <PackageThreeIcon />
          <span className="typo-regular2 flex-1">{t("navbar.myOrders")}</span>
          <SmallLeftArrowIcon />
        </Link>
        <Link
          href={"/profile"}
          className="flex items-center gap-2 px-7 py-5 justify-between"
        >
          <UserEditIcon />
          <span className="typo-regular2 flex-1">
            {t("navbar.editAccount")}
          </span>
          <SmallLeftArrowIcon />
        </Link>
        <button className="cursor-pointer w-full flex items-center gap-2 px-7 py-5 justify-between">
          <LogoutIcon />
          <span className="typo-regular2 flex-1">{t("navbar.logout")}</span>
        </button>
      </PopoverContent>
    </Popover>
  );
};
export default UserBtn;
