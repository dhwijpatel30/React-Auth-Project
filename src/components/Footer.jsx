import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiArrowRight,
    FiShield,
    FiTruck,
    FiRefreshCw
} from "react-icons/fi";
import {
    FaTwitter,
    FaInstagram,
    FaFacebookF,
    FaLinkedinIn,
    FaCcVisa,
    FaCcMastercard,
    FaCcAmex,
    FaCcPaypal,
    FaApplePay
} from "react-icons/fa";

const Footer = () => {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email.trim() || !email.includes("@")) {
            toast.error("Please enter a valid email address.");
            return;
        }
        toast.success("Thank you for subscribing to ShopSphere Insider!");
        setEmail("");
    };

    return (
        <footer className="border-t border-slate-200 bg-white">
            {/* Value Highlights Bar */}
            <div className="border-b border-slate-100 bg-slate-50/70">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center sm:text-left">
                        <div className="flex items-center justify-center sm:justify-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                <FiTruck size={22} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                                    Free Global Shipping
                                </h4>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Complimentary delivery on all orders over $50.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center sm:justify-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                <FiShield size={22} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                                    100% Secure Checkout
                                </h4>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Encrypted transactions & certified buyer safety.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-center sm:justify-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                                <FiRefreshCw size={22} />
                            </div>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
                                    30-Day Hassle-Free Returns
                                </h4>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Fast replacements and straightforward refunds.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand column */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link to="/home" className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-black text-white shadow-md shadow-indigo-200">
                                S
                            </div>
                            <div>
                                <span className="text-lg font-black tracking-tight text-slate-900">
                                    Shop<span className="text-indigo-600">Sphere</span>
                                </span>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                    Curated Shopping
                                </p>
                            </div>
                        </Link>

                        <p className="text-xs leading-relaxed text-slate-500 max-w-sm">
                            ShopSphere is a next-generation ecommerce platform offering handpicked apparel, luxury gems, smart electronics, and daily essentials backed by world-class customer service.
                        </p>

                        <div className="pt-2">
                            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                                Follow Our Journey
                            </p>
                            <div className="flex items-center gap-2">
                                {[
                                    { icon: FaTwitter, href: "#" },
                                    { icon: FaInstagram, href: "#" },
                                    { icon: FaFacebookF, href: "#" },
                                    { icon: FaLinkedinIn, href: "#" }
                                ].map((item, idx) => {
                                    const Icon = item.icon;
                                    return (
                                        <a
                                            key={idx}
                                            href={item.href}
                                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:bg-indigo-600 hover:text-white hover:border-indigo-600"
                                        >
                                            <Icon size={14} />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Quick Navigation */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                            Quick Links
                        </h4>
                        <ul className="mt-4 space-y-2.5 text-xs">
                            <li>
                                <Link to="/home" className="text-slate-500 hover:text-indigo-600 font-medium transition">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link to="/products" className="text-slate-500 hover:text-indigo-600 font-medium transition">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="text-slate-500 hover:text-indigo-600 font-medium transition">
                                    About Our Brand
                                </Link>
                            </li>
                            <li>
                                <Link to="/contact" className="text-slate-500 hover:text-indigo-600 font-medium transition">
                                    Contact Support
                                </Link>
                            </li>
                            <li>
                                <Link to="/cart" className="text-slate-500 hover:text-indigo-600 font-medium transition">
                                    View Cart
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                            Departments
                        </h4>
                        <ul className="mt-4 space-y-2.5 text-xs">
                            <li>
                                <Link
                                    to="/products"
                                    state={{ category: "electronics" }}
                                    className="text-slate-500 hover:text-indigo-600 font-medium transition capitalize"
                                >
                                    Electronics & Gadgets
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    state={{ category: "jewelery" }}
                                    className="text-slate-500 hover:text-indigo-600 font-medium transition capitalize"
                                >
                                    Jewelry & Gems
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    state={{ category: "men's clothing" }}
                                    className="text-slate-500 hover:text-indigo-600 font-medium transition capitalize"
                                >
                                    Men's Apparel
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products"
                                    state={{ category: "women's clothing" }}
                                    className="text-slate-500 hover:text-indigo-600 font-medium transition capitalize"
                                >
                                    Women's Fashion
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div>
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                            Join Our Newsletter
                        </h4>
                        <p className="mt-3 text-xs leading-relaxed text-slate-500">
                            Receive early access to flash sales, exclusive discount drops, and product updates.
                        </p>

                        <form onSubmit={handleSubscribe} className="mt-4 space-y-2">
                            <div className="relative">
                                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email..."
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-indigo-700 active:scale-95"
                            >
                                <span>Subscribe Now</span>
                                <FiArrowRight size={14} />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar: Payment icons & Copyright */}
                <div className="mt-12 border-t border-slate-100 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-400 text-center sm:text-left">
                        &copy; 2026 <span className="font-bold text-slate-700">ShopSphere</span> Inc. All rights reserved.
                    </p>

                    {/* Payment methods */}
                    <div className="flex items-center gap-3 text-slate-400">
                        <FaCcVisa size={26} className="hover:text-indigo-600 transition" title="Visa" />
                        <FaCcMastercard size={26} className="hover:text-indigo-600 transition" title="Mastercard" />
                        <FaCcAmex size={26} className="hover:text-indigo-600 transition" title="American Express" />
                        <FaCcPaypal size={24} className="hover:text-indigo-600 transition" title="PayPal" />
                        <FaApplePay size={28} className="hover:text-indigo-600 transition" title="Apple Pay" />
                    </div>

                    <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                        <Link to="/about" className="hover:text-indigo-600 transition">Privacy Policy</Link>
                        <span>•</span>
                        <Link to="/about" className="hover:text-indigo-600 transition">Terms of Service</Link>
                        <span>•</span>
                        <Link to="/contact" className="hover:text-indigo-600 transition">Security</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
