"use client";
import { useTranslations } from "next-intl";
import section1Img from "@/assets/section-1.png";
import section2Img from "@/assets/section-2.png";
import section3Img from "@/assets/section-3.png";
import section4Img from "@/assets/section-4.png";
import section5Img from "@/assets/section-5.png";
import section6Img from "@/assets/section-6.png";

const RegularCategories = () => {
  const t = useTranslations();
  const gridOne = [
    { id: 1, img: section1Img, text: t("home.skinCare") },
    { id: 2, img: section2Img, text: t("home.menCare") },
    { id: 3, img: section3Img, text: t("home.hairCare") },
  ];
  const gridTwo = [
    { id: 1, img: section4Img, text: t("home.vitaminsSupplements") },
    { id: 2, img: section5Img, text: t("home.babyMilk") },
    { id: 3, img: section6Img, text: t("home.dailyCareProducts") },
  ];
  return (
    <div className="flex flex-col gap-6 p-8 md:p-[32px_24px]">
      <div className="grid gap-6 max-md:grid-cols-1 md:grid-cols-[1fr_272px_312px] lg:grid-cols-[493px_1fr_312px]">
        {gridOne.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                backgroundImage: `url(${item.img.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="flex flex-col justify-end rounded-4xl h-[307px] max-md:h-[120px] p-8 max-md:p-6"
            >
              <h5 className="heading5 max-md:heading5-small text-white">
                {item.text}
              </h5>
            </div>
          );
        })}
      </div>
      <div className="grid gap-6 max-md:grid-cols-1 md:grid-cols-[284px_297px_1fr] lg:grid-cols-[433px_297px_1fr]">
        {gridTwo.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                backgroundImage: `url(${item.img.src})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="flex flex-col justify-end rounded-4xl h-[307px] max-md:h-[120px] p-8 max-md:p-6"
            >
              <h5 className="heading5 max-md:heading5-small text-white">
                {item.text}
              </h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default RegularCategories;
