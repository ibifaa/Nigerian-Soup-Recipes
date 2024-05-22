import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages

import ViewRecipes from "./pages/ViewRecipes";
import CreateRecipe from "./pages/CreateRecipe";
import UpdateRecipe from "./pages/UpdateRecipe";


function App() {
  return (
    <BrowserRouter>
      <nav>
        <h1>Nigerian Soup Recipes</h1>
        <Link to="/">Home</Link>
        <Link to="/create-recipe">Create New Recipe</Link>
        <Link to="/update">Update Recipe</Link>
      </nav>
      <Routes>
        <Route path="/" element={<ViewRecipes />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/:id" element={<UpdateRecipe />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
