import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      await axios.get(`http://localhost:5000/recipe/${id}`)
        .then(response => {
          const res = response.data
          setRecipeData({
            title: res.title,
            ingredients: res.ingredients.join(","),
            instructions: res.instructions,
            time: res.time
          })
        })
    }
    getData()
  }, [id])

  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients" ? e.target.value.split(",") :
      e.target.name === "file" ? e.target.files[0] :
      e.target.value

    setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    await axios.put(`http://localhost:5000/recipe/${id}`, recipeData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'authorization': 'bearer ' + localStorage.getItem("token")
      }
    })
    navigate("/myRecipe")
  }

  return (
    <>
      <div className='container'>
        <form className='form' onSubmit={onHandleSubmit}>
          <h2>Edit Recipe</h2>

          <div className='form-control'>
            <label>Title</label>
            <input type="text" name="title" onChange={onHandleChange} value={recipeData.title || ''} />
          </div>

          <div className='form-control'>
            <label>Time</label>
            <input type="text" name="time" onChange={onHandleChange} value={recipeData.time || ''} />
          </div>

          <div className='form-control'>
            <label>Ingredients</label>
            <textarea name="ingredients" rows="5" onChange={onHandleChange} value={recipeData.ingredients || ''}></textarea>
          </div>

          <div className='form-control'>
            <label>Instructions</label>
            <textarea name="instructions" rows="5" onChange={onHandleChange} value={recipeData.instructions || ''}></textarea>
          </div>

          <div className='form-control'>
            <label>Recipe Image</label>
            <input type="file" name="file" onChange={onHandleChange} />
          </div>

          <button type="submit">Update Recipe</button>
        </form>
      </div>

      <style jsx>{`
        .container {
          max-width: 700px;
          margin: 3rem auto;
          padding: 2rem;
          background-color: #1e1e1e;
          color: #f5f5f5;
          border-radius: 12px;
          box-shadow: 0 0 25px rgba(0, 0, 0, 0.3);
        }

        .form h2 {
          text-align: center;
          margin-bottom: 2rem;
        }

        .form-control {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
        }

        .form-control label {
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-control input,
        .form-control textarea {
          background-color: #2a2a2a;
          border: 1px solid #444;
          color: #f5f5f5;
          border-radius: 8px;
          padding: 0.75rem;
        }

        button {
          width: 100%;
          padding: 0.75rem;
          background-color: #4ade80;
          border: none;
          border-radius: 8px;
          color: #1e1e1e;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        button:hover {
          background-color: #22c55e;
        }
      `}</style>
    </>
  )
}
