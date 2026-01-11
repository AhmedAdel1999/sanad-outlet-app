"use client";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowLeftSvg } from "@/icons/global";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import vichyImg from "@/assets/vichy.png";
import laRochePosayImg from "@/assets/la-roche-posay.png";
import cosmeticsImg from "@/assets/cosmetics.png";
import shaanImg from "@/assets/shaan.png";
import beeslineImg from "@/assets/beesline.png";
import starvilleImg from "@/assets/starville.png";
import pampersImg from "@/assets/pampers.png";
import gilletteImg from "@/assets/gillette.png";
import niveaImg from "@/assets/nivea.png";

const Brands = () => {
  const t = useTranslations();
  const sliderData = [
    vichyImg,
    laRochePosayImg,
    cosmeticsImg,
    shaanImg,
    beeslineImg,
    starvilleImg,
    pampersImg,
    gilletteImg,
    niveaImg,
  ];

  return (
    <div className="flex flex-col gap-11 max-md:gap-8 max-md:py-8 max-md:ps-4 md:py-16 md:ps-6 lg:p-[64px_32px]">
      <div className="flex items-center justify-between max-md:pe-4 md:pe-6">
        <h5 className="heading5 max-md:heading6">{t("home.brands")}</h5>
        <Link href={"/brands"} className="flex items-center gap-2">
          <span className="typo-regular2 text-grey-500">
            {t("common.view_all")}
          </span>
          <ArrowLeftSvg color="var(--grey-500)" className="ltr:rotate-180" />
        </Link>
      </div>
      <div className="overflow-hidden">
        <Swiper
          modules={[Mousewheel]}
          slidesPerView={"auto"}
          spaceBetween={20}
          loop
          breakpoints={{
            0: {
              slidesPerView: 2.5,
            },
            480: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 5,
            },
            1024: {
              slidesPerView: 7,
            },
            1280: {
              slidesPerView: 8,
            },
            1536: {
              slidesPerView: 9,
            },
          }}
        >
          {sliderData.slice(0, 10).map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-grey-50 p-[8px_16px] h-[132px] rounded-4xl max-md:h-[85px]">
                <Image
                  alt={`brand ${index + 1}`}
                  src={item.src}
                  width={100}
                  height={100}
                  className="w-full h-full"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Brands;
