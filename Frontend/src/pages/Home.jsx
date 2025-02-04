import { useEffect, useState } from "react"
import RecipeCard from "../components/RecipeCard";
import api from "../../axios.config.js";

function Home() {

  let [recipes, setRecipes] = useState([]);

  useEffect(() => {
    let fetchRecipes = async() => {
      let res = await api.get('/recipes');
      setRecipes(res.data);
    }
    fetchRecipes();
  }, [])

  return (
    <div className="md:max-w-2xl lg:max-w-4xl mx-auto space-y-3">
      {
        recipes && recipes.map((recipe)=>(
          <RecipeCard key={recipe._id} recipe={recipe}/>
        ))
      }
    </div>
  )
}

export default Home
