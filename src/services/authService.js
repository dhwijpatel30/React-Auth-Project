import bcrypt from "bcryptjs";

const AUTH_KEY = "auth_user"
const REGISTER_KEY = "registered_user"

// Register 

export const getRegisterUser = () => {
    const users = localStorage.getItem(REGISTER_KEY)

    return users ? JSON.parse(users) : [];
}

export const saveRegisterUser = (data) => {
    const users = getRegisterUser();

    const emailExist = users.some(
        (ele) => ele.email.toLowerCase() === data.email.toLowerCase()
    )

    if (emailExist) {
        return false
    }

    const updatedUser = [
        ...users,
        {
            ...data,
            email: data.email.toLowerCase().trim()
        }
    ];

    localStorage.setItem(REGISTER_KEY, JSON.stringify(updatedUser))

    return true
}


export const findRegisteredUserByEmail = (email) => {
    const users = getRegisterUser();

    return (
        users.find(
            (user) => user.email.toLowerCase() === email.toLowerCase().trim(),
        ) || null
    );
};


export const removeRegisteredUsers = () => {
    localStorage.removeItem(REGISTER_KEY);
};


// Login 

export const getUser = () => {
    const user = localStorage.getItem(AUTH_KEY)

    return user ? JSON.parse(user) : null
}

export const saveUser = (user) => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
}

export const removeUser = () => {
    localStorage.removeItem(AUTH_KEY)
}

export const isAuthenticated = () => {
    return !!getUser()
}

// Admin //

export const seeAddminUser = () => {
    const users = getRegisterUser()

    const adminExist = users.some(
        (user) => user.role === "admin" && user.email === import.meta.env.VITE_ADMIN_EMAIL,
    )

    if (adminExist) return;

    const adminUser = {
        id: crypto.randomUUID,
        name: "System Admin",
        email: import.meta.env.VITE_ADMIN_EMAIL,
        password: bcrypt.hashSync(import.meta.env.VITE_ADMIN_PASSWORD, 10),
        role: "admin",
        isActive: true,
        createdAt: new Date().toISOString(),
    }

    localStorage.setItem(REGISTER_KEY, JSON.stringify([...users, adminUser]))
}