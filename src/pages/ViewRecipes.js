import { useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import RecipesCard from "../components/RecipesCard";
import "../index.css";
import Header from "../components/Header";

const ViewRecipes = () => {
  const [recipes, setRecipes] = useState(null);
  const [error, setError] = useState(null);
  const [orderBy, setOrderBy] = useState("created_at");

  const handleDelete = (id) => {
    setRecipes((prevRecipes) => {
      return prevRecipes.filter((sm) => sm.id !== id);
    });
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      const { data, error } = await supabase
        .from("recipes")
        .select()
        .order(orderBy, { ascending: false });

      if (error) {
        setError("Could not fetch data");
        setRecipes(null);
        console.log(error.message);
      }
      if (data) {
        console.log(data);
        setRecipes(data);
        setError(null);
      }
    };
    fetchRecipes();
  }, [orderBy]);

  return (
    <div className="page ViewRecipes bg-gray-100 pb-[20px] ">
      <Header/>
      <div className="flex items-center gap-[10px] justify-center">
        {/* <p className="text-red-500 text-center">Order by</p> */}
        <div className=" flex justify-center gap-[20px]  py-[20px]">
          {" "}
          <button
            className="bg-red-600 px-[20px] py-[5px] text-[1.2rem] text-white rounded-xl"
            onClick={() => setOrderBy("created-at")}
          >
            Time Created
          </button>
          <button
            className="bg-red-600 px-[20px] py-[5px] text-[1.2rem] text-white rounded-xl"
            onClick={() => setOrderBy("name")}
          >
            Name
          </button>
          <button
            className="bg-red-600 px-[20px] py-[5px] text-[1.2rem] text-white rounded-xl"
            onClick={() => setOrderBy("rating")}
          >
            Rating
          </button>
        </div>
      </div>

      {error && <p>{error}</p>}
      {recipes && (
        <div className="grid grid-cols-3 items-center align-middle gap-[20px] px-[30px]">
          {recipes.map((recipe, index) => (
            <div className="bg-white rounded-xl shadow-lg" key={index}>
              <RecipesCard recipe={recipe} onDelete={handleDelete} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewRecipes;
