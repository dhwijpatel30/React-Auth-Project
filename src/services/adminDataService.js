// Isolated Admin Data Service for Orders, Categories, and Dashboard Statistics
// Does not touch or conflict with customer auth or cart localStorage keys.

const ORDERS_KEY = "admin_orders";
const CATEGORIES_KEY = "admin_categories";

export const initialOrders = [
    {
        id: "ORD-9421",
        customer: {
            name: "Sophia Martinez",
            email: "sophia.m@example.com",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=60"
        },
        items: [
            {
                id: 1,
                title: "Fjallraven Backpack",
                price: 109.95,
                quantity: 1,
                image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png"
            },
            {
                id: 2,
                title: "Mens Casual Slim Fit",
                price: 22.3,
                quantity: 2,
                image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png"
            }
        ],
        totalAmount: 154.55,
        paymentStatus: "Paid",
        orderStatus: "Delivered",
        date: "2026-03-15T10:30:00Z",
        shippingAddress: {
            street: "742 Evergreen Terrace",
            city: "Springfield",
            state: "OR",
            zip: "97477",
            country: "USA"
        }
    },
    {
        id: "ORD-9420",
        customer: {
            name: "Liam Alexander",
            email: "liam.a@example.com",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=60"
        },
        items: [
            {
                id: 3,
                title: "Mens Cotton Jacket",
                price: 55.99,
                quantity: 1,
                image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png"
            }
        ],
        totalAmount: 55.99,
        paymentStatus: "Paid",
        orderStatus: "Processing",
        date: "2026-03-16T14:15:00Z",
        shippingAddress: {
            street: "124 Conch Street",
            city: "Bikini Bottom",
            state: "HI",
            zip: "96815",
            country: "USA"
        }
    },
    {
        id: "ORD-9419",
        customer: {
            name: "Emma Watson",
            email: "emma.w@example.com",
            avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=60"
        },
        items: [
            {
                id: 5,
                title: "Silver Dragon Chain Bracelet",
                price: 695.00,
                quantity: 1,
                image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg"
            }
        ],
        totalAmount: 695.00,
        paymentStatus: "Paid",
        orderStatus: "Shipped",
        date: "2026-03-17T09:45:00Z",
        shippingAddress: {
            street: "221B Baker Street",
            city: "London",
            state: "LDN",
            zip: "NW1 6XE",
            country: "UK"
        }
    },
    {
        id: "ORD-9418",
        customer: {
            name: "Noah Benjamin",
            email: "noah.b@example.com",
            avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=60"
        },
        items: [
            {
                id: 9,
                title: "WD 2TB External Hard Drive",
                price: 64.00,
                quantity: 1,
                image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg"
            },
            {
                id: 10,
                title: "SanDisk SSD PLUS 1TB",
                price: 109.00,
                quantity: 1,
                image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg"
            }
        ],
        totalAmount: 173.00,
        paymentStatus: "Pending",
        orderStatus: "Pending",
        date: "2026-03-18T11:20:00Z",
        shippingAddress: {
            street: "42 Wallaby Way",
            city: "Sydney",
            state: "NSW",
            zip: "2000",
            country: "Australia"
        }
    },
    {
        id: "ORD-9417",
        customer: {
            name: "Olivia Grace",
            email: "olivia.g@example.com",
            avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=60"
        },
        items: [
            {
                id: 15,
                title: "Women's 3-in-1 Snowboard Jacket",
                price: 56.99,
                quantity: 1,
                image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg"
            }
        ],
        totalAmount: 56.99,
        paymentStatus: "Paid",
        orderStatus: "Delivered",
        date: "2026-03-14T16:00:00Z",
        shippingAddress: {
            street: "350 Fifth Avenue",
            city: "New York",
            state: "NY",
            zip: "10118",
            country: "USA"
        }
    },
    {
        id: "ORD-9416",
        customer: {
            name: "Ethan James",
            email: "ethan.j@example.com",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=60"
        },
        items: [
            {
                id: 14,
                title: "Samsung 49-Inch Curved Gaming Monitor",
                price: 999.99,
                quantity: 1,
                image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg"
            }
        ],
        totalAmount: 999.99,
        paymentStatus: "Failed",
        orderStatus: "Cancelled",
        date: "2026-03-13T08:10:00Z",
        shippingAddress: {
            street: "1 Infinite Loop",
            city: "Cupertino",
            state: "CA",
            zip: "95014",
            country: "USA"
        }
    }
];

