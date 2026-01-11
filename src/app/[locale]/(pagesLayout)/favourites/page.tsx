"use client";
import Image from "next/image";
import PanadolImg from "@/assets/Panadol.png";
import FavoritesImg from "@/assets/favorites-img.png";
import { useTranslations } from "next-intl";
import { CurrencyDisplay } from "@/helpers/getCurrency";
import Breadcrumb from "@/components/Breadcrumb.tsx";
import {
  DeleteIcon,
  HeartRemoveIcon,
  PackageReceive,
  ShoppingCartSvg,
} from "@/icons/global";
import { Link } from "@/i18n/routing";
const Page = () => {
  const t = useTranslations();

  const products = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    price: 5 + index,
    outOfStock: index === 2 ? true : false,
    description: t("home.productExample"),
  }));
  return (
    <div className="pt-4 pb-8 max-md:px-4 md:px-6 lg:px-8 flex flex-col gap-9">
      <Breadcrumb
        items={[
          { label: t("home.home"), href: "/" },
          { label: t("navbar.favorites") },
        ]}
      />
      <div className="grid grid-cols-[1fr_318px] max-md:grid-cols-1 gap-16">
        {products.length > 0 ? (
          <div className="flex flex-col gap-5">
            {products.map((item) => {
              return (
                <div
                  key={item.id}
                  className="p-3 rounded-[20px] border border-grey-100 flex items-center gap-5 max-md:flex-col"
                >
                  <div className="relative w-[150px] h-[150px] max-md:w-full rounded-[14px] p-[8px_16px] bg-grey-50">
                    <Image
                      alt={`product${item.id}`}
                      src={PanadolImg.src}
                      width={100}
                      height={100}
                      className="w-full h-full"
                    />
                    {item.outOfStock && (
                      <div className="absolute top-2.5 start-2.5 flex flex-wrap items-center gap-1 rounded-[8px] bg-grey-500 p-2">
                        <PackageReceive />
                        <span className="text-white font-semibold text-sm!">
                          {t("common.un_available")}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-8 w-full">
                    <div className="flex flex-col gap-2">
                      <h6 className="heading6-small">{item.description}</h6>
                      <CurrencyDisplay price={item.price} />
                    </div>

                    {/* actions */}
                    <div className="flex gap-4 max-md:flex-col w-full">
                      <button
                        className="cursor-pointer typo-regular2 grow flex items-center justify-center text-white gap-2 h-11 p-[8px_16px] rounded-full"
                        style={{
                          background:
                            "linear-gradient(85deg, var(--color-primary-500, #21BF73) -6.74%, var(--colors-secondary-500, #2EC1AC) 123.06%)",
                        }}
                      >
                        <span>{t("common.add_to_cart")}</span>
                        <ShoppingCartSvg color="#fff" />
                      </button>

                      <button className="cursor-pointer typo-regular2 grow flex items-center justify-center text-grey-600 gap-2 h-11 border border-grey-100 p-[8px_16px] rounded-full">
                        <span>{t("common.delete")}</span>
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyCard />
        )}

        <div className="w-full h-[602px]">
          <Image
            alt="banner-img"
            src={FavoritesImg.src}
            height={602}
            width={100}
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};
export default Page;

const EmptyCard = () => {
  const t = useTranslations();
  return (
    <div className="p-8 flex flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-center h-22 w-22 rounded-full border-[0.5px] border-grey-100 bg-grey-50">
        <HeartRemoveIcon />
      </div>
      <h5 className="heading5">{t("favorites.emptyTitle")}</h5>
      <div className="flex flex-col text-center">
        <p className="typo-regular1">{t("favorites.emptyDescription")}</p>
        <p className="typo-regular1">{t("favorites.emptyHint")}</p>
      </div>
      <Link
        href={"/"}
        className="heading6-small rounded-full bg-secondary-100 flex items-center justify-center text-primary-500 p-[8px_24px] h-13"
      >
        {t("favorites.startShopping")}
      </Link>
    </div>
  );
};
