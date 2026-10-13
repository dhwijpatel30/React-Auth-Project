import React, { useState, useMemo, useEffect } from "react";
import { getRegisterUser } from "../../services/authService";
import { toast } from "react-toastify";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import Pagination from "../../components/admin/Pagination";
import {
    FiSearch,
    FiUserPlus,
    FiEdit2,
    FiTrash2,
    FiEye,
    FiUsers,
    FiX,
    FiCheck,
    FiMail,
    FiCalendar,
    FiShield
} from "react-icons/fi";

const REGISTER_KEY = "registered_user";

// Seeded realistic customer users if only admin user exists
const defaultSeedUsers = [
    {
        id: "usr-101",
        name: "Sophia Martinez",
        email: "sophia.m@example.com",
        role: "user",
        isActive: true,
        createdAt: "2026-01-15T09:20:00.000Z"
    },
    {
        id: "usr-102",
        name: "Liam Alexander",
        email: "liam.a@example.com",
        role: "user",
        isActive: true,
        createdAt: "2026-02-10T14:45:00.000Z"
    },
    {
        id: "usr-103",
        name: "Emma Watson",
        email: "emma.w@example.com",
        role: "user",
        isActive: true,
        createdAt: "2026-02-22T18:10:00.000Z"
    },
    {
        id: "usr-104",
        name: "Noah Benjamin",
        email: "noah.b@example.com",
        role: "user",
        isActive: false,
        createdAt: "2026-03-01T11:05:00.000Z"
    },
    {
        id: "usr-105",
        name: "Olivia Grace",
        email: "olivia.g@example.com",
        role: "user",
        isActive: true,
        createdAt: "2026-03-08T16:30:00.000Z"
    }
];

