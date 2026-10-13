import React, { useState, useMemo, useContext, useEffect } from "react";
import { ProductContext } from "../../context/ProductContext";
import {
    getAdminCategories,
    addAdminCategory,
    updateAdminCategory,
    deleteAdminCategory
} from "../../services/adminDataService";
import { toast } from "react-toastify";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import {
    FiPlus,
    FiSearch,
    FiEdit2,
    FiTrash2,
    FiLayers,
    FiBox,
    FiX,
    FiCheck,
    FiImage
} from "react-icons/fi";

const Categories = () => {
    const { users: products = [] } = useContext(ProductContext) || {};
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Modals
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [categoryToDelete, setCategoryToDelete] = useState(null);

    // Form inputs for Add
    const [newName, setNewName] = useState("");
    const [newDesc, setNewDesc] = useState("");
    const [newImage, setNewImage] = useState("");
    const [newStatus, setNewStatus] = useState("Active");

    useEffect(() => {
        setCategories(getAdminCategories());
    }, []);

    // Dynamically calculate products count per category
    const categoryCounts = useMemo(() => {
        const counts = {};
        products.forEach((p) => {
            const cat = (p.category || "").toLowerCase().trim();
            counts[cat] = (counts[cat] || 0) + 1;
        });
        return counts;
    }, [products]);

    // Filter categories
    const filteredCategories = useMemo(() => {
        return categories.filter((c) => {
            const name = (c.displayName || c.name || "").toLowerCase();
            const desc = (c.description || "").toLowerCase();
            return name.includes(searchQuery.toLowerCase()) || desc.includes(searchQuery.toLowerCase());
        });
    }, [categories, searchQuery]);

    // Handle Add
    const handleAddCategory = (e) => {
        e.preventDefault();
        if (!newName.trim()) {
            toast.error("Category name is required.");
            return;
        }

        const exists = categories.some(
            (c) => (c.name || "").toLowerCase() === newName.trim().toLowerCase()
        );
        if (exists) {
            toast.error("A category with this name already exists.");
            return;
        }

        const updated = addAdminCategory({
            name: newName,
            description: newDesc,
            image: newImage || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&auto=format&fit=crop&q=60",
            status: newStatus
        });

        setCategories(updated);
        toast.success(`Category "${newName}" created successfully.`);
        setNewName("");
        setNewDesc("");
        setNewImage("");
        setNewStatus("Active");
        setIsAddOpen(false);
    };

    // Handle Save Edit
    const handleSaveEdit = (e) => {
        e.preventDefault();
        if (!editingCategory) return;

        const updated = updateAdminCategory(editingCategory.id, editingCategory);
        setCategories(updated);
        toast.success(`Category "${editingCategory.displayName || editingCategory.name}" updated.`);
        setEditingCategory(null);
    };

    // Handle Confirm Delete
    const handleConfirmDelete = () => {
        if (!categoryToDelete) return;

        const updated = deleteAdminCategory(categoryToDelete.id);
        setCategories(updated);
        toast.success(`Category "${categoryToDelete.displayName || categoryToDelete.name}" deleted.`);
        setCategoryToDelete(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                        Category Management
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Organize product departments, display names, and inventory groupings.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsAddOpen(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
                >
                    <FiPlus size={16} />
                    <span>Add Category</span>
                </button>
            </div>

            {/* Search */}
            <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search categories by name or description..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                </div>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredCategories.map((cat) => {
                    const normName = (cat.name || "").toLowerCase().trim();
                    const productCount = categoryCounts[normName] || 0;

                    return (
                        <div
                            key={cat.id}
                            className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition hover:shadow-md hover:border-slate-300"
                        >
                            <div className="relative h-36 w-full overflow-hidden bg-slate-100">
                                <img
                                    src={cat.image}
                                    alt={cat.displayName || cat.name}
                                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                                    <h4 className="font-bold text-sm tracking-wide capitalize">
                                        {cat.displayName || cat.name}
                                    </h4>
                                    <span className="rounded-full bg-white/20 backdrop-blur-xs px-2 py-0.5 text-[10px] font-bold">
                                        {cat.status || "Active"}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                    {cat.description || "No description provided for this collection."}
                                </p>

                                <div className="flex items-center justify-between border-t border-slate-100 pt-3">
                                    <div className="flex items-center gap-1.5 text-slate-700">
                                        <FiBox size={15} className="text-indigo-600" />
                                        <span className="text-xs font-bold">
                                            {productCount} {productCount === 1 ? "Product" : "Products"}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1">
                                        <button
                                            type="button"
                                            onClick={() => setEditingCategory(cat)}
                                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                                            title="Edit Category"
                                        >
                                            <FiEdit2 size={13} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setCategoryToDelete(cat)}
                                            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-rose-50 hover:text-rose-600"
                                            title="Delete Category"
                                        >
                                            <FiTrash2 size={13} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Category Modal */}
            {isAddOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
                        onClick={() => setIsAddOpen(false)}
                    />
                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setIsAddOpen(false)}
                            className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                            <FiX size={18} />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <FiLayers size={20} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900">Add New Category</h3>
                                <p className="text-xs text-slate-400">Create a department for products</p>
                            </div>
                        </div>

                        <form onSubmit={handleAddCategory} className="mt-5 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    placeholder="e.g. Footwear & Shoes"
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Cover Image URL
                                </label>
                                <input
                                    type="url"
                                    value={newImage}
                                    onChange={(e) => setNewImage(e.target.value)}
                                    placeholder="https://..."
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={newDesc}
                                    onChange={(e) => setNewDesc(e.target.value)}
                                    placeholder="Short description of this product line..."
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAddOpen(false)}
                                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
                                >
                                    Save Category
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Category Modal */}
            {editingCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
                        onClick={() => setEditingCategory(null)}
                    />
                    <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setEditingCategory(null)}
                            className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                            <FiX size={18} />
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <FiEdit2 size={18} />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900">Edit Category</h3>
                                <p className="text-xs text-slate-400">Update category details</p>
                            </div>
                        </div>

                        <form onSubmit={handleSaveEdit} className="mt-5 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Display Name
                                </label>
                                <input
                                    type="text"
                                    value={editingCategory.displayName || editingCategory.name || ""}
                                    onChange={(e) =>
                                        setEditingCategory({
                                            ...editingCategory,
                                            displayName: e.target.value
                                        })
                                    }
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    value={editingCategory.image || ""}
                                    onChange={(e) =>
                                        setEditingCategory({
                                            ...editingCategory,
                                            image: e.target.value
                                        })
                                    }
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Description
                                </label>
                                <textarea
                                    rows={3}
                                    value={editingCategory.description || ""}
                                    onChange={(e) =>
                                        setEditingCategory({
                                            ...editingCategory,
                                            description: e.target.value
                                        })
                                    }
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 uppercase">
                                    Status
                                </label>
                                <select
                                    value={editingCategory.status || "Active"}
                                    onChange={(e) =>
                                        setEditingCategory({
                                            ...editingCategory,
                                            status: e.target.value
                                        })
                                    }
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setEditingCategory(null)}
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
                isOpen={!!categoryToDelete}
                onClose={() => setCategoryToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Category"
                message="Are you sure you want to delete this category? Existing products in this category will not be removed, but will be shown as unassigned."
                itemName={categoryToDelete?.displayName || categoryToDelete?.name}
            />
        </div>
    );
};

export default Categories;