export const initialCategories = [
    {
        id: "cat-1",
        name: "men's clothing",
        displayName: "Men's Clothing",
        slug: "mens-clothing",
        description: "Modern fashion, streetwear, outerwear and casual shirts for men.",
        image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=400&auto=format&fit=crop&q=60",
        status: "Active"
    },
    {
        id: "cat-2",
        name: "women's clothing",
        displayName: "Women's Clothing",
        slug: "womens-clothing",
        description: "Elegant dresses, coats, everyday tops and accessories.",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&auto=format&fit=crop&q=60",
        status: "Active"
    },
    {
        id: "cat-3",
        name: "electronics",
        displayName: "Electronics & Tech",
        slug: "electronics",
        description: "Latest gadgets, monitors, storage devices and tech gear.",
        image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&auto=format&fit=crop&q=60",
        status: "Active"
    },
    {
        id: "cat-4",
        name: "jewelery",
        displayName: "Jewelry & Accessories",
        slug: "jewelry",
        description: "Premium gold, silver, rings, bracelets and timeless gems.",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&auto=format&fit=crop&q=60",
        status: "Active"
    }
];

// Orders CRUD
export const getAdminOrders = () => {
    try {
        const stored = localStorage.getItem(ORDERS_KEY);
        if (!stored) {
            localStorage.setItem(ORDERS_KEY, JSON.stringify(initialOrders));
            return initialOrders;
        }
        return JSON.parse(stored);
    } catch {
        return initialOrders;
    }
};

export const saveAdminOrders = (orders) => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
};

export const updateOrderStatus = (orderId, newStatus) => {
    const orders = getAdminOrders();
    const updated = orders.map((ord) =>
        ord.id === orderId ? { ...ord, orderStatus: newStatus } : ord
    );
    saveAdminOrders(updated);
    return updated;
};

export const deleteAdminOrder = (orderId) => {
    const orders = getAdminOrders();
    const updated = orders.filter((ord) => ord.id !== orderId);
    saveAdminOrders(updated);
    return updated;
};

// Categories CRUD
export const getAdminCategories = () => {
    try {
        const stored = localStorage.getItem(CATEGORIES_KEY);
        if (!stored) {
            localStorage.setItem(CATEGORIES_KEY, JSON.stringify(initialCategories));
            return initialCategories;
        }
        return JSON.parse(stored);
    } catch {
        return initialCategories;
    }
};

export const saveAdminCategories = (categories) => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
};

export const addAdminCategory = (categoryData) => {
    const categories = getAdminCategories();
    const newCategory = {
        id: `cat-${Date.now()}`,
        name: categoryData.name.toLowerCase().trim(),
        displayName: categoryData.name.trim(),
        slug: categoryData.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-"),
        description: categoryData.description || "",
        image: categoryData.image || "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&auto=format&fit=crop&q=60",
        status: categoryData.status || "Active"
    };
    const updated = [newCategory, ...categories];
    saveAdminCategories(updated);
    return updated;
};

export const updateAdminCategory = (categoryId, categoryData) => {
    const categories = getAdminCategories();
    const updated = categories.map((cat) =>
        cat.id === categoryId ? { ...cat, ...categoryData } : cat
    );
    saveAdminCategories(updated);
    return updated;
};

export const deleteAdminCategory = (categoryId) => {
    const categories = getAdminCategories();
    const updated = categories.filter((cat) => cat.id !== categoryId);
    saveAdminCategories(updated);
    return updated;
};
