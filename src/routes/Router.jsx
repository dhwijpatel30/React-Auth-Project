import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import Home from "../pages/Home";
import LoginForm from "../pages/auth/LoginForm";
import About from "../pages/About";
import RegisterForm from "../pages/auth/RegisterForm";
import ProtectedRoute from "./ProtectedRoute";
import AuthLayout from "../layouts/AuthLayout";
import ProductDetails from "../components/ProductDetail";
import RHF from "../components/RHF";
import Contact from "../pages/Contact";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Settings from "../pages/admin/Settings";
import Products from "../pages/admin/Products";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import Orders from "../pages/admin/Orders";
import Categories from "../pages/admin/Categories";
import Profile from "../pages/admin/Profile";


export const Router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <LoginForm />,
            },
            {
                path: "register",
                element: <RegisterForm />,
            },
        ],
    },


    {

        element: <ProtectedRoute />,
        children: [
            {
                element: <MainLayout />,
                children: [
                    {
                        path: "/products",
                        element: <ProductCard />
                    },
                    {
                        path: "product/:id",
                        element: <ProductDetails />
                    },
                    {
                        path: "/home",
                        element: <Home />
                    },
                    {
                        path: "/cart",
                        element: <Cart />
                    },
                    {
                        path: "/about",
                        element: <About />
                    },
                    {
                        path: "/form",
                        element: <RHF />
                    },
                    {
                        path: "/contact",
                        element: <Contact />
                    }
                ]
            },

            {
                path: "admin",
                element: <AdminProtectedRoute/>,
                children: [
                    {
                        element: <AdminLayout/>,
                        children: [
                            {
                                index: true,
                                element: <Navigate to="/admin/dashboard" replace />
                            },
                            {
                                path: "dashboard",
                                element: <Dashboard/>
                            },
                            {
                                path: "products",
                                element: <Products />
                            },
                            {
                                path: "add-product",
                                element: <AddProduct />
                            },
                            {
                                path: "edit-product",
                                element: <EditProduct />
                            },
                            {
                                path: "edit-product/:id",
                                element: <EditProduct />
                            },
                            {
                                path: "categories",
                                element: <Categories />
                            },
                            {
                                path: "orders",
                                element: <Orders />
                            },
                            {
                                path: "users",
                                element: <Users />
                            },
                            {
                                path: "profile",
                                element: <Profile />
                            },
                            {
                                path: "settings",
                                element: <Settings />
                            }
                        ]
                    }
                ]
            }
        ]
    }
])