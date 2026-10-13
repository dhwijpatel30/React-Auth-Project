import React from "react";
import { Link } from "react-router-dom";
import {
    FiAward,
    FiShield,
    FiTruck,
    FiUsers,
    FiHeart,
    FiArrowRight,
    FiCheckCircle,
    FiGlobe
} from "react-icons/fi";

const About = () => {
    const stats = [
        { number: "50,000+", label: "Delighted Shoppers" },
        { number: "1,200+", label: "Curated Items" },
        { number: "99.8%", label: "On-Time Dispatch" },
        { number: "24/7", label: "Dedicated Care" }
    ];

    const values = [
        {
            icon: FiAward,
            title: "Uncompromising Quality",
            description:
                "We partner exclusively with verified suppliers and artisans to ensure every item meets rigorous endurance and aesthetic standards."
        },
        {
            icon: FiShield,
            title: "Security & Trust",
            description:
                "From 256-bit encrypted payments to strict consumer privacy protocols, your safety is non-negotiable."
        },
        {
            icon: FiTruck,
            title: "Frictionless Fulfillment",
            description:
                "Orders are processed within hours in our domestic hubs, with real-time tracking from warehouse to your doorstep."
        },
        {
            icon: FiHeart,
            title: "Customer Obsession",
            description:
                "We measure our success purely through the happiness of our community. 30-day hassle-free returns on all products."
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50/60 pb-20">
            {/* HERO SECTION */}
            <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-6 py-16 text-white shadow-2xl sm:px-12 sm:py-24 text-center">
                    <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
                    <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

                    <div className="relative mx-auto max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-300 backdrop-blur-md">
                            About ShopSphere
                        </span>

                        <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight">
                            Elevating Modern Shopping <br />
                            <span className="bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 bg-clip-text text-transparent">
                                Through Quality &amp; Care
                            </span>
                        </h1>

                        <p className="mt-6 text-sm sm:text-base leading-relaxed text-slate-300 max-w-2xl mx-auto">
                            ShopSphere was built on a simple conviction: discovering exceptional fashion, electronics, and jewelry should be inspiring, intuitive, and completely transparent.
                        </p>

                        <div className="mt-8 flex flex-wrap justify-center gap-3.5">
                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 hover:scale-105 active:scale-95"
                            >
                                <span>Browse Our Catalog</span>
                                <FiArrowRight size={15} />
                            </Link>
                            <Link
                                to="/contact"
                                className="rounded-xl border border-slate-700 bg-slate-900/60 px-6 py-3.5 text-xs sm:text-sm font-bold text-slate-200 backdrop-blur-md transition hover:bg-slate-800 hover:border-slate-600 hover:text-white"
                            >
                                Connect With Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* KEY METRICS GRID */}
            <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    {stats.map((stat, idx) => (
                        <div
                            key={idx}
                            className="rounded-2xl border border-slate-200/90 bg-white p-6 text-center shadow-xs transition hover:shadow-md hover:border-slate-300"
                        >
                            <h3 className="text-3xl sm:text-4xl font-black text-indigo-600">
                                {stat.number}
                            </h3>
                            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* OUR STORY & MISSION */}
            <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                    {/* Left Narrative */}
                    <div>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">
                            Our Origin &amp; Vision
                        </span>
                        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                            Crafted for Discerning Shoppers Everywhere
                        </h2>
                        <p className="mt-4 text-xs sm:text-sm leading-relaxed text-slate-600">
                            Founded with a mission to eliminate clutter and low-grade disposable items from online shopping, ShopSphere curates each catalog entry with precision. We believe great design, genuine utility, and reasonable pricing shouldn't be mutually exclusive.
                        </p>
                        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-slate-600">
                            Whether it's an ergonomic laptop pack for the daily commute, a timeless silver bracelet, or cutting-edge SSD storage, our selections are tested for longevity and customer delight.
                        </p>

                        <div className="mt-6 space-y-3">
                            {[
                                "Rigorous quality inspections before any item goes live",
                                "Direct logistics relationships guaranteeing authentic pricing",
                                "Zero-hassle returns and instant refunds when needed",
                                "Continuous platform improvements driven by shopper feedback"
                            ].map((point, index) => (
                                <div key={index} className="flex items-center gap-2.5 text-xs font-semibold text-slate-800">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                                        <FiCheckCircle size={13} />
                                    </span>
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Visual Card */}
                    <div className="relative">
                        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
                                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-600 text-white font-black">
                                    S
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">The ShopSphere Guarantee</h4>
                                    <p className="text-[11px] text-slate-400">Published Brand Standards</p>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4 text-xs text-slate-600 leading-relaxed">
                                <p>
                                    "We believe that every customer interaction—from browsing our product pages to unwrapping a doorstep delivery—should feel effortless and reassuring."
                                </p>
                                <div className="rounded-xl bg-indigo-50/70 p-4 border border-indigo-100">
                                    <span className="font-bold text-indigo-900 block text-xs">Direct Support Hotline</span>
                                    <span className="text-[11px] text-indigo-700">support@shopsphere.com • Available 24 Hours</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CORE VALUES */}
            <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-12">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">
                        What Drives Us
                    </span>
                    <h2 className="mt-2 text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
                        Our Core Values
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {values.map((v, idx) => {
                        const Icon = v.icon;
                        return (
                            <div
                                key={idx}
                                className="rounded-2xl border border-slate-200/90 bg-white p-6 shadow-xs transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-indigo-100"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 mb-4">
                                    <Icon size={22} />
                                </div>
                                <h3 className="text-base font-bold text-slate-900">{v.title}</h3>
                                <p className="mt-2 text-xs leading-relaxed text-slate-500">{v.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CALL TO ACTION */}
            <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 lg:px-8">
                <div className="rounded-3xl bg-slate-900 px-6 py-16 text-center shadow-xl sm:px-12 sm:py-20 relative overflow-hidden text-white">
                    <div className="relative max-w-xl mx-auto flex flex-col items-center">
                        <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-400">
                            Join Our Community
                        </span>
                        <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl text-white">
                            Ready to Find Something Special?
                        </h2>
                        <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
                            Explore our curated catalog across fashion, jewelry, and modern technology.
                        </p>
                        <Link
                            to="/products"
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-xs sm:text-sm font-bold text-white shadow-lg transition hover:bg-indigo-700 hover:scale-105 active:scale-95"
                        >
                            <span>Explore Store Catalog</span>
                            <FiArrowRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default About;
