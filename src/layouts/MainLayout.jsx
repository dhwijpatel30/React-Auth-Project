import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import RHF from '../components/RHF'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import { ProductContext } from '../context/ProductContext'

export const MainLayout = () => {
  const { toggle } = useContext(ProductContext)

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 font-sans antialiased text-slate-800 selection:bg-indigo-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {toggle ? <RHF /> : <Outlet />}
      </main>

      {/* Storefront Footer */}
      <Footer />
    </div>
  )
}

export default MainLayout
