import React, { useContext, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../../context/ProductContext";
import { toast } from "react-toastify";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import Pagination from "../../components/admin/Pagination";
import {
    FiPlus,
    FiSearch,
    FiFilter,
    FiGrid,
    FiList,
    FiEdit2,
    FiTrash2,
    FiEye,
    FiBox,
    FiStar,
    FiX
} from "react-icons/fi";

const Products = () => {
    const navigate = useNavigate();
    const { users: products = [], deleteUser } = useContext(ProductContext) || {};

    const [viewMode, setViewMode] = useState("table"); // 'table' | 'grid'
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedStock, setSelectedStock] = useState("all");
    const [sortBy, setSortBy] = useState("default");

    // Modal states
    const [productToDelete, setProductToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [viewingProduct, setViewingProduct] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    // Categories list
    const categories = useMemo(() => {
        const set = new Set(products.map((p) => p.category).filter(Boolean));
        return Array.from(set);
    }, [products]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        return products
            .filter((p) => {
                const matchSearch =
                    (p.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                    (p.description || "").toLowerCase().includes(searchQuery.toLowerCase());

                const matchCategory =
                    selectedCategory === "all" || p.category === selectedCategory;

                const stockCount = p.stock !== undefined ? p.stock : 25;
                let matchStock = true;
                if (selectedStock === "in-stock") matchStock = stockCount > 5;
                if (selectedStock === "low-stock") matchStock = stockCount > 0 && stockCount <= 5;
                if (selectedStock === "out-of-stock") matchStock = stockCount === 0;

                return matchSearch && matchCategory && matchStock;
            })
            .sort((a, b) => {
                if (sortBy === "price-low") return a.price - b.price;
                if (sortBy === "price-high") return b.price - a.price;
                if (sortBy === "name-asc") return (a.title || "").localeCompare(b.title || "");
                if (sortBy === "name-desc") return (b.title || "").localeCompare(a.title || "");
                return 0;
            });
    }, [products, searchQuery, selectedCategory, selectedStock, sortBy]);

    // Paginated slice
    const paginatedProducts = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredProducts.slice(start, start + itemsPerPage);
    }, [filteredProducts, currentPage]);

    // Handle delete confirmation
    const handleConfirmDelete = () => {
        if (!productToDelete) return;
        setIsDeleting(true);
        try {
            deleteUser(productToDelete.id);
            toast.success(`"${productToDelete.title}" was deleted.`);
            setProductToDelete(null);
        } catch {
            toast.error("Failed to delete product.");
        } finally {
            setIsDeleting(false);
        }
    };

    const getStockStatus = (p) => {
        const stock = p.stock !== undefined ? p.stock : 25;
        if (stock === 0) return "Out of Stock";
        if (stock <= 5) return "Low Stock";
        return "In Stock";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                        Products Catalog
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Manage your store's inventory, stock levels, pricing, and catalog details.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-xs">
                        <button
                            type="button"
                            onClick={() => setViewMode("table")}
                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                                viewMode === "table"
                                    ? "bg-slate-900 text-white shadow-xs"
                                    : "text-slate-500 hover:text-slate-900"
                            }`}
                            title="Table view"
                        >
                            <FiList size={16} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode("grid")}
                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                                viewMode === "grid"
                                    ? "bg-slate-900 text-white shadow-xs"
                                    : "text-slate-500 hover:text-slate-900"
                            }`}
                            title="Grid view"
                        >
                            <FiGrid size={16} />
                        </button>
                    </div>

                    <Link
                        to="/admin/add-product"
                        className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95"
                    >
                        <FiPlus size={16} />
                        <span>Add Product</span>
                    </Link>
                </div>
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
                {/* Search */}
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search products by title, category, or keyword..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-2.5">
                    {/* Category Filter */}
                    <div className="relative">
                        <select
                            value={selectedCategory}
                            onChange={(e) => {
                                setSelectedCategory(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-indigo-500"
                        >
                            <option value="all">All Categories</option>
                            {categories.map((c) => (
                                <option key={c} value={c} className="capitalize">
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Stock Status Filter */}
                    <div className="relative">
                        <select
                            value={selectedStock}
                            onChange={(e) => {
                                setSelectedStock(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-indigo-500"
                        >
                            <option value="all">All Stock Statuses</option>
                            <option value="in-stock">In Stock (&gt;5)</option>
                            <option value="low-stock">Low Stock (1-5)</option>
                            <option value="out-of-stock">Out of Stock (0)</option>
                        </select>
                    </div>

                    {/* Sort Filter */}
                    <div className="relative">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none transition focus:border-indigo-500"
                        >
                            <option value="default">Default Sorting</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name-asc">Name: A to Z</option>
                            <option value="name-desc">Name: Z to A</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Content: Table or Grid */}
            {filteredProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                        <FiBox size={28} />
                    </div>
                    <h3 className="mt-4 text-base font-bold text-slate-800">No products found</h3>
                    <p className="mt-1 text-xs text-slate-400">
                        Try adjusting your search query or filters to find what you're looking for.
                    </p>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory("all");
                            setSelectedStock("all");
                            setSortBy("default");
                        }}
                        className="mt-4 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
                    >
                        Clear Filters
                    </button>
                </div>
            ) : viewMode === "table" ? (
                /* Table View */
                <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="border-b border-slate-100 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Product</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Price</th>
                                    <th className="px-6 py-4">Stock</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {paginatedProducts.map((product) => {
                                    const stockStatus = getStockStatus(product);
                                    const stockCount = product.stock !== undefined ? product.stock : 25;
                                    return (
                                        <tr key={product.id} className="hover:bg-slate-50/70 transition">
                                            {/* Product info */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-white p-1">
                                                        <img
                                                            src={product.image}
                                                            alt={product.title}
                                                            className="h-full w-full object-contain"
                                                        />
                                                    </div>
                                                    <div className="max-w-xs">
                                                        <p className="font-bold text-slate-900 truncate" title={product.title}>
                                                            {product.title}
                                                        </p>
                                                        <p className="text-[11px] text-slate-400">
                                                            ID: #{product.id}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Category */}
                                            <td className="px-6 py-4">
                                                <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-700">
                                                    {product.category || "Uncategorized"}
                                                </span>
                                            </td>

                                            {/* Price */}
                                            <td className="px-6 py-4 font-bold text-slate-900">
                                                ${Number(product.price).toFixed(2)}
                                            </td>

                                            {/* Stock */}
                                            <td className="px-6 py-4">
                                                <span className="font-semibold text-slate-700">
                                                    {stockCount} units
                                                </span>
                                            </td>

                                            {/* Status Badge */}
                                            <td className="px-6 py-4">
                                                <StatusBadge status={stockStatus} type="stock" />
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => setViewingProduct(product)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                                                        title="Quick View"
                                                    >
                                                        <FiEye size={15} />
                                                    </button>

                                                    <Link
                                                        to={`/admin/edit-product?id=${product.id}`}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                                                        title="Edit Product"
                                                    >
                                                        <FiEdit2 size={15} />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() => setProductToDelete(product)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200"
                                                        title="Delete Product"
                                                    >
                                                        <FiTrash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        totalItems={filteredProducts.length}
                        itemsPerPage={itemsPerPage}
                        onPageChange={setCurrentPage}
                    />
                </div>
            ) : (
                /* Grid View */
                <div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {paginatedProducts.map((product) => {
                            const stockStatus = getStockStatus(product);
                            const stockCount = product.stock !== undefined ? product.stock : 25;
                            return (
                                <div
                                    key={product.id}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:shadow-md hover:border-slate-300"
                                >
                                    <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 p-4">
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute top-3 left-3">
                                            <StatusBadge status={stockStatus} type="stock" />
                                        </div>
                                    </div>

                                    <div className="mt-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                {product.category}
                                            </span>
                                            <h4 className="mt-1 font-bold text-slate-800 text-sm line-clamp-2" title={product.title}>
                                                {product.title}
                                            </h4>
                                        </div>

                                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                                            <div>
                                                <span className="text-[10px] text-slate-400">Price</span>
                                                <p className="font-black text-slate-900 text-base">
                                                    ${Number(product.price).toFixed(2)}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setViewingProduct(product)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                                                >
                                                    <FiEye size={14} />
                                                </button>
                                                <Link
                                                    to={`/admin/edit-product?id=${product.id}`}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                                                >
                                                    <FiEdit2 size={14} />
                                                </Link>
                                                <button
                                                    type="button"
                                                    onClick={() => setProductToDelete(product)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
                                                >
                                                    <FiTrash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalItems={filteredProducts.length}
                            itemsPerPage={itemsPerPage}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
            )}

            {/* Quick View Product Modal */}
            {viewingProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
                        onClick={() => setViewingProduct(null)}
                    />
                    <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 shadow-2xl">
                        <button
                            type="button"
                            onClick={() => setViewingProduct(null)}
                            className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                            <FiX size={20} />
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="aspect-square rounded-2xl bg-slate-50 p-6 flex items-center justify-center border border-slate-100">
                                <img
                                    src={viewingProduct.image}
                                    alt={viewingProduct.title}
                                    className="max-h-64 object-contain"
                                />
                            </div>

                            <div className="flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="rounded-lg bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-700 capitalize">
                                            {viewingProduct.category}
                                        </span>
                                        <StatusBadge
                                            status={getStockStatus(viewingProduct)}
                                            type="stock"
                                        />
                                    </div>

                                    <h3 className="mt-3 text-lg font-bold text-slate-900 leading-snug">
                                        {viewingProduct.title}
                                    </h3>

                                    <div className="mt-2 flex items-center gap-2 text-amber-500 text-xs">
                                        <div className="flex items-center">
                                            <FiStar className="fill-amber-400 stroke-amber-400" size={14} />
                                            <span className="ml-1 font-bold text-slate-800">
                                                {viewingProduct.rating?.rate || "4.5"}
                                            </span>
                                        </div>
                                        <span className="text-slate-400">
                                            ({viewingProduct.rating?.count || 120} reviews)
                                        </span>
                                    </div>

                                    <p className="mt-4 text-2xl font-black text-slate-900">
                                        ${Number(viewingProduct.price).toFixed(2)}
                                    </p>

                                    <p className="mt-3 text-xs leading-relaxed text-slate-600 max-h-36 overflow-y-auto">
                                        {viewingProduct.description || "No description provided."}
                                    </p>
                                </div>

                                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                                    <Link
                                        to={`/admin/edit-product?id=${viewingProduct.id}`}
                                        className="flex-1 rounded-xl bg-indigo-600 py-2.5 text-center text-xs font-bold text-white transition hover:bg-indigo-700"
                                    >
                                        Edit Details
                                    </Link>
                                    <button
                                        type="button"
                                        onClick={() => setViewingProduct(null)}
                                        className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            <ConfirmDeleteModal
                isOpen={!!productToDelete}
                onClose={() => setProductToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Product"
                message="Are you sure you want to delete this product from the inventory? It will immediately be removed from both the admin dashboard and customer store."
                itemName={productToDelete?.title}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default Products;
