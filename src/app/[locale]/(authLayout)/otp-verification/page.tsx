"use client";
import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import PrimaryBtn from "@/components/PrimaryBtn";
import { ArrowRightSvg } from "@/icons/global";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useStore } from "@/store";
import VerifyAccountModal from "@/components/VerifyAccountModal";
import ChangePasswordSuccessModal from "@/components/ChangePasswordSuccessModal";

const Page = () => {
  const t = useTranslations();
  const navigate = useRouter();
  const [success, setSuccess] = useState(false);
  const { isVerifyingAccount, authMail, authPhone, authWithPhone } = useStore();

  const [otp, setOtp] = useState("");
  const [counter, setCounter] = useState(60); // 60 seconds countdown
  const [isActive, setIsActive] = useState(true);
  const [resetKey, setResetKey] = useState(0);

  // Countdown logic
  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isActive && counter > 0) {
      interval = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
    } else if (counter === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval as any);
  }, [counter, isActive]);

  const handleOTPChange = (value: string) => {
    setOtp(value);
  };

  const handleResend = () => {
    console.log("Resend OTP clicked");
    setCounter(60); // reset timer
    setIsActive(true);
    setOtp("");
    setResetKey((prev) => prev + 1);
  };

  const handleOTPVerification = () => {
    console.log(otp);
    setSuccess(true);
    if (!isVerifyingAccount) {
      navigate.push("/create-password");
    }
  };

  // Format counter as MM:SS
  const formatCounter = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec.toString().padStart(2, "0")}`;
  };

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
          {authWithPhone
            ? t("auth.verifyPhoneTitle")
            : t("auth.verifyEmailTitle")}
        </h5>
        <p className="typo-regular1 flex items-center gap-0.5">
          <span>{t("auth.enterOtp")}</span>
          <span className="text-primary-500">
            {authWithPhone ? authPhone : authMail}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-8">
        <InputOTP
          key={resetKey}
          className="w-full"
          maxLength={6}
          onChange={handleOTPChange}
        >
          <InputOTPGroup className="w-full grid grid-cols-6 gap-4">
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <InputOTPSlot
                className="w-full rounded-full! p-[8px_24px] h-[52px] data-[active=true]:ring-1! data-[active=true]:ring-[#13AC6F] font-semibold text-2xl border border-grey-200"
                index={item}
                key={item}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>

        <PrimaryBtn
          handleClick={handleOTPVerification}
          text={t("auth.confirmOtp")}
          disabled={otp.length !== 6}
          className="flex-1 heading6-small rounded-full h-[52px]"
        />

        <PrimaryBtn
          text={`${t("auth.resendOtpAfter")} ${
            isActive ? t("auth.after") : ""
          } ${isActive ? `(${formatCounter(counter)})` : ""}`}
          className="flex-1 heading6-small rounded-full h-[52px]"
          disabled={isActive}
          handleClick={handleResend}
        />

        {success && isVerifyingAccount && <VerifyAccountModal />}
      </div>
    </div>
  );
};
export default Page;
