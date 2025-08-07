import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'

export default function Home() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)

  const addRecipe = () => {
    let token = localStorage.getItem("token")
    if (token) navigate("/addRecipe")
    else setIsOpen(true)
  }

  return (
    <>
      {/* Hero Section */}
      <main className="home-hero-bg">
        <section className="home-hero-wrapper">
          <div className="home-hero-col home-hero-img-col">
            <img
              src={foodRecipe}
              alt="Delicious food dish"
              className="home-hero-img"
              loading="lazy"
              draggable={false}
            />
          </div>
          <div className="home-hero-col home-hero-textblock">
            <h1 className="home-hero-title" aria-label="Discover and Share Recipes">
              <span role="img" aria-label="plate">🍽️</span>
              <span className="home-green"> Discover&nbsp;</span>
              <span>&amp;&nbsp;</span>
              <span className="home-blue">Share Recipes</span>
            </h1>
            <p className="home-hero-desc">
              Your place to explore, create and share your best home-cook or chef-special recipes.<br /><br />
              <span className="home-hero-sub">
                Whether you're a budding foodie or a master chef, join our community and showcase your culinary passion.
              </span>
            </p>
            <button className="home-hero-btn" onClick={addRecipe}>
              + Share a Recipe
            </button>
          </div>
        </section>
      </main>

      {/* Modal */}
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}

      {/* Latest Recipes Section */}
      <section className="home-latest-sec">
        <h2 className="home-latest-title">🍳 Latest Recipes</h2>
        <RecipeItems />
      </section>

      {/* Styles */}
      <style jsx="true">{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', Arial, Helvetica, sans-serif;
        }

        html, body {
          width: 100vw;
          max-width: 100vw;
          overflow-x: hidden;
          background: #121212;
        }

        /* Main hero background full width & height */
        .home-hero-bg {
          min-height: 100vh;
          background: #181a20;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .home-hero-wrapper {
          width: 100%;
          max-width: 1260px;
          margin: 0 auto;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 4vw;
          padding: 0 3vw;
        }
        .home-hero-col {
          flex: 1 1 0;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .home-hero-img-col {
          align-items: center;
          justify-content: center;
        }
        .home-hero-img {
          width: min(370px, 35vw);
          max-width: 100%;
          height: auto;
          border-radius: 18px;
          border: 3px solid #232835;
          box-shadow: 0 8px 28px rgba(0,0,0,0.43);
          object-fit: cover;
          background: #222;
          user-select: none;
          display: block;
        }
        .home-hero-img:hover {
          transform: scale(1.04) rotate(-1.3deg);
          transition: transform 0.22s cubic-bezier(.4,1.15,.7,1.04);
        }

        .home-hero-textblock {
          align-items: flex-start;
          justify-content: center;
        }
        .home-hero-title {
          font-weight: 700;
          font-size: 2.8rem;
          letter-spacing: 1.1px;
          color: #fff;
          margin-bottom: 1.1rem;
          line-height: 1.20;
          user-select: none;
        }
        .home-green { color: #85e8b7; }
        .home-blue  { color: #60a5fa; }
        .home-hero-desc {
          font-size: 1.2rem;
          color: #e3e3e3;
          line-height: 1.6;
          max-width: 530px;
          margin-bottom: 1.5rem;
        }
        .home-hero-sub {
          color: #a3a3a3;
          font-weight: 400;
          font-size: 1.03rem;
        }
        .home-hero-btn {
          background: #23272f;
          color: #a7f3d0;
          border: none;
          padding: 0.9rem 2.4rem;
          font-size: 1.13rem;
          font-weight: 600;
          cursor: pointer;
          border-radius: 10px;
          box-shadow: inset 0 1px 0 #101215;
          transition: background 0.18s, color 0.19s, transform 0.13s;
        }
        .home-hero-btn:hover, .home-hero-btn:focus {
          background: #252e21;
          color: #7ee7a1;
          transform: translateY(-2px) scale(1.04);
        }

        /* Recipes section */
        .home-latest-sec {
          background: #15171c;
          width: 100vw;
          max-width: 100vw;
          box-sizing: border-box;
          padding: 3.6rem 1rem 5rem 1rem;
          color: #f0f0f0;
          text-align: center;
        }
        .home-latest-title {
          font-size: 2rem;
          font-weight: 600;
          margin-bottom: 2rem;
          color: #76a7e8;
          letter-spacing: 0.9px;
        }

        /* -------------- RESPONSIVE for mobile --------------- */
        @media (max-width: 800px) {
          .home-hero-wrapper {
            flex-direction: column;
            align-items: center;
            gap: 2.2rem;
            max-width: 100vw;
            padding: 0 0.5rem;
          }
          .home-hero-col, .home-hero-img-col {
            align-items: center;
            justify-content: center;
            width: 100%;
          }
          .home-hero-textblock {
            align-items: center;
            text-align: center;
            width: 100%;
          }
          .home-hero-img { width: 90vw; max-width: 290px; }
          .home-hero-title { font-size: 1.45rem; }
          .home-hero-desc { font-size: 1.01rem; }
          .home-hero-btn { padding: 0.82rem 2rem; font-size: 1rem; max-width: 270px; width: 100%; }
          .home-latest-sec { padding: 2.5rem 0.2rem 3rem 0.2rem; }
          .home-latest-title { font-size: 1.25rem; }
        }

        @media (max-width: 420px) {
          .home-hero-img { max-width: 96vw; width: 198px; }
          .home-hero-title { font-size: 1rem; }
          .home-hero-desc { font-size: 0.85rem; }
          .home-hero-btn { font-size: 0.92rem; padding: 0.7rem 0; }
          .home-latest-title { font-size: 0.97rem; }
        }
      `}</style>
    </>
  )
}
