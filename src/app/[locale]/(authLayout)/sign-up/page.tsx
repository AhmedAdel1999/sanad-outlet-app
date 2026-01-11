"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "@/i18n/routing";
import { useStore } from "@/store";
import { useLocale, useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PrimaryBtn from "@/components/PrimaryBtn";
import { Eye, EyeOff } from "lucide-react";
import { ArrowRightSvg, LockKeySvg, MailSvg } from "@/icons/global";
import SaudiLogo from "@/assets/saudi-flag.png";

const Page = () => {
  const t = useTranslations();
  const navigate = useRouter();
  const locale = useLocale();
  const { setAuthWithPhone } = useStore();

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
          {t("auth.registerTitle")}
        </h5>
        <p className="typo-regular1">{t("auth.registerDescription")}</p>
      </div>

      <Tabs
        dir={locale === "ar" ? "rtl" : "ltr"}
        defaultValue="phone"
        className="w-full gap-8!"
      >
        <TabsList className="w-full bg-grey-100 rounded-[11111px] p-1 h-[52px]">
          <TabsTrigger
            value="phone"
            onClick={() => setAuthWithPhone(true)}
            className="cursor-pointer p-[8px_16px] rounded-[11111px] h-11 text-grey-800 data-[state=active]:text-black typo-semibold"
          >
            {t("auth.phone")}
          </TabsTrigger>
          <TabsTrigger
            value="email"
            onClick={() => setAuthWithPhone(false)}
            className="cursor-pointer p-[8px_16px] rounded-[11111px] h-11 text-grey-800 data-[state=active]:text-black typo-semibold"
          >
            {t("auth.email")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="phone">
          <AuthForm type="phone" />
        </TabsContent>
        <TabsContent value="email">
          <AuthForm type="email" />
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Page;

const AuthForm = ({ type }: { type: string }) => {
  const t = useTranslations();
  const locale = useLocale();
  const navigate = useRouter();
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setIsVerifyingAccount, setAuthMail, setAuthPhone } = useStore();

  type FormValues = {
    email?: string;
    phone?: string;
    password: string;
    confirmPassword: string;
  };
  const {
    watch,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {},
    mode: "all",
  });

  const password = watch("password");

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setIsVerifyingAccount(true);
    setAuthMail(getValues("email") || "");
    setAuthPhone(getValues("phone") || "");
    navigate.push("/otp-verification");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      {type === "phone" ? (
        <div className="flex flex-col gap-3">
          <label className="text-grey-800 typo-regular2">
            {t("auth.phone")}
          </label>
          <div className="h-13 p-[8px_24px] rounded-full border border-grey-100 flex items-center gap-2">
            <Image alt="flag" src={SaudiLogo.src} width={24} height={24} />
            <span className="text-grey-950 typo-regular2">+966</span>
            <div className="w-[2px] h-4 bg-grey-100" />
            <input
              type="tel"
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="flex-1 outline-none"
              placeholder={t("auth.phonePlaceholder")}
              {...register("phone", {
                required: t("auth.phoneRequired"),
                pattern: {
                  value: /^[0-9+]+$/,
                  message: t("auth.phoneInvalid"),
                },
              })}
            />
          </div>
          {errors.phone && (
            <p className="text-xs text-error-500">{errors.phone.message}</p>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <label className="text-grey-800 typo-regular2">
            {t("auth.email")}
          </label>
          <div className="h-13 p-[8px_24px] rounded-full border border-grey-100 flex items-center gap-2">
            <MailSvg />
            <input
              type="email"
              dir={locale === "ar" ? "rtl" : "ltr"}
              className="flex-1 outline-none"
              placeholder={t("auth.emailPlaceholder")}
              {...register("email", {
                required: t("auth.emailRequired"),
              })}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-error-500">{errors.email.message}</p>
          )}
        </div>
      )}

      <div className="flex flex-col gap-3">
        <label className="text-grey-800 typo-regular2">
          {t("auth.password")}
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
            type={showConfirmPassword ? "text" : "password"}
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

      <div className="flex items-center gap-1">
        <input
          type="checkbox"
          className="cursor-pointer accent-primary-500 w-4 h-4"
          checked={acceptTerms}
          onChange={() => setAcceptTerms(!acceptTerms)}
        />
        <label className="typo-regular2">{t("auth.agreeTo")}</label>
        <Link
          href={"/terms-and-conditions"}
          className="typo-regular2 underline"
        >
          {t("auth.acceptTerms")}
        </Link>
      </div>

      <PrimaryBtn
        disabled={!acceptTerms}
        text={t("auth.sendOtp")}
        className="flex-1 heading6-small rounded-full h-[52px]"
        type="submit"
      />
      <div className="flex items-center gap-1 justify-center typo-regular2">
        <span>{t("auth.haveAccount")}</span>
        <Link href={"/sign-in"} className="text-primary-500">
          {t("auth.login")}
        </Link>
      </div>
    </form>
  );
};
