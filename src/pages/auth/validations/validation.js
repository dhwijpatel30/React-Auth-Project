import * as yup from "yup";

export const loginSchema = yup.object({
    email: yup
        .string()
        .trim()
        .required("Email is required")
        .email("Please enter a valid email address")
        .max(255, "Email cannot exceed 255 characters"),

    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password cannot exceed 32 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character",
        ),
});

export const registerSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Full name is required")
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name cannot exceed 50 characters")
        .matches(
            /^[A-Za-z]+(?:\s[A-Za-z]+)*$/,
            "Name can only contain letters and spaces",
        ),

    email: yup
        .string()
        .trim()
        .required("Email is required")
        .email("Please enter a valid email address")
        .max(255, "Email cannot exceed 255 characters"),

    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(32, "Password cannot exceed 32 characters")
        .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
        .matches(/[a-z]/, "Password must contain at least one lowercase letter")
        .matches(/[0-9]/, "Password must contain at least one number")
        .matches(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain at least one special character",
        ),
});