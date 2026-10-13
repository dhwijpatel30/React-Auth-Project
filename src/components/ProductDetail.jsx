import React, { useContext, useState, useMemo } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { toast } from "react-toastify";
import {
    FiArrowLeft,
    FiStar,
    FiShoppingBag,
    FiCheck,
    FiTruck,
    FiShield,
    FiRefreshCw,
    FiShare2,
    FiHeart,
    FiBox
} from "react-icons/fi";

const ProductDetails = () => {
    const { users = [], addToCart } = useContext(ProductContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const [activeTab, setActiveTab] = useState("description");

    const product = useMemo(() => {
        return users.find((user) => user.id.toString() === id?.toString());
    }, [users, id]);

    // Related products (same category)
    const relatedProducts = useMemo(() => {
        if (!product) return [];
        return users
            .filter((p) => p.category === product.category && p.id !== product.id)
            .slice(0, 4);
    }, [users, product]);

    const handleAddToCart = () => {
        if (!product) return;
        for (let i = 0; i < qty; i++) {
            addToCart(product);
        }
        setAdded(true);
        toast.success(`Added ${qty} × "${product.title}" to cart!`);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleBuyNow = () => {
        if (!product) return;
        for (let i = 0; i < qty; i++) {
            addToCart(product);
        }
        navigate("/cart");
    };

    if (!product) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
                <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xs max-w-md">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                        📦
                    </div>
                    <h1 className="mt-4 text-2xl font-black text-slate-900">
                        Product Not Found
                    </h1>
                    <p className="mt-2 text-xs text-slate-500">
                        The item you're looking for might have been retired or does not exist in our catalog.
                    </p>
                    <button
                        onClick={() => navigate("/products")}
                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
                    >
                        <FiArrowLeft size={15} />
                        <span>Return to Catalog</span>
                    </button>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50/60 pb-20">
            {/* Breadcrumb Header */}
            <section className="border-b border-slate-200/80 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-indigo-600 transition"
                        >
                            <FiArrowLeft size={15} />
                            <span>Back</span>
                        </button>

                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Link to="/home" className="hover:text-slate-700">Home</Link>
                            <span>/</span>
                            <Link to="/products" className="hover:text-slate-700">Products</Link>
                            <span>/</span>
                            <span className="font-semibold text-slate-800 capitalize truncate max-w-[150px]">
                                {product.category}
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Details Main Grid */}
            <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xs lg:grid-cols-12 lg:p-10">
                    {/* Left: Product Image Stage */}
                    <div className="lg:col-span-6 flex flex-col items-center justify-center">
                        <div className="group relative aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-slate-50/90 p-8 flex items-center justify-center border border-slate-100">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="max-h-[380px] w-full object-contain transition duration-500 group-hover:scale-105"
                            />
                            <span className="absolute top-4 left-4 rounded-full bg-white/95 backdrop-blur-xs px-3 py-1 text-[11px] font-bold capitalize text-slate-700 shadow-xs border border-slate-100">
                                {product.category}
                            </span>
                        </div>
                    </div>

                    {/* Right: Purchasing & Information Details */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                        <div>
                            {/* Stock & Rating Header */}
                            <div className="flex items-center justify-between gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-200">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    In Stock • Ready to Ship
                                </span>

                                {product.rating && (
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                                        <div className="flex items-center text-amber-400">
                                            <FiStar size={14} className="fill-amber-400" />
                                            <span className="ml-1 font-bold text-slate-800">{product.rating.rate}</span>
                                        </div>
                                        <span>({product.rating.count} reviews)</span>
                                    </div>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="mt-4 text-2xl sm:text-3xl font-black leading-tight text-slate-900">
                                {product.title}
                            </h1>

                            {/* Price */}
                            <div className="mt-5 flex items-baseline gap-3">
                                <span className="text-3xl sm:text-4xl font-black text-slate-900">
                                    ${Number(product.price).toFixed(2)}
                                </span>
                                <span className="text-sm font-medium text-slate-400 line-through">
                                    ${(Number(product.price) * 1.25).toFixed(2)}
                                </span>
                                <span className="rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                                    Save 20%
                                </span>
                            </div>

                            {/* Short description */}
                            <p className="mt-5 text-xs sm:text-sm leading-relaxed text-slate-600">
                                {product.description}
                            </p>
                        </div>

                        {/* Quantity & CTAs */}
                        <div className="space-y-4 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-slate-700 uppercase">Quantity</span>
                                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50">
                                    <button
                                        type="button"
                                        onClick={() => setQty(Math.max(1, qty - 1))}
                                        className="flex h-10 w-10 items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-200 transition rounded-l-xl"
                                    >
                                        −
                                    </button>
                                    <span className="flex h-10 w-12 items-center justify-center text-xs font-black text-slate-900 border-x border-slate-200">
                                        {qty}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setQty(qty + 1)}
                                        className="flex h-10 w-10 items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-200 transition rounded-r-xl"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleAddToCart}
                                    className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-3.5 text-xs sm:text-sm font-bold transition duration-200 active:scale-95 ${
                                        added
                                            ? "bg-emerald-600 text-white"
                                            : "bg-slate-900 text-white hover:bg-indigo-600 shadow-md shadow-slate-900/10"
                                    }`}
                                >
                                    {added ? (
                                        <>
                                            <FiCheck size={17} />
                                            <span>Added to Cart!</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiShoppingBag size={17} />
                                            <span>Add to Cart</span>
                                        </>
                                    )}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleBuyNow}
                                    className="flex-1 rounded-xl bg-indigo-600 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-600/20 transition duration-200 hover:bg-indigo-700 active:scale-95"
                                >
                                    Buy Now
                                </button>
                            </div>

                            {/* Trust badges */}
                            <div className="grid grid-cols-3 gap-3 pt-4 text-center text-slate-600 border-t border-slate-100">
                                <div className="flex flex-col items-center">
                                    <FiTruck className="text-indigo-600 mb-1" size={18} />
                                    <span className="text-[11px] font-bold text-slate-800">Free Delivery</span>
                                    <span className="text-[10px] text-slate-400">On orders over $50</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <FiRefreshCw className="text-indigo-600 mb-1" size={18} />
                                    <span className="text-[11px] font-bold text-slate-800">30-Day Returns</span>
                                    <span className="text-[10px] text-slate-400">Hassle-free guarantee</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <FiShield className="text-indigo-600 mb-1" size={18} />
                                    <span className="text-[11px] font-bold text-slate-800">Secure Payment</span>
                                    <span className="text-[10px] text-slate-400">256-bit encrypted</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">
                                Recommendations
                            </span>
                            <h2 className="mt-1 text-2xl font-black text-slate-900 tracking-tight">
                                Related Products in {product.category}
                            </h2>
                        </div>
                        <Link
                            to="/products"
                            state={{ category: product.category }}
                            className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                        >
                            View more →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {relatedProducts.map((item) => (
                            <div
                                key={item.id}
                                onClick={() => {
                                    navigate(`/product/${item.id}`);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                }}
                                className="group cursor-pointer flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-4 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="relative aspect-square overflow-hidden rounded-xl bg-slate-50 p-4 flex items-center justify-center">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="mt-3 flex-1 flex flex-col justify-between">
                                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2 group-hover:text-indigo-600 transition">
                                        {item.title}
                                    </h4>
                                    <p className="mt-2 text-base font-black text-slate-900">
                                        ${Number(item.price).toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
};

export default ProductDetails;