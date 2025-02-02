import Recipe from "../models/Recipe.js";

const RecipeController = {
    index: async (req, res) => {
        const recipes = await Recipe.find().sort({createdAt: -1});
        return res.json(recipes);
    },
    store: async(req, res) => {
        let {title, description, ingredients} = req.body;        
        const recipe = await Recipe.create({
            title, description, ingredients
        })
        return res.json({message: recipe});
    },
    show: async (req, res) => {
        try {
            const recipe = await Recipe.findById(req.params.id);
            return res.status(200).json(recipe);
        } catch (error) {
            return res.status(404).json({message: 'Recipe not found'});
        }
    },
    update: (req, res) => {
        const id = req.params.id;
        const {title, description, ingredients} = req.body;
        return res.json({message: 'Update a recipe'});
    },
    destroy: async(req, res) => {
        try {
            const id = req.params.id;
            await Recipe.findByIdAndDelete(id);
            return res.json({message: 'Successfully Deleted'});
        } catch (error) {
            return res.status(404).json({message: 'Something went wrong!'});
        }
    }

};

export default RecipeController;