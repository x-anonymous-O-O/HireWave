import express from "express"
import cookieParser from "cookie-parser";
import cors from 'cors'
import dotenv from "dotenv";
import path from 'path';

import connectMongoDB from "./utils/db.js";
import userRouter from './routes/user.route.js'
import companyRouter from './routes/company.route.js'
import jobRouter from './routes/job.route.js'
import applicationRoute from './routes/application.route.js'
dotenv.config({}); //it loads environment variables from a .env file into process.env

const app = express(); //create a app using express


app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())  //This will allow you to read and manage cookies from the req.cookies object.


const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
  };
app.use(cors(corsOption)) //Cross-Origin Resource Sharing for maintaining security

app.use('/api/v1/user', userRouter)
app.use('/api/v1/company', companyRouter)
app.use('/api/v1/job', jobRouter)
app.use('/api/v1/application', applicationRoute)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    connectMongoDB()
    console.log(`server running at port ${PORT}`);
})