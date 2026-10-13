import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { FaUser, FaEnvelope, FaLock, FaArrowRight, FaShieldAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../auth/validations/validation.js";
import { saveRegisterUser } from "../../services/authService.js";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";

const RegisterForm = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onChange",
    });

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        const hashedPassword = bcrypt.hashSync(data.password, 10);

        const userData = {
            id: crypto.randomUUID,
            name: data.name.trim(),
            email: data.email.toLowerCase().trim(),
            password: hashedPassword,
            role: "user",
            isActive: true,
            createdAt: new Date().toISOString(),
        };

        const isSaved = saveRegisterUser(userData);

        if (!isSaved) {
            toast.error("Email already registered");
            return;
        }

        toast.success("User Registered Successfully");

        reset();

        navigate("/");
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-5xl items-center justify-center">

                {/* Register Card */}
                <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl shadow-indigo-100 lg:grid-cols-2">

                    {/* Left Side */}
                    <div className="hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-10 text-white lg:flex lg:flex-col lg:justify-center">

                        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                            <FaShieldAlt className="text-2xl" />
                        </div>

                        <h1 className="text-4xl font-bold leading-tight">
                            Join
                            <br />
                            Our Community!
                        </h1>

                        <p className="mt-5 max-w-sm text-base leading-7 text-indigo-100">
                            Create your account and start exploring everything
                            we have to offer.
                        </p>

                        <div className="mt-10 flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-white/40" />
                            <div className="h-2 w-2 rounded-full bg-white" />
                            <div className="h-2 w-2 rounded-full bg-white/40" />
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="p-6 sm:p-10 lg:p-12">

                        {/* Header */}
                        <div className="mb-8">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                Get started
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900">
                                Create your account
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Fill in your details below to create your account.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-5"
                        >

                            {/* Name */}
                            <div className="group relative">
                                <FaUser
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors duration-200 ${errors.name
                                        ? "text-red-500"
                                        : "text-gray-400 group-focus-within:text-indigo-600"
                                        }`}
                                />

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    {...register("name")}
                                    className={`w-full rounded-xl border-2 bg-gray-50 py-4 pl-12 pr-5 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:bg-white focus:bg-white focus:ring-4 ${errors.name
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                        : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                                        }`}
                                />
                            </div>

                            {/* Email */}
                            <div className="group relative">
                                <FaEnvelope
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors duration-200 ${errors.email
                                        ? "text-red-500"
                                        : "text-gray-400 group-focus-within:text-indigo-600"
                                        }`}
                                />

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                    className={`w-full rounded-xl border-2 bg-gray-50 py-4 pl-12 pr-5 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:bg-white focus:bg-white focus:ring-4 ${errors.email
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                        : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                                        }`}
                                />
                            </div>

                            {/* Password */}
                            <div className="group relative">
                                <FaLock
                                    className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors duration-200 ${errors.password
                                        ? "text-red-500"
                                        : "text-gray-400 group-focus-within:text-indigo-600"
                                        }`}
                                />

                                <input
                                    type="password"
                                    placeholder="Create a password"
                                    {...register("password")}
                                    className={`w-full rounded-xl border-2 bg-gray-50 py-4 pl-12 pr-5 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:bg-white focus:bg-white focus:ring-4 ${errors.password
                                        ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                        : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                                        }`}
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg
                                            className="h-5 w-5 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />

                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                                            />
                                        </svg>

                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        Create Account

                                        <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>

                            {/* Login Link */}
                            <p className="pt-2 text-center text-sm text-gray-500">
                                Already have an account?{" "}

                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                    className="font-semibold text-indigo-600 transition hover:text-indigo-800"
                                >
                                    Sign In
                                </button>
                            </p>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;

