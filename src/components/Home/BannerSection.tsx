"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Mousewheel, Pagination, Navigation, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import heroBannerBgLg from "@/assets/hero-banner-lg.png";
import heroBannerBgMd from "@/assets/hero-banner-md.png";
import heroBannerBgSm from "@/assets/hero-banner-sm.png";
import heroBanner from "@/assets/home-hero.png";
import CategoriesSlider from "../CategoriesSlider.tsx";
import { ArrowLeftSvg, ArrowRightSvg } from "@/icons/global";
import { getCategories } from "@/constants/categories";
import { Link } from "@/i18n/routing";
import Navbar from "../Navbar";

const BannerSection = () => {
  const t = useTranslations();
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(true);

  const banners = [heroBanner, heroBanner, heroBanner];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMd(false);
        setIsLg(false);
      } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
        setIsMd(true);
        setIsLg(false);
      } else if (window.innerWidth > 1024) {
        setIsMd(false);
        setIsLg(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMd(false);
      setIsLg(false);
    } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
      setIsMd(true);
      setIsLg(false);
    } else if (window.innerWidth > 1024) {
      setIsMd(false);
      setIsLg(true);
    }
  }, []);
  return (
    <div className="max-md:p-6 md:p-4 lg:p-8">
      <div
        style={{
          backgroundImage: `url(${
            isLg
              ? heroBannerBgLg.src
              : isMd
              ? heroBannerBgMd.src
              : heroBannerBgSm.src
          })`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
        className="flex flex-col rounded-4xl"
      >
        <div className="p-6 pb-0 max-md:p-4 max-md:pb-0">
          <Navbar />
        </div>

        {/* categories */}
        <CategoriesSlider />

        {/* slider */}
        <div className="p-8 max-md:[24px_16px]">
          <div className="overflow-hidden">
            <Swiper
              modules={[Mousewheel, Pagination, Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              loop
              speed={1000}
              autoplay={{
                delay: 3000, // 3 seconds (3000ms)
                disableOnInteraction: false, // keeps autoplay after user interaction
                pauseOnMouseEnter: true, // optional: pause when hovering
              }}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              pagination={{
                clickable: true,
                el: ".custom-pagination",
                bulletActiveClass: "custom-bullet-active",
              }}
              className="pb-12"
            >
              {banners.map((item, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="max-md:h-[115px] md:h-[253px] lg:h-[365px] rounded-4xl z-10">
                    <Image
                      alt={`banner ${index + 1}`}
                      src={item.src}
                      fill
                      className="w-full h-full rounded-4xl"
                    />
                  </div>
                </SwiperSlide>
              ))}

              <button className="custom-prev cursor-pointer absolute left-4 top-[calc(50%-30px)] z-10 h-11 w-11 p-[8px_16px] rounded-full bg-white/24 shadow-lg transition">
                <ArrowLeftSvg className="ltr:rotate-180" />
              </button>

              <button className="custom-next cursor-pointer absolute right-4 top-[calc(50%-30px)] z-10 h-11 w-11 p-[8px_16px] rounded-full bg-white/24 shadow-lg transition">
                <ArrowRightSvg className="ltr:rotate-180" />
              </button>
              <div className="custom-pagination mt-4 flex justify-center"></div>
            </Swiper>
          </div>
        </div>

        <div className="flex flex-col gap-11 max-md:gap-6 p-8 max-md:p-4">
          <div className="flex items-center justify-between">
            <h5 className="heading5 max-md:heading6 text-white">
              {t("home.categories")}
            </h5>
            <Link href={"/categories"} className="flex items-center gap-2">
              <span className="typo-regular2 text-white">
                {t("common.view_all")}
              </span>
              <ArrowLeftSvg color="#fff" className="ltr:rotate-180" />
            </Link>
          </div>

          {/* grid-cols-[repeat(auto-fit,minmax(130px,145px))] */}
          <div className="grid gap-3 lg:gap-6 max-md:grid-cols-3 md:grid-cols-6 lg:grid-cols-9">
            {getCategories().map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-green-50 rounded-4xl p-[8px_16px] max-md:p-[20px_12px] flex flex-col justify-center items-center gap-6 h-[132px] max-md:h-[119px] "
                >
                  {item.icon}
                  <p className="typo-regular1 text-center">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BannerSection;
