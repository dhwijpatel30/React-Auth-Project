import React, { useContext, useState, useRef, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import {
    FiSearch,
    FiShoppingBag,
    FiUser,
    FiMenu,
    FiX,
    FiPlus,
    FiPhone,
    FiHome,
    FiInfo,
    FiPackage,
    FiShield,
    FiLogOut,
    FiChevronDown
} from "react-icons/fi";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const { user, logout } = useAuth();
    const {
        toggle,
        setToggle,
        search,
        setSearch,
        cartItems = []
    } = useContext(ProductContext);

    const [mobileMenu, setMobileMenu] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        setUserDropdown(false);
        setMobileMenu(false);
        navigate("/");
    };

    // Close user dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setUserDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenu(false);
        setUserDropdown(false);
    }, [location.pathname]);

    const cartCount = cartItems?.reduce(
        (total, item) => total + (item.quantity || 1),
        0
    ) || 0;

    const navClass = ({ isActive }) =>
        `relative flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold tracking-tight transition-all duration-200 ${
            isActive
                ? "bg-indigo-50 text-indigo-600 shadow-xs"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        }`;

    return (
        <>
            {/* Top Announcement Bar */}
            <div className="bg-slate-900 text-slate-300 text-[11px] font-medium py-2 px-4 text-center border-b border-slate-800">
                <div className="mx-auto max-w-7xl flex items-center justify-between sm:justify-center gap-4">
                    <span className="truncate">
                        🚀 <strong className="text-white font-semibold">Special Offer:</strong> Free Express Shipping on orders over $50! Use code <span className="text-indigo-400 font-bold uppercase">SHOP10</span> for 10% off.
                    </span>
                    {user?.role === "admin" && (
                        <Link
                            to="/admin/dashboard"
                            className="hidden sm:inline-flex items-center gap-1 rounded-md bg-indigo-600/30 px-2 py-0.5 text-[10px] font-bold text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600 hover:text-white transition"
                        >
                            <FiShield size={11} />
                            <span>Go to Admin Portal →</span>
                        </Link>
                    )}
                </div>
            </div>

            {/* Main Sticky Header */}
            <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 shadow-[0_4px_20px_rgba(15,23,42,0.04)] backdrop-blur-xl transition-all">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-20 items-center justify-between gap-4 sm:gap-6">
                        {/* Brand Logo */}
                        <Link
                            to="/home"
                            className="group flex shrink-0 items-center gap-3 transition"
                        >
                            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-xl font-black text-white shadow-md shadow-indigo-200 transition-all duration-300 group-hover:scale-105 group-hover:shadow-indigo-300">
                                S
                                <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-400" />
                            </div>

                            <div className="hidden sm:block">
                                <h1 className="text-xl font-black tracking-tight text-slate-900 leading-none">
                                    Shop<span className="text-indigo-600">Sphere</span>
                                </h1>
                                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400 mt-1">
                                    Modern Marketplace
                                </p>
                            </div>
                        </Link>

                        {/* Desktop Navigation Links */}
                        <div className="hidden items-center gap-1 lg:flex">
                            <NavLink to="/home" className={navClass}>
                                <FiHome size={16} />
                                <span>Home</span>
                            </NavLink>

                            <NavLink to="/products" className={navClass}>
                                <FiPackage size={16} />
                                <span>Products</span>
                            </NavLink>

                            <NavLink to="/about" className={navClass}>
                                <FiInfo size={16} />
                                <span>About</span>
                            </NavLink>

                            <NavLink to="/contact" className={navClass}>
                                <FiPhone size={16} />
                                <span>Contact</span>
                            </NavLink>
                        </div>

                        {/* Search Bar (Desktop) */}
                        <div className="hidden max-w-xs flex-1 md:block lg:max-w-sm">
                            <div className="group relative">
                                <FiSearch
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-600"
                                    size={17}
                                />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search products, brands, gear..."
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50/90 py-2.5 pl-10 pr-9 text-xs font-medium text-slate-800 outline-none transition duration-200 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                />
                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
                                        title="Clear search"
                                    >
                                        <FiX size={14} />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Right Action Icons */}
                        <div className="flex items-center gap-2 sm:gap-2.5">
                            {/* Admin Quick Switch (if admin) */}
                            {user?.role === "admin" && (
                                <Link
                                    to="/admin/dashboard"
                                    className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-600 hover:text-white"
                                    title="Open Admin Dashboard"
                                >
                                    <FiShield size={15} />
                                    <span>Admin</span>
                                </Link>
                            )}

                            {/* Create Product Quick Modal Trigger */}
                            <button
                                type="button"
                                onClick={() => setToggle(!toggle)}
                                className="hidden items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-600 active:scale-95 sm:flex"
                                title="Add/Create Product"
                            >
                                <FiPlus size={16} />
                                <span>Create</span>
                            </button>

                            {/* Shopping Cart Icon */}
                            <Link
                                to="/cart"
                                className="group relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-xs transition hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                                title="View Shopping Cart"
                            >
                                <FiShoppingBag
                                    size={20}
                                    className="transition-transform duration-200 group-hover:scale-110"
                                />

                                {cartCount > 0 && (
                                    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-indigo-600 px-1 text-[10px] font-black text-white shadow-sm animate-in zoom-in-50">
                                        {cartCount > 99 ? "99+" : cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* User Account Dropdown */}
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setUserDropdown(!userDropdown)}
                                    className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
                                    title="Account Menu"
                                >
                                    {user?.name ? (
                                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-600 text-xs font-bold text-white">
                                            {user.name.slice(0, 2).toUpperCase()}
                                        </div>
                                    ) : (
                                        <FiUser size={19} />
                                    )}
                                </button>

                                {userDropdown && (
                                    <div className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white py-1 shadow-xl animate-in fade-in slide-in-from-top-2">
                                        <div className="border-b border-slate-100 px-4 py-3 bg-slate-50/50">
                                            <p className="text-xs font-bold text-slate-900">
                                                {user?.name || "Customer Account"}
                                            </p>
                                            <p className="truncate text-[11px] text-slate-400">
                                                {user?.email || "Signed in"}
                                            </p>
                                        </div>

                                        <div className="py-1">
                                            {user?.role === "admin" && (
                                                <Link
                                                    to="/admin/dashboard"
                                                    onClick={() => setUserDropdown(false)}
                                                    className="flex items-center gap-2.5 px-4 py-2 text-xs font-bold text-indigo-600 hover:bg-indigo-50"
                                                >
                                                    <FiShield size={15} />
                                                    <span>Admin Dashboard</span>
                                                </Link>
                                            )}

                                            <Link
                                                to="/products"
                                                onClick={() => setUserDropdown(false)}
                                                className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                                            >
                                                <FiPackage size={15} />
                                                <span>Browse Catalog</span>
                                            </Link>

                                            <Link
                                                to="/cart"
                                                onClick={() => setUserDropdown(false)}
                                                className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                                            >
                                                <FiShoppingBag size={15} />
                                                <span>My Cart ({cartCount})</span>
                                            </Link>
                                        </div>

                                        <div className="border-t border-slate-100 py-1">
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                className="flex w-full items-center gap-2.5 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50"
                                            >
                                                <FiLogOut size={15} />
                                                <span>Log Out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Hamburger Button */}
                            <button
                                type="button"
                                onClick={() => setMobileMenu(!mobileMenu)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:bg-slate-100 lg:hidden"
                                title="Toggle menu"
                            >
                                {mobileMenu ? <FiX size={20} /> : <FiMenu size={20} />}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* Mobile Navigation Drawer */}
                {mobileMenu && (
                    <div className="border-t border-slate-200 bg-white lg:hidden animate-in slide-in-from-top-2">
                        <div className="mx-auto max-w-7xl space-y-4 px-4 py-5 sm:px-6">
                            {/* Mobile Search */}
                            <div className="relative">
                                <FiSearch
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                    size={16}
                                />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search products..."
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-9 text-xs font-medium text-slate-800 outline-none focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                />
                                {search && (
                                    <button
                                        type="button"
                                        onClick={() => setSearch("")}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    >
                                        <FiX size={14} />
                                    </button>
                                )}
                            </div>

                            {/* Navigation Links Grid */}
                            <div className="grid grid-cols-2 gap-2">
                                <Link
                                    to="/home"
                                    onClick={() => setMobileMenu(false)}
                                    className="flex items-center gap-2 rounded-xl bg-indigo-50/80 px-4 py-3 text-xs font-bold text-indigo-700"
                                >
                                    <FiHome size={16} />
                                    <span>Home</span>
                                </Link>

                                <Link
                                    to="/products"
                                    onClick={() => setMobileMenu(false)}
                                    className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100"
                                >
                                    <FiPackage size={16} />
                                    <span>Products</span>
                                </Link>

                                <Link
                                    to="/about"
                                    onClick={() => setMobileMenu(false)}
                                    className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100"
                                >
                                    <FiInfo size={16} />
                                    <span>About</span>
                                </Link>

                                <Link
                                    to="/contact"
                                    onClick={() => setMobileMenu(false)}
                                    className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-100"
                                >
                                    <FiPhone size={16} />
                                    <span>Contact</span>
                                </Link>

                                <Link
                                    to="/cart"
                                    onClick={() => setMobileMenu(false)}
                                    className="col-span-2 flex items-center justify-between rounded-xl bg-slate-900 px-4 py-3 text-xs font-bold text-white shadow-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <FiShoppingBag size={16} />
                                        <span>View Shopping Cart</span>
                                    </div>
                                    <span className="rounded-full bg-indigo-500 px-2 py-0.5 text-[10px] font-black text-white">
                                        {cartCount}
                                    </span>
                                </Link>
                            </div>

                            {/* Mobile Admin Switch */}
                            {user?.role === "admin" && (
                                <Link
                                    to="/admin/dashboard"
                                    onClick={() => setMobileMenu(false)}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50 py-3 text-xs font-bold text-indigo-700"
                                >
                                    <FiShield size={16} />
                                    <span>Open Admin Dashboard</span>
                                </Link>
                            )}

                            {/* Mobile Quick Create */}
                            <button
                                type="button"
                                onClick={() => {
                                    setToggle(true);
                                    setMobileMenu(false);
                                }}
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 py-3 text-xs font-bold text-white shadow-sm"
                            >
                                <FiPlus size={16} />
                                <span>Create Product</span>
                            </button>

                            {/* Mobile Logout */}
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 py-3 text-xs font-bold text-rose-600 transition hover:bg-rose-100"
                            >
                                <FiLogOut size={16} />
                                <span>Log Out ({user?.name || "Customer"})</span>
                            </button>
                        </div>
                    </div>
                )}
            </header>
        </>
    );
};

export default Navbar;