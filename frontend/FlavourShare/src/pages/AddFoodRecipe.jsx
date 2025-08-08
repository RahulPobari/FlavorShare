import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({
    title: '',
    time: '',
    ingredients: '',
    instructions: '',
    coverImage: null,
  })
  const navigate = useNavigate()

  const onHandleChange = (e) => {
    const { name, value, files } = e.target
    setRecipeData((prev) => ({
      ...prev,
      [name]: name === 'coverImage' ? files[0] : value,
    }))
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title', recipeData.title)
    formData.append('time', recipeData.time)
    formData.append('instructions', recipeData.instructions)

    // split ingredients into array
    recipeData.ingredients
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean)
      .forEach((item) => {
        formData.append('ingredients', item)
      })

    if (recipeData.coverImage) {
      formData.append('coverImage', recipeData.coverImage) // must match multer config
    }

    try {
      await axios.post(
        'https://flavorshare-zvh9.onrender.com/recipe',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      )

      // Reset form and navigate
      setRecipeData({
        title: '',
        time: '',
        ingredients: '',
        instructions: '',
        coverImage: null,
      })
      navigate('/')
    } catch (err) {
      console.error('Failed to add recipe:', err.response?.data || err.message)
    }
  }

  return (
    <>
    <div className="addrecipe-bg">
      <form className="addrecipe-form" onSubmit={onHandleSubmit} autoComplete="off" noValidate>
        <h2>Add New Recipe</h2>

        <div className="addrecipe-control">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" value={recipeData.title} onChange={onHandleChange} required />
        </div>

        <div className="addrecipe-control">
          <label htmlFor="time">Time</label>
          <input type="text" name="time" id="time" value={recipeData.time} onChange={onHandleChange} required />
        </div>

        <div className="addrecipe-control">
          <label htmlFor="ingredients">Ingredients (comma separated)</label>
          <textarea
            name="ingredients"
            id="ingredients"
            rows="3"
            value={recipeData.ingredients}
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
            value={recipeData.instructions}
            onChange={onHandleChange}
            placeholder="Write each step..."
            required
          ></textarea>
        </div>

        <div className="addrecipe-control">
          <label htmlFor="coverImage">Recipe Image</label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
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
        /* Your existing styles remain unchanged */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', Arial, Helvetica, sans-serif;
        }
        .addrecipe-bg {
          min-height: 100vh;
          background: #15161a;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem 1rem;
        }
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
        .addrecipe-form h2 {
          margin-bottom: 1.2rem;
          color: #f5f5fa;
          text-align: center;
          font-weight: 600;
          font-size: 2rem;
          letter-spacing: 1px;
        }
        .addrecipe-control {
          display: flex;
          flex-direction: column;
          gap: 0.45rem;
        }
        .addrecipe-control label {
          color: #b6bbce;
          font-weight: 600;
          font-size: 1rem;
          margin-bottom: 3px;
          user-select: none;
        }
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
        .addrecipe-control textarea {
          resize: vertical;
          min-height: 70px;
          max-height: 240px;
        }
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
