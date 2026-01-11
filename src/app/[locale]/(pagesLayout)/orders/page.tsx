"use client";
import Image from "next/image";
import PanadolImg from "@/assets/Panadol.png";
import FavoritesImg from "@/assets/favorites-img.png";
import { useLocale, useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OrderCard from "@/components/OrderCard";

const Page = () => {
  const t = useTranslations();
  const locale = useLocale();

  const products = Array.from({ length: 4 }, (_, index) => ({
    id: index + 1,
    price: 5 + index,
    description: t("home.productExample"),
    image: PanadolImg.src,
  }));

  const orders = [
    {
      id: 1,
      status: "processing",
      orderNumber: "#123456",
      orderDate: t("orders.orderDateExample"),
      totalOrderPrice: 85.0,
      products: [...products],
    },
    {
      id: 2,
      status: "onTheWay",
      orderNumber: "#123456",
      orderDate: t("orders.orderDateExample"),
      totalOrderPrice: 85.0,
      products: [...products],
    },
    {
      id: 3,
      status: "delivered",
      orderNumber: "#123456",
      orderDate: t("orders.orderDateExample"),
      totalOrderPrice: 85.0,
      products: [...products],
    },
    {
      id: 4,
      status: "cancelled",
      orderNumber: "#123456",
      orderDate: t("orders.orderDateExample"),
      totalOrderPrice: 85.0,
      products: [...products],
    },
  ];

  return (
    <div className="pt-4 pb-8 max-md:px-4 md:px-6 lg:px-8 flex flex-col gap-9">
      <Breadcrumb
        items={[
          { label: t("home.home"), href: "/" },
          { label: t("orders.title") },
        ]}
      />
      <div className="grid grid-cols-[1fr_318px] max-md:grid-cols-1 gap-16">
        <div className="w-full flex flex-col gap-11 py-8">
          <h5 className="heading5">{t("orders.title")}</h5>
          <Tabs
            dir={locale === "ar" ? "rtl" : "ltr"}
            defaultValue="processing"
            className="w-full gap-8!"
          >
            <TabsList className="w-full bg-grey-100 rounded-full p-1 h-[52px]">
              <TabsTrigger
                value="processing"
                className="cursor-pointer p-[8px_16px] rounded-full h-11 text-grey-800 data-[state=active]:text-black typo-semibold"
              >
                {t("orders.statusProcessing")}
              </TabsTrigger>
              <TabsTrigger
                value="onTheWay"
                className="cursor-pointer p-[8px_16px] rounded-full h-11 text-grey-800 data-[state=active]:text-black typo-semibold"
              >
                {t("orders.statusOnTheWay")}
              </TabsTrigger>
              <TabsTrigger
                value="delivered"
                className="cursor-pointer p-[8px_16px] rounded-full h-11 text-grey-800 data-[state=active]:text-black typo-semibold"
              >
                {t("orders.statusDelivered")}
              </TabsTrigger>
              <TabsTrigger
                value="cancelled"
                className="cursor-pointer p-[8px_16px] rounded-full h-11 text-grey-800 data-[state=active]:text-black typo-semibold"
              >
                {t("orders.statusCancelled")}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="processing">
              <OrderCard
                orders={orders.filter((order) => order.status === "processing")}
              />
            </TabsContent>
            <TabsContent value="onTheWay">
              <OrderCard
                orders={orders.filter((order) => order.status === "onTheWay")}
              />
            </TabsContent>
            <TabsContent value="delivered">
              <OrderCard
                orders={orders.filter((order) => order.status === "delivered")}
              />
            </TabsContent>
            <TabsContent value="cancelled">
              <OrderCard
                orders={orders.filter((order) => order.status === "cancelled")}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div className="py-8">
          <div className="w-full h-[720px]">
            <Image
              alt="banner-img"
              src={FavoritesImg.src}
              height={720}
              width={100}
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
