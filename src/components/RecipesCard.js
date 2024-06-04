import React from 'react'
import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient';


function RecipesCard({recipe, onDelete}) {

  const deleteRecipe = async()=>{
    const {data, error} = await supabase
    .from("recipes")
    .delete()
    .eq("id", recipe.id)
    .select()

    if(error){
      console.log(error)
    }

    if(data){
      console.log(data) 
      onDelete(recipe.id);
    }
  
   
  }

  
  return (
    <div className='relative p-5'>
      {/* <img src={recipe.image} alt='food' /> */}
      <h3>{recipe.name}</h3>
      <h4>Instructions</h4>
      <p>{recipe.instruction}</p>
      <p className='absolute top-0 text-center bg-red-600 p-2 rounded-lg text-white right-0 w-[50px]'>{recipe.rating}</p>
      <Link to={"/"+recipe.id}>
        <i className='materialIcons' > Edit</i>
      </Link>
      <p onClick={deleteRecipe}>Delete</p>
      </div>
  )
}

export default RecipesCard
