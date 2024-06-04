import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div>
        <nav className="shadow-lg bg-white text-[#12bca2] text-center p-5 mb-[20px] bg-gray-100">
        <h1 className="text-[2rem]">Nigerian Recipes</h1>
        <div className="flex justify-center gap-[20px] ">
          
        <Link className="text-[1rem] " to="/create-recipes">Create Recipe</Link>
        <Link className="text-[1rem] " to="/view-recipes">View Recipe</Link>

        </div>
      </nav>
      
    </div>
  )
}

export default Header
