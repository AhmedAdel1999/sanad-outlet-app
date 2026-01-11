import { useLocale } from "next-intl";
import { DollarSvg, SarSvg } from "@/icons/global";

export const CurrencyDisplay = ({
  color,
  price,
}: {
  color?: any;
  price?: any;
}) => {
  const locale = useLocale();
  if (locale === "ar") {
    return color ? (
      <div dir="ltr" className="flex items-center gap-0.5 self-start">
        <SarSvg color={color} />
        {price && <span className="typo-semibold3">{price}</span>}
      </div>
    ) : (
      <div dir="ltr" className="flex items-center gap-0.5 self-start">
        <SarSvg />
        {price && <span className="typo-semibold3">{price}</span>}
      </div>
    );
  } else {
    return color ? (
      <div dir="ltr" className="flex items-center gap-0.5 self-start">
        <DollarSvg color={color} />
        {price && <span className="typo-semibold3">{price}</span>}
      </div>
    ) : (
      <div dir="ltr" className="flex items-center gap-0.5 self-start">
        <DollarSvg />
        {price && <span className="typo-semibold3">{price}</span>}
      </div>
    );
  }
};
