import React, { useState, useMemo, useEffect } from "react";
import {
    getAdminOrders,
    updateOrderStatus,
    deleteAdminOrder
} from "../../services/adminDataService";
import { toast } from "react-toastify";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmDeleteModal from "../../components/admin/ConfirmDeleteModal";
import Pagination from "../../components/admin/Pagination";
import {
    FiSearch,
    FiEye,
    FiTrash2,
    FiX,
    FiPackage,
    FiCheckCircle,
    FiClock,
    FiTruck,
    FiMapPin,
    FiCalendar,
    FiDollarSign
} from "react-icons/fi";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    // Modal & Drawer states
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orderToDelete, setOrderToDelete] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        setOrders(getAdminOrders());
    }, []);

    // Filter orders
    const filteredOrders = useMemo(() => {
        return orders.filter((o) => {
            const matchesSearch =
                (o.id || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (o.customer?.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
                (o.customer?.email || "").toLowerCase().includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === "all" ||
                (o.orderStatus || "").toLowerCase() === statusFilter.toLowerCase();

            const matchesPayment =
                paymentFilter === "all" ||
                (o.paymentStatus || "").toLowerCase() === paymentFilter.toLowerCase();

            return matchesSearch && matchesStatus && matchesPayment;
        });
    }, [orders, searchQuery, statusFilter, paymentFilter]);

    // Paginated slice
    const paginatedOrders = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return filteredOrders.slice(start, start + itemsPerPage);
    }, [filteredOrders, currentPage]);

    // Status changer
    const handleStatusChange = (orderId, newStatus) => {
        const updated = updateOrderStatus(orderId, newStatus);
        setOrders(updated);
        if (selectedOrder && selectedOrder.id === orderId) {
            setSelectedOrder({ ...selectedOrder, orderStatus: newStatus });
        }
        toast.success(`Order #${orderId} status changed to ${newStatus}.`);
    };

    // Delete handler
    const handleConfirmDelete = () => {
        if (!orderToDelete) return;
        const updated = deleteAdminOrder(orderToDelete.id);
        setOrders(updated);
        toast.success(`Order #${orderToDelete.id} was deleted.`);
        setOrderToDelete(null);
        if (selectedOrder && selectedOrder.id === orderToDelete.id) {
            setSelectedOrder(null);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                        Order Management
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Track customer purchases, fulfillments, shipping progress, and payment records.
                    </p>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs">
                <div className="relative flex-1">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        placeholder="Search by Order ID, customer name or email..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs sm:text-sm font-medium text-slate-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                    />
                </div>

                <div className="flex items-center gap-2.5">
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500"
                    >
                        <option value="all">All Order Statuses</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>

                    <select
                        value={paymentFilter}
                        onChange={(e) => {
                            setPaymentFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 outline-none focus:border-indigo-500"
                    >
                        <option value="all">All Payments</option>
                        <option value="Paid">Paid</option>
                        <option value="Pending">Pending</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="border-b border-slate-100 bg-slate-50/80 text-slate-500 font-bold uppercase tracking-wider">
                            <tr>
                                <th className="px-6 py-4">Order ID</th>
                                <th className="px-6 py-4">Customer</th>
                                <th className="px-6 py-4">Products</th>
                                <th className="px-6 py-4">Amount</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Payment</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paginatedOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                                        No orders found matching the filter criteria.
                                    </td>
                                </tr>
                            ) : (
                                paginatedOrders.map((order) => {
                                    const itemsCount = order.items?.reduce(
                                        (sum, i) => sum + (i.quantity || 1),
                                        0
                                    ) || 1;

                                    const orderDate = order.date
                                        ? new Date(order.date).toLocaleDateString("en-US", {
                                              month: "short",
                                              day: "numeric",
                                              year: "numeric"
                                          })
                                        : "Mar 15, 2026";

                                    return (
                                        <tr key={order.id} className="hover:bg-slate-50/70 transition">
                                            {/* Order ID */}
                                            <td className="px-6 py-4 font-bold text-indigo-600">
                                                {order.id}
                                            </td>

                                            {/* Customer */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2.5">
                                                    {order.customer?.avatar ? (
                                                        <img
                                                            src={order.customer.avatar}
                                                            alt={order.customer.name}
                                                            className="h-7 w-7 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-[10px] font-bold text-indigo-700">
                                                            {order.customer?.name?.[0] || "C"}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <p className="font-bold text-slate-800">{order.customer?.name}</p>
                                                        <p className="text-[10px] text-slate-400">{order.customer?.email}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Products count and thumbs */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5">
                                                    <div className="flex -space-x-2 overflow-hidden">
                                                        {order.items?.slice(0, 3).map((item, idx) => (
                                                            <img
                                                                key={idx}
                                                                src={item.image}
                                                                alt={item.title}
                                                                className="inline-block h-6 w-6 rounded-md object-contain border border-slate-200 bg-white p-0.5"
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-slate-600 font-medium">
                                                        {itemsCount} {itemsCount === 1 ? "item" : "items"}
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Amount */}
                                            <td className="px-6 py-4 font-black text-slate-900">
                                                ${Number(order.totalAmount).toFixed(2)}
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                                                {orderDate}
                                            </td>

                                            {/* Payment */}
                                            <td className="px-6 py-4">
                                                <StatusBadge status={order.paymentStatus} type="payment" />
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-4">
                                                <select
                                                    value={order.orderStatus}
                                                    onChange={(e) =>
                                                        handleStatusChange(order.id, e.target.value)
                                                    }
                                                    className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 outline-none hover:border-slate-300"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-50 hover:text-indigo-600"
                                                        title="View Order Details"
                                                    >
                                                        <FiEye size={15} />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => setOrderToDelete(order)}
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-rose-50 hover:text-rose-600"
                                                        title="Delete Order"
                                                    >
                                                        <FiTrash2 size={15} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalItems={filteredOrders.length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={setCurrentPage}
                />
            </div>

            {/* Order Details Drawer / Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs"
                        onClick={() => setSelectedOrder(null)}
                    />

                    <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl bg-white p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <button
                            type="button"
                            onClick={() => setSelectedOrder(null)}
                            className="absolute right-4 top-4 rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                        >
                            <FiX size={20} />
                        </button>

                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                                    Order Summary
                                </span>
                                <h3 className="text-xl font-black text-slate-900 mt-0.5">
                                    {selectedOrder.id}
                                </h3>
                            </div>
                            <div className="flex items-center gap-2 pr-8">
                                <StatusBadge status={selectedOrder.paymentStatus} type="payment" />
                                <StatusBadge status={selectedOrder.orderStatus} type="order" />
                            </div>
                        </div>

                        {/* Customer & Shipping Details */}
                        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-2">
                                <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                                    Customer Information
                                </p>
                                <p className="font-bold text-slate-800 text-sm">
                                    {selectedOrder.customer?.name}
                                </p>
                                <p className="text-slate-500">{selectedOrder.customer?.email}</p>
                            </div>

                            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 space-y-2">
                                <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                                    Shipping Destination
                                </p>
                                <p className="font-medium text-slate-700">
                                    {selectedOrder.shippingAddress?.street || "123 Main St"}
                                </p>
                                <p className="text-slate-500">
                                    {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state}{" "}
                                    {selectedOrder.shippingAddress?.zip} ({selectedOrder.shippingAddress?.country})
                                </p>
                            </div>
                        </div>

                        {/* Items Breakdown */}
                        <div className="mt-6">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                                Purchased Items
                            </h4>
                            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                                {selectedOrder.items?.map((item, index) => (
                                    <div key={index} className="flex items-center justify-between p-3.5 bg-white">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 shrink-0 rounded-lg bg-slate-50 p-1 border border-slate-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="h-full w-full object-contain"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-xs line-clamp-1">
                                                    {item.title}
                                                </p>
                                                <p className="text-[11px] text-slate-400">
                                                    Qty: {item.quantity || 1} × ${Number(item.price).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>

                                        <span className="font-black text-slate-900 text-sm">
                                            ${((item.quantity || 1) * item.price).toFixed(2)}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Status Update & Total */}
                        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-6">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-semibold text-slate-600">
                                    Update Status:
                                </span>
                                <select
                                    value={selectedOrder.orderStatus}
                                    onChange={(e) =>
                                        handleStatusChange(selectedOrder.id, e.target.value)
                                    }
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 outline-none focus:border-indigo-500"
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </div>

                            <div className="text-right">
                                <span className="text-xs text-slate-400">Order Total</span>
                                <p className="text-2xl font-black text-indigo-600">
                                    ${Number(selectedOrder.totalAmount).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirm Delete Modal */}
            <ConfirmDeleteModal
                isOpen={!!orderToDelete}
                onClose={() => setOrderToDelete(null)}
                onConfirm={handleConfirmDelete}
                title="Delete Order Record"
                message="Are you sure you want to delete this order? This record will be permanently removed from transaction archives."
                itemName={`Order ${orderToDelete?.id} - Customer: ${orderToDelete?.customer?.name}`}
            />
        </div>
    );
};

export default Orders;
