import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ChevronLeft, ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  maxItems?: number;
}

const Breadcrumb = ({ items, maxItems = 4 }: BreadcrumbProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const isRTL = locale === "ar";

  const Separator = isRTL ? ChevronLeft : ChevronRight;

  const visibleItems =
    items.length > maxItems
      ? [
          items[0],
          { label: "...", href: undefined },
          ...items.slice(items.length - (maxItems - 2)),
        ]
      : items;

  return (
    <nav aria-label="Breadcrumb" className="w-full">
      <ol className="flex items-center gap-2 text-sm text-neutral-600">
        {visibleItems.map((item, index) => {
          const isLast = index === visibleItems.length - 1;

          return (
            <li key={index} className="flex items-center gap-2">
              {!isLast ? (
                item.href ? (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {item.label === "..." ? "..." : item.label}
                  </Link>
                ) : (
                  <span className="text-neutral-400">...</span>
                )
              ) : (
                <span
                  aria-current="page"
                  className="font-semibold text-neutral-900"
                >
                  {item.label}
                </span>
              )}

              {!isLast && <Separator className="w-4 h-4 text-neutral-400" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
