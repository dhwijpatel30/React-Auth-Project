import React, { useContext, useRef, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import {
    FiArrowRight,
    FiShoppingBag,
    FiStar,
    FiShield,
    FiTruck,
    FiCreditCard,
    FiHeadphones,
    FiCheck,
    FiTrendingUp,
    FiClock,
    FiAward,
    FiHeart
} from "react-icons/fi";

const Home = () => {
    const { users, addToCart } = useContext(ProductContext);
    const navigate = useNavigate();
    const featuredRef = useRef(null);

    const [addedId, setAddedId] = useState(null);

    const scrollToFeatured = (e) => {
        e.preventDefault();
        featuredRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Safely get products list
    const products = useMemo(() => users || [], [users]);

    // Derived category counts
    const categoryCounts = useMemo(() => {
        const counts = {};
        products.forEach((p) => {
            const cat = (p.category || "").toLowerCase().trim();
            counts[cat] = (counts[cat] || 0) + 1;
        });
        return counts;
    }, [products]);

    // Categories list with custom styling and SVGs
    const categoriesList = [
        {
            name: "electronics",
            title: "Electronics & Tech",
            desc: "Smart devices, storage, curved monitors and gaming gear.",
            icon: (
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            bg: "bg-indigo-50",
            border: "hover:border-indigo-200"
        },
        {
            name: "jewelery",
            title: "Jewelry & Gems",
            desc: "Exquisite necklaces, dragon bracelets, and silver rings.",
            icon: (
                <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
            ),
            bg: "bg-amber-50",
            border: "hover:border-amber-200"
        },
        {
            name: "men's clothing",
            title: "Men's Apparel",
            desc: "Slim fit casual wear, cotton jackets and everyday comfort.",
            icon: (
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
            bg: "bg-blue-50",
            border: "hover:border-blue-200"
        },
        {
            name: "women's clothing",
            title: "Women's Fashion",
            desc: "Elegant jackets, chic raincoats and stylish essentials.",
            icon: (
                <svg className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
            ),
            bg: "bg-rose-50",
            border: "hover:border-rose-200"
        }
    ];

    // Slices for curated sections
    const featuredProducts = products.slice(0, 4);
    const trendingProducts = products.slice(4, 8);
    const heroShowcaseProduct = products[0] || null;

    const handleCategoryClick = (categoryName) => {
        navigate("/products", { state: { category: categoryName } });
    };

    const handleAddToCartWithFeedback = (product, e) => {
        if (e) e.stopPropagation();
        addToCart(product);
        setAddedId(product.id);
        setTimeout(() => setAddedId(null), 1500);
    };

    return (
        <div className="space-y-16 sm:space-y-24 pb-16">
            {/* 1. HERO SECTION */}
            <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-16 text-white shadow-2xl sm:px-12 sm:py-24 lg:px-16">
                    {/* Glowing ambient orbs */}
                    <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

                    <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
                        {/* Left Hero Pitch */}
                        <div className="lg:col-span-7 flex flex-col items-start text-left">
                            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-300 backdrop-blur-md">
                                <span className="flex h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
                                <span>2026 Spring Collection • Up to 40% Off</span>
                            </div>

                            <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-[1.1] text-white">
                                Modern Style &amp; <br />
                                <span className="bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
                                    Quality Products
                                </span>
                            </h1>

                            <p className="mt-6 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
                                Experience hassle-free ecommerce with curated apparel, high-performance tech, and exquisite accessories—shipped directly to your door with 100% money-back security.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-3.5">
                                <Link
                                    to="/products"
                                    className="group inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/50 hover:scale-105 active:scale-95"
                                >
                                    <span>Explore Collection</span>
                                    <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                </Link>

                                <button
                                    onClick={scrollToFeatured}
                                    className="rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-sm font-bold text-slate-200 backdrop-blur-md transition duration-200 hover:bg-slate-800 hover:border-slate-600 hover:text-white"
                                >
                                    Featured Picks
                                </button>
                            </div>

                            {/* Trust badges row */}
                            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-800/80 pt-8 text-slate-300">
                                <div>
                                    <p className="text-xl sm:text-2xl font-black text-white">100%</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Authentic Goods</p>
                                </div>
                                <div>
                                    <p className="text-xl sm:text-2xl font-black text-white">24/7</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Support Team</p>
                                </div>
                                <div>
                                    <p className="text-xl sm:text-2xl font-black text-white">30 Days</p>
                                    <p className="text-xs text-slate-400 mt-0.5">Free Returns</p>
                                </div>
                            </div>
                        </div>

                        {/* Right Showcase Card */}
                        {heroShowcaseProduct && (
                            <div className="lg:col-span-5 relative flex justify-center">
                                <div className="relative w-full max-w-sm rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-md">
                                    <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs">
                                        <span className="rounded-full bg-indigo-500/20 px-2.5 py-1 text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                                            Top Trending
                                        </span>
                                        <div className="flex items-center gap-1 text-amber-400 font-bold">
                                            <FiStar size={13} className="fill-amber-400" />
                                            <span>{heroShowcaseProduct.rating?.rate || "4.8"}</span>
                                        </div>
                                    </div>

                                    {/* Image */}
                                    <div
                                        onClick={() => navigate(`/product/${heroShowcaseProduct.id}`)}
                                        className="cursor-pointer group relative my-4 flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-white p-6 transition"
                                    >
                                        <img
                                            src={heroShowcaseProduct.image}
                                            alt={heroShowcaseProduct.title}
                                            className="h-full w-full object-contain transition duration-500 group-hover:scale-110"
                                        />
                                        <span className="absolute bottom-3 left-3 rounded-md bg-slate-900/80 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur-xs">
                                            Click to view
                                        </span>
                                    </div>

                                    {/* Title & Price */}
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            {heroShowcaseProduct.category}
                                        </span>
                                        <h3
                                            onClick={() => navigate(`/product/${heroShowcaseProduct.id}`)}
                                            className="mt-1 font-bold text-white text-sm line-clamp-1 cursor-pointer hover:text-indigo-400 transition"
                                        >
                                            {heroShowcaseProduct.title}
                                        </h3>

                                        <div className="mt-4 flex items-center justify-between">
                                            <div>
                                                <span className="text-[10px] text-slate-400">Price</span>
                                                <p className="text-2xl font-black text-indigo-400">
                                                    ${Number(heroShowcaseProduct.price).toFixed(2)}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={(e) => handleAddToCartWithFeedback(heroShowcaseProduct, e)}
                                                className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold transition duration-200 active:scale-95 ${
                                                    addedId === heroShowcaseProduct.id
                                                        ? "bg-emerald-600 text-white"
                                                        : "bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/30"
                                                }`}
                                            >
                                                {addedId === heroShowcaseProduct.id ? (
                                                    <>
                                                        <FiCheck size={15} />
                                                        <span>Added!</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <FiShoppingBag size={15} />
                                                        <span>Add to Cart</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 2. CATEGORY HIGHLIGHTS */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">
                            Departments
                        </span>
                        <h2 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                            Browse by Category
                        </h2>
                    </div>
                    <Link
                        to="/products"
                        className="group inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                    >
                        <span>View all departments</span>
                        <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {categoriesList.map((cat) => {
                        const count = categoryCounts[cat.name] || 0;
                        return (
                            <div
                                key={cat.name}
                                onClick={() => handleCategoryClick(cat.name)}
                                className={`group cursor-pointer overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${cat.border}`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 ${cat.bg} group-hover:scale-110`}>
                                        {cat.icon}
                                    </div>
                                    <span className="text-[11px] font-bold text-slate-400 group-hover:text-indigo-600 transition">
                                        {count} {count === 1 ? "Item" : "Items"} →
                                    </span>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 capitalize group-hover:text-indigo-600 transition">
                                    {cat.title}
                                </h3>
                                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 line-clamp-2">
                                    {cat.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* 3. CURATED / FEATURED PRODUCTS */}
            <section ref={featuredRef} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">
                            Curated Selection
                        </span>
                        <h2 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                            Featured Products
                        </h2>
                    </div>
                    <Link
                        to="/products"
                        className="group inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                    >
                        <span>See full catalog ({products.length})</span>
                        <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                {featuredProducts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {featuredProducts.map((product) => (
                            <article
                                key={product.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300"
                            >
                                {/* Image Container */}
                                <div
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="cursor-pointer relative aspect-square overflow-hidden bg-slate-50/80 p-6 flex items-center justify-center border-b border-slate-100"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                                    />
                                    <span className="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold capitalize text-slate-700 shadow-xs border border-slate-100 backdrop-blur-xs">
                                        {product.category}
                                    </span>
                                </div>

                                {/* Card Details */}
                                <div className="flex flex-1 flex-col p-5 justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                In Stock
                                            </span>
                                            {product.rating && (
                                                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                                                    <FiStar size={12} className="fill-amber-400" />
                                                    <span>{product.rating.rate}</span>
                                                    <span className="text-slate-400 font-normal">({product.rating.count})</span>
                                                </div>
                                            )}
                                        </div>

                                        <h3
                                            onClick={() => navigate(`/product/${product.id}`)}
                                            title={product.title}
                                            className="cursor-pointer line-clamp-2 min-h-[40px] text-xs sm:text-sm font-bold leading-5 text-slate-900 transition hover:text-indigo-600"
                                        >
                                            {product.title}
                                        </h3>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-lg font-black text-slate-900">
                                                ${Number(product.price).toFixed(2)}
                                            </p>
                                            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                                Best Seller
                                            </span>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(e) => handleAddToCartWithFeedback(product, e)}
                                            className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition duration-200 active:scale-95 ${
                                                addedId === product.id
                                                    ? "bg-emerald-600 text-white"
                                                    : "bg-slate-900 text-white hover:bg-indigo-600 shadow-xs"
                                            }`}
                                        >
                                            {addedId === product.id ? (
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
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-slate-500">
                        No products available in the collection.
                    </div>
                )}
            </section>

            {/* 4. VALUE PROPOSITION / WHY CHOOSE US */}
            <section className="bg-slate-900 py-16 text-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 max-w-xl mx-auto">
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-400">
                            Our Commitment
                        </span>
                        <h2 className="mt-2 text-3xl font-black text-white tracking-tight sm:text-4xl">
                            Why Shop With ShopSphere
                        </h2>
                        <p className="mt-2 text-xs sm:text-sm text-slate-400">
                            We engineered our ecommerce system from the ground up for frictionless buying, verified quality, and exceptional post-purchase support.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            {
                                icon: FiAward,
                                title: "Guaranteed Quality",
                                desc: "Every single item is thoroughly inspected and sourced from trusted brand suppliers.",
                                color: "text-indigo-400 bg-indigo-500/10"
                            },
                            {
                                icon: FiTruck,
                                title: "Lightning Delivery",
                                desc: "Express domestic fulfillment with live doorstep tracking and SMS dispatch alerts.",
                                color: "text-emerald-400 bg-emerald-500/10"
                            },
                            {
                                icon: FiShield,
                                title: "Encrypted Payments",
                                desc: "Bank-level 256-bit SSL encryption safeguards your checkout and personal identity.",
                                color: "text-blue-400 bg-blue-500/10"
                            },
                            {
                                icon: FiHeadphones,
                                title: "24/7 Priority Support",
                                desc: "Reach real humans anytime via live email or chat for instant resolution.",
                                color: "text-amber-400 bg-amber-500/10"
                            }
                        ].map((item, idx) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={idx}
                                    className="rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-md transition hover:-translate-y-1 hover:border-slate-700"
                                >
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color} mb-4`}>
                                        <Icon size={22} />
                                    </div>
                                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 5. PROMOTIONAL FLASH SALE BANNER */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-800 px-8 py-12 text-white shadow-xl sm:px-12 sm:py-16">
                    <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
                    <div className="absolute left-1/3 bottom-0 -ml-16 -mb-16 h-64 w-64 rounded-full bg-indigo-400/20 blur-2xl pointer-events-none" />

                    <div className="relative flex flex-col items-start lg:flex-row lg:items-center lg:justify-between gap-8">
                        <div>
                            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white mb-4">
                                <FiClock size={13} />
                                <span>Limited Time Flash Event</span>
                            </div>
                            <h2 className="text-3xl font-black sm:text-4xl tracking-tight">
                                Flash Sale: Up to 50% Off Selected Collections!
                            </h2>
                            <p className="mt-3 max-w-xl text-indigo-100 text-xs sm:text-sm leading-relaxed">
                                Don't miss this weekend's special markdowns on designer apparel, diamond accessories, and tech accessories.
                            </p>
                        </div>

                        <div className="shrink-0 flex items-center gap-3">
                            <Link
                                to="/products"
                                className="rounded-xl bg-white px-7 py-3.5 text-xs sm:text-sm font-bold text-indigo-700 shadow-md transition hover:bg-slate-50 hover:scale-105 active:scale-95"
                            >
                                Shop Deals Now
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. TRENDING / NEW ARRIVALS */}
            {trendingProducts.length > 0 && (
                <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">
                                Fresh Arrivals
                            </span>
                            <h2 className="mt-1 text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                                Trending This Week
                            </h2>
                        </div>
                        <Link
                            to="/products"
                            className="group inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                        >
                            <span>Browse all items</span>
                            <FiArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {trendingProducts.map((product) => (
                            <article
                                key={product.id}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-slate-300"
                            >
                                <div
                                    onClick={() => navigate(`/product/${product.id}`)}
                                    className="cursor-pointer relative aspect-square overflow-hidden bg-slate-50/80 p-6 flex items-center justify-center border-b border-slate-100"
                                >
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                                    />
                                    <span className="absolute left-3.5 top-3.5 rounded-full bg-indigo-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-xs">
                                        Hot Pick
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-5 justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                {product.category}
                                            </span>
                                            {product.rating && (
                                                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-500">
                                                    <FiStar size={12} className="fill-amber-400" />
                                                    <span>{product.rating.rate}</span>
                                                </div>
                                            )}
                                        </div>

                                        <h3
                                            onClick={() => navigate(`/product/${product.id}`)}
                                            title={product.title}
                                            className="cursor-pointer line-clamp-2 min-h-[40px] text-xs sm:text-sm font-bold leading-5 text-slate-900 transition hover:text-indigo-600"
                                        >
                                            {product.title}
                                        </h3>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-lg font-black text-slate-900">
                                                ${Number(product.price).toFixed(2)}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={(e) => handleAddToCartWithFeedback(product, e)}
                                            className={`flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition duration-200 active:scale-95 ${
                                                addedId === product.id
                                                    ? "bg-emerald-600 text-white"
                                                    : "bg-slate-900 text-white hover:bg-indigo-600 shadow-xs"
                                            }`}
                                        >
                                            {addedId === product.id ? (
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
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            {/* 7. CUSTOMER TESTIMONIALS / SOCIAL PROOF */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 max-w-xl mx-auto">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">
                        Customer Reviews
                    </span>
                    <h2 className="mt-2 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Loved by Over 50,000+ Shoppers
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[
                        {
                            name: "Sarah Jenkins",
                            role: "Verified Buyer",
                            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=60",
                            comment: "The backpack and cotton jacket arrived in less than 48 hours. Build quality is top-notch and exactly as shown in the photos!"
                        },
                        {
                            name: "Marcus Thorne",
                            role: "Verified Buyer",
                            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60",
                            comment: "Ordered the external hard drive and gaming monitor. Seamless checkout, zero delivery hassle, and customer support was incredibly polite."
                        },
                        {
                            name: "Elena Rostova",
                            role: "Verified Buyer",
                            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=60",
                            comment: "ShopSphere has become my go-to online store for gifts. The jewelry pieces are stunning and the packaging is truly premium."
                        }
                    ].map((item, idx) => (
                        <div key={idx} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs flex flex-col justify-between">
                            <div className="flex items-center gap-1 text-amber-400 mb-3">
                                {[...Array(5)].map((_, i) => (
                                    <FiStar key={i} size={14} className="fill-amber-400" />
                                ))}
                            </div>
                            <p className="text-xs text-slate-600 leading-relaxed italic">
                                "{item.comment}"
                            </p>
                            <div className="mt-6 flex items-center gap-3 pt-4 border-t border-slate-100">
                                <img
                                    src={item.avatar}
                                    alt={item.name}
                                    className="h-9 w-9 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                                    <p className="text-[10px] text-emerald-600 font-semibold">{item.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
