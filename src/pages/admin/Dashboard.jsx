import React, { useContext, useMemo } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { getRegisterUser } from "../../services/authService";
import { getAdminOrders } from "../../services/adminDataService";
import StatCard from "../../components/admin/StatCard";
import StatusBadge from "../../components/admin/StatusBadge";
import { RevenueAreaChart, CategoryBarChart } from "../../components/admin/AdminCharts";
import {
    FiDollarSign,
    FiShoppingCart,
    FiBox,
    FiUsers,
    FiClock,
    FiArrowRight,
    FiPlus,
    FiCheckCircle
} from "react-icons/fi";

const Dashboard = () => {
    const { users: products = [] } = useContext(ProductContext) || {};
    const registeredUsers = useMemo(() => getRegisterUser(), []);
    const orders = useMemo(() => getAdminOrders(), []);

    // Calculated metrics
    const totalRevenue = useMemo(() => {
        return orders
            .filter((o) => o.paymentStatus === "Paid")
            .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
    }, [orders]);

    const pendingOrders = useMemo(() => {
        return orders.filter((o) => o.orderStatus === "Pending");
    }, [orders]);

    const recentOrders = useMemo(() => {
        return [...orders].slice(0, 5);
    }, [orders]);

    const recentUsers = useMemo(() => {
        return [...registeredUsers].reverse().slice(0, 5);
    }, [registeredUsers]);

    // Compute category distribution for inventory
    const categoryStats = useMemo(() => {
        if (!products.length) return [];
        const counts = {};
        products.forEach((p) => {
            const cat = p.category || "Uncategorized";
            counts[cat] = (counts[cat] || 0) + 1;
        });
        const colors = [
            "bg-indigo-600",
            "bg-violet-500",
            "bg-blue-500",
            "bg-amber-500",
            "bg-emerald-500"
        ];
        return Object.entries(counts).map(([name, count], idx) => ({
            name,
            count,
            percent: Math.round((count / products.length) * 100),
            color: colors[idx % colors.length]
        }));
    }, [products]);

    return (
        <div className="space-y-8">
            {/* Header with Quick Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                        Admin Overview
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Real-time business performance, orders activity, and store metrics.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link
                        to="/admin/add-product"
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
                    >
                        <FiPlus size={16} />
                        <span>Add Product</span>
                    </Link>
                    <Link
                        to="/admin/orders"
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-700 shadow-xs transition hover:bg-slate-50"
                    >
                        <FiShoppingCart size={16} />
                        <span>View Orders</span>
                    </Link>
                </div>
            </div>

            {/* KPI Statistics Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Revenue"
                    value={`$${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    icon={FiDollarSign}
                    iconBg="bg-indigo-50 text-indigo-600"
                    change="+14.8%"
                    isPositive={true}
                    subtitle="vs last month"
                />

                <StatCard
                    title="Total Orders"
                    value={orders.length}
                    icon={FiShoppingCart}
                    iconBg="bg-blue-50 text-blue-600"
                    change="+8.2%"
                    isPositive={true}
                    subtitle="vs last month"
                />

                <StatCard
                    title="Total Products"
                    value={products.length}
                    icon={FiBox}
                    iconBg="bg-violet-50 text-violet-600"
                    change="Active Catalog"
                    isPositive={true}
                    subtitle="in store"
                />

                <StatCard
                    title="Total Users"
                    value={registeredUsers.length || 1}
                    icon={FiUsers}
                    iconBg="bg-emerald-50 text-emerald-600"
                    change="+4 new"
                    isPositive={true}
                    subtitle="this week"
                />
            </div>

            {/* Secondary Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex items-center justify-between rounded-2xl border border-amber-200/80 bg-amber-50/40 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                            <FiClock size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-amber-800">
                                Pending Orders Requiring Attention
                            </p>
                            <p className="text-sm font-medium text-amber-900">
                                {pendingOrders.length} {pendingOrders.length === 1 ? "order is" : "orders are"} waiting to be processed and shipped.
                            </p>
                        </div>
                    </div>
                    <Link
                        to="/admin/orders"
                        className="shrink-0 rounded-xl bg-amber-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-amber-700"
                    >
                        Review
                    </Link>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-emerald-200/80 bg-emerald-50/40 p-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                            <FiCheckCircle size={20} />
                        </div>
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                                Store Status & Health
                            </p>
                            <p className="text-sm font-medium text-emerald-900">
                                Catalog, orders pipeline, and customer registrations running smoothly.
                            </p>
                        </div>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">
                        Operational
                    </span>
                </div>
            </div>

            {/* Visual Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                    <RevenueAreaChart />
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
                    <CategoryBarChart categories={categoryStats} />
                </div>
            </div>

            {/* Recent Orders & Recent Users Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Recent Orders</h3>
                            <p className="text-xs text-slate-400">Latest customer purchases and transactions</p>
                        </div>
                        <Link
                            to="/admin/orders"
                            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                        >
                            <span>View All</span>
                            <FiArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-100">
                                <tr>
                                    <th className="px-6 py-3.5">Order ID</th>
                                    <th className="px-6 py-3.5">Customer</th>
                                    <th className="px-6 py-3.5">Amount</th>
                                    <th className="px-6 py-3.5">Payment</th>
                                    <th className="px-6 py-3.5">Order Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-slate-50/70 transition">
                                        <td className="px-6 py-3.5 font-bold text-indigo-600">
                                            {order.id}
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <div className="flex items-center gap-2.5">
                                                {order.customer?.avatar ? (
                                                    <img
                                                        src={order.customer.avatar}
                                                        alt={order.customer.name}
                                                        className="h-7 w-7 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-600">
                                                        {order.customer?.name?.[0] || "U"}
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="font-semibold text-slate-800">{order.customer?.name}</p>
                                                    <p className="text-[10px] text-slate-400">{order.customer?.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-3.5 font-bold text-slate-900">
                                            ${Number(order.totalAmount).toFixed(2)}
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <StatusBadge status={order.paymentStatus} type="payment" />
                                        </td>
                                        <td className="px-6 py-3.5">
                                            <StatusBadge status={order.orderStatus} type="order" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Users List */}
                <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm overflow-hidden flex flex-col">
                    <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                        <div>
                            <h3 className="text-base font-bold text-slate-900">Registered Users</h3>
                            <p className="text-xs text-slate-400">Recently active member accounts</p>
                        </div>
                        <Link
                            to="/admin/users"
                            className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                        >
                            <span>Manage</span>
                            <FiArrowRight size={14} />
                        </Link>
                    </div>

                    <div className="divide-y divide-slate-100 flex-1 p-2">
                        {recentUsers.length > 0 ? (
                            recentUsers.map((u, idx) => (
                                <div key={u.id || idx} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-xs font-bold text-white shadow-xs">
                                            {u.name ? u.name.slice(0, 2).toUpperCase() : "US"}
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-800">{u.name || "Customer"}</p>
                                            <p className="text-[11px] text-slate-400 truncate max-w-[140px]">{u.email}</p>
                                        </div>
                                    </div>
                                    <StatusBadge status={u.role || "user"} type="role" />
                                </div>
                            ))
                        ) : (
                            <div className="p-6 text-center text-xs text-slate-400">
                                No registered users found.
                            </div>
                        )}
                    </div>

                    <div className="border-t border-slate-100 bg-slate-50/50 p-4">
                        <Link
                            to="/admin/users"
                            className="flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                        >
                            View All Users
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;