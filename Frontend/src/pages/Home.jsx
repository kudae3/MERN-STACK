import { useEffect, useState } from "react"
import RecipeCard from "../components/RecipeCard";
import api from "../../axios.config.js";
import { useLocation } from "react-router";
import Pagination from "../components/Pagination.jsx";

function Home() {

  let [recipes, setRecipes] = useState([]);
  let [totalPages, setTotalPages] = useState(1);
  let location = useLocation();
  let currentPage = new URLSearchParams(location.search).get('page') || 1;

  useEffect(() => {
    let fetchRecipes = async() => {
      let res = await api.get('/recipes?page='+currentPage);      
      setRecipes(res.data.recipes);
      setTotalPages(res.data.totalPages);
    }
    fetchRecipes();
  }, [currentPage])

  return (
    <>
        <div className="md:max-w-2xl lg:max-w-4xl mx-auto space-y-3">
          {
            recipes && recipes.map((recipe)=>(
              <RecipeCard key={recipe._id} recipe={recipe}/>
            ))
          }
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages}/>
    </>
  )
}

export default Home
