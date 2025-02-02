import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: Array,
        required: true
    }
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;