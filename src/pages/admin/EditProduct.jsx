import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigate, useSearchParams, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ProductContext } from "../../context/ProductContext";
import { toast } from "react-toastify";
import {
    FiArrowLeft,
    FiSave,
    FiImage,
    FiDollarSign,
    FiBox,
    FiTag,
    FiAlertCircle
} from "react-icons/fi";

const EditProduct = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const params = useParams();
    const productId = params.id || searchParams.get("id");

    const { users: products = [], setUsers } = useContext(ProductContext) || {};

    const existingProduct = useMemo(() => {
        if (!productId) return null;
        return products.find((p) => String(p.id) === String(productId)) || null;
    }, [products, productId]);

    const categories = useMemo(() => {
        const set = new Set(products.map((p) => p.category).filter(Boolean));
        return Array.from(set);
    }, [products]);

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors, isSubmitting }
    } = useForm();

    const watchTitle = watch("title");
    const watchPrice = watch("price");
    const watchImage = watch("image");
    const watchCategory = watch("category");
    const watchStock = watch("stock");

    // Populate existing product values
    useEffect(() => {
        if (existingProduct) {
            reset({
                title: existingProduct.title || "",
                price: existingProduct.price || "",
                category: existingProduct.category || categories[0] || "men's clothing",
                stock: existingProduct.stock !== undefined ? existingProduct.stock : 25,
                image: existingProduct.image || "",
                description: existingProduct.description || "",
                ratingRate: existingProduct.rating?.rate || 4.5,
                ratingCount: existingProduct.rating?.count || 10
            });
        }
    }, [existingProduct, reset, categories]);

    const onSubmit = (data) => {
        if (!existingProduct) return;
        try {
            const updatedProduct = {
                ...existingProduct,
                title: data.title.trim(),
                price: parseFloat(data.price),
                category: data.category,
                stock: parseInt(data.stock, 10) || 0,
                image: data.image.trim(),
                description: data.description.trim(),
                rating: {
                    rate: parseFloat(data.ratingRate) || existingProduct.rating?.rate || 4.5,
                    count: parseInt(data.ratingCount, 10) || existingProduct.rating?.count || 1
                }
            };

            setUsers((prev) =>
                prev.map((p) => (String(p.id) === String(existingProduct.id) ? updatedProduct : p))
            );

            toast.success(`"${updatedProduct.title}" updated successfully!`);
            navigate("/admin/products");
        } catch {
            toast.error("Failed to update product.");
        }
    };

    if (!existingProduct) {
        return (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
                    <FiAlertCircle size={28} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-slate-900">Product Not Found</h3>
                <p className="mt-1 text-xs text-slate-500 max-w-sm mx-auto">
                    The requested product ID #{productId || "unknown"} does not exist or has been removed from the catalog.
                </p>
                <Link
                    to="/admin/products"
                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-700"
                >
                    <FiArrowLeft size={16} />
                    <span>Return to Catalog</span>
                </Link>
            </div>
        );
    }

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
                            Edit Product #{existingProduct.id}
                        </h2>
                        <p className="text-xs text-slate-500">
                            Update pricing, stock availability, category, and details.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Edit Form */}
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
                            <input
                                type="text"
                                {...register("title", {
                                    required: "Product name is required",
                                    minLength: { value: 3, message: "Minimum 3 characters" }
                                })}
                                className={`mt-2 w-full rounded-xl border bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:bg-white focus:ring-4 ${
                                    errors.title
                                        ? "border-rose-400 focus:border-rose-500 focus:ring-rose-100"
                                        : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                                }`}
                            />
                            {errors.title && (
                                <p className="mt-1 text-xs text-rose-500 font-medium">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Price & Stock */}
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
                                        {...register("price", {
                                            required: "Price is required",
                                            min: { value: 0.1, message: "Must be greater than 0" }
                                        })}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
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
                                    Inventory Stock <span className="text-rose-500">*</span>
                                </label>
                                <div className="mt-2 relative">
                                    <FiBox className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="number"
                                        {...register("stock", {
                                            required: "Stock is required",
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
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                Category <span className="text-rose-500">*</span>
                            </label>
                            <select
                                {...register("category")}
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 capitalize"
                            >
                                {categories.map((c) => (
                                    <option key={c} value={c} className="capitalize">
                                        {c}
                                    </option>
                                ))}
                            </select>
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
                                    {...register("image", {
                                        required: "Image URL is required"
                                    })}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
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
                            <textarea
                                rows={5}
                                {...register("description", {
                                    required: "Description is required"
                                })}
                                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                            />
                            {errors.description && (
                                <p className="mt-1 text-xs text-rose-500 font-medium">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
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
                                <FiSave size={17} />
                                <span>{isSubmitting ? "Saving..." : "Save Changes"}</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right: Live Preview */}
                <div className="space-y-4">
                    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Catalog Card Preview
                        </h4>

                        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
                            <div className="relative aspect-square overflow-hidden bg-slate-50 p-6">
                                <img
                                    src={watchImage || existingProduct.image}
                                    alt="Preview"
                                    onError={(e) => {
                                        e.currentTarget.src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500";
                                    }}
                                    className="h-full w-full object-contain"
                                />
                                <span className="absolute top-3 left-3 rounded-full bg-white/90 backdrop-blur-xs px-3 py-1 text-[11px] font-bold capitalize text-slate-700 shadow-xs">
                                    {watchCategory || existingProduct.category}
                                </span>
                            </div>

                            <div className="p-4 space-y-3">
                                <h5 className="font-bold text-slate-900 text-sm line-clamp-2">
                                    {watchTitle || existingProduct.title}
                                </h5>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-[10px] text-slate-400">Price</p>
                                        <p className="text-lg font-black text-slate-900">
                                            ${watchPrice ? Number(watchPrice).toFixed(2) : Number(existingProduct.price).toFixed(2)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] text-slate-400">Stock</p>
                                        <p className="text-xs font-bold text-slate-700">
                                            {watchStock !== undefined ? watchStock : existingProduct.stock || 25} units
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 rounded-xl bg-indigo-50/70 border border-indigo-100 p-3 text-xs text-indigo-900">
                            <p className="font-semibold">Instant Storefront Synchronization</p>
                            <p className="mt-0.5 text-[11px] text-indigo-700">
                                Any price or name changes saved here will immediately appear in the customer shop.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProduct;
