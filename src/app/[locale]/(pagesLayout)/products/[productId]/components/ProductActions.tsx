import PrimaryBtn from "@/components/PrimaryBtn";
import { Button } from "@/components/ui/button";
import { CurrencyDisplay } from "@/helpers/getCurrency";
import { Link } from "@/i18n/routing";
import {
  AlarmClockSvg,
  MinusSvg,
  PackageSvg,
  PaginationLeftArrow,
  PlusSvg,
  StoreSvg,
} from "@/icons/global";
import { useTranslations } from "next-intl";

const ProductActions = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col gap-[38px] pt-6 pb-16">
      <div className="flex flex-col gap-6">
        <Link href={"/"} className="flex items-center gap-1">
          <span className="text-grey-800 typo-regular2">
            {t("home.painRelief")}
          </span>
          <PaginationLeftArrow
            color="var(--grey-800)"
            className="ltr:rotate-180"
          />
        </Link>
        <h5 className="heading5 max-md:heading5-small max-w-[688px]">
          {t("home.productExample")}
        </h5>
      </div>

      {/* price */}
      <div className="text-primary-500! self-start">
        <CurrencyDisplay color={"var(--primary-500)"} price={5} />
      </div>

      <div className="p-4 rounded-[20px] border border-grey-100 flex flex-col gap-5">
        <div className="h-[52px] p-[8px_16px] flex items-center gap-2">
          <AlarmClockSvg />
          <div className="flex flex-col gap-0.5">
            <span className="text-grey-500 typo-regular1">
              {t("singleProduct.deliveryTime")}
            </span>
            <span className="text-black typo-regular2">
              {t("singleProduct.deliveryDuration")}
            </span>
          </div>
        </div>

        <div className="h-[52px] p-[8px_16px] flex items-center gap-2">
          <StoreSvg />
          <div className="flex flex-col gap-0.5">
            <span className="text-grey-500 typo-regular1">
              {t("singleProduct.soldBy")}
            </span>
            <span className="text-black typo-regular2">
              {t("singleProduct.nearestPharmacy")}
            </span>
          </div>
        </div>

        <div className="h-[52px] p-[8px_16px] flex items-center gap-2">
          <PackageSvg />
          <div className="flex flex-col gap-0.5">
            <span className="text-grey-500 typo-regular1">
              {t("singleProduct.returns")}
            </span>
            <span className="text-black typo-regular2">
              {t("singleProduct.returnsPolicy")}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Button className="cursor-pointer flex items-center justify-center bg-grey-100! rounded-[12px] w-11 h-11 p-[8px_16px]">
            <PlusSvg />
          </Button>
          <span className="typo-semibold3 w-11 h-11 p-[8px_16px]">2</span>
          <Button className="cursor-pointer flex items-center justify-center bg-grey-100! rounded-[12px] w-11 h-11 p-[8px_16px]">
            <MinusSvg />
          </Button>
        </div>
        <PrimaryBtn
          text={t("singleProduct.addToCart")}
          className="heading6-small! h-[52px] rounded-[11111px] grow"
        />
      </div>
    </div>
  );
};
export default ProductActions;
