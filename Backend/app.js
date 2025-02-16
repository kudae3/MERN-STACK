import express from 'express';
import 'dotenv/config'
import morgan from 'morgan';
import RecipeRoutes from './routes/Recipes.js';
import UserRoutes from './routes/Users.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import AuthMiddleware from './middlewares/AuthMiddleware.js';

const app = express();
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, ()=>{
        console.log('Server is running on port: ' + process.env.PORT); 
    })
})
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.use('/api/recipes', AuthMiddleware, RecipeRoutes);
app.use('/api/users', UserRoutes);