import express from 'express';
import 'dotenv/config'
import morgan from 'morgan';
import RecipeRoutes from './routes/Recipes.js';
import UserRoutes from './routes/Users.js';
import mongoose from 'mongoose';
import cors from 'cors';   

const app = express();
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, ()=>{
        console.log('Server is running on port: ' + process.env.PORT); 
    })
})
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/recipes',RecipeRoutes);
app.use('/api/users', UserRoutes);