"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import TabletSearchIcon from "./DesktopSearchIcon";
import LangItems from "./Langitems";
import NavDivider from "./NavDivider";
import NavItem from "./NavbarItem";
import { FavouriteSvg, ShoppingCartSvg } from "@/icons/global";

const DesktopActions = () => {
  const t = useTranslations();

  return (
    <div className="hidden md:flex items-center">
      <TabletSearchIcon />

      {/* Language Selector */}
      <div className="flex items-center">
        <LangItems />
        <NavDivider />
      </div>

      {/* Favorites */}
      <Link href={"/favourites"} className="flex items-center">
        <NavItem
          icon={<FavouriteSvg className="shrink-0" />}
          label={t("navbar.favorites")}
        />
        <NavDivider />
      </Link>

      {/* Cart */}
      <Link href={"/cart"}>
        <NavItem
          icon={<ShoppingCartSvg className="shrink-0" />}
          label={t("navbar.cart")}
        />
      </Link>
    </div>
  );
};

export default DesktopActions;
