
import express from 'express'
import cors from "cors"
import cookieParser from 'cookie-parser';
const app = express();



app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



//import router

import userRouter from './routes/user.routes.js';

//route declaration

app.use("/api/v1/users",userRouter)


//http://localhost:8000api/v1/users/register

export default app