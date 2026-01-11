import Image from "next/image";
import { useTranslations } from "next-intl";
import ReviewerImage from "@/assets/safwan-img.png";
import { StarSvg } from "@/icons/global";

const Reviews = () => {
  const t = useTranslations();

  const reviews = [
    {
      id: 1,
      reviewerImg: ReviewerImage,
      reviewerName: t("singleProduct.reviewer1Name"),
      reviewerText: t("singleProduct.reviewer1Text"),
      reviewerDate: t("singleProduct.reviewer1Date"),
    },
    {
      id: 2,
      reviewerImg: ReviewerImage,
      reviewerName: t("singleProduct.reviewer2Name"),
      reviewerText: t("singleProduct.reviewer2Text"),
      reviewerDate: t("singleProduct.reviewer1Date"),
    },
    {
      id: 3,
      reviewerImg: ReviewerImage,
      reviewerName: t("singleProduct.reviewer3Name"),
      reviewerText: t("singleProduct.reviewer3Text"),
      reviewerDate: t("singleProduct.reviewer1Date"),
    },
    {
      id: 4,
      reviewerImg: ReviewerImage,
      reviewerName: t("singleProduct.reviewer4Name"),
      reviewerText: t("singleProduct.reviewer4Text"),
      reviewerDate: t("singleProduct.reviewer1Date"),
    },
    {
      id: 5,
      reviewerImg: ReviewerImage,
      reviewerName: t("singleProduct.reviewer5Name"),
      reviewerText: t("singleProduct.reviewer5Text"),
      reviewerDate: t("singleProduct.reviewer1Date"),
    },
  ];
  return (
    <div className="flex flex-col gap-6">
      {reviews.map((item) => {
        return (
          <div
            key={item.id}
            className="p-6 rounded-4xl bg-grey-50 flex flex-col gap-6"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="h-11 w-11 rounded-full">
                  <Image
                    alt="profile-img"
                    src={item.reviewerImg.src}
                    width={44}
                    height={44}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <p className="typo-semibold">{item.reviewerName}</p>
                  <p className="flex items-center gap-0.5 typo-regular1">
                    <StarSvg />
                    <span>4.5</span>
                  </p>
                </div>
              </div>
              <p className="typo-regular1 text-grey-600">{item.reviewerDate}</p>
            </div>
            <p className="typo-regular1">{item.reviewerText}</p>
          </div>
        );
      })}
    </div>
  );
};
export default Reviews;
