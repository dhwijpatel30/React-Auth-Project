import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import StatusBadge from "../../components/admin/StatusBadge";
import {
    FiUser,
    FiShield,
    FiLock,
    FiMail,
    FiPhone,
    FiCheck,
    FiKey,
    FiActivity,
    FiClock
} from "react-icons/fi";

const Profile = () => {
    const { user, login } = useAuth();
    const [activeTab, setActiveTab] = useState("general"); // 'general' | 'security' | 'activity'

    // Profile state
    const [name, setName] = useState(user?.name || "System Admin");
    const [email, setEmail] = useState(user?.email || "admin@gmail.com");
    const [phone, setPhone] = useState("+1 (555) 234-5678");
    const [department, setDepartment] = useState("Operations & Store Management");
    const [bio, setBio] = useState(
        "Lead administrator overseeing catalog inventory, user authorizations, fulfillment pipelines, and financial reports for ShopSphere."
    );

    // Password fields
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    // Save profile details
    const handleSaveProfile = (e) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            const updatedUser = {
                ...user,
                name: name.trim()
            };

            // Update in localStorage auth_user without breaking structure
            localStorage.setItem("auth_user", JSON.stringify(updatedUser));

            // Also update in registered_user list
            const raw = localStorage.getItem("registered_user");
            if (raw) {
                const reg = JSON.parse(raw);
                const updatedList = reg.map((u) =>
                    u.email.toLowerCase() === (user?.email || "").toLowerCase()
                        ? { ...u, name: name.trim() }
                        : u
                );
                localStorage.setItem("registered_user", JSON.stringify(updatedList));
            }

            if (login) login(updatedUser);
            toast.success("Profile information updated successfully.");
        } catch {
            toast.error("Failed to update profile.");
        } finally {
            setIsSaving(false);
        }
    };

    // Change password handler
    const handleChangePassword = (e) => {
        e.preventDefault();
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Please fill in all password fields.");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("New password must be at least 6 characters long.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match.");
            return;
        }

        try {
            // Find registered admin user to verify current password
            const raw = localStorage.getItem("registered_user");
            if (raw) {
                const reg = JSON.parse(raw);
                const adminAccount = reg.find(
                    (u) => u.email.toLowerCase() === (user?.email || "").toLowerCase()
                );

                if (adminAccount && adminAccount.password) {
                    const isValid = bcrypt.compareSync(currentPassword, adminAccount.password);
                    if (!isValid) {
                        toast.error("Current password does not match.");
                        return;
                    }

                    // Update hashed password
                    const hashedPassword = bcrypt.hashSync(newPassword, 10);
                    const updatedList = reg.map((u) =>
                        u.email.toLowerCase() === adminAccount.email.toLowerCase()
                            ? { ...u, password: hashedPassword }
                            : u
                    );
                    localStorage.setItem("registered_user", JSON.stringify(updatedList));
                }
            }

            toast.success("Admin password changed successfully!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch {
            toast.error("An error occurred while updating password.");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                    Administrator Profile
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                    Manage your personal credentials, contact details, security keys, and access controls.
                </p>
            </div>

            {/* Profile Overview Card */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-3xl font-black text-white shadow-lg shadow-indigo-200">
                        {user?.name ? user.name.slice(0, 2).toUpperCase() : "AD"}
                        <span className="absolute bottom-0 right-0 h-4 w-4 rounded-full border-2 border-white bg-emerald-500" />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{name}</h3>
                                <p className="text-xs text-slate-400 font-medium">{email}</p>
                            </div>
                            <div className="flex items-center justify-center sm:justify-start gap-2">
                                <StatusBadge status={user?.role || "admin"} type="role" />
                                <StatusBadge status="Active" />
                            </div>
                        </div>

                        <p className="mt-3 text-xs text-slate-600 max-w-2xl leading-relaxed">
                            {bio}
                        </p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mt-8 flex items-center gap-2 border-b border-slate-100">
                    <button
                        type="button"
                        onClick={() => setActiveTab("general")}
                        className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition ${
                            activeTab === "general"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-slate-500 hover:text-slate-800"
                        }`}
                    >
                        <FiUser size={15} />
                        <span>Personal Information</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("security")}
                        className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition ${
                            activeTab === "security"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-slate-500 hover:text-slate-800"
                        }`}
                    >
                        <FiLock size={15} />
                        <span>Security & Password</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setActiveTab("activity")}
                        className={`flex items-center gap-2 border-b-2 px-4 py-3 text-xs font-bold transition ${
                            activeTab === "activity"
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-slate-500 hover:text-slate-800"
                        }`}
                    >
                        <FiActivity size={15} />
                        <span>Permissions & Activity</span>
                    </button>
                </div>
            </div>

            {/* Tab Contents */}
            {activeTab === "general" && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
                    <div className="max-w-2xl">
                        <h4 className="text-base font-bold text-slate-900">Personal Details</h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Update your public display name and operational contact info.
                        </p>

                        <form onSubmit={handleSaveProfile} className="mt-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        disabled
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-xs sm:text-sm text-slate-500 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Department / Division
                                    </label>
                                    <input
                                        type="text"
                                        value={department}
                                        onChange={(e) => setDepartment(e.target.value)}
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Admin Bio
                                </label>
                                <textarea
                                    rows={4}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95 disabled:opacity-60"
                                >
                                    {isSaving ? "Saving..." : "Save Profile"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === "security" && (
                <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <FiKey size={20} />
                            </div>
                            <div>
                                <h4 className="text-base font-bold text-slate-900">Change Admin Password</h4>
                                <p className="text-xs text-slate-400">
                                    Update your master security key for dashboard and admin login.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleChangePassword} className="mt-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Current Password
                                </label>
                                <input
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    placeholder="Enter current password..."
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    New Password
                                </label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="At least 6 characters..."
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Confirm New Password
                                </label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-type new password..."
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div className="pt-4 border-t border-slate-100 flex justify-end">
                                <button
                                    type="submit"
                                    className="rounded-xl bg-indigo-600 px-6 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
                                >
                                    Update Password
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {activeTab === "activity" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Permissions list */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                        <div className="flex items-center gap-2.5 mb-4">
                            <FiShield size={18} className="text-indigo-600" />
                            <h4 className="text-sm font-bold text-slate-900">Assigned Admin Capabilities</h4>
                        </div>
                        <ul className="space-y-3 text-xs">
                            {[
                                "Full catalog write, edit & delete permissions",
                                "Order fulfillment & refund processing",
                                "Customer registry access & role administration",
                                "Financial analytics and sales reporting",
                                "System configuration & store maintenance"
                            ].map((perm, idx) => (
                                <li key={idx} className="flex items-center gap-2.5 text-slate-700 font-medium">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                                        <FiCheck size={12} />
                                    </span>
                                    <span>{perm}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Activity log */}
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                        <div className="flex items-center gap-2.5 mb-4">
                            <FiClock size={18} className="text-indigo-600" />
                            <h4 className="text-sm font-bold text-slate-900">Recent Admin Audit Log</h4>
                        </div>
                        <div className="space-y-3 text-xs">
                            {[
                                { action: "Admin logged in successfully", time: "Just now", ip: "192.168.1.1" },
                                { action: "Updated product catalog inventory", time: "2 hours ago", ip: "192.168.1.1" },
                                { action: "Dispatched order #ORD-9420", time: "Yesterday at 4:15 PM", ip: "192.168.1.1" },
                                { action: "Modified category settings", time: "3 days ago", ip: "192.168.1.1" }
                            ].map((log, idx) => (
                                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                                    <div>
                                        <p className="font-semibold text-slate-800">{log.action}</p>
                                        <p className="text-[10px] text-slate-400">IP: {log.ip}</p>
                                    </div>
                                    <span className="text-[10px] text-slate-400">{log.time}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
