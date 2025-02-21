import express from 'express';
import 'dotenv/config'
import morgan from 'morgan';
import RecipeRoutes from './routes/Recipes.js';
import UserRoutes from './routes/Users.js';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import AuthMiddleware from './middlewares/AuthMiddleware.js';
import nodemailer from 'nodemailer';

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

app.use('/api/recipes', AuthMiddleware, RecipeRoutes);
app.use('/api/users', UserRoutes);

app.get('/send-email', async(req, res) => {
    
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: "60e7e653a90fba",
            pass: "dff22aa9d32b79"
            }
        });

        // send mail with defined transport object
        const info = await transport.sendMail({
            from: 'kduaesithu2@gmail.com', // sender address
            to: "bar@example.com, baz@example.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        });

        console.log("Message sent: %s", info.messageId);

        return res.json({message: 'Email sent!'});

})