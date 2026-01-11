"use client";
import { useTranslations } from "next-intl";
import DetectLocation from "./DetectLocation";
import { ChangeScreenModeSvg, FavouriteSvg } from "@/icons/global";
import { getCategories } from "@/constants/categories";
import { Link } from "@/i18n/routing";
import LangItems from "./Langitems";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import LoginButton from "./LoginButton";

const DrawerContentBox = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col h-full">
      <div className="border-b-2 p-3 border-grey-100">
        <DetectLocation className="py-2 px-4" isVisible />
      </div>

      <Link href={"/favorites"} className="border-b-2 p-3 border-grey-100">
        <div className="py-2 px-4 flex items-center gap-2">
          <FavouriteSvg />
          <span className="typo-regular2">{t("navbar.favorites")}</span>
        </div>
      </Link>

      <div
        tabIndex={0}
        className="max-h-[calc(100vh-350px)] overflow-y-auto hide-scrollbar"
      >
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="cursor-pointer p-3 no-underline! items-center!">
              <div className="py-2 px-4 flex items-center gap-2">
                <ChangeScreenModeSvg />
                <span className="typo-regular2">{t("home.categories")}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col ps-[56px]! pe-[12px]!">
              <Accordion type="single" collapsible className="w-full">
                {getCategories().map((item) => {
                  return <CategoryItem key={item.id} item={item} />;
                })}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="border-y-2 p-3 border-grey-100">
        <LangItems className="py-2 px-4" isVisible />
      </div>

      <div className="py-2 px-6">
        <LoginButton />
      </div>
    </div>
  );
};
export default DrawerContentBox;

const CategoryItem = ({ item }: { item: any }) => {
  const t = useTranslations();
  const childrens = [
    { id: 1, text: t("home.byHealthCondition") },
    { id: 2, text: t("home.coughAndCold") },
    { id: 3, text: t("home.eyeAndEarDrops") },
    { id: 4, text: t("home.childrenMedications") },
    { id: 5, text: t("home.stomachAndColon") },
    { id: 6, text: t("home.dermatology") },
    { id: 7, text: t("home.allergy") },
  ];

  return (
    <AccordionItem value={`child-${item.id}`}>
      <AccordionTrigger className="cursor-pointer py-2! no-underline! items-center!">
        <span className="typo-regular1">{item.text}</span>
      </AccordionTrigger>
      <AccordionContent className="flex flex-col gap-2 p-[24px_16px]! bg-grey-50">
        {childrens.map((child) => {
          return (
            <div key={child.id} className="text-sm leading-[35px]">
              {child.text}
            </div>
          );
        })}
      </AccordionContent>
    </AccordionItem>
  );
};
