import { useEffect, useState } from "react";
import api from "../../axios.config";
import { useNavigate, useParams } from "react-router";
import DropZone from "../components/DropZone";
import 'ldrs/bouncy'
import LoadingBtn from "../components/ui/LoadingBtn";
function Create() {

    let navigate = useNavigate();
    let {id} = useParams();
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [ingredients, setIngredients] = useState([]);
    
    const [invalidInput, setInvalidInput] = useState(false);
    const [duplicateError, setDuplicateError] = useState(false);
    const [prevPhoto, setPrevPhoto] = useState('');
    
    const [errors, setErrors] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [clickable, setClickable] = useState(true);

    const [file, setFile] = useState([]);

    useEffect(() => {
        if(id){
            let fetchRecipe = async() => {
                let res = await api.get('api/recipes/'+id);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setIngredients(res.data.ingredients);
                setPrevPhoto(res.data.photo);
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
            setIsSubmitting(true);
            setClickable(false);

            let recipe = {title, description, ingredients}
            
            let recipeId;
            let res
            if(id){
                res = await api.patch('api/recipes/'+id, recipe)                                
            }
            else{
                res = await api.post('api/recipes', recipe)
            }
            recipeId = res.data._id;
            

            //file
            if(file.length > 0){
                let formData = new FormData;
                formData.set('photo', file[0]);
    
                await api.post(`api/recipes/${recipeId}/upload`, formData, {
                    headers: {
                        Accept: 'multipart/form-data'
                    }
                })
            }

            navigate('/');
        } catch (e) {      
            setIsSubmitting(false);   
            setClickable(true);  
            setErrors(e.response.data.errors);             
        }
    }

    return (
        <div className="border border-gray-200 p-8 rounded-md shadow-md container mx-auto max-w-md">
            <h2 className="text-teal-500 font-bold text-center text-2xl mb-7">{id ? 'Edit the' : 'Create a new'} Recipe</h2>
            
            
            <form className="space-y-7" onSubmit={(e)=>handleSubmit(e)}>

                <div>
                    {
                        prevPhoto && (
                            <div className="flex justify-center items-center"><img className="size-48 object-cover my-2 rounded-lg" src={import.meta.env.VITE_API_URL+prevPhoto} alt="" /></div>
                        )
                    }
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label> 
                    <input 
                        value={title}
                        onChange={(e)=>{
                            setTitle(e.target.value)
                        }}
                        type="text" 
                        className="mt-1 block w-full border rounded-md shadow-sm p-2 focus-within:outline-[0.5px] focus-within:outline-teal-400" 
                    />
                <div>
                    {
                        errors && errors.title &&
                        <p className="text-red-600 text-xs font-semibold">{errors.title.msg}</p>
                    }
                </div>
                </div>

                <div>
                    <DropZone onFileChange={setFile} />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                        className="mt-1 block w-full border rounded-md shadow-sm p-2 focus-within:outline-[0.5px] focus-within:outline-teal-400">
                    </textarea>
                    <div>
                        {
                            (errors && errors.description )&&
                            <p className="text-red-600 text-xs font-semibold">{errors.description.msg}</p>
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
                            errors && errors.ingredients &&
                            <p className="text-red-600 text-xs font-semibold">{errors.ingredients.msg}</p>
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
                    {
                        isSubmitting ? 
                        (<button disabled={!clickable} type="submit" className={`${!clickable ? 'opacity-70 cursor-not-allowed' : ''} bg-green-500 hover:bg-green-600 duration-300 text-white px-4 py-2 rounded-md`}>
                             <span className="pe-1 font-medium">{id ? 'Updating' : 'Creating'} </span>  
                             <LoadingBtn/>       
                        </button>) : 
                        (
                        <button type="submit" className="bg-green-500 hover:bg-green-600 duration-300 text-white px-4 py-2 rounded-md">
                            <span className="font-medium">{id ? 'Update' : 'Create'} </span>        
                        </button>
                        )
                    }
                </div>
            
            </form>
        </div>
    );
}

export default Create;
