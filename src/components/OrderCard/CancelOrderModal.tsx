import { useState } from "react";
import { useTranslations } from "next-intl";
import { PackageRemoveIcon } from "@/icons/global";
import OutlinedBtn from "../OutlinedBtn";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const CancelOrderModal = ({
  open,
  setCloseModal,
  setCancelledFailed,
  setCancelledSuccessfully,
}: {
  open: boolean;
  setCloseModal: () => void;
  setCancelledFailed: () => void;
  setCancelledSuccessfully: () => void;
}) => {
  const t = useTranslations();
  const [cancelReason, setCancelReason] = useState("");

  const cancelReasons = [
    { id: 1, text: t("orders.reasonChangedMind"), value: "changedMind" },
    { id: 2, text: t("orders.reasonDelayed"), value: "delayed" },
    {
      id: 3,
      text: t("orders.reasonOrderedByMistake"),
      value: "orderedByMistake",
    },
    { id: 4, text: t("orders.reasonOther"), value: "other" },
  ];

  const handleSubmit = () => {
    console.log(cancelReason);
    setCloseModal();
    setCancelledSuccessfully();
    //setCancelledFailed()
  };

  return (
    <Dialog open={open}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="max-w-[600px] max-md:max-w-[300px] [&>button]:hidden">
        <DialogTitle></DialogTitle>
        <div className="pt-10 flex flex-col items-center gap-8">
          <div className="w-[156px] h-[156px] p-[24px_48px] flex items-center justify-center rounded-full bg-error-100 border border-secondary-100 ">
            <PackageRemoveIcon width="65" height="65" />
          </div>

          <div className="flex flex-col gap-2">
            <h5 className="heading5 text-center">
              {t("orders.cancelConfirmTitle")}
            </h5>
            <div className="flex flex-col">
              <p className="typo-regular1 text-center">
                {t("orders.cancelWarning")}
              </p>
              <p className="typo-regular1 text-center">
                {t("orders.refundPolicyNote")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <p className="typo-regular1">{t("orders.cancelReason")}</p>
            <div className="flex flex-col">
              {cancelReasons.map((item) => {
                return (
                  <label
                    key={item.id}
                    htmlFor={`order-${item.value}`}
                    className="h-11 w-full flex items-center gap-4 p-[8px_16px] cursor-pointer"
                  >
                    <p className="typo-regular2 flex-1">{item.text}</p>
                    <input
                      type="radio"
                      id={`order-${item.value}`}
                      value={item.value}
                      className="w-5 h-5 cursor-pointer"
                      checked={cancelReason === item.value}
                      onChange={(e) => setCancelReason(e.target.value)}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-4 w-full">
            <OutlinedBtn
              className="rounded-full bg-error-500! border-none! heading6-small! flex-1"
              text={t("orders.confirmCancellation")}
              handleClick={handleSubmit}
              disabled={!cancelReason}
            />
            <OutlinedBtn
              className="rounded-full text-grey-800 heading6-small! flex-1"
              text={t("orders.back")}
              handleClick={() => setCloseModal()}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default CancelOrderModal;
