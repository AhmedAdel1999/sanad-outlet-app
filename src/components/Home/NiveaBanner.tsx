import Image from "next/image";
import niveaImg from "@/assets/order-hero.png";

const NiveaBanner = () => {
  return (
    <div className="max-md:p-4 md:p-[32px_24px] lg:p-8">
      <div className="relative max-md:h-[73px] md:h-[197px] lg:h-[277px]">
        <Image
          alt="banner3"
          fill
          priority
          src={niveaImg.src}
          className="object-fill"
        />
      </div>
    </div>
  );
};
export default NiveaBanner;
