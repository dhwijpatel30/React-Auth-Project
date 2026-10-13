import React, { useContext, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { toast } from "react-toastify";
import {
    FiShoppingBag,
    FiTrash2,
    FiArrowRight,
    FiShield,
    FiTruck,
    FiTag,
    FiCheck,
    FiArrowLeft
} from "react-icons/fi";

const Cart = () => {
    const navigate = useNavigate();
    const {
        cartItems = [],
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useContext(ProductContext);

    const [promoCode, setPromoCode] = useState("");
    const [discountPercent, setDiscountPercent] = useState(0);
    const [appliedCode, setAppliedCode] = useState("");

    // Calculate cart numbers
    const subtotal = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + Number(item.price) * (item.quantity || 1),
            0
        );
    }, [cartItems]);

    // Free shipping threshold at $50
    const FREE_SHIPPING_THRESHOLD = 50;
    const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0;
    const delivery = isFreeShipping ? 0 : 5.99;
    const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

    // Discount calculations
    const discountAmount = (subtotal * discountPercent) / 100;
    const total = Math.max(0, subtotal - discountAmount + delivery);

    const handleApplyPromo = (e) => {
        e.preventDefault();
        const code = promoCode.trim().toUpperCase();
        if (code === "SHOP10" || code === "WELCOME10") {
            setDiscountPercent(10);
            setAppliedCode(code);
            toast.success("Promo code applied: 10% discount!");
            setPromoCode("");
        } else if (code === "FREESHIP") {
            toast.success("Promo applied: Free shipping!");
            setAppliedCode(code);
            setPromoCode("");
        } else {
            toast.error("Invalid promo code. Try 'SHOP10'");
        }
    };

    return (
        <main className="min-h-screen bg-slate-50/60 pb-20">
            {/* Header */}
            <section className="border-b border-slate-200/80 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                    <FiShoppingBag size={16} />
                                </span>
                                <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-indigo-600">
                                    Your Order
                                </p>
                            </div>

                            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                                Shopping Bag
                            </h1>
                            <p className="mt-1 text-xs sm:text-sm text-slate-500">
                                Review your selections, apply discount codes, and proceed to checkout.
                            </p>
                        </div>

                        {/* Cart Count Badge */}
                        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-3 shadow-xs">
                            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Total Items
                            </p>
                            <p className="text-2xl font-black text-slate-900">
                                {cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cart Body */}
            <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                {cartItems.length > 0 ? (
                    <div className="grid gap-8 lg:grid-cols-12 items-start">
                        {/* Left Column: Free Shipping Progress + Items List */}
                        <div className="space-y-6 lg:col-span-8">
                            {/* Free Shipping Progress Indicator */}
                            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4 sm:p-5 shadow-xs">
                                <div className="flex items-center justify-between text-xs font-bold text-indigo-900 mb-2">
                                    <div className="flex items-center gap-2">
                                        <FiTruck size={17} className="text-indigo-600" />
                                        {isFreeShipping ? (
                                            <span>🎉 You've unlocked FREE Express Delivery!</span>
                                        ) : (
                                            <span>
                                                Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more to unlock FREE Express Delivery!
                                            </span>
                                        )}
                                    </div>
                                    <span className="font-black text-indigo-600">{shippingProgress}%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-200/60">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 transition-all duration-500"
                                        style={{ width: `${shippingProgress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Cart Items List */}
                            <div className="space-y-4">
                                {cartItems.map((item) => {
                                    const itemTotal = Number(item.price) * (item.quantity || 1);
                                    return (
                                        <article
                                            key={item.id}
                                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md"
                                        >
                                            {/* Left: Thumbnail & Details */}
                                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                                <div
                                                    onClick={() => navigate(`/product/${item.id}`)}
                                                    className="cursor-pointer flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50 p-2.5 border border-slate-100"
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="h-full w-full object-contain transition duration-300 hover:scale-105"
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold capitalize text-slate-700">
                                                        {item.category}
                                                    </span>
                                                    <h3
                                                        onClick={() => navigate(`/product/${item.id}`)}
                                                        className="cursor-pointer mt-1 font-bold text-slate-900 text-sm truncate hover:text-indigo-600 transition"
                                                        title={item.title}
                                                    >
                                                        {item.title}
                                                    </h3>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        ${Number(item.price).toFixed(2)} each
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Right: Quantity Adjuster, Price & Remove */}
                                            <div className="flex items-center justify-between sm:justify-end gap-6 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50">
                                                    <button
                                                        type="button"
                                                        onClick={() => decreaseQuantity(item.id)}
                                                        className="flex h-9 w-9 items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-200 transition rounded-l-xl"
                                                        title="Decrease"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="flex h-9 w-10 items-center justify-center text-xs font-black text-slate-900 border-x border-slate-200">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => increaseQuantity(item.id)}
                                                        className="flex h-9 w-9 items-center justify-center text-sm font-bold text-slate-600 hover:bg-slate-200 transition rounded-r-xl"
                                                        title="Increase"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Line total */}
                                                <div className="text-right min-w-[80px]">
                                                    <p className="text-base font-black text-slate-900">
                                                        ${itemTotal.toFixed(2)}
                                                    </p>
                                                </div>

                                                {/* Remove */}
                                                <button
                                                    type="button"
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-400 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                                                    title="Remove from bag"
                                                >
                                                    <FiTrash2 size={15} />
                                                </button>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>

                            {/* Back to catalog link */}
                            <div>
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition"
                                >
                                    <FiArrowLeft size={15} />
                                    <span>Continue Exploring Products</span>
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: Order Summary Sidebar */}
                        <aside className="lg:col-span-4 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-7 shadow-xs space-y-6">
                            <h2 className="text-lg font-black text-slate-900">Order Summary</h2>

                            {/* Promo Code Input */}
                            <form onSubmit={handleApplyPromo} className="space-y-2">
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Promotional Voucher
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="relative flex-1">
                                        <FiTag className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                                        <input
                                            type="text"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            placeholder="Try 'SHOP10'"
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs uppercase text-slate-800 outline-none focus:border-indigo-500 focus:bg-white"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-indigo-600 active:scale-95"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {appliedCode && (
                                    <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                                        <FiCheck size={13} />
                                        <span>"{appliedCode}" applied successfully!</span>
                                    </p>
                                )}
                            </form>

                            {/* Calculation Breakdown */}
                            <div className="space-y-3.5 border-t border-slate-100 pt-5 text-xs">
                                <div className="flex items-center justify-between text-slate-600">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                                </div>

                                {discountAmount > 0 && (
                                    <div className="flex items-center justify-between text-emerald-600 font-semibold">
                                        <span>Discount ({discountPercent}%)</span>
                                        <span>-${discountAmount.toFixed(2)}</span>
                                    </div>
                                )}

                                <div className="flex items-center justify-between text-slate-600">
                                    <span>Estimated Shipping</span>
                                    <span className="font-bold text-slate-900">
                                        {delivery === 0 ? (
                                            <span className="text-emerald-600 uppercase font-black text-[11px]">
                                                FREE
                                            </span>
                                        ) : (
                                            `$${delivery.toFixed(2)}`
                                        )}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-slate-600">
                                    <span>Taxes</span>
                                    <span className="text-slate-400">Calculated at checkout</span>
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-base">
                                    <span className="font-bold text-slate-900">Estimated Total</span>
                                    <span className="text-2xl font-black text-indigo-600">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Checkout CTA */}
                            <button
                                type="button"
                                onClick={() => toast.info("Checkout simulator: All payments are securely encrypted!")}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 text-sm font-bold text-white shadow-md shadow-indigo-600/25 transition duration-200 hover:bg-indigo-700 active:scale-95"
                            >
                                <span>Proceed to Checkout</span>
                                <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                            </button>

                            {/* Trust Callout */}
                            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-100 text-center space-y-1">
                                <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-slate-800">
                                    <FiShield size={14} className="text-emerald-600" />
                                    <span>Encrypted & Certified Checkout</span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed">
                                    Your personal information and credit credentials are never stored without permission.
                                </p>
                            </div>
                        </aside>
                    </div>
                ) : (
                    /* Empty Cart State */
                    <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-24 text-center shadow-xs max-w-2xl mx-auto">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600 shadow-xs">
                            <FiShoppingBag size={44} />
                        </div>

                        <h2 className="mt-6 text-2xl font-black text-slate-900">
                            Your shopping bag is empty
                        </h2>

                        <p className="mx-auto mt-2 max-w-sm text-xs sm:text-sm text-slate-500 leading-relaxed">
                            Looks like you haven't added any items yet. Discover our fresh apparel, jewelry pieces, and tech collections today.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/products")}
                            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-indigo-600/25 transition hover:bg-indigo-700 hover:scale-105 active:scale-95"
                        >
                            <FiShoppingBag size={16} />
                            <span>Start Shopping Now</span>
                        </button>
                    </div>
                )}
            </section>
        </main>
    );
};

export default Cart;