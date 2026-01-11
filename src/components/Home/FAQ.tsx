"use client";
import { useTranslations } from "next-intl";
import SamiImg from "@/assets/sami-img.png";
import SafwanImg from "@/assets/safwan-img.png";
import MasaoudImg from "@/assets/masaoud-img.png";
import AyshaImg from "@/assets/aysha-img.png";
import IbrahimImg from "@/assets/ibrahim-img.png";
import AlgawharaImg from "@/assets/algawhara-img.png";
import Image from "next/image";
import { StarSvg } from "@/icons/global";

const FAQ = () => {
  const t = useTranslations();

  const items = [
    {
      id: 1,
      name: t("home.reviewer1Name"),
      comment: t("home.reviewer1Text"),
      img: SamiImg,
    },
    {
      id: 2,
      name: t("home.reviewer2Name"),
      comment: t("home.reviewer2Text"),
      img: SafwanImg,
    },
    {
      id: 3,
      name: t("home.reviewer3Name"),
      comment: t("home.reviewer3Text"),
      img: MasaoudImg,
    },
    {
      id: 4,
      name: t("home.reviewer4Name"),
      comment: t("home.reviewer4Text"),
      img: AyshaImg,
    },
    {
      id: 5,
      name: t("home.reviewer5Name"),
      comment: t("home.reviewer5Text"),
      img: IbrahimImg,
    },
    {
      id: 6,
      name: t("home.reviewer6Name"),
      comment: t("home.reviewer6Text"),
      img: AlgawharaImg,
    },
  ];

  return (
    <div className="py-16">
      <div
        className="flex flex-col gap-16 p-[64px_32px] max-md:p-[64px_16px]"
        style={{
          background:
            "linear-gradient(85deg, var(--color-primary-500, #21BF73) -6.74%, var(--colors-secondary-500, #2EC1AC) 123.06%)",
        }}
      >
        <h1 className="heading3 text-white text-center">
          {t("home.customerReviews")}
        </h1>
        <div className="grid gap-6 max-md:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            return (
              <div
                key={item.id}
                className="p-8 bg-white rounded-[32px] flex flex-col gap-6 lg:gap-8"
              >
                <div className="flex items-center gap-2">
                  <div className="w-11 h-11 rounded-full overflow-hidden">
                    <Image
                      alt="reviewer img"
                      src={item.img.src}
                      width={44}
                      height={44}
                      className="object-fill rounded-full"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="typo-semibold">{item.name}</p>
                    <p className="typo-regular1 flex items-center gap-1">
                      <StarSvg />
                      <span>4.5</span>
                    </p>
                  </div>
                </div>
                <p className="typo-regular2">{item.comment}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default FAQ;
