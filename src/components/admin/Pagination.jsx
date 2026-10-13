import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export const Pagination = ({
    currentPage = 1,
    totalItems = 0,
    itemsPerPage = 10,
    onPageChange
}) => {
    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

    if (totalItems === 0) return null;

    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 3) {
                pages.push(1, 2, 3, 4, "...", totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200/80 bg-white px-6 py-4">
            <div className="text-xs text-slate-500">
                Showing <span className="font-semibold text-slate-800">{startItem}</span> to{" "}
                <span className="font-semibold text-slate-800">{endItem}</span> of{" "}
                <span className="font-semibold text-slate-800">{totalItems}</span> results
            </div>

            <div className="flex items-center gap-1.5">
                <button
                    type="button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-40"
                    title="Previous page"
                >
                    <FiChevronLeft size={16} />
                </button>

                {getPageNumbers().map((page, index) =>
                    page === "..." ? (
                        <span key={`ellipsis-${index}`} className="px-2 text-xs text-slate-400">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            onClick={() => onPageChange(page)}
                            className={`flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-xs font-semibold transition ${
                                currentPage === page
                                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                                    : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    type="button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 disabled:pointer-events-none disabled:opacity-40"
                    title="Next page"
                >
                    <FiChevronRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
