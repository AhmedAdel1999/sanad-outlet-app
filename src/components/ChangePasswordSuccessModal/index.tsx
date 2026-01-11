import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { LockKeyIcon } from "@/icons/global";
import PrimaryBtn from "@/components/PrimaryBtn";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useStore } from "@/store";

const ChangePasswordSuccessModal = () => {
  const t = useTranslations();
  const navigate = useRouter();
  const { handleResetAuthValues } = useStore();

  return (
    <Dialog open>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="max-w-[600px] max-md:max-w-[300px] [&>button]:hidden">
        <DialogTitle></DialogTitle>
        <div className="pt-20 flex flex-col items-center gap-8">
          <div className="w-[156px] h-[156px] p-[24px_48px] flex items-center justify-center rounded-full bg-secondary-50 border border-secondary-100 ">
            <LockKeyIcon />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="heading5 text-center">{t("auth.successTitle")}</h5>
            <p className="typo-regular1 text-center">
              {t("auth.successDescription")}
            </p>
          </div>

          <PrimaryBtn
            className="rounded-full heading6-small! w-full"
            text={t("auth.login")}
            handleClick={() => {
              navigate.push("/sign-in");
              handleResetAuthValues();
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default ChangePasswordSuccessModal;
