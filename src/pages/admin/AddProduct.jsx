import React, { useContext, useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProductContext } from "../../context/ProductContext";
import { toast } from "react-toastify";
import {
    FiArrowLeft,
    FiPlusCircle,
    FiImage,
    FiDollarSign,
    FiBox,
    FiTag,
    FiStar,
    FiFileText
} from "react-icons/fi";

const AddProduct = () => {
    const navigate = useNavigate();
    const { users: products = [], setUsers } = useContext(ProductContext) || {};

    const [customCategory, setCustomCategory] = useState(false);

    const categories = useMemo(() => {
        const set = new Set(products.map((p) => p.category).filter(Boolean));
        if (!set.has("men's clothing")) set.add("men's clothing");
        if (!set.has("women's clothing")) set.add("women's clothing");
        if (!set.has("electronics")) set.add("electronics");
        if (!set.has("jewelery")) set.add("jewelery");
        return Array.from(set);
    }, [products]);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting }
    } = useForm({
        defaultValues: {
            title: "",
            price: "",
            category: categories[0] || "electronics",
            newCategory: "",
            stock: 25,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
            description: "",
            ratingRate: 4.5,
            ratingCount: 10
        }
    });

    const watchTitle = watch("title");
    const watchPrice = watch("price");
    const watchImage = watch("image");
    const watchCategory = watch("category");
    const watchNewCategory = watch("newCategory");
    const watchStock = watch("stock");

    const activeCategory = customCategory ? (watchNewCategory || "Custom Category") : watchCategory;

    const onSubmit = (data) => {
        try {
            const finalCategory = customCategory ? data.newCategory.trim() : data.category;

            const newProduct = {
                id: Date.now(),
                title: data.title.trim(),
                price: parseFloat(data.price),
                category: finalCategory,
                stock: parseInt(data.stock, 10) || 0,
                image: data.image.trim(),
                description: data.description.trim(),
                rating: {
                    rate: parseFloat(data.ratingRate) || 4.5,
                    count: parseInt(data.ratingCount, 10) || 1
                }
            };

            setUsers((prev) => [newProduct, ...prev]);
            toast.success(`"${newProduct.title}" created successfully!`);
            navigate("/admin/products");
        } catch {
            toast.error("Failed to add product. Please check your inputs.");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <Link
                        to="/admin/products"
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                        <FiArrowLeft size={16} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-black tracking-tight text-slate-900">
                            Add New Product
                        </h2>
                        <p className="text-xs text-slate-500">
                            Create and publish a new item into the store catalog.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form Fields (2 columns) */}
                <div className="lg:col-span-2">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6 rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xs"
                    >
                        {/* Title */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                Product Name <span className="text-rose-500">*</span>
                            </label>
                            <div className="mt-2 relative">
                                <input
                                    type="text"
                                    placeholder="e.g. Vintage Leather Messenger Bag"
                                    {...register("title", {
                                        required: "Product name is required",
                                        minLength: { value: 3, message: "Minimum 3 characters" }
                                    })}
                                    className={`w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-4 ${
                                        errors.title
                                            ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                                            : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                                    }`}
                                />
                            </div>
                            {errors.title && (
                                <p className="mt-1 text-xs text-rose-500 font-medium">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Price & Stock Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Price ($) <span className="text-rose-500">*</span>
                                </label>
                                <div className="mt-2 relative">
                                    <FiDollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="number"
                                        step="0.01"
                                        placeholder="0.00"
                                        {...register("price", {
                                            required: "Price is required",
                                            min: { value: 0.1, message: "Price must be greater than 0" }
                                        })}
                                        className={`w-full rounded-xl border bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-4 ${
                                            errors.price
                                                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                                                : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                                        }`}
                                    />
                                </div>
                                {errors.price && (
                                    <p className="mt-1 text-xs text-rose-500 font-medium">
                                        {errors.price.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Initial Stock Quantity <span className="text-rose-500">*</span>
                                </label>
                                <div className="mt-2 relative">
                                    <FiBox className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="number"
                                        placeholder="25"
                                        {...register("stock", {
                                            required: "Stock quantity is required",
                                            min: { value: 0, message: "Cannot be negative" }
                                        })}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                    />
                                </div>
                                {errors.stock && (
                                    <p className="mt-1 text-xs text-rose-500 font-medium">
                                        {errors.stock.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Category <span className="text-rose-500">*</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setCustomCategory(!customCategory)}
                                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                                >
                                    {customCategory ? "Choose from existing" : "+ Enter new category"}
                                </button>
                            </div>

                            <div className="mt-2">
                                {customCategory ? (
                                    <input
                                        type="text"
                                        placeholder="Type custom category..."
                                        {...register("newCategory", {
                                            required: customCategory ? "Category name is required" : false
                                        })}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                    />
                                ) : (
                                    <select
                                        {...register("category")}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 capitalize"
                                    >
                                        {categories.map((c) => (
                                            <option key={c} value={c} className="capitalize">
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                Image URL <span className="text-rose-500">*</span>
                            </label>
                            <div className="mt-2 relative">
                                <FiImage className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="url"
                                    placeholder="https://..."
                                    {...register("image", {
                                        required: "Image URL is required",
                                        pattern: {
                                            value: /^https?:\/\/.+/i,
                                            message: "Please enter a valid HTTP(S) image URL"
                                        }
                                    })}
                                    className={`w-full rounded-xl border bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-4 ${
                                        errors.image
                                            ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                                            : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                                    }`}
                                />
                            </div>
                            {errors.image && (
                                <p className="mt-1 text-xs text-rose-500 font-medium">
                                    {errors.image.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                Product Description <span className="text-rose-500">*</span>
                            </label>
                            <div className="mt-2">
                                <textarea
                                    rows={4}
                                    placeholder="Write a clear, attractive description of this item..."
                                    {...register("description", {
                                        required: "Description is required",
                                        minLength: { value: 10, message: "At least 10 characters required" }
                                    })}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                                />
                            </div>
                            {errors.description && (
                                <p className="mt-1 text-xs text-rose-500 font-medium">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Rating initial settings */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-slate-100">
                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Initial Rating (1 - 5)
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    min="1"
                                    max="5"
                                    {...register("ratingRate")}
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-slate-600">
                                    Reviews Count
                                </label>
                                <input
                                    type="number"
                                    min="0"
                                    {...register("ratingCount")}
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                            <Link
                                to="/admin/products"
                                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-95 disabled:opacity-60"
                            >
                                <FiPlusCircle size={17} />
                                <span>{isSubmitting ? "Adding..." : "Add Product"}</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right: Live Preview Card */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Live Store Preview
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                            How this card appears to customers in the catalog.
                        </p>

                        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                            <div className="relative aspect-square overflow-hidden bg-slate-50 p-6">
                                <img
                                    src={watchImage || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"}
                                    alt="Preview"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";
                                    }}
                                    className="h-full w-full object-contain"
                                />
                                <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-xs px-3 py-1 text-[11px] font-bold capitalize text-slate-700 shadow-xs">
                                    {activeCategory || "Category"}
                                </span>
                            </div>

                            <div className="p-4 space-y-3">
                                <h5 className="font-bold text-slate-900 text-sm line-clamp-2">
                                    {watchTitle || "Product Title Preview"}
                                </h5>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] text-slate-400">Price</p>
                                        <p className="text-lg font-black text-slate-900">
                                            ${watchPrice ? Number(watchPrice).toFixed(2) : "0.00"}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400">Stock</p>
                                        <p className="text-xs font-bold text-slate-700">
                                            {watchStock || 0} units
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl bg-slate-50 p-3 text-xs text-slate-500 space-y-1">
                            <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                                <FiTag size={13} className="text-indigo-600" />
                                <span>Catalog Tip</span>
                            </div>
                            <p className="text-[11px] leading-relaxed">
                                Clear titles and high-quality square product photos boost customer conversion by over 30%.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
