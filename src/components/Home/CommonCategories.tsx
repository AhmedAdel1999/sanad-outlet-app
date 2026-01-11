"use client";
import { useTranslations } from "next-intl";
import effaclarImg from "@/assets/effaclar.png";
import melatoninImg from "@/assets/melatonin.png";
import oralbImg from "@/assets/oralb.png";
import centrumImg from "@/assets/centrum.png";
import panadolExtraImg from "@/assets/panadol-extra.png";

const CommonCategories = () => {
  const t = useTranslations();
  return (
    <div className="max-md:p-8 md:p-[32px_24px] lg:p-8 grid gap-6 grid-cols-2 max-md:grid-cols-1">
      {/* first section */}
      <div className="flex flex-col gap-6">
        <div
          className="p-8 rounded-4xl h-[360px] max-md:h-[300px]"
          style={{
            backgroundImage: `url(${effaclarImg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col gap-2">
            <h5 className="heading5 max-md:heading5-small">
              {t("home.dailyCareTagline")}
            </h5>
            <p className="typo-regular1">{t("home.familyEssentials")}</p>
          </div>
        </div>

        <div
          className="p-8 rounded-4xl h-[360px] max-md:h-[300px]"
          style={{
            backgroundImage: `url(${melatoninImg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col gap-2">
            <h5 className="heading5 max-md:heading5-small">
              {t("home.betterSleep")}
            </h5>
            <p className="typo-regular1">{t("home.sleepDesc")}</p>
          </div>
        </div>
      </div>

      {/* second section */}
      <div className="flex flex-col gap-6">
        <div className="grid gap-6 grid-cols-2 max-md:grid-cols-1">
          <div
            className="p-8 rounded-4xl h-[466px] max-md:h-[300px]"
            style={{
              backgroundImage: `url(${oralbImg.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col gap-2">
              <h5 className="heading5 max-md:heading5-small">
                {t("home.energyVitality")}
              </h5>
              <p className="typo-regular1">{t("home.energyDesc")}</p>
            </div>
          </div>

          <div
            className="p-8 rounded-4xl h-[466px] max-md:h-[300px]"
            style={{
              backgroundImage: `url(${centrumImg.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="flex flex-col gap-2">
              <h5 className="heading5 max-md:heading5-small">
                {t("home.completeVitamins")}
              </h5>
              <p className="typo-regular1">{t("home.vitaminChoices")}</p>
            </div>
          </div>
        </div>
        <div
          className="p-8 rounded-4xl h-[255px] max-md:h-[300px]"
          style={{
            backgroundImage: `url(${panadolExtraImg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col gap-2">
            <h5 className="heading5 max-md:heading5-small">
              {t("home.quickRelief")}
            </h5>
            <p className="typo-regular1">{t("home.reliefDesc")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommonCategories;
