"use client";
import { getCategories } from "@/constants/categories";
import { Link } from "@/i18n/routing";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CategoriesSlider = () => {
  return (
    <div className="max-md:hidden p-[14px_32px] md:pe-0 border-b border-white/16">
      <div className="overflow-hidden">
        <Swiper loop slidesPerView={"auto"} modules={[Mousewheel]}>
          {getCategories().map((item) => (
            <SwiperSlide key={item.id} style={{ width: "auto" }}>
              <Link
                href={`/categories`}
                className="w-fit p-[8px_16px] h-13 flex items-center justify-center typo-regular1 text-white"
              >
                {item.text}
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};
export default CategoriesSlider;
