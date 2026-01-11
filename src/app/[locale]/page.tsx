import Footer from "@/components/Footer";
import AskDoctor from "@/components/Home/AskDoctor";
import BannerSection from "@/components/Home/BannerSection";
import BestHairCar from "@/components/Home/BestHairCare";
import BestSellers from "@/components/Home/BestSellers";
import BestSupplements from "@/components/Home/BestSupplements";
import Brands from "@/components/Home/Brands";
import CareBanner from "@/components/Home/CareBanner";
import CommonCategories from "@/components/Home/CommonCategories";
import DailyUses from "@/components/Home/DailyUses";
import FAQ from "@/components/Home/FAQ";
import NiveaBanner from "@/components/Home/NiveaBanner";
import PainRelief from "@/components/Home/PainRelief";
import RegularCategories from "@/components/Home/RegularCategories";
import { PRODUCT_API_ENDPOINTS } from "@/endpoints/api";
import { useRequester } from "@/hooks/useRequester";
import { headers } from "next/headers";

export default async function Home() {
  // const { data } = useRequester({
  //   endpoint: PRODUCT_API_ENDPOINTS.getProductAPIs,
  // });
  // console.log(data);

  // const res = await fetch("https://ipapi.co/json/");
  // const data = await res.json();

  // console.log(data.country_name, data.city);

  const headersList = headers();
  const country = (await headersList).get("x-user-country");
  console.log(country);
  return (
    <div>
      <BannerSection />
      <AskDoctor />
      <Brands />
      <NiveaBanner />
      <PainRelief />
      <BestSellers />
      <RegularCategories />
      <BestHairCar />
      <BestSupplements />
      <DailyUses />
      <CommonCategories />
      <FAQ />
      <CareBanner />
      <Footer />
    </div>
  );
}
