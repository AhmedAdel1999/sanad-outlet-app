"use client";
import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb.tsx";
import { CurrencyDisplay } from "@/helpers/getCurrency";
import { MapLocationSvg } from "@/icons/global";
import { Check } from "lucide-react";
import PanadolImg from "@/assets/Panadol.png";
import VisaImg from "@/assets/visa.png";
import OutlinedBtn from "@/components/OutlinedBtn";
import CancelOrderModal from "@/components/OrderCard/CancelOrderModal";
import SuccessCancelModal from "@/components/OrderCard/SuccessCancelModal";
import FailedCancelModal from "@/components/OrderCard/FailedCancelModal";

const Page = () => {
  const t = useTranslations();
  const [openCancelOrderModal, setOpenCancelOrderModal] = useState(false);
  const [orderCancelledSuccessfully, setOrderCancelledSuccessfully] =
    useState(false);
  const [orderCancelledFailed, setOrderCancelledFailed] = useState(false);

  const products = Array.from({ length: 3 }, (_, index) => ({
    id: index + 1,
    price: 5 + index,
    image: PanadolImg.src,
    description: t("home.productExample"),
  }));

  const order = {
    id: 1,
    status: "processing",
    orderNumber: "#123456",
    orderDate: t("orders.orderDateExample"),
    totalOrderPrice: 85.0,
    products: [...products],
  };

  return (
    <div className="pt-4 pb-8 max-md:px-4 md:px-6 lg:px-8 flex flex-col gap-9">
      <Breadcrumb
        items={[
          { label: t("home.home"), href: "/" },
          { label: t("orders.title"), href: "/orders" },
          { label: t("orders.orderTimeline") },
        ]}
      />

      <div className="flex max-md:flex-col gap-16">
        <div className="flex flex-col grow">
          {/* order info */}
          <div className="flex items-center justify-between py-8">
            <div className="flex flex-col gap-1">
              <div className="heading5 max-md:heading5-small">
                <span>{t("orders.orderNumber")}</span>{" "}
                <span>{order.orderNumber}</span>
              </div>
              <p className="text-grey-600 typo-regular1">{order.orderDate}</p>
            </div>

            <div
              className={`${
                order.status === "processing" || order.status === "onTheWay"
                  ? "bg-alert-500"
                  : order.status === "delivered"
                  ? "bg-primary-500"
                  : "bg-error-500"
              }
                    p-2 h-[26px] leading-[13px] rounded-full text-white typo-regular1`}
            >
              {t("orders.statusProcessing")}
            </div>
          </div>

          {/* order progress */}
          <div className="py-11 self-center w-full flex justify-center">
            <OrderStatusStepper />
          </div>

          {/* order products */}
          <div className="flex flex-col gap-8 py-11">
            <h5 className="heading6 text-grey-800">{t("orders.products")}</h5>
            <div className="flex flex-col">
              {order.products.map((product: any) => {
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 gap-6"
                  >
                    <div className="w-22 h-22 rounded-[9px] bg-grey-50 p-[5px_10px]">
                      <Image
                        alt={`product${product.id}`}
                        src={product.image}
                        width={69}
                        height={79}
                      />
                    </div>
                    <p className="font-semibold flex-1">
                      {product.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <CurrencyDisplay color={"#000"} price={product.price} />
                      <span className="capitalize typo-regular2 font-bold">
                        .2x
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* order address */}
          <div className="py-8 flex flex-col gap-11 border-t border-grey-100">
            <h6 className="heading6 text-grey-800">{t("orders.address")}</h6>
            <div className="flex items-center gap-2 p-[8px_16px] h-13">
              <MapLocationSvg />
              <div className="flex flex-col gap-[-1px]">
                <span className="text-grey-500 typo-regular1">
                  {t("orders.deliverTo")}
                </span>
                <p className="typo-regular2">{t("orders.fullAddress")}</p>
              </div>
            </div>
          </div>

          {/* order payment method */}
          <div className="py-11 flex flex-col gap-11">
            <h6 className="heading6 text-grey-800">
              {t("orders.paymentMethod")}
            </h6>
            <div className="flex items-center gap-4 p-[8px_16px] h-13">
              <Image
                alt="payment method"
                width={90}
                height={36}
                src={VisaImg.src}
              />
              <span className="typo-regular2">{t("orders.maskedCard")}</span>
            </div>
          </div>

          <OutlinedBtn
            text={t("orders.cancelOrder")}
            handleClick={() => setOpenCancelOrderModal(true)}
            className="h-13 rounded-full! w-full bg-error-50! text-error-500"
          />
        </div>

        {/* modals */}

        {openCancelOrderModal && (
          <CancelOrderModal
            open={openCancelOrderModal}
            setCloseModal={() => setOpenCancelOrderModal(false)}
            setCancelledSuccessfully={() => setOrderCancelledSuccessfully(true)}
            setCancelledFailed={() => setOrderCancelledFailed(true)}
          />
        )}

        {orderCancelledSuccessfully && (
          <SuccessCancelModal
            open={orderCancelledSuccessfully}
            setCloseModal={() => setOrderCancelledSuccessfully(false)}
          />
        )}

        {orderCancelledFailed && (
          <FailedCancelModal
            open={orderCancelledFailed}
            setCloseModal={() => setOrderCancelledFailed(false)}
          />
        )}

        {/* order summary */}
        <div className="w-full h-fit flex flex-col gap-11 p-8 max-w-[445px] rounded-[20px] bg-grey-50 max-md:max-w-full">
          <h5 className="heading5">{t("orders.orderSummary")}</h5>

          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between gap-2 text-grey-600">
              <p className="typo-regular2">{t("orders.itemsTotal")}</p>
              <CurrencyDisplay color={"var(--grey-600)"} price={5} />
            </div>

            <div className="flex items-center justify-between gap-2 text-grey-600">
              <p className="typo-regular2">{t("orders.discount")}</p>
              <CurrencyDisplay color={"var(--grey-600)"} price={5} />
            </div>

            <div className="flex items-center justify-between gap-2 text-grey-600">
              <p className="typo-regular2">{t("orders.deliveryFee")}</p>
              <CurrencyDisplay color={"var(--grey-600)"} price={5} />
            </div>

            <div className="py-3">
              <div className="h-px bg-grey-100" />
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="text-grey-600 typo-regular2">{t("orders.total")}</p>
              <CurrencyDisplay color={"#000"} price={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;

const OrderStatusStepper = () => {
  const t = useTranslations();
  const steps = [
    {
      id: 1,
      label: t("orders.timelineReceived"),
      date: t("orders.orderDateExample"),
      status: "completed",
    },
    {
      id: 2,
      label: t("orders.timelinePreparing"),
      date: t("orders.orderDateExample"),
      status: "active",
    },
    {
      id: 3,
      label: t("orders.timelineOutForDelivery"),
      date: t("orders.orderDateExample"),
      status: "pending",
    },
    {
      id: 4,
      label: t("orders.timelineDelivered"),
      date: t("orders.orderDateExample"),
      status: "pending",
    },
  ];

  return (
    <div className="max-w-[800px] w-full">
      <ol className="flex items-start justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isActive = step.status === "active";
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.id}
              className={`flex ${!isLast ? "flex-1" : ""} items-start`}
            >
              {/* Step */}
              <div className="flex flex-col items-center">
                {/* Circle */}
                <div
                  className={`
                    flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold
                    ${
                      isCompleted
                        ? "bg-primary-50 border-primary-500 text-white"
                        : isActive
                        ? "border-primary-500 text-primary-500"
                        : "border-grey-100 text-grey-500"
                    }
                  `}
                >
                  {isCompleted ? (
                    <span className="text-primary-500">✓</span>
                  ) : (
                    step.id
                  )}
                </div>

                {/* Label */}
                <span
                  className={`mt-2 text-center text-sm font-bold text-grey-950 @max-xs:wrap-break-word`}
                >
                  {step.label}
                </span>

                {/* Date */}
                {isCompleted && (
                  <span className="mt-1 text-sm text-center text-grey-600">
                    {step.date}
                  </span>
                )}
              </div>

              {/* Connector */}
              {!isLast && (
                <div className="flex-1 px-2 pt-4 shrink-0">
                  <div
                    className={`h-px min-w-[30px] shrink-0 ${
                      isCompleted ? "bg-primary-500" : "bg-grey-100"
                    }`}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
};
