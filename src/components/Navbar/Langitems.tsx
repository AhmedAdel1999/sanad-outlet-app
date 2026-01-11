"use client";
import { useMemo } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ArrowDownSvg, CheckedSvg } from "@/icons/global";
import SaudiFlag from "@/assets/saudi-flag.png";
import USAFlag from "@/assets/USA-flag.png";

interface LanguageOption {
  id: number;
  shortText: string;
  text: string;
  img: any;
}

const LangItems = ({
  isVisible,
  className,
}: {
  isVisible?: boolean;
  className?: string;
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const languageOptions: LanguageOption[] = [
    { id: 1, shortText: "ar", text: t("common.arabic"), img: SaudiFlag },
    { id: 2, shortText: "en", text: t("common.english"), img: USAFlag },
  ];

  const currentLocale = useMemo(() => {
    return (
      languageOptions.find((item) => item.shortText === locale) ||
      languageOptions[0]
    );
  }, [locale, languageOptions]);

  const handleChangeLang = (lang: string) => {
    const pathnameWithoutLocale = pathname.replace(`/${locale}`, "");
    const newPath = `/${lang}${pathnameWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={`cursor-pointer h-13 flex items-center gap-2 ${
            className ? className : "p-[8px_16px]"
          }`}
        >
          <Image
            alt={currentLocale.text}
            src={currentLocale.img.src}
            width={24}
            height={24}
            className="shrink-0"
          />
          <p
            className={`typo-regular2 ${
              isVisible ? "block" : "hidden lg:block"
            }`}
          >
            {currentLocale.text}
          </p>
          <ArrowDownSvg className="shrink-0" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-0 overflow-hidden" align="end">
        <div className="flex flex-col">
          {languageOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => handleChangeLang(item.shortText)}
              className={`cursor-pointer ${
                item.shortText === locale ? "bg-grey-100/40" : ""
              } p-[8px_16px] flex items-center justify-between w-[160px] hover:bg-grey-100/40 transition-colors`}
            >
              <div className="flex items-center gap-2">
                <Image
                  alt={item.text}
                  src={item.img.src}
                  width={24}
                  height={24}
                />
                <p className="typo-regular2">{item.text}</p>
              </div>
              {item.shortText === locale && <CheckedSvg />}
            </button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LangItems;
