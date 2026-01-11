"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import LgBgImg from "@/assets/footer-bg-lg.png";
import MdBgImg from "@/assets/footer-bg-md.png";
import SmBgImg from "@/assets/footer-bg-sm.png";
import FooterLogo from "@/assets/sanad-logo.png";
import {
  FacebookSvg,
  InstgramSvg,
  TiktokSvg,
  TwitterSvg,
} from "@/icons/global";

const Footer = () => {
  const t = useTranslations();
  const [isMd, setIsMd] = useState(false);
  const [isLg, setIsLg] = useState(true);

  const sections = [
    { id: 1, title: t("footer.skinCare") },
    { id: 2, title: t("footer.dailyCare") },
    { id: 3, title: t("footer.hairCare") },
    { id: 4, title: t("footer.motherAndBaby") },
    { id: 5, title: t("footer.medicines") },
  ];

  const links = [
    { id: 1, text: t("footer.aboutUs"), url: "/about-us" },
    { id: 2, text: t("footer.blog"), url: "/blog" },
    { id: 3, text: t("footer.contactUs"), url: "/contact-us" },
    { id: 4, text: t("footer.terms"), url: "/terms" },
    { id: 5, text: t("footer.privacy"), url: "/privacy" },
  ];

  const socialMedia = [
    { id: 1, text: t("footer.facebook"), icon: <FacebookSvg /> },
    { id: 2, text: t("footer.instagram"), icon: <InstgramSvg /> },
    { id: 3, text: t("footer.x"), icon: <TwitterSvg /> },
    { id: 4, text: t("footer.tiktok"), icon: <TiktokSvg /> },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMd(false);
        setIsLg(false);
      } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
        setIsMd(true);
        setIsLg(false);
      } else if (window.innerWidth > 1024) {
        setIsMd(false);
        setIsLg(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMd(false);
      setIsLg(false);
    } else if (window.innerWidth > 768 && window.innerWidth < 1024) {
      setIsMd(true);
      setIsLg(false);
    } else if (window.innerWidth > 1024) {
      setIsMd(false);
      setIsLg(true);
    }
  }, []);
  return (
    <div
      style={{
        backgroundImage: `url(${
          isLg ? LgBgImg.src : isMd ? MdBgImg.src : SmBgImg.src
        })`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="bg-secondary-950 flex flex-col"
    >
      <div className="flex flex-col items-center gap-2.5 py-11 px-8 max-sm:px-4">
        <Image
          alt="footer-img"
          src={FooterLogo.src}
          width={190}
          height={52}
          priority
        />
        <p className="text-center text-white leading-[24px]">
          {t("footer.description")}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-11 py-11 px-30 max-sm:grid-cols-2 max-sm:p-[32px_16px] max-sm:gap-8">
        <div className="flex flex-col gap-11">
          <h4 className="text-white leading-[24px]">{t("footer.sections")}</h4>
          <div className="flex flex-col gap-6">
            {sections.map((item) => {
              return (
                <div key={item.id} className="text-white leading-[24px]">
                  {item.title}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-11">
          <h4 className="text-white leading-[24px]">{t("footer.links")}</h4>
          <div className="flex flex-col gap-6">
            {links.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-white leading-[24px]"
                >
                  {item.text}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-11">
          <h4 className="text-white leading-[24px]">{t("footer.followUs")}</h4>
          <div className="flex flex-col gap-6">
            {socialMedia.map((item) => {
              return (
                <Link
                  key={item.id}
                  href={"/"}
                  className="text-white leading-[24px] flex items-center gap-2"
                >
                  {item.icon}
                  {item.text}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="p-8 border-t border-t-secondary-900 text-center text-white leading-[24px] max-sm:leading-[21px] max-sm:text-sm">
        {t("footer.copyright")}
      </div>
    </div>
  );
};
export default Footer;
