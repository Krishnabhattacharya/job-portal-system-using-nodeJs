//const express=require("express");   //go to package.json then find type, the require style use in common js , but in this ES module js use import(mordern approch)
import express from "express";
import dotenv from 'dotenv';//for safe all the confidential 
import connetDB from "./src/db/mongoose.js";
import authRoute from './src/routes/authRoute.js'
import userRouter from './src/routes/userRoute.js'
import jobRoute from './src/routes/jobsRoute.js'
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from "./src/middlewares/errorMiddleware.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
connetDB();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));// log all details about the hit url
app.use(authRoute);
app.use(userRouter);
app.use(jobRoute);



//validtion
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
})