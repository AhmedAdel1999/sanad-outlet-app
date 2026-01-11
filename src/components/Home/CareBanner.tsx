"use client";
import bannerImg from "@/assets/banner3.png";
import Image from "next/image";
const CareBanner = () => {
  return (
    <div className="max-md:p-[24px_16px] md:p-6 lg:p-[64px_32px]">
      <div className="relative max-md:h-[96px] md:h-[258px] lg:h-[364px]">
        <Image
          alt="banner3"
          fill
          priority
          src={bannerImg.src}
          className="object-fill"
        />
      </div>
    </div>
  );
};
export default CareBanner;
