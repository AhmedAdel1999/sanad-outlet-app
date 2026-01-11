import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CurrencyDisplay } from "@/helpers/getCurrency";
import {
  ArrowDown,
  CancelSvg,
  MoreVerticalIcon,
  PackageRemoveIcon,
  RedoIcon,
  StarIcon,
} from "@/icons/global";
import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import OrderRateModal from "./OrderRateModal";
import SuccessRatingModal from "./SuccessRatingModal";
import CancelOrderModal from "./CancelOrderModal";
import SuccessCancelModal from "./SuccessCancelModal";
import FailedCancelModal from "./FailedCancelModal";

const OrderCard = ({ orders }: { orders: any[] }) => {
  const t = useTranslations();
  const [openRateModal, setOpenRateModal] = useState(false);
  const [openCancelOrderModal, setOpenCancelOrderModal] = useState(false);
  const [orderCancelledSuccessfully, setOrderCancelledSuccessfully] =
    useState(false);
  const [orderCancelledFailed, setOrderCancelledFailed] = useState(false);
  const [openSuccessRating, setOpenSuccessRating] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {}
  );

  const handleViewAllProducts = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: true,
    }));
  };

  return orders.length > 0 ? (
    <div className="flex flex-col gap-5">
      {orders.map((order) => {
        const isExpanded = expandedOrders[order.id];
        const visibleProducts = isExpanded ? order.products.length : 2;

        return (
          <div
            key={order.id}
            className="flex flex-col border border-grey-100 rounded-[28px]"
          >
            <div className="p-8 max-md:p-5 flex items-center justify-between border-b border-grey-100">
              <div className="flex gap-2">
                <div className="flex flex-col gap-1">
                  <div className="heading6-small">
                    <span>{t("orders.orderNumber")}</span>
                    <span>{order.orderNumber}</span>
                  </div>
                  <p className="text-grey-600 typo-regular1">
                    {order.orderDate}
                  </p>
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

              <CurrencyDisplay color={"#000"} price={order.totalOrderPrice} />
            </div>

            <div className="p-8 max-md:p-5 flex flex-col gap-5">
              <p className="typo-regular1 text-grey-600">
                {t("orders.products")}
              </p>
              <div className="flex flex-col relative">
                {order.products
                  .slice(0, visibleProducts)
                  .map((product: any) => {
                    return (
                      <div
                        key={product.id}
                        className="flex items-center justify-between p-[16px_12px] gap-5"
                      >
                        <div className="w-14.5 h-14.5 rounded-[14px] bg-grey-50 p-2">
                          <Image
                            alt={`product${product.id}`}
                            src={product.image}
                            width={42}
                            height={42}
                          />
                        </div>
                        <p className="text-sm font-semibold text-grey-800 flex-1">
                          {product.description}
                        </p>

                        {order.status === "delivered" ? (
                          <Dialog
                            open={openRateModal}
                            onOpenChange={setOpenRateModal}
                          >
                            <DialogTrigger>
                              <div className="flex items-center gap-2 cursor-pointer">
                                <span className="text-grey-800 typo-regular2">
                                  {t("orders.rateProduct")}
                                </span>
                                <StarIcon />
                              </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-[600px] max-md:max-w-[350px] [&>button]:hidden">
                              <DialogHeader className="flex-row items-center justify-between">
                                <DialogTitle>
                                  {t("orders.rateExperienceTitle")}
                                </DialogTitle>
                                <DialogClose className="cursor-pointer">
                                  <CancelSvg />
                                </DialogClose>
                              </DialogHeader>

                              <OrderRateModal
                                onClose={() => setOpenRateModal(false)}
                                setSuccessRating={() =>
                                  setOpenSuccessRating(true)
                                }
                              />
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <div className="flex items-center gap-2">
                            <CurrencyDisplay
                              color={"#000"}
                              price={product.price}
                            />
                            <span className="capitalize typo-regular2 font-bold">
                              .2x
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}

                {order.products.length > 2 && !isExpanded && (
                  <div
                    className="cursor-pointer  w-full flex flex-col justify-end items-center gap-3 pt-8 pb-4 backdrop-blur-[2.55px]"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 10.94%, #FFF 42.8%)",
                    }}
                    onClick={() => handleViewAllProducts(order.id)}
                  >
                    <span className="text-sm font-semibold text-grey-800">
                      {t("orders.viewAll")}
                    </span>
                    <ArrowDown />
                  </div>
                )}
              </div>
            </div>
            <div className="p-8 max-md:p-5 pt-0! flex items-center gap-5">
              {(order.status === "delivered" ||
                order.status === "cancelled") && (
                <button className="flex items-center justify-center gap-2 flex-1 p-[8px_24px] rounded-full text-white bg-primary-500 typo-regular2">
                  <span>{t("orders.reorder")}</span>
                  <RedoIcon />
                </button>
              )}

              <Link
                href={`orders/${order.id}`}
                className="flex items-center justify-center flex-1 p-[8px_24px] rounded-full border border-grey-100 text-grey-800 typo-regular2"
              >
                {t("orders.viewDetails")}
              </Link>

              {order.status === "processing" && (
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <MoreVerticalIcon />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-[200px]">
                    <button
                      onClick={() => setOpenCancelOrderModal(true)}
                      className="cursor-pointer flex items-center gap-4 outline-none border-none"
                    >
                      <PackageRemoveIcon />
                      <span className="typo-regular2 text-error-500">
                        {t("orders.cancelOrder")}
                      </span>
                    </button>
                  </PopoverContent>
                </Popover>
              )}

              {openSuccessRating && (
                <SuccessRatingModal
                  open={openSuccessRating}
                  setCloseModal={() => setOpenSuccessRating(false)}
                />
              )}

              {openCancelOrderModal && (
                <CancelOrderModal
                  open={openCancelOrderModal}
                  setCloseModal={() => setOpenCancelOrderModal(false)}
                  setCancelledSuccessfully={() =>
                    setOrderCancelledSuccessfully(true)
                  }
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
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <EmptyCard />
  );
};
export default OrderCard;

const EmptyCard = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="w-22 h-22 flex items-center justify-center rounded-full bg-secondary-50 border border-secondary-100 ">
        <PackageRemoveIcon color="#7E7E7E" />
      </div>
      <div className="flex flex-col gap-2">
        <h5 className="heading5 text-center">{t("orders.emptyTitle")}</h5>
        <p className="typo-regular1 text-center">
          {t("orders.emptyDescription")}
        </p>
      </div>

      <Link
        href={"/"}
        className="rounded-full flex items-center justify-center h-13 p-[8px_24px] heading6-small text-primary-500 bg-secondary-100 "
      >
        {t("orders.startShopping")}
      </Link>
    </div>
  );
};
