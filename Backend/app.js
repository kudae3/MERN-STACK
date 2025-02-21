import express from 'express';
import 'dotenv/config'
import morgan from 'morgan';
import RecipeRoutes from './routes/Recipes.js';
import UserRoutes from './routes/Users.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import AuthMiddleware from './middlewares/AuthMiddleware.js';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import sendEmail from './functions/sendEmail.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
app.use(express.static('public'))
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/api/recipes', AuthMiddleware, RecipeRoutes);
app.use('/api/users', UserRoutes);

app.get('/send-email', (req, res) => {
    try {
        sendEmail({
            view: 'welcomeMail',
            data: {name: 'Kudae'},
            from: 'react@gmail.com',
            to: 'kduaesithu2@gmail.com'
        })
        return res.status(200).send('Email sent');
    } catch (error) {
        return res.status(500).send('Error sending email');
    }
})