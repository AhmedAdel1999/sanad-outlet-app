"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import UserBtn from "./UserBtn";
import { useState } from "react";

const LoginButton = () => {
  const t = useTranslations();
  const [token, setToken] = useState(false);

  return token ? (
    <UserBtn />
  ) : (
    <Link href="/sign-in">
      <Button
        className="heading6-small w-full cursor-pointer h-13 rounded-[1111px] p-[8px_16px] hover:opacity-90 transition-opacity"
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
