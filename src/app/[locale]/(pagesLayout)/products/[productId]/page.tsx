"use client";
import { useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb.tsx";
import ImagesGallery from "./components/ImagesGallery";
import ProductActions from "./components/ProductActions";
import SealedWith from "./components/SealedWith";
import ProductInfo from "./components/ProductInfo";
import SimilarMidications from "./components/SimilarMidications";

const Page = () => {
  const t = useTranslations();
  return (
    <div className="flex flex-col">
      <div className="pt-4">
        <div className="max-md:px-4 md:px-8">
          <Breadcrumb
            items={[
              { label: t("home.home"), href: "/" },
              { label: t("home.medicines"), href: "/categories" },
              { label: t("home.painRelief"), href: "/categories" },
              { label: t("home.productExample") },
            ]}
          />

          <div className="grid gap-16 max-md:gap-0 max-md:grid-cols-1 md:grid-cols-[315px_1fr] lg:grid-cols-[624px_1fr]">
            <ImagesGallery />
            <div className="flex flex-col">
              <ProductActions />
              <SealedWith />
              <ProductInfo />
            </div>
          </div>
        </div>
      </div>
      <SimilarMidications />
    </div>
  );
};
export default Page;
