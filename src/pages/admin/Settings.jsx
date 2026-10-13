import React, { useState } from "react";
import { toast } from "react-toastify";
import {
    FiSettings,
    FiSliders,
    FiBell,
    FiSave,
    FiDollarSign,
    FiMail,
    FiGlobe,
    FiShield
} from "react-icons/fi";

const Settings = () => {
    const [activeTab, setActiveTab] = useState("store");

    // Form states
    const [storeName, setStoreName] = useState("ShopSphere");
    const [supportEmail, setSupportEmail] = useState("support@shopsphere.com");
    const [currency, setCurrency] = useState("USD ($)");
    const [taxRate, setTaxRate] = useState("8.5");
    const [orderPrefix, setOrderPrefix] = useState("ORD-");

    // Preferences
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [lowStockThreshold, setLowStockThreshold] = useState("5");
    const [allowReviews, setAllowReviews] = useState(true);

    // Notifications
    const [notifyNewOrder, setNotifyNewOrder] = useState(true);
    const [notifyLowStock, setNotifyLowStock] = useState(true);
    const [dailyDigest, setDailyDigest] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        toast.success("Settings saved successfully.");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                    System & Store Settings
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Configure global ecommerce settings, currencies, alerts, and operational rules.
                </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200">
                <button
                    type="button"
                    onClick={() => setActiveTab("store")}
                    className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition ${
                        activeTab === "store"
                            ? "border-indigo-600 text-indigo-600"
                            : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                >
                    <FiSliders size={15} />
                    <span>Store Configuration</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("preferences")}
                    className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition ${
                        activeTab === "preferences"
                            ? "border-indigo-600 text-indigo-600"
                            : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                >
                    <FiSettings size={15} />
                    <span>Catalog Preferences</span>
                </button>

                <button
                    type="button"
                    onClick={() => setActiveTab("notifications")}
                    className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition ${
                        activeTab === "notifications"
                            ? "border-indigo-600 text-indigo-600"
                            : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                >
                    <FiBell size={15} />
                    <span>Notifications</span>
                </button>
            </div>

            {/* Settings Body */}
            <form onSubmit={handleSave} className="space-y-6">
                {activeTab === "store" && (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs max-w-2xl space-y-5">
                        <h4 className="text-base font-bold text-slate-900">General Information</h4>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                Store Name
                            </label>
                            <input
                                type="text"
                                value={storeName}
                                onChange={(e) => setStoreName(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                Customer Support Email
                            </label>
                            <input
                                type="email"
                                value={supportEmail}
                                onChange={(e) => setSupportEmail(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Currency Format
                                </label>
                                <select
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                >
                                    <option value="USD ($)">USD ($)</option>
                                    <option value="EUR (€)">EUR (€)</option>
                                    <option value="GBP (£)">GBP (£)</option>
                                    <option value="INR (₹)">INR (₹)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Tax Rate (%)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={taxRate}
                                    onChange={(e) => setTaxRate(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                Order ID Prefix
                            </label>
                            <input
                                type="text"
                                value={orderPrefix}
                                onChange={(e) => setOrderPrefix(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                            />
                        </div>
                    </div>
                )}

                {activeTab === "preferences" && (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs max-w-2xl space-y-5">
                        <h4 className="text-base font-bold text-slate-900">Inventory & Operations</h4>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div>
                                <p className="text-xs font-bold text-slate-800">Store Maintenance Mode</p>
                                <p className="text-[11px] text-slate-400">
                                    Temporarily disable customer storefront for planned maintenance.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={maintenanceMode}
                                onChange={(e) => setMaintenanceMode(e.target.checked)}
                                className="h-5 w-5 accent-indigo-600 rounded cursor-pointer"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                Low Stock Alert Threshold
                            </label>
                            <input
                                type="number"
                                value={lowStockThreshold}
                                onChange={(e) => setLowStockThreshold(e.target.value)}
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                            />
                            <p className="mt-1 text-[11px] text-slate-400">
                                Items with inventory below this quantity will display a "Low Stock" badge.
                            </p>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div>
                                <p className="text-xs font-bold text-slate-800">Allow Customer Reviews</p>
                                <p className="text-[11px] text-slate-400">
                                    Let registered buyers rate and write feedback on products.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={allowReviews}
                                onChange={(e) => setAllowReviews(e.target.checked)}
                                className="h-5 w-5 accent-indigo-600 rounded cursor-pointer"
                            />
                        </div>
                    </div>
                )}

                {activeTab === "notifications" && (
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs max-w-2xl space-y-4">
                        <h4 className="text-base font-bold text-slate-900">Email & Push Alerts</h4>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div>
                                <p className="text-xs font-bold text-slate-800">New Order Alerts</p>
                                <p className="text-[11px] text-slate-400">
                                    Receive instantaneous notifications when customer orders are placed.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifyNewOrder}
                                onChange={(e) => setNotifyNewOrder(e.target.checked)}
                                className="h-5 w-5 accent-indigo-600 rounded cursor-pointer"
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div>
                                <p className="text-xs font-bold text-slate-800">Low Stock Warnings</p>
                                <p className="text-[11px] text-slate-400">
                                    Alert admin when items fall beneath the inventory threshold.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={notifyLowStock}
                                onChange={(e) => setNotifyLowStock(e.target.checked)}
                                className="h-5 w-5 accent-indigo-600 rounded cursor-pointer"
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100">
                            <div>
                                <p className="text-xs font-bold text-slate-800">Daily Sales Digest</p>
                                <p className="text-[11px] text-slate-400">
                                    Receive a daily summary of revenue, shipments, and new users.
                                </p>
                            </div>
                            <input
                                type="checkbox"
                                checked={dailyDigest}
                                onChange={(e) => setDailyDigest(e.target.checked)}
                                className="h-5 w-5 accent-indigo-600 rounded cursor-pointer"
                            />
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-start pt-2">
                    <button
                        type="submit"
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
                    >
                        <FiSave size={16} />
                        <span>Save Settings</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Settings;