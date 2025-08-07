import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({})
  const navigate = useNavigate()

  const onHandleChange = (e) => {
    let val =
      e.target.name === 'ingredients'
        ? e.target.value.split(',').map(i => i.trim()).filter(Boolean)
        : e.target.name === 'file'
        ? e.target.files[0]
        : e.target.value
    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }))
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('https://flavorshare-zvh9.onrender.com/recipe', recipeData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: 'bearer ' + localStorage.getItem('token'),
        },
      })
      navigate('/')
    } catch (err) {
      console.error('Failed to add recipe:', err)
      // Optionally handle/display error here
    }
  }

  return (
    <>
      <div className="addrecipe-bg">
        <form className="addrecipe-form" onSubmit={onHandleSubmit} autoComplete="off" noValidate>
          <h2>Add New Recipe</h2>

          <div className="addrecipe-control">
            <label htmlFor="title">Title</label>
            <input type="text" name="title" id="title" onChange={onHandleChange} required />
          </div>

          <div className="addrecipe-control">
            <label htmlFor="time">Time</label>
            <input type="text" name="time" id="time" onChange={onHandleChange} required />
          </div>

          <div className="addrecipe-control">
            <label htmlFor="ingredients">Ingredients (comma separated)</label>
            <textarea
              name="ingredients"
              id="ingredients"
              rows="3"
              onChange={onHandleChange}
              placeholder="e.g. rice, onion, tomato, salt"
              required
            ></textarea>
          </div>

          <div className="addrecipe-control">
            <label htmlFor="instructions">Instructions</label>
            <textarea
              name="instructions"
              id="instructions"
              rows="4"
              onChange={onHandleChange}
              placeholder="Write each step..."
              required
            ></textarea>
          </div>

          <div className="addrecipe-control">
            <label htmlFor="file">Recipe Image</label>
            <input
              type="file"
              name="file"
              id="file"
              accept="image/*"
              onChange={onHandleChange}
              required
            />
          </div>

          <button type="submit" className="addrecipe-btn">
            Add Recipe
          </button>
        </form>
      </div>

      <style jsx="true">{`
        /* Reset and base fonts */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', Arial, Helvetica, sans-serif;
        }
        /* Background and centering wrapper */
        .addrecipe-bg {
          min-height: 100vh;
          background: #15161a;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 1rem;
        }
        /* Form container */
        .addrecipe-form {
          background: #20222b;
          width: 100%;
          max-width: 420px;
          border-radius: 16px;
          box-shadow: 0 4px 24px #0008;
          padding: 2.4rem 1.5rem 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          color: #f5f5fa;
        }
        /* Heading */
        .addrecipe-form h2 {
          margin-bottom: 1.2rem;
          color: #f5f5fa;
          text-align: center;
          font-weight: 600;
          font-size: 2rem;
          letter-spacing: 1px;
        }
        /* Form group */
        .addrecipe-control {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        /* Label */
        .addrecipe-control label {
          color: #b6bbce;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 3px;
          user-select: none;
        }
        /* Inputs and textareas */
        .addrecipe-control input[type='text'],
        .addrecipe-control textarea {
          background: #23242c;
          border: 1px solid #383a44;
          border-radius: 8px;
          padding: 0.75em 1.1em;
          font-size: 1rem;
          color: #f5f5fa;
          outline-offset: 2px;
          outline-color: transparent;
          transition: border-color 0.3s ease;
        }
        .addrecipe-control input[type='text']:focus,
        .addrecipe-control textarea:focus {
          border-color: #4caf50;
          outline-color: #4caf50;
        }
        /* Textarea resize */
        .addrecipe-control textarea {
          resize: vertical;
          min-height: 70px;
          max-height: 240px;
        }
        /* File input */
        .addrecipe-control input[type='file'] {
          background: #22232b;
          color: #bacac7;
          padding: 8px 6px;
          border-radius: 8px;
          font-size: 1rem;
          border: 1px solid #3334;
          cursor: pointer;
          transition: border-color 0.3s ease;
        }
        .addrecipe-control input[type='file']:focus {
          border-color: #4caf50;
          outline-color: #4caf50;
          outline-offset: 2px;
        }
        /* Submit button */
        .addrecipe-btn {
          margin-top: 0.8rem;
          background: #4caf50;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 0.95rem 1.1rem;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: 0.6px;
          cursor: pointer;
          transition: background 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 12px #0008;
          user-select: none;
        }
        .addrecipe-btn:hover,
        .addrecipe-btn:focus,
        .addrecipe-btn:active {
          background: #388e3c;
          box-shadow: 0 6px 14px #1b3b11;
          outline: none;
        }

        /* Responsive adjustment */
        @media (max-width: 520px) {
          .addrecipe-form {
            max-width: 97vw;
            padding: 1.8rem 1rem 1.6rem 1rem;
            border-radius: 12px;
          }
          .addrecipe-form h2 {
            font-size: 1.5rem;
          }
          .addrecipe-control label {
            font-size: 0.9rem;
          }
          .addrecipe-control input[type='text'],
          .addrecipe-control textarea,
          .addrecipe-control input[type='file'] {
            font-size: 0.94rem;
            padding: 0.6em 0.9em;
          }
          .addrecipe-btn {
            font-size: 1.0rem;
            padding: 0.8rem 1rem;
          }
        }
      `}</style>
    </>
  )
}
