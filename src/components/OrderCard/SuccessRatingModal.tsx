import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { Package3Icon } from "@/icons/global";
import OutlinedBtn from "../OutlinedBtn";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const SuccessRatingModal = ({
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
          <div className="w-[156px] h-[156px] p-[24px_48px] flex items-center justify-center rounded-full bg-secondary-50 border border-secondary-100 ">
            <Package3Icon />
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="heading5 text-center">{t("orders.thankYou")}</h5>
            <p className="typo-regular1 text-center">
              {t("orders.reviewSubmitted")}
            </p>
          </div>

          <OutlinedBtn
            handleClick={setCloseModal}
            text={t("orders.continue")}
            className="h-13 rounded-full w-full text-grey-800 heading6-small"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SuccessRatingModal;
