import Recipe from "../models/Recipe.js";
import mongoose from 'mongoose';

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
            const id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({message: 'Invalid ID'});
            }
            const recipe = await Recipe.findById(id);
            if(!recipe) {
                return res.status(404).json({message: 'Recipe not found'});
            }
            return res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'});
        }
    },

    update: async(req, res) => {
        try {
            const id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({message: 'Invalid ID'});
            }
            const recipe = await Recipe.findByIdAndUpdate(id, {...req.body});
            if(!recipe) {
                return res.status(404).json({message: 'Recipe not found'});
            }
            return res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'});
        }
    },

    destroy: async(req, res) => {
        try {
            const id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({message: 'Invalid ID'});
            }
            const recipe = await Recipe.findByIdAndDelete(id);
            if(!recipe) {
                return res.status(404).json({message: 'Recipe not found'});
            }
            return res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

};

export default RecipeController;