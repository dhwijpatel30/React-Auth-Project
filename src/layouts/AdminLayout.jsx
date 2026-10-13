import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminNavbar from "../components/admin/AdminNavbar";

const AdminLayout = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans antialiased text-slate-800">
            {/* Responsive Sidebar */}
            <AdminSidebar
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            {/* Main Area */}
            <div className="flex flex-1 flex-col min-w-0">
                <AdminNavbar onMenuClick={() => setIsMobileOpen(true)} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <div className="mx-auto max-w-7xl">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;