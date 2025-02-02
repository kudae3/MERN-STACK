const RecipeController = {
    index: (req, res) => {
        return res.json({message: 'All recipes'});
    },
    create: (req, res) => {
        return res.json({message: 'Create a new recipe'});
    },
    show: (req, res) => {
        return res.json({message: 'Show a recipe'});
    },
    update: (req, res) => {
        return res.json({message: 'Update a recipe'});
    },
    delete: (req, res) => {
        return res.json({message: 'Delete a recipe'});
    }

};

export default RecipeController;