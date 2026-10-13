import React from "react";
import { FiTrendingUp, FiTrendingDown } from "react-icons/fi";

export const StatCard = ({
    title,
    value,
    icon: Icon,
    iconBg = "bg-indigo-50 text-indigo-600",
    change,
    isPositive = true,
    subtitle = "vs last month",
    badge
}) => {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:border-slate-300">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        {title}
                    </p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                        {value}
                    </h3>
                </div>

                {Icon && (
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
                        <Icon size={22} />
                    </div>
                )}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                {change !== undefined && (
                    <div className="flex items-center gap-1.5 font-semibold">
                        <span className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                            isPositive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
                        }`}>
                            {isPositive ? <FiTrendingUp size={12} /> : <FiTrendingDown size={12} />}
                            {change}
                        </span>
                        <span className="text-slate-400 font-normal">{subtitle}</span>
                    </div>
                )}

                {badge && (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-slate-600">
                        {badge}
                    </span>
                )}
            </div>
        </div>
    );
};

export default StatCard;
