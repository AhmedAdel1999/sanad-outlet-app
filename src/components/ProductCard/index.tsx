import Image from "next/image";
import { useTranslations } from "next-intl";
import { DiscountSvg, FireSvg, MinusSvg, PlusSvg } from "@/icons/global";
import { Button } from "../ui/button";
import { useRouter } from "@/i18n/routing";
import { CurrencyDisplay } from "@/helpers/getCurrency";

const ProductCard = ({ item, productImg }: { item: any; productImg: any }) => {
  const t = useTranslations();
  const navigate = useRouter();
  return (
    <div
      onClick={() => navigate.push(`/products/${item.id}`)}
      className="cursor-pointer group p-3 rounded-[20px] border border-grey-100 flex flex-col gap-5"
    >
      <div className="relative flex flex-col h-[145px] p-[8px_16px] rounded-[14px] bg-grey-50 overflow-hidden">
        <Image
          alt={`daily ${item.id}`}
          src={productImg.src}
          width={100}
          height={145}
          className="w-full h-full absolute z-10 inset-0 ease-in duration-400 group-hover:scale-125"
        />
        {item.onSale && (
          <div className="flex items-center w-fit gap-1 bg-primary-500 p-2 rounded-xl z-10">
            <DiscountSvg />
            <span className="typo-regular1 font-semibold text-white">
              {t("home.exclusiveOffer")}
            </span>
          </div>
        )}
        {item.hasDiscount && (
          <div className="flex items-center w-fit gap-2 bg-error-500 p-2 rounded-xl z-10">
            <FireSvg />
            <span className="typo-regular1 font-semibold text-white">
              {t("home.saveTen")}
            </span>
          </div>
        )}
      </div>
      <p className="typo-regular1">{item.description}</p>
      <div className="flex items-center gap-3">
        <CurrencyDisplay price={item.price} />
        {item.hasDiscount && (
          <div className="flex items-center gap-1">
            <span className="typo-regular2 text-grey-200 line-through">10</span>
            <CurrencyDisplay color={"var(--grey-200)"} />
          </div>
        )}
      </div>
      {item.inCart ? (
        <div className="flex items-center justify-between">
          <Button className="cursor-pointer flex items-center justify-center bg-grey-100! rounded-[12px] w-11 h-11 p-[8px_16px]">
            <PlusSvg />
          </Button>
          <span className="typo-semibold3">2</span>
          <Button className="cursor-pointer flex items-center justify-center bg-grey-100! rounded-[12px] w-11 h-11 p-[8px_16px]">
            <MinusSvg />
          </Button>
        </div>
      ) : (
        <Button
          className="cursor-pointer p-[8px_16px] h-11 rounded-[12px] typo-regular2 text-white"
          style={{
            background:
              "linear-gradient(85deg, var(--color-primary-500, #21BF73) -6.74%, var(--colors-secondary-500, #2EC1AC) 123.06%)",
          }}
        >
          {t("common.add_to_cart")}
        </Button>
      )}
    </div>
  );
};
export default ProductCard;
