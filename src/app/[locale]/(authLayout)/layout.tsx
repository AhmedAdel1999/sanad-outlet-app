"use client";
import React from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LangItems from "@/components/Navbar/Langitems";
import AuthImg from "@/assets/auth-bg.png";
import Logo from "@/assets/navbar-logo.png";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();
  return (
    //py-25 max-md:py-6
    <div className="flex min-h-screen">
      <div className="h-[inherit] flex flex-col flex-1 justify-between">
        <div className="flex items-center justify-between max-md:p-[24px_20px] md:p-6 lg:p-[24px_32px]">
          <Link href={"/"}>
            <Image alt="logo" src={Logo.src} width={192} height={52} />
          </Link>
          <div className="max-md:hidden md:hidden lg:block">
            <LangItems />
          </div>
          <div className="block lg:hidden">
            <LangItems isVisible={false} />
          </div>
        </div>
        <div>{children}</div>
        <div className="text-grey-500 text-[12px] text-center max-md:p-[24px_20px] md:p-6 lg:p-[24px_32px]">
          {t("auth.copyright")}
        </div>
      </div>

      <div className="md:p-6 lg:p-8 max-md:hidden md:max-w-[480px] lg:max-w-[656px] w-full grow">
        <div
          style={{
            backgroundImage: `url(${AuthImg.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="w-full h-full rounded-3xl overflow-hidden"
        />
      </div>
    </div>
  );
};
export default AuthLayout;
