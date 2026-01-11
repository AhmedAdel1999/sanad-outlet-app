"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocale, useTranslations } from "next-intl";
import Breadcrumb from "@/components/Breadcrumb.tsx";
import { Check, Eye, EyeOff } from "lucide-react";
import PrimaryBtn from "@/components/PrimaryBtn";
import {
  CameraIcon,
  LockKeySvg,
  SmartPhoneIcon,
  User3Icon,
} from "@/icons/global";
import AvatarImg from "@/assets/avatar.png";

const Page = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [imageSrc, setImageSrc] = useState<any>(AvatarImg);
  const [showPassword, setShowPassword] = useState(false);

  type FormValues = {
    name: string;
    phone: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {},
    mode: "all",
  });

  const handleImageUpload = (e: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className="pt-12 pb-8 max-md:px-4 md:px-6 lg:px-8 flex flex-col gap-11">
      <Breadcrumb
        items={[
          { label: t("home.home"), href: "/" },
          { label: t("profile.editAccount") },
        ]}
      />

      <div className="flex items-center justify-between gap-6">
        <h5 className="heading5 max-md:heading5-small">
          {t("profile.editAccount")}
        </h5>

        <PrimaryBtn
          text={t("profile.saveChanges")}
          icon={<Check size={30} />}
          className="h-13 rounded-full typo-regular2!"
        />
      </div>

      <div className="flex justify-center">
        <form className="max-w-[450px] w-full flex flex-col gap-11">
          {/* Profile Image */}
          <div className="relative self-center">
            <img
              src={typeof imageSrc === "string" ? imageSrc : imageSrc.src}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <label
              htmlFor="imageUpload"
              className="absolute bottom-0 right-0 bg-gray-100 rounded-full p-2 cursor-pointer hover:bg-gray-200 transition-colors shadow-md"
            >
              <CameraIcon />
              <input
                id="imageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <div className="flex flex-col gap-8">
            {/* name */}
            <div className="flex flex-col gap-3">
              <label className="text-grey-800 typo-regular2">
                {t("profile.fullName")}
              </label>
              <div className="h-13 p-[8px_24px] rounded-full border border-grey-100 flex items-center gap-2">
                <User3Icon />
                <input
                  type="tel"
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className="flex-1 outline-none"
                  placeholder={t("profile.fullName")}
                  {...register("name", {
                    required: t("profile.fullNameRequired"),
                  })}
                />
              </div>
              {errors.name && (
                <p className="text-xs text-error-500">{errors.name.message}</p>
              )}
            </div>

            {/* phone */}
            <div className="flex flex-col gap-3">
              <label className="text-grey-800 typo-regular2">
                {t("profile.phone")}
              </label>
              <div className="h-13 p-[8px_24px] rounded-full border border-grey-100 flex items-center gap-2">
                <SmartPhoneIcon />
                <input
                  type="tel"
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className="flex-1 outline-none"
                  placeholder={t("profile.changePhone")}
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

            {/* password */}
            <div className="flex flex-col gap-3">
              <label className="text-grey-800 typo-regular2">
                {t("profile.password")}
              </label>
              <div className="h-13 p-[8px_24px] rounded-full border border-grey-100 flex items-center gap-2">
                <LockKeySvg />
                <input
                  type={showPassword ? "text" : "password"}
                  dir={locale === "ar" ? "rtl" : "ltr"}
                  className="flex-1 outline-none"
                  placeholder={t("profile.changePassword")}
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
                <p className="text-xs text-error-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Page;
