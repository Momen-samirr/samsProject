"use client";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { useRouter } from "next/navigation";
import React from "react";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const hasPrev = ITEM_PER_PAGE * (page - 1) > 0;
  const hasNext = ITEM_PER_PAGE * (page - 1) + ITEM_PER_PAGE < count;
  const router = useRouter();

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`${window.location.pathname}?${params}`);
  };
  return (
    <div className="flex items-center justify-between gap-3 mt-3 text-gray-500">
      <button
        onClick={() => {
          changePage(page - 1);
        }}
        className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!hasPrev}
      >
        Previous
      </button>
      <div className="flex items-center gap-3">
        {Array.from({ length: Math.ceil(count / ITEM_PER_PAGE) }, (_, i) => {
          const pageIndex = i + 1;
          return (
            <button
              key={pageIndex}
              onClick={() => {
                changePage(pageIndex);
              }}
              className={`px-3 py-1 bg-gray-400 rounded ${
                page === pageIndex ? "bg-lamaSky" : ""
              }`}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        className="px-3 py-1 bg-gray-400 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!hasNext}
        onClick={() => {
          changePage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
