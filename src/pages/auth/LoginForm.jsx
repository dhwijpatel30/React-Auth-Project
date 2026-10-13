import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { loginSchema } from "../auth/validations/validation.js";
import {
    FaEnvelope,
    FaLock,
    FaArrowRight,
    FaShieldAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router";
import { findRegisteredUserByEmail, saveUser } from "../../services/authService.js";
import useAuth from "../../hooks/useAuth.js";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";

const LoginForm = () => {
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(loginSchema),
        mode: "onChange",
    });

    const navigate = useNavigate()

    let { login } = useAuth();

    const onSubmit = async (data) => {
        const registeredUser = findRegisteredUserByEmail(data.email);

        if (!registeredUser) {
            toast.error("Invalid email or password");
            return;
        }

        const isPasswordValid = bcrypt.compareSync(
            data.password,
            registeredUser.password,
        );

        if (!isPasswordValid) {
            toast.error("Invalid email or password");
            return;
        }


        saveUser(registeredUser);

        login(registeredUser);

        toast.success("Logged In Successfully");

        navigate("/home");

        if (registeredUser.role === "admin") {
            navigate("/admin/dashboard", { replace: true });
        } else {
            navigate("/home", { replace: true });
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-5xl items-center justify-center">

                {/* Login Card */}
                <div className="grid w-full overflow-hidden rounded-3xl bg-white shadow-2xl shadow-indigo-100 lg:grid-cols-2">

                    {/* Left Side */}
                    <div className="hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 p-10 text-white lg:flex lg:flex-col lg:justify-center">

                        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                            <FaShieldAlt className="text-2xl" />
                        </div>

                        <h1 className="text-4xl font-bold leading-tight">
                            Welcome
                            <br />
                            Back!
                        </h1>

                        <p className="mt-5 max-w-sm text-base leading-7 text-indigo-100">
                            Sign in to your account and continue exploring everything we
                            have to offer.
                        </p>

                        <div className="mt-10 flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-white" />
                            <div className="h-2 w-2 rounded-full bg-white/40" />
                            <div className="h-2 w-2 rounded-full bg-white/40" />
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="p-6 sm:p-10 lg:p-12">

                        {/* Header */}
                        <div className="mb-8">
                            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
                                Welcome back
                            </p>

                            <h2 className="text-3xl font-bold text-gray-900">
                                Sign in to your account
                            </h2>

                            <p className="mt-2 text-sm text-gray-500">
                                Enter your details below to continue.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            {/* Email */}
                            <div>
                                <label className="mb-2.5 block text-sm font-semibold text-gray-800">
                                    Email Address
                                </label>

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
                                        className={`w-full rounded-xl border-2 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:bg-white focus:bg-white focus:ring-4 ${errors.email
                                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                            : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                                            }`}
                                    />
                                </div>

                                {errors.email && (
                                    <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
                                        <span>⚠</span>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2.5 block text-sm font-semibold text-gray-800">
                                    Password
                                </label>

                                <div className="group relative">
                                    <FaLock
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-colors duration-200 ${errors.password
                                            ? "text-red-500"
                                            : "text-gray-400 group-focus-within:text-indigo-600"
                                            }`}
                                    />

                                    <input
                                        type="password"
                                        placeholder="Enter your password"
                                        {...register("password")}
                                        className={`w-full rounded-xl border-2 bg-gray-50 py-3.5 pl-11 pr-4 text-sm text-gray-800 outline-none transition-all duration-200 placeholder:text-gray-400 hover:bg-white focus:bg-white focus:ring-4 ${errors.password
                                            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
                                            : "border-gray-200 focus:border-indigo-500 focus:ring-indigo-100"
                                            }`}
                                    />
                                </div>

                                {errors.password && (
                                    <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-red-500">
                                        <span>⚠</span>
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Remember + Forgot */}
                            <div className="flex items-center justify-between">
                                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-indigo-600 focus:ring-2 focus:ring-indigo-200"
                                    />

                                    <span>Remember me</span>
                                </label>

                                <button
                                    type="button"
                                    className="text-sm font-semibold text-indigo-600 transition hover:text-indigo-800"
                                >
                                    Forgot Password?
                                </button>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-purple-700 hover:shadow-xl active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
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

                                        Signing In...
                                    </>
                                ) : (
                                    <>
                                        Sign In

                                        <FaArrowRight className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>

                            {/* Bottom Text */}
                            <p className="pt-2 text-center text-sm text-gray-500">
                                Don't have an account?{" "}
                                <button
                                    type="button"
                                    onClick={() => navigate("/register")}
                                    className="font-semibold text-indigo-600 hover:text-indigo-800"
                                >
                                    Create an account
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;

