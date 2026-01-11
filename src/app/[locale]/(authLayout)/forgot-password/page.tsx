"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRightSvg, MailSvg } from "@/icons/global";
import SaudiLogo from "@/assets/saudi-flag.png";
import PrimaryBtn from "@/components/PrimaryBtn";
import { useStore } from "@/store";

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
          {t("auth.forgot_pass_title")}
        </h5>
        <p className="typo-regular1">{t("auth.forgot_pass_description")}</p>
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
  const { setIsVerifyingAccount, setAuthMail, setAuthPhone } = useStore();

  type FormValues = {
    email?: string;
    phone?: string;
  };
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {},
    mode: "all",
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    setIsVerifyingAccount(false);
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

      <PrimaryBtn
        text={t("auth.sendOtp")}
        className="flex-1 heading6-small rounded-full h-[52px]"
        type="submit"
      />
    </form>
  );
};
