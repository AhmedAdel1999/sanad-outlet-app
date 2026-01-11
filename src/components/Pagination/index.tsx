import React, { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { PaginationLeftArrow, PaginationRigthArrow } from "@/icons/global";
import { Button } from "../ui/button";

type PageItem = number | "...";

interface MainPaginationProps {
  rowsPerPage: number;
  currentPage: number;
  data: any[];
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const MainPagination = ({
  rowsPerPage,
  currentPage,
  data,
  setCurrentPage,
}: MainPaginationProps) => {
  const t = useTranslations();
  const locale = useLocale();

  // Total pages
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Generate page numbers
  const pageNumbers: PageItem[] = useMemo(() => {
    const pages: PageItem[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) pages.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-8 flex justify-end">
      <div className="flex items-center gap-2.5">
        {/* Prev */}
        <button
          className={`h-11 w-11 p-[8px_16px] rounded-xl bg-grey-100 ${
            currentPage === 1 ? "pointer-events-none" : "cursor-pointer"
          }`}
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          {locale === "ar" ? <PaginationRigthArrow /> : <PaginationLeftArrow />}
        </button>

        {/* Pages */}
        <div className="flex gap-1">
          {pageNumbers.map((page, idx) => (
            <button
              key={`${page}-${idx}`}
              disabled={page === "..."}
              onClick={() => typeof page === "number" && changePage(page)}
              className={`cursor-pointer typo-semibold3 h-11 w-11 p-[8px_16px] rounded-xl bg-none ${
                currentPage === page ? "bg-secondary-500" : ""
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          className={`h-11 w-11 p-[8px_16px] rounded-xl bg-grey-100 ${
            currentPage === totalPages
              ? "pointer-events-none"
              : "cursor-pointer"
          }`}
          disabled={currentPage === totalPages}
          onClick={() => changePage(currentPage + 1)}
        >
          {locale === "ar" ? <PaginationLeftArrow /> : <PaginationRigthArrow />}
        </button>
      </div>
    </div>
  );
};

export default MainPagination;
