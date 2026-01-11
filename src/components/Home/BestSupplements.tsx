"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ArrowLeftSvg } from "@/icons/global";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import sublmentsImg from "@/assets/sublments.png";
import ProductCard from "../ProductCard";

const BestSupplements = () => {
  const t = useTranslations();
  const sliderData = Array.from({ length: 10 }, (_, index) => ({
    id: index + 1,
    price: 5 + index,
    onSale: index === 0 ? true : false,
    hasDiscount: index === 2 ? true : false,
    inCart: index === 2 ? true : false,
    description: t("home.productExample"),
  }));

  return (
    <div className="flex flex-col gap-11 max-md:gap-8 max-md:py-8 max-md:ps-4 md:py-16 md:ps-6 lg:p-[64px_32px]">
      <div className="flex items-center justify-between max-md:pe-4 md:pe-6">
        <h5 className="heading5 max-md:heading6">
          {t("home.bestSupplements")}
        </h5>
        <Link href={"/categories"} className="flex items-center gap-2">
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
              slidesPerView: 1.5,
            },
            480: {
              slidesPerView: 2,
            },
            640: {
              slidesPerView: 2.5,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
            1536: {
              slidesPerView: 6,
            },
          }}
        >
          {sliderData.slice(0, 10).map((item) => (
            <SwiperSlide key={item.id}>
              <ProductCard item={item} productImg={sublmentsImg} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BestSupplements;
