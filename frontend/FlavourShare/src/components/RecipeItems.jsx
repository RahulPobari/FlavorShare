import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import { BsStopwatchFill } from 'react-icons/bs'
import { FaHeart } from 'react-icons/fa6'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import axios from 'axios'

export default function RecipeItems() {
  const recipes = useLoaderData()
  const [allRecipes, setAllRecipes] = useState()
  const navigate = useNavigate()
  let isMyRecipesPage = window.location.pathname === '/myRecipe'
  let favItems = JSON.parse(localStorage.getItem('fav')) ?? []
  const [isFavRecipe, setIsFavRecipe] = useState(false)

  useEffect(() => {
    setAllRecipes(recipes)
  }, [recipes])

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipe/${id}`)
      setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id))
      let filterItem = favItems.filter((recipe) => recipe._id !== id)
      localStorage.setItem('fav', JSON.stringify(filterItem))
    } catch (err) {
      // Handle error if needed
      console.error('Failed to delete:', err)
    }
  }

  const favRecipe = (item) => {
    let filterItem = favItems.filter((recipe) => recipe._id !== item._id)
    favItems =
      favItems.filter((recipe) => recipe._id === item._id).length === 0
        ? [...favItems, item]
        : filterItem
    localStorage.setItem('fav', JSON.stringify(favItems))
    setIsFavRecipe((pre) => !pre)
  }

  return (
    <>
      <div className="recipe-grid">
        {allRecipes?.map((item, idx) => (
          <div
            className="recipe-card"
            key={item._id || idx}
            tabIndex={0}
            onDoubleClick={() => navigate(`/recipe/${item._id}`)}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/recipe/${item._id}`) }}
            aria-label={`View details of ${item.title}`}
            role="button"
          >
            {/* Image */}
            <div className="recipe-img-wrap" onClick={() => navigate(`/recipe/${item._id}`)}>
              <img
                src={`http://localhost:5000/images/${item.coverImage}`}
                alt={item.title}
                className="recipe-img"
                loading="lazy"
                draggable={false}
              />
            </div>
            {/* Main content */}
            <div className="recipe-body">
              <h3 className="recipe-title">{item.title}</h3>
              <div className="recipe-meta">
                <div className="recipe-timer">
                  <BsStopwatchFill />
                  <span>{item.time}</span>
                </div>
                {!isMyRecipesPage ? (
                  <button
                    className={`recipe-fav-btn${favItems.some((res) => res._id === item._id) ? " active" : ""}`}
                    onClick={() => favRecipe(item)}
                    aria-pressed={favItems.some((res) => res._id === item._id)}
                    aria-label={favItems.some(res => res._id === item._id) ? "Remove from favorites" : "Add to favorites"}
                    tabIndex={0}
                    type="button"
                  >
                    <FaHeart />
                  </button>
                ) : (
                  <div className="recipe-actions">
                    <Link to={`/editRecipe/${item._id}`} className="icon-btn edit" aria-label={`Edit ${item.title}`}>
                      <FaEdit />
                    </Link>
                    <button className="icon-btn delete" onClick={() => onDelete(item._id)} type="button" aria-label={`Delete ${item.title}`}>
                      <MdDelete />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx="true">{`
        .recipe-grid {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto 4rem auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem 2rem;
          padding: 1.2rem 0.5rem;
        }
        .recipe-card {
          background: #191a1f;
          color: #e3e7ee;
          border-radius: 16px;
          box-shadow: 0 6px 32px #0007;
          display: flex;
          flex-direction: column;
          transition: transform 0.16s, box-shadow 0.16s;
          cursor: pointer;
          outline: none;
          min-height: 340px;
        }
        .recipe-card:focus, .recipe-card:hover {
          transform: translateY(-4px) scale(1.024);
          box-shadow: 0 12px 36px #000a;
        }

        .recipe-img-wrap {
          width: 100%;
          aspect-ratio: 16/9;
          background: #23232a;
          border-top-left-radius: 16px;
          border-top-right-radius: 16px;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .recipe-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.21s;
          display: block;
        }
        .recipe-card:hover .recipe-img,
        .recipe-card:focus .recipe-img {
          transform: scale(1.04);
        }

        .recipe-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 1.2rem 1.1rem 1rem 1.1rem;
        }
        .recipe-title {
          font-size: 1.23rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          color: #9ae6b4;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          letter-spacing: 0.2px;
        }
        .recipe-meta {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.04rem;
        }
        .recipe-timer {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #93c5fd;
          font-weight: 500;
        }
        .recipe-fav-btn {
          background: none;
          border: none;
          color: #a9aab8;
          font-size: 1.24rem;
          padding: 0.25em 0.5em;
          border-radius: 100px;
          cursor: pointer;
          transition: color 0.2s, background 0.18s;
          outline: none;
        }
        .recipe-fav-btn.active, .recipe-fav-btn:focus, .recipe-fav-btn:hover {
          color: #e74c3c;
          background: #1d2822;
        }

        .recipe-actions {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .icon-btn {
          background: none;
          border: none;
          font-size: 1.13rem;
          cursor: pointer;
          padding: 0.2em 0.55em;
          border-radius: 8px;
          transition: background 0.19s, color 0.17s;
        }
        .icon-btn.edit { color: #90caf9; }
        .icon-btn.edit:hover, .icon-btn.edit:focus { color: #60a5fa; background: #20334b;}
        .icon-btn.delete { color: #ef5350; }
        .icon-btn.delete:hover, .icon-btn.delete:focus { color: #ff7961; background: #360e0e;}

        @media (max-width: 640px) {
          .recipe-grid {
            grid-template-columns: 1fr;
            gap: 1.4rem;
            padding: 1.1rem 0.3rem;
          }
          .recipe-card {
            min-height: 0;
          }
          .recipe-body { padding: 1rem 0.8rem 0.8rem 0.8rem; }
          .recipe-title { font-size: 1.07rem; margin-bottom: 0.85rem;}
          .recipe-meta { font-size: 0.98rem;}
        }
        @media (max-width: 420px) {
          .recipe-body { padding: 0.8rem 0.5rem 0.7rem 0.5rem; }
          .recipe-title { font-size: 1rem; }
        }
      `}</style>
    </>
  )
}
