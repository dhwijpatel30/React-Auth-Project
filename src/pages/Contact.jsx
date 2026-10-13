import React, { useState } from "react";
import { toast } from "react-toastify";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiSend,
    FiClock,
    FiChevronDown,
    FiHelpCircle,
    FiCheckCircle
} from "react-icons/fi";

const Contact = () => {
    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [topic, setTopic] = useState("Order Support");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // FAQ state
    const [openFaq, setOpenFaq] = useState(0);

    const faqs = [
        {
            q: "How fast will my order arrive?",
            a: "Most orders are processed within 24 hours. Standard domestic delivery takes 2 to 4 business days. Express next-day delivery options are also available at checkout."
        },
        {
            q: "What is your return and exchange policy?",
            a: "We offer a 30-day no-questions-asked return policy. If you're not completely satisfied with your items, reach out to our team and we'll provide a prepaid return label."
        },
        {
            q: "How can I track the delivery status of my package?",
            a: "As soon as your order leaves our domestic warehouse, you will receive an email and SMS confirmation containing your tracking number and live map progress link."
        },
        {
            q: "Are my payment details and card information secure?",
            a: "Yes, 100%. All transactions are processed through encrypted 256-bit SSL gateways. We do not store raw credit card numbers on our servers."
        }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) {
            toast.error("Please fill in your name, email, and message.");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            toast.success("Thank you! Your inquiry has been received. We'll reply within 24 hours.");
            setName("");
            setEmail("");
            setSubject("");
            setMessage("");
            setTopic("Order Support");
        }, 600);
    };

    return (
        <main className="min-h-screen bg-slate-50/60 pb-20">
            {/* HERO SECTION */}
            <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 px-4 py-16 text-center text-white sm:px-6 lg:px-8">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl pointer-events-none" />

                <div className="relative mx-auto max-w-3xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-indigo-400/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-indigo-300 backdrop-blur-md">
                        Contact ShopSphere Care
                    </span>

                    <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl text-white">
                        We're Here to Help
                    </h1>

                    <p className="mx-auto mt-4 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-300">
                        Have a question about a product, order shipment, or return? Reach out to our dedicated team and we'll respond promptly.
                    </p>
                </div>
            </section>

            {/* CONTACT INFO & FORM SECTION */}
            <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-12 items-start">
                    {/* Left: Contact Channels */}
                    <div className="space-y-6 lg:col-span-5">
                        <div>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">
                                Get In Touch
                            </span>
                            <h2 className="mt-1 text-2xl font-black text-slate-900 tracking-tight">
                                Customer Service Channels
                            </h2>
                            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                                Choose the most convenient way to reach us. Our operations team is active 24/7 across multiple time zones.
                            </p>
                        </div>

                        {/* Email Card */}
                        <div className="flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md hover:border-slate-300">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                <FiMail size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">Email Support</h3>
                                <p className="text-xs font-medium text-slate-700 mt-0.5">support@shopsphere.com</p>
                                <p className="text-[11px] text-slate-400 mt-1">Typical response time: under 2 hours</p>
                            </div>
                        </div>

                        {/* Phone Card */}
                        <div className="flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md hover:border-slate-300">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                                <FiPhone size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">Telephone Inquiries</h3>
                                <p className="text-xs font-medium text-slate-700 mt-0.5">+1 (800) 123-4567</p>
                                <p className="text-[11px] text-slate-400 mt-1">Monday – Friday: 9am – 8pm EST</p>
                            </div>
                        </div>

                        {/* Office Location Card */}
                        <div className="flex items-start gap-4 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs transition hover:shadow-md hover:border-slate-300">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                <FiMapPin size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900">Headquarters</h3>
                                <p className="text-xs font-medium text-slate-700 mt-0.5">123 Commerce Way, Suite 400</p>
                                <p className="text-[11px] text-slate-400 mt-1">San Francisco, CA 94105, USA</p>
                            </div>
                        </div>

                        {/* Operating Hours Box */}
                        <div className="rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5 text-xs text-indigo-950 space-y-1.5">
                            <div className="flex items-center gap-2 font-bold text-indigo-900">
                                <FiClock size={16} className="text-indigo-600" />
                                <span>Support Center Guarantee</span>
                            </div>
                            <p className="text-[11px] leading-relaxed text-indigo-800">
                                All customer messages and replacement requests are prioritized by our certified care specialists.
                            </p>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-xs">
                        <h3 className="text-lg font-black text-slate-900">Send Us a Direct Message</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                            Fill out the form below and we'll get back to you shortly.
                        </p>

                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Your Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Email Address <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="john@example.com"
                                        required
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Topic / Department
                                    </label>
                                    <select
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white"
                                    >
                                        <option value="Order Support">Order Support & Tracking</option>
                                        <option value="Product Question">Product Specification Question</option>
                                        <option value="Return / Refund">Returns & Refund Request</option>
                                        <option value="Business Partnership">Business Partnership</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                        placeholder="Brief summary of inquiry..."
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                    Your Message <span className="text-rose-500">*</span>
                                </label>
                                <textarea
                                    rows={5}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="Please provide order number if applicable, or details about your question..."
                                    required
                                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                                />
                            </div>

                            <div className="pt-2 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 text-xs font-bold text-white shadow-md shadow-indigo-600/20 transition hover:bg-indigo-700 active:scale-95 disabled:opacity-60"
                                >
                                    <FiSend size={15} />
                                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {/* FREQUENTLY ASKED QUESTIONS SECTION */}
            <section className="mx-auto max-w-4xl px-4 pt-20 sm:px-6 lg:px-8">
                <div className="text-center mb-10">
                    <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600">
                        Help &amp; Answers
                    </span>
                    <h2 className="mt-1 text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="space-y-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openFaq === index;
                        return (
                            <div
                                key={index}
                                className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-xs transition"
                            >
                                <button
                                    type="button"
                                    onClick={() => setOpenFaq(isOpen ? null : index)}
                                    className="flex w-full items-center justify-between p-5 text-left text-xs sm:text-sm font-bold text-slate-900 hover:text-indigo-600 transition"
                                >
                                    <span>{faq.q}</span>
                                    <FiChevronDown
                                        size={18}
                                        className={`shrink-0 text-slate-400 transition-transform duration-200 ${
                                            isOpen ? "rotate-180 text-indigo-600" : ""
                                        }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="border-t border-slate-100 px-5 pb-5 pt-3 text-xs leading-relaxed text-slate-600 animate-in fade-in duration-200">
                                        {faq.a}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </main>
    );
};

export default Contact;
