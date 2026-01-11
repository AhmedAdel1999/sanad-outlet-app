"use client";
import { useTranslations } from "next-intl";
import orderImg from "@/assets/order.png";
import askDoctor from "@/assets/ask-doctor.png";
import { Button } from "../ui/button";

const AskDoctor = () => {
  const t = useTranslations();
  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 max-md:gap-6 md:gap-4 lg:gap-8 max-md:p-[32px_16px] md:p-6 lg:p-8">
      <div className="h-[239px] flex rounded-4xl bg-primary-100">
        <div className="flex flex-col justify-between gap-6 p-8 max-md:p-[32px_24px_32px_16px]">
          <div className="flex flex-col gap-1">
            <h5 className="heading5 max-md:heading5-small">
              {t("home.prescriptionOrder")}
            </h5>
            <p className="typo-regular1 max-md:line-clamp-3 md:line-clamp-3">
              {t("home.prescriptionDesc")}
            </p>
          </div>
          <Button className="bg-primary-300! text-black w-fit h-13 py-2 px-4 rounded-2xl text-sm font-bold tracking-[-0.28px]">
            {t("home.uploadPrescription")}
          </Button>
        </div>
        <div
          className="h-[239px] w-full bg-contain"
          style={{
            backgroundImage: `url(${orderImg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
          }}
        />
      </div>

      <div className="h-[239px] grid grid-cols-2 rounded-4xl bg-primary-100">
        <div className="flex flex-col justify-between gap-6 p-8 max-md:p-[32px_24px_32px_16px]">
          <div className="flex flex-col gap-1">
            <h5 className="heading5 max-md:heading5-small">
              {t("home.consultPharmacist")}
            </h5>
            <p className="typo-regular1 max-md:line-clamp-3 md:line-clamp-3">
              {t("home.consultDesc")}
            </p>
          </div>
          <Button className="bg-primary-300! text-black w-fit h-13 py-2 px-4 rounded-2xl text-sm font-bold tracking-[-0.28px]">
            {t("home.chatPharmacist")}
          </Button>
        </div>
        <div
          className="h-[239px] w-full bg-contain"
          style={{
            backgroundImage: `url(${askDoctor.src})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left",
          }}
        />
      </div>
    </div>
  );
};
export default AskDoctor;
