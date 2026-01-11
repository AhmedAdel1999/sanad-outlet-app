import { Link, useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Package3Icon } from "@/icons/global";
import PrimaryBtn from "@/components/PrimaryBtn";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const CheckoutSuccessModal = () => {
  const t = useTranslations();
  const navigate = useRouter();

  return (
    <Dialog open>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="max-w-[600px] max-md:max-w-[300px] [&>button]:hidden">
        <DialogTitle></DialogTitle>
        <div className="pt-20 flex flex-col items-center gap-8">
          <div className="w-[156px] h-[156px] p-[24px_48px] flex items-center justify-center rounded-full bg-secondary-50 border border-secondary-100 ">
            <Package3Icon />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="heading5 text-center">
              {t("checkout.success_title")}
            </h5>
            <div className="flex flex-col">
              <p className="typo-regular1 text-center">
                {t("checkout.orderNumber")}
              </p>
              <p className="typo-regular1 text-center">
                {t("checkout.orderUpdates")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full">
            <PrimaryBtn
              className="rounded-full heading6-small! flex-1"
              text={t("checkout.backToHome")}
              handleClick={() => {
                navigate.push("/");
              }}
            />
            <Link
              href={"/orders"}
              className="rounded-full flex items-center justify-center h-13 p-[8px_24px] border border-grey-100 heading6-small! flex-1"
            >
              {t("checkout.followOrder")}
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CheckoutSuccessModal;
