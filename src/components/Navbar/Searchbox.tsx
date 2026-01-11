"use client";
import { useState } from "react";
import { SearchSvg } from "@/icons/global";
import { useTranslations } from "next-intl";

const SearchBox = () => {
  const [text, setText] = useState("");
  const t = useTranslations();

  return (
    <div className="hidden lg:flex shrink h-13 max-w-[290px] w-full border-[1.182px] border-grey-100 bg-grey-50 rounded-[1111px] p-[8px_16px] items-center gap-2 focus-within:border-primary-500 transition-colors">
      <SearchSvg />
      <input
        value={text}
        placeholder={t("navbar.searchPlaceholder")}
        onChange={(e) => setText(e.target.value)}
        className="border-none outline-none bg-transparent w-full typo-regular2"
      />
    </div>
  );
};

export default SearchBox;
