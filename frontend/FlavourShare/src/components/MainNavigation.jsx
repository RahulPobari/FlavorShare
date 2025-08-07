import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Navbar from './Navbar'

export default function MainNavigation() {
  return (
    <>
      <Navbar />

      {/* Main content wrapper */}
      <main
        style={{
          minHeight: 'calc(100vh - 86px)', // Adjust according to Navbar + Footer heights
          paddingTop: '56px',               // Navbar fixed height padding if navbar is fixed
          paddingBottom: '30px',            // Footer height approx
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </main>

      <Footer />
    </>
  )
}
