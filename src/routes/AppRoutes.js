import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateRecipe from '../pages/CreateRecipe';
import Login from '../pages/Login';
import ViewRecipes from "../pages/ViewRecipes"
// import Header from '../components/Header';
import UpdateRecipe from '../pages/UpdateRecipe';
import Register from '../pages/Register';


function AppRoutes() {
  return (
    <div>
      <Router>
        {/* <Header/> */}
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/view-recipes" element={<ViewRecipes />} />
            <Route path="/create-recipes" element={<CreateRecipe />} />
            <Route path="/:id" element={<UpdateRecipe />} />
            <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  )
}

export default AppRoutes
