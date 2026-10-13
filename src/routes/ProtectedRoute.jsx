import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {

    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <Outlet/>
}

export default ProtectedRoute