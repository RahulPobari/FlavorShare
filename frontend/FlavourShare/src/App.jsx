import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'

// Central backend base URL
const BACKEND_URL = 'https://flavorshare-zvh9.onrender.com'

const getAllRecipes = async () => {
  const res = await axios.get(`${BACKEND_URL}/recipe`)
  return res.data
}

const getMyRecipes = async () => {
  const user = JSON.parse(localStorage.getItem('user')) || {}
  const allRecipes = await getAllRecipes()
  return allRecipes.filter(item => item.createdBy === user._id)
}

const getFavRecipes = () => {
  const favs = JSON.parse(localStorage.getItem('fav'))
  return favs ?? []
}

const getRecipe = async ({ params }) => {
  const recipeRes = await axios.get(`${BACKEND_URL}/recipe/${params.id}`)
  let recipe = recipeRes.data

  if (recipe.createdBy) {
    try {
      const userRes = await axios.get(`${BACKEND_URL}/user/${recipe.createdBy}`)
      recipe = { ...recipe, email: userRes.data.email }
    } catch (error) {
      console.error('Failed to fetch user email:', error)
      // Fail gracefully, leave email undefined or null
      recipe = { ...recipe, email: null }
    }
  } else {
    // No createdBy, set email to null or handle accordingly
    recipe = { ...recipe, email: null }
  }

  return recipe
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainNavigation />,
    children: [
      { path: '/', element: <Home />, loader: getAllRecipes },
      { path: '/myRecipe', element: <Home />, loader: getMyRecipes },
      { path: '/favRecipe', element: <Home />, loader: getFavRecipes },
      { path: '/addRecipe', element: <AddFoodRecipe /> },
      { path: '/editRecipe/:id', element: <EditRecipe /> },
      { path: '/recipe/:id', element: <RecipeDetails />, loader: getRecipe },
    ],
  },
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* Global styles */}
      <style jsx="true">{`
        * {
          box-sizing: border-box;
        }
        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          height: 100%;
          width: 100vw;
          min-width: 320px;
          background: #121212;
          color: #e5e5e5;
          font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overflow-x: hidden;
        }
        /* Modern scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #1c1c1c;
        }
        ::-webkit-scrollbar-thumb {
          background: #4ade80;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #22c55e;
        }
      `}</style>
    </>
  )
}
