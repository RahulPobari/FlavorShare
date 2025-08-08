import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({
    title: "",
    ingredients: "",
    instructions: "",
    time: "",
    coverImage: null, // can be File (new upload) or string (existing URL)
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch existing recipe data
  useEffect(() => {
    const getData = async () => {
      try {
        const { data: res } = await axios.get(
          `https://flavorshare-zvh9.onrender.com/recipe/${id}`
        );
        setRecipeData({
          title: res.title || "",
          ingredients: Array.isArray(res.ingredients)
            ? res.ingredients.join(", ")
            : "",
          instructions: res.instructions || "",
          time: res.time || "",
          coverImage: res.coverImage || null,
        });
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    };
    getData();
  }, [id]);

  // Handle form input changes
  const onHandleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "coverImage") {
      value = e.target.files[0] || null; // File object or null if cleared
    }
    setRecipeData((prev) => ({ ...prev, [e.target.name]: value }));
  };

  // Submit updated recipe
  const onHandleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (optional, you can extend)
    if (!recipeData.title.trim()) {
      alert("Title is required");
      return;
    }
    if (!recipeData.ingredients.trim()) {
      alert("Please add at least one ingredient");
      return;
    }
    if (!recipeData.instructions.trim()) {
      alert("Instructions are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", recipeData.title.trim());
    formData.append("time", recipeData.time.trim());
    formData.append("instructions", recipeData.instructions.trim());

    // Append ingredients as multiple fields
    recipeData.ingredients
      .split(",")
      .map((i) => i.trim())
      .filter((i) => i.length > 0)
      .forEach((ingredient) => formData.append("ingredients", ingredient));

    // Append image file only if a new file is selected
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

      navigate("/myRecipe"); // Navigate after successful edit
    } catch (error) {
      console.error(
        "Error updating recipe:",
        error.response?.data || error.message
      );
      alert(
        "Failed to update recipe. " +
          (error.response?.data?.message || error.message || "Please try again.")
      );
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={onHandleSubmit} encType="multipart/form-data">
        <h2>Edit Recipe</h2>

        <div className="form-control">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={onHandleChange}
            value={recipeData.title}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="time">Time</label>
          <input
            type="text"
            id="time"
            name="time"
            onChange={onHandleChange}
            value={recipeData.time}
          />
        </div>

        <div className="form-control">
          <label htmlFor="ingredients">Ingredients (comma separated)</label>
          <textarea
            id="ingredients"
            name="ingredients"
            rows="5"
            onChange={onHandleChange}
            value={recipeData.ingredients}
            required
          ></textarea>
        </div>

        <div className="form-control">
          <label htmlFor="instructions">Instructions</label>
          <textarea
            id="instructions"
            name="instructions"
            rows="5"
            onChange={onHandleChange}
            value={recipeData.instructions}
            required
          ></textarea>
        </div>

        <div className="form-control">
          <label htmlFor="coverImage">Recipe Image</label>
          <input
            type="file"
            name="coverImage"
            id="coverImage"
            accept="image/*"
            onChange={onHandleChange}
          />
          {/* Show current image preview if coverImage is string */}
          {typeof recipeData.coverImage === "string" && recipeData.coverImage && (
            <img
              src={recipeData.coverImage}
              alt="Current recipe"
              style={{ marginTop: "10px", maxWidth: "150px", borderRadius: "8px" }}
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
