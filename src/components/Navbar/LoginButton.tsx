"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

const LoginButton = () => {
  const t = useTranslations();

  return (
    <Link href="/sign-in" className="hidden md:block">
      <Button
        className="heading6-small cursor-pointer h-13 rounded-[1111px] p-[8px_16px] hover:opacity-90 transition-opacity"
        style={{
          background:
            "linear-gradient(85deg, var(--color-primary-500, #21BF73) -6.74%, var(--colors-secondary-500, #2EC1AC) 123.06%)",
        }}
      >
        {t("navbar.login")}
      </Button>
    </Link>
  );
};
export default LoginButton;
