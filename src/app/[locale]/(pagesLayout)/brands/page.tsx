"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb.tsx";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ProductCard from "@/components/ProductCard";
import MainPagination from "@/components/Pagination";
import PanadolImg from "@/assets/Panadol.png";
import vichyImg from "@/assets/vichy.png";
import laRochePosayImg from "@/assets/la-roche-posay.png";
import cosmeticsImg from "@/assets/cosmetics.png";
import shaanImg from "@/assets/shaan.png";
import beeslineImg from "@/assets/beesline.png";
import starvilleImg from "@/assets/starville.png";
import pampersImg from "@/assets/pampers.png";
import gilletteImg from "@/assets/gillette.png";
import niveaImg from "@/assets/nivea.png";

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
  return (
    <div className="pt-4 flex flex-col gap-14 max-md:p-4 md:px-6 lg:px-8">
      <Breadcrumb
        items={[
          { label: t("home.home"), href: "/" },
          { label: t("home.brands") },
        ]}
      />

      <div className="flex flex-col gap-11">
        <h5 className="heading5">{t("home.brands")}</h5>

        {/* all brands */}
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
                <div
                  className={`cursor-pointer bg-grey-50 p-[8px_16px] h-[85px] rounded-4xl ${
                    index === 0 ? "border border-primary-500" : ""
                  }`}
                >
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

        {/* brand products */}
        <div className="grid gap-5 grid-cols-[repeat(auto-fill,minmax(180px,1fr))] ">
          {data.map((item) => {
            return (
              <ProductCard key={item.id} item={item} productImg={PanadolImg} />
            );
          })}
        </div>
        <MainPagination
          rowsPerPage={24}
          currentPage={page}
          data={data}
          setCurrentPage={setPage}
        />
      </div>
    </div>
  );
};
export default Page;
