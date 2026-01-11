import {
  ChildSvg,
  DailyCleanSvg,
  HairDryerSvg,
  INLoveSvg,
  MapLocationSvg,
  MedicalBottleSvg,
  MedicalFile,
  MedicineSvg,
  PensiveSvg,
} from "@/icons/global";
import { useTranslations } from "next-intl";

export const getCategories = () => {
  const t = useTranslations();
  return [
    {
      id: 1,
      text: t("home.medicines"),
      icon: <MedicalBottleSvg className="shrink-0" />,
    },
    {
      id: 2,
      text: t("home.hairCare"),
      icon: <HairDryerSvg className="shrink-0" />,
    },
    {
      id: 3,
      text: t("home.skinCare"),
      icon: <INLoveSvg className="shrink-0" />,
    },
    {
      id: 4,
      text: t("home.dailyCare"),
      icon: <DailyCleanSvg className="shrink-0" />,
    },
    {
      id: 5,
      text: t("home.motherAndBaby"),
      icon: <ChildSvg className="shrink-0" />,
    },
    {
      id: 6,
      text: t("home.makeupAccessories"),
      icon: <PensiveSvg className="shrink-0" />,
    },
    {
      id: 7,
      text: t("home.medicalSupplies"),
      icon: <MedicalFile className="shrink-0" />,
    },
    {
      id: 8,
      text: t("home.vitaminsSupplements"),
      icon: <MedicineSvg className="shrink-0" />,
    },
    {
      id: 9,
      text: t("home.sexualHealth"),
      icon: <MapLocationSvg className="shrink-0" />,
    },
  ];
};
