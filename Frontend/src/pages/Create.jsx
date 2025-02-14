import { useEffect, useState } from "react";
import api from "../../axios.config";
import { useNavigate, useParams } from "react-router";

function Create() {

    let navigate = useNavigate();
    let {id} = useParams();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    
    const [invalidInput, setInvalidInput] = useState(false);
    const [duplicateError, setDuplicateError] = useState(false);
    
    const [titleError, setTitleError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [ingredientsError, setIngredientsError] = useState('');

    useEffect(() => {
        if(id){
            let fetchRecipe = async() => {
                let res = await api.get('/recipes/'+id);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setIngredients(res.data.ingredients);
            }
            fetchRecipe();
        }
    }, [id])

    const handleEnter = (e) => {
        if (e.key === "Enter"){
            e.preventDefault();
            if(!ingredient.trim()){
                setInvalidInput(true)
            }
            else if(ingredients.includes(ingredient)){
                setDuplicateError(true)
            }
            else{
                setIngredients([...ingredients, ingredient])
                setIngredient('')
            }
        }
    }

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            let recipe = {title, description, ingredients}
            if(id){
                await api.patch('/recipes/'+id, recipe)
            }
            else{
                await api.post('/recipes', recipe)
            }
            navigate('/');
        } catch (e) {            
            const errors = e.response?.data?.errors || {}; 
            setTitleError(errors.title?.msg || '');
            setDescriptionError(errors.description?.msg || '');
            setIngredientsError(errors.ingredients?.msg || '');              
        }
    }

    return (
        <div className="container mx-auto p-4 md:px-32 lg:px-64">
        <form className="space-y-7" onSubmit={(e)=>handleSubmit(e)}>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Title</label>
                <input 
                    value={title}
                    onChange={(e)=>{
                        setTitleError('')
                        setTitle(e.target.value)
                    }}
                    type="text" 
                    className="mt-1 block w-full border rounded-md shadow-sm p-2 focus-within:outline-[0.5px] focus-within:outline-teal-400" 
                />
            <div>
                {
                    titleError &&
                    <p className="text-red-600 text-xs font-semibold">{titleError}</p>
                }
            </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea 
                    value={description}
                    onChange={(e) => {
                        setDescriptionError('')
                        setDescription(e.target.value)
                    }}
                    className="mt-1 block w-full border rounded-md shadow-sm p-2 focus-within:outline-[0.5px] focus-within:outline-teal-400">
                </textarea>
                <div>
                    {
                        descriptionError &&
                        <p className="text-red-600 text-xs font-semibold">{descriptionError}</p>
                    }
                </div>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700">Ingredients - click &apos;enter&apos; to add the Ingredients</label>
                <input 
                    value={ingredient}
                    onChange={(e) => {
                        setInvalidInput(false)
                        setDuplicateError(false)
                        setIngredientsError('')
                        setIngredient(e.target.value)
                    }}
                    onKeyDown={(e) => handleEnter(e)}                        
                    type="text" 
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus-within:outline-[0.5px] focus-within:outline-teal-400"
                />

                <div>
                    {
                        invalidInput &&
                        <p className="text-red-600 text-xs font-semibold">Invalid Input!</p>
                    }
                </div>
                <div>
                    {
                        duplicateError &&
                        <p className="text-red-600 text-xs font-semibold">Ingredients cannot be duplicated!</p>
                    }
                </div>
                <div>
                    {
                        ingredientsError &&
                        <p className="text-red-600 text-xs font-semibold">{ingredientsError}</p>
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
                    {id ? 'Update' : 'Create'}
                </button>
            </div>
        
        </form>
        </div>
    );
}

export default Create;
