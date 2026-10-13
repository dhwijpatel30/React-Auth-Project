import React, { useEffect } from "react";
import { FiAlertTriangle, FiX } from "react-icons/fi";

export const ConfirmDeleteModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Deletion",
    message = "Are you sure you want to delete this item? This action cannot be undone.",
    itemName,
    confirmText = "Delete Permanently",
    cancelText = "Cancel",
    isDeleting = false
}) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen && !isDeleting) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, isDeleting, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
                onClick={() => {
                    if (!isDeleting) onClose();
                }}
            />

            {/* Modal Box */}
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl transition-all">
                <button
                    onClick={onClose}
                    disabled={isDeleting}
                    className="absolute right-4 top-4 rounded-xl p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
                >
                    <FiX size={18} />
                </button>

                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                        <FiAlertTriangle size={24} />
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-slate-500">
                            {message}
                        </p>
                        {itemName && (
                            <div className="mt-2 rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-800 break-all">
                                {itemName}
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isDeleting}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isDeleting}
                        className="inline-flex items-center justify-center rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-700 active:scale-95 disabled:opacity-60"
                    >
                        {isDeleting ? "Deleting..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
