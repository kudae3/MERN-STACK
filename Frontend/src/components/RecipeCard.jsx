function RecipeCard({recipe}) {
  return (
    <div className="space-y-3 p-5 border border-gray-300 rounded-lg shadow-lg bg-white" key={recipe._id}>
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
  )
}

export default RecipeCard
