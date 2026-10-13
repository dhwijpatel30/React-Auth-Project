import React from 'react'
import useAuth from '../hooks/useAuth'
import { Navigate, Outlet } from 'react-router'

const AdminProtectedRoute = () => {
  
    const { user, isAuthenticated } = useAuth()

    if(!isAuthenticated){
        return <Navigate to="/" replace/>
    }

    if(user?.role !== "admin" ){
        return <Navigate to="/home" replace/>
    }

    return <Outlet/>
}

export default AdminProtectedRoute