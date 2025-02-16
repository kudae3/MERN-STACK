import { useEffect, useState } from "react"
import RecipeCard from "../components/RecipeCard";
import api from "../../axios.config.js";
import { Link, useNavigate, useSearchParams } from "react-router";
import Pagination from "../components/Pagination.jsx";

function Home() {

  let [recipes, setRecipes] = useState([]);
  let [totalPages, setTotalPages] = useState(1);
  
  // let location = useLocation();
  // let currentPage = new URLSearchParams(location.search).get('page') || 1;
  
  let [searchParams] = useSearchParams();
  let currentPage = searchParams.get('page') || 1;
  let [errors, setErrors] = useState();
  
  let navigate = useNavigate();

  useEffect(() => {
    let fetchRecipes = async() => {
      try {
        let res = await api.get('/recipes?page='+currentPage);      
        setRecipes(res.data.recipes);
        setTotalPages(res.data.totalPages);
      } catch (e) { 
        setErrors(e.response);
      }
    }
    fetchRecipes();
  }, [currentPage])

  const deleteRecipe = async(id) => {
    if(!window.confirm('Are you sure you want to delete this recipe?')) return;
    await api.delete('/recipes/'+id);
    
    if(recipes.length === 1 && currentPage > 1){
      navigate('/?page='+(currentPage-1));
    }
    else{
      setRecipes(prev => prev.filter(recipe => recipe._id !== id));
    }
  }

  return (
    <>
        <div className="md:max-w-2xl lg:max-w-4xl mx-auto space-y-3">
          {errors && errors.status == 400 && <p className="text-red-500 text-center font-semibold py-4">You need to <Link className="underline hover:text-orange-600 duration-300" to="/login">log in</Link> first to view this page</p>}
          {errors && errors.status == 401 && <p className="text-red-500 text-center font-semibold py-4">Your credentials do not match our records. Please <Link className="underline hover:text-orange-600 duration-300" to="/login">log in</Link> again</p>}
          {errors && errors.status == 404 && <p className="text-red-500 text-center font-semibold py-4">Something Went Wrong! Please <Link className="underline hover:text-orange-600 duration-300" to="/login">log in</Link> again</p>}          
          {
            recipes && recipes.map((recipe)=>(
              <RecipeCard key={recipe._id} recipe={recipe} deleteRecipe={deleteRecipe}/>
            ))
          }
        </div>
        {!errors && <Pagination currentPage={currentPage} totalPages={totalPages}/>}
    </>
  )
}

export default Home
