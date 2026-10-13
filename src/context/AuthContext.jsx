import React, { createContext, useState } from 'react'
import { getUser, removeUser } from '../services/authService'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(getUser())

    const login = (userData) => {
        setUser(userData);
    }

    const logout = () => {
        removeUser()
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{

                user,
                login,
                logout,
                isAuthenticated: !!user

            }}>
            {children}
        </AuthContext.Provider>
    )
}