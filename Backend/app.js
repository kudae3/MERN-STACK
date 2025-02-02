import express from 'express';
import 'dotenv/config'
import morgan from 'morgan';
import RecipeRoutes from './routes/Recipes.js';

const app = express();
app.use(morgan('dev'));

app.use('/api/recipes',RecipeRoutes);

app.listen(process.env.PORT, ()=>{
    console.log('Server is running on port: ' + process.env.PORT); 
})