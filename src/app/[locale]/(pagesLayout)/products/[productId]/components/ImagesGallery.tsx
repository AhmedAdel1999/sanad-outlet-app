import Image from "next/image";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PanadolImg from "@/assets/Panadol.png";

const ImagesGallery = () => {
  return (
    <div className="w-full flex flex-col gap-11 p-[24px_0px_64px_0px] max-md:p-[16px_0px_32px_0px] ">
      <div className="relative bg-grey-50 p-[8px_16px] max-md:h-[361px] md:h-[298px] lg:h-[439px] rounded-3xl overflow-hidden">
        <Image
          alt="product-img"
          width={100}
          height={100}
          src={PanadolImg.src}
          className="w-full h-full"
        />
      </div>

      <div className="w-full overflow-hidden">
        <Swiper spaceBetween={20} slidesPerView={"auto"} modules={[Mousewheel]}>
          {[PanadolImg, PanadolImg, PanadolImg, PanadolImg].map(
            (item, index) => (
              <SwiperSlide key={index} style={{ width: "fit-content" }}>
                <div
                  className={`p-3 h-[100px] lg:h-[149px] rounded-[20px] ${
                    index === 0 ? "border-2 border-[#21BF73]" : ""
                  }`}
                >
                  <div className="bg-grey-50 rounded-[20px] p-[8px_16px] w-[76px] h-[76px] lg:w-[117px] lg:h-[125px]">
                    <Image
                      alt="product-img"
                      width={100}
                      height={100}
                      src={item.src}
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          )}
        </Swiper>
      </div>
    </div>
  );
};
export default ImagesGallery;
