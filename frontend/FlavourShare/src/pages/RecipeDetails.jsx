import React from 'react'
import profileImg from '../assets/profile.png'
import { useLoaderData } from 'react-router-dom'

export default function RecipeDetails() {
  const recipe = useLoaderData()

  return (
    <>
      <div className="outer-container">
        <div className="profile">
          <img src={profileImg} width="50" height="50" alt="Profile" />
          <h5>{recipe.email}</h5>
        </div>

        <h3 className="title">{recipe.title}</h3>

        <div className="image-wrapper">
          <img
            src={`http://localhost:5000/images/${recipe.coverImage}`}
            alt={recipe.title}
            loading="lazy"
            width="100%"
          />
        </div>

        <div className="recipe-details">
          <section className="ingredients">
            <h4>Ingredients</h4>
            <ul>
              {recipe.ingredients.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="instructions">
            <h4>Instructions</h4>
            <p>{recipe.instructions}</p>
          </section>
        </div>
      </div>

      <style jsx="true">{`
        .outer-container {
          max-width: 700px;
          margin: 2.5rem auto 3.5rem;
          background-color: #1f1f1f;
          color: #f1f1f1;
          padding: 2.4rem 2.4rem 2.8rem;
          border-radius: 14px;
          box-shadow: 0 0 28px rgba(0, 0, 0, 0.5);
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          gap: 1.8rem;
        }

        /* Profile */
        .profile {
          display: flex;
          align-items: center;
          gap: 1.2rem;
          margin-bottom: 1rem;
        }
        .profile img {
          border-radius: 50%;
          object-fit: cover;
          border: 2.5px solid #4ade80;
        }
        .profile h5 {
          font-size: 1rem;
          font-weight: 600;
          color: #a7f3d0;
          user-select: text;
          overflow-wrap: anywhere;
        }

        /* Title */
        .title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1.6rem;
          text-align: center;
          color: #adefd1;
          user-select: text;
          letter-spacing: 0.02em;
        }

        /* Image styling */
        .image-wrapper {
          width: 100%;
          max-height: 310px;
          overflow: hidden;
          border-radius: 14px;
          box-shadow: 0 6px 24px rgba(0, 0, 0, 0.6);
          background-color: #222;
        }
        .image-wrapper img {
          width: 100%;
          height: auto;
          object-fit: cover;
          transition: transform 0.3s ease;
          display: block;
          user-select: none;
        }
        .image-wrapper img:hover,
        .image-wrapper img:focus {
          transform: scale(1.05);
          outline: none;
        }

        /* Recipe details layout */
        .recipe-details {
          display: flex;
          flex-direction: column;
          gap: 2.4rem;
        }

        section {
          user-select: text;
        }

        h4 {
          font-size: 1.3rem;
          font-weight: 700;
          color: #4ade80;
          margin-bottom: 0.7rem;
          letter-spacing: 0.04em;
          user-select: none;
          border-bottom: 1.2px solid #4ade80;
          padding-bottom: 0.25rem;
          width: fit-content;
        }

        /* Ingredients list */
        .ingredients ul {
          padding-left: 1.4rem;
          list-style-type: disc;
          color: #d3d6db;
          line-height: 1.5;
          max-height: 220px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: #4ade80 transparent;
        }
        .ingredients ul::-webkit-scrollbar {
          width: 6px;
        }
        .ingredients ul::-webkit-scrollbar-thumb {
          background-color: #4ade80;
          border-radius: 3px;
        }
        .ingredients li {
          margin-bottom: 0.5rem;
          font-size: 1.05rem;
        }

        /* Instructions */
        .instructions p {
          font-size: 1.1rem;
          line-height: 1.65;
          color: #cfd2d8;
          white-space: pre-wrap;
          word-wrap: break-word;
        }

        /* Responsive adjustments */
        @media (max-width: 780px) {
          .outer-container {
            max-width: 90vw;
            padding: 1.8rem 1.6rem;
            margin: 2rem auto 3rem;
          }
          .title {
            font-size: 1.7rem;
          }
          h4 {
            font-size: 1.1rem;
          }
          .ingredients li {
            font-size: 1rem;
          }
          .instructions p {
            font-size: 1rem;
          }
        }

        @media (max-width: 400px) {
          .profile h5 {
            font-size: 0.9rem;
          }
          .title {
            font-size: 1.5rem;
            margin-bottom: 1rem;
          }
          h4 {
            font-size: 1rem;
          }
          .ingredients li,
          .instructions p {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </>
  )
}
