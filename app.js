import express from 'express'
import {PORT} from './config/env.js'
import userRouter from './routes/user.routes.js';
import authrouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './DATABASE/mongodb.js';
import errorMiddleware from './middlwares/error.middleware.js';
import cookieParser from 'cookie-parser';


const app= new express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
// api/v1/auth/sign-up
app.use('/api/v1/auth/',authrouter);
app.use('/api/v1/users',userRouter);
app.use('/api/v1/auth/subscriptions',subscriptionRouter);
app.use(errorMiddleware)
app.get('/',(req,res)=>{
    res.send("welcome")




})
app.listen(PORT,async()=>{
    console.log(`Port running on http://localhost:${PORT}`);
   await connectToDatabase()
});
