import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'

import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'

const getAllRecipes = async () => {
  let allRecipes = []
  await axios.get('https://flavorshare-zvh9.onrender.com/recipe').then(res => {
    allRecipes = res.data
  })
  return allRecipes
}

const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem('user'))
  let allRecipes = await getAllRecipes()
  return allRecipes.filter(item => item.createdBy === user._id)
}

const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem('fav'))
}

const getRecipe = async ({ params }) => {
  let recipe
  await axios.get(`http://localhost:5000/recipe/${params.id}`).then(res => {
    recipe = res.data
  })

  await axios.get(`http://localhost:5000/user/${recipe.createdBy}`).then(res => {
    recipe = { ...recipe, email: res.data.email }
  })

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

        /* Make the base content use full width;
           individual page sections (Home, RecipeItems, forms) can be boxed with max-width if needed. */

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
