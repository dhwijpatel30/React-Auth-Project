import React, { useState } from "react";

export const RevenueAreaChart = ({
    data = [
        { month: "Oct", revenue: 4200, orders: 48 },
        { month: "Nov", revenue: 5800, orders: 62 },
        { month: "Dec", revenue: 9100, orders: 104 },
        { month: "Jan", revenue: 6400, orders: 75 },
        { month: "Feb", revenue: 7800, orders: 88 },
        { month: "Mar", revenue: 11450, orders: 132 }
    ]
}) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const maxRev = Math.max(...data.map((d) => d.revenue), 12000);
    const chartHeight = 180;
    const chartWidth = 500;
    const paddingX = 40;
    const paddingY = 20;

    const points = data.map((d, index) => {
        const x = paddingX + (index * (chartWidth - paddingX * 2)) / (data.length - 1);
        const y = chartHeight - paddingY - (d.revenue / maxRev) * (chartHeight - paddingY * 2);
        return { x, y, ...d };
    });

    // Build SVG path
    const pathD = points.reduce((acc, pt, i, arr) => {
        if (i === 0) return `M ${pt.x},${pt.y}`;
        const prev = arr[i - 1];
        const cx = (prev.x + pt.x) / 2;
        return `${acc} C ${cx},${prev.y} ${cx},${pt.y} ${pt.x},${pt.y}`;
    }, "");

    const areaD = `${pathD} L ${points[points.length - 1].x},${chartHeight - paddingY} L ${points[0].x},${chartHeight - paddingY} Z`;

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                <div>
                    <h4 className="text-sm font-bold text-slate-800">Revenue & Sales Trends</h4>
                    <p className="text-xs text-slate-400">Monthly gross sales performance</p>
                </div>
                {hoveredIndex !== null ? (
                    <div className="rounded-xl bg-indigo-50 border border-indigo-200/80 px-3 py-1.5 text-xs text-indigo-900 font-medium">
                        <span className="font-bold">{data[hoveredIndex].month}</span>: ₹{data[hoveredIndex].revenue.toLocaleString()} ({data[hoveredIndex].orders} orders)
                    </div>
                ) : (
                    <div className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        +24.8% YoY
                    </div>
                )}
            </div>

            <div className="relative w-full overflow-x-auto">
                <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="w-full h-48 overflow-visible"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
                            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                        </linearGradient>
                    </defs>

                    {/* Horizontal grid lines */}
                    {[0.25, 0.5, 0.75, 1].map((ratio) => {
                        const y = chartHeight - paddingY - ratio * (chartHeight - paddingY * 2);
                        return (
                            <line
                                key={ratio}
                                x1={paddingX}
                                y1={y}
                                x2={chartWidth - paddingX}
                                y2={y}
                                stroke="#f1f5f9"
                                strokeDasharray="4 4"
                                strokeWidth="1"
                            />
                        );
                    })}

                    {/* Gradient Area Fill */}
                    <path d={areaD} fill="url(#areaGradient)" />

                    {/* Smooth Stroke */}
                    <path
                        d={pathD}
                        fill="none"
                        stroke="#6366f1"
                        strokeWidth="3"
                        strokeLinecap="round"
                    />

                    {/* Interactive Points */}
                    {points.map((pt, i) => (
                        <g key={i} onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}>
                            <circle
                                cx={pt.x}
                                cy={pt.y}
                                r={hoveredIndex === i ? 6 : 4}
                                className={`transition-all duration-200 cursor-pointer ${
                                    hoveredIndex === i
                                        ? "fill-indigo-600 stroke-white stroke-2"
                                        : "fill-white stroke-indigo-600 stroke-2"
                                }`}
                            />
                        </g>
                    ))}
                </svg>

                {/* X Axis Labels */}
                <div className="flex justify-between px-6 pt-2 text-xs font-medium text-slate-400">
                    {data.map((item, idx) => (
                        <span
                            key={idx}
                            className={`cursor-pointer transition ${
                                hoveredIndex === idx ? "font-bold text-indigo-600" : ""
                            }`}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {item.month}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export const CategoryBarChart = ({
    categories = [
        { name: "Men's Clothing", count: 12, percent: 35, color: "bg-indigo-600" },
        { name: "Women's Clothing", count: 9, percent: 28, color: "bg-violet-500" },
        { name: "Electronics", count: 6, percent: 22, color: "bg-blue-500" },
        { name: "Jewelery", count: 4, percent: 15, color: "bg-amber-500" }
    ]
}) => {
    return (
        <div className="w-full space-y-4">
            <div>
                <h4 className="text-sm font-bold text-slate-800">Inventory by Category</h4>
                <p className="text-xs text-slate-400">Product volume and distribution</p>
            </div>

            <div className="space-y-3 pt-2">
                {categories.map((cat, idx) => (
                    <div key={idx} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-slate-700 capitalize">{cat.name}</span>
                            <span className="font-bold text-slate-900">{cat.count} items ({cat.percent}%)</span>
                        </div>
                        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <div
                                className={`h-full rounded-full ${cat.color} transition-all duration-500`}
                                style={{ width: `${cat.percent}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
