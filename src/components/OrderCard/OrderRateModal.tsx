import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Star } from "lucide-react";
import PrimaryBtn from "../PrimaryBtn";
import OutlinedBtn from "../OutlinedBtn";

const OrderRateModal = ({
  onClose,
  setSuccessRating,
}: {
  onClose: () => void;
  setSuccessRating: () => void;
}) => {
  const t = useTranslations();
  const locale = useLocale();
  const navigate = useRouter();

  const [hoverRating, setHoverRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
  };

  const handleMouseEnter = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleSubmit = () => {
    console.log("Rating:", rating);
    console.log("Feedback:", feedback);
    setSuccessRating();
    onClose();
  };

  return (
    <div className="flex flex-col">
      <div className="py-8">
        <div className="flex justify-center gap-6" dir={"ltr"}>
          {[...Array(5)].map((_, index) => {
            const filled = index < (hoverRating || rating);
            return (
              <button
                key={index}
                onClick={() => handleClick(index)}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                className={`transition-all cursor-pointer hover:scale-110`}
                type="button"
              >
                <Star
                  size={48}
                  strokeWidth={1.5}
                  className={`transition-colors ${
                    filled
                      ? "fill-alert-500 text-alert-500"
                      : "fill-none text-gray-300"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="py-8 flex flex-col gap-2">
        <p className="text-grey-800 typo-regular2">
          {t("orders.rateProductLabel")}
        </p>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder={t("orders.rateProductPlaceholder")}
          className="w-full h-32 px-4 py-3 border border-grey-100 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 text-start text-gray-700"
          dir={locale === "ar" ? "rtl" : "ltr"}
        />
      </div>
      <div className="pt-8 flex items-center gap-5">
        <PrimaryBtn
          handleClick={handleSubmit}
          disabled={!feedback || !rating}
          text={t("orders.submitReview")}
          className="h-13 rounded-full flex-1 text-white heading6-small"
        />
        <OutlinedBtn
          handleClick={() => navigate.back()}
          text={t("orders.back")}
          className="h-13 rounded-full flex-1 text-grey-800 heading6-small"
        />
      </div>
    </div>
  );
};
export default OrderRateModal;
