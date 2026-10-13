import React, { useContext, useState, useMemo, useEffect } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FiSearch,
    FiGrid,
    FiList,
    FiStar,
    FiShoppingBag,
    FiEdit2,
    FiTrash2,
    FiBox,
    FiFilter,
    FiCheck,
    FiX
} from "react-icons/fi";

const ProductCard = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        filteredProducts = [],
        setEditUser,
        deleteUser,
        addToCart,
        setToggle,
        search,
        setSearch
    } = useContext(ProductContext);

    // Local filter states
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("default");
    const [viewMode, setViewMode] = useState("grid"); // 'grid' | 'list'
    const [addedId, setAddedId] = useState(null);

    // Read initial category if passed in navigation state
    useEffect(() => {
        if (location.state?.category) {
            setSelectedCategory(location.state.category);
        }
    }, [location.state]);

    // Unique categories from current items
    const categories = useMemo(() => {
        const set = new Set(filteredProducts.map((p) => p.category).filter(Boolean));
        return ["all", ...Array.from(set)];
    }, [filteredProducts]);

    // Filter and sort items
    const processedProducts = useMemo(() => {
        return filteredProducts
            .filter((p) => {
                if (selectedCategory === "all") return true;
                return (p.category || "").toLowerCase() === selectedCategory.toLowerCase();
            })
            .sort((a, b) => {
                if (sortBy === "price-low") return a.price - b.price;
                if (sortBy === "price-high") return b.price - a.price;
                if (sortBy === "rating") return (b.rating?.rate || 0) - (a.rating?.rate || 0);
                if (sortBy === "name-asc") return (a.title || "").localeCompare(b.title || "");
                return 0;
            });
    }, [filteredProducts, selectedCategory, sortBy]);

    const handleAddToCart = (product, e) => {
        e.stopPropagation();
        addToCart(product);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1500);
    };

    return (
        <main className="min-h-screen bg-slate-50/60 pb-20">
            {/* Catalog Header Banner */}
            <section className="border-b border-slate-200/80 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-indigo-600 animate-pulse" />
                                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-indigo-600">
                                    Catalog Collection
                                </p>
                            </div>

                            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                                Explore Our Products
                            </h1>

                            <p className="mt-1 max-w-2xl text-xs sm:text-sm text-slate-500">
                                Discover high-grade fashion, technology devices, and fine jewelry curated for your everyday lifestyle.
                            </p>
                        </div>

                        {/* Total Count Badge */}
                        <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3.5 shadow-xs">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                <FiBox size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Available Items
                                </p>
                                <p className="text-xl font-black text-slate-900">
                                    {processedProducts.length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Filter, Search & View Toolbar */}
            <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs">
                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-xl px-3.5 py-2 text-xs font-bold capitalize transition ${
                                    selectedCategory === cat
                                        ? "bg-indigo-600 text-white shadow-xs"
                                        : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`}
                            >
                                {cat === "all" ? "All Categories" : cat}
                            </button>
                        ))}
                    </div>

                    {/* Sorting & Layout View Toggle */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 border-t border-slate-100 pt-3 lg:border-t-0 lg:pt-0">
                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2">
                            <span className="hidden sm:inline text-xs font-bold text-slate-500">
                                Sort:
                            </span>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500 focus:bg-white"
                            >
                                <option value="default">Default Order</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                                <option value="rating">Highest Rated</option>
                                <option value="name-asc">Name: A to Z</option>
                            </select>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-0.5">
                            <button
                                type="button"
                                onClick={() => setViewMode("grid")}
                                className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                                    viewMode === "grid"
                                        ? "bg-white text-indigo-600 shadow-xs"
                                        : "text-slate-400 hover:text-slate-700"
                                }`}
                                title="Grid View"
                            >
                                <FiGrid size={15} />
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode("list")}
                                className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                                    viewMode === "list"
                                        ? "bg-white text-indigo-600 shadow-xs"
                                        : "text-slate-400 hover:text-slate-700"
                                }`}
                                title="List View"
                            >
                                <FiList size={15} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Active Search Indicator */}
                {search && (
                    <div className="mt-4 flex items-center justify-between rounded-xl bg-indigo-50/70 px-4 py-2.5 text-xs text-indigo-900">
                        <span>
                            Showing search results for: <strong className="font-bold">"{search}"</strong>
                        </span>
                        <button
                            type="button"
                            onClick={() => setSearch("")}
                            className="flex items-center gap-1 font-bold text-indigo-600 hover:text-indigo-800"
                        >
                            <FiX size={14} />
                            <span>Clear Search</span>
                        </button>
                    </div>
                )}
            </section>

            {/* Products Display */}
            <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                {processedProducts.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-20 text-center shadow-xs">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                            📦
                        </div>
                        <h2 className="mt-5 text-xl font-bold text-slate-800">
                            No products match your criteria
                        </h2>
                        <p className="mt-2 text-xs text-slate-500 max-w-sm mx-auto">
                            Try resetting your category or search query to explore the rest of our catalog.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCategory("all");
                                setSortBy("default");
                                if (setSearch) setSearch("");
                            }}
                            className="mt-6 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
                        >
                            Reset All Filters
                        </button>
                    </div>
                ) : viewMode === "grid" ? (
                    /* Grid Layout (Responsive 1 -> 2 -> 3 -> 4 cols) */
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {processedProducts.map((user) => (
                            <article
                                key={user.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300"
                            >
                                {/* Image */}
                                <div
                                    onClick={() => navigate(`/product/${user.id}`)}
                                    className="cursor-pointer relative aspect-square overflow-hidden bg-slate-50/80 p-6 flex items-center justify-center border-b border-slate-100"
                                >
                                    <img
                                        src={user.image}
                                        alt={user.title}
                                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                                    />
                                    <span className="absolute left-3.5 top-3.5 rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-[10px] font-bold capitalize text-slate-700 shadow-xs border border-slate-100">
                                        {user.category}
                                    </span>
                                </div>

                                {/* Details */}
                                <div className="flex flex-1 flex-col p-5 justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                In Stock
                                            </span>
                                            {user.rating && (
                                                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                                                    <FiStar size={12} className="fill-amber-400" />
                                                    <span>{user.rating.rate}</span>
                                                    <span className="text-slate-400 font-normal">({user.rating.count})</span>
                                                </div>
                                            )}
                                        </div>

                                        <h2
                                            title={user.title}
                                            onClick={() => navigate(`/product/${user.id}`)}
                                            className="cursor-pointer line-clamp-2 min-h-[44px] text-sm font-bold leading-5 text-slate-900 transition hover:text-indigo-600"
                                        >
                                            {user.title}
                                        </h2>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100">
                                        <div className="flex items-center justify-between mb-3">
                                            <div>
                                                <p className="text-[10px] text-slate-400 uppercase font-semibold">Price</p>
                                                <p className="text-xl font-black text-slate-900">
                                                    ${Number(user.price).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="space-y-2">
                                            <button
                                                type="button"
                                                onClick={(e) => handleAddToCart(user, e)}
                                                className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition duration-200 active:scale-95 ${
                                                    addedId === user.id
                                                        ? "bg-emerald-600 text-white"
                                                        : "bg-slate-900 text-white hover:bg-indigo-600 shadow-xs"
                                                }`}
                                            >
                                                {addedId === user.id ? (
                                                    <>
                                                        <FiCheck size={14} />
                                                        <span>Added to Cart!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiShoppingBag size={14} />
                                                        <span>Add to Cart</span>
                                                    </>
                                                )}
                                            </button>

                                            {/* Preserved existing Update and Delete triggers */}
                                            <div className="grid grid-cols-2 gap-2 pt-1">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setEditUser(user);
                                                        setToggle(true);
                                                    }}
                                                    className="flex items-center justify-center gap-1 rounded-xl border border-indigo-200 bg-indigo-50/60 px-3 py-1.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-600 hover:text-white"
                                                    title="Update product modal"
                                                >
                                                    <FiEdit2 size={12} />
                                                    <span>Update</span>
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => deleteUser(user.id)}
                                                    className="flex items-center justify-center gap-1 rounded-xl border border-rose-200 bg-rose-50/60 px-3 py-1.5 text-xs font-bold text-rose-600 transition hover:bg-rose-600 hover:text-white"
                                                    title="Delete product"
                                                >
                                                    <FiTrash2 size={12} />
                                                    <span>Delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    /* List View */
                    <div className="space-y-4">
                        {processedProducts.map((user) => (
                            <article
                                key={user.id}
                                className="group flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md hover:border-slate-300"
                            >
                                <div
                                    onClick={() => navigate(`/product/${user.id}`)}
                                    className="cursor-pointer flex items-center gap-5 w-full sm:w-auto"
                                >
                                    <div className="h-28 w-28 shrink-0 overflow-hidden rounded-xl bg-slate-50 p-2 border border-slate-100">
                                        <img
                                            src={user.image}
                                            alt={user.title}
                                            className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="max-w-md">
                                        <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold capitalize text-slate-700">
                                            {user.category}
                                        </span>
                                        <h3 className="mt-1.5 font-bold text-slate-900 text-sm sm:text-base group-hover:text-indigo-600 transition">
                                            {user.title}
                                        </h3>
                                        <p className="mt-1 text-xs text-slate-500 line-clamp-2">
                                            {user.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0">
                                    <div className="text-right">
                                        <p className="text-xs text-slate-400">Price</p>
                                        <p className="text-2xl font-black text-slate-900">
                                            ${Number(user.price).toFixed(2)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={(e) => handleAddToCart(user, e)}
                                            className="flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-600 transition"
                                        >
                                            <FiShoppingBag size={14} />
                                            <span>Add</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditUser(user);
                                                setToggle(true);
                                            }}
                                            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-indigo-600 hover:bg-slate-50"
                                            title="Update"
                                        >
                                            <FiEdit2 size={14} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => deleteUser(user.id)}
                                            className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50"
                                            title="Delete"
                                        >
                                            <FiTrash2 size={14} />
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default ProductCard;