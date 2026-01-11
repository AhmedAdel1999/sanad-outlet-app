import { useTranslations } from "next-intl";
import { Package3Icon, PackageRemoveIcon } from "@/icons/global";
import PrimaryBtn from "@/components/PrimaryBtn";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const SuccessCancelModal = ({
  open,
  setCloseModal,
}: {
  open: boolean;
  setCloseModal: () => void;
}) => {
  const t = useTranslations();

  return (
    <Dialog open={open}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="max-w-[600px] max-md:max-w-[300px] [&>button]:hidden">
        <DialogTitle></DialogTitle>
        <div className="pt-20 flex flex-col items-center gap-8">
          <div className="w-[156px] h-[156px] p-[24px_48px] flex items-center justify-center rounded-full bg-primary-100 border border-secondary-100 ">
            <PackageRemoveIcon
              width="65"
              height="65"
              color="var(--primary-500)"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="heading5 text-center">
              {t("orders.orderCancelledSuccess")}
            </h5>
            <p className="typo-regular1 text-center">
              {t("orders.refundDuration")}
            </p>
          </div>

          <PrimaryBtn
            className="rounded-full heading6-small! w-full"
            text={t("orders.backToOrders")}
            handleClick={() => {
              setCloseModal();
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SuccessCancelModal;
