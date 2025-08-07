import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false) // For mobile menu toggle
  let token = localStorage.getItem('token')
  const [isLogin, setIsLogin] = useState(token ? false : true)
  let user = JSON.parse(localStorage.getItem('user'))

  useEffect(() => {
    setIsLogin(token ? false : true)
  }, [token])

  const checkLogin = () => {
    if (token) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      setIsLogin(true)
      setMenuOpen(false)
    } else {
      setIsOpen(true)
      setMenuOpen(false)
    }
  }

  // Close mobile menu after click on NavLink
  const handleNavLinkClick = () => {
    if (menuOpen) setMenuOpen(false)
  }

  return (
    <>
      <header className="navbar">
        <div className="navbar-container">
          <h2 className="navbar-logo">FlavourShare</h2>

          {/* Hamburger menu button for mobile */}
          <button
            className={`navbar-toggle ${menuOpen ? 'active' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>

          <nav className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
            <ul>
              <li>
                <NavLink to="/" onClick={handleNavLinkClick}>
                  Home
                </NavLink>
              </li>
              <li onClick={() => isLogin && setIsOpen(true)}>
                <NavLink to={!isLogin ? '/myRecipe' : '/'} onClick={handleNavLinkClick}>
                  My Recipe
                </NavLink>
              </li>
              <li onClick={() => isLogin && setIsOpen(true)}>
                <NavLink to={!isLogin ? '/favRecipe' : '/'} onClick={handleNavLinkClick}>
                  Favourites
                </NavLink>
              </li>
              <li>
                <p className="login" onClick={checkLogin} tabIndex={0} onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') checkLogin()
                }}>
                  {isLogin ? 'Login' : `Logout${user?.email ? ` (${user.email})` : ''}`}
                </p>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Modal for login */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}

      <style jsx="true">{`
        /* Reset basics */
        * {
          box-sizing: border-box;
        }

        /* Navbar container */
        .navbar {
          background-color: #1f1f1f;
          width: 100vw;
          position: fixed;
          top: 0;
          left: 0;
          z-index: 1000;
          box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
          font-family: 'Poppins', Arial, Helvetica, sans-serif;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 1.25rem;
        }

        /* Logo */
        .navbar-logo {
          color: #a7f3d0;
          font-weight: 700;
          font-size: 1.5rem;
          cursor: default;
          user-select: none;
          letter-spacing: 1px;
        }

        /* Menu */
        .navbar-menu {
          display: flex;
          align-items: center;
        }
        .navbar-menu ul {
          display: flex;
          list-style: none;
          gap: 1.9rem;
          margin: 0;
          padding: 0;
        }
        .navbar-menu li {
          display: flex;
          align-items: center;
        }

        /* NavLinks */
        .navbar-menu a,
        .navbar-menu .login {
          color: #ddd;
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          padding: 6px 14px;
          border-radius: 8px;
          transition: background-color 0.3s ease, color 0.3s ease;
          cursor: pointer;
          user-select: none;
        }
        .navbar-menu a:hover,
        .navbar-menu a.active,
        .navbar-menu .login:hover,
        .navbar-menu .login:focus {
          background-color: #2e2e2e;
          color: #a7f3d0;
          outline: none;
        }

        /* Login paragraph focus styles for accessibility */
        .navbar-menu .login:focus {
          outline: 2px solid #a7f3d0;
          outline-offset: 3px;
        }

        /* Hamburger menu button */
        .navbar-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-around;
          width: 28px;
          height: 21px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 1100;
        }
        .navbar-toggle:focus {
          outline: 2px solid #a7f3d0;
          outline-offset: 2px;
        }
        .navbar-toggle .bar {
          width: 100%;
          height: 3px;
          background-color: #ddd;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: 4px 50%;
        }
        .navbar-toggle.active .bar:nth-child(1) {
          transform: rotate(45deg);
        }
        .navbar-toggle.active .bar:nth-child(2) {
          opacity: 0;
        }
        .navbar-toggle.active .bar:nth-child(3) {
          transform: rotate(-45deg);
        }

        /* Responsive styles */
        @media (max-width: 768px) {
          .navbar-container {
            height: 56px;
            padding: 0 1rem;
          }
          /* Show hamburger button */
          .navbar-toggle {
            display: flex;
          }
          /* Hide menu by default */
          .navbar-menu {
            position: fixed;
            top: 56px;
            right: 0;
            height: calc(100vh - 56px);
            background-color: #1f1f1f;
            width: 220px;
            transform: translateX(100%);
            transition: transform 0.3s ease-in-out;
            flex-direction: column;
            align-items: flex-start;
            padding-top: 1.5rem;
            box-shadow: -4px 0 6px rgba(0, 0, 0, 0.3);
            overflow-y: auto;
            z-index: 1000;
          }

          .navbar-menu.open {
            transform: translateX(0);
          }

          .navbar-menu ul {
            flex-direction: column;
            width: 100%;
            gap: 0;
            margin: 0;
          }
          .navbar-menu li {
            width: 100%;
          }
          .navbar-menu a,
          .navbar-menu .login {
            width: 100%;
            padding: 14px 24px;
            font-size: 1.1rem;
            border-radius: 0;
            border-bottom: 1px solid #2e2e2e;
          }
          .navbar-menu a:hover,
          .navbar-menu .login:hover,
          .navbar-menu a.active,
          .navbar-menu .login:focus {
            background-color: #3a9061;
            color: #e6f9ea;
            outline: none;
          }
            header.navbar {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 56px;
  z-index: 1000;
}
          /* Ensure logout/login stays clickable */
          .navbar-menu .login {
            cursor: pointer;
          }
        }
      `}</style>
    </>
  )
}
