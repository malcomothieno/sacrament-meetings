"use client";

import Link from "next/link";
import { useSearchParams, usePathname } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  totalMeetings: number;
  pageSize: number;
}

export default function Pagination({
  totalPages,
  currentPage,
  totalMeetings,
  pageSize,
}: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const startIndex = (currentPage - 1) * pageSize;

  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-700">
          Showing <span className="font-medium">{totalMeetings > 0 ? startIndex + 1 : 0}</span> to <span className="font-medium">{Math.min(startIndex + pageSize, totalMeetings)}</span> of <span className="font-medium">{totalMeetings}</span> results
        </p>
      </div>
      <div className="flex gap-2">
        {currentPage > 1 ? (
          <Link
            href={createPageURL(currentPage - 1)}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Previous
          </Link>
        ) : (
          <span className="rounded-md border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-300 cursor-not-allowed">
            Previous
          </span>
        )}

        {currentPage < totalPages ? (
          <Link
            href={createPageURL(currentPage + 1)}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Next
          </Link>
        ) : (
          <span className="rounded-md border border-gray-200 px-3 py-1 text-sm font-semibold text-gray-300 cursor-not-allowed">
            Next
          </span>
        )}
      </div>
    </nav>
  );
}
