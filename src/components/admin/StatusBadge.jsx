import React from "react";

export const StatusBadge = ({ status, type = "order" }) => {
    const s = String(status || "").toLowerCase();

    // Order status
    if (type === "order") {
        if (s === "delivered") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Delivered
                </span>
            );
        }
        if (s === "shipped") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    Shipped
                </span>
            );
        }
        if (s === "processing") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 border border-indigo-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                    Processing
                </span>
            );
        }
        if (s === "pending") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    Pending
                </span>
            );
        }
        if (s === "cancelled") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    Cancelled
                </span>
            );
        }
    }

    // Payment status
    if (type === "payment") {
        if (s === "paid") {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200">
                    Paid
                </span>
            );
        }
        if (s === "pending") {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 border border-amber-200">
                    Pending
                </span>
            );
        }
        if (s === "failed") {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 border border-rose-200">
                    Failed
                </span>
            );
        }
        if (s === "refunded") {
            return (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 border border-slate-200">
                    Refunded
                </span>
            );
        }
    }

    // Stock status
    if (type === "stock") {
        if (s === "in stock" || s === "instock") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    In Stock
                </span>
            );
        }
        if (s === "low stock" || s === "lowstock") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    Low Stock
                </span>
            );
        }
        if (s === "out of stock" || s === "outofstock") {
            return (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700 border border-rose-200">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                    Out of Stock
                </span>
            );
        }
    }

    // Role
    if (type === "role") {
        if (s === "admin") {
            return (
                <span className="inline-flex items-center gap-1 rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 border border-indigo-200">
                    Admin
                </span>
            );
        }
        return (
            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 border border-slate-200">
                Customer
            </span>
        );
    }

    // General status (Active / Inactive)
    if (s === "active" || s === "true" || status === true) {
        return (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Active
            </span>
        );
    }

    return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 border border-slate-200">
            <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
            Inactive
        </span>
    );
};

export default StatusBadge;
