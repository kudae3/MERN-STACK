import { useState } from "react";

function Create() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);

    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false)
    const [ingredientError, setIngredientError] = useState(false)
    const [invalideInput, setInvalidInput] = useState(false);

    const handleEnter = (e) => {
        if (e.key === "Enter"){

            if(!ingredient.trim()){
                setInvalidInput(true)
            }else{
                setIngredients([...ingredients, ingredient])
                setIngredient('')
                setIngredientError(false)
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        !title.trim() ? setTitleError(true) : '',
        !description.trim() ? setDescriptionError(true) : '',
        !ingredients.length ? setIngredientError(true) : ''
    }

    return (
        <div className="container mx-auto p-4 md:px-32 lg:px-64">
        <form className="space-y-7" onClick={handleSubmit}>
            
            <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input 
                value={title}
                onChange={(e)=>{
                    setTitleError(false)
                    setTitle(e.target.value)
                }}
                type="text" 
                className="mt-1 block w-full border rounded-md shadow-sm p-2 focus-within:outline-[0.5px] focus-within:outline-teal-400" 
            />
            <div>
                {
                    titleError && 
                    <span className="text-red-600 text-xs font-semibold">Title Field Is Required!</span>
                }
            </div>
            </div>
            
            <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea 
                value={description}
                onChange={(e) => {
                    setDescriptionError(false)
                    setDescription(e.target.value)
                }}
                className="mt-1 block w-full border rounded-md shadow-sm p-2 focus-within:outline-[0.5px] focus-within:outline-teal-400"></textarea>
            <div>
                {
                    descriptionError && 
                    <span className="text-red-600 text-xs font-semibold">Description Field Is Required!</span>
                }
            </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Ingredients - click &apos;enter&apos; to add the Ingredients</label>
                <input 
                    value={ingredient}
                    onChange={(e) => {
                        setIngredientError(false)
                        setInvalidInput(false)
                        setIngredient(e.target.value)
                    }}
                    onKeyDown={(e) => handleEnter(e)}                        
                    type="text" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus-within:outline-[0.5px] focus-within:outline-teal-400"
                />

                <div>
                    {
                        invalideInput &&
                        <p className="text-red-600 text-xs font-semibold">Invalid Input</p>
                    }
                    {
                        ingredientError && 
                        <p className="text-red-600 text-xs font-semibold">Ingredient Is Required!</p>
                    }
                </div>
                
                <div className="flex gap-2 mt-2 flex-wrap">
                    {ingredients && ingredients.map((ingredient, i) => (
                        <div key={i}>
                        <div className="font-semibold text-sm py-1 px-2 max-w-fit rounded-xl bg-teal-500 text-white">
                            {ingredient}
                        </div>
                        </div>
                    ))}
                </div>
            </div>

            <div>
            <button type="submit" className="bg-green-500 hover:bg-green-600 duration-300 text-white px-4 py-2 rounded-md">
                Submit
            </button>
            </div>
        
        </form>
        </div>
    );
}

export default Create;
