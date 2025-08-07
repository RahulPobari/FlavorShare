import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      await axios.get(`https://flavorshare-zvh9.onrender.com/recipe/${id}`)
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
      e.target.name === "coverImage" ? e.target.files[0] :
      e.target.value

    setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
  }

 const onHandleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("title", recipeData.title);
  formData.append("time", recipeData.time);
  formData.append("ingredients", Array.isArray(recipeData.ingredients) ? recipeData.ingredients.join(",") : recipeData.ingredients);
  formData.append("instructions", recipeData.instructions);

  if (recipeData.coverImage instanceof File) {
    formData.append("coverImage", recipeData.coverImage);
  }

  try {
    await axios.put(`https://flavorshare-zvh9.onrender.com/recipe/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });

    navigate("/myRecipe");
  } catch (error) {
    console.error("Error updating recipe:", error.response?.data || error.message);
  }
};


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
            <input type="file" name="coverImage" onChange={onHandleChange} />
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
