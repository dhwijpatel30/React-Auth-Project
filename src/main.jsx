import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ProductProvider } from './context/ProductContext'
import { AuthProvider } from './context/AuthContext'
import { ToastContainer } from 'react-toastify'
import { seeAddminUser } from './services/authService'

seeAddminUser();
ReactDOM.createRoot(document.getElementById('root')).render(

    <ProductProvider>
        <AuthProvider>
            <App />
             <ToastContainer position="top-right" autoClose={3000} theme="light" />
        </AuthProvider>
    </ProductProvider>

)