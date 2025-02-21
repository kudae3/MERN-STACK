import Recipe from "../models/Recipe.js";
import mongoose from 'mongoose';
import { fileURLToPath } from "url";
import { dirname } from "path";
import { promises as fs } from 'fs';
import sendEmail from "../functions/sendEmail.js";
import User from "../models/User.js";

const RecipeController = {
    index: async (req, res) => {
        const limit = 6;
        const page = req.query.page || 1;        
        const recipes = await Recipe
                        .find()
                        .skip((page - 1) * limit)
                        .limit(limit)
                        .sort({createdAt: -1});
        const totalPages = Math.ceil(await Recipe.countDocuments() / limit);
        return res.json({recipes, totalPages});
    },

    store: async(req, res) => {
        try {

            const authuser = await User.findById(req.user.id);

            let users = await User.find();
            users = users.map(user => user.email);
            users = users.filter(user => user !== authuser.email);

            await sendEmail({
                view: 'mail',
                data: {name: authuser.name, recipe: req.body.title},
                from: authuser.email,
                to: users
            });
            
            let {title, description, ingredients} = req.body;        
            const recipe = await Recipe.create({
                title, description, ingredients
            })

            return res.status(200).json(recipe);
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'} || error.message);
        }
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

    update: async (req, res) => {
        try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);
            const id = req.params.id;
    
            // Validate ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid ID' });
            }
    
            // Find and update the recipe
            const recipe = await Recipe.findByIdAndUpdate(id, { ...req.body }, { new: true });
    
            // Check if recipe exists
            if (!recipe) {
                return res.status(404).json({ message: 'Recipe not found' });
            }
    
            // If the recipe has a photo, attempt to delete the old file
            if (recipe.photo) {
                let path = __dirname+"/../public/"+recipe.photo
                console.log(path);
                
                try {
                    // Check if the file exists
                    await fs.access(path);
                    // If it exists, delete it
                    await fs.unlink(path);
                } catch (error) {
                    // If the file doesn't exist or there's an error, log it (optional)
                    console.error('Error deleting file:', error.message);
                }
            }
    
            // Return the updated recipe
            return res.status(200).json(recipe);
        } catch (error) {
            console.error('Error in update:', error);
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
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
    },

    upload: async(req, res) =>{
        try {
            const id = req.params.id;
            if(!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({message: 'Invalid ID'});
            }            
            const recipe = await Recipe.findByIdAndUpdate(id, {
                photo: req.file.filename
            });
            return res.status(200).json(recipe);
        
        } catch (error) {
            return res.status(500).json({message: 'Internal Server Error'});
        }
    }

};

export default RecipeController;