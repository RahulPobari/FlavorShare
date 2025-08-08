import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    coverImage: null, // can be File or string (URL)
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch existing recipe
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: res } = await axios.get(
          `https://flavorshare-zvh9.onrender.com/recipe/${id}`
        );
        setRecipeData({
          title: res.title,
          ingredients: Array.isArray(res.ingredients)
            ? res.ingredients.join(",")
            : "",
          instructions: res.instructions,
          time: res.time || "",
          coverImage: res.coverImage || null,
        });
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    };
    getData();
  }, [id]);

  // Handle form changes
  const onHandleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "coverImage") {
      value = e.target.files[0]; // File object
    }
    setRecipeData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  // Submit form
  const onHandleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", recipeData.title);
    formData.append("time", recipeData.time);
    formData.append("instructions", recipeData.instructions);

    // Split ingredients into an array and append each
    recipeData.ingredients
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i)
      .forEach((ingredient) => formData.append("ingredients", ingredient));

    // Only append image if a new file is selected
    if (recipeData.coverImage instanceof File) {
      formData.append("coverImage", recipeData.coverImage);
    }

    try {
      await axios.put(
        `https://flavorshare-zvh9.onrender.com/recipe/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      navigate("/myRecipe");
    } catch (error) {
      console.error(
        "Error updating recipe:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={onHandleSubmit}>
        <h2>Edit Recipe</h2>

        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            name="title"
            onChange={onHandleChange}
            value={recipeData.title}
          />
        </div>

        <div className="form-control">
          <label>Time</label>
          <input
            type="text"
            name="time"
            onChange={onHandleChange}
            value={recipeData.time}
          />
        </div>

        <div className="form-control">
          <label>Ingredients (comma separated)</label>
          <textarea
            name="ingredients"
            rows="5"
            onChange={onHandleChange}
            value={recipeData.ingredients}
          ></textarea>
        </div>

        <div className="form-control">
          <label>Instructions</label>
          <textarea
            name="instructions"
            rows="5"
            onChange={onHandleChange}
            value={recipeData.instructions}
          ></textarea>
        </div>

        <div className="form-control">
          <label>Recipe Image</label>
          <input type="file" name="coverImage" onChange={onHandleChange} />
          {typeof recipeData.coverImage === "string" && (
            <img
              src={recipeData.coverImage}
              alt="Current"
              style={{ marginTop: "10px", maxWidth: "150px" }}
            />
          )}
        </div>

        <button type="submit">Update Recipe</button>
      </form>

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
    </div>
  );
}
