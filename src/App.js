import { BrowserRouter, Routes, Route, Link } from "react-router-dom"

// pages

import ViewRecipes from "./pages/ViewRecipes";
import CreateRecipe from "./pages/CreateRecipe";
import UpdateRecipe from "./pages/UpdateRecipe";
import AppRoutes from "./routes/AppRoutes";


function App() {
  return (
  <AppRoutes/>
  );
}

export default App;
