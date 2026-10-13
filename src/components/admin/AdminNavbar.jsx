import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import {
    FiMenu,
    FiSearch,
    FiBell,
    FiUser,
    FiSettings,
    FiLogOut,
    FiExternalLink,
    FiCheckCircle,
    FiAlertCircle,
    FiPackage
} from "react-icons/fi";

export const AdminNavbar = ({ onMenuClick }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const profileRef = useRef(null);
    const notifRef = useRef(null);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    // Breadcrumb label based on current path
    const getPageTitle = () => {
        const path = location.pathname;
        if (path.includes("/admin/dashboard")) return "Dashboard Overview";
        if (path.includes("/admin/products")) return "Product Management";
        if (path.includes("/admin/add-product")) return "Add New Product";
        if (path.includes("/admin/edit-product")) return "Edit Product";
        if (path.includes("/admin/categories")) return "Category Management";
        if (path.includes("/admin/orders")) return "Order Management";
        if (path.includes("/admin/users")) return "User Accounts";
        if (path.includes("/admin/profile")) return "Admin Profile";
        if (path.includes("/admin/settings")) return "System Settings";
        return "Admin Portal";
    };

    const notifications = [
        {
            id: 1,
            title: "New order received #ORD-9421",
            time: "10m ago",
            icon: FiPackage,
            color: "text-indigo-600 bg-indigo-50"
        },
        {
            id: 2,
            title: "Liam Alexander registered an account",
            time: "1h ago",
            icon: FiCheckCircle,
            color: "text-emerald-600 bg-emerald-50"
        },
        {
            id: 3,
            title: "Low stock alert: SanDisk SSD PLUS 1TB",
            time: "3h ago",
            icon: FiAlertCircle,
            color: "text-amber-600 bg-amber-50"
        }
    ];

    return (
        <header className="sticky top-0 z-20 flex h-18 w-full items-center justify-between border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur-md sm:px-6 lg:px-8">
            {/* Left: Mobile Toggle & Title */}
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 lg:hidden"
                    title="Toggle menu"
                >
                    <FiMenu size={20} />
                </button>

                <div>
                    <h1 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
                        {getPageTitle()}
                    </h1>
                    <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                        <span>Admin</span>
                        <span>/</span>
                        <span className="font-semibold text-slate-600 capitalize">
                            {location.pathname.replace("/admin/", "") || "dashboard"}
                        </span>
                    </div>
                </div>
            </div>

            {/* Right: Quick Search, Notifications, Store Link & Profile */}
            <div className="flex items-center gap-2 sm:gap-3">
                {/* Search in Admin */}
                <div className="hidden md:flex items-center relative w-64">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Quick search..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs font-medium text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                </div>

                {/* View Storefront Link */}
                <Link
                    to="/home"
                    target="_blank"
                    className="hidden sm:flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-xs transition hover:bg-slate-50 hover:text-indigo-600"
                    title="Open Storefront in new tab"
                >
                    <FiExternalLink size={14} />
                    <span>View Store</span>
                </Link>

                {/* Notifications Dropdown */}
                <div className="relative" ref={notifRef}>
                    <button
                        type="button"
                        onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                        title="Notifications"
                    >
                        <FiBell size={18} />
                        <span className="absolute top-2 right-2 flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
                        </span>
                    </button>

                    {isNotificationsOpen && (
                        <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
                            <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 bg-slate-50/50">
                                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                                    Notifications
                                </span>
                                <span className="rounded-full bg-indigo-50 px-2 py-0.5 text-[10px] font-bold text-indigo-600">
                                    3 New
                                </span>
                            </div>

                            <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                                {notifications.map((n) => {
                                    const Icon = n.icon;
                                    return (
                                        <div key={n.id} className="flex items-start gap-3 p-3.5 hover:bg-slate-50 transition cursor-pointer">
                                            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${n.color}`}>
                                                <Icon size={16} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-semibold text-slate-800 leading-snug">{n.title}</p>
                                                <p className="mt-0.5 text-[10px] text-slate-400">{n.time}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="border-t border-slate-100 p-2 text-center bg-slate-50/30">
                                <Link
                                    to="/admin/orders"
                                    onClick={() => setIsNotificationsOpen(false)}
                                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                                >
                                    View all orders →
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                    <button
                        type="button"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 transition hover:bg-slate-50"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-600 to-violet-600 text-xs font-bold text-white shadow-xs">
                            {user?.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
                        </div>
                        <div className="hidden text-left sm:block pr-1.5">
                            <p className="text-xs font-bold text-slate-800 leading-tight">
                                {user?.name || "Admin"}
                            </p>
                            <p className="text-[10px] font-medium text-slate-400">
                                Super Administrator
                            </p>
                        </div>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1 shadow-xl">
                            <div className="border-b border-slate-100 px-4 py-3">
                                <p className="text-xs font-bold text-slate-900">{user?.name || "System Admin"}</p>
                                <p className="truncate text-xs text-slate-500">{user?.email || "admin@gmail.com"}</p>
                            </div>

                            <div className="py-1">
                                <Link
                                    to="/admin/profile"
                                    onClick={() => setIsProfileOpen(false)}
                                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                                >
                                    <FiUser size={15} />
                                    <span>My Profile</span>
                                </Link>

                                <Link
                                    to="/admin/settings"
                                    onClick={() => setIsProfileOpen(false)}
                                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                                >
                                    <FiSettings size={15} />
                                    <span>Settings</span>
                                </Link>
                            </div>

                            <div className="border-t border-slate-100 py-1">
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                                >
                                    <FiLogOut size={15} />
                                    <span>Log Out</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default AdminNavbar;
