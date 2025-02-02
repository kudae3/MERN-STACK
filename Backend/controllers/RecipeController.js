const RecipeController = {
    // Get all recipes
    index: (req, res) => {
        return res.json({message: 'All recipes'});
    }
};

export default RecipeController;