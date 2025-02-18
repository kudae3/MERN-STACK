import { Link } from "react-router";
import dayjs from "dayjs";
import Boy from '../assets/Boy.jpg'

function RecipeCard({ recipe, deleteRecipe }) {
  return (
    <div className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-xs hover:[animation-duration:_4s]">
      <div className="rounded-[10px] bg-white p-4 sm:p-6">
        <div className="!pb-14">
          <time className="block text-xs text-gray-500">
            {dayjs(recipe.createdAt).format("MMMM D, YYYY")}
          </time>
          
          <div>
            <img className="rounded-lg border my-3 size-32" src={Boy} alt="" />
          </div>
          
          <h3 className="mt-0.5 text-lg font-medium text-gray-900">
            {recipe.title}
          </h3>
          <p className="mt-0.5 font-normal text-gray-900">
            {recipe.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-1">
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <span
                  key={index}
                  className="rounded-full bg-purple-100 px-2.5 py-0.5 text-xs whitespace-nowrap text-purple-600"
                >
                  {ingredient}
                </span>
              );
            })}
          </div>
        </div>
        
          <div className="space-x-2 text-right">
            
            <Link
              to={`/edit/${recipe._id}`}
              className="group relative inline-flex items-center overflow-hidden rounded-lg border border-current px-2 py-1 text-indigo-600 focus:ring-3 focus:outline-hidden"
            >
              <span className="absolute -end-full transition-all group-hover:end-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
              </svg>
              </span>
              <span className="text-sm font-medium transition-all group-hover:me-4">
                Edit
              </span>
            </Link>
            
            <Link
              onClick={()=>deleteRecipe(recipe._id)}
              className="group relative inline-flex items-center overflow-hidden rounded-lg border border-current px-2 py-1 text-red-600 focus:ring-3 focus:outline-hidden"
            >
              <span className="absolute -end-full transition-all group-hover:end-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </span>
              <span className="text-sm font-medium transition-all group-hover:me-4">
                Delete
              </span>
            </Link>
          
          </div>
       
      </div>
    </div>
  );
}

export default RecipeCard;
