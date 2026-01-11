"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { EyeOff, Eye } from "lucide-react";
import PrimaryBtn from "@/components/PrimaryBtn";
import { ArrowRightSvg, LockKeySvg } from "@/icons/global";
import ChangePasswordSuccessModal from "@/components/ChangePasswordSuccessModal";

const Page = () => {
  const t = useTranslations();
  const navigate = useRouter();

  return (
    <div className="max-md:px-5 md:px-6 lg:px-8 flex flex-col gap-11">
      <button
        onClick={() => navigate.back()}
        className="cursor-pointer flex items-center gap-2 p-2"
      >
        <ArrowRightSvg color="var(--grey-800)" className="ltr:rotate-180" />
        <span className="typo-regular2 text-grey-800">{t("auth.back")}</span>
      </button>

      <div className="flex flex-col gap-2">
        <h5 className="heading5 max-md:heading5-small">
          {t("auth.new_pass_title")}
        </h5>
        <p className="typo-regular1">{t("auth.setPasswordDescription")}</p>
      </div>
      <AuthForm />
    </div>
  );
};
export default Page;

const AuthForm = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  type FormValues = {
    password: string;
    confirmPassword?: string;
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {},
    mode: "all",
  });

  const password = watch("password");

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <label className="text-grey-800 typo-regular2">
          {t("auth.newPassword")}
        </label>
        <div className="h-13 p-[8px_24px] rounded-full border border-grey-100 flex items-center gap-2">
          <LockKeySvg />
          <input
            type={showPassword ? "text" : "password"}
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="flex-1 outline-none"
            placeholder={t("auth.passwordPlaceholder")}
            {...register("password", {
              required: t("auth.passwordRequired"),
              minLength: {
                value: 6,
                message: t("auth.passwordMinLength"),
              },
            })}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="bg-transparent cursor-pointer outline-none border-none"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-error-500">{errors.password.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-grey-800 typo-regular2">
          {t("auth.confirmPassword")}
        </label>
        <div className="h-13 p-[8px_24px] rounded-full border border-grey-100 flex items-center gap-2">
          <LockKeySvg />
          <input
            type={showConfirmPassword ? "text" : "password"} // Fixed: use showConfirmPassword here
            dir={locale === "ar" ? "rtl" : "ltr"}
            className="flex-1 outline-none"
            placeholder={t("auth.passwordPlaceholder")}
            {...register("confirmPassword", {
              required: t("auth.passwordRequired"),
              minLength: {
                value: 6,
                message: t("auth.passwordMinLength"),
              },
              validate: (value) =>
                value === password || t("auth.passwordsDoNotMatch"),
            })}
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="bg-transparent cursor-pointer outline-none border-none"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-error-500">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <PrimaryBtn
        text={t("auth.savePassword")}
        className="flex-1 heading6-small rounded-full h-[52px]"
        type="submit"
      />

      {success && <ChangePasswordSuccessModal />}
    </form>
  );
};
