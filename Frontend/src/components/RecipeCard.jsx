function RecipeCard({recipe}) {
  return (
    <div className="space-y-3 p-5 border border-gray-300 rounded-lg shadow-lg bg-white" key={recipe._id}>
        <h1 className="font-semibold text-lg text-orange-500">{recipe.title}</h1>
        <p className="">{recipe.description}</p>
            <div className="space-x-2">
            {recipe.ingredients.map((ingredient, index)=>(
                <div className=" inline-block space-x-2 m-2"  key={index} >
                    <span className="font-semibold text-sm py-1 px-2 rounded-xl bg-teal-500 text-white">{ingredient}</span>
                </div>
            ))}
            </div>
        <p className="text-gray-700">Published at - 30.11.2026</p>
    </div>
  )
}

export default RecipeCard
