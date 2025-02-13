function RecipeCard({recipe, deleteRecipe}) {
    
  return (
    <div className=" flex justify-between p-5 border border-gray-300 rounded-lg shadow-lg bg-white" key={recipe._id}>
        <div className="space-y-3">
          <h1 className="font-semibold text-lg text-orange-500">{recipe.title}</h1>
          <p className="">{recipe.description}</p>
          <div className="flex gap-2 flex-wrap">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index}>
                <div className="font-semibold text-sm py-1 px-2 max-w-fit rounded-xl bg-teal-500 text-white">
                  {ingredient}
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-700">Published at - 30.11.2026</p>
        </div>
        <div>
          <button onClick={()=>deleteRecipe(recipe._id)} className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 duration-300">Delete</button>
        </div>
    </div>
  )
}

export default RecipeCard
