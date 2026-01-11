"use client";
import { useState } from "react";
import MainPagination from "@/components/Pagination";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb.tsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PanadolImg from "@/assets/Panadol.png";
import { getCategories } from "@/constants/categories";
import ProductCard from "@/components/ProductCard";

const Page = () => {
  const t = useTranslations();
  const [page, setPage] = useState(1);
  const [data, setData] = useState(
    Array.from({ length: 100 }, (_, index) => ({
      id: index + 1,
      price: 5 + index,
      onSale: index === 0 ? true : false,
      hasDiscount: index === 2 ? true : false,
      inCart: index === 2 ? true : false,
      description: t("home.productExample"),
    }))
  );

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
    <div className="flex flex-col max-md:gap-4 md:gap-6 lg:gap-8 max-md:px-4 md:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: t("home.home"), href: "/" },
          { label: t("home.medicines") },
        ]}
      />
      <div className="grid gap-13 grid-cols-[280px_1fr] max-md:grid-cols-1">
        <div
          tabIndex={0}
          className="sticky top-8 border border-grey-100 max-h-[calc(100vh-64px)] overflow-y-auto hide-scrollbar rounded-3xl max-md:hidden"
        >
          <h6 className="heading6 h-16 p-6">{t("home.categories")}</h6>
          <Accordion type="single" collapsible className="w-full">
            {getCategories().map((item) => {
              return (
                <AccordionItem key={item.id} value={`item-${item.id}`}>
                  <AccordionTrigger className="cursor-pointer p-3 no-underline! items-center!">
                    <p className="heading6-small py-2 px-4 flex items-center gap-2">
                      {item.text}
                    </p>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4 p-[8px_40px_8px_0px]!">
                    {childrens.map((child) => {
                      return (
                        <p key={child.id} className="text-sm leading-[35px]">
                          {child.text}
                        </p>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
        <div className="flex flex-col gap-11 w-full">
          <h5 className="heading5">{t("home.medicines")}</h5>
          <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(180px,1fr))] ">
            {data.map((item) => {
              return (
                <ProductCard
                  key={item.id}
                  item={item}
                  productImg={PanadolImg}
                />
              );
            })}
          </div>
        </div>
      </div>
      <MainPagination
        rowsPerPage={24}
        currentPage={page}
        data={data}
        setCurrentPage={setPage}
      />
    </div>
  );
};
export default Page;
