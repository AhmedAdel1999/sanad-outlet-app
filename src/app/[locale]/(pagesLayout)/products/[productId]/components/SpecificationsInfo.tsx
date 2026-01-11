import { useTranslations } from "next-intl";

const SpecificationsInfo = () => {
  const t = useTranslations();

  const specifications = [
    {
      label: t("singleProduct.productName"),
      value: t("singleProduct.productNameValue"),
    },
    {
      label: t("singleProduct.dosageForm"),
      value: t("singleProduct.dosageFormValue"),
    },
    {
      label: t("singleProduct.tabletCount"),
      value: t("singleProduct.tabletCountValue"),
    },
    {
      label: t("singleProduct.concentration"),
      value: t("singleProduct.concentrationValue"),
    },
    {
      label: t("singleProduct.classification"),
      value: t("singleProduct.classificationValue"),
    },
    {
      label: t("singleProduct.indications"),
      value: t("singleProduct.indicationsValue"),
    },
    { label: t("singleProduct.usage"), value: t("singleProduct.usageValue") },
    {
      label: t("singleProduct.maxDailyDose"),
      value: t("singleProduct.maxDailyDoseValue"),
    },
    {
      label: t("singleProduct.suitableForAdults"),
      value: t("singleProduct.suitableForAdultsValue"),
    },
  ];
  return (
    <div className="rounded-lg shadow-md overflow-hidden border border-grey-100">
      <table className="w-full">
        <thead>
          <tr className="bg-grey-50 border-b-2 border-grey-100">
            <th className="py-4 px-6 typo-regular1 w-1/2 text-start">
              {t("singleProduct.item")}
            </th>
            <th className="py-4 px-6 typo-regular1 w-1/2 text-start">
              {t("singleProduct.details")}
            </th>
          </tr>
        </thead>
        <tbody>
          {specifications.map((spec, index) => (
            <tr
              key={index}
              className="border-b border-grey-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-4 px-6 typo-regular1 text-start">
                {spec.label}
              </td>
              <td className="py-4 px-6 typo-regular1 text-start">
                {spec.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default SpecificationsInfo;
