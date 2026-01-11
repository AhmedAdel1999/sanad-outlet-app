"use client";
import { useState } from "react";
import Image from "next/image";
import PanadolImg from "@/assets/Panadol.png";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/routing";
import Breadcrumb from "@/components/Breadcrumb.tsx";
import {
  CouponIcon,
  FavouriteSvg,
  MinusSvg,
  PlusSvg,
  ShoppingCartRemoveIcon,
} from "@/icons/global";
import { CurrencyDisplay } from "@/helpers/getCurrency";
import PrimaryBtn from "@/components/PrimaryBtn";

const Page = () => {
  const t = useTranslations();
  const navigate = useRouter();
  const [coupon, setCoupon] = useState("");

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
          { label: t("navbar.cart") },
        ]}
      />

      {products.length > 0 ? (
        <div className="flex max-md:flex-col gap-16">
          <div className="flex flex-col gap-11 grow">
            <h5 className="heading5">{t("navbar.cart")}</h5>
            <div className="flex flex-col gap-5">
              {products.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-[20px] border border-grey-100 flex items-center max-md:items-start gap-5 "
                  >
                    <div className="relative w-[150px] h-[150px] max-md:w-22 max-md:h-22 rounded-[14px] p-[8px_16px] bg-grey-50">
                      <Image
                        alt={`product${item.id}`}
                        src={PanadolImg.src}
                        width={100}
                        height={100}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col gap-8 w-full">
                      <div className="flex flex-col gap-2">
                        <h6 className="heading6-small">{item.description}</h6>
                        <CurrencyDisplay price={item.price} />
                      </div>

                      {/* actions */}
                      <div className="flex justify-between gap-4 max-md:flex-col w-full">
                        <div className="flex items-center justify-between gap-2">
                          <button className="cursor-pointer flex items-center justify-center bg-grey-100! rounded-[12px] w-11 h-11 p-[8px_16px]">
                            <PlusSvg />
                          </button>
                          <span className="typo-semibold3 flex items-center justify-center w-11 h-11 p-[8px_16px]">
                            2
                          </span>
                          <button className="cursor-pointer flex items-center justify-center bg-grey-100! rounded-[12px] w-11 h-11 p-[8px_16px]">
                            <MinusSvg />
                          </button>
                        </div>

                        <button className="cursor-pointer typo-regular2 flex items-center justify-center text-grey-600 gap-2 h-11 border border-grey-100 p-[8px_16px] rounded-full">
                          <span>{t("cart.saveToWishlist")}</span>
                          <FavouriteSvg width={20} height={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="w-full h-fit flex flex-col gap-11 p-8 max-w-[445px] rounded-[20px] bg-grey-50 max-md:max-w-full">
            <h5 className="heading5">{t("cart.orderSummary")}</h5>

            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between gap-2">
                <p className="text-grey-600 typo-regular2">
                  {t("cart.itemsTotal")}
                </p>
                <CurrencyDisplay color={"var(--grey-600)"} price={5} />
              </div>

              <div className="flex items-center justify-between gap-2">
                <p className="text-grey-600 typo-regular2">
                  {t("cart.discount")}
                </p>
                <CurrencyDisplay color={"var(--grey-600)"} price={5} />
              </div>

              <div className="flex items-center justify-between gap-2">
                <p className="text-grey-600 typo-regular2">
                  {t("cart.deliveryFee")}
                </p>
                <CurrencyDisplay color={"var(--grey-600)"} price={5} />
              </div>

              <div className="py-3">
                <div className="h-px bg-grey-100" />
              </div>

              <div className="flex items-center justify-between gap-2">
                <p className="text-grey-600 typo-regular2">{t("cart.total")}</p>
                <CurrencyDisplay color={"#000"} price={5} />
              </div>
            </div>

            <div className="h-13 rtl:p-[8px_24px_8px_8px] ltr:p-[8px_8px_8px_24px] flex items-center gap-2 rounded-full border border-grey-100">
              <CouponIcon />
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder={t("cart.enterPromoCode")}
                className="flex-1 border-none outline-none"
              />

              <PrimaryBtn
                className="h-[36px]! rounded-full"
                text={t("cart.apply")}
              />
            </div>

            <div className="flex flex-col gap-4">
              <PrimaryBtn
                className="h-[52px]! rounded-full heading6-small!"
                text={t("cart.checkout")}
                handleClick={() => navigate.push("/checkout")}
              />
              <Link
                href={"/"}
                className="typo-regular2 h-13 flex items-center justify-center p-[8px_24px] text-grey-800 rounded-full border border-grey-100"
              >
                {t("cart.continueShopping")}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCard />
      )}
    </div>
  );
};
export default Page;

const EmptyCard = () => {
  const t = useTranslations();
  return (
    <div className="p-8 flex flex-col items-center justify-center gap-6">
      <div className="flex items-center justify-center h-22 w-22 rounded-full border-[0.5px] border-grey-100 bg-grey-50">
        <ShoppingCartRemoveIcon />
      </div>
      <h5 className="heading5">{t("cart.cartEmptyTitle")}</h5>
      <p className="typo-regular1">{t("cart.cartEmptyDescription")}</p>
      <Link
        href={"/"}
        className="heading6-small rounded-full bg-secondary-100 flex items-center justify-center text-primary-500 p-[8px_24px] h-13"
      >
        {t("cart.startShopping")}
      </Link>
    </div>
  );
};