const Users = () => {
    const [usersList, setUsersList] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    // Modals
    const [viewingUser, setViewingUser] = useState(null);
    const [editingUser, setEditingUser] = useState(null);
    const [userToDelete, setUserToDelete] = useState(null);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);

    // Form inputs for Add User
    const [newUserName, setNewUserName] = useState("");
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserRole, setNewUserRole] = useState("user");

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Load registered users + merge seed users if needed
    useEffect(() => {
        try {
            const raw = localStorage.getItem(REGISTER_KEY);
            let current = raw ? JSON.parse(raw) : [];

            // If empty or only 1 admin, seed realistic users so the table is rich
            if (current.length <= 1) {
                const combined = [...current];
                defaultSeedUsers.forEach((seed) => {
                    if (!combined.some((u) => u.email.toLowerCase() === seed.email.toLowerCase())) {
                        combined.push(seed);
                    }
                });
                localStorage.setItem(REGISTER_KEY, JSON.stringify(combined));
                setUsersList(combined);
            } else {
                setUsersList(current);
            }
        } catch {
            setUsersList(getRegisterUser() || []);
        }
    }, []);

    // Filter users
    const filteredUsers = useMemo(() => {
        return usersList.filter((u) => {
            const matchesSearch =
                (u.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (u.email || "").toLowerCase().includes(searchQuery.toLowerCase());

            const matchesRole =
                roleFilter === "all" || (u.role || "user").toLowerCase() === roleFilter.toLowerCase();

            const isActive = u.isActive !== undefined ? u.isActive : true;
            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "active" && isActive) ||
                (statusFilter === "inactive" && !isActive);

            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [usersList, searchQuery, roleFilter, statusFilter]);

    // Paginated users
    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredUsers.slice(start, start + itemsPerPage);
    }, [filteredUsers, currentPage]);

    // Save changes to localStorage
    const persistUsers = (updated) => {
        setUsersList(updated);
        localStorage.setItem(REGISTER_KEY, JSON.stringify(updated));
    };

    // Add user handler
    const handleAddUser = (e) => {
        e.preventDefault();
        if (!newUserName.trim() || !newUserEmail.trim()) {
            toast.error("Please fill in both name and email.");
            return;
        }

        const emailExists = usersList.some(
            (u) => u.email.toLowerCase() === newUserEmail.trim().toLowerCase()
        );
        if (emailExists) {
            toast.error("A user with this email address already exists.");
            return;
        }

        const newUser = {
            id: `usr-${Date.now()}`,
            name: newUserName.trim(),
            email: newUserEmail.trim().toLowerCase(),
            role: newUserRole,
            isActive: true,
            createdAt: new Date().toISOString()
        };

        const updated = [newUser, ...usersList];
        persistUsers(updated);
        toast.success(`User "${newUser.name}" added successfully.`);
        setNewUserName("");
        setNewUserEmail("");
        setNewUserRole("user");
        setIsAddUserOpen(false);
    };

    // Edit user handler
    const handleSaveEdit = (e) => {
        e.preventDefault();
        if (!editingUser) return;

        const updated = usersList.map((u) =>
            u.id === editingUser.id ? { ...editingUser } : u
        );
        persistUsers(updated);
        toast.success(`User updated successfully.`);
        setEditingUser(null);
    };

    // Delete user handler
    const handleConfirmDelete = () => {
        if (!userToDelete) return;

        if (userToDelete.role === "admin" && userToDelete.email === "admin@gmail.com") {
            toast.error("The system administrator account cannot be deleted.");
            setUserToDelete(null);
            return;
        }

        const updated = usersList.filter((u) => u.id !== userToDelete.id);
        persistUsers(updated);
        toast.success(`User "${userToDelete.name}" deleted.`);
        setUserToDelete(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                        User Accounts
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage registered customers, administrators, roles, and account statuses.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsAddUserOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
                >
                    <FiUserPlus size={16} />
                    <span>Add New User</span>
                </button>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search by customer name or email..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                </div>

                <div className="flex items-center gap-2.5">
                    <select
                        value={roleFilter}
                        onChange={(e) => {
                            setRoleFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500"
                    >
                        <option value="all">All Roles</option>
                        <option value="admin">Admins</option>
                        <option value="user">Customers</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500"
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="border-b border-slate-100 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Registered Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paginatedUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                        No users matching the selected criteria.
                                    </td>
                                </tr>
                            ) : (
                                paginatedUsers.map((user) => {
                                    const isActive = user.isActive !== undefined ? user.isActive : true;
                                    const created = user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric"
                                          })
                                        : "Jan 12, 2026";

                                    return (
                                        <tr key={user.id || user.email} className="hover:bg-slate-50/70 transition">
                                            {/* Name & Avatar */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-xs font-bold text-white shadow-xs">
                                                        {user.name ? user.name.slice(0, 2).toUpperCase() : "US"}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-slate-900">{user.name || "Customer"}</p>
                                                        <p className="text-[10px] text-slate-400 font-mono">
                                                            ID: {String(user.id || "").slice(0, 10)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Email */}
                                            <td className="px-6 py-4 font-medium text-slate-600">
                                                {user.email}
                                            </td>

                                            {/* Role */}
                                            <td className="px-6 py-4">
                                                <StatusBadge status={user.role || "user"} type="role" />
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                <StatusBadge status={isActive ? "Active" : "Inactive"} />
                                            </td>

                                            {/* Registered Date */}
                                            <td className="px-6 py-4 text-slate-500">
                                                {created}
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => setViewingUser(user)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                                                        title="View Profile"
                                                    >
                                                        <FiEye size={15} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setEditingUser(user)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                                                        title="Edit User"
                                                    >
                                                        <FiEdit2 size={15} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setUserToDelete(user)}
                                                        disabled={user.role === "admin" && user.email === "admin@gmail.com"}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-rose-50 hover:text-rose-600 disabled:opacity-30 disabled:pointer-events-none"
                                                        title="Delete User"
                                                    >
                                                        <FiTrash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredUsers.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Add User Modal */}
            {isAddUserOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
                        onClick={() => setIsAddUserOpen(false)}
                    />
                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setIsAddUserOpen(false)}
                            className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                            <FiX size={18} />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <FiUserPlus size={20} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900">Create New User</h3>
                                <p className="text-xs text-slate-400">Add an account directly to the registry</p>
                            </div>
                        </div>

                        <form onSubmit={handleAddUser} className="mt-5 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={newUserName}
                                    onChange={(e) => setNewUserName(e.target.value)}
                                    placeholder="e.g. John Doe"
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={newUserEmail}
                                    onChange={(e) => setNewUserEmail(e.target.value)}
                                    placeholder="john@example.com"
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Account Role
                                </label>
                                <select
                                    value={newUserRole}
                                    onChange={(e) => setNewUserRole(e.target.value)}
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                >
                                    <option value="user">Customer / User</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAddUserOpen(false)}
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
                                >
                                    Create User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* View User Modal */}
            {viewingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
                        onClick={() => setViewingUser(null)}
                    />
                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setViewingUser(null)}
                            className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                            <FiX size={18} />
                        </button>

                        <div className="text-center pb-4 border-b border-slate-100">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-xl font-black text-white shadow-md shadow-indigo-200">
                                {viewingUser.name ? viewingUser.name.slice(0, 2).toUpperCase() : "US"}
                            </div>
                            <h3 className="mt-3 text-lg font-bold text-slate-900">{viewingUser.name}</h3>
                            <p className="text-xs text-slate-400">{viewingUser.email}</p>
                            <div className="mt-3 flex items-center justify-center gap-2">
                                <StatusBadge status={viewingUser.role || "user"} type="role" />
                                <StatusBadge status={viewingUser.isActive !== false ? "Active" : "Inactive"} />
                            </div>
                        </div>

                        <div className="mt-4 space-y-3 text-xs">
                            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                                <span className="text-slate-500 font-medium">User ID:</span>
                                <span className="font-mono text-slate-800">{viewingUser.id || "N/A"}</span>
                            </div>
                            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                                <span className="text-slate-500 font-medium">Registered:</span>
                                <span className="font-semibold text-slate-800">
                                    {viewingUser.createdAt
                                        ? new Date(viewingUser.createdAt).toLocaleDateString()
                                        : "N/A"}
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => setViewingUser(null)}
                                className="w-full rounded-xl bg-slate-900 py-2.5 text-xs font-bold text-white hover:bg-slate-800"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit User Modal */}
            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
                        onClick={() => setEditingUser(null)}
                    />
                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setEditingUser(null)}
                            className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                            <FiX size={18} />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <FiEdit2 size={18} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900">Edit User Account</h3>
                                <p className="text-xs text-slate-400">{editingUser.email}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSaveEdit} className="mt-5 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={editingUser.name || ""}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, name: e.target.value })
                                    }
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Account Role
                                </label>
                                <select
                                    value={editingUser.role || "user"}
                                    onChange={(e) =>
                                        setEditingUser({ ...editingUser, role: e.target.value })
                                    }
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                >
                                    <option value="user">Customer / User</option>
                                    <option value="admin">Administrator</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Account Status
                                </label>
                                <select
                                    value={editingUser.isActive !== false ? "true" : "false"}
                                    onChange={(e) =>
                                        setEditingUser({
                                            ...editingUser,
                                            isActive: e.target.value === "true"
                                        })
                                    }
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive / Suspended</option>
                                </select>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setEditingUser(null)}
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            <ConfirmDeleteModal
                isOpen={!!userToDelete}
                onClose={() => setUserToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Delete User Account"
                message="Are you sure you want to delete this user? Their account and access credentials will be permanently revoked."
                itemName={userToDelete?.name ? `${userToDelete.name} (${userToDelete.email})` : userToDelete?.email}
            />
        </div>
    );
};

export default Users;