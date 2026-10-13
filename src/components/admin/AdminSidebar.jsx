import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ProductContext } from "../../context/ProductContext";
import { getAdminOrders } from "../../services/adminDataService";
import {
    FiHome,
    FiBox,
    FiPlusCircle,
    FiLayers,
    FiShoppingCart,
    FiUsers,
    FiUser,
    FiSettings,
    FiLogOut,
    FiExternalLink,
    FiX,
    FiShield
} from "react-icons/fi";

export const AdminSidebar = ({ isMobileOpen, setIsMobileOpen }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { users: products = [] } = useContext(ProductContext) || {};

    const orders = getAdminOrders();
    const pendingOrdersCount = orders.filter((o) => o.orderStatus === "Pending").length;

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    const navItems = [
        {
            label: "Dashboard",
            path: "/admin/dashboard",
            icon: FiHome,
            badge: null
        },
        {
            label: "Products",
            path: "/admin/products",
            icon: FiBox,
            badge: products.length ? products.length : null
        },
        {
            label: "Add Product",
            path: "/admin/add-product",
            icon: FiPlusCircle,
            badge: null
        },
        {
            label: "Categories",
            path: "/admin/categories",
            icon: FiLayers,
            badge: null
        },
        {
            label: "Orders",
            path: "/admin/orders",
            icon: FiShoppingCart,
            badge: pendingOrdersCount > 0 ? `${pendingOrdersCount} new` : null,
            badgeColor: "bg-amber-500 text-slate-950"
        },
        {
            label: "Users",
            path: "/admin/users",
            icon: FiUsers,
            badge: null
        },
        {
            label: "Admin Profile",
            path: "/admin/profile",
            icon: FiUser,
            badge: null
        },
        {
            label: "Settings",
            path: "/admin/settings",
            icon: FiSettings,
            badge: null
        }
    ];

    const sidebarContent = (
        <div className="flex h-full flex-col bg-slate-900 text-slate-200">
            {/* Logo / Header */}
            <div className="flex h-18 items-center justify-between border-b border-slate-800/80 px-6">
                <Link to="/admin/dashboard" className="flex items-center gap-3 group">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white font-black shadow-md shadow-indigo-500/25 transition group-hover:scale-105">
                        <FiShield size={20} />
                    </div>
                    <div>
                        <span className="text-base font-black tracking-tight text-white flex items-center gap-1.5">
                            ShopSphere
                            <span className="rounded-md bg-indigo-600/30 px-1.5 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/30">
                                ADMIN
                            </span>
                        </span>
                        <p className="text-[10px] font-medium text-slate-400">Management Suite</p>
                    </div>
                </Link>

                {/* Mobile Close */}
                <button
                    type="button"
                    onClick={() => setIsMobileOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
                >
                    <FiX size={18} />
                </button>
            </div>

            {/* Navigation links */}
            <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-6 scrollbar-thin scrollbar-thumb-slate-700">
                <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Main Navigation
                </p>

                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsMobileOpen(false)}
                            className={({ isActive }) =>
                                `group relative flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                    isActive
                                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25"
                                        : "text-slate-400 hover:bg-slate-800/70 hover:text-slate-100"
                                }`
                            }
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={18} className="shrink-0 transition-transform group-hover:scale-110" />
                                <span>{item.label}</span>
                            </div>

                            {item.badge && (
                                <span
                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                                        item.badgeColor || "bg-slate-800 text-slate-300 border border-slate-700"
                                    }`}
                                >
                                    {item.badge}
                                </span>
                            )}
                        </NavLink>
                    );
                })}

                <div className="pt-4">
                    <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        External
                    </p>
                    <Link
                        to="/home"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-slate-800/70 hover:text-indigo-300"
                    >
                        <div className="flex items-center gap-3">
                            <FiExternalLink size={17} className="shrink-0 group-hover:text-indigo-400" />
                            <span>View Storefront</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">↗</span>
                    </Link>
                </div>
            </nav>

            {/* User info & Logout footer */}
            <div className="border-t border-slate-800/80 p-4">
                <div className="mb-3 flex items-center gap-3 rounded-xl bg-slate-800/40 p-2.5 border border-slate-800">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-violet-500 font-bold text-white text-xs">
                        {user?.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="truncate text-xs font-semibold text-white">
                            {user?.name || "System Admin"}
                        </p>
                        <p className="truncate text-[11px] text-slate-400">
                            {user?.email || "admin@gmail.com"}
                        </p>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-4 py-2.5 text-xs font-bold text-rose-400 transition duration-200 hover:bg-rose-500 hover:text-white active:scale-[0.98]"
                >
                    <FiLogOut size={16} />
                    <span>Log Out</span>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar (Fixed width) */}
            <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col border-r border-slate-800 bg-slate-900 z-30">
                {sidebarContent}
            </aside>

            {/* Mobile Drawer (Overlay + Slide-out) */}
            {isMobileOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300"
                        onClick={() => setIsMobileOpen(false)}
                    />

                    {/* Drawer panel */}
                    <div className="fixed inset-y-0 left-0 w-72 max-w-full shadow-2xl transition-transform duration-300 ease-in-out">
                        {sidebarContent}
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminSidebar;
