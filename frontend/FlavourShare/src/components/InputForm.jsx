import React, { useState } from 'react'
import axios from 'axios'

export default function InputForm({ setIsOpen }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setError('') // Clear previous error

    let endpoint = isSignUp ? 'signUp' : 'login'

    try {
      const res = await axios.post(`https://flavorshare-zvh9.onrender.com/${endpoint}`, { email, password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setIsOpen(false)
    } catch (data) {
      setError(data.response?.data?.error || 'Something went wrong')
    }
  }

  return (
    <>
      <form className="inputform" onSubmit={handleOnSubmit} noValidate autoComplete="off">
        <h2 className="form-title">{isSignUp ? 'Sign Up' : 'Login'}</h2>

        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoFocus={!isSignUp}
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          {isSignUp ? 'Sign Up' : 'Login'}
        </button>

        {error && <p className="error">{error}</p>}

        <p className="toggle-text" onClick={() => setIsSignUp((prev) => !prev)} tabIndex={0} role="button" onKeyDown={(e) => e.key === 'Enter' && setIsSignUp((prev) => !prev)}>
          {isSignUp ? 'Already have an account? Login' : "Don't have an account? Create new account"}
        </p>
      </form>

      <style jsx="true">{`
        .inputform {
          background-color: #20232a;
          padding: 2.5rem 2rem;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.6);
          box-sizing: border-box;
          color: #e0e0e0;
          font-family: 'Poppins', Arial, sans-serif;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .form-title {
          font-size: 1.8rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 1rem;
          user-select: none;
        }

        .form-control {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        label {
          font-weight: 600;
          font-size: 1rem;
          color: #a0a0a0;
          user-select: none;
        }

        .input {
          background-color: #2b2f3a;
          border: 1.5px solid #484d5b;
          border-radius: 8px;
          padding: 0.65rem 1.1rem;
          font-size: 1rem;
          color: #eef0f5;
          outline-offset: 2px;
          outline-color: transparent;
          transition: border-color 0.3s ease, background-color 0.3s ease;
          font-family: inherit;
        }

        .input::placeholder {
          color: #6f7482;
        }

        .input:focus {
          border-color: #60a5fa;
          background-color: #1e2233;
          outline-color: #60a5fa;
        }

        .submit-btn {
          background-color: #60a5fa;
          color: #1a1a1a;
          padding: 0.9rem 0;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          user-select: none;
          box-shadow: 0 2px 16px rgba(96, 165, 250, 0.6);
          transition: background-color 0.25s ease, box-shadow 0.25s ease;
          margin-top: 0.5rem;
        }

        .submit-btn:hover,
        .submit-btn:focus {
          background-color: #3b82f6;
          box-shadow: 0 4px 22px rgba(59, 130, 246, 0.8);
          outline: none;
        }

        .error {
          color: #ef5350;
          font-size: 0.9rem;
          text-align: center;
          margin-top: 0.75rem;
          user-select: none;
        }

        .toggle-text {
          margin-top: 1rem;
          text-align: center;
          font-size: 0.95rem;
          color: #a5b4fc;
          cursor: pointer;
          user-select: none;
          transition: color 0.2s ease;
          outline: none;
        }
        .toggle-text:hover,
        .toggle-text:focus {
          color: #818cf8;
          outline-offset: 3px;
          outline: 2px solid #818cf8;
          border-radius: 4px;
        }

        /* Responsive */
        @media (max-width: 480px) {
          .inputform {
            padding: 2rem 1.3rem;
            max-width: 95vw;
          }
          .form-title {
            font-size: 1.5rem;
          }
          .submit-btn {
            font-size: 1rem;
            padding: 0.8rem 0;
          }
        }
      `}</style>
    </>
  )
}
