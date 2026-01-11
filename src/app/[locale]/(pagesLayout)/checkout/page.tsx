"use client";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb.tsx";
import CheckoutSuccessModal from "@/components/CheckoutSuccessModal";
import { CurrencyDisplay } from "@/helpers/getCurrency";
import { MailSvg, MapLocationSvg } from "@/icons/global";
import PrimaryBtn from "@/components/PrimaryBtn";
import PanadolImg from "@/assets/Panadol.png";
import SaudiLogo from "@/assets/saudi-flag.png";
import DollarImg from "@/assets/dollar.png";
import VisaImg from "@/assets/visa.png";
import TabbyImg from "@/assets/tabby.png";
import TamaraImg from "@/assets/tamara.png";

const Page = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [success, setSuccess] = useState(false);

  const products = Array.from({ length: 2 }, (_, index) => ({
    id: index + 1,
    price: 5 + index,
    description: t("home.productExample"),
    image: PanadolImg.src,
  }));

  const allPaymentMethods = [
    {
      id: 1,
      value: "dollar",
      image: DollarImg,
      text: t("checkout.cashOnDelivery"),
    },
    { id: 2, value: "visa", image: VisaImg, text: t("checkout.onlinePayment") },
    {
      id: 3,
      value: "tabby",
      image: TabbyImg,
      text: t("checkout.payLaterTabby"),
    },
    { id: 4, value: "tamara", image: TamaraImg, text: t("checkout.tamara") },
  ];

  type FormValues = {
    email: string;
    phone: string;
    address: string;
    paymentMethod: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      paymentMethod: "dollar",
    },
    mode: "all",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setSuccess(true);
  };

  return (
    <div className="pt-4 pb-8 max-md:px-4 md:px-6 lg:px-8 flex flex-col gap-9">
      <Breadcrumb
        items={[
          { label: t("home.home"), href: "/" },
          { label: t("navbar.cart"), href: "/cart" },
          { label: t("checkout.title") },
        ]}
      />

      <div className="flex max-md:flex-col gap-16">
        <form
          className="flex flex-col gap-8 grow"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-11">
            <h5 className="heading5">{t("checkout.title")}</h5>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-grey-800 typo-regular2">
                  {t("auth.phone")}
                </label>
                <div className="h-13 p-[8px_24px] rounded-full border border-grey-100 flex items-center gap-2">
                  <Image
                    alt="flag"
                    src={SaudiLogo.src}
                    width={24}
                    height={24}
                  />
                  <span className="text-grey-950 typo-regular2">+966</span>
                  <div className="w-[2px] h-4 bg-grey-100" />
                  <input
                    type="tel"
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    className="flex-1 outline-none"
                    placeholder={t("auth.phonePlaceholder")}
                    {...register("phone", {
                      required: t("auth.phoneRequired"),
                      pattern: {
                        value: /^[0-9+]+$/,
                        message: t("auth.phoneInvalid"),
                      },
                    })}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-error-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-grey-800 typo-regular2">
                  {t("auth.email")}
                </label>
                <div className="h-13 p-[8px_24px] rounded-full border border-grey-100 flex items-center gap-2">
                  <MailSvg />
                  <input
                    type="email"
                    dir={locale === "ar" ? "rtl" : "ltr"}
                    className="flex-1 outline-none"
                    placeholder={t("auth.emailPlaceholder")}
                    {...register("email", {
                      required: t("auth.emailRequired"),
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-error-500">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-11">
            <h5 className="heading5">{t("checkout.addressDelivery")}</h5>
            <div className="p-3 rounded-full border border-grey-100">
              <div className="h-13 flex items-center gap-2 p-[8px_16px]">
                <MapLocationSvg />
                <div className="flex-1 flex flex-col gap-[-1px]">
                  <span className="text-grey-500 typo-regular1">
                    {t("checkout.deliverTo")}
                  </span>
                  <p className="typo-regular1">{t("checkout.fullAddress")}</p>
                </div>

                <div className="underline cursor-pointer text-primary-500 heading6-small">
                  {t("checkout.changeAddress")}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-11">
            <h5 className="heading5">{t("checkout.payment")}</h5>
            <div className="flex flex-col gap-5">
              {allPaymentMethods.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-full border border-grey-100"
                  >
                    <label
                      htmlFor={`payment-${item.value}`}
                      className="h-13 flex items-center gap-4 p-[8px_16px] cursor-pointer"
                    >
                      <Image
                        alt={`payment${item.id}`}
                        src={item.image.src}
                        width={90}
                        height={36}
                      />
                      <p className="typo-regular2 flex-1">{item.text}</p>
                      <input
                        type="radio"
                        id={`payment-${item.value}`}
                        value={item.value}
                        className="w-5 h-5 cursor-pointer"
                        {...register("paymentMethod", {
                          required: t("checkout.paymentRequired"),
                        })}
                      />
                    </label>
                  </div>
                );
              })}
            </div>
            {errors.paymentMethod && (
              <p className="text-xs text-error-500">
                {errors.paymentMethod.message}
              </p>
            )}
          </div>

          <PrimaryBtn
            type="submit"
            className="h-[52px]! rounded-full heading6-small! md:hidden"
            text={t("checkout.confirmAndPay")}
          />
        </form>

        {/* order summary */}
        <div className="w-full h-fit flex flex-col gap-11 p-8 max-w-[445px] rounded-[20px] bg-grey-50 max-md:max-w-full">
          <h5 className="heading5">{t("checkout.orderSummary")}</h5>

          {/* checkout products */}
          <div className="flex flex-col gap-5">
            {products.map((item) => {
              return (
                <div
                  key={item.id}
                  className="bg-white flex gap-5 border border-grey-100 rounded-[20px] p-[16px_12px]"
                >
                  <div className="h-22 w-22 p-[8px_16px] rounded-[14px] bg-grey-50">
                    <Image
                      alt={`item${item.id}`}
                      src={item.image}
                      width={56}
                      height={72}
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <h6 className="heading6-small font-semibold!">
                      {item.description}
                    </h6>
                    <div className="heading6-small font-semibold! flex items-center gap-4">
                      <CurrencyDisplay price={item.price} color={"#000"} />
                      <span className="capitalize">.2x</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-2">
              <p className="text-grey-600 typo-regular2">
                {t("checkout.itemsTotal")}
              </p>
              <CurrencyDisplay color={"var(--grey-600)"} price={5} />
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="text-grey-600 typo-regular2">
                {t("checkout.discount")}
              </p>
              <CurrencyDisplay color={"var(--grey-600)"} price={5} />
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="text-grey-600 typo-regular2">
                {t("checkout.deliveryFee")}
              </p>
              <CurrencyDisplay color={"var(--grey-600)"} price={5} />
            </div>

            <div className="py-3">
              <div className="h-px bg-grey-100" />
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="text-grey-600 typo-regular2">
                {t("checkout.total")}
              </p>
              <CurrencyDisplay color={"#000"} price={5} />
            </div>
          </div>

          <PrimaryBtn
            handleClick={handleSubmit(onSubmit)}
            className="h-[52px]! rounded-full heading6-small! max-md:hidden"
            text={t("checkout.confirmAndPay")}
          />

          {success && <CheckoutSuccessModal />}
        </div>
      </div>
    </div>
  );
};
export default Page;
